# Product Opportunity Brief

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

This is a discovery artifact, not a feature backlog. The current mobile crossing decision remains the product wedge and the instrument for learning. No hypothesis below should become implementation work until its smallest evidence test produces a meaningful signal.

## Current Evidence

- The first viewport already gives a traveler a direction, recommendation, alternatives, and an explicit crossing-session action.
- CBP provides northbound lane estimates; Caltrans provides U.S.-side roadway context. Neither source alone measures a traveler's total crossing experience.
- No official historical, ANAM/Tijuana, or municipal crossing-condition feed has been confirmed.
- The committed archive is Celestan observation data, not official history: 36 rows across two UTC partitions, with uneven port/lane coverage.
- The strongest defensible asset today is provenance and observation discipline, not prediction accuracy.

## Competing Framings

### Decision-grade crossing concierge

- Decision: which port, direction, mode, and lane combination minimizes total trip friction now?
- Leverage: combine lane estimates, approach context, lane class, freshness, and uncertainty.
- Risk: travelers may be constrained by permits, destination, tolls, parking, transit, or safety and may not change ports.
- Smallest test: observe frequent travelers using the current first viewport when alternatives differ materially; record whether the recommendation changes their choice.

### Personal crossing truth

- Decision: when should I leave, and how long will my crossing actually take?
- Leverage: explicit temporary sessions can eventually compare published estimates with observed approach, queue, and completion signals.
- Risk: location consent, sparse observations, selection bias, and the trust burden of movement data.
- Smallest test: offer the simulated consent flow to frequent crossers and measure opt-in intent plus willingness to share one crossing signal for a more accurate estimate.

### Border change intelligence

- Decision: is this change temporary noise, a lane-specific problem, or a persistent shift worth acting on?
- Leverage: append-only observations, corrections, operational state, lanes-open changes, and source freshness.
- Risk: the feed may be too irregular or semantically ambiguous for reliable trend claims.
- Smallest test: ask travelers and border-dependent operators to classify archived changes as actionable, noise, or already known, then compare with subsequent observations.

### Cross-border routine planner

- Decision: for a recurring commute, appointment, school run, or family trip, which crossing and departure window is reliably least disruptive?
- Leverage: direction-specific decisions, recurring sessions, and longitudinal patterns.
- Risk: missing southbound and Mexico-side data, thin history, and strong preference for familiar routes.
- Smallest test: diary frequent crossers for one week and ask whether recurring patterns would change departure time or port choice.

## Working Direction

Keep the mobile crossing decision as the core wedge and instrument, while testing whether trustworthy longitudinal border intelligence becomes the larger product. This direction is a hypothesis, not a commitment. Discovery should produce evidence for narrowing; once a valuable core is established, implementation should simplify aggressively around it.
