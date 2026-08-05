# Y/G Systems Studio — Award-Level Portfolio Transformation

## Deep Reference Audit + Complete Production Build Prompt

**Current website:** `https://ykg.vercel.app/`  
**Reference websites:**

- `https://www.ohhmydesign.com/`
- `https://developios.com/`
- `https://www.ryanritzenthaler.com/`
- `https://haoqi.design/`

---

## How to use this document

This document has two purposes:

1. **Reference audit:** it explains what makes each reference site visually successful, how its structure, motion, typography, interaction, and storytelling work together, and which principles are relevant to Yash Ganesh’s portfolio.
2. **Master implementation prompt:** it gives a coding agent a complete instruction set for transforming the existing website into a polished, original, responsive, animated, production-grade portfolio.

The goal is **not** to merge four websites into a visual collage. The goal is to extract the strongest underlying principles from all four and create one unmistakably original experience for **Y/G Systems Studio**.

Some reference behavior is created through dynamic WebGL, custom shaders, hover states, scroll states, and route transitions that cannot be fully represented by static HTML alone. Therefore, the analysis below combines observable page structure, visible interface elements, public project descriptions, award-gallery descriptions, and the design logic implied by the interactions. The final design must be validated by manually using every reference on desktop and mobile before implementation begins.

---

# PART I — CURRENT WEBSITE AUDIT

## 1. Existing identity worth preserving

The current Y/G website already has a stronger conceptual foundation than a typical developer portfolio. It includes:

- **Y/G — Systems Studio**
- **A Human Signal Inside the Machine**
- **Observe / Question / Build / Improve**
- **Building Useful Futures**
- **Not another AI wrapper. A working product.**
- **Observe → Structure → Engineer → Evolve**
- **Products with a Pulse**
- Product strategy, experience design, AI implementation, and full-stack delivery
- A personal story based around being a young product-focused developer from Pune
- Real products such as Lernio AI, B.R.A.C.E., CampusMate, and Fakhri Mart

These ideas are strong because they already provide a world, a philosophy, and a visual metaphor. The redesign must expand this system rather than replace it with a generic “creative developer” identity.

## 2. Current structural strengths

The current homepage follows a sensible narrative:

1. Intro / opening
2. Hero and positioning
3. “Not another AI wrapper” statement
4. System methodology
5. Selected work
6. Capabilities
7. About
8. Final CTA

This overall sequence should remain recognizable because it tells a clear story from identity to process to proof to contact.

## 3. Current limitations to solve

The redesign should address the following likely limitations in the present experience:

### 3.1 Sections feel like separate content blocks

The current sections are conceptually related, but the visual experience does not always make them feel like one continuous system. The redesign should create visual continuity so that a shape, signal, line, node, or material from one scene transforms into the next.

### 3.2 The project section relies heavily on screenshots

Screenshots prove that the products exist, but a portfolio at this level must also communicate what each system does, why it matters, how it works, and what Yash contributed. Each project should have its own miniature world, motion language, and clear case-study entry point.

### 3.3 Motion needs stronger hierarchy

Not every element should receive the same type of reveal. The redesigned site needs a motion system with distinct levels:

- Immediate UI feedback
- Text and component transitions
- Scroll-controlled narrative sequences
- One or two cinematic WebGL moments
- Quiet reading states

### 3.4 3D should carry meaning

A generic floating sphere, orb, or particle field would weaken the concept. The 3D system should represent the relationship between human intent, product structure, intelligence, iteration, and engineering.

### 3.5 Mobile must be separately art-directed

A complex desktop timeline cannot simply be squeezed into 390 pixels. The mobile site needs its own section choreography, shorter motion paths, touch-safe interactions, simpler scene geometry, and more direct project navigation.

### 3.6 The site needs more proof and conversion clarity

The current identity is memorable, but potential collaborators should quickly understand:

- What Yash builds
- What types of problems he can solve
- Which projects are real and live
- What role he played
- How to contact him
- What kind of collaboration is appropriate

The redesign must keep the artistic direction while improving trust and clarity.

---

# PART II — DEEP REFERENCE ANALYSIS

# 4. OhhMyDesign — Why it feels alive

## 4.1 Core design idea

OhhMyDesign turns a studio website into a collection of familiar digital workspaces. Instead of presenting every section as a normal webpage section, it repeatedly borrows the visual language of tools people already understand:

- Figma frames
- Chat channels
- Project boards
- Review cards
- Live cursors
- File names
- Canvas dimensions
- Pricing controls
- Comment threads
- Status indicators
- Tooltips and tiny system labels

The site feels good because the interface itself becomes the storytelling device.

## 4.2 Hero structure

The hero establishes personality immediately through:

- Strong availability language
- Live time / timezone details
- Distributed team positioning
- A large, aggressive headline
- A smaller line that acts like a design manifesto
- A project strip or interactive visual area that suggests dragging and exploration
- Direct conversion CTAs

The important lesson is that the hero does not only look bold. It establishes the studio’s operating style: direct, playful, fast, and impossible to ignore.

## 4.3 Interface storytelling

Several sections appear as named digital artifacts, such as:

- `STATEMENT.TXT`
- `hero.frame`
- `pricing.fig`
- `the-difference.fig`
- `footer.frame`
- Named FAQ frames

This naming system makes the page feel like the visitor is looking inside an active design process rather than reading a brochure.

### Why this works

- It creates continuity across unrelated content.
- It turns labels into personality.
- It makes the site feel authored rather than templated.
- It adds detail without requiring excessive decoration.
- It rewards visitors who notice small things.

### What to borrow for Y/G

Use a similar principle, but translate it into Y/G’s engineering language rather than copying Figma file names everywhere. Possible Y/G labels:

- `SIGNAL_BOOT.log`
- `SYSTEM_MAP.01`
- `WORKFLOW_TRACE`
- `PROJECT_CORE`
- `HUMAN_LAYER`
- `DEPLOYMENT_STATUS`
- `MEMORY_NODE`
- `BUILD_PIPELINE`

The labels should feel like one coherent operating system, not random developer jargon.

## 4.4 Work presentation

The work is introduced early and repeated through moving or draggable visual units. Rather than hiding the portfolio behind a single “Work” page, the site uses projects as visual proof throughout the experience.

### What makes it effective

- Project imagery appears before long explanations.
- The visitor immediately sees range.
- Repetition builds credibility.
- Motion creates momentum without requiring full case-study reading.
- Tags quickly establish category and context.

### Application to Y/G

The Y/G hero could contain a restrained stream of real product fragments:

- Lernio lesson nodes
- B.R.A.C.E. voice waveform
- CampusMate QR grid
- Fakhri Mart yarn strands

These fragments should later become full project scenes, creating recognition and continuity.

## 4.5 “What’s up” statement section

OhhMyDesign follows spectacle with a direct statement of what it believes. The typography and file-window framing give the copy importance without requiring a huge paragraph.

### Lesson

After a visually intense hero, visitors need a concise section that explains the position in plain language. Y/G already has the perfect concept for this:

> Not another AI wrapper. A working product.

This section should become a visual proof of the claim, not only text.

## 4.6 Process as a chat thread

The process is expressed as a conversation between the studio and the client:

1. Subscribe
2. Send the brief
3. Refine
4. Ship

The process feels fast and human because it is shown through a chat channel with timestamps, file attachments, reactions, and short dialogue.

### Why this is better than standard process cards

- It demonstrates communication rather than claiming it.
- It makes the process feel realistic.
- It reduces corporate language.
- It creates an easy scroll narrative.
- It gives motion designers natural opportunities for typing, attachment arrival, reaction, and status transitions.

### Application to Y/G

Y/G’s process should not copy a Slack window, but it can demonstrate the lifecycle of a product through a live system trace:

- A user problem enters as an unstructured signal.
- Research and observations appear.
- The signal becomes a workflow.
- The workflow becomes a prototype.
- The prototype becomes an engineered system.
- The system is deployed.
- Feedback returns and updates the system.

This would communicate **Observe → Structure → Engineer → Evolve** in a similarly concrete way.

## 4.7 Horizontal services canvas

OhhMyDesign presents services as a horizontal canvas rather than ordinary stacked cards. The visitor moves sideways through different service spaces.

### Why it works

- It changes the physical rhythm of the page.
- It makes each service feel like a separate workspace.
- It supports wide visual compositions.
- It creates a memorable moment without needing WebGL.

### Risk

Horizontal scroll can be frustrating when it hijacks normal scrolling or behaves poorly on mobile.

### Application to Y/G

Use a desktop-only pinned system map for capabilities. On mobile, convert it into a vertical accordion or stacked chapter system. Do not preserve horizontal movement merely for consistency.

## 4.8 Comparison section

The “same brief, different studio” section uses a comparison-frame metaphor. It creates a decision moment by showing two possible experiences side by side.

### Application to Y/G

Use this logic in the “Not another AI wrapper” section:

**Disconnected AI demo** vs. **Complete working product**

Compare:

- Prompt box vs. complete workflow
- Model call vs. model routing
- Stateless reply vs. memory
- Pretty screen vs. edge cases
- Demo data vs. real data
- Prototype vs. deployment
- Feature list vs. actual user value

The section should visually reorganize the disconnected pieces into a functioning system.

## 4.9 Testimonials and social proof

The site presents proof through different native-looking formats:

- Video-style cards
- Social comments
- Review cards
- Metrics
- Named founders

### Lesson for Y/G

Yash may not yet have dozens of client reviews. Do not fabricate them. Use truthful proof instead:

- Live products
- Repository links
- Product screenshots
- Number of real subjects / lessons / roles only when verified
- Deployment status
- Real client project status
- Short, accurate statements about the purpose and current stage
- College or community use only when true

Proof does not need to look corporate; it needs to be verifiable.

## 4.10 Dynamic local CTA

The site references the time in India and adjusts its closing language accordingly. This makes the page feel live.

### Application to Y/G

Use a small live Pune time and availability status in the HUD. Avoid overcomplicated location tracking. A simple client-side local time for Pune is enough.

## 4.11 Pricing interaction and playful surprise

The pricing section contains a tactile selection control, while a deliberately useless button creates a playful moment near the end.

### Lesson

A premium portfolio benefits from one optional moment that exists purely for delight. It should not interrupt the main journey or hide essential content.

### Y/G equivalent

A small “Do not destabilize the core” control could briefly disturb the Signal Core, scramble a few interface readings, and then recover. It should be optional, accessible, and disabled under reduced motion.

## 4.12 What Y/G should learn from OhhMyDesign

Borrow:

- Interface-as-storytelling
- Named system artifacts
- Real-time presence details
- Project proof early in the page
- Process demonstrated through behavior
- Different interaction mechanic for major sections
- Playful microcopy
- One optional surprise
- Strong CTA clarity

Do not copy:

- Figma window styling directly
- Their exact headlines or jokes
- Their subscription business structure
- Fake cursor collaboration
- Excessive interface chrome
- Every section being a software mockup

---

# 5. Developios — Why it converts

## 5.1 Core design idea

Developios is less experimental than Haoqi or Ryan, but it is the strongest reference for commercial hierarchy and proof. It clearly answers:

- What the company does
- Who it serves
- What it has shipped
- Why it is trustworthy
- What services are available
- What process it follows
- What the visitor should do next

Its design supports the business argument rather than competing with it.

## 5.2 Hero clarity

The hero contains:

- A direct category statement
- A concrete audience
- A clear outcome
- Review proof
- Recognizable client branding
- A clear CTA

### Application to Y/G

Within the first viewport, the visitor should know:

- Yash is a product engineer and AI systems builder.
- He designs and builds real working products.
- His strongest work includes learning systems, AI companions, campus tools, and client platforms.
- The visitor can explore selected systems or start a project.

Do not hide this behind an intro sequence longer than a few seconds.

## 5.3 Proof sequencing

Developios uses a persuasive sequence:

1. Rating / trust
2. Client names
3. Positioning
4. Metrics
5. Selected projects
6. Services
7. Testimonials
8. Process
9. Technology capability
10. Contact

### Application to Y/G

Y/G should use a more personal version:

1. Identity and position
2. Live projects
3. Working-system philosophy
4. Selected systems
5. Method
6. Capabilities
7. Personal story
8. Contact

This keeps the page artistic while ensuring the visitor receives proof before the about section.

## 5.4 Project modules

Developios presents project imagery with concise explanations and tags. The project cards are commercially readable even without opening a case study.

### Application to Y/G

Every selected project must show:

- Project category
- Product name
- One-sentence purpose
- Yash’s role
- Current status
- Key system capabilities
- Live link or repository
- One meaningful visual
- Clear case-study CTA

Avoid unexplained screenshots.

## 5.5 Services as outcomes

The services are not named only by skill. They are framed around useful outcomes such as growth, MVP launch, revenue optimization, and enterprise marketing.

### Application to Y/G

Capabilities should connect to the kinds of systems Yash can create:

- Product strategy → turn an idea into a clear system
- Experience design → make complex products understandable
- AI implementation → select and connect models, retrieval, memory, and guardrails
- Full-stack delivery → build, test, deploy, and improve the product

Each capability should have a real example from the portfolio.

## 5.6 Metrics and trust

Developios uses project counts, satisfaction, ratings, and testimonials heavily.

### Application to Y/G

Only use metrics that can be verified. Suitable examples might include:

- Number of active products
- Number of Lernio subjects, lessons, or semesters if accurate
- Number of CampusMate roles if accurate
- Live deployments
- Years building only if stated honestly

Avoid fake scale. A young builder is more convincing when the site confidently shows real depth instead of pretending to be a large agency.

## 5.7 Four-step process

The process section is clear, numbered, image-supported, and outcome-focused:

- Discovery and strategy
- Architecture and UX
- Design and prototype
- Build, ship, and improve

### Application to Y/G

This aligns naturally with:

- Observe
- Structure
- Engineer
- Evolve

Y/G can use a more experimental interaction while retaining the same commercial clarity.

## 5.8 Technology proof

Developios shows tools and platforms to reduce perceived risk.

### Application to Y/G

Show technologies only where they reinforce capability. Do not create a huge icon wall. Group them by system layer:

- Interface
- Application
- Intelligence
- Data and memory
- Infrastructure
- Deployment

Use actual technologies from real projects.

## 5.9 Contact flow

Developios uses a structured, multi-step project form and explains what happens next.

### Application to Y/G

Y/G can use a smaller, more personal contact flow:

1. Name and contact
2. What are you trying to build?
3. What stage is it at?
4. What kind of help is needed?
5. Optional budget / timeline

Also provide direct email. The form should be functional, accessible, and protected from spam.

## 5.10 What Y/G should learn from Developios

Borrow:

- Immediate category clarity
- Proof before long explanation
- Project outcomes
- Clear capability structure
- Numbered process
- Conversion-focused CTA placement
- Technology grouped by relevance
- Clear contact expectations

Do not copy:

- Agency-scale claims
- Fake review counts
- Dense SEO copy
- Large repetitive footer taxonomy
- Generic laptop mockups everywhere
- Corporate tone that weakens Y/G’s personality

---

# 6. Ryan Ritzenthaler — Why the portfolio rewards exploration

## 6.1 Core design idea

Ryan’s portfolio combines practical project information with playful interaction. Public descriptions identify:

- Three.js
- Custom shaders
- Scroll animation
- Parallax
- 3D interaction design
- Text splitting
- Project-page Gaussian blur
- A hidden footer interaction
- A skills scroll section
- Card and list views

The key lesson is that the site does not make visitors choose between usefulness and experimentation. It offers a large, navigable archive while adding interactive material behavior.

## 6.2 Strong typographic identity

The portfolio uses highly distinctive display typography and a restrained black-and-white palette. The visual identity comes from type, spacing, and composition before effects are added.

### Application to Y/G

The Y/G redesign should define a strong type system:

- Expressive display type for hero and major statements
- Neutral, highly readable sans-serif for explanations
- Technical mono for system labels and data

The display type should feel engineered and human, not gothic unless that direction genuinely fits the Y/G brand.

## 6.3 Service cards with real visual content

Ryan’s services are paired with project imagery and direct benefit statements.

### Application to Y/G

Capabilities should include miniature real outputs:

- Product strategy: flow map or product architecture
- Experience design: interface states and user journey
- AI implementation: model routing / memory / retrieval diagram
- Full-stack delivery: deploy pipeline and live status

This is stronger than four abstract icons.

## 6.4 Card view and list view

The ability to switch between card and list views is one of the most useful ideas in the reference set.

### Why it works

- Visual visitors can browse project imagery.
- Technical or scanning-oriented visitors can compare metadata quickly.
- It makes a large archive manageable.
- It creates a functional interaction, not only decoration.

### Application to Y/G

Selected work on the homepage should remain cinematic, but an **All Systems** route could offer:

- Cinematic card view
- Compact systems list
- Filter by product type
- Filter by status
- Filter by platform
- Search by technology or capability

This becomes more valuable as Yash’s portfolio grows.

## 6.5 Custom shaders as material

The portfolio’s project transitions use shader behavior such as Gaussian blur. This is important: the shader is not merely a decorative background. It changes how project media appears and transitions.

### Application to Y/G

Use shaders in specific, meaningful places:

- Signal distortion during the opening
- Project media displacement when transitioning between systems
- Controlled blur or refraction when entering a case study
- Soft memory-smear effect for B.R.A.C.E.
- Knowledge-node energy field for Lernio

Do not use one shader indiscriminately across the page.

## 6.6 Text splitter

Split text can make headings feel carefully choreographed. It is most effective when used on a few important transitions.

### Application to Y/G

Use split-line reveals for:

- “A Human Signal Inside the Machine”
- “Building Useful Futures”
- Project titles
- Final CTA

Avoid animating every character in every paragraph.

## 6.7 Hidden footer interaction

A hidden footer creates a final reward for visitors who reach the end.

### Application to Y/G

The final scene can appear to complete the Signal Core, then reveal contact and footer information as the page slightly “opens” beneath the system frame. The footer should still be accessible without requiring a precise gesture.

## 6.8 Project pages

The reference distinguishes homepage spectacle from project-page explanation. The project route can use motion during entry, then become a readable case study.

### Application to Y/G

Case studies should be visually strong but quieter than the homepage. Use large media, strong diagrams, concise text, and occasional controlled motion. Do not run a full GPU-heavy hero behind the entire article.

## 6.9 What Y/G should learn from Ryan

Borrow:

- Strong type-led identity
- Functional card/list view switch
- Large scalable project archive
- Custom shader transitions
- Project-specific motion
- Hidden final reveal
- Clear service information
- Case-study routes with continuity

Do not copy:

- Blackletter type
- Monochrome identity if it conflicts with Y/G
- Exact blur shader
- Exact project-card layout
- Motion that hides essential information
- Large archive density on the homepage

---

# 7. Haoqi — Why one WebGL idea becomes unforgettable

## 7.1 Core design idea

Haoqi’s homepage behaves like a digital instrument. Public descriptions and visual previews show:

- A deep cobalt environment
- A fixed HUD grid
- Live clock
- Coordinate readout
- Theme and sound controls
- A central dimensional “hello” object
- A cursor that feeds a WebGL shader like a paintbrush
- Light trails that respond to movement
- A globe glyph and telemetry details
- A strong manifesto section
- A compact project list
- Quiet, restrained project pages

The website is memorable not because every section uses a new visual effect, but because one interaction system is executed with extreme consistency.

## 7.2 Fixed HUD frame

The site uses a persistent grid and interface frame. Content moves inside a stable instrument-like environment.

### Why it works

- It creates spatial continuity.
- It makes the site feel like a system rather than a page.
- It gives small data elements a reason to exist.
- It makes cursor interaction feel native to the world.

### Application to Y/G

Use a subtle Y/G System HUD containing only useful or meaningful information:

- Y/G mark
- Current section
- Pune time
- Availability
- Scroll progress
- Optional theme / sound controls
- Small coordinate or signal-strength reading in the hero only

The frame should reduce or disappear in case studies and on small screens.

## 7.3 Cursor as scene input

The pointer becomes an input source for the WebGL environment. Movement leaves a light trail and updates coordinates.

### Why it works

- The visitor immediately understands that the site is responsive.
- It rewards curiosity without requiring instructions.
- It turns a basic action into authorship.
- It makes the WebGL scene feel alive rather than pre-rendered.

### Application to Y/G

The pointer can inject energy into a signal field:

- Movement bends nearby signal lines.
- Small nodes wake and connect.
- A signal-strength reading changes.
- Hovering over “Observe,” “Structure,” “Engineer,” and “Evolve” changes the field’s topology.
- Project links tint or reshape the field according to project identity.

On touch devices, use direct touch ripples or a simplified inertial field. Never require gyroscope permission by default.

## 7.4 One dominant color and one dominant moment

Haoqi uses a strong blue field and a central 3D word. The disciplined palette makes the effect more memorable.

### Application to Y/G

Choose one primary signal color and one warm human accent. Do not use every project’s gradient throughout the whole site.

A possible system:

- Warm black / graphite background
- Off-white typography
- Electric violet-blue signal
- Warm amber or coral human pulse
- Project colors introduced locally, not globally

## 7.5 3D typography

The central “hello” object is dimensional, soft, inflated, reflective, and highly tactile.

### Application to Y/G

Create an original **Y/G Signal Core** rather than 3D text copied from Haoqi. The core could combine:

- A structural Y-shaped frame
- A G-shaped signal loop
- Soft inner organic material
- Hard outer engineering ribs
- Tiny pulse nodes
- A luminous inner path

The contrast between organic and engineered surfaces should express “human signal inside the machine.”

## 7.6 Manifesto sequence

The homepage contains a pinned or scroll-controlled statement sequence. This turns philosophy into an experience rather than static text.

### Application to Y/G

Use a scroll-driven manifesto:

- Start with human friction
- Convert friction into observable signals
- Convert signals into structure
- Convert structure into a working product
- Return feedback to the human

This can lead directly into the method section.

## 7.7 Loud homepage, quiet interiors

One of the strongest reference principles is the separation between spectacle and substance. The homepage performs. The case studies become quiet reading environments.

### Application to Y/G

Homepage:

- WebGL
- Scroll scenes
- Cursor response
- Cinematic transitions

Case studies:

- Clean reading column
- Large media
- System diagrams
- Controlled reveal animation
- Minimal HUD
- No unnecessary persistent canvas

## 7.8 What Y/G should learn from Haoqi

Borrow:

- One memorable WebGL interaction
- Fixed system frame
- Cursor as input
- Dimensional central object
- Restrained palette
- Telemetry details
- Loud home / quiet case-study contract
- Strong manifesto

Do not copy:

- The cobalt palette directly
- The 3D “hello” lettering
- The exact coordinate HUD
- The exact light-trail shader
- The same grid dimensions
- Sound behavior without a clear reason

---

# PART III — SYNTHESIZED CREATIVE DIRECTION

# 8. Final design concept

## Y/G SIGNAL OPERATING SYSTEM

The redesigned portfolio should feel like a living product-engineering instrument built around a single concept:

> **A human signal enters the machine, becomes structure, becomes a product, and returns to improve human life.**

The site should combine:

- OhhMyDesign’s interface storytelling and playful detail
- Developios’s commercial clarity and proof hierarchy
- Ryan’s project exploration and shader transitions
- Haoqi’s focused WebGL interaction and visual restraint

The result must still be original.

## 8.1 Emotional qualities

The experience should feel:

- Intelligent
- Curious
- Precise
- Cinematic
- Responsive
- Human
- Experimental
- Trustworthy
- Young but not immature
- Ambitious but not fake

## 8.2 Anti-aesthetic

It must not become:

- Generic cyberpunk
- A neon gaming dashboard
- A portfolio made only of glass cards
- An endless particle background
- A clone of an Awwwards site
- A collection of unrelated animation demos
- A slow, scroll-jacked showreel
- An agency website pretending to have fake scale

## 8.3 Central visual metaphor

A signal is the design primitive.

It can appear as:

- A line
- A pulse
- A node
- A waveform
- A field
- A trail
- A connection
- A scan
- A route
- A deployment trace

It must evolve throughout the site rather than restart in every section.

---

# PART IV — MASTER IMPLEMENTATION PROMPT

> Copy everything from this point into the coding agent responsible for the project.

---

# MASTER PROMPT: COMPLETELY TRANSFORM YKG.VERCEL.APP

Act as a senior creative director, product designer, motion designer, creative frontend engineer, WebGL/Three.js specialist, interaction designer, accessibility specialist, performance engineer, and production QA lead.

Your task is to completely transform the existing website at:

`https://ykg.vercel.app/`

Use the following references for principles and quality, not for direct copying:

- `https://www.ohhmydesign.com/`
- `https://developios.com/`
- `https://www.ryanritzenthaler.com/`
- `https://haoqi.design/`

The final result must be an original, production-ready portfolio for **Yash Ganesh / Y/G Systems Studio**.

Do not stop after creating a new hero. Do not create only a mockup. Do not create disconnected animation experiments. Audit, design, implement, test, optimize, and deliver the complete website.

---

## 1. Mandatory research phase

Before changing code:

1. Open the existing website on desktop and mobile.
2. Use every navigation item.
3. Complete the opening sequence.
4. Test the skip-intro path.
5. Scroll through every section slowly and quickly.
6. Inspect each project link.
7. Record current bugs, layout issues, performance problems, and console errors.
8. Inspect the repository structure.
9. Identify the framework, routing, styling, animation, and deployment architecture.
10. Identify reusable components and assets.
11. Open all four references on desktop and mobile.
12. Record their section order, transitions, interaction patterns, responsive changes, pointer behavior, project presentation, loading behavior, typography, spacing, and content hierarchy.
13. Create a short internal design decision document before implementation.

Do not begin implementation until the audit is complete.

---

## 2. Preserve the real identity

Preserve and strengthen:

- Y/G — Systems Studio
- Yash Ganesh
- Product Engineer
- AI Systems Builder
- Interaction-focused developer
- A Human Signal Inside the Machine
- Building Useful Futures
- Observe / Question / Build / Improve
- Observe → Structure → Engineer → Evolve
- Not another AI wrapper. A working product.
- Products with a Pulse
- Lernio AI
- B.R.A.C.E.
- CampusMate
- Fakhri Mart
- Pune, India
- Current real links, technologies, project status, and factual information

Do not invent:

- Awards
- Testimonials
- Clients
- Revenue
- User counts
- Experience
- Years in business
- Team members
- Product metrics
- Partnerships
- Case-study results

When information is missing, use neutral labels such as “In development,” “Live prototype,” “Client build,” or “Ongoing,” but only when accurate.

---

## 3. New visual system: Y/G Signal OS

Create a cohesive visual language called **Y/G Signal OS**.

### 3.1 Design primitives

Use:

- Signal lines
- Nodes
- Grids
- Traces
- Waveforms
- System labels
- Material contrast
- Human pulse accents
- Technical diagrams
- Spatial depth
- Quiet editorial typography

### 3.2 Color system

Create design tokens for:

- `--bg-primary`
- `--bg-secondary`
- `--surface-1`
- `--surface-2`
- `--surface-elevated`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--signal-primary`
- `--signal-soft`
- `--human-accent`
- `--success`
- `--warning`
- `--border-soft`
- `--border-strong`

Suggested direction:

- Warm black or deep graphite base
- Off-white text
- Electric violet-blue primary signal
- Warm amber/coral human accent
- Project-specific colors used only within project scenes

Avoid rainbow gradients, excessive cyan, and generic purple-blue SaaS styling.

### 3.3 Typography system

Use no more than three font families:

1. Expressive display font
2. Highly readable sans-serif body font
3. Monospace system font

Define fluid tokens with `clamp()` for:

- Display 1
- Display 2
- H1
- H2
- H3
- Body large
- Body
- Small
- Metadata

Requirements:

- Strong line breaks at every breakpoint
- Maximum readable line length
- No tiny grey paragraphs
- No overflow at 320px
- Proper font loading
- Font subsetting
- Fallback stacks
- No invisible text while fonts load

### 3.4 Grid

Create a persistent but subtle responsive grid:

- Desktop: 12-column system
- Tablet: 8-column system
- Mobile: 4-column system
- Fine crosshair or node points only in selected scenes
- Grid opacity must remain low enough not to reduce readability

### 3.5 Icon system

Create one consistent custom SVG icon language.

Required icons:

- Observe
- Structure
- Engineer
- Evolve
- Product strategy
- Experience design
- AI implementation
- Full-stack delivery
- Live link
- Repository
- Email
- Location
- Availability
- Menu
- Close
- Sound
- Theme
- Scroll
- Project navigation

Rules:

- Consistent stroke width
- Consistent viewBox
- No mixed icon libraries
- Meaningful hover/focus animation only
- No continuous decorative spinning

---

## 4. Motion system before section animation

Create reusable motion tokens.

### 4.1 Duration tokens

- Instant feedback: 80–140ms
- Micro interaction: 160–240ms
- UI transition: 280–450ms
- Component reveal: 500–750ms
- Section transition: 800–1200ms
- Cinematic event: 1400–2400ms

### 4.2 Easing tokens

Define:

- Standard ease
- Enter ease
- Exit ease
- Expressive spring
- Smooth scrub curve
- Reduced-motion fallback

### 4.3 Motion rules

- Motion must communicate cause and effect.
- Elements should enter from a logical source.
- Related elements should share timing.
- The most important element should move first or last intentionally.
- Do not animate all elements simultaneously.
- Do not apply blur to every reveal.
- Do not animate every character.
- Use stillness between intense scenes.
- Avoid scroll latency that makes the page feel disconnected.
- Keep click feedback immediate.
- Ensure all pinned sequences release cleanly.

### 4.4 Preferred implementation

Choose one primary system for timeline and scroll control.

Recommended when compatible:

- GSAP + ScrollTrigger for scroll choreography
- Three.js or React Three Fiber for WebGL
- A lightweight smooth-scroll layer only when needed
- Motion / Framer Motion only for component and route state when it does not conflict with GSAP

Do not let multiple libraries control the same transform properties.

---

## 5. Global page architecture

Use the following homepage sequence:

1. Boot sequence
2. Hero / Signal Core
3. Position: working product, not wrapper
4. System anatomy: Observe → Structure → Engineer → Evolve
5. Selected systems
6. Capabilities pipeline
7. Human layer / About
8. Final signal / Contact
9. Hidden but accessible footer reveal

Every section must have a distinct purpose and interaction mechanic.

---

## 6. Opening sequence: SIGNAL_BOOT

Create an opening sequence of approximately 2–3 seconds on a normal desktop visit and 1–1.5 seconds on mobile.

### 6.1 Sequence

1. Begin in near darkness.
2. Display a tiny warm pulse.
3. The pulse emits a thin signal line.
4. The signal scans a subtle grid.
5. Nodes light up in sequence.
6. Fragmented Y and G geometry begins to assemble.
7. Small system states appear:
   - OBSERVE
   - QUESTION
   - BUILD
   - IMPROVE
8. The geometry locks into the Y/G Signal Core.
9. Status changes from `INITIALIZING` to `SYSTEM READY`.
10. The hero typography is revealed.
11. Navigation and HUD appear last.

### 6.2 Requirements

- Real progress only if actual assets are loading; otherwise do not fake percentage loading.
- Provide Skip Intro.
- Skip Intro must work immediately.
- Remember repeat visitors in session storage and use a shorter intro.
- Never replay on every route.
- No white flash.
- No layout shift after the intro.
- No audio by default.
- Reduced-motion version should use a short opacity transition.
- Essential text must exist in semantic HTML before the animation completes.

### 6.3 Microcopy

Possible system labels:

- `SIGNAL_BOOT.log`
- `HUMAN_INPUT DETECTED`
- `STRUCTURE MAP ONLINE`
- `BUILD CORE READY`
- `Y/G SYSTEM ACTIVE`

Keep microcopy sparse and consistent.

---

## 7. Global HUD and navigation

Create a subtle persistent system frame inspired by instrument interfaces, not copied from any reference.

### 7.1 Desktop HUD

Include:

- Y/G mark top-left
- Current section code
- Navigation links
- Start a Project CTA
- Pune local time
- Availability status
- Thin scroll progress
- Optional theme and sound controls only if implemented properly

### 7.2 Context behavior

- HUD starts minimal during boot.
- Hero uses the full instrument frame.
- Content sections reduce telemetry density.
- Case studies use a quiet simplified header.
- On scroll down, nav may compress.
- On scroll up, essential navigation should reappear.

### 7.3 Mobile navigation

- Compact header
- Minimum 44px touch targets
- Full-screen or large-sheet menu
- Focus trap
- Escape-key close
- Body scroll lock
- Visible current section
- No tiny telemetry clutter
- No cursor-specific instructions

### 7.4 Anchor behavior

- Smooth but not sluggish
- Correct offset for sticky header
- URL hash support
- Browser back behavior preserved
- Keyboard focus moved appropriately after navigation

---

## 8. Hero: A Human Signal Inside the Machine

The hero must communicate identity in under five seconds.

### 8.1 Copy hierarchy

Include:

- `Y/G SYSTEMS STUDIO`
- `PRODUCT ENGINEERING · AI SYSTEMS · INTERACTION`
- Main statement: `A HUMAN SIGNAL INSIDE THE MACHINE`
- Supporting line explaining that Yash turns ambitious ideas into real products end to end
- Primary CTA: `Explore Selected Systems`
- Secondary CTA: `Start a Project`
- Availability and Pune location

### 8.2 Signal Core

Create a custom WebGL object called the **Y/G Signal Core**.

#### Meaning

The object must represent:

- Human intent at the center
- Machine structure around it
- Intelligence flowing through it
- Iteration changing it
- Products emerging from it

#### Visual construction

Possible composition:

- Y-shaped structural frame
- G-shaped continuous signal loop
- Warm inner pulse
- Semi-translucent organic membrane
- Precision metal or glass outer ribs
- Small luminous nodes
- Fine moving traces
- Controlled reflection and refraction

Do not use a generic orb, planet, blob, chrome sphere, or abstract knot.

#### Behavior

Idle:

- Slow breathing pulse
- Tiny signal circulation
- Very subtle rotation or deformation

Pointer:

- Nearby field bends toward pointer
- Signal nodes wake gradually
- Movement leaves a short-lived energy trail
- Coordinate or signal strength readout updates

Scroll:

- Core opens or changes state as the user leaves the hero
- A component of the core travels into the next section

Hover:

- Hovering key hero words changes the signal topology
- CTA hover should produce immediate local response, not move the entire scene

Mobile:

- Simplified geometry
- Lower particle count
- Capped DPR
- Touch ripple or drag response
- No automatic gyroscope request
- Static fallback for low-power devices

### 8.3 Hero typography animation

- Reveal by lines or masks
- Preserve readable order
- Use one expressive dimensional moment only
- Avoid animating every letter independently
- Keep CTA accessible throughout

### 8.4 Scroll cue

Create a scroll cue that behaves like a live signal indicator. It should respond when scrolling begins and transform into the section progress system.

---

## 9. Position section: Not another AI wrapper

Turn this section into a visual demonstration.

### 9.1 Initial state

Display disconnected fragments:

- Prompt input
- Model response
- Floating API label
- Unconnected database
- Generic chatbot bubble
- Random dashboard card

The fragments should feel visually incomplete.

### 9.2 Scroll transformation

As the user scrolls:

1. User intent enters.
2. Workflow appears.
3. Data and retrieval connect.
4. Memory connects.
5. Model routing connects.
6. Guardrails appear.
7. Interface states align.
8. Edge cases become visible.
9. Deployment and monitoring appear.
10. The system resolves into a working product.

### 9.3 Copy

Use concise supporting statements around:

- Workflows
- Edge cases
- Clarity
- Performance
- Real usefulness
- Trust through design

### 9.4 Interaction rules

- Pin only on desktop and capable tablets.
- On mobile, use a vertical build-up sequence.
- Never force the user through an excessively long scroll.
- Provide static diagram fallback.
- All labels must remain readable.

---

## 10. System anatomy: Observe → Structure → Engineer → Evolve

Create a signature four-state sequence using one continuously transforming scene.

### 10.1 Shared scene

Use a central field of nodes, flows, interface fragments, and system layers. The scene should transform rather than switch between unrelated cards.

### 10.2 Observe

Visual state:

- Organic, unstructured signals
- User frustrations
- Questions
- Behaviors
- Incomplete paths
- Soft motion

Copy:

- Start with the human workflow, not the model.
- Observe real friction before choosing technology.

Interaction:

- Pointer reveals hidden relationships.
- Nodes brighten when investigated.

### 10.3 Structure

Visual state:

- Signals align into flows
- Nodes group into modules
- Information architecture appears
- Priorities and dependencies become visible

Copy:

- Turn ambiguity into a system people can understand.

Interaction:

- Lines snap into a clear map.
- Labels settle into hierarchy.

### 10.4 Engineer

Visual state:

- Interface, data, model, API, and deployment layers become active
- Signals move through the architecture
- Tests and edge states appear

Copy:

- Build the complete loop, not only the visible screen.

Interaction:

- User can briefly inspect layers.
- A small architecture key appears.

### 10.5 Evolve

Visual state:

- Analytics and feedback return
- Weak paths improve
- System topology adjusts
- Version state increments

Copy:

- Real products learn from use and keep improving.

Interaction:

- Feedback pulse travels back to the original human node.

### 10.6 Progress UI

Include:

- `01 / 04`
- State title
- Progress line
- Current status
- Keyboard controls
- Swipe/tap controls on mobile

---

## 11. Selected systems: Products with a Pulse

This must be the most polished section of the site.

Projects:

1. Lernio AI
2. B.R.A.C.E.
3. CampusMate
4. Fakhri Mart

### 11.1 Desktop structure

Use a cinematic project stage:

- Pinned media or controlled viewport
- Project number
- Category
- Project name
- One-line product purpose
- Role
- Status
- System capabilities
- Live/repository CTA
- Case-study CTA
- Progress indicator

Do not use four identical cards.

### 11.2 Project continuity

Create morphing transitions:

- Lernio knowledge node becomes a B.R.A.C.E. memory node.
- The memory node becomes a CampusMate QR marker.
- The QR marker unwinds into a Fakhri Mart yarn strand.
- The yarn strand returns to the global signal line.

These transitions must be visually elegant and technically stable.

### 11.3 Lernio AI scene

Visual language:

- Knowledge graph
- Open-book geometry
- Lesson nodes
- AI tutor pulse
- Notes, quiz, revision, and planner fragments

Motion:

- Lessons connect to a central learning path.
- A selected node expands into a real interface preview.
- Progress flows between study modes.

Information:

- AI learning operating system
- Lesson-first experience
- Notes, quizzes, revision, planning, AI tutoring
- Accurate subject / semester information only

### 11.4 B.R.A.C.E. scene

Visual language:

- Voice waveform
- Memory threads
- Assistant core
- Tool-routing paths
- Desktop panels

Motion:

- Voice input becomes intent.
- Intent routes through memory and tools.
- Response returns to the interface.
- Project media uses restrained blur/refraction transition.

Information:

- Desktop AI companion
- Voice-first interaction
- Memory
- Tools
- Provider routing
- Electron / desktop delivery when accurate

### 11.5 CampusMate scene

Visual language:

- Campus topology
- Role nodes
- QR scanner
- Timetable lines
- Attendance signals

Motion:

- Student, faculty, and admin nodes connect.
- QR scan activates an attendance path.
- Mobile interface rises into view.

Information:

- Connected campus platform
- Role-aware workflows
- Attendance
- Notices
- Academic organization
- PWA / mobile-first when accurate

### 11.6 Fakhri Mart scene

Visual language:

- Yarn strands
- Material texture
- Catalogue tiles
- Product filters
- WhatsApp enquiry flow

Motion:

- Yarn strand creates the section grid.
- Products slide along material paths.
- Enquiry CTA resolves into a simple conversion flow.

Information:

- Wholesale catalogue experience
- Product discovery
- Traditional business modernization
- WhatsApp conversion
- Client build

### 11.7 Interaction details

- Image depth follows pointer subtly.
- Metadata appears on focus as well as hover.
- CTAs use restrained magnetic response.
- Media can scrub slightly with pointer or scroll.
- Essential text is never hover-only.
- External links clearly indicate new tabs.

### 11.8 Mobile project structure

Replace the desktop stage with vertical chapters:

- Full-width media
- Strong project title
- Compact metadata
- Tap-to-expand architecture
- Direct CTA
- Optional swipe between media states
- No horizontal overflow
- No long pinned sequence
- No tiny labels

### 11.9 All Systems route

Create `/work` or `/systems` with:

- Card view
- List view
- Filter by category
- Filter by status
- Filter by platform
- Search
- Keyboard navigation
- URL-preserved filter state

---

## 12. Case-study route system

Create a reusable project-detail template.

### 12.1 Route transition

- Project media expands or morphs into case-study hero.
- Title position remains visually connected.
- Transition lasts under one second where possible.
- Direct URL loading must work without relying on previous route state.
- Browser back restores homepage position where practical.

### 12.2 Case-study structure

1. Project title
2. One-sentence purpose
3. Status
4. Role
5. Timeline if accurate
6. Platform
7. Technologies
8. Problem
9. Users
10. Product strategy
11. System architecture
12. Key workflows
13. Interface decisions
14. AI/data architecture where relevant
15. Technical implementation
16. Challenges
17. Accessibility and responsive choices
18. Current result or stage
19. Lessons
20. Live link / repository
21. Next project

### 12.3 Interior visual direction

- Quiet background
- Strong reading width
- Large media
- Hairline dividers
- Technical mono labels
- Controlled diagrams
- No persistent heavy WebGL
- Optional small project-specific accent
- Sticky mini table of contents on desktop
- Collapsible table of contents on mobile

### 12.4 Media

- Use real screenshots
- Crop intentionally
- Show desktop and mobile states
- Provide captions
- Use responsive images
- Lazy-load below fold
- Avoid meaningless device mockups

---

## 13. Capabilities: one complete delivery pipeline

Do not create four unrelated service cards.

Create a connected pipeline:

1. Product strategy
2. Experience design
3. AI implementation
4. Full-stack delivery

### 13.1 Visual model

Each capability is a module in one system. Inputs enter on the left; a deployed product exits on the right.

### 13.2 Capability module content

#### Product strategy

- Users
- Problem framing
- Requirements
- Scope
- Flows
- Proof points

Real example:

- Structuring Lernio around real diploma workflows

#### Experience design

- Information architecture
- Interaction design
- Responsive states
- Prototypes
- Accessibility
- Design system

Real example:

- Turning CampusMate roles into clear interfaces

#### AI implementation

- Model selection
- Routing
- Retrieval
- Memory
- Guardrails
- Evaluation
- Fallbacks

Real example:

- B.R.A.C.E. provider and tool routing

#### Full-stack delivery

- Frontend
- Backend
- Data
- Authentication
- Testing
- Deployment
- Monitoring
- Iteration

Real example:

- Shipping real live systems rather than isolated demos

### 13.3 Interaction

- Focus or hover highlights a module.
- Connected paths brighten.
- Inputs and outputs become visible.
- Mobile uses vertical connected steps.
- Avoid skill bars and arbitrary percentages.

---

## 14. Human layer / About

After the technical intensity, make this section warmer and quieter.

### 14.1 Content

Include:

- Real portrait
- Yash Ganesh
- Pune, India
- Studying Computer Engineering and IoT
- Product-focused developer
- Builder of learning systems, AI companions, campus products, and client experiences
- Ability to move from problem framing to interface, architecture, implementation, and deployment

### 14.2 Visual transition

- Technical grid softens.
- Signal line becomes warmer.
- The Signal Core opens to reveal the human pulse.
- Portrait appears through controlled light or layered masking.
- Density decreases.

### 14.3 Personal details

Use small truthful annotations, for example:

- Currently building
- Learning
- Exploring
- Available for selective collaborations

Do not turn the section into a fake corporate founder bio.

### 14.4 Optional timeline

Use only accurate milestones:

- Education
- Key product starts
- Internship/freelance work
- Major launches

Keep it concise.

---

## 15. Final CTA: complete the signal

Use the final CTA:

> HAVE A SYSTEM WORTH BUILDING?  
> LET’S MAKE IT REAL.

### 15.1 Scene

- The global signal line returns.
- The Signal Core appears in a completed state.
- Earlier fragments align into one stable system.
- Interaction becomes calmer.

### 15.2 Contact options

Include:

- Email
- GitHub
- LinkedIn when available
- Start a Project
- Pune, India
- Availability

### 15.3 Project enquiry form

Fields:

- Name
- Email
- What are you trying to build?
- Current stage
- Type of help
- Timeline
- Optional budget

Requirements:

- Real validation
- Accessible labels
- Error messages
- Loading state
- Success state
- Spam protection
- No fake submission

### 15.4 Delight interaction

Optionally include one small “Do not destabilize the core” control.

When activated:

- Signal field briefly distorts.
- Telemetry becomes unstable.
- System recovers.
- Display a witty recovery message.

Rules:

- Not essential
- Keyboard accessible
- Reduced-motion-safe
- No loud audio
- No repeated annoyance

---

## 16. Footer reveal

Create a subtle hidden-footer reveal inspired by the idea of a final reward, but keep it accessible.

Possible behavior:

- Final CTA panel shifts upward slightly.
- Footer appears beneath the system frame.
- Signal line becomes a divider.

Include:

- Y/G mark
- Work
- Method
- About
- Contact
- GitHub
- Email
- Copyright
- Build/version label

Do not create a massive agency sitemap.

---

## 17. Pointer and cursor system

Desktop only, on devices with fine pointers.

### 17.1 Behavior

- Use native cursor precision or a custom cursor that remains equally precise.
- Pointer becomes a signal input in the hero.
- Context label appears over specific elements.
- Project media receives subtle depth.
- CTAs receive mild magnetic attraction.
- Coordinate or signal-strength reading appears only where meaningful.

### 17.2 Rules

- No delayed click.
- No oversized cursor covering text.
- No cursor replacement on form inputs.
- No hidden cursor without equivalent precision.
- Disable on touch devices.
- Respect reduced motion.
- Stop expensive pointer simulations outside visible scenes.

---

## 18. Microinteraction specification

### Links

- Underline or signal path animates from source to destination.
- External link icon shifts slightly.
- Focus state must equal or exceed hover clarity.

### Buttons

- Immediate press feedback.
- Small internal signal sweep.
- Disabled and loading states.
- No excessive cursor chase.

### Project cards

- Media depth
- Metadata reveal
- Border activation
- Project-specific signal color

### Navigation

- Current section marker
- Smooth menu opening
- Staggered but quick link reveal

### Icons

- Short path draw or state morph
- Never animate continuously without reason

### Images

- Controlled mask reveal
- No repeated blur-in on every image
- Preserve aspect ratio

### Forms

- Floating or persistent labels
- Clear focus
- Inline errors
- Success confirmation

---

## 19. Mobile-first art direction

The mobile experience must be intentionally redesigned.

### 19.1 Required viewport tests

- 320 × 568
- 360 × 800
- 375 × 812
- 390 × 844
- 412 × 915
- 430 × 932
- 768 × 1024
- Mobile landscape

### 19.2 Mobile rules

- No accidental horizontal scroll
- No clipped typography
- No desktop pinning copied blindly
- No hover-only interaction
- No tiny telemetry
- No hidden CTA behind browser UI
- Use `dvh`, `svh`, and safe-area insets correctly
- Minimum 44px touch targets
- Shorter opening sequence
- Simpler 3D geometry
- Reduced particle count
- Lower animation concurrency
- Static posters for heavy scenes
- Lazy-load project scenes
- Pause offscreen canvases
- No automatic sound
- No gyroscope request by default
- Ensure readable order without animation

### 19.3 Mobile section conversions

Desktop pinned sequence → mobile vertical states  
Desktop horizontal gallery → mobile vertical project chapters  
Desktop hover metadata → mobile tap/always-visible metadata  
Desktop cursor field → mobile touch ripple  
Desktop fixed HUD → compact mobile header  
Desktop large diagrams → mobile swipeable or stacked diagrams

---

## 20. Accessibility requirements

Target WCAG 2.2 AA.

Must include:

- Semantic HTML
- Correct heading hierarchy
- Skip-to-content link
- Keyboard navigation
- Visible focus states
- Focus trapping in menus and dialogs
- Escape-key support
- Screen-reader labels
- Alt text
- Form labels
- Status announcements
- Reduced-motion support
- Sufficient contrast
- No meaning through color alone
- No pointer-only essential interaction
- No forced sound
- Accessible project carousels
- Accessible view switcher
- Accessible accordions
- Correct ARIA only where necessary

The site must remain understandable with:

- JavaScript partially unavailable
- WebGL unavailable
- Reduced motion enabled
- Custom cursor disabled
- Images still loading

---

## 21. Performance requirements

The site must remain fast on realistic mid-range devices.

### 21.1 Targets

- LCP under 2.5s on a realistic mobile connection where practical
- CLS under 0.1
- INP under 200ms
- No sustained main-thread blocking
- Smooth interaction on mid-range mobile
- No runaway memory usage
- No hidden-tab rendering

### 21.2 Asset strategy

- AVIF/WebP responsive images
- Correct image sizes
- Lazy-load below fold
- Preload only critical hero assets
- Compress geometry
- Use Meshopt or Draco where useful
- Use compressed textures where useful
- Keep texture resolution reasonable
- Avoid transparent full-screen videos
- Avoid huge autoplay videos
- Provide poster images

### 21.3 WebGL optimization

- Adaptive DPR
- Quality tiers
- Capped particle count
- Reuse geometries and materials
- Dispose resources on unmount
- Pause when offscreen
- Pause when document hidden
- Avoid expensive post-processing stacks
- Use one renderer where practical
- Avoid multiple full-screen canvases at once
- Provide static fallback

### 21.4 JavaScript strategy

- Code split WebGL
- Dynamic import heavy scenes
- Route-level splitting
- Avoid giant animation dependency bundles
- Clean event listeners
- Clean RAF loops
- Avoid unnecessary React re-renders
- Use refs for high-frequency animation updates
- Keep semantic content server-rendered or statically rendered where compatible

### 21.5 Smooth scrolling

If using a smooth-scroll library:

- Keep interpolation restrained
- Preserve keyboard and anchor behavior
- Respect reduced motion
- Prevent nested-scroll bugs
- Avoid excessive lag
- Disable where it harms usability

---

## 22. SEO and social metadata

Implement:

- Accurate title and description
- Canonical URL
- Open Graph image
- Twitter/X card metadata
- Sitemap
- Robots configuration
- Structured data where appropriate
- Project-specific metadata
- Descriptive URLs
- Alt text
- Semantic project headings
- Fast server-rendered text content

Do not hide critical copy inside canvas.

---

## 23. Architecture and code quality

First preserve the current framework if healthy. Rebuild only where necessary.

### 23.1 Suggested structure

```text
src/
  app-or-pages/
  components/
    layout/
    navigation/
    sections/
    projects/
    motion/
    webgl/
    diagrams/
    ui/
  data/
    projects/
    capabilities/
  hooks/
  lib/
    animation/
    webgl/
    accessibility/
    performance/
    analytics/
  styles/
    tokens/
    globals/
  public/
    images/
    models/
    textures/
```

### 23.2 Data-driven content

Projects should come from structured data containing:

- Slug
- Name
- Category
- Status
- Role
- Description
- Capabilities
- Technologies
- Links
- Media
- Color theme
- Case-study sections

Avoid duplicating project markup.

### 23.3 Type safety

- Use strict TypeScript where supported.
- Define project and animation configuration types.
- Avoid `any` unless justified.
- Handle missing data gracefully.

### 23.4 Error handling

- WebGL failure fallback
- Image loading fallback
- Form submission errors
- Route-not-found page
- Broken external link checks
- No unhandled promise rejections

---

## 24. Analytics and behavior measurement

Use privacy-conscious analytics only if already present or explicitly requested.

Useful events:

- Intro skipped
- Selected work viewed
- Case study opened
- Live project clicked
- Repository clicked
- Contact started
- Contact submitted
- Card/list view changed

Do not record cursor coordinates or intrusive interaction data.

---

## 25. Implementation phases

### Phase 1 — Audit and stabilization

- Run existing project
- Fix build errors
- Fix console errors
- Verify links
- Record baseline performance
- Inventory assets
- Identify dead code
- Identify current animation conflicts

### Phase 2 — Design system

- Color tokens
- Type system
- Grid
- Spacing
- Icons
- HUD
- Motion tokens
- Responsive rules
- Accessibility rules

### Phase 3 — Structural rebuild

- Navigation
- Section markup
- Project data
- Work route
- Case-study template
- Contact system

### Phase 4 — Core visual experience

- Boot sequence
- Hero
- Signal Core
- Cursor field
- Position scene
- Method transformation

### Phase 5 — Project system

- Selected work stage
- Project-specific scenes
- Morph transitions
- Work archive
- Case-study routes

### Phase 6 — Remaining sections

- Capabilities pipeline
- About / human layer
- Final CTA
- Footer reveal

### Phase 7 — Mobile adaptation

- Recompose every scene
- Replace desktop-only interactions
- Test touch
- Test small screens
- Optimize assets

### Phase 8 — Accessibility and performance

- Keyboard audit
- Screen-reader audit
- Reduced-motion audit
- Contrast audit
- WebGL fallback
- Runtime profiling
- Bundle profiling
- Core Web Vitals fixes

### Phase 9 — QA and deployment

- Type check
- Lint
- Unit tests where valuable
- Interaction tests
- Production build
- Desktop/browser testing
- Mobile testing
- Route testing
- Link testing
- Form testing
- Vercel deployment
- Post-deploy smoke test

---

## 26. Detailed QA checklist

### Opening

- Intro plays once per session as intended
- Skip works
- Repeat visit is shorter
- Reduced motion works
- No flash
- No blocked content

### Hero

- Copy is readable at all widths
- Core loads gracefully
- Pointer behavior stops offscreen
- Fallback works
- CTAs work

### Navigation

- Desktop nav works
- Mobile menu works
- Focus trap works
- Escape works
- Current section updates
- Anchor offsets are correct

### Method

- All four states are understandable
- Pin releases correctly
- Mobile sequence works
- Keyboard controls work
- Static fallback exists

### Projects

- All links are correct
- Every project has accurate data
- Transitions do not flicker
- Mobile media is readable
- Case studies load directly
- Back navigation works

### Contact

- Validation works
- Error state works
- Success state works
- Spam protection works
- Email link works

### Accessibility

- Tab order logical
- Focus visible
- Reduced motion complete
- Contrast passes
- Alt text present
- No hover-only content

### Performance

- No continuous hidden rendering
- No memory growth after repeated navigation
- Images sized correctly
- WebGL assets lazy-loaded
- No giant initial bundle
- No major layout shift

### Browser coverage

Test latest stable versions of:

- Chrome
- Edge
- Firefox
- Safari where available
- iOS Safari
- Android Chrome

---

## 27. Strict anti-goals

Do not:

- Clone any reference
- Copy Haoqi’s blue scene
- Copy OhhMyDesign’s Figma frames
- Copy Ryan’s typography or shaders
- Copy Developios’s claims or metrics
- Use fake social proof
- Use generic 3D blobs
- Use random gradients
- Use glassmorphism everywhere
- Add motion without purpose
- Add a long unskippable loader
- Create scroll hijacking that fights the visitor
- Hide essential content in canvas
- Use desktop hover interactions on mobile
- Leave placeholder content
- Leave non-functional buttons
- Ignore case-study routes
- Ignore accessibility
- Ignore performance
- Ship console errors
- Stop after the homepage hero

---

## 28. Definition of done

The redesign is complete only when:

- The visual identity is original and coherent.
- The existing Y/G philosophy is stronger than before.
- The opening sequence is polished and skippable.
- The hero communicates who Yash is immediately.
- The Signal Core has a clear conceptual meaning.
- The pointer interaction feels useful and controlled.
- Every major section has a distinct mechanic.
- Section transitions feel connected.
- Selected work is cinematic and informative.
- Each project has an accurate case study.
- The work archive supports card and list views.
- Mobile is separately art-directed.
- Touch interactions work.
- Reduced motion works.
- Keyboard navigation works.
- WebGL fallback works.
- No major layout shift exists.
- No accidental horizontal overflow exists.
- No console errors exist.
- All external links are correct.
- Contact submission works.
- Production build passes.
- Deployment succeeds.
- The final website feels unmistakably like Yash Ganesh, not like a clone of the references.

---

# PART V — DESIGN DECISION MATRIX

| Area | Primary inspiration | What to extract | Y/G implementation |
|---|---|---|---|
| Hero clarity | Developios | Clear role, audience, CTA, proof | Product Engineer + AI Systems Builder with direct project CTA |
| Interface storytelling | OhhMyDesign | Familiar digital-system metaphors | Signal logs, system maps, trace panels |
| WebGL interaction | Haoqi | Cursor as input, one memorable scene | Pointer-driven Signal Core and signal field |
| Project transitions | Ryan | Custom shader material transitions | Project-specific blur, refraction, and signal morphs |
| Work archive | Ryan | Card/list view and scalable catalog | All Systems route with filters and view switch |
| Process | OhhMyDesign + Developios | Demonstrate workflow clearly | Observe → Structure → Engineer → Evolve live transformation |
| Proof | Developios | Early project and trust evidence | Live links, repositories, real capabilities, accurate metrics |
| Playfulness | OhhMyDesign | One optional surprise | Destabilize the Core interaction |
| Visual restraint | Haoqi | One palette, one peak effect | Warm-black system with controlled signal colors |
| Case studies | Haoqi + Ryan | Quiet interiors after loud homepage | Editorial project pages with diagrams and media |
| Mobile | All references | Preserve intent, change mechanic | Vertical chapters, touch interactions, reduced geometry |

---

# PART VI — FINAL CREATIVE PRINCIPLES

1. **The page is a system, not a stack of sections.**
2. **The visitor’s actions should produce visible consequences.**
3. **Every effect must support meaning, hierarchy, or delight.**
4. **One unforgettable WebGL interaction is stronger than ten average effects.**
5. **Projects are proof, not decoration.**
6. **The homepage performs; case studies explain.**
7. **Mobile receives its own choreography.**
8. **Real credibility is stronger than fake scale.**
9. **Typography and spacing must remain strong without animation.**
10. **Performance is part of the visual quality.**
11. **Accessibility is part of the interaction design.**
12. **The final website must feel authored by Yash Ganesh.**

---

# FINAL COMMAND TO THE BUILD AGENT

Begin with the full audit. Preserve the current identity and factual project content. Build the Y/G Signal OS design system. Implement the complete homepage, work archive, case studies, mobile experience, accessibility fallbacks, performance optimizations, and deployment. Validate every animation, transition, route, link, CTA, form, and breakpoint. Do not stop at a concept or partial redesign. Deliver a stable, original, polished, scroll-driven, 3D-enhanced, production-ready portfolio that demonstrates Yash Ganesh’s ability to design and engineer complete digital systems.
