# Governance

AI Orchestration Model

Opportunity → Understand → Plan → Execute → Proof → Grow ↺

Governance keeps the lifecycle safe as it scales. It is not paperwork; it is making sure ownership,
risk, and approval are explicit — especially where AI acts.

## Keep humans responsible

AI can do the work; people stay accountable for risk, governance, and decisions that need human
judgment. Automation should make responsibility clearer, not fuzzier.

## In practice

- Make ownership explicit for each flow, change, and decision.
- Require human approval where the blast radius is real — for example, production changes.
- Keep work auditable and attributable: who or what did it, and on what evidence.
- Review changes to context, workflows, and rules the same way you review code.

## Attribute every action to a person

Work performed by AI should run under the credentials of the human accountable for it, not under a
shared or anonymous identity. Two reasons:

- **Traceability.** Anything unexpected leads back to someone who can explain it, correct it, and
  learn from it. "The AI did it" closes no loop.
- **Restraint.** Someone whose own name is attached to every action grants access more carefully than
  someone delegating to a faceless service account.

Access itself should be **read-only by default**, using the kind of restricted accounts most
organizations already issue. Reading cannot corrupt data or release a change, which is why it is the
right starting point and usually where most of the value is. See
[the orchestration environment](orchestration-environment.md).

## The gap: detecting unintended behavior

Approval gates stop the largest mistakes at the boundary. Attribution explains them afterwards.
Neither answers the question in between: **how would you know if an agent did something you did not
intend, inside the access it was legitimately given?**

There is no good answer yet. What is missing is monitoring that observes what agents actually did,
compares it with what was asked, and surfaces the difference — the equivalent of observability, for
agent behavior rather than system behavior.

Until that exists, this approach depends on a human paying attention, and attention scales far worse
than access does. Anyone adopting it inherits that limitation and should decide deliberately whether
it is acceptable at their blast radius.

## How much autonomy to grant

Governance is where the [autonomy ladder](04-framework.md#the-autonomy-ladder) is actually applied.
It turns "increase autonomy as trust matures" into something you can decide and defend: five levels,
each earned only when Proof at the current level has been consistently achieved.

Three rules keep it honest:

- **Autonomy is granted per context, not globally.** A team may sit at L3 for a well-understood
  remediation flow and L1 for anything touching customer data.
- **Blast radius caps the level.** Where a mistake is expensive or irreversible, human approval stays
  regardless of track record.
- **Levels are revocable.** A ladder that only goes up is not a trust mechanism.
