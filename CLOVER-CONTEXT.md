# Clover rewrite — working context

> Working file for the `clover` branch rewrite. **Delete before merging to `main`.**
> Every agent working on this rewrite reads this file first and updates the Remaining
> section when it finishes.

## Goal

Rename and reframe the AI Orchestration Framework as **Clover**, a five-leaf model. Rewrite the
whole repository — docs, agent file, templates, case studies, README and website — so the five
leaves are the spine of everything.

Done means: no reference anywhere to the old six-stage model, every document reads as one voice,
every link resolves, and the website flows top to bottom with one leaf per section.

## Established — do not re-decide these

### The narrative arc — THIS IS THE SPINE OF EVERYTHING

Clover is told as a clover that grows: **three leaves → four leaves → five leaves.** The number of
leaves is the argument, not decoration. A three-leaf clover is ordinary and everywhere. A four-leaf
clover is the rare one. A five-leaf clover is rarer still, and it has not arrived yet.

Do not present the five leaves as five equal sections. Tell it in this order.

**Opening — where AI already is.** Start by stating plainly how far AI has come and how useful it
already is. It works as an expert software engineer, a quality assurance engineer, a security
specialist, and more besides, and it backs that with real analysis rather than recall. This is the
setup: the capability is not the missing piece.

**Three leaves — Direction, Action, Success.** How AI is used almost everywhere today. A human
supplies the Direction. AI performs the Action, using whatever direction and context the human typed
in. The result becomes Success after several iterations. This works, and it is ordinary. It is the
three-leaf clover.

**Four leaves — Context is the fourth leaf, and it is the breakthrough.** Human-supplied context,
written out by the person who already understands the problem, has stopped being the useful kind.
Context has changed, because AI can now hold far more of it than it could before. That is the
breakthrough worth building on.

So context now means the things the organization already has:

- the repositories
- the many projects and the documentation kept for each application
- the actual data, from every datasource the application connects to
- the logs and telemetry the application produces
- the deployment environments
- the running applications and websites themselves

You do not hand all of that over at once. You give access to what the person already has access to,
at the privileges they already hold. Read-only is enough. Where an organization has security and
governance concerns, the answers are the ones set out in the governance material — point there
rather than repeating it.

Even with all of that connected, the system is still a needle in a haystack. **That is what changes
Direction.** The people who work on the system every day can point at roughly where the needle fell.
Expecting AI to search the whole haystack does not work. Direction plus real context is what makes
the difference, and that combination is what produces Success worth having — the kind every
organization wants and every team can reach.

It is iterative. Each result improves the context for the next pass. Markdown files kept beside the
work are a good way to track progress and hold a summary of the context. That summary is what lets
any agent pick the work up. **No single agent has to hold the job anymore.** With the context
written down, any agent can understand it and act on it.

**Five leaves — Growth, and it is not here yet.** Say plainly that this leaf does not affect
organizations today. We have seen how far AI has come with the four-leaf way of working. The fifth
leaf is what emerges next. Every problem solved with AI produces information, patterns accumulate
across an enormous number of interactions, and new expertise forms out of that. The next phase is AI
that works from goals with much less direction, and that could produce results at the scale of an
entire organization's output.

Stop there. Further hypothesis material is being revised separately — do not extend past this point.

### The five leaves

**Direction → Context → Action → Success → Growth**

That is the canonical order of the model. Do **not** append "→ repeat" to it. The cycle does feed
back, and Growth shapes the next pass — say that in a sentence, not in the arrow chain.

Note the difference between the model order and the story order. The model reads Direction → Context
→ Action → Success → Growth. The story arrives as Direction, Action, Success first, then Context as
the fourth leaf, then Growth as the fifth. Both are true, and the story is what the website and the
introductions use.

Short form: **Where → Know → Do → Validate → Become**

| Leaf | What it is | Core question |
|---|---|---|
| **Direction** | Human intent, purpose, priorities, constraints, and what should *not* be pursued. With real context available, Direction becomes pointing at where the answer probably is. | Where are we going, and what outcome are we trying to achieve? |
| **Context** | Everything the organization already has that describes reality — repositories, documentation, real data, logs and telemetry, deployment environments, the running applications. | What do we need to know about reality before acting? |
| **Action** | Reasoning, planning, orchestration, tool selection, model selection, execution, iteration, code changes, testing, debugging. | What should we do, and how should the work happen? |
| **Success** | The intended outcome demonstrated by the real environment. Not the AI saying it worked, not a plausible answer, not model confidence. | Did reality validate the intended outcome? |
| **Growth** | What accumulates across many cycles — patterns, expertise, capability. Not something an organization gets today. | What did the system become or learn? |

### One claim to handle carefully

The idea that every organization's success makes AI stronger is worth stating as a general
mechanism: solved problems produce information, patterns accumulate, and models improve over time.
Do **not** assert that any specific AI provider trains on customer or enterprise work. Many
explicitly do not. Keep it structural and unattributed.

### Why these names, and not the old ones

Keep these reasons available in the docs; they are the argument, not trivia.

- **Direction**, not Opportunity or Control. Control describes the human role, but it implies humans
  can perfectly control an increasingly capable system. Direction does not overclaim that.
- **Context**, not Understand. Understanding is a result inside a head. Context is the material the
  system has to work from. An AI can be given the context and still get it wrong — the distinction
  matters.
- **Action**, not Plan + Execute. One leaf covers deciding how the work happens and doing it.
- **Success**, not Proof or Results. Results describes what happened. Success asks whether the
  intended outcome was actually achieved. **The environment is the evidence of success.**
- **Growth**, not Grow or Learning. It is not just model learning. It is what the system becomes.

### Mapping from the old model

| Old | New |
|---|---|
| Opportunity | Direction |
| Understand | Context |
| Plan + Execute | Action |
| Proof | Success |
| Grow | Growth |

Six principles become **five, one per leaf**.

### The two layers — keep them separate

**Engineering layer.** The five leaves, useful today. This is what the framework establishes.

**Hypothesis layer.** If every cycle produces Growth, and Growth is persistent, compounding and
increasingly capable, nobody knows where the cycle ends. Questions worth asking: what happens when
growth is shared across many systems; when it is embodied through robotics; when a system starts
influencing or selecting its own Direction rather than executing the one it was given.

Rules for the hypothesis layer:

- It is a **question, not a prediction**. Never present speculation as established fact.
- Never claim autonomy or harm is inevitable.
- Never turn it into fear-based AI commentary.
- Label it clearly and keep it out of the engineering material.

### The fifth leaf and the clover symbol

The five-leaf clover is the framework's identity, not decoration. It is personally inspired by
*Black Clover*, where the fifth leaf carries a devil association. Clover reuses the **symbol**, not
the meaning.

The fifth leaf stands for **the unknown boundary of growth**. Write it as uncertainty. Do **not**
write "devil = bad AI", and do not describe Growth as inherently dangerous. Growth is useful,
beneficial and adaptive today. The open part is how far it goes.

Central tension worth stating once: Direction asks where we should go. Growth asks what we become
along the way.

Banned visual language: brains, robots, circuit boards, neural-network graphics, hexagons, glowing
"AI magic". The clover carries the identity.

### Writing style — read `CONTRIBUTING.md` "Writing style" before writing a word

Three rules: **simple, direct, human.**

- **Simple.** Short words. One idea per sentence. If a sentence needs a comma to hold itself
  together, make it two sentences.
- **Direct.** Say the thing, then explain it. No build-up. Name who does what.
- **Human.** Write like you are explaining it to a colleague at their desk. Contractions are fine.
  Leave out the clever closing line.

Cadence: problem first, then what we found, then the principle. Collective voice — *we, teams,
organizations*. Never a hero, human or AI.

**Signs it is not working — check every paragraph:**

- A sentence shaped like "not X, it is Y".
- A paragraph that ends on a quotable phrase.
- Any sentence you would call elegant.
- Three items in a list because three sounds good.
- Second person imperative where the collective voice belongs.
- An abstract noun as the subject of a sentence.

The failure mode is prose that reads polished. If a sentence could be a slide title, rewrite it.

### Facts that must not drift

These are verified. Do not restate them more strongly.

- **Contentful API migration.** Implementation about a day, run with agents and subagents. Testing
  and parity validation roughly another day. Stakeholder agreement longer still, and the work was
  not continuous. Original estimate 8–10 weeks. 36 endpoint parity cases, 34 exact plus 2
  signed-off deviations. 239 tests (220 unit, 19 snapshot). Both versions ran in UAT with the API
  gateway pointed at the new one, so QA validated the real site and signed off. **The production
  cutover has not run.** Performance numbers (6× throughput and so on) were measured **locally**,
  two processes on one machine, 400 requests at 40 concurrency — never on deployed infrastructure.
  The gains came from the architecture, not from AI.
- **React memory leak.** Contributed upstream, **CI-green pull request, not merged**. Never say
  "fixed upstream" as though it shipped. The mitigation was validated on a fleet: same image,
  113 restarts without `--stack-trace-limit=0`, zero with it, over ~6.5 hours.
- **Reference implementations.** Three of them. Built and used against real organizational data.
  None is always-on or adopted organization-wide. Each depends on a person providing the map and
  holding the approvals.
- Spelling is **American**. No employer, product, cluster or infrastructure names anywhere except
  case study 01, which keeps its existing company references deliberately.

### Removed vocabulary — do not reintroduce

The evidence ladder (rungs 1–5) and the autonomy ladder (L0–L4) were deleted from the framework.
Do not bring back rungs, levels, scores or grades.

Instead: **state what you checked, what you observed, and where you stopped.** For autonomy: widen
what AI decides where results have held, keep human approval where a mistake is expensive or hard to
reverse, and grant it per context rather than globally.

## Website — the shape it needs

One page, top to bottom, told as the narrative arc above. The clover grows from three leaves to four
to five as the reader scrolls.

**Three clover marks carry the argument.** Each is an inline SVG with the leaf names shown as text
labels beside the leaves:

- **Three-leaf mark** — Direction, Action, Success. Leaves 120 degrees apart.
- **Four-leaf mark** — Direction, Context, Action, Success, with **Context visually emphasized** as
  the leaf that just arrived. Leaves 90 degrees apart.
- **Five-leaf mark** — all five, with Growth drawn as a faint outline because it has not arrived.
  Leaves 72 degrees apart.

SVG requirements: one reusable leaf shape rotated into position, not five hand-drawn paths. Labels
in `<text>` positioned outside each leaf tip, readable at the size shown. `role="img"` with a
descriptive `aria-label`. Scales from about 200px to 420px. No external assets and no JavaScript
needed to render. Banned: brains, robots, circuit boards, neural networks, hexagons, glowing "AI
magic".

Section order:

1. Hero — Clover, and the one-line claim
2. Where AI already is — expert software engineer, QA, security, backed by real analysis
3. **Three leaves** — Direction, Action, Success. How AI is used today. The three-leaf mark
4. **The fourth leaf: Context** — the breakthrough. What context now means, the access model,
   read-only, a pointer to governance, the needle and the haystack, how Direction sharpens, the
   iterative loop, markdown files, any agent can pick it up. The four-leaf mark
5. **The fifth leaf: Growth** — not here yet. The five-leaf mark with Growth faint
6. The agent file — what `AGENTS.md` does and that it teaches the person using it
7. One real problem, start to finish — the walkthrough
8. Security and governance — the full detail the fourth-leaf section points at
9. Evidence — the case studies
10. What it is not
11. About the author

Fold the standalone failure-mode material into the leaf sections as "what goes wrong here".

## Remaining

- [x] Core doctrine — `docs/01-problem.md`, `02-philosophy.md`, `03-principles.md`, `04-framework.md`
- [x] Practice docs A — `05-context-engineering.md`, `07-success.md`, `08-governance.md`
- [x] Practice docs B — `09-adoption.md`, `10-roadmap.md`, `orchestration-environment.md`, `how-ai-fails.md`, `field-practices.md`, `glossary.md`, `reference-implementations.md`
- [x] Agent-facing — `AGENTS.md`, `QUICKSTART.md`, `templates/orchestration-brief.md`, `examples/`, `.github/`
- [x] Repo front and evidence — `README.md`, `CONTRIBUTING.md`, `case-studies/`, `CHANGELOG.md`, `VERSION`
- [x] Website — `site/`
- [x] Hypothesis — `hypothesis/ai-future.md` merged with Clover's hypothesis layer
- [x] File renames and a full link sweep — `07-proof.md` → `07-success.md`,
      `Five_Leaf_Clover_AI_Engineering_Framework_Context.md` → `clover-origin.md`, all inbound
      references repointed, every link and heading anchor verified

### Still open — needs a person

- **Artwork is stale.** `assets/ai-orchestration-lifecycle.png` draws the old six stages and is no
  longer referenced. `assets/social-preview.png` still shows six-stage artwork and is what the
  `og:image` points at. Both need redrawing as a five-leaf clover.
- **`assets/ai-future/README.md`** still describes the hypothesis as standalone rather than as the
  fifth leaf.
- **Site links point at `main`.** Every GitHub link on the website uses `/blob/main/...`, so links
  to renamed files resolve only after this branch merges. Correct as written; just not clickable yet.
- **Delete this file before merging to `main`.**

## Ruled out

- Renaming files during the content rewrite. Too much link churn with several agents working at
  once. The orchestrator renames and fixes links in one pass at the end.
- Running any `git` command from inside an agent. The orchestrator owns all git.
- Touching `main`, or the `clover` branch in the `professional-profile` repo. That branch was
  created by accident and is out of scope.
