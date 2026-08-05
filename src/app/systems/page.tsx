"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  IconArrowRight,
  IconExternal,
  IconRepo,
  IconLive,
  IconArrowDown,
} from "@/components/ui-yg/icons";

type Filter = "all" | Project["category"];
type View = "card" | "list";

const CATEGORIES: Filter[] = [
  "all",
  "AI Learning System",
  "AI Companion",
  "Campus Platform",
  "Commerce Platform",
];

export default function SystemsArchive() {
  const [view, setView] = useState<View>("card");
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
        p.purpose.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [filter, query]);

  return (
    <main className="relative min-h-screen pt-24 pb-32">
      {/* Background */}
      <div className="fixed inset-0 yg-grid-bg opacity-20 pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(107,91,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Back link */}
        <Link
          href="/#systems"
          className="inline-flex items-center gap-2 font-mono text-meta text-[var(--text-muted)] hover:text-[var(--signal-primary)] transition-colors mb-8"
        >
          ← BACK TO HOME
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 font-mono text-meta text-[var(--text-muted)] mb-4">
            <span className="h-px w-8 bg-[var(--signal-primary)]" />
            <span>ALL SYSTEMS · ARCHIVE</span>
          </div>
          <h1 className="font-display text-display-2 md:text-display-1 leading-[0.95] max-w-[18ch]">
            Every system,{" "}
            <span className="text-[var(--signal-primary)]">one archive</span>.
          </h1>
          <p className="mt-6 max-w-[50ch] text-body-lg text-[var(--text-secondary)]">
            Browse every project as a card or compact list. Filter by category,
            search by technology. Each entry links to its full case study.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6 border-b border-[var(--border-soft)]">
          {/* Search */}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, technology…"
            className="yg-search-input"
            aria-label="Search systems"
          />

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:ml-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full font-mono text-meta transition-colors ${
                  filter === c
                    ? "bg-[var(--signal-primary)] text-[#0a0a0f]"
                    : "border border-[var(--border-soft)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {c === "all" ? "ALL" : c.toUpperCase()}
              </button>
            ))}
          </div>

          {/* View switch */}
          <div className="flex items-center gap-1 rounded-full border border-[var(--border-soft)] p-1">
            <button
              onClick={() => setView("card")}
              className={`px-3 py-1 rounded-full font-mono text-meta ${
                view === "card"
                  ? "bg-[var(--signal-primary)] text-[#0a0a0f]"
                  : "text-[var(--text-muted)]"
              }`}
              aria-pressed={view === "card"}
            >
              CARDS
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded-full font-mono text-meta ${
                view === "list"
                  ? "bg-[var(--signal-primary)] text-[#0a0a0f]"
                  : "text-[var(--text-muted)]"
              }`}
              aria-pressed={view === "list"}
            >
              LIST
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="font-mono text-meta text-[var(--text-muted)] mb-6">
          {String(filtered.length).padStart(2, "0")} SYSTEMS ·{" "}
          {filter === "all" ? "ALL CATEGORIES" : filter.toUpperCase()}
        </p>

        {/* Grid */}
        {view === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`/systems/${p.slug}`}
                data-cursor="OPEN"
                className="group rounded-lg border border-[var(--border-soft)] bg-[var(--surface-1)]/60 overflow-hidden hover:border-[var(--signal-primary)] transition-colors"
              >
                {/* Color strip */}
                <div
                  className="h-1"
                  style={{ background: p.colorTheme.primary }}
                />
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-meta text-[var(--text-muted)]">
                      0{p.index}
                    </span>
                    <span
                      className="font-mono text-meta"
                      style={{ color: p.colorTheme.primary }}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-display text-h3 text-[var(--text-primary)] group-hover:text-[var(--signal-primary)] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-mono text-small text-[var(--text-muted)] mt-1">
                    {p.tagline}
                  </p>
                  <p className="text-small text-[var(--text-secondary)] mt-4 yg-clamp-3">
                    {p.purpose}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-meta text-[var(--text-muted)] px-2 py-0.5 rounded border border-[var(--border-soft)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-[var(--border-soft)] flex items-center justify-between">
                    <span className="font-mono text-meta text-[var(--text-muted)]">
                      {p.category.toUpperCase()}
                    </span>
                    <IconArrowRight
                      size={14}
                      className="text-[var(--text-muted)] group-hover:text-[var(--signal-primary)] group-hover:translate-x-1 transition-all"
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
                href={`/systems/${p.slug}`}
                data-cursor="OPEN"
                className="group grid grid-cols-12 gap-4 py-5 border-b border-[var(--border-soft)] hover:bg-[var(--surface-1)]/40 transition-colors px-2"
              >
                <span className="col-span-1 font-mono text-meta text-[var(--text-muted)]">
                  0{p.index}
                </span>
                <div className="col-span-3">
                  <h3 className="font-display text-h3 text-[var(--text-primary)] group-hover:text-[var(--signal-primary)] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-mono text-meta text-[var(--text-muted)] mt-1">
                    {p.tagline}
                  </p>
                </div>
                <p className="col-span-4 text-small text-[var(--text-secondary)] self-center yg-clamp-2">
                  {p.purpose}
                </p>
                <span
                  className="col-span-2 font-mono text-meta self-center"
                  style={{ color: p.colorTheme.primary }}
                >
                  {p.status.toUpperCase()}
                </span>
                <span className="col-span-2 font-mono text-meta text-[var(--text-muted)] self-center text-right">
                  {p.category.toUpperCase()}
                  <IconArrowRight
                    size={12}
                    className="inline ml-2 text-[var(--text-muted)] group-hover:text-[var(--signal-primary)] group-hover:translate-x-1 transition-all"
                  />
                </span>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-meta text-[var(--text-muted)]">
              NO SYSTEMS MATCH · TRY A DIFFERENT QUERY
            </p>
          </div>
        )}
      </div>

      <style>{`
        .yg-search-input {
          width: 100%;
          max-width: 320px;
          background: var(--bg-primary);
          border: 1px solid var(--border-strong);
          border-radius: 6px;
          padding: 0.625rem 0.875rem;
          font-family: var(--font-body);
          font-size: var(--text-body);
          color: var(--text-primary);
          transition: border-color 200ms, box-shadow 200ms;
        }
        .yg-search-input:focus {
          outline: none;
          border-color: var(--signal-primary);
          box-shadow: 0 0 0 3px var(--signal-glow);
        }
        .yg-search-input::placeholder {
          color: var(--text-muted);
        }
      `}</style>
    </main>
  );
}
