# YKG Cinematic Portfolio — Design QA

## Comparison target

- Source visual truth: `design/ykg-cinematic-editorial-target.png`
- Browser-rendered implementation storyboard: `output/playwright/implementation-storyboard.png`
- Combined comparison evidence: `output/playwright/source-vs-implementation.png`
- Source pixels: 793 × 1983
- Implementation storyboard pixels: 793 × 1983
- Combined comparison pixels: 1602 × 2023
- Browser capture viewport: 1440 × 1024 CSS px, device scale factor 1
- Mobile verification viewport: 390 × 844 CSS px, device scale factor 1
- State: first-visit opening captured separately; homepage storyboard uses the completed opening and seven representative scroll states.
- Normalization: each implementation frame was captured at the same desktop viewport, cover-cropped into a 793 px editorial storyboard, and placed beside the source at equal pixel dimensions. The opening, mobile hero, menu, and case-study states were evaluated as focused captures.

## Full-view comparison evidence

The combined comparison confirms the intended near-black / warm-bone / electric-cyan system, oversized condensed typography, casual portrait treatment, real product imagery, evidence-led chapters, warm client-work intermission, systems section, portrait-led manifesto stage, and cinematic pacing. The implementation intentionally replaces the source mock's image-clipped monogram and tilted strip collage because the user explicitly rejected those treatments; solid display type and separate photographic frames preserve the same art direction while resolving readability.

## Focused evidence

- Opening second beat: `output/playwright/after-opening-second-beat.png`
- Hero opening frame: `output/playwright/final-01-hero.png`
- Hero system frame: `output/playwright/final-02-hero-system.png`
- Hero resolution frame: `output/playwright/final-03-hero-resolution.png`
- Project reel: `output/playwright/final-04-projects.png`
- Client-work intermission: `output/playwright/final-05-client.png`
- Systems chapter: `output/playwright/final-06-approach.png`
- Manifesto stage: `output/playwright/final-08-manifesto.png`
- Mobile hero: `output/playwright/after-home-mobile-top-final.png`
- Mobile navigation: `output/playwright/after-mobile-menu.png`
- Mobile case study: `output/playwright/after-campusmate-mobile-final.png`
- Live iframe: `output/playwright/after-campusmate-live-desktop.png`
- Protected-deployment fallback: `output/playwright/after-lernio-fallback-desktop.png`

Focused captures were required because opening timing, mobile title fit, navigation state, live embed behavior, and protected-frame behavior are not readable at storyboard scale.

## Required fidelity surfaces

- Fonts and typography: Bebas Neue display type and Recursive body type load locally. Hero, opening, project, process, and manifesto hierarchy match the source's condensed editorial language. Mobile headline and case-study title fit without horizontal overflow.
- Spacing and layout rhythm: desktop sections preserve full-viewport cinematic frames and deliberate chapter changes; mobile converts the pinned hero into a readable linear sequence. Browser checks report `scrollWidth === clientWidth` at 390 px.
- Colors and visual tokens: near-black, warm bone, and electric cyan match the approved direction. The dim text token was raised to `#968f82`; automated contrast checks now pass.
- Image quality and asset fidelity: all visible portraits and product captures use approved optimized WebP assets. No placeholder imagery, CSS drawings, handcrafted SVG art, or emoji substitutes are present.
- Copy and content: service claims remain forward-looking; project proof is repository/deployment-backed. No testimonials, client outcomes, enterprise claims, or fabricated metrics were added. Fakhri Mart remains separated as client work.
- Interaction and responsiveness: opening is skippable, route transitions use the View Transition API with a fallback, mobile navigation works, every case-study route resolves, CampusMate embeds live, Lernio presents an explicit security fallback, and reduced-motion users are not scroll-locked.
- Accessibility: automated axe checks pass with zero violations on desktop homepage, mobile homepage, and a representative case-study page. All tested buttons have names; images have alt attributes; iframes have titles; IDs are unique; focus indicators are visible.

## Comparison history

### Pass 0 — blocked

- [P1] Opening relied on image-filled letterforms and visually fragmented frames, making the title hard to read.
- [P1] Hero used four competing tilted strips that covered copy and weakened hierarchy.
- Fix: replaced both with solid typography, a separate portrait shot, a signal-line reveal, a three-act pinned hero, and staged real project frames.
- Post-fix evidence: `after-opening-second-beat.png`, `final-01-hero.png`, `final-02-hero-system.png`.

### Pass 1 — blocked

- [P1] The final hero statement was oversized and clipped its final line at the third scroll beat.
- [P2] Mobile hero and CampusMate case-study titles overflowed the viewport.
- Fix: reduced the final statement scale and width; set mobile-specific display sizing; verified no horizontal overflow.
- Post-fix evidence: `final-03-hero-resolution.png`, `after-home-mobile-top-final.png`, `after-campusmate-mobile-final.png`.

### Pass 2 — blocked

- [P1] Automated accessibility checks found low-contrast dim copy and focusable links inside hidden desktop project panels; reduced-motion initially left the body scroll-locked briefly.
- Fix: raised the dim token, removed incorrect `aria-hidden`/tab-index handling so CSS visibility controls desktop panels and mobile links remain reachable, and made the reduced-motion opening complete immediately.
- Post-fix evidence: final Playwright/axe run reports zero violations; reduced-motion reports `openingVisible: false`, `bodyLocked: false`; fresh console reports zero errors and warnings.

### Pass 3 — passed

- No actionable P0, P1, or P2 visual, responsive, interaction, or accessibility findings remain.

## Primary interactions tested

- First-visit opening, skip path, and repeat-visit bypass
- Desktop scrubbed hero at three scroll states
- Scroll-stopping project sequence and case-study navigation
- Mobile menu open state
- All homepage and project routes
- CampusMate live iframe and Lernio protected-frame fallback
- Responsive layout at 1440 × 1024 and 390 × 844
- Reduced-motion behavior
- Keyboard/focus semantics through automated accessibility analysis
- Console and network error checks

## Follow-up polish

- [P3] The film timecode is intentionally decorative and could be made dynamic in a future iteration.
- [P3] A future content pass could add verified project diagrams when repository-level architecture artifacts are available.

final result: passed
