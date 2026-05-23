import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { 
  Atom, Code2, FileCode, Palette, Wind, Flame, Github, Rocket, Cloud, Workflow, 
  Sparkles, Brain, Layout, PlaySquare, Box, MonitorSmartphone, Terminal, Cpu, CpuIcon
} from "lucide-react";

const SKILL_GROUPS = [
  {
    title: "Frontend Engineering",
    icon: Code2,
    accent: "#00F5FF",
    skills: [
      { name: "React / Next.js", icon: Atom, level: 90 },
      { name: "JavaScript (ES6+)", icon: Terminal, level: 85 },
      { name: "HTML5 / CSS3", icon: FileCode, level: 95 },
      { name: "Tailwind CSS", icon: Wind, level: 90 },
    ]
  },
  {
    title: "AI Tools & Automation",
    icon: Brain,
    accent: "#8B5CFF",
    skills: [
      { name: "Prompt Engineering", icon: Brain, level: 92 },
      { name: "n8n Workflow Automation", icon: Workflow, level: 85 },
      { name: "AI Tools & LLM APIs", icon: Sparkles, level: 88 },
    ]
  },
  {
    title: "3D & Interactive Web",
    icon: Box,
    accent: "#7AE7FF",
    skills: [
      { name: "Spline 3D", icon: Box, level: 85 },
      { name: "Three.js Basics", icon: GlobeIcon, level: 60 },
      { name: "GSAP Animation", icon: PlaySquare, level: 80 },
    ]
  },
  {
    title: "UI/UX & Design",
    icon: Palette,
    accent: "#FF7AC4",
    skills: [
      { name: "UI Animation", icon: Layout, level: 90 },
      { name: "Responsive Layouts", icon: MonitorSmartphone, level: 95 },
    ]
  },
  {
    title: "Deployment & Backend",
    icon: Rocket,
    accent: "#FFCA66",
    skills: [
      { name: "GitHub Version Control", icon: Github, level: 85 },
      { name: "Vercel & Netlify Hosting", icon: Cloud, level: 90 },
      { name: "Firebase Backend Services", icon: Flame, level: 75 },
    ]
  }
];

// Helper to cover missing GlobeIcon
function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export const Skills = () => {
  return (
    <section id="skills" data-testid="skills-section" className="relative section-pad bg-[#070A10] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[10%] right-[-10%] w-[450px] h-[450px] bg-[#00F5FF]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] bg-[#8B5CFF]/3 rounded-full blur-[110px] pointer-events-none" />

      <div className="container-pad">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#00F5FF]" />
              <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-[#00F5FF]">Toolkit</span>
              <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#00F5FF]" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              The tech I use to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#8B5CFF]">build.</span>
            </h2>
            <p className="mt-4 text-white/55 text-base sm:text-lg max-w-2xl font-light">
              Interactive systems, rapid integrations, and premium visual components.
            </p>
          </div>
        </Reveal>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" data-testid="skills-grid">
          {SKILL_GROUPS.map((group, groupIdx) => {
            const GroupIcon = group.icon;
            
            // Variants for scanning line sweep triggered by parent hover
            const scannerVariants = {
              initial: { top: "-5%", opacity: 0 },
              hover: { 
                top: ["-5%", "105%"], 
                opacity: [0, 1, 1, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "linear",
                  times: [0, 0.08, 0.92, 1]
                } 
              }
            };

            return (
              <Reveal key={group.title} delay={groupIdx * 0.06} className={groupIdx === 3 || groupIdx === 4 ? "lg:col-span-1 md:col-span-2 lg:md:col-span-1" : ""}>
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{
                    initial: { y: 0, scale: 1 },
                    hover: { y: -6, scale: 1.015 }
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="group relative h-full rounded-3xl p-6 sm:p-8 bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.12] transition-colors duration-500 overflow-hidden flex flex-col justify-between"
                  style={{
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)",
                  }}
                >
                  {/* Infinite hardware-accelerated scanning line sweep on hover */}
                  <motion.div
                    variants={scannerVariants}
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF]/35 to-transparent pointer-events-none z-20"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${group.accent}50, transparent)`
                    }}
                  />

                  {/* Cybernetic HUD Corner Brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none" />

                  {/* Subtle Border Glow on Hover */}
                  <div 
                    className="absolute inset-0 border border-transparent group-hover:border-white/[0.08] rounded-3xl transition-colors duration-700 pointer-events-none"
                    style={{
                      borderColor: `${group.accent}15`
                    }}
                  />

                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                      <span 
                        className="inline-flex w-10 h-10 items-center justify-center rounded-xl border border-white/5 group-hover:scale-105 transition-transform"
                        style={{ color: group.accent, background: `${group.accent}08` }}
                      >
                        <GroupIcon size={20} className="group-hover:animate-pulse" />
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00F5FF] transition-all">
                        {group.title}
                      </h3>
                    </div>

                    {/* Skill Bars */}
                    <div className="space-y-6">
                      {group.skills.map((skill, skillIdx) => {
                        const SkillIcon = skill.icon;
                        
                        // Calculate filled ticks (out of 10)
                        const ticksCount = 12;
                        const filledTicks = Math.round((skill.level / 100) * ticksCount);

                        return (
                          <div key={skill.name} className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                              <div className="flex items-center gap-2 text-white/70">
                                <SkillIcon size={14} className="opacity-80 shrink-0" style={{ color: group.accent }} />
                                <span>{skill.name}</span>
                              </div>
                              <span className="font-mono text-white/40">{skill.level}%</span>
                            </div>
                            
                            {/* Segmented Retro-Futuristic Digital Tick Indicator */}
                            <div className="flex gap-1.5 mt-1 select-none">
                              {Array.from({ length: ticksCount }).map((_, stepIdx) => {
                                const isFilled = stepIdx < filledTicks;
                                return (
                                  <motion.div 
                                    key={stepIdx} 
                                    initial={{ opacity: 0.1, scaleX: 0.8 }}
                                    whileInView={{ opacity: isFilled ? 0.95 : 0.12, scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: skillIdx * 0.08 + stepIdx * 0.03, ease: "easeOut" }}
                                    className="h-2 w-full rounded-[1px] transition-all"
                                    style={{
                                      backgroundColor: isFilled ? group.accent : "rgba(255,255,255,0.06)",
                                      boxShadow: isFilled ? `0 0 8px ${group.accent}70, inset 0 1px 0 rgba(255,255,255,0.1)` : "none"
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Corner Accent Detail */}
                  <div className="absolute bottom-2 right-4 font-mono text-[8px] text-white/10 uppercase tracking-widest pointer-events-none select-none">
                    SYS_LOAD // LEVEL_ACTIVE
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
