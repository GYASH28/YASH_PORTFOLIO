import { useRef } from "react";

export const MagneticButton = ({ children, strength = 0.3, className = "", ...props }) => {
  const ref = useRef(null);
  const innerRef = useRef(null);

  const onMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el || !innerRef.current) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    innerRef.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      {...props}
    >
      <span ref={innerRef} className="magnetic-target inline-flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </button>
  );
};
