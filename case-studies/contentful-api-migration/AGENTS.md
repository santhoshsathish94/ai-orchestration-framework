# AGENTS.md — API.Contentful

Instructions for AI agents implementing this project. Read this first, then
[`docs/rest-migration/README.md`](docs/rest-migration/README.md) and
[`docs/rest-migration/00-overview.md`](docs/rest-migration/00-overview.md).

## What this project is
A greenfield **.NET 10 Minimal API** that serves content sites from **Contentful REST** (delivery +
preview). It must expose the **exact same public API** as the legacy `Legacy.CMS` (which used
GraphQL). The plan is broken into self-contained tasks under `docs/rest-migration/` (`00`–`15`).

## Golden rule
**Never change the public API contract.** Same routes, same JSON shapes, same `CMSAPIResponse`
envelope, camelCase, nulls omitted. Correctness is proven by the parity + snapshot suite (Task 08),
which is the objective gate for every endpoint.

## Where to work
- **Only** in this repo: `c:\repos\API.Contentful`.
- The legacy repo `c:\repos\legacy-repo\Legacy.CMS` is **reference/source-of-truth only** —
  do **not** modify it, and do **not** copy its GraphQL plumbing (`Gql*`, `.graphql`, AutoMapper,
  `DynamicQueryBuilder`, `RichTextLinkService`).

## Task order (respect the dependency graph in the README)
1. Read **00**. Then do **01** (generic core) + **02** (port DTOs into `Contracts`) — start here.
2. Fan out: **03–07** (Page/Section/Blog/HelpCenter/Glossary), **10** (gateway/caching),
   **11** (allow-list/webhook), **12** (observability), **08** (parity harness — grow as you go).
3. **13** (benchmarks/reports), then **14** (compression/protobuf, gated by 13's numbers).
4. **09** (host wiring + cutover) last. **15** (CORS/preview-origin) is already scaffolded.

Pick a task whose dependencies are all done. One task = one feature branch = one focused PR.

## Non-negotiable guardrails
- **Copy DTOs verbatim** into `src/API.Contentful.Contracts` (names, properties, nullability).
  They are the contract. Add only the mapping attributes described in Task 02.
- **Do not "fix" the polymorphic `kind` discriminators** on `ISection`/`ICard` — the quirky values
  (`legalSection`, `speackerSchedule`, `fulcrumWidget`, `stackedCardsSection`, `Table`, …) are the
  contract and are emitted by the copied `[JsonDerivedType]` attributes. STJ owns the `Kind` slot;
  the mapper's job is only to pick the correct concrete type.
- **Two separate maps** (Task 02): INPUT `contentTypeId → DtoType` (`[ContentType]` registry) vs
  OUTPUT `DtoType → kind` (`[JsonDerivedType]`). Keep them straight.
- **`rightrail → RightRailDto`** is an **approved deviation** from legacy (legacy returns a buggy
  `FooterDto`). Keep it; it's in the Task 08 allowlist. Do not reproduce the legacy bug.
- **Rich text** must render to **byte-identical HTML** — port `ContentfulRichTextHelper`, don't
  rewrite it. Task 08 diffs the HTML.
- **Caching is fallback-only** (Task 10): fetch live, fire-and-forget write, serve stale only on
  Contentful failure, circuit breaker + single-flight, **preview never cached**.
- **Security:** unknown slug → 404 with no upstream call (Task 11); webhook requires HMAC + secret;
  CORS limited to configured origins; preview restricted to `preview.example.com` (Task 15).
- **No over-engineering.** Implement what the task specifies; don't add fields, endpoints, or
  abstractions beyond it.

## Definition of done (every task)
- `dotnet build` is **clean** (0 warnings) and the task's tests pass.
- Meets the task file's own **Acceptance criteria**.
- For endpoint tasks: Task 08 parity green for that endpoint in **delivery and preview**.
- Follows `.editorconfig`; no secrets in code or config.

## Build / test / run
```powershell
dotnet build
dotnet test
dotnet run --project src/API.Contentful      # GET /Health
```
Test stack: **xUnit + FluentAssertions + Moq** (match the legacy repo).

## Secrets (never commit; never print)
Provide Contentful tokens via user-secrets (local) or env vars / Key Vault (deployed):
```powershell
cd src/API.Contentful
dotnet user-secrets set "CMS:Contentful:SpaceId"       "<space-id>"
dotnet user-secrets set "CMS:Contentful:DeliveryToken" "<delivery-token>"
dotnet user-secrets set "CMS:Contentful:PreviewToken"  "<preview-token>"
```
Env var form: `CMS__Contentful__DeliveryToken`, etc.

## Git workflow
- Branch per task: `feat/task-01-core`, `feat/task-05-blog`, …
- Small, focused commits; conventional messages (`feat:`, `docs:`, `test:`).
- **Do not push, force-push, or open PRs without maintainer confirmation.**

## Verify against reality
Before porting any legacy behaviour, **re-read the actual legacy source** — follow the real code over
any summary, and note discrepancies in your PR. Use the Contentful MCP (space `your-space-id`, env
`Dev`) to confirm content types/fields when building the content-type map.
