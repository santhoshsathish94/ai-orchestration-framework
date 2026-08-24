# 03 — Contextual Reasoning in a Newborn Care Scenario

**AI-assisted context → identify an information gap → suggest a useful next signal → human clinical decision**

> **This is a reasoning pattern, not an outcome measurement.** Unlike case studies 01 and 02, it
> reports no metric — it illustrates what the Understand stage looks like outside software.
>
> It is not medical advice. AI did not diagnose, prescribe, or make a clinical decision; the
> pediatrician remained responsible for the medical decision. No identifying details and no actual
> medical data are included. The situation is described only at the level of the reasoning pattern.

## Summary

During a newborn's treatment with IV antibiotics, the family was reviewing available reports while naturally dealing with a high-emotion situation.

The useful contribution from AI was not a diagnosis from the reports. It was recognizing that the available information could be clearer with a **repeat CRP** to understand the trend rather than relying only on a single result.

The suggestion was discussed with the pediatrician. When the repeat result became available, the pediatrician used it as an additional data point and made the clinical decision.

The important orchestration pattern is what the **Understand** stage looks like when it is done well:

**Existing evidence → identify the information gap → suggest the next signal → reassess with new evidence → human decision**

## Why this is an orchestration use case

A simple LLM interaction can answer a question from the information provided. Orchestration asks a different question:

> **Is the available context sufficient to reason well, or is there a missing signal that could reduce uncertainty?**

In this scenario, the model did not stop at interpreting the existing report. It considered the context and suggested obtaining another measurement that could make the trend clearer.

That distinction is important. The value was not the model producing a medical conclusion. The value was helping surface an information gap for discussion with the appropriate human expert.

## Flow

| Stage | What happened |
|---|---|
| Context | Newborn receiving IV antibiotics; reports and observations available |
| Understand | AI reviewed the available context and helped structure what was known |
| Identify gap | A single CRP value did not establish a trend |
| Suggest | AI suggested considering a repeat CRP |
| Human checkpoint | The suggestion was discussed with the pediatrician |
| New evidence | Repeat CRP result became available |
| Decision | Pediatrician reviewed the new data and made the clinical call |

## What AI did — and did not do

### AI contributed

- Structured the available information.
- Considered the context rather than treating one report as the complete picture.
- Identified a potentially useful missing signal.
- Suggested a repeat measurement for discussion.
- Helped make the situation clearer when emotions could make basic metrics easy to overlook.

### AI did not

- Diagnose an infection.
- Prescribe or recommend antibiotics.
- Decide whether treatment should continue or stop.
- Decide whether escalation was required.
- Replace the pediatrician.

The clinical decision remained with the pediatrician.

## The framework principle

This is a small but useful example of why AI orchestration matters.

The goal is not simply:

**Question → Answer**

A stronger loop keeps going until the context is good enough to act on:

**Reason → detect uncertainty → identify missing information → gather evidence → reassess → human decision**

That is the **Understand** stage of the lifecycle, applied outside software.

The same principle can apply well beyond healthcare. In engineering, operations, security, finance, or incident response, the model may have enough information to form a hypothesis but not enough information to confidently act.

An orchestrated system should be able to recognize that gap instead of confidently answering from incomplete context.

## Key takeaway

**AI should not only reason over the information it has. It should reason about whether the information it has is sufficient.**

That is one of the reasons orchestration is needed: it creates a controlled loop where AI can surface missing context, request or suggest the next useful signal, reassess when new evidence arrives, and keep consequential decisions with the appropriate human expert.

## Outcome

In this real-world example, the repeat CRP provided the pediatrician with another data point to consider. The value of AI was not making the decision; it was helping make the information landscape clearer before the human decision was made.

**AI strengthens the reasoning layer. Human expertise remains the decision layer.**
