import { Brain, Code, Database, MagicWand, Robot, Sparkle, Strategy } from "@phosphor-icons/react";

export const PROJECTS = [
  { n:"01", name:"Lernio AI", type:"AI learning operating system", status:"Live", accent:"lime", media:"/assets/lernio-screenshot.jpg", icon:Brain,
    summary:"A complete learning environment where AI supports lessons, notes, tutoring, quizzes, revision and planning—not merely a chat box.",
    detail:"Built for diploma engineering students, Lernio connects structured learning material with an AI tutor, practice systems, progress signals and a practical student workflow.",
    proof:["44 subjects","241 lessons","AI tutor","Live product"], stack:["Next.js","React","PostgreSQL","Groq"], live:"https://lernioai.vercel.app", repo:"https://github.com/GYASH28/LERNIOAI", nodes:["LESSONS","TUTOR","QUIZZES","PLANNER","REVISION"] },
  { n:"02", name:"B.R.A.C.E", type:"Permissioned desktop AI companion", status:"Active R&D", accent:"violet", icon:Robot,
    summary:"A Jarvis-inspired desktop assistant designed around voice, memory, useful tools and visible user control.",
    detail:"B.R.A.C.E routes between fast and reasoning models, keeps persistent context, exposes tool activity and places approval gates around file, terminal and browser actions.",
    proof:["Local-first","Voice states","Tool approvals","Memory"], stack:["Electron","React","TypeScript","Node.js"], repo:"https://github.com/GYASH28/brace_new", nodes:["VOICE","TOOLS","MEMORY","AGENT","APPROVALS"] },
  { n:"03", name:"CampusMate", type:"Multi-role campus platform", status:"Live", accent:"cyan", icon:Database,
    summary:"A role-aware operations layer for students, teachers, coordinators, HODs and administrators.",
    detail:"Attendance, notices, timetables, assignments, notes, exams, QR workflows and analytics are organised around the actual responsibilities of every campus role.",
    proof:["5 user roles","QR attendance","PWA","Live deployment"], stack:["React","Vite","Firebase","Recharts"], live:"https://campuscwit.vercel.app", repo:"https://github.com/GYASH28/CAMPUSMATE", nodes:["STUDENTS","STAFF","QR","NOTICES","ANALYTICS"] },
  { n:"04", name:"Fakhri Yarns", type:"Wholesale catalogue & enquiry system", status:"Client build", accent:"orange", icon:MagicWand,
    summary:"A premium digital storefront helping a traditional wholesale business present products and convert interest into enquiries.",
    detail:"The client experience combines a cinematic opening, product discovery, catalogue storytelling, mobile-first interaction and direct WhatsApp enquiry flows.",
    proof:["Client project","Product discovery","WhatsApp flow","Motion-led UI"], stack:["React","Vite","GSAP","Vercel"], repo:"https://github.com/GYASH28/sample-website", nodes:["YARNS","CATALOGUE","ENQUIRY","MOTION","MOBILE"] },
  { n:"05", name:"AI Second Brain", type:"Personal knowledge operating system", status:"In development", accent:"pink", icon:Brain,
    summary:"A desktop knowledge environment that turns files, notes and connected ideas into agent-accessible working memory.",
    detail:"Designed as an Obsidian-like application with graph navigation, semantic retrieval, local files and controlled access from coding agents.",
    proof:["Desktop app","Knowledge graph","Agent access","Local files"], stack:["Electron","React","Local storage","AI retrieval"], nodes:["FILES","MEMORY","GRAPH","AGENTS","SEARCH"] },
  { n:"06", name:"Cinematic Portfolio", type:"Motion-led personal experience", status:"Public build", accent:"blue", icon:Sparkle,
    summary:"A visual experiment combining personal storytelling, scroll choreography and frontend engineering.",
    detail:"A portfolio designed as an interactive narrative rather than a template, with motion systems, tactile controls and responsive scene changes.",
    proof:["Scroll narrative","Motion system","Interactive scenes","Responsive"], stack:["React","GSAP","Three.js","Vercel"], repo:"https://github.com/GYASH28/YASH_PORTFOLIO", nodes:["MOTION","3D","SCROLL","STORY","FRONTEND"] },
];

export const SERVICES = [
  { id:"operations", label:"Operations", icon:Strategy, title:"Remove repetitive work without breaking the workflow.", text:"I map the current process, find expensive friction and build a focused automation layer around tools your team already uses.", chips:["Workflow audit","Automation map","Internal dashboard","Approval points"] },
  { id:"knowledge", label:"Knowledge", icon:Brain, title:"Turn scattered company information into usable answers.", text:"I design searchable knowledge systems that help teams find, understand and act on internal information with source visibility.", chips:["Knowledge architecture","Semantic search","AI assistant","Source citations"] },
  { id:"customer", label:"Customer", icon:Robot, title:"Build faster customer journeys that still feel human.", text:"From lead capture to support, I create AI-assisted experiences that respond quickly and hand off cleanly to a person.", chips:["Lead flow","Support copilot","WhatsApp integration","Human handoff"] },
  { id:"product", label:"Product", icon:Code, title:"Move an AI idea from slide deck to working pilot.", text:"I combine product thinking, interface design and rapid engineering to ship a contained pilot your team can test with real users.", chips:["Product scope","Interactive prototype","AI integration","Deployment"] },
];

export const PROCESS = [
  ["01","Find the leverage","Locate one workflow where AI can create a clear improvement instead of adding novelty."],
  ["02","Design the system","Define users, permissions, data, handoffs and success before the build expands."],
  ["03","Ship the useful core","Prototype the smallest version that can survive real work, then connect only what it needs."],
  ["04","Test the weak points","Use real scenarios to strengthen the interface, automation and human handoff."],
  ["05","Deploy and transfer","Launch with documentation, ownership and a visible path for improvement."],
];
