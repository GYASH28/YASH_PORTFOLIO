/**
 * YASH GANESH — THE LIVING PROJECT GALLERY
 *
 * Typed content model. Real, verifiable information only.
 * No fabricated metrics, awards, testimonials, clients, or partnerships.
 * Statuses are honestly stated using neutral language.
 */

export type ProjectStatus =
  | "In development"
  | "Live prototype"
  | "Client build"
  | "Active build"
  | "Ongoing"
  | "Public demo";

export type ProjectSlug = "lernio" | "brace" | "campusmate" | "fakhri-mart";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "repository" | "demo";
}

export interface ProjectCapability {
  label: string;
  detail: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
  /** Optional visual slot — diagram key, screenshot reference, etc. */
  visual?: "diagram" | "screenshot" | "code" | "system-map";
}

export interface Project {
  slug: ProjectSlug;
  index: number;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  role: string[];
  status: ProjectStatus;
  yearStarted: string;
  platform: string[];
  technologies: string[];
  accent: string;
  accentSoft: string;
  world: "paper" | "glass" | "tiles" | "textile";
  coverLabel: string;
  problem: string;
  opportunity: string;
  productStrategy: string[];
  capabilities: ProjectCapability[];
  designDecision: string;
  engineeringDecision: string;
  liveUrl?: string;
  repositoryUrl: string;
  caseStudy: CaseStudySection[];
}

export const PROJECTS: Project[] = [
  {
    slug: "lernio",
    index: 1,
    name: "Lernio AI",
    tagline: "An AI learning operating system designed around diploma-student workflows.",
    shortDescription:
      "Notes, quizzes, revision, planning, and AI tutoring — built around real coursework, not a generic LMS.",
    fullDescription:
      "Lernio is an AI learning operating system structured around real diploma-student workflows. Each lesson becomes a node in a connected knowledge graph, with AI tutoring layered on top of structured content rather than floating free as a chatbot. The product turns scattered notes, syllabus PDFs, and ad-hoc quizzes into a single navigable study experience.",
    category: "AI Learning System",
    role: ["Founder", "Product Engineer", "Designer"],
    status: "In development",
    yearStarted: "2024",
    platform: ["Web", "Mobile-first PWA"],
    technologies: ["Next.js", "TypeScript", "OpenAI", "Vector retrieval", "Postgres"],
    accent: "#e9b949",
    accentSoft: "#f4ead4",
    world: "paper",
    coverLabel: "Learn · Notes · Quiz · Revise · Plan",
    problem:
      "Diploma students juggle scattered notes, fragmented syllabus PDFs, and ad-hoc quizzes with no system connecting what they learn across subjects. Existing LMS platforms organize content but rarely turn it into structured, navigable knowledge.",
    opportunity:
      "Treat each lesson as a node in a knowledge graph rather than an isolated document. The graph is what makes retrieval, tutoring, and revision coherent — and what separates a learning system from a chatbot attached to a syllabus.",
    productStrategy: [
      "Structure around real diploma workflows: semester → subject → lesson → study mode.",
      "AI tutoring is layered on top of structured lessons, not floating free.",
      "Every interaction begins from a unit of learning, not from a blank prompt.",
    ],
    capabilities: [
      { label: "Knowledge graph", detail: "Lessons connect into a navigable map of prerequisites and related topics." },
      { label: "AI tutor", detail: "Provider-routed tutoring scoped to the current lesson context." },
      { label: "Study modes", detail: "Learn · Notes · Quiz · Revise · Ask AI · Plan — one connected experience." },
      { label: "Lesson-first UX", detail: "Real diploma workflows instead of generic LMS abstractions." },
    ],
    designDecision:
      "The lesson page unfolds into connected study modes rather than throwing users into a sidebar of disconnected tools. The interaction itself communicates that Lernio is one connected study experience, not a folder of separate apps.",
    engineeringDecision:
      "Retrieval is scoped to the lesson and its prerequisite graph instead of the whole course corpus. This keeps AI answers grounded in coursework and dramatically reduces hallucination on topics the student hasn't covered yet.",
    repositoryUrl: "https://github.com/GYASH28",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Diploma students in India work with fragmented study materials: photocopied notes, WhatsApp groups, syllabus PDFs, and ad-hoc quizzes shared by faculty. Existing LMS platforms organize this content into folders but don't connect it into anything resembling a learning system.",
          "The result is that revision becomes a scavenger hunt, quizzes test in isolation, and AI tutors — when used — answer questions without any awareness of what the student has actually studied or what comes next in their syllabus.",
        ],
      },
      {
        heading: "Users",
        body: [
          "Primary: diploma students navigating semester coursework across multiple subjects.",
          "Secondary: faculty who want to publish structured lessons, quizzes, and revision material without rebuilding their workflow from scratch.",
        ],
      },
      {
        heading: "Product strategy",
        body: [
          "Build around the real diploma workflow: semester → subject → lesson → study mode. AI tutoring is layered on top of structured lessons instead of acting as a free-floating chatbot.",
          "The lesson-first principle means every interaction begins from a unit of learning, not from a blank prompt. This is the opposite of a generic AI wrapper.",
        ],
      },
      {
        heading: "Information architecture",
        body: [
          "Lesson is the atomic unit. Every study mode — Learn, Notes, Quiz, Revise, Ask AI, Plan — is anchored to the currently open lesson.",
          "The knowledge graph connects lessons across subjects via prerequisite and related-topic edges, so revision can pull from related material without losing context.",
        ],
      },
      {
        heading: "Visual direction",
        body: [
          "Editorial learning environment: warm ivory surfaces, ink-black type, soft yellow accents for active study states.",
          "Pages, tabs, and highlighted notes borrow from how students actually annotate physical books — without becoming a skeuomorphic library.",
        ],
      },
      {
        heading: "Key workflows",
        body: [
          "Learn: structured lesson content with diagrams and embedded media.",
          "Notes: student annotations layered onto the lesson, retrievable later.",
          "Quiz: AI-generated questions scoped to the current lesson and its prerequisites.",
          "Revise: spaced-repetition surfacing of weak lessons based on quiz performance.",
          "Ask AI: chat scoped to lesson context, with retrieval grounded in coursework.",
          "Plan: semester-level planner that organizes lessons into a study cadence.",
        ],
      },
      {
        heading: "AI architecture",
        body: [
          "Model selection per task — tutoring, summarisation, and quiz generation route to different providers based on cost, latency, and quality.",
          "Retrieval is scoped to the lesson and its prerequisite graph, which keeps answers grounded in coursework rather than the model's training data.",
          "Fallbacks: if the primary model is unavailable, the request degrades gracefully to a retrieval-only answer with a clear note rather than a hallucinated one.",
        ],
      },
      {
        heading: "Technical architecture",
        body: [
          "Frontend: Next.js + TypeScript, with a lesson-centric information architecture and code-split study modes.",
          "Backend: Postgres for users, lessons, and progress; vector store for retrieval-augmented tutoring.",
          "Deployment: Vercel with serverless functions for AI routing; PWA manifest for installable mobile use.",
        ],
      },
      {
        heading: "Interaction decisions",
        body: [
          "Lesson page unfolds into connected study modes rather than navigating between separate tools.",
          "AI responses always show their retrieval sources so students can verify the answer against the lesson.",
          "Quiz and revision states share the same lesson context, so progress in one mode informs the others.",
        ],
      },
      {
        heading: "Responsive design",
        body: [
          "Mobile-first PWA — students primarily study on phones, so installability and offline-aware loading matter more than a desktop app shell.",
          "Lesson content uses a single comfortable reading column on mobile and a two-column learn + notes layout on desktop.",
        ],
      },
      {
        heading: "Challenges",
        body: [
          "Grounding AI answers in coursework rather than general knowledge — solved through scoped retrieval and source surfacing.",
          "Building a study planner that respects real academic calendars rather than idealized spaced-repetition curves.",
        ],
      },
      {
        heading: "Edge cases",
        body: [
          "Lessons with no prerequisites (entry-level material) need a different retrieval scope than advanced lessons.",
          "Quiz generation must respect lesson difficulty — an introductory lesson shouldn't generate graduate-level questions.",
        ],
      },
      {
        heading: "Accessibility",
        body: [
          "Keyboard navigation across all study modes, with visible focus on every interactive element.",
          "Sufficient contrast on warm ivory surfaces, and resizable text without breaking the lesson layout.",
        ],
      },
      {
        heading: "Performance choices",
        body: [
          "Code-split each study mode so opening the planner doesn't load the AI tutor bundle.",
          "Lazy-load vector retrieval results below the fold of the lesson view.",
        ],
      },
      {
        heading: "Current stage",
        body: [
          "In active development. Subject and lesson scaffolding is in place, with AI tutoring and study modes being iterated against real coursework feedback.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "Building a learning product around AI is harder than bolting AI onto an LMS — the entire information architecture has to support grounding, not just the chat surface.",
          "Real diploma workflows are messier than idealized learning models. The product has to meet students where they are, not where pedagogy says they should be.",
        ],
      },
    ],
  },
  {
    slug: "brace",
    index: 2,
    name: "B.R.A.C.E.",
    tagline: "A desktop AI companion with persistent memory, tool routing, and provider-aware responses.",
    shortDescription:
      "Voice-first desktop assistant built for sustained working sessions rather than one-off prompts.",
    fullDescription:
      "B.R.A.C.E. is a desktop AI companion designed for sustained work — research, writing, coding, and analysis — where memory, tools, and the choice of model behind each request actually matter. It treats a working session as a stateful artifact: memory persists across sessions, tools can be invoked mid-conversation, and the model behind a request is chosen deliberately rather than defaulted.",
    category: "AI Companion",
    role: ["Founder", "Product Engineer", "Designer"],
    status: "Live prototype",
    yearStarted: "2024",
    platform: ["Desktop", "Electron"],
    technologies: ["Electron", "TypeScript", "OpenAI", "Anthropic", "Vector memory", "Tool routing"],
    accent: "#7a6bd1",
    accentSoft: "#d8dee6",
    world: "glass",
    coverLabel: "Voice · Memory · Tools · Routing",
    problem:
      "Most AI assistants forget everything between sessions and route every request to a single model. For sustained work — research, writing, coding — that loses context and money. The chat surface is also too thin for tasks that span hours or days.",
    opportunity:
      "Treat a working session as a stateful artifact. Memory persists, tools can be invoked mid-conversation, and the model behind a request is chosen deliberately based on the task and budget.",
    productStrategy: [
      "Voice-first interaction with text fallback — speak naturally, type when needed.",
      "Persistent memory layer: short-term conversation state plus long-term vector memory.",
      "Provider routing: classify each request and route to the model best suited to it.",
      "Tool layer: registered tools exposed to the model with permissioned invocation.",
    ],
    capabilities: [
      { label: "Voice-first", detail: "Speech as the primary input modality, with text as a first-class fallback." },
      { label: "Memory", detail: "Persistent context across sessions, scoped to topics and projects." },
      { label: "Tool routing", detail: "Calls external tools and APIs based on conversational intent." },
      { label: "Provider routing", detail: "Routes each request to the model best suited to the task and budget." },
    ],
    designDecision:
      "A spoken phrase enters as a waveform, becomes intent, touches memory and tools, and returns as a response. The interaction itself communicates that B.R.A.C.E. is more than a chat surface — it's a working instrument.",
    engineeringDecision:
      "Provider routing classifies each request (chat, code, reasoning, vision) and sends it to the model best suited to the task and budget. Tool calls resolve through a permissioned registry, execute, and return results as context — the model always knows what it just did.",
    repositoryUrl: "https://github.com/GYASH28",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Most AI assistants forget everything between sessions and route every request to a single model. For sustained work — research, writing, coding — that loses context and money.",
          "The chat surface is also too thin for tasks that span hours or days. You can't easily invoke tools, you can't see what the assistant remembers, and you can't choose a different model for a different sub-task.",
        ],
      },
      {
        heading: "Users",
        body: [
          "Primary: developers, researchers, and writers who work with AI for hours at a stretch and need continuity.",
          "Secondary: power users who want control over which model handles which task, rather than accepting a single default.",
        ],
      },
      {
        heading: "Product strategy",
        body: [
          "Treat a working session as a stateful artifact: memory persists, tools can be invoked mid-conversation, and the model behind a request is chosen deliberately.",
          "Voice-first, but with text as a first-class fallback — speak naturally for long flows, type for precision.",
        ],
      },
      {
        heading: "Information architecture",
        body: [
          "Session is the primary container. Each session has its own memory scope, tool permissions, and provider preferences.",
          "Long-term memory is vector-stored and retrievable across sessions, scoped by topic.",
        ],
      },
      {
        heading: "Visual direction",
        body: [
          "Dark, intimate, spatial. Soft voice light at the center. Layered memory surfaces receding into depth.",
          "Metallic and soft-material contrast: hard chrome surfaces for tools, soft frost for memory.",
          "Voice waveform as a primary visual element rather than decorative audio scrubber.",
        ],
      },
      {
        heading: "Key workflows",
        body: [
          "Voice input → waveform → intent classification → memory lookup → tool invocation (if needed) → response synthesis.",
          "Memory view: see what B.R.A.C.E. knows, edit it, remove incorrect entries.",
          "Tool view: see which tools are registered, their permissions, and recent invocations.",
        ],
      },
      {
        heading: "AI architecture",
        body: [
          "Provider routing: requests are classified (chat, code, reasoning, vision) and sent to the model best suited to the task and budget.",
          "Tool routing: when the model emits a tool call, B.R.A.C.E. resolves it through a permissioned registry, executes it, and returns the result as context.",
          "Memory: short-term conversation state plus long-term vector memory retrievable across sessions.",
        ],
      },
      {
        heading: "Technical architecture",
        body: [
          "Desktop shell built on Electron with a TypeScript core.",
          "Memory layer: vector store with retrieval scoped to the active session and long-term user memory.",
          "Tool layer: registered tools exposed to the model with permissioned invocation.",
        ],
      },
      {
        heading: "Interaction decisions",
        body: [
          "Voice-first interaction with text fallback. The interface is quiet by default and surfaces context only when relevant.",
          "Memory and tool usage are visible without being intrusive — the user always knows what the assistant knows and what it is doing.",
        ],
      },
      {
        heading: "Responsive design",
        body: [
          "Desktop-only by design. The voice-first, multi-tool interaction model doesn't translate cleanly to mobile — better to be excellent on one platform than mediocre on two.",
          "Window can be resized from a focused chat column to a full workspace with memory and tool panels visible.",
        ],
      },
      {
        heading: "Challenges",
        body: [
          "Designing the provider routing classifier so it improves over time without becoming unpredictable.",
          "Balancing voice as the primary input with the need for precision editing on code and structured content.",
        ],
      },
      {
        heading: "Edge cases",
        body: [
          "Tool invocation failures need clear recovery paths — the model should know the tool failed and respond accordingly, not hallucinate a result.",
          "Memory conflicts (two stored facts that contradict) should surface to the user rather than silently resolving.",
        ],
      },
      {
        heading: "Accessibility",
        body: [
          "Voice-first is inherently accessible for users who struggle with typing, but every voice action must have a keyboard equivalent.",
          "Memory and tool panels are keyboard-navigable with visible focus.",
        ],
      },
      {
        heading: "Performance choices",
        body: [
          "Vector retrieval runs in a separate process to keep the conversation UI responsive.",
          "Provider calls are streamed so partial responses appear immediately, with cancellation support if the user interrupts.",
        ],
      },
      {
        heading: "Current stage",
        body: [
          "Live prototype. Voice input, memory, and provider routing are functional. Tool routing and desktop polish are under active iteration.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "Voice-first only works if the rest of the system is also excellent — voice on top of a weak chat surface just exposes the weakness faster.",
          "Provider routing needs to be transparent, not magic. Users want to know which model handled their request and why.",
        ],
      },
    ],
  },
  {
    slug: "campusmate",
    index: 3,
    name: "CampusMate",
    tagline: "A connected campus platform with role-aware workflows for students, faculty, and administrators.",
    shortDescription:
      "Attendance, notices, timetables, and academic organization — unified into one role-aware PWA.",
    fullDescription:
      "CampusMate is a connected campus platform that unifies attendance, notices, timetables, and academic organization into a single role-aware system. Students, faculty, and administrators each see the workflows that matter to them — without the clutter of everyone else's. QR-based attendance is the anchor use case: fast, verifiable, and useful to all three roles.",
    category: "Campus Platform",
    role: ["Product Engineer", "Full-stack Developer"],
    status: "Client build",
    yearStarted: "2024",
    platform: ["Web", "PWA", "Mobile-first"],
    technologies: ["Next.js", "TypeScript", "Prisma", "Postgres", "QR scanning", "PWA"],
    accent: "#1f7ae0",
    accentSoft: "#2ba87a",
    world: "tiles",
    coverLabel: "Scan · Attend · Notice · Schedule",
    problem:
      "Campus operations are split across paper, WhatsApp groups, and disconnected tools. Attendance, notices, and timetables live in different places and rarely respect the differences between student, faculty, and admin needs.",
    opportunity:
      "Unify attendance, notices, and timetables into a role-aware platform where each role sees the workflows that matter to it — without the clutter of everyone else's. QR attendance is the anchor use case.",
    productStrategy: [
      "Role-first information architecture: the same database exposes different surfaces to students, faculty, and administrators.",
      "QR attendance as the anchor use case — fast, verifiable, and demonstrably useful to all three roles.",
      "Mobile-first PWA so students don't need to install an app to use it.",
    ],
    capabilities: [
      { label: "Role-aware UX", detail: "Distinct flows for students, faculty, and admin on the same data." },
      { label: "QR attendance", detail: "Scan-to-mark attendance with verification to prevent spoofing." },
      { label: "Notices", detail: "Role-targeted campus communication instead of mass WhatsApp groups." },
      { label: "Timetable", detail: "Structured academic organization that respects real schedules." },
    ],
    designDecision:
      "A QR scan expands into a chain of connected campus actions: attendance, class context, timetable, notices, role-specific view. The interaction shows that CampusMate connects people and routines, not just screens.",
    engineeringDecision:
      "Role-scoped access control is enforced at the database layer using Prisma's row-level security patterns. QR codes are tied to sessions with verification (location + timestamp) to prevent attendance spoofing — a real concern on campuses.",
    repositoryUrl: "https://github.com/GYASH28",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Campus operations are split across paper, WhatsApp groups, and disconnected tools. Attendance, notices, and timetables live in different places and rarely respect the differences between student, faculty, and admin needs.",
          "Students end up juggling three apps and a WhatsApp group; faculty maintain attendance in spreadsheets; admin has no real-time view of who is where.",
        ],
      },
      {
        heading: "Users",
        body: [
          "Students: attendance tracking, timetable, notices, course material.",
          "Faculty: mark attendance, post notices, view their classes.",
          "Admin: campus-wide metrics, role management, schedule conflicts.",
        ],
      },
      {
        heading: "Product strategy",
        body: [
          "Role-first information architecture: the same database exposes different surfaces to students, faculty, and administrators.",
          "QR attendance is the anchor use case — fast, verifiable, and demonstrably useful to all three roles.",
        ],
      },
      {
        heading: "Information architecture",
        body: [
          "Each role gets a focused home screen — students see attendance and timetable; faculty see their classes and notices to send; admin sees campus-wide metrics.",
          "The same underlying data (courses, schedules, attendance records, notices) is exposed differently per role through scoped access control.",
        ],
      },
      {
        heading: "Visual direction",
        body: [
          "Clear, energetic, structured. Wayfinding-inspired graphics, modular tiles, campus-map geometry.",
          "Bolder daylight color palette compared with the darker projects — campus platforms should feel awake, not nocturnal.",
          "QR patterns as a recurring visual motif, not just a functional element.",
        ],
      },
      {
        heading: "Key workflows",
        body: [
          "Student scans QR at start of class → attendance recorded → next class context shown → relevant notices surfaced.",
          "Faculty marks attendance manually for students who couldn't scan → posts notice to specific course or role → sees attendance trend.",
          "Admin views campus-wide attendance dashboard → resolves schedule conflicts → manages roles.",
        ],
      },
      {
        heading: "Technical architecture",
        body: [
          "Frontend: Next.js + TypeScript, mobile-first PWA so it works on student phones without an app install.",
          "Backend: Prisma + Postgres with role-scoped access control at the database layer.",
          "QR layer: scannable codes tied to sessions with verification (location + timestamp) to prevent spoofing.",
        ],
      },
      {
        heading: "Interaction decisions",
        body: [
          "QR scan is the primary entry point for the most frequent action (attendance), reducing friction for the most-used workflow.",
          "Each role's home screen is focused — students don't see admin controls, faculty don't see campus-wide dashboards.",
        ],
      },
      {
        heading: "Responsive design",
        body: [
          "Mobile-first PWA with offline-aware loading for attendance marking (network can be flaky in campus buildings).",
          "Admin dashboard is desktop-optimized since admin work happens at desks, not on phones.",
        ],
      },
      {
        heading: "Challenges",
        body: [
          "Designing role-scoped access control that's both secure and easy to reason about as the schema evolves.",
          "Preventing QR attendance spoofing without making the scan flow annoying for legitimate students.",
        ],
      },
      {
        heading: "Edge cases",
        body: [
          "Students joining mid-semester need to be backfilled into existing courses without disrupting attendance records.",
          "Faculty posting notices to multiple roles (students + faculty) need clear targeting UI to avoid accidental broadcasts.",
        ],
      },
      {
        heading: "Accessibility",
        body: [
          "Touch targets sized for phone-first daily use on real devices, not just emulators.",
          "QR codes have a manual code-entry fallback for students whose cameras can't scan (older phones, broken cameras).",
        ],
      },
      {
        heading: "Performance choices",
        body: [
          "PWA with service worker caching for the timetable so students can see their schedule even offline.",
          "Attendance marking is optimistic — UI updates immediately and reconciles with the server in the background.",
        ],
      },
      {
        heading: "Current stage",
        body: [
          "Client build. Core role flows, QR attendance, and notices are in place. Timetable and academic organization are being refined with the client.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "Role-aware design is harder than role-based access control — the same data has to feel different to different users, not just be filtered differently.",
          "QR is a great anchor use case because it gives every role a reason to use the platform daily, not just when they need something.",
        ],
      },
    ],
  },
  {
    slug: "fakhri-mart",
    index: 4,
    name: "Fakhri Mart",
    tagline: "A wholesale catalogue platform modernising a traditional yarn and textile business.",
    shortDescription:
      "Product discovery, filtering, and WhatsApp-driven enquiry for B2B buyers — modernising the workflow without removing the human sales conversation.",
    fullDescription:
      "Fakhri Mart is a wholesale catalogue platform that modernises a traditional yarn and textile business. Buyers can browse the full catalogue efficiently with filters for material, colour, weight, and category — and convert directly into a sales conversation via WhatsApp. The platform respects how wholesale buyers actually negotiate rather than forcing them through a generic e-commerce checkout.",
    category: "Commerce Platform",
    role: ["Product Engineer", "Full-stack Developer"],
    status: "Client build",
    yearStarted: "2024",
    platform: ["Web", "Mobile-first"],
    technologies: ["Next.js", "TypeScript", "Prisma", "Postgres", "WhatsApp Business API"],
    accent: "#e89438",
    accentSoft: "#f1e4cf",
    world: "textile",
    coverLabel: "Browse · Filter · Enquire · Convert",
    problem:
      "Traditional wholesale businesses rely on phone calls, WhatsApp groups, and physical sample books. Buyers can't browse the full catalogue efficiently, and sales teams spend time answering the same questions repeatedly.",
    opportunity:
      "Bring the catalogue online with filters and direct WhatsApp enquiry — modernising the workflow without removing the human sales conversation that wholesale buyers actually want.",
    productStrategy: [
      "Catalogue-first experience: every product is discoverable, filterable, and visual.",
      "WhatsApp is the conversion path rather than a traditional checkout — it matches how wholesale buyers actually negotiate.",
      "Mobile-first since buyers browse on their phones between meetings.",
    ],
    capabilities: [
      { label: "Catalogue", detail: "Visual wholesale product discovery with high-quality imagery." },
      { label: "Filters", detail: "Material, colour, weight, and category filters tuned for textile buyers." },
      { label: "WhatsApp enquiry", detail: "Direct conversion to a sales conversation with product context pre-filled." },
      { label: "Mobile-first", detail: "Optimised for buyer phones, not desktop admin workflows." },
    ],
    designDecision:
      "A physical yarn strand draws the layout and becomes category dividers, product paths, filters, and the enquiry route. The material metaphor carries through the entire experience rather than being a decorative motif.",
    engineeringDecision:
      "WhatsApp deep links pre-fill enquiry messages with product context (SKU, quantity, material) so the sales team gets structured leads instead of generic 'I want this' messages. The enquiry is tracked in Postgres so the client can see which products drive interest.",
    repositoryUrl: "https://github.com/GYASH28",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Traditional wholesale businesses — especially in textiles — rely on phone calls, WhatsApp groups, and physical sample books. Buyers can't browse the full catalogue efficiently, and sales teams spend time answering the same questions repeatedly.",
          "Forcing these businesses into generic e-commerce platforms doesn't work because wholesale buying doesn't follow retail patterns — it's conversational, negotiated, and relationship-driven.",
        ],
      },
      {
        heading: "Users",
        body: [
          "Primary: B2B buyers (retailers, tailors, manufacturers) browsing for materials between meetings.",
          "Secondary: the sales team receiving enquiries and needing structured context (which product, what quantity) rather than generic 'I want this' messages.",
        ],
      },
      {
        heading: "Product strategy",
        body: [
          "Catalogue-first experience: every product is discoverable, filterable, and visual.",
          "WhatsApp is the conversion path rather than a traditional checkout — it matches how wholesale buyers actually negotiate.",
        ],
      },
      {
        heading: "Information architecture",
        body: [
          "Catalogue organized by category (yarn type, fabric type) with cross-cutting filters (material, colour, weight).",
          "Each product has rich metadata — material composition, weight, available colours, minimum order quantity — surfaced as filterable facets.",
        ],
      },
      {
        heading: "Visual direction",
        body: [
          "Rich material photography with editorial catalogue composition.",
          "Warm cream and saffron palette evoking textile traditions without becoming kitsch.",
          "Yarn and fabric textures as material metaphors that carry through filtering and enquiry states.",
        ],
      },
      {
        heading: "Key workflows",
        body: [
          "Browse catalogue → apply filters (material, colour, weight) → view product detail → tap 'Enquire on WhatsApp' → pre-filled message with product context opens.",
          "Sales team receives structured enquiry in WhatsApp → responds with pricing → client confirms → order tracked back in Fakhri Mart admin.",
        ],
      },
      {
        heading: "Technical architecture",
        body: [
          "Frontend: Next.js + TypeScript, mobile-first.",
          "Backend: Prisma + Postgres for catalogue, inventory, and enquiry tracking.",
          "WhatsApp layer: deep links with pre-filled enquiry messages including product context (SKU, material, quantity).",
        ],
      },
      {
        heading: "Interaction decisions",
        body: [
          "Enquiry CTA is persistent on every product — one tap composes a contextualised WhatsApp message.",
          "Filters use chips rather than dropdowns so the active filter state is always visible.",
        ],
      },
      {
        heading: "Responsive design",
        body: [
          "Mobile-first since buyers browse on phones between meetings.",
          "Desktop view for the admin/sales team who manage catalogue and respond to enquiries.",
        ],
      },
      {
        heading: "Challenges",
        body: [
          "Building a catalogue system that respects textile-specific metadata (yarn count, fabric weight, dye process) without becoming a database admin tool.",
          "Designing the WhatsApp deep link format so it works across WhatsApp Web, mobile, and Business API clients.",
        ],
      },
      {
        heading: "Edge cases",
        body: [
          "Products available in multiple colours need filter behaviour that doesn't multiply the catalogue artificially.",
          "Out-of-stock products should remain visible (with a clear status) rather than disappearing — buyers may want to be notified when they return.",
        ],
      },
      {
        heading: "Accessibility",
        body: [
          "Product images have descriptive alt text including material and colour — important for screen readers and SEO.",
          "Filter chips are keyboard-navigable with clear active/inactive states.",
        ],
      },
      {
        heading: "Performance choices",
        body: [
          "Responsive images with modern formats (AVIF/WebP) for fast catalogue browsing on mobile networks.",
          "Lazy-load product imagery below the fold so the catalogue can be large without slowing initial load.",
        ],
      },
      {
        heading: "Current stage",
        body: [
          "Client build. Catalogue, filters, and WhatsApp enquiry flow are in place. Inventory sync and admin tooling are being iterated with the client.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "Modernising a traditional business means respecting its existing workflow, not replacing it. WhatsApp conversion works because buyers already use WhatsApp — replacing it with a checkout would have reduced conversion.",
          "Catalogue metadata has to be designed with the buyer's mental model in mind, not the seller's inventory system.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(idx + 1) % PROJECTS.length];
}

/* ------------------------------------------------------------------ */
/* Profile / identity                                                  */
/* ------------------------------------------------------------------ */

export const PROFILE = {
  name: "Yash Ganesh",
  role: "Creative Product Engineer · AI Systems Builder",
  descriptor: "Designer and developer of digital products",
  positioning: "I design digital worlds—and engineer them into real products.",
  supporting:
    "I create visually ambitious products across AI, education, desktop experiences, campus tools, and client platforms — from the first idea to the deployed experience.",
  secondaryLine: "Design that catches attention. Engineering that survives reality.",
  location: "Pune, India",
  education: "Studying Computer Engineering and IoT",
  email: "yashganesh.work@gmail.com",
  github: "https://github.com/GYASH28",
  linkedin: "https://www.linkedin.com/in/yash-ganesh-/",
  availability: "Available for selective collaborations",
  personalHeadline: "Still learning. Already building.",
  personalThought:
    "I'm interested in the point where a strange idea becomes a useful product — where design gives it character and engineering gives it a life outside the mockup.",
};

/* ------------------------------------------------------------------ */
/* Process steps — the studio table                                    */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  step: number;
  label: string;
  detail: string;
  kind: "observe" | "design" | "engineer" | "ship";
}

export const PROCESS_STEPS: ProcessStep[] = [
  { step: 1, label: "Raw observation", detail: "Sit with the real workflow before choosing tools.", kind: "observe" },
  { step: 2, label: "Notes and references", detail: "Capture what people actually do, not what they say they do.", kind: "observe" },
  { step: 3, label: "User flow", detail: "Map the workflow end to end, including the ugly parts.", kind: "design" },
  { step: 4, label: "Wireframe", detail: "Find the structure before painting surfaces.", kind: "design" },
  { step: 5, label: "Visual exploration", detail: "Push art direction without losing the flow.", kind: "design" },
  { step: 6, label: "Prototype", detail: "Build the interaction, not a picture of it.", kind: "design" },
  { step: 7, label: "System architecture", detail: "Decide what the AI does and what it doesn't.", kind: "engineer" },
  { step: 8, label: "Build", detail: "Ship the complete loop, not just the visible screen.", kind: "engineer" },
  { step: 9, label: "Test", detail: "Edge cases first. Happy path last.", kind: "engineer" },
  { step: 10, label: "Deploy", detail: "Real hosting, real monitoring, real users.", kind: "ship" },
  { step: 11, label: "Improve", detail: "Feedback returns to the next observation.", kind: "ship" },
];

/* ------------------------------------------------------------------ */
/* Capabilities — connected forms of work                              */
/* ------------------------------------------------------------------ */

export interface CapabilityGroup {
  index: number;
  key: "design" | "frontend" | "ai" | "delivery";
  label: string;
  summary: string;
  skills: string[];
  realExample: string;
  projectRef: ProjectSlug;
}

export const CAPABILITIES: CapabilityGroup[] = [
  {
    index: 1,
    key: "design",
    label: "Product and Experience Design",
    summary: "Turn ambiguous ideas into clear products people can use.",
    skills: [
      "Product thinking",
      "Problem framing",
      "User flows",
      "Information architecture",
      "Interaction design",
      "Responsive design",
      "Prototyping",
      "Visual systems",
      "Motion direction",
    ],
    realExample: "Lernio's lesson-first information architecture",
    projectRef: "lernio",
  },
  {
    index: 2,
    key: "frontend",
    label: "Creative Frontend",
    summary: "Build interfaces that feel designed, not just functional.",
    skills: [
      "React interfaces",
      "Component architecture",
      "Advanced CSS",
      "GSAP animation",
      "Scroll-driven experiences",
      "3D/WebGL integration",
      "Responsive implementation",
      "Design-system implementation",
    ],
    realExample: "This portfolio's interactive project worlds",
    projectRef: "fakhri-mart",
  },
  {
    index: 3,
    key: "ai",
    label: "AI Product Engineering",
    summary: "Make AI produce real value, not demos.",
    skills: [
      "Model integration",
      "Provider routing",
      "Prompt and workflow design",
      "Memory",
      "Retrieval",
      "Tool use",
      "Streaming states",
      "Fallbacks",
      "Guardrails",
      "Evaluation thinking",
    ],
    realExample: "B.R.A.C.E. provider and tool routing",
    projectRef: "brace",
  },
  {
    index: 4,
    key: "delivery",
    label: "Full Product Delivery",
    summary: "Ship complete, monitored, deployed products.",
    skills: [
      "Frontend",
      "Backend integration",
      "Authentication",
      "Data",
      "APIs",
      "Testing",
      "Deployment",
      "Performance",
      "Monitoring",
      "Iteration",
    ],
    realExample: "CampusMate's role-aware PWA deployment",
    projectRef: "campusmate",
  },
];

/* ------------------------------------------------------------------ */
/* Currently building — typed, easy to update                          */
/* ------------------------------------------------------------------ */

export interface CurrentEntry {
  name: string;
  detail: string;
  status: "Building" | "Exploring" | "Learning";
  dateUpdated: string;
  link?: { label: string; href: string };
}

export const CURRENTLY: CurrentEntry[] = [
  {
    name: "Lernio AI — Study modes",
    detail: "Building the connected Learn → Notes → Quiz → Revise → Ask AI flow against real coursework.",
    status: "Building",
    dateUpdated: "2025",
    link: { label: "Case study", href: "/work/lernio" },
  },
  {
    name: "B.R.A.C.E. — Tool routing",
    detail: "Iterating on permissioned tool invocation and provider routing transparency.",
    status: "Building",
    dateUpdated: "2025",
    link: { label: "Case study", href: "/work/brace" },
  },
  {
    name: "Provider routing patterns",
    detail: "Exploring how to make model selection transparent rather than magical.",
    status: "Exploring",
    dateUpdated: "2025",
  },
  {
    name: "WebGL + R3F + GSAP",
    detail: "Learning how to combine scroll choreography with 3D material storytelling.",
    status: "Learning",
    dateUpdated: "2025",
  },
];

/* ------------------------------------------------------------------ */
/* Tech stack grouped by system layer                                  */
/* ------------------------------------------------------------------ */

export const TECH_LAYERS: { layer: string; tools: string[] }[] = [
  { layer: "Interface", tools: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP", "R3F", "shadcn/ui"] },
  { layer: "Application", tools: ["Node.js", "Bun", "Prisma", "NextAuth", "Zustand", "TanStack Query"] },
  { layer: "Intelligence", tools: ["OpenAI", "Anthropic", "Vector retrieval", "Tool routing", "Provider routing"] },
  { layer: "Data & memory", tools: ["Postgres", "SQLite", "Redis", "Vector store", "S3"] },
  { layer: "Infrastructure", tools: ["Vercel", "Cloudflare", "Docker", "Electron"] },
  { layer: "Deployment", tools: ["CI/CD", "Monitoring", "Analytics", "Sentry"] },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  href: string;
  code: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/#work", code: "01" },
  { label: "Process", href: "/#process", code: "02" },
  { label: "Capabilities", href: "/#capabilities", code: "03" },
  { label: "About", href: "/#about", code: "04" },
  { label: "Contact", href: "/#contact", code: "05" },
];
