# Yash Ganesh — Cinematic Systems Portfolio

Production-ready static portfolio with a cinematic homepage and an interactive Canvas system model.

## Local validation

```bash
npm run check
```

This creates a clean `dist/` build, validates both JavaScript entry points and audits internal references, duplicate IDs, metadata, deployment configuration, asset usage and performance budgets.

## Routes

- `/` — portfolio
- `/system` — interactive system model
- `/404` — not-found page

## Normal Vercel deployment

Vercel runs `npm run build` and publishes `dist/`. The browser receives ordinary HTML, CSS, JavaScript and local image files. It never downloads, decompresses or reconstructs application source at runtime.

The audited production files are stored in the deterministic `.release/portfolio-source.gz.b64.part*` release parts to keep repository deployment atomic. Only the Node build step expands that package before Vercel publishes it.
