import assert from 'node:assert/strict';
import { readObservationHistory } from './observation-history.mjs';
import { loadScopeOverlays, verifyScopeOverlays } from './scoped-observation.mjs';

const observations = await readObservationHistory();
const scopes = await loadScopeOverlays(new URL('./scope-overlay-fixtures.ndjson', import.meta.url));
const result = verifyScopeOverlays({ observations, scopes });

assert.equal(result.overlayCount, scopes.length);
assert.equal(result.matchedCount, scopes.length);
assert.equal(result.sourceObservationCount, observations.length);
console.log(`scope overlay verification passed: ${result.overlayCount} overlay(s) matched ${result.sourceObservationCount} source observation(s)`);
