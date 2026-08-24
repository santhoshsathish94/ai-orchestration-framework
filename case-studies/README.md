# Case Studies

Real work, honestly reported — including what is still unproven.

These deliberately span different domains. The lifecycle is the same in each; only the vocabulary
changes.

| # | Case study | Domain | What it shows |
|---|---|---|---|
| **01** | [Contentful API Migration](01-contentful-migration.md) | Software engineering | A large GraphQL → REST migration completed in about a day, with the public contract preserved and validated against live traffic. |
| **02** | [Fixing a React Server Components Memory Leak Upstream](02-react-rsc-memory-leak.md) | Open-source engineering | Production OOM → workaround → root cause → validated fix → upstream contribution. The workaround was not the destination. |
| **03** | [Contextual Reasoning in a Newborn Care Scenario](03-newborn-contextual-reasoning.md) | Healthcare *(reasoning pattern)* | AI recognising that the available context was insufficient, and surfacing a missing signal for a human expert to decide on. |

## A note on evidence

**01 and 02 are outcome case studies** — they report measurable results and name what remains
uncertain.

**03 is a reasoning pattern, not an outcome measurement.** It illustrates what the Understand stage
looks like outside software. It contains no clinical claim and no measured result, by design.

The evidence bar differs by intent, so each case study says which kind it is. See the
[evidence ladder](../docs/07-proof.md#how-strong-is-your-evidence) for how we talk about strength of
evidence generally.

## Contributing a case study

Honest case studies are welcome, including ones where the outcome was not achieved. See
[CONTRIBUTING.md](../CONTRIBUTING.md).
