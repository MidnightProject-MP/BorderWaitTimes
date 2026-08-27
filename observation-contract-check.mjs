import assert from 'node:assert/strict';
import { createObservation, observationId, projectCaltransObservations, validateObservation } from './observation-contract.mjs';

const collectedAt = '2026-08-26T10:15:00.000Z';
const fresh = createObservation({
  source: 'test', sourceUrl: 'https://example.test/source', observationType: 'test_value', subject: 'test segment',
  sourceObservedAt: '2026-08-26T10:00:00.000Z', collectedAt, status: 'fresh', value: 12, unit: 'minutes',
});
assert.deepEqual(validateObservation(fresh), []);
assert.equal(observationId(fresh), observationId({ ...fresh, metadata: { ignored: true } }));
assert.ok(validateObservation({ ...fresh, sourceObservedAt: '2026-08-26T10:00:00Z' }).includes('sourceObservedAt must be canonical ISO'));
assert.ok(validateObservation({ ...fresh, collectedAt: 'not-a-date' }).includes('collectedAt must be canonical ISO'));
assert.throws(() => createObservation({ ...fresh, status: 'fresh', value: -1 }), /value is invalid/);
assert.throws(() => createObservation({ ...fresh, value: 12, unit: null }), /unit is required/);

const roadway = projectCaltransObservations({ roadwayContext: {
  travelTime: { status: 'fresh', segment: 'I-5 BORDER southbound', minutes: 28, accuracy: 54.9, sourceTimestamp: { recordEpoch: '1787738400' } },
  laneClosures: { closures: [{ status: 'stale', sourceTimestamp: { recordEpoch: '1787738400' }, closureType: 'Lane', work: 'Paving', lanesClosed: [1, 4], totalExistingLanes: 4, closureWindow: null }] },
} }, { collectedAt });
assert.equal(roadway.length, 2);
assert.equal(roadway[0].value, 28);
assert.equal(roadway[0].sourceObservedAt, '2026-08-26T10:00:00.000Z');
assert.equal(roadway[1].value, null);
assert.equal(roadway[1].status, 'stale');
assert.ok(roadway.every((observation) => validateObservation(observation).length === 0));
const closures = roadway.filter(({ observationType }) => observationType === 'roadway_lane_closure');
assert.notEqual(observationId(closures[0]), observationId({ ...closures[0], metadata: { ...closures[0].metadata, work: 'Different work' } }));

console.log('observation contract checks passed');
