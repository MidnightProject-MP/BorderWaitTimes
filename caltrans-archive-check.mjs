import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { TRAVEL_TIME_URL, LANE_CLOSURES_URL } from './caltrans-adapter.mjs';
import { collectCaltransArchive } from './caltrans-archive-collector.mjs';
import { validateObservation } from './observation-contract.mjs';

const collectedAt = '2026-08-26T10:15:00.000Z';
const now = Date.parse(collectedAt);
const sourceTimestamp = { recordDate: '2026-08-26', recordTime: '10:00:00', recordEpoch: String(Date.parse('2026-08-26T10:00:00.000Z') / 1000) };
const fixture = (minutes = '28', record = sourceTimestamp) => ({
  data: [{ tt: { index: '130-1122544-1118326-BORDER', recordTimestamp: record, location: { trafficFlowDirection: 'South', begin: { beginRoute: 'I-5' }, end: { endRoute: 'I-5' } }, traveltime: { calculatedTraveltime: minutes, traveltimeAccuracy: '54.9' } } }],
});
const closureFixture = (record = sourceTimestamp) => ({
  data: [{ lcs: { recordTimestamp: record, location: { begin: { beginNearbyPlace: 'San Ysidro', beginRoute: 'I-5' }, end: { endNearbyPlace: 'San Ysidro', endRoute: 'I-5' } }, closure: { typeOfClosure: 'Lane', typeOfWork: 'Paving', lanesClosed: '1, 4', totalExistingLanes: '4' } } }],
});
const fetcher = (travel, closure) => async (url) => ({ ok: true, json: async () => url === TRAVEL_TIME_URL ? travel : closure });

const archiveRoot = await mkdtemp(join(tmpdir(), 'celestan-caltrans-'));
try {
  const first = await collectCaltransArchive({ fetcher: fetcher(fixture(), closureFixture()), now, archiveRoot });
  assert.equal(first.added, 2);
  assert.equal(first.partition, '2026-08-26.ndjson');
  const repeated = await collectCaltransArchive({ fetcher: fetcher(fixture(), closureFixture()), now: now + 60_000, archiveRoot });
  assert.equal(repeated.added, 0);
  const corrected = await collectCaltransArchive({ fetcher: fetcher(fixture('24'), closureFixture()), now: now + 120_000, archiveRoot });
  assert.equal(corrected.added, 1);
  const laterTimestamp = { ...sourceTimestamp, recordTime: '10:05:00', recordEpoch: String(Date.parse('2026-08-26T10:05:00.000Z') / 1000) };
  const later = await collectCaltransArchive({ fetcher: fetcher(fixture('24', laterTimestamp), closureFixture(laterTimestamp)), now: now + 360_000, archiveRoot });
  assert.equal(later.added, 2);
  const rows = (await readFile(join(archiveRoot, '2026-08-26.ndjson'), 'utf8')).trim().split('\n').map(JSON.parse);
  assert.equal(rows.length, 5);
  assert.ok(rows.every((row) => validateObservation(row).length === 0));
  assert.ok(rows.every((row) => row.sourceObservedAt <= row.collectedAt));
  await assert.rejects(collectCaltransArchive({ fetcher: async () => ({ ok: false }), now: now + 600_000, archiveRoot }), (error) => error.code === 'CALTRANS_NO_OBSERVATIONS');
  assert.equal((await readFile(join(archiveRoot, '2026-08-26.ndjson'), 'utf8')).trim().split('\n').length, 5);
} finally {
  await rm(archiveRoot, { recursive: true, force: true });
}

console.log('caltrans archive checks passed');
