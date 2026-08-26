# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a traveler, I can report whether Celestan's recommendation changed my plan without sharing personal data.
Completed Story: As a product owner, I can preserve the full Cruce journey model while distinguishing proven capabilities from future hypotheses.
Completed Story: As a traveler, I can set my lane or program before comparing crossing options.
Completed Story: As a traveler, I can compare all relevant ports and lane programs for my starting area without seeing unrelated crossings as equal alternatives.
Completed Story: As a maintainer, I can validate roadway and border observations through one canonical contract without conflating source time, collection time, freshness, or traveler-facing estimates.
Completed Story: As a maintainer, I can archive validated Caltrans roadway observations with distinct source and collection timestamps without duplicating repeated polls.
Completed Story: As a maintainer, I can verify the integrity of archived Caltrans roadway observations before timing analysis consumes them.
Completed Story: As a maintainer, I can read validated CBP and Caltrans history as one time-ordered observation stream without conflating roadway context with border wait.
Completed Story: As a maintainer, I can summarize historical observations by source and subject without turning descriptive archive statistics into forecasts.
Completed Story: As a maintainer, I can assess whether an observation summary meets declared descriptive coverage requirements without presenting sparse history as a forecast.
Completed Story: As a maintainer, I can run both source collectors in one command and see independent collection outcomes without masking a partial source failure.
Completed Story: As a maintainer, I can distinguish source collection success from observation freshness in one collection result.
Completed Story: As a maintainer, I can distinguish fresh, degraded, and unusable source quality from transport success in the collection result.
Completed Story: As a maintainer, I can exercise the timing layer with clearly labeled synthetic history without mixing it into official source archives.
Completed Story: As a maintainer, I can query descriptive timing context by port, lane, and time bucket with explicit coverage status.
Completed Story: As a maintainer, I can select synthetic or official timing history explicitly without silently mixing sources or falling back across them.
Completed Story: As a maintainer, I can measure official history cadence, gaps, freshness, and subject coverage before migrating timing inputs.
Completed Story: As a maintainer, I can record an independent official collection snapshot and reassess timing coverage without treating deduplicated polls as new history.
Completed Story: As a maintainer, I can record another independently collected official snapshot and reassess whether any timing subject meets its declared coverage boundary.
Completed Story: As a maintainer, I can record the next scheduled official snapshot and reassess timing coverage without overstating stale or deduplicated observations.
Completed Story: As a maintainer, I can record the next official snapshot and preserve its independent freshness, deduplication, and coverage outcome.
Completed Story: As a maintainer, I can record the next scheduled official snapshot and preserve its independent freshness, deduplication, and coverage outcome.
Completed Story: As a maintainer, I can record the next official snapshot and distinguish new source history from repeated or stale observations.

Why now: The official archive remains below migration thresholds. One further scheduled snapshot is justified to measure source freshness and new source-observed coverage; no migration will occur unless declared thresholds are met.

1. Report per-subject official summary and provenance. Complete.
2. Measure source-time cadence and largest observed gaps. Complete.
3. Preserve freshness and declared coverage status without forecast claims. Complete.
4. Keep CBP border processing separate from Caltrans roadway context. Complete.
5. Update durable state, commit, push, and provide the testable build. Complete.

Constraints:

- Explore broadly; implement narrowly.
- Do not present hypotheses as current capabilities or forecast claims.
- Optimize interventions for remaining decision flexibility.
- Do not present synthetic lane values as official live waits or eligibility rules.
- Keep official CBP lane reads separate from illustrative total-crossing comparisons.
- Keep the primary decision compact; do not turn lane context into another evidence dashboard.
- Group ports by the traveler’s actual starting area; do not present geographically irrelevant ports as peer choices.
- Show the relevant lane choice set before asking the traveler to focus on one program.
- Keep source observations separate from illustrative traveler estimates.
- Preserve source-observed time and collection time as distinct fields.
- Never aggregate roadway context into border-processing wait without an explicit future model.
- Treat summaries as descriptive archive statistics, not forecasts or guarantees.
- Require explicit coverage thresholds before using a summary for a declared comparison.
- Do not treat a partial collection run as a complete multi-source snapshot.
- Do not treat transport success as freshness success.
- Do not collapse mixed observations into a fresh source claim.
- Keep synthetic fixtures in a separate archive and never include them in official history readers.
- Label synthetic values as illustrative development data at the row and dataset level.
- Never fall back from official timing data to synthetic timing data silently.
- Treat readiness metrics as descriptive archive diagnostics, not forecasts or migration approval by themselves.
- Arrival-by and departure-window design remain discovery hypotheses.

Verification: browser coverage proves lane context changes the illustrative primary comparison, keeps San Ysidro and Otay together for Tijuana, excludes Tecate from that choice set, selects Tecate when the starting area changes, remains within the mobile first viewport, and keeps the evidence disclosure closed. The shared observation contract, source archive checks, unified history checks, summary/coverage checks, collection orchestration checks, live collection run, illustrative dataset checks, timing-context checks, timing-data checks, and official-readiness checks pass legacy CBP mapping, canonical Caltrans mapping, deterministic ordering, domain separation, corruption rejection, null preservation, descriptive min/max/median, freshness counts, coverage windows, declared sample/day/span/value thresholds, invalid-input handling, all-success, partial-failure, total-failure, stale-source, synthetic provenance, synthetic coverage, time-bucket ranking, under-covered query cases, explicit dataset provenance, mixed-source rejection, no-fallback official insufficiency, per-subject source-time cadence, largest-gap calculation, provenance, freshness, and domain separation. Current official archives contain 111 CBP rows across 2 partitions and 4 Caltrans rows across 1 partition; the synthetic archive contains 1,008 explicitly illustrative rows across 28 partitions.

Next step: Continue official history collection and advance migration only when declared timing coverage supports it.

Current archive update: 117 CBP rows and 8 Caltrans rows; the latest snapshot added 2 CBP rows and 1 Caltrans row, with no timing subject meeting declared migration thresholds.
