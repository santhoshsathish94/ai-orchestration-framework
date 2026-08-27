# Principles

## Purpose

Clover describes how humans and AI turn intent into outcomes the environment confirms. The five leaves give the structure. These principles are what make each leaf hold up on real work.

There is one principle per leaf. A team that remembers the leaves already remembers the principles. The first two carry most of the weight, because Direction and Context are what separate the four-leaf way of working from the three-leaf one.

---

## 1. Direction is a human decision

*Leaf: Direction*

Somebody accountable states what is being worked on, why it matters, which outcome is worth having, and what sits outside the work. The availability of a model, agent, or tool is not a reason to start.

Direction also points. An organization's systems are a haystack, and the answer is a needle somewhere inside it. The people who work in those systems every day know roughly where it fell — which service went out last week, which job has always been fragile, which team owns the part nobody wrote down. Once AI can read the real environment, saying which part of the system to read first is worth more than a long description of the task.

Direction carries the boundaries with it: what must not change, what needs approval before it happens, which systems and data the work may touch. A direction that says where to go and never says where not to gets read generously by whoever picks it up.

Tickets, incidents, and requests are inputs to Direction. They rarely state the outcome on their own, and somebody still has to.

## 2. Context comes from the real environment

*Leaf: Context*

Context comes from the systems the organization already runs. The repositories, the documentation kept for each application, the real data behind them, the logs and telemetry, the deployment environments, and the running applications. Where the environment can answer a question, read the environment instead of reasoning about what it probably contains.

Access mirrors the person. AI reads what the person driving the work can already read, at the privileges they already hold, and read-only is enough to start with. [Governance](08-governance.md#access-mirrors-the-person-not-the-ai) covers how that is held.

Treat the context in hand as incomplete until it has been checked. Name the assumptions nobody tested and the signals nobody looked at, then reduce that uncertainty before making a consequential change.

Collecting everything is its own failure. A context stuffed with irrelevant material buries the few facts the problem turns on. Enough context to reason correctly is the bar, and reaching it takes several passes. A summary kept in a markdown file beside the work carries what each pass established, which is what lets any agent pick the job up.

## 3. Action runs inside a structured workflow

*Leaf: Action*

AI works reliably when it has defined context, stated boundaries, the tools the job needs, and clear handoffs. Humans and AI can share the work. Responsibility for the outcome stays with a named person, whoever or whatever performed each step.

Plan the smallest coherent path to the outcome. Run work in parallel only where it is genuinely independent, because coordination costs real time and more agents do not make a tangled problem finish sooner.

New information during the work is a reason to replan rather than a reason to push on. Coherent progress is the objective, and maximum AI activity is a poor proxy for it.

## 4. Success is demonstrated by the environment

*Leaf: Success*

A closed task, a generated artifact, a passing build, or a merged change is not the outcome by itself. Success means the environment shows that the intended outcome occurred.

State what you checked, what you observed, and where you stopped. Stopping early is often correct — a small change can be genuinely complete once a test covers it, and production observation is not always available or worth its cost. The failure is describing weak evidence in the language of strong evidence. "Validated in the test environment, not yet observed in production" is a complete and honest claim.

When the evidence does not support the intended outcome, go back to Context. A failed check usually means something about reality was missing, so repeating the action only reaches the same wrong place faster.

## 5. Growth is validated before it is reused

*Leaf: Growth*

Every cycle produces experience — what was tried, the context it ran in, what the environment showed, what was missing. Capture it while it is still accurate.

Experience becomes expertise once the same pattern has held across several cycles. A single good outcome is an anecdote, and promoting it to a rule teaches the system something that is not true yet.

Where knowledge can safely be shared, it should not stay with one person or one team. Otherwise the next cycle depends on who happens to be around.

What a team can do with this leaf today is modest and still worth doing. The larger form of Growth, where patterns accumulate across an enormous number of cycles until new expertise comes out of them, has not arrived.

---

## Summary

| Leaf | Principle |
|---|---|
| **Direction** | Direction is a human decision |
| **Context** | Context comes from the real environment |
| **Action** | Action runs inside a structured workflow |
| **Success** | Success is demonstrated by the environment |
| **Growth** | Growth is validated before it is reused |

Direction → Context → Action → Success → Growth

Short form: Where → Know → Do → Validate → Become

Each leaf is described in full, with what commonly goes wrong at it, in [the model](04-framework.md).
