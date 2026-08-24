# Glossary

Plain-language definitions for the terms used across this framework. If a term here is not clear,
that is a bug in the writing — [tell us](../CONTRIBUTING.md).

| Term | What it means here |
|---|---|
| **Orchestration** | Coordinating people, AI, tools, and context so that work produces a proven outcome — rather than each part doing its own thing. |
| **Capability** | Anything that can do work: a person, a team, an AI model, an agent, a tool, a system. |
| **Context** | Everything AI or a person needs to reason correctly about a problem — the code, the history, the rules, the constraints, what was already tried. |
| **Intent** | What a human actually wants to achieve. The outcome, not the task. |
| **Outcome** | The change in the real world you were after. Distinct from *output*, which is just what got produced. |
| **Proof** | Evidence that connects the work back to the original problem and shows the outcome actually happened. |
| **Evidence ladder** | Five rungs from "someone says it works" to "observed in the real environment." You name the rung you reached. See [Proof](07-proof.md#how-strong-is-your-evidence). |
| **Experience** | What was learned from one specific execution — what was tried, what happened, what the evidence showed. |
| **Expertise** | A reusable pattern that emerges from several *validated* experiences. One execution is not expertise. |
| **Ownership** | The named human accountable for an outcome. Work can be delegated; ownership cannot. |
| **Agent** | An AI system that can take actions and use tools, not only produce text. |
| **Agentic workflow** | A designed loop of agent steps that repeats a known process. Orchestration differs in that it *learns* from the outcome. |
| **Autonomy ladder** | Five levels describing how much of the *path* AI is trusted to determine, each earned through Proof. See [the framework](04-framework.md#the-autonomy-ladder). |
| **Telemetry** | The signals a running system emits about itself — logs, metrics, traces, error rates. |
| **Blast radius** | How much damage a change could do if it is wrong. Bigger blast radius means more human approval. |
| **Non-production** | Any environment that is not serving real users — local, test, staging. Safe to break. |
| **Guardrail** | A constraint that keeps work inside safe boundaries: a required approval, a scope limit, a check that must pass. |
| **Root cause** | The underlying reason a problem occurs. Distinct from the symptom and from the workaround that hides it. |
| **Workaround** | Something that stops the pain without fixing the cause. Legitimate to stabilize an incident; not a destination. |
| **Thrashing** | Repeated confident attempts at a fix, none of which work — the signal to stop fixing and go back to understanding. |
