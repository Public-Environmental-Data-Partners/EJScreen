/*
 * ejamapi_wake.js — wake the EJAM API when a user picks a Reports tool.
 *
 * EJSCREEN's reports come from the EJAM API (window.EJAM_API_BASE, set in
 * config.js). After a quiet period the API has no running container, and the
 * first report then waits about a minute while one starts. The first time a
 * user picks Drop a Pin, Draw an Area, Add a Path or Select an Area, this asks
 * the API's /warmup address to answer and does not wait for the answer, so the
 * API is starting while the user places the pin or draws the area.
 * See Public-Environmental-Data-Partners/EJAM#773 (part of EJAM#720).
 *
 * - Not when the site opens or the Reports tab opens: only on picking a tool.
 * - At most once per page load.
 * - Never delays or breaks the tool: it only listens for clicks (it does not
 *   change the tools' own handlers), and any error is ignored.
 * - The Cloudflare Worker in front of the API caches only GET /report, so
 *   /warmup always reaches the API.
 */
(function () {
    "use strict";

    // the four Reports tools (the outer buttons and the tool icons inside them)
    var TOOL_SELECTOR = "#dropPin, #pointTool, #addArea, #polyTool, #addPath, #lineTool, #selectArea";
    var sent = false;

    function wake() {
        if (sent) { return; }
        sent = true;
        try {
            var base = String(window.EJAM_API_BASE || "").replace(/\/+$/, "");
            if (!/^https?:\/\/[^\/]/.test(base) || typeof window.fetch !== "function") { return; }
            // 'no-cors': the answer is not read, so no CORS check is needed.
            window.fetch(base + "/warmup", { mode: "no-cors", cache: "no-store", credentials: "omit" })
                .catch(function () { /* API down or offline: ignore */ });
        } catch (e) { /* ignore */ }
    }

    function onClick(evt) {
        if (sent) { return; }
        var t = evt && evt.target;
        if (t && t.closest && t.closest(TOOL_SELECTOR)) { wake(); }
    }

    // capture phase, so it runs even if a tool's own handler stops the click
    document.addEventListener("click", onClick, true);
})();
