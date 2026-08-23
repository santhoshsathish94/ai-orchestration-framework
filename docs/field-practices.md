# Practices & Field Lessons

> **Practices distilled from real orchestration work.**

The [Philosophy](02-philosophy.md) explains *what we believe*. The [Principles](03-principles.md) define *how we apply* those beliefs. This page captures **field lessons** — practices learned by running the model on real, high-stakes work.

Each lesson records the situation, the realization, and the practice it produced.

---

## Lesson 1 — Focus beats parallelism

> **AI can run many tasks at once. Human attention still cannot. Concentrate it.**

### From the field

AI agents and parallel sessions made it easy to run three initiatives at the same time — two release-blocking production issues and a new feature for an upcoming launch. It *felt* highly productive: many things moving at once, visible activity everywhere.

The outcomes told a different story. One blocker was ultimately resolved better by someone else. The other accumulated band-aid fixes instead of a real resolution. The new feature came out weak.

The realization was that the problem was not AI capacity. **Human direction and context were spread too thin.** With attention divided three ways, the direction and context given to each task became shallow, so the outputs became shallow too.

Dropping the parallelism and focusing on one workstream at a time finally resolved the hardest issue at its root (see [Case Study 02](../case-studies/02-react-rsc-memory-leak.md)).

### The practice

- Treat **human attention — not AI throughput — as the scarce resource.** AI's ability to run many things in parallel is a temptation, not a mandate.
- Prefer **depth over breadth**: give one workstream focused, high-quality direction and context before starting the next.
- Watch for the **illusion of progress** — motion across many tasks is not the same as outcomes. Measure outcomes, not activity.
- Beware **false economy**: under-resourcing a task while also spreading attention thin can cost more than it saves. Put the right resources on the task that matters most.

**Reinforces:** [Principle 4 — Plan for Focus and Ownership](03-principles.md) and the belief that outcome quality follows the quality of shared understanding and context.

*Noise does not improve outcomes; focus does.*

---

## Lesson 2 — Understand before fixing

> **Don't rush to a fix. Understand → instrument → plan → fix → validate.**

### From the field

On a hard bug, AI repeatedly jumped straight to attempted fixes — and repeatedly failed. Each attempt was a guess at a solution before the problem was actually understood.

Changing the direction changed everything: **step back, understand the problem end to end, add logging where understanding is incomplete, plan the change, implement it, and validate the outcome.** With that sequence, the root cause was found and fixed quickly — far faster than the fix-first thrashing that preceded it.

### The practice

- Enforce an **understand-first loop**, for AI and humans alike:
  1. **Understand** the problem end to end.
  2. **Instrument** where understanding is incomplete.
  3. **Plan** the change based on that understanding.
  4. **Fix.**
  5. **Validate** that the intended outcome is actually achieved.
- When an agent starts **thrashing** with repeated failed fixes, treat it as the signal to stop fixing and return to understanding.
- **A fix you can't explain isn't a fix.** Require the diagnosis before the change.

**Reinforces:** [Principle 2 — Understand Before Acting](03-principles.md) and [Principle 7 — Prove Outcomes, Not Activity](03-principles.md).

---

## Lesson 3 — A workaround is not the destination

> **Stabilize the incident first. Then keep going until the underlying problem is understood.**

### From the field

In the React / Next.js memory-leak investigation, disabling stack-trace capture with `--stack-trace-limit=0` stopped the production memory growth and stabilized the application. That was the right immediate mitigation — but it was not the end of the investigation.

The workaround removed the symptom while also reducing useful error-stack observability. Continuing the investigation revealed the deeper retention mechanism in React Server Components. That made it possible to pursue an upstream fix rather than permanently carrying a local workaround.

The resulting contribution was submitted to React so the solution could potentially help other applications facing the same class of problem.

### The practice

- **Mitigate first when production is at risk**, but explicitly label the mitigation as temporary.
- Ask what the workaround is **hiding or disabling**, not only whether it makes the incident stop.
- Once the system is stable, return to the root-cause investigation with measured evidence.
- Prefer a **generalized fix** when the underlying defect belongs to a shared framework or dependency.
- When appropriate, contribute the fix upstream so the learning and solution can benefit the wider ecosystem.

**Reinforces:** [Principle 7 — Prove Outcomes, Not Activity](03-principles.md) and [Principle 8 — Grow Through Feedback](03-principles.md) — turning individual engineering incidents into reusable knowledge.

> **A workaround resolves an incident. Understanding the root cause can resolve a class of problems.**

---

## Closing

These lessons share one root: **AI multiplies whatever direction it is given.** Focused intent and an understand-first workflow can multiply into strong outcomes; scattered attention and fix-first guessing can multiply into noise.

The framework's job is to keep the direction good.
