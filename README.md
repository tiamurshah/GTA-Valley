# GTA-Valley — Valley Run, Kashmir

An original 3D open-world mini-game inspired by Kashmir Valley. Drive a 4×4, step out on foot, enter another vehicle, take three replayable jobs, and escape arcade pursuits in a compact autumn landscape.

## Run

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Production:

```sh
npm run build
npm run preview
```

The `dist/` folder is a static build. Serve it from the root of an HTTPS site to enable installation and offline play. Opening `index.html` directly with `file://` is unsupported.

## Controls

| Action | Desktop | Phone/tablet |
| --- | --- | --- |
| Accelerate / reverse | W / S or arrows | Joystick up / down |
| Steer | A / D or arrows | Joystick left / right |
| Walk | WASD / arrows | Joystick |
| Brake | Space | Hold BRAKE |
| Enter / exit vehicle | E, while stopped and nearby | ENTER / EXIT |
| Camera | C | Camera button |
| Jobs | M or Browse missions | Browse missions |
| Pause / recovery / quality | Escape or pause icon | Pause icon |

Reach the gold marker for each mission checkpoint. Minimap dotted lines indicate destination direction, not road navigation. Collisions damage the vehicle and raise pursuit heat. Drive cleanly and create distance to clear heat. A stationary close pursuit can catch you and deduct up to ₹150. Vehicle recovery is free and cancels an active job. Earnings, completed jobs and quality preferences save locally; active runs do not persist across reloads.

## iOS and Android

The browser build has multitouch input, portrait/landscape layouts, safe-area positioning, install icons, a manifest and a versioned offline service worker. Safari: Share → Add to Home Screen. Chrome on Android: Install app / Add to Home Screen. Load once online over HTTPS before offline use.

Capacitor configuration and native project scaffolds are included. After source changes:

```sh
npm run mobile:sync
```

If starting from source without platform folders:

```sh
npx cap add android
npx cap add ios
```

Android: `npm run android` opens the project in Android Studio. Install its required Android SDK and JDK, then build/sign there. iOS: `npm run ios` requires macOS and Xcode; configure your development team and signing there. Native release binaries are not included. The app ID is `com.valleyrun.game`; replace it with your own before a store release.

## Performance choices

- Static scenery merged by material; vehicle geometry merged with vertex colors.
- Lightweight geometry, no texture streaming, post-processing or real-time shadow maps.
- Approximately 50,000 visible triangles in the initial scene; draw-call counts vary by view.
- Auto mode caps device pixel ratio at 1.5 and reduces it when sampled frame time is slow. Battery saver uses 1; High caps at 2.
- UI and minimap update at about 10 Hz; rendering uses requestAnimationFrame.
- Rendering and simulation pause when a menu is open or the app becomes hidden.
- Simulation delta is bounded to avoid large jumps after interruptions.

These are implemented optimizations, not a measured frame-rate guarantee for every phone. Real iOS/Android hardware, thermal behavior, native builds and store signing have not been validated in this Windows environment.

## Verification

`npm test` checks handling, reversing/braking, collisions, mission progression, timeout and save recovery. `scripts/smoke.cjs` checks real rendered browser interactions and mobile layouts with Playwright; set `PLAYWRIGHT_PATH` to an installed Playwright module and adjust the browser executable if needed. Captures go to ignored `test-results/`.

Read [RESEARCH.md](RESEARCH.md) for sourced environment decisions and fidelity limits. The map is fictional and compressed; weather and coordinates in the HUD are atmospheric context. Mountains, shikaras and garden terraces are scenery. No combat, interiors, multiplayer or boat controls are implemented.

## Main files

- `src/world.js`: procedural scenery and vehicle/person geometry
- `src/simulation.js`: handling, collision boundaries, missions and save validation
- `src/main.js`: gameplay, controls, audio, camera, UI and map
- `src/style.css`: responsive game interface
- `vite.config.js`: production bundles and offline cache generation
- `capacitor.config.json`: native packaging settings

The game uses Three.js, Vite and Capacitor under their respective licenses. Fonts are supplied by Fontsource with their upstream font licenses. All game world geometry and synthesized audio are authored in this project.
