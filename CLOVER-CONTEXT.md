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

### Words to use, and words to avoid

- **Never call it a "model".** Clover is a **five-leaf way of working with AI**, and at repo level a
  **framework**. "Model" collides with "AI model" and overstates what this is.
- **Say "human", never "person" or "the user"**, when describing who holds Direction.
- **No short form.** Drop "Where → Know → Do → Validate → Become" everywhere. "Where" is wrong for
  Direction — Direction is *what*.
- **"What happens there"**, never "what goes wrong here", as the per-leaf heading.
- The fifth leaf is **the next phase**. Never "it has not arrived", never "hypothesis", never
  "prediction".
- Clover names: the three-leaf is **the common clover**, the four-leaf is **the lucky clover**, the
  five-leaf is **the growth clover**.
- Do not explain the *Black Clover* or devil association anywhere. People who know it will see it.

### The narrative arc — THIS IS THE SPINE OF EVERYTHING

Clover is told as a clover that grows: **three leaves → four leaves → five leaves.** The number of
leaves is the argument.

**Hero.** The name, one line, and the five-leaf mark with a line per leaf. Nothing else. Do not
start the story here, and do not mention `AGENTS.md` or tooling. Move straight to the next section.

**AI current capabilities.** Short, simple, clear. AI is already past what any individual human can
do. It holds the collection of skills humans have — engineering, quality assurance, security review,
analysis — in one place. What it does not have is direction, and the will to act on its own.

**Three leaves — the common clover. Direction, Action, Success.** How AI is used almost everywhere
today. A human gives the Direction. AI performs the Action from what the human typed. The result
becomes Success after several iterations. It works, and it is ordinary. Keep this section short: it
only has to be recognized, not argued. No geometry talk under the image — the caption is just "the
common clover".

**Four leaves — the lucky clover. This is what the framework exists for.** Everything else on the
page is setup for this section. Get it right.

Context is no longer something a human writes out. It is the systems the organization already runs:

- every repository the team works in, holding many projects and their documentation
- the datasources the applications connect to
- the logs and telemetry those applications produce
- the deployment environments
- the running applications and websites

**Give the reader a real plan, not a principle.** Concretely: stand up **read-only MCP servers** in
front of those systems, so an agent can reach them. Scope every connection to what the human already
has access to, at the privileges they already hold. Start with **one environment — development is
enough** — and widen to other non-production environments as it proves out.

**Do not discuss production.** Organizations push back the moment it comes up, and it is not needed
to get the value.

**Defend the approach, because it will be challenged.** The honest argument: this access already
exists and is already being used, often without anyone tracking it. Clover makes it deliberate,
scoped and visible. It also surfaces problems — stale credentials, unreviewed access paths, data
nobody has looked at — before they become incidents. Point at the security and governance section
for the detail rather than repeating it.

Then the part that makes it work: even with everything connected, this is a needle in a haystack.
The humans who work on the system every day can point at roughly where the needle fell. Expecting AI
to search the whole haystack does not work. Direction plus real context is what produces results
worth having.

It is iterative. Each result improves the context for the next pass. Markdown files kept beside the
work hold the summary, and that summary is what lets any agent pick the work up. No single agent has
to hold the job.

This is where the case studies and the adoptable patterns belong. This is the state we are in now.

**Five leaves — the growth clover. The next phase.** Not a hypothesis, not a prediction, not
speculation. It is what happens next whether anyone chooses it or not. AI becomes more capable from
what it takes out of the other four leaves — direction it has been given, context it has read,
actions it has run, and results it has seen confirmed. Patterns form. Expertise forms. The phase
after that is AI working from goals with far less direction, at a scale closer to an organization's
whole output than to one task.

Keep it simple and short. Do not hedge it into an open question, and do not dramatize it.

### The five leaves

**Direction → Context → Action → Success → Growth**

Do **not** append "→ repeat". The cycle feeds back; say so in a sentence.

| Leaf | What it is |
|---|---|
| **Direction** | The human says what needs to be done and what must not happen, and stays in control. With real context available, Direction is also pointing at where the answer probably is. |
| **Context** | No longer something a human provides. It is the systems the organization already runs — repositories, projects and docs, datasources, logs and telemetry, deployment environments, the running applications. |
| **Action** | Now mostly driven by AI: reasoning, planning, tool and model selection, execution, iteration, code changes, testing, debugging. |
| **Success** | The intended outcome demonstrated by the real environment. Not the AI saying it worked, not a plausible answer, not model confidence. |
| **Growth** | AI becoming more capable from what it learns across the other four leaves. Inevitable, and the next phase. |

### The worked example — rebuild it

The current walkthrough is too long and too written. Replace it with something **visual, simple and
easy to follow**: a real end-to-end run of application development work. Keep the steps few. Do not
re-explain what context is — the fourth leaf already did that. The visual should demonstrate it
instead.

### One claim to handle carefully

Growth as a general mechanism is fine: solved problems produce information, patterns accumulate,
capability improves. Do **not** assert that any specific AI provider trains on customer or
enterprise work. Keep it structural and unattributed.

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

One page, top to bottom, told as the narrative arc above.

**Three clover marks carry the argument**, each an inline SVG with the leaf names as `<text>` labels:

- **Three-leaf** — Direction, Action, Success. Caption underneath is just "the common clover".
- **Four-leaf** — Direction, Context, Action, Success, with Context drawn solid as the leaf that
  just arrived. Caption "the lucky clover".
- **Five-leaf** — all five. Caption "the growth clover".

No geometry or construction detail in any caption. One reusable leaf shape rotated into position,
`role="img"` with a descriptive `aria-label`, no external assets, no JavaScript needed.

Section order:

1. Hero — name, one line, the five-leaf mark, one line per leaf. Nothing else
2. **AI current capabilities** — short
3. **Three leaves · the common clover** — short
4. **Four leaves · the lucky clover** — the largest and most important section
5. **Five leaves · the growth clover** — short
6. The worked example — visual, an end-to-end application development run, few steps
7. The agent file
8. Security and governance
9. Evidence — the case studies
10. What it is not
11. About the author

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
