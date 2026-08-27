# Glossary

Plain-language definitions for the terms used across this framework. If a term here is not clear,
that is a bug in the writing — [tell us](../CONTRIBUTING.md).

## Clover and the five stages

| Term | What it means here |
|---|---|
| **Clover** | This framework. A five-leaf framework of using AI, setting out how a human's direction, the systems an organization already runs, the work AI does, and the evidence the real environment gives back fit together into one repeatable cycle. See [the framework](04-framework.md). |
| **Stage** | One part of the cycle. Each stage has one job. The working loop is four of them — Direction → Context → Action → Success — and the fifth is Growth. |
| **Leaf** | A leaf of the clover mark. The picture has five. In the documents the parts of the cycle are called stages. |
| **The common clover** | Three leaves: Direction, Action, Success. How AI is used almost everywhere today. |
| **The lucky clover** | Four leaves. Context arrives, and it changes what the other three are worth. Where organizations are now. |
| **The growth clover** | Five leaves. Growth, which is the next stage. |
| **Direction** | Where human intent enters the system. The human controls what needs to be done, decides how it should be done, and approves. With real context available, Direction also points at where the answer probably is. |
| **Context** | What the work reasons from. In the common clover it is only what one human can hand over — what they type, the files they attach, the repository they are working in. In the lucky clover it is the current systems the organization uses: every repository with its many projects and documentation, the datasources the applications connect to, the logs and telemetry, the deployment environments, the running applications. |
| **Action** | Now mostly driven by AI: deciding how the work should happen and then doing it. Planning, tool and AI model choice, orchestration across agents, changes, tests, debugging. |
| **Success** | The intended outcome demonstrated by the real environment. A closed task, a passing build, or a confident report sits outside this. |
| **Growth** | What AI learns, and the expertise it forms, out of the other four stages. Nobody in an organization operates it. It belongs to the frontier AI companies, who hold the volume of data that everyone's usage generates. |
| **The fifth leaf** | Growth. It stands for the next stage, and where repeated Growth ends is carried as a question, in [the hypothesis](../hypothesis/ai-future.md). |

## Everything else

| Term | What it means here |
|---|---|
| **Orchestration** | Coordinating people, AI, tools, and context so that work produces an outcome the environment confirms, rather than each part doing its own thing. |
| **Orchestration environment** | The access layer between AI and the current systems an organization uses. It is what feeds the Context stage. See [the orchestration environment](orchestration-environment.md). |
| **MCP server** | A small service that gives an agent a scoped way to read one system — a repository, a datasource, a log store, an environment. Read-only, and scoped to what the human driving the work already has access to. This is how the Context stage gets connected. |
| **Capability** | Anything that can do work: a human, a team, an AI model, an agent, a tool, a system. |
| **Intent** | What a human actually wants to achieve. The outcome, and not the task. |
| **Outcome** | The change in the real world that was wanted. Distinct from *output*, which is what got produced. |
| **Evidence** | What was actually done to check a claim — an assertion, one manual look, a repeatable test, a before-and-after measurement, or the original signal gone from the real environment. Say which. See [Success](07-success.md#how-strong-is-your-evidence). |
| **Experience** | What was learned from one cycle — what was tried, what happened, what the evidence showed. It is written into the context files beside the work. |
| **Expertise** | A reusable pattern that emerges from several *validated* experiences. One cycle is not expertise. |
| **Ownership** | The named human accountable for an outcome. Work can be delegated; ownership cannot. |
| **Agent** | An AI system that can take actions and use tools, rather than only produce text. |
| **Agentic workflow** | A designed loop of agent steps that repeats a known process. Orchestration differs in that it keeps what the outcome taught it. |
| **Autonomy** | How much of the *path* AI is trusted to determine — widened where results have held, capped by blast radius, granted per context rather than globally. See [the framework](04-framework.md#widening-what-ai-decides). |
| **Telemetry** | The signals a running system emits about itself — logs, metrics, traces, error rates. |
| **Blast radius** | How much damage a change could do if it is wrong. A bigger blast radius means more human approval. |
| **Non-production** | Any environment that is not serving real users — local, test, staging. Safe to break. |
| **Guardrail** | A constraint that keeps work inside safe boundaries: a required approval, a scope limit, a check that must pass. |
| **Root cause** | The underlying reason a problem occurs. Distinct from the symptom, and from the workaround that hides it. |
| **Workaround** | Something that stops the pain without fixing the cause. Legitimate for stabilizing an incident, and not a destination. |
| **Thrashing** | Repeated confident attempts at a fix, none of which work. The signal to stop fixing and go back to Context. |
