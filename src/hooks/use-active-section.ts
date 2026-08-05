"use client";

import { useEffect, useState } from "react";

export interface SectionInfo {
  id: string;
  label: string;
  code: string;
}

export const SECTIONS: SectionInfo[] = [
  { id: "boot", label: "Boot", code: "BOOT" },
  { id: "hero", label: "Hero", code: "SIGNAL_CORE" },
  { id: "position", label: "Position", code: "POSITION" },
  { id: "anatomy", label: "System Anatomy", code: "ANATOMY" },
  { id: "systems", label: "Selected Systems", code: "SYSTEMS" },
  { id: "capabilities", label: "Capabilities", code: "CAPABILITIES" },
  { id: "about", label: "Human Layer", code: "HUMAN" },
  { id: "contact", label: "Final Signal", code: "CONTACT" },
];

/**
 * Tracks which section is currently most in-view.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * Returns the global scroll progress (0..1) of the document.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? doc.scrollTop / max : 0;
        setProgress(Math.max(0, Math.min(1, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}
