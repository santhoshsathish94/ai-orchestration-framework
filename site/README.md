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

The page is the narrative arc, not one section per stage. The clover grows as the reader scrolls:
three leaves, then four, then five.

1. Hero — the name, a two or three line explanation, the five-leaf mark, one line per stage. Nothing else
2. AI current capabilities — short
3. Three leaves · the common clover — short
4. Four leaves · the lucky clover — the largest and most important section on the page
5. Five leaves · the growth clover — short
6. The worked example — visual, an end-to-end run, few steps, ending at Success
7. The agent file
8. Security and governance
9. Production case studies and reference implementations
10. What it is not
11. About the author

Failure-mode material is folded into the arc sections as "what happens there" rather than kept
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
- **Three marks carry the arc**, each in a `<figure class="arc__mark">` with a caption. The caption
  is only the name — no geometry or construction detail:
  - three leaves at 120 degrees, labeled Direction, Action, Success — "the common clover";
  - four leaves at 90 degrees, labeled Direction, Context, Action, Success, with Context drawn solid
    as the leaf that just arrived — "the lucky clover";
  - five leaves at 72 degrees, with the Growth leaf drawn dotted because it has not arrived yet —
    "the growth clover". The hero mark carries the same dotted fifth leaf; the small header mark is
    decorative and stays solid.
- Leaf names are real `<text>` labels positioned outside each leaf tip, inside a `viewBox` of
  `-30 -18 160 117` so the labels have room. They are content, not decoration — never replace them
  with a legend.
- Fill state is CSS, not geometry. `.clover__leaf.is-soft` is an established stage,
  `.clover__leaf.is-new` is the stage that just arrived, and `.clover__leaf.is-next` is Growth drawn
  with a dashed stroke and no fill. `.clover__leaf.is-filled` stays for the solid leaves in the
  header and hero.
- Marks that carry meaning get `role="img"` and an `aria-label` naming the leaves. Decorative
  duplicates, such as the one in the header, get `aria-hidden="true"`.
- An arc mark has to hold up between about 200px and 420px; the header and hero marks between about
  26px and 160px. Nothing else is allowed to carry the identity: no brains, robots, circuit boards,
  neural networks, hexagons or glowing AI graphics.

## Editing rules

- **The arc is the spine.** Three leaves, then four, then five. Do not flatten it back into five
  equal sections, and do not reorder the story so Context arrives before Action and Success.
- **Five stages only:** Direction → Context → Action → Success → Growth. Never introduce a competing
  arrow-chain, never append "→ repeat" to that one, and never bring back the short form
  "Where → Know → Do → Validate → Become". Direction is *what*, not *where*.
- **"Leaves" is for the picture.** Say leaves when describing a clover mark. Everywhere else on the
  page, say stages.
- **The working loop is four stages** — Direction, Context, Action, Success. Growth is not something
  a team runs, so no example, walkthrough or diagram gets a Growth step. Examples end at Success and
  loop back into Context.
- **Iteration feeds Context, never Growth.** The page states the rule plainly: after each success or
  failure, the context files are written before the next attempt.
- **Never call it a model.** Clover is an AI Orchestration Framework connecting human Direction,
  real-world Context, AI-driven Action, and validated Success into a repeatable cycle. "Model"
  collides with
  "AI model".
- **Say "human"**, never "person" or "the user", for whoever holds Direction. Direction is the human
  controlling what matters, the desired outcome, constraints, boundaries, and what must not happen,
  and approving. Action is AI determining how the work should happen and executing within those
  boundaries. Never give the human the detailed "how" — it empties Action.
- **No rungs, levels, scores or grades.** The evidence ladder and the autonomy ladder were deleted
  from the framework. State what was checked, what was observed, and where the work stopped.
- **Never invent** metrics, customers, adoption, or results. The React memory leak is a CI-green pull
  request that is *not merged*, and the Contentful production cutover *has not run* — the site must
  keep saying so.
- The four-leaf section says nothing about production. Development first, then the other
  non-production environments. Access is read-only and scoped to what the human already holds.
- Growth is the next stage, never a hypothesis, a prediction or "next phase", and never described as
  dangerous. Do not explain the *Black Clover* or devil association anywhere.
- Never assert that any AI provider trains on customer or enterprise work. Keep the accumulation
  argument structural and unattributed.
- Alternate `.band` and `.band--soft` between adjacent sections so no two neighbors share a
  background. The hero is white and the footer is soft, so the count has to work out at both ends.
- **Use the width.** Sections must not stack down the left in a 68ch column. `.wrong__flow` and
  `.wrong__cols` run the "what happens there" blocks across both columns, `.split` puts a heading
  and lead on the left with the detail on the right, `.stack--2` gives a two-column definition list,
  and `.panel__cols` spreads a tab panel across the full measure.
- Tabs: one generic `initTabs` over `[data-tabs]` groups. The first tab and panel in each group carry
  `aria-selected` and `is-active` in the markup, so nothing flashes before `app.js` runs.
- The worked example is `.run` — plain HTML and CSS, no images and no JavaScript. Keep it to a few
  steps, do not turn it back into prose, and keep it ending at Success with `.run__loop` turning back
  into Context.
- `glossary/index.html` links back to `#problem`, `#direction`, `#context`, `#walkthrough`, `#agent`,
  `#evidence` and `#fifth-leaf` on this page. Those IDs have to keep resolving.
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
