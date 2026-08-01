# Observability

How this service (`API.Contentful`) is instrumented, what each signal means, and how to turn it
into dashboards/alerts in Azure Monitor / Application Insights. See
[`docs/rest-migration/12-observability.md`](rest-migration/12-observability.md) for the original task spec.

## Wiring

`AddCmsObservability(IServiceCollection, IConfiguration)`
(`API.Contentful.Infrastructure.Extensions.ServiceCollectionExtensions`) registers:

- **`CmsMetrics`** — a singleton wrapping one `Meter`/`ActivitySource`, both named `API.Contentful`
  (`CmsMetrics.MeterName`). Every collaborator below is constructor-injected with it.
- **`IContentfulHealthChecker`** — backs `GET /Health`'s Contentful-reachability signal.
- **OpenTelemetry**: ASP.NET Core + `HttpClient` auto-instrumentation (Contentful calls appear as spans
  automatically) plus the custom `Meter`/`ActivitySource` above, for both tracing and metrics.
- A **conditional Azure Monitor exporter**: only added when `ApplicationInsights:ConnectionString`
  (appsettings/user-secrets convention) or `APPLICATIONINSIGHTS_CONNECTION_STRING` (the value Azure App
  Service/Container Apps auto-injects) is set and not `"DISABLED"`. With neither set, the app boots and
  runs normally — metrics/traces are simply never exported anywhere (no crash, no missing DI
  registration); this is how local dev/CI runs.

No separate `.WithLogging(...)` call: the app logs exclusively via `ILogger<T>`, and the Azure Monitor
exporter (when enabled) attaches trace/span ids to every log scope on its own — logs, traces, and metrics
for one request all share the same trace id in App Insights.

## Metrics

All are on the `API.Contentful` meter. Counters are monotonically-increasing `long`; the one
histogram records `double` milliseconds.

| Metric | Type | Tags | Recorded by | Meaning |
|---|---|---|---|---|
| `contentful.request.duration` | Histogram (ms) | `content_type`, `preview` (bool), `outcome` (`success`\|`failure`) | `ContentfulRestClient.GetEntriesAsync` | Latency of every Contentful Content Delivery/Preview API call, success or failure. |
| `contentful.request.errors` | Counter | `status_code` (numeric HTTP status as a string, e.g. `"503"`, or a CLR exception type name, e.g. `"TaskCanceledException"`, for failures with no HTTP response) | `ContentfulRestClient.GetEntriesAsync` | A Contentful call failed. |
| `circuit.state` | Counter | `state` (`open`\|`closed`\|`half_open`) | `ContentGateway`'s Polly circuit-breaker `OnOpened`/`OnClosed`/`OnHalfOpened` callbacks | A content-gateway circuit-breaker state transition. One event per transition, not a level/gauge — see the "Circuit open too long" alert rule below for how to turn this into a duration signal. |
| `cache.fallback.served` | Counter | none | `ContentGateway.ServeFromCacheOrThrowAsync` | A request was served from the fallback cache because the live Contentful fetch (or an open circuit) failed. |
| `cache.write.failures` | Counter | none | `ContentGateway.WriteAsync` | A fire-and-forget write to the fallback cache failed. |
| `allowlist.rejected` | Counter | `scope` (`Page`\|`Blog`\|`Article`) | `SlugAllowList.IsAllowed` | A slug was rejected by the allow-list before any Contentful call was attempted — **possible attack/scraping signal** (see alert below). |
| `webhook.applied` | Counter | none | `ContentfulWebhookProcessor.Process` | A Contentful webhook call passed validation and updated the slug allow-list. |
| `webhook.rejected` | Counter | none | `ContentfulWebhookProcessor.Process` | A Contentful webhook call failed the shared-secret or HMAC signature check. |
| `mapping.errors` | Counter | `reason` (`unknownContentType`\|`unresolvedLink`\|`conversion`) | `EntryMapper` (`conversion`, `unknownContentType`) and `EntryGraph.ResolveLinkValue` (`unresolvedLink`) | A silent entry-mapping failure. These code paths **never throw or change what is returned** (a bad/unresolvable field has always silently mapped to `null`/an omitted list item) — this metric makes an otherwise-invisible content-model problem visible. Should be ~0 in normal operation; see alert below. |

Traces: every Contentful HTTP call appears as an `HttpClient` span; a request's full path (ASP.NET Core
span → Contentful spans) is visible in the App Insights transaction view via the shared trace id, which
also appears on every correlated `ILogger` log line.

## Health check

`GET /Health` (`API.Contentful.Endpoints.HealthEndpoints`) always returns **HTTP 200** with
`{ "status": "Healthy" | "degraded" }`:

- `"degraded"` when `IContentfulHealthChecker.IsHealthyAsync()` — a cheap `limit=0` CDA ping (content type
  `landingPage`), cached for 15s, and deliberately bypassing `IContentGateway` so it reflects real
  Contentful reachability rather than "is anything cached anywhere" — reports Contentful unreachable.
- A Contentful outage **must never** turn `/Health` into a non-200 response: the fallback cache can still
  serve traffic, so flipping to unhealthy would cause an orchestrator (Kubernetes, App Service) to
  restart/drain a pod that is still doing useful work.

## Suggested App Insights workbook tiles

1. **Contentful request rate & error rate** — `contentful.request.duration` count vs.
   `contentful.request.errors` count, as a ratio over time, split by `content_type`.
2. **Contentful latency (p50/p95/p99)** — percentiles of `contentful.request.duration`, split by
   `outcome`.
3. **Circuit breaker timeline** — `circuit.state` events over time (annotate `open`/`half_open`/`closed`
   transitions on the request-rate chart above to visually correlate breaker trips with error spikes).
4. **Cache fallback & write health** — `cache.fallback.served` rate (how often Contentful is actually
   down in practice) and `cache.write.failures` count (fallback cache itself unhealthy).
5. **Allow-list rejections by scope** — `allowlist.rejected` count split by `scope`; a dedicated
   "possible attack" tile, since a legitimate client never hits a rejected slug repeatedly.
6. **Webhook activity** — `webhook.applied` vs `webhook.rejected` over time; a sustained run of
   `rejected` with no `applied` suggests a misconfigured/rotated shared secret.
7. **Mapping errors by reason** — `mapping.errors` split by `reason`; expected to be flat zero, so any
   non-zero series is immediately visible.
8. **`/Health` status** — latest status per instance (via an availability test hitting `/Health`, or a
   log-based tile on the `health.degraded` warning log).

## Suggested alert rules

| Alert | Signal | Suggested condition | Why |
|---|---|---|---|
| Contentful error rate | `contentful.request.errors` / `contentful.request.duration` count | > 10% over 5 min | Contentful (or the network path to it) is degrading before the circuit breaker or fallback cache fully masks it. |
| Circuit open too long | `circuit.state` (`state=open`) | An `open` event with no subsequent `closed` within N minutes (e.g. 10) | The breaker's own `BreakDuration` is 30s — if it keeps re-opening instead of staying `closed`, Contentful is down for an extended period and the fallback cache is carrying all traffic. |
| Cache-fallback spike | `cache.fallback.served` | Rate increase vs. trailing baseline (e.g. > 5x over 15 min) | Confirms/quantifies a live Contentful outage; pairs with the circuit-open alert. |
| Allow-list rejection spike | `allowlist.rejected` | Rate increase vs. trailing baseline (e.g. > 10x over 5 min), any `scope` | **Attack signal**: a burst of rejected slugs looks like enumeration/scraping against unpublished content, not normal traffic. |
| Mapping errors present | `mapping.errors` | > 0 sustained over 15 min (any `reason`) | Should never happen steady-state; indicates a Contentful content-model change (new/renamed content type, changed field shape) the mapper doesn't know about yet. |

## `mapping.errors` and `EntryMapper`'s constraints

`EntryMapper`/`EntryGraph` are reflection-driven, attribute-configured, and **deliberately never throw**
on a bad/missing/unresolvable field — that silent-skip behavior is load-bearing (a single malformed field
on one entry must not 500 an entire page). `CmsMetrics` was added as a plain constructor dependency
(`EntryMapper(IContentTypeRegistry, IRichTextRenderer, IOptions<MappingOptions>, CmsMetrics)` and
`EntryGraphResolver`/`EntryGraph` similarly) so the three existing silent-failure branches could each grow
one extra `_metrics.RecordMappingError(reason)` call **without changing their control flow or return
values at all** — every mapping test written before Task 12 still passes unmodified against the exact
same inputs/outputs; only new tests assert the metric itself.
