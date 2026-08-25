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

## Access mirrors the person, not the AI

**This framework proposes no new access model.** AI works within the access the accountable person
already holds. That single rule removes most of the question.

- **Inherit, do not expand.** If a person cannot see a system, neither can AI acting on their behalf.
  Adopting orchestration is not an occasion to grant anyone — human or otherwise — more than they had.
- **Read-only unless writing is the point.** Most of the value is in reading. Write access is a
  separate decision, made narrowly, for a named purpose.
- **Existing controls still apply, unchanged.** Data classification, credential policy, retention,
  third-party processing rules, regulatory constraints. None of this is superseded by the fact that
  the consumer is now AI.
- **Your own experts decide.** Every organization already has people whose job is exactly this
  judgment. Give them the actual picture — what would be reachable, by whom, under whose credentials,
  and for what — and let them rule on it. If the answer is no, the answer is no.

The question worth asking is not "is it safe to give AI access?" It is **"is this person's existing
access appropriate, and am I comfortable with work being done through it?"** That is a question the
organization already knows how to answer.

## AI governance monitoring is required

Approval gates stop the largest mistakes at the boundary. Attribution explains them afterwards.
Neither answers the question in between: **how would you know if an agent did something you did not
intend, inside access it was legitimately given?**

This is the part that genuinely is new, and it is **not optional at any meaningful scale**. What is
needed is monitoring built for agent behavior rather than system behavior — something that:

- observes what agents actually did, not only what they were asked to do;
- compares activity against intent and expected scope;
- flags access being used in ways that do not match the stated purpose;
- raises an alert on anomalous or out-of-scope action while it is happening, not at audit time.

No mature answer to this exists yet, including here. Until one does, this approach depends on a human
paying attention — and attention scales far worse than access does. Anyone adopting it inherits that
limitation and should decide deliberately whether it is acceptable at their blast radius.

Building this monitoring layer is the most valuable unsolved problem in the space.

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

## Controls are not the hard part

Governance is necessary and it is not sufficient. An organization can get every control right and
change nothing, because the constraint was never permission — it was whether people actually work
this way.

[Adoption](09-adoption.md) carries more weight than anything on this page. Keep execution observable,
attributable, and reversible where practical — then spend the remaining effort on the people who have
to use it.
