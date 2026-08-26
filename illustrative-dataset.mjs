import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createObservation, observationId, validateObservation } from './observation-contract.mjs';

export const ILLUSTRATIVE_SOURCE = 'illustrative-synthetic';
export const ILLUSTRATIVE_SOURCE_URL = 'https://celestan.example/illustrative-synthetic';
export const ILLUSTRATIVE_SCENARIO = 'illustrative-four-week-border-pattern-v1';
export const DEFAULT_ILLUSTRATIVE_ROOT = fileURLToPath(new URL('./data/illustrative', import.meta.url));
const LANES = ['passengerStandard', 'passengerReady', 'passengerSentri', 'pedestrianStandard'];
const PORTS = { 'san-ysidro': [68, 100, 18, 40], 'otay-mesa': [42, 72, 10, 25], tecate: [28, 55, 8, 18] };

function iso(epoch) { return new Date(epoch).toISOString(); }

export function generateIllustrativeObservations({ startDate = '2026-07-29', days = 28 } = {}) {
  const start = Date.parse(`${startDate}T00:00:00.000Z`);
  if (!Number.isFinite(start) || !Number.isInteger(days) || days < 1) throw new RangeError('startDate and days must define a positive date range');
  const observations = [];
  for (let day = 0; day < days; day += 1) {
    const date = new Date(start + day * 24 * 60 * 60 * 1000);
    const dayOfWeek = date.getUTCDay();
    const weekendLift = dayOfWeek === 0 || dayOfWeek === 6 ? 10 : 0;
    for (const hour of [7, 12, 17]) {
      const timeLift = hour === 7 ? 9 : hour === 17 ? 16 : 0;
      for (const [port, bases] of Object.entries(PORTS)) {
        for (let laneIndex = 0; laneIndex < LANES.length; laneIndex += 1) {
          const observedEpoch = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour);
          const wave = ((day * 7 + hour * 3 + laneIndex * 5 + port.length) % 9) - 4;
          const value = Math.max(3, bases[laneIndex] + weekendLift + timeLift + wave);
          const observation = createObservation({
            source: ILLUSTRATIVE_SOURCE,
            sourceUrl: ILLUSTRATIVE_SOURCE_URL,
            observationType: 'border_lane_wait',
            subject: `${port}:${LANES[laneIndex]}`,
            direction: 'northbound',
            lane: LANES[laneIndex],
            sourceObservedAt: iso(observedEpoch),
            collectedAt: iso(observedEpoch + 5 * 60 * 1000),
            status: 'fresh',
            value,
            unit: 'minutes',
            metadata: { synthetic: true, scenario: ILLUSTRATIVE_SCENARIO, port },
          });
          observations.push({ observationId: observationId(observation), ...observation, domain: 'border-processing' });
        }
      }
    }
  }
  return observations;
}

export async function writeIllustrativeArchive({ archiveRoot = DEFAULT_ILLUSTRATIVE_ROOT, ...options } = {}) {
  const observations = generateIllustrativeObservations(options);
  const partitions = new Map();
  for (const observation of observations) {
    const partition = `${observation.sourceObservedAt.slice(0, 10)}.ndjson`;
    partitions.set(partition, [...(partitions.get(partition) || []), observation]);
  }
  await mkdir(archiveRoot, { recursive: true });
  for (const [partition, rows] of partitions) await writeFile(resolve(archiveRoot, partition), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`, 'utf8');
  return { observations: observations.length, partitions: partitions.size, archiveRoot };
}

export async function readIllustrativeArchive(archiveRoot = DEFAULT_ILLUSTRATIVE_ROOT) {
  let names;
  try { names = await readdir(archiveRoot); } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  const observations = [];
  for (const name of names.filter((candidate) => /^\d{4}-\d{2}-\d{2}\.ndjson$/.test(candidate)).sort()) {
    const rows = (await readFile(resolve(archiveRoot, name), 'utf8')).split('\n').filter(Boolean).map((line) => JSON.parse(line));
    for (const row of rows) {
      const errors = validateObservation(row);
      if (errors.length || row.source !== ILLUSTRATIVE_SOURCE || row.sourceUrl !== ILLUSTRATIVE_SOURCE_URL || row.metadata?.synthetic !== true || row.metadata?.scenario !== ILLUSTRATIVE_SCENARIO || row.observationId !== observationId(row)) throw new Error(`Invalid illustrative row in ${name}`);
      observations.push(row);
    }
  }
  return observations.sort((left, right) => left.sourceObservedAt.localeCompare(right.sourceObservedAt) || left.subject.localeCompare(right.subject));
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  const result = await writeIllustrativeArchive();
  console.log(`Illustrative dataset generated: ${result.observations} observations across ${result.partitions} partitions`);
}
