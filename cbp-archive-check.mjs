import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { collectCbpArchive, projectCbpObservations } from './cbp-archive-collector.mjs';
import { normalizeCbpXml } from './cbp-adapter.mjs';

const collectedAt = '2026-08-25T10:15:00.000Z';
const now = Date.parse(collectedAt);
const fixture = (delay = 60, updateTime = 'At 2:00 am PDT') => `<?xml version="1.0"?><border_wait_time><last_updated_date>2026-8-25</last_updated_date><port><port_number>250401</port_number><border>Mexican Border</border><port_name>San Ysidro</port_name><date>8/25/2026</date><port_status>Open</port_status><passenger_vehicle_lanes><standard_lanes><operational_status>delay</operational_status><update_time>${updateTime}</update_time><delay_minutes>${delay}</delay_minutes><lanes_open>3</lanes_open></standard_lanes><ready_lanes><operational_status>Update Pending</operational_status><update_time></update_time><delay_minutes></delay_minutes><lanes_open></lanes_open></ready_lanes></passenger_vehicle_lanes></port></border_wait_time>`;
const response = (xml) => async () => ({ ok: true, text: async () => xml });

const normalized = normalizeCbpXml(fixture(), { now });
const projected = projectCbpObservations(normalized, { collectedAt });
assert.equal(projected.length, 1);
assert.equal(projected[0].sourceObservedAt, '2026-08-25T09:00:00.000Z');
assert.equal(projected[0].collectedAt, collectedAt);
assert.equal(projected[0].delayMinutes, 60);
assert.equal(projected[0].lane, 'passengerStandard');

const stale = normalizeCbpXml(fixture(), { now, maxAgeMs: 1 });
const staleProjected = projectCbpObservations(stale, { collectedAt });
assert.equal(staleProjected[0].collectedFreshness, 'stale');
assert.equal(staleProjected[0].delayMinutes, 60);
const future = normalizeCbpXml(fixture(60, 'At 11:00 pm PDT'), { now });
assert.equal(projectCbpObservations(future, { collectedAt }).length, 0);

const archiveRoot = await mkdtemp(join(tmpdir(), 'celestan-cbp-'));
try {
  const first = await collectCbpArchive({ fetcher: response(fixture()), now, archiveRoot });
  assert.equal(first.added, 1);
  assert.equal(first.partition, '2026-08-25.ndjson');

  const repeated = await collectCbpArchive({ fetcher: response(fixture()), now: now + 60_000, archiveRoot });
  assert.equal(repeated.added, 0);

  const corrected = await collectCbpArchive({ fetcher: response(fixture(45)), now: now + 120_000, archiveRoot });
  assert.equal(corrected.added, 1);

  const later = await collectCbpArchive({ fetcher: response(fixture(45, 'At 2:15 am PDT')), now: now + 180_000, archiveRoot });
  assert.equal(later.added, 1);

  const rows = (await readFile(join(archiveRoot, '2026-08-25.ndjson'), 'utf8')).trim().split('\n').map(JSON.parse);
  assert.equal(rows.length, 3);
  assert.equal(new Set(rows.map(({ observationId }) => observationId)).size, 3);
  assert.equal(rows[0].collectedAt, collectedAt);
  assert.notEqual(rows[0].observationId, rows[1].observationId);

  await assert.rejects(
    collectCbpArchive({ fetcher: async () => ({ ok: false }), now, archiveRoot }),
    /no timestamped observations/,
  );
  assert.equal((await readFile(join(archiveRoot, '2026-08-25.ndjson'), 'utf8')).trim().split('\n').length, 3);
} finally {
  await rm(archiveRoot, { recursive: true, force: true });
}

console.log('CBP archive checks passed');
