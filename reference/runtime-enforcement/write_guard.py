from __future__ import annotations

from pathlib import PurePosixPath

PROTECTED_NAMES = {"test", "tests", "spec", "specs"}
PROTECTED_SUFFIXES = (".test.js", ".test.ts", ".test.tsx", ".spec.js", ".spec.ts", ".spec.tsx")


def is_protected(path: str) -> bool:
    """Return True when a repository-relative path is treated as a verification control."""
    normalized = str(PurePosixPath(path))
    parts = set(PurePosixPath(normalized).parts)
    name = PurePosixPath(normalized).name
    return bool(parts & PROTECTED_NAMES) or name.endswith(PROTECTED_SUFFIXES)


def guarded_write(path: str, content: str) -> None:
    """Reject protected writes before they reach the filesystem."""
    if is_protected(path):
        raise PermissionError(
            f"Clover runtime policy rejected write to verification artifact: {path}"
        )

    with open(path, "w", encoding="utf-8") as handle:
        handle.write(content)


if __name__ == "__main__":
    examples = [
        "src/app.js",
        "tests/example.test.js",
        "src/account/spec.ts",
    ]
    for example in examples:
        print(f"{example}: {'protected' if is_protected(example) else 'writable'}")
