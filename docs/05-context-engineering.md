# Context

Context is the second leaf of [the Clover model](04-framework.md). It covers what the system needs to know about reality before anything acts on it.

That means the repository, the documentation, the architecture, real data, logs, runtime state, tests, how the system actually behaves, the history of the problem, whatever was already tried, and the memory carried over from previous cycles.

Capability is only as good as the material it reasons from. A person cannot solve a problem they have never looked at, and an agent cannot either, however good its tools are.

## Reason from the real environment

Where the environment can answer a question, read the environment. That is the working rule for this leaf, and the rest of this page is how it plays out.

A model reasoning from assumptions returns something that reads correctly and describes a system nobody has. The failure is quiet, because a confident description of the wrong architecture looks the same as a confident description of the right one until somebody checks. Checking is usually cheap. The code, the logs, the tests, and the running system are all reachable, and reaching them costs far less than a change built on a guess.

Prompting is a small part of this leaf. A carefully worded request against thin context still produces a guess.

## What context is made of

Different problems need different material. These are the sources worth checking before anyone concludes there is nothing to read:

- **The system as written.** Source, architecture, configuration, dependencies, and the tests that describe how it is meant to behave.
- **The system as it runs.** Logs, telemetry, traces, runtime state, error signals. What the system does, rather than what the documentation says it does.
- **The rules around it.** Business rules, constraints, regulatory requirements, and the decisions that produced the current design.
- **The history.** Tickets, incidents, commits, reviews, and earlier attempts at the same problem, including the ones that went nowhere.
- **What earlier cycles kept.** Persistent memory, recorded experience, and patterns that have already held up. Growth is what puts material into this last group, and Context is where it comes back into use.

Organizations usually hold most of this already. The work is retrieval and assembly more often than it is authorship.

## Enough to reason correctly

Two failures sit on either side of this leaf.

Thin context is the familiar one. The problem gets solved in the abstract, the answer is coherent, and it lands somewhere next to the actual system. Hoarding is the other. A context packed with everything reachable buries the handful of facts the problem turns on, and a long context is not a substitute for a relevant one.

The bar is enough context to reason correctly about this problem. Reaching it is iterative: gather, try to explain the problem end to end, notice which step cannot be explained, then go and get that.

Gaps are worth naming out loud. "The deployment history for this service was not reachable" changes what the next step should be, and a gathering pass that reports only what it found hides the part that matters most. Assumptions nobody has tested belong in the same list.

## Who holds what

Access and judgment stay with a person: which systems may be read, which data may be used, which sources can be trusted, and when the context in hand is good enough to act on. [Governance](08-governance.md) covers how that access is held, and [the orchestration environment](orchestration-environment.md) covers what it takes to make the material reachable at all.

AI does most of the gathering. Reading code, tracing a call path, pulling telemetry, reconstructing an incident from logs, finding the attempt from a year ago that nobody remembered. This is the leaf where a capable agent saves the most time, and it saves it on work people were skipping anyway.

## Where context lives

Context that survives the cycle needs somewhere to sit, or it stays a good intention. The mechanism that works is unglamorous: **plain markdown files committed alongside the code they describe.**

One per effort, or per repository, updated as the work proceeds rather than written up at the end. A useful file answers four questions:

| | |
|---|---|
| **The goal** | What outcome is being pursued, and what "done" means |
| **What has been established** | Findings that are settled, and the evidence behind them |
| **What remains** | Open questions, unverified assumptions, and next steps |
| **What was learned** | Things that turned out to be wrong, dead ends worth not repeating |

This matters more with AI in the loop than without it. A session ends and its working memory goes with it. A file in the repository stays. Anyone picking the work up — a colleague, a different agent, the same agent tomorrow — starts from what has already been established instead of re-deriving it, and the re-derivation is where both the cost and the drift come from.

Two properties make it work:

- **It sits next to the code**, so it travels with the change, gets reviewed with the change, and cannot quietly disagree with a wiki nobody opens.
- **It is written continuously.** Context recorded at the end is a report. Context recorded as the work proceeds is a working memory, and that is the difference between resuming and restarting.

This is where Growth becomes concrete. The fifth leaf stops being an intention and becomes a file the next cycle reads, which is why the two leaves are usually discussed together.

## What goes wrong here

This leaf catches most of the AI-specific failures. Fabricated references, a root cause that is plausible and wrong, and agreement offered where judgment was needed all come from acting on material that was never checked. [How AI fails](how-ai-fails.md) covers each pattern and why it happens.

It is also where a failed check lands. When [Success](07-success.md) shows that the intended outcome did not occur, the cycle returns here rather than to Action, because the usual reason a change failed is that something about reality was missing. The next attempt needs new information: what the environment did instead, which assumption broke, which signal nobody had looked at yet.
