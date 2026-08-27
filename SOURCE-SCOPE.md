# Cruce Source Measurement Scope

Vocabulary: `measurement-scope-v1`

Status: Research and provenance contract. These labels describe what a source reports; they do not expand a source's meaning.

## Scope Fields

| Field | Meaning |
| --- | --- |
| `domain` | `border-processing`, `roadway-approach`, or `research-outcome`. |
| `direction` | Direction of the measured movement, such as `northbound`. |
| `facility` | Port, checkpoint, or roadway facility being measured. |
| `laneProgram` | Reported lane/program category when the source provides one. |
| `measurementKind` | `reported-estimate`, `observed-duration`, `status`, `capacity-proxy`, or `event`. |
| `coverage` | Plain-language boundary of what is included. |
| `exclusions` | Explicitly excluded journey portions or meanings. |

Every future scope object should state included and excluded portions instead of relying on a source name or field name to imply semantics. Attach confirmed scope through a separate `scoped-observation-v1` overlay keyed by `sourceObservationId`; do not rewrite version-1 archive rows.

## Confirmed Mappings

| Source and field | Domain | Facility | Measurement kind | Included | Excluded |
| --- | --- | --- | --- | --- | --- |
| CBP XML lane `delayMinutes` | `border-processing` | San Ysidro, Otay Mesa, or Tecate port/lane | `reported-estimate` | CBP-reported lane delay scope | Physical queue extent, roadway approach, total crossing, time-to-destination |
| CBP XML `portStatus` / `operationalStatus` | `border-processing` | CBP port/lane | `status` | Published operating state | Actual lane eligibility, staffed-booth count, processing capacity |
| CBP XML `lanesOpen` | `border-processing` | CBP port/lane | `capacity-proxy` | Reported lanes open | Throughput, utilization, staffed booths, queue length |
| Caltrans D11 `calculatedTraveltime` | `roadway-approach` | Selected I-5 `BORDER` segment | `reported-estimate` | Roadway travel over the published segment | Customs processing, queue extent, Mexico-side approach |
| Caltrans D11 lane closure record | `roadway-approach` | Published San Ysidro roadway location | `status` | Published closure and lane context | Causal delay, queue length, customs processing |
| Future crossing session event | `research-outcome` | Versioned Cruce topology item | `event` | Consent-defined traveler event | Unobserved segments, other travelers, generalized queue state |

## Rules

- Scope is descriptive provenance, not a model feature or a forecast claim.
- Do not attach a scope that the upstream source does not establish.
- `reported-estimate` must not be relabeled `observed-duration`.
- `capacity-proxy` must not be used as throughput or booth availability.
- CBP and Caltrans scopes remain separate even when timestamps overlap.
- Future scope attachment to version-1 observations requires a schema-version decision; do not mutate committed historical rows silently.
- Scope comparisons require overlapping facility, direction, lane/program, time, and boundary semantics.
- Unknown or unverified scope is recorded as unknown, not inferred from a map, UI label, or synthetic fixture.

## Open Questions

1. Can CBP document the exact start/end boundary and estimation method for each lane delay field?
2. Which public facility descriptions can establish stable port and checkpoint names?
3. Which future observations can be measured at a boundary shared by CBP and Cruce?
4. What source and collection cadence is sufficient for a valid comparison?
