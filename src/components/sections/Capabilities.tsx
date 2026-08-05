"use client";

import { useState } from "react";
import { CAPABILITIES, PROJECTS } from "@/data/projects";
import {
  IconArrowRight,
  IconStructure,
  IconEngineer,
  IconNode,
  IconEvolve,
} from "@/components/ui-yg/icons";

const MODULE_ICONS = [IconStructure, IconNode, IconEngineer, IconEvolve];

/**
 * Capabilities — one connected delivery pipeline.
 *
 * Four modules: Product strategy → Experience design → AI implementation
 * → Full-stack delivery. Inputs enter left, deployed product exits right.
 */
export default function Capabilities() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="capabilities" className="relative w-full py-24 md:py-32">
      <div className="absolute inset-0 yg-grid-bg opacity-15" />
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-meta text-[var(--text-muted)] mb-4">
              <span className="h-px w-8 bg-[var(--signal-primary)]" />
              <span>CAPABILITIES PIPELINE · 04</span>
            </div>
            <h2 className="font-display text-h2 md:text-h1 max-w-[16ch]">
              One pipeline, from{" "}
              <span className="text-[var(--signal-primary)]">idea</span> to{" "}
              <span className="text-[var(--human-accent)]">deployed system</span>.
            </h2>
          </div>
          <p className="max-w-[36ch] text-body text-[var(--text-secondary)]">
            Not four unrelated services. A connected delivery pipeline — each
            module hands off to the next, with a real project as proof.
          </p>
        </div>

        {/* Pipeline visual — horizontal flow on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px bg-[var(--border-strong)]">
            <div
              className="absolute inset-y-0 left-0 bg-[var(--signal-primary)] transition-all duration-700"
              style={{
                width: hovered !== null ? `${((hovered + 1) / 4) * 100}%` : "0%",
                boxShadow: "0 0 12px var(--signal-glow)",
                transitionTimingFunction: "var(--ease-standard)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">
            {CAPABILITIES.map((cap, i) => {
              const Icon = MODULE_ICONS[i];
              const project = PROJECTS.find((p) => p.slug === cap.projectRef)!;
              const active = hovered === i;
              return (
                <div
                  key={cap.key}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="relative group"
                >
                  {/* Index node */}
                  <div className="hidden md:flex justify-center mb-4">
                    <div
                      className={`relative h-16 w-16 rounded-full border-2 transition-all duration-500 ${
                        active
                          ? "border-[var(--signal-primary)] bg-[var(--signal-soft)]/15"
                          : "border-[var(--border-strong)] bg-[var(--surface-1)]"
                      }`}
                      style={{
                        boxShadow: active ? "0 0 24px var(--signal-glow)" : "none",
                        transitionTimingFunction: "var(--ease-standard)",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon
                          size={22}
                          className={active ? "text-[var(--signal-primary)]" : "text-[var(--text-secondary)]"}
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--bg-primary)] border border-[var(--border-strong)] flex items-center justify-center font-mono text-[0.6rem] text-[var(--text-muted)]">
                        {String(cap.index).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Module card */}
                  <div
                    className={`rounded-lg border p-5 transition-all duration-500 ${
                      active
                        ? "border-[var(--signal-primary)] bg-[var(--surface-1)]"
                        : "border-[var(--border-soft)] bg-[var(--surface-1)]/60"
                    }`}
                    style={{
                      transform: active ? "translateY(-4px)" : "translateY(0)",
                      transitionTimingFunction: "var(--ease-standard)",
                    }}
                  >
                    <div className="md:hidden flex items-center gap-3 mb-3">
                      <Icon size={20} className="text-[var(--signal-primary)]" />
                      <span className="font-mono text-meta text-[var(--text-muted)]">
                        0{cap.index}
                      </span>
                    </div>
                    <h3 className="font-display text-h3 text-[var(--text-primary)]">
                      {cap.label}
                    </h3>
                    <p className="text-small text-[var(--text-secondary)] mt-2">
                      {cap.summary}
                    </p>

                    {/* Modules */}
                    <ul className="mt-4 space-y-1">
                      {cap.modules.map((m) => (
                        <li
                          key={m}
                          className="font-mono text-meta text-[var(--text-muted)] flex items-center gap-2"
                        >
                          <span className="h-1 w-1 rounded-full bg-[var(--signal-primary)] opacity-60" />
                          {m}
                        </li>
                      ))}
                    </ul>

                    {/* Real example */}
                    <div className="mt-5 pt-4 border-t border-[var(--border-soft)]">
                      <p className="font-mono text-meta text-[var(--text-muted)] mb-1">
                        PROOF
                      </p>
                      <a
                        href={`/systems/${project.slug}`}
                        className="group/ex inline-flex items-center gap-2 text-small text-[var(--text-primary)] hover:text-[var(--signal-primary)] transition-colors"
                      >
                        <span style={{ color: project.colorTheme.primary }}>●</span>
                        {cap.realExample}
                        <IconArrowRight
                          size={12}
                          className="group-hover/ex:translate-x-1 transition-transform"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech layers — grouped, no icon wall */}
        <div className="mt-20">
          <div className="flex items-center gap-3 font-mono text-meta text-[var(--text-muted)] mb-6">
            <span className="h-px w-8 bg-[var(--signal-primary)]" />
            <span>TECHNOLOGY · GROUPED BY SYSTEM LAYER</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TECH_LAYERS.map((layer) => (
              <div
                key={layer.layer}
                className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-1)]/40 p-4"
              >
                <p className="font-mono text-meta text-[var(--signal-primary)] mb-3">
                  {layer.layer}
                </p>
                <ul className="space-y-1.5">
                  {layer.tools.map((t) => (
                    <li key={t} className="text-small text-[var(--text-secondary)]">
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

// Tech layers data lives here to keep imports simple.
const TECH_LAYERS = [
  { layer: "Interface", tools: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "shadcn/ui"] },
  { layer: "Application", tools: ["Node.js", "Bun", "Prisma", "NextAuth", "Zustand", "TanStack Query"] },
  { layer: "Intelligence", tools: ["OpenAI", "Anthropic", "Vector retrieval", "Tool routing", "Provider routing"] },
  { layer: "Data & memory", tools: ["Postgres", "SQLite", "Redis", "Vector store", "S3"] },
  { layer: "Infrastructure", tools: ["Vercel", "Cloudflare", "Docker", "Electron"] },
  { layer: "Deployment", tools: ["CI/CD", "Monitoring", "Analytics", "Sentry"] },
];
