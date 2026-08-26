import assert from 'node:assert/strict';
import { assessCoverage } from './observation-summary.mjs';

const summary = {
  sampleCount: 8,
  valueCount: 7,
  observedDayCount: 3,
  observedSpanMs: 48 * 60 * 60 * 1000,
};
assert.deepEqual(assessCoverage(summary, { minSamples: 5, minDays: 2, minSpanMs: 24 * 60 * 60 * 1000, minValues: 6 }), {
  status: 'sufficient', reasons: [], thresholds: { minSamples: 5, minDays: 2, minSpanMs: 24 * 60 * 60 * 1000, minValues: 6 },
});
const insufficient = assessCoverage(summary, { minSamples: 10, minDays: 4, minSpanMs: 72 * 60 * 60 * 1000, minValues: 9 });
assert.equal(insufficient.status, 'insufficient');
assert.equal(insufficient.reasons.length, 4);
assert.throws(() => assessCoverage(summary, { minDays: 1.5 }), /non-negative integer/);
assert.throws(() => assessCoverage(summary, { minSpanMs: -1 }), /non-negative number/);
assert.throws(() => assessCoverage(null), /summary/);

console.log('observation coverage checks passed');
