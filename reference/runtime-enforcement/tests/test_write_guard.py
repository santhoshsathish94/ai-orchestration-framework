import os

import pytest

from write_guard import guarded_write, VerificationPolicy


def test_verification_paths_are_detected() -> None:
    policy = VerificationPolicy()
    assert policy.is_verification_path("tests/example.test.js")
    assert policy.is_verification_path("spec/account.spec.ts")
    assert not policy.is_verification_path("src/account/service.ts")


def test_guard_rejects_existing_verification_write(tmp_path, capsys) -> None:
    workspace = tmp_path / "workspace"
    tests_dir = workspace / "tests"
    tests_dir.mkdir(parents=True)
    target = tests_dir / "example.test.js"
    target.write_text("original", encoding="utf-8")

    with pytest.raises(PermissionError):
        guarded_write(str(target), "changed", protected_root=str(workspace))

    assert target.read_text(encoding="utf-8") == "original"
    assert '"event": "write_denied"' in capsys.readouterr().out


def test_guard_allows_implementation_write(tmp_path) -> None:
    workspace = tmp_path / "workspace"
    src_dir = workspace / "src"
    src_dir.mkdir(parents=True)
    target = src_dir / "app.js"

    guarded_write(str(target), "changed", protected_root=str(workspace))
    assert target.read_text(encoding="utf-8") == "changed"


def test_parent_traversal_resolves_before_policy(tmp_path) -> None:
    workspace = tmp_path / "workspace"
    tests_dir = workspace / "tests"
    src_dir = workspace / "src"
    tests_dir.mkdir(parents=True)
    src_dir.mkdir()
    target = tests_dir / "example.test.js"
    target.write_text("original", encoding="utf-8")

    with pytest.raises(PermissionError):
        guarded_write(
            str(src_dir / ".." / "tests" / "example.test.js"),
            "changed",
            protected_root=str(workspace),
        )

    assert target.read_text(encoding="utf-8") == "original"


def test_write_outside_protected_root_is_rejected(tmp_path) -> None:
    workspace = tmp_path / "workspace"
    (workspace / "src").mkdir(parents=True)
    outside = tmp_path / "outside"
    outside.mkdir()
    target = outside / "notes.txt"

    with pytest.raises(PermissionError):
        guarded_write(str(target), "changed", protected_root=str(workspace))

    assert not target.exists()


def test_traversal_escaping_protected_root_is_rejected(tmp_path) -> None:
    workspace = tmp_path / "workspace"
    (workspace / "src").mkdir(parents=True)
    escape = workspace / "src" / ".." / ".." / "escape.test.js"

    with pytest.raises(PermissionError):
        guarded_write(str(escape), "changed", protected_root=str(workspace))

    assert not (tmp_path / "escape.test.js").exists()


def test_symlink_to_protected_file_is_rejected(tmp_path) -> None:
    workspace = tmp_path / "workspace"
    tests_dir = workspace / "tests"
    src_dir = workspace / "src"
    tests_dir.mkdir(parents=True)
    src_dir.mkdir()

    target = tests_dir / "existing.test.js"
    target.write_text("original", encoding="utf-8")
    link = src_dir / "alias.js"
    try:
        os.symlink(target, link)
    except (OSError, NotImplementedError) as exc:  # Windows needs elevation or Developer Mode.
        pytest.skip(f"symlinks not permitted in this environment: {exc}")

    with pytest.raises(PermissionError):
        guarded_write(str(link), "changed", protected_root=str(workspace))

    assert target.read_text(encoding="utf-8") == "original"


def test_new_test_creation_requires_explicit_policy(tmp_path) -> None:
    workspace = tmp_path / "workspace"
    tests_dir = workspace / "tests"
    tests_dir.mkdir(parents=True)
    new_test = tests_dir / "new.test.js"

    with pytest.raises(PermissionError):
        guarded_write(str(new_test), "new test", protected_root=str(workspace), allow_new_tests=False)

    guarded_write(str(new_test), "new test", protected_root=str(workspace), allow_new_tests=True)
    assert new_test.read_text(encoding="utf-8") == "new test"


def test_existing_test_stays_protected_even_when_creation_enabled(tmp_path) -> None:
    workspace = tmp_path / "workspace"
    tests_dir = workspace / "tests"
    tests_dir.mkdir(parents=True)
    existing = tests_dir / "existing.test.js"
    existing.write_text("original", encoding="utf-8")

    with pytest.raises(PermissionError):
        guarded_write(str(existing), "changed", protected_root=str(workspace), allow_new_tests=True)

    assert existing.read_text(encoding="utf-8") == "original"
