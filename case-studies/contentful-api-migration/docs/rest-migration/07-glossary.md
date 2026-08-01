# 07 — Glossary endpoint

**Objective.** Implement `GetGlossaryCardListAsync(page?, count?, isPreview, ct)` →
`GlossaryCardListDto`, identical to old output.

**Depends on:** 01, 02. **Parallel with:** 03–06.

**Reference (old repo):** `ContentfulContentProvider.GetGlossaryCardListAsync`,
`GraphQLQueries/glossaryCardList.graphql`, DTOs `GlossaryCardListDto`, `GlossaryCardDto`.

---

## Deliverables

### `GetGlossaryCardListAsync(page?, count?, isPreview, ct)`
- Content type: the glossary card type (confirm id via MCP `get_content_type`; likely
  `glossaryCard`).
- Paginated: `PagingHelper.GetPaging(page, count)` → `limit`/`skip`; `page/count` null → old default
  (verify). Order to match old (`glossaryCardList.graphql` order clause).
- Map each entry → `GlossaryCardDto`; assemble `GlossaryCardListDto { Total, Skip, Limit, Cards }`
  (match old property names/paging metadata).
- The `Glossary` Minimal API endpoint (`GET /Glossary/list`) validates
  `page.HasValue == count.HasValue` and positivity, returning the same `BadRequest` messages as old.

---

## Acceptance criteria
- `GET /Glossary/list` matches old byte-for-byte (delivery+preview): default, paged, and
  invalid-args (BadRequest) cases.

## Out of scope
- All other domains.
