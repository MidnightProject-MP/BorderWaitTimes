# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a traveler, I can report whether Celestan's recommendation changed my plan without sharing personal data.
Completed Story: As a product owner, I can preserve the full Cruce journey model while distinguishing proven capabilities from future hypotheses.
Completed Story: As a traveler, I can set my lane or program before comparing crossing options.
Completed Story: As a traveler, I can compare all relevant ports and lane programs for my starting area without seeing unrelated crossings as equal alternatives.
Completed Story: As a maintainer, I can validate roadway and border observations through one canonical contract without conflating source time, collection time, freshness, or traveler-facing estimates.

Why now: The source-specific adapters now preserve trustworthy CBP and Caltrans semantics, but they cannot yet be composed safely into a historical decision data model. A shared observation contract is the smallest useful foundation for later timing and arrival intelligence.

1. Define a source-neutral observation shape with explicit source and time semantics. Complete.
2. Validate CBP archive rows through the shared contract without changing their public shape. Complete.
3. Project Caltrans roadway travel-time and closure results through the same contract. Complete.
4. Verify fail-closed handling for malformed, stale, unknown, and synthetic observations. Complete.
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
- Arrival-by and departure-window design remain discovery hypotheses.

Verification: browser coverage proves lane context changes the illustrative primary comparison, keeps San Ysidro and Otay together for Tijuana, excludes Tecate from that choice set, selects Tecate when the starting area changes, remains within the mobile first viewport, and keeps the evidence disclosure closed. The shared observation contract passes CBP and Caltrans fixtures, including stale, unknown, malformed, timestamp, unit, and collection-time cases. `npm run verify:cbp-archive` passes with 89 rows across 2 partitions.

Next step: Deliver the completed observation-contract Story, then select the next timing/data Story from the remaining source gaps.
