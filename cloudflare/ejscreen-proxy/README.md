# EJScreen Cloudflare origin proxy

This Worker replaces the redirect at `ejscreen.ejanalysis.com` with a reverse
proxy to the existing Azure App Service. It is deployment code for
[Public-Environmental-Data-Partners/EJScreen#74](https://github.com/Public-Environmental-Data-Partners/EJScreen/issues/74).

Merging this directory does **not** deploy the Worker, change DNS, disable the
current redirect, or purge a cache. Those production actions require a
Cloudflare operator and must follow the runbook below.

## Behavior

- The request path and query string are retained while the origin hostname is
  changed to `pedp-ejscreen.azurewebsites.net`. This gives Azure the `Host`
  value it requires.
- The original method, headers, and body are forwarded, including POST requests
  used by the ASP.NET handlers.
- Redirects back to the Azure origin are rewritten to the public hostname.
- Azure `ARRAffinity` cookie domains are rewritten for uncached responses so
  dynamic requests can retain origin affinity. Affinity cookies are removed
  from static responses so they do not prevent edge caching.
- Worker-output caching is enabled, with version-isolated cache entries.
  Only successful GET/HEAD requests for an explicit static extension allowlist
  are edge-cached. Explicit HTML files and `/` remain uncached at the edge but
  use `Cache-Control: no-cache` so browsers may retain and revalidate them while
  preserving Azure affinity cookies. `.aspx`, `.ashx`, unknown extensions,
  non-GET requests, and error responses return `Cache-Control: no-store`.
- ASP.NET implementation fingerprint headers are removed from proxied
  responses.

The explicit static allowlist is:

`css`, `eot`, `gif`, `ico`, `jpeg`, `jpg`, `js`, `png`, `svg`, `ttf`, `webp`,
`woff`, and `woff2`.

By default, browsers may retain those assets for one hour and Cloudflare may
retain them for one day. Change `STATIC_BROWSER_TTL_SECONDS` or
`STATIC_EDGE_TTL_SECONDS` in `wrangler.toml` deliberately; do not add HTML,
JSON, ASP.NET, or unknown paths to the allowlist.

## Local checks

From this directory:

```sh
corepack enable
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
pnpm test
pnpm run check
pnpm run deploy:dry-run
```

`wrangler dev --remote` can provide a pre-production Worker preview. Validate
proxy semantics in the preview before attaching the production route. Only the
real public route can establish the production `CF-Cache-Status: MISS` to `HIT`
acceptance result.

## Production cutover

Prerequisites:

- a Cloudflare API token/account with permission to edit Worker scripts and
  Worker routes for the `ejanalysis.com` zone;
- a reviewed `wrangler deploy --dry-run` result;
- an operator who can disable and restore the existing redirect rule.

The existing hostname is already proxied by Cloudflare. The route in
`wrangler.toml` attaches the Worker to that hostname; it does not require Azure
custom-domain access.

1. Record the existing redirect rule and DNS record so rollback is exact.
   Use Cloudflare Trace to identify which redirect product currently terminates
   the request. If its precedence over the Worker route is not confirmed, treat
   route attachment in the next step as the live cutover.
2. Deploy the Worker with `pnpm wrangler deploy`. If Trace confirmed that the
   redirect has precedence, leave it enabled while the Worker upload and route
   attachment complete. Otherwise, coordinate this step as the live cutover.
3. Disable the redirect that currently sends all paths to Azure `index.html`.
4. Run the smoke checks below immediately.
5. If any check fails, re-enable the redirect first, then investigate or roll
   back the Worker. Do not broaden caching to make a failing check pass.

## Smoke checks

Use a fresh cache-busting value for the first static request. Do not add it to
dynamic requests that expect specific parameters.

```sh
curl -sS -D - -o /dev/null 'https://ejscreen.ejanalysis.com/'
curl -sS -D - -o /dev/null 'https://ejscreen.ejanalysis.com/comparemapper.html?zip=20001'
curl -sS -D - -o /dev/null 'https://ejscreen.ejanalysis.com/ejscreenAPI.html'
curl -sS -D - -o /dev/null 'https://ejscreen.ejanalysis.com/ejsoefielddesc.html'

curl -sS -D - -o /dev/null 'https://ejscreen.ejanalysis.com/javascript/config.js?cache_probe=REPLACE_ME'
curl -sS -D - -o /dev/null 'https://ejscreen.ejanalysis.com/javascript/config.js?cache_probe=REPLACE_ME'

curl -sS -D - -o /dev/null 'https://ejscreen.ejanalysis.com/ejscreenRESTbroker1.aspx'
curl -sS -D - -o /dev/null 'https://ejscreen.ejanalysis.com/mobile/proxy.ashx'

curl -sS -D - -o /dev/null -X POST \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data 'title=proxy-probe&hiddenInput=method-and-body-preserved' \
  'https://ejscreen.ejanalysis.com/EchoHandler.ashx?check=true'
```

Expected results:

- `/` and each HTML deep link return their own content with no `Location`
  redirect and with `X-EJScreen-Proxy: cloudflare-worker`.
- `comparemapper.html?zip=20001` retains the query and launches the requested
  ZIP behavior.
- The repeated `config.js` request changes from `CF-Cache-Status: MISS` to
  `HIT` (an initial `EXPIRED` is also possible after invalidation).
- HTML and the root-level/nested ASP.NET handlers report `BYPASS` or another
  uncached status, never `HIT`, and do not return an `Age` header.
- HTML and `/` return browser `Cache-Control: no-cache`; ASP.NET handlers return
  `Cache-Control: no-store`.
- The POST probe returns CSV content containing the submitted values. It must
  not be changed into a GET or cached.
- No response exposes an Azure hostname in `Location`.
- No response exposes `X-Powered-By` or `X-AspNet-Version`.

## Deploy and purge cycle

Static assets carry the cache tag `ejscreen-static`, and Worker-output cache
keys use the public `ejscreen.ejanalysis.com` hostname. After an Azure content
deployment, purge only this site's cache through the Cloudflare dashboard
(`Caching` -> `Configuration` -> `Purge Cache` -> `Hostname`) or the API:

```sh
curl -sS -X POST \
  "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H 'Content-Type: application/json' \
  --data '{"hosts":["ejscreen.ejanalysis.com"]}'
```

Then repeat one static URL twice and confirm `MISS`/`EXPIRED` followed by
`HIT`. Also repeat the ASP.NET checks and confirm they remain uncached.

Do not use `purge_everything`: the `ejanalysis.com` zone also fronts services
whose caches are unrelated to EJScreen.

Worker caches are isolated by deployment version (`cross_version_cache =
false`), so a Worker deployment starts with an empty cache. Origin-only Azure
deployments do not create a new Worker version and still require the targeted
hostname purge above.

## Cloudflare references

- [Workers caching configuration](https://developers.cloudflare.com/workers/cache/configuration/)
- [Modify request properties when proxying](https://developers.cloudflare.com/workers/examples/modify-request-property/)
- [Wrangler routes configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Redirect execution order and Trace guidance](https://developers.cloudflare.com/rules/url-forwarding/)
- [Targeted cache purges](https://developers.cloudflare.com/cache/how-to/purge-cache/)
