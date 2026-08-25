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

**Reinforces:** [Principle 3 — Plan for Focus and Ownership](03-principles.md#3-plan-for-focus-and-ownership) and the belief that outcome quality follows the quality of shared understanding and context.

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

**Reinforces:** [Principle 2 — Understand Before Acting](03-principles.md#2-understand-before-acting) and [Principle 5 — Prove Outcomes, Not Activity](03-principles.md#5-prove-outcomes-not-activity).

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

**Reinforces:** [Principle 5 — Prove Outcomes, Not Activity](03-principles.md#5-prove-outcomes-not-activity) and [Principle 6 — Grow Into Collective Capability](03-principles.md#6-grow-into-collective-capability) — turning individual engineering incidents into reusable knowledge.

> **A workaround resolves an incident. Understanding the root cause can resolve a class of problems.**

---

## Lesson 4 — You do not have to hold the context to be accountable for it

> **The knowledge is usually already in the system. Being out of date is an access problem, not a competence problem.**

### From the field

A defect arrived in a flow that the person responsible for it had never worked on. They had been leading a team rather than writing code for some time, and features and flows had shipped in the interim that they had simply never seen. On the old terms, the only options were to go and learn the area first, or hand it to whoever last touched it.

Instead the orchestration layer was pointed at it. It read across the repositories involved, navigated the running application to reproduce the reported behavior, and showed exactly where it occurred. The fix followed, went through normal review, and was verified against the running system.

What is worth noticing is where the knowledge came from. The AI did not know the domain. **The domain was in the repository and in the running application the whole time** — encoded in the code, the configuration, and the behavior of the system itself. What changed was that it became reachable without first being memorized by a person.

### The practice

- Treat "I am not current on this area" as **a question about access, not a reason to hand the work away**.
- Include the **running application** in what the orchestration layer can reach. A great deal of what a system does is only observable by using it, and reproducing a report is often faster than reasoning about it.
- Ask for **the location and the evidence before the fix** — where the behavior occurs and how that was established. A patch offered without that is a guess with good formatting.
- Do not mistake this for the AI understanding the domain. It read the domain from the system. That distinction matters when the system is the thing that is wrong.
- Keep review proportionate. Being out of context is a reason to look harder at the evidence, not to approve faster because the explanation sounded confident.

**Reinforces:** [Principle 2 — Understand Before Acting](03-principles.md#2-understand-before-acting) and [Principle 6 — Grow Into Collective Capability](03-principles.md#6-grow-into-collective-capability) — knowledge held by a system beats knowledge held by whoever happened to be present.

> **Most organizational knowledge is not missing. It is unreachable.**

---

## Lesson 5 — Write the understanding down, or pay for it again

> **A session's memory dies with the session. A file in the repository does not.**

### From the field

Two efforts ran in the same period, and the difference between them was not difficulty.

In the first, a memory-exhaustion investigation, findings were written into markdown files committed
alongside the code and updated as the work went: what was being pursued, what had been established,
what was still open, what had turned out to be wrong. Each pass began from the accumulated picture.
The investigation was long, but it converged.

In the second, work on a fix in an open-source library, that discipline was not applied. Nothing
persisted between passes. Without the accumulated context, the full flow was never understood, and
the work degenerated into repeated attempts at a fix — the exact thrashing described in
[Lesson 2](#lesson-2--understand-before-fixing). It only recovered when the loop was applied
deliberately: understand, plan, execute, validate, capture what was learned, then repeat.

The same person, the same tools, the same period. The variable was whether understanding was being
written down.

### The practice

- Keep a **working context file next to the code**, and update it as you go rather than at the end. A
  write-up produced afterwards is a report; a file maintained during the work is memory.
- Record **what was ruled out and why**, not only what was found. Dead ends are the most expensive
  thing to rediscover.
- State **the goal, what is settled, what remains**. Anyone resuming should be able to act without
  reconstructing the reasoning first.
- Treat **repeated failed attempts as a symptom of lost context**, not just impatience. An agent that
  cannot see what has already been tried will try it again, confidently.
- Finish the cycle in **Grow** — the learning becomes the starting context for the next one, which is
  the only thing that makes the next one cheaper.

**Reinforces:** [Principle 6 — Grow Into Collective Capability](03-principles.md#6-grow-into-collective-capability) and [Context Engineering](05-context-engineering.md#where-context-lives).

> **Context that is not written down is not context. It is something one session happened to know.**

---

## Closing

These lessons share one root: **AI multiplies whatever direction it is given.** Focused intent and an understand-first workflow can multiply into strong outcomes; scattered attention and fix-first guessing can multiply into noise.

The framework's job is to keep the direction good.
