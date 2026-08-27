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
  index.html        the whole story, one page, eleven sections
  glossary/         searchable terms
  styles.css
  app.js            tabs and the glossary filter
  llms.txt          the repository map for agents
  .nojekyll
```

The page is the narrative arc, not one section per leaf. The clover grows as the reader scrolls:
three leaves, then four, then five.

1. Hero
2. Where AI already is
3. Three leaves — Direction, Action, Success. How AI is used today
4. The fourth leaf — Context. The breakthrough, and the longest section on the page
5. The fifth leaf — Growth. Not here yet
6. The agent file
7. One real problem, start to finish
8. Security and governance
9. Evidence
10. What it is not
11. About the author

Failure-mode material is folded into the arc sections as "what goes wrong here" rather than kept
standalone.

## How it is built

- **No framework, no build step, no dependencies.** A framework repo whose own site needed a
  toolchain to render five leaves would undercut its own argument.
- **Progressive enhancement.** Every panel is in the DOM and readable with JavaScript disabled;
  `app.js` only reveals and highlights.
- **Inline SVG** for the clover marks — themeable, tiny, and no image assets.
- Deployed by `.github/workflows/pages.yml` on any push to `main` that touches `site/`.

## The clover marks

The marks are the site's identity and they carry the argument, so they have rules of their own.

- One `<path id="clover-leaf">` lives in a hidden sprite `<svg>` at the top of each page. Every mark
  is that single leaf `<use>`d and rotated around the point `(50, 44)` over a short stem. There is no
  second leaf path anywhere — add one and the identity drifts.
- **Three marks carry the arc**, each in a `<figure class="arc__mark">` with a caption:
  - three leaves at 120 degrees, labeled Direction, Action, Success;
  - four leaves at 90 degrees, labeled Direction, Context, Action, Success, with Context drawn solid
    as the leaf that just arrived;
  - five leaves at 72 degrees, with Growth as a dashed outline because it has not arrived.
- Leaf names are real `<text>` labels positioned outside each leaf tip, inside a `viewBox` of
  `-30 -18 160 117` so the labels have room. They are content, not decoration — never replace them
  with a legend.
- Fill state is CSS, not geometry. `.clover__leaf.is-soft` is an established leaf,
  `.clover__leaf.is-new` is the leaf that just arrived, `.clover__leaf.is-ghost` is one that has not.
  `.clover__leaf.is-filled` stays for the solid five-leaf marks in the header and hero.
- Marks that carry meaning get `role="img"` and an `aria-label` naming the leaves. Decorative
  duplicates, such as the one in the header, get `aria-hidden="true"`.
- An arc mark has to hold up between about 200px and 420px; the header and hero marks between about
  26px and 160px. Nothing else is allowed to carry the identity: no brains, robots, circuit boards,
  neural networks, hexagons or glowing AI graphics.

## Editing rules

- **The arc is the spine.** Three leaves, then four, then five. Do not flatten it back into five
  equal sections, and do not reorder the story so Context arrives before Action and Success.
- **Five leaves only:** Direction → Context → Action → Success → Growth. Never introduce a competing
  arrow-chain, and never append "→ repeat" to that one.
- **No rungs, levels, scores or grades.** The evidence ladder and the autonomy ladder were deleted
  from the framework. State what was checked, what was observed, and where the work stopped.
- **Never invent** metrics, customers, adoption, or results. The React memory leak is a CI-green pull
  request that is *not merged*, and the Contentful production cutover *has not run* — the site must
  keep saying so.
- The fifth leaf stays labeled as a hypothesis, Growth is never described as dangerous, and the
  speculation stops where the fifth-leaf section stops.
- Never assert that any AI provider trains on customer or enterprise work. Keep the accumulation
  argument structural and unattributed.
- Alternate `.band` and `.band--soft` between adjacent sections so no two neighbors share a
  background. The hero is white and the footer is soft, so the count has to work out at both ends.
- Tabs: one generic `initTabs` over `[data-tabs]` groups. The first tab and panel in each group carry
  `aria-selected` and `is-active` in the markup, so nothing flashes before `app.js` runs.
- `glossary/index.html` links back to `#problem`, `#direction` and `#fifth-leaf` on this page. Those
  three IDs have to keep resolving.
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
