# 13 — Performance benchmarking & team comparison reports

**Objective.** Produce trustworthy **performance numbers** comparing old (GraphQL) vs new (REST)
services, and generate the **team-facing HTML reports**: an architecture overview and a final
old-vs-new comparison. Task 08 proves *correctness* parity; this task proves *performance* and
packages both for presentation.

**Depends on:** 03–08 (need working endpoints + parity green). **Parallel with:** 09–12, 14.

---

## 1. What to measure (metrics)

Per endpoint (delivery **and** preview where applicable), capture for **both** services:
- **Latency**: p50 / p90 / p99 / max, under a fixed load profile.
- **Throughput**: sustained requests/sec at a target concurrency before SLA breach.
- **Payload size**: uncompressed bytes + compressed (gzip/br) — CMS payloads are HTML-string-heavy,
  so compression matters (feeds Task 14 decision).
- **Contentful call amplification**: # of upstream Contentful calls per API request (old did up to
  2–3 GraphQL calls: lite+dynamic page, related+recent+highlighted blogs, rich-text link calls).
  The new single-call `include=10` model should reduce this materially — quantify it.
- **Resource use**: CPU %, working-set memory, GC pressure, under load.
- **Cold start**: process start → first successful response.
- **Behaviour under Contentful outage**: with upstream blocked, confirm the new service serves
  last-known-good from cache and measure its latency/success-rate vs old.

## 2. Tooling
- **Load/HTTP benchmark**: `k6` (scriptable, good HTML/JSON output) — or NBomber (.NET-native) if the
  team prefers C#. Pick one; document why. Same scenario file drives both services.
- **Micro-benchmarks** (optional but valuable): `BenchmarkDotNet` for hot paths — the `EntryMapper`
  (map a representative page graph) and serialization (STJ vs Task 14 alternatives). Reuse the
  test stack already in the repo (**xUnit 2.9 + FluentAssertions 8 + Moq 4**; add BenchmarkDotNet).
- **Metrics capture**: scrape the Task 12 OpenTelemetry metrics during runs (Contentful latency,
  cache fallback count, amplification) and App Insights for CPU/memory.

## 3. Methodology (make numbers trustworthy)
- Same host/sizing for both services; warm up before measuring; run N iterations, report
  median + variance; pin a fixed **input set** (the Task 08 fixtures: real slugs/categories/tags).
- **Isolate Contentful variance**: Contentful CDA is CDN-cached and rate-limited. Run enough warmups
  that CDA is warm; note CDA rate limits; consider a dedicated Contentful environment for load runs
  so you don't trip prod rate limits or pollute prod analytics. **Confirm target env before load.**
- Test three regimes: (a) steady moderate load, (b) spike (validates single-flight coalescing),
  (c) Contentful-down (validates fallback cache). Record each.
- Keep raw results as JSON/CSV in `artifacts/perf/` so the report is reproducible.

## 4. Deliverable A — Architecture overview (already drafted)
`docs/architecture-overview.html` (committed) explains the new design in simple terms with visuals
(request flow, components, before/after, caching, DoS defense). Keep it in sync if the design shifts.

## 5. Deliverable B — Final comparison report
Populate `docs/comparison-report.template.html` → `docs/comparison-report.html` from the run
artifacts. It must contain, for the team:
- **Executive summary**: parity result (% endpoints byte-identical), headline perf deltas
  (latency, payload, Contentful amplification), and a go/no-go recommendation.
- **Correctness parity** (from Task 08): pass/fail per endpoint, allowlist (should be empty).
- **Performance charts**: latency p50/p90/p99 old vs new (bar), payload size old vs new
  (raw + compressed), throughput, Contentful calls-per-request, CPU/memory.
- **Resilience**: behaviour under Contentful outage (old vs new success rate).
- **Maintainability/qualitative**: LOC removed (no `Gql*`/AutoMapper/`.graphql`), # projects,
  build time — the "cleaner/lighter" story.
- Provide a tiny generator (a script or `dotnet` tool) that reads `artifacts/perf/*.json` +
  Task 08 results and writes the numbers into the HTML (replace the `DATA` placeholder). Do **not**
  hand-edit numbers into the report.

## Acceptance criteria
- Reproducible benchmark scripts committed; raw artifacts saved.
- `comparison-report.html` generated from artifacts (not hand-typed), covering all endpoints +
  the metric set above, with charts.
- Architecture overview reviewed by the team and kept current.
- A one-page executive summary suitable for stakeholders.

## Out of scope
- Choosing/implementing protobuf or compression changes — that's Task 14 (this task supplies the
  numbers that decide it). Correctness parity mechanics — Task 08.
