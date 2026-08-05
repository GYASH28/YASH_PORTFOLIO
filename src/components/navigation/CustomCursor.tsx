"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Custom signal-reactive cursor — desktop only (pointer: fine).
 *
 * - A small signal dot at the cursor.
 * - A larger halo that follows with slight lag.
 * - Grows + changes label over interactive targets (data-cursor="label").
 * - Hidden on touch devices, form inputs, and text selections.
 * - Respects reduced motion (no halo lag).
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on fine pointers.
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches && !reduced);

    if (!mq.matches || reduced) return;

    const dot = dotRef.current;
    const halo = haloRef.current;
    if (!dot || !halo) return;

    let mouseX = 0;
    let mouseY = 0;
    let haloX = 0;
    let haloY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Check for cursor label targets.
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      setLabel(target?.dataset.cursor ?? "");
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => {
      dot?.style.setProperty("--press", "0.7");
    };
    const onUp = () => {
      dot?.style.setProperty("--press", "1");
    };

    // Halo lag — disable if reduced motion.
    const tick = () => {
      haloX += (mouseX - haloX) * 0.18;
      haloY += (mouseY - haloY) * 0.18;
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    if (!reduced) {
      raf = requestAnimationFrame(tick);
    } else {
      // Snap halo to cursor.
      const snap = (e: MouseEvent) => {
        halo.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      };
      window.addEventListener("mousemove", snap);
      return () => {
        window.removeEventListener("mousemove", snap);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseout", onLeave);
        window.removeEventListener("mouseover", onEnter);
        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("mouseup", onUp);
        cancelAnimationFrame(raf);
      };
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mouseover", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 z-[80] pointer-events-none yg-custom-cursor"
      aria-hidden="true"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 200ms" }}
    >
      {/* Halo */}
      <div
        ref={haloRef}
        className="absolute top-0 left-0"
        style={{
          width: label ? "64px" : "36px",
          height: label ? "64px" : "36px",
          border: "1px solid var(--signal-primary)",
          borderRadius: "50%",
          background: label ? "var(--signal-glow)" : "transparent",
          transition: "width 240ms var(--ease-spring), height 240ms var(--ease-spring), background 240ms",
          mixBlendMode: "screen",
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0"
        style={{
          width: "6px",
          height: "6px",
          background: "var(--signal-primary)",
          borderRadius: "50%",
          boxShadow: "0 0 8px var(--signal-glow)",
        }}
      />
      {/* Label */}
      {label && (
        <div
          className="absolute top-0 left-0 font-mono text-meta text-[var(--text-primary)]"
          style={{
            transform: "translate3d(0, 0, 0)",
            left: "50%",
            top: "calc(100% + 8px)",
            whiteSpace: "nowrap",
          }}
          ref={(el) => {
            if (el && dotRef.current) {
              const rect = dotRef.current.getBoundingClientRect();
              el.style.transform = `translate3d(${rect.left - 30}px, ${rect.top + 24}px, 0)`;
            }
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
