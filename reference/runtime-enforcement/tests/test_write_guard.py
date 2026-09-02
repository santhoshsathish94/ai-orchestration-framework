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
    target.parent.mkdir()

    guarded_write(str(target), "changed")
    assert target.read_text(encoding="utf-8") == "changed"
