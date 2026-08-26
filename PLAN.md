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

Why now: Historical summaries now expose counts and ranges, but sparse or single-day history could still be mistaken for a basis for comparison. A declared-threshold coverage assessment can fail closed before timing work consumes an under-supported summary.

1. Preserve observed-day count and source-time span in each summary. Complete.
2. Assess sample, day, span, and value thresholds supplied by the caller. Complete.
3. Return explicit insufficiency reasons without forecasting or imputing values. Complete.
4. Verify deterministic coverage decisions and invalid-threshold handling. Complete.
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
- Arrival-by and departure-window design remain discovery hypotheses.

Verification: browser coverage proves lane context changes the illustrative primary comparison, keeps San Ysidro and Otay together for Tijuana, excludes Tecate from that choice set, selects Tecate when the starting area changes, remains within the mobile first viewport, and keeps the evidence disclosure closed. The shared observation contract, source archive checks, unified history checks, summary checks, and coverage checks pass legacy CBP mapping, canonical Caltrans mapping, deterministic ordering, domain separation, corruption rejection, null preservation, descriptive min/max/median, freshness counts, coverage windows, declared sample/day/span/value thresholds, and invalid-input handling. Caltrans archive verification detects tampering, duplicate IDs, invalid partitions, and invalid timestamps. `npm run verify:cbp-archive` passes with 99 rows across 2 partitions after the latest scheduled collection.

Next step: Select the next timing/data Story from remaining source gaps.
