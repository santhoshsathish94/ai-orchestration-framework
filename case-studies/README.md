# Case Studies

Real work, including what is still unproven.

**Both are delivered outcomes**, not illustrations: a migration estimated at 8–10 weeks completed
in about a day and parity-validated against live traffic in preprod, and a production out-of-memory
failure traced to its root cause in a shared framework and fixed there. Neither is finished — the
migration's production cutover has not run, and the upstream fix is not yet merged. Both say so.

These deliberately span different domains. The lifecycle is the same in each; only the vocabulary
changes.

| Case study | Domain | What it shows |
|---|---|---|
| [Contentful API Migration](01-contentful-migration.md) | Software engineering | A large GraphQL → REST migration completed in about a day, with the public contract preserved and parity-validated against live traffic in preprod. *(Production cutover not yet run.)* |
| [Fixing a React Server Components Memory Leak Upstream](02-react-rsc-memory-leak.md) | Open-source engineering | Production OOM → workaround → root cause → validated fix → upstream contribution. The workaround was not the destination. *(PR CI-green, awaiting maintainer review.)* |

## A note on evidence

The three [reference implementations](../docs/reference-implementations.md) are graded separately.
Cross-team knowledge access has resolved real production and support incidents and reaches **rung
4–5** for those cases; the two remediation patterns have run on real work through existing review and
deployment approvals. None is an always-on capability or adopted organization-wide.

See the [evidence ladder](../docs/07-proof.md#how-strong-is-your-evidence) for how we talk about
strength of evidence generally.

## Contributing a case study

Honest case studies are welcome, including ones where the outcome was not achieved. See
[CONTRIBUTING.md](../CONTRIBUTING.md).
