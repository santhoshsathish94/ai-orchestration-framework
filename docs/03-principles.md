# Principles

## Purpose

Clover describes how humans and AI turn intent into outcomes the environment confirms. The five stages give the structure. These principles are what make each stage hold up on real work.

There is one principle per stage. A team that remembers the stages already remembers the principles. The first two carry most of the weight, because Direction and Context are what separate the lucky clover from the common one.

---

## 1. Direction is a human decision

*Stage: Direction*

The human accountable for the outcome controls what matters, the desired outcome, constraints, boundaries, and what must not happen, and approves. AI determines how the work should happen and executes within those boundaries. The availability of an AI model, an agent, or a tool is not a reason to start.

Direction also points. An organization's systems are a haystack, and the answer is a needle somewhere inside it. The people who work in those systems every day know roughly where it fell — which service went out last week, which job has always been fragile, which team owns the part nobody wrote down. Once AI can read the real environment, saying which part of the system to read first is worth more than a long description of the task.

Direction carries the boundaries with it: what must not change, what needs approval before it happens, which systems and data the work may touch. A direction that says what to do and never says what must not happen gets read generously by whoever picks it up.

Tickets, incidents, and requests are inputs to Direction. They rarely state the outcome on their own, and somebody still has to.

## 2. Context comes from the real environment

*Stage: Context*

In the common clover, context is only what one human can hand over — what they type, the files they attach, the repository they are working in — and it stays bounded by what that human can reach and remember. This principle is about the other kind. Context comes from the current systems the organization uses. Every repository, with its many projects and the documentation kept for each application. The datasources the applications connect to. The logs and telemetry. The deployment environments. The running applications. Where the environment can answer a question, read the environment instead of reasoning about what it probably contains.

Reaching it is a setup rather than a principle. Read-only MCP servers in front of the repositories, the datasources, the logs and the environments give an agent a way in. Every connection is scoped to what the human driving the work already has access to, at the privileges they already hold, and one environment is enough to start — development. [The orchestration environment](orchestration-environment.md#building-one) covers what to connect and in what order, and [governance](08-governance.md#access-mirrors-the-human-not-the-ai) covers how that access is held.

Treat the context in hand as incomplete until it has been checked. Name the assumptions nobody tested and the signals nobody looked at, then reduce that uncertainty before making a consequential change.

Collecting everything is its own failure. A context stuffed with irrelevant material buries the few facts the problem turns on. Enough context to reason correctly is the bar, and reaching it takes several passes.

Every pass adds context, and iteration feeds this stage rather than any other.

> After each success and each failure, the context files are written before the next attempt.

What gets written is what was tried, the context it ran in, what the environment showed, and what turned out to be wrong. A summary kept in a markdown file beside the work carries all of that, which is what lets any agent pick the job up. Judgment about what is worth keeping and where a recorded lesson has gone stale stays with a human, because a wrong finding written down spreads.

## 3. Action runs inside a structured workflow

*Stage: Action*

AI works reliably when it has defined context, stated boundaries, the tools the job needs, and clear handoffs. Action is now mostly driven by AI, and humans and AI can share the work. Responsibility for the outcome stays with a named human, whoever or whatever performed each step.

Plan the smallest coherent path to the outcome. Run work in parallel only where it is genuinely independent, because coordination costs real time and more agents do not make a tangled problem finish sooner.

New information during the work is a reason to replan rather than a reason to push on. Coherent progress is the objective, and maximum AI activity is a poor proxy for it.

## 4. Success is demonstrated by the environment

*Stage: Success*

A closed task, a generated artifact, a passing build, or a merged change is not the outcome by itself. Success means the environment shows that the intended outcome occurred.

State what you checked, what you observed, and where you stopped. Stopping early is often correct — a small change can be genuinely complete once a test covers it, and production observation is not always available or worth its cost. The failure is describing weak evidence in the language of strong evidence. "Validated in the test environment, not yet observed in production" is a complete and honest claim.

When the evidence does not support the intended outcome, go back to Context. A failed check usually means something about reality was missing, so repeating the action only reaches the same wrong place faster.

## 5. Growth is validated before it is reused

*Stage: Growth*

Growth is what AI learns, and the expertise it forms, out of the other four stages. Nobody in an organization operates it. It belongs to the frontier AI companies, who hold the volume of data that everyone's usage generates, and it is the next stage rather than one a team runs.

What a team does control is what it reuses. A single good outcome is an anecdote, and promoting it to a rule teaches the next cycle something that is not true yet. A pattern earns its place once it has held across several cycles, and until then it is recorded as what happened rather than as how things are done.

Where knowledge can safely be shared, it should not stay with one team, or with whoever learned it first. Otherwise the next cycle depends on who happens to be around. The place it goes is Context — the files beside the work — which is where the next cycle reads it.

---

## Summary

| Stage | Principle |
|---|---|
| **Direction** | Direction is a human decision |
| **Context** | Context comes from the real environment |
| **Action** | Action runs inside a structured workflow |
| **Success** | Success is demonstrated by the environment |
| **Growth** | Growth is validated before it is reused |

The working loop is four stages: Direction → Context → Action → Success.

Each stage is described in full, with what happens there, in [the framework](04-framework.md).
