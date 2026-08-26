import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { collectCbpArchive } from './cbp-archive-collector.mjs';
import { collectCaltransArchive } from './caltrans-archive-collector.mjs';

export function classifySourceQuality(freshness = {}) {
  const fresh = Number(freshness.fresh) || 0;
  const stale = Number(freshness.stale) || 0;
  const unknown = Number(freshness.unknown) || 0;
  if (fresh === 0) return 'unusable';
  if (stale > 0 || unknown > 0) return 'degraded';
  return 'fresh';
}

export async function collectArchives({
  now = Date.now(),
  cbpArchiveRoot,
  caltransArchiveRoot,
  collectCbp = collectCbpArchive,
  collectCaltrans = collectCaltransArchive,
} = {}) {
  const jobs = [
    ['cbp', () => collectCbp({ now, archiveRoot: cbpArchiveRoot })],
    ['caltrans', () => collectCaltrans({ now, archiveRoot: caltransArchiveRoot })],
  ];
  const settled = await Promise.all(jobs.map(async ([source, run]) => {
    try {
      const result = await run();
      return [source, { status: 'collected', quality: classifySourceQuality(result.freshness), result }];
    } catch (error) {
      return [source, { status: 'failed', error: { code: error.code || 'UNKNOWN', message: error.message } }];
    }
  }));
  const sources = Object.fromEntries(settled);
  return { ok: Object.values(sources).every(({ status }) => status === 'collected'), sources };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (invokedPath === fileURLToPath(import.meta.url)) {
  const outcome = await collectArchives();
  for (const [source, result] of Object.entries(outcome.sources)) {
    if (result.status === 'collected') {
      const freshness = result.result.freshness || {};
      console.log(`${source} collection complete: ${result.result.added} added from ${result.result.observed} observations (quality ${result.quality}; fresh ${freshness.fresh || 0}, stale ${freshness.stale || 0}, unknown ${freshness.unknown || 0})`);
    }
    else console.error(`${source} collection failed: ${result.error.code}: ${result.error.message}`);
  }
  if (!outcome.ok) process.exitCode = 1;
}
