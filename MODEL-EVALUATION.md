# Cruce Model Evaluation Research

Status: Research contract only. No model or forecast is currently validated or exposed to travelers.

## Purpose

Define how Cruce could compare a future estimate with independently labeled crossing outcomes. Evaluation must be stricter than descriptive archive summaries and must prevent future information from leaking into a prediction.

## Prediction Record

```json
{
  "evaluationSchemaVersion": 1,
  "predictionId": "pseudonymous-prediction-id",
  "modelVersion": "baseline-1",
  "topologyVersion": "border-topology-draft-1",
  "target": "queueStart-to-across-duration",
  "crossing": "san-ysidro",
  "direction": "northbound",
  "lane": "passengerStandard",
  "issuedAt": "2026-08-27T10:00:00.000Z",
  "inputCutoffAt": "2026-08-27T09:59:00.000Z",
  "horizonMinutes": 0,
  "prediction": {
    "estimateMinutes": 42,
    "lowerMinutes": 30,
    "upperMinutes": 58
  },
  "outcomeEventId": "session-event-reference",
  "eligibility": "pending",
  "exclusionReason": null
}
```

The input cutoff is mandatory. Every source observation used by a prediction must have been available by that cutoff. The outcome reference must point to a separate consented crossing session, never to a value derived from the prediction itself.

## Target Definition

The initial candidate target is duration from a defined `queueStart` event to a defined `across` event. It is not equivalent to CBP `delayMinutes`, roadway travel time, or the current illustrative total-crossing value. A target remains ineligible until its event boundaries and label status are accepted.

Other targets must be named separately, for example:

- queue-start-to-checkpoint duration
- checkpoint-to-checkpoint duration
- probability of reaching an arrival deadline
- queue extent at a named observation time

Do not combine targets or change the target definition between training and scoring.

## Leakage-Safe Splits

- Use chronological train, validation, and holdout periods.
- Keep a complete crossing session in one split.
- Do not use a source observation collected after `inputCutoffAt`.
- Do not tune thresholds against the final holdout.
- Record the split identifier and topology version on every prediction.
- Report exclusions and missing outcomes separately; do not treat them as successful predictions.

## Baselines

Start with the simplest defensible references:

1. **Latest source value:** the most recent eligible CBP lane estimate at the input cutoff, reported only as a comparison baseline and never relabeled as total crossing duration.
2. **Stratified historical median:** median of eligible completed-outcome durations for the same crossing, direction, lane/program, and time bucket, only when declared coverage thresholds pass.
3. **Robust time-bucket baseline:** a coverage-qualified median with an interquartile or percentile interval, retaining sparse and missing buckets as unavailable.
4. **Approach-separated comparison:** compare Caltrans roadway context independently; do not add it to customs duration without a validated relationship.

Synthetic history may exercise implementation mechanics but cannot establish baseline accuracy. A baseline that has no eligible outcomes is unavailable, not zero-error.

## Metrics

For eligible point predictions, report:

- eligible prediction count
- missing or excluded outcome count and reason
- mean absolute error and median absolute error
- signed error and bias by direction
- error by crossing, lane/program, time bucket, and forecast horizon

For interval predictions, report:

- interval coverage
- interval width
- coverage by crossing, lane/program, and horizon
- whether intervals are systematically too narrow or too wide

Never report a single aggregate score without its eligibility count, split period, target definition, and scope alignment.

## Evidence Gates

- A descriptive median is not a forecast until it is evaluated out of sample.
- Official CBP and Caltrans observations remain source-specific inputs.
- A topology label must identify its version and evidence status.
- A crossing outcome must carry capture method, precision, confidence, and label status.
- Model complexity must earn its place by improving holdout performance or uncertainty calibration over the baselines.
- Traveler exposure requires stable target semantics, independent outcomes, held-out evaluation, and calibrated uncertainty.
