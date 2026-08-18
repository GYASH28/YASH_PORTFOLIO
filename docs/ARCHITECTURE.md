# Repository Architecture

## Source of truth

`main` is the only production branch. The production deployment should always be reproducible from `main` with `npm install && npm run build`.

The current production lineage is based on the restored cinematic portfolio commit `886df5a6049e3c931ee48cb34f83c24e095314c0` (`feat: refine cinematic portfolio experience`). Cleanup changes must preserve that site's behavior and assets.

## Runtime layout

### `src/`

The browser application lives here.

- `main.jsx` — React entry point and global font/style imports.
- `App.jsx` — route shell and portfolio experience.
- `ScrollFilm.jsx` — scroll-driven frame renderer.
- `filmData.js` — cinematic frame/video configuration.
- `projectData.js` — verified project/service content.
- `styles.css` — global visual system and responsive behavior.

The application is currently compact enough that these files remain flat. Split `App.jsx` or `styles.css` only when a change creates a clear long-term boundary; do not refactor working cinematic behavior merely for folder depth.

### `public/`

Runtime assets only.

- `frames/` — decoded scroll-film sequences.
- `images/` — portraits, project captures, and production imagery.
- `videos/` — cinematic playback assets.
- root favicon/touch files — browser/app identity assets.

Large media files are expected here. A file should be removed only after verifying it is unreferenced by source code and metadata.

### `tests/`

Node tests validate film configuration, project data, and Sites worker behavior. Keep tests close to the production data contracts they protect.

### `scripts/`, `worker/`, `.openai/`

These support the build/hosting pipeline. `npm run build` calls `scripts/prepare-sites-build.mjs`; the worker and `.openai/hosting.json` support the Sites-compatible package. They are deliberate infrastructure, not temporary scaffolding.

## Documentation

- `README.md` — human entry point.
- `AGENTS.md` — AI/development guardrails and approved creative direction.
- `DESIGN.md` — concise visual system.
- `docs/ARCHITECTURE.md` — this maintenance guide.
- `docs/QA.md` — verified visual/accessibility baseline.
- `design/` — only approved source-of-truth visual references.

Temporary audit screenshots, local tool output, rendered comparisons, and generated debug artifacts should never be committed.

## Branch hygiene

The desired steady state is small:

- `main`
- at most one active `feat/*` or `fix/*` branch per piece of work
- an occasional `backup/*` branch before destructive migration, removed once production is verified

Avoid permanent `noop-*`, `vN`, `preview`, `publish-*`, `replace-*`, or abandoned AI-agent branches. If an experiment matters, preserve the useful result as a normal commit or documented decision, then remove the branch.

## Safe change order

1. Branch from the latest `main`.
2. Make the smallest coherent change.
3. Run `npm run test`.
4. Run `npm run build`.
5. Verify desktop, mobile, reduced-motion, direct case-study routes, and cinematic media loading.
6. Merge to `main` only after production parity is confirmed.
7. Delete the completed work branch.

## Non-negotiable content rules

- Do not fabricate metrics, testimonials, client outcomes, or enterprise work.
- Do not replace verified project captures with generic mockups.
- Do not mix BRAYROAI agency code/assets into this portfolio repository.
- Preserve reduced-motion and keyboard-access behavior when changing animations.
- Treat the approved portrait/video identity assets as deliberate production dependencies.
