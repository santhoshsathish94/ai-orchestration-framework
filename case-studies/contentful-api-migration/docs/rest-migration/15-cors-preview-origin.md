# 15 — CORS &amp; preview-origin restriction

**Objective.** Restrict which browser origins may call the API, and restrict the **preview** feature
(`isPreview=true`) to `preview.example.com`. (Scaffolded in the foundation — this task hardens and
tests it, and wires it to the real endpoints once they exist.)

**Depends on:** 01 (host). **Parallel with:** most. **Related:** 09 (host wiring), 11 (security), 12
(observability — log/metric rejections).

**Status:** initial implementation committed in the scaffold:
- `src/API.Contentful.Infrastructure/Security/CorsOptions.cs`
- `src/API.Contentful/Security/PreviewOriginMiddleware.cs`
- CORS policy + `UsePreviewOriginRestriction()` in `Program.cs`
- config in `appsettings*.json` (`CMS:Cors:AllowedOrigins`, `CMS:Cors:PreviewOrigins`)

---

## Requirements
- Only configured origins may call the API from a browser (CORS).
- `isPreview=true` is allowed **only** from `https://preview.example.com` (configurable).
- Must not break **server-side** (SSR) callers that legitimately fetch preview content without a
  browser `Origin`/`Referer` header — those remain gated by the **preview API key** (the real
  boundary; CORS/origin checks are browser-side defense-in-depth).

## Deliverables
1. **CORS policy** (done in scaffold): `WithOrigins(CMS:Cors:AllowedOrigins)`, methods `GET, OPTIONS`,
   any header. Confirm the preview API-key header name is permitted once auth (Task 09) lands.
2. **Preview-origin enforcement** (done in scaffold): reject preview requests whose `Origin`
   (or `Referer` fallback) is not in `CMS:Cors:PreviewOrigins`; **fail closed** if that list is
   empty; allow when no browser origin header is present (server-side) — API key still applies.
3. **Ordering**: `UseCors` → `UsePreviewOriginRestriction` → auth → endpoints. Verify the preview
   restriction runs before content is fetched (cheap rejection).
4. **Config**: production `PreviewOrigins = [ "https://preview.example.com" ]`; keep dev origins in
   `appsettings.Development.json` only.
5. **Observability** (with Task 12): emit a metric + warning log on every preview rejection and CORS
   preflight denial (possible misconfig or probing).
6. **Decision to confirm with the team:** should preview be *hard-restricted* to `preview.example.com`
   even for server-side calls (i.e. also enforce via an allowlisted server identity/IP or a required
   `Origin`)? If yes, tighten the middleware to fail closed when no origin header is present. Default
   here is lenient-for-SSR + API-key.

## Acceptance criteria
- Browser call from a non-allowed origin is blocked by CORS (no `Access-Control-Allow-Origin`).
- `?isPreview=true` with `Origin: https://preview.example.com` → allowed; any other origin → `403`.
- `?isPreview=true` with no `Origin`/`Referer` → passes origin check, still requires the preview API
  key (Task 09).
- Published (non-preview) requests are unaffected by the preview restriction.
- Unit/integration tests cover: allowed origin, disallowed origin, missing-origin (SSR), empty
  `PreviewOrigins` (fail closed).

## Out of scope
- The preview API-key authentication itself (Task 09). Rate limiting (gateway/CDN).
