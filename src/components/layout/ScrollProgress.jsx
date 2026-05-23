import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 9999,
      height: '2px', width: `${progress}%`,
      background: 'linear-gradient(90deg, var(--mint), var(--blue))',
      transition: 'width 60ms linear',
      pointerEvents: 'none'
    }} />
  );
}
