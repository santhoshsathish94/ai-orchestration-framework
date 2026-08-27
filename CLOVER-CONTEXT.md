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

### The model

**Direction → Context → Action → Success → Growth**

Five leaves. Do **not** append "→ repeat" to that line. The cycle does feed back — Growth shapes the
next cycle's Context, Action, and sometimes the Direction itself — but say that in a sentence, not in
the arrow chain.

Short form: **Where → Know → Do → Validate → Become**

| Leaf | What it is | Core question |
|---|---|---|
| **Direction** | Human intent, purpose, priorities, constraints, and what should *not* be pursued. Where human intent enters the system. | Where are we going, and what outcome are we trying to achieve? |
| **Context** | The information the system needs to reason about the real problem — repository, docs, architecture, data, logs, runtime state, tests, actual system behaviour, history, persistent memory, previous experience. | What do we need to know about reality before acting? |
| **Action** | Reasoning, planning, orchestration, tool selection, model selection, execution, iteration, code changes, testing, debugging, interaction with external environments. | What should we do, and how should the work happen? |
| **Success** | The intended outcome demonstrated by the real environment. Not the AI saying it worked, not a plausible answer, not model confidence. | Did reality validate the intended outcome? |
| **Growth** | What the system accumulates or becomes across repeated cycles — persistent memory, experience, learned patterns, expertise, better planning, better tool selection, adaptation, increasing capability. | What did the system become or learn? |

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

One page, top to bottom. The five leaves are the spine, and the clover grows a leaf per section.

Each leaf section carries an **inline SVG clover with that many leaves filled** — one filled leaf at
Direction, two at Context, three at Action, four at Success, five at Growth. Static SVG per section,
no JavaScript required. The existing site rule holds: no build step, no dependencies, readable with
JavaScript disabled.

Section order:

1. Hero — Clover, the five leaves, one line each
2. The problem this solves — short
3. **Leaf 1 · Direction**
4. **Leaf 2 · Context**
5. **Leaf 3 · Action**
6. **Leaf 4 · Success**
7. **Leaf 5 · Growth**
8. The agent file — what `AGENTS.md` does and how it teaches the person using it
9. One real problem, start to finish — the walkthrough, told through the five leaves
10. Security and governance
11. Evidence — the case studies
12. What it is not
13. The fifth leaf — the open question, clearly labelled as hypothesis
14. About the author

Fold the current standalone sections in rather than keeping them: how AI fails becomes "what goes
wrong here" inside each leaf; ownership folds into Direction; experience and expertise fold into
Growth.

## Remaining

- [ ] Core doctrine — `docs/01-problem.md`, `02-philosophy.md`, `03-principles.md`, `04-framework.md`
- [ ] Practice docs A — `05-context-engineering.md`, `07-proof.md`, `08-governance.md`
- [ ] Practice docs B — `09-adoption.md`, `10-roadmap.md`, `orchestration-environment.md`, `how-ai-fails.md`, `field-practices.md`, `glossary.md`, `reference-implementations.md`
- [ ] Agent-facing — `AGENTS.md`, `QUICKSTART.md`, `templates/orchestration-brief.md`, `examples/`, `.github/`
- [ ] Repo front and evidence — `README.md`, `CONTRIBUTING.md`, `case-studies/`, `CHANGELOG.md`, `VERSION`
- [ ] Website — `site/`
- [ ] Hypothesis — `hypothesis/ai-future.md` reconciled with Clover's hypothesis layer
- [ ] File renames and a full link sweep (orchestrator does this last)

## Ruled out

- Renaming files during the content rewrite. Too much link churn with several agents working at
  once. The orchestrator renames and fixes links in one pass at the end.
- Running any `git` command from inside an agent. The orchestrator owns all git.
- Touching `main`, or the `clover` branch in the `professional-profile` repo. That branch was
  created by accident and is out of scope.
