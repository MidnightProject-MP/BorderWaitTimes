# Cruce Roadmap

Project: Celestan border intelligence network

Epic: Phase 1, become the best place to see the San Diego/Tijuana border

## Roadmap

### 1. Trustworthy Data Foundation

Status: Complete.

- Normalize CBP and Caltrans feeds fail-closed.
- Preserve source-observed time, collection time, freshness, and provenance.
- Archive and verify source observations independently.
- Read multiple archives without conflating border processing and roadway context.
- Keep synthetic development data separate from official history.

Exit condition: source observations can be collected, audited, and read without silently producing false current values.

### 2. Descriptive Timing Context

Status: In progress.

- Exercise timing mechanics with deterministic synthetic history.
- Query historical values by port, lane/program, direction, and time bucket.
- Return observed median/range, sample coverage, and freshness metadata.
- Rank options descriptively only when caller-declared coverage requirements pass.

Exit condition: a timing context response can explain what the archive observed without claiming what will happen next.

### 3. Official History Migration

Status: Ready after sufficient collection.

- Continue collecting CBP and Caltrans observations.
- Measure per-source cadence, stale periods, gaps, and subject coverage.
- Replace synthetic inputs only for subjects with sufficient official coverage.
- Keep unsupported subjects visibly unavailable rather than backfilling them.

Exit condition: official history supports a declared descriptive comparison for a specific port/lane/time bucket.

### 4. Arrival-Window Discovery

Status: Hypothesis, not implementation commitment.

- Test whether travelers care more about arrival deadlines, departure windows, flexibility, or eligibility.
- Define uncertainty language and decision thresholds from evidence.
- Do not implement arrival-by guarantees or eligibility inference before this discovery passes.

Exit condition: repeated traveler decisions demonstrate a stable timing constraint that the available data can responsibly support.

### 5. Traveler-Facing Timing UI

Status: Later presentation layer.

- Expose timing context only after the data service and coverage rules are stable.
- Keep official reads, descriptive history, and illustrative estimates visually distinct.
- Reconcile mobile layout and bilingual copy after the data contract settles.

Exit condition: the UI communicates a useful timing decision without hiding provenance, coverage, or uncertainty.

## Operating Rules

- Complete the current Story before advancing the roadmap status.
- Do not treat synthetic observations as official evidence.
- Do not convert descriptive history into a forecast without a separate validated model.
- Do not block data-foundation progress on presentation feedback.
- When official coverage is thin, report insufficiency instead of imputing values.
