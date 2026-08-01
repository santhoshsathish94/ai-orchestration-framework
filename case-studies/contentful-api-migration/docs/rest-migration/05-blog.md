# 05 — Blog endpoints

**Objective.** Implement all eight blog provider methods with output identical to the old service.
This is the largest domain (multiple composite responses and filter/sort/paging semantics).

**Depends on:** 01, 02 (and calls Task 03's `GetPageBySlugAsync` for the blog index). **Parallel with:** 03, 04, 06, 07.

**Reference (old repo):** `ContentfulContentProvider` methods `GetBlogBySlugAsync`,
`GetRecentBlogPosts`, `GetBlogsAsync`, `GetBlogsByCategoryAsync`, `GetBlogsByTagAsync`,
`GetBlogsByAuthorAsync`, `GetBlogsBySearchParamAsync`, `GetBlogsBySearchAndCategory`,
`GetBlogIndexAsync`, `GetBlogPostListAsync`; the `blog*.graphql` files; `StringConstant.GraphQl_*`
sort/limit constants; DTOs `BlogPostDto, BlogsDto, BlogIndexDto, BlogPageDto, BlogPostCardDto,
BlogPostListDto, BlogCategoryDto`.

---

## Content types
`blogPost` (fields verified: `title`(RichText), `slug`, `isFeatured`, `heroImage`→`image`,
`bodyContent`(RichText), `excerpt`(RichText), `author`, `authorSlug`, `category`→`blogCategory`,
`tags[]`→`blogTag`, `seoMetadata`, `publishedDate`, `lastUpdatedDate`), `blogCategory`, `blogTag`.

## Deliverables (one provider method each)

### 1. `GetBlogBySlugAsync(slug, isPreview, ct)` → `BlogPostDto`
- Fetch the post: `?content_type=blogPost&fields.slug={slug}&include={MaxInclude}&limit=1`.
- **Related posts**: same category, exclude current slug, `limit=3`. Old query
  `relatedBlogPosts.graphql` — reproduce its `where`/order. REST: `fields.category.sys.id` filter
  requires resolving the category link first, or filter by `fields.category` via a nested query
  (`content_type=blogPost&fields.category.sys.id={id}&fields.slug[ne]={slug}&limit=3`). Verify
  ordering matches old.
- **Recent posts**: `order` = old `GraphQl_DefaultSort` (verify exact field, e.g.
  `-fields.publishedDate` or `-sys.firstPublishedAt`), exclude current slug, `count=4`.
- Map post → `BlogPostDto` (rich text from includes). Set `PageType = PageType_BlogPost_Name`,
  `RelatedPosts`, `RecentPosts` (mapped `List<BlogPostCardDto>`).
- Null handling: old returns null in specific branches (e.g. no recent items) — **match exactly**.

### 2. `GetRecentBlogPosts(slug, count, isPreview, ct)` → `List<BlogPostCardDto>`
- `content_type=blogPost`, exclude `slug` if provided, order by default sort, `limit=count`.

### 3. `GetBlogsByCategoryAsync(category, page, count, isPreview, ct)` → `BlogsDto`
### 4. `GetBlogsByTagAsync(tag, page, count, isPreview, ct)` → `BlogsDto`
### 5. `GetBlogsByAuthorAsync(author, page, count, isPreview, ct)` → `BlogsDto`
### 6. `GetBlogsBySearchParamAsync(searchParam, category?, page, count, isPreview, ct)` → `BlogsDto`
Shared filter helper (mirror old `GetBlogsByFilter` + `GetBlogsBySearchAndCategory`):
- Paging via `PagingHelper.GetPaging(page, count)` → `limit`/`skip` (copy helper).
- Category → filter on `blogCategory` (by slug/name — check old `blogsByCategory.graphql`).
- Tag → Contentful `blogTag` link **or** metadata tag — old uses `blogTag` entries + a
  `blogTagCollection` lookup to set `SearchTerm` to the tag's display name. Reproduce:
  REST `fields.tags.sys.id[in]={tagId}` after resolving the tag entry by slug/name.
- Author → `fields.authorSlug` or `fields.author` (check old `blogsByAuthor.graphql`).
- Search → old `blogsBySearch.graphql` uses full-text; REST `query={searchParam}` (optionally
  `&content_type=blogPost`). Search+category → add the category filter (`blogsBySearchAndCategory`).
- Set `PageType` (`"BlogListCategory"|"BlogListTag"|"BlogListSearch"`) and `SearchTerm` **exactly**
  as old (tag→tag display name; category→first post's category; author→first post's author; else the
  raw filter value).

### 7. `GetBlogIndexAsync(page, count, isPreview, ct)` → `BlogIndexDto`
Composite — reproduce old assembly precisely:
- All blogs (paged) → `BlogsPage` = `BlogPageDto { Total, Skip, Limit, Items }`.
- `GetPageBySlugAsync("blog", ...)` → `Sections`, `Kind` (= page's `PageType`).
- Highlighted posts (`highlightedBlogPosts.graphql`, `count=5`).
- Recent posts (`recentBlogPosts.graphql`, `count=3`).
- Categories used (`blogCategoriesUsed.graphql`, limit `BlogCategories_Fetch_Limit`) → distinct by
  slug, ordered by label (`BlogCategoryDto`).
- Featured-by-category (`featuredBlogs.graphql`, `count=FeaturedBlogs_Fetch_Limit`) → grouped by
  category, top `FeaturedBlogs_PerCategory_Limit` each, into `FeaturedByCategory` dictionary.
- Preserve all constants and the exact null-return branches (old returns null if certain
  collections are empty — replicate or Task 08 will flag differences).

### 8. `GetBlogPostListAsync(page?, count?, isPreview, ct)` → `BlogPostListDto`
- Paginated `blogPost` list **without** related/recent. `page/count` both null → old default
  (verify: 100/0 style). The endpoint (Blog route group) validates `page.HasValue == count.HasValue`
  and positivity, returning the same `BadRequest` messages as old.

---

## Acceptance criteria
- Each of the 8 endpoints matches old byte-for-byte across delivery+preview for: a normal case, an
  empty/no-results case, and a paged case (page 2).
- `PageType` and `SearchTerm` values match old for every filter branch.
- Ordering of lists matches old (this is the most likely source of drift — pin the `order` param).

## Out of scope
- Article/Help Center (Task 06). The blog index reuses Task 03's page method — do not reimplement it.
