# EJScreen

  [![Code of Conduct](https://img.shields.io/badge/%E2%9D%A4-code%20of%20conduct-blue.svg?style=flat)](https://github.com/edgi-govdata-archiving/overview/blob/main/CONDUCT.md)

EJScreen is the environmental justice screening and mapping tool that utilizes standard and nationally consistent data to highlight places that may have higher environmental burdens and vulnerable populations.

This is an unofficial copy of EJScreen, hosted by the [Public Environmental Data Partners](https://screening-tools.com/). Some links and text may incorrectly suggest that this site is affiliated with the US Government. We've published an initial reconstruction - you can identify the EJScreen data and index percentiles for a given block group right now. Check back soon as we put more time and resources toward the functionality of EJScreen you might be used to. Thanks for your patience and support.

## Multisite selection and EJAM deep links

The Report tool can accumulate **multiple** selected places (points, drawn areas, or FIPS-code areas) into a list, and then:

- **Multisite Report** — produce an aggregate EJAM-style report over all of the selected places at once, via the [EJAM API](https://github.com/Public-Environmental-Data-Partners/EJAM-API).
- **Send to EJAM** — a **deep link** that launches the full [EJAM app](https://ejam.publicenvirodata.org/) pre-loaded with the selected places, ready to run. Points and FIPS codes travel directly in the URL (`?lat=&lon=`, `?fips=`); larger sets and drawn polygons use a token handoff so they are not limited by URL length.

The EJAM API and app endpoints are set in one place — `javascript/config.js` (`window.EJAM_API_BASE` / `window.EJAM_APP_URL`). For the deep-link URL vocabulary and parameter details, see the [EJAM-API](https://github.com/Public-Environmental-Data-Partners/EJAM-API) README and the EJAM package's "Defaults and Custom Settings for the Web App" article.

## Deep links into EJScreen (URL parameters)

The map app (`index.html`) can be launched with place(s) already selected for analysis, using the same parameter vocabulary the EJAM app and EJAM API use (these are the links EJAM's `url_ejscreenmap()` generates). One place opens the report popup on it; several places are drawn and also accumulated into the Multisite list, ready for a Multisite Report or Send to EJAM.

| Parameter | Example | What it does |
|---|---|---|
| `fips=` | `index.html?fips=10001` or `?fips=10001,10003` | Draws and selects the boundary of each FIPS area: 5-digit county, 11-digit tract, or 12-digit block group (mixes allowed, comma-separated). |
| `lat=` + `lon=` | `index.html?lat=39.1,39.7&lon=-75.5,-75.6&radius=3` | One or more points (comma-separated, equal lengths). Optional `radius=` is the buffer in miles used by reports (multisite default 3). |
| `polygon=` | `index.html?polygon=39.1,-75.5;39.2,-75.4;39.0,-75.3` | A polygon given as semicolon-separated `lat,lon` vertices (at least 3). Repeat `polygon=` for more than one polygon. `shape=`, `shp=`, and `shapefile=` are aliases (synonyms) for `polygon=`, matching the parameter aliases EJAM functions like `ejamit()` accept. |
| `zip=` | `index.html?zip=10001` or `?zip=10001,99501` | The explicit way to pass ZIP code(s), comma-separated: each is geocoded as a ZIP (never read as a county FIPS) and pinned; one ZIP centers the map, several fit the view to all of them. |
| `wherestr=` | `index.html?wherestr=Trenton,NJ` or `?wherestr=39.1,-75.5` | Legacy behavior: geocodes a place name / address / zip (or centers on a `lat,lon`) and drops a pin — except a bare 5-digit value, see below. |

Only one kind of place is used per link, in the order listed above (e.g., if `fips=` is present, `wherestr=` is ignored). State (2-digit) and city/CDP (7-digit) FIPS codes are not supported by the boundary-selection services, so links for those should use `wherestr=` with a place name instead.

**ZIP code vs county FIPS:** a bare 5-digit number is ambiguous — 10001 is both a Manhattan ZIP code and the county FIPS of Kent County, DE. Deep links resolve it explicitly: `fips=` is always county/tract/blockgroup FIPS, and `zip=` is always a ZIP code. A bare 5-digit `wherestr=` follows EJAM's convention: it is tried as a **county FIPS first** (drawing and selecting the county boundary), and only geocoded the old way (which reads 5 digits as a ZIP) if no county has that code. So prefer `fips=` and `zip=`; `?wherestr=10001,NY` also still forces the ZIP reading. The interactive search box inside the app is unchanged and still treats a bare 5-digit number as a ZIP code.

## Other helpful resources on EJScreen:

- First-time users may find the 5-minute [EJScreen in 5: A Quick Overview of EJScreen](https://web.archive.org/web/20241008150339/https://www.youtube.com/watch?v=HZp3AWDJt5A) video helpful as an introduction to the tool.
- [EJScreen User Guide](https://web.archive.org/web/20250121194015/https://ejscreen.epa.gov/mapper/help/ejscreen_help.pdf) for navigating the various features of the tool,
- [EJScreen Glossary](https://web.archive.org/web/20250123161322/https://www.epa.gov/ejscreen/ejscreen-map-descriptions) for better understanding the map layers and indicators being displayed in the tool, and
- [Frequent Questions about EJScreen](https://web.archive.org/web/20250123162243/https://www.epa.gov/ejscreen/frequent-questions-about-ejscreen)

## Repo Resources
- [Installing EJScreen locally](INSTALLATION.md)
- [Code of Conduct](CONDUCT.md)
- [Contributing](CONTRIBUTING.md)
- [Issues to work on or log](https://github.com/edgi-govdata-archiving/EJScreen/issues)