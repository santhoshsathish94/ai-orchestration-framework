# Context Engineering

AI Orchestration Model

Opportunity → Understand → Plan → Execute → Proof → Grow ↺

Context is what makes the **Understand** stage possible. Capability — human or AI — is only reliable
when it has the context to reason correctly. A person cannot meaningfully solve a problem they have
never understood, and neither can an agent, no matter how capable its tools.

## Context is a living asset

Context is not a one-time prompt. It is the accumulated understanding of a system — its architecture,
business rules, dependencies, history, and prior attempts. It should get richer every cycle — that is
what **Grow** feeds back.

## In practice

- Capture the pre-story: what happened, why it matters, what we're trying to achieve, what was already tried.
- Prefer existing organizational knowledge (repositories, tickets, telemetry, docs) before adding new context.
- Name what is still missing, and retrieve it before acting rather than guessing.
- Keep context reusable so the next person or agent starts from understanding, not from zero.

## Where context lives

"Reusable" needs somewhere to live, or it means nothing. The mechanism that works is unglamorous:
**plain markdown files committed alongside the code they describe.**

One per effort, or per repository, updated as the work proceeds rather than written up at the end.
A useful file answers four questions:

| | |
|---|---|
| **The goal** | What outcome is being pursued, and what "done" means |
| **What has been established** | Findings that are settled, and the evidence behind them |
| **What remains** | Open questions, unverified assumptions, and next steps |
| **What was learned** | Things that turned out to be wrong, dead ends worth not repeating |

This matters more with AI than without it. A session ends and its working memory goes with it. A file
in the repository does not. Anyone picking the work up — a colleague, a different agent, the same
agent tomorrow — starts from the accumulated understanding instead of re-deriving it, and the
re-derivation is where both cost and drift come from.

Two properties make it work:

- **It sits next to the code**, so it travels with the change, gets reviewed with the change, and
  cannot silently disagree with a wiki nobody opened.
- **It is written continuously.** Context recorded only at the end is a report. Context recorded as
  you go is a working memory, and it is the difference between resuming and restarting.

This is **Grow** made concrete: the stage stops being a good intention and becomes a file that the
next cycle actually reads.

Understand is also the stage that catches most AI failures — fabricated references, plausible-but-wrong
root causes, and agreement offered in place of judgment. See
[How AI fails](how-ai-fails.md) for what to watch for and why each one happens.
