import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { text: "Initializing Portfolio...", duration: 200 },
  { text: "Loading Yash Ganesh...", duration: 200 },
  { text: "Launching Experience...", duration: 200 },
  { text: "Welcome.", duration: 200 },
];

export const BootSequence = ({ onComplete, reducedMotion = false }) => {
  const [active, setActive] = useState(true);
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const charTimer = useRef(null);
  const lineTimer = useRef(null);

  useEffect(() => {
    if (reducedMotion) {
      // Skip immediately for reduced motion users
      const t = setTimeout(() => {
        setActive(false);
        onComplete?.();
      }, 200);
      return () => clearTimeout(t);
    }
  }, [reducedMotion, onComplete]);

  useEffect(() => {
    if (reducedMotion) return;
    if (lineIdx >= LINES.length) {
      // hold welcome for a beat then exit
      lineTimer.current = setTimeout(() => {
        setActive(false);
        // wait for exit animation
        setTimeout(() => onComplete?.(), 520);
      }, 420);
      return () => clearTimeout(lineTimer.current);
    }
    const current = LINES[lineIdx].text;
    let i = 0;
    setTyped("");
    charTimer.current = setInterval(() => {
      i += 1;
      setTyped(current.slice(0, i));
      if (i >= current.length) {
        clearInterval(charTimer.current);
        lineTimer.current = setTimeout(() => setLineIdx(idx => idx + 1), 100);
      }
    }, 10);
    return () => {
      clearInterval(charTimer.current);
      clearTimeout(lineTimer.current);
    };
  }, [lineIdx, reducedMotion, onComplete]);

  const skip = () => {
    clearInterval(charTimer.current);
    clearTimeout(lineTimer.current);
    setActive(false);
    setTimeout(() => onComplete?.(), 200);
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="boot"
          data-testid="boot-sequence-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05060A] noise-overlay"
          aria-hidden={!active}
        >
          <div className="boot-ring" aria-hidden="true" />
          <div className="boot-scan" aria-hidden="true" />
          {/* radial accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 40% at 50% 50%, rgba(0,245,255,0.08), rgba(45,124,255,0.04) 40%, transparent 70%)",
            }}
          />
          {/* content */}
          <div className="relative w-full max-w-md px-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00F5FF] pulse-dot" />
              <span className="font-mono text-xs tracking-widest text-white/55 uppercase">SYSTEM · v2.0</span>
            </div>
            <div className="space-y-2 min-h-[180px]">
              {LINES.slice(0, lineIdx).map((l, i) => (
                <div key={i} className="font-mono text-sm text-white/55" data-testid="boot-sequence-line">
                  <span className="text-[#00F5FF] mr-2">›</span>
                  {l.text}
                </div>
              ))}
              {lineIdx < LINES.length && (
                <div className="font-mono text-sm text-white" data-testid="boot-sequence-line">
                  <span className="text-[#00F5FF] mr-2">›</span>
                  {typed}
                  <span className="inline-block w-[8px] h-[14px] bg-[#00F5FF]/80 ml-1 align-middle animate-pulse" />
                </div>
              )}
            </div>
            <button
              onClick={skip}
              data-testid="boot-sequence-skip-button"
              className="absolute right-6 bottom-0 text-xs font-mono text-white/40 hover:text-white/80 transition-colors"
            >
              [ skip · esc ]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
