import { useRef } from "react";

export function MagneticButton({ children, className = "", as: Component = "button", ...props }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.18}px) scale(1.02)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0) scale(1)";
  };

  return (
    <Component
      ref={ref}
      className={`magnetic-target focus-ring ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...props}
    >
      {children}
    </Component>
  );
}
