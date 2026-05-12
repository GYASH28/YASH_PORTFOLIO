import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, Rocket, CheckCircle2, ChevronRight, Play } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const LERNIO_URL = "https://lernioai.vercel.app";

const HIGHLIGHTS = [
  "BEEE quiz preparation",
  "PIC Programming in C quizzes",
  "AI hints that explain concepts",
  "Semester-wise Notes",
  "Viva/oral prep",
  "Exam practice mode",
  "Student-friendly mobile interface",
];

export const LernioLive = () => {
  const [interactive, setInteractive] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);

  return (
    <section id="lernio" data-testid="lernio-live-section" className="relative section-pad bg-[#05060A] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 -right-[20%] w-[800px] h-[800px] bg-[#00F5FF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 -left-[10%] w-[600px] h-[600px] bg-[#8B5CFF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-pad relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Copy & Explanation */}
          <div className="lg:col-span-6 lg:pr-12">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[2px] w-12 bg-gradient-to-r from-[#00F5FF] to-transparent" />
                <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#00F5FF]">
                  Live Product Showcase
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Experience <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#2D7CFF] to-[#8B5CFF] neon-text">
                  Lernio AI
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-white/70 text-lg leading-relaxed font-light">
                Lernio is an AI-powered student learning platform built for quizzes, notes, viva/oral preparation, and exam practice. Experience the real, live mobile application right here.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 space-y-4">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#7AE7FF]">Core Features</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {HIGHLIGHTS.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle2 size={16} className="text-[#00F5FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={LERNIO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 h-14 rounded-xl bg-white text-black font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
                >
                  <ExternalLink size={18} /> Open Lernio
                </a>
                <button
                  onClick={() => setInteractive(true)}
                  className="inline-flex items-center gap-2 px-6 h-14 rounded-xl glass hover:bg-white/[0.05] border border-[#00F5FF]/30 text-[#00F5FF] font-medium transition-all hover:shadow-neon-cyan"
                >
                  <Play size={18} fill="currentColor" /> Try Demo Here
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right: Premium Mobile Phone Mockup */}
          <Reveal className="lg:col-span-6 flex justify-center lg:justify-end" delay={0.2}>
            <div className="relative group perspective-[2000px]">
              {/* Massive ambient glow behind phone */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00F5FF]/30 to-[#8B5CFF]/30 blur-[80px] rounded-full scale-110 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* The Phone Container */}
              <motion.div 
                whileHover={{ rotateY: -5, rotateX: 2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-[320px] sm:w-[360px] md:w-[390px] aspect-[390/844] rounded-[48px] bg-black p-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),_0_0_0_4px_rgba(255,255,255,0.05),_0_50px_100px_rgba(0,0,0,0.8)] border border-white/20 transform-style-3d"
              >
                {/* Phone Notch/Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                   <div className="w-2 h-2 rounded-full bg-[#111]" />
                   <div className="w-2 h-2 rounded-full bg-blue-900/40" />
                </div>

                {/* Inner Screen Area */}
                <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0A0F1A] border border-white/[0.05]">
                  
                  {/* Glass Reflection overlay */}
                  <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 transform -rotate-12 scale-150 translate-x-1/4" />

                  {/* Top Status Bar (fake) */}
                  <div className="absolute top-0 inset-x-0 h-12 bg-black/40 backdrop-blur-md z-20 flex justify-between items-center px-6 pt-1">
                    <span className="text-[12px] font-semibold text-white">9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-3.5 h-2.5 border border-white/80 rounded-[2px]" />
                      <div className="w-3.5 h-3.5 rounded-full border border-white/80" />
                    </div>
                  </div>

                  {/* Fallback Loader */}
                  {!iframeLoaded && (
                    <div className="absolute inset-0 pt-12 z-10 flex flex-col items-center justify-center bg-[#0A0F1A]">
                      <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#00F5FF] animate-spin mb-4" />
                      <span className="text-xs text-white/50 font-mono animate-pulse">Loading Lernio...</span>
                    </div>
                  )}

                  {/* Iframe */}
                  <iframe
                    ref={iframeRef}
                    src={LERNIO_URL}
                    title="Lernio AI Live"
                    className={`absolute inset-0 w-full h-full border-0 pt-12 transition-opacity duration-1000 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    allow="clipboard-write"
                    onLoad={() => setIframeLoaded(true)}
                  />

                  {/* Interaction Overlay */}
                  <AnimatePresence>
                    {!interactive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setInteractive(true)}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer group/overlay"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#00F5FF]/20 flex items-center justify-center border border-[#00F5FF]/50 mb-4 group-hover/overlay:scale-110 transition-transform shadow-[0_0_30px_rgba(0,245,255,0.4)]">
                          <Play size={24} className="text-[#00F5FF] ml-1" fill="currentColor" />
                        </div>
                        <span className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white shadow-lg backdrop-blur-md">
                          Tap to interact with Lernio
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* External Home Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full z-30" />
              </motion.div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
