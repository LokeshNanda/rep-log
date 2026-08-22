# Rep Log

A workout logger for Push / Pull / Legs training, built to feed an LLM coach. Installable as an app (PWA) and fully offline-capable.

**Live:** https://rep-logs.netlify.app/

## How it works

1. Tap **Push**, **Pull**, or **Legs** — your last session of that type loads with exercises, weights, reps, warm-up, and stretch prefilled. Each set shows a faint "was 40kg×12" hint from the previous time you did that exercise.
2. Tap **Clock in** on arrival (stamps the time in your chosen time zone, editable). Log your warm-up activity and minutes.
3. As you train, tick sets done — each tick starts the rest timer (60/90/120s, configurable on the home screen) with a vibration when time's up. Add/remove sets and exercises; custom exercise names are remembered.
4. Pick a stretch duration, jot optional notes for the coach, and tap **Clock out**.
5. Tap **Copy for LLM** (or the share button to send straight to another app):

   ```
   Workout Log — Push Day — 6 Aug 2026
   Clock-in: 06:32 IST · Clock-out: 07:48 IST · Time in gym: 1h 16m

   Warm-up: Treadmill — 10 min
   1. Bench Press: 40kg×12, 45kg×10, 45kg×8
   2. Dips: BW×15
   Stretch: 10 min
   Notes: Right shoulder slightly tight
   ```

6. **Finish & Save** stores the session. Browse, re-copy, or delete past sessions under **History**.

## Settings (home screen)

- **Time zone** — auto-detects your device; pin any IANA zone for travel.
- **Units** — kg or lb (labels new logs; saved history keeps the unit it was logged in).
- **Rest timer** — 60s / 90s / 120s / off.

## Data

Everything lives in your browser's localStorage — no server, no account. **Export backup / Import backup** moves your full history, custom exercises, and settings between devices. Leave the weight blank for bodyweight exercises (logged as `BW`).

**Website sync (optional).** The "Website sync" setting pushes gym *days* — dates only, never exercises, weights or times — to the consistency grid on [lokeshnanda.com/now](https://lokeshnanda.com/now/). Paste the sync token once (it travels with backups); saved sessions then push automatically, with an offline queue that retries the next time the app opens. Blank the token to turn it off.

## Deploying

Static files, no build. Deploy the folder (index.html, sw.js, manifest.webmanifest, icons/) to any static host. **When deploying an update, bump the `CACHE` version at the top of `sw.js`.** Icons are pre-rendered; regenerate after editing `icons/icon.svg` with `node scripts/make-icons.mjs` (needs `playwright-core` + Edge).
