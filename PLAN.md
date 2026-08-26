# Temporary Execution Plan

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Completed Story: As a traveler, I can report whether Celestan's recommendation changed my plan without sharing personal data.
Completed Story: As a product owner, I can preserve the full Cruce journey model while distinguishing proven capabilities from future hypotheses.
Active Story: As a product owner, I can test which real-world constraint should define Cruce's Plan experience before implementing arrival-by or lane logic.

Why now: Review confirms that the delivered mobile wedge is a strong current-choice experience, but not yet a true Plan experience. The next decision is whether travelers organize planning around arrival deadlines, departure windows, flexibility, or lane eligibility.

1. Compare arrival-by, departure-window, flexibility, and eligibility as competing planning jobs. Complete.
2. Define a bounded stated-choice experiment using labeled illustrative scenarios. Complete.
3. Define evidence capture and promotion rules without adding silent telemetry or forecast claims. Complete.
4. Update durable state and deliver the experiment protocol. In progress.

Constraints:

- Explore broadly; implement narrowly.
- Do not present hypotheses as current capabilities or forecast claims.
- Optimize interventions for remaining decision flexibility.
- Do not begin a full Plan redesign until evidence selects the governing constraint.
- Never present synthetic scenarios as live forecasts or authoritative lane eligibility.
- Treat “already decided” as timing evidence, not automatic product failure.

Verification: `PLAN-EXPERIMENT.md` defines four competing planning constraints, local/moderated capture, and promotion rules without changing the main UI. Existing browser, adapter, archive, syntax, and whitespace checks remain the implementation baseline.

Next step: Run the four-scenario Plan experiment with frequent crossers, then choose one narrow Plan Story from observed constraints.
