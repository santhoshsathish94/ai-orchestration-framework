# 10 — Content gateway: fallback caching & resilience

**Objective.** Build the `IContentGateway` that wraps `IContentProvider` with the **fallback-only**
caching model: always fetch live, fire-and-forget cache the last-known-good, serve stale only when
Contentful is unavailable, with a circuit breaker and single-flight coalescing. Preview is always
live.

**Depends on:** 01. **Parallel with:** 03–08, 11, 12. **Consumed by:** all endpoint tasks (03–07)
and the host (09).

**Reference (old repo):** `Core/Application/Service/ContentService.cs` (for cache keys, TTL intent,
and the stale-on-failure behaviour it already partially had), `CacheKeys`, `ICacheRepository` +
`Legacy.CMS.CacheRepository` (Memcached/Enyim).

---

## Design (see [00 §8](00-overview.md#8-caching-model--fallback-only-task-10))

```
GetAsync<T>(key, isPreview, Func<CancellationToken,Task<T?>> fetch, ct):
  if isPreview:                       return await fetch(ct)          // never cache drafts
  if circuit.IsOpen:                  return ServeFromCache(key)      // fast fallback, skip Contentful
  try:
     result = await SingleFlight(key, () => fetch(ct))               // coalesce duplicate concurrent
     _ = FireAndForgetWrite(key, result)                             // async, throttled, best-effort
     return result
  catch (Contentful failure/timeout):
     circuit.RecordFailure()
     cached = ServeFromCache(key)
     return cached ?? throw  (endpoint maps to 503 problem+json)
```

## Deliverables

### 1. `IContentGateway`
- A single generic entry: `Task<T?> GetAsync<T>(string cacheKey, bool isPreview,
  Func<CancellationToken, Task<T?>> fetch, CancellationToken ct)`.
- Cache keys reuse the old `CacheKeys` conventions (`page:{slug}:{isPreview}`,
  `blog:{slug}:{isPreview}`, `section:{type}:{isPreview}`, list keys, etc.) — **copy `CacheKeys`**.

### 2. Fire-and-forget write (throttled)
- Write mapped result to Memcached as last-known-good with **no/long TTL**.
- Throttle: skip the write if the key was refreshed within
  `CMS:Cache:FireAndForgetMinIntervalSeconds` (store a per-key last-write timestamp, e.g. a short
  in-memory `MemoryCache` marker) to avoid write amplification under load.
- Never block or fail the response on a cache write error (log + metric only).

### 3. Circuit breaker + timeout
- Use the resilience handler on the HttpClient (Task 01) for transport-level breaking, **and** a
  gateway-level breaker keyed on Contentful health so the gateway can short-circuit straight to
  cache without attempting a call when open.
- Timeout = `CMS:Contentful:RequestTimeoutSeconds`. On timeout → treat as failure → fallback.

### 4. Single-flight coalescing
- Deduplicate concurrent identical (`cacheKey`) fetches into one Contentful call (e.g. keyed
  `SemaphoreSlim`/`Lazy<Task>` map, or `HybridCache` stampede protection used only as a coalescer).
  Protects Contentful during spikes.

### 5. Serialization for the store
- Store the **mapped DTO** (or its JSON) so a fallback serve does not require re-calling Contentful
  or re-mapping. On read, deserialize to the requested `T`. Ensure the stored JSON uses the same
  options as the wire (camelCase, ignore nulls) so a fallback response is byte-identical to a live
  one.

### 6. Wire endpoints through the gateway
- Endpoints (03–07) call `gateway.GetAsync(key, isPreview, ct => provider.GetXxx(...), ct)`.
- The `Section` default-JSON fallback (Task 04) plugs in as the cache-miss branch for
  `header`/`footer`.

---

## Acceptance criteria
- Unit tests (fake provider + in-memory store) prove: live success returns fresh + writes cache;
  provider failure returns cached; cache miss on failure surfaces the 503 path; preview bypasses
  cache; write throttling skips rapid re-writes; single-flight collapses N concurrent calls into 1;
  open circuit serves cache without calling the provider.
- A fallback-served response is **byte-identical** to the live response for the same input.
- Metrics emitted for: cache-fallback-served, circuit state changes, write failures (Task 12).

## Out of scope
- The allow-list/webhook (Task 11) — a separate pre-check before the gateway. Provider fetch/mapping
  (01, 03–07).
