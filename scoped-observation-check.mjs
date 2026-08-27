import assert from 'node:assert/strict';
import { joinScopedObservations, validateScopedObservation } from './scoped-observation.mjs';

const cbpScope = {
  domain: 'border-processing',
  direction: 'northbound',
  facility: 'san-ysidro/250401/passengerStandard',
  measurementKind: 'reported-estimate',
  evidenceStatus: 'source-confirmed',
  coverage: 'CBP-reported lane delay scope',
  exclusions: ['physical queue extent', 'roadway approach', 'total crossing'],
};

const caltransScope = {
  domain: 'roadway-approach',
  direction: 'southbound',
  facility: 'San Ysidro roadway approach',
  measurementKind: 'status',
  evidenceStatus: 'source-confirmed',
  coverage: 'Published San Ysidro roadway lane closure context',
  exclusions: ['customs processing', 'physical queue extent', 'causal delay'],
};

const record = {
  recordSchemaVersion: 1,
  recordId: 'scope-overlay-1',
  sourceObservationId: 'observation-1',
  source: 'cbp-border-wait-times-xml',
  sourceObservedAt: '2026-08-27T10:00:00Z',
  collectedAt: '2026-08-27T10:01:00Z',
  scope: cbpScope,
};

const observation = {
  observationId: 'observation-1',
  source: 'cbp-border-wait-times-xml',
  sourceObservedAt: '2026-08-27T10:00:00Z',
  collectedAt: '2026-08-27T10:01:00Z',
  value: 42,
};

const caltransRecord = {
  recordSchemaVersion: 1,
  recordId: 'scope-overlay-2',
  sourceObservationId: 'observation-2',
  source: 'caltrans-d11',
  sourceObservedAt: '2026-08-27T13:38:03Z',
  collectedAt: '2026-08-27T13:43:50.255Z',
  scope: caltransScope,
};

const caltransObservation = {
  observationId: 'observation-2',
  source: 'caltrans-d11',
  sourceObservedAt: '2026-08-27T13:38:03Z',
  collectedAt: '2026-08-27T13:43:50.255Z',
  value: null,
};

assert.equal(validateScopedObservation(record), true);
const joined = joinScopedObservations({ observations: [observation], scopes: [record] });
assert.equal(joined.length, 1);
assert.equal(joined[0].observation, observation);
assert.equal(joined[0].scopeRecord, record);
const joinedSources = joinScopedObservations({ observations: [observation, caltransObservation], scopes: [record, caltransRecord] });
assert.equal(joinedSources[1].scopeRecord.scope.domain, 'roadway-approach');
assert.notEqual(joinedSources[0].scopeRecord.scope.domain, joinedSources[1].scopeRecord.scope.domain);
assert.throws(() => validateScopedObservation({ ...record, sourceObservedAt: '2026-08-27T10:02:00Z' }), /timestamp order/);
assert.throws(() => validateScopedObservation({ ...record, scope: { ...cbpScope, evidenceStatus: 'inferred' } }), /scope evidence/);
assert.throws(() => validateScopedObservation({ ...record, prediction: { estimateMinutes: 10 } }), /unsupported data/);
assert.throws(() => validateScopedObservation({ ...record, scope: { ...cbpScope, measurementKind: 'forecast' } }), /scope vocabulary/);
assert.throws(() => joinScopedObservations({ observations: [], scopes: [record] }), /unknown source observation/);
assert.throws(() => joinScopedObservations({ observations: [{ ...observation, source: 'caltrans' }], scopes: [record] }), /scope source mismatch/);
assert.throws(() => joinScopedObservations({ observations: [observation], scopes: [record, { ...record, recordId: 'scope-overlay-2' }] }), /duplicate scope overlay/);

console.log('scoped observation checks passed');
