# 01 — Foundation & generic core

**Objective.** Scaffold the .NET 10 solution and build the generic Contentful-REST mapping core that
every domain task plugs into: keyed HTTP clients, link-stitching resolver, the reflection-based
`EntryMapper` (with cached compiled plans), the ported rich-text renderer, config, and DI.

**Depends on:** 00. **Parallel with:** 02 (agree the attribute API + registry interface early).

**Reference (old repo):** `c:\repos\legacy-repo\Legacy.CMS\Legacy.CMS` —
`Infrastructure/.../Providers/Contentful/ContentfulContentProvider.cs`, `ContentfulOptions.cs`,
`Services/RichTextLinkService.cs`, `Helpers/HtmlHelper.cs` + `ContentfulRichTextHelper`,
`ContentfulRichTextLinkIdExtractor`, and `Core/Application/Interface/IContentProvider.cs`.

---

## Deliverables

### 1. Solution & projects (.NET 10)
Create the slim structure from [00 §3](00-overview.md#3-solution-structure-slim--3-projects--tests):
`src/API.Contentful.Contracts`, `src/API.Contentful.Infrastructure`, `src/API.Contentful`,
`test/API.Contentful.UnitTests`, `test/API.Contentful.ParityTests`.
- `TargetFramework net10.0`, `Nullable enable`, `ImplicitUsings enable`, latest LangVersion.
- This task delivers `API.Contentful.Infrastructure` core + the shared `ContentfulOptions`. `Contracts` is
  Task 02; the API host is Task 09.

### 2. `ContentfulOptions`
Match [00 §12](00-overview.md#12-config-keys): `SpaceId`, `Environment`, `DeliveryToken`,
`PreviewToken`, `BaseDeliveryUrl`, `BasePreviewUrl`, `MaxInclude` (10), `RequestTimeoutSeconds` (3).
Bind from `CMS:Contentful`.

### 3. `ContentfulRestClient` (keyed delivery/preview clients)
- Register two named/keyed `HttpClient`s: `contentful-rest-delivery` (base `cdn.` + delivery token)
  and `contentful-rest-preview` (base `preview.` + preview token). Use **keyed DI** (.NET 8+) to
  select by `preview` flag.
- Attach the **standard resilience handler** (`Microsoft.Extensions.Http.Resilience`:
  `AddStandardResilienceHandler`) tuned with the total request timeout, a small retry (idempotent
  GETs only), and a circuit breaker. (The higher-level fallback-to-cache lives in Task 10's gateway;
  this handler covers transient transport faults.)
- `Task<JsonDocument> GetEntriesAsync(string contentType, IReadOnlyDictionary<string,string?> query, bool preview, CancellationToken ct)`
  builds `/spaces/{space}/environments/{env}/entries?content_type=...&include={MaxInclude}&...`,
  URL-encoding all values. `EnsureSuccessStatusCode`; on non-success, surface the Contentful error
  body in the exception for diagnosability.

### 4. `EntryGraphResolver` (replaces GraphQL auto-resolution + `RichTextLinkService`)
- Build `id → entry` and `id → asset` lookups from `items + includes.Entry + includes.Asset`.
- `ResolvedEntry` nodes expose `ContentTypeId` (`sys.contentType.sys.id`), `Sys` (id + available
  dates), and field access that resolves links **on demand**: link → `ResolvedEntry`/asset (or null),
  array-of-links → `IReadOnlyList<ResolvedEntry>` (skip unresolved), scalar/rich-text/object → raw
  `JsonElement`.
- **Cycle guard + max depth**; never throw on a missing/deep-truncated include (return null/empty).
- Rich-text link resolution: given a rich-text `JsonElement`, collect embedded entry/asset ids
  (port `ContentfulRichTextLinkIdExtractor`) and return a `RichTextLinkResolution` from the includes.

### 5. `RichTextRenderer` (port verbatim)
- Copy `ContentfulRichTextHelper` (+ helpers) and the `RichTextLinkResolution` container from the old
  Infrastructure. Populate the resolution from includes (Task 4 above), **not** a GraphQL call.
- Surface `string? Render(JsonElement doc, RichTextLinkResolution resolution)`; preserve old
  null/empty handling exactly (`HtmlHelper.GetHtml` behaviour). Task 08 diffs the HTML.

### 6. `EntryMapper` — generic engine with **cached compiled plans**
`object? Map(ResolvedEntry entry, Type dtoType, MapContext ctx)` + `List<T> MapMany<T>(...)`.
- On first use of a `Type`, build a **`MappingPlan`** (list of compiled property setters + source
  rules from the Task 02 attributes) and **cache it** (`ConcurrentDictionary<Type, MappingPlan>`).
  Prefer compiled expressions/delegates over per-call reflection for speed.
- Rules (attributes defined in Task 02): default source id = camelCase(prop); `[ContentfulField]`
  override; `[RichText]` → `RichTextRenderer.Render`; scalars converted from `JsonElement`;
  complex/`[ContentType]` props → recurse via linked `ResolvedEntry`; polymorphic
  `ISection`/`ICard`/`IMedia` → registry lookup by `ContentTypeId`; `[Collection]` → `List<T>`;
  `[ProjectFrom("path.sub")]`; `[MapEach("path.sub")]` → `List<string>`; built-in asset/image
  flattening. Respect `MappingOptions:MaxDepth`. Unknown/missing → DTO default (never throw).

### 7. `IContentTypeRegistry`
`contentTypeId → DTO Type`, built at startup by scanning the `Contracts` assembly for
`[ContentType(...)]` (Task 02). Expose lookup by content-type id and by old `kind` for debugging.

### 8. `IContentProvider` + `ContentfulRestContentProvider`
Copy the `IContentProvider` interface (same operations as old) into `API.Contentful.Infrastructure`. Implement
the class shell (inject client, resolver, mapper, registry, logger); each method throws
`NotImplementedException` — domain tasks 03–07 fill them in. (Task 10 wraps this provider in the
`IContentGateway`; do not add caching here.)

### 9. DI extension
`AddContentfulRest(IServiceCollection, IConfiguration)` registers options, keyed clients + resilience,
resolver, mapper, registry, rich-text renderer, and `ContentfulRestContentProvider` as
`IContentProvider`. No AutoMapper, no GraphQL services.

---

## Acceptance criteria
- Solution builds clean on .NET 10.
- Unit test (no live Contentful): feed canned CDA JSON (nested link, array-of-links, asset, rich text
  with embedded entry, and a self-reference cycle) through `EntryGraphResolver` + `EntryMapper` for a
  sample DTO; assert links resolved, array mapped, asset flattened, rich text rendered, cycle safe.
- `RichTextRenderer` output matches old `HtmlHelper.GetHtml` for a shared fixture doc.
- `MappingPlan` cache proven (same `Type` mapped twice builds the plan once).

## Out of scope
- Endpoint logic (03–07), caching/resilience gateway (10), host/Program (09).

## Note
Re-read the actual old source before porting any piece; follow the real code over this summary and
flag discrepancies in your PR.
