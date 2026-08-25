# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a maintainer, I can reject CBP lane timestamps unless the feed-level and port-scoped calendar dates are both valid and agree.

Why now: Live source inspection confirmed that every port carries a scoped `<date>` while lane updates carry only a time and zone. The adapter currently ignores the port date and JavaScript can normalize impossible dates, weakening both live freshness and the observation archive.

1. Parse and round-trip validate the observed feed and port date formats. Complete.
2. Anchor lane timestamps only when valid root and port dates agree. Complete.
3. Verify valid, missing, conflicting, impossible, and future date behavior across adapter, archive, and browser checks. Complete.
4. Record the source evidence and durable Story state. Complete.
5. Commit, push, and verify collection automation. Pending.

Boundaries:

- Do not infer previous-day rollover for future timestamps; CBP does not document that rule.
- Do not use the undocumented root time as a universal cutoff or timezone authority.
- Keep source values hidden whenever timestamp semantics remain ambiguous.
- Do not change illustrative totals, recommendations, or the traveler-facing source boundary.

Verification: all JavaScript syntax checks, `npm run check:cbp`, `npm run check:cbp-archive`, `npm run check:adapter`, `npm run check:browser`, live no-op collection, and `git diff --check` pass.

Next step: Commit, push, and verify the scheduled collector against the stricter adapter. Further UX selection still requires traveler observation.
