"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/hooks/use-active-section";
import { IDENTITY } from "@/data/projects";
import { IconClose, IconMail, IconGitHub, IconLinkedIn, IconArrowRight } from "@/components/ui-yg/icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll + escape close when open.
  useEffect(() => {
    if (!mounted) return;
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, onClose, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[90] md:hidden transition-all duration-500 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ transitionTimingFunction: "var(--ease-enter)" }}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-enter)" }}
      />

      {/* Sheet content */}
      <div
        className={`absolute inset-0 flex flex-col p-6 pt-20 transition-transform duration-500 ${
          open ? "translate-y-0" : "-translate-y-4"
        }`}
        style={{ transitionTimingFunction: "var(--ease-enter)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2"
          aria-label="Close menu"
        >
          <IconClose size={22} />
        </button>

        <nav className="flex flex-col gap-2 mt-6">
          {SECTIONS.filter((s) => s.id !== "boot").map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={onClose}
              className="group flex items-baseline gap-4 py-3 border-b border-[var(--border-soft)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 400ms var(--ease-enter) ${i * 60}ms, transform 400ms var(--ease-enter) ${i * 60}ms`,
              }}
            >
              <span className="font-mono text-meta text-[var(--text-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-h2 text-[var(--text-primary)] group-hover:text-[var(--signal-primary)] transition-colors">
                {s.label}
              </span>
              <IconArrowRight
                size={16}
                className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--signal-primary)] transition-colors"
              />
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--signal-primary)] px-6 py-4 font-mono text-meta text-[#0a0a0f] hover:bg-[var(--signal-soft)] transition-colors"
          >
            START A PROJECT
          </a>
          <div className="flex items-center justify-center gap-6 pt-2">
            <a href={`mailto:${IDENTITY.email}`} aria-label="Email" className="text-[var(--text-muted)] hover:text-[var(--signal-primary)] transition-colors">
              <IconMail size={20} />
            </a>
            <a href={IDENTITY.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="text-[var(--text-muted)] hover:text-[var(--signal-primary)] transition-colors">
              <IconGitHub size={20} />
            </a>
            <a href={IDENTITY.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="text-[var(--text-muted)] hover:text-[var(--signal-primary)] transition-colors">
              <IconLinkedIn size={20} />
            </a>
          </div>
          <p className="text-center font-mono text-meta text-[var(--text-muted)] pt-2">
            {IDENTITY.location}
          </p>
        </div>
      </div>
    </div>
  );
}
