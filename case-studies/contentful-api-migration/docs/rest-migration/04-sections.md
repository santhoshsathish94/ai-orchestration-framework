# 04 — Section endpoints (header / footer / right rail)

**Objective.** Implement `GetSectionByTypeAsync(type, isPreview, ct)` returning the singleton
sections that have no slug (`header`, `footer`, `rightrail`), matching old output, including the
JSON-file fallback behaviour on failure.

**Depends on:** 01, 02. **Parallel with:** 03, 05–07.

**Reference (old repo):**
- `ContentfulContentProvider.GetSectionByTypeAsync` (note its `type→collection` quirks).
- `GraphQLQueries/{headerNavigation,footer,rightRail}.graphql`.
- `ContentService.GetSectionAsync` (fallback to `Defaults/Json/{type}Collection.json` on error).
- DTOs: `HeaderDto`, `FooterDto`, `RightRailDto` and their nested nav/link DTOs.

---

## Deliverables

### 1. `GetSectionByTypeAsync`
Old logic maps `type` → a Contentful collection and a DTO:
- `header` → content type **`headerNavigation`** → `HeaderDto` (note the id≠type name).
- `footer` → `footer` → `FooterDto`.
- `rightrail` → `rightRail` → **`RightRailDto`**.

> ⚠️ **Intentional deviation from old (approved).** The old service has a bug: it maps `rightrail`
> to `FooterDto`, so its `rightrail` response is wrong-shaped. Per product decision (2026-07-29) we
> **do not reproduce the bug** — the new service returns the correct `RightRailDto`. This is the one
> endpoint whose output intentionally differs from old; it is recorded in the Task 08 allowlist so
> parity does not flag it. The existing repo is **not** changed.

Implementation:
1. Resolve `type` (case-insensitive) → `{ contentTypeId, dtoType }` via a small switch/registry.
2. `GET /entries?content_type={id}&include={MaxInclude}&limit=1` (delivery/preview by flag).
3. Resolve + `EntryMapper.Map(item, dtoType, ctx)`; return the DTO (as `object?`).
4. Empty collection → return `null` (endpoint emits the same NotFound contract).
5. Preserve the old `ToPascalCase`/reflection-based type discovery **only if** needed; a direct
   switch for the 3 known types is simpler and sufficient — keep it minimal.

### 2. Default-JSON fallback (moves into the gateway/endpoint)
Old `ContentService.GetSectionAsync` loaded `Defaults/Json/{type}Collection.json` when the provider
threw for `header`/`footer`. Reproduce this as a **section-specific fallback** in the `Section`
endpoint / gateway path: on provider failure for `header`/`footer`, return the bundled default JSON.
**Copy the `Defaults/Json/*` files** into `API.Contentful`. Section cache key/duration are handled by
the gateway (Task 10) — keep the same logical key (`section:{type}:{isPreview}`) and behaviour.

---

## Acceptance criteria
- `GET /Section?type=header|footer|rightrail` responses equal old byte-for-byte (delivery+preview).
- Missing collection → same NotFound contract.
- Simulated provider failure for `header`/`footer` returns the same default JSON as old.

## Out of scope
- Page sections (Task 03). Any section type that only appears embedded in pages (handled by the
  generic mapper via the registry, exercised through Task 03).
