# Reference Implementations

These are practical patterns teams can adopt and adapt. They are not separate frameworks; they demonstrate how the core lifecycle applies to recurring organizational problems.

## 1. Cross-Team Knowledge Access

**Type:** Reference Capability

### Underlying problem

Knowledge is distributed across repositories, tickets, telemetry, jobs, documentation, and teams. People often spend time finding **who knows the answer** instead of finding the answer itself.

This becomes especially costly when ownership changes, teams are reorganized, or historical knowledge is no longer held by a current team.

### Implementation

Give an AI knowledge capability read-only access to relevant organizational sources so people can ask questions such as **"What happened, and why?"**

```text
Question
   ↓
AI gathers available organizational context
   ↓
Understand and explain
   ↓
Human decides / acts
   ↓
Missing knowledge → capture it → improve future answers
```

### Direct examples

**Customer Support Request**

A support executive asks why a customer request failed. AI reads the relevant source, logs, and recent context and explains the failure without requiring the executive to contact multiple teams first.

**Data Team Knowledge Gap**

A data team asks why a synchronization job did not run. AI reads the relevant repository and SQL job definitions, reconstructs the flow, and explains the failure even when the team that originally owned the flow is no longer available.

### Outcome

> Reduce unnecessary coordination by making existing organizational knowledge directly accessible.

![Cross-Team Knowledge Access](../assets/reference-cross-team-knowledge-access.svg)

---

## 2. Production Exception Remediation

**Type:** Reference Workflow

### Underlying problem

Production exception handling is often fragmented across ticket investigation, code changes, reviews, deployments, and manual verification. The change may be completed without proving that the original production problem was actually resolved.

### Implementation

```text
Production Exception
        ↓
Understand
        ↓
Plan
        ↓
Execute Fix
        ↓
Proof in Non-Prod
        ↓
Human Approval
        ↓
Production
        ↓
Proof in Production
        ↓
Resolved → Close + Grow
        │
        └── Not resolved → Understand again
```

AI should provide concrete evidence before production approval:

- root cause and supporting evidence
- why the proposed change addresses it
- exact scope of the change
- tests and non-production validation
- risk and expected production signal

The human remains responsible for production approval. The ticket is closed only when the original production signal is proven resolved.

### Direct examples

**Customer Support Exception**

A recurring customer-facing exception becomes an ADO ticket. AI investigates the exception, identifies the cause, implements a focused fix, validates it in non-production, presents evidence for approval, and verifies the customer-facing signal after production deployment.

**Performance Spike**

A sudden API latency increase is investigated from telemetry and recent changes. AI identifies the likely bottleneck, implements the focused change, benchmarks it in non-production, and verifies that production latency returns to the expected range before closing the ticket.

**Error Rate Increase**

A 5xx increase triggers investigation. AI identifies the failing path, adds the appropriate fix and regression coverage, validates the behavior, and confirms that the production error rate returns toward baseline.

**Data Quality Issue**

Incorrect report values trigger remediation. AI traces the transformation, fixes the responsible rule, validates the output, and closes the ticket only after production data is correct.

### Outcome

> Move from **"the fix was deployed"** to **"the original problem was proven resolved."**

![Production Exception Remediation](../assets/reference-production-exception-remediation.svg)

---

## Built on the Core Lifecycle

Both implementations use the same universal model:

> **Opportunity → Understand → Plan → Execute → Proof → Grow**

The implementation adds operational detail where needed, but does not create a new lifecycle.
