"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { PROFILE } from "@/data/projects";
import { IconArrowRight, IconArrowDown, IconLocation } from "@/components/ui-yg/icons";

const ProjectSculpture = lazy(() => import("@/components/webgl/ProjectSculpture"));

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

function useWebGLAvailable() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setOk(!!gl);
    } catch { setOk(false); }
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
      {/* Background — warm vignette, subtle grid */}
      <div className="absolute inset-0 yg-grid-subtle opacity-50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245, 168, 91, 0.05) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 80% 30%, rgba(122, 107, 209, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* WebGL Project Sculpture */}
      {mounted && webglOk && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<SculptureFallback />}>
            <ProjectSculpture
              pointer={pointer}
              reducedMotion={reduced}
              isMobile={isMobile}
            />
          </Suspense>
        </div>
      )}

      {/* Scrim to ensure text legibility */}
      <div className="absolute inset-0 z-10 pointer-events-none yg-scrim-top opacity-50" />
      <div className="absolute inset-0 z-10 pointer-events-none yg-scrim-bottom opacity-50" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1500px] mx-auto px-5 md:px-10 pt-28 pb-32 md:pt-32">
        {/* Top metadata */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-meta text-[var(--ink-quiet)] mb-10 md:mb-14">
          <span className="text-[var(--accent-warm)]">{PROFILE.role}</span>
          <span className="hidden sm:inline text-[var(--ink-faint)]">·</span>
          <span className="text-[var(--ink-quiet)]">{PROFILE.location}</span>
          <span className="hidden sm:inline text-[var(--ink-faint)]">·</span>
          <span className="text-[var(--ink-quiet)]">Available for selective collaborations</span>
        </div>

        {/* Primary statement — oversized typography */}
        <h1 className="font-display text-display-xl max-w-[14ch]">
          <span className="block">I design</span>
          <span className="block">
            <span className="font-serif italic font-normal text-[var(--ink-soft)]">digital</span>{" "}
            worlds—
          </span>
          <span className="block">
            and engineer them into{" "}
            <span className="text-[var(--accent-warm)]">real products</span>.
          </span>
        </h1>

        {/* Supporting copy */}
        <p className="mt-8 max-w-[58ch] text-lead text-[var(--ink-soft)]">
          {PROFILE.supporting}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/#work"
            data-cursor="Explore"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink-bone)] text-[var(--bg-base)] px-7 py-4 font-mono text-meta hover:bg-[var(--accent-warm)] transition-colors yg-press"
          >
            Explore the Work
            <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/#contact"
            data-cursor="Contact"
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-7 py-4 font-mono text-meta text-[var(--ink-bone)] hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] transition-colors yg-press"
          >
            Start a Project
            <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bottom row: status line */}
        <div className="mt-20 md:mt-28 flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
          <div className="flex items-center gap-2 font-mono text-meta text-[var(--ink-quiet)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)] yg-pulse" />
            <span>Currently building Lernio AI · B.R.A.C.E.</span>
          </div>
          <div className="md:ml-auto font-serif italic text-body-lg text-[var(--ink-soft)] max-w-[36ch]">
            “{PROFILE.secondaryLine}”
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <Link
        href="/#work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 font-mono text-meta text-[var(--ink-quiet)] hover:text-[var(--accent-warm)] transition-colors"
        aria-label="Scroll to explore work"
      >
        <span>SCROLL</span>
        <IconArrowDown size={12} className="yg-pulse" />
      </Link>
    </section>
  );
}

function SculptureFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-64 w-64 md:h-96 md:w-96">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 168, 91, 0.18) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-1/4 rounded-full border border-[var(--accent-warm)] opacity-50" />
        <div className="absolute inset-1/2 rounded-full bg-[var(--accent-warm)] yg-pulse" />
      </div>
    </div>
  );
}
