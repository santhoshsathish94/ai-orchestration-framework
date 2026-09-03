# Clover — working context

This is the context file the framework asks every piece of work to keep beside itself. It is kept in
the branch so the reasoning travels with the work. Read it first. Write it back after each success
and each failure, before the next attempt.

Last written: 2026-09-01. Branch: `refine/clover-way-of-working`.

---

## Goal

**This branch.** Broaden Clover so it serves three starting positions on one loop, not one:
**understand** something, **build** something new, **change** something that exists. Today only the
third is supported. Position it as the way to work with AI and get to something real — a surface line
a human connects with, with the staged version underneath. Universal by design, not tied to software.

`AGENTS.md` is the artifact under revision, so it is not an authority for this branch. The evidence
honesty discipline is kept.

**Standing.** Keep the repository saying one true thing across the README, the docs, the agent
instructions, the templates, the examples, the case studies and the website — and keep every claim
graded by the evidence that actually exists.

### The premise being removed

Clover currently assumes **a system that already runs**. Three of the four stages encode it, and all
three fail on a new build. Action survives intact.

| Stage | Today | Why it fails on a new build |
|---|---|---|
| Context | "the current systems the organization uses" | there are none |
| Direction | "the desired outcome, constraints, what must not happen" | the outcome is a guess that will move |
| Success | "demonstrated by the real environment" | no environment exists yet |
| Action | "AI determines how, within boundaries" | survives |

### The proposed generalization (agreed in principle 2026-09-01, wording not settled)

- **No new stage.** Still four. Corrected 2026-09-01 after the creator rejected an earlier draft that
  treated understanding as a third way in alongside build and change.
- **Context is read, or it is worked out.** Definition unchanged — what we need to know about reality
  before acting. On a running system it is read. On a new one it is produced, and producing it *is*
  the analysis. Both are Context, and both sit before Direction.
- **Two situations, not three:** a system that already runs, and a system that does not exist yet.
- **"Question-shaped Direction" is dropped.** It was unnecessary. Someone with only a question can
  start because Context comes first; Direction is given once there is enough understood to direct
  against. The Context-first ordering already solved it.
- **Direction** — what the human is accountable for: intent, boundaries, what must not happen. The
  intent may be an outcome or a direction of travel expected to sharpen. Imprecise Direction is not a
  failure to give Direction.
- **Action** — unchanged.
- **Success** — reality showing the claim holds at whatever level of reality exists so far, and naming
  what it does not cover.
- **Every new system becomes an existing system.** Building is the short phase and changing is the
  long one, so build is the passage into change. It also explains where Clover's own precondition
  comes from: a system readable on day one hundred wrote things down on day one.
- **New principle candidate:** when there is no reality to read, the first job is to make the
  smallest piece of reality that can answer back. This replaces "reason from the real environment"
  as the anti-hallucination guard on a new system, where no environment exists.


There is no single feature in flight. The work arrives as passes: a wording correction, a docs
consistency sweep, a website section, a release.

## Established

Checked directly in the repository on 2026-09-01 unless noted.

- Remote is `santhoshsathish94/clover-framework`. The site is served at **cloverframework.com**
  (`site/CNAME`), built by `.github/workflows/pages.yml` from `site/` with no build step.
- `main` is clean and sits on tag **v1.1.3**, commit `ad3412b`. `VERSION` reads `1.1.3`. The
  CHANGELOG's top section is v1.1.3 dated 2026-08-29, so **nothing is unreleased**.
- No open issues and no open pull requests.
- The canonical definition is live in the README, word for word: "Clover is an AI Orchestration
  Framework connecting real-world Context, human Direction, AI-driven Action, and validated Success
  into a repeatable cycle."
- **Four stages, Context first.** A repository-wide search for "five stages" / "five-stage" returns
  nothing, and a search for the old `Direction → Context` order returns nothing. The Context-first
  reorder is complete as far as text search can show.
- Growth appears only where it is allowed to. Every `Growth` match in `case-studies/`
  `02-react-rsc-memory-leak.md` and in `docs/field-practices.md` is the phrase "memory growth", not
  the stage. The stage itself appears in the three-then-four-then-five clover story in
  `docs/02-philosophy.md` and `docs/04-framework.md`, and in `docs/clover-origin.md` and
  `hypothesis/ai-future.md`, whose subject is the fifth leaf.

### Scope of the "AI orchestration" positioning — measured 2026-09-01

- The exact phrase **"AI Orchestration Framework" appears 21 times across 14 files**: `site/index.html`
  (5), `docs/clover-origin.md` (2), `README.md` (2), `site/glossary/index.html` (2), and one each in
  `AGENTS.md`, `QUICKSTART.md`, `CHANGELOG.md`, `assets/social-preview.svg`, `docs/01-problem.md`,
  `docs/02-philosophy.md`, `docs/04-framework.md`, `docs/glossary.md`, `site/llms.txt`,
  `site/README.md`.
- The **canonical definition sentence** sits in **19 places across 17 files**, including baked-in text
  in `assets/social-preview.svg`, which is rasterized to `social-preview.png` — the GitHub and Open
  Graph card.
- The looser stem `orchestrat*` appears **125 times across 37 files**.
- Three **paths** carry the word: `assets/ai-orchestration-progression.svg`,
  `docs/orchestration-environment.md`, `templates/orchestration-brief.md`. The last two are linked
  from other documents and from the site.
- The **GitHub repository description** leads with "an AI Orchestration Framework", and one of the 20
  topics is `ai-orchestration`.
- The repository **name is already neutral** (`clover-framework`) and so is the domain
  (`cloverframework.com`). Only the local folder is still `ai-orchestration-framework`, and
  `.github/copilot-instructions.md` points at it by that path.
- **"way of working" is already live** in 10 files — 3 times in `README.md`, 3 in `site/index.html` —
  and the GitHub description already says "A way of working rather than software."
- **"real outcome" appears nowhere.** That phrasing would be new.

### What the word is still load-bearing for

- The **slogan "Agentic workflows repeat. Orchestration learns." is already gone** from every live
  file. It survives only in a historical `CHANGELOG` entry, so there is no collision there.
- The **progression argument is still live**: models answer, agents act, agentic workflows repeat, and
  orchestration keeps what the outcome showed. It is in `docs/04-framework.md` (§ "From AI models to
  AI orchestration", lines 57–63), `docs/glossary.md:38`, `site/glossary/index.html:93`, and as
  baked-in text inside `assets/ai-orchestration-progression.svg`. Dropping the word leaves the last
  rung of that argument unnamed.

### A defect the framework has in itself

- `AGENTS.md` § 2 is titled **"Before you touch anything, talk to the human"** and its first bullet is
  **"Ask what they are trying to get done."** That tells an agent to open at Direction, before any
  Context exists — the opposite of Context first. Observed live on 2026-09-01: following that section
  produced exactly the wrong opening, and the creator corrected it.
- `docs/04-framework.md` Stage 1 splits Context into "What the human holds" and "What AI does", but
  **nothing says the two must agree on the context before Direction is given.** There is no shared-
  understanding gate, and nothing that makes supplying the context AI cannot reach part of the
  human's job at that stage.

### Breadth is claimed, never demonstrated

- [`docs/04-framework.md`](docs/04-framework.md) § "Applying the framework" lists ten functions from
  software engineering to HR, gated by the clause "it fits anywhere work **has an intended outcome
  that somebody has to stand behind**" — which is the outcome-first assumption being removed.
- `site/index.html` says the same thing in a `<p class="note">` at the bottom of "What it is not".
- Every worked example is software: both `04-framework` examples, both case studies, both reference
  implementations. Breadth is claimed ten functions wide and shown one wide.
- Precedent for the honest framing already exists in `docs/01-problem.md`: software engineering is the
  origin and evidence base, not the boundary. Recommended line: **universal by design, evidenced in
  software engineering**, in that order.

## Remaining

Direction has been given on the repositioning and on broadening to three starting positions. It has
**not** been given on wording, or on how far the change reaches.

- The surface line, in the creator's voice. `docs/clover-origin.md` forbids generic AI marketing
  language.
- Whether "orchestration" goes entirely, or stops being the category and survives as the name of the
  last rung in the progression argument. The second option keeps `04-framework` § "From AI models to
  AI orchestration", the glossary and the two `orchestration-*` filenames intact.
- What replaces the canonical definition sentence, given it is baked into artwork that must be
  rasterized with GDI+ rather than a headless browser.
- Whether a non-software worked example can be sourced from a real case, or must be labelled
  illustrative.
- Whether `AGENTS.md` is rewritten on this branch. Its § 2 defect is recorded above.
- **Stale branches.** Local `clover` and `site-next`; remote `clover`, `site-next`,
  `agent/core-opportunity-understand-plan-execute-proof-grow`, `agent/visual-assets-update`. Deleting
  a remote branch needs approval and has not been asked for.
- **Website plan.** `c:\personal\oss\build_the_website_for_the_framework.md` (v2) is the live plan and
  lives outside the repository. Its state against the current site has not been re-read this session.
- Carried from earlier sessions and **not re-verified**: whether `docs/04-framework.md`'s "Widening
  what AI decides" still frames AI-determines-the-path as a maturity outcome, which sits awkwardly
  against Action being AI-determines-how by definition.

## Ruled out

- Growth as a stage of the framework. It is the next stage and nobody in an organization runs it.
  Never "five stages" in working material.
- Evidence rungs (1–5) and the autonomy ladder (L0–L4) as a way of grading claims in prose. Say what
  was checked, what was observed, and where you stopped.
- Calling Clover a "model". It is a framework, and a five-leaf way of working with AI. "Model" is
  reserved for AI models.
- Opening a session by asking for the outcome. Context is joint work — the agent presents what is
  actually there, the human confirms the direction against it and supplies the context the agent
  could not reach. Neither side moves on until both agree the context is understood.
- An alternate slogan. "Agentic workflows repeat. Orchestration learns." was the canonical one, and
  as of 2026-09-01 it is in no live file. Do not reintroduce a competing one.

## Evidence

**This branch's own work.** `DRAFT-clover-broadened.md` is a draft on the branch, uncommitted. The
only change against `main` is three lines in `.gitignore`. No framework document has been touched,
and the new approach is not committed to replacing the existing one.

What the repository's own claims rest on, and what they do not cover.

- **Case study 01, Contentful migration.** Parity-validated byte-for-byte against live traffic in
  **preprod only. The production cutover has never run.** Never say "in production", "shipped" or
  "cutover complete" for it.
- **Case study 02, React RSC memory leak.** Contributed upstream, CI-green, **not merged**. Say
  "contributed upstream", never "fixed upstream".
- **Both reference implementations.** Built and demonstrated on real organizational data across a few
  real cases. Not in front of end users, and not adopted organization-wide. Fully anonymized.
- **Case study 03** is a reasoning pattern. There is no outcome measurement behind it.
- **The website.** Links, anchors, duplicate IDs and viewport overflow have been verified by script
  and by Playwright in past passes. **Lighthouse has never been run.** A genuine JS-disabled run and
  `prefers-reduced-motion` have never been verified.
- **This file.** Everything under Established was read out of the working tree today. Everything under
  Remaining that is marked "carried from earlier sessions" was not, and should be treated as a
  hypothesis until re-read.
