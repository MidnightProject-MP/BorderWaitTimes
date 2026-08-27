import { readFile } from 'node:fs/promises';

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

export function joinScopedObservations({ observations = [], scopes = [] } = {}) {
  const scopeByObservation = new Map();
  for (const scopeRecord of scopes) {
    validateScopedObservation(scopeRecord);
    if (scopeByObservation.has(scopeRecord.sourceObservationId)) throw new Error('duplicate scope overlay');
    scopeByObservation.set(scopeRecord.sourceObservationId, scopeRecord);
  }
  const observationIds = new Set(observations.map((observation) => observation.observationId));
  for (const scopeRecord of scopes) {
    if (!observationIds.has(scopeRecord.sourceObservationId)) throw new Error('unknown source observation');
  }
  return observations.map((observation) => {
    const scopeRecord = scopeByObservation.get(observation.observationId) || null;
    if (scopeRecord && (scopeRecord.source !== observation.source
      || scopeRecord.sourceObservedAt !== observation.sourceObservedAt
      || scopeRecord.collectedAt !== observation.collectedAt)) throw new Error('scope source mismatch');
    return { observation, scopeRecord };
  });
}

export function verifyScopeOverlays({ observations = [], scopes = [] } = {}) {
  const recordIds = new Set();
  for (const scopeRecord of scopes) {
    if (recordIds.has(scopeRecord.recordId)) throw new Error('duplicate scope record');
    recordIds.add(scopeRecord.recordId);
  }
  const joined = joinScopedObservations({ observations, scopes });
  return {
    overlayCount: scopes.length,
    matchedCount: joined.filter(({ scopeRecord }) => scopeRecord).length,
    sourceObservationCount: observations.length,
  };
}

export async function loadScopeOverlays(filePath) {
  let content;
  try {
    content = await readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Unable to read scope overlays: ${error.message}`);
  }
  return content.split('\n').filter(Boolean).map((line, index) => {
    let record;
    try {
      record = JSON.parse(line);
    } catch (error) {
      throw new Error(`Invalid scope overlay at line ${index + 1}: ${error.message}`);
    }
    validateScopedObservation(record);
    return record;
  });
}
