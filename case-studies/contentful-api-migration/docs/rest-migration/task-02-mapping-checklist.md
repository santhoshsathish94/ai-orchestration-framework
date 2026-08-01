# Task 02 mapping checklist

Walks every `CreateMap<Gql*, *Dto>()` call in the legacy
`Legacy.CMS.Infrastructure/ContentMappingProfile.cs` (~1246 lines, read in full for this pass) and
records how each one is now expressed in `src/API.Contentful.Contracts` — by attribute, by plain
C#-property convention, or flagged as needing real code in a later task. Cross-referenced against the
actual attributes present on every DTO in `Dtos/*.cs` as of this pass; gaps found were fixed in the DTO
source itself (not just noted here — see [Corrections applied during this pass](#corrections-applied-during-this-pass)).

Companion docs: [`content-type-map.md`](./content-type-map.md) (content-type id ↔ discriminator ↔ DTO)
and the XML doc comments on each class in `Mapping/*.cs` (full semantics of each attribute).

## Legend

| Handling | Meaning |
|---|---|
| BY CONVENTION | `camelCase(propertyName)` already equals the real Contentful field id; no attribute needed. |
| `[RichText]` | Rendered from a Contentful rich-text field to HTML (Task 01's ported `ContentfulRichTextHelper`). |
| `[Collection("x")]` | Array-of-links field; REST id `x` (never "Collection"-suffixed). |
| `[ProjectFrom("a.b")]` | Follow link `a`, read field `b` on the linked entry/asset. |
| `[MapEach("a.b")]` | Follow array-of-links `a`, collect field `b` from each linked entry. |
| `[ContentfulField("x")]` | Scalar field id differs from `camelCase(propertyName)`. |
| `[MapperIgnore]` | Never populated by the generic mapper; set by application/orchestration code instead. |
| `[AssetFlatten]` | Flattened from a raw Contentful Asset resource, not an Entry. |
| `IMedia?`/`ISection`/`ICard` by convention | Single or collection polymorphic link, resolved via the per-interface `[ContentType]` registry — **not** a custom-converter case (see note below). |
| NEEDS-CUSTOM-CONVERTER | An attribute genuinely cannot express this; needs real code in a later task (consolidated in [its own section](#needs-custom-converter-in-task-01-consolidated-hand-off-list)). |
| OUT OF SCOPE | Not a single-entry mapping at all (listing/search wrapper); assembled by endpoint orchestration in a later task. |

**Media polymorphism is not a special case.** `GqlMediaFactory`/`GqlCardFactory`/`GqlSectionConverter` in
the legacy code are per-item dispatch factories — exactly what the new `[ContentType]` registry does,
once per marker interface (`ISection`, `ICard`, `IMedia`). Any property typed as the interface itself
(`IMedia? Media`, `List<ICard> Cards`, etc.) is handled **by convention** through that registry and needs
no extra attribute beyond `[Collection]` for arrays. The **only** genuine media-polymorphism
custom-converter case in the whole profile is `BackgroundDto.BackgroundImage`, because it is typed as
plain `object?` instead of `IMedia?` (see below) — every other `IMedia?`/`IMedia` collection property
in this codebase is fine as-is.

## Individual types (cards, media, misc.) — `ContentMappingProfile.cs` `#region Individual Types`

| # | `CreateMap<Source, Dest>` | Handling | Notes |
|---|---|---|---|
| 1 | `GqlCTA → CallToActionDto` | BY CONVENTION + `[RichText]` (ButtonText) | Vestigial `ISection` implementer (never a `[JsonDerivedType]` target). Declared `class`, not `record` — preserved verbatim. |
| 2 | `GqlAsset → AssetDto` | `[AssetFlatten]` (class-level) | Sourced from a raw Asset resource, not an Entry — no `[ContentType]` by design. |
| 3 | `GqlImage → ImageDto` | `[ProjectFrom]` ×4 (url/width/height/description via `imageUpload.*`) + `[RichText]` Caption + `[ContentfulField]` AnchorUrl/IsAnchorUrlOpeninNewTab | Shares content-type id `image` with row 4 — see content-type-map.md. |
| 4 | `GqlImageCard → ImageCardDto` | Same pattern as row 3 | Shares content-type id `image` with row 3, disambiguated only by target interface (`IMedia` vs `ICard`). |
| 5 | `GqlVideo → VideoDto` | BY CONVENTION | |
| 6 | `GqlBackground → BackgroundDto` | BY CONVENTION for 4 scalar fields | `BackgroundImage`: **NEEDS-CUSTOM-CONVERTER** — typed `object?`, `[MapperIgnore]` applied. See consolidated list. |
| 7 | `GqlLink → LinkDto` | BY CONVENTION | Vestigial `ISection` implementer. |
| 8 | `GqlTextImageCard → TextImageCardDto` | `[RichText]` ×2; `Image` is `IMedia?` by convention | |
| 9 | `GqlMarketShowcaseCard → MarketShowcaseCardDto` | `[RichText]` ×2; `Image` is `IMedia?` by convention | |
| 10 | `GqlContactusCard → ContactusCardDto` | `[RichText]` ×2 (Heading/Hours) | |
| 11 | `GqlBrokerAuctioneerCard → BrokerAuctioneerCardDto` | `[RichText]` (AuctioneerSectionDetails) | |
| 12 | `GqlTestimonial → TestimonialDto` | `[RichText]` BodyText; `[Collection("image")]` on `List<AssetDto>` | Asset-links-to-list is fully expressible via `[Collection]` + `AssetDto`'s own `[AssetFlatten]` — **not** a custom-converter case despite looking like one at a glance. |
| 13 | `GqlBlogPostCard → BlogPostCardDto` | `[RichText]` ×2; `[ProjectFrom("category.categoryName")]`; `[Collection("tags")]`+`[MapEach("tagName")]`; `HeroImage` `IMedia?` by convention | `CreatedAt`/`UpdatedAt` were missing `[ContentfulField("sys.*")]` — **FIXED this pass.** See [sys & dates](#sys--dates). |
| 14 | `GqlGlossaryCard → GlossaryCardDto` | `[RichText]` ×2; `[MapperIgnore]` InternalName | Legacy explicitly `.Ignore()`s InternalName for this mapping — preserved. `Kind` is hardcoded via a backing field (`init` always forces `"GlossaryCard"`), not attribute-driven; safe for the mapper to assign blindly. |
| 15 | `GqlListCard → ListCardDto` | `[RichText]` ×3; `[Collection("cta")]`; `Media` `IMedia?` by convention | Dual `ISection`+`ICard` target — see content-type-map.md. |
| 16 | `GqlListCardPageSection → ListCardDto` | Identical rules to row 15 | Second GraphQL source shape for the same `listCard` content type/DTO. |
| 17 | `GqlListCardInfo → ListCardInfoDto` | `[RichText]` ×2; `[Collection("cta")]` | |
| 18 | `GqlListCardInfoSection → ListCardInfoSectionDto` | `[RichText]` ×2; `[Collection("listCardInfo")]`; `[ProjectFrom("legalese.legaleseText")]`+`[RichText]` | |
| 19 | `GqlFactCard → FactCardDto` | `[RichText]` ×2 | |
| 20 | `GqlBlogList → BlogsDto` | OUT OF SCOPE | Source is a search/listing GraphQL *query result*, not a single entry with a content-type id. `BlogsDto` is a vestigial `ISection` implementer (never a `[JsonDerivedType]` target). Task 05's blog-listing endpoint must assemble `Total`/`Skip`/`Limit`/`BlogPosts` itself. |
| 21 | `GqlFaq → FaqDto` | `[RichText]` ×2 (Question/Answer) | |

## Sections — `ContentMappingProfile.cs` `#region Sections`

| # | `CreateMap<Source, Dest>` | Handling | Notes |
|---|---|---|---|
| 22 | `GqlHeroSection → HeroSectionDto` | `[RichText]` ×4; `[ContentfulField("cta")]` ActionButton; `[ProjectFrom]`+`[RichText]` Legalese; `[Collection("categoryTerms")]`; `Media` `IMedia?` by convention | `ColumnProportion`: **NEEDS-CUSTOM-CONVERTER** (see consolidated list). |
| 23 | `GqlHeroContactFormSection → HeroContactFormSectionDto` | `[RichText]` ×3; `[ContentfulField("cta")]`; `[ProjectFrom]`+`[RichText]` Legalese | |
| 24 | `GqlSeo → SeoDto` | `[ContentfulField]` ×2 (pageTitle/pageDescription); rest by convention | Vestigial `ISection` implementer. |
| 25 | `GqlStepsSection → StepsSectionDto` | `[RichText]` ×2; `[Collection("stepReference")]`; `[ProjectFrom]`+`[RichText]` Legalese | |
| 26 | `GqlStep → StepDto` | `[RichText]` ×2; `Image`/`IconImage` both `IMedia?` by convention | Two independent media slots on one DTO, same generic resolution mechanism. |
| 27 | `GqlStaticTextAndImageSection → StaticTextAndImageSectionDto` | `[RichText]` ×6; `[ContentfulField]` cta/cta2; `[ProjectFrom]`+`[RichText]` Legalese; `Media` `IMedia?` by convention | `ColumnProportion`: **NEEDS-CUSTOM-CONVERTER** (same transform as row 22). `FullWidthCta` (`?? false` default): minor NEEDS-CUSTOM-CONVERTER, see consolidated list. |
| 28 | `GqlStatsPanel → StatsPanelDto` | `[RichText]` ×3; `[Collection("statGroups")]` | |
| 29 | `GqlStatGroup → StatGroupDto` | `[RichText]` GroupHeading; `[Collection("stats")]` | |
| 30 | `GqlStatItem → StatItemDto` | `[RichText]` ×2 | |
| 31 | `GqlLegalese → LegaleseDto` | `[RichText]` LegaleseText | The field every `[ProjectFrom("...legalese.legaleseText")]` elsewhere ultimately targets. |
| 32 | `GqlContactFormSection → ContactFormDto` | `[RichText]` ×2; `[ProjectFrom]`+`[RichText]` Legalese; ~16 plain scalars by convention | |
| 33 | `GqlSeoContentSection → SeoContentSectionDto` | `[RichText]` SeoStaticContentText | |
| 34 | `GqlLegalSection → LegalSectionDto` | `[RichText]` BodyText | |
| 35 | `GqlLegalDisclosuresSection → LegalDisclosuresSectionDto` | `[RichText]` ×2; `[Collection("cta")]` CTAs | Field id is singular `cta` for an array — preserved verbatim. |
| 36 | `GqlLegalDisclosuresListSection → LegalDisclosuresListSectionDto` | `[RichText]` Heading; `[Collection("disclosuresDocumentList")]` | |
| 37 | `GqlHelpCenterCategoryListSection → HelpCenterCategoryListSectionDto` | `[RichText]` Heading; `[ContentfulField("subheading")]`+`[RichText]` SubHeading; `[Collection("categoryList")]` | |
| 38 | `GqlHelpCenterArticleListSection → HelpCenterArticleListSectionDto` | `[Collection("articleList")]` | |
| 39 | `GqlHelpCenterCategory → HelpCenterCategoryDto` | `[RichText]` Description | |
| 40 | `GqlHelpCenterArticle → HelpCenterArticleDto` | `[RichText]` ×2; `Media` `IMedia?` by convention | `CreatedAt`/`UpdatedAt`/`SEOMetadata` were missing attributes — **FIXED this pass** (`[ContentfulField("sys.*")]` ×2, `[ContentfulField("seoMetadata")]`). |
| 41 | `GqlHelpCenterArticleList → ArticleListDto` | OUT OF SCOPE | Listing wrapper (Total/Skip/Limit/Articles); Task 06 orchestration, not a single-entry mapping. |
| 42 | `GqlHelpCenterCard → HelpCenterCardDto` | `[RichText]` ×2; `Media` `IMedia?` by convention | |
| 43 | `GqlHelpCenterCardListSection → HelpCenterCardListSectionDto` | `[MapperIgnore]` Heading; `[Collection("helpCenterCard")]` | Legacy explicitly `.Ignore()`s Heading for this mapping — preserved. |
| 44 | `GqlSpeakersSection → SpeakersSectionDto` | `[RichText]` ×2; `[Collection("speakerSchedule")]` | |
| 45 | `GqlSpeakerSchedule → SpeakerScheduleDto` | `[RichText]` ×4; `Photo` `IMedia?` by convention | `[ContentType("speakerProfile")]` — real id, not "speakerSchedule". |
| 46 | `GqlFooter → FooterDto` | `[Collection]` ×2 (links/socialIcons); `[RichText]` ×2; `[ProjectFrom]`+`[RichText]` Legalese | |
| 47 | `GqlHeader → HeaderDto` | `[Collection("mainNavigationItems")]` | Was missing this attribute (value happens to match convention, but the codebase's rule is every collection property gets one explicitly) — **FIXED this pass.** |
| 48 | `GqlHeaderMainNavigation → MainNavigationItemDto` | `[ContentfulField("label")]`+`[RichText]` Title; `[Collection]` ×2 | |
| 49 | `GqlSubNavigationCategory → SubNavigationCategoryDto` | `[ContentfulField("label")]`+`[RichText]` Title; `[Collection("subNavigationItems")]` | |
| 50 | `GqlHeaderSubNavigation → SubNavigationDto` | `[ContentfulField("label")]`+`[RichText]` Title | |
| 51 | `GqlPillNavigationSection → PillNavigationSectionDto` | `[RichText]` ×2; `[Collection]` ×2 | |
| 52 | `GqlPillNavigation → PillNavigationDto` | `[RichText]` NavigationName; `NavigationIcon` `IMedia?` by convention | |
| 53 | `GqlRightRail → RightRailDto` | `[Collection("widgets")]` | |
| 54 | `GqlRightRailWidget → RightRailWidgetDto` | `[RichText]` ×2 | |
| 55 | `GqlFulcrumWidget → FulcrumWidgetDto` | `[RichText]` Heading | |
| 56 | `GqlRightRailForm → RightRailFormDto` | `[RichText]` Heading; `Icon` `IMedia?` by convention | |
| 57 | `GqlRightRailListWidget → RightRailListWidgetDto` | `[RichText]` Heading; `[Collection("list")]`; `Icon` `IMedia?` by convention | |
| 58 | `GqlImageReelSection → ImageReelSectionDto` | `[RichText]` ×2; `[Collection("cards")]`; `[ProjectFrom]`+`[RichText]` Legalese | |
| 59 | `GqlFaqSection → FaqSectionDto` | `[RichText]` Heading; `Media` `IMedia?` by convention | Legacy uses a plain `MapFrom(GqlMediaFactory.Create(...))` (no Ignore/AfterMap split) — same net effect as elsewhere. |
| 60 | `GqlSearchSection → SearchSectionDto` | `[RichText]` ×3; `Image` `IMedia?` by convention; `[Collection("popularTerms")]` | `PopularTerms` is a genuinely heterogeneous `ICard` collection — standard per-item polymorphic dispatch, not a custom converter. |
| 61 | `GqlStackedCardsSection → StackedCardsSectionDto` | `[Collection("cards")]` | |
| 62 | `GqlFulcrumSection → FulcrumSectionDto` | `[RichText]` ×2 (Heading/Subheading) | **Both were missing `[RichText]` — FIXED this pass.** |
| 63 | `GqlCarouselSection → CarouselSectionDto` | `[RichText]` ×4; `[Collection("slides")]`; `CarouselIcon` `IMedia?` by convention | `HasPadding` (`?? true` default): minor NEEDS-CUSTOM-CONVERTER, see consolidated list. |
| 64 | `GqlAuctionEvent → AuctionEventDto` | `[RichText]` ×3; `Image` `IMedia?` by convention | |
| 65 | `GqlListSection → ListSectionDto` | `[RichText]` ×3; `Icon` `IMedia?` by convention; `[Collection("list")]` | |
| 66 | `GqlAuctionEventSection → AuctionEventSectionDto` | `[ContentfulField("auctionEventCalender")]`; `[ContentfulField("auctionEventList")]` | `AuctionList` source is a single Link, not an array, despite the "List" name. |
| 67 | `GqlDynamicSection → DynamicSectionDto` | `[RichText]` Heading | |
| 68 | `GqlGlossaryCardsSection → GlossaryCardsSectionDto` | `[Collection("cards")]` Items | Property renamed from source's "cards" to "Items"; `[Collection]`'s explicit field id already covers the rename, no extra attribute needed. |
| 69 | `GqlListCardSection → ListCardSectionDto` | `[RichText]` ×2; `[Collection("listCard")]`; `[ProjectFrom]`+`[RichText]` Legalese | |
| 70 | `GqlTableSection → TableSectionDto` | `[RichText]` Title; `[Collection]` ×2 (columns/rows); `[ProjectFrom]`+`[RichText]` Legalese | |
| 71 | `GqlTableColumn → TableColumnDto` | `[RichText]` ColumnName | |
| 72 | `GqlTableRow → TableRowDto` | `[Collection("cellValues")]` | |
| 73 | `GqlTableCell → TableCellDto` | `[RichText]` ×2 (Data1/Data2) | |
| 74 | `GqlGroupSection → GroupSectionDto` | `[Collection("sections")]` | Recurses through the full `ISection` registry. |
| 75 | `GqlSpotlightCard → SpotlightCardDto` | `[RichText]` ×3; `Media` `IMedia?` by convention | |
| 76 | `GqlSpotlightSection → SpotlightSectionDto` | `[RichText]` ×2; `[Collection("cards")]` | |
| 77 | `GqlFactsPanelSection → FactsPanelSectionDto` | `[Collection("factCards")]` FactsCard | |
| 78 | `GqlLinkSection → LinkSectionDto` | `[RichText]` ×2; `[Collection]` ×2 (listCard/cta) | **All 4 attributes were missing — FIXED this pass.** `ListCard` resolves through the standard `ICard` registry when reached this way (top-level/standalone) — contrast with row 79. |
| 79 | `GqlFeatureSection → FeatureSectionDto` | `[RichText]` ×3; `[Collection("linkSections")]` (`List<LinkSectionDto>`, concrete) | `LinkSections[].ListCard`: **CONFIRMED NEEDS-CUSTOM-CONVERTER** — see consolidated list, this is the most significant finding of this pass. |

## Page templates — `ContentMappingProfile.cs` `#region Page Templates`

All eight source types map to the single non-polymorphic `PageDto`. **`PageDto` had zero mapping
attributes before this pass — FIXED this pass**: `[ContentfulField("sys.id")]` Id,
`[ContentfulField("internalName")]` Title, `[ContentfulField("sys.publishedVersion")]` Version,
`[ProjectFrom("pageLegalese.legaleseText")]`+`[RichText]` Legalese, `[ContentfulField("seoMetadata")]`
Seo, `[Collection("sections")]` Sections (recurses through the full `ISection` registry). `Slug`/`PageType`
are by convention.

Note the field is **`pageLegalese`**, not `legalese` like every other DTO's Legalese property — confirmed
from the profile source (`s.PageLegalese`), resolving the "unverified" flag left in earlier research notes.

| # | `CreateMap<Source, PageDto>` | Notes |
|---|---|---|
| 80 | `GqlLandingPage → PageDto` | Standard rules above. |
| 81 | `GqlProductPage → PageDto` | Standard rules above. |
| 82 | `GqlHomePage → PageDto` | Standard rules above. |
| 83 | `GqlGlossaryPage → PageDto` | Standard rules above. |
| 84 | `GqlFaqPage → PageDto` | Standard rules above. |
| 85 | `GqlHelpCenterPage → PageDto` | Standard rules above. |
| 86 | `GqlRightRailPage → PageDto` | Standard rules above. |
| 87 | `GqlDiscoverPage → PageDto` | Standard rules **except** Legalese and Seo are explicitly `.Ignore()`d for this source only. **CONFIRMED NEEDS-CUSTOM-CONVERTER** — a single static DTO class cannot express "ignore these two fields only for one of eight source types" via attributes. |

## Standalone entry (non-polymorphic)

| # | `CreateMap<Source, Dest>` | Handling | Notes |
|---|---|---|---|
| 88 | `GqlBlogPost → BlogPostDto` | `[ContentfulField("sys.id")]`; `[RichText]` ×3; `[ContentfulField("sys.publishedAt"/"sys.firstPublishedAt")]`; `[ProjectFrom("category.categoryName")]`; `[Collection("tags")]`+`[MapEach("tagName")]`; `[ContentfulField("seoMetadata")]`; `HeroImage` `IMedia?` by convention; `[MapperIgnore]` RecentPosts/RelatedPosts | **Entire DTO had zero attributes before this pass — FIXED this pass.** Vestigial `ICard` implementer (never a `[JsonDerivedType]` target); reached directly/concretely by a "get blog post by slug" endpoint (Task 05), not via polymorphic resolution. `PublishedDate`/`LastUpdatedDate` are separate **own fields**, not sys dates — see [sys & dates](#sys--dates). |

## Corrections applied during this pass

Attributes added to DTO source files in this pass (beyond documentation — these are real code changes):

1. `FulcrumSectionDto.Heading`, `.Subheading` → added `[RichText]`.
2. `LinkSectionDto.Heading`, `.SubHeading` → added `[RichText]`; `.ListCard` → added `[Collection("listCard")]`; `.Cta` → added `[Collection("cta")]`.
3. `HeaderDto.MainNavigationItems` → added `[Collection("mainNavigationItems")]`.
4. `PageDto` → added `[ContentfulField("sys.id")]` (Id), `[ContentfulField("internalName")]` (Title), `[ProjectFrom("pageLegalese.legaleseText")]`+`[RichText]` (Legalese), `[ContentfulField("sys.publishedVersion")]` (Version), `[ContentfulField("seoMetadata")]` (Seo), `[Collection("sections")]` (Sections). Previously had **no attributes at all**.
5. `BlogPostDto` → added `[ContentfulField("sys.id")]` (Id), `[RichText]` (Title/BodyContent/Excerpt), `[ContentfulField("sys.publishedAt"/"sys.firstPublishedAt")]` (UpdatedAt/CreatedAt), `[ProjectFrom("category.categoryName")]` (Category), `[Collection("tags")]`+`[MapEach("tagName")]` (Tags), `[ContentfulField("seoMetadata")]` (Seo), `[MapperIgnore]` (RecentPosts/RelatedPosts). Previously had **no attributes at all**.
6. `BlogPostCardDto.CreatedAt`/`.UpdatedAt` → added `[ContentfulField("sys.firstPublishedAt"/"sys.publishedAt")]`.
7. `HelpCenterArticleDto.CreatedAt`/`.UpdatedAt` → added `[ContentfulField("sys.publishedAt"/"sys.firstPublishedAt")]`; `.SEOMetadata` → added `[ContentfulField("seoMetadata")]` (defensive — see acronym-casing note below).
8. `HeroSectionDto.ColumnProportion`, `StaticTextAndImageSectionDto.ColumnProportion` → added code comments flagging the value-transform gap (no attribute fits; see below).

`HelpCenterArticleDto.SEOMetadata`'s explicit `[ContentfulField("seoMetadata")]` is defensive: the real
field id is `seoMetadata`, and while .NET's acronym-aware camelCase policy likely produces that from the
property name `SEOMetadata` unassisted, making it explicit removes any dependency on which exact
camelCasing algorithm Task 01's convention-resolution code ends up using.

## NEEDS-CUSTOM-CONVERTER-IN-TASK-01 (consolidated hand-off list)

1. **`BackgroundDto.BackgroundImage`** (`object?`, not `IMedia?`) — legacy resolves an image-or-video
   factory result and assigns it to a plain-`object` property. STJ will not auto-inject `IMedia`'s
   polymorphic `Kind` discriminator through a bare `object` property (that only fires when serializing
   *through* a type that itself carries `[JsonPolymorphic]`). Needs a bespoke resolver that constructs
   the `ImageDto`/`VideoDto` and assigns it dynamically. Marked `[MapperIgnore]`.
2. **`HeroSectionDto.ColumnProportion` and `StaticTextAndImageSectionDto.ColumnProportion`** — legacy
   transforms a raw colon-separated value (e.g. `"60:40"`) into `"60% 40%"` (split on `:`, append `%` to
   each part, rejoin with `"% "`) via `AfterMap`. Pure string manipulation; no attribute expresses value
   transforms. Confirmed only these two properties have this transform — `ListCardSectionDto.ColumnProportion`,
   `ListCardSectionDto.MobileColumnProportion`, and `SpotlightSectionDto.ColumnProportion` are plain
   passthroughs by contrast (verified against the profile source; do not apply the transform there).
3. **`FeatureSectionDto.LinkSections[].ListCard` — confirmed, highest-value finding of this pass.** The
   profile hand-constructs each nested `LinkSectionDto` inside `FeatureSection` and **always** wraps its
   card items as `LinkCardDto` (`Kind`, `InternalName`, `Heading`, `Description`, `ShortHand` only),
   regardless of the linked entry's actual type. This is verified as a genuine behavioral divergence, not
   just a style difference: the underlying GraphQL model (`GqlLinkSection.ListCardCollection` /
   `linksectionfields.graphql`) is strongly typed as `List<GqlListCard>` in *both* the top-level and the
   nested-in-`FeatureSection` cases — i.e. the source data shape is identical either way — yet the
   **top-level** `CreateMap<GqlLinkSection, LinkSectionDto>` maps those same items to full `ListCardDto`
   instances (via the standard `ICard` dispatch, `ctx.Mapper.Map(s, s.GetType(), typeof(ICard))`), while
   the **FeatureSection-nested** copy of the same logic hand-builds `LinkCardDto` instead, silently
   dropping `TitleTooltip`, `TextCenter`, `CardShadow`, `IsHeaderLeftAligned`, `CardVariant`, `Media`,
   `MediaPosition`, `Background`, `Ctas`, and `CursorPointer`. A generic recursive mapper that applies
   `LinkSectionDto`'s standard rules uniformly (which is the natural/expected behavior from
   `[Collection("linkSections")]` alone) would **not** reproduce this — it would produce `ListCardDto`
   items nested inside `FeatureSectionDto.LinkSections`, not `LinkCardDto`. Whichever task implements
   `FeatureSectionDto` (Sections, likely Task 04) needs a bespoke rule: when populating
   `FeatureSectionDto.LinkSections[].ListCard` specifically, always construct `LinkCardDto` from just
   those five fields instead of routing through the normal `ICard` registry. Flag for Task 08's parity
   harness too — this is exactly the kind of thing a snapshot diff should catch if it's ever "fixed" by
   accident.
4. **`GqlDiscoverPage → PageDto`** — ignores `Legalese` and `Seo` for this one source type only, while
   the other seven page templates populate both normally from the same destination properties. A single
   static DTO class cannot express a per-source-type conditional; needs branching logic in whichever task
   wires up page-template mapping (Task 03).
5. **Minor: nullable-bool-with-non-null-fallback fields** — `CarouselSectionDto.HasPadding` (`?? true`)
   and `StaticTextAndImageSectionDto.FullWidthCta` (`?? false`). The DTO's own C# property initializer
   (`= true` / `= false`) only applies when nothing assigns the property; a mapper that explicitly copies
   a `null` source value will still produce `null`, not the fallback. No current attribute expresses
   "coalesce to a default on null" — either add a tiny amount of bespoke logic for these two properties,
   or (if useful more broadly) propose a small `[DefaultIfNull(true)]`-style attribute in Task 01. Low
   risk either way; flagging so it isn't silently missed.

## sys & dates

Every "id/version/date" DTO property that legacy reads from `sys.*` rather than `fields.*`, using the
`[ContentfulField("sys.xxx")]` dotted-path convention (see `ContentfulFieldAttribute`'s XML doc):

| DTO.Property | sys source | Notes |
|---|---|---|
| `PageDto.Id` | `sys.id` | All 8 page templates. |
| `PageDto.Version` | `sys.publishedVersion` | All 8 page templates; **not** a standard CDA field (see caveat below). |
| `BlogPostCardDto.CreatedAt` | `sys.firstPublishedAt` | |
| `BlogPostCardDto.UpdatedAt` | `sys.publishedAt` | |
| `BlogPostDto.Id` | `sys.id` | |
| `BlogPostDto.CreatedAt` | `sys.firstPublishedAt` | |
| `BlogPostDto.UpdatedAt` | `sys.publishedAt` | |
| `BlogPostDto.PublishedDate` / `.LastUpdatedDate` | **not sys** — own scalar fields `publishedDate`/`lastUpdatedDate` | Coexists with the sys-sourced `CreatedAt`/`UpdatedAt` above on the *same* DTO — four date-shaped properties total, two different sources. Do not conflate. |
| `HelpCenterArticleDto.CreatedAt` | `sys.firstPublishedAt` | |
| `HelpCenterArticleDto.UpdatedAt` | `sys.publishedAt` | |

**NEEDS REVIEW — flag for Task 01/03/05 to confirm against a live `cdn.contentful.com` response.**
Standard Contentful **Content Delivery API** `sys` blocks are only guaranteed to contain
`id`/`type`/`createdAt`/`updatedAt`/`revision`/`contentType`/`locale`. `publishedAt` and
`firstPublishedAt` — which is what all the rows above actually read — are **not** standard CDA fields;
they belong to the Content Management API / Sync API shape (or require a space feature flag). The
Contentful MCP server used to verify content types in this task most likely proxies a CMA-shaped `sys`
block (which does have `publishedAt`/`firstPublishedAt`), so it is **not** representative proof that the
real runtime `ContentfulRestClient` (hitting true `cdn.contentful.com`/preview CDA) will see the same
fields. Two possible resolutions, deferred to whichever task first calls the real CDA:
- If the real CDA response for this space genuinely lacks `publishedAt`/`firstPublishedAt`, these
  properties need to fall back to plain `sys.createdAt`/`sys.updatedAt` (a *different* semantic —
  "entry last saved" vs. "entry last published" — which could visibly change API output for draft vs.
  published content, especially in preview mode).
- If the space has sync/publish metadata enabled and the fields are present, no change is needed beyond
  confirming it live.
Either way this is a data/runtime question, not something resolvable from static analysis or the MCP
server alone — explicitly deferred, not silently assumed.

## Out of scope for the generic EntryMapper (orchestration-populated)

These DTOs are wrapper/listing/index shapes assembled by endpoint code from query results (search,
pagination, "recent posts", etc.), not single-entry mappings the generic mapper resolves by content-type
id. No mapping attributes apply to their own scalar/list properties (their *item* DTOs, e.g.
`BlogPostCardDto`, `HelpCenterArticleDto`, do go through the per-item mapper normally):

`BlogsDto` (has a real `CreateMap<GqlBlogList, ...>` — see row 20 — but the source is itself a query
result), `BlogIndexDto`, `BlogPageDto`, `BlogPostListDto`, `ArticleListDto`, `ArticleSummaryListDto`,
`ArticleSummaryDto`, `GlossaryCardListDto`, `HelpCenterArticleListDto` (also has a real `CreateMap` — row
41 — same reasoning).

`SectionDto` and `MediaDto` (in `Dtos/`) are copied verbatim for structural completeness but are **dead
code in the legacy repo** — grepped the entire legacy solution and found no `CreateMap` targeting either
and no hand-constructed usage anywhere. Not wired to anything; no attributes needed; flag as candidates
for removal in a later cleanup pass if they remain unused after Task 09.

## Open questions / risks

- The `FeatureSectionDto.LinkSections[].ListCard` divergence (item 3 above) is the biggest parity risk
  found in this pass — it's a genuine behavioral quirk, not a mapping gap, and easy to "fix" by accident
  if a future implementer isn't aware of it.
- The sys/dates `publishedAt`/`firstPublishedAt` availability question is unresolved pending a real CDA
  call — see above.
- `GqlDiscoverPage`'s Legalese/Seo exception means whichever task wires up `PageDto` construction must
  NOT use a single blind "apply PageDto's attributes generically" path for all 8 page template source
  types — it needs at least one conditional branch.
