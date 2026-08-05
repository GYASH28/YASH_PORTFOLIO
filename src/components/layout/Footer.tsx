"use client";

import { IDENTITY } from "@/data/projects";
import { YGMark } from "@/components/ui-yg/icons";

/**
 * Footer reveal — appears beneath the final signal as a quiet system close.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full border-t border-[var(--border-soft)] py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 yg-grid-bg opacity-10" />
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          {/* Mark + tagline */}
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-3">
              <YGMark size={32} />
              <div className="flex flex-col leading-none">
                <span className="font-display text-h3 font-semibold">
                  Y/G Systems Studio
                </span>
                <span className="font-mono text-meta text-[var(--text-muted)] mt-1">
                  {IDENTITY.tagline.toUpperCase()}
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-[36ch] text-small text-[var(--text-secondary)]">
              {IDENTITY.name} — {IDENTITY.role}. {IDENTITY.location}.
              Building useful futures, one working system at a time.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="font-mono text-meta text-[var(--text-muted)] mb-4">MAP</p>
            <ul className="space-y-2">
              {[
                { label: "Selected Systems", href: "#systems" },
                { label: "Method", href: "#anatomy" },
                { label: "Capabilities", href: "#capabilities" },
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-small text-[var(--text-secondary)] hover:text-[var(--signal-primary)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <p className="font-mono text-meta text-[var(--text-muted)] mb-4">DIRECT</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${IDENTITY.email}`}
                  className="text-small text-[var(--text-secondary)] hover:text-[var(--signal-primary)] transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-small text-[var(--text-secondary)] hover:text-[var(--signal-primary)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-small text-[var(--text-secondary)] hover:text-[var(--signal-primary)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Build version */}
          <div className="md:col-span-2">
            <p className="font-mono text-meta text-[var(--text-muted)] mb-4">SYSTEM</p>
            <ul className="space-y-2 font-mono text-meta text-[var(--text-muted)]">
              <li>BUILD · 2.0</li>
              <li>SIGNAL OS · 01</li>
              <li className="text-[var(--success)]">● OPERATIONAL</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-soft)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-mono text-meta text-[var(--text-muted)]">
            © {year} {IDENTITY.name}. All systems reserved.
          </p>
          <p className="font-mono text-meta text-[var(--text-muted)]">
            Built in Pune · Deployed via Vercel · No tracking
          </p>
        </div>
      </div>
    </footer>
  );
}
