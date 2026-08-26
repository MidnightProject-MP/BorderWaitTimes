import { createHash } from 'node:crypto';
import { LANE_CLOSURES_URL, TRAVEL_TIME_URL } from './caltrans-adapter.mjs';

export const OBSERVATION_SCHEMA_VERSION = 1;
const STATUSES = new Set(['fresh', 'stale', 'unknown']);

function iso(value) {
  return typeof value === 'string' && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
}

export function validateObservation(observation) {
  const errors = [];
  if (!observation || typeof observation !== 'object') return ['observation must be an object'];
  if (observation.schemaVersion !== OBSERVATION_SCHEMA_VERSION) errors.push('invalid schemaVersion');
  if (typeof observation.source !== 'string' || !observation.source) errors.push('source is required');
  if (typeof observation.sourceUrl !== 'string' || !/^https?:\/\//.test(observation.sourceUrl)) errors.push('sourceUrl is invalid');
  if (typeof observation.observationType !== 'string' || !observation.observationType) errors.push('observationType is required');
  if (typeof observation.subject !== 'string' || !observation.subject) errors.push('subject is required');
  if (!iso(observation.sourceObservedAt)) errors.push('sourceObservedAt must be canonical ISO');
  if (!iso(observation.collectedAt)) errors.push('collectedAt must be canonical ISO');
  if (!STATUSES.has(observation.status)) errors.push('status is invalid');
  if (observation.value !== null && (!Number.isFinite(observation.value) || observation.value < 0)) errors.push('value is invalid');
  if (observation.value !== null && (typeof observation.unit !== 'string' || !observation.unit)) errors.push('unit is required for a value');
  if (observation.value === null && observation.unit !== null) errors.push('unit must be null without a value');
  return errors;
}

export function createObservation(input) {
  const observation = {
    schemaVersion: OBSERVATION_SCHEMA_VERSION,
    source: input.source,
    sourceUrl: input.sourceUrl,
    observationType: input.observationType,
    subject: input.subject,
    direction: input.direction || null,
    lane: input.lane || null,
    sourceObservedAt: input.sourceObservedAt,
    collectedAt: input.collectedAt,
    status: input.status,
    value: input.value ?? null,
    unit: input.unit ?? null,
    metadata: input.metadata || {},
  };
  const errors = validateObservation(observation);
  if (errors.length) throw new TypeError(`Invalid observation: ${errors.join(', ')}`);
  return observation;
}

export function observationId(observation) {
  const errors = validateObservation(observation);
  if (errors.length) throw new TypeError(`Invalid observation: ${errors.join(', ')}`);
  const identity = { ...observation, metadata: undefined };
  return `sha256:${createHash('sha256').update(JSON.stringify(identity)).digest('hex')}`;
}

function sourceTimestamp(timestamp) {
  const epoch = Number(timestamp?.recordEpoch);
  return Number.isFinite(epoch) && epoch >= 0 ? new Date(epoch * 1000).toISOString() : null;
}

export function projectCaltransObservations(result, { collectedAt }) {
  const observations = [];
  const travel = result?.roadwayContext?.travelTime;
  const travelObservedAt = sourceTimestamp(travel?.sourceTimestamp);
  if (travelObservedAt) observations.push(createObservation({
    source: 'caltrans-d11', sourceUrl: TRAVEL_TIME_URL, observationType: 'roadway_travel_time',
    subject: travel.segment || 'I-5 BORDER southbound', direction: 'southbound',
    sourceObservedAt: travelObservedAt, collectedAt, status: travel.status,
    value: travel.minutes, unit: travel.minutes === null ? null : 'minutes',
    metadata: { accuracy: travel.accuracy },
  }));

  for (const closure of result?.roadwayContext?.laneClosures?.closures || []) {
    const observedAt = sourceTimestamp(closure.sourceTimestamp);
    if (!observedAt) continue;
    observations.push(createObservation({
      source: 'caltrans-d11', sourceUrl: LANE_CLOSURES_URL, observationType: 'roadway_lane_closure',
      subject: 'San Ysidro roadway approach', direction: 'southbound',
      sourceObservedAt: observedAt, collectedAt, status: closure.status,
      value: null, unit: null,
      metadata: { closureType: closure.closureType, work: closure.work, lanesClosed: closure.lanesClosed, totalExistingLanes: closure.totalExistingLanes, closureWindow: closure.closureWindow },
    }));
  }
  return observations;
}
