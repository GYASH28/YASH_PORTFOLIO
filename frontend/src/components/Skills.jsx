import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FileCode,
  Palette,
  Atom,
  Wind,
  Flame,
  Rocket,
  Github,
  Cpu,
  Sparkles,
  Brain,
  Workflow,
  HardDrive,
  Layout,
  Code2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const SKILLS = [
  { name: "HTML", icon: FileCode, accent: "#FF7A45", desc: "Semantic markup, a11y, structure" },
  { name: "CSS", icon: Palette, accent: "#7AE7FF", desc: "Modern layouts, animations, glass UI" },
  { name: "JavaScript", icon: Code2, accent: "#FFD75A", desc: "ES2022+, DOM, async, APIs" },
  { name: "React", icon: Atom, accent: "#7AE7FF", desc: "Hooks, context, component patterns" },
  { name: "Tailwind CSS", icon: Wind, accent: "#22D3EE", desc: "Utility-first design system speed" },
  { name: "Firebase", icon: Flame, accent: "#FFCA66", desc: "Auth, Firestore, hosting, rules" },
  { name: "Vercel", icon: Rocket, accent: "#FFFFFF", desc: "Edge deploys, previews, DX" },
  { name: "GitHub", icon: Github, accent: "#FFFFFF", desc: "Versioning, PRs, automation" },
  { name: "C Programming", icon: Cpu, accent: "#9AB1FF", desc: "Systems thinking, pointers, memory" },
  { name: "AI Tools", icon: Sparkles, accent: "#7AE7FF", desc: "GPT, Gemini, Claude workflows" },
  { name: "Prompt Engineering", icon: Brain, accent: "#C4A8FF", desc: "Crafting reliable AI outputs" },
  { name: "n8n Automation", icon: Workflow, accent: "#FF7AC4", desc: "Visual workflow automations" },
  { name: "Google Drive API", icon: HardDrive, accent: "#7AE7FF", desc: "Doc/sheet/storage integrations" },
  { name: "UI / UX Design", icon: Layout, accent: "#9AFFD9", desc: "Premium product sensibility" },
];

export const Skills = () => {
  return (
    <section id="skills" data-testid="skills-section" className="relative section-pad">
      <div className="container-pad">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-10 bg-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.7)]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">Skills</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                The toolkit I ship with.
              </h2>
              <p className="mt-3 max-w-xl text-white/60">
                Modern stacks, AI workflows, and design fundamentals — used in production projects, not just
                tutorials.
              </p>
            </div>
            <div className="hidden md:block font-mono text-[11px] text-white/40 tracking-widest uppercase">
              {SKILLS.length} · capabilities
            </div>
          </div>
        </Reveal>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4"
          data-testid="skills-grid"
        >
          {SKILLS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.03} y={14}>
              <SkillCard skill={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill }) => {
  const ref = useRef(null);
  const Icon = skill.icon;

  const onMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-y * 8).toFixed(2);
    const ry = (x * 10).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-testid="skill-card"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="tilt-card relative aspect-[5/6] sm:aspect-[6/7] lg:aspect-[5/6] rounded-2xl glass border border-white/[0.08] overflow-hidden p-4 flex flex-col items-start justify-between cursor-default"
      style={{
        backgroundImage:
          "radial-gradient(160px circle at var(--gx, 50%) var(--gy, 50%), rgba(0,245,255,0.08), transparent 70%)",
      }}
    >
      {/* Icon block */}
      <div
        className="inline-flex w-10 h-10 items-center justify-center rounded-xl border border-white/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          color: skill.accent,
          boxShadow: `0 0 24px ${skill.accent}22`,
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <div className="text-sm font-semibold text-white tracking-tight">{skill.name}</div>
        <div className="text-[11px] text-white/55 mt-0.5 leading-snug">{skill.desc}</div>
      </div>
      {/* corner accent */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-30"
        style={{ background: `radial-gradient(circle, ${skill.accent}33, transparent 70%)` }}
      />
    </motion.div>
  );
};
