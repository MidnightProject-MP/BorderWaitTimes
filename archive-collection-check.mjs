import assert from 'node:assert/strict';
import { collectArchives } from './archive-collector.mjs';

const calls = [];
const successful = await collectArchives({
  now: 1000,
  collectCbp: async (options) => { calls.push(['cbp', options]); return { added: 4, observed: 4 }; },
  collectCaltrans: async (options) => { calls.push(['caltrans', options]); return { added: 2, observed: 2 }; },
});
assert.equal(successful.ok, true);
assert.deepEqual(Object.keys(successful.sources).sort(), ['caltrans', 'cbp']);
assert.equal(successful.sources.cbp.result.added, 4);
assert.equal(calls.length, 2);
assert.ok(calls.every(([, options]) => options.now === 1000));

const partial = await collectArchives({
  collectCbp: async () => { throw Object.assign(new Error('feed unavailable'), { code: 'CBP_NO_OBSERVATIONS' }); },
  collectCaltrans: async () => ({ added: 1, observed: 1 }),
});
assert.equal(partial.ok, false);
assert.equal(partial.sources.cbp.status, 'failed');
assert.equal(partial.sources.cbp.error.code, 'CBP_NO_OBSERVATIONS');
assert.equal(partial.sources.caltrans.status, 'collected');

const total = await collectArchives({
  collectCbp: async () => { throw new Error('cbp down'); },
  collectCaltrans: async () => { throw Object.assign(new Error('caltrans down'), { code: 'CALTRANS_NO_OBSERVATIONS' }); },
});
assert.equal(total.ok, false);
assert.equal(total.sources.cbp.status, 'failed');
assert.equal(total.sources.caltrans.error.code, 'CALTRANS_NO_OBSERVATIONS');

console.log('archive collection checks passed');
