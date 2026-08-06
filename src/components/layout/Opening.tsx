"use client";

import { useEffect, useRef, useState } from "react";
import { useOpeningSession } from "@/hooks/use-opening-session";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { IconSkip } from "@/components/ui-yg/icons";

interface OpeningProps {
  onComplete: () => void;
}

/**
 * The opening sequence — material fragments from the four real projects
 * fold, refract, scan, and flow into an abstract composition, then resolve
 * into "YASH GANESH", then move outward to become the hero sculpture.
 *
 * No boot, terminal, HUD, or fake progress.
 */
export default function Opening({ onComplete }: OpeningProps) {
  const reduced = useReducedMotion();
  const { played, markPlayed } = useOpeningSession();
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [closing, setClosing] = useState(false);
  const completed = useRef(false);

  // Repeat visit or reduced motion — short crossfade.
  const shortVersion = played || reduced;
  const totalDuration = shortVersion ? 800 : 2800;

  useEffect(() => {
    if (completed.current) return;

    if (shortVersion) {
      setPhase(4);
      const t1 = window.setTimeout(() => setClosing(true), 600);
      const t2 = window.setTimeout(() => {
        completed.current = true;
        markPlayed();
        onComplete();
      }, 1000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(1), 200));
    timers.push(window.setTimeout(() => setPhase(2), 800));
    timers.push(window.setTimeout(() => setPhase(3), 1500));
    timers.push(window.setTimeout(() => setPhase(4), 2200));
    timers.push(window.setTimeout(() => setClosing(true), totalDuration));
    timers.push(
      window.setTimeout(() => {
        completed.current = true;
        markPlayed();
        onComplete();
      }, totalDuration + 700)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    if (completed.current) return;
    completed.current = true;
    markPlayed();
    setClosing(true);
    window.setTimeout(onComplete, 400);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-[var(--bg-base)] transition-opacity duration-700 ${
        closing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionTimingFunction: "var(--ease-cinema)" }}
    >
      {/* Soft warm vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(245, 168, 91, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Material fragments entering */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Paper fragment (Lernio) — folds in from top-left */}
        <div
          className="absolute"
          style={{
            transform: phase >= 1 ? "translate(-18vw, -12vh) rotate(-8deg) scale(1)" : "translate(-60vw, -60vh) rotate(-40deg) scale(0.3)",
            opacity: phase >= 1 ? 1 : 0,
            transition: "transform 800ms var(--ease-cinema), opacity 600ms var(--ease-cinema)",
          }}
        >
          <div
            className="h-32 w-24 yg-paper rounded-sm shadow-lg"
            style={{ background: "linear-gradient(135deg, #f4ead4 0%, #ebdfc4 100%)", boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}
          >
            <div className="p-3 space-y-1.5">
              <div className="h-1 bg-[#1d1a14] opacity-70 w-3/4" />
              <div className="h-1 bg-[#1d1a14] opacity-50 w-full" />
              <div className="h-1 bg-[#1d1a14] opacity-50 w-5/6" />
              <div className="h-1 bg-[#e9b949] w-1/2 mt-2" />
            </div>
          </div>
        </div>

        {/* Voice waveform (B.R.A.C.E.) — refracts in from right */}
        <div
          className="absolute"
          style={{
            transform: phase >= 2 ? "translate(18vw, -8vh) scale(1)" : "translate(60vw, -60vh) scale(0.3)",
            opacity: phase >= 2 ? 1 : 0,
            transition: "transform 800ms var(--ease-cinema), opacity 600ms var(--ease-cinema)",
          }}
        >
          <div className="flex items-end gap-1 h-24" style={{ filter: "drop-shadow(0 0 12px rgba(122, 107, 209, 0.5))" }}>
            {[30, 60, 45, 80, 55, 90, 65, 40, 75, 50, 35, 70, 45, 60, 38, 52].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: "linear-gradient(180deg, #b8c0cc 0%, #7a6bd1 100%)",
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </div>

        {/* QR tile (CampusMate) — scans in from bottom-left */}
        <div
          className="absolute"
          style={{
            transform: phase >= 3 ? "translate(-16vw, 14vh) scale(1)" : "translate(-60vw, 60vh) scale(0.3)",
            opacity: phase >= 3 ? 1 : 0,
            transition: "transform 800ms var(--ease-cinema), opacity 600ms var(--ease-cinema)",
          }}
        >
          <div
            className="h-24 w-24 grid grid-cols-4 gap-0.5 p-2 rounded-sm"
            style={{ background: "#0e1b2c", boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}
          >
            {Array.from({ length: 16 }, (_, i) => {
              const on = (i * 7 + 13) % 17 % 3 === 0;
              return <div key={i} className="rounded-[1px]" style={{ background: on ? "#1f7ae0" : "transparent" }} />;
            })}
          </div>
        </div>

        {/* Yarn strand (Fakhri Mart) — flows in from bottom-right */}
        <div
          className="absolute"
          style={{
            transform: phase >= 3 ? "translate(16vw, 14vh) scale(1)" : "translate(60vw, 60vh) scale(0.3)",
            opacity: phase >= 3 ? 1 : 0,
            transition: "transform 800ms var(--ease-cinema), opacity 600ms var(--ease-cinema)",
          }}
        >
          <svg width="120" height="100" viewBox="0 0 120 100" style={{ filter: "drop-shadow(0 0 12px rgba(232, 148, 56, 0.5))" }}>
            <path
              d="M5 50 Q30 20 60 60 T115 50"
              stroke="#e89438"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M5 70 Q30 40 60 80 T115 70"
              stroke="#f1e4cf"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Name resolves in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="font-display text-display-lg leading-none text-center"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
            transition: "opacity 600ms var(--ease-cinema), transform 800ms var(--ease-cinema)",
            color: "var(--ink-bone)",
          }}
        >
          <span className="block">YASH</span>
          <span className="block" style={{ color: "var(--accent-warm)" }}>GANESH</span>
        </h1>
      </div>

      {/* Skip button */}
      <button
        onClick={skip}
        className="absolute bottom-6 right-6 flex items-center gap-2 font-mono text-meta text-[var(--ink-quiet)] hover:text-[var(--ink-bone)] transition-colors"
        aria-label="Skip intro"
      >
        <span>SKIP</span>
        <IconSkip size={12} />
      </button>
    </div>
  );
}
