# Orchestration Brief — &lt;Task or Outcome&gt;

> A one-page brief for running a single task through Clover:
> **Direction → Context → Action → Success → Growth**
>
> Copy this file, rename it for the task, and fill each section as the work proceeds. The prompts are
> starting points for an AI assistant — adapt them to the tools at hand. Keep the brief short. The
> value is in clear direction, real context, and honest evidence, not in length.

| Field | Value |
|---|---|
| **Task / outcome** | &lt;what are we trying to achieve?&gt; |
| **Owner (human)** | &lt;who is accountable for the outcome?&gt; |
| **AI capability** | &lt;which assistant, agents, tools?&gt; |
| **Date** | &lt;yyyy-mm-dd&gt; |

---

## 1. Direction — *where we are going*

State the outcome worth reaching, the edges of the work, and what would show it happened.

- **Problem / trigger:** …
- **Desired outcome (one sentence):** …
- **What would demonstrate it:** …
- **Out of scope / must not change:** …
- **Needs human approval:** …

> **Prompt:** "Here is a problem: &lt;describe&gt;. Restate the outcome we actually want in one
> sentence. Propose what would demonstrate that outcome in the real environment, and ask me about
> anything I have left out — especially what this work must not touch."

**Ownership:** The human sets the direction, the boundaries, and the approvals. AI sharpens the
wording, names conflicts between stated goals, and asks about the parts nobody mentioned.

---

## 2. Context — *what we know about reality*

Gather what the problem actually turns on, from the environment rather than from assumption.

- **Known context:** …
- **Sources read (code, tickets, logs, telemetry, data, history):** …
- **Open questions and untested assumptions:** …
- **Could not reach:** …

> **Prompt:** "Before proposing anything, read &lt;sources&gt;. Summarize what you now know about how
> the system actually behaves, list what is still unknown, say what you could not reach, and tell me
> what you would need to be confident."

**Ownership:** The human decides which systems may be read, which sources can be trusted, and when
the context is good enough to act on. AI does most of the gathering and reports the gaps.

---

## 3. Action — *how the work happens, and doing it*

Take the smallest coherent path to the outcome, with an owner on every step.

- **Approach chosen:** …
- **Steps, with owner (human / AI) per step:** …
- **Risks and dependencies:** …
- **Changes made:** …
- **Human decisions and approvals:** …

> **Prompt:** "Given that context, propose the smallest focused path to the outcome. For each step,
> say who should own it and why. Call out the risks. Then implement step &lt;n&gt; only, and stop
> before anything outside the agreed scope."

**Ownership:** The human sets the boundaries and approves what needs approving. AI does the work
inside them, and comes back when the evidence contradicts the plan.

---

## 4. Success — *what the environment showed*

Show the intended outcome happening in the real environment.

- **Evidence (tests, before-and-after, telemetry, a run outside production, a user confirming):** …
- **What was checked, what was observed, and where this stopped:** … *(see [Success](../docs/07-success.md#how-strong-is-your-evidence))*
- **Does the outcome from Direction now hold?** …
- **Human verification:** …
- **Still unverified:** …

> **Prompt:** "Show concrete evidence that the outcome we stated in Direction was achieved. Map each
> piece of evidence back to it. Say what you checked, what you observed, and where you stopped. List
> anything you could not verify."

**Ownership:** The human sets the standard for sufficient evidence and accepts or rejects it. AI runs
the checks and reports them accurately, including what did not work.

*If the evidence does not hold, go back to **Context**, rather than to Action. A failed check usually
means something about reality was missing, and repeating the change only reaches the same place
faster.*

---

## 5. Growth — *what the system keeps*

Turn what this cycle produced into context the next one starts from.

- **What worked, and what did not:** …
- **Worth keeping (docs, prompts, tests, guardrails, memory files):** …
- **Pattern or one-off?** … *(a single good outcome is an anecdote; a pattern has held across several cycles)*
- **Next direction this revealed:** …

> **Prompt:** "Summarize what this cycle showed, what is worth keeping for next time, and where it
> should be written so the next cycle actually reads it. Say whether this is a pattern that has held
> before or a single result."

**Ownership:** The human decides what becomes durable knowledge and what has gone stale. AI captures
the experience while it is still accurate and applies it next time.

---

*Part of [Clover](../README.md). What Growth records becomes the Context the next cycle starts from,
and sometimes it changes the Direction itself.*
