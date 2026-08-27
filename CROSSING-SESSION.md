# Cruce Crossing Session Evidence

Schema: `crossing-session-v1`

Status: Research contract only. This is not implemented collection, a location feature, or a traveler-facing capability.

## Purpose

Define the smallest privacy-preserving evidence needed to compare a future Cruce estimate or source observation with a real crossing outcome. Keep traveler-confirmed events separate from official CBP and Caltrans source observations.

## Minimal Record

```json
{
  "sessionSchemaVersion": 1,
  "sessionId": "pseudonymous-session-id",
  "crossing": "san-ysidro",
  "direction": "northbound",
  "lane": "passengerStandard",
  "events": [
    {
      "event": "queueStart",
      "at": "2026-08-27T10:00:00.000Z",
      "captureMethod": "traveler-confirmed",
      "precisionSeconds": 60,
      "confidence": "reported",
      "labelStatus": "candidate"
    },
    {
      "event": "across",
      "at": "2026-08-27T10:42:00.000Z",
      "captureMethod": "traveler-confirmed",
      "precisionSeconds": 60,
      "confidence": "reported",
      "labelStatus": "candidate"
    }
  ],
  "consent": {
    "status": "explicit",
    "scope": "timestamp-outcomes-only",
    "withdrawnAt": null
  },
  "retention": "research-defined"
}
```

## Event Semantics

| Event | Meaning | Boundary status |
| --- | --- | --- |
| `queueStart` | Traveler reports entering the controlled crossing queue, not merely approaching on a public road. | Requires participant instruction and later validation. |
| `checkpoint` | Traveler reports passing a named topology checkpoint. | Optional; checkpoint vocabulary must come from `BORDER-TOPOLOGY.md`. |
| `across` | Traveler reports reaching the defined post-customs endpoint. | Requires an explicit crossing-specific definition. |

An absent event is valid. A UI button press, timer transition, or route recommendation must not be interpreted as a physical event. `queueStart` and `across` are candidate labels until their instructions and reliability are tested.

## Capture Methods

- `traveler-confirmed`: participant records or confirms an event.
- `device-assisted`: a device proposes a timestamp that the participant confirms; not currently implemented.
- `observer-recorded`: a trained observer records an event; future research only.
- `inferred`: derived from another signal; never equivalent to ground truth without validation.

Every event must preserve method, timestamp precision, confidence, and label status. Do not silently upgrade inferred or approximate events to confirmed outcomes.

## Privacy Boundary

- Explicit opt-in is required before recording a session.
- Use a session-scoped pseudonymous identifier; do not require name, account, license plate, or contact information.
- Timestamp-only capture is the default. Raw location, continuous traces, photos, and device identifiers are out of scope.
- Store only the events needed for the declared research question.
- Allow withdrawal and deletion before aggregation.
- Do not transmit the current prototype's local research choices as if they were crossing outcomes.
- Consent to a timestamp outcome does not imply consent to movement tracking or future model use.

## Validation Rules

- `across` cannot precede `queueStart` when both are present.
- Event timestamps must include an explicit timezone and preserve reported precision.
- Crossing, direction, and lane/program must be known or explicitly null; do not infer eligibility.
- Events must reference the topology version used for any checkpoint label.
- Source observations used for comparison retain their original source and collection timestamps.
- A session is eligible for evaluation only when the target event definition, scope, and label status meet the evaluation rules.

## Evidence Boundary

This contract enables future evidence collection; it does not establish that travelers can reliably self-report queue entry, that a named segment exists physically, or that a completed crossing is representative. No model, simulation, or traveler-facing estimate should consume these records until label quality and scope alignment are evaluated.
