# Production QA Baseline

Last verified against the cinematic production build associated with the August 9, 2026 portfolio release.

## Visual baseline

The production experience preserves the approved near-black, warm-bone, and electric-cyan palette; condensed editorial typography; photographic portrait treatment; thin signal motifs; and restrained cinematic movement. The final hero uses the approved full-frame portrait direction instead of the earlier aperture-collage exploration.

The retained visual reference is `design/ykg-cinematic-editorial-target.png`.

## Verified behavior

- Production routes returned HTTP 200 with the expected page title and primary heading.
- No same-origin 4xx/5xx responses or page errors were found during the production-route pass.
- All cinematic films decoded successfully in the verified build.
- Desktop and mobile layouts were checked for horizontal overflow.
- Direct case-study navigation and SPA fallback behavior were verified.
- The protected Fakhri Mart embed uses an explicit live-site fallback when iframe security policy blocks embedding.
- Reduced-motion mode removes cinematic/prologue motion while preserving project content.
- Mobile navigation supports an accessible touch target, Escape dismissal, focus transfer, and background scroll lock.

## Accessibility baseline

The verified pass reported zero Axe WCAG 2 A/AA and 2.1 A/AA violations on desktop and mobile for the homepage, archive, and case-study routes included in the audit.

## Automated checks

At the time of the verified production pass:

- Unit tests: 8/8 passed.
- Sites worker tests: 4/4 passed.
- Required Sites artifacts were generated in the build output.

## Regression checklist

Before promoting a substantial portfolio change, verify:

1. `npm run test` passes.
2. `npm run build` passes.
3. Homepage hero/prologue media loads without an identity or crop jump.
4. Scroll-film canvases render non-transparent decoded frames.
5. Project reel state changes remain readable and keyboard-safe.
6. Case-study routes work when opened directly.
7. Desktop and 390px-class mobile widths have no horizontal overflow.
8. Reduced-motion mode keeps all meaningful content visible.
9. Contact links and external live-site fallbacks resolve correctly.
10. No temporary audit screenshots or build artifacts are added to Git.
