# Clover Runtime Enforcement Reference

This reference demonstrates how a Clover verification boundary can be enforced outside the model.

## What it demonstrates

- Existing trusted verification files are treated as immutable by the write policy.
- New verification files require explicit creation permission.
- Parent traversal and symbolic-link paths are resolved before authorization.
- Denied write attempts are emitted as structured JSON security events without recording file contents.
- Docker can provide a second, physical filesystem boundary by mounting verification artifacts read-only.
- The container runs on an `internal` network, so the Action stage has no route out of the sandbox.

## Run the policy tests

From the repository root:

```bash
python -m pytest reference/runtime-enforcement/tests/test_write_guard.py
```

## Run the Docker boundary example

Requires Docker and Docker Compose:

```bash
cd reference/runtime-enforcement
./verify.sh
```

The container can write under `workspace/src` but cannot modify the existing verification artifact under `workspace/tests` because that mount is read-only.

## New verification files

The Python policy supports explicit creation mode:

```bash
CLOVER_ALLOW_NEW_TESTS=1
```

Creation permission does not grant permission to modify an existing trusted verification artifact. That distinction is intentional.

## Production use

This is a reference pattern, not a security certification or a complete agent sandbox. Real systems should combine the enforcement point appropriate to their environment — for example filesystem permissions, container isolation, CI identities, protected branches, or a tool/MCP gateway — with repository-specific definitions of trusted verification state.

The key Clover rule is:

> **When a boundary matters to Outcome, enforce it outside the model wherever the environment allows.**
