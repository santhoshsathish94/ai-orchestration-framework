from __future__ import annotations

import json
import os
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


class VerificationPolicy:
    """Small runtime policy for protecting trusted verification artifacts.

    A trusted verification file may be read and executed but not modified or deleted.
    New verification files can be created only when explicit creation mode is enabled.
    """

    def __init__(self, *, protected_root: str | None = None, allow_new_tests: bool | None = None) -> None:
        self.root = Path(protected_root).resolve() if protected_root else None
        self.allow_new_tests = (
            self._env_flag("CLOVER_ALLOW_NEW_TESTS") if allow_new_tests is None else allow_new_tests
        )

    @staticmethod
    def _env_flag(name: str) -> bool:
        return os.getenv(name, "").strip().lower() in {"1", "true", "yes", "on"}

    def _resolve(self, path: str) -> Path:
        return Path(path).resolve(strict=False)

    def _relative(self, path: str) -> PurePosixPath:
        candidate = self._resolve(path)
        if self.root is None:
            return PurePosixPath(candidate.as_posix())
        try:
            return PurePosixPath(candidate.relative_to(self.root).as_posix())
        except ValueError:
            return PurePosixPath("")

    def is_verification_path(self, path: str) -> bool:
        # Case-folded: on Windows and macOS, TESTS/A.TEST.JS names the same file as tests/a.test.js.
        relative = self._relative(path)
        parts = {part.lower() for part in relative.parts}
        name = relative.name.lower()
        return bool(parts & PROTECTED_NAMES) or name.endswith(PROTECTED_SUFFIXES)

    def is_protected(self, path: str) -> bool:
        """Return True when an existing verification artifact is protected."""
        target = self._resolve(path)
        return self.is_verification_path(path) and target.exists()

    def authorize_write(self, path: str) -> str:
        """Return the policy decision and raise on a denied write."""
        verification = self.is_verification_path(path)
        exists = self._resolve(path).exists()

        if verification and exists:
            self.audit("write_denied", path, reason="trusted_verification_exists")
            raise PermissionError(
                f"Clover runtime policy rejected write to trusted verification artifact: {path}"
            )

        if verification and not self.allow_new_tests:
            self.audit("write_denied", path, reason="new_verification_creation_disabled")
            raise PermissionError(
                f"Clover runtime policy rejected new verification creation: {path}"
            )

        decision = "write_allowed_new_verification" if verification else "write_allowed"
        self.audit(decision, path)
        return decision

    def audit(self, event: str, path: str, *, reason: str | None = None) -> None:
        """Emit one structured security event without recording file contents."""
        record = {
            "event": event,
            "path": str(self._resolve(path)),
            "verification_path": self.is_verification_path(path),
            "reason": reason,
        }
        print(json.dumps(record, sort_keys=True), flush=True)


def is_protected(path: str, *, protected_root: str | None = None) -> bool:
    """Compatibility helper for the default trusted-verification policy."""
    return VerificationPolicy(protected_root=protected_root).is_protected(path)


def guarded_write(
    path: str,
    content: str,
    *,
    protected_root: str | None = None,
    allow_new_tests: bool | None = None,
) -> None:
    """Authorize a write before it reaches the filesystem."""
    policy = VerificationPolicy(
        protected_root=protected_root,
        allow_new_tests=allow_new_tests,
    )
    policy.authorize_write(path)

    target = policy._resolve(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open("w", encoding="utf-8") as handle:
        handle.write(content)


if __name__ == "__main__":
    policy = VerificationPolicy()
    for example in [
        "src/app.js",
        "tests/example.test.js",
        "src/account/spec.ts",
    ]:
        status = "protected" if policy.is_protected(example) else "not-protected"
        print(f"{example}: {status}")
