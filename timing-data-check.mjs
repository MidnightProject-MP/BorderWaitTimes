import assert from 'node:assert/strict';
import { readObservationHistory } from './observation-history.mjs';
import { readIllustrativeArchive } from './illustrative-dataset.mjs';
import { generateIllustrativeObservations } from './illustrative-dataset.mjs';
import { queryTimingData, selectTimingData } from './timing-data.mjs';

const official = await readObservationHistory();
const illustrative = await readIllustrativeArchive();
const synthetic = selectTimingData({ mode: 'illustrative', illustrative });
assert.equal(synthetic.status, 'available');
assert.equal(synthetic.provenance, 'illustrative-synthetic');
const syntheticQuery = queryTimingData({ mode: 'illustrative', illustrative, subjects: ['otay-mesa:passengerStandard'], hour: 7, minSamples: 20, minDays: 20 });
assert.equal(syntheticQuery.comparison.ranked.length, 1);

const officialQuery = queryTimingData({ mode: 'official', official, subjects: ['otay-mesa:passengerStandard'], hour: 7, minSamples: 20, minDays: 20 });
assert.equal(officialQuery.provenance, 'official-cbp-history');
assert.equal(officialQuery.comparison.ranked.length, 0);
assert.equal(officialQuery.comparison.results[0].status, 'insufficient');
assert.equal(queryTimingData({ mode: 'official', official: [], subjects: ['otay-mesa:passengerStandard'], hour: 7 }).status, 'unavailable');
assert.equal(queryTimingData({ mode: 'official', official: [], illustrative, subjects: ['otay-mesa:passengerStandard'], hour: 7 }).comparison, null);
assert.throws(() => selectTimingData({ mode: 'official', official: [...official, ...generateIllustrativeObservations().slice(0, 1)] }), /unexpected source/);
assert.throws(() => selectTimingData({ mode: 'illustrative', illustrative: [...illustrative, ...official.slice(0, 1)] }), /unexpected source/);
assert.throws(() => selectTimingData({ mode: 'automatic' }), /mode/);

console.log('timing data checks passed');
