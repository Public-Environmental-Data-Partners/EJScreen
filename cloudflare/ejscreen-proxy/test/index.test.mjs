import assert from "node:assert/strict";
import test from "node:test";

import {
  isCacheableStaticRequest,
  proxyRequest,
  rewriteCookieDomains,
  upstreamUrlFor,
} from "../src/index.mjs";

const PUBLIC_ORIGIN = "https://ejscreen.ejanalysis.com";
const AZURE_ORIGIN = "https://pedp-ejscreen.azurewebsites.net";

test("rewrites only the origin while retaining path and query", () => {
  const upstream = upstreamUrlFor(
    `${PUBLIC_ORIGIN}/comparemapper.html?zip=20001&mode=compare`,
  );

  assert.equal(
    upstream.toString(),
    `${AZURE_ORIGIN}/comparemapper.html?zip=20001&mode=compare`,
  );
});

test("allows only explicit static extensions on GET or HEAD", () => {
  const cacheable = [
    "/javascript/config.js?v=1",
    "/stylesheets/site.CSS",
    "/images/logo.png",
    "/mobile/fonts/site.woff2",
  ];
  const bypassed = [
    "/",
    "/index.html",
    "/ejscreenRESTbroker1.aspx",
    "/mobile/proxy.ashx",
    "/download.json",
    "/looks-like.js/handler",
  ];

  for (const path of cacheable) {
    assert.equal(
      isCacheableStaticRequest(new Request(`${PUBLIC_ORIGIN}${path}`)),
      true,
      path,
    );
  }

  for (const path of bypassed) {
    assert.equal(
      isCacheableStaticRequest(new Request(`${PUBLIC_ORIGIN}${path}`)),
      false,
      path,
    );
  }

  assert.equal(
    isCacheableStaticRequest(
      new Request(`${PUBLIC_ORIGIN}/javascript/config.js`, { method: "POST" }),
    ),
    false,
  );
});

test("forwards POST method, headers, and body to the Azure host", async () => {
  let captured;
  const fetchImpl = async (request) => {
    captured = {
      url: request.url,
      method: request.method,
      contentType: request.headers.get("Content-Type"),
      forwardedHost: request.headers.get("X-Forwarded-Host"),
      forwardedProto: request.headers.get("X-Forwarded-Proto"),
      body: await request.text(),
    };
    return new Response("probe,ok", {
      headers: {
        "Content-Type": "text/csv",
        "Set-Cookie": `ARRAffinity=abc; Path=/; Domain=${new URL(AZURE_ORIGIN).hostname}`,
      },
    });
  };

  const response = await proxyRequest(
    new Request(`${PUBLIC_ORIGIN}/EchoHandler.ashx?check=true`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "title=probe&hiddenInput=ok",
    }),
    {},
    fetchImpl,
  );

  assert.deepEqual(captured, {
    url: `${AZURE_ORIGIN}/EchoHandler.ashx?check=true`,
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    forwardedHost: "ejscreen.ejanalysis.com",
    forwardedProto: "https",
    body: "title=probe&hiddenInput=ok",
  });
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.match(response.headers.get("Set-Cookie"), /Domain=ejscreen\.ejanalysis\.com/i);
  assert.doesNotMatch(response.headers.get("Set-Cookie"), /azurewebsites\.net/i);
});

test("strips affinity cookies and sets separate browser and edge TTLs for static files", async () => {
  const originHeaders = new Headers({
    "CF-Cache-Status": "MISS",
    "Content-Type": "application/x-javascript",
  });
  originHeaders.append(
    "Set-Cookie",
    "ARRAffinity=abc; Path=/; Domain=pedp-ejscreen.azurewebsites.net",
  );
  originHeaders.append(
    "Set-Cookie",
    "ARRAffinitySameSite=abc; Path=/; Domain=pedp-ejscreen.azurewebsites.net",
  );

  const response = await proxyRequest(
    new Request(`${PUBLIC_ORIGIN}/javascript/config.js?v=1`),
    {
      STATIC_BROWSER_TTL_SECONDS: "600",
      STATIC_EDGE_TTL_SECONDS: "7200",
    },
    async () => new Response("const ready = true;", { headers: originHeaders }),
  );

  assert.equal(response.headers.get("Set-Cookie"), null);
  assert.equal(response.headers.get("Cache-Control"), "public, max-age=600");
  assert.equal(
    response.headers.get("Cloudflare-CDN-Cache-Control"),
    "public, max-age=7200, stale-if-error=0",
  );
  assert.equal(response.headers.get("Cache-Tag"), "ejscreen-static");
  assert.equal(response.headers.get("CF-Cache-Status"), "MISS");
});

test("forces HTML and ASP.NET responses out of every cache", async () => {
  for (const path of [
    "/comparemapper.html?zip=20001",
    "/ejscreenRESTbroker1.aspx",
    "/mobile/proxy.ashx",
    "/new-handler-without-extension",
  ]) {
    const response = await proxyRequest(
      new Request(`${PUBLIC_ORIGIN}${path}`),
      {},
      async () => new Response("dynamic"),
    );

    assert.equal(response.headers.get("Cache-Control"), "no-store", path);
    assert.equal(
      response.headers.get("Cloudflare-CDN-Cache-Control"),
      "no-store",
      path,
    );
    assert.equal(response.headers.get("Cache-Tag"), null, path);
  }
});

test("does not cache error responses under static-looking paths", async () => {
  const response = await proxyRequest(
    new Request(`${PUBLIC_ORIGIN}/missing.js`),
    {},
    async () => new Response("missing", { status: 404 }),
  );

  assert.equal(response.status, 404);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("rewrites Azure redirects back to the public hostname", async () => {
  const response = await proxyRequest(
    new Request(`${PUBLIC_ORIGIN}/old?x=1`),
    {},
    async () =>
      new Response(null, {
        status: 302,
        headers: { Location: `${AZURE_ORIGIN}/new?x=1` },
      }),
  );

  assert.equal(response.headers.get("Location"), `${PUBLIC_ORIGIN}/new?x=1`);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("preserves redirects to unrelated external hosts", async () => {
  const response = await proxyRequest(
    new Request(`${PUBLIC_ORIGIN}/external`),
    {},
    async () =>
      new Response(null, {
        status: 302,
        headers: { Location: "https://example.org/landing" },
      }),
  );

  assert.equal(response.headers.get("Location"), "https://example.org/landing");
});

test("returns an uncached 502 without exposing fetch errors", async () => {
  const response = await proxyRequest(
    new Request(`${PUBLIC_ORIGIN}/index.html`),
    {},
    async () => {
      throw new Error("private origin detail");
    },
  );

  assert.equal(response.status, 502);
  assert.equal(await response.text(), "EJScreen origin unavailable");
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("rewrites multiple Azure cookie domains without changing other domains", () => {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    "ARRAffinity=abc; Path=/; Domain=pedp-ejscreen.azurewebsites.net",
  );
  headers.append(
    "Set-Cookie",
    "external=1; Path=/; Domain=example.org",
  );

  rewriteCookieDomains(
    headers,
    "ejscreen.ejanalysis.com",
    "pedp-ejscreen.azurewebsites.net",
  );

  const cookies = headers.getSetCookie();
  assert.match(cookies[0], /Domain=ejscreen\.ejanalysis\.com/i);
  assert.match(cookies[1], /Domain=example\.org/i);
});
