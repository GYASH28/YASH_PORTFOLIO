"use client";

import { IDENTITY } from "@/data/projects";
import {
  IconLocation,
  IconAvailability,
  IconMail,
  IconGitHub,
  IconLinkedIn,
  IconArrowRight,
} from "@/components/ui-yg/icons";

/**
 * About / Human Layer — warmer, quieter section after the technical
 * intensity. The grid softens; the signal line warms to amber.
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Warmer background */}
      <div className="absolute inset-0 yg-grid-bg opacity-10" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(255,182,114,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 font-mono text-meta text-[var(--text-muted)] mb-4">
            <span className="h-px w-8 bg-[var(--human-accent)]" />
            <span>HUMAN LAYER · 05</span>
          </div>
          <h2 className="font-display text-h2 md:text-h1 max-w-[18ch]">
            A human signal, behind every{" "}
            <span className="text-[var(--human-accent)] yg-glow-human">system</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[var(--border-strong)]">
              {/* Placeholder portrait — using a stylised Y/G monogram composition */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-1)] to-[var(--bg-secondary)]" />
              <div className="absolute inset-0 yg-grid-bg opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Y/G monogram */}
                  <svg viewBox="0 0 200 240" className="w-48 h-56">
                    {/* Y silhouette */}
                    <path
                      d="M40 40 L100 90 L160 40"
                      stroke="var(--signal-primary)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M100 90 L100 200"
                      stroke="var(--signal-primary)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                    {/* G silhouette */}
                    <path
                      d="M140 150 a35 35 0 11-25 -60 35 35 0 0130 18"
                      stroke="var(--signal-primary)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <path
                      d="M140 110 v18 h-18"
                      stroke="var(--signal-primary)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    {/* Human pulse */}
                    <circle
                      cx="100"
                      cy="90"
                      r="6"
                      fill="var(--human-accent)"
                      className="yg-pulse"
                    />
                  </svg>
                </div>
              </div>
              {/* Caption strip */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent">
                <p className="font-display text-h3 text-[var(--text-primary)]">
                  {IDENTITY.name}
                </p>
                <p className="font-mono text-meta text-[var(--text-muted)] mt-1">
                  {IDENTITY.role.toUpperCase()}
                </p>
              </div>
              {/* Corner telemetry */}
              <div className="absolute top-3 left-3 font-mono text-meta text-[var(--text-muted)]">
                HUMAN_LAYER · 01
              </div>
            </div>

            {/* Quick contact strip */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={`mailto:${IDENTITY.email}`}
                className="flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-3 hover:border-[var(--signal-primary)] transition-colors"
              >
                <IconMail size={16} className="text-[var(--signal-primary)]" />
                <span className="font-mono text-meta text-[var(--text-secondary)]">EMAIL</span>
              </a>
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-3 hover:border-[var(--signal-primary)] transition-colors"
              >
                <IconGitHub size={16} className="text-[var(--signal-primary)]" />
                <span className="font-mono text-meta text-[var(--text-secondary)]">GITHUB</span>
              </a>
              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-3 hover:border-[var(--signal-primary)] transition-colors"
              >
                <IconLinkedIn size={16} className="text-[var(--signal-primary)]" />
                <span className="font-mono text-meta text-[var(--text-secondary)]">LINKEDIN</span>
              </a>
              <div className="flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-3">
                <IconLocation size={16} className="text-[var(--human-accent)]" />
                <span className="font-mono text-meta text-[var(--text-secondary)]">PUNE</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="text-body-lg text-[var(--text-secondary)]">
              I&apos;m <span className="text-[var(--text-primary)]">{IDENTITY.name}</span>,
              a product-focused developer based in {IDENTITY.location}. I study{" "}
              <span className="text-[var(--text-primary)]">{IDENTITY.education}</span>{" "}
              and build learning systems, AI companions, campus platforms, and
              client products end to end — from problem framing through
              interface, architecture, implementation, and deployment.
            </p>
            <p className="text-body text-[var(--text-secondary)]">
              My work sits at the seam between human intent and machine
              structure. I care about products that actually ship and keep
              improving, not demos that look impressive for a week. Every
              system in this portfolio is something I&apos;ve designed, built,
              and continue to maintain or iterate on with real users.
            </p>
            <p className="text-body text-[var(--text-secondary)]">
              The throughline across all of it: observe the real workflow
              first, structure it into something legible, engineer the full
              loop, and let feedback evolve it. {IDENTITY.philosophy}
            </p>

            {/* Currently / Learning / Exploring */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-soft)]">
              <div>
                <p className="font-mono text-meta text-[var(--text-muted)] mb-2">
                  CURRENTLY BUILDING
                </p>
                <p className="text-small text-[var(--text-primary)]">
                  Lernio AI · B.R.A.C.E.
                </p>
              </div>
              <div>
                <p className="font-mono text-meta text-[var(--text-muted)] mb-2">
                  LEARNING
                </p>
                <p className="text-small text-[var(--text-primary)]">
                  Provider routing · Memory systems
                </p>
              </div>
              <div>
                <p className="font-mono text-meta text-[var(--text-muted)] mb-2">
                  EXPLORING
                </p>
                <p className="text-small text-[var(--text-primary)]">
                  WebGL · Shaders · Motion systems
                </p>
              </div>
            </div>

            {/* Availability banner */}
            <div className="rounded-lg border border-[var(--human-accent)]/40 bg-[var(--human-accent)]/5 p-4 flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-[var(--human-accent)] yg-pulse" />
              <div>
                <p className="font-display text-small text-[var(--text-primary)]">
                  {IDENTITY.available}
                </p>
                <p className="font-mono text-meta text-[var(--text-muted)] mt-0.5">
                  Selective about what I take on — product fit matters more than volume.
                </p>
              </div>
              <a
                href="#contact"
                className="ml-auto inline-flex items-center gap-2 font-mono text-meta text-[var(--human-accent)] hover:text-[var(--text-primary)] transition-colors"
              >
                REACH OUT
                <IconArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
