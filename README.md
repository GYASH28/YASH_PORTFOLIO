# Yash Ganesh — Cinematic Systems Portfolio

A premium, responsive personal portfolio for **Yash Ganesh**, positioned around AI implementation, product building, interaction design, and practical systems thinking.

## What is included

- The preserved cinematic one-page portfolio experience
- A new interactive **System Model** route inspired by the supplied reference screen
- Scroll-driven project storytelling with lightweight generated interface visuals
- Personal portrait compositions across the hero and About section
- Canvas-powered pseudo-3D neural sphere, data helix, and decision lattice
- Keyboard, touch, drag, reduced-motion, and WebGL-free fallbacks
- Project case-study drawer, copy-email interaction, mobile navigation, and active section highlighting
- SEO metadata, structured data, Open Graph metadata, sitemap, robots file, manifest, favicon, and custom 404

## Routes

- `/` — Main cinematic portfolio
- `/system` — Interactive system model
- `/404` — Custom not-found page

## Local development

This project is framework-free and has no runtime dependencies. The deployment branch stores the browser source in one deterministic compressed text bundle, while the downloadable production package contains the readable source files.

```bash
npm run check
npm run build
python -m http.server 4173 -d dist
```

Then open `http://localhost:4173`.

## Production build

```bash
npm run build
```

Vercel serves the generated `dist/` directory. Build settings are defined in `vercel.json`.

## Accessibility and performance

- Semantic landmarks and heading hierarchy
- Visible focus styles and keyboard-operable navigation
- ARIA state updates for menus, tabs, and dialogs
- Reduced-motion behavior
- Responsive layouts from compact mobile screens to large desktops
- Lazy-loaded secondary portraits
- No heavy 3D library or unnecessary framework bundle

## Repository safety

The repository state before this integration is preserved on:

`backup/pre-system-integration-2026-08-04`

Development was completed on:

`feat/cinematic-system-integration`
