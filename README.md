# AI Orchestration Framework

> **Transform Opportunity into Outcomes.**

An open, evidence-based framework for orchestrating AI across engineering and business workflows.

It sits **on top of the systems you already run**. Nothing to install. Nothing to migrate onto.

**[🌐 Read it on the website →](https://santhoshsathish94.github.io/ai-orchestration-framework/)** — the framework explained in about three minutes, with the lifecycle and the AI failure modes made interactive.

---

## Start

**1. Copy [`AGENTS.md`](AGENTS.md) into your project.**
It is the entire operating model in one file. Point your AI agent at it — it does not need anything else.

**2. Give the agent access to the evidence.**
Repository, tickets, logs, datasources, a non-production environment. Read-only first, one connection
at a time. [How to set that up →](docs/orchestration-environment.md#building-one)

**3. Run one real problem through the loop.**
A defect, a recurring exception, a question nobody can answer quickly. Keep a context file beside the
code so the next cycle starts ahead of this one.

That is the adoption path. Everything below explains why it is shaped this way.

---

## What is it?

The **AI Orchestration Framework is an operating model for turning human intent and AI capability into measurable outcomes through context, execution, evidence, and learning.**

It is not an LLM framework, agent SDK, or prompt library. It defines **how AI and humans work together to achieve an outcome**.

### It sits on top of what you already run

**Orchestration is a layer above your existing systems, not a change to them.** The work already
happens somewhere — repositories, tickets, pipelines, logs, data stores. Orchestration adds the layer
that carries context, execution, evidence and learning across them. What changes is how the work is
directed, not what it runs on.

So adoption is incremental and reversible. Start with one problem; stop whenever you like and the
systems underneath are untouched.

It is not free, though. The layer needs **access**, scoped deliberately — read-only where reading is
enough, human approval wherever the blast radius is real.

### What it is not

- **Not software.** There is nothing to install. It is a way of working.
- **Not a runtime.** It defines the operating model around AI orchestration; it does not prescribe the runtime used to execute it. Agent frameworks, workflow engines and tool protocols are choices that sit inside it, not competitors to it.
- **Not a replacement for how you already work.** It sits alongside Agile, incident management, or whatever your team already uses — and on top of the systems you already run, rather than in place of them.
- **Not about model or tool selection.** It does not tell you which AI to use, and it does not cover cost, evaluations, data governance, or security review.
- **Not needed for everything.** Throwaway or trivial work does not need a lifecycle. Use it where being wrong actually costs something.

### Why orchestration?

AI is evolving:

**AI Models → AI Agents → Agentic Workflows → AI Orchestration**

AI models provide intelligence. Agents can perform tasks. Workflows can repeat tasks. **Orchestration connects context, decisions, execution, proof, and learning so the system can improve over time.**

> **Agentic workflows repeat. Orchestration learns.**

---

## Core Lifecycle

**Opportunity → Understand → Plan → Execute → Proof → Grow**

One principle per stage — if you remember the lifecycle, you remember the principles.

**Opportunity** — Define the problem, why it matters, and the outcome worth pursuing.  
*Start with the opportunity, not the tool.*

**Understand** — Establish the context and evidence needed to decide well.  
*Never assume the context is sufficient.*

**Plan** — Choose the focused path, boundaries, dependencies, and ownership.  
*Parallelize only what is genuinely independent.*

**Execute** — Do the work, adapting when new evidence changes the direction.  
*Delegation never dissolves accountability.*

**Proof** — Demonstrate with evidence that the intended outcome actually happened.  
*Prove outcomes, not activity.*

**Grow** — Capture what was learned and feed it into the next cycle.  
*Only validated experience becomes expertise.*

The lifecycle stays deliberately simple. Experience and expertise are **part of Grow**, not additional stages.

> **Execute produces experience. Grow turns validated experience into expertise.**

[Read the full lifecycle and stage definitions →](docs/04-framework.md) · [Read the principles →](docs/03-principles.md)

---

## Proven in practice

This comes out of delivery work, not theory. Two cycles are documented end to end:

**A CMS content API migration whose implementation took about a day, against an 8–10 week estimate.**
GraphQL → REST and .NET 9 MVC → .NET 10 Minimal APIs, replacing ~7,800 lines across 200+ files —
with every route, JSON shape and response envelope preserved so no consumer had to change, and parity
validated byte-for-byte against live traffic in preprod. Testing and validation took roughly another
day, and stakeholder agreement longer still: the one-day figure is execution, not end-to-end delivery.
The production cutover has not yet run.
[Read the case study →](case-studies/01-contentful-migration.md)

**A production memory leak fixed at its root, not worked around.**
Recurring out-of-memory crashes were stabilized with a blunt mitigation, then the investigation
continued — past the workaround, into React's Server Components renderer. The one-file fix was
contributed upstream so other applications need not carry the same workaround.
[Read the case study →](case-studies/02-react-rsc-memory-leak.md) *(CI-green PR awaiting maintainer review)*

Both left reusable context behind. That is the difference between a workflow that repeats and
orchestration that learns.

---

## Where this leads

AI orchestration is the **foundation**, not the end state. Today humans often provide both the goal
and the path. As reasoning, tools, persistent context and evidence mature, the goal can become the
primary human input while AI determines and adapts the path inside stated constraints.

![Human defines the destination; AI determines and adapts the path](assets/ai-future/goal-directed-destination.svg)

> **Human defines the destination. AI determines and continuously adapts the path.**

Nothing here claims that unrestricted autonomy exists today. What AI decides for itself widens where
results have held, stays capped where a mistake is expensive, and is granted per context rather than
globally. [How much autonomy to grant →](docs/08-governance.md#how-much-autonomy-to-grant)

---

## Reference Implementations

Three patterns applying the lifecycle to recurring problems, each stating its own limits:
**[cross-team knowledge access](docs/reference-implementations.md#1-cross-team-knowledge-access)**,
**[production exception remediation](docs/reference-implementations.md#2-production-exception-remediation)**,
and **[multi-repository defect remediation](docs/reference-implementations.md#3-multi-repository-defect-remediation)**.
All have been built and used against real organizational data. None is an always-on capability or
adopted organization-wide.

---

## Explore

**Start** — [AGENTS.md](AGENTS.md) is the whole model as instructions for an agent; point yours at it
and nothing else is required. If you would rather run a first cycle by hand, use the
[quickstart](QUICKSTART.md), the [brief template](templates/orchestration-brief.md), or the
[worked example](examples/production-exception-remediation/).

**The framework** — [The problem](docs/01-problem.md) · [Philosophy](docs/02-philosophy.md) ·
[Principles](docs/03-principles.md) · [The model in full](docs/04-framework.md)

**Each part in depth** — [Context engineering](docs/05-context-engineering.md) ·
[Proof](docs/07-proof.md) · [Governance](docs/08-governance.md) · [Adoption](docs/09-adoption.md) ·
[Roadmap](docs/10-roadmap.md)

**Putting it to work** — [The orchestration environment](docs/orchestration-environment.md) ·
[Reference implementations](docs/reference-implementations.md) · [How AI fails](docs/how-ai-fails.md) ·
[Practices and field lessons](docs/field-practices.md) · [Case studies](case-studies/) ·
[Glossary](docs/glossary.md)

**Separate, and speculative** — [The AI Future](hypothesis/ai-future.md), a hypothesis about the race
to autonomy. Clearly labelled, and **not part of the framework**.

---

## Guiding Principle

> **AI is another engineering capability that must be orchestrated like any other part of a software system.**

The goal is not to maximize AI activity. It is to turn capability into coherent outcomes through **context, focus, ownership, evidence, and learning**.

## Contributing

This is an open, feedback-driven project. Contributions and honest feedback are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Author

**Santhosh Narayanan**

Built from real-world engineering experience and continuously evolving through evidence-based case studies.
