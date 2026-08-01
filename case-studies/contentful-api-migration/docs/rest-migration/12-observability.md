# 12 — Observability: logging, tracing, metrics & health

**Objective.** Make failures obvious. Instrument the service with OpenTelemetry (traces + metrics +
structured logs) exported to Azure Monitor / Application Insights, with metrics that surface
Contentful health, cache fallback, attack signals, and mapping problems.

**Depends on:** 01. **Parallel with:** everything. **Consumed by:** host (09).

**Reference (old repo):** `ApplicationInsights` config, `TelemetryInitializer`, `HealthController`,
existing `ILogger` usage in the old provider/service.

---

## Deliverables

### 1. OpenTelemetry wiring (`AddCmsObservability`)
- Add OpenTelemetry with the **Azure Monitor** exporter (or OTLP if ops prefer a collector). Keep
  App Insights as the backend so existing dashboards/alerts continue to work.
- Instrument: ASP.NET Core, `HttpClient` (Contentful calls appear as spans), and a custom
  `ActivitySource`/`Meter` for the app. Enable trace/log correlation (trace + span ids on logs).
- Structured logging via `ILogger` with message templates (no string concatenation); scrub tokens
  and PII. Set sensible levels (Contentful failures = Warning/Error; allow-list rejections = Warning).

### 2. Custom metrics (the "is it working?" panel)
Emit at minimum:
- `contentful.request.duration` (histogram, tag: contentType, delivery/preview, outcome).
- `contentful.request.errors` (counter, tag: statusCode/exception).
- `circuit.state` (up/down gauge or state-change counter).
- `cache.fallback.served` (counter) — how often we served stale because Contentful failed.
- `cache.write.failures` (counter).
- `allowlist.rejected` (counter, tag: scope) — **attack signal**.
- `webhook.applied` / `webhook.rejected` (counters).
- `mapping.errors` (counter, tag: reason = unknownContentType | unresolvedLink | conversion).

### 3. Key log events
Contentful call success/failure + latency; circuit open/half-open/close; cache fallback served;
allow-list rejection (with slug + client info within privacy limits); webhook received/applied/
rejected; mapping errors (content type, entry id). Each correlated by trace id.

### 4. Health check
- `GET /Health` returns the same shape as old. Add a **Contentful reachability** check (a cheap CDA
  ping, cached briefly) as a `degraded` signal — but do **not** let a Contentful blip flip the pod to
  unhealthy and cause restarts; report `degraded`, not `unhealthy`, when only Contentful is down
  (the fallback cache still serves).
- Consider separate liveness (`/Health/live`) vs readiness (`/Health/ready`) if ops uses them.

### 5. Dashboards & alerts (doc + config)
- Provide a short `observability.md`: the metrics above, suggested App Insights workbook tiles, and
  alert rules — e.g. Contentful error-rate > X%, circuit open > N min, `cache.fallback.served`
  spiking, `allowlist.rejected` spiking (possible attack), `mapping.errors` > 0.

---

## Acceptance criteria
- Traces show end-to-end request → Contentful spans in App Insights; logs carry trace ids.
- All custom metrics emit and are visible; a smoke test asserts counters increment (e.g. force a
  Contentful failure → `cache.fallback.served` and `contentful.request.errors` increment).
- `/Health` green normally; reports `degraded` (not `unhealthy`) when Contentful is unreachable but
  cache can serve.
- `observability.md` with alert definitions committed.

## Out of scope
- Gateway/allow-list logic itself (10/11) — this task only instruments them.
