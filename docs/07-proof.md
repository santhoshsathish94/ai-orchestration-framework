# Proof

AI Orchestration Model

Opportunity → Understand → Plan → Execute → Proof → Grow ↺

**Proof** is the stage that asks a simple question: *did the intended outcome actually happen?* A
finished task, a passing build, or a merged change is an output — not proof.

## Prove the outcome, not the activity

Evidence has to connect the work back to the original problem. A deployed fix is not the same as a
resolved problem; proof is showing the original signal actually improved.

## In practice

- Decide up front what evidence would prove the outcome.
- Use the strongest evidence available: before/after measurements, tests, telemetry, user signals.
- For production work, keep going until the original production signal is demonstrably resolved.
- Be honest about what still remains uncertain.

## How strong is your evidence?

Most work does not have production telemetry, and Proof has to stay usable anyway. The point is not
to always reach the top rung — it is to know which rung you reached and to say so.

1. **Asserted** — someone says it works. Not proof.
2. **Demonstrated once** — shown working manually.
3. **Tested repeatably** — an automated check that fails without the change.
4. **Measured before/after** — the number moved in the right direction.
5. **Observed in the real environment** — the original signal is gone and stays gone.

> **Name the rung you actually reached. Do not claim a higher one.**

See the [evidence ladder](04-framework.md#the-evidence-ladder) for the full stage detail.

## When proof fails

Failed proof is a normal result, not an error state. When the evidence does not support the outcome,
**go back to Understand, not to Execute.** Failed proof usually means the understanding was
incomplete — and another attempt at the fix just repeats the original mistake faster.

Proof also exists because AI reports success it has not verified. See
[How AI fails](how-ai-fails.md) for that failure mode and the others this stage is designed to catch.
