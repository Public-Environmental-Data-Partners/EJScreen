/*
 * multisite.js — accumulate multiple selected places and act on all of them.
 *
 * EJScreen's Report tool lets a user select ONE place at a time (Drop a Pin /
 * Draw an Area / Select an Area) and run a single EJScreen Community Report.
 * This module adds a small "basket" so the user can keep several selections and
 * then either:
 *   1) "Multisite Report" — open an EJAM-style aggregate report on ALL of them
 *      via the EJAM API: GET /report?...&sitenumber=0 for points/FIPS, or a
 *      POST /report with a GeoJSON FeatureCollection for drawn polygons, or
 *   2) "Send to EJAM" — POST the set to the EJAM API /handoff and open the full
 *      EJAM app pre-loaded with those places (supports polygons too).
 *
 * It is intentionally additive: each selection is snapshotted when the user
 * clicks "Add to Multisite list" in the site popup (see EJinfoWindow.js
 * _addToMultisite), so the existing single-selection draw/clear flow is left
 * untouched. One place-type at a time (all points, all areas, or all polygons),
 * matching EJAM's one-method-per-analysis model. Each selected FIPS is a
 * separate site.
 */
(function () {
    "use strict";

    // Endpoints. Overridable via globals (window.EJAM_API_BASE / window.EJAM_APP_URL)
    // so dev/stage/prod can be configured without editing this file. Trailing
    // slashes are normalized. EJAM_APP_URL keeps one trailing slash for "?..." appends.
    var EJAM_API_BASE = String(window.EJAM_API_BASE || "https://ejamapi-84652557241.us-central1.run.app").replace(/\/+$/, "");
    var REPORT_URL = EJAM_API_BASE + "/report";
    var EJAM_APP_URL = String(window.EJAM_APP_URL || "https://ejam.publicenvirodata.org/").replace(/\/+$/, "") + "/";
    // Open external tabs safely (no window.opener -> prevents reverse-tabnabbing).
    function openExternal(url) { return window.open(url, "_blank", "noopener,noreferrer"); }

    var items = [];           // accumulated descriptors
    var panel = null;         // floating UI panel

    var TYPE_LABEL = { point: "point", fips: "area", polygon: "drawn area" };

    function maxRadius() {
        return items.reduce(function (m, d) { return Math.max(m, d.radius || 0); }, 0);
    }

    function render() {
        if (!panel) { buildPanel(); }
        panel.style.display = items.length ? "block" : "none";
        var type = items.length ? items[0].type : null;
        var listHtml = items.map(function (d, i) {
            var name = d.label || (d.type === "fips" ? d.fips : (d.type === "point" ? (d.lat.toFixed(4) + ", " + d.lon.toFixed(4)) : "polygon"));
            return '<li style="margin:2px 0;">' + (i + 1) + '. ' + escapeHtml(name) +
                ' <a href="javascript:void(0)" data-ejms-remove="' + i + '" style="color:#b00;text-decoration:none;" title="Remove">✕</a></li>';
        }).join("");
        panel.querySelector("[data-ejms-count]").textContent =
            items.length + " " + (TYPE_LABEL[type] || "place") + (items.length === 1 ? "" : "s") + " selected";
        panel.querySelector("[data-ejms-list]").innerHTML = "<ul style='margin:4px 0;padding-left:18px;'>" + listHtml + "</ul>";
        var reportBtn = panel.querySelector("[data-ejms-report]");
        reportBtn.disabled = false;
        reportBtn.title = "Open an EJAM multisite report on all selected places";
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function buildPanel() {
        panel = document.createElement("div");
        panel.id = "ejMultisitePanel";
        panel.style.cssText = [
            "position:fixed", "bottom:16px", "right:16px", "z-index:10000",
            "background:#fff", "border:1px solid #888", "border-radius:6px",
            "box-shadow:0 2px 8px rgba(0,0,0,0.3)", "padding:10px 12px",
            "font:13px/1.4 Arial,sans-serif", "max-width:280px", "display:none"
        ].join(";");
        panel.innerHTML =
            '<div style="font-weight:bold;margin-bottom:4px;">Multisite selection</div>' +
            '<div data-ejms-count style="color:#444;"></div>' +
            '<div data-ejms-list style="max-height:140px;overflow:auto;"></div>' +
            '<div style="margin-top:6px;">' +
            '  <button data-ejms-report style="margin:2px 0;width:100%;">Multisite Report</button>' +
            '  <button data-ejms-send style="margin:2px 0;width:100%;">Send to EJAM</button>' +
            '  <button data-ejms-clear style="margin:2px 0;width:100%;">Clear list</button>' +
            '</div>';
        document.body.appendChild(panel);

        panel.querySelector("[data-ejms-report]").addEventListener("click", runReport);
        panel.querySelector("[data-ejms-send]").addEventListener("click", sendToEJAM);
        panel.querySelector("[data-ejms-clear]").addEventListener("click", function () { clear(); });
        panel.querySelector("[data-ejms-list]").addEventListener("click", function (e) {
            var idx = e.target.getAttribute("data-ejms-remove");
            if (idx !== null) { items.splice(parseInt(idx, 10), 1); render(); }
        });
    }

    function add(descriptor) {
        if (items.length && items[0].type !== descriptor.type) {
            alert("Multisite selection supports one type at a time (all points, all areas, or all drawn polygons). Clear the list to switch types.");
            return;
        }
        items.push(descriptor);
        render();
    }

    function clear() { items = []; render(); }

    function runReport() {
        if (!items.length) { alert("Add at least one place to the list first."); return; }
        var type = items[0].type;
        // Polygons can't fit in a GET URL, so they go via POST (see runReportPost).
        if (type === "polygon") { runReportPost(); return; }
        // Points and FIPS fit in a GET URL, so open the report directly in a new tab.
        var query;
        if (type === "point") {
            var lats = items.map(function (d) { return d.lat; }).join(",");
            var lons = items.map(function (d) { return d.lon; }).join(",");
            var buffer = maxRadius() || 3;
            query = "?lat=" + lats + "&lon=" + lons + "&buffer=" + buffer + "&sitenumber=0&fileextension=html";
        } else { // fips — each code is a separate site
            var fipsAll = items.map(function (d) { return d.fips; }).join(",");
            query = "?fips=" + encodeURIComponent(fipsAll) + "&sitenumber=0&fileextension=html";
        }
        openExternal(REPORT_URL + query);
    }

    function runReportPost() {
        // POST the polygon set (no URL-length limit) and render the returned HTML.
        // Open the tab synchronously on the click so it isn't popup-blocked, then
        // stream the report into it once the request resolves. We need the handle
        // to write into it (so can't use noopener), but we null its opener to keep
        // the returned report page from being able to reach back into this app tab.
        var w = window.open("", "_blank");
        if (w) { try { w.opener = null; w.document.write("<!doctype html><meta charset='utf-8'><p style='font:14px sans-serif;padding:1rem'>Generating multisite report…</p>"); } catch (e) {} }
        var payload = {
            shape: JSON.stringify({ type: "FeatureCollection", features: items.map(function (d) { return d.feature; }) }),
            buffer: maxRadius() || 0,
            sitenumber: 0,
            fileextension: "html"
        };
        fetch(REPORT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then(function (r) { return r.text(); })
          .then(function (html) {
              if (w) { w.document.open(); w.document.write(html); w.document.close(); }
              else { openExternal(URL.createObjectURL(new Blob([html], { type: "text/html" }))); }
          }).catch(function () {
              if (w) { try { w.document.body.innerHTML = "<p style='font:14px sans-serif;padding:1rem'>Sorry, the multisite report failed. Please try again.</p>"; } catch (e) {} }
              else { alert("Multisite report failed. Please try again."); }
          });
    }

    function buildHandoffPayload() {
        var type = items[0].type;
        var payload = {};
        var r = maxRadius();
        if (r) { payload.radius = r; }
        if (type === "point") {
            payload.method = "latlon";
            payload.sites = items.map(function (d) { return { lat: d.lat, lon: d.lon }; });
        } else if (type === "fips") {
            payload.method = "FIPS";
            payload.fips = items.map(function (d) { return d.fips; });
        } else if (type === "polygon") {
            payload.method = "SHP";
            payload.shape = { type: "FeatureCollection", features: items.map(function (d) { return d.feature; }) };
        }
        return payload;
    }

    function sendToEJAM() {
        if (!items.length) { alert("Add at least one place to the list first."); return; }
        var type = items[0].type;
        var payload = buildHandoffPayload();
        // POST the whole set; the API returns a token we hand to the EJAM app.
        // This is the only path that scales to many/large polygons (no URL limit).
        fetch(EJAM_API_BASE + "/handoff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then(function (r) { return r.json(); })
          .then(function (res) {
              if (res && res.token) {
                  openExternal(EJAM_APP_URL + "?handoff=" + encodeURIComponent(res.token));
              } else {
                  fallbackDirect(type, payload);
              }
          }).catch(function () { fallbackDirect(type, payload); });
    }

    // If the handoff POST fails, points and FIPS still fit directly in the URL.
    function fallbackDirect(type, payload) {
        if (type === "point") {
            var lats = payload.sites.map(function (s) { return s.lat; }).join(",");
            var lons = payload.sites.map(function (s) { return s.lon; }).join(",");
            var q = "?lat=" + lats + "&lon=" + lons + (payload.radius ? "&radius=" + payload.radius : "");
            openExternal(EJAM_APP_URL + q);
        } else if (type === "fips") {
            openExternal(EJAM_APP_URL + "?fips=" + encodeURIComponent(payload.fips.join(",")));
        } else {
            alert("Couldn't reach the EJAM API to hand off the drawn areas. Please try again in a moment.");
        }
    }

    // Public API used by EJinfoWindow.js
    window.EJmultisite = { add: add, clear: clear, count: function () { return items.length; } };
})();
