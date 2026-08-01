# API.Contentful — Migration task index

A **greenfield rewrite** of `Legacy.CMS` on **.NET 10** with **Minimal APIs**. It exposes the
**exact same public API** (routes, response DTOs, `CMSAPIResponse` envelope) but sources content from
the **Contentful REST Content Delivery/Preview API** instead of GraphQL.

Key architecture (see [00-overview.md](00-overview.md)):
- **Generic convention-driven mapping** (Option 2): one reflection-based `EntryMapper` (cached
  compiled plans) + attributes on the DTOs. No `Gql*` models, no AutoMapper, no `.graphql` files.
- **Fallback-only caching** (fire-and-forget; serve stale only when Contentful is down; circuit
  breaker + single-flight) on existing **Memcached**.
- **DoS defense**: slug **allow-list** + secured Contentful **webhook** (rate limiting at gateway/CDN).
- **Observability**: OpenTelemetry → App Insights.
- **Safe DTO evolution**: `Contracts` project + `[ContentfulField]` decoupling + contract-snapshot
  tests + v2 for breaking changes.

> Old project (contract source of truth): `c:\repos\legacy-repo\Legacy.CMS\Legacy.CMS`
> New project (this repo): `c:\repos\API.Contentful`

## Golden rule

**The API contract must not change.** Every endpoint's JSON must be byte-equivalent to the old
service for the same input. Because the presentation/service layers are rewritten (Minimal APIs +
gateway, not copied verbatim), the **parity + contract-snapshot harness (Task 08)** is the safety net.

## How to use these task files (for multi-agent execution)

Each `NN-*.md` file is a **self-contained task** with: Objective, Dependencies, Deliverables,
Steps, Acceptance criteria, and Out-of-scope. Pick a task whose dependencies are all `Done`.

| # | Task | Depends on | Parallel with |
|---|------|-----------|----------------|
| 00 | [Overview, architecture & contract](00-overview.md) | — | (read first) |
| 01 | [Foundation & generic core](01-foundation-generic-core.md) | 00 | 02 |
| 02 | [DTO contract port + conventions](02-dto-contract-and-conventions.md) | 00 | 01 |
| 03 | [Page + slugs](03-page-and-slugs.md) | 01, 02 | 04–07 |
| 04 | [Sections (header/footer/right rail)](04-sections.md) | 01, 02 | 03, 05–07 |
| 05 | [Blog (8 endpoints)](05-blog.md) | 01, 02 | 03, 04, 06, 07 |
| 06 | [Help Center / Articles](06-helpcenter-articles.md) | 01, 02 | 03–05, 07 |
| 07 | [Glossary](07-glossary.md) | 01, 02 | 03–06 |
| 08 | [Validation harness + contract snapshots](08-validation-harness.md) | 01, 02 (grows with 03–07) | 09–12 |
| 09 | [Hosting, config & cutover](09-hosting-config-cutover.md) | 01, 10, 11, 12 | 03–08 |
| 10 | [Content gateway: fallback caching & resilience](10-content-gateway-caching-resilience.md) | 01 | 03–08, 11, 12 |
| 11 | [DoS defense: slug allow-list + webhook](11-dos-allowlist-webhook.md) | 01 | 03–10, 12 |
| 12 | [Observability](12-observability.md) | 01 | 03–11 |
| 13 | [Performance benchmarking & team reports](13-performance-benchmark-and-reports.md) | 03–08 | 09–12, 14 |
| 14 | [Serialization & payload optimization (compression + optional protobuf)](14-serialization-payload-optimization.md) | 03–07, 13 | 09–12 |
| 15 | [CORS & preview-origin restriction](15-cors-preview-origin.md) | 01 | most (scaffolded) |

### Suggested execution order
1. **00** (read) → **01 + 02** in parallel (the core + the contract).
2. Then fan out: **03–07** (domains), **10** (gateway), **11** (allow-list/webhook), **12**
   (observability), **08** (harness) — all in parallel.
3. **13** (benchmarks + reports) once endpoints + parity are green; **14** (payload optimization)
   gated by 13's numbers.
4. **09** (host + cutover) last, once 10/11/12 exist to wire in.

## Presentation & reports (team-facing)
- [`docs/architecture-overview.html`](../architecture-overview.html) — the design in plain terms
  with visuals (open in a browser). Ready now.
- [`docs/comparison-report.template.html`](../comparison-report.template.html) — old-vs-new report
  (parity + performance charts); Task 13 populates it into `docs/comparison-report.html` from run
  artifacts.

## Definition of Done (whole project)

- All endpoints in the [inventory](00-overview.md#endpoint-inventory) implemented as Minimal APIs.
- Task 08 parity **and** contract-snapshot suites green across delivery **and** preview.
- Fallback caching, circuit breaker, slug allow-list + webhook, and OpenTelemetry all live and
  verified (Tasks 10–12).
- Config keys, health, and container/pipeline in place; documented reversible cutover (Task 09).
- Performance benchmarked and the **comparison report** + **architecture overview** delivered to the
  team (Task 13); payload optimization decided from the numbers (Task 14).
