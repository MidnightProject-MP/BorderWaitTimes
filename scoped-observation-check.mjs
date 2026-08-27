import assert from 'node:assert/strict';

const DOMAINS = new Set(['border-processing', 'roadway-approach', 'research-outcome']);
const MEASUREMENT_KINDS = new Set(['reported-estimate', 'observed-duration', 'status', 'capacity-proxy', 'event']);
const ISO_WITH_ZONE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

function validTimestamp(value) {
  return typeof value === 'string' && ISO_WITH_ZONE.test(value) && Number.isFinite(Date.parse(value));
}

export function validateScopedObservation(record) {
  if (!record || record.recordSchemaVersion !== 1) throw new Error('record schema version');
  if (!record.recordId || !record.sourceObservationId || !record.source) throw new Error('record identity');
  if (!validTimestamp(record.sourceObservedAt) || !validTimestamp(record.collectedAt)) throw new Error('record timestamps');
  if (Date.parse(record.sourceObservedAt) > Date.parse(record.collectedAt)) throw new Error('timestamp order');
  const scope = record.scope;
  if (!scope || scope.evidenceStatus !== 'source-confirmed') throw new Error('scope evidence');
  if (!DOMAINS.has(scope.domain) || !MEASUREMENT_KINDS.has(scope.measurementKind)) throw new Error('scope vocabulary');
  if (!scope.direction || !scope.facility || !scope.coverage || !Array.isArray(scope.exclusions)) throw new Error('scope fields');
  if (Object.hasOwn(record, 'prediction') || Object.hasOwn(record, 'location') || Object.hasOwn(record, 'coordinates')) throw new Error('unsupported data');
  return true;
}

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
  sourceObservationId: 'sha256:source-observation-1',
  source: 'cbp-border-wait-times-xml',
  sourceObservedAt: '2026-08-27T10:00:00Z',
  collectedAt: '2026-08-27T10:01:00Z',
  scope: cbpScope,
};

assert.equal(validateScopedObservation(record), true);
assert.throws(() => validateScopedObservation({ ...record, sourceObservedAt: '2026-08-27T10:02:00Z' }), /timestamp order/);
assert.throws(() => validateScopedObservation({ ...record, scope: { ...cbpScope, evidenceStatus: 'inferred' } }), /scope evidence/);
assert.throws(() => validateScopedObservation({ ...record, prediction: { estimateMinutes: 10 } }), /unsupported data/);
assert.throws(() => validateScopedObservation({ ...record, scope: { ...cbpScope, measurementKind: 'forecast' } }), /scope vocabulary/);

console.log('scoped observation checks passed');
