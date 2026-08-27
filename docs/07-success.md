# Success

Success is the fourth stage of [the Clover framework](04-framework.md). It asks whether the intended outcome actually happened, and it answers with the environment.

The environment is the evidence of success. A closed task, a generated artifact, a passing build, a merged change, a fluent explanation, a confident tone, and a high model score are all things the work produced. None of them shows that the outcome occurred.

## Why Success rather than Results

Results describe what happened. Work ran, something changed, there is a record of it. A cycle can produce a full page of results and leave the original problem exactly where it was.

Success asks the narrower question: was the intended outcome achieved? That points back to Direction, where the outcome was stated, and it can only be settled by the environment the work was meant to change.

The word does real work, because teams keep score with whatever word they use. Counting results rewards activity, and there is always more activity available. Counting success ties the score to the outcome that was asked for, which is a harder number to move and a more useful one to have.

## Evidence connects back to the problem

A deployed fix and a resolved problem are two different claims. The evidence has to reach back to the signal that started the work: the exception that was firing, the number that was wrong, the person who could not complete something.

What counts depends on the work. A test that fails without the change and passes with it. A before-and-after measurement. Telemetry. A run outside production. A production signal that disappears and stays gone. A user confirming the outcome in their own words.

Deciding this at the start is the cheap version. When Direction says what would demonstrate the outcome, this stage becomes a matter of running the check. When nobody says, the team ends up arguing about sufficiency at the point where everyone wants to be finished.

## How strong is your evidence?

Most work has no production telemetry, and this stage has to stay usable anyway. The goal is to describe accurately what was done, rather than to reach the strongest available evidence every time.

Four questions carry most of it:

- **Did anyone verify it, or is someone asserting it?** An assertion establishes nothing, whoever or whatever makes it.
- **Does it hold up again?** Something seen working once is a weaker claim than a check that fails without the change and passes with it.
- **Did the thing we cared about move?** A passing test says the code behaves. A before-and-after measurement says the problem changed.
- **Did it hold where it counts?** The original signal gone from the real environment, and staying gone.

State what you checked, what you observed, and where you stopped.

Stopping early is often correct. A small internal change can be genuinely complete once a test covers it, and observing production is not always available or worth its cost. The damage comes from describing weak evidence in the language of strong evidence. "Validated in the test environment, not yet observed in production" is a complete and honest claim, and a reader can act on it. "Verified" on its own leaves them guessing.

## When Success fails

A failed check is a normal outcome of the cycle. When the evidence does not support the intended outcome, the work returns to **Context**, rather than to Action.

Retrying the change that just failed is the common waste. The second attempt runs on the same information as the first and arrives in the same place, faster. Something about reality was missing, so the next attempt needs new material: what the environment did instead, which assumption broke, which signal nobody had looked at yet. [Context](05-context-engineering.md) covers where to go and get it.

A success is not the end of the loop either. Both outcomes go back into the same place:

> After each success and each failure, the context files are written before the next attempt.

## What happens there

Evidence gets described more strongly than it is. "Verified" covers a single manual look. A merged change gets reported as a resolved problem. AI reports success it never checked, and the report reads the same as one that was checked, which is the whole difficulty. [How AI fails](how-ai-fails.md) covers that pattern and the others.

The quiet one is stopping at the artifact. The build passed, so the work gets treated as done, and nobody goes back to see whether the original signal changed.
