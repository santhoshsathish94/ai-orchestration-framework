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

Every action taken through the layer must lead back to a named, accountable human. Never a shared or
anonymous identity. Two reasons:

- **Traceability.** Anything unexpected leads back to someone who can explain it, correct it, and
  learn from it. "The AI did it" closes no loop.
- **Restraint.** Someone whose own name is attached to every action grants access more carefully than
  someone delegating to a faceless service account.

**Attribution is the requirement; the mechanism depends on your policy.** Running work under an
individual's own credentials is the simplest way to achieve it, and for a single practitioner it is
often enough. At any larger scale, most organizations will prefer a **dedicated identity, scoped to
the task and owned by a named person** — that keeps the accountability without carrying the person's
entire access footprint, and it can be rotated and revoked on its own. Either route is acceptable.
An unattributable one is not.

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

## Questions your security team will ask

Most of these have good answers. Two do not yet, and saying so is more useful than glossing over them.

**First, a point that reframes several of them.** Nearly everything below is already possible in most
organizations today, without this framework and without anyone's permission. AI works within a
person's existing access: someone who cannot reach a system cannot reach it through AI either, and
someone who *can* reach it can already point a tool at it. Ungoverned AI use with employee access is
the status quo almost everywhere.

So the choice is rarely "introduce this risk or not." It is **"leave it undescribed, or name it and
put rules around it."** This framework exists to do the second. What follows is not a list of dangers
it creates; it is a list of things it insists you deal with.

One genuine amplification is worth separating out, though: **aggregation**. See the first question.

**"What new access is this creating?"**
Per connection, none — the layer inherits access someone already has. But be honest about the
composite: it can read across code, tickets, logs, datasources and environments *at once*, which no
single person practically could. Each read was permitted; the aggregation is a new capability and a
new target. Treat the layer itself as a sensitive asset and scope it accordingly.

**"What leaves our environment, and who can see it?"**
Code, log extracts, ticket contents and query results go to whichever AI provider you use. Enterprise
agreements commonly cover retention, training exclusion, residency and sub-processors — **verify
yours rather than assuming them.** This is a procurement and legal question, and it should be settled
before access is granted, not after.

**"What stops secrets and personal data ending up in the context?"**
By default, nothing. Repositories contain credentials more often than anyone admits, and logs
routinely contain personal data. Before granting access: scan for secrets and rotate whatever turns
up; prefer log sources that are already redacted; exclude datasources holding regulated data unless
there is a specific reason not to. Assume anything the layer *can* read has been read.

And when something is found, **fix it — do not note it.** A credential committed to a repository is a
defect whether or not AI ever reads it, and personal data in logs is a compliance problem that exists
independently of who is looking. Anyone with repository access could already have found either. The
rule is simple: findings of this kind are raised, tracked, and remediated — rotated, redacted, or
removed. Treating them as acceptable background noise is how they stay for years.

**"What if the content it reads is hostile?"**
This is the sharpest risk and it deserves a straight answer. A framework that encourages reading
tickets, comments, logs and pages is encouraging an agent to consume text that people outside your
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
You largely do not yet — see the next section. That is the honest answer, and it is the reason to keep
early access read-only.

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

No mature answer to this exists yet, including here. That is a reason to build a first version, not a
reason to wait: most organizations already collect the raw material — access logs, audit trails,
repository and pipeline history — and comparing that record against the task the agent was given is a
tractable starting point, even if it is coarse. Until something better exists, this approach depends
on a human paying attention, and attention scales far worse than access does. Anyone adopting it
inherits that limitation and should decide deliberately whether it is acceptable at their blast
radius.

**This is the single highest-value thing to build**, because it is the only control that operates
while the agent is working rather than before or after it.

## How much autonomy to grant

Governance is where ["increase autonomy as trust matures"](04-framework.md#widening-what-ai-decides)
turns into something you can decide and defend. Three rules keep it honest:

- **Results decide, not confidence.** Widen what AI determines for itself where outcomes of that
  kind have repeatedly held up without rework. Narrow it again the moment they stop.
- **Blast radius overrides track record.** Where a mistake is expensive or irreversible, human
  approval stays regardless of how well things have gone.
- **It is granted per context, not globally.** A team may let AI plan and execute inside a
  well-understood remediation flow while approving every step of anything touching customer data.

## Controls are not the hard part

Governance is necessary and it is not sufficient. An organization can get every control right and
change nothing, because the constraint was never permission — it was whether people actually work
this way.

[Adoption](09-adoption.md) carries more weight than anything on this page. Keep execution observable,
attributable, and reversible where practical — then spend the remaining effort on the people who have
to use it.
