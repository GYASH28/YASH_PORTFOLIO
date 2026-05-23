import {
  Brain,
  Code2,
  Lightbulb,
  Palette,
  Rocket,
  Sparkles,
  Terminal,
  Workflow,
  MonitorSmartphone,
  Cloud,
  GitBranch,
  Flame,
  PenTool,
  Bot,
  Hammer,
  Zap,
  Globe,
  Film,
  Box,
  BrainCircuit,
  Pen
} from "lucide-react";

export const hero = {
  name: "Yash Ganesh",
  label: "// YASH GANESH - BUILD ROOM",
  role: "AI Product Builder | Expert Vibe Coder | Creative Frontend Developer",
  headline: ["I BUILD", "THINGS", "THAT", "WORK."],
  tagline: "Building products that feel alive - Lernio AI, CampusMate, AI workflows, and cinematic frontend systems.",
  productUrl: "https://lernioai.vercel.app/",
  stats: [
    { number: 2, label: "Live Products" },
    { number: 22, label: "Skills Mastered" },
    { number: 5, label: "Tech Stacks" },
  ],
};

export const about = {
  portrait: "/assets/profile-final.webp",
  quote: "Curiosity built the skill. Skill built the product. The product speaks.",
  overview:
    "AI-focused creative builder who uses prompt engineering, UI judgment, AI assistants, debugging, deployment, and marketing instincts to ship working digital products fast.",
  identities: [
    { label: "AI Builder", text: "Turns practical student and workflow problems into AI-powered web products.", icon: Brain },
    { label: "Creative Technologist", text: "Uses motion, 3D, and story to make digital products feel memorable.", icon: Sparkles },
    { label: "Frontend Developer", text: "Builds responsive, fast, polished interfaces with React-based workflows.", icon: Code2 },
    { label: "Product Thinker", text: "Designs for clarity, fast iteration, and shipped outcomes.", icon: Lightbulb },
  ],
};

export const marqueeRows = [
  ["React", "Three.js", "GSAP", "Framer Motion", "Tailwind CSS", "Firebase", "Vercel"],
  ["Gemini AI", "n8n", "Prompt Engineering", "WebGL", "React Three Fiber", "Drei", "Canva"],
];

export const skillGroups = [
  {
    title: "Frontend Core",
    label: "Interface signal",
    icon: Globe,
    accent: "#00FF88",
    className: "lg:col-span-4",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Responsive UI"],
  },
  {
    title: "Motion",
    label: "Timeline engine",
    icon: Film,
    accent: "#4F8EF7",
    className: "lg:col-span-4",
    skills: ["GSAP", "ScrollTrigger", "Framer Motion", "Micro-interactions"],
  },
  {
    title: "3D Web",
    label: "Depth layer",
    icon: Box,
    accent: "#9B7FFF",
    className: "lg:col-span-4",
    skills: ["Three.js", "React Three Fiber", "Drei", "WebGL Basics", "Spline"],
  },
  {
    title: "AI Builder Core",
    label: "Prompt pipeline",
    icon: BrainCircuit,
    accent: "#00FF88",
    className: "lg:col-span-3",
    skills: ["ChatGPT", "Gemini AI", "Prompt Engineering", "AI Assistants", "Debugging"],
  },
  {
    title: "Launch",
    label: "Ship system",
    icon: Rocket,
    accent: "#4F8EF7",
    className: "lg:col-span-6",
    skills: ["GitHub", "Vercel", "Netlify", "Firebase", "Testing", "Fast Iteration"],
  },
  {
    title: "Creative + Marketing",
    label: "Brand layer",
    icon: Pen,
    accent: "#9B7FFF",
    className: "lg:col-span-3",
    skills: ["Canva", "Branding", "Meta Ads", "Google Ads", "Content Strategy"],
  },
];

export const projects = [
  {
    id: "lernio",
    name: "Lernio AI",
    featured: true,
    type: "AI Learning Platform",
    accent: "#00FF88",
    tagline: "Study smarter, not harder.",
    description:
      "AI-powered educational platform with quizzes, smart hints, chatbot integrations, Firebase backend, Gemini workflows, and exam-focused student learning features.",
    url: "https://lernioai.vercel.app/",
    repo: "https://github.com/GYASH28/LERNIOAI",
    tech: ["React", "Firebase", "Gemini AI", "Tailwind", "Vercel"],
    metrics: ["AI Quizzes", "Smart Hints", "Viva Prep"],
  },
  {
    id: "campusmate",
    name: "CampusMate",
    featured: false,
    type: "Campus Platform",
    accent: "#4F8EF7",
    tagline: "One workspace for the whole campus.",
    description:
      "Role-based institutional platform concept for attendance, notices, role management, coordinator, teacher, student, and college operations flows.",
    url: "https://campuscwit.vercel.app/",
    repo: "https://github.com/GYASH28/CAMPUSMATE",
    tech: ["React", "Firebase", "Framer Motion", "PWA"],
    metrics: ["Attendance", "Timetable", "Analytics"],
  },
  {
    id: "hint-gen",
    name: "AI Hint Generator",
    featured: false,
    type: "AI Workflow",
    accent: "#9B7FFF",
    tagline: "Guide, do not give away.",
    description:
      "AI chatbot and automation workflow using Gemini AI, n8n, webhook logic, prompt engineering, testing, and iterative improvement for real user problems.",
    url: "",
    repo: "",
    tech: ["Gemini", "n8n", "Prompt Engineering"],
    metrics: ["Smart Hints", "Fair Learning"],
  },
  {
    id: "portfolio",
    name: "This Portfolio",
    featured: false,
    type: "3D Build Room",
    accent: "#EEF2FF",
    tagline: "The medium is the message.",
    description:
      "A cinematic developer portfolio rebuilt as a living creative lab with procedural 3D, horizontal project movement, and static secure contact flows.",
    url: "https://bracingyash.vercel.app/",
    repo: "https://github.com/GYASH28/YASH_PORTFOLIO",
    tech: ["React", "Three.js", "GSAP", "Framer Motion"],
    metrics: ["Story", "3D", "Motion"],
  },
];

export const journey = [
  {
    step: "01",
    chapter: "CURIOSITY",
    title: "Started with web fundamentals",
    detail: "HTML, CSS, and JavaScript became the foundation for building real things.",
    icon: Lightbulb
  },
  {
    step: "02",
    chapter: "CRAFT",
    title: "Moved into modern frontend",
    detail: "React, Tailwind, and animation turned ideas into real interfaces.",
    icon: Hammer
  },
  {
    step: "03",
    chapter: "AI TOOLS",
    title: "Built AI-powered workflows",
    detail: "Gemini, n8n, and prompt engineering made ideas into AI workflows.",
    icon: Brain
  },
  {
    step: "04",
    chapter: "LAUNCH",
    title: "Shipped real products",
    detail: "Lernio AI and CampusMate shipped as real, usable products.",
    icon: Rocket
  },
  {
    step: "05",
    chapter: "NOW",
    title: "Building cinematic AI interfaces",
    detail: "Premium frontend, native 3D, and AI-powered web experiences.",
    icon: Zap
  },
];

export const contact = {
  email: "yash.k.ganesh@gmail.com",
  location: "Pune, India",
  github: "https://github.com/GYASH28",
  portfolio: "https://bracingyash.vercel.app/",
};

export const techLogoIcons = [
  { name: "React", icon: Code2 },
  { name: "Three.js", icon: Terminal },
  { name: "GSAP", icon: Sparkles },
  { name: "Firebase", icon: Flame },
  { name: "Vercel", icon: Cloud },
  { name: "GitHub", icon: GitBranch },
  { name: "n8n", icon: Workflow },
  { name: "Canva", icon: PenTool },
];
