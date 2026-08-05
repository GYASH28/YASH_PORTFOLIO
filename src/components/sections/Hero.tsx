"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { IDENTITY } from "@/data/projects";
import {
  IconArrowRight,
  IconArrowDown,
  IconLocation,
  IconAvailability,
} from "@/components/ui-yg/icons";

const SignalCore = lazy(() => import("@/components/webgl/SignalCore"));

/** Mobile detection — used to scale WebGL cost. */
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setM(mq.matches);
    const handler = (e: MediaQueryListEvent) => setM(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return m;
}

/** WebGL capability detection. */
function useWebGLAvailable() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setOk(!!gl);
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

export default function Hero() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const webglOk = useWebGLAvailable();
  const pointer = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
    >
      {/* Background grid + radial vignette */}
      <div className="absolute inset-0 yg-grid-bg opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,91,255,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(255,182,114,0.04) 0%, transparent 60%)",
        }}
      />

      {/* WebGL Signal Core */}
      {mounted && webglOk && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<SignalCoreFallback />}>
            <SignalCore
              pointer={pointer}
              reducedMotion={reduced}
              isMobile={isMobile}
            />
          </Suspense>
        </div>
      )}

      {/* Scrim to ensure text contrast over WebGL */}
      <div className="absolute inset-0 z-10 pointer-events-none yg-scrim-top opacity-60" />
      <div className="absolute inset-0 z-10 pointer-events-none yg-scrim-bottom opacity-40" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-5 md:px-8 pt-24 pb-32 md:pt-32">
        {/* Top metadata strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-meta text-[var(--text-muted)] mb-8 md:mb-12">
          <span className="text-[var(--signal-primary)]">Y/G SYSTEMS STUDIO</span>
          <span className="hidden sm:inline">·</span>
          <span>PRODUCT ENGINEERING · AI SYSTEMS · INTERACTION</span>
        </div>

        {/* Main statement */}
        <h1 className="font-display text-display-1 max-w-[16ch]">
          <span className="block">A Human Signal</span>
          <span className="block">
            <span className="text-[var(--text-muted)]">Inside the</span>{" "}
            <span
              className="text-[var(--signal-primary)] yg-glow-text"
              style={{ fontStyle: "normal" }}
            >
              Machine
            </span>
            <span className="yg-blink ml-2 text-[var(--human-accent)]">▍</span>
          </span>
        </h1>

        {/* Supporting line */}
        <p className="mt-8 max-w-[60ch] text-body-lg text-[var(--text-secondary)]">
          {IDENTITY.name} — {IDENTITY.role}. I turn ambitious ideas into{" "}
          <span className="text-[var(--text-primary)]">real, working products</span>{" "}
          end to end: product strategy, experience design, AI implementation,
          and full-stack delivery. From Pune, India.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#systems"
            data-cursor="EXPLORE"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--signal-primary)] px-7 py-4 font-mono text-meta text-[#0a0a0f] hover:bg-[var(--signal-soft)] transition-colors"
          >
            EXPLORE SELECTED SYSTEMS
            <IconArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#contact"
            data-cursor="CONTACT"
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-7 py-4 font-mono text-meta text-[var(--text-primary)] hover:border-[var(--signal-primary)] hover:bg-[var(--signal-soft)]/10 transition-colors"
          >
            START A PROJECT
            <IconArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Meta — location, availability, philosophy */}
        <div className="mt-16 md:mt-24 flex flex-col gap-4 md:flex-row md:items-end md:gap-12">
          <div className="flex items-center gap-2 font-mono text-meta text-[var(--text-secondary)]">
            <IconLocation size={14} className="text-[var(--signal-primary)] flex-shrink-0" />
            <span>{IDENTITY.location}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-meta text-[var(--text-secondary)]">
            <IconAvailability size={14} className="text-[var(--signal-primary)] flex-shrink-0" />
            <span>{IDENTITY.available}</span>
          </div>
          <div className="md:ml-auto max-w-[28ch] font-mono text-meta text-[var(--text-muted)] md:text-right border-t border-[var(--border-soft)] pt-4 md:border-t-0 md:pt-0">
            <span className="text-[var(--human-accent)]">“</span>
            {IDENTITY.philosophy}
            <span className="text-[var(--human-accent)]">”</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#position"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 font-mono text-meta text-[var(--text-muted)] hover:text-[var(--signal-primary)] transition-colors"
        aria-label="Scroll to begin"
      >
        <span>SCROLL</span>
        <IconArrowDown size={14} className="yg-pulse" />
      </a>

      {/* Corner telemetry — desktop only */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-8 z-30 font-mono text-meta text-[var(--text-muted)]">
        <div className="flex flex-col gap-1 text-right">
          <span>SIGNAL · 47.3 Hz</span>
          <span className="text-[var(--signal-primary)]">CORE · ACTIVE</span>
          <span>NODES · {isMobile ? "14" : "28"}</span>
        </div>
      </div>
    </section>
  );
}

/** Fallback poster if WebGL is unavailable. */
function SignalCoreFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-64 w-64 md:h-96 md:w-96">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(107,91,255,0.2) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-1/4 rounded-full border border-[var(--signal-primary)] yg-pulse-slow" />
        <div className="absolute inset-1/3 rounded-full border border-[var(--human-accent)] opacity-60" />
        <div className="absolute inset-1/2 rounded-full bg-[var(--human-accent)] yg-pulse" />
      </div>
    </div>
  );
}
