import assert from 'node:assert/strict';
import { loadCaltransRoadwayContext, normalizeLaneClosures, normalizeTravelTime } from './caltrans-adapter.mjs';

const now = Date.parse('2026-08-24T12:00:00Z');
const timestamp = { recordDate: '2026-08-24', recordTime: '11:55:00', recordEpoch: String(now / 1000 - 5 * 60) };
const border = (overrides = {}) => ({
  data: [{ tt: {
    index: '130-1122544-1118326-BORDER', recordTimestamp: timestamp,
    location: { trafficFlowDirection: 'South', begin: { beginRoute: 'I-5' }, end: { endRoute: 'I-5' } },
    traveltime: { calculatedTraveltime: '28', traveltimeAccuracy: '54.9' }, ...overrides,
  } }],
});

assert.equal(normalizeTravelTime(border(), { now }).status, 'fresh');
assert.equal(normalizeTravelTime(border(), { now }).minutes, 28);
assert.equal(normalizeTravelTime(border({ recordTimestamp: { ...timestamp, recordEpoch: String(now / 1000 - 16 * 60) } }), { now }).minutes, null);
assert.equal(normalizeTravelTime(border({ recordTimestamp: { ...timestamp, recordEpoch: String(now / 1000 + 60) } }), { now }).status, 'unknown');
assert.equal(normalizeTravelTime(border({ recordTimestamp: { ...timestamp, recordDate: 'invalid' } }), { now }).status, 'unknown');
assert.equal(normalizeTravelTime({ data: [{ tt: { index: 'not-border' } }] }, { now }).status, 'unknown');
assert.equal(normalizeTravelTime({ data: [{ tt: { index: '130-BORDER', recordTimestamp: timestamp } }] }, { now }).status, 'unknown');

const closure = {
  data: [{ lcs: {
    recordTimestamp: timestamp,
    location: { begin: { beginNearbyPlace: 'San Ysidro', beginRoute: 'I-5' }, end: { endNearbyPlace: 'San Ysidro', endRoute: 'I-5' } },
    closure: { typeOfClosure: 'Lane', typeOfWork: 'Paving Operation', lanesClosed: '1, 4', totalExistingLanes: '4', closureTimestamp: { closureStartDate: '2026-08-24' } },
  } }],
};
const freshClosures = normalizeLaneClosures(closure, { now });
assert.equal(freshClosures.status, 'fresh');
assert.deepEqual(freshClosures.closures[0].lanesClosed, [1, 4]);
assert.equal(freshClosures.closures[0].totalExistingLanes, 4);
assert.equal(normalizeLaneClosures({ data: [{ lcs: { ...closure.data[0].lcs, recordTimestamp: { ...timestamp, recordEpoch: String(now / 1000 - 16 * 60) } } }] }, { now }).status, 'stale');
assert.equal(normalizeLaneClosures({ data: [{ lcs: { location: closure.data[0].lcs.location } }] }, { now }).status, 'unknown');

const unavailable = await loadCaltransRoadwayContext({ now, fetcher: async () => { throw new Error('offline'); } });
assert.equal(unavailable.roadwayContext.travelTime.status, 'unknown');
assert.equal(unavailable.roadwayContext.travelTime.minutes, undefined);
assert.equal(unavailable.roadwayContext.laneClosures.status, 'unknown');
await assert.rejects(() => loadCaltransRoadwayContext({ now, timeoutMs: 0, fetcher: async () => ({ ok: true, json: async () => ({}) }) }), /timeoutMs must be positive/);
console.log('caltrans adapter checks passed');
