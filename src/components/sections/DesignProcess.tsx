"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/data/projects";

/**
 * Design Process — the studio table / project wall.
 *
 * Shows how one idea evolves from raw observation through to
 * deployed and improved. As the visitor scrolls, the wall visually
 * reorganizes from messy exploration into a polished product.
 */
export default function DesignProcess() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = el.offsetHeight - vh;
        const scrolled = Math.max(0, -rect.top);
        setProgress(Math.max(0, Math.min(1, scrolled / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Visual state — early steps messy/organic, later steps structured.
  const messy = Math.max(0, 1 - progress * 1.4); // 1 -> 0 over first 70%
  const polished = Math.max(0, Math.min(1, (progress - 0.3) / 0.6));

  return (
    <section
      ref={ref}
      id="process"
      className="relative w-full py-24 md:py-32"
      style={{ minHeight: "200vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 yg-grid-subtle opacity-30" />

        {/* Header */}
        <div className="relative z-20 max-w-[1500px] mx-auto px-5 md:px-10 pt-24 md:pt-28 w-full">
          <div className="font-mono text-meta text-[var(--ink-quiet)] mb-3">
            <span className="text-[var(--accent-warm)]">●</span> Design Process · Studio Table
          </div>
          <h2 className="font-display text-h1 md:text-display max-w-[16ch]">
            From messy idea to polished product.
          </h2>
          <p className="mt-4 max-w-[50ch] text-body text-[var(--ink-soft)]">
            The process balances creative exploration and serious engineering. Each step hands off to the next, and the wall reorganizes from scattered notes into a shipped product.
          </p>
        </div>

        {/* Process wall */}
        <div className="relative flex-1 max-w-[1500px] mx-auto px-5 md:px-10 w-full flex items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 w-full">
            {PROCESS_STEPS.map((step, i) => {
              // Steps reveal progressively as scroll progresses.
              const revealAt = i / PROCESS_STEPS.length;
              const isRevealed = progress > revealAt - 0.08;
              const isFocused = Math.abs(progress - revealAt) < 0.1;

              const kindColors: Record<string, string> = {
                observe: "#e89438",
                design: "#7a6bd1",
                engineer: "#1f7ae0",
                ship: "#2ba87a",
              };
              const color = kindColors[step.kind];

              return (
                <div
                  key={step.step}
                  className="relative rounded-md border p-3 md:p-4 transition-all duration-700"
                  style={{
                    borderColor: isRevealed ? color : "var(--border-soft)",
                    background: isRevealed
                      ? `linear-gradient(135deg, ${color}10 0%, transparent 100%)`
                      : "var(--surface-deep)",
                    opacity: isRevealed ? 1 : 0.3,
                    transform: `translateY(${isRevealed ? 0 : 20}px) rotate(${messy * (i % 2 === 0 ? -2 : 2)}deg)`,
                    boxShadow: isFocused ? `0 0 24px ${color}30` : "none",
                    transitionTimingFunction: "var(--ease-cinema)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="font-mono text-meta"
                      style={{ color }}
                    >
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: color, opacity: isRevealed ? 1 : 0.3 }}
                    />
                  </div>
                  <p className="font-display text-small md:text-body text-[var(--ink-bone)] leading-tight">
                    {step.label}
                  </p>
                  <p className="font-mono text-[0.6rem] text-[var(--ink-quiet)] mt-1 leading-snug hidden md:block">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom progress + state */}
        <div className="relative z-20 max-w-[1500px] mx-auto px-5 md:px-10 pb-10 md:pb-12 w-full">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div>
              <p className="font-mono text-meta text-[var(--ink-quiet)] mb-1">
                {progress < 0.5 ? "EXPLORATION" : progress < 0.85 ? "ENGINEERING" : "DEPLOYED"}
              </p>
              <p className="font-display text-h3 text-[var(--ink-bone)]">
                {progress < 0.3
                  ? "Observing the real workflow."
                  : progress < 0.6
                  ? "Designing clarity before decoration."
                  : progress < 0.85
                  ? "Building the complete loop."
                  : "Shipped. Improving from real use."}
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-meta text-[var(--ink-quiet)]">
              <span>{String(Math.round(progress * 100)).padStart(2, "0")}%</span>
              <div className="h-px w-32 bg-[var(--border-strong)] relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--accent-warm)]"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
