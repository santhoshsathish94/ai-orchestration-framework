# Reference Implementations

Three patterns teams can adopt and adapt. They are not separate frameworks. Each one shows how [the
Clover framework](04-framework.md) applies to a recurring organizational problem.

> **Status — what these actually are.** All three have been **built and used against real
> organizational data** — repositories, logs, telemetry and job definitions.
>
> None of them is always-on, and none is adopted organization-wide. The knowledge capability is
> assembled per question rather than running as a product. Each pattern depends on a person providing
> the map, reviewing the output, and holding the approvals.
>
> These patterns assume an [orchestration environment](orchestration-environment.md) is in place —
> read-only access across the systems the organization already runs.

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

A data team asks why a synchronization job did not run. AI reads the relevant repository and scheduled job definitions, reconstructs the flow, and explains the failure even when the team that originally owned the flow is no longer available.

**Out-of-Context Owner**

Someone accountable for an area they have not worked on — a lead who has been away from the code, a new joiner, anyone returning to a system that moved on without them — asks where a reported behavior originates. The capability reads across the repositories involved and reproduces the behavior in the running application, locating the cause without the person first having to learn the area.

The knowledge was never missing. It was in the code and in the running system, and simply had not been reachable without someone who already held it.

### Outcome

> Reduce unnecessary coordination by making existing organizational knowledge directly accessible.

The examples above were run against real systems, and in both the answer was reached by working
backwards from the reported symptom to the source rather than from a summary prepared in advance.
That is the part that matters. It is what makes the pattern hold when the question is one nobody
anticipated, and when the people who would have known are no longer there to ask.

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

The human remains responsible for production approval. The ticket is closed only when the original production signal is shown to be resolved.

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

> Move from a deployed change to a demonstrated outcome — the original production signal stops and
> stays stopped.

---

## 3. Multi-Repository Defect Remediation

**Type:** Reference Workflow

### Underlying problem

A batch of defects arrives as a single ticket. The work of triaging them is mostly navigation: which
of them are real, which system each one actually originates in, and which of them share a cause.

That navigation is slow because it crosses boundaries. A defect reported against a page may live in
a downstream service, a data mapping, or a configuration value, and the person triaging usually only
knows some of those systems well.

### Implementation

Give the orchestration layer the ticket reference and read access across the repositories involved,
then let it work the batch rather than one item at a time:

1. Read the ticket and separate it into individual defects.
2. For each, locate the responsible code — **following dependencies across repositories** rather than
   assuming the defect lives where it was reported.
3. Propose focused changes, each with the reasoning that led to it.
4. Open them for human review as normal pull requests.
5. On approval, trigger the existing pipeline and request the human approval the pipeline already
   requires before a test environment is updated.
6. Verify the fixes against the running test environment and report which defects are actually
   closed — and, for the rest, what was learned about why they are not.

### What the human contributes

The map. Which system is responsible for what, and which component talks to which. That context is
the difference between diagnosis and a confident guess, and it does not come from the code alone.

Review and approval also stay human. The volume of change this produces is exactly the situation in
which rubber-stamping becomes tempting.

### Outcome

> Turn a batch of defects from a queue of individual investigations into one orchestrated cycle,
> ending in evidence of which are genuinely closed.

A partial result is the normal result, and a useful one. Knowing that some defects remain, and why,
is what makes the next cycle better informed than the last.

The orchestration itself has been demonstrated end to end — investigation, root cause, focused change,
validation, and evidence assembled for a human approval decision. What has not been exercised is the
last mile: standing this up as the routine path for a team's production exceptions, with the approval
and deployment gates wired into their real tooling.

---

## Built on the five leaves

All three run the same cycle:

> **Direction → Context → Action → Success → Growth**

Cross-Team Knowledge Access spends most of its time in Context. Production Exception Remediation
carries a cycle all the way to Success in the real environment. Multi-Repository Defect Remediation
adds Growth across a batch, because what the unresolved defects showed becomes the Context the next
pass starts from.

The patterns add operational detail where a recurring problem needs it. None of them adds a leaf.
