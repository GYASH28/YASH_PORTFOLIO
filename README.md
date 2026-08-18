# Yash Ganesh — Portfolio

Production source for the cinematic portfolio at **https://ykg.vercel.app**.

This repository is intentionally kept focused: production application code, verified media assets, tests, deployment configuration, and the minimum design/agent documentation needed to maintain the site.

## Stack

- React 19
- Vite 6
- GSAP + ScrollTrigger
- Phosphor Icons
- Fontsource (Barlow Condensed, Bebas Neue, Recursive)
- Vercel production deployment

## Quick start

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run test
npm run build
npm run preview
```

## Repository structure

```text
.
├── .openai/              # OpenAI Sites hosting metadata
├── design/               # Approved visual reference(s), not runtime assets
├── docs/                 # Architecture and QA documentation
├── public/
│   ├── frames/           # Scroll-film frame sequences
│   ├── images/           # Production images and project captures
│   └── videos/           # Production cinematic video assets
├── scripts/              # Build/packaging helpers
├── src/                  # React application source
├── tests/                # Data and hosting-worker tests
├── worker/               # Sites worker entry point
├── AGENTS.md             # AI/development guardrails
├── DESIGN.md             # Current visual direction
├── index.html
├── package.json
├── vercel.json
└── vite.config.mjs
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for maintenance rules and [`docs/QA.md`](docs/QA.md) for the latest verified production QA baseline.

## Branch policy

- `main` is the production source of truth.
- Use short-lived `feat/*` or `fix/*` branches for active work.
- Create a `backup/*` branch only before a genuinely destructive migration.
- Delete obsolete preview, experiment, `noop`, version-number, and merged branches after their work is captured in `main`.
- Never mix BRAYROAI/agency source into this repository; agency work belongs in its own repository.

## Deployment

Vercel serves the production site from `main`. `vercel.json` contains the SPA routing configuration. The OpenAI Sites compatibility path uses `.openai/`, `worker/`, and `scripts/prepare-sites-build.mjs`; these files are intentional and should not be removed as “unused” without first removing that deployment target.

## Asset rule

The cinematic frame sequences and approved portrait/video assets are part of the product, not generated build output. Do not bulk-delete or recompress `public/frames`, `public/images`, or `public/videos` without verifying every reference in `src/filmData.js`, `src/projectData.js`, and the application UI.
