# Content type map (Task 02)

Maps every polymorphic DTO (every `[JsonDerivedType]` target of `ISection`, `ICard`, or `IMedia`) to
the real Contentful **content-type id** (`sys.contentType.sys.id`) it is populated from, as opposed to
the JSON **`kind`** discriminator string the new API emits (the two are frequently different strings —
see the `[ContentType]` XML doc on `Mapping/ContentTypeAttribute.cs` for why both axes exist).

## Verification methodology

For every row below, the content-type id was derived from the legacy GraphQL pipeline
(`GqlSectionConverter.cs` / `GqlCardConverter.cs` switch-case on the raw `kind: __typename` value, or —
when a DTO isn't dispatched through those converters — the `CreateMap<GqlXxx, YyyDto>()` source type
name in `ContentMappingProfile.cs`), then **cross-checked against the live list of all 89 content types**
in space `your-space-id`, environment `Dev` (fetched via the Contentful MCP on 2026-07-29). Every id below
exists verbatim in that live list. A handful were additionally spot-checked by comparing the content
type's field list against the DTO's properties (called out explicitly below). Given this two-source
confirmation (GraphQL-type-name provenance + live existence check), no row is marked `NEEDS REVIEW` —
but the rows flagged "real id, NOT ..." are the ones where a naive `camelCase(kind)` guess would have
been silently wrong, so they deserve extra attention from Task 08's parity harness.

## `ISection` targets (48)

| contentTypeId | kind (JSON discriminator) | DTO type | notes |
|---|---|---|---|
| _(raw Asset, not an Entry)_ | `Asset` | `AssetDto` | Sourced from a Contentful **Asset** resource (`sys.type == "Asset"`), never an Entry — deliberately **not** annotated with `[ContentType]`. Flattened via `[AssetFlatten]`. |
| `footer` | `Footer` | `FooterDto` | |
| `headerNavigation` | `Header` | `HeaderDto` | Real id is `headerNavigation`, **NOT** `header`. |
| `headerMainNavigation` | `HeaderMainNavigation` | `MainNavigationItemDto` | |
| `headerSubNavigation` | `SubNavigation` | `SubNavigationDto` | Real id is `headerSubNavigation`, **NOT** `subNavigation`. |
| `headerSubNavigationCategory` | `SubNavigationCategory` | `SubNavigationCategoryDto` | Real id is `headerSubNavigationCategory`, **NOT** `subNavigationCategory`. |
| `heroSection` | `HeroSection` | `HeroSectionDto` | |
| `heroContactFormSection` | `HeroContactFormSection` | `HeroContactFormSectionDto` | |
| `staticTextAndImageSection` | `StaticTextAndImageSection` | `StaticTextAndImageSectionDto` | Content type display name is "Text  Media Section" (double space, legacy typo) but the id matches cleanly. |
| `stepsSection` | `StepsSection` | `StepsSectionDto` | |
| `legalese` | `Legalese` | `LegaleseDto` | |
| `seoContentSection` | `SeoContentSection` | `SeoContentSectionDto` | |
| `legalSection` | `legalSection` | `LegalSectionDto` | |
| `speakersSection` | `SpeakersSection` | `SpeakersSectionDto` | |
| `speakerProfile` | `speackerSchedule` (sic) | `SpeakerScheduleDto` | Real id is `speakerProfile` — a completely different word from the `speackerSchedule` discriminator/Gql class name. |
| `rightRail` | `RightRail` | `RightRailDto` | Content type display name is "Right Rail **Section**" but the id is just `rightRail`. |
| `rightRailForm` | `RightRailForm` | `RightRailFormDto` | |
| `rightRailListWidget` | `RightRailListWidget` | `RightRailListWidgetDto` | |
| `rightRailWidget` | `RightRailWidget` | `RightRailWidgetDto` | |
| `fulcrumWidget` | `fulcrumWidget` | `FulcrumWidgetDto` | |
| `pillNavigationSection` | `PillNavigationSection` | `PillNavigationSectionDto` | Distinct content type from `pillNavigation` (`PillNavigationDto`) — do not confuse. |
| `imageReelSection` | `ImageReelSection` | `ImageReelSectionDto` | |
| `searchSection` | `SearchSection` | `SearchSectionDto` | |
| `stackedCardsSection` | `stackedCardsSection` | `StackedCardsSectionDto` | |
| `carouselSection` | `CarouselSection` | `CarouselSectionDto` | |
| `fulcrumSection` | `FulcrumSection` | `FulcrumSectionDto` | |
| `faqSection` | `FaqSection` | `FaqSectionDto` | |
| `contactFormSection` | `ContactFormSection` | `ContactFormDto` | |
| `glossaryCardsSection` | `GlossaryCardsSection` | `GlossaryCardsSectionDto` | |
| `dynamicSection` | `DynamicSection` | `DynamicSectionDto` | |
| `auctionEvent` | `AuctionEvent` | `AuctionEventDto` | Distinct content type from `auctionEventSection` (`AuctionEventSectionDto`) — do not confuse. |
| `auctionEventSection` | `AuctionEventSection` | `AuctionEventSectionDto` | |
| `listSection` | `ListSection` | `ListSectionDto` | |
| `listCardSection` | `ListCardSection` | `ListCardSectionDto` | |
| `factsPanelSection` | `FactsPanelSection` | `FactsPanelSectionDto` | |
| `legalDisclosuresSection` | `LegalDisclosuresSection` | `LegalDisclosuresSectionDto` | |
| `legalDisclosuresListSection` | `LegalDisclosuresListSection` | `LegalDisclosuresListSectionDto` | |
| `helpCenterCategoryList` | `HelpCenterCategoryListSection` | `HelpCenterCategoryListSectionDto` | Real id has **no** "Section" suffix, unlike the JSON discriminator (this is the legacy `kind` switch value, verified against the live content type). |
| `helpCenterArticleListSection` | `HelpCenterArticleListSection` | `HelpCenterArticleListSectionDto` | |
| `helpCenterCardListSection` | `HelpCenterCardListSection` | `HelpCenterCardListSectionDto` | |
| `groupSection` | `GroupSection` | `GroupSectionDto` | |
| `spotlightSection` | `SpotlightSection` | `SpotlightSectionDto` | |
| `featureLinkSection` | `LinkSection` | `LinkSectionDto` | Real id is `featureLinkSection` — there is **no** `linkSection` content type in the space, despite the discriminator and the `GqlLinkSection` class name. Field shape (heading/subHeading/shortHand/listCard/divider/cta) confirmed against the live `featureLinkSection` content type. |
| `featureSection` | `FeatureSection` | `FeatureSectionDto` | Distinct from `featureLinkSection` above — do not confuse. |
| `table` | `Table` | `TableSectionDto` | |
| `listCardInfoSection` | `ListCardInfoSection` | `ListCardInfoSectionDto` | |
| `pillNavigation` | `PillNavigation` | `PillNavigationDto` | Distinct content type from `pillNavigationSection` (`PillNavigationSectionDto`) — do not confuse. |
| `listCard` | `ListCard` | `ListCardDto` | Dual-interface: also an `ICard` target (see below) — same content type, same `Kind`, reachable both as a standalone page section and as a card inside a heterogeneous card collection. |

## `ICard` targets (12)

| contentTypeId | kind (JSON discriminator) | DTO type | notes |
|---|---|---|---|
| `textImageCard` | `TextImageCard` | `TextImageCardDto` | |
| `image` | `ImageCard` | `ImageCardDto` | Shares content type `image` with `ImageDto` (`IMedia`, below) — the `image` content type has no field that distinguishes "used as media" from "used as a card"; disambiguation is purely by which interface slot the mapper is resolving into. |
| `contactUsCard` | `ContactusCard` | `ContactusCardDto` | |
| `brokerAuctioneerCard` | `BrokerAuctioneerCard` | `BrokerAuctioneerCardDto` | |
| `testimonial` | `Testimonial` | `TestimonialDto` | |
| `blogPost` | `BlogPost` | `BlogPostCardDto` | Shares content type `blogPost` with the vestigial, non-polymorphic `BlogPostDto` (full blog page) — there is no separate `blogPostCard` content type. Confirmed by diffing `blogPost`'s field list (`excerpt`, `title`, `category`, `tags`, `author`, `authorSlug`, `isFeatured`, `heroImage`, ...) against both DTOs' properties; each DTO just selects a different subset of the same content type's fields. |
| `marketShowcaseCard` | `MarketShowcaseCard` | `MarketShowcaseCardDto` | |
| `textCtaSection` | `GlossaryCard` | `GlossaryCardDto` | Real id is `textCtaSection` — the content type's **display name** is literally "Glossary Card" but its id is not `glossaryCard` (no such id exists). `GlossaryCardDto.Kind` is also hardcoded to the literal `"GlossaryCard"` in the DTO itself (backing field ignores the init value) — preserved verbatim from legacy. |
| `listCard` | `ListCard` | `ListCardDto` | Dual-interface: also an `ISection` target (see above). |
| `listCardInfo` | `ListCardInfo` | `ListCardInfoDto` | |
| `spotlightCard` | `SpotlightCard` | `SpotlightCardDto` | |
| `linkCard` | `LinkCard` | `LinkCardDto` | Not reachable via either legacy JSON converter's switch statement — only ever constructed by hand in `ContentMappingProfile`'s `FeatureSection` mapping (from a `listCard`-named reference collection that, per its content shape, actually links `linkCard` entries). Confirms `linkCard` as the id. |

## `IMedia` targets (2)

| contentTypeId | kind (JSON discriminator) | DTO type | notes |
|---|---|---|---|
| `video` | `video` | `VideoDto` | |
| `image` | `image` | `ImageDto` | Shares content type `image` with `ImageCardDto` (`ICard`, above) — disambiguated by target interface, not by a field. |

## Content types that exist in the space but back no polymorphic DTO (informational, out of scope for this table)

- **Page templates** (`homePage`, `landingPage`, `productPage`, `faqPage`, `glossaryPage`, `helpCenterPage`, `rightRailPage`, `discoverPage`): all map to the single non-polymorphic `PageDto` (per-template `CreateMap<GqlXxxPage, PageDto>()`), not through the generic `ISection`/`ICard` mapper.
- **Non-polymorphic nested item types**: `faq`, `factCard`, `step`, `statsPanel`, `statGroup`, `statItem`, `tableColumn`, `tableRow`, `tableCell`, `helpCenterCategory`, `helpCenterArticle`, `helpCenterCard`, `blogCategory`, `blogTag`, `helpCenterArticleTag` — all reached through a strongly-typed (non-polymorphic) collection property, never through generic `ISection`/`ICard`/`IMedia` resolution.
- **Vestigial-interface DTOs that are never actual `[JsonDerivedType]` targets** (implement `ISection`/`ICard` for historical AutoMapper reasons but are unreachable polymorphically): `CallToActionDto` (`cta`), `LinkDto` (`link`), `BackgroundDto` (`background`), `SeoDto` (`seoMetadata`), `HelpCenterArticleDto`, `BlogPostDto` (`blogPost` — see the `BlogPostCardDto` note above), `BlogsDto`, `HelpCenterCategoryDto`, `HelpCenterCardDto`, `FactCardDto`. None of these carry `[ContentType]`.
- **Apparently unused by any current DTO's scalar fields**: `checkbox`, `comparisonSection`, `calculatorSection`. `checkbox` is most likely consumed as an embedded-entry-inline node inside rich text bodies (handled by the rich-text renderer, not a distinct DTO); the other two appear genuinely unused by the current API surface.
