# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a mobile traveler, I can choose a direction, understand the recommended crossing, compare alternatives, and start a crossing session without scrolling.

Why now: Traveler feedback establishes that the current experience feels like a polished information dashboard rather than a glanceable utility. The primary journey should expose the answer, not the system's internal complexity.

1. Preserve existing state and source boundaries while defining the first-viewport information hierarchy. Complete.
2. Put direction, recommendation, compact crossing comparison, and the dominant crossing action first on mobile. Complete.
3. Progressively disclose roadway, CBP lane, history, and notes without implying they power illustrative totals. Complete.
4. Verify the primary journey inside a 390 x 844 viewport, plus bilingual, desktop, source, and consent behavior. Complete.
5. Update durable state, commit, push, and inspect the rendered result. In progress.

Constraints:

- A normal crossing decision must not require scrolling on a 390 x 844 viewport.
- Do not add data merely to fill the simplified layout.
- Keep illustrative totals and recommendations semantically separate from official lane and roadway reads.
- Keep secondary evidence available and keyboard-accessible through progressive disclosure.
- Preserve the existing consent boundary and responsive desktop experience.

Verification: the rendered 390 x 844 experience keeps direction, recommendation, freshness, route/mode, comparison, all crossing choices, and the crossing-session action in the first viewport in English and Spanish. `npm run check:browser`, all adapter checks, JavaScript syntax checks, and `git diff --check` pass.

Next step: Commit, push, and deliver the corrected primary experience for traveler observation.
