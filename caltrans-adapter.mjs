export const TRAVEL_TIME_URL = 'https://cwwp2.dot.ca.gov/data/d11/tt/ttStatusD11.json';
export const LANE_CLOSURES_URL = 'https://cwwp2.dot.ca.gov/data/d11/lcs/lcsStatusD11.json';
export const DEFAULT_MAX_AGE_MS = 15 * 60 * 1000;
export const DEFAULT_TIMEOUT_MS = 10 * 1000;

const UNKNOWN = 'unknown';

function records(payload, key) {
  if (!payload || !Array.isArray(payload.data)) return null;
  return payload.data
    .filter((entry) => entry && typeof entry === 'object' && entry[key] && typeof entry[key] === 'object')
    .map((entry) => entry[key]);
}

function sourceEpoch(timestamp) {
  if (!timestamp || typeof timestamp !== 'object') return null;
  if (typeof timestamp.recordDate !== 'string' || typeof timestamp.recordTime !== 'string') return null;
  const date = Date.parse(`${timestamp.recordDate}T${timestamp.recordTime}Z`);
  if (!Number.isFinite(date)) return null;
  const parsed = new Date(date);
  const [year, month, day] = timestamp.recordDate.split('-').map(Number);
  const [hour, minute, second] = timestamp.recordTime.split(':').map(Number);
  if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() + 1 !== month || parsed.getUTCDate() !== day
    || parsed.getUTCHours() !== hour || parsed.getUTCMinutes() !== minute || parsed.getUTCSeconds() !== second) return null;
  const epoch = Number(timestamp.recordEpoch);
  return Number.isFinite(epoch) && epoch >= 0 ? epoch * 1000 : null;
}

function freshness(timestamp, now, maxAgeMs) {
  const epoch = sourceEpoch(timestamp);
  if (epoch === null || !Number.isFinite(now) || !Number.isFinite(maxAgeMs) || maxAgeMs < 0) return UNKNOWN;
  const age = now - epoch;
  if (age < 0) return UNKNOWN;
  return age <= maxAgeMs ? 'fresh' : 'stale';
}

function numeric(value, integer = false) {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) && number >= 0 && (!integer || Number.isInteger(number)) ? number : null;
}

function laneCount(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const text = String(value).trim();
  if (/^all$/i.test(text)) return 'all';
  if (/^\d+$/.test(text)) return Number(text);
  if (/^\d+(?:\s*,\s*\d+)+$/.test(text)) return text.split(',').map((lane) => Number(lane.trim()));
  return null;
}

function validOptions(options = {}) {
  const now = options.now === undefined
    ? Date.now()
    : options.now instanceof Date ? options.now.getTime() : Number(options.now);
  const maxAgeMs = options.maxAgeMs === undefined ? DEFAULT_MAX_AGE_MS : Number(options.maxAgeMs);
  return { now, maxAgeMs };
}

export function normalizeTravelTime(payload, options = {}) {
  const { now, maxAgeMs } = validOptions(options);
  const list = records(payload, 'tt');
  const record = list?.find((item) => {
    const location = item.location;
    const direction = String(location?.trafficFlowDirection || '').toLowerCase();
    const routes = [location?.begin?.beginRoute, location?.end?.endRoute].map((route) => String(route || '').toUpperCase());
    return String(item.index || '').toUpperCase().endsWith('-BORDER') && routes.includes('I-5') && direction === 'south';
  });

  if (!record) return { status: UNKNOWN, reason: list ? 'missing-border-segment' : 'malformed' };

  const status = freshness(record.recordTimestamp, now, maxAgeMs);
  const result = {
    status,
    roadwayContext: true,
    segment: 'I-5 BORDER southbound',
    sourceTimestamp: record.recordTimestamp,
  };
  if (status === 'fresh') {
    const minutes = numeric(record.traveltime?.calculatedTraveltime, true);
    const accuracy = numeric(record.traveltime?.traveltimeAccuracy);
    if (minutes === null || accuracy === null) return { status: UNKNOWN, reason: 'malformed-selected-segment' };
    result.minutes = minutes;
    result.accuracy = accuracy;
  } else {
    result.minutes = null;
    result.accuracy = null;
  }
  return result;
}

function sanYsidro(record) {
  const location = record.location;
  const places = [location?.begin?.beginNearbyPlace, location?.end?.endNearbyPlace]
    .map((place) => String(place || '').toUpperCase());
  return places.includes('SAN YSIDRO') && [location?.begin?.beginRoute, location?.end?.endRoute]
    .map((route) => String(route || '').toUpperCase()).includes('I-5');
}

export function normalizeLaneClosures(payload, options = {}) {
  const { now, maxAgeMs } = validOptions(options);
  const list = records(payload, 'lcs');
  if (!list) return { status: UNKNOWN, reason: 'malformed', closures: [] };

  const closures = list.filter(sanYsidro).map((record) => {
    const closure = record.closure || {};
    const status = freshness(record.recordTimestamp, now, maxAgeMs);
    if (!record.closure || typeof record.closure !== 'object') {
      return { status: UNKNOWN, roadwayContext: true, sourceTimestamp: record.recordTimestamp, closureType: null, work: null, lanesClosed: null, totalExistingLanes: null, closureWindow: null };
    }
    return {
      status,
      roadwayContext: true,
      sourceTimestamp: record.recordTimestamp,
      location: record.location,
      closureType: closure.typeOfClosure || null,
      work: closure.typeOfWork || null,
      lanesClosed: laneCount(closure.lanesClosed),
      totalExistingLanes: laneCount(closure.totalExistingLanes),
      closureWindow: closure.closureTimestamp || null,
    };
  });
  return {
    status: closures.some((closure) => closure.status === 'fresh') ? 'fresh' : closures.some((closure) => closure.status === 'stale') ? 'stale' : UNKNOWN,
    closures,
  };
}

async function loadSource(fetcher, url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(url, { signal: controller.signal });
    if (!response || !response.ok) return { status: UNKNOWN, reason: 'unavailable' };
    return { status: 'available', payload: await response.json() };
  } catch {
    return { status: UNKNOWN, reason: 'unavailable' };
  } finally {
    clearTimeout(timeout);
  }
}

export async function loadCaltransRoadwayContext({ fetcher = globalThis.fetch, now = Date.now(), maxAgeMs = DEFAULT_MAX_AGE_MS, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (typeof fetcher !== 'function') throw new TypeError('A fetcher is required');
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new RangeError('timeoutMs must be positive');
  const [travel, lanes] = await Promise.all([
    loadSource(fetcher, TRAVEL_TIME_URL, timeoutMs),
    loadSource(fetcher, LANE_CLOSURES_URL, timeoutMs),
  ]);
  const options = { now, maxAgeMs };
  const travelTime = travel.payload ? normalizeTravelTime(travel.payload, options) : { status: UNKNOWN, reason: travel.reason };
  const laneClosures = lanes.payload ? normalizeLaneClosures(lanes.payload, options) : { status: UNKNOWN, reason: lanes.reason, closures: [] };
  return {
    roadwayContext: { travelTime, laneClosures },
    sources: { travelTime: travel.status, laneClosures: lanes.status },
  };
}
