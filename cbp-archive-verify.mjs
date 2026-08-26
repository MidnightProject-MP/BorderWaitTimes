import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { CBP_XML_URL } from './cbp-adapter.mjs';
import { observationId } from './cbp-archive-collector.mjs';

const SOURCE = 'cbp-border-wait-times-xml';
const PORT_CROSSINGS = new Map([['250401', 'san-ysidro'], ['250601', 'otay-mesa'], ['250501', 'tecate']]);
const LANE_KEYS = new Set(['passengerStandard', 'passengerSentri', 'passengerReady', 'pedestrianStandard']);
const FRESHNESS_STATES = new Set(['fresh', 'stale']);
const PARTITION_PATTERN = /^(\d{4})-(\d{2})-(\d{2})\.ndjson$/;
const REQUIRED_FIELDS = ['observationId', 'schemaVersion', 'source', 'sourceUrl', 'portNumber', 'crossing', 'lane', 'sourceObservedAt', 'sourceFeedDate', 'sourceUpdateTime', 'collectedAt', 'collectedFreshness', 'portStatus', 'operationalStatus', 'delayMinutes', 'lanesOpen'];

function isNonNegativeIntegerOrNone(value) {
  return value === null || (Number.isInteger(value) && value >= 0);
}

export function verifyArchivePartition(name, rows, { seenIds = new Set() } = {}) {
  const violations = [];
  const partition = PARTITION_PATTERN.exec(name)?.[0]?.replace('.ndjson', '');
  if (!partition) {
    return [`partition filename ${name} is not a YYYY-MM-DD.ndjson date`];
  }

  rows.forEach((row, index) => {
    const where = `${name} row ${index + 1}`;
    const missing = REQUIRED_FIELDS.filter((field) => row[field] === undefined);
    if (missing.length > 0) {
      violations.push(`${where} is missing fields: ${missing.join(', ')}`);
      return;
    }
    if (row.schemaVersion !== 1) violations.push(`${where} has unsupported schemaVersion ${JSON.stringify(row.schemaVersion)}`);
    if (row.source !== SOURCE) violations.push(`${where} has unexpected source ${JSON.stringify(row.source)}`);
    if (row.sourceUrl !== CBP_XML_URL) violations.push(`${where} has unexpected sourceUrl ${JSON.stringify(row.sourceUrl)}`);
    if (PORT_CROSSINGS.get(row.portNumber) !== row.crossing) violations.push(`${where} pairs port ${row.portNumber} with unexpected crossing ${JSON.stringify(row.crossing)}`);
    if (!LANE_KEYS.has(row.lane)) violations.push(`${where} has unsupported lane ${JSON.stringify(row.lane)}`);
    if (!FRESHNESS_STATES.has(row.collectedFreshness)) violations.push(`${where} has unsupported collectedFreshness ${JSON.stringify(row.collectedFreshness)}`);

    const sourceEpoch = Date.parse(row.sourceObservedAt);
    const collectedEpoch = Date.parse(row.collectedAt);
    if (!Number.isFinite(sourceEpoch) || row.sourceObservedAt !== new Date(sourceEpoch).toISOString()) violations.push(`${where} has an invalid sourceObservedAt ${JSON.stringify(row.sourceObservedAt)}`);
    if (!Number.isFinite(collectedEpoch) || row.collectedAt !== new Date(collectedEpoch).toISOString()) violations.push(`${where} has an invalid collectedAt ${JSON.stringify(row.collectedAt)}`);
    if (Number.isFinite(sourceEpoch) && Number.isFinite(collectedEpoch)) {
      if (sourceEpoch > collectedEpoch) violations.push(`${where} was observed after it was collected`);
      if (collectedEpoch < Date.parse(`${partition}T00:00:00.000Z`) || collectedEpoch > Date.parse(`${partition}T23:59:59.999Z`)) {
        violations.push(`${where} was collected outside partition ${partition}`);
      }
    }
    if (!isNonNegativeIntegerOrNone(row.delayMinutes)) violations.push(`${where} has invalid delayMinutes ${JSON.stringify(row.delayMinutes)}`);
    if (!isNonNegativeIntegerOrNone(row.lanesOpen)) violations.push(`${where} has invalid lanesOpen ${JSON.stringify(row.lanesOpen)}`);

    const expectedId = observationId(row);
    if (row.observationId !== expectedId) violations.push(`${where} has observationId that does not match its identity`);
    if (seenIds.has(row.observationId)) violations.push(`${where} duplicates observationId ${row.observationId}`);
    seenIds.add(row.observationId);
  });

  return violations;
}

export async function verifyCbpArchive(archiveRoot) {
  const names = (await readdir(archiveRoot)).filter((candidate) => candidate.endsWith('.ndjson')).sort();
  const seenIds = new Set();
  const violations = [];
  let rows = 0;
  for (const name of names) {
    const text = await readFile(resolve(archiveRoot, name), 'utf8');
    const partitionRows = text.split('\n').filter(Boolean).map((line) => JSON.parse(line));
    rows += partitionRows.length;
    violations.push(...verifyArchivePartition(name, partitionRows, { seenIds }));
  }
  return { partitions: names.length, rows, violations };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    const outcome = await verifyCbpArchive(fileURLToPath(new URL('./data/cbp', import.meta.url)));
    if (outcome.violations.length > 0) {
      outcome.violations.forEach((violation) => console.error(`CBP archive violation: ${violation}`));
      console.error(`CBP archive verification failed: ${outcome.violations.length} violation(s) across ${outcome.rows} rows`);
      process.exitCode = 1;
    } else {
      console.log(`CBP archive verification passed: ${outcome.rows} rows across ${outcome.partitions} partition(s)`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('CBP archive verification passed: no archive partitions exist yet');
    } else {
      console.error(`CBP archive verification failed: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
