"use client";

import Link from "next/link";
import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { IconArrowRight } from "@/components/ui-yg/icons";

/**
 * Immediate Design Reel
 *
 * Fast visual proof section right after the hero.
 * Shows project fragments in a horizontal film-strip with hover-to-pause.
 * Click directly into a project.
 */
export default function DesignReel() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Duplicate the projects array so the marquee loops seamlessly.
  const reel = [...PROJECTS, ...PROJECTS];

  return (
    <section id="reel" className="relative w-full py-20 md:py-28 overflow-hidden border-y border-[var(--border-soft)]">
      {/* Section header */}
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 mb-12 md:mb-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-mono text-meta text-[var(--ink-quiet)] mb-3">
              <span className="text-[var(--accent-warm)]">●</span> Design Reel
            </div>
            <h2 className="font-display text-h1 max-w-[20ch]">
              A quick look at the work.
            </h2>
          </div>
          <p className="max-w-[36ch] text-body text-[var(--ink-soft)]">
            Real fragments from four real projects. Click any frame to step into the full case study.
          </p>
        </div>
      </div>

      {/* Marquee reel — pauses on hover */}
      <div
        className="relative"
        onMouseEnter={() => setHovered(-1)}
        onMouseLeave={() => setHovered(null)}
      >
        <div
          className="flex gap-4 px-5 md:px-10"
          style={{
            animation: "yg-marquee 60s linear infinite",
            animationPlayState: hovered !== null ? "paused" : "running",
          }}
        >
          {reel.map((p, i) => (
            <Link
              key={`${p.slug}-${i}`}
              href={`/work/${p.slug}`}
              data-cursor="View"
              className="group relative flex-shrink-0 w-[280px] md:w-[380px] aspect-[4/5] rounded-md overflow-hidden border border-[var(--border-soft)] hover:border-[var(--accent-warm)] transition-colors"
            >
              {/* Project-specific background */}
              <ProjectFragment slug={p.slug} accent={p.accent} world={p.world} />

              {/* Caption strip */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent">
                <div className="font-mono text-meta text-[var(--ink-quiet)] mb-1">
                  0{p.index} · {p.category}
                </div>
                <h3 className="font-display text-h3 text-[var(--ink-bone)] group-hover:text-[var(--accent-warm)] transition-colors">
                  {p.name}
                </h3>
              </div>

              {/* Hover overlay */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <IconArrowRight size={16} className="text-[var(--ink-bone)]" />
              </div>
            </Link>
          ))}
        </div>

        {/* Edge scrims */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 yg-scrim-left pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 yg-scrim-right pointer-events-none z-10" />
      </div>

      <style>{`
        @keyframes yg-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 0.5rem)); }
        }
      `}</style>
    </section>
  );
}

/** Per-project fragment — distinct visual language. */
function ProjectFragment({
  slug,
  accent,
  world,
}: {
  slug: string;
  accent: string;
  world: string;
}) {
  return (
    <div
      className="absolute inset-0"
      data-project={slug}
      style={{ background: "var(--project-bg)" }}
    >
      {/* Lernio — paper texture with lesson nodes */}
      {slug === "lernio" && (
        <div className="absolute inset-0 yg-paper">
          <div className="absolute inset-6 flex flex-col gap-2">
            <div className="h-1 w-3/4" style={{ background: accent }} />
            <div className="h-1 w-full bg-[var(--lernio-ivory)] opacity-50" />
            <div className="h-1 w-5/6 bg-[var(--lernio-ivory)] opacity-50" />
            <div className="mt-auto grid grid-cols-3 gap-1.5">
              {["Learn", "Notes", "Quiz"].map((m) => (
                <div key={m} className="rounded-sm bg-[var(--lernio-paper)] p-1.5">
                  <div className="h-0.5 w-2/3 bg-[var(--lernio-ink)] opacity-70 mb-0.5" />
                  <div className="font-mono text-[0.55rem] text-[var(--lernio-ink)] opacity-50">{m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* B.R.A.C.E. — dark glass with waveform */}
      {slug === "brace" && (
        <div className="absolute inset-0 yg-brushed">
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="flex items-end gap-1 h-24 w-full">
              {[35, 65, 45, 80, 55, 90, 60, 40, 75, 50, 35, 70, 45, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, ${accent} 0%, var(--brace-silver) 100%)`,
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute top-4 left-4 font-mono text-[0.6rem] text-[var(--brace-silver)] opacity-60">
            VOICE_INPUT.WAV
          </div>
        </div>
      )}

      {/* CampusMate — QR + tiles */}
      {slug === "campusmate" && (
        <div className="absolute inset-0 yg-wayfinding">
          <div className="absolute inset-6 grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }, (_, i) => {
              const on = (i * 7 + 13) % 17 % 3 === 0;
              return (
                <div
                  key={i}
                  className="rounded-[1px]"
                  style={{
                    background: on ? accent : "rgba(31, 122, 224, 0.05)",
                  }}
                />
              );
            })}
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[0.6rem] text-[var(--campus-white)] opacity-70">
            SCAN → ATTEND
          </div>
        </div>
      )}

      {/* Fakhri Mart — yarn strands */}
      {slug === "fakhri-mart" && (
        <div className="absolute inset-0 yg-textile">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M0 80 Q60 40 120 90 T240 80" stroke={accent} strokeWidth="2.5" fill="none" />
            <path d="M0 130 Q60 90 120 140 T240 130" stroke="var(--fakhri-cream)" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M0 180 Q60 140 120 190 T240 180" stroke={accent} strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
          <div className="absolute bottom-4 left-4 font-mono text-[0.6rem] text-[var(--fakhri-cream)] opacity-70">
            CATALOGUE
          </div>
        </div>
      )}
    </div>
  );
}
