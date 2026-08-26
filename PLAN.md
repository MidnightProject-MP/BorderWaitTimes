# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a maintainer, I can distinguish a safely skipped ambiguous CBP poll from a broken scheduled collector.

Why now: Two scheduled runs failed because the live CBP feed advanced its feed-level date while target ports still reported the prior date. The adapter correctly rejected the ambiguous timestamps, but the collector treated an expected fail-closed source condition as a collector failure.

1. Confirm the live failure is source ambiguity and that the committed archive remains valid. Complete.
2. Keep the data path fail-closed while classifying no-observation polls as safe skips at the scheduled CLI boundary. Complete.
3. Add regression coverage and documentation for ambiguous/unavailable source skips. Complete.
4. Update durable state, commit, push, and verify a scheduled workflow recovery. Complete.

Constraints:

- Never archive rows with unknown or semantically ambiguous timestamps.
- A safe skip must not mutate the archive or look like a successful collection.
- Unexpected program errors must still fail the workflow.
- Do not change the traveler-facing product.

Verification: the live feed previously reported `last_updated_date=2026-8-26` while target ports reported `8/25/2026`; normalization returned no timestamped observations and the archive remained unchanged. After the safe-skip fix, recent scheduled runs passed and the archive is valid with 57 rows across 2 partitions. Tests prove safe skips preserve the archive and unexpected errors remain failures.

Next step: Wait for the next product evidence boundary: frequent-crosser observation of the decision wedge.
