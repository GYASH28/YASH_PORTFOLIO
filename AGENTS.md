# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design decisions

- Source visual: `design/ykg-cinematic-editorial-target.png`.
- Direction: "YKG Cinematic Editorial" - a Signal Aperture opening, kinetic film-strip hero, evidence-first project chapters, and a Living Systems Stage finale. Near-black, warm bone, electric cyan, oversized condensed typography, cinematic photography, and deliberate scroll choreography.
- Yash's supplied face references are identity references only. Approved generated portraits live in `public/images/portraits/`; production UI uses their optimized WebP siblings.
- Keep Yash in casual black layers. Never depict him in a suit, blazer, tie, or generic corporate styling.
- Present services as forward-looking offers and projects as verified proof. Do not invent client outcomes, testimonials, revenue metrics, or enterprise engagements.
- Homepage project discovery uses a pinned, scroll-stopping editorial sequence with real project captures; every featured project links to a dedicated case-study route.
- Project pages explain the problem, decisions, implementation, verified proof, and lessons. Embed live projects when their deployment allows framing and show an explicit live-site fallback when security headers block iframe embedding.
- Treat Fakhri Mart as client work, visually and structurally separated from Yash's independent product work.
- The rejected aperture opening and tilted multi-strip hero must not return. Opening type stays solid and legible; portraits and product imagery appear as separate cinematic shots.
- The homepage should feel like one continuous scroll-directed film: a short title sequence, a multi-shot pinned hero, evidence-led project chapters, a warm client-work intermission, systems/process chapters, and a decisive portrait-led finale.
- Prefer fewer, larger visual moves over busy collages. Motion must preserve reading time, keyboard access, responsive clarity, and a reduced-motion cut.
