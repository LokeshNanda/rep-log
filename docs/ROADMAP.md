# Rep Log Roadmap

The primary use case is feeding an AI coach: the log is pasted daily into Google Fitbit's AI coach as context. The roadmap keeps that loop first-class while staying useful for anyone logging a Push / Pull / Legs split.

## 1. Never lose a workout (reliability first)

- [x] **Draft autosave**: the in-progress session is mirrored to localStorage on every change; the home screen offers to resume an unfinished session, so a tab reload mid-workout loses nothing.
- [ ] **Screen Wake Lock**: keep the screen on during a session (`navigator.wakeLock`), as a toggle.
- [ ] **Rest timer notification**: vibration only fires while the page is visible; fall back to a Notification (with permission) so the "Go!" alert lands on a locked phone.

## 2. AI coach loop (core use case)

- [ ] **Coach preamble**: a saved prompt automatically prepended to the copied log (for example "You are my strength coach, here is today's session, suggest next targets"), so the daily paste into Fitbit's AI coach or any chat app is one step.
- [ ] **Multi-session export**: "Copy last N sessions / last 4 weeks" so the coach can review a training block, not just one day.
- [ ] **Paste plan from coach**: parse a pasted plan (the app's own format, or loose "Bench 4x8 @ 50kg" lines) and prefill the next session with target weights and reps, shown where the "was 40kg×12" hints go.

## 3. Progress insights (the data is already stored, just unused)

- [x] **Per-exercise progress**: tapping an exercise name in a session opens its history: best set, a top-set trend sparkline (weight, or reps for pure bodyweight exercises), and the last 15 sessions.
- [ ] **PR detection**: on save, compare against history and toast "New PR: Bench Press 50kg×10".
- [x] **Consistency calendar**: a Calendar view with a month grid of gym days (color-dotted by day type), current streak, best streak, and days trained this month. Tapping a marked day opens that session.
- [ ] **Session summary on save**: total volume, total sets, duration versus your average.

## 4. In-gym quality of life

- [x] **Edit past sessions**: History detail now has an Edit button that re-opens the saved session in the session editor; saving overwrites it, keeping its original date, unit, and time zone.
- [ ] **Warm-up set flag and optional RPE**: mark warm-up sets so they don't pollute hints and stats; RPE makes the coach export far more useful.
- [ ] **Plate calculator**: tap a target weight, see which plates to load per side.
- [x] **Manage custom exercises**: a "Custom exercises" screen lists them per day type with rename and delete; renaming can optionally update past sessions too, so hints and history stay consistent.
- [x] **Undo instead of confirm**: removing a set or an exercise happens immediately, with an Undo action in the toast instead of a blocking dialog.

## 5. Broader appeal (larger changes, later)

- [ ] **Custom splits**: Push / Pull / Legs is hardcoded (`SEED`, `DAY_META`); user-defined day types (Upper / Lower, Full Body, Arms) widen the audience but touch the data model.
- [ ] **Body weight tracking**: one number per day, included in the coach export.
- [ ] **CSV export** alongside the JSON backup.

## Known fixes

- [x] Import rebuilt `data` without `syncQueue`, dropping queued sync dates and leaving later `queueGymSync` calls pushing to `undefined`.
- [x] `todayISO()` used device time, not the chosen time zone, so a session near midnight could get the wrong date relative to its clock-in zone.
