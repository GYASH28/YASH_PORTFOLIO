# Yash Ganesh — AI Systems, Made Useful

A first-party static portfolio with a cinematic opening sequence, interactive system model, responsive project case studies, and a progressive motion layer.

## Interaction layer

- Scroll-scrubbed 3D system object with drag controls
- Section-aware depth rail and live system signal
- Project-card depth parallax and pointer-reactive lighting
- Heading progress choreography
- Mobile, coarse-pointer, and reduced-motion fallbacks
- No external runtime libraries

## Reliability

- No browser ZIP extraction or remote project download
- Fail-safe boot guard prevents a permanent loading screen
- Deterministic `npm run build` output
- Motion features are additive: core content remains usable if they fail

## Local verification

```bash
npm run check
npm run build
python -m http.server 4173 -d dist
```
