# Rep Log

A single-page workout logger for Push / Pull / Legs training, built to feed an LLM coach.

**Live:** https://lokeshnanda.github.io/rep-log/

## How it works

1. Open the page and tap **Push**, **Pull**, or **Legs** — your last session of that type loads with all exercises, weights, and reps prefilled.
2. Adjust weights/reps as you train, add or remove sets and exercises (search the built-in list or type a new name — custom exercises are remembered).
3. Tap **Copy for LLM** to put a clean plain-text log on the clipboard, ready to paste to your coach:

   ```
   Workout Log — Push Day — 6 Aug 2026

   1. Bench Press: 40kg×12, 45kg×10, 45kg×8
   2. Dips: BW×15
   ```

4. **Finish & Save** stores the session for next time.

## Data

Everything lives in your browser's localStorage — no server, no account. Use **Export backup** / **Import backup** on the home screen to move your history between devices or keep a backup. Leave the weight blank for bodyweight exercises (logged as `BW`).
