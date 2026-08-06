"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollProgress } from "@/hooks/use-scroll";
import { NAV_ITEMS } from "@/data/projects";
import { IconMenu, IconClose, IconArrowRight } from "@/components/ui-yg/icons";

export default function Navigation() {
  const pathname = usePathname();
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body + close on Escape when mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    document.body.style.overflow = "";
  }, [menuOpen]);

  // Don't show sticky nav on case study routes — they have their own header.
  const isCaseStudy = pathname?.startsWith("/work/") && pathname !== "/work";

  return (
    <>
      {/* Top progress line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-px bg-transparent">
        <div
          className="h-full bg-[var(--accent-warm)]"
          style={{
            width: `${progress * 100}%`,
            transition: "width 80ms linear",
          }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3 bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-soft)]" : "py-5"
        }`}
        style={{ transitionTimingFunction: "var(--ease-soft)" }}
      >
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
          {/* Left: signature */}
          <Link
            href="/"
            className="font-display text-h3 font-semibold tracking-tight text-[var(--ink-bone)] hover:text-[var(--accent-warm)] transition-colors"
            aria-label="Yash Ganesh — home"
          >
            Yash<span className="text-[var(--accent-warm)]">.</span>
          </Link>

          {/* Middle: nav links — desktop */}
          {!isCaseStudy && (
            <nav className="hidden md:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative font-mono text-meta text-[var(--ink-quiet)] hover:text-[var(--ink-bone)] transition-colors"
                >
                  <span className="text-[var(--ink-faint)] mr-1.5">{item.code}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right: CTA + mobile menu trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--ink-bone)] text-[var(--bg-base)] px-4 py-2 font-mono text-meta hover:bg-[var(--accent-warm)] transition-colors yg-press"
            >
              Start a Project
              <IconArrowRight size={12} />
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 text-[var(--ink-bone)] hover:text-[var(--accent-warm)] transition-colors"
              aria-label="Open menu"
            >
              <IconMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet */}
      <div
        className={`fixed inset-0 z-[90] md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-[var(--bg-base)]/95 backdrop-blur-xl" />

        <div
          className={`absolute inset-0 flex flex-col p-6 pt-20 transition-transform duration-500 ${
            menuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
          style={{ transitionTimingFunction: "var(--ease-cinema)" }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2"
            aria-label="Close menu"
          >
            <IconClose size={22} />
          </button>

          <nav className="flex flex-col gap-1 mt-8">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 py-4 border-b border-[var(--border-soft)]"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 400ms var(--ease-cinema) ${i * 50}ms, transform 400ms var(--ease-cinema) ${i * 50}ms`,
                }}
              >
                <span className="font-mono text-meta text-[var(--ink-faint)]">{item.code}</span>
                <span className="font-display text-h2 text-[var(--ink-bone)] group-hover:text-[var(--accent-warm)] transition-colors">
                  {item.label}
                </span>
                <IconArrowRight
                  size={16}
                  className="ml-auto text-[var(--ink-quiet)] group-hover:text-[var(--accent-warm)] transition-colors"
                />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink-bone)] text-[var(--bg-base)] px-6 py-4 font-mono text-meta"
            >
              Start a Project
              <IconArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
