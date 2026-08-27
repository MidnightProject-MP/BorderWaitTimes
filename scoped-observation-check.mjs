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

assert.equal(validateScopedObservation(record), true);
const joined = joinScopedObservations({ observations: [observation], scopes: [record] });
assert.equal(joined.length, 1);
assert.equal(joined[0].observation, observation);
assert.equal(joined[0].scopeRecord, record);
assert.throws(() => validateScopedObservation({ ...record, sourceObservedAt: '2026-08-27T10:02:00Z' }), /timestamp order/);
assert.throws(() => validateScopedObservation({ ...record, scope: { ...cbpScope, evidenceStatus: 'inferred' } }), /scope evidence/);
assert.throws(() => validateScopedObservation({ ...record, prediction: { estimateMinutes: 10 } }), /unsupported data/);
assert.throws(() => validateScopedObservation({ ...record, scope: { ...cbpScope, measurementKind: 'forecast' } }), /scope vocabulary/);
assert.throws(() => joinScopedObservations({ observations: [], scopes: [record] }), /unknown source observation/);
assert.throws(() => joinScopedObservations({ observations: [{ ...observation, source: 'caltrans' }], scopes: [record] }), /scope source mismatch/);
assert.throws(() => joinScopedObservations({ observations: [observation], scopes: [record, { ...record, recordId: 'scope-overlay-2' }] }), /duplicate scope overlay/);

console.log('scoped observation checks passed');
