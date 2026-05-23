import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(pointerFine);
    if (!pointerFine) return undefined;

    const move = (event) => {
      target.current = { x: event.clientX, y: event.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }

      const hovered = event.target.closest("a, button, input, textarea, .project-card, [data-cursor]");
      const type = hovered?.classList.contains("project-card")
        ? "project"
        : hovered?.matches("input, textarea")
          ? "text"
          : hovered?.dataset.cursor || (hovered ? "link" : "default");

      document.documentElement.dataset.cursor = type;
      if (labelRef.current) labelRef.current.textContent = type === "project" ? "VIEW" : "";
    };

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    const frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} />
      </div>
    </>
  );
}
