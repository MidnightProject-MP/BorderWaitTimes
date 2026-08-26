import { assessCoverage, summarizeObservations } from './observation-summary.mjs';

function validHour(hour) {
  return Number.isInteger(hour) && hour >= 0 && hour <= 23;
}

export function queryTimingContext(observations, { subject, hour, minSamples = 1, minDays = 1, minSpanMs = 0, minValues = 1 } = {}) {
  if (!Array.isArray(observations)) throw new TypeError('observations must be an array');
  if (typeof subject !== 'string' || !subject) throw new TypeError('subject is required');
  if (!validHour(hour)) throw new RangeError('hour must be an integer from 0 to 23');
  const rows = observations.filter((observation) => observation.subject === subject && Number(observation.sourceObservedAt.slice(11, 13)) === hour);
  if (!rows.length) return { status: 'unavailable', reason: 'no-observations', subject, hour, summary: null, coverage: null };
  const summary = summarizeObservations(rows)[0];
  const coverage = assessCoverage(summary, { minSamples, minDays, minSpanMs, minValues });
  return { status: coverage.status === 'sufficient' ? 'available' : 'insufficient', subject, hour, summary, coverage };
}

export function compareTimingContext(observations, { subjects, hour, ...thresholds } = {}) {
  if (!Array.isArray(subjects) || !subjects.length) throw new TypeError('subjects must be a non-empty array');
  const results = subjects.map((subject) => queryTimingContext(observations, { subject, hour, ...thresholds }));
  const ranked = results.filter((result) => result.status === 'available').sort((left, right) => left.summary.median - right.summary.median || left.summary.max - right.summary.max || left.subject.localeCompare(right.subject));
  return { hour, results, ranked };
}
