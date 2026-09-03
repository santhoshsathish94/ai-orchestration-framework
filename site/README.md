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
  index.html        the framework: one cycle, at any scale
  start/            getting started: read-only access, the agent file, a first cycle
  security/         security and governance
  evidence/         case studies and reference implementations
  glossary/         searchable terms
  author/           who wrote this, in the first person
  assets/           the peacock feather, and the four evidence diagrams (SVG)
  styles.css
  app.js            tabs, the mobile menu, the scrolling story, the glossary filter
  check.ps1         run before committing: nav consistency, versions, every link
  llms.txt          the repository map for agents
  .nojekyll
```

The page is one continuous argument rather than one section per stage.

1. `#overview` — Hero: the name, the tagline, what Clover is in a sentence, the mark, the stages
2. `#capability` — Where AI already is: what the execution layer can now carry
3. `#why-now` — The bridge: the pattern is not new, what changed is how much of the Action AI carries
4. `#story` — One cycle, any scale: the labelled clover and one step per stage
5. `#scale` — Two dimensions: who is working, and what they are working on
6. `#try` — Four steps on a real problem the reader already has
7. `#evidence-preview` — Case studies, reference implementations, how model reviews are reported
8. `#growth` — What can emerge when meaningful cycles repeat
9. `#governance` — Capability is not authority
10. `#next` — The closing restatement and where to go

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
  - three leaves at 120 degrees, labeled Direction, Action, Outcome — "the common clover";
  - five leaves at 72 degrees, labeled Context, Direction, Action, Outcome and Growth, with Context drawn solid
    as the leaf that just arrived — "the lucky clover";
  - five leaves at 72 degrees, with the Growth leaf drawn dotted as the next stage —
    "the growth clover". The hero mark is five leaves, all solid and unlabeled; the small header mark
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

- **One cycle, shown once.** The page carries a single labelled clover in `#story`. It replaced a
  three-act arc that grew the mark from three leaves to four to five. Do not reintroduce separate
  marks per act.
- **Five stages only:** Context → Direction → Action → Outcome → Growth. Never introduce a competing
  arrow-chain, never append "→ repeat" to that one, and never bring back the short form
  "Where → Know → Do → Validate". Direction is *what*, not *where*.
- **Growth is the fifth stage**, and `#growth` is where the page explains it.
  Not in the hero, not in the stage list, not in the worked steps, not in the definition.
- **"Leaves" is for the picture.** Say leaves when describing a clover mark. Everywhere else on the
  page, say stages.
- **The framework is five stages** — Context, Direction, Action, Outcome, Growth. Growth is something
  a team runs, so no example, walkthrough or diagram gets a Growth step. Examples end at Outcome and
  loop back into Context.
- **Iteration feeds Context, never Growth.** The page states the rule plainly: after each success or
  failure, the context files are written before the next attempt.
- **Never call it a model.** Clover is a way of working with System, Human, and AI to produce
  meaningful outcomes. "Model" collides with "AI model".
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
  move on: AI grew from finishing a line to doing whole jobs, the habit that stuck has the human
  supplying the context by hand, and the systems that hold the real context can now be read by AI
  directly. The human moves from being the source of the context to pointing at it. It is the first
  place the five stages are named in order, so it must say Context first and must not mention Growth.
  Keep it to the setup — the per-stage mechanics belong to the story, which goes much further
  (`#st-limit` on what the common clover costs, `#st-direction-2` on Direction pointing rather than
  describing). State the transition here, then hand over.
- `#story` says nothing about production. Development first, then the other non-production
  environments. Access is read-only and scoped to what the human already holds.
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
- The worked example component is `.run` — plain HTML and CSS, no images and no JavaScript. **No page
  currently uses it**, though its 14 rules are still in `styles.css`. If it comes back, keep it to a
  few steps, do not turn it back into prose, and keep it ending at Outcome with `.run__loop` turning
  back into Context.
- `#story` is the only home-page anchor linked from another page. Keep it resolving, and keep all six
  navs identical.
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
- **The primary nav is seven plain links, and the first is "The Story" pointing at `/#story`.** It was
  a "Framework" dropdown holding the three clover sections and the worked example. The dropdown is
  gone, along with its CSS, its JavaScript and its mobile accordion, because the story section labels
  its own leaves and the reader can pick one there. Do not reintroduce a dropdown to hold anchors that
  the page already exposes. Nav labels are the only Title Case text on the site; everything else,
  including the headings those links point at, stays sentence case.
- **Anchor scrolling is eased in `app.js`, and the duration scales with the distance.** The browser's
  own `scroll-behavior: smooth` runs at a fixed speed, so a jump from the hero down to the story
  arrived almost as abruptly as no animation at all. The CSS rule stays for the no-JS case, and
  `app.js` sets `scroll-behavior: auto` when it takes over so the two are not fighting over the same
  scroll. Anything measuring scroll positions in a test has to account for the animation.
- **Same-origin navigations cross-fade** through `@view-transition`. Browsers without it navigate the
  way they always did. Both the eased scroll and the cross-fade are inside
  `prefers-reduced-motion: no-preference` and turn into instant jumps when reduce is set.
- **`.btn` is the only button style.** Plain is the default, `.btn--primary` is the filled one, and
  `.btn--plain` is a bare link that keeps the same height. One primary per group.
- **`.band--wide` drops the 68ch measure** so a section's prose runs the full width of the wrap.
  `#why-now` uses it. Do not spread it around — 68ch is the reading measure everywhere else for a
  reason, and full-width lines only hold up for a short section.
- **The evidence diagrams are hand-written SVG, and the same four files serve the docs.** They live in
  `assets/` at the repository root and are copied into `site/assets/`; if you change one, copy it
  again or the site and the case study will disagree. They are drawn in the site's palette, they carry
  no icon art, and every one of them ends on a strip naming what the work does **not** show — the
  cutover that has not run, the pull request that is not merged, the pattern that is not always-on.
  Keep that strip. It is the reason the diagrams are allowed on the page at all.
- **The PNG infographics they replaced were wrong** and must not come back. Two of them advertised the
  deleted six stages, one showed the production cutover as a completed step, and one said the memory
  leak fix went to Next.js when it went to React. Any new diagram gets checked against the case study
  text before it ships.
- **The story is a single `[data-story]` block** with its own clover and its own steps. It was three
  separate acts, each with its own mark, because a leaf had to link to a step in the act being read.
  With one block that constraint is gone.
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
- **`#context`, `#st-direction-2`, `#st-action-2` and `#st-outcome-2` are step ids inside the
  story**, not section ids. Nothing in the nav points at them, but keep them — they are the anchors
  the clover leaves link to, and `check.ps1` follows every one. Each leaf and its step share a
  `data-leaf` value, so the four values must stay paired.
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
