export const CBP_XML_URL = 'https://bwt.cbp.gov/xml/bwt.xml';
export const DEFAULT_MAX_AGE_MS = 90 * 60 * 1000;
export const DEFAULT_TIMEOUT_MS = 10 * 1000;

const TARGET_PORTS = new Map([['250401', 'san-ysidro'], ['250601', 'otay-mesa'], ['250501', 'tecate']]);
const TIME_ZONE_OFFSETS = { EDT: -4, EST: -5, PDT: -7, PST: -8 };

function decode(value) {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function tag(xml, name) {
  const match = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, 'i'));
  return match ? decode(match[1]) : null;
}

function blocks(xml, name) {
  return [...xml.matchAll(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, 'gi'))].map((match) => match[1]);
}

function numeric(value) {
  return /^\d+$/.test(value || '') ? Number(value) : null;
}

function updateEpoch(date, updateTime) {
  const match = updateTime?.match(/^At\s+(Midnight|Noon|(\d{1,2})(?::(\d{2}))?\s*(am|pm))\s+([A-Z]{3})$/i);
  if (!match) return null;
  const zone = match[5].toUpperCase();
  const offset = TIME_ZONE_OFFSETS[zone];
  if (offset === undefined) return null;
  let hour = match[1].toLowerCase() === 'midnight' ? 0 : match[1].toLowerCase() === 'noon' ? 12 : Number(match[2]);
  const minute = match[1].toLowerCase() === 'midnight' || match[1].toLowerCase() === 'noon' ? 0 : Number(match[3] || 0);
  if (match[4]?.toLowerCase() === 'pm' && hour !== 12) hour += 12;
  if (match[4]?.toLowerCase() === 'am' && hour === 12) hour = 0;
  const dateMatch = date?.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!dateMatch || hour > 23 || minute > 59) return null;
  return Date.UTC(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]), hour, minute) - offset * 60 * 60 * 1000;
}

function freshness(epoch, now, maxAgeMs) {
  if (epoch === null || !Number.isFinite(now) || !Number.isFinite(maxAgeMs) || maxAgeMs < 0) return 'unknown';
  const age = now - epoch;
  return age < 0 ? 'unknown' : age <= maxAgeMs ? 'fresh' : 'stale';
}

function lane(block, date, now, maxAgeMs) {
  const updateTime = tag(block, 'update_time');
  const epoch = updateEpoch(date, updateTime);
  const status = freshness(epoch, now, maxAgeMs);
  const delayMinutes = numeric(tag(block, 'delay_minutes'));
  return {
    status: status === 'fresh' && delayMinutes === null ? 'unknown' : status,
    operationalStatus: tag(block, 'operational_status'),
    updateTime,
    delayMinutes: status === 'fresh' ? delayMinutes : null,
    lanesOpen: status === 'fresh' ? numeric(tag(block, 'lanes_open')) : null,
    sourceEpoch: epoch,
  };
}

function laneBlock(xml, name) {
  return blocks(xml, name)[0] || null;
}

export function normalizeCbpXml(xml, { now = Date.now(), maxAgeMs = DEFAULT_MAX_AGE_MS } = {}) {
  if (typeof xml !== 'string' || !xml.includes('<border_wait_time')) return { status: 'unknown', reason: 'malformed', ports: [] };
  const feedDate = tag(xml, 'last_updated_date');
  const ports = blocks(xml, 'port').flatMap((portXml) => {
    const portNumber = tag(portXml, 'port_number');
    const crossing = TARGET_PORTS.get(portNumber);
    if (tag(portXml, 'border') !== 'Mexican Border' || !crossing) return [];
    const passenger = laneBlock(portXml, 'passenger_vehicle_lanes');
    const pedestrian = laneBlock(portXml, 'pedestrian_lanes');
    const lanes = {
      passengerStandard: passenger ? lane(laneBlock(passenger, 'standard_lanes') || '', feedDate, now, maxAgeMs) : null,
      passengerSentri: passenger ? lane(laneBlock(passenger, 'NEXUS_SENTRI_lanes') || '', feedDate, now, maxAgeMs) : null,
      passengerReady: passenger ? lane(laneBlock(passenger, 'ready_lanes') || '', feedDate, now, maxAgeMs) : null,
      pedestrianStandard: pedestrian ? lane(laneBlock(pedestrian, 'standard_lanes') || '', feedDate, now, maxAgeMs) : null,
    };
    const statuses = Object.values(lanes).filter(Boolean).map(({ status }) => status);
    return [{ portNumber, crossing, portName: tag(portXml, 'port_name'), crossingName: tag(portXml, 'crossing_name'), portStatus: tag(portXml, 'port_status'), lanes, status: statuses.includes('fresh') ? 'fresh' : statuses.includes('stale') ? 'stale' : 'unknown' }];
  });
  return { status: ports.some((port) => port.status === 'fresh') ? 'fresh' : ports.some((port) => port.status === 'stale') ? 'stale' : 'unknown', feedDate, ports };
}

async function loadSource(fetcher, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(CBP_XML_URL, { signal: controller.signal });
    if (!response?.ok) return { status: 'unknown', reason: 'unavailable' };
    return { status: 'available', xml: await response.text() };
  } catch {
    return { status: 'unknown', reason: 'unavailable' };
  } finally {
    clearTimeout(timeout);
  }
}

export async function loadCbpWaitTimes({ fetcher = globalThis.fetch, now = Date.now(), maxAgeMs = DEFAULT_MAX_AGE_MS, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (typeof fetcher !== 'function') throw new TypeError('A fetcher is required');
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new RangeError('timeoutMs must be positive');
  const source = await loadSource(fetcher, timeoutMs);
  return source.xml ? normalizeCbpXml(source.xml, { now, maxAgeMs }) : { status: 'unknown', reason: source.reason, ports: [] };
}
