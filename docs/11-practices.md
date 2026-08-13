# Practices & Field Lessons

> **Practices distilled from real orchestration work.**

The [Philosophy](02-philosophy.md) explains *what we believe*. The [Principles](03-principles.md)
define *how we apply* those beliefs. This page captures **field lessons** — practices learned by
running the model on real, high-stakes work — in the spirit of the Validate stage, which exists to
"capture lessons that improve future orchestrations."

Each lesson records the situation, the realization, and the practice it produced.

---

## Lesson 1 — Focus beats parallelism

> **AI can run many tasks at once. Your attention still cannot. Concentrate it.**

### From the field

AI agents and parallel sessions made it easy to run three initiatives at the same time — two
release-blocking production issues and a new feature for an upcoming launch. It *felt* highly
productive: many things moving at once, visible activity everywhere.

The outcomes told a different story. One blocker was ultimately resolved better by someone else. The
other accumulated band-aid fixes instead of a real resolution. The new feature came out weak.
Stepping back to ask *"why did I get more done before, but not now?"*, the answer wasn't AI
capacity — it was that my **inputs and direction were spread thin**. With attention divided three
ways, the intent and context given to each task were shallow, so the outputs were shallow too.

Dropping the parallelism and focusing on one workstream at a time is what finally resolved the
hardest issue at its root (see [Case Study 02](../case-studies/02-react-rsc-memory-leak.md)).

### The practice

- Treat **human attention — not AI throughput — as the scarce resource.** AI's ability to run many
  things in parallel is a temptation, not a mandate.
- Prefer **depth over breadth**: give one workstream focused, high-quality intent and context before
  starting the next.
- Watch for the **illusion of progress** — motion across many tasks is not the same as outcomes.
  Measure outcomes, not activity.
- Beware **false economy**: under-resourcing a task (for example, a weaker tool or model chosen only
  to conserve budget) *while also* spreading attention thin can cost far more than it saves. Put the
  right resources on the task that matters most.

**Reinforces:** [Principle 3 — Engineer Context Before Orchestration](03-principles.md) and the
belief that outcome quality follows the quality of human intent and context.
*Noise does not improve outcomes; focus does.*

---

## Lesson 2 — Understand before fixing

> **Don't rush to a fix. Understand → instrument → plan → fix → validate.**

### From the field

On a hard bug, AI repeatedly jumped straight to attempted fixes — and repeatedly failed. Each
attempt was a guess at a solution before the problem was actually understood.

Changing the instruction changed everything: *"Step back. Don't fix yet. First understand the
problem end to end. Add logging where your understanding is incomplete. Then plan the change based on
that understanding. Then implement it. Then validate that it's actually done."* With that sequence,
the root cause was found and fixed quickly — far faster than the fix-first thrashing that preceded it.

### The practice

- Enforce an **understand-first loop**, for AI and humans alike:
  1. **Understand** the problem end to end.
  2. **Instrument** — add logs/observability where understanding is incomplete.
  3. **Plan** the change based on that understanding.
  4. **Fix.**
  5. **Validate** that the intended outcome is actually achieved.
- When an agent starts **thrashing** (repeated failed fixes), treat it as the signal to *stop fixing
  and return to understanding* — not to try yet another fix.
- **A fix you can't explain isn't a fix.** Require the diagnosis before the change.

**Reinforces:** [Principle 4 — Orchestrate Workflows, Not Prompts](03-principles.md) and
[Principle 6 — Validate Outcomes, Not Outputs](03-principles.md). Diagnosis-first is a workflow;
fix-first is a prompt.

---

## Closing

These lessons share one root: **AI multiplies whatever direction it is given.** Focused intent and a
disciplined, understand-first workflow multiply into strong outcomes; scattered attention and
fix-first guessing multiply into noise.

The framework's job is to keep the direction good.
