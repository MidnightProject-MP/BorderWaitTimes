# Project State

- Project: Celestan border intelligence network
- Epic: Phase 1, become the best place to see the San Diego/Tijuana border
- Completed Story: As a traveler, I can compare illustrative crossing conditions, choose a recommended port, and start an explicit privacy-preserving crossing session.
- Completed Story: As a maintainer, I can distinguish confirmed official roadway feeds from unverified customs estimates and know when roadway data is stale before integrating it into Celestan.
- Completed Story: As a maintainer, I can run a fail-closed Caltrans adapter that exposes roadway context separately from border-processing wait time.
- Completed Story: As a traveler, I can see roadway approach context separately from customs wait, with freshness and source provenance visible.
- Completed Story: As a maintainer, I can normalize the officially linked CBP Border Wait Times XML feed fail-closed without changing the illustrative traveler UI.
- Completed Story: As a traveler, I can inspect official CBP lane estimates separately from illustrative total crossing waits, with lane class, freshness, source, and northbound scope visible.
- Completed Story: As a northbound traveler, I can choose an applicable CBP lane class and see its official delay, operating state, and lanes open without changing Celestan's illustrative total-crossing estimate.
- Completed Story: As a maintainer, I can accumulate an auditable history of official CBP lane observations without confusing collection time, source time, or total crossing time.
- Status: Celestan now preserves deduplicated CBP lane observations in date-partitioned NDJSON while keeping source time, collection time, lane estimates, and illustrative total crossing time distinct. Scheduled collection can compound independently while human observation gates further UX commitments.
- Verification: `npm run check:cbp`, `npm run check:cbp-archive`, `npm run check:adapter`, all JavaScript syntax checks, `npm run check:browser`, live collection, and `git diff --check` pass. Archive coverage includes repeated polls, same-minute corrections, later source updates, stale source values, future timestamps, unavailable input, and cross-partition identity checks.
- Delivery: GitHub account `MidnightProject-MP` is authenticated. Remote is `https://github.com/MidnightProject-MP/BorderWaitTimes.git`; local `main` tracks `origin/main`. The archive Story is implemented locally and awaiting commit and push.
