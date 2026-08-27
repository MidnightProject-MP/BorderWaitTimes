import assert from 'node:assert/strict';

const ISO_WITH_ZONE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const EVENT_NAMES = new Set(['queueStart', 'checkpoint', 'across']);
const CAPTURE_METHODS = new Set(['traveler-confirmed', 'device-assisted', 'observer-recorded', 'inferred']);

function validTimestamp(value) {
  return typeof value === 'string' && ISO_WITH_ZONE.test(value) && Number.isFinite(Date.parse(value));
}

export function validateCrossingSession(session) {
  if (!session || session.sessionSchemaVersion !== 1) throw new Error('session schema version');
  if (!session.sessionId || !session.crossing || !session.direction) throw new Error('session identity');
  if (!Array.isArray(session.events)) throw new Error('session events');
  if (!session.consent || session.consent.status !== 'explicit') throw new Error('explicit consent');
  const seen = new Set();
  for (const event of session.events) {
    if (!EVENT_NAMES.has(event.event) || seen.has(event.event)) throw new Error('event name');
    if (!validTimestamp(event.at) || !CAPTURE_METHODS.has(event.captureMethod)) throw new Error('event evidence');
    if (!Number.isInteger(event.precisionSeconds) || event.precisionSeconds < 0) throw new Error('event precision');
    if (!event.confidence || !event.labelStatus) throw new Error('event confidence');
    if (Object.hasOwn(event, 'location') || Object.hasOwn(event, 'coordinates')) throw new Error('location data');
    seen.add(event.event);
  }
  const start = session.events.find(({ event }) => event === 'queueStart');
  const across = session.events.find(({ event }) => event === 'across');
  if (start && across && Date.parse(across.at) < Date.parse(start.at)) throw new Error('event order');
  return true;
}

export function validateEvaluationRecord(record) {
  if (!record || record.evaluationSchemaVersion !== 1) throw new Error('evaluation schema version');
  if (!record.predictionId || !record.modelVersion || !record.target || !record.topologyVersion) throw new Error('evaluation identity');
  if (!validTimestamp(record.issuedAt) || !validTimestamp(record.inputCutoffAt)) throw new Error('evaluation timestamps');
  if (Date.parse(record.inputCutoffAt) > Date.parse(record.issuedAt)) throw new Error('input cutoff order');
  if (!Number.isInteger(record.horizonMinutes) || record.horizonMinutes < 0) throw new Error('forecast horizon');
  const prediction = record.prediction;
  if (!prediction || !Number.isFinite(prediction.estimateMinutes) || !Number.isFinite(prediction.lowerMinutes) || !Number.isFinite(prediction.upperMinutes)) throw new Error('prediction interval');
  if (prediction.lowerMinutes > prediction.estimateMinutes || prediction.estimateMinutes > prediction.upperMinutes) throw new Error('prediction interval order');
  if (!['pending', 'scored', 'excluded'].includes(record.eligibility)) throw new Error('evaluation eligibility');
  if (record.eligibility === 'excluded' && !record.exclusionReason) throw new Error('exclusion reason');
  return true;
}

const session = {
  sessionSchemaVersion: 1,
  sessionId: 'session-1',
  crossing: 'san-ysidro',
  direction: 'northbound',
  lane: 'passengerStandard',
  events: [
    { event: 'queueStart', at: '2026-08-27T10:00:00Z', captureMethod: 'traveler-confirmed', precisionSeconds: 60, confidence: 'reported', labelStatus: 'candidate' },
    { event: 'across', at: '2026-08-27T10:42:00Z', captureMethod: 'traveler-confirmed', precisionSeconds: 60, confidence: 'reported', labelStatus: 'candidate' },
  ],
  consent: { status: 'explicit', scope: 'timestamp-outcomes-only', withdrawnAt: null },
};

const evaluation = {
  evaluationSchemaVersion: 1,
  predictionId: 'prediction-1',
  modelVersion: 'baseline-1',
  topologyVersion: 'border-topology-draft-1',
  target: 'queueStart-to-across-duration',
  issuedAt: '2026-08-27T10:00:00Z',
  inputCutoffAt: '2026-08-27T09:59:00Z',
  horizonMinutes: 0,
  prediction: { estimateMinutes: 42, lowerMinutes: 30, upperMinutes: 58 },
  eligibility: 'pending',
};

assert.equal(validateCrossingSession(session), true);
assert.equal(validateEvaluationRecord(evaluation), true);
assert.throws(() => validateCrossingSession({ ...session, consent: { status: 'none' } }), /explicit consent/);
assert.throws(() => validateCrossingSession({ ...session, events: [{ ...session.events[0], captureMethod: 'unverified' }] }), /event evidence/);
assert.throws(() => validateCrossingSession({ ...session, events: [{ ...session.events[0], location: 'unknown' }] }), /location data/);
assert.throws(() => validateEvaluationRecord({ ...evaluation, inputCutoffAt: '2026-08-27T11:00:00Z' }), /input cutoff order/);
assert.throws(() => validateEvaluationRecord({ ...evaluation, prediction: { estimateMinutes: 10, lowerMinutes: 20, upperMinutes: 30 } }), /prediction interval order/);
assert.throws(() => validateEvaluationRecord({ ...evaluation, eligibility: 'excluded' }), /exclusion reason/);

console.log('research contract checks passed');
