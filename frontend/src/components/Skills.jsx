import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { 
  Atom, Code2, FileCode, Palette, Wind, Flame, Github, Rocket, Cloud, Workflow, 
  Sparkles, Brain, Layout, PlaySquare, Box, MonitorSmartphone 
} from "lucide-react";

const SKILLS = [
  { name: "React", icon: Atom, accent: "#00F5FF" },
  { name: "JavaScript", icon: Code2, accent: "#FFD75A" },
  { name: "HTML", icon: FileCode, accent: "#FF7A45" },
  { name: "CSS", icon: Palette, accent: "#2D7CFF" },
  { name: "Tailwind CSS", icon: Wind, accent: "#00F5FF" },
  { name: "Firebase", icon: Flame, accent: "#FFCA66" },
  { name: "GitHub", icon: Github, accent: "#FFFFFF" },
  { name: "Vercel", icon: Rocket, accent: "#FFFFFF" },
  { name: "Netlify", icon: Cloud, accent: "#2DF2FF" },
  { name: "n8n", icon: Workflow, accent: "#FF7AC4" },
  { name: "AI Tools", icon: Sparkles, accent: "#8B5CFF" },
  { name: "Prompt Engineering", icon: Brain, accent: "#C4A8FF" },
  { name: "UI Animation", icon: Layout, accent: "#7AE7FF" },
  { name: "GSAP", icon: PlaySquare, accent: "#88CE02" },
  { name: "Three.js basics", icon: Box, accent: "#FFFFFF" },
  { name: "Responsive Design", icon: MonitorSmartphone, accent: "#9AFFD9" },
];

export const Skills = () => {
  return (
    <section id="skills" data-testid="skills-section" className="relative section-pad bg-[#070A10]">
      <div className="container-pad">
        <Reveal>
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#00F5FF]" />
              <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-[#00F5FF]">Toolkit</span>
              <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#00F5FF]" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              The tech I use to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#8B5CFF]">build.</span>
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto" data-testid="skills-grid">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <Reveal key={skill.name} delay={i * 0.04} y={20}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group relative flex items-center gap-3 px-5 py-3 rounded-full glass border border-white/[0.08] hover:border-white/[0.2] transition-colors cursor-default overflow-hidden"
                  style={{
                    boxShadow: `0 4px 20px rgba(0,0,0,0.5)`
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                    style={{ background: `linear-gradient(90deg, transparent, ${skill.accent}, transparent)` }} 
                  />
                  <Icon size={18} style={{ color: skill.accent }} className="relative z-10 group-hover:animate-pulse" />
                  <span className="text-sm font-medium text-white/90 relative z-10">{skill.name}</span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
