/**
 * Y/G Systems Studio — Project data model.
 *
 * Real, verifiable projects only. No fabricated metrics, awards,
 * testimonials, or partnerships. Statuses are honestly stated.
 */

export type ProjectStatus =
  | "Live"
  | "Live prototype"
  | "In development"
  | "Client build"
  | "Ongoing";

export type ProjectCategory =
  | "AI Learning System"
  | "AI Companion"
  | "Campus Platform"
  | "Commerce Platform";

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

export interface ProjectCaseStudySection {
  heading: string;
  body: string[];
}

export interface Project {
  slug: ProjectSlug;
  index: number;
  name: string;
  tagline: string;
  purpose: string;
  category: ProjectCategory;
  status: ProjectStatus;
  role: string;
  platform: string[];
  technologies: string[];
  capabilities: ProjectCapability[];
  links: ProjectLink[];
  colorTheme: {
    primary: string;
    soft: string;
    glow: string;
  };
  visual: {
    motif: string;
    accentShape: "knowledge-node" | "memory-wave" | "qr-grid" | "yarn-strand";
  };
  caseStudy: ProjectCaseStudySection[];
}

export const PROJECTS: Project[] = [
  {
    slug: "lernio",
    index: 1,
    name: "Lernio AI",
    tagline: "AI Learning Operating System",
    purpose:
      "A lesson-first learning platform that turns diploma coursework into a connected knowledge graph with AI tutoring, notes, quizzes, revision, and planner.",
    category: "AI Learning System",
    status: "In development",
    role: "Founder · Product Engineer",
    platform: ["Web", "Mobile-first PWA"],
    technologies: ["Next.js", "TypeScript", "OpenAI", "Vector retrieval", "Postgres"],
    capabilities: [
      { label: "Knowledge graph", detail: "Lessons connect into a navigable map" },
      { label: "AI tutor", detail: "Provider-routed tutoring on lesson content" },
      { label: "Study modes", detail: "Notes · Quizzes · Revision · Planner" },
      { label: "Lesson-first UX", detail: "Real diploma workflows, not generic LMS" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/GYASH28", kind: "repository" },
    ],
    colorTheme: {
      primary: "#7dd3fc",
      soft: "#bae6fd",
      glow: "rgba(125, 211, 252, 0.35)",
    },
    visual: {
      motif: "Knowledge nodes connecting into a learning path",
      accentShape: "knowledge-node",
    },
    caseStudy: [
      {
        heading: "Problem",
        body: [
          "Diploma students juggle scattered notes, fragmented syllabus PDFs, and ad-hoc quizzes with no system connecting what they learn across subjects. Existing LMS platforms organize content but rarely turn it into structured, navigable knowledge.",
          "Lernio treats each lesson as a node in a knowledge graph rather than an isolated document. The graph is what makes retrieval, tutoring, and revision coherent.",
        ],
      },
      {
        heading: "Product strategy",
        body: [
          "Structure the platform around real diploma workflows: semester → subject → lesson → study mode. AI tutoring is layered on top of structured lessons instead of acting as a free-floating chatbot.",
          "The lesson-first principle means every interaction begins from a unit of learning, not from a blank prompt. This is the opposite of a generic AI wrapper.",
        ],
      },
      {
        heading: "System architecture",
        body: [
          "Frontend: Next.js + TypeScript with a lesson-centric information architecture.",
          "Intelligence: provider-routed model calls with retrieval scoped to the current lesson graph.",
          "Data: Postgres for users, lessons, and progress; vector store for retrieval-augmented tutoring.",
        ],
      },
      {
        heading: "AI implementation",
        body: [
          "Model selection per task — tutoring, summarisation, and quiz generation route to different providers based on cost and quality.",
          "Retrieval is scoped to the lesson and its prerequisite graph, which keeps answers grounded in coursework.",
        ],
      },
      {
        heading: "Current stage",
        body: [
          "In active development. Subject and lesson scaffolding is in place, with AI tutoring and study modes being iterated against real coursework feedback.",
        ],
      },
    ],
  },
  {
    slug: "brace",
    index: 2,
    name: "B.R.A.C.E.",
    tagline: "Desktop AI Companion",
    purpose:
      "A voice-first desktop AI assistant with persistent memory, tool routing, and provider-aware responses — built for sustained working sessions rather than one-off prompts.",
    category: "AI Companion",
    status: "Live prototype",
    role: "Founder · Product Engineer",
    platform: ["Desktop", "Electron"],
    technologies: ["Electron", "TypeScript", "OpenAI", "Anthropic", "Vector memory", "Tool routing"],
    capabilities: [
      { label: "Voice-first", detail: "Speech as primary input modality" },
      { label: "Memory", detail: "Persistent context across sessions" },
      { label: "Tool routing", detail: "Calls external tools based on intent" },
      { label: "Provider routing", detail: "Routes to best model per task" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/GYASH28", kind: "repository" },
    ],
    colorTheme: {
      primary: "#c4b5fd",
      soft: "#ddd6fe",
      glow: "rgba(196, 181, 253, 0.35)",
    },
    visual: {
      motif: "Voice waveform resolving into memory threads and tool paths",
      accentShape: "memory-wave",
    },
    caseStudy: [
      {
        heading: "Problem",
        body: [
          "Most AI assistants forget everything between sessions and route every request to a single model. For sustained work — research, writing, coding — that loses context and money.",
          "B.R.A.C.E. treats a working session as a stateful artifact: memory persists, tools can be invoked mid-conversation, and the model behind a request is chosen deliberately.",
        ],
      },
      {
        heading: "System architecture",
        body: [
          "Desktop shell built on Electron with a TypeScript core.",
          "Memory layer: vector store with retrieval scoped to the active session and long-term user memory.",
          "Tool layer: registered tools exposed to the model with permissioned invocation.",
        ],
      },
      {
        heading: "AI implementation",
        body: [
          "Provider routing: requests are classified (chat, code, reasoning, vision) and sent to the model best suited to the task and budget.",
          "Tool routing: when the model emits a tool call, B.R.A.C.E. resolves it through a permissioned registry, executes it, and returns the result as context.",
          "Memory: short-term conversation state plus long-term vector memory retrievable across sessions.",
        ],
      },
      {
        heading: "Interface decisions",
        body: [
          "Voice-first interaction with text fallback. The interface is quiet by default and surfaces context only when relevant.",
          "Memory and tool usage are visible without being intrusive — the user always knows what the assistant knows and what it is doing.",
        ],
      },
      {
        heading: "Current stage",
        body: [
          "Live prototype. Voice input, memory, and provider routing are functional. Tool routing and desktop polish are under active iteration.",
        ],
      },
    ],
  },
  {
    slug: "campusmate",
    index: 3,
    name: "CampusMate",
    tagline: "Connected Campus Platform",
    purpose:
      "A role-aware campus platform connecting students, faculty, and administrators with QR-based attendance, notices, timetables, and academic organization.",
    category: "Campus Platform",
    status: "Client build",
    role: "Product Engineer · Full-stack",
    platform: ["Web", "PWA", "Mobile-first"],
    technologies: ["Next.js", "TypeScript", "Prisma", "Postgres", "QR scanning", "PWA"],
    capabilities: [
      { label: "Role-aware UX", detail: "Distinct flows for students, faculty, admin" },
      { label: "QR attendance", detail: "Scan-to-mark attendance with verification" },
      { label: "Notices", detail: "Role-targeted campus communication" },
      { label: "Timetable", detail: "Structured academic organization" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/GYASH28", kind: "repository" },
    ],
    colorTheme: {
      primary: "#86efac",
      soft: "#bbf7d0",
      glow: "rgba(134, 239, 172, 0.35)",
    },
    visual: {
      motif: "Campus topology — role nodes connecting through QR markers",
      accentShape: "qr-grid",
    },
    caseStudy: [
      {
        heading: "Problem",
        body: [
          "Campus operations are split across paper, WhatsApp groups, and disconnected tools. Attendance, notices, and timetables live in different places and rarely respect the differences between student, faculty, and admin needs.",
          "CampusMate unifies these into a role-aware platform where each role sees the workflows that matter to it — without the clutter of everyone else's.",
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
        heading: "System architecture",
        body: [
          "Frontend: Next.js + TypeScript, mobile-first PWA so it works on student phones without an app install.",
          "Backend: Prisma + Postgres with role-scoped access control.",
          "QR layer: scannable codes tied to sessions with verification to prevent spoofing.",
        ],
      },
      {
        heading: "Interface decisions",
        body: [
          "Each role gets a focused home screen — students see attendance and timetable; faculty see their classes and notices to send; admin sees campus-wide metrics.",
          "Touch targets, motion, and density are calibrated for phone-first daily use.",
        ],
      },
      {
        heading: "Current stage",
        body: [
          "Client build. Core role flows, QR attendance, and notices are in place. Timetable and academic organization are being refined with the client.",
        ],
      },
    ],
  },
  {
    slug: "fakhri-mart",
    index: 4,
    name: "Fakhri Mart",
    tagline: "Wholesale Commerce Experience",
    purpose:
      "A wholesale catalogue platform modernising a traditional yarn and textile business — product discovery, filtering, and WhatsApp-driven enquiry for B2B buyers.",
    category: "Commerce Platform",
    status: "Client build",
    role: "Product Engineer · Full-stack",
    platform: ["Web", "Mobile-first"],
    technologies: ["Next.js", "TypeScript", "Prisma", "Postgres", "WhatsApp Business API"],
    capabilities: [
      { label: "Catalogue", detail: "Visual wholesale product discovery" },
      { label: "Filters", detail: "Material, colour, weight, and category filters" },
      { label: "WhatsApp enquiry", detail: "Direct conversion to a sales conversation" },
      { label: "Mobile-first", detail: "Optimised for buyer phones" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/GYASH28", kind: "repository" },
    ],
    colorTheme: {
      primary: "#fdba74",
      soft: "#fed7aa",
      glow: "rgba(253, 186, 116, 0.35)",
    },
    visual: {
      motif: "Yarn strands unwinding into catalogue tiles",
      accentShape: "yarn-strand",
    },
    caseStudy: [
      {
        heading: "Problem",
        body: [
          "Traditional wholesale businesses rely on phone calls, WhatsApp groups, and physical sample books. Buyers can't browse the full catalogue efficiently, and sales teams spend time answering the same questions repeatedly.",
          "Fakhri Mart brings the catalogue online with filters and direct WhatsApp enquiry — modernising the workflow without removing the human sales conversation.",
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
        heading: "System architecture",
        body: [
          "Frontend: Next.js + TypeScript, mobile-first.",
          "Backend: Prisma + Postgres for catalogue, inventory, and enquiry tracking.",
          "WhatsApp layer: pre-filled enquiry messages with product context for fast sales response.",
        ],
      },
      {
        heading: "Interface decisions",
        body: [
          "Catalogue tiles use real product imagery with material, weight, and colour surfaced as filterable metadata.",
          "Enquiry CTA is persistent on every product — one tap composes a contextualised WhatsApp message.",
        ],
      },
      {
        heading: "Current stage",
        body: [
          "Client build. Catalogue, filters, and WhatsApp enquiry flow are in place. Inventory sync and admin tooling are being iterated with the client.",
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
/* Capabilities pipeline data                                          */
/* ------------------------------------------------------------------ */

export interface Capability {
  index: number;
  key: "strategy" | "experience" | "ai" | "delivery";
  label: string;
  summary: string;
  modules: string[];
  realExample: string;
  projectRef: ProjectSlug;
}

export const CAPABILITIES: Capability[] = [
  {
    index: 1,
    key: "strategy",
    label: "Product strategy",
    summary:
      "Turn an ambiguous idea into a structured system people can understand and use.",
    modules: [
      "Users",
      "Problem framing",
      "Requirements",
      "Scope",
      "Flows",
      "Proof points",
    ],
    realExample: "Structuring Lernio around real diploma workflows",
    projectRef: "lernio",
  },
  {
    index: 2,
    key: "experience",
    label: "Experience design",
    summary:
      "Make complex products feel calm, clear, and responsive across every state.",
    modules: [
      "Information architecture",
      "Interaction design",
      "Responsive states",
      "Prototypes",
      "Accessibility",
      "Design system",
    ],
    realExample: "Turning CampusMate roles into clear interfaces",
    projectRef: "campusmate",
  },
  {
    index: 3,
    key: "ai",
    label: "AI implementation",
    summary:
      "Select, route, retrieve, and guard models so they produce real value — not demos.",
    modules: [
      "Model selection",
      "Routing",
      "Retrieval",
      "Memory",
      "Guardrails",
      "Evaluation",
      "Fallbacks",
    ],
    realExample: "B.R.A.C.E. provider and tool routing",
    projectRef: "brace",
  },
  {
    index: 4,
    key: "delivery",
    label: "Full-stack delivery",
    summary:
      "Ship a complete, monitored, deployed product — not a prototype that lives on a laptop.",
    modules: [
      "Frontend",
      "Backend",
      "Data",
      "Authentication",
      "Testing",
      "Deployment",
      "Monitoring",
      "Iteration",
    ],
    realExample: "Shipping real live systems rather than isolated demos",
    projectRef: "fakhri-mart",
  },
];

/* ------------------------------------------------------------------ */
/* System anatomy states                                               */
/* ------------------------------------------------------------------ */

export interface SystemState {
  index: number;
  key: "observe" | "structure" | "engineer" | "evolve";
  label: string;
  short: string;
  visual: string;
  copy: string[];
}

export const SYSTEM_STATES: SystemState[] = [
  {
    index: 1,
    key: "observe",
    label: "Observe",
    short: "OBS",
    visual: "Organic, unstructured signals — frustrations, questions, incomplete paths.",
    copy: [
      "Start with the human workflow, not the model.",
      "Observe real friction before choosing technology.",
    ],
  },
  {
    index: 2,
    key: "structure",
    label: "Structure",
    short: "STR",
    visual: "Signals align into flows; nodes group into modules; architecture appears.",
    copy: [
      "Turn ambiguity into a system people can understand.",
    ],
  },
  {
    index: 3,
    key: "engineer",
    label: "Engineer",
    short: "ENG",
    visual: "Interface, data, model, API, and deployment layers become active.",
    copy: [
      "Build the complete loop, not only the visible screen.",
    ],
  },
  {
    index: 4,
    key: "evolve",
    label: "Evolve",
    short: "EVO",
    visual: "Analytics and feedback return; weak paths improve; version increments.",
    copy: [
      "Real products learn from use and keep improving.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Owner / identity                                                    */
/* ------------------------------------------------------------------ */

export const IDENTITY = {
  name: "Yash Ganesh",
  studio: "Y/G Systems Studio",
  role: "Product Engineer · AI Systems Builder",
  tagline: "A Human Signal Inside the Machine",
  subTagline: "Building Useful Futures",
  methodology: ["Observe", "Structure", "Engineer", "Evolve"],
  philosophy: "Not another AI wrapper. A working product.",
  location: "Pune, India",
  timezone: "Asia/Kolkata",
  email: "yashganesh.work@gmail.com",
  github: "https://github.com/GYASH28",
  linkedin: "https://www.linkedin.com/in/yash-ganesh-/",
  education: "Computer Engineering & IoT",
  available: "Available for selective collaborations",
  portrait:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&h=600&fit=crop&auto=format&q=80",
};

/* ------------------------------------------------------------------ */
/* Tech stack grouped by system layer                                  */
/* ------------------------------------------------------------------ */

export const TECH_LAYERS: { layer: string; tools: string[] }[] = [
  { layer: "Interface", tools: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "shadcn/ui"] },
  { layer: "Application", tools: ["Node.js", "Bun", "Prisma", "NextAuth", "Zustand", "TanStack Query"] },
  { layer: "Intelligence", tools: ["OpenAI", "Anthropic", "Vector retrieval", "Tool routing", "Provider routing"] },
  { layer: "Data & memory", tools: ["Postgres", "SQLite", "Redis", "Vector store", "S3"] },
  { layer: "Infrastructure", tools: ["Vercel", "Cloudflare", "Docker", "Electron"] },
  { layer: "Deployment", tools: ["CI/CD", "Monitoring", "Analytics", "Sentry"] },
];
