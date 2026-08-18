# YKG Digital Agency — Hero V3 deployment transport

This branch is deployment transport only for the standalone YKG Digital agency website. It does not represent or modify the personal portfolio `main` branch.

Release: Hero V3, 2026-08-18
Payload SHA-256: e69c70974533607352d0bc137ccf5d7b14f74bbad32762c8c9412051655c8621

The browser receives normal static HTML, CSS, JavaScript, and WebP assets. The compressed text chunks in this branch are decoded only during the Vercel build so the browser has no runtime reconstruction dependency.

Pre-deployment QA completed on the exact source: static QA, interaction contract, asset QA, performance budget, runtime performance, desktop/tablet/mobile/small-mobile Playwright checks, reduced-motion checks, and repeated stress testing.
