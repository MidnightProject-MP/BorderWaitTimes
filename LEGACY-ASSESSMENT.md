# Legacy BorderWaitTimes Assessment

The superseded BorderWaitTimes implementation was assessed before removal on 2026-08-25. Its Git history remains recoverable, but none of its dormant runtime code or branding assets remain in the active tree.

## Adopted

- Explicit Standard, Ready, SENTRI, and pedestrian lane selection.
- Official operating state and lanes-open metadata when the selected lane is fresh and usable.
- Compact mobile-friendly controls and clear unavailable states.

These ideas were reimplemented against `cbp-adapter.mjs`. No legacy parser, endpoint, state container, or DOM code was copied.

## Deferred

- Favorite crossings and privacy-preserving local preferences.
- Shareable crossing and lane selections.
- Historical day/hour planning patterns and sample counts.

These may be valuable, but require traveler observation and trustworthy source contracts before implementation. No official historical CBP archive was confirmed, so the old heatmap cannot be responsibly restored from its prior source.

## Rejected

- Undocumented string-based feed parsing that could assign one lane's values to another.
- Automatic polling and silent retention of stale values.
- Inferring 24-hour operation from missing schedule data.
- Treating unsupported lanes as closed.
- The unofficial Google Sheet, naive CSV parsing, and missing values plotted as zero.
- Unpinned CDN chart dependencies, mutable filter/settings complexity, and production debug logging.
- Midnight Project branding and the embedded Zelle donation flow.

## Removed

- `js/`: legacy fetching, parsing, state, UI, and historical-analysis modules.
- `css/`: legacy presentation layer.
- `images/`: unused legacy branding and donation assets.

The active Celestan implementation remains in the repository root with deterministic adapter and browser checks.
