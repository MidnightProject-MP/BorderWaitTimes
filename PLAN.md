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

Why now: The synthetic timing fixture now provides realistic temporal shape, but no service exposes a reusable timing-context response. The next layer should return descriptive history, coverage, and ranking inputs without introducing forecast semantics.

1. Query a specific port/lane/time bucket from synthetic history. Complete.
2. Return descriptive median/range and coverage metadata. Complete.
3. Compare relevant ports without mixing domains or unsupported data. Complete.
4. Fail closed or report insufficiency for invalid and under-covered queries. Complete.
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
- Do not collapse mixed observations into a fresh source claim.
- Keep synthetic fixtures in a separate archive and never include them in official history readers.
- Label synthetic values as illustrative development data at the row and dataset level.
- Arrival-by and departure-window design remain discovery hypotheses.

Verification: browser coverage proves lane context changes the illustrative primary comparison, keeps San Ysidro and Otay together for Tijuana, excludes Tecate from that choice set, selects Tecate when the starting area changes, remains within the mobile first viewport, and keeps the evidence disclosure closed. The shared observation contract, source archive checks, unified history checks, summary/coverage checks, collection orchestration checks, live collection run, illustrative dataset checks, and timing-context checks pass legacy CBP mapping, canonical Caltrans mapping, deterministic ordering, domain separation, corruption rejection, null preservation, descriptive min/max/median, freshness counts, coverage windows, declared sample/day/span/value thresholds, invalid-input handling, all-success, partial-failure, total-failure, stale-source, synthetic provenance, synthetic coverage, time-bucket ranking, and under-covered query cases. Current official archives contain 101 CBP rows across 2 partitions and 3 Caltrans rows across 1 partition; the synthetic archive contains 1,008 explicitly illustrative rows across 28 partitions.

Next step: Deliver the descriptive timing-context service, then advance to official-history migration when coverage supports it.
