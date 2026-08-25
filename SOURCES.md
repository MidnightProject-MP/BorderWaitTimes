# Source Inventory

Evidence gathered for the Celestan Phase 1 baseline on 2026-08-24. This file records what is confirmed, what is not, and what must not be implied by the UI.

## Confirmed Feeds

| Source | URL | Useful fields | Product meaning |
| --- | --- | --- | --- |
| Caltrans D11 travel times | `https://cwwp2.dot.ca.gov/data/d11/tt/ttStatusD11.json` | `tt.location`, `tt.traveltime`, `recordTimestamp`, `calculatedTraveltime`, `traveltimeAccuracy` | Roadway approach context. The `BORDER` I-5 segment is southbound travel time toward San Ysidro, not customs wait time. |
| Caltrans D11 lane closures | `https://cwwp2.dot.ca.gov/data/d11/lcs/lcsStatusD11.json` | `lcs.location`, `lcs.closure`, lane counts, closure window, `recordTimestamp` | Roadway disruption context. It can explain an approach problem, but does not measure the queue at a port of entry. |
| Caltrans D11 CCTV index | `https://cwwp2.dot.ca.gov/data/d11/cctv/cctvStatusD11.json` | Camera metadata and timestamps | Optional visual context. Do not bulk-view streams; Caltrans publishes fair-use restrictions for large-scale CCTV viewing. |

Caltrans describes these feeds as free HTTPS JSON/CSV/XML services with frequent updates. Every adapter must validate the record timestamp itself. A sample travel-time response returned records from 2022, so an old payload must become `stale` or `unknown`, never a fresh-looking estimate.

## Official But Unverified For Ingestion

| Source | URL | Current conclusion |
| --- | --- | --- |
| CBP Border Wait Times | `https://bwt.cbp.gov/` | Official public application for northbound passenger, commercial, and pedestrian estimates with lane/program distinctions. The machine-readable endpoint was not independently confirmed in this environment. |
| CBP advisories and wait times | `https://www.cbp.gov/travel/advisories-wait-times` | Official provenance page. Useful as a source link, not an ingestion contract. |

CBP wait-time data must not be represented as live in Celestan until a permitted endpoint, response shape, timestamp semantics, and failure behavior are verified. No commonly cited JSON or RSS URL is treated as confirmed by this inventory.

## Not Found

- No official historical wait-time archive was found.
- No official ANAM Tijuana traveler queue feed was found.
- No official municipal Tijuana crossing-condition feed was found.
- Caltrans provides U.S.-side roadway context, not Mexico-to-U.S. customs processing time.

## Next Adapter Boundary

The smallest safe implementation slice is a read-only Caltrans adapter that:

1. Fetches the D11 travel-time and lane-closure feeds.
2. Selects the I-5 `BORDER` travel-time segment and San Ysidro-area closures.
3. Carries source timestamps and calculates `fresh`, `stale`, or `unknown`.
4. Exposes roadway context separately from the public border-processing estimate.
5. Fails closed when the feed is old, malformed, unavailable, or semantically ambiguous.

Until that adapter exists and is verified, the current UI remains explicitly illustrative and does not claim live official values.
