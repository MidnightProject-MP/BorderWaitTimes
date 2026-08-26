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

Why now: The first live multi-source run succeeded technically, but Caltrans returned one stale 2022 travel-time observation alongside one fresh closure observation. Collection success alone must not be treated as current usable data.

1. Return fresh, stale, and unknown observation counts per source. Complete.
2. Preserve collection success separately from freshness quality. Complete.
3. Surface freshness breakdown in the orchestration result and CLI. Complete.
4. Verify live stale-source behavior plus all-success, partial-failure, and total-failure cases. Complete.
5. Update durable state, commit, push, and provide the testable build. In progress.

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
- Arrival-by and departure-window design remain discovery hypotheses.

Verification: browser coverage proves lane context changes the illustrative primary comparison, keeps San Ysidro and Otay together for Tijuana, excludes Tecate from that choice set, selects Tecate when the starting area changes, remains within the mobile first viewport, and keeps the evidence disclosure closed. The shared observation contract, source archive checks, unified history checks, summary/coverage checks, collection orchestration checks, and live collection run pass legacy CBP mapping, canonical Caltrans mapping, deterministic ordering, domain separation, corruption rejection, null preservation, descriptive min/max/median, freshness counts, coverage windows, declared sample/day/span/value thresholds, invalid-input handling, all-success, partial-failure, total-failure, and stale-source cases. Current archives contain 101 CBP rows across 2 partitions and 2 Caltrans rows across 1 partition.

Next step: Deliver freshness-aware collection health, then select the next timing/data Story from remaining source gaps.
