<p align="center">
  <a href="https://cloverframework.com/">
    <img src="assets/social-preview.png" width="820"
         alt="Clover — an AI Orchestration Framework connecting real-world Context, human Direction, AI-driven Action, and validated Success into a repeatable cycle">
  </a>
</p>

<p align="center">
  <a href="https://cloverframework.com/"><strong>cloverframework.com</strong></a> ·
  <a href="QUICKSTART.md">Quickstart</a> ·
  <a href="AGENTS.md">AGENTS.md</a> ·
  <a href="docs/04-framework.md">The framework</a> ·
  <a href="docs/glossary.md">Glossary</a>
</p>

---

Clover is an AI Orchestration Framework connecting real-world Context, human Direction, AI-driven
Action, and validated Success into a repeatable cycle. It sits on top of the systems a team already
runs, so there is nothing to install and nothing to migrate onto.

This page is the map. The website tells the story, the docs hold the detail, and both are linked from
here.

---

## The short story

AI grew from finishing the line you were typing to working through a whole task on its own. The same
tool now reasons like a developer, an operator, a security reviewer, a tester and an analyst, and
covering that range would normally take several people.

The way we use it has not moved with it. A human gives the Direction, AI takes the Action, and
somebody checks for Success. Three stages, and that same human also supplies the context — they
remember which service is involved, they paste in the error, they attach the file, they explain what
was tried last month. AI only ever sees the part of the system that one human thought to describe.

That was a fair trade when AI could handle one small job. The context is already sitting in the
systems the organization runs, and AI can read those systems directly, so Context becomes a stage of
its own and it goes first. Direction stays human, and it stops describing the problem from memory and
starts pointing at the part of the system worth reading first.

It runs in a loop, and what comes back from one pass is context for the next. Markdown files kept
beside the work hold the summary, and that summary is what lets any agent pick the job up, so no
single agent has to hold the work.

**[Read the whole story on the website →](https://cloverframework.com/)** — about three minutes.

---

## The four stages

The stages read in the order the work runs in.

| Stage | What it covers | The question it answers |
|---|---|---|
| **Context** | The current systems the organization uses — repositories and their projects and documentation, datasources, logs and telemetry, deployment environments, running applications | What do we need to know about reality before acting? |
| **Direction** | The human controls what matters, the desired outcome, constraints, boundaries, and what must not happen, and approves | What needs to be done, and what must not happen? |
| **Action** | AI determines how the work should happen and executes within those boundaries | What should we do, and how should the work happen? |
| **Success** | The intended outcome demonstrated by the real environment | Did reality validate the intended outcome? |

Each stage has one job. If Success does not hold, the cycle goes back to Context rather than to
Action, because a second attempt on the same information lands in the same place, faster.

---

## Start

**1. Copy [`AGENTS.md`](AGENTS.md) into your project.**
It is the whole way of working written as instructions for an agent. Point an agent at that one file
and nothing else is required.

**2. Connect the Context stage.**
Read-only MCP servers in front of the repositories, the tickets, the logs and the datasources, plus
one environment to read — development is enough. Scope every connection to what the human driving the
work can already read, at the privileges they already hold.
[How to set that up →](docs/orchestration-environment.md#building-one)

**3. Run one real problem through the four stages.**
A defect, a recurring exception, a question nobody can answer quickly. Say where you think the answer
is, and keep a markdown file beside the code so the next cycle starts ahead of this one, and so any
agent can pick the job up from it.

Adoption is incremental and reversible, and a team that stops is left with the systems it already had.

---

## Where to go next

| | |
|---|---|
| [`docs/`](docs/) | The framework in full, indexed. Start with [the four stages](docs/04-framework.md), then [the principles](docs/03-principles.md) |
| [`AGENTS.md`](AGENTS.md) | The whole way of working as operating instructions for an agent |
| [`QUICKSTART.md`](QUICKSTART.md) | A first cycle by hand, in about fifteen minutes |
| [`case-studies/`](case-studies/) | Two cycles written up end to end. The production cutover **has not run**, and the upstream fix **is not merged**, and both say so |
| [`examples/`](examples/) | One cycle worked through, start to finish |
| [`templates/`](templates/) | The brief a cycle starts from |
| [`hypothesis/ai-future.md`](hypothesis/ai-future.md) | Where this might lead. Speculative, and labeled as such |

The three [reference implementations](docs/reference-implementations.md) have all been built and used
against real organizational data. None is always-on or adopted organization-wide, and each depends on
a human providing the map and holding the approvals.

---

## What it is not

- **Not software.** There is nothing to install.
- **Not a runtime.** Clover defines the way of working around AI orchestration and does not prescribe
  what executes it. Agent frameworks, workflow engines and tool protocols sit inside it.
- **Not a replacement for how a team already works.** It runs alongside Agile, incident management,
  or whatever is already in place.
- **Not about AI model or tool selection.** It does not say which AI to use, and it does not cover
  cost, evaluations, data governance, or security review.
- **Not needed for everything.** Throwaway work does not need a cycle. It is worth the effort where
  being wrong costs something.

---

## Contributing

Corrections, questions and case studies are welcome, including the ones where the outcome was never
reached. See [CONTRIBUTING.md](CONTRIBUTING.md), and [CHANGELOG.md](CHANGELOG.md) for what has
changed.

## Author

**Santhosh Narayanan**

Clover comes out of real engineering work, and it keeps changing as more of that work gets done.

Licensed under [CC BY 4.0](LICENSE).
