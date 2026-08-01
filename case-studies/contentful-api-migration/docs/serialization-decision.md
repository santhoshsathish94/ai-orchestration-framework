# Serialization & payload optimization — decision log (Task 14)

Companion to
[`docs/rest-migration/14-serialization-payload-optimization.md`](rest-migration/14-serialization-payload-optimization.md)
(the task spec — read its "honest analysis" section first). This log records what was actually
measured and decided, following that spec's own priority order: **compression first (cheap,
non-breaking), then gate everything else on real evidence of a bottleneck.**

Three separate decisions are recorded. Only the first is adopted.

| # | Decision | Status |
|---|---|---|
| 1 | HTTP response compression (Brotli + Gzip) | **Adopted** (already scaffolded in Task 09; a real config bug found and fixed in Task 14) |
| 2 | Internal fallback-cache payload format (MessagePack/protobuf instead of JSON text) | **Not adopted** — gate not met |
| 3 | Optional protobuf response via content negotiation | **Not adopted** — gate not met |

This log can and should be revisited once Task 13's live k6 load test (§1-3 of
[`13-performance-benchmark-and-reports.md`](rest-migration/13-performance-benchmark-and-reports.md),
never run in this sandbox — no reachable deployment) or Task 12's production observability
(`docs/observability.md`) produce real evidence for or against any of these, per each section's own
"what would change this" note below.

---

## 1. HTTP response compression — Adopted

### What

Brotli + Gzip response compression was already wired in `Program.cs` by Task 09
(`AddResponseCompression`/`UseResponseCompression`). Task 14's job was to verify it actually works
correctly at runtime, not just re-implement it — and that verification found and fixed one real bug.

### Verification performed

1. **Providers & HTTPS.** `BrotliCompressionProvider` and `GzipCompressionProvider` are both
   registered; `EnableForHttps = true` (required — every route this API serves is HTTPS-only in every
   real deployment target, so the framework default of `false` would silently disable compression
   entirely). This is a public-read CMS content API with no auth'd/secret-bearing response bodies, so
   the usual BREACH/CRIME caution against compressing dynamic HTTPS responses does not apply.
2. **Middleware order**, re-checked against the current (.NET 10) ASP.NET Core middleware-order
   reference rather than assumed correct from Task 09: `UseResponseCompression()` sits immediately
   after `UseAuthorization()` and before endpoint mapping, which matches Microsoft's own documented
   relative order (`UseCors` → `UseAuthentication` → `UseAuthorization` → `UseResponseCompression` →
   endpoints). **No change was needed here** — the existing placement was already correct.
3. **A real bug was found and fixed**: provider **registration order**. `ResponseCompressionProvider`
   (the real ASP.NET Core implementation — confirmed by reading
   `dotnet/aspnetcore`'s `ResponseCompressionProvider.cs`) breaks ties between two equally-acceptable
   encodings with `.OrderByDescending(quality).ThenBy(priority)`, where `priority` is each provider's
   **index in the registration list** — *not* the order the client lists them in `Accept-Encoding`.
   Task 09's code registered `GzipCompressionProvider` before `BrotliCompressionProvider`, so **every
   request whose `Accept-Encoding` accepted both at equal quality — the overwhelmingly common
   real-browser case (e.g. `gzip, deflate, br, zstd`, no explicit `q=` values) — silently got Gzip, the
   worse compressor, even though Brotli was equally acceptable and compresses this API's JSON
   meaningfully smaller** (see numbers below). This was invisible by inspection (both providers *were*
   registered, "compression was enabled") and would have been invisible to a unit test that didn't
   assert which encoding actually won a tie — exactly the class of "looks right in code, wrong at
   runtime" bug this migration has repeatedly hit in other middleware (see the Program.cs git history
   for the Task 09 preview/allow-list findings this pattern also matches). **Fixed** by registering
   Brotli first, matching Microsoft's own documented example order.
4. **Real HTTP round-trip tests added**:
   [`test/API.Contentful.UnitTests/Http/ResponseCompressionTests.cs`](../test/API.Contentful.UnitTests/Http/ResponseCompressionTests.cs)
   (`WebApplicationFactory<Program>`, 4 tests) — asserts `Content-Encoding`/`Vary` for `gzip` and `br`
   individually, asserts **no** `Content-Encoding`/`Vary` when the client sends no `Accept-Encoding` at
   all, and asserts Brotli wins when a client accepts both (this last one is what caught the bug above:
   it failed against the pre-fix code with `Content-Encoding: gzip` instead of the expected `br`).
5. **Live runtime verification** (not just the in-memory `WebApplicationFactory` test server — a real
   `dotnet run` + real Kestrel + real `curl.exe` HTTP requests, since this migration has previously
   found middleware that "looks right in code" but doesn't actually engage at runtime):

   ```
   > curl.exe -s -D - -o NUL -H "Accept-Encoding: gzip" http://localhost:15873/Health
   HTTP/1.1 200 OK
   Content-Type: application/json; charset=utf-8
   Content-Encoding: gzip
   Transfer-Encoding: chunked
   Vary: Accept-Encoding

   > curl.exe -s -D - -o NUL -H "Accept-Encoding: br" http://localhost:15873/Health
   HTTP/1.1 200 OK
   Content-Encoding: br
   Vary: Accept-Encoding

   > curl.exe -s -D - -o NUL -H "Accept-Encoding: gzip, deflate, br, zstd" http://localhost:15873/Health
   HTTP/1.1 200 OK
   Content-Encoding: br          <-- Brotli wins the realistic browser-header case, post-fix
   Vary: Accept-Encoding

   > curl.exe -s -D - -o NUL -H "Accept-Encoding:" http://localhost:15873/Health
   HTTP/1.1 200 OK
   (no Content-Encoding, no Vary)  <-- unaware/non-compressing clients are unaffected
   ```

   `Content-Length` is absent and `Transfer-Encoding: chunked` is used instead on compressed
   responses, matching the documented behavior (compression invalidates the precomputed length).

6. **No double-compression risk in this repo.** There is no reverse proxy, CDN, or nginx/Ingress
   configuration checked into this repository — `azure-pipelines.yml` only builds/tests (no deploy
   stage with a proxy config yet), and the `Dockerfile` runs Kestrel directly with no sidecar. This is
   therefore purely an **app-level** concern today. If/when this service is deployed behind a gateway,
   CDN, or ingress controller that also compresses (e.g. Front Door, an Nginx ingress with
   `gzip on`), whoever owns that layer should confirm it either forwards `Accept-Encoding` unmodified
   (some proxies, notably Nginx by default, strip it — a documented ASP.NET Core caveat) or is
   configured not to double-compress. Nothing to fix in this codebase; flagged for whoever configures
   the eventual deployment topology.

### Real compression numbers

Measured with `tools/measure-compression-ratio.ps1` — compresses every real, committed Task 08
contract-snapshot fixture (`test/API.Contentful.ParityTests/__snapshots__/*.json`, real
`CMSAPIResponse`-shaped JSON with rich text already rendered to HTML, i.e. exactly what a client
receives) with .NET's own `BrotliStream`/`GZipStream`. No live server or Contentful credentials
needed — reproducible with:

```powershell
pwsh tools/measure-compression-ratio.ps1
```

Single largest real sample (`blog-index.json`, a paged blog list with HTML-escaped titles/excerpts —
the most "realistic" shape among the current snapshots):

| | Size | vs. original |
|---|---:|---:|
| Original JSON | 4,826 bytes | — |
| Brotli (Fastest — the ASP.NET Core default level) | 721 bytes | **85.1% smaller** |

Aggregate across all 19 snapshot fixtures:

| Encoding | Total bytes | vs. original |
|---|---:|---:|
| Original | 22,171 bytes | — |
| Gzip (Fastest, the ASP.NET Core default) | 9,093 bytes | 59.0% smaller |
| **Brotli (Fastest, the ASP.NET Core default)** | **8,177 bytes** | **63.1% smaller** |
| Brotli (SmallestSize, reference only — not configured) | 6,003 bytes | 72.9% smaller |

This confirms the task spec's own prediction: for HTML-heavy CMS JSON, Brotli beats Gzip by a
meaningful margin (an extra ~4 points of reduction at the same "Fastest" level used in production),
which is exactly why the registration-order bug above mattered rather than being cosmetic.

### Compression level: left at framework default (not tuned)

`CompressionLevel` for both providers is left at the framework default (`Fastest`) rather than tuned to
`Optimal`/`SmallestSize`. The `SmallestSize` reference number above (72.9% vs. 63.1%) shows real upside
is available, but there is no load-test evidence (Task 13's k6 scenarios were written but never run
against a live deployment — see `loadtest/README.md`) that the extra per-request CPU cost is worth
paying at this traffic volume. Consistent with this task's own measure-first framing, this lever is
left alone for now; revisit once Task 13's load test or Task 12's production CPU/latency metrics exist.

---

## 2. Internal fallback-cache payload format (MessagePack vs. protobuf) — Not adopted

The task spec's own gate: *"only adopt if Task 13 shows cache size/latency is a real bottleneck."*

**That gate is not met**, so the decision is explicitly **not to change the cache format**, not to
silently skip the question:

- The fallback cache (Task 10) is `InMemoryFallbackCacheStore`, storing plain JSON **text** (a
  byte-identical serialization of the same response the client would get). The real Memcached-backed
  store was attempted in Task 09 and found infeasible in this sandbox (no access to the org's private
  NuGet feed needed for the Memcached client package) — so today there is no external cache transport
  where a compact binary format would even reduce network/storage bytes; it's all in-process memory.
- Task 13's only real, executed measurements are the `EntryMapper`/`JsonSerializer` micro-benchmarks
  (`benchmarks/README.md`): mapping ~16.5 μs, JSON serialization ~3.6 μs, combined ~21.2 μs per page,
  a few KB allocated. Nothing in that data — or anywhere else measured in this migration — shows cache
  read/write size or latency as a bottleneck; the dominant, unavoidable cost is the Contentful network
  round-trip the cache exists to fall back *away* from, not the cache format itself.
- MessagePack (schema-less, drops onto the existing POCOs with near-zero maintenance) remains the
  right choice **if and when** this gate is ever met — it is explicitly preferred over protobuf for
  this internal-only use case per the task spec's own recommendation, since protobuf would need
  `.proto`/annotated contracts kept in lockstep with the DTOs as they evolve, for a store whose shape
  is not part of the public contract anyway.

**What would change this**: real evidence from a live deployment that fallback-cache reads/writes
(size, GC pressure, or latency) are a measurable contributor to request latency or memory pressure —
something Task 12's `cache.fallback.served`/`cache.write.failures` metrics could surface in production,
or a real Memcached deployment (once the NuGet feed access gap is resolved) showing network-transfer
cost for the larger JSON payload matters.

---

## 3. Optional protobuf response via content negotiation — Not adopted

The task spec's own gate: *"only build this if Task 13 shows protobuf gives a meaningful end-to-end
win over compressed JSON for a real client. Otherwise stop after step 1."*

**That gate is not met either**, for the same reason step 1 (compression) was already predicted to be
the high-value lever:

- No specific high-volume consumer has asked for or been identified as needing protobuf.
- No measurement anywhere in this migration shows compressed JSON is insufficient for any real client.
  The compression numbers above (§1) show Brotli alone removes ~63-85% of payload bytes for this API's
  actual JSON shape; protobuf's main advantage over JSON is for numeric/struct-heavy payloads, and this
  task spec's own honest analysis already predicted (correctly, per §1's numbers) that a
  rich-text/HTML-string-dominated CMS payload would see only a "marginal" additional win from protobuf
  on top of compression — not measured directly here (no protobuf schema exists to compare against),
  but nothing has emerged during this migration to contradict that prediction.
- Building this for real would add ongoing maintenance cost (a schema — or a reflection/`protobuf-net`
  mapping — that must be kept in sync with every `Contracts` DTO change) for a benefit nobody has
  asked for and no measurement supports. That is exactly the kind of speculative, ungated complexity
  this task's own "honest analysis" section warns against.

**What would change this**: a real, identified high-volume consumer with measured evidence that
compressed JSON is a genuine bottleneck for it, surfaced by Task 12's production observability once
deployed, or by actually running Task 13's k6 load test (§1-3) against a live deployment and comparing
compressed-JSON latency/throughput against a real client's requirements.
