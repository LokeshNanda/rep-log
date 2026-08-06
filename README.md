# Rep Log

A single-page workout logger for Push / Pull / Legs training, built to feed an LLM coach.

**Live:** https://lokeshnanda.github.io/rep-log/

## How it works

1. Open the page and tap **Push**, **Pull**, or **Legs** — your last session of that type loads with all exercises, weights, reps, warm-up, and stretch prefilled.
2. Tap **Clock in** on arrival (stamps current IST time, editable if you forget). Log your warm-up activity and minutes.
3. Adjust weights/reps as you train, add or remove sets and exercises (search the built-in list or type a new name — custom exercises are remembered).
4. Pick a stretch duration (5/10/15 min chips or custom) and tap **Clock out**.
5. Tap **Copy for LLM** to put a clean plain-text log on the clipboard, ready to paste to your coach (if you forgot to clock out, it offers to stamp it):

   ```
   Workout Log — Push Day — 6 Aug 2026
   Clock-in: 06:32 IST · Clock-out: 07:48 IST · Time in gym: 1h 16m

   Warm-up: Treadmill — 10 min
   1. Bench Press: 40kg×12, 45kg×10, 45kg×8
   2. Dips: BW×15
   Stretch: 10 min
   ```

6. **Finish & Save** stores the session for next time.

## Data

Everything lives in your browser's localStorage — no server, no account. Use **Export backup** / **Import backup** on the home screen to move your history between devices or keep a backup. Leave the weight blank for bodyweight exercises (logged as `BW`).
