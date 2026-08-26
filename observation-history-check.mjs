import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createObservation, observationId } from './observation-contract.mjs';
import { ObservationHistoryError, readObservationHistory } from './observation-history.mjs';

const root = await mkdtemp(join(tmpdir(), 'celestan-history-'));
const cbpRoot = join(root, 'cbp');
const caltransRoot = join(root, 'caltrans');
try {
  await mkdir(cbpRoot);
  await mkdir(caltransRoot);
  const cbp = {
    observationId: 'sha256:legacy-cbp', schemaVersion: 1, source: 'cbp-border-wait-times-xml', sourceUrl: 'https://bwt.cbp.gov/xml/bwt.xml',
    portNumber: '250401', crossing: 'san-ysidro', lane: 'passengerStandard', sourceObservedAt: '2026-08-26T09:00:00.000Z', sourceFeedDate: '2026-08-26', sourceUpdateTime: 'At 2:00 am PDT', collectedAt: '2026-08-26T09:05:00.000Z', collectedFreshness: 'fresh', portStatus: 'Open', operationalStatus: 'delay', delayMinutes: 60, lanesOpen: 3,
  };
  const caltrans = createObservation({ source: 'caltrans-d11', sourceUrl: 'https://cwwp2.dot.ca.gov/data/d11/tt/ttStatusD11.json', observationType: 'roadway_travel_time', subject: 'I-5 BORDER southbound', direction: 'southbound', sourceObservedAt: '2026-08-26T09:01:00.000Z', collectedAt: '2026-08-26T09:05:00.000Z', status: 'fresh', value: 28, unit: 'minutes' });
  await writeFile(join(cbpRoot, '2026-08-26.ndjson'), `${JSON.stringify(cbp)}\n`);
  await writeFile(join(caltransRoot, '2026-08-26.ndjson'), `${JSON.stringify({ observationId: observationId(caltrans), ...caltrans })}\n`);
  const history = await readObservationHistory({ cbpArchiveRoot: cbpRoot, caltransArchiveRoot: caltransRoot });
  assert.equal(history.length, 2);
  assert.deepEqual(history.map(({ domain }) => domain), ['border-processing', 'roadway-context']);
  assert.deepEqual(history.map(({ observationType }) => observationType), ['border_lane_wait', 'roadway_travel_time']);
  assert.equal(history[0].sourceObservedAt, '2026-08-26T09:00:00.000Z');

  await writeFile(join(caltransRoot, '2026-08-26.ndjson'), `${JSON.stringify({ observationId: 'sha256:tampered', ...caltrans })}\n`);
  await assert.rejects(readObservationHistory({ cbpArchiveRoot: cbpRoot, caltransArchiveRoot: caltransRoot }), (error) => error instanceof ObservationHistoryError && error.violations.length === 1);
} finally {
  await rm(root, { recursive: true, force: true });
}

console.log('observation history checks passed');
