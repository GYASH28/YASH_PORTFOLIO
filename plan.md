# plan.md — Yash Ganesh Premium Cinematic Portfolio

## 1) Objectives
- Deliver a premium, cinematic, highly interactive personal portfolio for **Yash Ganesh** (AI tools builder / creative tech).
- Core experience: **boot sequence → 32‑frame hero image-sequence @24fps → freeze final frame → staggered hero reveal**.
- Showcase projects with emphasis on **Lernio AI live** embedded via **iframe in a premium 3D browser/laptop frame**.
- Maintain Apple/Vercel/Linear-level smoothness: dark glassmorphism, neon accents, scroll reveals, 3D interactions, responsive + performant.

## 2) Implementation Steps (Phased)

### Phase 1 — Core Risk POC (Isolation)
**Core workflow:** Lernio AI iframe embed + cinematic hero sequence playback/perf.
1. Implement a minimal `/` page that renders:
   - Boot sequence (text-only)
   - Image-sequence player (preload 32 WebP; play once @24fps; freeze; callback onComplete)
   - Iframe embed of `https://lernioai.vercel.app` inside a fixed aspect container
2. Add "Open Fullscreen" (new tab) button near iframe as a safety fallback (kept even if iframe works).
3. Validate:
   - Preload completes; animation timing stable; no layout shift
   - Iframe renders (or visibly shows browser-blocked behavior) and controls remain responsive

**User stories (Phase 1)**
1. As a visitor, I see a boot sequence then a smooth cinematic intro animation.
2. As a visitor, the hero animation plays once and lands on a crisp final frame.
3. As a visitor, the page stays responsive while frames preload/play.
4. As a visitor, I can interact with the embedded Lernio AI site inside the portfolio iframe (if allowed).
5. As a visitor, I can always open Lernio AI in a new tab/fullscreen.

### Phase 2 — V1 App Development (Full Portfolio Build)
1. **Dependencies & setup**
   - Add: `framer-motion`, `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`
   - Tailwind styling system: tokens for neon accents, glass surfaces, gradient borders
2. **App structure**
   - Single-page sections with IDs: Home, About, Skills, Projects, LernioLive, Journey, Contact
   - Reusable components: `Navbar`, `Section`, `MagneticButton`, `GlassCard`, `Reveal`, `Modal`
3. **Hero (premium)**
   - Boot sequence overlay → Image-sequence (frames already in `public/hero-sequence/01.webp…32.webp`)
   - After `onComplete`: stagger hero text + CTA buttons
   - Cursor-follow light / subtle background particles (CSS/canvas) and parallax accents
4. **Navbar**
   - Sticky glassmorphism, transparent-at-top → blur on scroll
   - Smooth scroll, active section highlight, mobile hamburger
5. **About**
   - Use `/public/profile-final.webp` as profile image
   - Short bio + “quick facts” chips + CTA
6. **Skills**
   - Interactive tilt/glow cards; optional lightweight 3D orbit of icons (disable on low-end/mobile)
7. **Featured Projects**
   - 3 cards with 3D hover tilt + modal details:
     - Lernio AI
     - AI Quiz Hint Generator
     - Personal Portfolio Website
8. **Lernio AI Live (primary showcase)**
   - 3D browser/laptop mockup wrapper with iframe
   - Buttons: Open Fullscreen, Visit Live Website, View Case Study, View Features
   - Case study content (problem/solution/features/stack/challenges/future)
9. **Journey/Timeline**
   - Animated timeline with scroll reveals
10. **Contact**
   - Frontend-only form (no backend by default); `mailto:` fallback using `yash.k.ganesh@gmail.com`
   - Show phone `9175524637`, GitHub `gyash28`
   - Resume button uses placeholder file/link
11. **3D & motion polish (V1)**
   - R3F scene: subtle floating objects (code cube / glowing rings) + perf toggles
   - GSAP/Framer Motion for section reveals and microinteractions
12. **Testing**
   - Run 1 round with testing agent: navigation, performance, responsive, iframe section, CTAs

**User stories (Phase 2)**
1. As a visitor, I can use the navbar to smoothly jump to any section with active highlighting.
2. As a visitor, I experience premium animations (stagger, scroll reveal, hover tilt) without jank.
3. As a visitor, I can explore projects via interactive cards and open detailed modals.
4. As a visitor, I can use Lernio AI directly inside the embedded iframe (if allowed).
5. As a visitor on mobile, I get a responsive layout with lighter 3D effects and readable typography.
6. As a visitor, I can contact Yash via form or direct email/phone and access GitHub.

### Phase 3 — Polish, Optimization, Refinement
1. Performance pass
   - Lazy-load heavy 3D below-the-fold; respect `prefers-reduced-motion`
   - Preload strategy for hero frames (already optimized) + progressive boot messaging
2. Visual polish
   - Improve glass depth, neon edge gradients, button magnetism, consistent spacing
3. Content polish
   - Tighten copy, add metrics/impact bullets for projects, ensure consistent tech tags
4. Testing
   - Another full E2E run (desktop + mobile) and fix regressions

**User stories (Phase 3)**
1. As a visitor, the site loads fast and remains smooth even with animations enabled.
2. As a visitor, I can reduce motion and still access all content comfortably.
3. As a visitor, hover and scroll effects feel consistent and premium across sections.
4. As a visitor, the Lernio AI showcase looks like a high-end product demo frame.
5. As a visitor, all CTAs (projects, contact, resume) work reliably.

### Phase 4 — Optional Add-ons (Only if requested)
- Backend contact endpoint (`/api/contact`) + persistence (MongoDB) + spam protection.
- Extra project pages/routes, blog, or GitHub activity integration.

## 3) Next Actions (Immediate)
1. Implement Phase 1 POC page (boot + sequence player + iframe embed + fullscreen button).
2. Verify core behaviors locally (animation timing + iframe behavior).
3. Proceed to Phase 2 full build once Phase 1 is stable.

## 4) Success Criteria
- Hero boot + 32-frame sequence plays once at ~24fps, freezes on final frame, then reveals hero content.
- Navbar smooth-scroll + active section highlight works on desktop/mobile.
- Lernio AI section embeds via iframe when allowed; always provides “Open Fullscreen/New Tab”.
- Consistent premium dark-glass aesthetic, responsive layout, no major jank.
- Testing agent passes end-to-end checks with no broken navigation/CTAs and acceptable performance.