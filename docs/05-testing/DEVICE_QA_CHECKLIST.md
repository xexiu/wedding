# Device QA Checklist

This checklist is used with Playwright viewport/device projects and manual spot checks.

## Target Devices

- iPhone 14
- iPhone 15
- Pixel 7
- iPad Mini
- iPad Pro 11
- Small laptop (1366x768)

## Home Page Checks

- Hero heading and subtitle are visible without clipping.
- Carousel dots/buttons are tappable on touch devices.
- Section cards fit viewport width (no horizontal scroll).
- Text remains readable (no overlap or truncation).

## Admin Page Checks

- Module toggle rows stack correctly on mobile.
- Save button remains visible and tappable.
- Wedding details inputs are usable without zoom issues.
- YAML editor stays inside viewport.
- Dynamic module prop controls remain usable on touch devices.

## Interaction Checks

- Drag-and-drop still works on desktop/small laptop.
- Toggle states update and persist after save.
- YAML import/export remains functional on all viewport families.
