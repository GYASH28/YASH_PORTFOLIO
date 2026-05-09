import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  ExternalLink,
  BookOpen,
  Layers,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const LERNIO_URL = "https://lernioai.vercel.app";

const FEATURES = [
  "Official quiz practice",
  "AI hint generator",
  "Subject-wise exam preparation",
  "Clean student-friendly UI",
  "Mobile-friendly design",
  "Firebase integration",
  "AI chatbot support",
  "Built for real students and real semester exams",
];

export const LernioLive = () => {
  const [showCase, setShowCase] = useState(false);
  const [showFeat, setShowFeat] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const iframeRef = useRef(null);

  const openFullscreen = () => {
    const el = iframeRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else window.open(LERNIO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="lernio" data-testid="lernio-live-section" className="relative section-pad">
      <div className="container-pad">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-10 bg-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.7)]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">
                  Live Product Showcase
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Experience <span className="shimmer-text">Lernio AI</span> Live
              </h2>
              <p className="mt-3 max-w-2xl text-white/65">
                Lernio AI is an AI-powered learning and quiz platform created for students. Official quizzes,
                AI-powered hints, exam-focused preparation, and a modern learning experience — right inside this
                portfolio.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: copy + buttons */}
          <Reveal className="lg:col-span-4" delay={0.05}>
            <div className="space-y-5">
              <div className="glass rounded-2xl p-5 border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-[#7AE7FF]" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/60">
                    Why it matters
                  </span>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">
                  Built for real semester exams — official questions, AI hints that teach instead of spoon-feed,
                  and a UI students actually want to use on phones during late-night prep.
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={openFullscreen}
                  data-testid="lernio-open-fullscreen-button"
                  className="w-full inline-flex items-center justify-between px-4 h-12 rounded-xl bg-white text-black font-medium hover:shadow-[0_0_28px_rgba(0,245,255,0.35)] transition-shadow"
                >
                  <span className="inline-flex items-center gap-2">
                    <Maximize2 size={16} /> Open Fullscreen
                  </span>
                  <ArrowUpRight size={16} />
                </button>
                <a
                  href={LERNIO_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="lernio-visit-live-button"
                  className="w-full inline-flex items-center justify-between px-4 h-12 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/12 text-white transition-colors transition-shadow hover:shadow-[var(--shadow-glass),var(--shadow-neon-cyan)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink size={16} /> Visit Live Website
                  </span>
                  <ArrowUpRight size={16} />
                </a>
                <button
                  onClick={() => setShowCase(true)}
                  data-testid="lernio-view-case-study-button"
                  className="w-full inline-flex items-center justify-between px-4 h-12 rounded-xl bg-transparent border border-white/10 text-white/85 hover:bg-white/[0.04] hover:text-white transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <BookOpen size={16} /> View Case Study
                  </span>
                  <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={() => setShowFeat(true)}
                  data-testid="lernio-view-features-button"
                  className="w-full inline-flex items-center justify-between px-4 h-12 rounded-xl bg-transparent border border-white/10 text-white/85 hover:bg-white/[0.04] hover:text-white transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <Layers size={16} /> View Features
                  </span>
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="glass rounded-2xl p-5 border border-white/[0.08]">
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-3">
                  Tech stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Firebase", "Vercel", "AI APIs", "Tailwind"].map(t => (
                    <span
                      key={t}
                      className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: laptop browser frame with iframe */}
          <Reveal className="lg:col-span-8" delay={0.1}>
            <div className="relative">
              {/* Glow underlay */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-[36px]"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(0,245,255,0.18), rgba(45,124,255,0.08) 50%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Browser chrome */}
              <div className="relative rounded-[24px] overflow-hidden gradient-border bg-[#070A10] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
                {/* Top bar */}
                <div className="flex items-center gap-3 px-4 sm:px-5 h-11 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="flex items-center justify-center gap-2 mx-auto max-w-md h-7 rounded-md bg-white/[0.05] border border-white/[0.06] px-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
                      <span className="font-mono text-[11px] text-white/70 truncate">
                        lernioai.vercel.app
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={openFullscreen}
                      title="Fullscreen"
                      data-testid="lernio-mockup-fullscreen-button"
                      className="w-7 h-7 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 inline-flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                      <Maximize2 size={12} />
                    </button>
                    <a
                      href={LERNIO_URL}
                      target="_blank"
                      rel="noreferrer"
                      title="Open in new tab"
                      className="w-7 h-7 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 inline-flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* iframe stage */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#05060A]">
                  <iframe
                    ref={iframeRef}
                    src={LERNIO_URL}
                    title="Lernio AI Live"
                    data-testid="lernio-live-iframe"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    allow="clipboard-write; fullscreen"
                  />
                  {/* Click to interact overlay (avoids accidental scroll capture) */}
                  <AnimatePresence>
                    {!interactive && (
                      <motion.button
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setInteractive(true)}
                        data-testid="lernio-interact-toggle"
                        className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[2px] hover:bg-black/30 transition-colors"
                      >
                        <span className="px-4 py-2.5 rounded-xl glass-strong border border-white/10 text-sm text-white inline-flex items-center gap-2 shadow-[var(--shadow-neon-cyan)]">
                          <Sparkles size={14} className="text-[#7AE7FF]" /> Click to interact with Lernio AI
                        </span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                  {/* If user is interacting, show small "release" toggle */}
                  {interactive && (
                    <button
                      onClick={() => setInteractive(false)}
                      data-testid="lernio-release-toggle"
                      className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-black/55 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                    >
                      Release · esc
                    </button>
                  )}
                </div>

                {/* Bottom strip */}
                <div className="px-4 sm:px-5 h-9 flex items-center justify-between border-t border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2EF2B1] pulse-dot" />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/55">
                      Live · production
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                    Embedded in portfolio
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Case Study Dialog */}
      <Dialog open={showCase} onOpenChange={setShowCase}>
        <DialogContent
          className="glass-strong border-white/10 text-white max-w-2xl max-h-[85vh] overflow-y-auto"
          data-testid="lernio-case-study-dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Lernio AI · Case Study</DialogTitle>
            <DialogDescription className="text-white/65">
              How an idea for fairer student prep became a real, shipped AI product.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-5">
            <CaseBlock title="Problem" body="Most quiz apps either hand students answers (defeating learning) or feel cheap and dated. Students preparing for real semester exams needed an AI helper that nudges understanding, not one that spoon-feeds." />
            <CaseBlock title="Solution" body="Lernio AI — an AI-first quiz + study companion. Real exam questions, AI hints (not answers), subject-wise drills, and a clean modern UI that feels native on mobile." />
            <CaseBlock title="Main features" list={FEATURES} />
            <CaseBlock title="Tech stack" body="React + Tailwind for the UI, Firebase for auth/storage, AI APIs for hints, n8n for backend automations, deployed on Vercel." />
            <CaseBlock title="Challenges solved" body="Designing AI hints that explain instead of answer; making the quiz UX fast on weak networks; structuring official content so it scales across subjects without code changes." />
            <CaseBlock title="Future improvements" body="Personalized study plans, performance analytics, voice-based quick quizzes, peer challenges, and more subject coverage based on student feedback." />
          </div>
        </DialogContent>
      </Dialog>

      {/* Features Dialog */}
      <Dialog open={showFeat} onOpenChange={setShowFeat}>
        <DialogContent
          className="glass-strong border-white/10 text-white max-w-lg"
          data-testid="lernio-features-dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Lernio AI · Features</DialogTitle>
            <DialogDescription className="text-white/65">
              What you get out of the box.
            </DialogDescription>
          </DialogHeader>
          <ul className="mt-4 space-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/85">
                <span className="inline-flex w-5 h-5 items-center justify-center rounded-md bg-[#00F5FF]/15 text-[#7AE7FF] border border-[#00F5FF]/20 mt-0.5">
                  <Check size={12} />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </section>
  );
};

const CaseBlock = ({ title, body, list }) => (
  <div>
    <div className="font-mono text-[11px] uppercase tracking-widest text-[#7AE7FF] mb-1.5">{title}</div>
    {body && <p className="text-sm text-white/75 leading-relaxed">{body}</p>}
    {list && (
      <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {list.map(i => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/75">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
            {i}
          </li>
        ))}
      </ul>
    )}
  </div>
);
