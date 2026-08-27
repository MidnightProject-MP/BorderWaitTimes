# Cruce Border Topology Vocabulary

Topology version: `border-topology-draft-1`

Status: Research vocabulary only. This document does not assert measured geometry, queue length, operating capacity, or current traveler-facing behavior.

## Purpose

Provide stable names for future observations and questions about the northbound Tijuana-San Diego crossing system. Names are useful before measurements exist, but every item carries an evidence status so a research label cannot silently become a product claim.

## Evidence Status

| Status | Meaning |
| --- | --- |
| `domain-informed` | Supplied as meaningful domain evidence by the product owner; not independently validated or representative. |
| `source-bounded` | Boundary supported by an identified official source, without proving physical queue behavior. |
| `unmeasured` | Useful research concept with no current Cruce measurement. |
| `unknown` | The concept or boundary requires further investigation. |

## Vocabulary

| Crossing | Direction | Segment/checkpoint | Sequence | Applies to | Evidence status | Measurement question |
| --- | --- | --- | ---: | --- | --- | --- |
| `san-ysidro` | northbound | `us-approach` | 1 | All programs | `source-bounded` | Where does the selected roadway segment end relative to the controlled queue? |
| `san-ysidro` | northbound | `upstream-controlled-queue` | 2 | General, Ready | `domain-informed` | Where does controlled queue membership begin, and how does its extent change? |
| `san-ysidro` | northbound | `general-ready-shared` | 3 | General, Ready | `domain-informed` | Where do General and Ready share a physical section before separating? |
| `san-ysidro` | northbound | `general-stream` | 4 | General | `domain-informed` | Where is the General stream distinct, and what transitions define it? |
| `san-ysidro` | northbound | `ready-stream` | 4 | Ready | `domain-informed` | Where is the Ready stream distinct, and what transitions define it? |
| `san-ysidro` | northbound | `sentri-approach` | 2 | SENTRI | `domain-informed` | Where does the separate SENTRI approach begin and enter the facility? |
| `san-ysidro` | northbound | `sentri-entry` | 3 | SENTRI | `domain-informed` | What physical entry/checkpoint marks SENTRI facility access? |
| `san-ysidro` | northbound | `primary-inspection` | 5 | Vehicle programs | `unknown` | What event or boundary represents customs primary inspection completion? |
| `san-ysidro` | northbound | `across` | 6 | All programs | `unknown` | What timestamp and boundary mean that a traveler is across? |
| `otay-mesa` | northbound | `us-approach` | 1 | All programs | `source-bounded` | Which approach segments and queue boundary are relevant to this crossing? |
| `otay-mesa` | northbound | `controlled-queue` | 2 | Vehicle programs | `domain-informed` | Can a stable controlled queue start be identified independently of roadway congestion? |
| `otay-mesa` | northbound | `program-fanout` | 3 | General, Ready, SENTRI | `unknown` | Where do lane/program streams separate, and which sections are shared? |
| `otay-mesa` | northbound | `primary-inspection` | 4 | Vehicle programs | `unknown` | What event or boundary represents customs primary inspection completion? |
| `otay-mesa` | northbound | `across` | 5 | All programs | `unknown` | What timestamp and boundary mean that a traveler is across? |
| `tecate` | northbound | `us-approach` | 1 | All programs | `source-bounded` | Which approach segments and queue boundary are relevant to this crossing? |
| `tecate` | northbound | `controlled-queue` | 2 | Vehicle programs | `unknown` | Can a stable controlled queue start be identified? |
| `tecate` | northbound | `primary-inspection` | 3 | Vehicle programs | `unknown` | What event or boundary represents customs primary inspection completion? |
| `tecate` | northbound | `across` | 4 | All programs | `unknown` | What timestamp and boundary mean that a traveler is across? |

## Rules

- A vocabulary entry is not a measured observation.
- `source-bounded` describes a source scope, not a physical topology proof.
- `domain-informed` records one expert's useful knowledge and must not be generalized without validation.
- `unknown` and `unmeasured` are valid states; do not fill them with synthetic geometry.
- A future observation must include topology version, segment/checkpoint identifier, direction, lane/program applicability, capture method, timestamp precision, confidence, and evidence status.
- CBP lane delay remains a reported lane estimate. Caltrans approach observations remain roadway context.
- This vocabulary does not determine traveler eligibility, route recommendations, queue length, throughput, or forecast values.

## Next Research Questions

1. Which named boundaries can be defined from public facility maps or official descriptions?
2. Which boundaries require direct observation or consented crossing events?
3. What timestamp precision is realistic for queue entry, checkpoint transition, and across events?
4. Which source scopes overlap sufficiently to compare without conflating measurement domains?
