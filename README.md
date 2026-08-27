# Clover

> **Direction → Context → Action → Success → Growth**

Clover is a five-leaf model for doing real work with AI inside it. It describes how human intent
becomes an outcome the real environment confirms, and what the system keeps once it does.

It sits on top of the systems a team already runs. Nothing to install. Nothing to migrate onto.

**[🌐 Read it on the website →](https://santhoshsathish94.github.io/ai-orchestration-framework/)** — the five leaves in about three minutes.

---

## Start

**1. Copy [`AGENTS.md`](AGENTS.md) into your project.**
It is the whole operating model written as instructions for an agent. Point an agent at that one
file and nothing else is required.

**2. Give the agent access to the evidence.**
Repository, tickets, logs, datasources, a non-production environment. Read-only first, one
connection at a time. [How to set that up →](docs/orchestration-environment.md#building-one)

**3. Run one real problem through the five leaves.**
A defect, a recurring exception, a question nobody can answer quickly. Keep a context file beside the
code so the next cycle starts ahead of this one.

That is the adoption path. Everything below explains why it is shaped this way.

---

## The five leaves

Short form: **Where → Know → Do → Validate → Become**

| Leaf | What it covers | The question it answers |
|---|---|---|
| **Direction** | Human intent, purpose, priorities, constraints, and what should not be pursued | Where are we going, and what outcome are we trying to achieve? |
| **Context** | What the system needs to know about reality before acting | What do we need to know about reality before acting? |
| **Action** | Deciding how the work should happen, and doing it | What should we do, and how should the work happen? |
| **Success** | The intended outcome demonstrated by the real environment | Did reality validate the intended outcome? |
| **Growth** | What the system accumulates or becomes across repeated cycles | What did the system become or learn? |

Each leaf has one job. The complexity belongs in the context, the ownership, the evidence and the
feedback around the leaves, rather than in adding more of them.

Growth is not a finish line. What one cycle records becomes the Context the next one starts from, it
changes how Action gets planned, and it sometimes changes the Direction, because the work showed that
a different outcome was the one worth having.

There is one principle per leaf, so a team that remembers the leaves already remembers the
principles.

[The model in full →](docs/04-framework.md) · [The principles →](docs/03-principles.md)

---

## It sits on top of what a team already runs

The work already happens somewhere — repositories, tickets, pipelines, logs, data stores.
Orchestration adds a layer above them that carries context, action, evidence and learning across the
lot. What changes is how the work is directed, and the systems underneath stay as they are.

So adoption is incremental and reversible. A team can start on one problem, stop whenever it likes,
and find the systems beneath untouched.

The layer still needs access, and access should be scoped deliberately. Read-only where reading is
enough. Human approval wherever a mistake is expensive or hard to reverse.

How much of the path AI determines widens where results have held, stays capped by blast radius, and
is granted per context rather than globally.
[How much autonomy to grant →](docs/08-governance.md#how-much-autonomy-to-grant)

## What it is not

- **Not software.** There is nothing to install.
- **Not a runtime.** Clover defines the operating model around AI orchestration and does not
  prescribe what executes it. Agent frameworks, workflow engines and tool protocols sit inside it.
- **Not a replacement for how a team already works.** It runs alongside Agile, incident management,
  or whatever is already in place.
- **Not about model or tool selection.** It does not say which AI to use, and it does not cover
  cost, evaluations, data governance, or security review.
- **Not needed for everything.** Throwaway work does not need a cycle. It is worth the effort where
  being wrong costs something.

---

## The work behind it

This comes out of delivery work. Two cycles are written up end to end, including the parts that are
still unproven.

**A CMS content API migration whose implementation took about a day, against an 8–10 week estimate.**
GraphQL → REST and .NET 9 MVC → .NET 10 Minimal APIs, replacing ~7,800 lines across 200+ files, with
every route, JSON shape and response envelope preserved so no consumer had to change. Parity held
across 36 endpoint cases, and QA validated the real site through the API gateway and signed off.
Testing took roughly another day and stakeholder agreement longer still, so the day describes
execution rather than delivery. The production cutover has not run.
[Read the case study →](case-studies/01-contentful-migration.md)

**A production memory leak traced past its workaround to the root cause.**
Recurring out-of-memory crashes were stabilized with a blunt Node flag, and the investigation kept
going, into React's Server Components renderer. The one-file fix was contributed upstream as a
CI-green pull request, which has not been merged.
[Read the case study →](case-studies/02-react-rsc-memory-leak.md)

Three reference implementations apply the leaves to recurring problems:
[cross-team knowledge access](docs/reference-implementations.md#1-cross-team-knowledge-access),
[production exception remediation](docs/reference-implementations.md#2-production-exception-remediation),
and [multi-repository defect remediation](docs/reference-implementations.md#3-multi-repository-defect-remediation).
All have been built and used against real organizational data. None is always-on or adopted
organization-wide, and each depends on a person providing the map and holding the approvals.

Each cycle left reusable context behind, which is what the next one starts from.

---

## The name, and the fifth leaf

Four-leaf clovers are the ones people know. This one has five, and the fifth is Growth. The shape
comes from *Black Clover*, where a fifth leaf stands for something darker; Clover borrows the symbol
and none of that meaning.

Growth is useful now. A system that keeps what its outcomes taught it plans better, picks tools
better, and starts the next cycle further along than the last. All five leaves are meant to be used
today.

The open part is how far Growth goes. Nobody knows what happens when it is shared across many
systems, when it is embodied, or when a system begins to influence the Direction it was given rather
than only carrying it out.

**That is a question, not a prediction.** Nothing here says autonomy or harm is inevitable, and no
part of the five leaves depends on the answer. It is kept out of the framework material on purpose,
and it lives in [the hypothesis](hypothesis/ai-future.md).

---

## Where to read next

**Start** — [AGENTS.md](AGENTS.md) is the whole model as instructions for an agent. To run a first
cycle by hand instead, use the [quickstart](QUICKSTART.md), the
[brief template](templates/orchestration-brief.md), or the
[worked example](examples/production-exception-remediation/).

**The framework** — [The problem](docs/01-problem.md) · [Philosophy](docs/02-philosophy.md) ·
[Principles](docs/03-principles.md) · [The model in full](docs/04-framework.md)

**Each part in depth** — [Context](docs/05-context-engineering.md) · [Success](docs/07-success.md) ·
[Governance](docs/08-governance.md) · [Adoption](docs/09-adoption.md) ·
[Roadmap](docs/10-roadmap.md)

**Putting it to work** — [The orchestration environment](docs/orchestration-environment.md) ·
[Reference implementations](docs/reference-implementations.md) ·
[How AI fails](docs/how-ai-fails.md) · [Practices and field lessons](docs/field-practices.md) ·
[Case studies](case-studies/) · [Glossary](docs/glossary.md)

**Separate, and speculative** — [The AI Future](hypothesis/ai-future.md), clearly labeled and not
part of the framework.

## Contributing

Corrections, questions and case studies are welcome, including the ones where the outcome was never
reached. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Author

**Santhosh Narayanan**

Clover comes out of real engineering work, and it keeps changing as more of that work gets done.
