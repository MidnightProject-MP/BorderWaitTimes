import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { CBP_XML_URL, loadCbpWaitTimes } from './cbp-adapter.mjs';

const SOURCE = 'cbp-border-wait-times-xml';
const LANE_KEYS = ['passengerStandard', 'passengerSentri', 'passengerReady', 'pedestrianStandard'];
const DEFAULT_ARCHIVE_ROOT = fileURLToPath(new URL('./data/cbp', import.meta.url));

export function observationId(observation) {
  const identity = {
    schemaVersion: observation.schemaVersion,
    source: observation.source,
    portNumber: observation.portNumber,
    crossing: observation.crossing,
    lane: observation.lane,
    sourceObservedAt: observation.sourceObservedAt,
    sourceFeedDate: observation.sourceFeedDate,
    sourceUpdateTime: observation.sourceUpdateTime,
    portStatus: observation.portStatus,
    operationalStatus: observation.operationalStatus,
    delayMinutes: observation.delayMinutes,
    lanesOpen: observation.lanesOpen,
  };
  return `sha256:${createHash('sha256').update(JSON.stringify(identity)).digest('hex')}`;
}

export function projectCbpObservations(result, { collectedAt }) {
  const collectedEpoch = Date.parse(collectedAt);
  if (!Number.isFinite(collectedEpoch)) throw new TypeError('collectedAt must be an ISO timestamp');

  return result.ports.flatMap((port) => LANE_KEYS.flatMap((laneKey) => {
    const lane = port.lanes[laneKey];
    if (!lane || lane.status === 'unknown' || !Number.isFinite(lane.sourceEpoch)) return [];

    const observation = {
      schemaVersion: 1,
      source: SOURCE,
      sourceUrl: CBP_XML_URL,
      portNumber: port.portNumber,
      crossing: port.crossing,
      lane: laneKey,
      sourceObservedAt: new Date(lane.sourceEpoch).toISOString(),
      sourceFeedDate: result.feedDate,
      sourceUpdateTime: lane.updateTime,
      collectedAt: new Date(collectedEpoch).toISOString(),
      collectedFreshness: lane.status,
      portStatus: port.portStatus,
      operationalStatus: lane.operationalStatus,
      delayMinutes: lane.reportedDelayMinutes,
      lanesOpen: lane.reportedLanesOpen,
    };
    return [{ observationId: observationId(observation), ...observation }];
  }));
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
    const text = await readFile(resolve(archiveRoot, name), 'utf8');
    const rows = text.split('\n').filter(Boolean).map((line) => JSON.parse(line));
    for (const row of rows) {
      if (!row.observationId || ids.has(row.observationId)) throw new Error(`Invalid duplicate archive row in ${name}`);
      ids.add(row.observationId);
    }
    partitions.set(name, rows);
  }
  return { ids, partitions };
}

export async function collectCbpArchive({
  fetcher = globalThis.fetch,
  now = Date.now(),
  archiveRoot = DEFAULT_ARCHIVE_ROOT,
} = {}) {
  if (!Number.isFinite(now)) throw new TypeError('now must be a finite epoch');
  const result = await loadCbpWaitTimes({ fetcher, now });
  const observations = projectCbpObservations(result, { collectedAt: new Date(now).toISOString() });
  if (observations.length === 0) {
    const error = new Error(`CBP collection produced no timestamped observations (${result.reason || result.status})`);
    error.code = 'CBP_NO_OBSERVATIONS';
    throw error;
  }

  const archive = await readArchive(archiveRoot);
  const additions = observations
    .filter(({ observationId: id }) => !archive.ids.has(id))
    .sort((left, right) => left.sourceObservedAt.localeCompare(right.sourceObservedAt)
      || left.portNumber.localeCompare(right.portNumber)
      || left.lane.localeCompare(right.lane));
  if (additions.length === 0) return { added: 0, observed: observations.length, partition: null };

  const partition = `${new Date(now).toISOString().slice(0, 10)}.ndjson`;
  const rows = [...(archive.partitions.get(partition) || []), ...additions];
  await mkdir(archiveRoot, { recursive: true });
  await writeFile(resolve(archiveRoot, partition), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`, 'utf8');
  return { added: additions.length, observed: observations.length, partition };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    const outcome = await collectCbpArchive();
    console.log(`CBP archive collection complete: ${outcome.added} added from ${outcome.observed} observations${outcome.partition ? ` in ${outcome.partition}` : ''}`);
  } catch (error) {
    if (error.code === 'CBP_NO_OBSERVATIONS') {
      console.warn(`::warning::CBP archive collection skipped without mutation: ${error.message}`);
    } else {
      console.error(`CBP archive collection failed: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
