# Adoption

Adoption is where [the Clover framework](04-framework.md) becomes how a team works, or stays a
document somebody read once.

This page carries more weight than the rest of the framework. Access can be arranged and controls can
be written in a week. Whether people actually work this way is what decides whether any of it
mattered.

## What is actually being adopted

Clover does not ask teams to replace human judgment with AI. It asks teams to make the working
relationship explicit: **System → Human → AI**.

- **System** is the reality being worked on — an existing system or the system being built, with its
  data, behavior, state, history, constraints, and evidence.
- **Human** owns Direction — purpose, intended outcomes, priorities, acceptable risk, constraints,
  boundaries, and accountability.
- **AI** provides capability and execution inside that Direction, using the system as Context to
  determine and carry out how the work should happen.

The four operational stages remain Context → Direction → Action → Success. Growth is the learning
layer that can emerge from repeated cycles; it is not a fifth task a team has to run.

> **Capability may scale. Direction remains human.**

## The setup

Three steps, in this order.

1. **Stand up read-only MCP servers** in front of the repositories, the datasources, the logs and
   telemetry, and the environments. One connection at a time, each one added because a real problem
   needed it.
2. **Scope every connection to what the human driving the work already has access to**, at the
   privileges they already hold. Nothing new is being granted, and the security conversation stays
   small because there is nothing new to argue about.
3. **Start with one environment. Development is enough.** Widen to other non-production environments
   as it proves out.

The approach gets challenged, and the honest answer holds up. That access already exists and is
already used, often with nobody tracking it. Clover makes it deliberate, scoped and visible. It also
surfaces stale credentials, unreviewed access paths and data nobody has looked at, before any of
those become an incident.
[The orchestration environment](orchestration-environment.md#building-one) covers what to connect and
in what order, and
[governance](08-governance.md#questions-your-security-team-will-ask) answers the questions a security
team will ask before any of it is granted.

## Nothing to migrate onto

Orchestration sits above the systems a team already runs. The work already happens somewhere —
repositories, tickets, pipelines, logs, data stores — and the layer carries context, direction,
execution, evidence and learning across whatever those happen to be. What changes is how the work is
coordinated. The systems underneath keep running as they are.

That is the practical reason adoption can start small. There is no platform decision to make and no
migration to fund. A team that stops is left with exactly what it had.

There is still work in it. The layer needs access to the places the answers live, and that access
should be scoped on purpose: read-only where reading is enough, mirroring what the human driving the
work can already see, and human approval kept wherever a mistake would be expensive or hard to
reverse. [The orchestration environment](orchestration-environment.md) covers what to connect and in
what order, and [governance](08-governance.md) covers the questions a security team will ask before
any of it is granted.

## The stages do not cost the same to adopt

**Context** is the real investment, and it is where most of the early value shows up. Read-only reach
into the code, the tickets, the logs and the data lets AI reason about the actual problem instead of
a description of it. It is also the stage that needs someone to negotiate access, so it is the one
that stalls. It is where iteration lands too:

> After each success and each failure, the context files are written before the next attempt.

What a team writes down goes into those files, beside the work. Most teams skip that, because the
work feels finished when the change ships.

**Direction** costs habit and nothing else. Somebody says what needs to be done, what must not
happen, and where they think the answer is, before the work starts. No tooling and no approval sit in
front of it, and once the systems can be read, the direction is given against what is actually there.

**Action** grows through delegated execution. What AI is trusted to carry follows what has already held
up in work of that kind. More capable models can increase the amount or complexity of execution that a
human chooses to delegate inside Action, but they do not change the ownership of Direction.

Competition may increase pressure to automate faster. Clover treats that as a reason to improve
execution, not as a reason to hand purpose or accountability to AI. **Direction is not delegated by
competition.**

**Success** is the first discipline that changes how people report. Teams that start saying what they
checked, what they observed, and where they stopped find out quickly how much of their reporting had
been assertion.

## A sequence that works

1. **Start with one real problem the team already has** — a recurring exception, a defect nobody can
   place, a question that currently takes three teams to answer. A tool looking for a use does not
   survive contact with a busy week.
2. **Connect one real source, read-only.** A read-only MCP server in front of the repository, then
   the logs, then the ticket history, then a datasource. Reading cannot break anything, so it is the
   cheapest way to find out whether the output can be trusted, and one connection at a time keeps the
   security conversation small.
3. **Add the development environment, then the other non-production ones.** That is where checking
   earns its place without new risk, alongside the pipeline triggers that already exist.
4. **Give the direction against what the team can now see.** Somebody says what needs to be done,
   what must not happen, and where they think the answer probably is. Teach that cycle rather than
   the tool: Context → Direction → Action → Success outlives whichever product the team is using
   this quarter.
5. **Let people ask in whatever way they find natural.** When most questions can be asked and answered
   in conversation, the bottleneck stops being whoever knows the system best.
6. **Delegate execution where evidence supports it**, following
   [the delegated-execution rules](04-framework.md#delegating-execution-without-transferring-direction)
   rather than enthusiasm. This can change how much of the path AI performs; it does not transfer
   Direction.
7. **Keep a markdown file beside the work** holding the goal, what is settled, what remains, and what
   was ruled out. That file is what lets any agent pick the job up, so the work stops depending on one
   agent or one session. [Context engineering](05-context-engineering.md#where-context-lives) covers
   where it lives.

## From individual skill to collective capability

A few people being good at AI does not make an organization capable. The value compounds when
context, practices and lessons are shared, and it stalls when they stay with whoever learned fastest.
The context files are most of the sharing mechanism, which is why writing them is worth insisting on.

Growth can emerge from any part of the cycle: new system understanding, analyses, decisions, actions,
successes, failures, and patterns that become visible across repeated work. That learning can improve
humans, AI usage, the system itself, teams, and organizational practice without requiring the same
AI model to change.

Two things make the sharing happen. People need room to try something and have it not work, because a
team that is penalized for a failed attempt stops reporting the failed attempts. And somebody has to
review what gets kept, so that one good outcome does not become a rule the next ten cycles follow.

## Knowing whether it worked

Enthusiasm during a rollout says very little. The better signal is whether the way of working
continues while whoever introduced it is on leave. A capability that stops when its advocate
steps away has been demonstrated rather than adopted.

What is worth watching:

- Whether questions get answered from the sources rather than from whoever remembers.
- Whether people outside the original group start working this way without being asked.
- Whether claims arrive with what was checked and where it stopped, unprompted.
- Whether the context files from earlier cycles are being read, and not only written.
- Whether anyone had to reconstruct work a previous session already did.
- Whether delegated execution is expanding based on evidence rather than competitive pressure.
- Whether the human owner of Direction and accountability remains explicit as AI capability changes.

## Related

- [The orchestration environment](orchestration-environment.md) — the access the Context stage needs.
- [Governance](08-governance.md) — ownership, attribution, approval, and delegated execution.
- [Practices and field lessons](field-practices.md) — what this has looked like on real work.
- [Reference implementations](reference-implementations.md) — patterns to adopt and adapt.
