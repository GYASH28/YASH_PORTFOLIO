# Yash Ganesh — Cinematic Portfolio

A production-ready, framework-free portfolio focused on AI implementation, product engineering, and interactive digital experiences.

## Highlights

- Cinematic opening sequence with a skip control
- Responsive scroll-driven project storytelling
- Interactive AI implementation workflow lab
- Project case-study modal with keyboard and focus support
- Custom pointer interactions for fine-pointer devices
- Reduced-motion support and mobile-specific performance tuning
- Local WebP imagery and self-hosted WOFF2 fonts
- Vercel security and caching headers

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

The repository is configured as a static Vercel project. Import the repository and deploy from the root directory with no build command.

## Performance work included

- Removed an unused multi-megabyte source image
- Added intrinsic image dimensions and lazy loading below the fold
- Preloaded the critical hero image and primary fonts
- Reduced canvas pixel density and animation frame rate
- Paused off-screen or background-tab animation loops
- Consolidated scroll effects into one `requestAnimationFrame` pipeline
- Added `content-visibility` for selected below-the-fold sections
