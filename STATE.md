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
- Completed Story: As a maintainer, I can reject CBP lane timestamps unless the feed-level and port-scoped calendar dates are both valid and agree.
- Status: Celestan preserves deduplicated CBP lane observations while keeping source time, collection time, lane estimates, and illustrative total crossing time distinct. Lane timestamps now require valid, agreeing root and port calendar dates; unsupported rollover remains unknown rather than inferred.
- Verification: `npm run check:cbp`, `npm run check:cbp-archive`, `npm run check:adapter`, all JavaScript syntax checks, `npm run check:browser`, live no-op collection, and `git diff --check` pass. Date coverage includes valid, missing, conflicting, impossible, stale, and future source dates.
- Delivery: GitHub account `MidnightProject-MP` is authenticated. Remote is `https://github.com/MidnightProject-MP/BorderWaitTimes.git`; local `main` tracks `origin/main`. Port-scoped date validation is implemented locally and awaiting commit, push, and workflow verification.
