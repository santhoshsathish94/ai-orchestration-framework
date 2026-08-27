# Adoption

Adoption is where [the Clover model](04-framework.md) becomes how a team works, or stays a document
somebody read once.

This page carries more weight than the rest of the framework. Access can be arranged and controls can
be written in a week. Whether people actually work this way is what decides whether any of it
mattered.

## What is actually being adopted

A team already using AI is already running three of the leaves. Somebody gives the Direction, AI
performs the Action from whatever that person typed in, and after several passes the result becomes
Success. That part needs no rollout.

What gets adopted is the fourth leaf. AI reads the systems the organization already runs — the
repositories, the projects and their documentation, the real data, the logs and telemetry, the
deployment environments, the running applications — instead of reading a description somebody typed
from memory. Alongside it, the people who work in a system every day start saying where the answer
probably is, because the systems are a haystack and a pointer is worth more than a longer
description.

The rest of this page is about getting that leaf in place and keeping it there.

## Nothing to migrate onto

Orchestration sits above the systems a team already runs. The work already happens somewhere —
repositories, tickets, pipelines, logs, data stores — and the layer carries direction, context,
execution, evidence and learning across whatever those happen to be. What changes is how the work
gets directed. The systems underneath keep running as they are.

That is the practical reason adoption can start small. There is no platform decision to make and no
migration to fund. A team that stops is left with exactly what it had.

There is still work in it. The layer needs access to the places the answers live, and that access
should be scoped on purpose: read-only where reading is enough, mirroring what the person driving the
work can already see, and human approval kept wherever a mistake would be expensive or hard to
reverse. [The orchestration environment](orchestration-environment.md) covers what to connect and in
what order, and [governance](08-governance.md#questions-your-security-team-will-ask) covers the
questions a security team will ask before any of it is granted.

## The leaves do not cost the same to adopt

**Direction** costs habit and nothing else. Somebody states the outcome, the constraints, what stays
out of scope, and where they think the answer is, before the work starts. A team can begin that today
with no access, no tooling and no approval to wait for.

**Context** is the real investment, and it is where most of the early value shows up. Read-only reach
into the code, the tickets, the logs and the data lets AI reason about the actual problem instead of
a description of it. It is also the leaf that needs someone to negotiate access, so it is the one
that stalls.

**Action** widens on its own once Direction and Context are steady. What AI is trusted to carry
follows what has already held up in work of that kind.

**Success** is the first discipline that changes how people report. Teams that start saying what they
checked, what they observed, and where they stopped find out quickly how much of their reporting had
been assertion.

**Growth** is the smallest of the five today, and the larger form of it has not arrived. What a team
can do now is write down what a cycle taught, beside the work, so the next cycle starts from it. Most
teams skip it, because the work feels finished when the change ships.

## A sequence that works

1. **Start with one real problem the team already has** — a recurring exception, a defect nobody can
   place, a question that currently takes three teams to answer. A tool looking for a use does not
   survive contact with a busy week.
2. **Teach the cycle rather than the tool.** Direction → Context → Action → Success → Growth outlives
   whichever product the team is using this quarter.
3. **Connect one real source, read-only.** The repository, then the logs, then the ticket history,
   then a datasource. Reading cannot break anything, so it is the cheapest way to find out whether
   the output can be trusted, and one connection at a time keeps the security conversation small.
4. **Wire it into the environments and pipelines that already exist.** Non-production environments and
   existing pipeline triggers are where checking earns its place without new risk.
5. **Let people ask in whatever way they find natural.** When most questions can be asked and answered
   in conversation, the bottleneck stops being whoever knows the system best.
6. **Widen what AI decides as results hold**, following
   [the rules for widening](04-framework.md#widening-what-ai-decides) rather than enthusiasm.
7. **Keep a markdown file beside the work** holding the goal, what is settled, what remains, and what
   was ruled out. That file is what lets any agent pick the job up, so the work stops depending on one
   agent or one session. [Context engineering](05-context-engineering.md#where-context-lives) covers
   where it lives.

## From individual skill to collective capability

A few people being good at AI does not make an organization capable. The value compounds when
context, practices and lessons are shared, and it stalls when they stay with whoever learned fastest.
The context files are most of the sharing mechanism, which is why writing them is worth insisting on.

Two things make the sharing happen. People need room to try something and have it not work, because a
team that is penalized for a failed attempt stops reporting the failed attempts. And somebody has to
review what gets kept, so that one good outcome does not become a rule the next ten cycles follow.

## Knowing whether it worked

Enthusiasm during a rollout says very little. The better signal is whether the way of working
continues while the person who introduced it is on leave. A capability that stops when its advocate
steps away has been demonstrated rather than adopted.

What is worth watching:

- Whether questions get answered from the sources rather than from whoever remembers.
- Whether people outside the original group start working this way without being asked.
- Whether claims arrive with what was checked and where it stopped, unprompted.
- Whether the context files from earlier cycles are being read, and not only written.
- Whether anyone had to reconstruct work a previous session already did.

## Related

- [The orchestration environment](orchestration-environment.md) — the access the Context leaf needs.
- [Governance](08-governance.md) — ownership, attribution, and approval as this widens.
- [Practices and field lessons](field-practices.md) — what this has looked like on real work.
- [Reference implementations](reference-implementations.md) — patterns to adopt and adapt.
