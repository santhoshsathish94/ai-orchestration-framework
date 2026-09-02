from __future__ import annotations

from pathlib import Path, PurePosixPath

PROTECTED_NAMES = {"test", "tests", "spec", "specs"}
PROTECTED_SUFFIXES = (
    ".test.js",
    ".test.ts",
    ".test.tsx",
    ".spec.js",
    ".spec.ts",
    ".spec.tsx",
)


def is_protected(path: str, *, protected_root: str | None = None) -> bool:
    """Return True when the real path is treated as a verification control.

    Protection is evaluated after resolving ``..`` components and symbolic links,
    so a path cannot escape the protected boundary through traversal or a symlink.
    """
    candidate = Path(path)

    if protected_root is not None:
        root = Path(protected_root).resolve()
        try:
            candidate = candidate.resolve()
            relative = candidate.relative_to(root)
        except ValueError:
            return False
        normalized = PurePosixPath(relative.as_posix())
    else:
        normalized = PurePosixPath(candidate.resolve().as_posix())

    parts = set(normalized.parts)
    name = normalized.name
    return bool(parts & PROTECTED_NAMES) or name.endswith(PROTECTED_SUFFIXES)


def guarded_write(
    path: str,
    content: str,
    *,
    protected_root: str | None = None,
) -> None:
    """Reject protected writes before they reach the filesystem."""
    if is_protected(path, protected_root=protected_root):
        raise PermissionError(
            f"Clover runtime policy rejected write to verification artifact: {path}"
        )

    target = Path(path).resolve()
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open("w", encoding="utf-8") as handle:
        handle.write(content)


if __name__ == "__main__":
    examples = [
        "src/app.js",
        "tests/example.test.js",
        "src/account/spec.ts",
    ]
    for example in examples:
        print(f"{example}: {'protected' if is_protected(example) else 'writable'}")
