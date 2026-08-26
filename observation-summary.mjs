function groupKey(observation) {
  return [observation.domain, observation.source, observation.observationType, observation.subject, observation.direction, observation.lane].map((value) => value || '').join('|');
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function summarizeObservations(observations) {
  if (!Array.isArray(observations)) throw new TypeError('observations must be an array');
  const groups = new Map();
  for (const observation of observations) {
    if (!observation || typeof observation !== 'object') throw new TypeError('observation entries must be objects');
    const key = groupKey(observation);
    let group = groups.get(key);
    if (!group) {
      group = {
        key,
        domain: observation.domain || null,
        source: observation.source,
        observationType: observation.observationType,
        subject: observation.subject,
        direction: observation.direction || null,
        lane: observation.lane || null,
        unit: observation.unit || null,
        sampleCount: 0,
        valueCount: 0,
        freshness: { fresh: 0, stale: 0, unknown: 0 },
        values: [],
        firstObservedAt: null,
        lastObservedAt: null,
        firstCollectedAt: null,
        lastCollectedAt: null,
        observedDays: new Set(),
      };
      groups.set(key, group);
    }
    group.sampleCount += 1;
    if (group.freshness[observation.status] === undefined) throw new TypeError(`unsupported observation status: ${observation.status}`);
    group.freshness[observation.status] += 1;
    if (observation.value !== null) {
      if (!Number.isFinite(observation.value)) throw new TypeError('observation values must be finite');
      group.valueCount += 1;
      group.values.push(observation.value);
    }
    group.firstObservedAt = group.firstObservedAt === null || observation.sourceObservedAt < group.firstObservedAt ? observation.sourceObservedAt : group.firstObservedAt;
    group.lastObservedAt = group.lastObservedAt === null || observation.sourceObservedAt > group.lastObservedAt ? observation.sourceObservedAt : group.lastObservedAt;
    group.observedDays.add(observation.sourceObservedAt.slice(0, 10));
    group.firstCollectedAt = group.firstCollectedAt === null || observation.collectedAt < group.firstCollectedAt ? observation.collectedAt : group.firstCollectedAt;
    group.lastCollectedAt = group.lastCollectedAt === null || observation.collectedAt > group.lastCollectedAt ? observation.collectedAt : group.lastCollectedAt;
  }
  return [...groups.values()].map((group) => {
    const values = group.values;
    const summary = {
      key: group.key,
      domain: group.domain,
      source: group.source,
      observationType: group.observationType,
      subject: group.subject,
      direction: group.direction,
      lane: group.lane,
      unit: group.unit,
      sampleCount: group.sampleCount,
      valueCount: group.valueCount,
      min: values.length ? Math.min(...values) : null,
      max: values.length ? Math.max(...values) : null,
      median: median(values),
      freshness: group.freshness,
      firstObservedAt: group.firstObservedAt,
      lastObservedAt: group.lastObservedAt,
      firstCollectedAt: group.firstCollectedAt,
      lastCollectedAt: group.lastCollectedAt,
      observedDays: [...group.observedDays].sort(),
      observedDayCount: group.observedDays.size,
      observedSpanMs: group.firstObservedAt && group.lastObservedAt ? Date.parse(group.lastObservedAt) - Date.parse(group.firstObservedAt) : 0,
    };
    return summary;
  }).sort((left, right) => left.key.localeCompare(right.key));
}

export function assessCoverage(summary, { minSamples = 1, minDays = 1, minSpanMs = 0, minValues = 0 } = {}) {
  if (!summary || typeof summary !== 'object') throw new TypeError('summary must be an object');
  for (const [name, value] of Object.entries({ minSamples, minDays, minSpanMs, minValues })) {
    if (!Number.isFinite(value) || value < 0 || (name !== 'minSpanMs' && !Number.isInteger(value))) throw new RangeError(`${name} must be a non-negative ${name === 'minSpanMs' ? 'number' : 'integer'}`);
  }
  const reasons = [];
  if (summary.sampleCount < minSamples) reasons.push(`sampleCount ${summary.sampleCount} is below ${minSamples}`);
  if (summary.observedDayCount < minDays) reasons.push(`observedDayCount ${summary.observedDayCount} is below ${minDays}`);
  if (summary.observedSpanMs < minSpanMs) reasons.push(`observedSpanMs ${summary.observedSpanMs} is below ${minSpanMs}`);
  if (summary.valueCount < minValues) reasons.push(`valueCount ${summary.valueCount} is below ${minValues}`);
  return { status: reasons.length ? 'insufficient' : 'sufficient', reasons, thresholds: { minSamples, minDays, minSpanMs, minValues } };
}
