# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design decisions

- Source visual: `design/ykg-cinematic-editorial-target.png`.
- Direction: "YKG Cinematic Editorial" - a Signal Aperture opening, kinetic film-strip hero, evidence-first project chapters, and a Living Systems Stage finale. Near-black, warm bone, electric cyan, oversized condensed typography, cinematic photography, and deliberate scroll choreography.
- Yash's supplied face references are identity references only. Approved generated portraits live in `public/images/portraits/`; production UI uses their optimized WebP siblings.
- Current hero direction overrides the earlier wardrobe note: use Yash's exact face identity in a centered monochrome noir portrait with a tailored black suit, white shirt, and narrow black tie, matching the approved dramatic poster-reference composition. Keep other portraits in casual black layers unless explicitly changed.
- Present services as forward-looking offers and projects as verified proof. Do not invent client outcomes, testimonials, revenue metrics, or enterprise engagements.
- Homepage project discovery uses a pinned, scroll-stopping editorial sequence with real project captures; every featured project links to a dedicated case-study route.
- Project pages explain the problem, decisions, implementation, verified proof, and lessons. Embed live projects when their deployment allows framing and show an explicit live-site fallback when security headers block iframe embedding.
- Treat Fakhri Mart as client work, visually and structurally separated from Yash's independent product work.
- The rejected aperture opening and tilted multi-strip hero must not return. Opening type stays solid and legible; portraits and product imagery appear as separate cinematic shots.
- The homepage should feel like one continuous scroll-directed film: a short title sequence, a multi-shot pinned hero, evidence-led project chapters, a warm client-work intermission, systems/process chapters, and a decisive portrait-led finale.
- Prefer fewer, larger visual moves over busy collages. Motion must preserve reading time, keyboard access, responsive clarity, and a reduced-motion cut.
- The opening prologue is a short, session-scoped title film built from the product-engineering frame sequence. It uses solid legible type, a single horizontal signal motif, a visible skip control, and a match-cut handoff into the first scroll film. Do not reintroduce an aperture or multi-strip collage.
- The favicon is a simplified interlocked YG monogram in warm bone with one cyan signal cut on near-black, optimized for recognition at 16px.
- Video roles are intentionally different: the approved manga portrait film plays once as the session opening and holds its clean final portrait before a match-cut handoff; the middle manifesto film remains scroll-scrubbed; the Living Systems finale plays as an independent ambient loop and is never scroll-scrubbed.
- The approved opening asset is `public/videos/ykg-manga-hero-loop.mp4`. Preserve the exact face, noir suit portrait, monochrome manga panels, and clean portrait end frame. The hero beneath it uses `public/images/portraits/yash-hero-noir-suit-v4.webp` so the transition has no visual identity jump.
- The supplied `Build What Matters` screenshot remains the final-act visual anchor: preserve its composition, grade, subject pose, and copy; animate it as a seamless loop with a gently hovering YG sculpture, subtle cyan particles, and natural blinking/breathing only.
- For that final loop, use the clean `public/images/portraits/yash-manifesto-stage.webp` scene as the video source and keep "BUILD WHAT MATTERS" as live HTML over it. Never bake browser chrome, scrollbars, or the Windows activation overlay from the reference screenshot into the production video.
- Video 2 must remain project-agnostic: never show project names, product interfaces, dashboards, or replaceable portfolio details. Its approved arc is Signal → Fragment → Alignment → Resolve, using only large casual portraits in physical 3D depth, one cyan tracer, a luminous convergence, and a warm final hold. The only statement is “I BUILT WHAT I COULDN’T FIND.” set in restrained cinematic typography. Preserve the separate YG sculpture scene for Video 3. The rendered asset is `public/videos/ykg-build-manifesto.mp4`.
- Across the non-video homepage chapters, scrolling must continuously advance a meaningful visual layer: image parallax, masked media reveals, chapter drift, project-state changes, ledger motion, or progress cues. Keep native scrolling and reduced-motion support; do not hijack wheel or touch behavior.
- The top navigation recedes upward while scrolling down and returns immediately on upward intent, focus, hover, or menu interaction.
- The middle manifesto film is authored as one continuous photographic exposure sequence and delivered as a 30fps scroll-scrubbed frame set; avoid page-like cuts or interface imagery.
- Featured projects share one pinned production-capture stage. Scrolling changes the active capture, proof, and chapter index inside that stage rather than stacking separate cards.
- The Living Systems loop is the footer itself, with contact and final metadata over the film. Do not place a conventional footer after it.
- Section changes use restrained near-black, warm-bone, and neutral luminance dissolves so the page reads as a continuous film rather than colorful gradient panels.
