# The Clover Model

## Purpose

Clover is a repeatable cycle for doing real work with AI inside it. Five leaves: Direction, Context, Action, Success, Growth.

Prompts, tools, agents, and model choice all sit underneath the cycle. What the model describes is how human intent becomes an outcome the environment confirms, and what the system keeps once it does.

**Direction → Context → Action → Success → Growth**

Short form: **Where → Know → Do → Validate → Become**

## From AI models to AI orchestration

AI capability is evolving from models that provide intelligence, to agents that can act, to workflows that repeat and coordinate tasks, to orchestration that keeps what its outcomes taught it.

![From AI models to AI orchestration](../assets/ai-orchestration-model-progression.svg)

This is not a strict replacement hierarchy. An agentic workflow can be an important building block inside an orchestration. What separates them is the scope of context and learning. A workflow runs a known process repeatedly. An orchestration captures what the outcome showed and makes that available to the next cycle.

Context can accumulate at whatever scope fits — a person, a team, an organization, or another defined boundary.

## The five leaves

Each leaf has one job. The complexity belongs in the context, ownership, evidence, and feedback around the leaves, and not in adding more of them.

| Leaf | What it is | Core question |
|---|---|---|
| **Direction** | Human intent, purpose, priorities, constraints, and what should not be pursued. | Where are we going, and what outcome are we trying to achieve? |
| **Context** | What the system needs to know about reality before acting. | What do we need to know about reality before acting? |
| **Action** | Deciding how the work should happen, and doing it. | What should we do, and how should the work happen? |
| **Success** | The intended outcome demonstrated by the real environment. | Did reality validate the intended outcome? |
| **Growth** | What the system accumulates or becomes across repeated cycles. | What did the system become or learn? |

Growth is not a finish line. What one cycle accumulates becomes part of the next cycle's Context, changes how Action gets planned, and sometimes changes the Direction itself, because the work revealed that a different outcome was the one worth pursuing.

---

## Leaf 1 — Direction

Direction is where human intent enters the system. A person decides what is worth doing, why it matters, which outcome counts, which constraints apply, and what should stay out of the work.

A ticket can trigger it. Direction is the outcome behind the ticket, stated plainly, together with the edges of the work.

**Core question.** Where are we going, and what outcome are we trying to achieve?

**What the human holds.** All of it — the objective, the priorities, the constraints, the risk boundaries, what counts as a good outcome, and what stays out of scope. Ownership of the outcome remains with a person after the work is handed over.

**What AI does.** Sharpens it. AI can restate the objective in its own words, ask what should happen to the parts nobody mentioned, point out that two stated goals conflict, and turn a vague request into something specific enough to work from. Setting the direction stays with the person.

**What goes wrong here.** Direction gets skipped because a ticket looks like enough, and the work then optimizes for closing the ticket rather than for the outcome. The other common failure is unstated scope: nobody said the change must not touch billing, so nothing stopped it.

## Leaf 2 — Context

Context is what the system needs to know about reality before acting. Source code, documentation, architecture, real data, logs, runtime state, tests, how the system actually behaves, history, earlier attempts, and memory carried from previous cycles.

Prompting is a small part of this. The working rule is to reason from the real environment rather than from assumptions, wherever the environment can answer the question.

**Core question.** What do we need to know about reality before acting?

**What the human holds.** Access and judgment. Which systems may be read, which data may be used, which sources can be trusted, and when the context in hand is good enough to act on.

**What AI does.** Most of the gathering. Reading code, tracing a call path, pulling telemetry, reconstructing an incident from logs, finding the earlier attempt nobody remembered. A good orchestration also reports what it could not find, and that part matters most.

**What goes wrong here.** The plausible answer. A model working from thin context produces something that reads correctly and describes a system that does not exist. The opposite failure is hoarding, where a context packed with irrelevant material buries the few facts the problem turns on. [How AI fails](how-ai-fails.md) covers the specific patterns, and [context engineering](05-context-engineering.md) covers how the material is assembled.

## Leaf 3 — Action

Action covers deciding how the work should happen and then doing it. Reasoning, planning, tool selection, model selection, orchestration across agents, code changes, tests, debugging, and interaction with whatever environments the work touches.

Planning and doing sit on one leaf on purpose. The plan usually changes once the work meets reality, and keeping the two together makes that change ordinary rather than an exception to explain.

**Core question.** What should we do, and how should the work happen?

**What the human holds.** The boundaries and the approvals. Which decisions need a person before they happen, what may run unattended, and who owns each part when the work is split. Delegation moves the work and leaves accountability where it was.

**What AI does.** Most of the work, inside those boundaries. Choosing an approach, sequencing the steps, picking tools, running subagents where parts are genuinely independent, implementing, testing, and coming back when the evidence contradicts the plan.

**What goes wrong here.** Thrash. A change fails, the next attempt is a variation of the same change, and each attempt sounds as confident as the last. Misplaced parallelism is the other one: splitting work that shares state costs more in coordination and rework than it saves.

## Leaf 4 — Success

Success means the real environment demonstrates the intended outcome. The environment is the evidence of success. An AI reporting that it worked, a plausible explanation, a confident tone, and a high model score all fall outside that.

Evidence can be a test that fails without the change and passes with it, a before-and-after measurement, telemetry, a non-production run, a production signal that disappears and stays gone, or a user confirming the outcome.

**Core question.** Did reality validate the intended outcome?

**What the human holds.** The standard. What counts as sufficient evidence for this work, and what risk is acceptable if the answer turns out to be wrong. Approval for anything expensive or hard to reverse stays with a person.

**What AI does.** Runs the checks, gathers the evidence, and reports it accurately, including what did not work and what it could not check.

**What goes wrong here.** Evidence described more strongly than it is. "Verified" covering a single manual look. A merged change reported as a resolved problem. The quiet one is stopping at the artifact: the build passed, so the work is treated as done, and nobody checks whether the original signal changed.

### Say what the evidence actually is

Not every task has telemetry, and pretending otherwise makes this leaf unusable for most work. What matters is describing what was actually done to check, in words a reader can act on.

Four questions do the work:

- **Did anyone verify it, or is someone asserting it?** "It works" from a person or a model establishes nothing on its own.
- **Does it hold up again?** Something seen working once may not repeat. An automated check that fails without the change and passes with it is a different claim from a manual look.
- **Did the thing we cared about move?** A passing test says the code behaves. A before-and-after measurement says the problem changed.
- **Did it hold where it counts?** The strongest evidence is the original signal disappearing in the real environment and staying gone.

State what you checked, what you observed, and where you stopped. Stopping early is fine and often correct — a small internal change can be genuinely complete once a test covers it, and production observation is not always available or worth its cost. What causes damage is describing weak evidence in the language of strong evidence. "Validated in the test environment, not yet observed in production" is a complete and honest claim. "Verified" on its own is not.

### When Success fails

A failed check is a normal outcome rather than an exception to handle later. When the evidence does not support the intended outcome, **return to Context, not to Action.**

Retrying a fix that just failed is the common waste. The second attempt runs on the same information as the first and reaches the same place, faster. A second attempt needs new information: what the environment did instead, which assumption broke, which signal nobody had looked at yet.

More on this leaf in [Success in practice](07-success.md).

## Leaf 5 — Growth

Growth is what the system accumulates across repeated cycles: persistent memory, experience, learned patterns, expertise, better planning, better tool selection, adaptation, more capability than it had before.

Experience is what one cycle produced — what was tried, the context it ran in, the evidence observed, the outcome. Expertise is the reusable pattern that emerges once several validated experiences point the same way. One cycle should not become a rule.

**Core question.** What did the system become or learn?

**What the human holds.** Judgment about what is worth keeping, what can safely be shared, and where a captured lesson has gone stale. An experience recorded wrongly spreads, and somebody has to notice.

**What AI does.** Captures the experience while it is still accurate, writes it where the next cycle will actually read it, notices patterns across cycles, and applies them the next time a similar problem shows up.

**What goes wrong here.** Nothing is captured, because the work closed when the change shipped. Or everything is captured, and the pile of "learnings" becomes noise nobody reads. The subtle one is promoting a single lucky outcome into a rule the system then follows everywhere.

The expertise that survives this leaf becomes part of the Context the next cycle starts from, which is how capability compounds without adding leaves to the model.

---

## Widening what AI decides

The five leaves are the operating model. How much of the work AI determines for itself changes over time, as tooling, context, experience, validation, and trust mature.

![A possible progression toward goal-directed autonomous AI](../assets/goal-directed-autonomy-progression.svg)

Today a person often supplies both the outcome and much of the path. As an orchestration matures, the person can supply the objective, the constraints, and what counts as success, while AI determines and adapts the path from current context and accumulated experience.

"Increase autonomy as trust matures" is only useful if a team can say what decides it. Three rules do:

- **Results decide, rather than confidence.** Widen what AI determines for itself where outcomes of that kind have repeatedly held up without rework or intervention. Narrow it again the moment they stop.
- **Blast radius overrides track record.** Where a mistake is expensive or hard to reverse, human approval stays regardless of how well things have gone.
- **It is granted per context, rather than globally.** A team may let AI plan and execute freely inside a well-understood remediation flow while approving every step of anything touching customer data.

What moves is how much of the path AI determines, from drafting steps a person approves, through executing an agreed plan, to planning within stated constraints. Who owns the objective, the constraints, and the outcome does not move. [Governance](08-governance.md) covers how that is held in practice.

## Applying the model

The model is technology independent. It fits anywhere work has an intended outcome that somebody has to stand behind:

- Software engineering
- DevOps
- Quality assurance
- Production operations
- Customer support
- Security operations
- Product management
- Finance
- Human resources
- Business operations

For practical patterns, see **[Reference Implementations](reference-implementations.md)**.

### Example: a recurring production exception

**Direction** — resolve a recurring production exception. Say which systems the fix may touch and who approves the deployment.

**Context** — read the ticket, the logs, the code, the telemetry, the dependencies, the history, and any earlier attempt, before changing anything.

**Action** — identify the root cause, make the focused change, write the regression test, raise it for review, and adapt if the evidence contradicts the diagnosis.

**Success** — validate outside production, give the approver concrete evidence, deploy, and watch until the original exception stops appearing and stays gone.

**Growth** — close the work once the production outcome holds, and keep the experience so the next incident of that shape is understood faster.

### Example: a cross-team knowledge gap

A team should not have to contact several other teams to reconstruct information that already exists in repositories, jobs, telemetry, documentation, and history. An AI knowledge capability can retrieve that context and explain it, while people keep the decisions and the ownership.

---

## Note — the hypothesis layer is not in this document

Clover has two layers, and this document is the engineering one. Everything above is meant to be usable today.

The second layer is a question about where repeated Growth leads: what happens when experience persists, when it is shared across many systems, when it is embodied, and when a system begins to influence the Direction it was given rather than only executing it. That is a question rather than a prediction, and none of it is claimed as established.

It is kept out of this document deliberately. It lives in [the hypothesis](../hypothesis/ai-future.md).
