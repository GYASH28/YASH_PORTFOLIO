"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/projects";
import {
  IconArrowRight,
  IconExternal,
  IconRepo,
  IconLive,
  IconArrowLeft,
} from "@/components/ui-yg/icons";

type View = "grid" | "list";
type Filter = "all" | Project["category"];

const CATEGORIES: Filter[] = [
  "all",
  "AI Learning System",
  "AI Companion",
  "Campus Platform",
  "Commerce Platform",
];

export default function WorkArchive() {
  const [view, setView] = useState<View>("grid");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCat = filter === "all" || p.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [filter, query]);

  return (
    <main className="relative min-h-screen pt-28 pb-32">
      <div className="absolute inset-0 yg-grid-subtle opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(245, 168, 91, 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10">
        {/* Back link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-meta text-[var(--ink-quiet)] hover:text-[var(--accent-warm)] transition-colors mb-8"
        >
          <IconArrowLeft size={14} />
          BACK TO HOME
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-meta text-[var(--ink-quiet)] mb-3">
            <span className="text-[var(--accent-warm)]">●</span> All Work · Archive
          </div>
          <h1 className="font-display text-display max-w-[14ch]">
            Every project, <span className="font-serif italic font-normal text-[var(--ink-soft)]">one place</span>.
          </h1>
          <p className="mt-6 max-w-[50ch] text-body-lg text-[var(--ink-soft)]">
            Browse all projects as a grid or a compact list. Filter by category, search by technology. Each entry links to a full case study.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6 border-b border-[var(--border-soft)]">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, technology…"
            className="yg-search-input"
            aria-label="Search projects"
          />

          <div className="flex flex-wrap gap-2 md:ml-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full font-mono text-meta transition-colors ${
                  filter === c
                    ? "bg-[var(--ink-bone)] text-[var(--bg-base)]"
                    : "border border-[var(--border-soft)] text-[var(--ink-quiet)] hover:text-[var(--ink-bone)]"
                }`}
              >
                {c === "all" ? "ALL" : c.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-[var(--border-soft)] p-1">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 rounded-full font-mono text-meta ${
                view === "grid"
                  ? "bg-[var(--ink-bone)] text-[var(--bg-base)]"
                  : "text-[var(--ink-quiet)]"
              }`}
              aria-pressed={view === "grid"}
            >
              GRID
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded-full font-mono text-meta ${
                view === "list"
                  ? "bg-[var(--ink-bone)] text-[var(--bg-base)]"
                  : "text-[var(--ink-quiet)]"
              }`}
              aria-pressed={view === "list"}
            >
              LIST
            </button>
          </div>
        </div>

        <p className="font-mono text-meta text-[var(--ink-quiet)] mb-6">
          {String(filtered.length).padStart(2, "0")} PROJECTS ·{" "}
          {filter === "all" ? "ALL CATEGORIES" : filter.toUpperCase()}
        </p>

        {/* Grid view */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                data-cursor="Open"
                className="group rounded-md border border-[var(--border-soft)] bg-[var(--surface-deep)]/60 overflow-hidden hover:border-[var(--accent-warm)] transition-colors yg-lift"
              >
                {/* Color strip */}
                <div className="h-1" style={{ background: p.accent }} />
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-meta text-[var(--ink-quiet)]">0{p.index}</span>
                    <span className="font-mono text-meta" style={{ color: p.accent }}>
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-display text-h3 text-[var(--ink-bone)] group-hover:text-[var(--accent-warm)] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-serif italic text-small text-[var(--ink-soft)] mt-1">
                    {p.tagline}
                  </p>
                  <p className="text-small text-[var(--ink-soft)] mt-4 yg-clamp-3">
                    {p.shortDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-meta text-[var(--ink-quiet)] px-2 py-0.5 rounded border border-[var(--border-soft)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-[var(--border-soft)] flex items-center justify-between">
                    <span className="font-mono text-meta text-[var(--ink-quiet)]">
                      {p.category.toUpperCase()}
                    </span>
                    <IconArrowRight
                      size={12}
                      className="text-[var(--ink-quiet)] group-hover:text-[var(--accent-warm)] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                data-cursor="Open"
                className="group grid grid-cols-12 gap-4 py-5 border-b border-[var(--border-soft)] hover:bg-[var(--surface-deep)]/40 transition-colors px-2"
              >
                <span className="col-span-1 font-mono text-meta text-[var(--ink-quiet)]">
                  0{p.index}
                </span>
                <div className="col-span-3">
                  <h3 className="font-display text-h3 text-[var(--ink-bone)] group-hover:text-[var(--accent-warm)] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-mono text-meta text-[var(--ink-quiet)] mt-1">{p.tagline}</p>
                </div>
                <p className="col-span-4 text-small text-[var(--ink-soft)] self-center yg-clamp-2">
                  {p.shortDescription}
                </p>
                <span className="col-span-2 font-mono text-meta self-center" style={{ color: p.accent }}>
                  {p.status.toUpperCase()}
                </span>
                <span className="col-span-2 font-mono text-meta text-[var(--ink-quiet)] self-center text-right">
                  {p.category.toUpperCase()}
                  <IconArrowRight
                    size={10}
                    className="inline ml-2 text-[var(--ink-quiet)] group-hover:text-[var(--accent-warm)] group-hover:translate-x-1 transition-all"
                  />
                </span>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-meta text-[var(--ink-quiet)]">
              NO PROJECTS MATCH · TRY A DIFFERENT QUERY
            </p>
          </div>
        )}
      </div>

      <style>{`
        .yg-search-input {
          width: 100%;
          max-width: 320px;
          background: var(--bg-base);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          padding: 0.625rem 0.875rem;
          font-family: var(--font-body);
          font-size: var(--text-body);
          color: var(--ink-bone);
          transition: border-color 200ms, box-shadow 200ms;
        }
        .yg-search-input:focus {
          outline: none;
          border-color: var(--accent-warm);
          box-shadow: 0 0 0 3px var(--accent-warm-soft);
        }
        .yg-search-input::placeholder { color: var(--ink-quiet); }
      `}</style>
    </main>
  );
}
