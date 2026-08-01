# API.Contentful

A **.NET 10 Minimal API** that serves website content from **Contentful** via the **REST Content
Delivery / Preview API**. It is a from-scratch replacement for the legacy `Legacy.CMS` (which used
Contentful **GraphQL**) and exposes the **exact same public API contract** — same routes, same
response DTOs, same `CMSAPIResponse` envelope — so existing consumers need **no changes**. Correctness
is proven by an automated parity + contract-snapshot suite.

---

## What we did

- Re-platformed the CMS content API from **Contentful GraphQL → Contentful REST**, swapping the entire
  engine underneath while keeping the public contract **byte-for-byte identical**.
- Replaced the legacy plumbing (89 `.graphql` files, a dynamic query builder, AutoMapper and a
  rich-text link service) with **one generic, attribute-driven mapper** and a **resilient content
  gateway**.
- Outcome: the same 5 endpoint groups, **220 unit tests**, **19 contract snapshots**, **36/36 live
  parity**, **0 vulnerabilities**, **0 build warnings**.

## How we started (AI-orchestrated, task-driven)

The migration was planned up front and executed by an AI agent against explicit, self-contained specs:

- **[`AGENTS.md`](AGENTS.md)** — the guardrails every agent follows: the golden rule (never change the
  contract), copy DTOs verbatim, caching is fallback-only, the security rules, and the definition of
  done.
- **[`docs/rest-migration/`](docs/rest-migration/README.md)** — the plan, broken into **15
  self-contained task files** (`01`–`15`) plus an overview (`00`). Each task file carries an
  **Objective, Dependencies, Deliverables, Steps, Acceptance criteria** and **Out-of-scope** — the
  agent read each file, built exactly what it specified, then self-checked against its acceptance gate.
- Tasks were executed **one at a time, in dependency order**, each finishing green (clean build +
  tests) before the next began.

## What each task produced

Each row links to its spec/context file under [`docs/rest-migration/`](docs/rest-migration/README.md).

| Task | Spec (context file) | What it generated |
|---|---|---|
| 00 | [overview](docs/rest-migration/00-overview.md) | Architecture, endpoint inventory, contract rules, config keys |
| 01 | [foundation-generic-core](docs/rest-migration/01-foundation-generic-core.md) | `EntryGraphResolver`, `EntryMapper`, `ContentTypeRegistry`, `ContentfulRestClient`, `RichTextRenderer`, DI wiring |
| 02 | [dto-contract-and-conventions](docs/rest-migration/02-dto-contract-and-conventions.md) | The `Contracts` project — DTOs + interfaces + mapping attributes (the frozen wire contract) |
| 03 | [page-and-slugs](docs/rest-migration/03-page-and-slugs.md) | Page endpoints (`GET /Page`, `/Page/slugs`) + slug enumeration |
| 04 | [sections](docs/rest-migration/04-sections.md) | Section endpoints (header/footer/right rail) + default JSON fallback |
| 05 | [blog](docs/rest-migration/05-blog.md) | Blog provider + all 8 Blog endpoints |
| 06 | [helpcenter-articles](docs/rest-migration/06-helpcenter-articles.md) | Help Center / Article provider + 5 endpoints |
| 07 | [glossary](docs/rest-migration/07-glossary.md) | Glossary provider + `GET /Glossary/list` |
| 08 | [validation-harness](docs/rest-migration/08-validation-harness.md) | Live-diff parity harness + contract-snapshot suite |
| 09 | [hosting-config-cutover](docs/rest-migration/09-hosting-config-cutover.md) | Host wiring, config audit, API versioning, exception middleware, Dockerfile, CI pipeline, cutover plan |
| 10 | [content-gateway-caching-resilience](docs/rest-migration/10-content-gateway-caching-resilience.md) | `IContentGateway` — fallback cache, circuit breaker, single-flight |
| 11 | [dos-allowlist-webhook](docs/rest-migration/11-dos-allowlist-webhook.md) | Slug allow-list + secured Contentful webhook + reconcile hosted service |
| 12 | [observability](docs/rest-migration/12-observability.md) | OpenTelemetry tracing/metrics, degraded-aware `GET /Health` |
| 13 | [performance-benchmark-and-reports](docs/rest-migration/13-performance-benchmark-and-reports.md) | BenchmarkDotNet suite, comparison-report generator, qualitative comparison |
| 14 | [serialization-payload-optimization](docs/rest-migration/14-serialization-payload-optimization.md) | Response compression + serialization decision log |
| 15 | [cors-preview-origin](docs/rest-migration/15-cors-preview-origin.md) | CORS policy + preview-origin restriction |

## Solution layout

```
src/
  API.Contentful/                 # Minimal API host (endpoints, CORS, middleware, DI, default sections)
  API.Contentful.Contracts/       # DTOs = the frozen wire contract (+ mapping attributes)
  API.Contentful.Infrastructure/  # Contentful REST client, resolver, generic mapper, gateway, allow-list, observability
test/
  API.Contentful.UnitTests/       # mapper / resolver / gateway / endpoint units (220 tests)
  API.Contentful.ParityTests/     # old-vs-new live parity + contract snapshots
benchmarks/                            # BenchmarkDotNet micro-benchmarks
loadtest/                              # k6 + PowerShell load-test scripts
tools/                                 # analysis scripts
docs/                                  # migration plan, reports & the executive deck
```

## Highlights

- **Generic convention mapper** (attributes on DTOs) — no per-type model classes, no AutoMapper, no `.graphql` files.
- **Fallback-only caching** — fire-and-forget writes; serve stale only when Contentful is down (circuit breaker + single-flight).
- **DoS / SSRF defense** — slug allow-list bounds every upstream fetch; secured Contentful webhook (shared secret + HMAC).
- **CORS** restricted to configured origins; **preview restricted to configured preview origins**.
- **OpenTelemetry → App Insights** observability with a degraded-aware health check.

## Getting started

```powershell
dotnet build
dotnet test
dotnet run --project src/API.Contentful    # then GET https://localhost:<port>/Health
```

### Access model

- The API is **anonymous public-read** (matching the legacy service) — there is **no** API key.
- **Preview** (`isPreview=true`) is restricted by an **origin allow-list** (`CMS:Cors:PreviewOrigins`),
  not by a key.
- The Contentful **webhook** (`POST /internal/contentful/webhook`) is guarded by a shared secret + HMAC
  signature (`CMS:Contentful:WebhookSecret`).

## Docs & reports

- **[`docs/rest-migration/`](docs/rest-migration/README.md)** — the plan + 15 task/context files.
- **[`docs/architecture-overview.html`](docs/architecture-overview.html)** — the design in plain terms.
- **[`docs/contentful-api-architecture-and-security.html`](docs/contentful-api-architecture-and-security.html)** — architecture & security analysis.
- **[`docs/security-scan-report.html`](docs/security-scan-report.html)** — dependency/secret/OWASP scan (0 findings).
- **[`docs/migration-story-slides.html`](docs/migration-story-slides.html)** — executive migration deck.
- Status & design notes: [`parity-status.md`](docs/parity-status.md), [`cutover-plan.md`](docs/cutover-plan.md), [`observability.md`](docs/observability.md), [`serialization-decision.md`](docs/serialization-decision.md), [`qualitative-comparison.md`](docs/qualitative-comparison.md).

## Status

**Complete.** 36/36 live parity, 220 unit + 19 snapshot tests passing, 0 build warnings, 0 known
vulnerabilities. See [`docs/parity-status.md`](docs/parity-status.md) for the detailed record.
