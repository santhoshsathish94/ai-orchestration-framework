# The Clover Framework

## Purpose

Clover is an AI Orchestration Framework connecting real-world Context, human Direction, AI-driven Action, and validated Success into a repeatable cycle.

Prompts, tools, agents, and AI model choice all sit underneath the cycle. What the framework describes is how human intent becomes an outcome the environment confirms, and what the next attempt starts from.

**The framework is four stages: Context → Direction → Action → Success.**

Clover also describes what can emerge when those four stages are repeated: **Growth**. Growth is not a fifth stage a team runs. It is the learning and improvement that can emerge from the entire cycle and feed future Context.

## The system comes first

Clover is built around a simple priority:

**System → Human → AI**

The system comes first because it is where reality exists. It may be an existing system, or the system we are trying to build. Its state, data, behavior, history, constraints, and evidence are the material the work must ultimately be grounded in.

The human comes second because purpose and accountability belong together. The human decides what matters, what outcome is worth pursuing, what constraints and boundaries apply, what must not happen, and what process or approach matters where that is part of the intended outcome. The human remains accountable for the outcome after delegating work.

AI comes third because capability does not transfer accountability. AI can reason, recommend, plan, challenge, and execute, but Clover does not give AI ownership of Direction. A capable system can still have partial knowledge of the real world, and even humans cannot fully understand every consequence of complex systems. Clover therefore keeps authority for purpose, boundaries, and accountability with a human.

This is not a statement that AI is incapable of making decisions. It is a boundary on what decisions AI should own in a real-world system: **AI can determine how work happens within human Direction; it does not determine the Direction itself.**

## Three leaves, then four, then five

The number of leaves carries the argument. The stages arrived in a different order than they run in, and the way they arrived is the clearest way to explain them.

### Three leaves — the common clover

Direction, Action, Success. This is how AI is used almost everywhere today. A human gives the Direction. AI performs the Action from whatever that one human can hand over: not only what they type, but the files they attach and the repository they happen to be working in. After several passes the result becomes Success.

It works, and a lot of real value comes out of it. It is also ordinary, which is what a common clover is. The limit is that a handover is still bounded by what one human can reach and remember, put together from memory and usually in a hurry. Whatever context the work runs on arrives after the direction, because the direction is what prompted somebody to go and find it.

### Four leaves — the lucky clover

Context arrives, and it arrives first. It is no longer bounded by one human: it is the current system the work exists within or is being built within. Every repository, with its many projects and the documentation kept for each application. The datasources the applications connect to. The logs and telemetry. The deployment environments. The running applications themselves. Nobody has to write any of it out first.

That is why Context leads. The system exists before the request, so the material is there ahead of the request rather than assembled in response to it. When the system is still being built, Context is the reality already established about what exists, what is known, what has been tried, and what the emerging system must satisfy.

Direction is then given against what is actually there, which is also what lets Direction point at where the answer probably is.

Reaching it takes a setup rather than a principle:

1. **Stand up read-only MCP servers** in front of the repositories, the datasources, the logs and telemetry, and the environments, so an agent can read them directly.
2. **Scope every connection to what the human driving the work already has access to**, at the privileges they already hold. Nothing new is being granted.
3. **Start with one environment. Development is enough.** Widen to other non-production environments as it proves out.

[The orchestration environment](orchestration-environment.md#building-one) covers what to connect and in what order, and [governance](08-governance.md#access-mirrors-the-human-not-the-ai) covers how that access is held.

The approach gets challenged, and the honest answer holds up. That access already exists and is already used, often with nobody tracking it. Clover makes it deliberate, scoped and visible. It also surfaces stale credentials, unreviewed access paths and data nobody has looked at, before any of those become an incident. [The questions a security team will ask](08-governance.md#questions-your-security-team-will-ask) are answered one by one.

Connecting the material does not finish the job. An organization's systems are a haystack and the thing worth finding is a needle somewhere inside it, and expecting AI to search the whole haystack does not work. **That is what changes Direction.** The people who work on a system every day know roughly where the needle fell, so Direction becomes a pointer at the part of the system to read first. Direction that points, together with context that is real, is what produces Success worth having.

It runs in a loop. What comes back from one pass is context for the next. Markdown files kept beside the work hold the summary, and that summary is what lets any agent pick the job up, so no single agent has to hold the work. [Context](05-context-engineering.md#where-context-lives) covers how those files are kept.

> After each success and each failure, the context files are written before the next attempt.

A lucky clover is the rare one, and this is the stage that makes it rare. It is also where organizations are now.

### Five leaves — the growth clover

Growth is not a fifth task and nobody has to run it. It is what can emerge when the four stages are repeated and what they reveal is preserved and learned from.

A Clover cycle can produce useful learning from **all four stages**:

- Context can reveal how the system actually behaves, what was previously unknown, and what information was missing.
- Direction can reveal which purposes, constraints, priorities, processes, or decisions produced good or bad outcomes.
- Action can reveal which approaches, tools, processes, or execution patterns work and which do not.
- Success can reveal whether the intended outcome held, where it held, where it failed, and what the evidence actually showed.

Failure is part of Growth too. A failed result is new information about reality. An analysis can expose a pattern. Understanding the current system can expose an assumption that was wrong. A successful approach can become a reusable practice. Repeated cycles can reveal relationships that were invisible in one pass.

Growth can therefore happen at every layer participating in the system:

**Human.** Better understanding, judgment, expertise, and ability to create better Direction.

**AI.** Better performance from whatever learning, adaptation, memory, or refinement mechanisms are actually available to the AI system.

**System.** Better observability, clearer behavior, stronger tooling, improved architecture, and better ability to expose the information future cycles need.

**Team.** Shared practices, reusable knowledge, patterns, and better ways of working together.

**Organization.** Institutional knowledge, improved processes, better decisions, and accumulated Context that survives individual people and sessions.

**AI frontier.** Improvements to the underlying AI models through the training, evaluation, and refinement mechanisms controlled by frontier AI providers.

These layers do not have the same authority or control over learning. Clover does not claim that an AI provider trains on customer or enterprise work. Nor does it require a model to change before learning can occur around it.

The broader principle is:

> **When cycles repeat, patterns can emerge. When patterns are preserved, future cycles can improve.**

The model may remain the same while the human, team, organization, and system around it become better at using it. The underlying AI may also improve through frontier training and refinement, but that learning happens at a different layer and under different control.

Growth therefore does not belong to one actor. It is the accumulated learning that can emerge from repeated interaction between the **system, human, and AI**.

Everything below sets out the four stages one at a time, in the order they run.

## From AI models to AI orchestration

AI capability is evolving from models that provide intelligence, to agents that can act, to workflows that repeat and coordinate tasks, to orchestration that keeps what its outcomes taught it.

![AI models answer, agents act, agentic workflows repeat a known process, and orchestration keeps what the outcome showed for the next cycle. Growth, drawn dotted, is what can emerge while the cycle runs](../assets/ai-orchestration-progression.svg)

This is not a strict replacement hierarchy. An agentic workflow can be an important building block inside an orchestration. What separates them is the scope of context and learning. A workflow runs a known process repeatedly. An orchestration captures what the outcome showed and makes that available to the next cycle.

Context can accumulate at whatever scope fits — a human, a team, an organization, a system, or another defined boundary.

## The four stages

Each stage has one job. The complexity belongs in the context, ownership, evidence, and feedback around the stages, and not in adding more of them.

| Stage | What it is | Core question |
|---|---|---|
| **Context** | The reality the work needs to understand — an existing system or the system being built, its data, behavior, history, constraints, evidence, and previous cycles. | What do we need to know about reality before acting? |
| **Direction** | The human establishes purpose, the outcome worth pursuing, priorities, constraints, boundaries, what must not happen, and accountability for the outcome. Direction can also point AI at where the relevant Context is and can include a process or approach when that itself matters to the intended outcome. | What needs to be done, what outcome is worth pursuing, and what must not happen? |
| **Action** | AI uses human Direction as instructions and system Context as data to determine how the work should happen and execute within those boundaries. | How should the work happen? |
| **Success** | The meaningful intended outcome demonstrated by evidence from the system or environment, produced through the interaction of human intent, AI capability, and the system itself. | Did reality validate the intended outcome? |

A cycle can then run again. What one cycle establishes becomes part of the next cycle's Context. The result may change the next Action, and it may also change Direction when reality shows that a different outcome or constraint is now appropriate.

---

## Stage 1 — Context

Context is what the system needs to know about reality before acting, and it is in place before anyone gives a direction. It may describe a system that already exists, or the system we are trying to build.

The important distinction is that Context is not whatever a human happens to remember to put into a prompt. It is the relevant reality available from the system, together with history, evidence, previous attempts, and other information needed to understand the work correctly.

In the common clover, context is only what one human can hand over — what they type, the files they attach, the repository they are working in. In the lucky clover it can include the current system itself: repositories and documentation, connected datasources, logs and telemetry, deployment environments, running applications, tests, history, earlier attempts, and what previous cycles wrote down.

**Core question.** What do we need to know about reality before acting?

**What the human holds.** Access and judgment. Which systems may be read, which data may be used, which sources can be trusted, where the answer probably is, and when the context in hand is good enough to act on.

**What AI does.** Most of the gathering. Reading code, tracing a call path, pulling telemetry, reconstructing an incident from logs, finding the earlier attempt nobody remembered, and writing back what the pass established so the next one starts from it.

**What happens there.** The plausible answer. An AI model working from thin context produces something that reads correctly and describes a system that does not exist. The opposite failure is hoarding, where a context packed with irrelevant material buries the few facts the problem turns on. [How AI fails](how-ai-fails.md) covers the specific patterns, and [context engineering](05-context-engineering.md) covers how the material is assembled.

---

## Stage 2 — Direction

Direction is where human purpose and accountability enter the system. The human decides what matters, what outcome is worth pursuing, the priorities, constraints, boundaries, what must not happen, and what remains their responsibility after delegation.

Direction may also specify an important process or approach when the human decides that how the work should be achieved is itself part of what matters. This does not transfer detailed execution to the human. AI still determines the operational path inside the stated boundaries.

Because the system is already readable, Direction can point instead of describing. A human can identify which service, workflow, dataset, or area of the system is most relevant rather than reconstructing the entire environment from memory.

Clover does not give AI ownership of Direction. AI can sharpen a direction, ask questions, identify conflicts, surface risks, and recommend alternatives. It does not become accountable for deciding what outcome the system should pursue. A system operating on partial knowledge should not be allowed to define its own purpose in a real-world environment where even humans cannot fully understand every consequence.

**Core question.** What needs to be done, what outcome is worth pursuing, and what must not happen?

**What the human holds.** Purpose, priorities, the intended outcome, constraints, risk boundaries, relevant pointers into Context, important process requirements, what counts as good enough, what stays out of scope, and accountability for the outcome.

**What AI does.** Clarifies and challenges Direction without owning it. AI can restate the objective, identify missing constraints, point out conflicts, and turn a vague request into something specific enough to execute.

**What happens there.** Direction gets skipped because a ticket looks like enough, the work then optimizes for closing the ticket rather than the outcome, or an AI is allowed to choose the goal instead of determining the path toward a human-defined goal. Unstated scope is another failure: nobody said the change must not touch billing, so nothing stopped it.

---

## Stage 3 — Action

Action is where AI capability is applied to the combination of **human Direction and system Context**. AI uses the Direction as instructions and the Context as data to determine how the work should happen and to execute it within the defined boundaries.

Reasoning, planning, tool selection, AI model selection, orchestration across agents, code changes, tests, debugging, and interaction with whatever environments the work touches all belong here.

Planning and doing sit on one stage on purpose. The plan usually changes once the work meets reality, and keeping the two together makes that change ordinary rather than an exception to explain.

**Core question.** How should the work happen within the human's Direction and the system's Context?

**What the human holds.** The boundaries and approvals. Which decisions need a human before they happen, what may run unattended, what process constraints matter, and who owns each part when the work is split. Delegation moves the work and leaves accountability where it was.

**What AI does.** Most of the work, inside those boundaries. Choosing an approach, sequencing the steps, picking tools, running subagents where parts are genuinely independent, implementing, testing, and adapting when evidence contradicts the plan.

**What happens there.** Thrash. A change fails, the next attempt is a variation of the same change, and each attempt sounds as confident as the last. Misplaced parallelism is the other one: splitting work that shares state costs more in coordination and rework than it saves.

---

## Stage 4 — Success

Success means the intended outcome is demonstrated by the real system or environment. The meaningful outcome belongs to the interaction of three things: **human purpose and accountability, AI capability and execution, and the system in which the outcome must actually exist.**

The environment is the evidence of success. An AI reporting that it worked, a plausible explanation, a confident tone, or a high model score all fall outside that on their own.

Evidence can be a test that fails without the change and passes with it, a before-and-after measurement, telemetry, a non-production run, a production signal that disappears and stays gone, or a human confirming an outcome that cannot be observed directly by a system.

**Core question.** Did reality validate the intended outcome?

**What the human holds.** The standard. What counts as sufficient evidence for this work, what risk is acceptable if the answer turns out to be wrong, and approval for anything expensive or hard to reverse.

**What AI does.** Runs checks, gathers evidence, reports it accurately, and makes clear what did not work and what it could not check.

**What happens there.** Evidence described more strongly than it is. "Verified" covering a single manual look. A merged change reported as a resolved problem. The quiet one is stopping at the artifact: the build passed, so the work is treated as done, and nobody checks whether the original signal changed.

### Say what the evidence actually is

Not every task has telemetry, and pretending otherwise makes this stage unusable for most work. What matters is describing what was actually done to check, in words a reader can act on.

Four questions do the work:

- **Did anyone verify it, or is someone asserting it?** "It works" from a human or an AI establishes nothing on its own.
- **Does it hold up again?** Something seen working once may not repeat. An automated check that fails without the change and passes with it is a different claim from a manual look.
- **Did the thing we cared about move?** A passing test says the code behaves. A before-and-after measurement says the problem changed.
- **Did it hold where it counts?** The strongest evidence is the original signal disappearing in the real environment and staying gone.

State what you checked, what you observed, and where you stopped. Stopping early is fine and often correct — a small internal change can be genuinely complete once a test covers it, and production observation is not always available or worth its cost. What causes damage is describing weak evidence in the language of strong evidence. "Validated in the test environment, not yet observed in production" is a complete and honest claim. "Verified" on its own is not.

### When Success fails

A failed check is a normal outcome rather than an exception to handle later. When the evidence does not support the intended outcome, **return to Context, not to Action.**

Retrying a fix that just failed is the common waste. The second attempt runs on the same information as the first and reaches the same place, faster. A second attempt needs new information: what the environment did instead, which assumption broke, which signal nobody had looked at yet. That new information gets written into the context files before the attempt is made.

Failure contributes to Growth because it changes what the system, human, and AI know for the next cycle. The failure is not merely a reason to try another Action; it is information that can improve future Context and may change future Direction as well.

More on this stage in [Success in practice](07-success.md).

---

## Widening what AI decides

The four stages are how the work runs. How much of the path AI determines for itself changes over time, as tooling, context, experience, validation, and trust mature.

What does not move is the ownership boundary: **the system provides reality, the human owns purpose and accountability, and AI determines and executes the path within human Direction.**

The human may delegate more of the path as evidence accumulates, but Clover does not turn that delegation into ownership of Direction.

The same three rules apply:

- **Results decide, rather than confidence.** Widen what AI determines for itself where outcomes of that kind have repeatedly held up without rework or intervention. Narrow it again the moment they stop.
- **Blast radius overrides track record.** Where a mistake is expensive or hard to reverse, human approval stays regardless of how well things have gone.
- **It is granted per context, rather than globally.** A team may let AI plan and execute freely inside a well-understood remediation flow while approving every step of anything touching customer data.

What moves is how much of the path AI determines. Who owns the objective, the constraints, the boundaries, and the outcome does not move. [Governance](08-governance.md) covers how that is held in practice.

## Applying the framework

Clover is technology independent. It fits anywhere work has an intended outcome that somebody has to stand behind:

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

The vocabulary changes and the cycle does not. The same priority remains:

**System → Human → AI**

And the same learning principle remains:

**Repeated cycles → patterns → learning → better future cycles**

For practical patterns, see **[Reference Implementations](reference-implementations.md)**.

### Example: a recurring production exception

**Context** — the repositories, the logs and telemetry, the deployment environments and the running application are already readable, along with the ticket, the history, and any earlier attempt at this exception.

**Direction** — resolve a recurring production exception. Say which systems the fix may touch, what must not happen, who approves the deployment, and which part of the system to look at first.

**Action** — trace the exception through the logs and the code, identify the root cause, make the focused change, write the regression test, raise it for review, and adapt if the evidence contradicts the diagnosis.

**Success** — validate outside production, give the approver concrete evidence, deploy, and watch until the original exception stops appearing and stays gone.

**Then back to Context** — write what this pass established into the file beside the code, whether the exception stopped or not, so the next attempt or the next incident of that shape starts from it.

### Example: a cross-team knowledge gap

A team should not have to contact several other teams to reconstruct information that already exists in repositories, jobs, telemetry, documentation, and history. An AI knowledge capability can retrieve that Context and explain it, while people keep the decisions and the ownership.

---

## Note — the hypothesis layer is not in this document
