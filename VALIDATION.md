# Validation — 11 September 2026

## Passed

- Production Vite build; separate engine/game bundles, no build warnings.
- Seven automated simulation tests, including collision-free routes for all three missions within their time budgets on the actual generated map.
- Desktop Chromium browser checks: initial 3D load, accelerate/brake, first mission pickup, vehicle exit and re-entry, paused timer, recovery, map, field guide and mission switching. No JavaScript page errors.
- Mobile emulation: 390 × 844 portrait and 844 × 390 landscape; joystick accelerates, controls render, game survives viewport rotation.
- Offline production check: service-worker activation, 19 precached resources, network disabled, full reload, game startup and mission start. No JavaScript page errors. Fonts are local.
- Native Android and iOS project generation and asset synchronization.
- Native launcher icons and splash images replaced with Valley Run assets.

## Performance observations

The final opening view rendered approximately 52,000 triangles and 180 draw calls in the browser test. Pixel ratio is capped and can adapt downward in Auto mode. These numbers describe the tested view, not every world position. Headless tests used Chromium's software WebGL path; their timing is not representative of a phone GPU, so no mobile FPS claim is made.

## Not verified here

Physical iPhones or Android devices, Safari/WebKit gameplay, thermal throttling, battery consumption, native Android compilation, native iOS compilation, native lifecycle behavior, store signing and store submission. Android SDK/JDK and macOS/Xcode/CocoaPods were unavailable in this environment. Capacitor skipped iOS dependency installation/cleaning accordingly. Native project generation is not a successful native release build.

## Artifacts

`test-results/desktop.png`, `test-results/mobile-portrait.png` and `test-results/mobile-landscape.png` contain local captures and are ignored by Git. Test scripts are in `scripts/`; simulation tests are in `tests/`. See README for execution instructions.
