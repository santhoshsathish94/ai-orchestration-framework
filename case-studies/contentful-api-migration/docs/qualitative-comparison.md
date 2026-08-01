# Qualitative / maintainability comparison — legacy vs new (Task 13, deliverable 2)

Real, computed numbers — no live infra needed. Reproducible via
[`../tools/count-legacy-graphql-loc.ps1`](../tools/count-legacy-graphql-loc.ps1) and
[`../tools/count-projects.ps1`](../tools/count-projects.ps1). All figures below were generated on
2026-07-29 against `c:\repos\legacy-repo\Legacy.CMS\Legacy.CMS` (legacy) and this repo (new).

## 1. GraphQL-specific code removed

Legacy code with **no equivalent at all** in the new (REST) repo: the `Gql*.cs` DTO/converter layer,
the raw GraphQL client plumbing, every `.graphql` query/fragment file, the AutoMapper profile that
wired `Gql*` → domain DTOs, the rich-text link-resolution service, and the dynamic GraphQL query
builder.

| Item | Path (legacy) | Files | Lines |
|---|---|---:|---:|
| `Gql*.cs` models/converters + `GraphQlClient`/`GraphQlEnvelope`/`GraphQLRequest` + `RichTextLinkResolution` | `Infrastructure/Legacy.CMS.Infrastructure/Providers/Contentful/GraphQL/` | — | — |
| All `.graphql` query/fragment files | `.../Providers/Contentful/GraphQLQueries/` | — | — |
| *(both folders above, combined — see command)* | | **204** | **6,242** |
| `ContentMappingProfile.cs` (AutoMapper: `Gql*` → domain DTOs) | `Infrastructure/Legacy.CMS.Infrastructure/ContentMappingProfile.cs` | 1 | 1,246 |
| `RichTextLinkService.cs` | `.../Providers/Contentful/Services/RichTextLinkService.cs` | 1 | 90 |
| `DynamicQueryBuilder.cs` | `.../Providers/DynamicQueryBuilder.cs` | 1 | 270 |
| **Total** | | **207** | **7,848** |

Command used (PowerShell, real `Get-ChildItem`/`Get-Content`/`Measure-Object`, not an estimate):

```powershell
tools/count-legacy-graphql-loc.ps1
```

The new repo has **zero** files of any of these kinds — no `Gql*` types, no `.graphql` files, no
AutoMapper, no bespoke GraphQL client, no dynamic query builder. Mapping is done by a small generic
`EntryMapper` driven by attributes on the (copied-verbatim) DTOs (Task 01/02) — see
[`src/API.Contentful.Infrastructure/Mapping/`](../src/API.Contentful.Infrastructure/Mapping/).

This is **not** the new repo's *entire* infrastructure layer being smaller — it is the specific
GraphQL-shaped machinery (per-content-type DTOs + hand-rolled converters + a 1,246-line mapping
profile + `.graphql` query files that all had to stay in lockstep with each other) that has no
equivalent because the generic mapper + REST Delivery API `include=N` model replaces the whole
category of problem, not just one file.

## 2. Project count

| Repo | Projects | Breakdown |
|---|---:|---|
| Legacy (`Legacy.CMS`) | **6** | `Core/Legacy.CMS.Application`, `Core/Legacy.CMS.Domain`, `Infrastructure/Legacy.CMS.Infrastructure`, `Presentation/Legacy.CMS`, `Legacy.CMS.CacheRepository`, `UnitTest/Legacy.CMS.UnitTest` |
| New (`API.Contentful`) | **6** | `src/API.Contentful` (host), `src/API.Contentful.Contracts`, `src/API.Contentful.Infrastructure`, `test/API.Contentful.UnitTests`, `test/API.Contentful.ParityTests`, `benchmarks/API.Contentful.Benchmarks` |

Command used: `tools/count-projects.ps1` (`Get-ChildItem -Recurse -Filter *.csproj`).

**Honest finding:** the raw project *count* is a wash (6 vs 6) — the task doc's own guess of "3" for
the new repo undercounted once test + benchmark projects are included, and legacy's project count
isn't inflated either. The real "cleaner/lighter" story is in **§1 above** (composition, not count):
legacy's `Infrastructure` project alone contains 204 GraphQL-specific files (6,242 lines) that the new
`Infrastructure` project has no equivalent of at all, plus a separate 1,246-line mapping profile,
90-line rich-text link service, and 270-line dynamic query builder that also have no counterpart.

## 3. Build & test timing

Both measured from a clean state (`dotnet clean` immediately before `dotnet build`), same machine,
same .NET SDK (10.0.301), same session.

| | Legacy (`Legacy.CMS.sln`) | New (`API.Contentful.slnx`) |
|---|---|---|
| `dotnet build` (from clean) | **6.06s** — succeeded, 18 warnings (all `NU1900`/`NU1903`: the sandbox can't reach the org's private NuGet feed's vulnerability-advisory endpoint, and one real advisory for `Microsoft.OpenApi` 2.0.0 — these are NuGet/network warnings, not code warnings), 0 errors | **5.44s** — succeeded, **0 warnings**, 0 errors |
| `dotnet test` | **14.92s** wall (includes implicit build) — **230/230 passed**, 0 failed, 0 skipped (`Legacy.CMS.UnitTest`, 6s actual test execution) | **8.79s** wall (includes implicit build) — **240/276 passed**, 0 failed, 36 skipped (221 `UnitTests` + 19/55 `ParityTests`; the 36 skipped are the live old-vs-new diff cases that need a live legacy+new deployment, see [Task 08](../docs/rest-migration/08-validation-harness.md)) |

Both builds/test runs are fast enough on this warm, cached-package dev machine that build/test
*speed* is not a meaningful differentiator either way — both are single-digit-seconds. The one build
metric that **is** a real, non-cosmetic difference: the new repo produces **zero** warnings of any
kind, while legacy's `Microsoft.OpenApi` 2.0.0 dependency has a real, currently-unresolved high
severity advisory ([GHSA-v5pm-xwqc-g5wc](https://github.com/advisories/GHSA-v5pm-xwqc-g5wc)).

## 4. In-process mapping/serialization cost (new repo only — see `../benchmarks/README.md`)

The new repo's `EntryMapper.Map` + JSON serialization of one representative page graph measures
**~21.2 μs / ~17.6 KB allocated** per request (real BenchmarkDotNet run, not estimated — see
[`../benchmarks/README.md`](../benchmarks/README.md) for the full table). There is no legacy
equivalent measurement here — instrumenting the legacy AutoMapper + GraphQL-envelope-parsing path
in isolation was out of scope for this task (it would need its own benchmark harness inside the
legacy repo, which is reference/source-of-truth-only per `AGENTS.md`). This number is included here
only to make clear that in-process mapping cost is negligible either way relative to a live
Contentful network call, not as an old-vs-new delta.

## What this does *not* cover

Runtime performance under load (latency/throughput/payload-over-the-wire/Contentful call
amplification/resilience under outage) needs both services actually deployed and reachable — see
[`../loadtest/README.md`](../loadtest/README.md) for exactly why that could not be executed in this
sandbox, and [`../docs/comparison-report.html`](../docs/comparison-report.html) for how those metrics
are explicitly marked `NOT YET MEASURED` rather than invented.
