"use client";

import { useEffect, useState } from "react";
import { usePuneTime, usePunePhase } from "@/hooks/use-pune-time";
import { useScrollProgress, useActiveSection, SECTIONS } from "@/hooks/use-active-section";
import { YGMark, IconLive } from "@/components/ui-yg/icons";

interface HUDProps {
  onOpenMenu: () => void;
}

/**
 * Y/G System HUD — fixed instrument frame.
 *
 * Top-left:  Y/G mark + studio
 * Top-right: Pune time + availability + Start a Project
 * Bottom:    Thin scroll progress
 * Left edge: Current section code (desktop only)
 */
export default function HUD({ onOpenMenu }: HUDProps) {
  const time = usePuneTime();
  const phase = usePunePhase();
  const progress = useScrollProgress();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeSection = SECTIONS.find((s) => s.id === active);

  return (
    <>
      {/* Top progress line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-px bg-transparent">
        <div
          className="h-full bg-[var(--signal-primary)]"
          style={{
            width: `${progress * 100}%`,
            boxShadow: "0 0 12px var(--signal-glow)",
            transition: "width 80ms linear",
          }}
        />
      </div>

      {/* Top-left mark + section code */}
      <header
        className={`fixed top-0 left-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{ transitionTimingFunction: "var(--ease-standard)" }}
      >
        <div className="flex items-center gap-3 px-5 md:px-8">
          <a
            href="#hero"
            className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--signal-primary)] transition-colors"
            aria-label="Y/G Systems Studio — home"
          >
            <YGMark size={26} />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-small font-semibold tracking-tight">
                Y/G
              </span>
              <span className="font-mono text-[0.6rem] text-[var(--text-muted)] tracking-[0.15em] uppercase">
                Systems Studio
              </span>
            </div>
          </a>

          {/* Section code — desktop only */}
          <div className="hidden md:flex items-center gap-2 ml-6 pl-6 border-l border-[var(--border-soft)]">
            <span className="font-mono text-meta text-[var(--text-muted)]">
              {activeSection?.code ?? "—"}
            </span>
            <span className="h-1 w-1 rounded-full bg-[var(--signal-primary)] yg-pulse" />
          </div>
        </div>
      </header>

      {/* Top-right — time + CTA + menu */}
      <header
        className={`fixed top-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{ transitionTimingFunction: "var(--ease-standard)" }}
      >
        <div className="flex items-center gap-4 px-5 md:px-8">
          {/* Time + availability — desktop only */}
          <div className="hidden md:flex items-center gap-4 font-mono text-meta text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] yg-pulse" />
              <span>AVAILABLE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)]">{time}</span>
              <span className="text-[var(--text-muted)]">PUNE</span>
            </div>
          </div>

          {/* Start a project — desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-1)] px-4 py-2 font-mono text-meta text-[var(--text-primary)] hover:border-[var(--signal-primary)] hover:bg-[var(--signal-soft)]/10 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--human-accent)]" />
            START A PROJECT
          </a>

          {/* Mobile menu button */}
          <button
            onClick={onOpenMenu}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="block h-px w-6 bg-[var(--text-primary)]" />
            <span className="block h-px w-6 bg-[var(--text-primary)]" />
            <span className="block h-px w-4 bg-[var(--text-primary)] self-end" />
          </button>
        </div>
      </header>

      {/* Left edge section indicator — desktop only */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
        {SECTIONS.filter((s) => s.id !== "boot").map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
            aria-label={s.label}
          >
            <span
              className={`h-px transition-all duration-300 ${
                active === s.id
                  ? "w-8 bg-[var(--signal-primary)]"
                  : "w-4 bg-[var(--border-strong)] group-hover:w-6 group-hover:bg-[var(--text-secondary)]"
              }`}
              style={{ transitionTimingFunction: "var(--ease-standard)" }}
            />
            <span
              className={`font-mono text-[0.6rem] tracking-[0.15em] uppercase transition-colors ${
                active === s.id
                  ? "text-[var(--signal-primary)]"
                  : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
              }`}
            >
              {s.code}
            </span>
          </a>
        ))}
      </div>

      {/* Bottom-left: phase + signal marker (desktop only) */}
      <div className="hidden md:flex fixed bottom-5 left-5 z-30 items-center gap-3 font-mono text-meta text-[var(--text-muted)]">
        <IconLive size={14} className="text-[var(--signal-primary)]" />
        <span>{phase || "Pune · India"}</span>
      </div>

      {/* Bottom-right: scroll progress percentage */}
      <div className="hidden md:flex fixed bottom-5 right-5 z-30 items-center gap-2 font-mono text-meta text-[var(--text-muted)]">
        <span>{String(Math.round(progress * 100)).padStart(3, "0")}</span>
        <span>%</span>
      </div>
    </>
  );
}
