# Orchestration Brief — &lt;Task or Outcome&gt;

> A one-page brief for running a single task through the AI Orchestration lifecycle:
> **Opportunity → Understand → Plan → Execute → Proof → Grow ↺**
>
> Copy this file, rename it for your task, and fill each section. The prompts are starting points for
> an AI assistant — adapt them to your tools and context. Keep the brief short; the value is in clear
> context, ownership, and evidence, not length.

| Field | Value |
|---|---|
| **Task / outcome** | &lt;what are we trying to achieve?&gt; |
| **Owner (human)** | &lt;who is accountable for the outcome?&gt; |
| **AI capability** | &lt;which assistant / agent / tools?&gt; |
| **Date** | &lt;yyyy-mm-dd&gt; |

---

## 1. Opportunity — *why this is worth doing*

State the problem or outcome worth pursuing, and how you'll know it mattered.

- **Problem / trigger:** …
- **Desired outcome:** …
- **Success signal (measurable):** …

> **Prompt:** "Here is a problem: &lt;describe&gt;. Restate the outcome we actually want in one
> sentence, and propose one measurable signal that would prove it was achieved."

**Ownership:** Human frames the opportunity; AI sharpens the wording and proposes signals.

---

## 2. Understand — *establish context before acting*

Gather enough context that the problem becomes obvious. Retrieve what's missing.

- **Known context:** …
- **Unknowns / open questions:** …
- **Sources to retrieve (code, tickets, logs, docs):** …

> **Prompt:** "Before proposing any solution, read &lt;sources&gt;. Summarize what you now know, list
> what's still unknown, and tell me what you'd need to be confident."

**Ownership:** Human points to trustworthy sources; AI retrieves, summarizes, and surfaces gaps.

---

## 3. Plan — *choose a focused path*

Pick one path with clear boundaries, dependencies, and ownership. Prefer focus over breadth.

- **Approach (chosen):** …
- **Out of scope:** …
- **Steps, with owner (human / AI) per step:** …
- **Risks / dependencies:** …

> **Prompt:** "Given that understanding, propose the smallest focused plan. For each step, say who
> should own it (human or AI) and why. Call out risks and anything out of scope."

**Ownership:** Human approves the plan and boundaries; AI drafts steps and flags risks.

---

## 4. Execute — *do the work with explicit ownership*

Perform the work. Keep changes focused and reviewable. AI proposes; humans own decisions.

- **Changes made:** …
- **Human decisions / approvals:** …

> **Prompt:** "Implement step &lt;n&gt; only. Keep the change focused and explain what you changed and
> why. Stop and ask before doing anything outside the agreed scope."

**Ownership:** AI executes within scope; human reviews and owns each decision.

---

## 5. Proof — *show the outcome actually happened*

Demonstrate the outcome with concrete evidence — a result, not activity.

- **Evidence (tests, before/after, metrics, logs):** …
- **What was checked, and where you stopped:** … *(an assertion / seen working once / a repeatable check / measured before and after / observed in the real environment — see [Proof](../docs/07-proof.md#how-strong-is-your-evidence))*
- **Does the success signal from step 1 now hold?** …
- **Human verification:** …
- **Still unproven:** …

> **Prompt:** "Show concrete evidence that the outcome from the Opportunity was achieved. Map each
> piece of evidence back to the success signal. Say what was checked, what was observed, and where
> and do not claim a higher one. Note anything still unproven."

**Ownership:** AI assembles evidence; human verifies and accepts (or rejects) the proof.

*If the proof does not hold, go back to **Understand** — not to Execute. A failed proof usually means
the understanding was incomplete.*

---

## 6. Grow — *capture learning for the next cycle*

Turn what you learned into reusable context so the next cycle starts stronger.

- **What worked / what didn't:** …
- **New context to save (docs, prompts, tests, guardrails):** …
- **Next opportunity this revealed:** …

> **Prompt:** "Summarize what we learned in this cycle, what context is worth saving for next time,
> and any new opportunity this surfaced."

**Ownership:** Human decides what becomes durable knowledge; AI drafts the summary and artifacts.

---

*Part of the [AI Orchestration Framework](../README.md). The lifecycle loops — each Grow feeds the
next Opportunity.*
