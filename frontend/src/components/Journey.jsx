import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Code2, Sparkles, Rocket, Workflow, Zap } from "lucide-react";

const MILESTONES = [
  {
    when: "2022 · Beginning",
    title: "Started learning web development",
    desc: "Picked up HTML, CSS, JavaScript and started shipping tiny side projects to learn by doing.",
    icon: Code2,
    accent: "#7AE7FF",
  },
  {
    when: "2023 · Foundations",
    title: "Built early websites & explored React",
    desc: "Moved from static sites to dynamic React apps. Got comfortable with components, state, and modern UI tooling.",
    icon: Sparkles,
    accent: "#9AB1FF",
  },
  {
    when: "2024 · Lernio AI",
    title: "Created Lernio AI — a real student product",
    desc: "Designed and built an AI-powered quiz platform with official questions and AI hints. First product I actually shipped.",
    icon: Rocket,
    accent: "#7AE7FF",
  },
  {
    when: "2024 · Automation",
    title: "Integrated AI chatbot & n8n automation",
    desc: "Wired Gemini + n8n + custom prompt engineering for hints, student support, and backend automations.",
    icon: Workflow,
    accent: "#C4A8FF",
  },
  {
    when: "Now · Building",
    title: "Becoming a strong AI + Web developer",
    desc: "Sharpening engineering, design, and AI skills — building tools real people want to use every day.",
    icon: Zap,
    accent: "#9AFFD9",
  },
];

export const Journey = () => {
  return (
    <section id="journey" data-testid="journey-section" className="relative section-pad">
      <div className="container-pad">
        <Reveal>
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-10 bg-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.7)]" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              The story so far.
            </h2>
            <p className="mt-3 max-w-xl text-white/60">
              From writing my first HTML tag to shipping AI products — here&apos;s the path.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* central line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

          <ul className="space-y-8 md:space-y-12">
            {MILESTONES.map((m, idx) => {
              const left = idx % 2 === 0;
              const Icon = m.icon;
              return (
                <li
                  key={m.title}
                  data-testid="journey-timeline-item"
                  className="relative md:grid md:grid-cols-2 md:gap-10"
                >
                  {/* node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full items-center justify-center" style={{ background: m.accent, boxShadow: `0 0 18px ${m.accent}` }} />

                  {/* card */}
                  <Reveal
                    className={`md:col-span-1 ${left ? "md:pr-10 md:text-right md:items-end" : "md:col-start-2 md:pl-10"}`}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`glass rounded-2xl p-5 border border-white/[0.08] hover:border-white/[0.16] hover:shadow-[var(--shadow-glass),var(--shadow-neon-blue)] transition-colors transition-shadow ${left ? "md:ml-auto" : ""}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-white/10"
                          style={{ color: m.accent, background: `${m.accent}14` }}
                        >
                          <Icon size={16} />
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-white/55">{m.when}</span>
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">{m.title}</h3>
                      <p className="mt-2 text-sm text-white/65 leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
