import assert from 'node:assert/strict';
import { assessCoverage, summarizeObservations } from './observation-summary.mjs';

const observations = [
  { domain: 'border-processing', source: 'cbp', observationType: 'border_lane_wait', subject: 'san-ysidro:passengerStandard', direction: 'northbound', lane: 'passengerStandard', unit: 'minutes', value: 60, status: 'fresh', sourceObservedAt: '2026-08-26T10:00:00.000Z', collectedAt: '2026-08-26T10:01:00.000Z' },
  { domain: 'border-processing', source: 'cbp', observationType: 'border_lane_wait', subject: 'san-ysidro:passengerStandard', direction: 'northbound', lane: 'passengerStandard', unit: 'minutes', value: 40, status: 'stale', sourceObservedAt: '2026-08-26T11:00:00.000Z', collectedAt: '2026-08-26T11:01:00.000Z' },
  { domain: 'border-processing', source: 'cbp', observationType: 'border_lane_wait', subject: 'san-ysidro:passengerStandard', direction: 'northbound', lane: 'passengerStandard', unit: 'minutes', value: 80, status: 'fresh', sourceObservedAt: '2026-08-26T12:00:00.000Z', collectedAt: '2026-08-26T12:01:00.000Z' },
  { domain: 'roadway-context', source: 'caltrans', observationType: 'roadway_lane_closure', subject: 'San Ysidro roadway approach', direction: 'southbound', lane: null, unit: null, value: null, status: 'unknown', sourceObservedAt: '2026-08-26T10:30:00.000Z', collectedAt: '2026-08-26T10:31:00.000Z' },
];
const summaries = summarizeObservations(observations);
assert.equal(summaries.length, 2);
const border = summaries.find(({ domain }) => domain === 'border-processing');
assert.deepEqual({ sampleCount: border.sampleCount, valueCount: border.valueCount, min: border.min, max: border.max, median: border.median, freshness: border.freshness }, { sampleCount: 3, valueCount: 3, min: 40, max: 80, median: 60, freshness: { fresh: 2, stale: 1, unknown: 0 } });
const roadway = summaries.find(({ domain }) => domain === 'roadway-context');
assert.deepEqual({ sampleCount: roadway.sampleCount, valueCount: roadway.valueCount, median: roadway.median }, { sampleCount: 1, valueCount: 0, median: null });
assert.deepEqual(border.observedDays, ['2026-08-26']);
assert.throws(() => summarizeObservations(null), /array/);
assert.throws(() => summarizeObservations([{ ...observations[0], status: 'forecast' }]), /unsupported observation status/);
assert.throws(() => summarizeObservations([{ ...observations[0], value: Infinity }]), /finite/);
assert.deepEqual(summarizeObservations([...observations].reverse()), summaries);

console.log('observation summary checks passed');
