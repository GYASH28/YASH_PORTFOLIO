import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Sparkles, Code2, Cpu, Palette, Settings, Rocket } from "lucide-react";

const CHIPS = [
  { icon: Code2, label: "Web Development" },
  { icon: Cpu, label: "AI Integration" },
  { icon: Palette, label: "UI/UX Animation" },
  { icon: Settings, label: "Automation" },
  { icon: Rocket, label: "Student Projects" },
  { icon: Sparkles, label: "Creative Tech" },
];

export const About = ({ visible }) => {
  return (
    <section id="about" data-testid="about-section" className="relative section-pad bg-[#05060A]">
      <div className="container-pad">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left — photo / visual area */}
          <Reveal className="lg:col-span-5">
            <div className="group premium-card relative rounded-3xl overflow-hidden gradient-border p-1 bg-[#0A0F1A]">
              <div className="aspect-[4/5] w-full relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/10 to-[#8B5CFF]/10 z-10 transition-opacity group-hover:opacity-0" />
                <img
                  src="/profile-final.webp"
                  alt="Yash Ganesh"
                  data-testid="about-profile-image"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable="false"
                  onError={(e) => {
                    // Fallback to a placeholder gradient if image is missing
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(to bottom right, #0a0f1a, #1a1f3c)';
                  }}
                />
                {/* gloss overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{ background: "linear-gradient(180deg, rgba(5,6,10,0) 55%, rgba(5,6,10,0.9) 100%)" }}
                />
                <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    <span className="w-2 h-2 rounded-full bg-[#00F5FF] pulse-dot shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
                    <span className="font-mono text-[11px] tracking-widest uppercase text-white/90">BUILDING LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[2px] w-12 bg-gradient-to-r from-[#00F5FF] to-transparent" />
                <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-[#00F5FF]">Identity</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Explorer of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#2D7CFF]">AI Tools</span> &amp; <br />
                <span className="text-white/90">Experience Builder.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-2xl font-light">
                I am <strong className="text-white font-medium">Yash Ganesh</strong>, a young developer passionate about merging artificial intelligence with modern web technologies. As the creator of <strong className="text-white font-medium">Lernio</strong>, my focus is always on building digital products that are not just highly functional, but visually spectacular.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-2xl font-light">
                I don't just write code—I engineer premium digital experiences. Whether it's crafting seamless UI animations, automating complex workflows, or integrating smart AI features, I thrive on turning ambitious ideas into polished realities.
              </p>
            </Reveal>

            {/* Focus Area Cards */}
            <Reveal delay={0.26}>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CHIPS.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      key={i}
                      className="group relative overflow-hidden flex flex-col items-start gap-3 p-4 rounded-2xl glass border border-white/[0.08] hover:border-[#00F5FF]/40 transition-all cursor-default"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/0 to-[#00F5FF]/0 group-hover:from-[#00F5FF]/10 group-hover:to-transparent transition-all duration-500" />
                      <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-[#7AE7FF] group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        <Icon size={20} />
                      </span>
                      <span className="text-sm font-medium text-white/90 relative z-10">{c.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
