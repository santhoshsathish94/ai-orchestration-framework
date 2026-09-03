# Glossary

Plain-language definitions for the terms used across this framework. If a term here is not clear,
that is a bug in the writing — [tell us](../CONTRIBUTING.md).

## Clover and the five stages

| Term | What it means here |
|---|---|
| **Clover** | This framework. Clover is a way of working with System, Human, and AI to produce meaningful outcomes through real Context, human Direction, delegated Action, and validated Outcome. See [the framework](04-framework.md). |
| **System actors** | The three participants in any cycle — **System → Human → AI**. The System is the reality the outcome must exist in, the Human holds Direction and accountability, and AI supplies capability and execution. |
| **System cycle** | The five stages the actors run — **Context → Direction → Action → Outcome → Growth**. |
| **Stage** | One part of the system cycle. Each stage has one job. There are five. |
| **Accountability** | Being answerable for the outcome afterward. It cannot sit with AI, which can perform work and report on it but cannot carry the consequence. When execution moved to AI, accountability tended to move out of scope with it. Clover establishes it back in the system, on the human actor who can truly take up the role. |
| **Leaf** | A leaf of the clover mark. The picture has five. In the documents the parts of the cycle are called stages; the fifth leaf represents Growth. |
| **The common clover** | Three leaves: Direction, Action, Outcome. A common way of working where context is mostly what a human provides. |
| **The lucky clover** | Four leaves. Context arrives from System reality and comes first, changing what the other three are worth. |
| **The growth clover** | Five leaves. Growth is the fifth stage: preserve what the cycle taught and promote what has held. |
| **Context** | What the work reasons from, and where the cycle starts. It may be an existing system or the reality already established while a system is being built: data, behavior, history, constraints, evidence, and previous cycles. |
| **Direction** | Where human purpose and accountability enter the system. Humans choose what matters, the desired outcome, priorities, constraints, boundaries, and what must not happen. AI can be capable enough to suggest directions, but humans should always have the authority to decide what to pursue. |
| **Action** | AI applies its capability to system Context and human Direction, determines how the work should happen, and executes within the defined boundaries. |
| **Outcome** | The intended outcome demonstrated by the real environment. A closed task, a passing build, or a confident report sits outside this on its own. |
| **Growth** | The fifth stage of the system cycle. Whatever the Outcome taught, at any size, carried back into Context. One wrong answer, understood and written down, counts; no repetition and no scale are required. What accumulates over time can sit with humans, AI systems, the systems being worked on, teams and organizations. What frontier AI providers do with volumes of interaction data is a larger and separate question — see [the hypothesis layer](../hypothesis/ai-future.md). |
| **The fifth leaf** | Growth, drawn as the fifth leaf of the mark. The leaf also carries the unknown boundary of how far capability and learning may develop. |

## Everything else

| Term | What it means here |
|---|---|
| **Orchestration** | Coordinating people, AI, tools, and context so that work produces an outcome the environment confirms, rather than each part doing its own thing. |
| **Orchestration environment** | The access layer between AI and the current systems an organization uses. It is what feeds the Context stage. See [the orchestration environment](orchestration-environment.md). |
| **MCP server** | A small service that gives an agent a scoped way to read one system — a repository, a datasource, a log store, an environment. Read-only, and scoped to what the human driving the work already has access to. This is how the Context stage gets connected. |
| **Capability** | Anything that can do work: a human, a team, an AI model, an agent, a tool, a system. Capability does not by itself grant authority or accountability. |
| **Intent** | What a human actually wants to achieve. The outcome, and not the task. |
| **Outcome** | The change in the real world that was wanted. Distinct from *output*, which is what got produced. |
| **Evidence** | What was actually done to check a claim — an assertion, one manual look, a repeatable test, a before-and-after measurement, or the original signal gone from the real environment. Say which. See [Outcome](07-outcome.md#how-strong-is-your-evidence). |
| **Experience** | What was learned from one cycle — what was tried, what happened, what the evidence showed. It can become part of the context files beside the work. |
| **Expertise** | A reusable pattern that emerges from several *validated* experiences. One cycle is not expertise. |
| **Ownership** | The named human accountable for an outcome. Work can be delegated; ownership cannot. |
| **Agent** | An AI system that can take actions and use tools, rather than only produce text. |
| **Agentic workflow** | A designed loop of agent steps that repeats a known process. Orchestration differs in that it keeps what the outcome taught it. |
| **Delegated execution** | The amount of operational work a human or organization chooses to have AI perform inside human Direction. It can expand or contract by context and evidence. It does not transfer purpose, acceptable risk, priorities, boundaries, the destination, or accountability to AI. |
| **Telemetry** | The signals a running system emits about itself — logs, metrics, traces, error rates. |
| **Blast radius** | How much damage a change could do if it is wrong. A bigger blast radius means more human approval. |
| **Non-production** | Any environment that is not serving real users — local, test, staging. It can still contain sensitive data and is not automatically safe to expose. |
| **Guardrail** | A constraint that keeps work inside safe boundaries: a required approval, a scope limit, a check that must pass. |
| **Root cause** | The underlying reason a problem occurs. Distinct from the symptom, and from the workaround that hides it. |
| **Workaround** | Something that stops the pain without fixing the cause. Legitimate for stabilizing an incident, and not a destination. |
| **Thrashing** | Repeated confident attempts at a fix, none of which work. The signal to stop fixing and go back to Context. |
