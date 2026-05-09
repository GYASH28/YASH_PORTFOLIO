import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const TRANSITION_VIDEO = "/videos/portfolio-transition.mp4";

export const ScrollFrameSequence = ({ reducedMotion = false }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(reducedMotion ? 1 : 0);
  const [videoReady, setVideoReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [sequenceDone, setSequenceDone] = useState(reducedMotion);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

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
    if (!videoReady || !reducedMotion) return;
    setScrollProgress(1);
    syncVideo(1);
    setSequenceDone(true);
  }, [reducedMotion, syncVideo, videoReady]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!videoReady || reducedMotion) return;

    const frameProgress = Math.min(1, latest / 0.96);
    setScrollProgress(frameProgress);
    syncVideo(frameProgress);
    setSequenceDone(latest >= 0.92);
  });

  const progress = videoReady ? scrollProgress * 100 : 66;
  const personTransform = reducedMotion
    ? "translate3d(-50%, 0, 0) scale(1) rotate(0deg)"
    : `translate3d(calc(-50% + ${8 - scrollProgress * 8}vw), ${2 - scrollProgress * 2}svh, 0) scale(${0.94 + scrollProgress * 0.06}) rotate(${-1 + scrollProgress}deg)`;

  return (
    <section
      ref={sectionRef}
      data-testid="scroll-sequence-section"
      className={`relative w-full overflow-visible ${reducedMotion ? "min-h-[100svh]" : "h-[240svh]"}`}
    >
      <div className="sticky top-0 min-h-[100svh] w-full overflow-hidden bg-[#05060A]">
        <div className="cinematic-bg" aria-hidden="true">
          <div className="cinematic-stars cinematic-stars-a" />
          <div className="cinematic-stars cinematic-stars-b" />
          <motion.div
            className="cinematic-wire cinematic-wire-left"
            style={{ transform: `translate3d(${-2 + scrollProgress * 4}vw, ${scrollProgress * 3}svh, 0) rotate(${32 - scrollProgress * 24}deg)` }}
          />
          <motion.div
            className="cinematic-wire cinematic-wire-right"
            style={{ transform: `translate3d(${2 - scrollProgress * 3}vw, ${-scrollProgress * 4}svh, 0) rotate(${-18 + scrollProgress * 18}deg)` }}
          />
        </div>

        <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-[#05060A] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[2] h-44 bg-gradient-to-t from-[#05060A] via-[#05060A]/75 to-transparent" />

        <motion.div
          className="absolute inset-y-0 left-1/2 z-[3] flex w-[72vw] items-end justify-center pb-[3svh] sm:w-[58vw] lg:left-[63%] lg:w-[38vw]"
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          style={{ transform: personTransform }}
        >
          <div className="absolute bottom-[8svh] h-[38svh] w-[38svh] rounded-full bg-[#2D7CFF]/12 blur-3xl" aria-hidden="true" />
          <video
            ref={videoRef}
            src={TRANSITION_VIDEO}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleVideoReady}
            aria-label="Yash Ganesh portfolio transition"
            className="hero-frame hero-person cinematic-video relative z-10 max-h-[44svh] w-auto object-contain sm:max-h-[84svh]"
            data-testid="scroll-sequence-frame"
          />
        </motion.div>

        {!videoReady && (
          <div className="absolute inset-0 z-[4] flex items-center justify-center">
            <div className="w-52">
              <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-[#00F5FF] transition-all"
                  style={{ width: `${progress}%`, boxShadow: "0 0 18px rgba(0,245,255,0.7)" }}
                />
              </div>
              <div className="font-mono text-[11px] mt-3 text-center text-white/55 tracking-wider">
                LOADING TRANSITION
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 container-pad flex min-h-[100svh] items-center pb-20 pt-28 sm:pt-32">
          <motion.div
            className="hidden max-w-xl sm:block"
            animate={{ opacity: sequenceDone ? 1 : 0.72, y: sequenceDone ? 0 : 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 h-px w-14 bg-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.7)]" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              Building sharp ideas into real products.
            </h2>
            <p className="mt-4 max-w-md text-white/65 leading-relaxed">
              AI tools, polished web experiences, and practical systems shaped with curiosity and clean execution.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
