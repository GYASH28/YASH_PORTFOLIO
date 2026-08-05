"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { PROJECTS, Project } from "@/data/projects";
import {
  IconArrowRight,
  IconExternal,
  IconRepo,
  IconLive,
} from "@/components/ui-yg/icons";

/**
 * Selected Systems — cinematic project stage.
 *
 * Each project gets a "scene" with project-specific visual language.
 * Desktop uses a pinned stage with project navigation;
 * mobile uses vertical chapter cards.
 */
export default function SelectedSystems() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = section.offsetHeight - vh;
        const scrolled = Math.max(0, -rect.top);
        const p = Math.max(0, Math.min(1, scrolled / total));
        const idx = Math.min(
          PROJECTS.length - 1,
          Math.floor(p * PROJECTS.length)
        );
        setActiveIdx(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const active = PROJECTS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="systems"
      className="relative w-full"
      style={{ minHeight: `${PROJECTS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col">
        {/* Background — changes color per active project */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${active.colorTheme.glow} 0%, transparent 60%)`,
            transitionTimingFunction: "var(--ease-standard)",
          }}
        />
        <div className="absolute inset-0 yg-grid-bg opacity-15" />

        {/* Header */}
        <div className="relative z-20 px-5 md:px-8 pt-24 md:pt-28">
          <div className="flex items-center gap-3 font-mono text-meta text-[var(--text-muted)]">
            <span className="h-px w-8 bg-[var(--signal-primary)]" />
            <span>SELECTED SYSTEMS · 03</span>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-h2 md:text-h1 max-w-[18ch]">
              Products with a{" "}
              <span className="text-[var(--human-accent)] yg-glow-human">Pulse</span>
            </h2>
            <p className="max-w-[40ch] text-body text-[var(--text-secondary)]">
              Four real systems — each with its own scene, motion language,
              and case study. Built end to end, not just demoed.
            </p>
          </div>
        </div>

        {/* Desktop: cinematic stage */}
        <div className="hidden md:block relative flex-1">
          <DesktopStage active={active} activeIdx={activeIdx} reduced={reduced} />
        </div>

        {/* Mobile: chapter cards */}
        <div className="md:hidden relative flex-1 overflow-y-auto yg-no-scrollbar px-5">
          <MobileChapter project={active} idx={activeIdx} />
        </div>

        {/* Bottom: project nav + progress */}
        <div className="relative z-20 px-5 md:px-8 pb-10 md:pb-12">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {PROJECTS.map((p, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={p.slug}
                    onClick={() => {
                      const section = sectionRef.current;
                      if (!section) return;
                      const target = section.offsetTop + (i / PROJECTS.length) * (section.offsetHeight - window.innerHeight) + 8;
                      window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
                    }}
                    className="flex items-center gap-2"
                    aria-label={`View ${p.name}`}
                  >
                    <span
                      className={`font-mono text-meta ${
                        isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="h-px transition-all duration-300"
                      style={{
                        width: isActive ? "32px" : "12px",
                        background: isActive ? p.colorTheme.primary : "var(--border-strong)",
                        boxShadow: isActive ? `0 0 8px ${p.colorTheme.glow}` : "none",
                      }}
                    />
                  </button>
                );
              })}
            </div>
            <div className="font-mono text-meta text-[var(--text-muted)]">
              {String(activeIdx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Desktop stage — split view: left = scene visual, right = metadata. */
function DesktopStage({
  active,
  activeIdx,
  reduced,
}: {
  active: Project;
  activeIdx: number;
  reduced: boolean;
}) {
  return (
    <div className="absolute inset-0 grid grid-cols-12 gap-8 px-8 pt-4">
      {/* Left: project scene */}
      <div className="col-span-7 relative flex items-center justify-center">
        <ProjectScene project={active} reduced={reduced} />
      </div>

      {/* Right: metadata */}
      <div className="col-span-5 flex flex-col justify-center gap-6">
        {/* Project number + category */}
        <div className="flex items-baseline gap-4">
          <span
            className="font-display text-display-2 leading-none"
            style={{ color: active.colorTheme.primary, opacity: 0.85 }}
          >
            0{active.index}
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-meta text-[var(--text-muted)]">
              {active.category.toUpperCase()}
            </span>
            <span className="font-mono text-meta text-[var(--text-muted)] mt-1">
              STATUS · {active.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Name + tagline */}
        <div>
          <h3 className="font-display text-h1 leading-tight text-[var(--text-primary)]">
            {active.name}
          </h3>
          <p
            className="font-mono text-body-lg mt-1"
            style={{ color: active.colorTheme.primary }}
          >
            {active.tagline}
          </p>
        </div>

        {/* Purpose */}
        <p className="text-body text-[var(--text-secondary)] max-w-[48ch]">
          {active.purpose}
        </p>

        {/* Role + platforms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-mono text-meta text-[var(--text-muted)]">ROLE</p>
            <p className="text-small text-[var(--text-primary)] mt-1">{active.role}</p>
          </div>
          <div>
            <p className="font-mono text-meta text-[var(--text-muted)]">PLATFORM</p>
            <p className="text-small text-[var(--text-primary)] mt-1">
              {active.platform.join(" · ")}
            </p>
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <p className="font-mono text-meta text-[var(--text-muted)] mb-2">
            SYSTEM CAPABILITIES
          </p>
          <div className="grid grid-cols-2 gap-2">
            {active.capabilities.map((c) => (
              <div
                key={c.label}
                className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-2"
              >
                <p className="text-small text-[var(--text-primary)]">{c.label}</p>
                <p className="text-meta text-[var(--text-muted)] mt-0.5">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {active.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="OPEN"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-2 font-mono text-meta text-[var(--text-primary)] hover:border-[var(--signal-primary)] hover:bg-[var(--signal-soft)]/10 transition-colors"
            >
              {l.kind === "repository" ? <IconRepo size={14} /> : <IconLive size={14} />}
              {l.label.toUpperCase()}
              <IconExternal size={12} className="text-[var(--text-muted)]" />
            </a>
          ))}
          <a
            href={`/systems/${active.slug}`}
            data-cursor="CASE STUDY"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-meta text-[#0a0a0f] transition-colors"
            style={{ background: active.colorTheme.primary }}
          >
            CASE STUDY
            <IconArrowRight size={14} />
          </a>
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {active.technologies.map((t) => (
            <span
              key={t}
              className="font-mono text-meta text-[var(--text-muted)] px-2 py-1 rounded border border-[var(--border-soft)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Mobile chapter — single project view, scrollable. */
function MobileChapter({ project, idx }: { project: Project; idx: number }) {
  return (
    <div className="py-6 flex flex-col gap-5">
      <div className="flex items-baseline gap-4">
        <span
          className="font-display text-display-2 leading-none"
          style={{ color: project.colorTheme.primary }}
        >
          0{project.index}
        </span>
        <div>
          <span className="font-mono text-meta text-[var(--text-muted)]">
            {project.category.toUpperCase()}
          </span>
          <p className="font-mono text-meta text-[var(--text-muted)] mt-1">
            STATUS · {project.status.toUpperCase()}
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-display text-h1 leading-tight text-[var(--text-primary)]">
          {project.name}
        </h3>
        <p
          className="font-mono text-body-lg mt-1"
          style={{ color: project.colorTheme.primary }}
        >
          {project.tagline}
        </p>
      </div>
      {/* Visual */}
      <div className="relative h-48 rounded-lg overflow-hidden border border-[var(--border-soft)] bg-[var(--surface-1)]">
        <ProjectScene project={project} reduced={false} compact />
      </div>
      <p className="text-body text-[var(--text-secondary)]">{project.purpose}</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="font-mono text-meta text-[var(--text-muted)]">ROLE</p>
          <p className="text-small text-[var(--text-primary)] mt-1">{project.role}</p>
        </div>
        <div>
          <p className="font-mono text-meta text-[var(--text-muted)]">PLATFORM</p>
          <p className="text-small text-[var(--text-primary)] mt-1">
            {project.platform.join(" · ")}
          </p>
        </div>
      </div>
      <div>
        <p className="font-mono text-meta text-[var(--text-muted)] mb-2">CAPABILITIES</p>
        <div className="grid grid-cols-2 gap-2">
          {project.capabilities.map((c) => (
            <div
              key={c.label}
              className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-1)]/60 p-2"
            >
              <p className="text-small text-[var(--text-primary)]">{c.label}</p>
              <p className="text-meta text-[var(--text-muted)] mt-0.5">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-3 py-2 font-mono text-meta text-[var(--text-primary)]"
          >
            {l.kind === "repository" ? <IconRepo size={12} /> : <IconLive size={12} />}
            {l.label.toUpperCase()}
            <IconExternal size={10} className="text-[var(--text-muted)]" />
          </a>
        ))}
        <a
          href={`/systems/${project.slug}`}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-meta text-[#0a0a0f]"
          style={{ background: project.colorTheme.primary }}
        >
          CASE STUDY
          <IconArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}

/** Per-project SVG scene — distinct visual language. */
function ProjectScene({
  project,
  reduced,
  compact = false,
}: {
  project: Project;
  reduced: boolean;
  compact?: boolean;
}) {
  const color = project.colorTheme.primary;
  const glow = project.colorTheme.glow;
  const shape = project.visual.accentShape;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glow} 0%, transparent 70%)`,
        }}
      />
      <svg
        viewBox="0 0 400 300"
        className="relative w-full h-full max-w-[600px]"
        style={{ filter: `drop-shadow(0 0 24px ${glow})` }}
      >
        {/* Knowledge nodes (Lernio) */}
        {shape === "knowledge-node" && (
          <KnowledgeNodeScene color={color} reduced={reduced} />
        )}
        {/* Memory wave (B.R.A.C.E.) */}
        {shape === "memory-wave" && (
          <MemoryWaveScene color={color} reduced={reduced} />
        )}
        {/* QR grid (CampusMate) */}
        {shape === "qr-grid" && (
          <QRGridScene color={color} reduced={reduced} />
        )}
        {/* Yarn strand (Fakhri Mart) */}
        {shape === "yarn-strand" && (
          <YarnStrandScene color={color} reduced={reduced} />
        )}

        {/* Project label */}
        <text
          x="200"
          y="270"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fill="var(--text-muted)"
          letterSpacing="0.15em"
        >
          {project.visual.motif.toUpperCase()}
        </text>
      </svg>
      {!compact && (
        <div className="absolute top-3 left-3 font-mono text-meta text-[var(--text-muted)]">
          PROJECT_CORE · 0{project.index}
        </div>
      )}
    </div>
  );
}

function KnowledgeNodeScene({ color, reduced }: { color: string; reduced: boolean }) {
  const nodes = [
    { x: 80, y: 60 },
    { x: 200, y: 90 },
    { x: 320, y: 60 },
    { x: 140, y: 160 },
    { x: 260, y: 160 },
    { x: 200, y: 220 },
  ];
  return (
    <g>
      {nodes.map((n, i) => (
        <g key={i}>
          <line
            x1={nodes[(i + 1) % nodes.length].x}
            y1={nodes[(i + 1) % nodes.length].y}
            x2={n.x}
            y2={n.y}
            stroke={color}
            strokeWidth="0.5"
            opacity="0.6"
            className={reduced ? "" : "yg-line-draw"}
            style={{ animationDelay: `${i * 100}ms` }}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r="6"
            fill={color}
            opacity="0.9"
            className={reduced ? "" : "yg-pulse-slow"}
            style={{ animationDelay: `${i * 200}ms` }}
          />
          <circle cx={n.x} cy={n.y} r="3" fill="var(--bg-primary)" />
        </g>
      ))}
      {/* Central learning path */}
      <path
        d="M80 60 Q140 130 200 220"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeDasharray="3 3"
        opacity="0.5"
      />
    </g>
  );
}

function MemoryWaveScene({ color, reduced }: { color: string; reduced: boolean }) {
  const bars = Array.from({ length: 32 }, (_, i) => i);
  return (
    <g>
      {bars.map((i) => {
        const h = 30 + Math.sin(i * 0.5) * 30 + Math.cos(i * 0.3) * 20;
        return (
          <rect
            key={i}
            x={20 + i * 11}
            y={150 - h}
            width="6"
            height={h}
            fill={color}
            opacity={0.4 + (i % 4) * 0.15}
            className={reduced ? "" : "yg-pulse-slow"}
            style={{ animationDelay: `${i * 60}ms` }}
          />
        );
      })}
      {/* Memory threads */}
      <path d="M40 80 Q120 60 200 90 T360 80" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M40 220 Q120 240 200 210 T360 220" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
    </g>
  );
}

function QRGridScene({ color, reduced }: { color: string; reduced: boolean }) {
  // Procedural QR-like grid.
  const cells = Array.from({ length: 144 }, (_, i) => {
    const seed = (i * 7 + 13) % 17;
    return seed % 3 === 0;
  });
  return (
    <g>
      {cells.map((on, i) => {
        if (!on) return null;
        const x = (i % 12) * 22 + 60;
        const y = Math.floor(i / 12) * 22 + 30;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="18"
            height="18"
            fill={color}
            opacity={0.7}
            className={reduced ? "" : "yg-pulse-slow"}
            style={{ animationDelay: `${i * 15}ms` }}
          />
        );
      })}
      {/* QR corner markers */}
      <rect x="60" y="30" width="40" height="40" stroke={color} strokeWidth="2" fill="none" />
      <rect x="74" y="44" width="12" height="12" fill={color} />
      <rect x="240" y="30" width="40" height="40" stroke={color} strokeWidth="2" fill="none" />
      <rect x="254" y="44" width="12" height="12" fill={color} />
      <rect x="60" y="210" width="40" height="40" stroke={color} strokeWidth="2" fill="none" />
      <rect x="74" y="224" width="12" height="12" fill={color} />
    </g>
  );
}

function YarnStrandScene({ color, reduced }: { color: string; reduced: boolean }) {
  return (
    <g>
      {/* Multiple yarn strands */}
      <path
        d="M40 80 Q120 60 200 100 T360 80"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M40 140 Q120 120 200 160 T360 140"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M40 200 Q120 180 200 220 T360 200"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      {/* Strand texture — short cross-strokes */}
      {Array.from({ length: 20 }, (_, i) => {
        const x = 40 + i * 17;
        return (
          <line
            key={i}
            x1={x}
            y1={75 + Math.sin(i * 0.5) * 8}
            x2={x + 8}
            y2={85 + Math.sin(i * 0.5) * 8}
            stroke={color}
            strokeWidth="0.5"
            opacity="0.5"
          />
        );
      })}
      {/* Catalogue tiles at the end */}
      <rect x="320" y="80" width="32" height="20" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
      <rect x="320" y="135" width="32" height="20" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <rect x="320" y="195" width="32" height="20" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
    </g>
  );
}
