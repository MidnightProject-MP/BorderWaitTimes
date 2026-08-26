import { assessCoverage, summarizeObservations } from './observation-summary.mjs';

const OFFICIAL_SOURCES = new Set(['cbp-border-wait-times-xml', 'caltrans-d11']);

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function sourceIntervals(observations) {
  const timestamps = observations.map(({ sourceObservedAt }) => Date.parse(sourceObservedAt)).sort((left, right) => left - right);
  const intervals = timestamps.slice(1).map((timestamp, index) => timestamp - timestamps[index]);
  return {
    sampleCount: observations.length,
    cadenceMs: median(intervals),
    largestGapMs: intervals.length ? Math.max(...intervals) : 0,
  };
}

export function assessOfficialReadiness(observations, thresholds = {}) {
  if (!Array.isArray(observations)) throw new TypeError('observations must be an array');
  if (observations.some(({ source }) => !OFFICIAL_SOURCES.has(source))) throw new TypeError('official readiness accepts official observations only');
  const summaries = summarizeObservations(observations);
  const byKey = new Map();
  for (const observation of observations) {
    const key = [observation.domain, observation.source, observation.observationType, observation.subject, observation.direction, observation.lane].map((value) => value || '').join('|');
    const group = byKey.get(key) || [];
    group.push(observation);
    byKey.set(key, group);
  }
  const subjects = summaries.map((summary) => {
    const coverage = assessCoverage(summary, thresholds);
    return {
      key: summary.key,
      domain: summary.domain,
      source: summary.source,
      observationType: summary.observationType,
      subject: summary.subject,
      direction: summary.direction,
      lane: summary.lane,
      provenance: 'official-source-history',
      status: coverage.status === 'sufficient' ? 'available' : 'insufficient',
      coverage,
      freshness: summary.freshness,
      firstObservedAt: summary.firstObservedAt,
      lastObservedAt: summary.lastObservedAt,
      cadence: sourceIntervals(byKey.get(summary.key)),
    };
  });
  return {
    provenance: 'official-source-history',
    status: subjects.length ? 'available' : 'unavailable',
    thresholds: { minSamples: 1, minDays: 1, minSpanMs: 0, minValues: 0, ...thresholds },
    subjects,
  };
}
