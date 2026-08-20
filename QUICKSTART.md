# Quickstart

Get from "interesting idea" to running your first AI orchestration cycle in about 15 minutes.

The framework is a **lifecycle**, not a library — there's nothing to install. You apply it to a real
task with the tools and AI assistant you already use.

> **Opportunity → Understand → Plan → Execute → Proof → Grow ↺**

## 1. Pick a real task (2 min)

Choose something small and real — a bug, a small feature, or a production exception. The lifecycle
works best on concrete work, not hypotheticals.

## 2. Copy the Orchestration Brief (1 min)

Grab [`templates/orchestration-brief.md`](templates/orchestration-brief.md), copy it, and rename it
for your task (e.g. `checkout-500.md`). That one page is your working artifact for the whole cycle.

## 3. Walk the six stages (10 min)

Fill each section in order. Every stage in the brief includes a **copy-and-paste prompt** for your AI
assistant and a note on **who owns what** (human vs AI):

| Stage | You leave the stage with… |
|---|---|
| **Opportunity** | A one-sentence outcome and a measurable success signal |
| **Understand** | Enough context that the problem is obvious; known unknowns listed |
| **Plan** | The smallest focused path, with per-step ownership |
| **Execute** | A focused, reviewable change |
| **Proof** | Evidence that maps back to the success signal |
| **Grow** | Saved context and the next opportunity |

## 4. Keep the brief (1 min)

Save the filled-in brief alongside your work — in the pull request, the ticket, or the repo. It *is*
your proof and your learning, and it makes the next cycle start stronger.

## See a full example

[`examples/production-exception-remediation/`](examples/production-exception-remediation/) walks a
recurring production `500` through all six stages, with the real prompts and artifacts. Swap in your
own scenario and follow along.

## The one idea to remember

> Don't optimize for AI *activity*. Optimize for **outcomes** — through context, focus, ownership,
> evidence, and learning.

New here? Start with the [Vision](docs/01-problem.md) and the
[AI Orchestration Model](docs/04-framework.md). Want to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md).
