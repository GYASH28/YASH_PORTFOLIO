import { useEffect, useRef, useState } from "react";

export function RevealText({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`reveal-wrap ${className}`}>
      <span className={`reveal-inner ${visible ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}
