# Production Audit Report

## Architecture repaired

- Removed the runtime Base64/Gzip loader and all browser-side source reconstruction.
- Removed external source-package requests and GitHub proxy rewrites.
- Restored a normal static Vercel build: source files are copied into `dist/` and served directly.
- Kept clean URLs for `/` and `/system` without a catch-all rewrite that could intercept assets.

## Reliability fixes

- Validated every local HTML reference and anchor target.
- Removed stale, unused and duplicate production assets.
- Added build-time checks for duplicate IDs, missing metadata, legacy loader code and invalid deployment configuration.
- Added safe mobile navigation state, Escape handling, modal focus restoration and external-link security attributes.
- Corrected canonical, Open Graph, robots and sitemap URLs.

## Responsive and visual fixes

- Rebalanced hero typography so words no longer crop at mobile or desktop widths.
- Corrected oversized mobile buttons and compact-screen spacing.
- Improved the System page layout and controls for touch screens.
- Added consistent focus-visible treatments and minimum touch-target sizing.
- Added overflow protection without disabling normal vertical scrolling.

## Performance optimizations

- Reduced Canvas particle counts by viewport size.
- Capped expensive mobile Canvas rendering near 30 FPS.
- Disabled decorative ambient effects on coarse pointers and reduced-motion devices.
- Throttled scroll work through `requestAnimationFrame`.
- Added `content-visibility` to expensive below-the-fold sections.
- Removed unused fonts, project screenshots and duplicate portraits.
- Added immutable caching for versioned production assets.
- Core HTML/CSS/JS and used imagery remain below the automated 900 KiB audit budget.

## Automated checks

Run:

```bash
npm run check
```

This performs a clean production build, JavaScript syntax checks and the repository audit. The latest local audit passes with a 392,518-byte measured core production payload.
