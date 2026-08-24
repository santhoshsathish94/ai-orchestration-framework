# Case Studies

Real work, honestly reported — including what is still unproven.

**01 and 02 are delivered outcomes**, not illustrations: a migration estimated at 8–10 weeks completed
in about a day and validated against live traffic, and a production out-of-memory failure traced to
its root cause in a shared framework and fixed there.

These deliberately span different domains. The lifecycle is the same in each; only the vocabulary
changes.

## Outcome case studies

Delivered work with measurable results, and a plain statement of what remains uncertain.

| # | Case study | Domain | What it shows |
|---|---|---|---|
| **01** | [Contentful API Migration](01-contentful-migration.md) | Software engineering | A large GraphQL → REST migration completed in about a day, with the public contract preserved and validated against live traffic. |
| **02** | [Fixing a React Server Components Memory Leak Upstream](02-react-rsc-memory-leak.md) | Open-source engineering | Production OOM → workaround → root cause → validated fix → upstream contribution. The workaround was not the destination. *(PR CI-green, awaiting maintainer review.)* |

## Reasoning patterns

No measured outcome, by design. These illustrate how a stage works, not what it delivered.

| # | Case study | Domain | What it shows |
|---|---|---|---|
| **03** | [Contextual Reasoning in a Newborn Care Scenario](03-newborn-contextual-reasoning.md) | Healthcare | AI recognizing that the available context was insufficient, and surfacing a missing signal for a human expert to decide on. |

## A note on evidence

The evidence bar differs by intent, so each case study says which kind it is. Case study 03 contains
no clinical claim, no medical advice and no identifying data.

The two [reference implementations](../docs/reference-implementations.md) sit at **rung 2 —
demonstrated**: built and shown working against real organizational data, but not put in front of end
users or adopted organization-wide.

See the [evidence ladder](../docs/07-proof.md#how-strong-is-your-evidence) for how we talk about
strength of evidence generally.

## Contributing a case study

Honest case studies are welcome, including ones where the outcome was not achieved. See
[CONTRIBUTING.md](../CONTRIBUTING.md).
