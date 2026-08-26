# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a maintainer, I can verify the committed CBP observation archive's integrity so accumulated history remains trustworthy over time.

Why now: Scheduled collection is operating independently and the archive now spans multiple UTC partitions. Existing checks validated collector logic against fixtures only; nothing guarded the committed dataset itself against schema drift, identity tampering, or partition errors.

1. Export the shared observation identity function so verification cannot drift from collection. Complete.
2. Add a deterministic verifier for the committed archive: schema, enums, timestamps, partition agreement, identity recomputation, and cross-partition uniqueness. Complete.
3. Verify the verifier against valid and deliberately corrupted archives, and confirm it accepts the real archive. Complete.
4. Gate scheduled collection on verification and record the boundary. Complete.
5. Update durable state, commit, push, and verify the workflow. Complete.

Constraints:

- Verification must read only the committed archive; it never mutates data.
- A violation must fail visibly before collection appends new rows.
- Do not change the observation schema, identity rules, or traveler-facing behavior.
- Traveler observation of the simplified first viewport still gates further UX Stories.

Verification: `npm run verify:cbp-archive` accepts the live committed archive (30 rows across 2 partitions). Fixture coverage confirms detection of tampered values, duplicate identities, invalid partitions, out-of-partition collection, observed-after-collected rows, unsupported enums, schema drift, and mismatched identity hashes. `npm run check:cbp`, `npm run check:cbp-archive`, `npm run check:adapter`, `npm run check:browser`, all JavaScript syntax checks, and `git diff --check` pass.

Next step: Wait for traveler feedback on the simplified first-viewport decision journey; do not start another UX Story without evidence.
