# Celestan

Celestan is a prototype border intelligence network for the San Diego-Tijuana crossing experience.

## Product Direction

The first job is simple: give a traveler one calm, fast, bilingual place to understand what is moving, what changed, and which crossing is the least-friction choice.

The longer arc is deliberately different from a dashboard full of charts:

1. **See the border:** aggregate reliable official conditions and make freshness, confidence, and uncertainty visible.
2. **Measure the border:** use explicitly opted-in crossing sessions to learn how public estimates compare with real movement.
3. **Estimate the crossing:** offer a personalized live estimate based on a traveler's route and pace without turning location history into an advertising product.

The free experience should remain useful without premium features, advertising, or location permission. Premium field mode is a future product direction, not a claim that this prototype currently collects location or connects to live agency feeds.

## Current Story

**As a traveler, I can compare illustrative crossing conditions, choose a recommended port, and start an explicit privacy-preserving crossing session.**

The current static prototype includes:

- English and Spanish UI switching
- Northbound and southbound corridor views
- San Ysidro, Otay Mesa, and Tecate comparison cards
- Wait estimates, freshness, confidence, source labels, and historical context
- A recommendation that updates when a crossing is selected
- Border notes and a lightweight reminder interaction
- A premium live-mode consent dialog with opt-in, anonymous, transactional, and auto-stop language
- A simulated live estimate that never requests browser location
- Responsive layouts, keyboard focus states, a skip link, reduced-motion support, and local-only assets

All values in the current UI are illustrative prototype data. They are not live CBP, Caltrans, ANAM, or municipal feeds and must not be used as travel advice.

## Run Locally

The prototype is a static site and can be opened directly through `index.html`. For browser inspection and consistent local serving, use:

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
- `SOURCES.md` records confirmed official feed boundaries, stale-data evidence, and the next adapter contract.
- `STATE.md` records durable project, epic, story, verification, and delivery state.
- `PLAN.md` is the temporary execution plan for the current work cycle.

## Privacy Boundary

The product should request location only at the point a traveler starts a crossing session. A future implementation should minimize precision and retention, transform raw movement into useful crossing observations as early as possible, stop automatically at crossing completion, and explain contribution in transactional language. The current prototype only simulates that consent flow and makes no location request.

## Next Evidence

The next justified product work is not more UI breadth. It is a fail-closed Caltrans D11 adapter for roadway context, followed by CBP endpoint verification before any customs estimate is shown as live. The adapter must preserve source timestamps and keep roadway travel time separate from border-processing wait. Rendered browser checks establish interaction integrity; they do not establish visual quality or real-world usefulness without human observation.
