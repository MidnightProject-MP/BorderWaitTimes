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

Why now: Caltrans observations can now be archived, but they lacked the integrity boundary already established for CBP. Roadway history must detect malformed rows, wrong source identity, partition errors, duplicate IDs, and tampered values before timing analysis consumes it.

1. Archive projected Caltrans observations by collection date. Complete.
2. Deduplicate identical source observations while retaining corrected and later readings. Complete.
3. Fail closed when a poll produces no timestamped roadway observations. Complete.
4. Verify archive rows against the shared contract without changing traveler-facing UI. Complete.
5. Detect tampering, duplicate IDs, invalid partitions, and invalid timestamps. Complete.
6. Update durable state, commit, push, and provide the testable build. Complete.

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
- Arrival-by and departure-window design remain discovery hypotheses.

Verification: browser coverage proves lane context changes the illustrative primary comparison, keeps San Ysidro and Otay together for Tijuana, excludes Tecate from that choice set, selects Tecate when the starting area changes, remains within the mobile first viewport, and keeps the evidence disclosure closed. The shared observation contract and Caltrans archive checks pass fresh, stale, unknown, malformed, corrected, repeated, timestamp, unit, and collection-time cases. Caltrans archive verification detects tampering, duplicate IDs, invalid partitions, and invalid timestamps. `npm run verify:cbp-archive` passes with 89 rows across 2 partitions.

Next step: Select the next timing/data Story from remaining source gaps.
