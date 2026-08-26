import { assessCoverage } from './observation-summary.mjs';
import { summarizeObservations } from './observation-summary.mjs';

export function buildIllustrativeTimingBands(observations, { minSamples = 1, minDays = 1, minSpanMs = 0 } = {}) {
  if (!Array.isArray(observations)) throw new TypeError('observations must be an array');
  const buckets = new Map();
  for (const observation of observations) {
    if (observation.source !== 'illustrative-synthetic') throw new TypeError('timing bands accept illustrative observations only');
    const hour = observation.sourceObservedAt.slice(11, 13);
    const key = [observation.subject, hour].join('|');
    buckets.set(key, [...(buckets.get(key) || []), observation]);
  }
  return [...buckets.entries()].map(([key, rows]) => {
    const summary = summarizeObservations(rows)[0];
    return { ...summary, coverage: assessCoverage(summary, { minSamples, minDays, minSpanMs }) };
  }).sort((left, right) => left.key.localeCompare(right.key));
}
