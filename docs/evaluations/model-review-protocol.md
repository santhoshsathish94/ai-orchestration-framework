# Model Review Protocol

Clover should only publish model ratings that another person can reproduce.

This protocol defines a simple evidence trail for reviews by AI models or other reviewers.

## 1. Freeze the reviewed revision

Record the exact Git commit SHA of Clover that was reviewed.

Do not rate "Clover" in the abstract. Rate a specific revision.

## 2. Use the same review prompt

Give every reviewer the same evaluation prompt and the same repository snapshot.

Ask the reviewer to:

- identify strengths;
- identify concrete weaknesses;
- attempt to falsify or break the framework;
- rate each defined category from 0 to 10;
- explain every score;
- distinguish observed facts from recommendations;
- identify what the reviewer could not verify.

## 3. Keep the original evidence

Preserve the complete reviewer response, including criticism and low scores.

Do not publish only the final score. A score without the underlying response cannot be independently checked.

Recommended metadata:

```text
Reviewer: <model/provider/version>
Reviewed commit: <git SHA>
Review date: <UTC date>
Prompt version: <protocol revision>
Repository snapshot: <URL>
Raw response: <artifact or file>
``` 

## 4. Calculate the score mechanically

Define the categories before reviewing. For example:

| Category | Weight |
|---|---:|
| Core proposition | 15% |
| Conceptual coherence | 10% |
| Human/AI authority boundary | 15% |
| Context engineering | 10% |
| Action/delegation | 10% |
| Success/verification | 15% |
| Runtime enforcement | 10% |
| Growth | 5% |
| Enterprise readiness | 5% |
| Public clarity | 5% |

The overall score is the weighted mean. Do not adjust the arithmetic after seeing the result.

## 5. Separate model scores from the project's judgment

A model's rating is evidence about that review, not an objective property of Clover.

For public communication, say exactly what was measured:

> "Model X rated commit `<sha>` 9.6/10 under protocol `<version>`."

Do not say:

> "AI proves Clover is 9.6/10."

The project's own assessment should be reported separately.

## 6. Make verification easy

A reader should be able to:

1. open the reviewed commit;
2. see the exact prompt;
3. inspect the raw reviewer response;
4. reproduce the weighted calculation;
5. compare the reviewer's claims against the repository.

If any of those are unavailable, label the result as an informal review rather than a reproducible rating.

## 7. Record disagreement

Different models can legitimately disagree. Do not average away disagreement just to produce a stronger headline.

Publish the range, the individual scores, and the reasons for material differences.

A useful summary is:

> **What did the reviewers agree on? What did they disagree on? What changed in Clover because of the criticism?**

## 8. Version the protocol

If the evaluation categories or weights change, increment the protocol version.

Scores from different protocol versions should not be presented as directly comparable unless the difference is explicitly explained.

## 9. Current Clover runtime reference

The runtime-enforcement implementation is itself part of the evidence trail. It demonstrates external enforcement for a narrow verification boundary, but it is not a claim that Clover is a complete security product.

That distinction should remain visible in every public evaluation.
