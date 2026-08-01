# 11 — DoS defense: slug allow-list + Contentful webhook

> **Status (2026-07-29):** The **slug allow-list** (startup load + periodic reconcile) is implemented
> and active. The **Contentful webhook** is **DEFERRED — future requirement** (per product, not
> needed for the initial UAT deploy). The webhook endpoint code exists but does not need to be
> configured/wired in Contentful now; the periodic reconcile keeps the allow-list fresh in the
> meantime.

**Objective.** Stop random-slug amplification attacks by rejecting unknown slugs **before** any
Contentful call, and keep the allow-list current via a secured Contentful webhook plus a periodic
reconcile. (Rate limiting itself is handled at the gateway/CDN — out of scope here.)

**Depends on:** 01 (provider slug enumeration), 03/05/06 (slug sources). **Parallel with:** most.
**Consumed by:** slug endpoints (Page, Blog-by-slug, HelpCenter article) and the host (09).

**Reference (old repo):** `GetAllPageSlugsAsync` + `AllPageSlugs` query (existing slug enumeration).

---

## Background
The recent attack hammered random slugs. With fallback-only caching, each unknown slug would be a
miss → a Contentful call → amplification. An allow-list makes unknown slugs cost ~nothing.

## Slug surface to cover
Slug-addressable content: **page** content types (landing/product/home/glossary/faq/helpCenter/
rightRail/discover), **blogPost**, **helpCenterArticle**. Categories/tags/authors are filter values,
not slugs — leave those to gateway/CDN rate limiting (record their miss-rates as metrics only).

## Deliverables

### 1. `ISlugAllowList`
- `bool IsAllowed(SlugScope scope, string slug)` where `scope ∈ {Page, Blog, Article}` (or a single
  combined set if the endpoints can't distinguish — match how the routes are keyed).
- Backed by an **in-memory** `HashSet<string>` (case-insensitive) per instance for O(1) checks.
- Loaded at **startup** from Contentful (enumerate slugs per content type via
  `?select=fields.slug&limit=1000&include=0`, paging by `skip`). Fail-open vs fail-closed on startup
  load failure is a **decision** — default **fail-open** (allow through to the gateway) so a
  Contentful blip doesn't 404 everything; log loudly + metric. Reconcile will fix it.

### 2. Endpoint integration
- Slug endpoints check `IsAllowed` first; not allowed → **404** immediately (same NotFound body as a
  genuine miss so the response is indistinguishable to clients), no gateway/Contentful call.
- Emit an **`allowlist.rejected`** metric + structured log (attack signal for Task 12).

### 3. Webhook endpoint `POST /internal/contentful/webhook`
- **Security (multi-layer):** validate a shared-secret header **and** verify the request signature
  (HMAC over the raw body using `CMS:Contentful:WebhookSecret`). Reject with 401 on mismatch. Do not
  reveal detail in the error. (Optionally also restrict by source IP at the gateway.)
- Parse Contentful publish/unpublish/delete events. For entries of a slug-bearing content type,
  add (publish) or remove (unpublish/delete) the slug from the in-memory set. Ignore unrelated
  content types and unknown payloads (return 202 without changes).
- **Idempotent**; never trust the payload to drive fetches blindly. Return **202 Accepted** quickly;
  do the update async. Emit `webhook.applied` / `webhook.rejected` metrics.
- **Multi-instance note:** the in-memory set is per instance, but a webhook hits one instance only.
  Options (pick one, document it): (a) publish the change to the shared Memcached allow-list + a
  version stamp that instances poll and merge; (b) rely on the periodic reconcile (below) to
  propagate within `ReconcileIntervalMinutes`; (c) fan-out. Simplest acceptable: **(a) shared store +
  version bump** so all instances converge fast.

### 4. Periodic reconcile
- A background `IHostedService` rebuilds the full allow-list every
  `CMS:AllowList:ReconcileIntervalMinutes` (default 15) from Contentful — safety net for missed
  webhooks and multi-instance drift. Swap the set atomically.

---

## Acceptance criteria
- Unit tests: unknown slug → 404 with no provider call; known slug → passes through; webhook with a
  valid signature adds/removes a slug; invalid signature → 401; reconcile rebuilds the set.
- Integration: a flood of random slugs produces **zero** Contentful calls (assert via provider spy)
  and increments `allowlist.rejected`.
- A newly published entry becomes reachable within one webhook (or one reconcile cycle), verified.

## Out of scope
- Rate limiting (gateway/CDN). Caching (Task 10). Filter-value (category/tag/author) validation.
