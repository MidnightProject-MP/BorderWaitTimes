import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { LANE_CLOSURES_URL, TRAVEL_TIME_URL } from './caltrans-adapter.mjs';
import { observationId } from './observation-contract.mjs';
import { validateObservation } from './observation-contract.mjs';

const PARTITION_PATTERN = /^(\d{4})-(\d{2})-(\d{2})\.ndjson$/;
const TYPES = new Set(['roadway_travel_time', 'roadway_lane_closure']);

export function verifyCaltransArchivePartition(name, rows, { seenIds = new Set() } = {}) {
  const violations = [];
  const partition = PARTITION_PATTERN.exec(name)?.[0]?.replace('.ndjson', '');
  if (!partition) return [`partition filename ${name} is not a YYYY-MM-DD.ndjson date`];
  rows.forEach((row, index) => {
    const where = `${name} row ${index + 1}`;
    const errors = validateObservation(row);
    if (errors.length) {
      violations.push(`${where} has invalid observation: ${errors.join(', ')}`);
      return;
    }
    if (row.source !== 'caltrans-d11') violations.push(`${where} has unexpected source ${JSON.stringify(row.source)}`);
    if (![TRAVEL_TIME_URL, LANE_CLOSURES_URL].includes(row.sourceUrl)) violations.push(`${where} has unexpected sourceUrl ${JSON.stringify(row.sourceUrl)}`);
    if (!TYPES.has(row.observationType)) violations.push(`${where} has unsupported observationType ${JSON.stringify(row.observationType)}`);
    const sourceEpoch = Date.parse(row.sourceObservedAt);
    const collectedEpoch = Date.parse(row.collectedAt);
    if (Number.isFinite(sourceEpoch) && Number.isFinite(collectedEpoch)) {
      if (sourceEpoch > collectedEpoch) violations.push(`${where} was observed after it was collected`);
      if (collectedEpoch < Date.parse(`${partition}T00:00:00.000Z`) || collectedEpoch > Date.parse(`${partition}T23:59:59.999Z`)) violations.push(`${where} was collected outside partition ${partition}`);
    }
    if (row.observationId !== observationId(row)) violations.push(`${where} has observationId that does not match its identity`);
    if (seenIds.has(row.observationId)) violations.push(`${where} duplicates observationId ${row.observationId}`);
    seenIds.add(row.observationId);
  });
  return violations;
}

export async function verifyCaltransArchive(archiveRoot) {
  const names = (await readdir(archiveRoot)).filter((candidate) => candidate.endsWith('.ndjson')).sort();
  const seenIds = new Set();
  const violations = [];
  let rows = 0;
  for (const name of names) {
    const partitionRows = (await readFile(resolve(archiveRoot, name), 'utf8')).split('\n').filter(Boolean).map((line) => JSON.parse(line));
    rows += partitionRows.length;
    violations.push(...verifyCaltransArchivePartition(name, partitionRows, { seenIds }));
  }
  return { partitions: names.length, rows, violations };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    const outcome = await verifyCaltransArchive(fileURLToPath(new URL('./data/caltrans', import.meta.url)));
    if (outcome.violations.length) {
      outcome.violations.forEach((violation) => console.error(`Caltrans archive violation: ${violation}`));
      console.error(`Caltrans archive verification failed: ${outcome.violations.length} violation(s) across ${outcome.rows} rows`);
      process.exitCode = 1;
    } else console.log(`Caltrans archive verification passed: ${outcome.rows} rows across ${outcome.partitions} partition(s)`);
  } catch (error) {
    if (error.code === 'ENOENT') console.log('Caltrans archive verification passed: no archive partitions exist yet');
    else { console.error(`Caltrans archive verification failed: ${error.message}`); process.exitCode = 1; }
  }
}
