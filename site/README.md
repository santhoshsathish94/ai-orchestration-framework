# Website

The public site for Clover:
**https://cloverframework.com/**

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
  index.html        the framework: the story, three stages then four then five
  start/            getting started: read-only access, the agent file, a first cycle
  security/         security and governance
  evidence/         case studies and reference implementations
  glossary/         searchable terms
  author/           who wrote this, in the first person
  assets/           the peacock feather, the only image the site loads
  styles.css
  app.js            tabs, the mobile menu, the nav dropdown, the glossary filter
  check.ps1         run before committing: nav consistency, versions, every link
  llms.txt          the repository map for agents
  .nojekyll
```

The page is the narrative arc, not one section per stage. The clover grows as the reader scrolls:
three leaves, then four, then five.

1. Hero — the name, the canonical definition, the four-leaf mark, one line per stage. Nothing else
2. AI current capabilities — short
3. Why now — the bridge: one human feeding one conversation stops working once AI does every job at
   once. Ends by naming the four stages in order and handing to the story
4. Three leaves · the common clover — short
5. Four leaves · the lucky clover — the largest and most important section on the page
6. Five leaves · the growth clover — short
7. The worked example — visual, an end-to-end run, few steps, ending at Success
8. The agent file
9. Security and governance
10. Production case studies and reference implementations
11. What it is not
12. The unknown clover — the question to leave with

There is no author section on this page. The nav and the footer both link to `author/` instead.

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
  - four leaves at 90 degrees, labeled Context, Direction, Action, Success, with Context drawn solid
    as the leaf that just arrived — "the lucky clover";
  - five leaves at 72 degrees, with the Growth leaf drawn dotted as the next stage —
    "the growth clover". The hero mark is four leaves, all solid and unlabeled; the small header mark
    is decorative and stays solid.
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

- **The arc is the spine.** Three leaves, then four, then five. Do not flatten it back into equal
  sections, and do not move the four-leaf section ahead of the three-leaf one.
- **Four stages only:** Context → Direction → Action → Success. Never introduce a competing
  arrow-chain, never append "→ repeat" to that one, and never bring back the short form
  "Where → Know → Do → Validate". Direction is *what*, not *where*.
- **Growth is not part of the framework**, so it appears in exactly one section, `#fifth-leaf`, and
  nowhere else on the page. Not in the hero, not in a stage list, not in an example, not in the
  definition.
- **"Leaves" is for the picture.** Say leaves when describing a clover mark. Everywhere else on the
  page, say stages.
- **The framework is four stages** — Context, Direction, Action, Success. Growth is not something
  a team runs, so no example, walkthrough or diagram gets a Growth step. Examples end at Success and
  loop back into Context.
- **Iteration feeds Context, never Growth.** The page states the rule plainly: after each success or
  failure, the context files are written before the next attempt.
- **Never call it a model.** Clover is an AI Orchestration Framework connecting real-world Context,
  human Direction, AI-driven Action, and validated Success into a repeatable cycle. "Model" collides
  with "AI model".
- **Say "human"**, never "person" or "the user", for whoever holds Direction. Direction is the human
  controlling what matters, the desired outcome, constraints, boundaries, and what must not happen,
  and approving. Action is AI determining how the work should happen and executing within those
  boundaries. Never give the human the detailed "how" — it empties Action.
- **No rungs, levels, scores or grades.** The evidence ladder and the autonomy ladder were deleted
  from the framework. State what was checked, what was observed, and where the work stopped.
- **Never invent** metrics, customers, adoption, or results. The React memory leak is a CI-green pull
  request that is *not merged*, and the Contentful production cutover *has not run* — the site must
  keep saying so.
- **`#capability` is short on purpose.** Six roles and one paragraph, in the same voice as the rest
  of the page. It says what AI can already do and stops there. Do not turn it into a benchmark table,
  do not add scores, and do not start arguing about what AI is missing — that argument belongs to the
  story below it, and making it twice weakens both.
- **`#why-now` is the framework's introduction.** It carries the reason the common clover has to
  move on: one human feeding one conversation was fine for a tool that did one job, and it becomes
  the limit the moment AI can do every job at once. It is the first place the four stages are named
  in order, so it must say Context first and must not mention Growth. Keep it to the argument — the
  per-clover mechanics belong to the story, and `#st-limit` already says that two of the common
  clover's three stages rest on one human. Do not repeat that here.
- The four-leaf section says nothing about production. Development first, then the other
  non-production environments. Access is read-only and scoped to what the human already holds. It is
  also where the page explains why Context comes first, and that explanation appears once.
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
- `glossary/index.html` and `author/index.html` both link back to `#three-leaves`, `#context`,
  `#fifth-leaf`, `#walkthrough`, `#agent` and `#evidence` on this page. Those IDs have to keep
  resolving, and all three navs are identical.
- `author/index.html` is the one page written in the first person about a life rather than about the
  framework. It is also the one place *Black Clover* may be named, as a favorite anime. It ends on
  the verse, with no closing section and no site footer. Leave all of that alone.
- **The clover is not used on the author page.** Its mark is a peacock feather,
  `site/assets/peacock-feather.png`, shown twice — beside the name, and above the verse. It is the
  only raster asset the site loads, cropped with the white knocked out to transparency. The clover
  stands for the framework; the feather stands for the author. Do not swap one for the other.
- **Six pages, no build step, so the header, nav and footer are copied into each one.** They will
  drift. Run `pwsh -File site/check.ps1` before committing: it resolves every nav link to a
  site-root path and fails if the six pages disagree, checks the `?v=` versions match, and follows
  every relative link and every anchor.
- **The primary nav is seven items, and "Framework" is a dropdown.** The three clover sections and
  the worked example live inside it, pointing at anchors on the home page. On wide screens it is an
  absolutely positioned panel; below 1000px it becomes an accordion inside the mobile menu.
  Without JavaScript the button is hidden and the panel renders inline, so every link stays reachable.
- **`.btn` is the only button style.** Plain is the default, `.btn--primary` is the filled one, and
  `.btn--plain` is a bare link that keeps the same height. One primary per group.
- **The story is three acts, and each act is its own `[data-story]` block** with its own sticky
  clover and its own steps: three leaves, then four, then five. They are separate clovers rather than
  one clover that morphs, because a leaf has to link to a step in the act being read — a shared
  clover sent every click back to the first act.
- **Each `.story__step` carries `data-leaf` and `data-caption`**, and the last one carries
  `data-ink`. `app.js` picks, per block, the step whose centre is nearest the middle of the viewport,
  and highlights that leaf and its label. Nearest-to-centre is used rather than an
  IntersectionObserver because it gives the same answer scrolling up as scrolling down; an observer
  fires on entry and leaves the highlight stale on the way back up. Scrolling is never taken over.
- **Every leaf carries a `<text class="story__label">`** naming the stage, and the label highlights
  with its leaf. The labels are content, not decoration — a reader has to be able to tell which stage
  is being described without counting leaves.
- **Leaf links are SVG `<a class="story__leaf-link">` scoped to their own act**, with an
  `aria-label`, so they are clickable and focusable and still jump to the right step without
  JavaScript.
- **The nav's Framework dropdown points into the story** — `#three-leaves`, `#context`, `#fifth-leaf`
  are step ids now, not section ids. Keep those ids if you move the steps.
- American spelling. No employer, product, cluster or infrastructure names.
- **Bump the `?v=` on `styles.css` and `app.js` whenever either changes.** All three pages carry it.
  GitHub Pages sends `Cache-Control: max-age=600` on every file and they expire independently, so
  without it a returning visitor gets new HTML with a ten-minute-old stylesheet and the page renders
  broken. Match it to the version in `VERSION`.
- New terminology goes in [`docs/glossary.md`](../docs/glossary.md) first, then the site.

## Social preview

`assets/social-preview.svg` is the design source; `assets/social-preview.png` is the exported
**1280×640** card used for both the site's `og:image` and the repository social preview
(Settings → General → Social preview, which has no API).

Light background, teal accents, matching the site. Keep important content inside a ~40px margin —
GitHub crops the edges at some sizes.

> The card still carries the old six-stage artwork. It needs re-exporting for Clover; the `og:image`
> tags in `index.html` point at it and will pick up the new file with no markup change.
