import assert from 'node:assert/strict';
import { CBP_XML_URL, loadCbpWaitTimes, normalizeCbpXml } from './cbp-adapter.mjs';

const now = Date.parse('2026-08-25T10:00:00Z');
const fixture = `<?xml version="1.0"?><border_wait_time><last_updated_date>2026-8-25</last_updated_date><port><port_number>250401</port_number><border>Mexican Border</border><port_name>San Ysidro</port_name><crossing_name></crossing_name><port_status>Open</port_status><passenger_vehicle_lanes><standard_lanes><operational_status>delay</operational_status><update_time>At 2:00 am PDT</update_time><delay_minutes>60</delay_minutes><lanes_open>3</lanes_open></standard_lanes><NEXUS_SENTRI_lanes><operational_status>delay</operational_status><update_time>At 2:00 am PDT</update_time><delay_minutes>10</delay_minutes><lanes_open>4</lanes_open></NEXUS_SENTRI_lanes><ready_lanes><operational_status>Update Pending</operational_status><update_time></update_time><delay_minutes></delay_minutes><lanes_open></lanes_open></ready_lanes></passenger_vehicle_lanes><pedestrian_lanes><standard_lanes><operational_status>no delay</operational_status><update_time>At 2:00 am PDT</update_time><delay_minutes>5</delay_minutes><lanes_open>12</lanes_open></standard_lanes></pedestrian_lanes></port><port><port_number>250501</port_number><border>Mexican Border</border><port_name>Tecate</port_name><passenger_vehicle_lanes><standard_lanes><operational_status>Update Pending</operational_status></standard_lanes></passenger_vehicle_lanes></port></border_wait_time>`;

const fresh = normalizeCbpXml(fixture, { now, maxAgeMs: 90 * 60 * 1000 });
assert.equal(fresh.status, 'fresh');
assert.equal(fresh.ports.length, 2);
assert.equal(fresh.ports[0].lanes.passengerStandard.delayMinutes, 60);
assert.equal(fresh.ports[0].lanes.passengerStandard.status, 'fresh');
assert.equal(fresh.ports[0].lanes.passengerStandard.lanesOpen, 3);
assert.equal(fresh.ports[0].lanes.passengerSentri.lanesOpen, 4);
assert.equal(fresh.ports[0].lanes.pedestrianStandard.lanesOpen, 12);
assert.equal(fresh.ports[0].lanes.passengerReady.status, 'unknown');
assert.equal(fresh.ports[1].status, 'unknown');

const stale = normalizeCbpXml(fixture, { now, maxAgeMs: 60 * 1000 });
assert.equal(stale.ports[0].lanes.passengerStandard.status, 'stale');
assert.equal(stale.ports[0].lanes.passengerStandard.delayMinutes, null);
assert.equal(stale.ports[0].lanes.passengerStandard.lanesOpen, null);
assert.equal(normalizeCbpXml('<border_wait_time></border_wait_time>').status, 'unknown');
assert.equal(normalizeCbpXml(fixture.replace('250401', '999999')).ports.length, 1);
assert.equal(normalizeCbpXml(fixture.replace('Mexican Border', 'Other Border')).ports.length, 1);

let requestedUrl;
const unavailable = await loadCbpWaitTimes({ fetcher: async (url) => { requestedUrl = url; return { ok: false }; } });
assert.equal(requestedUrl, CBP_XML_URL);
assert.equal(unavailable.status, 'unknown');
assert.deepEqual(unavailable.ports, []);

console.log('CBP adapter checks passed');
