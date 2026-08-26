import { compareTimingContext } from './timing-context.mjs';

function assertArray(value, name) {
  if (!Array.isArray(value)) throw new TypeError(`${name} must be an array`);
}

function assertMode(mode) {
  if (mode !== 'official' && mode !== 'illustrative') throw new RangeError('mode must be official or illustrative');
}

export function selectTimingData({ mode, official = [], illustrative = [] } = {}) {
  assertMode(mode);
  assertArray(official, 'official');
  assertArray(illustrative, 'illustrative');
  const input = mode === 'official' ? official : illustrative;
  const allowedSources = mode === 'official' ? new Set(['cbp-border-wait-times-xml', 'caltrans-d11']) : new Set(['illustrative-synthetic']);
  if (input.some((observation) => !allowedSources.has(observation.source))) throw new TypeError(`${mode} timing data contains an unexpected source`);
  const observations = input.filter((observation) => observation.domain === 'border-processing' || mode === 'illustrative');
  return {
    mode,
    provenance: mode === 'official' ? 'official-cbp-history' : 'illustrative-synthetic',
    status: observations.length ? 'available' : 'unavailable',
    observations,
  };
}

export function queryTimingData({ mode, official = [], illustrative = [], ...query } = {}) {
  const dataset = selectTimingData({ mode, official, illustrative });
  if (dataset.status === 'unavailable') return { ...dataset, comparison: null };
  return { ...dataset, comparison: compareTimingContext(dataset.observations, query) };
}
