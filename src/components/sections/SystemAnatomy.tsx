"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SYSTEM_STATES } from "@/data/projects";
import {
  IconObserve,
  IconStructure,
  IconEngineer,
  IconEvolve,
} from "@/components/ui-yg/icons";

const ICONS = {
  observe: IconObserve,
  structure: IconStructure,
  engineer: IconEngineer,
  evolve: IconEvolve,
};

/**
 * System Anatomy — Observe → Structure → Engineer → Evolve.
 *
 * One continuously transforming scene. On desktop the four states
 * share a single canvas; scroll scrubs the transformation.
 * On mobile: vertical chapter stack with tap-to-expand.
 */
export default function SystemAnatomy() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 across pinned region

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = section.offsetHeight - vh;
        const scrolled = Math.max(0, -rect.top);
        const p = Math.max(0, Math.min(1, scrolled / total));
        setProgress(p);
        const idx = Math.min(
          SYSTEM_STATES.length - 1,
          Math.floor(p * SYSTEM_STATES.length)
        );
        setActiveIdx(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="anatomy"
      className="relative w-full"
      style={{ minHeight: "320vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 yg-grid-bg opacity-20" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(107,91,255,0.05) 0%, transparent 60%)",
          }}
        />

        {/* Header */}
        <div className="relative z-20 px-5 md:px-8 pt-24 md:pt-28">
          <div className="flex items-center gap-3 font-mono text-meta text-[var(--text-muted)]">
            <span className="h-px w-8 bg-[var(--signal-primary)]" />
            <span>SYSTEM ANATOMY · 02</span>
          </div>
          <h2 className="mt-4 font-display text-h2 md:text-h1 max-w-[20ch]">
            Observe → Structure → Engineer →{" "}
            <span className="text-[var(--signal-primary)]">Evolve</span>
          </h2>
        </div>

        {/* Stage */}
        <div className="relative flex-1 flex items-center">
          {/* Desktop: shared transformation canvas */}
          <div className="hidden md:block absolute inset-0">
            <AnatomyCanvas progress={progress} reduced={reduced} activeIdx={activeIdx} />
          </div>

          {/* Mobile: state list */}
          <div className="md:hidden relative w-full px-5 flex flex-col gap-3">
            {SYSTEM_STATES.map((s, i) => {
              const Icon = ICONS[s.key];
              const active = i === activeIdx;
              return (
                <div
                  key={s.key}
                  className={`rounded-lg border p-4 transition-all duration-500 ${
                    active
                      ? "border-[var(--signal-primary)] bg-[var(--signal-soft)]/10"
                      : "border-[var(--border-soft)] bg-[var(--surface-1)]/40 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={active ? "text-[var(--signal-primary)]" : "text-[var(--text-muted)]"} />
                    <span className="font-mono text-meta text-[var(--text-muted)]">
                      0{i + 1} / 04
                    </span>
                    <span className="font-display text-h3 text-[var(--text-primary)]">
                      {s.label}
                    </span>
                  </div>
                  {active && (
                    <div className="mt-3 space-y-1">
                      <p className="text-small text-[var(--text-secondary)]">{s.visual}</p>
                      {s.copy.map((c, j) => (
                        <p key={j} className="text-small text-[var(--text-muted)]">
                          {c}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom progress + state pills */}
        <div className="relative z-20 px-5 md:px-8 pb-10 md:pb-12">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              {SYSTEM_STATES.map((s, i) => {
                const active = i === activeIdx;
                return (
                  <div
                    key={s.key}
                    className="flex items-center gap-2"
                  >
                    <button
                      onClick={() => {
                        const section = sectionRef.current;
                        if (!section) return;
                        const target = section.offsetTop + (i / SYSTEM_STATES.length) * (section.offsetHeight - window.innerHeight) + 8;
                        window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
                      }}
                      className={`px-3 py-1.5 rounded-full font-mono text-meta transition-colors ${
                        active
                          ? "bg-[var(--signal-primary)] text-[#0a0a0f]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {s.short}
                    </button>
                    {i < SYSTEM_STATES.length - 1 && (
                      <span className="text-[var(--text-muted)]">/</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="hidden md:flex items-center gap-3 font-mono text-meta text-[var(--text-muted)]">
              <span>{String(activeIdx + 1).padStart(2, "0")} / 04</span>
              <div className="h-px w-32 bg-[var(--border-strong)] relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--signal-primary)]"
                  style={{ width: `${((activeIdx + 1) / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Desktop transformation canvas — shared scene that morphs across 4 states. */
function AnatomyCanvas({
  progress,
  reduced,
  activeIdx,
}: {
  progress: number;
  reduced: boolean;
  activeIdx: number;
}) {
  // The canvas shows a central field of nodes + flows + layers.
  // As progress changes, structure solidifies, layers activate,
  // and feedback pulses back.

  const nodes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const r = 0.18 + (i % 3) * 0.04;
    return {
      x: 0.5 + Math.cos(angle) * r,
      y: 0.5 + Math.sin(angle) * r * 0.85,
      id: i,
    };
  });

  // Layer activation thresholds:
  //  - observe (0..0.25): scattered, dim
  //  - structure (0.25..0.5): aligned, lit
  //  - engineer (0.5..0.75): layers active
  //  - evolve (0.75..1): feedback pulse
  const aligned = Math.max(0, Math.min(1, (progress - 0.15) / 0.2));
  const layered = Math.max(0, Math.min(1, (progress - 0.4) / 0.2));
  const feedback = Math.max(0, Math.min(1, (progress - 0.7) / 0.25));

  return (
    <div className="absolute inset-0">
      {/* Layer ribbons — appear during Engineer */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "30%",
          height: "1px",
          background: "var(--signal-primary)",
          opacity: layered * 0.6,
          transition: "opacity 300ms",
        }}
      >
        <span className="absolute right-4 -top-4 font-mono text-meta text-[var(--text-muted)]">
          INTERFACE LAYER
        </span>
      </div>
      <div
        className="absolute inset-x-0"
        style={{
          top: "45%",
          height: "1px",
          background: "var(--signal-primary)",
          opacity: layered * 0.5,
          transition: "opacity 300ms",
        }}
      >
        <span className="absolute right-4 -top-4 font-mono text-meta text-[var(--text-muted)]">
          APPLICATION LAYER
        </span>
      </div>
      <div
        className="absolute inset-x-0"
        style={{
          top: "60%",
          height: "1px",
          background: "var(--signal-primary)",
          opacity: layered * 0.4,
          transition: "opacity 300ms",
        }}
      >
        <span className="absolute right-4 -top-4 font-mono text-meta text-[var(--text-muted)]">
          INTELLIGENCE LAYER
        </span>
      </div>
      <div
        className="absolute inset-x-0"
        style={{
          top: "75%",
          height: "1px",
          background: "var(--signal-primary)",
          opacity: layered * 0.3,
          transition: "opacity 300ms",
        }}
      >
        <span className="absolute right-4 -top-4 font-mono text-meta text-[var(--text-muted)]">
          DATA LAYER
        </span>
      </div>

      {/* SVG canvas with nodes and flows */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Flow lines — appear progressively during Structure */}
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length];
          const opacity = aligned * 0.5;
          return (
            <line
              key={`flow-${i}`}
              x1={n.x * 100}
              y1={n.y * 100}
              x2={next.x * 100}
              y2={next.y * 100}
              stroke="var(--signal-primary)"
              strokeWidth="0.1"
              opacity={opacity}
            />
          );
        })}

        {/* Feedback pulse — during Evolve */}
        {feedback > 0 && (
          <circle
            cx="50"
            cy="50"
            r={4 + feedback * 30}
            fill="none"
            stroke="var(--human-accent)"
            strokeWidth="0.15"
            opacity={1 - feedback}
            style={{ transition: "r 100ms linear" }}
          />
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((n, i) => {
        const lit = aligned > (i / 24);
        return (
          <div
            key={`node-${i}`}
            className="absolute"
            style={{
              left: `${n.x * 100}%`,
              top: `${n.y * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`rounded-full ${
                lit
                  ? "bg-[var(--signal-primary)]"
                  : "bg-[var(--text-muted)] opacity-40"
              }`}
              style={{
                width: lit ? "6px" : "4px",
                height: lit ? "6px" : "4px",
                boxShadow: lit ? "0 0 8px var(--signal-glow)" : "none",
                transition: "all 300ms var(--ease-standard)",
              }}
            />
          </div>
        );
      })}

      {/* Center "human" node — pulses during Evolve */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`rounded-full bg-[var(--human-accent)] ${
            !reduced && feedback > 0 ? "yg-pulse" : ""
          }`}
          style={{
            width: "12px",
            height: "12px",
            boxShadow: "0 0 16px var(--human-glow)",
          }}
        />
        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 font-mono text-meta text-[var(--human-accent)] whitespace-nowrap">
          HUMAN
        </span>
      </div>

      {/* State label — large ghosted text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <span
          className="font-display text-[12vw] font-bold leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px var(--border-strong)",
            opacity: 0.4,
          }}
        >
          {SYSTEM_STATES[activeIdx].label.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
