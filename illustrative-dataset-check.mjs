import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { generateIllustrativeObservations, readIllustrativeArchive, writeIllustrativeArchive } from './illustrative-dataset.mjs';
import { observationId } from './observation-contract.mjs';
import { buildIllustrativeTimingBands } from './illustrative-timing.mjs';
import { readObservationHistory } from './observation-history.mjs';

const generated = generateIllustrativeObservations();
assert.equal(generated.length, 28 * 3 * 3 * 4);
assert.ok(generated.every((row) => row.metadata.synthetic === true && row.source === 'illustrative-synthetic'));
assert.equal(new Set(generated.map((row) => row.observationId)).size, generated.length);
const bands = buildIllustrativeTimingBands(generated, { minSamples: 20, minDays: 20 });
assert.equal(bands.length, 36);
assert.ok(bands.every((band) => band.coverage.status === 'sufficient'));
assert.throws(() => buildIllustrativeTimingBands([{ ...generated[0], source: 'cbp-border-wait-times-xml' }]), /illustrative observations only/);

const root = await mkdtemp(join(tmpdir(), 'celestan-illustrative-'));
try {
  const written = await writeIllustrativeArchive({ archiveRoot: root, startDate: '2026-08-01', days: 2 });
  assert.equal(written.observations, 72);
  assert.equal((await readIllustrativeArchive(root)).length, 72);
  const rows = await readIllustrativeArchive(root);
  assert.equal(rows[0].observationId, observationId(rows[0]));
  await assert.rejects(readObservationHistory({ cbpArchiveRoot: root, caltransArchiveRoot: join(root, 'missing') }), /invalid rows/);
} finally {
  await rm(root, { recursive: true, force: true });
}

console.log('illustrative dataset checks passed');
