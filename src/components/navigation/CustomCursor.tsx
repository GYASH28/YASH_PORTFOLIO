"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Custom cursor — desktop fine-pointer only.
 * Reveals context labels over interactive targets via data-cursor="...".
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches && !reduced);
    if (!mq.matches || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      setHidden(false);
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };

    const onLeave = () => setHidden(true);
    const onDown = () => { if (ring) ring.style.transform += " scale(0.85)"; };
    const onUp = () => { /* reset handled by next mousemove */ };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
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
      <div
        ref={ringRef}
        className="absolute top-0 left-0"
        style={{
          width: label ? "60px" : "32px",
          height: label ? "60px" : "32px",
          border: "1px solid var(--accent-warm)",
          borderRadius: "50%",
          background: label ? "rgba(245, 168, 91, 0.15)" : "transparent",
          transition: "width 240ms var(--ease-spring), height 240ms var(--ease-spring), background 240ms",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0"
        style={{
          width: "5px",
          height: "5px",
          background: "var(--accent-warm)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
