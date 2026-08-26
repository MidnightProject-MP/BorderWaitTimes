# Celestan

Celestan is a prototype border intelligence network for the San Diego-Tijuana crossing experience.

## Product Direction

The first job is simple: give a traveler one calm, fast, bilingual place to understand what is moving, what changed, and which crossing is the least-friction choice.

The longer arc is deliberately different from a dashboard full of charts:

1. **See the border:** aggregate reliable official conditions and make freshness, confidence, and uncertainty visible.
2. **Measure the border:** use explicitly opted-in crossing sessions to learn how public estimates compare with real movement.
3. **Estimate the crossing:** offer a personalized live estimate based on a traveler's route and pace without turning location history into an advertising product.

The free experience should remain useful without premium features, advertising, or location permission. Premium field mode is a future product direction, not a claim that this prototype currently collects location or connects to live agency feeds.

## Delivered Experience

Celestan combines an illustrative decision prototype with explicitly requested official roadway and CBP lane context.

The current static prototype includes:

- English and Spanish UI switching
- Northbound and southbound corridor views
- San Ysidro, Otay Mesa, and Tecate comparison cards
- Wait estimates, freshness, confidence, source labels, and historical context
- A recommendation that updates when a crossing is selected
- Border notes and a lightweight reminder interaction
- A premium live-mode consent dialog with opt-in, anonymous, transactional, and auto-stop language
- A simulated live estimate that never requests browser location
- User-triggered Caltrans roadway approach context with source freshness
- User-triggered CBP lane estimates with Standard, Ready, SENTRI, and pedestrian selection
- Explicit operating state and lanes-open metadata when the selected CBP lane is fresh and usable
- Responsive layouts, keyboard focus states, a skip link, reduced-motion support, and local-only assets
- A mobile-first primary journey that keeps direction, recommendation, crossing comparison, and the crossing-session action within a 390 x 844 first viewport
- Progressive disclosure for official roadway and lane reads, history, and border notes

Total crossing waits, recommendations, confidence, history, and premium estimates remain illustrative. The separate Caltrans and CBP surfaces request official feeds only after a traveler explicitly checks them; those values retain source-specific meaning and must not be interpreted as total crossing time.

## Run Locally

The prototype uses static files, but its official-feed adapters are ES modules and should be served over HTTP. For browser inspection and consistent local serving, use:

```bash
npm install
npm run check:browser
```

The browser check uses Playwright Chromium to load the local page and exercise the primary interaction path. It also writes a temporary screenshot to `artifacts/browser-check.png` when the check succeeds.

Useful checks:

```bash
node --check app.js
npm run check:browser
```

## Architecture

- `index.html` contains the accessible page structure and SVG illustrations.
- `styles.css` contains the visual system and responsive behavior; there are no external font, image, or CSS dependencies.
- `app.js` owns the local prototype state: direction, language, selected crossing, recommendation, consent, and simulated live mode.
- `browser-check.mjs` provides a small rendered smoke test for the product's critical path.
- `caltrans-adapter.mjs` normalizes confirmed Caltrans roadway feeds without conflating them with customs wait time.
- `cbp-adapter.mjs` normalizes the officially linked CBP XML lane estimates without changing the illustrative UI.
- `caltrans-adapter-check.mjs` verifies freshness, malformed input, missing segments, and unavailable sources.
- `cbp-adapter-check.mjs` verifies freshness, pending lanes, malformed input, target-port selection, and unavailable sources.
- `cbp-archive-collector.mjs` preserves deduplicated, timestamped observations of validated CBP lane reports in date-partitioned NDJSON.
- `cbp-archive-check.mjs` verifies source/collection timestamp separation, source corrections, stale observations, and fail-closed collection.
- `cbp-archive-verify.mjs` validates the committed archive's schema, timestamps, partition boundaries, identity hashes, and cross-partition uniqueness before scheduled collection.
- `.github/workflows/collect-cbp-history.yml` runs bounded collection four times per hour and commits only newly observed source records.
- The CBP presentation surface is northbound-only and explicitly labels lane estimates as separate from total crossing time.
- The superseded BorderWaitTimes implementation was assessed and removed; its useful lane-selection concept was reimplemented against Celestan's verified adapter rather than preserving unsafe legacy parsing.
- `SOURCES.md` records confirmed official feed boundaries, stale-data evidence, and the next adapter contract.
- `LEGACY-ASSESSMENT.md` records which BorderWaitTimes ideas were adopted, deferred, or rejected before the old runtime tree was removed.
- `STATE.md` records durable project, epic, story, verification, and delivery state.
- `PLAN.md` is the temporary execution plan for the current work cycle.

## Privacy Boundary

The product should request location only at the point a traveler starts a crossing session. A future implementation should minimize precision and retention, transform raw movement into useful crossing observations as early as possible, stop automatically at crossing completion, and explain contribution in transactional language. The current prototype only simulates that consent flow and makes no location request.

## Next Evidence

The next evidence required is traveler observation of the simplified first-viewport decision journey: whether direction, recommendation, alternatives, and the crossing-session action are understandable at a glance without opening secondary evidence. In parallel, the observation archive can accumulate without claiming that lane estimates equal total border-processing wait.
