import os

import pytest

from reference.runtime_enforcement.write_guard import guarded_write, is_protected


def test_verification_paths_are_protected() -> None:
    assert is_protected("tests/example.test.js")
    assert is_protected("spec/account.spec.ts")
    assert not is_protected("src/account/service.ts")


def test_guard_rejects_verification_write(tmp_path) -> None:
    target = tmp_path / "tests" / "example.test.js"
    target.parent.mkdir()

    with pytest.raises(PermissionError):
        guarded_write(str(target), "changed")


def test_guard_allows_implementation_write(tmp_path) -> None:
    target = tmp_path / "src" / "app.js"

    guarded_write(str(target), "changed")
    assert target.read_text(encoding="utf-8") == "changed"


def test_parent_traversal_is_resolved(tmp_path) -> None:
    protected_root = tmp_path / "workspace"
    tests_dir = protected_root / "tests"
    src_dir = protected_root / "src"
    tests_dir.mkdir(parents=True)
    src_dir.mkdir()

    with pytest.raises(PermissionError):
        guarded_write(
            str(src_dir / ".." / "tests" / "example.test.js"),
            "changed",
            protected_root=str(protected_root),
        )


def test_symlink_to_protected_file_is_rejected(tmp_path) -> None:
    protected_root = tmp_path / "workspace"
    tests_dir = protected_root / "tests"
    src_dir = protected_root / "src"
    tests_dir.mkdir(parents=True)
    src_dir.mkdir()

    target = tests_dir / "existing.test.js"
    target.write_text("original", encoding="utf-8")
    link = src_dir / "alias.js"
    os.symlink(target, link)

    with pytest.raises(PermissionError):
        guarded_write(
            str(link),
            "changed",
            protected_root=str(protected_root),
        )

    assert target.read_text(encoding="utf-8") == "original"
