# Yash Ganesh — Cinematic AI Portfolio

Production-ready portfolio for Yash Ganesh, an independent AI product builder and implementation consultant in Pune.

## What changed in v3

- Added a scroll-controlled 3D AI systems lab with five visual states
- Added a rotating CSS 3D hero object and orbital interaction
- Added pointer-drag interaction and scroll choreography
- Added depth tilt and lighting to cards and interactive surfaces
- Improved intro pacing while preserving the existing content and project stories
- Kept responsive and reduced-motion behavior

## Development

The complete editable source is stored in `portfolio-source.zip`.

```bash
npm run unpack
cd source
python -m http.server 4173
```

## Production

Vercel runs:

```bash
npm run build
```

The build extracts the validated static portfolio into `dist/`, including the full HTML, CSS, JavaScript, project screenshots, portraits, and local fonts.
