# Clover

> **Direction → Context → Action → Success → Growth**

Clover is a five-leaf model for doing real work with AI inside it. It describes how human intent
becomes an outcome the real environment confirms, and what the system keeps once it does. It sits on
top of the systems a team already runs. Nothing to install, nothing to migrate onto.

**[🌐 Read it on the website →](https://santhoshsathish94.github.io/ai-orchestration-framework/)** — the five leaves in about three minutes.

---

## AI already does expert work

AI reads a codebase it has never seen and explains how the system behaves. It reviews a change the
way an experienced engineer reviews one. It writes test cases from how the system actually works
rather than from the wording of a ticket. It reads a diff for the class of mistake that causes
security incidents. During an incident it reconstructs what happened from logs and telemetry while
the incident is still open.

Those answers come out of analysis rather than recall, and when somebody goes and checks one it
usually holds. So capability is not what teams are short of. What decides whether the work becomes an
outcome anyone can rely on sits around the capability.

---

## Three leaves, then four, then five

The number of leaves carries the argument. A three-leaf clover is the common one. A four-leaf clover
is the rare one. A five-leaf clover is rarer still, and it has not shown up yet.

**Three leaves — Direction, Action, Success.** A person gives the Direction. AI performs the Action,
working from whatever that person typed in. After several passes the result becomes Success. This is
how AI is used almost everywhere today, it produces real value, and it is ordinary. The limit is that
these three leaves only ever see as much of the organization as one person remembered to describe.

**Four leaves — Context.** Context typed in by hand has stopped being the useful kind, because AI can
hold far more context than it could before. So Context means the material the organization already
has: the repositories, the many projects and the documentation kept for each application, the real
data from every datasource an application connects to, the logs and telemetry, the deployment
environments, and the running applications. Nobody hands all of that over at once. A person gets
access to what they already have access to, at the privileges they already hold, and read-only is
enough to start with.
[Governance](docs/08-governance.md#questions-your-security-team-will-ask) answers the questions a
security team will ask.

Connecting the material does not finish the job. An organization's systems are a haystack, and the
thing worth finding is a needle somewhere inside it. Expecting AI to search the whole haystack does
not work. **That is what changes Direction.** The people who work on a system every day know roughly
where the needle fell, so Direction becomes a pointer at the part of the system to read first.
Direction that points, together with context that is real, is what produces Success worth having.

It runs in a loop, and what comes back from one pass is context for the next. Markdown files kept
beside the work hold the summary, and that summary is what lets any agent pick the job up, so no
single agent has to hold the work.

**Five leaves — Growth.** Growth has not arrived. A team can keep what a cycle taught it, and that is
worth doing, but the leaf as a whole does not affect organizations today. Every problem solved with
AI produces information, patterns form across an enormous number of interactions, and new expertise
forms out of the patterns. The phase after this one is AI that works from goals with far less
direction than it needs now. That is a general statement about how information accumulates, and it
says nothing about any AI provider training on customer or enterprise work.

The fifth leaf is also where the name comes from. The shape comes from *Black Clover*, where a fifth
leaf stands for something darker, and Clover borrows the symbol and none of that meaning. How far
Growth goes is a question rather than a prediction, and it is kept out of the framework material in
[the hypothesis](hypothesis/ai-future.md).

[The arc in full →](docs/04-framework.md#three-leaves-then-four-then-five)

---

## The five leaves

The model reads in the order the work runs in. Short form: **Where → Know → Do → Validate → Become**

| Leaf | What it covers | The question it answers |
|---|---|---|
| **Direction** | Human intent, priorities, constraints, and where the answer probably is | Where are we going, and what outcome are we trying to achieve? |
| **Context** | What the organization already has that describes reality | What do we need to know about reality before acting? |
| **Action** | Deciding how the work should happen, and doing it | What should we do, and how should the work happen? |
| **Success** | The intended outcome demonstrated by the real environment | Did reality validate the intended outcome? |
| **Growth** | What the system accumulates or becomes across repeated cycles | What did the system become or learn? |

Each leaf has one job. The complexity belongs in the context, the ownership, the evidence and the
feedback around the leaves, rather than in adding more of them. There is one principle per leaf, so a
team that remembers the leaves already remembers the principles. If Success does not hold, the cycle
goes back to Context rather than to Action, because a second attempt on the same information lands in
the same place, faster.

[The model in full →](docs/04-framework.md) · [The principles →](docs/03-principles.md)

---

## Start

**1. Copy [`AGENTS.md`](AGENTS.md) into your project.**
It is the whole operating model written as instructions for an agent. Point an agent at that one
file and nothing else is required.

**2. Connect the fourth leaf.**
Repository, tickets, logs, datasources, a non-production environment. Read-only first, one
connection at a time, scoped to what the person driving the work can already read.
[How to set that up →](docs/orchestration-environment.md#building-one)

**3. Run one real problem through the five leaves.**
A defect, a recurring exception, a question nobody can answer quickly. Say where you think the answer
is, and keep a markdown file beside the code so the next cycle starts ahead of this one.

Adoption is incremental and reversible, and a team that stops is left with the systems it already
had. How much of the path AI determines widens where results have held, stays capped by blast radius,
and is granted per context rather than globally.
[How much autonomy to grant →](docs/08-governance.md#how-much-autonomy-to-grant) ·
[How a team gets there →](docs/09-adoption.md)

---

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

**A production memory leak traced past its workaround to the root cause.** Recurring out-of-memory
crashes were stabilized with a blunt Node flag, and the investigation kept going, into React's Server
Components renderer. The one-file fix was contributed upstream as a CI-green pull request, which has
not been merged. [Read the case study →](case-studies/02-react-rsc-memory-leak.md)

Three reference implementations apply the leaves to recurring problems:
[cross-team knowledge access](docs/reference-implementations.md#1-cross-team-knowledge-access),
[production exception remediation](docs/reference-implementations.md#2-production-exception-remediation),
and [multi-repository defect remediation](docs/reference-implementations.md#3-multi-repository-defect-remediation).
All have been built and used against real organizational data. None is always-on or adopted
organization-wide, and each depends on a person providing the map and holding the approvals. Each
cycle left reusable context behind, which is what the next one starts from.

---

## Where to read next

**Start** — [AGENTS.md](AGENTS.md) is the whole model as instructions for an agent. To run a first
cycle by hand instead, use the [quickstart](QUICKSTART.md), the
[brief template](templates/orchestration-brief.md), or the
[worked example](examples/production-exception-remediation/).

**The framework** — [The problem](docs/01-problem.md) · [Philosophy](docs/02-philosophy.md) ·
[Principles](docs/03-principles.md) · [The model in full](docs/04-framework.md) ·
[Context](docs/05-context-engineering.md) · [Success](docs/07-success.md) ·
[Governance](docs/08-governance.md) · [Adoption](docs/09-adoption.md) ·
[Roadmap](docs/10-roadmap.md)

**Putting it to work** — [The orchestration environment](docs/orchestration-environment.md) ·
[Reference implementations](docs/reference-implementations.md) ·
[How AI fails](docs/how-ai-fails.md) · [Practices and field lessons](docs/field-practices.md) ·
[Case studies](case-studies/) · [Glossary](docs/glossary.md) ·
[The AI Future](hypothesis/ai-future.md), which is speculative and labeled as such.

## Contributing

Corrections, questions and case studies are welcome, including the ones where the outcome was never
reached. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Author

**Santhosh Narayanan**

Clover comes out of real engineering work, and it keeps changing as more of that work gets done.
