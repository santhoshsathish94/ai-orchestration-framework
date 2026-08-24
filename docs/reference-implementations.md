# Reference Implementations

These are practical patterns teams can adopt and adapt. They are not separate frameworks; they demonstrate how the core lifecycle applies to recurring organizational problems.

> **Status — what these actually are.** Both have been **built and demonstrated against real
> organizational data** — repositories, logs, telemetry and job definitions — on a small number of
> real cases. Neither has been put in front of end users or adopted organization-wide.
>
> On the [evidence ladder](07-proof.md#how-strong-is-your-evidence) that is **rung 2 — demonstrated**.
> They are working patterns, not proven production deployments, and this page says so rather than
> letting the reader assume either more or less.

## 1. Cross-Team Knowledge Access

**Type:** Reference Capability

### Underlying problem

Knowledge is distributed across repositories, tickets, telemetry, jobs, documentation, and teams. People often spend time finding **who knows the answer** instead of finding the answer itself.

This becomes especially costly when ownership changes, teams are reorganized, or historical knowledge is no longer held by a current team.

### Implementation

Give an AI knowledge capability read-only access to relevant organizational sources so people can ask questions such as **"What happened, and why?"**

![Cross-Team Knowledge Access](../assets/reference-cross-team-knowledge-access.png)

### Direct examples

**Customer Support Request**

A support executive asks why a customer request failed. AI reads the relevant source, logs, and recent context and explains the failure without requiring the executive to contact multiple teams first.

**Data Team Knowledge Gap**

A data team asks why a synchronization job did not run. AI reads the relevant repository and SQL job definitions, reconstructs the flow, and explains the failure even when the team that originally owned the flow is no longer available.

### Outcome

> Reduce unnecessary coordination by making existing organizational knowledge directly accessible.

Both examples above were run against real systems. The capability answered them from the actual
sources rather than from a summary prepared in advance — which is the part that matters, because it
is what makes the pattern hold when the question is one nobody anticipated.

---

## 2. Production Exception Remediation

**Type:** Reference Workflow

### Underlying problem

Production exception handling is often fragmented across ticket investigation, code changes, reviews, deployments, and manual verification. The change may be completed without proving that the original production problem was actually resolved.

### Implementation

![Production Exception Remediation](../assets/reference-production-exception-remediation.png)

AI should provide concrete evidence before production approval:

- root cause and supporting evidence
- why the proposed change addresses it
- exact scope of the change
- tests and non-production validation
- risk and expected production signal

The human remains responsible for production approval. The ticket is closed only when the original production signal is proven resolved.

### Direct examples

**Customer Support Exception**

A recurring customer-facing exception becomes a work-tracking ticket. AI investigates the exception, identifies the cause, implements a focused fix, validates it in non-production, presents evidence for approval, and verifies the customer-facing signal after production deployment.

**Performance Spike**

A sudden API latency increase is investigated from telemetry and recent changes. AI identifies the likely bottleneck, implements the focused change, benchmarks it in non-production, and verifies that production latency returns to the expected range before closing the ticket.

**Error Rate Increase**

A 5xx increase triggers investigation. AI identifies the failing path, adds the appropriate fix and regression coverage, validates the behavior, and confirms that the production error rate returns toward baseline.

**Data Quality Issue**

Incorrect report values trigger remediation. AI traces the transformation, fixes the responsible rule, validates the output, and closes the ticket only after production data is correct.

### Outcome

> Move from **"the fix was deployed"** to **"the original problem was proven resolved."**

The orchestration itself has been demonstrated end to end — investigation, root cause, focused change,
validation, and evidence assembled for a human approval decision. What has not been exercised is the
last mile: standing this up as the routine path for a team's production exceptions, with the approval
and deployment gates wired into their real tooling.

---

## Built on the Core Lifecycle

Both implementations use the same universal model:

> **Opportunity → Understand → Plan → Execute → Proof → Grow**

The implementation adds operational detail where needed, but does not create a new lifecycle.
