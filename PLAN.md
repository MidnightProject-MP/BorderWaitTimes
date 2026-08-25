# Temporary Execution Plan

Status: completed; CBP lane estimates have a separate, northbound-only presentation surface that preserves their lane-only meaning.

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
4. Update durable Project/Epic/Story state, commit, and push. Pending.

Verification: `node --check app.js`, `node --check browser-check.mjs`, `npm run check:cbp`, `npm run check:adapter`, `npm run check:browser`, and `git diff --check` pass.

Next step: Observe the presentation with a human traveler before selecting the next product Story; automated checks do not establish visual quality or real-world usefulness.
