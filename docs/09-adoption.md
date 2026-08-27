# Adoption

Adoption is where [the Clover model](04-framework.md) becomes how a team works, or stays a document
somebody read once.

This page carries more weight than the rest of the framework. Access can be arranged and controls can
be written in a week. Whether people actually work this way is what decides whether any of it
mattered.

## Nothing to migrate onto

Orchestration sits above the systems a team already runs. The work already happens somewhere —
repositories, tickets, pipelines, logs, data stores — and the layer carries direction, context,
execution, evidence and learning across whatever those happen to be. What changes is how the work
gets directed. The systems underneath keep running as they are.

That is the practical reason adoption can start small. There is no platform decision to make and no
migration to fund. A team that stops is left with exactly what it had.

There is still work in it. The layer needs access to the places the answers live, and that access
should be scoped on purpose: read-only where reading is enough, and human approval kept wherever a
mistake would be expensive or hard to reverse. [The orchestration
environment](orchestration-environment.md) covers what to connect and in what order.

## The leaves do not cost the same to adopt

**Direction** costs habit and nothing else. Somebody states the outcome, the constraints, and what
stays out of scope before the work starts. A team can begin that today with no access, no tooling and
no approval to wait for.

**Context** is the first real investment, and it is where most of the early value shows up. Read-only
reach into the code, the tickets, the logs and the data lets AI reason about the actual problem
instead of a description of it.

**Action** widens on its own once Direction and Context are steady. What AI is trusted to carry
follows what has already held up in work of that kind.

**Success** is the first discipline that changes how people report. Teams that start saying what they
checked, what they observed, and where they stopped find out quickly how much of their reporting had
been assertion.

**Growth** is the leaf teams skip, because the work feels finished when the change ships. It is also
the only leaf that makes the next cycle cheaper than the last one.

## A sequence that works

1. **Start with one real problem the team already has** — a recurring exception, a defect nobody can
   place, a question that currently takes three teams to answer. A tool looking for a use does not
   survive contact with a busy week.
2. **Teach the cycle rather than the tool.** Direction → Context → Action → Success → Growth outlives
   whichever product the team is using this quarter.
3. **Give the layer read-only access to the real systems first.** Most early value is in answering
   questions from actual sources — code, logs, job definitions, data — and reading cannot break
   anything. It is the cheapest way to find out whether the output can be trusted.
4. **Wire it into the environments and pipelines that already exist.** Non-production environments and
   existing pipeline triggers are where checking earns its place without new risk.
5. **Let people ask in whatever way they find natural.** When most questions can be asked and answered
   in conversation, the bottleneck stops being whoever knows the system best.
6. **Widen what AI decides as results hold**, following
   [the rules for widening](04-framework.md#widening-what-ai-decides) rather than enthusiasm.
7. **Write down what each cycle taught**, next to the code, so the next person starts from it.
   [Context engineering](05-context-engineering.md#where-context-lives) covers where that lives.

## From individual skill to collective capability

A few people being good at AI does not make an organization capable. The value compounds when
context, practices and lessons are shared, and it stalls when they stay with whoever learned fastest.

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

## Related

- [The orchestration environment](orchestration-environment.md) — the access the Context leaf needs.
- [Governance](08-governance.md) — ownership, attribution, and approval as this widens.
- [Practices and field lessons](field-practices.md) — what this has looked like on real work.
- [Reference implementations](reference-implementations.md) — patterns to adopt and adapt.
