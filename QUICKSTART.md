# Quickstart

Run a first Clover cycle on a real task in about 15 minutes.

There is nothing to install. Clover is a cycle that runs on real work, with whatever tools and AI
assistant are already in use.

> **Direction → Context → Action → Success → Growth**

## 1. Pick a real task (2 min)

Something small and real works best — a bug, a small feature, a production exception. The cycle needs
concrete work to run on.

## 2. Copy the orchestration brief (1 min)

Take [`templates/orchestration-brief.md`](templates/orchestration-brief.md), copy it, and rename it
for the task — `checkout-500.md`, for example. That one page is the working artifact for the whole
cycle.

## 3. Walk the five leaves (10 min)

Fill each section in order. Every leaf in the brief carries a **copy-and-paste prompt** for an AI
assistant and a note on **who owns what**.

| Leaf | Leave the leaf with… |
|---|---|
| **Direction** | A one-sentence outcome, the edges of the work, and what would demonstrate it |
| **Context** | Enough of the real environment that the problem is obvious, and the gaps named |
| **Action** | The smallest focused path, an owner per step, and the change itself |
| **Success** | Evidence that maps back to the outcome, and what it does not cover |
| **Growth** | The context worth keeping, and the next thing this revealed |

> **At Success, say what you checked, what you observed, and where you stopped.** Reaching the
> strongest available evidence every time is not the goal. Being accurate about what you have is.
> See [Success](docs/07-success.md#how-strong-is-your-evidence).
>
> If the evidence does not hold, go back to **Context**, rather than to Action.

## 4. Keep the brief (1 min)

Save the filled-in brief with the work — in the pull request, the ticket, or the repository. It
carries the evidence and what the cycle taught, which is what makes the next cycle start stronger.

## See a full example

[`examples/production-exception-remediation/`](examples/production-exception-remediation/) runs a
recurring production `500` through all five leaves, with the prompts used at each one. Swap in
another scenario and follow the same path.

## The one idea to remember

> Optimize for the outcome rather than for AI activity. The environment decides whether the outcome
> happened, and what the cycle leaves behind decides how much the next one costs.

New here? Start with [the problem this solves](docs/01-problem.md) and
[the Clover model](docs/04-framework.md). Want to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md).
