# Website

The public site for Clover:
**https://santhoshsathish94.github.io/ai-orchestration-framework/**

> The website explains. The repository documents. The repository is the source of truth — if the two
> disagree, the repository is right and the site is a bug.

## Running it locally

There is no build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000 --directory site
```

## Structure

```
site/
  index.html        the whole story, one page, fourteen sections
  glossary/         searchable terms
  styles.css
  app.js            tabs and the glossary filter
  llms.txt          the repository map for agents
  .nojekyll
```

The page runs top to bottom: hero, the problem this solves, the five leaves one section each, the
agent file, a worked problem, security and governance, evidence, what it is not, the fifth leaf, and
the author.

## How it is built

- **No framework, no build step, no dependencies.** A framework repo whose own site needed a
  toolchain to render five leaves would undercut its own argument.
- **Progressive enhancement.** Every panel is in the DOM and readable with JavaScript disabled;
  `app.js` only reveals and highlights.
- **Inline SVG** for the clover mark — themeable, tiny, and no image assets.
- Deployed by `.github/workflows/pages.yml` on any push to `main` that touches `site/`.

## The clover mark

The mark is the site's identity, so it has rules of its own.

- One `<path id="clover-leaf">` lives in a hidden sprite `<svg>` at the top of each page. Every mark
  is that single leaf `<use>`d five times, rotated 72 degrees apart around the point `(50, 44)`,
  over a short stem. There is no second leaf path anywhere — add one and the identity drifts.
- Fill state is CSS, not geometry. `.clover__leaf` draws a light outline with no fill;
  `.clover__leaf.is-filled` fills it with the accent color.
- Each leaf section carries the mark with that many leaves filled: one at Direction, two at Context,
  three at Action, four at Success, five at Growth. The clover completes as the reader scrolls.
- Marks that carry meaning get `role="img"` and an `aria-label` naming the count. Decorative
  duplicates, such as the one in the header, get `aria-hidden="true"`.
- It has to hold up between about 64px and 160px. Nothing else is allowed to carry the identity:
  no brains, robots, circuit boards, neural networks, hexagons or glowing AI graphics.

## Editing rules

- **Five leaves only:** Direction → Context → Action → Success → Growth. Never introduce a competing
  arrow-chain, and never append "→ repeat" to that one.
- **No rungs, levels, scores or grades.** The evidence ladder and the autonomy ladder were deleted
  from the framework. State what was checked, what was observed, and where the work stopped.
- **Never invent** metrics, customers, adoption, or results. The React memory leak is a CI-green pull
  request that is *not merged*, and the Contentful production cutover *has not run* — the site must
  keep saying so.
- The fifth leaf stays labeled as a hypothesis, and Growth is never described as dangerous.
- Alternate `.band` and `.band--soft` between adjacent sections so no two neighbors share a
  background.
- Tabs: one generic `initTabs` over `[data-tabs]` groups. The first tab and panel in each group carry
  `aria-selected` and `is-active` in the markup, so nothing flashes before `app.js` runs.
- American spelling. No employer, product, cluster or infrastructure names.
- New terminology goes in [`docs/glossary.md`](../docs/glossary.md) first, then the site.

## Social preview

`assets/social-preview.svg` is the design source; `assets/social-preview.png` is the exported
**1280×640** card used for both the site's `og:image` and the repository social preview
(Settings → General → Social preview, which has no API).

Light background, teal accents, matching the site. Keep important content inside a ~40px margin —
GitHub crops the edges at some sizes.

> The card still carries the old six-stage artwork. It needs re-exporting for Clover; the `og:image`
> tags in `index.html` point at it and will pick up the new file with no markup change.
