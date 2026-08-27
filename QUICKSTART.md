# Quickstart

Run a first Clover cycle on a real task in about 15 minutes.

There is nothing to install. Clover is a cycle that runs on real work, with whatever tools and AI
assistant are already in use.

> **Direction → Context → Action → Success → Growth**

## What this cycle adds

Most AI work today runs on three leaves. Someone gives the Direction, AI performs the Action from
whatever that person typed in, and after several passes the result becomes Success. It works, and it
is ordinary.

This first cycle adds the fourth leaf. The assistant reads the real systems instead of a description
of them, and the person says where the answer probably is. That pairing is what the rest of the
framework is about.

## 1. Pick a real task (2 min)

Something small and real works best — a bug, a small feature, a production exception. The cycle needs
concrete work to run on.

## 2. Give the assistant something real to read (3 min)

Before describing the problem from memory, hand over a source: the repository, the failing test, the
log lines, the ticket, the query results, the running application in a non-production environment.
Read-only, at the privileges the person driving the work already holds. One source is enough to
start.

Then point. Say which service went out last week, which job has always been fragile, which part of
the code to read first. The systems are a haystack, and a pointer from someone who works in them
every day is worth more than a longer description of the task.
[What to connect, and in what order →](docs/orchestration-environment.md#building-one)

## 3. Copy the orchestration brief (1 min)

Take [`templates/orchestration-brief.md`](templates/orchestration-brief.md), copy it, and rename it
for the task — `checkout-500.md`, for example. That one page is the working artifact for the whole
cycle, and it lives beside the work rather than in a chat window.

## 4. Walk the five leaves (8 min)

Fill each section in order. Every leaf in the brief carries a **copy-and-paste prompt** for an AI
assistant and a note on **who owns what**.

| Leaf | Leave the leaf with… |
|---|---|
| **Direction** | A one-sentence outcome, the edges of the work, where the answer probably is, and what would demonstrate it |
| **Context** | What the real systems showed, and the gaps you could not reach named |
| **Action** | The smallest focused path, an owner per step, and the change itself |
| **Success** | Evidence that maps back to the outcome, and what it does not cover |
| **Growth** | The context worth keeping, and the next thing this revealed |

> **At Success, say what you checked, what you observed, and where you stopped.** Reaching the
> strongest available evidence every time is not the goal. Being accurate about what you have is.
> See [Success](docs/07-success.md#how-strong-is-your-evidence).
>
> If the evidence does not hold, go back to **Context**, rather than to Action.

## 5. Keep the brief (1 min)

Save the filled-in brief with the work — in the pull request, the ticket, or the repository. It
carries the evidence and what the cycle taught, and because it is written down, the next agent or the
next person can pick the work up without redoing the investigation.

## See a full example

[`examples/production-exception-remediation/`](examples/production-exception-remediation/) runs a
recurring production `500` through all five leaves, with the prompts used at each one. Swap in
another scenario and follow the same path.

## If you remember one thing

Get the context from the real systems before acting, and be accurate about what the evidence showed.
The environment decides whether the outcome happened, and the file left behind decides how much the
next cycle costs.

New here? Start with [the problem this solves](docs/01-problem.md) and
[the Clover model](docs/04-framework.md). Want to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md).
