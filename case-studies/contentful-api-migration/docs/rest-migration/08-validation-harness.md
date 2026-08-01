# 08 — Validation harness (contract parity)

**Objective.** Prove the new service returns responses **identical** to the old service for every
endpoint, in both delivery and preview. Because the presentation/service layers are **rewritten**
(Minimal APIs + resilient gateway, not copied verbatim), this harness — not "identical-by-copy" — is
the primary contract safety net. Build it early (skeleton after Task 01/02) and grow it as domain
tasks land.

**Depends on:** 01, 02 (then tracks 03–07). **Blocks:** cutover (Task 09).

---

## Approach: live side-by-side diff (chosen by product owner)
Run **both** services against the **same** Contentful space/environment and diff the JSON.

### 1. Test project `API.Contentful.ParityTests`
- xUnit. Config: `OldBaseUrl`, `NewBaseUrl`, preview API key/header, Contentful space/env. Read from
  env vars / user-secrets; never hardcode tokens.
- An HTTP fixture that GETs the same path from both base URLs with the same headers.

### 2. Endpoint cases (data-driven)
One theory row per endpoint × scenario. Cover, at minimum:
- **Page**: one slug per page content type (landing/product/home/glossary/faq/helpCenter/rightRail/
  discover); `/Page/slugs`; not-found; preview vs delivery.
- **Section**: header, footer, rightrail; preview; and the failure→default-JSON fallback.
- **Blog**: slug (with related/recent); category; tag; author; search; search+category; recent;
  index (`getBlogs`); list; empty-result & page-2 variants.
- **Help Center**: article by slug; by category; by tag; by search; list; empty & paged.
- **Glossary**: list default; paged; invalid args (BadRequest).
Maintain a small **fixtures file** of known slugs/categories/tags/authors that exist in the env.

### 3. The diff
- Parse both responses as `JsonNode`/`JObject`; **normalize then compare**:
  - Compare `CMSAPIResponse.StatusCode`, `Error`, and `Data`.
  - Canonicalize object key order (sort keys) before comparing.
  - **Order-sensitive** for arrays that are semantically ordered (sections, blog lists) — these must
    match order exactly. **Order-insensitive** only for `/Page/slugs` (a set) and any dictionary.
  - Treat `null` vs absent per the app's `WhenWritingNull` policy (both omit nulls — so a present-vs-
    absent key **is** a real diff; do not paper over it).
  - **Polymorphic `kind` discriminators** (from `[JsonDerivedType]`) must match exactly for every
    section/card — including the quirky ones (`legalSection`, `speackerSchedule`, `fulcrumWidget`,
    `Table`…). A wrong/missing `kind` means the mapper picked the wrong concrete type.
- On mismatch, emit a readable diff (JSON pointer path + old vs new value) to the test output and a
  `artifacts/diff/{endpoint}.txt` file.

### 4. Known-difference allowlist (must stay empty at cutover — except approved deviations)
- If a diff is a **known, accepted** semantic difference (e.g. a `sys` date field CDA cannot
  reproduce identically — see Task 02 §5), record it in `allowlist.md` with justification and a
  narrowly-scoped matcher. **Every** allowlist entry needs product sign-off. Target: zero entries.
- **Pre-approved deviation:** `GET /Section?type=rightrail` — old returns a (buggy) `FooterDto`
  shape; new returns the correct `RightRailDto` (see Task 04). The matcher must assert the **new**
  shape is `RightRailDto`, not diff it against old. Signed off 2026-07-29.

### 5. Rich-text HTML parity
Rich-text fields are rendered HTML strings — compare them **as exact strings** (post key-sort).
Whitespace/attribute-order differences count as failures; fix the renderer/port, don't loosen the
test. Add a focused fixture-based unit test comparing `RichTextRenderer` output to old `HtmlHelper`
output for a document containing every node type (headings, lists, table, hr, blockquote, embedded
entry block/inline, embedded asset, entry/asset/url hyperlinks).

### 6. Contract-snapshot guardrails (protect the contract over time)
Beyond old-vs-new parity, add **snapshot tests** that freeze each endpoint's JSON shape:
- For each endpoint, capture a canonical sample response (keys sorted, values normalized/redacted)
  into `test/__snapshots__/{endpoint}.json`, committed to the repo.
- A test re-serializes a representative response and diffs against the snapshot; CI **fails** on any
  shape change until the snapshot is intentionally regenerated and reviewed. This is the gate that
  lets DTOs evolve safely (Task 02 §6) — you cannot change the wire shape by accident.
- These run **without** the old service (they only need the new one + fixtures), so they stay in CI
  after the old service is retired.

---

## Acceptance criteria
- Harness runs against both services from a single command; produces a pass/fail summary + diffs.
- All endpoint cases green with an **empty** allowlist (or fully justified & signed-off entries).
- CI-runnable (given creds) and documented in `API.Contentful.ParityTests/README.md`.

## Out of scope
- Load/perf testing. Contract changes (there are none).
