# Outcome

Outcome is the fourth stage of [the Clover framework](04-framework.md). It asks what actually happened, and it answers with the environment.

The environment is the evidence of the Outcome. A closed task, a generated artifact, a passing build, a merged change, a fluent explanation, a confident tone, and a high model score are all things the work produced. None of them, on its own, tells us what the intended outcome became in reality.

## Why Outcome rather than Success

Success describes only one kind of result. Outcome is broader: the cycle may produce a favorable result, an unfavorable result, a partial result, or an inconclusive result, and any of those can teach us something meaningful.

The stage therefore does not ask whether the work "won." It asks what reality shows happened. That points back to Direction, where the intended outcome was stated, and forward to the next cycle, where the evidence can become Context.

The word matters because a failed attempt can be as informative as a successful one. A cycle that disproves an assumption has produced a meaningful Outcome even when the intended outcome was not achieved.

## Evidence connects back to the problem

A deployed fix and a resolved problem are two different claims. The evidence has to reach back to the signal that started the work: the exception that was firing, the number that was wrong, the person who could not complete something.

What counts depends on the work. A test that fails without the change and passes with it. A before-and-after measurement. Telemetry. A run outside production. A production signal that disappears and stays gone. A user confirming the outcome in their own words.

Deciding this at the start is the cheap version. When Direction says what would demonstrate the intended outcome, this stage becomes a matter of observing the relevant evidence. When nobody says, the team ends up arguing about sufficiency at the point where everyone wants to be finished.

## How strong is your evidence?

Most work has no production telemetry, and this stage has to stay usable anyway. The goal is to describe accurately what happened, rather than to reach the strongest available evidence every time.

Four questions carry most of it:

- **Did anyone verify it, or is someone asserting it?** An assertion establishes nothing, whoever or whatever makes it.
- **Does it hold up again?** Something seen once is a weaker claim than a check that can be repeated.
- **Did the thing we cared about move?** A passing test says the code behaves. A before-and-after measurement says the problem changed.
- **Did it happen where it counts?** The original signal changed in the real environment, or the available evidence clearly shows why it could not be observed there yet.

State what you checked, what you observed, and where you stopped.

Stopping early is often correct. A small internal change can be genuinely complete once a test covers it, and observing production is not always available or worth its cost. The damage comes from describing weak evidence in the language of strong evidence. "Observed in the test environment, not yet observed in production" is a complete and honest claim, and a reader can act on it. "Verified" on its own leaves them guessing.

## When the Outcome is unfavorable

An unfavorable Outcome is a normal outcome of the cycle. When the evidence does not support the intended outcome, the work returns to **Context**, rather than to Action.

Retrying the change that just failed is the common waste. The second attempt runs on the same information as the first and arrives in the same place, faster. Something about reality was missing, so the next attempt needs new material: what the environment did instead, which assumption broke, which signal nobody had looked at yet. [Context](05-context-engineering.md) covers where to go and get it.

A favorable Outcome is not the end of the loop either. Both favorable and unfavorable Outcomes can contribute to Growth:

> After each favorable and unfavorable Outcome, the context files are written before the next attempt.

## What happens there

Evidence gets described more strongly than it is. "Verified" covers a single manual look. A merged change gets reported as a resolved problem. AI reports that something worked without checking the environment, and the report reads the same as one that was checked, which is the whole difficulty. [How AI fails](how-ai-fails.md) covers that pattern and the others.

The quiet one is stopping at the artifact. The build passed, so the work gets treated as done, and nobody goes back to see what happened to the original signal.
