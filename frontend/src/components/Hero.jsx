import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Rocket } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const HERO_VIDEO = "/videos/formal-transformation.mp4";

const RESUME_MAILTO =
  "mailto:yash.k.ganesh@gmail.com?subject=Resume%20request%20from%20your%20portfolio";

export const Hero = ({ bootDone, onHeroDone, reducedMotion = false }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const completedRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(reducedMotion ? 1 : 0);
  const [videoReady, setVideoReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [animationDone, setAnimationDone] = useState(reducedMotion);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const markDone = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setAnimationDone(true);
    onHeroDone?.();
  }, [onHeroDone]);

  const syncVideo = useCallback((progress) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(duration) || duration <= 0) return;
    const targetTime = Math.min(duration - 0.04, Math.max(0, progress * duration));
    if (Math.abs(video.currentTime - targetTime) > 0.035) {
      video.currentTime = targetTime;
    }
  }, [duration]);

  const handleVideoReady = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setDuration(video.duration || 0);
    setVideoReady(true);
  }, []);

  useEffect(() => {
    if (!bootDone || !videoReady) return;

    if (reducedMotion) {
      setScrollProgress(1);
      syncVideo(1);
      markDone();
    }
  }, [bootDone, markDone, reducedMotion, syncVideo, videoReady]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!bootDone || !videoReady || reducedMotion) return;

    const frameProgress = Math.min(1, latest / 0.96);
    setScrollProgress(frameProgress);
    syncVideo(frameProgress);

    if (latest >= 0.92) {
      markDone();
    }
  });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const introTextVisible = bootDone && (videoReady || reducedMotion);
  const buttonVisible = introTextVisible;
  const personTransform = reducedMotion
    ? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
    : `translate3d(${12 - scrollProgress * 12}vw, ${3 - scrollProgress * 3}svh, 0) scale(${0.92 + scrollProgress * 0.08}) rotate(${2 - scrollProgress * 2}deg)`;

  return (
    <section
      ref={sectionRef}
      id="home"
      data-testid="hero-section"
      className={`relative w-full overflow-visible ${reducedMotion ? "min-h-[100svh]" : "h-[300svh]"}`}
    >
      <div className="sticky top-0 min-h-[100svh] w-full overflow-hidden bg-[#05060A]">
        <div className="cinematic-bg" aria-hidden="true">
          <div className="cinematic-stars cinematic-stars-a" />
          <div className="cinematic-stars cinematic-stars-b" />
          <motion.div
            className="cinematic-wire cinematic-wire-left"
            style={{ transform: `translate3d(${-scrollProgress * 3}vw, ${scrollProgress * 4}svh, 0) rotate(${18 + scrollProgress * 16}deg)` }}
          />
          <motion.div
            className="cinematic-wire cinematic-wire-right"
            style={{ transform: `translate3d(${scrollProgress * 4}vw, ${-scrollProgress * 3}svh, 0) rotate(${-24 - scrollProgress * 12}deg)` }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-[#05060A] via-[#05060A]/70 to-transparent" />

        <div className="absolute inset-y-0 left-1/2 z-[3] flex w-[78vw] -translate-x-1/2 items-end justify-center pb-[3svh] sm:left-auto sm:right-[-10vw] sm:w-[68vw] sm:translate-x-0 lg:right-[1vw] lg:w-[48vw]">
          <motion.div
            className="relative flex h-full w-full items-end justify-center"
            animate={{ opacity: introTextVisible ? 1 : 0 }}
            transition={{ duration: 0.45 }}
            style={{ transform: personTransform }}
          >
            <div className="absolute bottom-[7svh] h-[42svh] w-[42svh] rounded-full bg-[#00F5FF]/10 blur-3xl" aria-hidden="true" />
            <video
              ref={videoRef}
              src={HERO_VIDEO}
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={handleVideoReady}
              aria-label="Yash Ganesh cinematic formal transformation"
              className="hero-frame hero-person cinematic-video relative z-10 max-h-[34svh] w-auto object-contain sm:max-h-[82svh] lg:max-h-[84svh]"
              data-testid="hero-sequence-frame"
            />
          </motion.div>
        </div>

        {!videoReady && (
          <div className="absolute inset-0 z-[4] flex items-center justify-center">
            <div className="w-52">
              <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-[#00F5FF] transition-all"
                  style={{ width: "66%", boxShadow: "0 0 18px rgba(0,245,255,0.7)" }}
                />
              </div>
              <div className="font-mono text-[11px] mt-3 text-center text-white/55 tracking-wider">
                LOADING INTRO
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 container-pad flex min-h-[100svh] items-center pt-28 pb-16 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: introTextVisible ? 1 : 0, y: introTextVisible ? 0 : 16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5" data-testid="hero-status-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2EF2B1] pulse-dot" />
              <span className="font-mono text-[11px] tracking-wider uppercase text-white/70">
                Available for opportunities
              </span>
            </div>

            <h1
              className="max-w-[13ch] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[0.98]"
              data-testid="hero-headline"
            >
              Hi, I&apos;m <span className="shimmer-text">Yash Ganesh</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70" data-testid="hero-subhead">
              Computer Engineering &amp; IoT Student
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["AI Tools Builder", "Web Developer", "Creative Tech Enthusiast"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-[12px] font-medium glass text-white/80 border border-white/[0.08]">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-6 hidden max-w-xl text-base sm:block sm:text-lg text-white/72 leading-relaxed" data-testid="hero-tagline">
              I build smart, beautiful, and useful digital experiences powered by
              <span className="text-white"> AI</span>,
              <span className="text-white"> code</span>, and
              <span className="text-white"> creativity</span>.
            </p>

            <motion.div
              animate={{ opacity: buttonVisible ? 1 : 0, y: buttonVisible ? 0 : 14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 hidden flex-wrap gap-3 sm:flex"
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
                href={RESUME_MAILTO}
                data-testid="hero-request-resume-button"
                className="inline-flex items-center gap-2 px-5 h-12 rounded-xl bg-transparent hover:bg-white/[0.04] border border-white/10 text-white/85 hover:text-white transition-colors"
              >
                <Mail size={16} />
                Request Resume
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: bootDone && videoReady ? 1 : 0 }}
          transition={{ duration: 0.7 }}
          className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="font-mono text-[10px] tracking-widest uppercase">
              {animationDone ? "Keep scrolling" : "Scroll"}
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
