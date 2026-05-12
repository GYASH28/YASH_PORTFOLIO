import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Code2, MonitorPlay, Rocket, Workflow, Sparkles } from "lucide-react";

const MILESTONES = [
  {
    when: "Chapter 1",
    title: "Started learning web development",
    desc: "Began my journey with HTML, CSS, and JavaScript. Built the foundational skills to understand how the web works and how to design clean interfaces.",
    icon: Code2,
    accent: "#00F5FF",
  },
  {
    when: "Chapter 2",
    title: "Built interactive UI projects",
    desc: "Mastered React and modern frontend libraries. Focused on building interactive, state-driven user interfaces that felt responsive and alive.",
    icon: MonitorPlay,
    accent: "#2D7CFF",
  },
  {
    when: "Chapter 3",
    title: "Created Lernio",
    desc: "Designed and engineered an AI-powered student learning platform from scratch. Integrated quizzes, notes, and a responsive mobile UI.",
    icon: Rocket,
    accent: "#7AE7FF",
  },
  {
    when: "Chapter 4",
    title: "Exploring AI tools & automation",
    desc: "Dived deep into Gemini AI, prompt engineering, and n8n workflows. Automated backend processes to provide students with smart hints instead of direct answers.",
    icon: Workflow,
    accent: "#8B5CFF",
  },
  {
    when: "Current",
    title: "Building futuristic portfolio & real-world projects",
    desc: "Merging advanced web technologies like Three.js, GSAP, and Framer Motion to create cinematic, high-performance digital experiences.",
    icon: Sparkles,
    accent: "#C4A8FF",
  },
];

export const Journey = () => {
  return (
    <section id="journey" data-testid="journey-section" className="relative section-pad bg-[#070A10]">
      <div className="container-pad max-w-4xl">
        <Reveal>
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#00F5FF]" />
              <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-[#00F5FF]">Timeline</span>
              <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#00F5FF]" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#8B5CFF]">Growth Journey.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00F5FF]/30 to-transparent md:-translate-x-1/2" />

          <ul className="space-y-12">
            {MILESTONES.map((m, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = m.icon;
              return (
                <li key={m.title} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0A0F1A] border-2 z-10 flex items-center justify-center" style={{ borderColor: m.accent, boxShadow: `0 0 15px ${m.accent}` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.accent }} />
                  </div>

                  {/* Desktop Spacer Left */}
                  {isEven ? null : <div className="hidden md:block md:w-1/2" />}

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"}`}>
                    <Reveal delay={0.1 * idx}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="premium-card glass rounded-2xl p-6 border border-white/[0.08] hover:border-[#00F5FF]/30 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className={`flex items-center gap-3 mb-4 ${isEven ? "md:flex-row-reverse" : "flex-row"}`}>
                          <span
                            className="inline-flex w-10 h-10 items-center justify-center rounded-xl border border-white/10 shrink-0"
                            style={{ color: m.accent, background: `${m.accent}14`, boxShadow: `inset 0 0 10px ${m.accent}20` }}
                          >
                            <Icon size={18} />
                          </span>
                          <span className="font-mono text-[12px] uppercase tracking-widest text-[#7AE7FF]">{m.when}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00F5FF] transition-all">
                          {m.title}
                        </h3>
                        <p className="text-white/60 leading-relaxed text-sm">
                          {m.desc}
                        </p>
                      </motion.div>
                    </Reveal>
                  </div>

                  {/* Desktop Spacer Right */}
                  {isEven ? <div className="hidden md:block md:w-1/2" /> : null}

                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
