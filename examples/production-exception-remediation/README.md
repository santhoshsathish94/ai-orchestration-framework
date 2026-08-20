# Example: Production Exception Remediation

A runnable, end-to-end walkthrough that applies the AI Orchestration lifecycle to a common, concrete
problem: **a recurring `500` on `POST /api/checkout`.**

This example fills in the [Orchestration Brief](../../templates/orchestration-brief.md) stage by
stage. It's written so you can **swap in your own exception** and follow the exact same steps with
your AI assistant. Nothing here is tool-specific — the prompts work with any capable coding assistant.

> **Lifecycle:** Opportunity → Understand → Plan → Execute → Proof → Grow ↺

| Field | Value |
|---|---|
| **Task / outcome** | Stop the recurring `500` on `POST /api/checkout` |
| **Owner (human)** | On-call engineer |
| **AI capability** | Coding assistant with read access to the repo, logs, and CI |
| **Date** | 2026-08-21 |

---

## 1. Opportunity

- **Problem / trigger:** Alerting shows `POST /api/checkout` returning `500` roughly 40×/hour since the last deploy.
- **Desired outcome:** Checkout succeeds at its normal rate; the error class disappears.
- **Success signal:** The `5xx` rate on `/api/checkout` returns to its pre-deploy baseline (< 0.1%) and holds for 24 hours.

> **Prompt used:** "Here is a problem: `POST /api/checkout` is returning 500s (~40/hour) since our
> last deploy. Restate the outcome we actually want in one sentence, and propose one measurable
> signal that would prove it's fixed."

**Ownership:** Human framed the alert; AI sharpened the outcome and signal.

---

## 2. Understand

- **Known context:** Started after deploy `v128`. Only the checkout path is affected.
- **Unknowns:** Which change in `v128`? Is it every request or a subset?
- **Sources retrieved:** exception logs, the `v128` diff, `CheckoutController` and its dependencies.

> **Prompt used:** "Before proposing any fix, read the last 50 checkout exceptions, the `v128` diff,
> and `CheckoutController`. Summarize what you now know, what's still unknown, and what you'd need to
> be confident about the cause."

**What the AI found:** Every stack trace is a `NullReferenceException` in `TaxCalculator.Apply()` when
`order.Coupon` is null. `v128` added coupon support but assumed a coupon is always present.

**Ownership:** Human pointed to trusted sources; AI retrieved, correlated, and surfaced the gap.

---

## 3. Plan

- **Approach:** Guard the null coupon in `TaxCalculator.Apply()`; treat "no coupon" as zero discount.
- **Out of scope:** Redesigning the coupon model or changing the tax rules.
- **Steps:**
  1. *(AI)* Reproduce with a failing unit test — checkout with no coupon.
  2. *(AI)* Add the null guard.
  3. *(Human)* Review the change and the test.
- **Risks:** A guard that silently hides a genuinely missing coupon. Mitigated by the explicit test.

> **Prompt used:** "Propose the smallest focused plan to fix this. For each step, say who should own
> it (human or AI) and why. Call out risks and what's out of scope."

**Ownership:** Human approved the plan and boundaries; AI drafted the steps.

---

## 4. Execute

- **Changes made:**
  - Added `CheckoutTests.Checkout_WithNoCoupon_DoesNotThrow` (failed before the fix).
  - Guarded `order.Coupon` in `TaxCalculator.Apply()` — a null coupon now means a 0 discount.
- **Human decisions:** Confirmed that "no coupon = no discount" is the correct business behavior.

> **Prompts used:**
> - "Implement step 1 only: write a failing unit test for checkout with no coupon. Then stop."
> - "Now implement the null guard. Keep the change focused; explain what changed and why."

**Ownership:** AI implemented within scope; human owned the business decision.

---

## 5. Proof

- **Evidence:**
  - The new test fails on `main` and passes with the fix (CI link).
  - The full suite is green.
  - Staging: 200 checkouts with and without coupons — zero `500`s.
- **Success signal holds?** After deploy, the `/api/checkout` `5xx` rate returned to baseline and held for 24 hours.
- **Human verification:** On-call confirmed the dashboard and closed the alert.

> **Prompt used:** "Show concrete evidence that the outcome from the Opportunity was achieved. Map
> each piece of evidence back to the success signal. Note anything still unproven."

**Ownership:** AI assembled the evidence; human verified production and accepted the proof.

---

## 6. Grow

- **What worked:** Reproducing with a test *before* fixing made the proof trivial.
- **New context saved:**
  - A regression test now guards the no-coupon path.
  - A checklist note: "new optional fields must be null-safe on every consumer."
- **Next opportunity:** Audit other `v128` additions for the same missing-null assumption.

> **Prompt used:** "Summarize what we learned, what context is worth saving for next time, and any
> new opportunity this surfaced."

**Ownership:** Human decided what becomes durable knowledge; AI drafted the summary.

---

## Try it yourself

1. Copy [`templates/orchestration-brief.md`](../../templates/orchestration-brief.md) and rename it for your exception.
2. Replace the checkout scenario above with your own alert.
3. Walk the six stages with your assistant, using the prompts as starting points.
4. Keep the filled-in brief with the fix — it *is* the proof and the learning.

> The point isn't the fix alone — it's moving from **"the fix was deployed"** to **"the original
> problem was proven resolved,"** with context and learning captured for next time.
