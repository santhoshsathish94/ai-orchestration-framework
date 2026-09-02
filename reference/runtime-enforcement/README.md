# Clover Runtime Enforcement Reference

Clover defines the boundary between human Direction, AI Action, and Success. This directory shows how an implementation can enforce part of that boundary outside the model's instructions.

The important distinction is:

> **Agent instructions describe what the agent should do. Runtime controls determine what the agent can do.**

A model can ignore a system prompt or `AGENTS.md`. A filesystem, container, tool gateway, or MCP server can still reject the operation.

This reference implementation demonstrates two complementary controls:

- a Docker runtime that mounts verification artifacts read-only;
- a small MCP-style policy layer that rejects writes to verification artifacts.

These examples are intentionally narrow. They do not attempt to implement the whole Clover Framework or claim that every production environment should use Docker or MCP.

## What this protects

During **Action**, an agent may be allowed to modify implementation code while verification controls remain protected.

Examples of protected artifacts include:

- `test/`
- `tests/`
- `spec/`
- `specs/`
- regression fixtures
- acceptance criteria
- other files explicitly designated as verification controls

The exact policy should be chosen by the human and the environment. A repository that intentionally allows test changes needs an explicit Direction and independent validation of those changes.

## Docker example

`docker-compose.yml` shows the simplest physical enforcement pattern: implementation is mounted writable, while the test suite is mounted read-only.

An agent process can attempt to write a test file, but the operating environment rejects the write rather than relying on the model to obey an instruction.

Run it with:

```bash
docker compose -f docker-compose.yml run --rm agent
```

The example container prints the mount modes and attempts a test-file write. The expected result is a failed write to the read-only mount.

## Tool-gateway example

`write_guard.py` demonstrates the same boundary at a tool layer. A tool caller can request a write, but the gateway rejects paths that match the configured verification policy before the underlying filesystem operation occurs.

This is useful when the agent already operates through an MCP server, tool gateway, or similar capability boundary.

## Production interpretation

This is a reference pattern, not a security certification.

For production, the enforcement point should live outside the model and should be backed by the environment's normal security controls: filesystem permissions, container isolation, service identities, network policy, protected branches, CI permissions, or equivalent mechanisms.

Clover's claim is narrower and more useful:

**Do not rely on an AI instruction alone for a boundary that matters to Success. Put important boundaries where the execution environment can enforce them.**
