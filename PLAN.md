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
Completed Story: As a traveler, I can try an arrival-by planning interaction with clearly labeled illustrative choices and local-only research capture.
Completed Story: As a traveler, I can use the core decision surface on a poor or offline connection without unnecessary source requests.

Why now: Border travelers may have poor connectivity. The static decision shell must remain available, optional source checks must stay manual, and offline state must be visible without caching potentially stale live data.

1. Cache the same-origin app shell for repeat/offline loading. Complete.
2. Show compact online, offline, and low-data status. Complete.
3. Block optional source requests while offline. Complete.
4. Keep live source responses out of the app-shell cache. Complete.
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
- Treat arrival-window interaction output as discovery material, not a forecast or guarantee.
- Prefer resilient static shell data over a broken live request when connectivity is constrained.
- Arrival-by and departure-window design remain discovery hypotheses.

Verification: browser coverage proves lane context changes the illustrative primary comparison, keeps San Ysidro and Otay together for Tijuana, excludes Tecate from that choice set, selects Tecate when the starting area changes, remains within the mobile first viewport, and keeps the evidence disclosure closed. The shared observation contract, source archive checks, unified history checks, summary/coverage checks, collection orchestration checks, live collection run, illustrative dataset checks, timing-context checks, timing-data checks, and official-readiness checks pass legacy CBP mapping, canonical Caltrans mapping, deterministic ordering, domain separation, corruption rejection, null preservation, descriptive min/max/median, freshness counts, coverage windows, declared sample/day/span/value thresholds, invalid-input handling, all-success, partial-failure, total-failure, stale-source, synthetic provenance, synthetic coverage, time-bucket ranking, under-covered query cases, explicit dataset provenance, mixed-source rejection, no-fallback official insufficiency, per-subject source-time cadence, largest-gap calculation, provenance, freshness, and domain separation. Current official archives contain 111 CBP rows across 2 partitions and 4 Caltrans rows across 1 partition; the synthetic archive contains 1,008 explicitly illustrative rows across 28 partitions.

Next step: Continue official history collection and advance migration only when declared timing coverage supports it.

Current archive update: 117 CBP rows and 8 Caltrans rows; the latest snapshot added 2 CBP rows and 1 Caltrans row, with no timing subject meeting declared migration thresholds.

Current synchronized archive: 127 CBP rows and 8 Caltrans rows after the remote CBP collection update; no timing subject meets declared migration thresholds.
Current synchronized archive update: 157 CBP rows across 3 partitions and 9 Caltrans rows across 2 partitions; no timing subject meets declared migration thresholds.
Completed Story: As a maintainer, I can record the next scheduled official snapshot and reassess timing coverage without overstating stale or deduplicated observations.

Completed Story: As a product owner, I can identify which border signals and ground-truth outcomes are measurable enough to justify Cruce's empirical border-understanding direction.

Audit outcome: CBP lane estimates, operating state, and `lanesOpen` are measurable; Caltrans provides limited U.S.-side approach and closure context. Physical queue extent, throughput, movement, queue topology, and completed-crossing duration remain absent or consent-dependent.

Execution:

1. Inventory current official signals, archive fields, and existing local research evidence.
2. Separate observable signals from missing or consent-dependent evidence.
3. Define the smallest discovery evidence slice without specifying an implementation or claiming participant results.
4. Record unsupported claims, decision gates, and the next bounded research action.
5. Verify documentation consistency, commit, and push the durable direction update.

Completed Story: As a maintainer, I can document the autonomous research space for Cruce's empirical border-understanding direction without turning hypotheses into product claims.

Research artifact: `BORDER-SYSTEM-RESEARCH.md` separates single-expert domain evidence, confirmed source signals, missing ground truth, future research contracts, evidence gates, and reversible research tracks.

Completed Story: As a maintainer, I can define a versioned physical-topology vocabulary and measurement-boundary questions without asserting unmeasured queue geometry.

Research artifact: `BORDER-TOPOLOGY.md` names domain-informed and unknown segments for San Ysidro, Otay Mesa, and Tecate while preserving evidence status and scope boundaries.

Completed Story: As a maintainer, I can define consented crossing-session event labels and privacy boundaries before implementing movement or location capture.

Research artifacts: `BORDER-TOPOLOGY.md` and `CROSSING-SESSION.md` define versioned vocabulary, event semantics, provenance, privacy, and validation boundaries without collecting or exposing traveler traces.

Completed Story: As a maintainer, I can define leakage-safe evaluation records and simple descriptive baselines for future crossing outcomes.

Research artifact: `MODEL-EVALUATION.md` defines prediction scope, input cutoffs, chronological splits, baseline comparisons, outcome eligibility, and error/calibration metrics without implementing a forecast.

Completed Story: As a maintainer, I can validate research session and evaluation records without connecting them to traveler-facing timing or synthetic performance claims.

Implementation: `research-contract-check.mjs` validates consent, timestamp precision, event order, no-location boundaries, prediction cutoff order, interval order, and evaluation eligibility.

Completed Story: As a maintainer, I can define a source measurement-scope vocabulary and confirmed CBP/Caltrans mappings without expanding source semantics.

Research artifact: `SOURCE-SCOPE.md` defines scope fields, confirmed source mappings, comparison rules, and unknowns while leaving version-1 archive rows immutable.

Completed Story: As a maintainer, I can add confirmed scope metadata through a new versioned research record without mutating committed official observations.

Implementation: `scoped-observation-check.mjs` validates `scoped-observation-v1` overlays keyed to source observation IDs, including source-confirmed vocabulary, timestamp order, explicit exclusions, and rejection of prediction/location fields.

Completed Story: As a maintainer, I can mechanically join confirmed scope overlays to source observations without changing source semantics.

Implementation: `scoped-observation.mjs` validates overlays, rejects unknown or mismatched references, and returns source observations paired with scope records without mutating either input.

Completed Story: As a maintainer, I can define an explicit source-scope fixture set for confirmed CBP and Caltrans mappings before any archive integration.

Implementation: `scoped-observation-check.mjs` covers a CBP border-processing overlay and a Caltrans roadway-approach overlay, verifying that their domains and exclusions remain distinct.

Next Story: Create research-only scope overlays for selected verified archive observations and validate end-to-end joins without changing the official archives.

Boundary: Do not present forecasting, queue inference, location-derived observations, simulation, or machine-learning output as validated traveler capabilities. External participant research is a future opportunity, not a dependency for autonomous investigation.
