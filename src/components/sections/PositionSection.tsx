"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Fragment {
  id: string;
  label: string;
  detail: string;
  /** Position on a normalized 0..1 canvas (desktop). */
  pos: { x: number; y: number };
  /** Final position when assembled. */
  final: { x: number; y: number };
}

const FRAGMENTS: Fragment[] = [
  {
    id: "prompt",
    label: "Prompt input",
    detail: "A single text box waiting for instructions",
    pos: { x: 0.05, y: 0.1 },
    final: { x: 0.04, y: 0.4 },
  },
  {
    id: "model",
    label: "Model response",
    detail: "One-shot reply, no context, no memory",
    pos: { x: 0.85, y: 0.05 },
    final: { x: 0.78, y: 0.4 },
  },
  {
    id: "api",
    label: "Floating API",
    detail: "Generic endpoint, no routing",
    pos: { x: 0.4, y: 0.85 },
    final: { x: 0.41, y: 0.4 },
  },
  {
    id: "db",
    label: "Disconnected DB",
    detail: "Data sitting outside the loop",
    pos: { x: 0.15, y: 0.78 },
    final: { x: 0.18, y: 0.7 },
  },
  {
    id: "chat",
    label: "Chatbot bubble",
    detail: "Stateless reply interface",
    pos: { x: 0.7, y: 0.8 },
    final: { x: 0.64, y: 0.7 },
  },
  {
    id: "card",
    label: "Random dashboard",
    detail: "Demo data, no real users",
    pos: { x: 0.92, y: 0.55 },
    final: { x: 0.88, y: 0.7 },
  },
];

const ASSEMBLY_STEPS = [
  { label: "User intent enters", detail: "Real problem, real workflow" },
  { label: "Workflow appears", detail: "Steps become visible" },
  { label: "Data & retrieval connect", detail: "Knowledge, not just prompts" },
  { label: "Memory connects", detail: "Context persists across sessions" },
  { label: "Model routing connects", detail: "Best model per task" },
  { label: "Guardrails appear", detail: "Edge cases handled" },
  { label: "Interface states align", detail: "Loading, error, success" },
  { label: "Edge cases visible", detail: "No silent failures" },
  { label: "Deployment & monitoring", detail: "Live, observed, improved" },
  { label: "Working product", detail: "Real value to real users" },
];

/**
 * Position section — "Not another AI wrapper. A working product."
 *
 * Scroll reveals disconnected AI fragments, then assembles them
 * into a complete working product. Desktop uses a pinned canvas;
 * mobile uses a vertical build-up list.
 */
export default function PositionSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 across the pinned phase

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // Pin region: from when section top hits viewport top to when its
        // bottom hits viewport bottom. Within that, 0 → 1 maps to assembly.
        const total = section.offsetHeight - vh;
        const scrolled = Math.max(0, -rect.top);
        const p = Math.max(0, Math.min(1, scrolled / total));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // 0..0.3 = show fragments scattered.
  // 0.3..0.85 = assemble (interpolate).
  // 0.85..1 = working product state.
  const assemblyP = Math.max(
    0,
    Math.min(1, (progress - 0.25) / 0.6)
  );
  const stepIdx = Math.min(
    ASSEMBLY_STEPS.length - 1,
    Math.floor(assemblyP * ASSEMBMY_STEPS_COUNT)
  );

  return (
    <section
      ref={sectionRef}
      id="position"
      className="relative w-full"
      style={{ minHeight: "240vh" }}
    >
      {/* Sticky canvas */}
      <div
        ref={containerRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col"
      >
        {/* Grid background */}
        <div className="absolute inset-0 yg-grid-bg opacity-25" />

        {/* Header strip */}
        <div className="relative z-20 px-5 md:px-8 pt-24 md:pt-28">
          <div className="flex items-center gap-3 font-mono text-meta text-[var(--text-muted)]">
            <span className="h-px w-8 bg-[var(--signal-primary)]" />
            <span>POSITION · 01</span>
          </div>
          <h2 className="mt-4 font-display text-h2 md:text-h1 max-w-[24ch]">
            Not another AI wrapper.
            <br />
            <span className="text-[var(--signal-primary)]">A working product.</span>
          </h2>
        </div>

        {/* Desktop: canvas with assembling fragments */}
        <div className="hidden md:block relative flex-1">
          <CanvasStage
            progress={assemblyP}
            reduced={reduced}
          />
        </div>

        {/* Mobile: vertical build-up */}
        <div className="md:hidden relative flex-1 overflow-y-auto yg-no-scrollbar px-5">
          <div className="flex flex-col gap-3 py-6">
            {ASSEMBLY_STEPS.map((s, i) => {
              const active = i <= stepIdx;
              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition-all duration-500 ${
                    active
                      ? "border-[var(--signal-primary)] bg-[var(--signal-soft)]/10"
                      : "border-[var(--border-soft)] bg-[var(--surface-1)]/40 opacity-50"
                  }`}
                >
                  <span className="font-mono text-meta text-[var(--text-muted)] mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-small text-[var(--text-primary)]">
                      {s.label}
                    </p>
                    <p className="text-meta text-[var(--text-muted)] mt-0.5">
                      {s.detail}
                    </p>
                  </div>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--signal-primary)] yg-pulse mt-1.5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: current step label + progress */}
        <div className="relative z-20 px-5 md:px-8 pb-10 md:pb-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-meta text-[var(--text-muted)]">
                {progress < 0.85 ? "ASSEMBLY IN PROGRESS" : "SYSTEM RESOLVED"}
              </p>
              <p className="font-display text-h3 mt-1 text-[var(--text-primary)]">
                {ASSEMBLY_STEPS[stepIdx].label}
              </p>
              <p className="text-body text-[var(--text-secondary)] mt-1">
                {ASSEMBLY_STEPS[stepIdx].detail}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 font-mono text-meta text-[var(--text-muted)]">
              <span>{String(stepIdx + 1).padStart(2, "0")} / {String(ASSEMBLY_STEPS.length).padStart(2, "0")}</span>
              <div className="h-px w-32 bg-[var(--border-strong)] relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--signal-primary)]"
                  style={{ width: `${((stepIdx + 1) / ASSEMBLY_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ASSEMBMY_STEPS_COUNT = 10; // matches ASSEMBLY_STEPS.length

/** Desktop canvas — fragments interpolate from scattered → assembled. */
function CanvasStage({
  progress,
  reduced,
}: {
  progress: number;
  reduced: boolean;
}) {
  // Use progress to position each fragment.
  return (
    <div className="absolute inset-0">
      {/* Connector lines between assembled fragments */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--signal-primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--signal-primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--signal-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {CONNECTORS.map(([a, b], i) => {
          const fa = FRAGMENTS.find((f) => f.id === a)!;
          const fb = FRAGMENTS.find((f) => f.id === b)!;
          const ax = lerp(fa.pos.x, fa.final.x, progress) * 100;
          const ay = lerp(fa.pos.y, fa.final.y, progress) * 100;
          const bx = lerp(fb.pos.x, fb.final.x, progress) * 100;
          const by = lerp(fb.pos.y, fb.final.y, progress) * 100;
          const visible = progress > 0.3 ? Math.min(1, (progress - 0.3) * 2) : 0;
          return (
            <line
              key={i}
              x1={`${ax}%`}
              y1={`${ay}%`}
              x2={`${bx}%`}
              y2={`${by}%`}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              opacity={visible}
            />
          );
        })}
      </svg>

      {/* Fragments */}
      {FRAGMENTS.map((f) => {
        const x = lerp(f.pos.x, f.final.x, progress) * 100;
        const y = lerp(f.pos.y, f.final.y, progress) * 100;
        const connected = progress > 0.5;
        const rotation = reduced ? 0 : (1 - progress) * (f.id.charCodeAt(0) % 2 === 0 ? 6 : -6);
        return (
          <div
            key={f.id}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              transition: reduced ? "none" : "transform 200ms var(--ease-standard)",
            }}
          >
            <div
              className={`px-3 py-2 rounded-md border font-mono text-meta ${
                connected
                  ? "border-[var(--signal-primary)] bg-[var(--signal-soft)]/15 text-[var(--text-primary)]"
                  : "border-[var(--border-strong)] bg-[var(--surface-1)]/60 text-[var(--text-muted)]"
              }`}
              style={{
                boxShadow: connected ? "0 0 16px var(--signal-glow)" : "none",
                transition: "all 400ms var(--ease-standard)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    connected ? "bg-[var(--signal-primary)] yg-pulse" : "bg-[var(--text-muted)]"
                  }`}
                />
                {f.label}
              </div>
              {connected && (
                <p className="text-[0.65rem] text-[var(--text-secondary)] mt-1">
                  {f.detail}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Center "working product" label appears at the end */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{
          opacity: progress > 0.85 ? Math.min(1, (progress - 0.85) * 6) : 0,
          transition: "opacity 400ms",
        }}
      >
        <p className="font-display text-h3 text-[var(--human-accent)] yg-glow-human">
          WORKING PRODUCT
        </p>
        <p className="font-mono text-meta text-[var(--text-muted)] mt-2">
          Real value · Real users · Real improvement
        </p>
      </div>
    </div>
  );
}

const CONNECTORS: [string, string][] = [
  ["prompt", "model"],
  ["prompt", "api"],
  ["api", "db"],
  ["api", "chat"],
  ["chat", "card"],
  ["model", "chat"],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}
