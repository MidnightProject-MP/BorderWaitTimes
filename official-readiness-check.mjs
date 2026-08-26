import assert from 'node:assert/strict';
import { readObservationHistory } from './observation-history.mjs';
import { generateIllustrativeObservations } from './illustrative-dataset.mjs';
import { assessOfficialReadiness } from './official-readiness.mjs';

const fixture = (sourceObservedAt, value = 10) => ({
  domain: 'border-processing', source: 'cbp-border-wait-times-xml', observationType: 'border_lane_wait', subject: 'otay-mesa:passengerStandard', direction: 'northbound', lane: 'passengerStandard', unit: 'minutes', value, status: 'fresh', sourceObservedAt, collectedAt: sourceObservedAt,
});
const report = assessOfficialReadiness([fixture('2026-08-26T10:00:00.000Z'), fixture('2026-08-26T11:00:00.000Z'), fixture('2026-08-26T14:00:00.000Z')], { minSamples: 3, minDays: 1, minSpanMs: 4 * 60 * 60 * 1000, minValues: 3 });
assert.equal(report.status, 'available');
assert.equal(report.provenance, 'official-source-history');
assert.equal(report.subjects.length, 1);
assert.equal(report.subjects[0].status, 'available');
assert.equal(report.subjects[0].cadence.cadenceMs, 2 * 60 * 60 * 1000);
assert.equal(report.subjects[0].cadence.largestGapMs, 3 * 60 * 60 * 1000);
assert.deepEqual(report.subjects[0].freshness, { fresh: 3, stale: 0, unknown: 0 });

const insufficient = assessOfficialReadiness([fixture('2026-08-26T10:00:00.000Z'), fixture('2026-08-26T11:00:00.000Z')], { minDays: 2 });
assert.equal(insufficient.subjects[0].status, 'insufficient');
assert.ok(insufficient.subjects[0].coverage.reasons.length > 0);
assert.equal(assessOfficialReadiness([]).status, 'unavailable');
assert.equal(assessOfficialReadiness(await readObservationHistory()).subjects.length, 12);
assert.throws(() => assessOfficialReadiness(generateIllustrativeObservations()), /official observations only/);
assert.throws(() => assessOfficialReadiness(null), /observations/);

console.log('official readiness checks passed');
