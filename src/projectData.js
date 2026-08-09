export const projects = [
  {
    slug: "lernio-ai",
    number: "01",
    name: "Lernio AI",
    category: "Independent product",
    type: "Academic intelligence system",
    status: "Live",
    year: "2026",
    summary:
      "A connected learning system for CWIT students that brings coursework, practice, revision, planning, and an AI tutor into one academic workspace.",
    statement: "One academic system. Every CWIT semester.",
    media: "/images/projects/lernio-ai-home.webp",
    liveUrl: "https://lernioai.vercel.app",
    repoUrl: "https://github.com/GYASH28/LERNIOAI",
    embed: "protected",
    accent: "#9b7cff",
    proof: ["Role-aware learning flows", "Grounded LEO tutor", "Semester catalogue", "Exam and revision tools"],
    stack: ["Next.js 16", "React 19", "PostgreSQL", "Groq"],
    role: "Product design, AI architecture, full-stack engineering, deployment",
    problem: [
      "Diploma students move between disconnected notes, notices, practice material, and generic AI chat tools.",
      "A useful system had to understand the academic structure first: branch, scheme, semester, subject, module, and the student's current task.",
    ],
    solution: [
      "Lernio organizes the experience around the real learning loop: learn, take notes, practise, revise, prepare, and ask LEO for help.",
      "The AI layer sits inside the academic context instead of acting as a separate chatbot, so support can stay connected to the subject and activity.",
    ],
    decisions: [
      "Use one persistent academic navigation model across subjects instead of creating a different interface for every tool.",
      "Keep AI actions visible and contextual so students know what the model is using and what to do next.",
      "Treat mobile navigation and low-friction return visits as core behavior, not a reduced desktop layout.",
    ],
    engineering: [
      "Next.js application with role-aware routes and server-backed academic data.",
      "Model integration for LEO tutoring and learning assistance.",
      "Reusable subject, lesson, assessment, and progress primitives across the platform.",
    ],
    lessons: [
      "The quality of an education AI product depends more on its information architecture than on the chat interface.",
      "Students trust assistance more when context, boundaries, and the next action are explicit.",
    ],
  },
  {
    slug: "brace",
    number: "02",
    name: "B.R.A.C.E.",
    category: "Independent R&D",
    type: "Permissioned local AI companion",
    status: "Local build",
    year: "2026",
    summary:
      "A local-first companion and coding agent built around explicit permissions, tool visibility, memory, voice, and user control.",
    statement: "Powerful tools. Visible handoffs.",
    media: "/images/projects/brace-interface-home.webp",
    repoUrl: "https://github.com/GYASH28/brace_new",
    embed: "local",
    accent: "#65d7d2",
    proof: ["Local-first runtime", "Tool approval gates", "Voice interaction", "Persistent memory"],
    stack: ["React 19", "TypeScript", "Node.js", "SQLite"],
    role: "Product direction, interaction design, agent architecture, desktop engineering",
    problem: [
      "Most assistants hide the moment when a suggestion becomes an action, especially when files, terminals, browsers, or external tools are involved.",
      "A desktop agent needs to feel capable without making access, provider choice, or system state invisible.",
    ],
    solution: [
      "B.R.A.C.E. makes the operating state legible: what model is active, which capabilities are available, and when approval is required.",
      "Chat, voice, tasks, files, memory, notes, tools, and projects share a single local workspace rather than behaving like isolated demos.",
    ],
    decisions: [
      "Surface permissions at the action boundary instead of burying them in global settings.",
      "Keep provider and runtime state visible so failure modes are understandable.",
      "Design voice as a first-class state with clear listening, processing, and response feedback.",
    ],
    engineering: [
      "React and TypeScript interface backed by Node.js services.",
      "SQLite memory and local application state.",
      "Tool adapters for browser, terminal, file, and MCP-style workflows with approval gates.",
    ],
    lessons: [
      "Trust grows when the system exposes its boundaries before an action, not after something goes wrong.",
      "Local-first product design needs strong empty, unavailable, and permission-denied states to feel complete.",
    ],
  },
  {
    slug: "campusmate",
    number: "03",
    name: "CampusMate",
    category: "Independent product",
    type: "Multi-role campus operations",
    status: "Live",
    year: "2026",
    summary:
      "A role-aware college platform for attendance, timetables, assignments, notices, notes, exams, and everyday campus workflows.",
    statement: "The campus day, in one place.",
    media: "/images/projects/campusmate-home.webp",
    liveUrl: "https://campuscwit.vercel.app",
    repoUrl: "https://github.com/GYASH28/CAMPUSMATE",
    embed: "live",
    accent: "#63dcff",
    proof: ["Five user roles", "QR attendance", "Installable PWA", "Live deployment"],
    stack: ["React 19", "Vite", "Firebase", "Recharts"],
    role: "Product design, frontend system, Firebase integration, deployment",
    problem: [
      "Students and staff rely on fragmented channels for attendance, notes, notices, assignments, and schedules.",
      "The same event has different meaning for a student, teacher, coordinator, HOD, and administrator.",
    ],
    solution: [
      "CampusMate uses a shared information system with role-specific dashboards, actions, and visibility.",
      "QR attendance, notices, timetables, study material, assignments, and exam information stay connected to the same campus identity.",
    ],
    decisions: [
      "Design around role and urgency rather than exposing every module equally.",
      "Put today's timetable, attendance state, pending work, and notices before secondary tools.",
      "Use progressive-web-app behavior so the platform feels available on the devices students already carry.",
    ],
    engineering: [
      "React and Vite client with Firebase authentication and data services.",
      "Role-aware guards and dashboard composition.",
      "Responsive data visualizations and QR-driven attendance workflows.",
    ],
    lessons: [
      "Multi-role products become simpler when permissions and information hierarchy are designed together.",
      "Operational software benefits from calm prioritization more than feature density.",
    ],
  },
  {
    slug: "interactive-quiz",
    number: "04",
    name: "Interactive Quiz",
    category: "Focused experiment",
    type: "Browser learning experience",
    status: "Live",
    year: "2026",
    summary:
      "A compact web-design learning experience combining structured course notes, immediate quiz feedback, and a clear progression across six units.",
    statement: "Learn it. Test it. See what stayed.",
    media: "/images/projects/interactive-quiz-home.webp",
    liveUrl: "https://gyash28.github.io/WD_practical_no_20/",
    repoUrl: "https://github.com/GYASH28/WD_practical_no_20",
    embed: "live",
    accent: "#a574ff",
    proof: ["Six structured units", "Immediate scoring", "Responsive interface", "GitHub Pages"],
    stack: ["HTML", "CSS", "JavaScript"],
    role: "Information structure, interaction design, frontend implementation",
    problem: [
      "A course quiz can become a disconnected list of questions with little support before or after an attempt.",
      "The experience needed to stay small while still giving learners orientation, revision material, and useful feedback.",
    ],
    solution: [
      "The build connects unit-based notes with a focused quiz flow and report state.",
      "The interface keeps the primary actions obvious and uses immediate feedback to make each attempt useful.",
    ],
    decisions: [
      "Use the simplest browser stack that fully serves the experience.",
      "Keep navigation, notes, reporting, and the quiz available without turning the page into a dashboard.",
      "Prioritize legibility and keyboard-friendly controls across viewport sizes.",
    ],
    engineering: [
      "Framework-free HTML, CSS, and JavaScript.",
      "Client-side question state, scoring, feedback, and report behavior.",
      "Static deployment through GitHub Pages.",
    ],
    lessons: [
      "A focused interface can feel complete without a large framework or backend.",
      "Learning feedback works best when it explains the next step, not only the final score.",
    ],
  },
  {
    slug: "fakhri-mart",
    number: "C01",
    name: "Fakhri Mart",
    category: "Client work",
    type: "Retail catalogue and enquiry system",
    status: "Client build",
    year: "2026",
    client: true,
    summary:
      "A premium product-discovery website for a yarn and craft-material business, shaped around catalogue browsing and WhatsApp enquiries.",
    statement: "Modern retail without breaking the existing sales flow.",
    media: "/images/projects/fakhri-mart-home.webp",
    liveUrl: "https://fakhriyarns.vercel.app",
    repoUrl: "https://github.com/GYASH28/sample-website",
    embed: "protected",
    accent: "#d1aa62",
    proof: ["Catalogue filtering", "WhatsApp enquiries", "Prerendered output", "Accessibility QA"],
    stack: ["React 19", "React Router", "Vite 6", "Playwright"],
    role: "Client discovery, art direction, product design, frontend engineering, QA",
    problem: [
      "The business needed to present a broad, shade-sensitive catalogue without pretending every order fits a fixed-price checkout.",
      "Customers already complete the important parts of the sale through WhatsApp: current pricing, availability, shade, quantity, and wholesale requirements.",
    ],
    solution: [
      "The website acts as a high-quality discovery and enquiry layer, guiding customers from categories and products into a contextual WhatsApp conversation.",
      "Business information is centralized so the catalogue, contact details, and featured content can evolve without redesigning components.",
    ],
    decisions: [
      "Respect the client's existing sales behavior instead of forcing a conventional cart.",
      "Keep category and filter state visible on mobile so a large catalogue remains understandable.",
      "Use a warmer editorial visual language that reflects yarn, craft, and physical material rather than generic e-commerce styling.",
    ],
    engineering: [
      "React 19 and React Router application with centralized business content.",
      "Prerendered static production output, sitemap generation, and responsive image handling.",
      "Playwright checks for core journeys, motion lifecycle, accessibility, and viewport integrity.",
    ],
    lessons: [
      "Modernizing a traditional business works best when the digital layer strengthens familiar behavior.",
      "Product metadata should follow how buyers ask questions, not only how inventory is stored.",
    ],
  },
];
export const coreProjects = projects.filter((project) => !project.client);
export const clientProjects = projects.filter((project) => project.client);

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const services = [
  {
    number: "01",
    name: "Discover",
    title: "Find the useful opportunity.",
    copy: "Map the workflow, friction, data, users, and boundaries before selecting a model or tool.",
  },
  {
    number: "02",
    name: "Design",
    title: "Shape the system around real work.",
    copy: "Define the product flow, permission points, human decisions, and the smallest valuable release.",
  },
  {
    number: "03",
    name: "Build",
    title: "Implement the complete loop.",
    copy: "Create the interface, intelligence, integrations, data layer, tests, and deployment as one product.",
  },
  {
    number: "04",
    name: "Operate",
    title: "Make it usable after launch.",
    copy: "Document, monitor, hand over, and improve the system with feedback from the people using it.",
  },
];
