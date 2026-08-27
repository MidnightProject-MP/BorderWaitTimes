# Cruce Border System Research

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

Status: Research brief, not a feature specification or traveler-facing claim.

## Research Direction

Cruce should progressively understand the border as a specialized system. Official feeds are sensors with defined measurement boundaries. Completed crossings are potential ground truth. The useful output is knowledge that no single upstream source provides, while the traveler-facing product remains simpler than the underlying system.

The working loop is:

`observe -> learn -> model -> measure -> predict -> improve decisions -> observe outcomes -> learn again`

Each transition requires explicit provenance, scope, uncertainty, and evaluation against outcomes. Forecasting, queue inference, location-derived observations, simulation, and machine learning remain research capabilities until their evidence supports a product claim.

## Domain Evidence

The product owner provides meaningful border expertise that is not otherwise available in the repository. It is currently evidence from one domain expert, not a representative sample or independently validated measurement.

- Official wait measurement may begin after the real controlled queue has already extended upstream.
- The upstream queue is a distinct guarded system, not generic roadway congestion.
- A crossing can be divided into physical sections and checkpoints.
- General and Ready Lane may share sections before fanning into separate streams.
- SENTRI has a substantially separate approach and entry path.
- Movement between checkpoints could provide segment-level observations.
- A completed crossing can provide ground truth from queue entry through customs completion.
- Cruce observations can be compared with official data where their measurement scopes converge.

These statements justify investigation and schema design. They do not yet justify generalized topology, queue-length, capacity, or forecast claims to travelers.

## Confirmed Current Signals

| Signal | Current source | Scope | Current use |
| --- | --- | --- | --- |
| Reported lane delay | CBP XML | Northbound port/lane estimate | Official source observation, not total crossing time |
| Operating and port state | CBP XML | Northbound port/lane | Source context |
| Lanes open | CBP XML | Northbound port/lane | Capacity proxy only; not throughput or staffed booths |
| Approach travel time | Caltrans D11 JSON | Selected U.S.-side I-5 segment | Roadway context, not customs processing |
| Lane closures | Caltrans D11 JSON | Published San Ysidro roadway closures | Disruption context, not queue extent |
| CCTV metadata | Caltrans CCTV index | Camera metadata and timestamps | Potential future visual research; bulk viewing is constrained |
| Source freshness/provenance | Celestan collectors | Source and collection timestamps | Archive trust and evidence qualification |

The source inventory in `SOURCES.md` records these boundaries and the absence of official historical CBP, ANAM/Tijuana, and municipal crossing-condition archives.

## Missing Evidence

- Physical queue start, extent, and segment occupancy.
- Queue movement and checkpoint transition times.
- Throughput, arrivals, departures, and effective processing capacity.
- Staffed booth availability and lane utilization.
- Mexico-side approach and customs conditions.
- Completed crossing duration from a defined queue-entry event to being across.
- Reliable mapping between official delay scope and total traveler experience.
- Independent evaluation labels for any future prediction.

## Research Artifacts

Keep these separate from the current version-1 official source observation contract.

### Topology Registry

A future `border-topology-v1` artifact should describe an ordered, versioned vocabulary of crossings, approaches, queue segments, fan-out points, checkpoints, and exits. Each item should carry evidence status, direction, lane/program applicability, and measurement-boundary notes. It must not imply geometry or queue behavior that has not been evidenced.

### Crossing Session

A future `crossing-session-v1` artifact should represent consented ground truth separately from source observations. The smallest useful fields are a pseudonymous session identifier, crossing and lane/program, direction, queue-start time when known, checkpoint event times when known, across time when known, capture method, time precision, confidence, and label status. Timestamp-only capture is the initial privacy boundary; raw location is not required.

### Evaluation Record

A future `model-evaluation-v1` artifact should record model version, target definition, topology version, prediction time, input cutoff, forecast horizon, prediction interval, realized outcome, and holdout identifier. Evaluation should report eligible count, missing labels, interval coverage, absolute error, signed bias, and breakdowns by crossing, lane/program, and horizon. Descriptive archive medians are not model evaluation.

## Smallest Autonomous Research Tracks

1. Define the topology vocabulary and measurement-boundary questions for San Ysidro, Otay Mesa, and Tecate without asserting unverified geometry.
2. Preserve official observations and source scope now because source history and collection conditions cannot be recreated later.
3. Design consented timestamp event labels before adding location or automatic movement capture.
4. Establish descriptive and simple queueing baselines before considering simulation or machine learning.
5. Define leakage-safe evaluation using completed outcomes before presenting any forecast to travelers.
6. Continue mechanical official collection independently from product discovery.

## Evidence Gates

- Domain feedback can justify a research hypothesis and vocabulary, but not a population claim.
- Official lane delay remains lane delay; it must not be relabeled as total crossing time.
- `lanesOpen` remains a capacity proxy, not throughput or booth staffing.
- Roadway context remains separate from customs processing.
- Synthetic data may exercise schemas and methods, but cannot validate topology or performance.
- A model is not traveler-ready without independently labeled outcomes, held-out evaluation, scope alignment, and calibrated uncertainty.

## Next Question

What is the smallest stable set of physical segments and timestamp events that can be defined from domain knowledge and public source boundaries without pretending that the topology has already been measured?
