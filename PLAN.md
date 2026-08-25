# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a maintainer, I can accumulate an auditable history of official CBP lane observations without confusing collection time, source time, or total crossing time.

Why now: CBP publishes a verified current feed but no official historical archive was found. Observations are perishable, this work compounds over time, and it can proceed independently of traveler observation of the current UI.

1. Extend the existing fail-closed adapter to retain validated source-reported values independently of display freshness. Complete.
2. Add a deterministic, append-only, date-partitioned collector with content-based deduplication. Complete.
3. Verify timestamp semantics, repeated polls, source corrections, stale observations, future timestamps, and unavailable input. Complete.
4. Add bounded scheduled collection with explicit provenance and no traveler-facing integration. Complete.
5. Seed the archive from a live CBP response and update durable Project/Epic/Story state. Complete.

Boundaries:

- Archive only the three verified San Diego/Tijuana ports and four supported lane classes.
- Treat each row as Celestan's observation of the CBP feed, not an official historical CBP dataset or a total crossing-time measurement.
- Keep CBP source time distinct from collection time.
- Never copy values forward, synthesize zeroes, or alter illustrative recommendations.
- Human observation still gates further UX commitments, but not this independent evidence-building Story.

Verification: all JavaScript syntax checks, `npm run check:cbp`, `npm run check:cbp-archive`, `npm run check:adapter`, `npm run check:browser`, live collection, and `git diff --check` pass. The first live run also confirmed that future source timestamps fail closed and are excluded from the archive.

Next step: Keep collecting source observations while traveler observation of the reconciled lane-selection experience remains the next evidence required for further UX work.
