# Cruce Product Model

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

## Core Job

Cruce helps a traveler make the best border decision while they still have the power to change it. Before commitment, it is a planning and decision engine. After queue commitment, it becomes a calm crossing companion and an opt-in source of observed crossing evidence.

The interface should reconcile complicated sources into one actionable answer. More intelligence underneath should usually produce less complexity above.

## Strategic Direction

Cruce's long-term opportunity is to develop its own empirical understanding of the Tijuana-San Diego border rather than merely republish upstream sources. Existing feeds are sensors and evidence, not the complete truth. Useful future signals may include queue extent, queue movement, lane/program, effective capacity, throughput, approach conditions, official estimates, calendar effects, and consented completed-crossing outcomes.

The intended learning loop is observe, learn, model, measure, predict, improve decisions, observe outcomes, and learn again. This is direction, not an architecture or feature commitment. Each step must earn its way through measurable signals, explicit provenance, consent where needed, and calibration against ground truth. The product should remain simple even as the intelligence underneath becomes more sophisticated.

## Journey States

| State | Decision flexibility | Product job |
| --- | --- | --- |
| Plan | High | Choose when, where, and how to cross; support arrival-by planning. |
| Watch | High to medium | Detect meaningful change while the plan can still change. |
| Go | Medium | Compare total time to be across, including approach and queue. |
| Commit | Low | Recognize that the traveler has entered a functional queue. |
| Cross | Low | Explain progress, remaining time, and anomalies without distracting content. |
| Learn | N/A | Convert consented observations into better aggregate intelligence. |

Notifications belong primarily in `Watch` and `Go`, while optionality remains. `Cross` should not pretend that a traveler can still optimize the route.

## Candidate Users

The useful segmentation is journey state and decision flexibility, not demographics. The same person can be a routine commuter, deadline traveler, active crosser, and committed traveler on one day. Candidate situations include routine crossers, deadline travelers, flexible travelers, occasional crossers, pedestrians, lane-program users, and binational households.

## Current Proof

- The mobile `Plan` wedge provides direction, recommendation, alternatives, and an explicit crossing action in the first viewport.
- Official CBP lane estimates and Caltrans approach context are kept semantically separate from illustrative total crossing time.
- The append-only CBP archive preserves source time, collection time, corrections, and provenance, but is not yet a forecasting dataset.
- The product can capture a post-choice answer locally: followed the recommendation, chose another, or was already decided.
- The privacy boundary is opt-in, transactional, and currently simulated; the prototype does not request location.

## Future Hypotheses

- Historical observations can support baseline guidance such as a best departure window.
- Current conditions plus independent signals can support a useful nowcast.
- Consented crossing traces can eventually support personal estimates and queue-topology intelligence.
- A functional queue geography can outperform generic map traffic inside border approaches.
- Premium value should come from personal planning and intervention, not withholding basic public intelligence or requiring contribution to the network.
- A completed crossing can provide calibration evidence for prior official estimates and Cruce observations.
- Independent queue and capacity signals can produce knowledge that no single upstream source contains.

These are hypotheses, not commitments. They must earn implementation through evidence and calibrated forecast performance. Do not claim total crossing accuracy, queue inference, or personal prediction from the current prototype and archive.

The current evidence gap is material: official archives provide narrow lane estimates and limited approach context, but not physical queue extent, throughput, movement, or completed-crossing duration. Those gaps require discovery and consented evidence collection before modeling claims are justified.

## Evidence Sequence

1. Test whether the `Plan` recommendation changes frequent crossers' choices.
2. If it does, test whether travelers value arrival-by and remaining-option alerts before commitment.
3. If personal crossing data is acceptable, test whether a minimal `Cross` companion improves reassurance and produces usable observations.
4. Only then select the next product core and deepen it.
