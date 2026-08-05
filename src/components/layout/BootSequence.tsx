"use client";

import { useEffect, useRef, useState } from "react";
import { useBootSession } from "@/hooks/use-boot-session";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { IconSkip } from "@/components/ui-yg/icons";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  { label: "SIGNAL_BOOT.log", delay: 200 },
  { label: "HUMAN_INPUT DETECTED", delay: 350 },
  { label: "STRUCTURE MAP ONLINE", delay: 300 },
  { label: "BUILD CORE READY", delay: 350 },
  { label: "OBSERVE → QUESTION → BUILD → IMPROVE", delay: 400 },
  { label: "Y/G SYSTEM ACTIVE", delay: 300 },
] as const;

const FINAL_STATUS = "SYSTEM READY";

/**
 * SIGNAL_BOOT — a 2-3s opening sequence.
 *
 * Sequence:
 *  1. Near darkness + warm pulse
 *  2. Pulse emits a signal line
 *  3. Signal scans a grid
 *  4. Nodes light in sequence
 *  5. Y/G geometry assembles
 *  6. System states appear
 *  7. Status: SYSTEM READY
 *  8. Reveal hero
 *
 * Reduced-motion: short opacity transition only.
 * Repeat visit (same session): shorter intro.
 */
export default function BootSequence({ onComplete }: BootSequenceProps) {
  const reduced = useReducedMotion();
  const { played, markPlayed } = useBootSession();
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  const completed = useRef(false);

  // If repeat visit OR reduced motion — short version.
  const steps = played || reduced ? BOOT_STEPS.slice(0, 3) : BOOT_STEPS;
  const totalDuration = steps.reduce((acc, s) => acc + s.delay, 0) + (reduced ? 200 : 500);

  useEffect(() => {
    if (completed.current) return;
    let acc = 0;
    const timers: number[] = [];
    steps.forEach((s, i) => {
      acc += s.delay;
      timers.push(
        window.setTimeout(() => setStep(i + 1), acc)
      );
    });
    timers.push(
      window.setTimeout(() => setClosing(true), totalDuration)
    );
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

  // Esc / Space / Enter also skips.
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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)] transition-opacity duration-700 ${
        closing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionTimingFunction: "var(--ease-enter)" }}
    >
      {/* Grid scan */}
      <div className="absolute inset-0 yg-grid-bg opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(107,91,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Center assembly */}
      <div className="relative flex flex-col items-center gap-8 px-6">
        {/* Y/G geometry assembling */}
        <div className="relative h-32 w-32">
          <svg
            viewBox="0 0 128 128"
            className="absolute inset-0"
            style={{ filter: "drop-shadow(0 0 12px var(--signal-glow))" }}
          >
            {/* Y */}
            <path
              d="M24 28l40 30 40-30"
              stroke="var(--signal-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="yg-line-draw"
              style={{ pathLength: 1 }}
            />
            <path
              d="M64 58v44"
              stroke="var(--signal-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity={step >= 2 ? 0.7 : 0}
              style={{ transition: "opacity 400ms" }}
            />
            {/* G */}
            <path
              d="M88 80a24 24 0 11-16-40 24 24 0 0120 12"
              stroke="var(--signal-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity={step >= 3 ? 1 : 0}
              style={{ transition: "opacity 400ms" }}
            />
            <path
              d="M88 52v12h-12"
              stroke="var(--signal-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity={step >= 3 ? 1 : 0}
              style={{ transition: "opacity 400ms" }}
            />
            {/* Human pulse node */}
            <circle
              cx="64"
              cy="58"
              r="3"
              fill="var(--human-accent)"
              className={step >= 4 ? "yg-pulse" : ""}
              opacity={step >= 4 ? 1 : 0}
              style={{ transition: "opacity 400ms" }}
            />
          </svg>
        </div>

        {/* Log lines */}
        <div className="min-h-[8rem] flex flex-col items-center gap-2 font-mono text-small text-[var(--text-muted)]">
          {steps.slice(0, step).map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 opacity-0"
              style={{
                animation: `yg-fade-up 400ms var(--ease-enter) forwards`,
                animationDelay: `${i * 30}ms`,
              }}
            >
              <span className="text-[var(--signal-primary)]">▸</span>
              <span>{s.label}</span>
            </div>
          ))}
          {step >= steps.length && (
            <div className="mt-2 flex items-center gap-2 text-[var(--human-accent)] font-mono">
              <span className="yg-pulse-slow">●</span>
              <span className="text-meta">{FINAL_STATUS}</span>
            </div>
          )}
        </div>
      </div>

      {/* Skip control */}
      <button
        onClick={skip}
        className="absolute bottom-6 right-6 flex items-center gap-2 font-mono text-meta text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Skip intro"
      >
        <span>SKIP INTRO</span>
        <IconSkip size={14} />
      </button>

      {/* Keyframe styles */}
      <style>{`
        @keyframes yg-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
