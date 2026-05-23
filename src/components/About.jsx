import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Sparkles, Code2, Brain, Terminal, Rocket, Cpu } from "lucide-react";
import yashPortrait from "@/assets/yash-portrait.png";

const MINDMAP_CARDS = [
  {
    title: "AI Builder Mindset",
    desc: "Merging LLMs, prompt engineering, and automated agents (using workflows like n8n) to build self-learning utilities and AI tutors.",
    icon: Brain,
    accent: "from-[#00F5FF] to-[#2D7CFF]",
    glow: "rgba(0, 245, 255, 0.15)",
    span: "lg:col-span-6",
  },
  {
    title: "Web Developer Skills",
    desc: "Crafting blazing fast, modular, and pixel-perfect applications with React, Next.js, and custom styling systems.",
    icon: Code2,
    accent: "from-[#8B5CFF] to-[#C4A8FF]",
    glow: "rgba(139, 92, 255, 0.15)",
    span: "lg:col-span-6",
  },
  {
    title: "Vibe Coding Workflow",
    desc: "Harnessing AI-assisted code pipelines to design, prototype, and debug complex layouts at 10x speed.",
    icon: Terminal,
    accent: "from-[#7AE7FF] to-[#00F5FF]",
    glow: "rgba(122, 231, 255, 0.15)",
    span: "lg:col-span-4",
  },
  {
    title: "Creative Technologist",
    desc: "Engineering fluid 3D elements, custom canvas rigs, and cinematic GSAP timelines.",
    icon: Sparkles,
    accent: "from-[#FF7AC4] to-[#8B5CFF]",
    glow: "rgba(255, 122, 196, 0.12)",
    span: "lg:col-span-4",
  },
  {
    title: "Building & Learning",
    desc: "Developing platforms like Lernio, supporting student developer tools, and shipping live products.",
    icon: Rocket,
    accent: "from-[#FFCA66] to-[#FF7A45]",
    glow: "rgba(255, 202, 102, 0.12)",
    span: "lg:col-span-4",
  },
];

export const About = ({ visible }) => {
  return (
    <section id="about" data-testid="about-section" className="relative section-pad bg-[#05060A] overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#8B5CFF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-pad">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#00F5FF]" />
              <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-[#00F5FF]">Identity</span>
              <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#00F5FF]" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Explorer of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#2D7CFF]">AI Tools</span> &amp; Experience Builder.
            </h2>
            <p className="mt-4 text-white/55 text-base sm:text-lg max-w-2xl font-light">
              I am Yash Ganesh, a creative developer focused on merging artificial intelligence with modern interactive frontend engineering.
            </p>
            <div className="mt-10 w-full max-w-[280px] mx-auto">
              <img src={yashPortrait} alt="Yash Ganesh" className="about-portrait" />
            </div>
          </div>
        </Reveal>

        {/* Mindmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {MINDMAP_CARDS.map((card, i) => {
            const Icon = card.icon;
            
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
              <Reveal key={card.title} delay={i * 0.08} className={card.span}>
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{
                    initial: { y: 0, scale: 1 },
                    hover: { y: -6, scale: 1.015 }
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="group relative h-full rounded-3xl p-6 sm:p-8 bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.12] transition-colors duration-500 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                  style={{
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.02)`,
                  }}
                >
                  {/* Infinite hardware-accelerated scanning line sweep on hover */}
                  <motion.div
                    variants={scannerVariants}
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF]/35 to-transparent pointer-events-none z-20"
                  />

                  {/* Cybernetic HUD Corner Brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/[0.06] group-hover:border-[#00F5FF]/30 transition-colors duration-500 pointer-events-none" />

                  {/* Dynamic Corner Glow */}
                  <div 
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
                    style={{ background: card.glow }}
                  />

                  <div>
                    {/* Icon Container */}
                    <div className="flex items-center justify-between mb-8">
                      <span className={`inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} p-[1px]`}>
                        <span className="w-full h-full rounded-[15px] bg-[#0A0F1A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-500">
                          <Icon size={20} className="group-hover:animate-pulse" />
                        </span>
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase font-semibold select-none">
                        LOC_0{i + 1} // SYS_NET
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#7AE7FF] transition-all">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>

                  {/* Card Bottom Indicator line */}
                  <div className="w-full h-[1px] bg-white/[0.04] mt-8 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-gradient-to-r from-[#00F5FF] to-transparent transition-all duration-700 h-full" />
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

