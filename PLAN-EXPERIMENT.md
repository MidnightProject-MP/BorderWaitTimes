# Plan Experiment

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

## Question

When frequent crossers make a border decision, is their primary constraint an arrival deadline, a preferred departure window, how much flexibility they have, or which lane/program they can actually use?

This tests the problem framing. It does not claim to forecast arrival time, recommend an eligible lane, or validate a total-crossing estimate.

## Scenarios

Show one scenario at a time using clearly labeled illustrative values:

1. Arrival deadline: "I need to be in San Diego by 9:00 AM." Which plan would you choose?
2. Departure window: "I can leave any time between 7:00 and 11:00 AM." Which window is most useful?
3. Flexibility: "I can change my departure, port, or neither." What tradeoff would you make?
4. Eligibility: "I use General, Ready Lane, SENTRI, or pedestrian." Which options would you eliminate before comparing waits?

Do not present synthetic values as live conditions. Do not imply that a lane is valid for a traveler based only on the CBP feed.

## Capture

For each scenario, capture only the scenario, stated choice, initial intended plan, whether the scenario changed that plan, reason for accepting or rejecting the framing, and whether the illustrative/source boundary was understood.

Use moderated notes or an explicit local export. Do not add silent analytics, accounts, precise location, device identifiers, or remote transmission.

## Decision Rule

- Promote arrival-by planning only if it is a recurring decision criterion and users understand uncertainty without treating the result as a guarantee.
- Promote departure-window guidance only if travelers prefer timing advice over a current port comparison and the archive later supports calibration.
- Promote flexibility-aware planning only if users can identify when changing time versus port is worthwhile.
- Promote eligibility-first planning only after authoritative program rules are available and comprehension testing reliably rejects invalid options.

"I was already decided" is not a failure result. It may indicate the product reached the traveler too late and should move earlier in the journey.

## Current Boundary

The current app remains the decision wedge and local choice instrument. Its CBP archive is useful for provenance and collection discipline, not yet for arrival-by confidence, future queue prediction, or lane eligibility recommendations.
