# 01 — Contentful API Migration: Case Study

**Current CMS API (GraphQL) → Migrated CMS API (REST)** · .NET 9 MVC → .NET 10 Minimal API
**A large migration made far more achievable — and much faster — with AI.**

## Summary

The CMS content API that powers the company's public website (pages, sections, blog, help center,
glossary) was rewritten from the ground up: from a GraphQL integration against Contentful to a REST (Content
Delivery/Preview API) integration, and from .NET 9 MVC controllers to .NET 10 Minimal APIs. The
public contract — every route, JSON shape, and response envelope — was preserved exactly, so no
consumer (the website, and anything else calling the API) needed to change. AI carried most of the
rewrite; the work still needed human judgment to set direction and to independently verify each
result against real, running systems. What stands out is not who wrote the code — it is how much AI
lowered the barrier: the whole migration was completed in about a day and parity-validated
byte-for-byte against live traffic in preprod.

> **Evidence reached: rung 4 — measured before and after.** The production cutover has not yet run,
> so nothing here claims rung 5. The staged rollout below is the plan the evidence supports, not a
> sequence that has already executed.

## Contentful migration model

![Content Migration Model](../assets/contentful-migration.png)

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
- **A manual rewrite was estimated at 8–10 weeks of team effort.** The goal was to see whether AI,
  handling the implementation under close human direction and verification, could deliver the same
  result safely in a fraction of the time — lowering the barrier to the work, not proving any one
  person's or tool's prowess.

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

AI carried most of the implementation below; the work still needed human judgment to set direction,
make the calls, and independently verify each result against real, running systems before trusting
it. The takeaway is not the split of labor — it is that AI made a migration this size approachable in
a fraction of the usual effort.

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
6. **Planned the rollout in reversible stages, not a single cutover:** ran the Migrated CMS API on a preprod
   environment side by side with the Current CMS API on UAT under the same content and traffic
   patterns, registered a second Contentful webhook so both services' allow-lists stayed current
   during the transition, and kept the Current CMS API warm and instantly reinstatable for the flip.
   The flip itself has not yet been performed.
7. **Judgment stayed human** — e.g. deciding which live differences were acceptable improvements vs.
   real regressions. Nothing was accepted on the AI's word alone: each task's code, tests, and live
   behavior were independently checked against the real, running systems before merging, rather than
   trusting generated code or documentation at face value.

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
| Delivery time | ~8–10 weeks (team estimate) | **~1 day** — AI carried the implementation, with human direction and verification |

## Key takeaways

- **An automated, additive-tolerant parity harness — not manual review — is what made "byte-for-byte
  compatible" a provable claim.** It caught every real regression before customers could.
- **Decoupling the wire contract from the source system** (DTOs plus mapping attributes, independent
  of Contentful's field names) means future content-model changes are a small, low-risk edit instead
  of a new hand-written converter.
- **Small, independently-verifiable steps with a hard build/test gate at each merge** are what let
  AI carry the implementation quickly and safely, with people directing and verifying rather than
  writing the code by hand.
- **AI made this achievable with far less effort than the internal multi-week, multi-person estimate
  assumed.** The limiting factor was having an objective way to verify the changes, not engineering
  headcount — AI lowered the barrier; the parity harness kept it safe.
- **A staged, reversible cutover** (shadow run → dual webhook → gradual flip → warm rollback target)
  means the migration will only ever carry as much production risk as each stage's own evidence justifies.
- The full history is traceable commit-by-commit in this repository's git log.
