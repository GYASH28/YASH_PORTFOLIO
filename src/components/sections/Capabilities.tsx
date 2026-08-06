"use client";

import Link from "next/link";
import { CAPABILITIES, TECH_LAYERS } from "@/data/projects";
import { IconArrowRight } from "@/components/ui-yg/icons";

/**
 * Capabilities — connected forms of work, not skill bars.
 *
 * Four capability groups, each with a real project example.
 */
export default function Capabilities() {
  return (
    <section id="capabilities" className="relative w-full py-24 md:py-32">
      <div className="absolute inset-0 yg-grid-subtle opacity-30" />
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="font-mono text-meta text-[var(--ink-quiet)] mb-3">
            <span className="text-[var(--accent-warm)]">●</span> Capabilities · Four Forms of Work
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-h1 max-w-[18ch]">
              Design, frontend, AI, and full delivery.
            </h2>
            <p className="max-w-[36ch] text-body text-[var(--ink-soft)]">
              Not skill bars. Four connected forms of work — each proven by a real project.
            </p>
          </div>
        </div>

        {/* Capability groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {CAPABILITIES.map((cap) => {
            const colors: Record<string, string> = {
              design: "#e89438",
              frontend: "#7a6bd1",
              ai: "#1f7ae0",
              delivery: "#2ba87a",
            };
            const color = colors[cap.key];

            return (
              <div
                key={cap.key}
                className="group relative rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)] p-6 md:p-8 hover:border-[var(--border-strong)] transition-colors yg-lift"
              >
                {/* Index + label header */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display text-display text-[var(--ink-faint)] opacity-50">
                    0{cap.index}
                  </span>
                  <div>
                    <p className="font-mono text-meta mb-1" style={{ color }}>
                      {cap.key.toUpperCase()}
                    </p>
                    <h3 className="font-display text-h2 text-[var(--ink-bone)]">
                      {cap.label}
                    </h3>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-body text-[var(--ink-soft)] mb-5">
                  {cap.summary}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cap.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-meta text-[var(--ink-quiet)] px-2 py-1 rounded border border-[var(--border-soft)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Real example */}
                <Link
                  href={`/work/${cap.projectRef}`}
                  className="group/ex inline-flex items-center gap-2 pt-4 border-t border-[var(--border-soft)] text-small text-[var(--ink-bone)] hover:text-[var(--accent-warm)] transition-colors"
                >
                  <span className="font-mono text-meta text-[var(--ink-quiet)]">PROOF ·</span>
                  <span className="font-serif italic">{cap.realExample}</span>
                  <IconArrowRight size={12} className="group-hover/ex:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Tech layers */}
        <div className="mt-20">
          <div className="font-mono text-meta text-[var(--ink-quiet)] mb-6">
            <span className="text-[var(--accent-warm)]">●</span> Technology · Grouped by System Layer
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {TECH_LAYERS.map((layer) => (
              <div
                key={layer.layer}
                className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-4"
              >
                <p className="font-mono text-meta text-[var(--accent-warm)] mb-3">
                  {layer.layer}
                </p>
                <ul className="space-y-1">
                  {layer.tools.map((t) => (
                    <li key={t} className="text-small text-[var(--ink-soft)]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
