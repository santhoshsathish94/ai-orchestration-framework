# How AI Fails — and Which Stage Catches It

Most of this framework is good engineering discipline. This page is the part that is specifically
about **AI**.

AI does not fail the way a person or a script fails. A script fails loudly. A person usually knows
when they are unsure. AI often fails **fluently** — producing a confident, well-structured, entirely
plausible answer that happens to be wrong. That is the whole problem, and it is why the lifecycle has
an Understand stage before Plan and a Proof stage after Execute.

Each failure below has a stage that is designed to catch it.

---

## 1. Confident fabrication

**What it looks like:** A file path, function name, API, configuration key, or citation that does not
exist — described in the same tone as everything that does.

**Why it happens:** Generating a plausible token sequence and retrieving a true fact are not the same
operation, and nothing in the output distinguishes them.

**Caught by:** **Understand.** Verify claims against the actual source before planning on them. If a
reference is cited, open it. Treat anything unverified as a hypothesis, not a finding.

> A useful check: search for the exact string that was cited. If it appears nowhere, it was invented.

---

## 2. A plausible root cause that is not the root cause

**What it looks like:** A confident, internally consistent explanation that fits the symptom — and is
wrong. The fix that follows is well-built and does nothing.

**Why it happens:** AI is very good at constructing a coherent narrative from partial evidence, which
is precisely what a wrong diagnosis is.

**Caught by:** **Understand** and **Proof.** Require the diagnosis to predict something you can check
before you accept it. A fix you cannot explain is not a fix.

---

## 3. Silent context loss

**What it looks like:** Constraints you supplied earlier stop being honored. A rule stated at the
start of a long session quietly disappears from the work.

**Why it happens:** Context windows are finite. When earlier material falls out, nothing announces
it — the work simply continues without it.

**Caught by:** **Plan.** Put durable constraints in a durable place — the brief, the repo, the ticket —
not only in conversation. Re-state the boundaries at each stage rather than assuming they persisted.

---

## 4. Reported success that was never verified

**What it looks like:** "Fixed and verified." Nothing was run, or something adjacent was run and the
result was assumed.

**Why it happens:** Describing a completed task and completing it are, to a language model, similar
acts.

**Caught by:** **Proof.** Require the artifact, not the claim: the failing-then-passing test, the
command output, the measurement. Evidence beats assertion, always.

---

## 5. Agreement instead of judgment

**What it looks like:** You propose a theory; AI elaborates on it convincingly. You propose the
opposite theory; AI elaborates on that just as convincingly.

**Why it happens:** Models are trained to be helpful and agreeable, and a stated human hypothesis is
strong context.

**Caught by:** **Understand.** Ask for the evidence against your theory, not just support for it.
Where a decision matters, ask for the alternatives and why they were rejected.

---

## 6. Thrashing

**What it looks like:** Repeated attempted fixes, each one confident, none of them working. Activity
rises; progress does not.

**Why it happens:** Without sufficient understanding, each attempt is a guess — and a fast tool can
generate guesses indefinitely.

**Caught by:** **Understand.** Treat the second failed fix as a signal to *stop fixing and return to
understanding*. See [Lesson 2 — Understand before fixing](field-practices.md).

---

## 7. Motion mistaken for progress

**What it looks like:** Many tasks running in parallel, a great deal of output, and few proven
outcomes.

**Why it happens:** AI removes the effort cost of starting work but not the attention cost of
directing it. Human attention stays the scarce resource.

**Caught by:** **Plan** and **Proof.** Plan the smallest coherent path; measure outcomes rather than
activity. See [Lesson 1 — Focus beats parallelism](field-practices.md).

---

## 8. Learning from unvalidated output

**What it looks like:** A wrong conclusion is written into documentation, memory, or a knowledge base,
and every later cycle starts from it. The error compounds instead of being corrected.

**Why it happens:** Systems that accumulate context do not automatically distinguish what was proven
from what was merely produced.

**Caught by:** **Grow.** Only validated experience should become durable expertise. One execution is
an anecdote, not a pattern.

---

## The summary

| Failure | Caught by |
|---|---|
| Confident fabrication | Understand |
| Plausible-but-wrong root cause | Understand, Proof |
| Silent context loss | Plan |
| Unverified reported success | Proof |
| Agreement instead of judgment | Understand |
| Thrashing | Understand |
| Motion mistaken for progress | Plan, Proof |
| Learning from unvalidated output | Grow |

Every one of these is caught by evidence rather than by better prompting. That is the argument for
orchestration: **the discipline around the model matters more than the model.**
