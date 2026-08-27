# Example: Production Exception Remediation

An end-to-end walkthrough of one common problem run through Clover: **a recurring `500` on
`POST /api/checkout`.**

The example fills in the [Orchestration Brief](../../templates/orchestration-brief.md) stage by
stage, so another exception can be swapped in and follow the same path. Nothing here is
tool-specific, and the prompts work with any capable coding assistant.

> **This is an illustrative scenario, not a reported incident.** The checkout bug, the numbers, and
> the results are invented to show the shape of a full cycle. For real, evidence-backed work see
> the [case studies](../../case-studies/).

> **Direction → Context → Action → Success**

| Field | Value |
|---|---|
| **Task / outcome** | Stop the recurring `500` on `POST /api/checkout` |
| **Owner (human)** | On-call engineer |
| **AI capability** | Coding assistant with read access to the repository, logs, and CI |
| **Scenario** | Illustrative |

---

## 1. Direction

- **Problem / trigger:** Alerting shows `POST /api/checkout` returning `500` roughly 40 times an hour since the last deploy.
- **Desired outcome:** Checkout succeeds at its normal rate, and this error class stops appearing.
- **What would demonstrate it:** The `5xx` rate on `/api/checkout` back at its pre-deploy baseline (under 0.1%) and holding for 24 hours.
- **Out of scope:** Changing how tax or discounts are calculated for orders that already work. The fix covers the failing path only.
- **Needs human approval:** The deploy.

> **Prompt used:** "Here is a problem: `POST /api/checkout` is returning 500s, about 40 an hour,
> since our last deploy. Before you read anything or propose anything, restate the outcome we
> actually want in one sentence, propose what would demonstrate that outcome in production, and ask
> me about anything I have left out."

**What the AI asked first:** What counts as done, what the fix must not touch, and whether it could
read the exception logs, the deploy diff and the checkout code. The engineer granted read access to
all three.

**Ownership:** The engineer set the outcome and the boundaries. AI sharpened the wording and asked
what the fix must not touch.

---

## 2. Context

- **Known context:** The errors started after deploy `v128`. Only the checkout path is affected.
- **Sources read:** the exception logs, the `v128` diff, `CheckoutController` and its dependencies.
- **Open questions:** Which change in `v128`? Every request, or a subset?
- **Could not reach:** Nothing relevant; the logs, the diff, and the code were all available.

> **Prompt used:** "Before proposing any fix, read the last 50 checkout exceptions, the `v128` diff,
> and `CheckoutController`. Summarize what you now know about how the system actually behaves, what
> is still unknown, what you could not reach, and what you would need to be confident about the
> cause."

**What the AI found:** Every stack trace is a null reference in `TaxCalculator.Apply()` where
`order.Coupon` is null. `v128` added coupon support and assumed a coupon is always present. That
matches the subset pattern — only orders placed without a coupon fail.

**Ownership:** The engineer pointed at the trusted sources. AI read them, correlated the traces, and
named the assumption that broke.

---

## 3. Action

- **Approach:** Guard the null coupon in `TaxCalculator.Apply()`, so no coupon means a zero discount.
- **Steps:**
  1. *(AI)* Reproduce with a failing unit test — a checkout with no coupon.
  2. *(AI)* Add the guard.
  3. *(Human)* Review the change and the test, and approve the deploy.
- **Risks:** A guard that quietly hides a coupon that should have been there. The explicit test keeps
  the intended behavior visible.
- **Changes made:**
  - Added `CheckoutTests.Checkout_WithNoCoupon_DoesNotThrow`, which fails without the change.
  - Guarded `order.Coupon` in `TaxCalculator.Apply()`.
- **Human decisions:** Confirmed that no coupon means no discount is the correct business behavior.

> **Prompts used:**
> - "Given that context, propose the smallest focused path to the outcome. For each step, say who
>   should own it and why, and call out the risks."
> - "Implement step 1 only: a failing unit test for a checkout with no coupon. Then stop."
> - "Now add the guard. Keep the change focused and explain what changed and why."

**Ownership:** AI worked out how to reach the outcome and did the work inside the agreed boundaries.
The engineer owned the business decision and the approval.

---

## 4. Success

- **Evidence:**
  - The new test fails on `main` and passes with the change.
  - The full suite is green.
  - Outside production: 200 checkouts with and without coupons, and no `500`s.
  - After the deploy, the `/api/checkout` `5xx` rate returned to baseline and held for 24 hours.
- **What was checked, and where this stopped:** The original signal is gone from production and
  stayed gone for a day. Most work stops earlier than this, and that is fine as long as it is said
  plainly.
- **Does the outcome from Direction now hold?** Yes.
- **Human verification:** On-call confirmed the dashboard and closed the alert.
- **Still unverified:** Whether other `v128` additions carry the same assumption.

> **Prompt used:** "Show concrete evidence that the outcome we stated in Direction was achieved. Map
> each piece of evidence back to it. Say what you checked, what you observed, and where you stopped.
> List anything you could not verify."

**Ownership:** AI assembled the evidence. The engineer set the standard for it, verified production,
and accepted it.

---

## After the pass — written back into Context

There is no fifth step. The cycle ends at Success, the brief gets updated, and the next attempt on
anything of this shape starts further along.

- **What this pass showed:** Reproducing with a test before changing anything made the evidence
  trivial to produce afterwards.
- **What it ruled out:** A cause affecting every checkout. The failures tracked orders placed
  without a coupon, which is what pointed at the null.
- **Worth keeping:**
  - The regression test now guards the no-coupon path.
  - A note where the team will read it: a new optional field has to be null-safe on every consumer.
- **Pattern or one-off?** The team has seen this shape before, on two earlier optional fields. It is
  worth treating as a pattern rather than as one result.
- **Next direction this revealed:** Audit the other `v128` additions for the same assumption.

> **Prompt used:** "Summarize what this attempt showed and what it ruled out. Write it back into the
> Context section of this brief, and say where else it should live so the next cycle reads it. Say
> whether this is a pattern that has held before or a single result."

**Ownership:** The engineer decided what becomes durable knowledge. AI wrote it while the details
were still accurate.

---

## Try it yourself

1. Copy [`templates/orchestration-brief.md`](../../templates/orchestration-brief.md) and rename it for the exception at hand.
2. Replace the checkout scenario above with the real alert.
3. Walk the four stages with an assistant, using the prompts as starting points.
4. Write the context back after each pass, whether it succeeded or failed.
5. Keep the filled-in brief with the change. It carries the evidence and what the cycle taught.

The gap this closes is between "the fix was deployed" and "the original signal is gone from
production and stayed gone" — with enough context left behind that the next incident of this shape is
understood faster.
