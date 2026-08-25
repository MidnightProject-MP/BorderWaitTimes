import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = process.cwd();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

try {
  await page.goto(pathToFileURL(path.join(root, "index.html")).href);
  await page.waitForSelector("#crossingCards [data-crossing]");

  assert.match(await page.title(), /Celestan/);
  assert.equal(await page.locator("#pulseWait").textContent(), "42");

  await page.locator('[data-direction="south"]').click();
  assert.equal(await page.locator("#pulseWait").textContent(), "24");
  assert.equal(await page.locator("#pulseStartLabel").textContent(), "US");
  assert.equal(await page.locator("#pulseEndLabel").textContent(), "MX");

  await page.locator('[data-crossing="tecate"]').click();
  assert.equal(await page.locator("#estimateCrossing").textContent(), "Tecate");

  await page.locator("#languageToggle").click();
  assert.equal(await page.locator("#page-title").innerText(), "Cruza con\nclaridad.");
  await page.locator("#languageToggle").click();

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
  await mobilePage.goto(pathToFileURL(path.join(root, "index.html")).href);
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
}
