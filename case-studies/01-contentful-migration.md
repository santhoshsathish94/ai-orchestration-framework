# 01 — Contentful API Migration: Case Study

**Current CMS API (GraphQL) → Migrated CMS API (REST)** · .NET 9 MVC → .NET 10 Minimal API
**Built entirely by AI, directed and verified by a single engineer.**

## Summary

The CMS content API that powers the company's public website (pages, sections, blog, help center,
glossary) was rewritten from the ground up: from a GraphQL integration against Contentful to a REST (Content
Delivery/Preview API) integration, and from .NET 9 MVC controllers to .NET 10 Minimal APIs. The
public contract — every route, JSON shape, and response envelope — was preserved exactly, so no
consumer (the website, and anything else calling the API) needed to change. Every line of the
rewrite was implemented by AI; a single engineer directed the work, made every judgment call, and
independently verified each result against real, running systems. The whole migration was
completed in about a day and validated against live traffic before a phased cutover.

## Why we migrated

- **The GraphQL integration was heavy and brittle.** ~7,800 lines across 200+ files of hand-written,
  content-type-specific glue — `Gql*` models and converters, a 1,246-line AutoMapper profile, a
  bespoke rich-text link resolver, a dynamic query builder, and 89 `.graphql` query/fragment files —
  all had to be kept in lockstep by hand every time a content type changed.
- **A recent denial-of-service incident** hammered the API with random, invalid slugs; the Current
  CMS API's architecture had no purpose-built defense against that pattern.
- **Caching was a general-purpose layer, not a deliberate safety net.** Contentful's CDN is already
  fast; the cache only needed to exist as a last-known-good fallback for outages, not a read-through
  layer adding its own complexity and staleness risk.
- **Observability was thin** — failures surfaced through customer reports more often than through
  metrics or alerts.
- **The stack was aging.** .NET 9 plus a hand-rolled GraphQL client was slower under load and harder
  to extend than a modern Minimal API stack.
- **A manual rewrite was estimated at 8–10 weeks of team effort.** One engineer wanted to prove
  that AI, doing all of the implementation under close human direction and verification, could
  deliver the same result safely, in a fraction of the time and with no dedicated team.

## What changed

| | Before — Current CMS API | After — Migrated CMS API |
|---|---|---|
| Runtime | .NET 9, MVC controllers | .NET 10, Minimal APIs |
| Contentful access | GraphQL, 89 `.graphql` files, 2–3 round trips | REST Content Delivery/Preview API, 1 fetch + `include` |
| Mapping | 99 `Gql*` models + AutoMapper (85 hand-written maps) | 1 generic, attribute-driven `EntryMapper` (cached plans) |
| Caching | General-purpose cache | Fallback-only (fire-and-forget, circuit breaker, single-flight) |
| Abuse defense | None | Slug allow-list + Contentful webhook (unknown slugs rejected before any Contentful call) |
| Observability | Minimal | OpenTelemetry → Application Insights |
| Public API | 5 endpoint groups, versioned routes | **Identical** — same routes, same JSON, same envelope |

## How we did it

Every task below was implemented by AI. The one engineer involved never wrote migration code by
hand — the role was to set direction, make judgment calls, and independently verify each result
against real, running systems before trusting it.

1. **Locked one non-negotiable rule:** the public contract (routes, DTO shapes, `CMSAPIResponse`
   envelope, JSON casing) could not change. Every other decision was subordinate to this.
2. **Replaced per-type hand-written mapping with one generic engine.** A reflection-based
   `EntryMapper` (compiled plans cached per type) driven entirely by attributes (`[ContentType]`,
   `[ContentfulField]`, `[RichText]`, `[Collection]`, …) replaced the 99 `Gql*` converters and the
   AutoMapper profile — a content-model change is now a DTO-attribute edit, not a new converter.
3. **Broke the rewrite into 15 small, independently-verifiable tasks** (foundation → DTO contracts →
   5 content domains → caching/resilience gateway → DoS allow-list/webhook → observability →
   validation harness → hosting/cutover → performance → payload optimization), each built,
   unit-tested, and merged only after an independent build/test check — never one giant rewrite.
4. **Built an objective parity harness as the real gate for correctness**, not manual review: a live
   differ that called the Current CMS API and the Migrated CMS API side by side for every endpoint,
   plus committed contract-snapshot ("golden JSON") tests. The differ was deliberately
   *additive-tolerant* — a new/added field never fails the check, only a removed or changed value
   does, matching how consumers actually break.
5. **Used that harness to find and fix real bugs before go-live**, for example:
   - Response JSON was briefly camelCase (per the original plan) when the Current CMS API's live
     responses were actually PascalCase with nulls included — caught by diffing real responses, fixed
     everywhere.
   - The new slug allow-list reused the sitemap's narrow 2-content-type list to gate *every* page
     lookup, which would have 404'd the homepage, FAQ, and Help Center landing page in production —
     caught via live testing, fixed to cover all 8 page content types.
   - Search was implemented against Contentful's full-text search, which matched far more broadly
     than the Current CMS API's slug/title/category/tag matching — caught by comparing result counts,
     reimplemented to match its behavior exactly.
6. **Rolled out in reversible stages, not a single cutover:** ran the Migrated CMS API on a preprod
   environment side by side with the Current CMS API on UAT under the same content and traffic
   patterns, registered a second Contentful webhook so both services' allow-lists stayed current
   during the transition, and kept the Current CMS API warm and instantly reinstatable after the flip.
7. **Every judgment call stayed with the engineer, not the AI** — e.g. deciding which live
   differences were acceptable improvements vs. real regressions. Nothing was accepted on the AI's
   word alone: each task's code, tests, and live behavior were independently checked against the
   real, running systems before merging, rather than trusting generated code or documentation at
   face value.

## Results

| Metric | Before | After |
|---|---|---|
| Live parity, Current vs. Migrated CMS API (byte-for-byte) | — | **36/36** endpoint cases (34 exact + 2 explicitly-approved deviations) |
| Endpoint groups verified side-by-side (preprod vs. UAT) | — | **15/15**, zero errors, zero customer-visible differences |
| Automated tests | — | **239/239** passing (220 unit + 19 contract-snapshot), 0 build warnings |
| Security scan | — | 0 vulnerable dependencies, 0 hardcoded secrets, OWASP Top 10 clean |
| Throughput @ 40 concurrent users | 7.6 req/s | **48 req/s (~6×)** |
| Help Center listing, under load | 5.6 s | **345 ms (16× faster)** |
| Blog listing, under load | 12.9 s | **1.9 s (6.8× faster)** |
| Typical content page, under load | 667 ms | **189 ms (3.5× faster)** |
| Invalid / unknown-slug requests | ~70 ms (still reached Contentful) | **~8 ms**, rejected before any Contentful call |
| Response payload size | baseline JSON | **~63% smaller on average** (Brotli; up to 85% on the largest page) |
| Delivery time | ~8–10 weeks (team estimate) | **~1 day** — built by AI, directed by one engineer |

## Key takeaways

- **An automated, additive-tolerant parity harness — not manual review — is what made "byte-for-byte
  compatible" a provable claim.** It caught every real regression before customers could.
- **Decoupling the wire contract from the source system** (DTOs plus mapping attributes, independent
  of Contentful's field names) means future content-model changes are a small, low-risk edit instead
  of a new hand-written converter.
- **Small, independently-verifiable steps with a hard build/test gate at each merge** made it safe
  for AI to do all of the implementation quickly, with a single engineer directing and verifying
  rather than writing code by hand.
- **One engineer plus AI replaced what the internal estimate assumed would need a multi-person
  team.** The limiting factor was having an objective way to verify AI-generated changes, not
  engineering headcount.
- **A staged, reversible cutover** (shadow run → dual webhook → gradual flip → warm rollback target)
  meant the migration only ever carried as much production risk as each stage's own evidence justified.
- The full history is traceable commit-by-commit in this repository's git log.
