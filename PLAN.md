# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a traveler, I can report whether Celestan's recommendation changed my plan without sharing personal data.
Completed Story: As a product owner, I can preserve the full Cruce journey model while distinguishing proven capabilities from future hypotheses.
Completed Story: As a traveler, I can set my lane or program before comparing crossing options.
Completed Story: As a traveler, I can compare all relevant ports and lane programs for my starting area without seeing unrelated crossings as equal alternatives.

Why now: Traveler feedback identifies a geography error in the choice set: San Ysidro and Otay are meaningful peers for someone in Tijuana, while Tecate is not. A single focus-lane selector also hides the alternatives travelers need to compare.

1. Add starting-area context and group relevant ports together. Complete.
2. Show all lane/program values for each relevant port in the primary comparison. Complete.
3. Keep official CBP reads separate and label illustrative values without hiding the choice set. Complete.
4. Verify mobile fit, bilingual behavior, selection, and unrelated-port exclusion. Complete.
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
- Arrival-by and departure-window design remain discovery hypotheses.

Verification: browser coverage proves lane context changes the illustrative primary comparison, keeps San Ysidro and Otay together for Tijuana, excludes Tecate from that choice set, selects Tecate when the starting area changes, remains within the mobile first viewport, and keeps the evidence disclosure closed. `npm run verify:cbp-archive` passes with 89 rows across 2 partitions. Existing adapter, archive, syntax, and whitespace checks remain passing.

Next step: Select the next data-foundation Story from the remaining source and timing gaps rather than extending presentation work by default.
