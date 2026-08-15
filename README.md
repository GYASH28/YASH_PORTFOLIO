# YKG Digital — V6

Conversion-focused business website for YKG Digital.

## V6 changes

- Replaced stock hero photography with an original AI-generated hero artwork stored locally.
- Kept the hero intentionally minimal while preserving direct pricing and plan CTAs.
- Added current FakhriMart desktop, mobile and full-page visual captures generated from the client's release QA workflow.
- Rebuilt the FakhriMart section as a desktop + phone proof composition with direct live-site and Experience links.
- Rebuilt the before/after section as an interactive transformation theatre with draggable reveal, visual annotations and conversion principles.
- Rebuilt `/experience` as a screenshot-first client experience lab with Desktop, Mobile, Full Page and optional Live modes.
- Added richer scroll choreography, hover response, page transitions and reduced-motion fallbacks.
- Kept plan selection, website self-test and WhatsApp enquiry handoff intact.

## Files

- `index.html` — homepage
- `styles.css` — V4/V5 structural design system
- `v6.css` — V6 art direction and interaction layer
- `app.js` — core plan/test/enquiry logic
- `v6.js` — V6 motion and comparison layer
- `experience.html` / `experience.css` / `experience.js` — Experience page
- `assets/` — AI hero and current FakhriMart proof captures

## QA performed

- Local HTTP checks for both pages and critical assets
- No duplicate IDs
- No broken local paths or internal anchors
- CSS brace integrity checks
- `node --check` on all JavaScript files
- Reduced-motion fallbacks remain present

The container's Chromium process did not complete headless screenshot capture reliably, so no browser-render claim is made from that environment.
