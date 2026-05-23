import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles, Brain, Layout, Play, Code, Cpu } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PROJECTS = [
  {
    id: "lernio",
    name: "Lernio AI",
    featured: true,
    icon: Sparkles,
    accent: "#00F5FF",
    description: "An AI-powered student learning platform for quizzes, notes, viva/oral preparation, and exam practice.",
    long: "Lernio AI is a comprehensive learning platform designed for students. It features specialized preparation for BEEE and PIC programming, AI-driven hints that explain concepts instead of just giving answers, comprehensive notes, and a dedicated exam practice mode to help students succeed.",
    tags: ["React", "Firebase", "AI Tutor", "Vercel", "Tailwind CSS"],
    href: "https://lernioai.vercel.app",
    sectionId: "lernio",
  },
  {
    id: "hint",
    name: "AI Quiz Hint Generator",
    featured: false,
    icon: Brain,
    accent: "#8B5CFF",
    description: "A smart AI system that helps students understand quiz questions by giving hints instead of direct answers.",
    long: "Built using Gemini + n8n + custom prompt engineering. Designed for educational fairness — nudges learners toward understanding without spoon-feeding answers. Runs as a webhook-triggered automation pipeline.",
    tags: ["Gemini AI", "n8n", "Prompt Engineering"],
    href: "#",
  },
  {
    id: "portfolio",
    name: "Cinematic Portfolio",
    featured: false,
    icon: Layout,
    accent: "#2D7CFF",
    description: "A futuristic developer portfolio with advanced 3D animations, GSAP scroll sequences, and interactive showcases.",
    long: "This very site — featuring React Three Fiber for 3D elements, GSAP for cinematic scroll sequences, and premium glassmorphism styling built entirely with Tailwind CSS and Framer Motion.",
    tags: ["React", "Three.js", "GSAP", "Framer Motion"],
    href: "#home",
  },
];

export const Projects = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="projects" data-testid="projects-section" className="relative section-pad bg-[#0A0F1A]">
      <div className="container-pad">
        <Reveal>
          <div className="flex flex-col mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-12 bg-gradient-to-r from-[#00F5FF] to-transparent" />
              <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-[#00F5FF]">Selected Work</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#2D7CFF]">Projects.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className={p.featured ? "lg:col-span-12" : "lg:col-span-6"}>
              <ProjectCard project={p} onOpen={() => setOpen(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="glass-strong border border-white/10 text-white max-w-2xl p-0 overflow-hidden bg-[#05060A]/95 backdrop-blur-xl">
          <div className="h-32 w-full bg-gradient-to-br from-[#00F5FF]/20 to-[#8B5CFF]/10 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjwvc3ZnPg==')] opacity-30" />
            <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-[#0A0F1A] border border-white/20 flex items-center justify-center shadow-xl">
              {open && <open.icon size={28} style={{ color: open.accent }} />}
            </div>
          </div>
          
          <div className="p-8 pt-12">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white mb-2">{open?.name}</DialogTitle>
              <DialogDescription className="text-white/70 text-base leading-relaxed">
                {open?.long}
              </DialogDescription>
            </DialogHeader>
            
            {open && (
              <div className="flex flex-wrap gap-2 mt-6">
                {open.tags.map(t => (
                  <span key={t} className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-[#7AE7FF]">
                    {t}
                  </span>
                ))}
              </div>
            )}
            
            <div className="mt-8 flex flex-wrap gap-4">
              {open?.href && open.href !== "#" && !open.sectionId && (
                <a
                  href={open.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-[#00F5FF] text-black font-semibold hover:bg-[#7AE7FF] hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all"
                >
                  Launch Project <ExternalLink size={16} />
                </a>
              )}
              {open?.sectionId && (
                <a
                  href={`#${open.sectionId}`}
                  onClick={() => setOpen(null)}
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-[#00F5FF] text-black font-semibold hover:bg-[#7AE7FF] hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all"
                >
                  View Live Demo <Play size={16} fill="currentColor" />
                </a>
              )}
              <button 
                onClick={() => setOpen(null)}
                className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
const ProjectCard = ({ project, onOpen }) => {
  const ref = useRef(null);
  const Icon = project.icon;
  
  const onMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
    el.style.setProperty("--gx", `${(e.clientX - rect.left)}px`);
    el.style.setProperty("--gy", `${(e.clientY - rect.top)}px`);
  };
  
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  // Variants for scanning line sweep triggered by parent hover
  const scannerVariants = {
    initial: { top: "-5%", opacity: 0 },
    hover: { 
      top: ["-5%", "105%"], 
      opacity: [0, 1, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 2.8,
        ease: "linear",
        times: [0, 0.08, 0.92, 1]
      } 
    }
  };

  const getMetaLog = (id) => {
    switch (id) {
      case "lernio": return "PORTAL: ONLINE // DB: SECURE";
      case "hint": return "WEBHOOK: STANDBY // PIPE: ACTIVE";
      case "portfolio": return "FRAME_SYNC: OK // CANVAS: READY";
      default: return "SYS_INFO: OK // STATUS: LOGGED";
    }
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.015 }
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={`group relative h-full rounded-[2rem] overflow-hidden bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.12] transition-colors duration-500 cursor-default ${project.featured ? 'p-1.5' : ''}`}
      style={{
        boxShadow: "0 15px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      {/* Infinite hardware-accelerated scanning line sweep on hover */}
      <motion.div
        variants={scannerVariants}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF]/35 to-transparent pointer-events-none z-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}50, transparent)`
        }}
      />

      {/* Cybernetic HUD Corner Brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none z-20" />

      {/* Dynamic Cursor-following Gradient Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(400px circle at var(--gx, 50%) var(--gy, 50%), ${project.accent}15, transparent 65%)`,
        }}
      />

      <div className={`relative h-full z-10 flex ${project.featured ? 'flex-col md:flex-row bg-[#05060A] rounded-[1.8rem] overflow-hidden' : 'flex-col p-6 sm:p-8'}`}>
        
        {/* Featured Project Image Cover Area */}
        {project.featured && (
          <div className="w-full md:w-1/2 relative bg-gradient-to-br from-[#00F5FF]/15 via-[#2D7CFF]/5 to-transparent flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/[0.06] overflow-hidden shrink-0 min-h-[300px]">
             {/* Tech Grid Patterns */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA2KSIvPjwvc3ZnPg==')] opacity-40" />
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#00F5FF] blur-[110px] opacity-15 rounded-full" />
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#8B5CFF] blur-[110px] opacity-15 rounded-full" />
             
             <div className="relative z-10 w-full max-w-[240px] aspect-[9/16] rounded-[2rem] border-4 border-[#1A1F2C] bg-[#0A0F1A] shadow-2xl flex items-center justify-center overflow-hidden transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
                {/* Device top Notch */}
                <div className="absolute top-0 w-full h-5 bg-[#1A1F2C] flex items-center justify-center z-20">
                  <div className="w-12 h-1 rounded-full bg-white/25" />
                </div>
                {/* Project Screenshot Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A] to-[#121829] flex flex-col items-center justify-center p-4">
                  <span className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00F5FF] mb-3">
                    <Icon size={24} />
                  </span>
                  <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">Lernio AI Live</span>
                  <span className="text-[8px] text-[#00F5FF]/60 font-mono tracking-wider mt-1 uppercase">active_portal</span>
                </div>
                {/* Subtle shine on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00F5FF]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-15" />
             </div>
          </div>
        )}

        {/* Content Details Block */}
        <div className={`flex flex-col justify-between ${project.featured ? 'w-full md:w-1/2 p-6 sm:p-8 lg:p-10' : 'h-full'}`}>
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <Icon size={22} style={{ color: project.accent }} />
                </span>
                {project.featured && (
                  <span className="px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase rounded-full border border-[#00F5FF]/20 text-[#00F5FF] bg-[#00F5FF]/5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" /> Production Ready
                  </span>
                )}
              </div>
              <ArrowUpRight size={20} className="text-white/20 group-hover:text-white transition-colors duration-300" />
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#7AE7FF] transition-all">
              {project.name}
            </h3>
            
            <p className={`${project.featured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white/60 leading-relaxed font-light mb-6`}>
              {project.description}
            </p>
          </div>

          <div>
            {/* Tag Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((t) => (
                <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.05] text-white/50 group-hover:border-[#00F5FF]/10 transition-colors">
                  {t}
                </span>
              ))}
            </div>

            {/* Launch Action */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={onOpen}
                className={`inline-flex items-center justify-center h-12 rounded-xl font-medium tracking-wide transition-all ${project.featured ? 'bg-[#00F5FF] hover:bg-[#7AE7FF] text-black px-8 hover:shadow-[0_0_25px_rgba(0,245,255,0.35)] hover:scale-[1.02]' : 'bg-white/5 text-white px-6 hover:bg-white/10 border border-white/10 hover:border-white/25'}`}
              >
                View Project Details
              </button>
              
              <span className="hidden sm:inline font-mono text-[8px] text-white/20 tracking-wider select-none">
                {getMetaLog(project.id)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </motion.article>
  );
};
