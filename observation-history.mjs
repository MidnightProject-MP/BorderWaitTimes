import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { CBP_XML_URL } from './cbp-adapter.mjs';
import { createObservation, observationId, validateObservation } from './observation-contract.mjs';

const DEFAULT_CBP_ROOT = fileURLToPath(new URL('./data/cbp', import.meta.url));
const DEFAULT_CALTRANS_ROOT = fileURLToPath(new URL('./data/caltrans', import.meta.url));

export class ObservationHistoryError extends Error {
  constructor(message, violations = []) {
    super(message);
    this.name = 'ObservationHistoryError';
    this.violations = violations;
  }
}

async function rowsFromRoot(root) {
  let names;
  try {
    names = await readdir(root);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  const rows = [];
  for (const name of names.filter((candidate) => /^\d{4}-\d{2}-\d{2}\.ndjson$/.test(candidate)).sort()) {
    let parsed;
    try {
      parsed = (await readFile(resolve(root, name), 'utf8')).split('\n').filter(Boolean).map((line) => JSON.parse(line));
    } catch (error) {
      throw new ObservationHistoryError(`Unable to read ${resolve(root, name)}: ${error.message}`);
    }
    parsed.forEach((row, index) => rows.push({ row, file: name, index }));
  }
  return rows;
}

function canonicalCbp(row) {
  if (row.source !== 'cbp-border-wait-times-xml' || row.sourceUrl !== CBP_XML_URL) throw new ObservationHistoryError('Invalid CBP source identity');
  return createObservation({
    source: row.source,
    sourceUrl: row.sourceUrl,
    observationType: 'border_lane_wait',
    subject: `${row.crossing}:${row.lane}`,
    direction: 'northbound',
    lane: row.lane,
    sourceObservedAt: row.sourceObservedAt,
    collectedAt: row.collectedAt,
    status: row.collectedFreshness,
    value: row.delayMinutes,
    unit: row.delayMinutes === null ? null : 'minutes',
    metadata: { portNumber: row.portNumber, portStatus: row.portStatus, operationalStatus: row.operationalStatus, lanesOpen: row.lanesOpen, sourceFeedDate: row.sourceFeedDate, sourceUpdateTime: row.sourceUpdateTime, archiveObservationId: row.observationId },
  });
}

function canonicalCaltrans(row) {
  const errors = validateObservation(row);
  if (errors.length) throw new ObservationHistoryError('Invalid Caltrans observation', errors);
  if (row.observationId !== observationId(row)) throw new ObservationHistoryError('Caltrans observation ID does not match its identity');
  return { ...row };
}

function canonicalize(source, row) {
  if (source === 'cbp') return canonicalCbp(row);
  return canonicalCaltrans(row);
}

export async function readObservationHistory({ cbpArchiveRoot = DEFAULT_CBP_ROOT, caltransArchiveRoot = DEFAULT_CALTRANS_ROOT } = {}) {
  const entries = [
    ...(await rowsFromRoot(cbpArchiveRoot)).map((entry) => ({ ...entry, source: 'cbp' })),
    ...(await rowsFromRoot(caltransArchiveRoot)).map((entry) => ({ ...entry, source: 'caltrans' })),
  ];
  const violations = [];
  const observations = [];
  for (const entry of entries) {
    try {
      const observation = canonicalize(entry.source, entry.row);
      observations.push({ observationId: observationId(observation), ...observation, domain: entry.source === 'cbp' ? 'border-processing' : 'roadway-context' });
    } catch (error) {
      violations.push(`${entry.source}/${entry.file} row ${entry.index + 1}: ${error.message}`);
    }
  }
  if (violations.length) throw new ObservationHistoryError('Observation history contains invalid rows', violations);
  observations.sort((left, right) => left.sourceObservedAt.localeCompare(right.sourceObservedAt)
    || left.collectedAt.localeCompare(right.collectedAt)
    || left.source.localeCompare(right.source)
    || left.observationType.localeCompare(right.observationType)
    || left.subject.localeCompare(right.subject));
  return observations;
}
