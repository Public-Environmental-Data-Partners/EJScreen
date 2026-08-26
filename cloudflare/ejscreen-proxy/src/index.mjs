const DEFAULT_UPSTREAM_ORIGIN = "https://pedp-ejscreen.azurewebsites.net";
const DEFAULT_BROWSER_TTL_SECONDS = 3600;
const DEFAULT_EDGE_TTL_SECONDS = 86400;
const STATIC_CACHE_TAG = "ejscreen-static";

const STATIC_EXTENSIONS = new Set([
  ".css",
  ".eot",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".png",
  ".svg",
  ".ttf",
  ".webp",
  ".woff",
  ".woff2",
]);

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function configuredUpstream(env = {}) {
  const upstream = new URL(env.UPSTREAM_ORIGIN || DEFAULT_UPSTREAM_ORIGIN);

  if (upstream.protocol !== "https:" || upstream.username || upstream.password) {
    throw new Error("UPSTREAM_ORIGIN must be an HTTPS origin without credentials");
  }

  upstream.pathname = "/";
  upstream.search = "";
  upstream.hash = "";
  return upstream;
}

export function upstreamUrlFor(requestUrl, env = {}) {
  const incoming = new URL(requestUrl);
  const upstream = configuredUpstream(env);
  upstream.pathname = incoming.pathname;
  upstream.search = incoming.search;
  return upstream;
}

export function isCacheableStaticRequest(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return false;
  }

  const pathname = new URL(request.url).pathname.toLowerCase();
  const filename = pathname.slice(pathname.lastIndexOf("/") + 1);
  const extensionIndex = filename.lastIndexOf(".");

  if (extensionIndex <= 0) {
    return false;
  }

  return STATIC_EXTENSIONS.has(filename.slice(extensionIndex));
}

function isRevalidatableHtmlResponse(
  request,
  responseStatus,
  responseHeaders,
) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return false;
  }

  const pathname = new URL(request.url).pathname.toLowerCase();
  const isExplicitHtml =
    pathname === "/" ||
    pathname.endsWith(".html") ||
    pathname.endsWith(".htm");
  const contentType = responseHeaders.get("Content-Type") || "";

  return (
    isExplicitHtml &&
    (responseStatus === 304 ||
      (responseStatus === 200 && /^text\/html(?:;|$)/i.test(contentType)))
  );
}

function setCookieValues(headers) {
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  if (typeof headers.getAll === "function") {
    return headers.getAll("Set-Cookie");
  }

  const value = headers.get("Set-Cookie");
  return value ? [value] : [];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function rewriteCookieDomains(headers, publicHostname, upstreamHostname) {
  const cookies = setCookieValues(headers);
  if (cookies.length === 0) {
    return;
  }

  const upstreamDomain = new RegExp(
    `(;\\s*Domain=)(?:\\.)?${escapeRegExp(upstreamHostname)}(?=;|$)`,
    "ig",
  );

  headers.delete("Set-Cookie");
  for (const cookie of cookies) {
    headers.append(
      "Set-Cookie",
      cookie.replace(upstreamDomain, `$1${publicHostname}`),
    );
  }
}

function rewriteOriginRedirect(headers, incomingUrl, upstreamUrl) {
  const location = headers.get("Location");
  if (!location) {
    return;
  }

  const redirect = new URL(location, upstreamUrl);
  if (redirect.origin !== upstreamUrl.origin) {
    return;
  }

  const publicRedirect = new URL(incomingUrl);
  publicRedirect.pathname = redirect.pathname;
  publicRedirect.search = redirect.search;
  publicRedirect.hash = redirect.hash;
  headers.set("Location", publicRedirect.toString());
}

function applyCachePolicy(headers, cacheMode, env = {}) {
  headers.delete("Cache-Tag");
  headers.delete("Cloudflare-CDN-Cache-Control");

  if (cacheMode === "revalidate-html") {
    headers.set("Cache-Control", "no-cache");
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    return;
  }

  if (cacheMode !== "static") {
    headers.set("Cache-Control", "no-store");
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    return;
  }

  const browserTtl = positiveInteger(
    env.STATIC_BROWSER_TTL_SECONDS,
    DEFAULT_BROWSER_TTL_SECONDS,
  );
  const edgeTtl = positiveInteger(
    env.STATIC_EDGE_TTL_SECONDS,
    DEFAULT_EDGE_TTL_SECONDS,
  );

  headers.delete("Set-Cookie");
  headers.set("Cache-Control", `public, max-age=${browserTtl}`);
  headers.set(
    "Cloudflare-CDN-Cache-Control",
    `public, max-age=${edgeTtl}, stale-if-error=0`,
  );
  headers.set("Cache-Tag", STATIC_CACHE_TAG);
}

export async function proxyRequest(request, env = {}, fetchImpl = fetch) {
  const incomingUrl = new URL(request.url);
  const upstreamUrl = upstreamUrlFor(request.url, env);
  const upstreamHeaders = new Headers(request.headers);

  upstreamHeaders.delete("Host");
  upstreamHeaders.set("X-Forwarded-Host", incomingUrl.host);
  upstreamHeaders.set("X-Forwarded-Proto", incomingUrl.protocol.slice(0, -1));

  const upstreamRequest = new Request(upstreamUrl, request);
  const forwardedRequest = new Request(upstreamRequest, {
    headers: upstreamHeaders,
    redirect: "manual",
  });

  let upstreamResponse;
  try {
    upstreamResponse = await fetchImpl(forwardedRequest);
  } catch {
    return new Response("EJScreen origin unavailable", {
      status: 502,
      headers: {
        "Cache-Control": "no-store",
        "Cloudflare-CDN-Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-EJScreen-Proxy": "cloudflare-worker",
      },
    });
  }

  const headers = new Headers(upstreamResponse.headers);
  let cacheMode = "no-store";
  if (
    (upstreamResponse.status === 200 || upstreamResponse.status === 304) &&
    isCacheableStaticRequest(request)
  ) {
    cacheMode = "static";
  } else if (
    isRevalidatableHtmlResponse(request, upstreamResponse.status, headers)
  ) {
    cacheMode = "revalidate-html";
  }

  rewriteOriginRedirect(headers, incomingUrl, upstreamUrl);
  rewriteCookieDomains(headers, incomingUrl.hostname, upstreamUrl.hostname);
  applyCachePolicy(headers, cacheMode, env);
  headers.delete("X-AspNet-Version");
  headers.delete("X-Powered-By");
  headers.set("X-EJScreen-Proxy", "cloudflare-worker");

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

export default {
  fetch(request, env) {
    return proxyRequest(request, env);
  },
};
