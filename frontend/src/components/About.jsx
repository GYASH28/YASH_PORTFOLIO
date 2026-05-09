import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Sparkles, Code2, Cpu, Palette } from "lucide-react";

const CHIPS = [
  { icon: Cpu, label: "Computer Engineering & IoT" },
  { icon: Sparkles, label: "AI Tools & Automations" },
  { icon: Code2, label: "Frontend & Web Apps" },
  { icon: Palette, label: "UI / UX Sensibility" },
];

export const About = () => {
  return (
    <section id="about" data-testid="about-section" className="relative section-pad">
      <div className="container-pad">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left — photo */}
          <Reveal className="lg:col-span-5">
            <div
              className="relative rounded-3xl overflow-hidden gradient-border"
              style={{
                background: "radial-gradient(60% 60% at 50% 40%, rgba(0,245,255,0.08), rgba(45,124,255,0.05) 50%, rgba(5,6,10,1) 100%)",
              }}
            >
              <div className="aspect-[4/5] w-full relative">
                <img
                  src="/profile-final.webp"
                  alt="Yash Ganesh"
                  data-testid="about-profile-image"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable="false"
                />
                {/* gloss */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,6,10,0) 55%, rgba(5,6,10,0.7) 100%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/45 backdrop-blur-md border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] pulse-dot" />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">SIGNAL · LIVE</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/55 tracking-widest">EST. 2024</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-10 bg-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.7)]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">About</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Building useful, beautiful tools —
                <span className="text-[#7AE7FF]"> for real students.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
                I&apos;m <span className="text-white">Yash Ganesh</span>, a Computer Engineering &amp; IoT student
                obsessed with crafting digital products that feel premium and actually solve problems. From AI-powered
                study tools to clean web experiences, I love combining
                <span className="text-white"> engineering</span>,
                <span className="text-white"> design</span>, and
                <span className="text-white"> automation</span> to ship things that students and creators want to use
                every day.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 text-white/60 leading-relaxed max-w-2xl">
                Currently focused on AI tools (Gemini, n8n, prompt engineering), modern web stacks (React, Tailwind,
                Firebase, Vercel), and turning ideas like <span className="text-[#7AE7FF]">Lernio AI</span> into real,
                shipped products.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                {CHIPS.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      key={i}
                      data-testid="about-quick-fact-chip"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-white/[0.08] hover:border-white/[0.16] hover:shadow-[var(--shadow-neon-blue)] transition-colors transition-shadow"
                    >
                      <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/10 text-[#7AE7FF]">
                        <Icon size={16} />
                      </span>
                      <span className="text-sm text-white/80">{c.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-7 flex flex-wrap gap-6">
                <Stat label="Projects shipped" value="10+" />
                <Divider />
                <Stat label="Hours of build time" value="500+" />
                <Divider />
                <Stat label="AI workflows wired" value="25+" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">{value}</div>
    <div className="text-xs sm:text-sm text-white/55 mt-0.5">{label}</div>
  </div>
);
const Divider = () => <div className="hidden sm:block w-px h-10 bg-white/10" />;
