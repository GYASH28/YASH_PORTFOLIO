import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Download, Rocket } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const FRAME_COUNT = 32;
const FPS = 24;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `/hero-sequence/${String(i + 1).padStart(2, "0")}.webp`);

export const Hero = ({ bootDone, onHeroDone, reducedMotion = false }) => {
  const [loaded, setLoaded] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const imagesRef = useRef([]);
  const rafRef = useRef(null);

  // Preload frames
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    imagesRef.current = FRAMES.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        count += 1;
        setLoaded(count);
      };
      img.onerror = () => {
        if (cancelled) return;
        count += 1;
        setLoaded(count);
      };
      return img;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Play animation when boot done and frames preloaded
  useEffect(() => {
    if (!bootDone) return;
    if (loaded < FRAME_COUNT) return;

    if (reducedMotion) {
      setCurrentFrame(FRAME_COUNT - 1);
      setAnimationDone(true);
      onHeroDone?.();
      return;
    }

    const start = performance.now();
    const frameDuration = 1000 / FPS;
    const totalDuration = FRAME_COUNT * frameDuration;

    const tick = (now) => {
      const elapsed = now - start;
      const idx = Math.min(FRAME_COUNT - 1, Math.floor(elapsed / frameDuration));
      setCurrentFrame(idx);
      if (elapsed >= totalDuration) {
        setCurrentFrame(FRAME_COUNT - 1);
        setAnimationDone(true);
        onHeroDone?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [bootDone, loaded, reducedMotion, onHeroDone]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Background accents */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 30% at 50% 0%, rgba(45,124,255,0.18), transparent 70%), radial-gradient(60% 40% at 50% 80%, rgba(0,245,255,0.10), transparent 70%)",
          }}
        />
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 container-pad pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100svh-160px)]">
          {/* Left: Text */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            {/* status pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: animationDone ? 1 : 0, y: animationDone ? 0 : 8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6"
              data-testid="hero-status-pill"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2EF2B1] pulse-dot" />
              <span className="font-mono text-[11px] tracking-wider uppercase text-white/70">
                Available for opportunities
              </span>
            </motion.div>

            <AnimatePresence>
              {animationDone && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
                    },
                  }}
                >
                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white"
                    data-testid="hero-headline"
                  >
                    Hi, I&apos;m <span className="shimmer-text">Yash Ganesh</span>
                  </motion.h1>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="mt-4 text-base sm:text-lg text-white/65"
                    data-testid="hero-subhead"
                  >
                    Computer Engineering &amp; IoT Student
                  </motion.p>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {["AI Tools Builder", "Web Developer", "Creative Tech Enthusiast"].map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-[12px] font-medium glass text-white/80 border border-white/[0.08]"
                      >
                        {t}
                      </span>
                    ))}
                  </motion.div>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="mt-6 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
                    data-testid="hero-tagline"
                  >
                    I build smart, beautiful, and useful digital experiences powered by
                    <span className="text-white"> AI</span>,
                    <span className="text-white"> code</span>, and
                    <span className="text-white"> creativity</span>.
                  </motion.p>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="mt-8 flex flex-wrap gap-3"
                  >
                    <MagneticButton
                      onClick={() => scrollTo("projects")}
                      data-testid="hero-view-projects-button"
                      className="group inline-flex items-center px-5 h-12 rounded-xl bg-white text-black font-medium shadow-[0_18px_60px_rgba(0,0,0,0.55),0_0_22px_rgba(0,245,255,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.55),0_0_36px_rgba(0,245,255,0.36)] transition-shadow"
                    >
                      <Sparkles size={16} className="text-[#0A0F1A]" />
                      View My Projects
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </MagneticButton>
                    <MagneticButton
                      onClick={() => scrollTo("lernio")}
                      data-testid="hero-explore-lernio-button"
                      className="group inline-flex items-center px-5 h-12 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/12 text-white transition-colors transition-shadow hover:shadow-[var(--shadow-glass),var(--shadow-neon-cyan)]"
                    >
                      <Rocket size={16} className="text-[#7AE7FF]" />
                      Explore Lernio AI
                    </MagneticButton>
                    <button
                      onClick={() => scrollTo("contact")}
                      data-testid="hero-contact-button"
                      className="inline-flex items-center gap-2 px-5 h-12 rounded-xl bg-transparent hover:bg-white/[0.04] border border-white/10 text-white/85 hover:text-white transition-colors"
                    >
                      <Mail size={16} />
                      Contact Me
                    </button>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      data-testid="hero-download-resume-button"
                      className="inline-flex items-center gap-2 px-5 h-12 rounded-xl bg-transparent hover:bg-white/[0.04] border border-white/10 text-white/85 hover:text-white transition-colors"
                    >
                      <Download size={16} />
                      Download Resume
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Image sequence stage */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] mx-auto max-w-[560px] lg:max-w-none rounded-3xl overflow-hidden gradient-border"
              data-testid="hero-sequence-canvas"
              style={{
                background:
                  "radial-gradient(60% 80% at 50% 60%, rgba(0,245,255,0.06), rgba(45,124,255,0.04) 50%, rgba(5,6,10,1) 100%)",
              }}
            >
              {/* Inner stage */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Loading state */}
                {loaded < FRAME_COUNT && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-40 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full bg-[#00F5FF] transition-all"
                          style={{ width: `${(loaded / FRAME_COUNT) * 100}%`, boxShadow: "0 0 18px rgba(0,245,255,0.7)" }}
                        />
                      </div>
                      <div className="font-mono text-[11px] mt-3 text-white/55 tracking-wider">
                        LOADING SEQUENCE · {loaded}/{FRAME_COUNT}
                      </div>
                    </div>
                  </div>
                )}

                {/* Frames */}
                {loaded >= FRAME_COUNT &&
                  FRAMES.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={i === FRAME_COUNT - 1 ? "Yash Ganesh" : ""}
                      className="hero-frame absolute inset-0 w-full h-full object-cover"
                      style={{
                        opacity: i === currentFrame ? 1 : 0,
                      }}
                      data-testid="hero-sequence-frame"
                      draggable="false"
                    />
                  ))}
              </div>

              {/* Overlay accents */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,6,10,0) 60%, rgba(5,6,10,0.85) 100%)",
                }}
              />
              {/* Corner indicators */}
              <div className="pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D]" />
                  <span className="font-mono text-[10px] tracking-wider text-white/70 uppercase">REC · 4K</span>
                </div>
                <div className="font-mono text-[10px] text-white/55 tracking-wider">
                  FRAME {String(currentFrame + 1).padStart(2, "0")}/{FRAME_COUNT}
                </div>
              </div>
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="font-mono text-[10px] text-white/55 tracking-wider">YASH · GANESH</div>
                <div className="font-mono text-[10px] text-[#7AE7FF] tracking-wider">CINEMATIC SEQUENCE</div>
              </div>
            </div>

            {/* small mono caption */}
            <div className="mt-3 hidden sm:flex items-center justify-center gap-2 font-mono text-[11px] text-white/40">
              <span className="w-1 h-1 rounded-full bg-[#00F5FF]" /> Cinematic 32-frame sequence rendered at 24fps
            </div>
          </div>
        </div>

        {/* scroll hint */}
        {animationDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-10 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2 text-white/40">
              <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
