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
- Any unknown route — Custom not-found experience

## Local production verification

```bash
npm run check
```

The deployment build creates a compact loader in `dist/`. It retrieves the versioned production source package from this public repository, expands it in the browser, inlines the route-specific CSS and JavaScript, and serves repository-hosted optimized assets. This avoids fragile build-time binary reconstruction on Vercel while keeping the complete implementation versioned in Git.

## Source package

The deterministic source package is stored in:

- `.source/portfolio-source.gz.b64.part1`
- `.source/portfolio-source.gz.b64.part2`
- `.source/portfolio-source.gz.b64.part3`

The downloadable release contains the normal readable HTML, CSS, JavaScript, and asset files for local development.

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

Development branches:

- `feat/cinematic-system-integration`
- `fix/vercel-loader-deployment`
