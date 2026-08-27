# The Problem

Clover is a five-leaf framework of using AI. It sets out how a human's direction, the systems an
organization already runs, the work AI does, and the evidence the real environment gives back fit
together into one repeatable cycle.

Direction → Context → Action → Success

## AI already does expert work

AI reads a codebase it has never seen and explains how the system behaves. It reviews a change the
way an experienced engineer reviews one. It designs test cases from how the system actually works
rather than from the wording of a ticket. It reads a diff for the class of mistake that causes
security incidents. During an incident it reconstructs what happened from logs and telemetry, fast
enough to be useful while the incident is still open.

Those answers come out of analysis. AI traces a call path through unfamiliar code, reads a stack
trace against the real source to work out which branch ran, and follows a symptom through the logs
into the data underneath. When somebody goes and checks the answer, it usually holds.

So capability is not what most teams are short of. Skilled people are available, and capable AI is
available too. Something else decides whether the work turns into an outcome anyone can rely on.

## The context is still one human's handover

Almost everywhere AI is used today, everything it knows about the system it is changing arrives from
one human. That is more than typing. They can attach files, or point at the repository they happen
to be working in. It is still bounded by what that one human can reach and remember, put together in
a hurry, about a codebase nobody has held in their head for years.

The ceiling on the work is the ceiling on what one human can hand over.

We kept seeing the same pattern at every level:

- Somebody starts fixing before knowing what is broken, and the fix lands near the problem rather
  than on it.
- A team adds people to move faster. What each of them knows travels badly, so the work turns into
  handoff, lost context, and rework.
- An organization gives everyone AI. A few people get good at it, the rest carry on as before, and
  the capability never becomes shared.
- An agent makes a change, the change fails, and it tries a variation of the same change. Nothing
  was missing except information.

Each one is the same failure. Capability without direction, real information, and evidence rarely
turns into a reliable outcome. AI does not create that gap. It makes the gap obvious, because AI
will act on missing information faster and more confidently than a human will.

That is the problem Clover addresses.

## Why the old way of working does not hold

Our ways of working were built for humans working with humans. A handoff assumes a human on both
ends. A review assumes an author who can explain their reasoning. "Done" assumes somebody looked. An
AI participant breaks all three assumptions at once, and nothing in the process notices.

The symptoms look the same wherever it happens:

* The same request produces a different answer each time.
* The work runs on stale or missing information.
* Confident answers turn out to be invented.
* Nobody trusts the output enough to ship it without redoing it.
* Nothing shows that the intended outcome actually happened.
* Ownership dissolves the moment the work is delegated.
* AI stays a private assistant instead of becoming part of how the organization operates.

## Better tools do not close it

Organizations usually respond by writing better prompts, adopting a newer AI model, or switching
tools. Individual productivity often improves. The larger problem stays open, because none of those
choices decide where the work should go, what the system needs to know about the real environment,
whether the result held up, or what the organization keeps afterward.

Picking an AI model is a small decision next to designing how the work happens. A capable
participant, human or AI, needs the information the problem actually requires, boundaries it
respects, ownership that survives delegation, and something at the end that shows the outcome
occurred.

## The organization already holds the context

The material that would tell AI what it needs to know exists already. Every repository, with its
many projects and the documentation kept for each application. The datasources the applications
connect to. The logs and telemetry. The deployment environments. The running applications
themselves.

Nobody has to write any of that out first. It is there, and it is current, which is more than can be
said for most descriptions of it. Reaching it is what the [Context stage](05-context-engineering.md)
covers, and it is the stage that changed what the other three are worth.

Clover organizes that into four questions a team asks every time:

- What needs to be done, and what must not happen?
- What do we need to know about reality before acting?
- What should we do, and how should the work happen?
- Did reality validate the intended outcome?

The [four working stages](04-framework.md) are those questions, in that order. What each pass
establishes is written down and becomes the context the next one starts from. The fifth stage,
Growth, is what AI learns out of those four, and nobody in an organization runs it.

## Where the evidence comes from

Software engineering is where Clover was built and where all of its evidence comes from, and the
[case studies](../case-studies/README.md) are engineering ones. The problem underneath is not a
software problem. Any work where human intent has to reach a capable system, and where somebody has
to know afterward whether it worked, runs into the same gap.

