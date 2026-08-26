import assert from 'node:assert/strict';
import { generateIllustrativeObservations } from './illustrative-dataset.mjs';
import { compareTimingContext, queryTimingContext } from './timing-context.mjs';

const observations = generateIllustrativeObservations();
const otay = queryTimingContext(observations, { subject: 'otay-mesa:passengerStandard', hour: 7, minSamples: 20, minDays: 20 });
assert.equal(otay.status, 'available');
assert.equal(otay.summary.sampleCount, 28);
assert.equal(otay.summary.observedDayCount, 28);
assert.equal(otay.summary.valueCount, 28);
assert.ok(otay.summary.median > 0);
assert.deepEqual(otay.coverage.reasons, []);

const comparison = compareTimingContext(observations, { subjects: ['san-ysidro:passengerStandard', 'otay-mesa:passengerStandard', 'tecate:passengerStandard'], hour: 7, minSamples: 20, minDays: 20 });
assert.equal(comparison.results.length, 3);
assert.equal(comparison.ranked.length, 3);
assert.equal(comparison.ranked[0].subject, 'tecate:passengerStandard');
const underCovered = queryTimingContext(observations.slice(0, 2), { subject: observations[0].subject, hour: 7, minSamples: 20, minDays: 20 });
assert.equal(underCovered.status, 'insufficient');
assert.ok(underCovered.coverage.reasons.length > 0);
assert.equal(queryTimingContext(observations, { subject: 'otay-mesa:passengerStandard', hour: 9 }).status, 'unavailable');
assert.throws(() => queryTimingContext(observations, { subject: 'x', hour: 24 }), /hour/);
assert.throws(() => compareTimingContext(observations, { subjects: [], hour: 7 }), /non-empty/);

console.log('timing context checks passed');
