# Source Inventory

Evidence gathered for the Celestan Phase 1 baseline on 2026-08-24. This file records what is confirmed, what is not, and what must not be implied by the UI.

## Confirmed Feeds

| Source | URL | Useful fields | Product meaning |
| --- | --- | --- | --- |
| Caltrans D11 travel times | `https://cwwp2.dot.ca.gov/data/d11/tt/ttStatusD11.json` | `tt.location`, `tt.traveltime`, `recordTimestamp`, `calculatedTraveltime`, `traveltimeAccuracy` | Roadway approach context. The `BORDER` I-5 segment is southbound travel time toward San Ysidro, not customs wait time. |
| Caltrans D11 lane closures | `https://cwwp2.dot.ca.gov/data/d11/lcs/lcsStatusD11.json` | `lcs.location`, `lcs.closure`, lane counts, closure window, `recordTimestamp` | Roadway disruption context. It can explain an approach problem, but does not measure the queue at a port of entry. |
| Caltrans D11 CCTV index | `https://cwwp2.dot.ca.gov/data/d11/cctv/cctvStatusD11.json` | Camera metadata and timestamps | Optional visual context. Do not bulk-view streams; Caltrans publishes fair-use restrictions for large-scale CCTV viewing. |

Caltrans describes these feeds as free HTTPS JSON/CSV/XML services with frequent updates. Every adapter must validate the record timestamp itself. A sample travel-time response returned records from 2022, so an old payload must become `stale` or `unknown`, never a fresh-looking estimate.

## Confirmed For Read-Only Ingestion

| Source | URL | Current conclusion |
| --- | --- | --- |
| CBP Border Wait Times XML | `https://bwt.cbp.gov/xml/bwt.xml` | Officially linked XML feed for northbound passenger, commercial, and pedestrian lane estimates. Global date/time and lane update times are supplied; lane update times include timezone abbreviations. |
| CBP advisories and wait times | `https://www.cbp.gov/travel/advisories-wait-times` | Official provenance page. Useful as a source link, not an ingestion contract. |

CBP's official help page links the mobile/RSS guide at `https://www.cbp.gov/document/forms/border-wait-times-mobile-and-rss-feed-help`, which identifies machine-readable Border Wait Times feeds. The XML feed was fetched successfully on 2026-08-25 and its response shape, target port records, lane fields, timezone-bearing update strings, and unavailable behavior were verified locally. The adapter uses only the XML feed; undocumented JSON endpoints remain unconfirmed.

## Not Found

- No official historical wait-time archive was found.
- No official ANAM Tijuana traveler queue feed was found.
- No official municipal Tijuana crossing-condition feed was found.
- Caltrans provides U.S.-side roadway context, not Mexico-to-U.S. customs processing time.

## CBP Adapter Boundary

The smallest safe implementation slice is a read-only CBP adapter that:

1. Fetches the officially linked XML feed.
2. Selects the San Ysidro `250401`, Otay Mesa passenger `250601`, and Tecate `250501` records.
3. Carries lane-level timezone-bearing update strings and calculates `fresh`, `stale`, or `unknown`.
4. Keeps standard, SENTRI, Ready, and pedestrian lanes distinct.
5. Fails closed when the feed is old, malformed, unavailable, or semantically ambiguous.

## Adapter Status

`caltrans-adapter.mjs` now implements this boundary with independent source failure, timeout, timestamp validation, and `fresh`/`stale`/`unknown` states. `caltrans-adapter-check.mjs` verifies fresh, stale, malformed, missing-segment, and unavailable cases.

`cbp-adapter.mjs` implements the read-only XML boundary with target-port selection, lane-level timestamp parsing, and fail-closed freshness. `cbp-adapter-check.mjs` verifies fresh, stale, pending, malformed, missing-target, and unavailable cases.

Neither adapter changes the traveler-facing customs estimates. The UI remains explicitly illustrative until a separate product story establishes how official customs data can be presented without confusing lane estimates with total crossing time.
