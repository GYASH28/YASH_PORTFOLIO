# Yash Ganesh — Creative Portfolio 2026

A cinematic, editorial portfolio for Yash Ganesh — creative developer, AI product builder, and interaction designer.

## Design direction

The experience combines bold editorial typography, asymmetrical portrait composition, scroll-led storytelling, tactile microinteractions, and a restrained black / ivory / electric-blue / orange visual system. The selected-project showcase is intentionally preserved from the previous production build.

## Highlights

- Cinematic opening sequence with an accessible skip control
- Responsive hero with kinetic typography and pointer depth
- Scroll-driven creative-system chapter
- Preserved six-project interactive showcase and case-study modal
- Interactive capability lab and workflow visualization
- Editorial process and about sections
- Fullscreen contact ending
- Keyboard navigation, focus management, and reduced-motion support
- Self-hosted fonts and optimized WebP imagery
- Static Vercel deployment with security and caching headers

## Run locally

No package installation is required.

### Windows

Double-click `START_LOCALHOST.bat`, or run `START_LOCALHOST.ps1` in PowerShell. The site opens at `http://127.0.0.1:4173`.

### Any system with Python

```bash
python -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Deployment

The repository is a framework-free static Vercel project. Deploy from the repository root with no build command.

## Performance work

- Total project payload stays below 1 MB before transfer compression
- Critical fonts and hero portrait are preloaded
- Below-the-fold images use lazy loading and intrinsic dimensions
- Canvas effects use capped pixel density and frame rates
- Animation loops pause when hidden or off-screen
- Scroll work is consolidated through `requestAnimationFrame`
- Reduced-motion mode disables nonessential animation and canvases
- No third-party JavaScript, tracking scripts, or remote font dependencies
