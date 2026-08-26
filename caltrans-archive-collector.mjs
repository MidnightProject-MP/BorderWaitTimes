import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { loadCaltransRoadwayContext } from './caltrans-adapter.mjs';
import { observationId, projectCaltransObservations, validateObservation } from './observation-contract.mjs';

const DEFAULT_ARCHIVE_ROOT = fileURLToPath(new URL('./data/caltrans', import.meta.url));

function freshnessCounts(observations) {
  return observations.reduce((counts, observation) => {
    counts[observation.status] = (counts[observation.status] || 0) + 1;
    return counts;
  }, { fresh: 0, stale: 0, unknown: 0 });
}

function archiveId(observation) {
  const id = observationId(observation);
  if (observation.observationId !== id) throw new Error('Observation ID does not match canonical identity');
  return id;
}

async function readArchive(archiveRoot) {
  let names;
  try {
    names = await readdir(archiveRoot);
  } catch (error) {
    if (error.code === 'ENOENT') return { ids: new Set(), partitions: new Map() };
    throw error;
  }
  const ids = new Set();
  const partitions = new Map();
  for (const name of names.filter((candidate) => /^\d{4}-\d{2}-\d{2}\.ndjson$/.test(candidate)).sort()) {
    const rows = (await readFile(resolve(archiveRoot, name), 'utf8')).split('\n').filter(Boolean).map((line) => JSON.parse(line));
    for (const row of rows) {
      if (validateObservation(row).length || ids.has(archiveId(row))) throw new Error(`Invalid duplicate archive row in ${name}`);
      ids.add(row.observationId);
    }
    partitions.set(name, rows);
  }
  return { ids, partitions };
}

export async function collectCaltransArchive({ fetcher = globalThis.fetch, now = Date.now(), archiveRoot = DEFAULT_ARCHIVE_ROOT } = {}) {
  if (!Number.isFinite(now)) throw new TypeError('now must be a finite epoch');
  const result = await loadCaltransRoadwayContext({ fetcher, now });
  const observations = projectCaltransObservations(result, { collectedAt: new Date(now).toISOString() });
  if (!observations.length) {
    const error = new Error('Caltrans collection produced no timestamped roadway observations');
    error.code = 'CALTRANS_NO_OBSERVATIONS';
    throw error;
  }
  const archive = await readArchive(archiveRoot);
  const additions = observations
    .map((observation) => ({ observationId: observationId(observation), ...observation }))
    .filter(({ observationId: id }) => !archive.ids.has(id))
    .sort((left, right) => left.sourceObservedAt.localeCompare(right.sourceObservedAt) || left.observationType.localeCompare(right.observationType));
  const freshness = freshnessCounts(observations);
  if (!additions.length) return { added: 0, observed: observations.length, freshness, partition: null };
  const partition = `${new Date(now).toISOString().slice(0, 10)}.ndjson`;
  const rows = [...(archive.partitions.get(partition) || []), ...additions];
  await mkdir(archiveRoot, { recursive: true });
  await writeFile(resolve(archiveRoot, partition), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`, 'utf8');
  return { added: additions.length, observed: observations.length, freshness, partition };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    const outcome = await collectCaltransArchive();
    console.log(`Caltrans archive collection complete: ${outcome.added} added from ${outcome.observed} observations${outcome.partition ? ` in ${outcome.partition}` : ''}`);
  } catch (error) {
    if (error.code === 'CALTRANS_NO_OBSERVATIONS') console.warn(`::warning::Caltrans archive collection skipped without mutation: ${error.message}`);
    else { console.error(`Caltrans archive collection failed: ${error.message}`); process.exitCode = 1; }
  }
}
