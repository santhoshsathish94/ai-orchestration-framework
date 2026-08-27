# Glossary

Plain-language definitions for the terms used across this framework. If a term here is not clear,
that is a bug in the writing — [tell us](../CONTRIBUTING.md).

# Glossary

Plain-language definitions for the terms used across this framework. If a term here is not clear,
that is a bug in the writing — [tell us](../CONTRIBUTING.md).

## Clover and the five leaves

| Term | What it means here |
|---|---|
| **Clover** | This framework. Five leaves — Direction → Context → Action → Success → Growth — describing how human intent becomes an outcome the environment confirms, and what the system keeps once it does. See [the model](04-framework.md). |
| **Leaf** | One part of the cycle. Each leaf has one job, and the model stays at five of them. |
| **Direction** | Where human intent enters the system. What is being worked on, why it matters, which outcome counts, which constraints apply, and what stays out of scope. |
| **Context** | What the system needs to know about reality before acting — the code, the data, the logs, the running behavior, the history, the constraints, and what was already tried. |
| **Action** | Deciding how the work should happen and then doing it. Planning, tool and model choice, orchestration across agents, changes, tests, debugging. |
| **Success** | The intended outcome demonstrated by the real environment. A closed task, a passing build, or a confident report sits outside this. |
| **Growth** | What the system accumulates across repeated cycles — memory, experience, learned patterns, expertise, better planning and tool choice. |
| **The fifth leaf** | The open boundary of Growth. Growth is useful and adaptive today, and how far it goes is unknown. It is carried as a question rather than a prediction, and it lives in [the hypothesis](../hypothesis/ai-future.md). |
| **Short form** | Where → Know → Do → Validate → Become. The same five leaves in one word each. |

## Everything else

| Term | What it means here |
|---|---|
| **Orchestration** | Coordinating people, AI, tools, and context so that work produces an outcome the environment confirms, rather than each part doing its own thing. |
| **Orchestration environment** | The access layer between AI and the systems an organization already runs. It is what feeds the Context leaf. See [the orchestration environment](orchestration-environment.md). |
| **Capability** | Anything that can do work: a person, a team, an AI model, an agent, a tool, a system. |
| **Intent** | What a human actually wants to achieve. The outcome, and not the task. |
| **Outcome** | The change in the real world that was wanted. Distinct from *output*, which is what got produced. |
| **Evidence** | What was actually done to check a claim — an assertion, one manual look, a repeatable test, a before-and-after measurement, or the original signal gone from the real environment. Say which. See [Success](07-success.md#how-strong-is-your-evidence). |
| **Experience** | What was learned from one cycle — what was tried, what happened, what the evidence showed. |
| **Expertise** | A reusable pattern that emerges from several *validated* experiences. One cycle is not expertise. |
| **Ownership** | The named human accountable for an outcome. Work can be delegated; ownership cannot. |
| **Agent** | An AI system that can take actions and use tools, rather than only produce text. |
| **Agentic workflow** | A designed loop of agent steps that repeats a known process. Orchestration differs in that it keeps what the outcome taught it. |
| **Autonomy** | How much of the *path* AI is trusted to determine — widened where results have held, capped by blast radius, granted per context rather than globally. See [the model](04-framework.md#widening-what-ai-decides). |
| **Telemetry** | The signals a running system emits about itself — logs, metrics, traces, error rates. |
| **Blast radius** | How much damage a change could do if it is wrong. A bigger blast radius means more human approval. |
| **Non-production** | Any environment that is not serving real users — local, test, staging. Safe to break. |
| **Guardrail** | A constraint that keeps work inside safe boundaries: a required approval, a scope limit, a check that must pass. |
| **Root cause** | The underlying reason a problem occurs. Distinct from the symptom, and from the workaround that hides it. |
| **Workaround** | Something that stops the pain without fixing the cause. Legitimate for stabilizing an incident, and not a destination. |
| **Thrashing** | Repeated confident attempts at a fix, none of which work. The signal to stop fixing and go back to Context. |
