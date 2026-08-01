# 06 — Help Center / Article endpoints

**Objective.** Implement the five Help Center provider methods with output identical to the old
service.

**Depends on:** 01, 02. **Parallel with:** 03–05, 07.

**Reference (old repo):** `ContentfulContentProvider` methods `GetArticleBySlugAsync`,
`GetArticlesByCategoryAsync`, `GetArticlesByTagAsync`, `GetArticlesBySearchParamAsync`,
`GetHelpCenterArticleListAsync`, and helper `GetArticlesByFilter`; queries
`article.graphql`, `helpcenterByCategory.graphql`, `helpcenterByTag.graphql`,
`helpcenterBySearch.graphql`, `helpCenterArticleList.graphql`; DTOs `HelpCenterArticleDto`,
`ArticleListDto`, `ArticleSummaryDto`, `ArticleSummaryListDto`, `HelpCenterArticleListDto`,
`HelpCenterCategoryDto`.

---

## Content types
`helpCenterArticle` (+ its `category` → help-center category, Contentful tags for tag filtering),
and the help-center category type. Confirm exact ids/fields via MCP `get_content_type`.

## Deliverables (one provider method each)

### 1. `GetArticleBySlugAsync(slug, isPreview, ct)` → `HelpCenterArticleDto`
- `?content_type=helpCenterArticle&fields.slug={slug}&include={MaxInclude}&limit=1`.
- Rich text (body/etc.) rendered from includes (old did a separate link fetch — not needed).
- Map → `HelpCenterArticleDto`. Null when not found.

### 2. `GetArticlesByCategoryAsync(category, isPreview, ct)` → `ArticleListDto`
- Filter by category (by slug/name per `helpcenterByCategory.graphql`). No paging in old signature.
- Set `SearchTerm = articles.Articles?.FirstOrDefault()?.Category?.CategoryName` (match old).

### 3. `GetArticlesByTagAsync(tag, page, count, isPreview, ct)` → `ArticleSummaryListDto`
- Contentful **tag** filter: `metadata.tags.sys.id[in]={tag}` (old passes tag ids like `LCPDP`).
  Verify whether old filters by metadata tag or a `tag` field. Paged via `PagingHelper`.
- Returns the **summary** list DTO (lighter shape) — confirm which fields differ from full article.

### 4. `GetArticlesBySearchParamAsync(searchParam, page, count, isPreview, ct)` → `ArticleListDto`
- Full-text `query={searchParam}` scoped to `helpCenterArticle`, paged. `SearchTerm = searchParam`.

### 5. `GetHelpCenterArticleListAsync(page?, count?, isPreview, ct)` → `HelpCenterArticleListDto`
- Paginated list. `page/count` null → old default (`100/0` per old code — verify). Build
  `{ Total, Skip, Limit, Articles }` from the CDA collection metadata.

---

## Acceptance criteria
- All five endpoints match old byte-for-byte (delivery+preview): normal, empty, and paged cases.
- `SearchTerm` and the summary-vs-full DTO shapes match old exactly.
- Tag filtering returns the same set/order as old for a known tag id.

## Out of scope
- Blog (Task 05). Glossary (Task 07).
