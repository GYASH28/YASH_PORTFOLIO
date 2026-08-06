"use client";

import { PROFILE, CURRENTLY } from "@/data/projects";
import {
  IconMail,
  IconGitHub,
  IconLinkedIn,
  IconLocation,
  IconArrowRight,
} from "@/components/ui-yg/icons";

/**
 * About — warmer, more human chapter.
 *
 * Editorial serif accents. Real portrait placeholder.
 * Personal story + currently building.
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Warmer background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(245, 168, 91, 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="font-mono text-meta text-[var(--ink-quiet)] mb-3">
            <span className="text-[var(--accent-warm)]">●</span> About · Personal
          </div>
          <h2 className="font-display text-h1 md:text-display max-w-[16ch]">
            <span className="font-serif italic font-normal text-[var(--ink-soft)]">Still learning.</span>{" "}
            <span>Already building.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Portrait column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[var(--border-strong)] bg-[var(--surface-deep)]">
              {/* Portrait placeholder — typographic monogram */}
              <div className="absolute inset-0 yg-grid-subtle opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <svg viewBox="0 0 240 300" className="w-56 h-72" style={{ filter: "drop-shadow(0 0 24px rgba(245, 168, 91, 0.3))" }}>
                    {/* Y monogram */}
                    <path
                      d="M60 50 L120 130 L180 50"
                      stroke="var(--accent-warm)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M120 130 L120 250"
                      stroke="var(--accent-warm)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                    {/* G monogram */}
                    <path
                      d="M170 200 a40 40 0 11-30 -68 40 40 0 0134 20"
                      stroke="var(--ink-bone)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M170 132 v22 h-22"
                      stroke="var(--ink-bone)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent">
                <p className="font-display text-h3 text-[var(--ink-bone)]">
                  {PROFILE.name}
                </p>
                <p className="font-mono text-meta text-[var(--ink-quiet)] mt-1">
                  {PROFILE.role}
                </p>
                <p className="font-mono text-meta text-[var(--ink-quiet)] mt-1">
                  {PROFILE.location}
                </p>
              </div>
              <div className="absolute top-3 left-3 font-mono text-meta text-[var(--ink-quiet)]">
                PORTRAIT · 01
              </div>
            </div>

            {/* Quick contact strip */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-3 hover:border-[var(--accent-warm)] transition-colors"
              >
                <IconMail size={14} className="text-[var(--accent-warm)]" />
                <span className="font-mono text-meta text-[var(--ink-soft)]">EMAIL</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-3 hover:border-[var(--accent-warm)] transition-colors"
              >
                <IconGitHub size={14} className="text-[var(--accent-warm)]" />
                <span className="font-mono text-meta text-[var(--ink-soft)]">GITHUB</span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-3 hover:border-[var(--accent-warm)] transition-colors"
              >
                <IconLinkedIn size={14} className="text-[var(--accent-warm)]" />
                <span className="font-mono text-meta text-[var(--ink-soft)]">LINKEDIN</span>
              </a>
              <div className="flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-3">
                <IconLocation size={14} className="text-[var(--accent-warm)]" />
                <span className="font-mono text-meta text-[var(--ink-soft)]">PUNE</span>
              </div>
            </div>
          </div>

          {/* Bio column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Personal thought — editorial serif */}
            <p className="font-serif italic text-h3 text-[var(--ink-bone)] leading-snug max-w-[40ch]">
              {PROFILE.personalThought}
            </p>

            {/* Body */}
            <p className="text-body-lg text-[var(--ink-soft)] leading-relaxed">
              I&apos;m <span className="text-[var(--ink-bone)]">{PROFILE.name}</span>, a creative product engineer based in {PROFILE.location}. I study {PROFILE.education} and build AI learning systems, desktop companions, campus platforms, and client products end to end — from the first observation through design, engineering, and deployment.
            </p>
            <p className="text-body text-[var(--ink-soft)] leading-relaxed">
              The work I care about sits at the seam between design and engineering. Design gives a product character — engineering gives it a life outside the mockup. I take ideas seriously enough to ship them, and ship them seriously enough to keep improving.
            </p>
            <p className="text-body text-[var(--ink-soft)] leading-relaxed">
              Right now that means building Lernio AI around real diploma workflows, iterating on B.R.A.C.E.&apos;s voice-first memory and tool routing, shipping CampusMate with a client, and modernising Fakhri Mart&apos;s wholesale catalogue. Each project is real, with real users and real feedback.
            </p>

            {/* Currently building — typed data */}
            <div className="pt-8 border-t border-[var(--border-soft)]">
              <p className="font-mono text-meta text-[var(--ink-quiet)] mb-4">
                CURRENTLY · BUILDING / EXPLORING / LEARNING
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CURRENTLY.map((entry, i) => {
                  const colors: Record<string, string> = {
                    Building: "#e89438",
                    Exploring: "#7a6bd1",
                    Learning: "#1f7ae0",
                  };
                  const color = colors[entry.status];
                  return (
                    <div
                      key={i}
                      className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full yg-pulse"
                          style={{ background: color, color }}
                        />
                        <span className="font-mono text-meta" style={{ color }}>
                          {entry.status.toUpperCase()} · {entry.dateUpdated}
                        </span>
                      </div>
                      <p className="font-display text-small text-[var(--ink-bone)] mb-1">
                        {entry.name}
                      </p>
                      <p className="text-meta text-[var(--ink-quiet)] leading-snug">
                        {entry.detail}
                      </p>
                      {entry.link && (
                        <a
                          href={entry.link.href}
                          className="inline-flex items-center gap-1 mt-2 font-mono text-meta text-[var(--ink-quiet)] hover:text-[var(--accent-warm)] transition-colors"
                        >
                          {entry.link.label}
                          <IconArrowRight size={10} />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Availability banner */}
            <div className="rounded-md border border-[var(--accent-warm)]/30 bg-[var(--accent-warm-soft)] p-4 flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-[var(--accent-warm)] yg-pulse" />
              <div>
                <p className="font-display text-small text-[var(--ink-bone)]">
                  {PROFILE.availability}
                </p>
                <p className="font-mono text-meta text-[var(--ink-quiet)] mt-0.5">
                  Selective about what I take on — product fit matters more than volume.
                </p>
              </div>
              <a
                href="/#contact"
                className="ml-auto inline-flex items-center gap-2 font-mono text-meta text-[var(--accent-warm)] hover:text-[var(--ink-bone)] transition-colors"
              >
                Reach out
                <IconArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
