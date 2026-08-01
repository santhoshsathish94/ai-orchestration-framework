# 09 — Hosting, config & cutover

**Objective.** Stand up the Minimal API host (`API.Contentful`), wire DI/middleware/auth/config to
match the old service's behaviour, containerize, and define a safe, reversible cutover.

**Depends on:** 01 (and consumes 10/11/12 wiring). **Parallel with:** 03–08.

**Reference (old repo):** `Presentation/Legacy.CMS/Program.cs`, `Dockerfile`, `appsettings*.json`,
`deploy/`, `Common/{Authentication,Authorization,Middleware,Initializers}`, `HealthController`,
`FacadeConfiguration`, and the pipeline files under the old repo root / `deploy/`.

---

## Deliverables

### 1. Minimal API host (`Program.cs`)
- .NET 10 Minimal API. `builder.Services`:
  - `AddContentfulRest(...)` (Task 01), `AddContentGateway(...)` (Task 10),
    `AddSlugAllowList(...)` (Task 11), `AddCmsObservability(...)` (Task 12).
  - `ConfigureHttpJsonOptions`: camelCase + `DefaultIgnoreCondition = WhenWritingNull`
    (+ STJ source-gen context). This is the **contract**.
  - API versioning: `Asp.Versioning.Http` + `ApiExplorer`, default `1.0`, so `v1/...` route
    variants exist (match old).
  - Auth: preview API-key scheme + `CMSPreviewAccessPolicy` (+ handlers) — port
    `Common/Authentication` & `Common/Authorization`.
  - **CORS + preview-origin** (Task 15, already scaffolded): `AddCors` policy from
    `CMS:Cors:AllowedOrigins`; `app.UseCors(...)` then `app.UsePreviewOriginRestriction()` before
    auth/endpoints.
  - `IHttpContextAccessor`, response compression, forwarded headers, exception-handling middleware
    (return the same error bodies as old).
  - `CultureInfo.DefaultThreadCurrentCulture = en-US`.
- Map the endpoint groups from tasks 03–07, the webhook (Task 11), and health (Task 12). Each group
  applies the preview policy (except `/Page/slugs`, anonymous, and the webhook, which uses its own
  secret auth).
- **Do not** register AutoMapper or any GraphQL service.

> Middleware order: `UseCors` → `UsePreviewOriginRestriction` → auth → (allow-list check) → endpoints.

### 2. Config
- `appsettings.json` + env: all keys in [00 §12](00-overview.md#12-config-keys). Keep existing
  `CMS:Contentful:{SpaceId,Environment,DeliveryToken,PreviewToken}`, `CMS:Memcached:*`,
  `ApplicationInsights:*`, `MappingOptions:MaxDepth`, `FacadeConfiguration`. Add REST hosts,
  `MaxInclude`, `RequestTimeoutSeconds`, `WebhookSecret`, cache/allow-list intervals, and
  `CMS:Cors:{AllowedOrigins,PreviewOrigins}` (Task 15).
- Set `CMS:Provider = ContentfulRest`.
- Document required secrets (delivery + preview tokens, memcached, AI/OTel key, webhook secret) in
  the repo README; never commit secrets.

### 3. Memcached
- Reuse the existing Memcached infra via `Example.Memcached` (Enyim). Register the
  client with the same server config + key prefix as old. It is used **only** as the fallback
  last-known-good store (Task 10) — correctness never depends on it.

### 4. Health
- Port/replicate `HealthController` behaviour as a Minimal API `GET /Health` (Task 12 adds the
  Contentful-reachability check). Response shape must match old.

### 5. Container & pipeline
- Author a `Dockerfile` for the new layout (multi-stage, .NET 10 SDK/runtime). Port `deploy/`
  manifests and the CI/CD pipeline (build → unit tests → parity + contract-snapshot tests →
  containerize → push → deploy). Keep image name/registry conventions per ops.

### 6. Cutover plan
1. Deploy new service alongside old (new host/route or new K8s service).
2. Task 08 parity + contract snapshots green against the shared environment.
3. Configure the **Contentful webhook** (Task 11) to point at the new service and seed the allow-list.
4. Shadow/canary a small % of read traffic; watch the Task 12 dashboards (error rate, cache-fallback
   count, allow-list rejections, Contentful latency).
5. Flip the upstream (gateway / Next.js CMS base URL) to the new service.
6. Keep old service warm for one release cycle for instant rollback, then retire.

> Pipeline preference: **ask which branch to run before triggering any Azure DevOps pipeline**, and
> share the PR/run URL after creating/triggering.

---

## Acceptance criteria
- New service boots with config only (no code change) per environment; `/Health` green.
- All route variants (incl. `v1/...`, `/api/HelpCenter`, `/HelpCenter/list`) resolve identically.
- Container builds & runs; pipeline green including parity + snapshot tests.
- Documented, reversible cutover with a rollback step and webhook setup.

## Out of scope
- Endpoint logic (03–07), gateway internals (10), allow-list/webhook internals (11), observability
  internals (12).
