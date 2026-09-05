# Supper — v0.1

A recipe box, weekly plan, and grocery list, built to replace Mealime.
Same deployment pattern as IRON: static files, no build step, GitHub Pages.

## What's in this folder

- `index.html` — the entire app (HTML/CSS/JS in one file)
- `manifest.json` — lets it install to the home screen like a real app
- `sw.js` — makes it work offline once it's been loaded once
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — app icons

All four files need to stay together and be deployed as a set — `index.html`
references the others by relative path.

## Deploy to GitHub Pages (same steps as IRON)

1. Create a new **public** GitHub repo (e.g. `supper`)
2. Open GitHub Desktop, add this folder as the repo's local path
3. Drag all 5 files in, commit, push
4. In the repo on github.com: **Settings → Pages → Source: Deploy from a branch → Branch: main, / (root) → Save**
5. Wait ~60 seconds, refresh — your URL will be `https://[username].github.io/supper/`
6. Open that URL on both phones → Share/menu → **Add to Home Screen**

## What's already built (v1 / P0)

- Recipe box: add, edit, delete, search, tag, favorite
- 26 of Shannon's Mealime recipe names pre-loaded as stubs — flagged
  "needs details" until ingredients/steps are filled in
- Weekly plan, 7 days, tap to assign a recipe or a quick label
  (Leftovers / Eating out / TBD)
- Grocery list auto-built from the week's plan, ingredients combined
  across recipes, sorted into categories
- Manual items, check-off, "Share list" (opens iOS share sheet as text)
- Pantry staples list — items marked here are left off the auto list
- Cook mode — full-screen steps, keeps the screen awake
- Category order is drag-free but reorderable with up/down arrows —
  set it once to match your Kroger's aisle walk (Settings)
- JSON export/import — the export file is the backup for now

## Known v1 limits (by design, see the spec)

- **No sync yet.** Each phone has its own copy in its own browser storage.
  The data model already tracks per-record IDs, timestamps, and soft
  deletes, so this is a real feature addition later, not a rewrite.
- **No recipe URL import yet.** Ingredients/steps get typed in by hand
  for now.
- Grocery categories ship with a sensible default order — it hasn't been
  matched to your specific Kroger yet. Reorder once in Settings on your
  first real trip and it'll stick.

## If something breaks

Export the data first (Settings → Export as JSON) before troubleshooting
anything — that file is the only backup that exists right now.
