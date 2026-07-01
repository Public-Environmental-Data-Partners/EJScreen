# EJScreen

  [![Code of Conduct](https://img.shields.io/badge/%E2%9D%A4-code%20of%20conduct-blue.svg?style=flat)](https://github.com/edgi-govdata-archiving/overview/blob/main/CONDUCT.md)

EJScreen is the environmental justice screening and mapping tool that utilizes standard and nationally consistent data to highlight places that may have higher environmental burdens and vulnerable populations.

This is an unofficial copy of EJScreen, hosted by the [Public Environmental Data Partners](https://screening-tools.com/). Some links and text may incorrectly suggest that this site is affiliated with the US Government. We've published an initial reconstruction - you can identify the EJScreen data and index percentiles for a given block group right now. Check back soon as we put more time and resources toward the functionality of EJScreen you might be used to. Thanks for your patience and support.

## Multisite selection and EJAM deep links

The Report tool can accumulate **multiple** selected places (points, drawn areas, or FIPS-code areas) into a list, and then:

- **Multisite Report** — produce an aggregate EJAM-style report over all of the selected places at once, via the [EJAM API](https://github.com/Public-Environmental-Data-Partners/EJAM-API).
- **Send to EJAM** — a **deep link** that launches the full [EJAM app](https://ejam.publicenvirodata.org/) pre-loaded with the selected places, ready to run. Points and FIPS codes travel directly in the URL (`?lat=&lon=`, `?fips=`); larger sets and drawn polygons use a token handoff so they are not limited by URL length.

The EJAM API and app endpoints are set in one place — `javascript/config.js` (`window.EJAM_API_BASE` / `window.EJAM_APP_URL`). For the deep-link URL vocabulary and parameter details, see the [EJAM-API](https://github.com/Public-Environmental-Data-Partners/EJAM-API) README and the EJAM package's "Defaults and Custom Settings for the Web App" article.

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