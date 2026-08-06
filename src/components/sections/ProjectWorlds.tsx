"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, Project } from "@/data/projects";
import {
  IconArrowRight,
  IconExternal,
  IconRepo,
  IconLive,
} from "@/components/ui-yg/icons";

/**
 * Featured Project Worlds — the most important section.
 *
 * Each project transforms the page's color, material, typography,
 * and motion. Desktop uses a stacked chapter layout with project-specific
 * art direction. Mobile uses vertical chapters with always-visible media.
 */
export default function ProjectWorlds() {
  return (
    <section id="work" className="relative">
      {/* Section header */}
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-mono text-meta text-[var(--ink-quiet)] mb-3">
              <span className="text-[var(--accent-warm)]">●</span> Featured Work · Four Worlds
            </div>
            <h2 className="font-display text-h1 max-w-[16ch]">
              Each project is its own world.
            </h2>
          </div>
          <p className="max-w-[40ch] text-body text-[var(--ink-soft)]">
            Lernio AI, B.R.A.C.E., CampusMate, and Fakhri Mart — each with its own art direction, material language, and motion. Built end to end, not just demoed.
          </p>
        </div>
      </div>

      {/* The four project worlds */}
      {PROJECTS.map((project, i) => (
        <ProjectWorld key={project.slug} project={project} index={i} />
      ))}
    </section>
  );
}

function ProjectWorld({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  // Start with null to avoid hydration mismatch — set after mount.
  const [inView, setInView] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px" }
    );
    obs.observe(el);
    // Initialize based on current state.
    const rect = el.getBoundingClientRect();
    setInView(rect.top < window.innerHeight && rect.bottom > 0);
    return () => obs.disconnect();
  }, []);

  // Treat null as false on first render to avoid mismatches.
  const inViewBool = inView === true;

  // Alternate layout direction per project.
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      data-project={project.slug}
      className="relative w-full overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor: inViewBool ? "var(--project-bg)" : "var(--bg-base)",
        transitionTimingFunction: "var(--ease-cinema)",
      }}
    >
      {/* Project-specific texture overlay */}
      <ProjectTexture world={project.world} />

      {/* Border separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-[var(--border-soft)]" />

      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-32">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
            flip ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Left column: visual scene */}
          <div className={`lg:col-span-7 ${flip ? "lg:[direction:ltr]" : ""}`}>
            <ProjectScene project={project} inView={inViewBool} />
          </div>

          {/* Right column: content */}
          <div className={`lg:col-span-5 flex flex-col gap-5 ${flip ? "lg:[direction:ltr]" : ""}`}>
            {/* Project number + status */}
            <div className="flex items-baseline justify-between">
              <span
                className="font-display text-display-lg leading-none"
                style={{ color: "var(--project-accent)", opacity: 0.5 }}
              >
                0{project.index}
              </span>
              <span className="font-mono text-meta text-[var(--project-ink)] opacity-70">
                {project.status}
              </span>
            </div>

            {/* Category + name */}
            <div>
              <p className="font-mono text-meta mb-2" style={{ color: "var(--project-accent)" }}>
                {project.category}
              </p>
              <h3 className="font-display text-h1 text-[var(--project-ink)] leading-tight">
                {project.name}
              </h3>
              <p
                className="font-serif italic text-body-lg mt-2"
                style={{ color: "var(--project-accent-soft)" }}
              >
                {project.tagline}
              </p>
            </div>

            {/* Short description */}
            <p className="text-body text-[var(--project-ink)] opacity-80 max-w-[44ch]">
              {project.shortDescription}
            </p>

            {/* Role + platform + year */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <p className="font-mono text-meta text-[var(--project-ink)] opacity-50 mb-1">ROLE</p>
                <p className="text-small text-[var(--project-ink)] opacity-90">
                  {project.role.join(" · ")}
                </p>
              </div>
              <div>
                <p className="font-mono text-meta text-[var(--project-ink)] opacity-50 mb-1">PLATFORM</p>
                <p className="text-small text-[var(--project-ink)] opacity-90">
                  {project.platform.join(" · ")}
                </p>
              </div>
              <div>
                <p className="font-mono text-meta text-[var(--project-ink)] opacity-50 mb-1">YEAR</p>
                <p className="text-small text-[var(--project-ink)] opacity-90">
                  {project.yearStarted}
                </p>
              </div>
            </div>

            {/* Design + engineering decisions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="rounded-md border border-[var(--border-soft)] p-3" style={{ background: "var(--project-surface)" }}>
                <p className="font-mono text-meta mb-1.5" style={{ color: "var(--project-accent)" }}>
                  DESIGN
                </p>
                <p className="text-small text-[var(--project-ink)] opacity-90 leading-snug">
                  {project.designDecision}
                </p>
              </div>
              <div className="rounded-md border border-[var(--border-soft)] p-3" style={{ background: "var(--project-surface)" }}>
                <p className="font-mono text-meta mb-1.5" style={{ color: "var(--project-accent)" }}>
                  ENGINEERING
                </p>
                <p className="text-small text-[var(--project-ink)] opacity-90 leading-snug">
                  {project.engineeringDecision}
                </p>
              </div>
            </div>

            {/* Capabilities */}
            <div className="pt-2">
              <p className="font-mono text-meta text-[var(--project-ink)] opacity-50 mb-2">
                CAPABILITIES
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.capabilities.map((c) => (
                  <span
                    key={c.label}
                    className="font-mono text-meta px-2 py-1 rounded border"
                    style={{
                      color: "var(--project-ink)",
                      borderColor: "var(--border-strong)",
                      background: "var(--project-surface)",
                    }}
                  >
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href={`/work/${project.slug}`}
                data-cursor="Open"
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-meta transition-colors yg-press"
                style={{
                  background: "var(--project-accent)",
                  color: "var(--project-bg)",
                }}
              >
                View Case Study
                <IconArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="Open"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-3 font-mono text-meta text-[var(--project-ink)] hover:border-[var(--project-accent)] transition-colors"
                >
                  <IconRepo size={12} />
                  Repository
                  <IconExternal size={10} className="opacity-50" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Project texture overlay — applied based on project.world */
function ProjectTexture({ world }: { world: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          world === "paper"
            ? "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(233, 185, 73, 0.06) 0%, transparent 60%)"
            : world === "glass"
            ? "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(122, 107, 209, 0.08) 0%, transparent 60%)"
            : world === "tiles"
            ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(31, 122, 224, 0.08) 0%, transparent 60%)"
            : "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(232, 148, 56, 0.06) 0%, transparent 60%)",
      }}
    />
  );
}

/** Per-project SVG scene — distinct visual language. */
function ProjectScene({ project, inView }: { project: Project; inView: boolean }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border border-[var(--border-soft)]" style={{ background: "var(--project-surface)" }}>
      <ProjectSceneVisual slug={project.slug} accent={project.accent} accentSoft={project.accentSoft} inView={inView} />
      <div className="absolute top-3 left-3 font-mono text-meta text-[var(--project-ink)] opacity-60">
        {project.coverLabel}
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-meta text-[var(--project-ink)] opacity-40">
        PROJECT_CORE · 0{project.index}
      </div>
    </div>
  );
}

function ProjectSceneVisual({
  slug,
  accent,
  accentSoft,
  inView,
}: {
  slug: string;
  accent: string;
  accentSoft: string;
  inView: boolean;
}) {
  // The same fragment visuals but rendered larger and richer for the scene stage.
  return (
    <svg viewBox="0 0 600 450" className="absolute inset-0 w-full h-full">
      {slug === "lernio" && <LernioScene accent={accent} accentSoft={accentSoft} inView={inView} />}
      {slug === "brace" && <BraceScene accent={accent} accentSoft={accentSoft} inView={inView} />}
      {slug === "campusmate" && <CampusScene accent={accent} accentSoft={accentSoft} inView={inView} />}
      {slug === "fakhri-mart" && <FakhriScene accent={accent} accentSoft={accentSoft} inView={inView} />}
    </svg>
  );
}

/* ---------- Lernio — paper + lesson nodes ---------- */
function LernioScene({ accent, accentSoft, inView }: { accent: string; accentSoft: string; inView: boolean }) {
  return (
    <g style={{ opacity: inView ? 1 : 0, transition: "opacity 800ms var(--ease-cinema)" }}>
      {/* Paper pages */}
      <rect x="80" y="80" width="200" height="280" rx="3" fill={accentSoft} opacity="0.95" transform="rotate(-3 180 220)" />
      <rect x="120" y="100" width="200" height="280" rx="3" fill={accentSoft} opacity="0.9" transform="rotate(2 220 240)" />
      {/* Lesson nodes connecting */}
      <g stroke={accent} strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M180 180 L240 200 L320 180 L380 220" />
        <path d="M180 240 L240 260 L320 240" />
        <path d="M240 200 L240 260" />
      </g>
      {/* Lesson circles */}
      {[[180, 180], [240, 200], [320, 180], [380, 220], [180, 240], [240, 260], [320, 240]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill={accent} />
          <circle cx={x} cy={y} r="3" fill="#1d1a14" />
        </g>
      ))}
      {/* Page lines */}
      <g stroke="#1d1a14" strokeWidth="0.5" opacity="0.4">
        <line x1="140" y1="140" x2="240" y2="140" />
        <line x1="140" y1="155" x2="260" y2="155" />
        <line x1="140" y1="170" x2="220" y2="170" />
      </g>
      {/* Study mode chips */}
      <g fontFamily="var(--font-mono)" fontSize="9" fill="#1d1a14" opacity="0.7">
        <text x="140" y="320">Learn</text>
        <text x="180" y="320">Notes</text>
        <text x="220" y="320">Quiz</text>
        <text x="260" y="320">Revise</text>
      </g>
    </g>
  );
}

/* ---------- B.R.A.C.E. — waveform + memory layers ---------- */
function BraceScene({ accent, accentSoft, inView }: { accent: string; accentSoft: string; inView: boolean }) {
  const bars = Array.from({ length: 36 }, (_, i) => {
    const h = 60 + Math.sin(i * 0.5) * 50 + Math.cos(i * 0.3) * 30;
    const opacity = 0.4 + (i % 4) * 0.15;
    return {
      h: Math.round(h * 100) / 100,
      y: Math.round((-h / 2) * 100) / 100,
      opacity: Math.round(opacity * 100) / 100,
    };
  });
  return (
    <g style={{ opacity: inView ? 1 : 0, transition: "opacity 800ms var(--ease-cinema)" }}>
      {/* Glass panel — back layer */}
      <rect x="100" y="60" width="280" height="220" rx="6" fill={accent} opacity="0.15" transform="rotate(-4 240 170)" />
      {/* Glass panel — front layer */}
      <rect x="220" y="80" width="280" height="220" rx="6" fill={accent} opacity="0.25" transform="rotate(3 360 190)" />
      {/* Voice waveform */}
      <g transform="translate(0, 280)">
        {bars.map((bar, i) => (
          <rect
            key={i}
            x={50 + i * 14}
            y={bar.y}
            width="8"
            height={bar.h}
            rx="2"
            fill={accent}
            opacity={bar.opacity}
          />
        ))}
      </g>
      {/* Memory thread — flowing curve */}
      <path
        d="M80 120 Q200 80 360 140 T520 120"
        stroke={accentSoft}
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M80 360 Q200 320 360 380 T520 360"
        stroke={accentSoft}
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      {/* Center core */}
      <circle cx="300" cy="200" r="14" fill={accent} opacity="0.9" />
      <circle cx="300" cy="200" r="22" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.4" />
    </g>
  );
}

/* ---------- CampusMate — QR grid + wayfinding ---------- */
function CampusScene({ accent, accentSoft, inView }: { accent: string; accentSoft: string; inView: boolean }) {
  return (
    <g style={{ opacity: inView ? 1 : 0, transition: "opacity 800ms var(--ease-cinema)" }}>
      {/* Wayfinding lines */}
      <g stroke={accent} strokeWidth="1" fill="none" opacity="0.4">
        <path d="M50 100 Q200 50 380 120 T560 100" />
        <path d="M50 200 Q200 250 380 180 T560 220" />
        <path d="M50 350 Q200 300 380 380 T560 350" />
      </g>
      {/* QR grids */}
      {[[120, 80], [340, 100], [200, 280]].map(([x, y], k) => (
        <g key={k} transform={`translate(${x}, ${y})`}>
          <rect x="-4" y="-4" width="88" height="88" rx="2" fill="#0e1b2c" />
          {Array.from({ length: 64 }, (_, i) => {
            const cx = (i % 8) * 10 + 2;
            const cy = Math.floor(i / 8) * 10 + 2;
            const on = (i * 7 + k * 13 + 5) % 17 % 3 === 0;
            return on ? <rect key={i} x={cx} y={cy} width="8" height="8" fill={accent} /> : null;
          })}
          {/* Corner markers */}
          {[[2, 2], [62, 2], [2, 62]].map(([cx, cy], j) => (
            <g key={`cm-${j}`}>
              <rect x={cx} y={cy} width="20" height="20" stroke={accent} strokeWidth="2" fill="none" />
              <rect x={cx + 6} y={cy + 6} width="8" height="8" fill={accent} />
            </g>
          ))}
        </g>
      ))}
      {/* Role nodes */}
      {[[80, 220], [520, 220], [300, 60]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" fill={accentSoft} />
          <circle cx={x} cy={y} r="18" stroke={accentSoft} strokeWidth="1" fill="none" opacity="0.5" />
        </g>
      ))}
      <text x="80" y="240" fontFamily="var(--font-mono)" fontSize="10" fill={accentSoft} textAnchor="middle">STUDENT</text>
      <text x="520" y="240" fontFamily="var(--font-mono)" fontSize="10" fill={accentSoft} textAnchor="middle">FACULTY</text>
      <text x="300" y="50" fontFamily="var(--font-mono)" fontSize="10" fill={accentSoft} textAnchor="middle">ADMIN</text>
    </g>
  );
}

/* ---------- Fakhri Mart — yarn strands + catalogue ---------- */
function FakhriScene({ accent, accentSoft, inView }: { accent: string; accentSoft: string; inView: boolean }) {
  return (
    <g style={{ opacity: inView ? 1 : 0, transition: "opacity 800ms var(--ease-cinema)" }}>
      {/* Yarn strands flowing across */}
      <path d="M40 80 Q200 40 360 100 T560 80" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 80 Q200 40 360 100 T560 80" stroke={accentSoft} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M40 160 Q200 120 360 180 T560 160" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M40 240 Q200 200 360 260 T560 240" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M40 320 Q200 280 360 340 T560 320" stroke={accentSoft} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Catalogue tiles */}
      {[120, 240, 360, 480].map((x, i) => (
        <g key={i} transform={`translate(${x - 30}, 360)`}>
          <rect x="0" y="0" width="60" height="60" rx="3" fill={accentSoft} opacity="0.85" />
          <rect x="6" y="6" width="48" height="48" fill={accent} opacity="0.15" />
          <line x1="6" y1="58" x2="54" y2="58" stroke={accent} strokeWidth="2" />
        </g>
      ))}
      {/* Texture marks */}
      {Array.from({ length: 30 }, (_, i) => {
        const x = 40 + (i % 15) * 36;
        const y = 40 + Math.floor(i / 15) * 8;
        return <line key={i} x1={x} y1={y} x2={x + 12} y2={y + 6} stroke={accent} strokeWidth="0.4" opacity="0.4" />;
      })}
    </g>
  );
}
