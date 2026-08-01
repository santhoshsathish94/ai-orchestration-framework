# 02 — DTO contract port + mapping conventions

**Objective.** Bring the DTOs across into the `API.Contentful.Contracts` project as the frozen contract,
define the mapping-attribute vocabulary the `EntryMapper` consumes, annotate every DTO so the generic
mapper reproduces the old AutoMapper output field-for-field, and set up the DTO-evolution guardrails.
Also build the authoritative `contentType → DtoType` registry.

**Depends on:** 00. **Parallel with:** 01 (agree the attribute API + registry interface early).

**Reference (old repo):**
- DTOs: `Core/Legacy.CMS.Application/Dtos/*` (≈90 files).
- Interfaces: `Core/Legacy.CMS.Application/Interface/{ISection,ICard,IMedia,IRichTextEntry}.cs`.
- **The source of truth for every field rule:** `Infrastructure/.../ContentMappingProfile.cs`
  (~900 lines) and the polymorphic converters
  `Infrastructure/.../GraphQL/GqlSectionConverter.cs`, `GqlCardConverter.cs`,
  `GqlCardFactory.cs`, `GqlMediaFactory.cs`.

---

## Deliverables

### 1. Copy DTOs & DTO-facing interfaces into `API.Contentful.Contracts`
- Copy all `*Dto` classes and `ISection`/`ICard`/`IMedia`/`IRichTextEntry` into
  `src/API.Contentful.Contracts`. Keep **class names, property names, and nullability exactly** — they are
  the serialized wire contract. The **namespace changes** to `API.Contentful.Contracts.*` (namespace does
  not affect JSON output); update `using`s accordingly across the new solution.
- Do **not** copy any `Gql*` type. Do not add/remove properties in this task.
- The `Contracts` project is the ONLY place the wire shape is defined; nothing else may add fields
  to responses.

### 2. Define the mapping attributes
Define the attributes in `API.Contentful.Contracts` (co-located with the DTOs so annotations travel with
the contract):

| Attribute | Applies to | Meaning |
|---|---|---|
| `[ContentType("heroSection")]` | class | Registers this DTO for polymorphic resolution & default content type. |
| `[ContentfulField("id")]` | property | Override source field id (default = camelCase of prop name). |
| `[RichText]` | `string?` property | Render the source rich-text field to HTML via `RichTextRenderer`. |
| `[Collection("fieldId")]` | `List<T>` property | Source is an array-of-links (old `xxxCollection.items`). |
| `[ProjectFrom("path.sub")]` | scalar property | Follow a link path, read a scalar (e.g. `category.categoryName`). |
| `[MapEach("path.sub")]` | `List<string>` property | Array-of-links → list of a sub-field (e.g. `tags[].tagName`). |
| `[AssetFlatten]` / handled by built-in | asset/image DTO | Flatten `file.url`, `file.details.image.{w,h}`, title/description. |
| `[Ignore]` | property | Never populated by the mapper (set elsewhere in provider, e.g. `PageType`). |

Keep the set **minimal**; add an attribute only when a real DTO needs it. Prefer conventions over
attributes (a plain `string Title` with no attribute just reads `fields.title`).

### 3. Build the authoritative content-type → `kind`/DTO map
This is the highest-risk correctness item. Do it methodically:
1. Extract every `kind` case and its target DTO from `GqlSectionConverter` and `GqlCardConverter`
   (the old repo lists them explicitly — ~50 sections + ~11 cards).
2. For each, determine the **real Contentful content-type id** (use the Contentful MCP
   `get_content_type`/`list_content_types`, space `your-space-id` env `Dev`, or CDA). Most are
   `camelCase(kind)`; **record every exception**.
3. Annotate each concrete DTO with `[ContentType("<realId>")]`.
4. Produce a checked-in table `content-type-map.md` (id ↔ kind ↔ DTO) for reviewers and Task 08.

> Known items to verify explicitly (do not assume): `Table`→`table`?, `HelpCenterCategoryList`
> (converter `kind` is `HelpCenterCategoryList` but DTO is `HelpCenterCategoryListSectionDto`),
> `ListCard`→`GqlListCardPageSection`/`ListCardDto`, `PillNavigation` vs `PillNavigationSection`,
> `RightRail*` family, `AuctionEvent` vs `AuctionEventSection`, and any `Gql*` whose `kind` alias
> differs from the type name.

> ⚠️ **Two independent "kind" mappings — keep them separate:**
> 1. **INPUT:** Contentful `sys.contentType.sys.id` → concrete DTO type. This is the `[ContentType]`
>    registry the `EntryMapper` uses to pick the type. (e.g. content-type `table` → `TableSectionDto`.)
> 2. **OUTPUT:** concrete DTO type → the `kind` value in the JSON, emitted by STJ from the
>    **`[JsonPolymorphic(TypeDiscriminatorPropertyName = "Kind")]` + `[JsonDerivedType(..., "X")]`**
>    attributes already on `ISection`/`ICard`. These discriminators are **contract** and include
>    quirky spellings/casing that MUST be preserved verbatim: `legalSection`, `speackerSchedule`
>    (sic), `fulcrumWidget`, `stackedCardsSection`, `Table`, etc.
>
> Because DTOs (and these attributes) are **copied verbatim**, the output `kind` is correct by
> construction — STJ emits it; the mapper does **not** need to populate the `Kind` property (STJ owns
> that slot). Your only job is (1): pick the right concrete type. Do **not** "fix" the quirky
> discriminators — that would break the contract. Task 08 diffs them.

### 4. Encode the non-trivial per-field rules
Port **every** special case from `ContentMappingProfile`. Walk the profile top to bottom; for each
`CreateMap<Gql*, *Dto>()` reproduce its `ForMember`/`MapRichText`/`AfterMap` behaviour via
conventions/attributes (or a small custom converter when an attribute can't express it). Known
non-trivial cases (non-exhaustive — audit the full profile):
- **Image / ImageCard**: `url/width/height/description` from `imageUpload`(GraphQL) → in REST from
  the linked `image` entry's `imageUpload` asset **or** the asset `file` — confirm which; plus
  `altText`, `caption` (`[RichText]`), `captionPosition`, `imageAnchorUrl`→`anchorUrl`,
  `isImageAnchorUrlOpensInNewTab`→`isAnchorUrlOpeninNewTab`, `imageShadow`.
- **Asset**: `url/width/height/description` + `kind`.
- **Background**: `backgroundImage` built via media factory (image|video); flags
  `isDarkMode/isDecorativeLines/isFullWidth`.
- **Media polymorphism**: `image` vs `video` → `IMedia`/`MediaDto` (old `GqlMediaFactory`).
- **CTA**: `buttonText` `[RichText]`, `url`, `ctaType`, `isOpenInNewTab/isOpenInPopUp/isRequireLogin`, `kind`.
- **BlogPostCard**: `id` from `sys.id`; `title`/`excerpt` `[RichText]`; `category`→string via
  `category.categoryName`; `tags`→`List<string>` via `tags[].tagName`; `heroImage` via media
  factory; `createdAt`=`sys.firstPublishedAt`, `updatedAt`=`sys.publishedAt`.
- **Testimonial**: `image` mapped from an asset **collection** (list) → single/list per DTO shape.
- **Text/MarketShowcase cards**: `heading`/`description` `[RichText]`, `background`, `mediaPosition`,
  image via factory.
- Any `sys`-derived fields (ids, dates), any string enum coercions, any list wrappers.

### 5. `sys` & dates
Old `Gql*` read `sys { id, publishedAt, firstPublishedAt }`. REST `sys` uses `createdAt`,
`updatedAt`, `revision`, and (published entries) `publishedAt`/`firstPublishedAt` may **not** be
present on CDA in the same way — **verify** what CDA returns for the fields the DTOs expose
(`CreatedAt`, `UpdatedAt`, blog dates) and map to the closest equivalent so values match old output.
Document any semantic difference for Task 08 sign-off.

### 6. DTO-evolution guardrails (enable safe change later)
Set up the mechanisms that let content types evolve without breaking v1 until tested:
- **Source/contract decoupling:** always prefer `[ContentfulField("id")]` over renaming a DTO
  property, so a Contentful field rename never changes the wire output.
- **Additive-safe convention:** new fields must be added as **nullable** DTO properties; the mapper
  already returns default for missing source fields, so adding a field is non-breaking.
- **Contract snapshot fixtures:** generate a golden JSON schema/sample per DTO (or per endpoint in
  Task 08) checked into `test/`. CI fails if the serialized shape changes without an intentional
  snapshot update — this is the "don't break the contract until ready" gate.
- **Versioning policy:** breaking shape changes go to a new API version (v2) while v1 stays frozen;
  document this in `Contracts/README.md`.

---

## Acceptance criteria
- All DTOs + interfaces compile in the new project unchanged.
- Every concrete polymorphic DTO carries a verified `[ContentType]`; `content-type-map.md` exists
  and matches the old converters 1:1 (no missing `kind`).
- A unit test maps a canned entry for **each attribute kind** (`[RichText]`, `[Collection]`,
  `[ProjectFrom]`, `[MapEach]`, asset flatten, polymorphic `ISection`) and asserts correct output.
- A written checklist confirming each `CreateMap` in the old profile is accounted for
  (implemented-by-convention / implemented-by-attribute / implemented-by-custom-converter).

## Out of scope
- Endpoint orchestration (tasks 03–07). The `EntryMapper` engine itself (Task 01) — this task only
  supplies the attributes + annotations + registry data it consumes.
