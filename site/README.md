# Website

The public site for the AI Orchestration Framework:
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
  index.html        the whole story, one page
  glossary/         searchable terms
  styles.css
  app.js            tabs, diagram highlighting, glossary filter
  .nojekyll
```

## How it is built

- **No framework, no build step, no dependencies.** A framework repo whose own site needs a toolchain
  to render six boxes would undercut its own argument.
- **Progressive enhancement.** Every panel is in the DOM and readable with JavaScript disabled;
  `app.js` only reveals and highlights.
- **Inline SVG** for the lifecycle diagram — themeable, tiny, and no charting library.
- Deployed by `.github/workflows/pages.yml` on any push to `main` that touches `site/`.

## Editing rules

- **One loop only:** Opportunity → Understand → Plan → Execute → Proof → Grow. Never introduce a
  competing arrow-chain.
- **Never invent** metrics, customers, adoption, or results. Case study 02 is *awaiting review, not
  merged* — the site must keep saying so.
- The AI Future hypothesis stays labelled speculative and separate from the framework.
- New terminology goes in [`docs/glossary.md`](../docs/glossary.md) first, then the site.

The full plan, including acceptance criteria, lives outside this repo in
`build_the_website_for_the_framework.md`.
