import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles, Brain, Layout } from "lucide-react";
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
    primary: true,
    icon: Sparkles,
    accent: "#7AE7FF",
    description:
      "An AI-powered learning and quiz platform for students with official quizzes, AI hints, and exam-focused support.",
    long:
      "Lernio AI helps students prepare smarter — official quizzes, AI hints that explain instead of giving direct answers, subject-wise exam prep, AI chatbot support, and a clean, mobile-friendly experience built for real semester exams.",
    tags: ["React", "Firebase", "AI", "Vercel", "Quiz Platform", "Education Tech"],
    href: "https://lernioai.vercel.app",
    sectionId: "lernio",
  },
  {
    id: "hint",
    name: "AI Quiz Hint Generator",
    icon: Brain,
    accent: "#C4A8FF",
    description:
      "A smart AI system that helps students understand quiz questions by giving hints instead of direct answers.",
    long:
      "Built using Gemini + n8n + custom prompt engineering. Designed for educational fairness — nudges learners toward understanding without spoon-feeding answers. Runs as a webhook-triggered automation pipeline.",
    tags: ["AI", "Gemini", "n8n", "Automation", "Education"],
    href: "#",
  },
  {
    id: "portfolio",
    name: "Personal Portfolio",
    icon: Layout,
    accent: "#9AFFD9",
    description:
      "A cinematic portfolio with advanced animations, image-sequence hero transition, 3D objects, and interactive showcase.",
    long:
      "This very site — a 32-frame WebP cinematic intro, GSAP/Framer-motion micro-interactions, R3F 3D background scene, and an embedded live Lernio AI showcase. Built with performance and storytelling in mind.",
    tags: ["React", "Three.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    href: "#home",
  },
];

export const Projects = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="projects" data-testid="projects-section" className="relative section-pad">
      <div className="container-pad">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-10 bg-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.7)]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">Featured Projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Things I&apos;ve built.
              </h2>
              <p className="mt-3 max-w-xl text-white/60">
                Projects that ship. Each one solves a real problem or pushes a creative idea forward.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06} className={p.primary ? "md:col-span-12 lg:col-span-8" : "md:col-span-6 lg:col-span-4"}>
              <ProjectCard project={p} onOpen={() => setOpen(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent
          className="glass-strong border-white/10 text-white max-w-xl"
          data-testid="project-detail-dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">{open?.name}</DialogTitle>
            <DialogDescription className="text-white/65">{open?.long}</DialogDescription>
          </DialogHeader>
          {open && (
            <div className="flex flex-wrap gap-2 mt-3">
              {open.tags.map(t => (
                <span key={t} className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.05] border border-white/10 text-white/75">{t}</span>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {open?.href && open.href !== "#" && !open.sectionId && (
              <a
                href={open.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-white text-black font-medium"
              >
                Visit live <ExternalLink size={14} />
              </a>
            )}
            {open?.sectionId && (
              <a
                href={`#${open.sectionId}`}
                onClick={() => setOpen(null)}
                className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-white text-black font-medium"
              >
                Open showcase <ArrowUpRight size={14} />
              </a>
            )}
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
    el.style.transform = `perspective(1100px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateX(0) rotateY(0)";
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-testid={project.id === "lernio" ? "project-lernio-card" : "project-card"}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="tilt-card group relative h-full rounded-3xl overflow-hidden glass border border-white/[0.08] hover:border-white/[0.16] hover:shadow-[var(--shadow-glass),var(--shadow-neon-blue)] transition-colors transition-shadow"
      style={{
        backgroundImage:
          "radial-gradient(220px circle at var(--gx, 80%) var(--gy, 30%), rgba(0,245,255,0.10), transparent 60%)",
      }}
    >
      {/* Top */}
      <div className="p-5 sm:p-6 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex w-10 h-10 items-center justify-center rounded-xl border border-white/10"
            style={{ color: project.accent, background: `${project.accent}14`, boxShadow: `0 0 24px ${project.accent}22` }}
          >
            <Icon size={18} />
          </span>
          <div>
            <div className="text-base sm:text-lg font-semibold text-white tracking-tight">{project.name}</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-white/45">PROJECT · {project.id}</div>
          </div>
        </div>
        <ArrowUpRight
          size={18}
          className="text-white/55 group-hover:text-white transition-colors"
        />
      </div>

      {/* Body */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <p className="text-sm sm:text-base text-white/70 leading-relaxed">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 6).map((t) => (
            <span
              key={t}
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/65"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={onOpen}
            data-testid="project-card-open-button"
            className="text-sm font-medium text-[#7AE7FF] hover:text-[#00F5FF] transition-colors"
          >
            View details →
          </button>
          {project.href && project.href !== "#" && !project.sectionId && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition-colors"
            >
              Live <ExternalLink size={12} />
            </a>
          )}
          {project.sectionId && (
            <a
              href={`#${project.sectionId}`}
              className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition-colors"
            >
              Live demo <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
