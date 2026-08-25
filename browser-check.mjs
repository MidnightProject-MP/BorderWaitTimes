import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const server = createServer(async (request, response) => {
  const requested = request.url === "/" ? "index.html" : request.url.slice(1);
  const filePath = path.resolve(root, requested);
  if (!filePath.startsWith(root)) {
    response.writeHead(404);
    response.end();
    return;
  }
  try {
    const body = await readFile(filePath);
    const contentType = filePath.endsWith(".mjs") || filePath.endsWith(".js") ? "text/javascript" : filePath.endsWith(".css") ? "text/css" : "text/html";
    response.writeHead(200, { "content-type": contentType });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end();
  }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const appUrl = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
let roadwayAvailable = true;
let roadwayStale = false;
let roadwayRequests = 0;
let cbpAvailable = true;
let cbpStale = false;
const sourceNow = new Date();
const sourceTimestamp = {
  recordDate: sourceNow.toISOString().slice(0, 10),
  recordTime: sourceNow.toISOString().slice(11, 19),
  recordEpoch: String(Math.floor(sourceNow.getTime() / 1000))
};
const cbpPdtNow = new Date(Date.now() - 7 * 60 * 60 * 1000);
const cbpHour24 = cbpPdtNow.getUTCHours();
const cbpHour = cbpHour24 % 12 || 12;
const cbpMeridiem = cbpHour24 >= 12 ? "pm" : "am";
const cbpDate = `${cbpPdtNow.getUTCFullYear()}-${cbpPdtNow.getUTCMonth() + 1}-${cbpPdtNow.getUTCDate()}`;
const cbpUpdate = `At ${cbpHour}:${String(cbpPdtNow.getUTCMinutes()).padStart(2, "0")} ${cbpMeridiem} PDT`;
const cbpFixture = `<?xml version="1.0"?><border_wait_time><last_updated_date>${cbpDate}</last_updated_date><port><port_number>250401</port_number><border>Mexican Border</border><port_name>San Ysidro</port_name><crossing_name></crossing_name><port_status>Open</port_status><passenger_vehicle_lanes><standard_lanes><operational_status>delay</operational_status><update_time>${cbpUpdate}</update_time><delay_minutes>60</delay_minutes><lanes_open>3</lanes_open></standard_lanes><NEXUS_SENTRI_lanes><operational_status>delay</operational_status><update_time>${cbpUpdate}</update_time><delay_minutes>10</delay_minutes><lanes_open>4</lanes_open></NEXUS_SENTRI_lanes><ready_lanes><operational_status>Update Pending</operational_status><update_time></update_time><delay_minutes></delay_minutes><lanes_open></lanes_open></ready_lanes></passenger_vehicle_lanes><pedestrian_lanes><standard_lanes><operational_status>no delay</operational_status><update_time>${cbpUpdate}</update_time><delay_minutes>5</delay_minutes><lanes_open>12</lanes_open></standard_lanes></pedestrian_lanes></port></border_wait_time>`;
const cbpStaleFixture = cbpFixture.replace(new RegExp(cbpDate, "g"), "2020-1-1");
const travelFixture = {
  data: [{ tt: {
    index: "130-1122544-1118326-BORDER",
    recordTimestamp: sourceTimestamp,
    location: { trafficFlowDirection: "South", begin: { beginRoute: "I-5" }, end: { endRoute: "I-5" } },
    traveltime: { calculatedTraveltime: "28", traveltimeAccuracy: "54.9" }
  } }]
};
const closureFixture = {
  data: [{ lcs: {
    recordTimestamp: sourceTimestamp,
    location: { begin: { beginNearbyPlace: "San Ysidro", beginRoute: "I-5" }, end: { endNearbyPlace: "San Ysidro", endRoute: "I-5" } },
    closure: { typeOfClosure: "Lane", typeOfWork: "Paving Operation", lanesClosed: "1, 4", totalExistingLanes: "4" }
  } }]
};
const staleTimestamp = {
  recordDate: "2020-01-01",
  recordTime: "00:00:00",
  recordEpoch: "1577836800"
};
const staleTravelFixture = structuredClone(travelFixture);
staleTravelFixture.data[0].tt.recordTimestamp = staleTimestamp;
const staleClosureFixture = structuredClone(closureFixture);
staleClosureFixture.data[0].lcs.recordTimestamp = staleTimestamp;
await page.route("**/ttStatusD11.json", async route => {
  roadwayRequests += 1;
  if (!roadwayAvailable) return route.fulfill({ status: 503, body: "unavailable" });
  const fixture = roadwayStale ? staleTravelFixture : travelFixture;
  return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture) });
});
await page.route("**/lcsStatusD11.json", async route => {
  roadwayRequests += 1;
  if (!roadwayAvailable) return route.fulfill({ status: 503, body: "unavailable" });
  const fixture = roadwayStale ? staleClosureFixture : closureFixture;
  return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture) });
});
await page.route("**/xml/bwt.xml", async route => {
  if (!cbpAvailable) return route.fulfill({ status: 503, body: "unavailable" });
  return route.fulfill({ status: 200, contentType: "application/xml", body: cbpStale ? cbpStaleFixture : cbpFixture });
});

try {
  await page.goto(appUrl);
  await page.waitForSelector("#crossingCards [data-crossing]");

  assert.match(await page.title(), /Celestan/);
  assert.equal(await page.locator("#pulseWait").textContent(), "42");
  assert.equal(roadwayRequests, 0);
  assert.match(await page.locator("#roadwayContextCard").innerText(), /Roadway context/i);
  assert.match(await page.locator("#roadwayMinutes").innerText(), /No current value/);

  await page.locator("#roadwayCheckButton").click();
  await page.locator("#roadwayMinutes").waitFor({ state: "visible" });
  await page.waitForFunction(() => document.querySelector("#roadwayMinutes").textContent.includes("28"));
  assert.equal(roadwayRequests, 2);
  assert.match(await page.locator("#roadwayContextCard").innerText(), /Caltrans District 11/);
  assert.match(await page.locator("#roadwayContextCard").innerText(), /I-5 BORDER travel time/);
  assert.match(await page.locator("#roadwayClosureSummary").innerText(), /Paving Operation/);
  assert.equal(await page.locator("#mainWait").textContent(), "42");
  assert.equal(await page.locator("#estimate-title").innerText(), "Illustrative estimate");

  await page.locator("#cbpCheckButton").click();
  await page.waitForFunction(() => document.querySelector("#cbpLaneMinutes").textContent.includes("5"));
  assert.match(await page.locator("#cbpState").innerText(), /Fresh from CBP/i);
  assert.match(await page.locator("#cbpLaneCard").innerText(), /not the total time to cross/i);
  assert.equal(await page.locator("#mainWait").textContent(), "42");
  assert.equal(await page.locator("#pulseWait").textContent(), "42");

  cbpStale = true;
  await page.locator("#cbpCheckButton").click();
  await page.waitForFunction(() => document.querySelector("#cbpState").textContent.includes("Stale"));
  assert.equal(await page.locator("#cbpLaneMinutes").textContent(), "No current lane estimate");

  cbpStale = false;
  cbpAvailable = false;
  await page.locator("#cbpCheckButton").click();
  await page.waitForFunction(() => document.querySelector("#cbpState").textContent.includes("unavailable"));
  assert.equal(await page.locator("#cbpLaneMinutes").textContent(), "No current lane estimate");

  await page.locator('[data-direction="south"]').click();
  assert.equal(await page.locator("#pulseWait").textContent(), "24");
  assert.equal(await page.locator("#pulseStartLabel").textContent(), "US");
  assert.equal(await page.locator("#pulseEndLabel").textContent(), "MX");
  assert.equal(await page.locator("#cbpCheckButton").isDisabled(), true);
  assert.equal(await page.locator("#cbpCheckButton").innerText(), "Northbound only");

  await page.locator('[data-crossing="tecate"]').click();
  assert.equal(await page.locator("#estimateCrossing").textContent(), "Tecate");

  await page.locator("#languageToggle").click();
  assert.equal(await page.locator("#page-title").innerText(), "Cruza con\nclaridad.");
  assert.equal(await page.locator("#roadwayCheckButton").innerText(), "Consultar contexto vial");
  assert.match(await page.locator("#cbpLaneCard").innerText(), /Estimaciones de carril de CBP/i);
  assert.match(await page.locator("#roadwayContextCard").innerText(), /Contexto vial/i);
  await page.locator("#languageToggle").click();

  roadwayStale = true;
  await page.locator("#roadwayCheckButton").click();
  await page.waitForFunction(() => document.querySelector("#roadwayState").textContent.includes("Stale"));
  assert.equal(await page.locator("#roadwayMinutes").textContent(), "No current value");

  roadwayStale = false;
  roadwayAvailable = false;
  await page.locator("#roadwayCheckButton").click();
  await page.waitForFunction(() => document.querySelector("#roadwayState").textContent.includes("unavailable"));
  assert.equal(await page.locator("#roadwayMinutes").textContent(), "No current value");
  assert.equal(await page.locator("#mainWait").textContent(), "11");

  await page.locator("#startCrossingButton").click();
  assert.equal(await page.locator("#confirmConsent").isDisabled(), true);
  await page.locator("#locationConsent").check();
  assert.equal(await page.locator("#confirmConsent").isDisabled(), false);
  await page.locator("#confirmConsent").click();
  assert.equal(await page.locator("#liveCard").evaluate(node => node.classList.contains("is-live")), true);
  assert.match(await page.locator("#liveForecast").textContent(), /~\d+ min/);

  await page.locator('[data-crossing="san-ysidro"]').click();
  assert.equal(await page.locator("#liveCard").evaluate(node => node.classList.contains("is-live")), false);

  await page.locator("#startCrossingButton").click();
  await page.locator("#locationConsent").check();
  await page.locator("#confirmConsent").click();
  await page.locator("#startCrossingButton").click();
  assert.equal(await page.locator("#liveCard").evaluate(node => node.classList.contains("is-live")), false);

  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(appUrl);
  assert.equal(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  await mobilePage.locator("#startCrossingButton").click();
  const dialogBox = await mobilePage.locator("#consentDialog").boundingBox();
  assert.ok(dialogBox && dialogBox.height <= 844, "consent dialog should fit a mobile viewport");
  await mobilePage.close();

  await mkdir(path.join(root, "artifacts"), { recursive: true });
  await page.screenshot({ path: path.join(root, "artifacts", "browser-check.png"), fullPage: true });
  console.log("Browser smoke check passed.");
} finally {
  await browser.close();
  server.close();
}
