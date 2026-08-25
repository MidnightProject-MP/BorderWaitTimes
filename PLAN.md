# Temporary Execution Plan

Status: completed; the strongest legacy product idea was reimplemented safely in Celestan and the dormant legacy tree was removed.

Completed Story: As a maintainer, I can distinguish confirmed official roadway feeds from unverified customs estimates and know when roadway data is stale before integrating it into Celestan.

Completed Story: As a maintainer, I can run a fail-closed Caltrans adapter that exposes roadway context separately from border-processing wait time.

1. Normalize confirmed D11 travel-time and lane-closure payloads. Complete.
2. Fail closed on stale, malformed, missing, future, or unavailable source data. Complete.
3. Add deterministic adapter checks and preserve roadway/customs semantics. Complete.
4. Update durable Project/Epic/Story state, commit, and push. Complete.

Completed Story: As a traveler, I can see roadway approach context separately from customs wait, with freshness and source provenance visible.

Verification: `node --check app.js`, `node --check browser-check.mjs`, `npm run check:adapter`, `npm run check:browser`, and `git diff --check` pass. Browser coverage includes explicit request timing, official Caltrans fixtures, fresh/stale/unavailable rendering, bilingual switching, customs-value separation, consent flow, and mobile layout.

Completed Story: As a maintainer, I can normalize the officially linked CBP Border Wait Times XML feed fail-closed, without changing the illustrative traveler UI.

1. Record current CBP evidence, feed URL, schema boundary, and timestamp limitations. Complete.
2. Implement a read-only XML adapter for the San Diego Mexico ports and selected lane classes. Complete.
3. Verify fresh, stale, malformed, missing-port, unavailable, and semantically ambiguous responses. Complete.
4. Update durable Project/Epic/Story state, commit, and push. Complete.

Verification: `npm run check:cbp`, `npm run check:adapter`, `node --check cbp-adapter.mjs`, `node --check app.js`, `npm run check:browser`, and `git diff --check` pass.

Completed Story: As a traveler, I can inspect official CBP lane estimates separately from illustrative total crossing waits, with lane class, freshness, source, and northbound scope visible.

1. Define a separate lane-only presentation contract. Complete.
2. Add bilingual fresh, stale, pending, unavailable, and northbound-only states. Complete.
3. Verify that CBP lane values never alter illustrative totals, roadway values, or recommendations. Complete.
4. Update durable Project/Epic/Story state, commit, and push. Complete.

Verification: `node --check app.js`, `node --check browser-check.mjs`, `npm run check:cbp`, `npm run check:adapter`, `npm run check:browser`, and `git diff --check` pass.

Post-delivery correction: the southbound CBP control now visibly reads “Northbound only” and is disabled; the rendered browser check asserts this affordance.

Completed Story: As a northbound traveler, I can choose an applicable CBP lane class and see its official delay, operating state, and lanes open without changing Celestan's illustrative total-crossing estimate.

1. Assess the legacy feature set and reject unsafe or unsupported implementation choices. Complete.
2. Add a bilingual CBP lane selector plus fail-closed operating state and lanes-open metadata. Complete.
3. Verify lane changes reuse one request and never alter illustrative totals, recommendations, history, or roadway context. Complete.
4. Delete the dormant legacy `js/`, `css/`, and `images/` trees. Complete.
5. Inspect the rendered result, update durable state, commit, and push. Complete.

Verification: all JavaScript syntax checks, `npm run check:cbp`, `npm run check:adapter`, `npm run check:browser`, mobile selector bounds, and `git diff --check` pass.

Next step: Observe the reconciled lane-selection experience with travelers before selecting another product Story.
