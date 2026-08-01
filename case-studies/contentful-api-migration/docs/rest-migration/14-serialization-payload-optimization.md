# 14 — Serialization & payload optimization (compression + optional protobuf)

**Objective.** Make responses smaller/faster **without breaking the JSON contract**, and evaluate
protobuf honestly. Decisions here are **gated by Task 13 benchmarks** — measure before adopting.

**Depends on:** 03–07 (endpoints), 13 (numbers). **Parallel with:** 09–12.

---

## The honest analysis (read before building)

- The **public contract is JSON** over HTTP. Replacing it with **gRPC/protobuf as the primary
  protocol would break every existing client** (web/Next.js, any mobile/consumers) and is therefore
  **out of scope** for "don't break the API."
- CMS responses are **dominated by rendered HTML strings** (rich text → HTML). Protobuf's encoding
  advantage is largest for numeric/struct-heavy data; for large strings it is **marginal**.
  **HTTP compression (Brotli/Gzip)** typically shrinks HTML-heavy JSON far more than switching to
  protobuf would. So: **compression is the high-value, zero-risk win; protobuf is a maybe.**
- Therefore this task is **measure-first** and strictly **additive**.

## Deliverables (in priority order)

### 1. Response compression (do this first — cheap, non-breaking)
- Enable ASP.NET Core response compression with **Brotli + Gzip** (respect `Accept-Encoding`).
- Ensure it is safe behind the CDN/gateway (correct `Vary: Accept-Encoding`; don't double-compress;
  mind BREACH/CRIME considerations for auth'd responses — CMS content is public read, low risk).
- Benchmark payload before/after (Task 13). Expect the majority of the size win here.

### 2. Internal fallback-cache payload format (optional, internal-only)
- The Memcached last-known-good store (Task 10) is **internal** — its format is not the contract, so
  a compact binary encoding is safe to change.
- Evaluate **MessagePack** (schema-less, works with the existing POCO DTOs — low maintenance) vs
  **protobuf** (needs `.proto`/annotated contracts — higher upkeep as DTOs evolve). **Recommend
  MessagePack** here if a change is warranted; only adopt if Task 13 shows cache size/latency is a
  real bottleneck. Store must round-trip to a **byte-identical JSON** response on fallback.

### 3. Optional protobuf response representation (only if numbers justify)
- If a specific high-volume consumer would benefit, expose protobuf **via content negotiation**:
  `Accept: application/x-protobuf` returns protobuf; everything else stays JSON. **Purely additive**,
  opt-in, no change for existing clients.
- Requires a proto schema for the response DTOs (or a reflection/`protobuf-net` approach that maps
  the existing POCOs). Keep it behind a feature flag; add parity tests that the protobuf payload
  deserializes to a DTO **equal** to the JSON one.
- **Gate:** only build this if Task 13 shows protobuf gives a meaningful end-to-end win over
  compressed JSON for a real client. Otherwise **stop after step 1** and record the decision.

## Decision log
Record the outcome in `docs/serialization-decision.md`: measured sizes/latencies for
JSON vs JSON+Brotli vs (MessagePack cache) vs (protobuf response), and the go/no-go for each.

## Acceptance criteria
- Brotli/Gzip enabled and measured; `Vary` correct; no double-encoding; JSON contract unchanged.
- If adopted: internal cache format change round-trips to byte-identical JSON (Task 08 still green).
- If adopted: protobuf is opt-in via `Accept`, feature-flagged, with equality tests vs JSON, and
  **zero** change to default JSON responses.
- Decision log committed with the numbers behind each choice.

## Out of scope
- Replacing the JSON contract or adopting gRPC. Any client-side changes.
