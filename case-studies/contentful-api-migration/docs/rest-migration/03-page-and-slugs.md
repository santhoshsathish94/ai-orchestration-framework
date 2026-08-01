# 03 — Page endpoints + slugs

**Objective.** Implement `GetPageBySlugAsync` and `GetAllPageSlugsAsync` on
`ContentfulRestContentProvider`, producing `PageDto` identical to the old GraphQL output — including
all polymorphic sections and SEO — using a **single** REST call per page (no lite+dynamic two-step).

**Depends on:** 01, 02. **Parallel with:** 04–07.

**Reference (old repo):**
- `ContentfulContentProvider.GetPageBySlugAsync` / `GetAllPageSlugsAsync` / `GetSectionByTypeAsync`.
- `DynamicQueryBuilder.cs`, `GraphQLQueries/{landingPage,productPage,homePage,glossaryPage,faqPage,
  helpcenterPage,rightrailPage,productPage}Collection.graphql`, `detectcollection.graphql`.
- `Dtos/PageDto.cs`, `Enums/DetectedType`, `GetDetectedType(...)` switch in the old provider.

---

## Background: page types
The old code detects one of these page content types by probing collections, then maps to `PageDto`
with `PageType = <detectedType>`:
`landingPage, productPage, homePage, glossaryPage, faqPage, helpCenterPage, rightRailPage,
discoverPage`. All map to the **same `PageDto`** (slug, title, seo, legalese, `Sections`).

## Deliverables

### 1. `GetPageBySlugAsync(slug, isPreview, ct)`
Old flow = fetch "lite" page → detect type → build dynamic query by section types → fetch → map.
**New flow (simpler):**
1. Find which page content type owns the slug. Options (pick the cheapest that stays correct):
   - Query each candidate page content type `?fields.slug={slug}&limit=1&include=0` until one hits; or
   - A single `?fields.slug={slug}` across entries then read `sys.contentType.sys.id` (verify a
     slug is unique across page types — old code assumed one match).
2. Re-fetch that entry with `include={MaxInclude}` (or reuse if the first call already had includes).
3. `EntryGraphResolver` stitches the graph; `EntryMapper.Map(entry, typeof(PageDto), ctx)` produces
   the DTO. `Sections` is a `List<ISection>` populated polymorphically via the registry from
   `sectionsCollection`/`sections` field.
4. Set `page.PageType = <contentTypeId or old detectedType string>` — **match the old casing**
   (old sets `detectedType` like `"landingPage"`). Verify exact value per type in Task 08.
5. Rich text (title, section fields, legalese) rendered from the same `includes` — no 2nd call.
6. Not found → throw the same `ContentNotFoundException` semantics the old code used
   (`"Entry not found." | "Entry not published."` depending on `isPreview`).

> The `include=10` cap: if any page nests sections/cards deeper than 10 levels, add a targeted
> second fetch for the truncated ids (rare). Detect unresolved links in the resolver and log.

### 2. `GetAllPageSlugsAsync(ct)`
Old query `AllPageSlugs` returns slugs across page collections (LandingPage + ProductPage per old
docs — **verify** which collections). REST equivalent: for each relevant page content type,
`GET /entries?content_type={id}&select=fields.slug&limit=1000&include=0`, page through with `skip`
until `total` exhausted, union slugs into a case-insensitive `HashSet<string>`. Return the set.

### 3. Endpoints (Minimal API group)
Define a `Page` route group with `GET /Page?slug=&isPreview=` and `GET /Page/slugs`. The group is
protected by the preview policy; `/Page/slugs` is **anonymous**. Endpoints call `IContentGateway`
(Task 10), not the provider directly, so slug allow-list + fallback caching apply. `/Page?slug=`
is a slug route → gateway consults the allow-list (Task 11) before fetching.

---

## Acceptance criteria
- For a representative slug of **each** page content type (landing/product/home/glossary/faq/
  helpCenter/rightRail/discover), the `PageDto` JSON equals the old service byte-for-byte
  (Task 08 parity), in both delivery and preview.
- `PageType` value matches old exactly for every type.
- `/Page/slugs` returns the same set (order-insensitive) as old.
- Not-found and not-published cases return the same status/error as old.

## Out of scope
- Section-by-type endpoint (Task 04). Blog index reuse of pages (Task 05 calls this provider method).
