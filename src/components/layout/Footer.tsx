"use client";

import Link from "next/link";
import { PROFILE } from "@/data/projects";
import { YGMark } from "@/components/ui-yg/icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full border-t border-[var(--border-soft)] py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 yg-grid-subtle opacity-20" />
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="font-display text-h2 text-[var(--ink-bone)] group-hover:text-[var(--accent-warm)] transition-colors">
                Yash<span className="text-[var(--accent-warm)]">.</span>
              </span>
            </Link>
            <p className="mt-6 max-w-[40ch] text-small text-[var(--ink-soft)]">
              {PROFILE.positioning} {PROFILE.location}. Building useful futures, one working system at a time.
            </p>
            <p className="font-serif italic text-small text-[var(--ink-quiet)] mt-4">
              “{PROFILE.secondaryLine}”
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="font-mono text-meta text-[var(--ink-quiet)] mb-4">MAP</p>
            <ul className="space-y-2">
              {[
                { label: "Work", href: "/#work" },
                { label: "Process", href: "/#process" },
                { label: "Capabilities", href: "/#capabilities" },
                { label: "About", href: "/#about" },
                { label: "Contact", href: "/#contact" },
                { label: "All Work", href: "/work" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-small text-[var(--ink-soft)] hover:text-[var(--accent-warm)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct */}
          <div className="md:col-span-2">
            <p className="font-mono text-meta text-[var(--ink-quiet)] mb-4">DIRECT</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-small text-[var(--ink-soft)] hover:text-[var(--accent-warm)] transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-small text-[var(--ink-soft)] hover:text-[var(--accent-warm)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-small text-[var(--ink-soft)] hover:text-[var(--accent-warm)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Build */}
          <div className="md:col-span-2">
            <p className="font-mono text-meta text-[var(--ink-quiet)] mb-4">BUILD</p>
            <ul className="space-y-2 font-mono text-meta text-[var(--ink-quiet)]">
              <li>v2.0</li>
              <li>BUILT IN PUNE</li>
              <li className="text-[var(--accent-warm)]">● OPERATIONAL</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border-soft)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-mono text-meta text-[var(--ink-quiet)]">
            © {year} {PROFILE.name}. Built with care.
          </p>
          <p className="font-mono text-meta text-[var(--ink-quiet)]">
            Next.js · React Three Fiber · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
