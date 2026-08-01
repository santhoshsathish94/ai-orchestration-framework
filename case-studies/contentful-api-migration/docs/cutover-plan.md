# Cutover plan — `Legacy.CMS` (GraphQL) → `API.Contentful` (REST)

Concrete, filled-in version of the 6-step "Cutover plan" in
[`docs/rest-migration/09-hosting-config-cutover.md`](rest-migration/09-hosting-config-cutover.md), using
the real routes, config keys, health shape and webhook contract this migration actually built. This
plan describes **cutting over an already-*built* service** — it does not itself implement anything;
it is the runbook for taking `API.Contentful` from "builds and passes tests" to "serving real
production traffic," with an explicit, low-risk rollback at every step.

> Prerequisite reading: [`00-overview.md`](rest-migration/00-overview.md) (contract/architecture),
> [`08-validation-harness.md`](rest-migration/08-validation-harness.md) (parity harness),
> [`09-hosting-config-cutover.md`](rest-migration/09-hosting-config-cutover.md) (this doc's source plan).

## What this migration actually built (reference for the steps below)

### Route inventory (must resolve identically to the old service)

Every group below is mapped **twice** — once unversioned and once under `/v{version:apiVersion}/...`
(`Program.cs`, `Asp.Versioning.Http`, default/only version `1.0`) — except the internal webhook and
`/Health`, which are neither versioned nor content routes. All routes below except `/Page/slugs`, the
webhook, and `/Health` require the `CMSPreviewAccessPolicy` authorization policy (a no-op for ordinary,
non-preview traffic — see "Preview API key" below).

| Group | Method & route | Task |
|---|---|---|
| Page | `GET /Page?slug=&isPreview=` | 03 |
| Page | `GET /Page/slugs` *(anonymous)* | 03 |
| Section | `GET /Section?type=&isPreview=` | 04 |
| Blog | `GET /Blog?slug=&isPreview=` | 05 |
| Blog | `GET /Blog/getBlogsByCategory` | 05 |
| Blog | `GET /Blog/search` | 05 |
| Blog | `GET /Blog/getBlogsByTag` | 05 |
| Blog | `GET /Blog/getBlogsByAuthor` | 05 |
| Blog | `GET /Blog/getRecentBlogs` | 05 |
| Blog | `GET /Blog/getBlogs` | 05 |
| Blog | `GET /Blog/list` | 05 |
| HelpCenter | `GET /api/HelpCenter?slug=` | 06 |
| HelpCenter | `GET /api/HelpCenter/category` | 06 |
| HelpCenter | `GET /api/HelpCenter/tag` | 06 |
| HelpCenter | `GET /api/HelpCenter/search` | 06 |
| HelpCenter | `GET /HelpCenter/list` *(absolute route, no `/api` prefix)* | 06 |
| Glossary | `GET /Glossary/list` | 07 |
| Internal | `POST /internal/contentful/webhook` *(secured, anonymous at the ASP.NET Core layer)* | 11 |
| Health | `GET /Health` *(anonymous, unversioned)* | 12 |

Full field-level DTO shapes are unchanged from `Legacy.CMS` — see
[`00-overview.md` §5](rest-migration/00-overview.md#5-the-api-contract-must-not-change) and the two
flagged, sign-off-pending discrepancies in repo memory (camelCase-vs-legacy-PascalCase question, and
`CMSAPIResponse.StatusCode` omitted from the JSON body) — **resolve those before step 2 below**.

### `GET /Health` shape

Always **HTTP 200**. Body: `{ "status": "Healthy" }` when the Contentful reachability probe succeeds,
or `{ "status": "degraded" }` (still 200, never 5xx) when Contentful is unreachable but the fallback
cache can still serve. Never used as a liveness signal that Contentful itself is up — only that the
process is alive and able to serve *something*. See `HealthEndpoints.cs` /
`IContentfulHealthChecker`.

### Webhook contract

`POST /internal/contentful/webhook` — headers `X-Contentful-Webhook-Secret` (required, exact match
against `CMS:Contentful:WebhookSecret`), `X-Contentful-Webhook-Signature` (optional HMAC-SHA256 over
the raw body, same secret as key), `X-Contentful-Topic`. Returns `202 Accepted` on success,
`401 Unauthorized` on a missing/invalid secret or signature. Configure this exact header/secret pair on
the Contentful webhook itself (Settings → Webhooks). See `ContentfulWebhookProcessor.cs`.

### Preview API key

Header `X-Preview-Api-Key`, checked only when the request has `isPreview=true`, against
`CMS:API:PreviewApiKey`. CORS additionally restricts browser-originated `isPreview=true` calls to
`CMS:Cors:PreviewOrigins` (defense-in-depth; the API key is the real boundary — see
`docs/rest-migration/00-overview.md` §9a).

### Config keys the new environment must set (see `appsettings.json` for the full placeholder set)

Non-secret (already have safe defaults in `appsettings.json`, override per environment as needed):
`CMS:Provider`, `CMS:Contentful:{Environment,BaseDeliveryUrl,BasePreviewUrl,MaxInclude,
RequestTimeoutSeconds}`, `CMS:Cache:FireAndForgetMinIntervalSeconds`,
`CMS:AllowList:ReconcileIntervalMinutes`, `CMS:Cors:{AllowedOrigins,PreviewOrigins}`,
`CMS:Memcached:{Enabled,Server:Address,Server:Port,API:KeyPrefix}` (currently `Enabled:false` — no real
Memcached-backed `IFallbackCacheStore` ships yet, see the README's "Memcached" section),
`MappingOptions:MaxDepth`.

**Secrets (user-secrets/Key Vault/env vars ONLY, never appsettings):**
`CMS:Contentful:{SpaceId,DeliveryToken,PreviewToken,WebhookSecret}`, `CMS:API:PreviewApiKey`,
`ApplicationInsights:ConnectionString` (or the platform-injected
`APPLICATIONINSIGHTS_CONNECTION_STRING` env var — either is honored).

---

## Step 1 — Deploy the new service alongside the old one

- Stand up `API.Contentful` (container built from `src/API.Contentful/Dockerfile` — see
  `azure-pipelines.yml`) as an **independent** deployment: its own host/route or its own Kubernetes
  Service/Deployment, not replacing `Legacy.CMS` in place. No traffic is routed to it yet.
- Set every config key/secret listed above for the target environment. Confirm `GET /Health` returns
  `200 {"status":"Healthy"}` (or `"degraded"` if Contentful creds aren't valid yet — still 200, so this
  alone does not prove full readiness; move to step 2 regardless of which status shows, since
  `"degraded"` with no real traffic yet is expected until real Contentful creds are set).
- Provision the ACR repository / service connection / deployment environment the commented-out
  `PushAndDeploy` stage in `azure-pipelines.yml` currently stubs out with `<ANGLE_BRACKETED>`
  placeholders, then uncomment and fill in that stage.

## Step 2 — Task 08 parity + contract snapshots green against the shared environment

- Contract-snapshot tests (`test/API.Contentful.ParityTests/Snapshots`) already run in CI
  unconditionally (`azure-pipelines.yml`'s `ParityTests` stage) — confirm they stay green against the
  deployed build, not just locally.
- The **live old-vs-new diff** tests (`test/API.Contentful.ParityTests/LiveDiff`) need real
  credentials for both services plus a live Contentful space to run for real (they currently report
  `Skipped`, not `Passed`, in every environment set up so far — this is the first point in the rollout
  where that changes). Configure those credentials (a CI variable group, or a manual run against
  staging) and confirm every case in `test/API.Contentful.ParityTests/LiveDiff` actually executes
  and passes — a wall of `Skipped` must not be mistaken for a wall of `Passed`.
- Resolve the two flagged discrepancies (camelCase vs. legacy PascalCase; `CMSAPIResponse.StatusCode`
  omitted from the body) against a real `Legacy.CMS` response **before** trusting parity — if
  production is not camelCase, several already-merged tasks need rework first.
- Do not proceed to step 3 until this step is green.

## Step 3 — Point the Contentful webhook at the new service and seed the allow-list

- Add a **second** Contentful webhook (do not repoint the existing one yet — old and new must both
  keep working through the shadow/canary period in step 4) targeting the new service's
  `POST /internal/contentful/webhook`, with a custom header `X-Contentful-Webhook-Secret` set to the
  value configured as `CMS:Contentful:WebhookSecret`.
- On boot, `SlugAllowListReconcileService` already performs an immediate full-rebuild load from
  Contentful (fail-open: if that first load fails, the service serves all slugs through to the gateway
  rather than 404ing everything — see `ISlugAllowList`'s remarks) and repeats it every
  `CMS:AllowList:ReconcileIntervalMinutes` (default 15). Confirm at least one successful reconcile
  cycle has completed (structured log line) before trusting the allow-list is fully seeded, rather than
  relying solely on the fail-open default.

## Step 4 — Shadow/canary a small percentage of read traffic

- Mirror or split a small percentage of real, read-only traffic to the new service (exact mechanism —
  gateway traffic-splitting, a feature flag in the calling Next.js app, etc. — depends on infra not yet
  chosen; out of scope for this repo).
- Watch the Task 12 dashboards/alerts built for this
  ([`docs/observability.md`](observability.md)): Contentful error rate
  (`contentful.request.errors`), circuit-breaker state (`circuit.state`), cache-fallback rate
  (`cache.fallback.served`), **allow-list rejections** (`allowlist.rejected` — a spike here is a DoS
  signal, not just noise), and `mapping.errors` (should stay at zero — any nonzero rate means a content
  type or field is not mapping the way Task 02's DTOs expect).
- Increase the canary percentage gradually only while all of the above stay within the same bounds the
  old service exhibits today.

## Step 5 — Flip the upstream to the new service

- Repoint the actual upstream (API gateway route / Next.js CMS base URL / whatever currently targets
  `Legacy.CMS`) to `API.Contentful` for 100% of traffic.
- Repoint (or remove the old one and keep only) the Contentful webhook from step 3 so only the new
  service's allow-list stays current going forward.
- This is the point of no return for *new* content edits (the old service's allow-list, if still
  running, stops receiving webhook updates) — confirm step 4's dashboards are clean immediately after
  the flip, not just before it.

## Step 6 — Keep the old service warm, then retire it

- Keep `Legacy.CMS` deployed and running (but receiving no real traffic) for one full release cycle
  after step 5, as an instant rollback target — flipping the upstream back is the entire rollback
  procedure, no redeploy needed.
- **Rollback trigger criteria** (any one is sufficient): error rate materially above the old service's
  baseline, `mapping.errors` nonzero and not immediately explainable, or any confirmed contract/shape
  regression a client depends on that step 2 did not catch.
- After one clean release cycle with no rollback, retire `Legacy.CMS`: stop its deployment, remove
  its webhook (if not already removed in step 5), and archive/decommission its infra per normal
  end-of-life process. Do not delete its git history/repo — keep it as the reference implementation
  Task 08's parity suite was built against.
