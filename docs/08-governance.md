# Governance

Governance is what keeps the cycle safe as it scales. It makes ownership, access, attribution, and
approval explicit, and it matters most where AI is the thing acting. It sits across [the Clover
framework](04-framework.md) rather than inside one stage: Context is grounded in the system,
Direction is owned by humans, Action is where delegated execution and approvals happen, and Success is
where somebody has to stand behind the evidence.

## System → Human → AI

Clover keeps three responsibilities distinct:

- **System is reality.** It may be an existing system or the system being built. Its data, behavior,
  state, history, constraints, and evidence ground the work in what is actually happening.
- **Human owns Direction.** Humans define purpose, intended outcomes, priorities, acceptable risk,
  constraints, boundaries, and accountability.
- **AI provides capability and execution.** AI can reason, plan, recommend, coordinate, implement,
  test, and adapt within the Direction humans set and the access they authorize.

This boundary does not depend on which model is being used or on today's model capability. AI can become
far more capable, but capability does not create authority over what should be pursued.

## Capability may scale. Human authority remains.

AI capability is not authority, and authority is not accountability. Clover deliberately does not make
the claim that AI is or is not capable enough today to reason about large directions. The boundary is
what should remain true even if that capability grows enormously.

> **AI can be capable enough to suggest directions. Humans should always have the authority to decide
> what to pursue.**

AI may identify opportunities, challenge assumptions, compare alternatives, recommend a new direction,
or surface consequences the human had not considered. None of that gives AI the authority to decide
which direction should actually be pursued.

This matters because the scale of AI-enabled action may grow far beyond an individual task. It can affect
teams, organizations, interconnected systems, and broader society. As the scale grows, the consequences
of a wrong Direction can grow with it. We cannot make the AI itself accountable for choosing that
Direction simply because it was capable enough to recommend it. **Humans must retain the authority to
decide what to pursue and remain accountable for that choice.**

The unknown matters here. We do not know the upper boundary of future AI capability. It may remain
limited, or it may become capable enough to suggest directions at scales we cannot meaningfully handle
today. Clover does not require predicting which future arrives before establishing the boundary.

A more capable AI can change the means available to reach an outcome. It does not change who decides
whether that outcome should be pursued.

Competitive pressure may encourage an organization to automate more execution inside Action. It does
not justify handing AI the authority to choose the destination.

> **Do not transfer Direction to AI merely because AI becomes capable enough to suggest or execute it.**

## The destination, the means, and the map

A useful Clover analogy is a journey:

- **Human Direction is the destination.** It states where we intend to go and what constraints must
  hold on the journey.
- **AI is a means of getting there.** Different models can be slower, faster, more capable, or more
  economical. They can change the speed and way we travel without changing the destination.
- **The system is the map and the terrain.** It tells us what exists, where the constraints are, what
  has already happened, and what evidence can show whether we are actually getting there.

Humans can walk, run, drive, or use other tools. The framework cares about whether the intended
outcome is reached, not about giving the means ownership of the destination.

The analogy is intentionally broader than any particular AI product or model generation. It applies
whether the organization uses an older model, a newer frontier model, several models, or no AI at all.
AI changes the means; it does not redefine the destination.

## Keep humans responsible

AI can do the work. People stay accountable for risk, governance, and the decisions that need human
judgment. Automation should leave responsibility clearer than it found it, and an arrangement where
nobody can say who owns an action has moved the wrong way.

## In practice

- Make ownership explicit for each flow, change, and decision.
- Require human approval where the blast radius is real — for example, production changes.
- Keep work auditable and attributable: who or what did it, and on what evidence.
- Review changes to context, workflows, and rules the same way code is reviewed.

## Attribute every action to a human

Every action taken through the layer must lead back to a named, accountable human. Never a shared or
anonymous identity. Two reasons:

- **Traceability.** Anything unexpected leads back to someone who can explain it, correct it, and
  learn from it. "The AI did it" closes no loop.
- **Restraint.** Someone whose own name is attached to every action grants access more carefully than
  someone delegating to a faceless service account.

**Attribution is the requirement, and the mechanism depends on local policy.** Running work under an
individual's own credentials is the simplest way to achieve it, and for a single practitioner it is
often enough. At any larger scale, most organizations will prefer a **dedicated identity, scoped to
the task and owned by a named human** — that keeps the accountability without carrying that human's
entire access footprint, and it can be rotated and revoked on its own. Either route works. A route
that leaves an action traceable to nobody does not.

Access itself should be **read-only by default**, using the kind of restricted accounts most
organizations already issue. Reading cannot corrupt data or release a change, which is why it is the
right starting point and usually where most of the value is. See
[the orchestration environment](orchestration-environment.md).

## Access mirrors the human, not the AI

**This framework proposes no new access model.** AI works within the access the accountable human
already holds. That single rule removes most of the question.

- **Inherit, do not expand.** If a human cannot see a system, neither can AI acting on their behalf.
  Adopting orchestration is not an occasion to grant anyone — human or otherwise — more than they had.
- **Read-only unless writing is the point.** Most of the value is in reading. Write access is a
  separate decision, made narrowly, for a named purpose.
- **Existing controls still apply, unchanged.** Data classification, credential policy, retention,
  third-party processing rules, regulatory constraints. None of this is superseded by the fact that
  the consumer is now AI.
- **The organization's own experts decide.** Every organization already has people whose job is
  exactly this judgment. Give them the actual picture — what would be reachable, by whom, under whose
  credentials, and for what — and let them rule on it. If the answer is no, the answer is no.

The question worth asking is whether this human's existing access is appropriate, and whether the
organization is comfortable with work being done through it. Both are questions it already knows how
to answer.

## Questions your security team will ask

Most of these have good answers. A couple have honest, partial ones, and saying so is more useful
than glossing over them.

**First, a point that reframes several of them.** Nearly everything below is already possible in most
organizations today, without this framework and without anyone's permission. AI works within a
human's existing access: someone who cannot reach a system cannot reach it through AI either, and
someone who *can* reach it can already point a tool at it. Ungoverned AI use with employee access is
the status quo almost everywhere.

So the choice is rarely "introduce this risk or not." It is **"leave it undescribed, or name it and
put rules around it."** This framework exists to do the second. What follows lists the things it
insists on dealing with, rather than dangers it introduces.

One genuine amplification is worth separating out, though: **aggregation**. See the first question.

**"What new access is this creating?"**
Per connection, none — the layer inherits access someone already has. But be honest about the
composite: it can read across code, tickets, logs, datasources and environments *at once*, which no
single person practically could. Each read was permitted; the aggregation is a new capability and a
new target. Treat the layer itself as a sensitive asset and scope it accordingly.

**"What leaves our environment, and who can see it?"**
Code, log extracts, ticket contents and query results go to whichever AI provider the organization
uses. Enterprise agreements commonly cover retention, training exclusion, residency and sub-processors,
and those terms are **worth verifying rather than assuming.** This is a procurement and legal
question, and it should be settled before access is granted rather than after.

**"What stops secrets and personal data ending up in the context?"**
By default, nothing. Repositories contain credentials more often than anyone admits, and logs
routinely contain personal data. Before granting access: scan for secrets and rotate whatever turns
up; prefer log sources that are already redacted; exclude datasources holding regulated data unless
there is a specific reason not to. Assume anything the layer *can* read has been read.

And when something turns up, **it gets fixed rather than noted.** A credential committed to a
repository is a defect whether or not AI ever reads it, and personal data in logs is a compliance
problem that exists independently of who is looking. Anyone with repository access could already have
found either. Findings of this kind are raised, tracked, and remediated — rotated, redacted, or
removed. Treating them as acceptable background noise is how they stay for years.

**"What if the content it reads is hostile?"**
This is the sharpest risk and it deserves a straight answer. A framework that encourages reading
tickets, comments, logs and pages is encouraging an agent to consume text that people outside the
organization can influence. Instructions hidden in that content can be followed — prompt injection.
What helps: keep write access minimal so a hijacked agent has little it can do; require human
approval for every state-changing action; treat everything read as data rather than instruction; and
be suspicious whenever an agent proposes something unrelated to the task it was given. None of these
is a complete defense. Assume it is possible and size the blast radius on that basis.

**"Is non-production actually safe?"**
Often it holds a copy of production data. "Safe to break" is not "safe to expose." Check before
treating it as low risk.

**"What happens when the owner leaves?"**
The layer's access is revoked with them, like any other access they held. If it outlives their
offboarding, attribution has already failed.

**"How do we know it is behaving?"**
By watching what the agents actually do and comparing it against what they were asked to do. The next
section covers what that takes. It is also why early access stays read-only while the monitoring is
still young.

## Monitor what agents actually do

Approval gates stop the largest mistakes at the boundary. Attribution explains them afterwards.
Neither answers the question in between: **how would a team know if an agent did something it did not
intend, inside access it was legitimately given?**

Monitoring built for agent behavior rather than system behavior is the answer, and it is the primary
recommendation on this page. At any meaningful scale it stops being optional. What it does:

- observes what agents actually did, not only what they were asked to do;
- compares activity against intent and expected scope;
- flags access being used in ways that do not match the stated purpose;
- raises an alert on anomalous or out-of-scope action while it is happening, rather than at audit
  time.

**This is the single highest-value thing to build**, because it is the only control that operates
while the agent is working rather than before or after it. Most organizations already collect the raw
material — access logs, audit trails, repository and pipeline history — and comparing that record
against the task the agent was given is a tractable starting point, even a coarse one. Nobody has a
mature version of this yet, including this framework, which is a reason to build a first version
rather than a reason to wait.

Until the tooling catches up, the approach leans on a human paying attention, and attention scales
far worse than access does. Anyone adopting it inherits that limitation and should decide
deliberately whether it is acceptable at their blast radius.

## Delegated execution

Clover does not use "autonomy" as a maturity target. A team can choose to delegate more execution to
AI inside a clearly defined human Direction, but the decision is made by the accountable human or
organization.

Three rules keep delegated execution honest:

- **Results decide, rather than confidence.** Delegate a particular execution pattern where outcomes
  of that kind have repeatedly held up without rework. Narrow it again when they stop.
- **Blast radius overrides track record.** Where a mistake is expensive or hard to reverse, human
  approval stays regardless of how well things have gone.
- **Delegation is per context, rather than global.** A team may delegate a well-understood remediation
  flow while approving every state-changing step touching customer data.

What changes is the amount of execution work AI performs. What does not change is who owns Direction,
the destination, the acceptable risk, the boundaries, and the outcome.

> **Delegation can move work. It does not move Direction.**

## Controls are not the hard part

Governance is necessary, and on its own it changes nothing. An organization can get every control
right and see no difference in how the work happens, because the constraint was rarely permission. It
was whether people actually work this way.

[Adoption](09-adoption.md) carries more weight than anything on this page. Keeping execution
observable, attributable, and reversible where practical is the part this document covers. The rest of
the effort belongs with the people who have to use it.
