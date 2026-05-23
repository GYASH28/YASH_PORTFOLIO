import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import "./LiveShowcase.css";

const campusMate = {
  url: "https://campuscwit.vercel.app",
  displayUrl: "campuscwit.vercel.app",
  name: "CampusMate",
  type: "Campus Management Platform",
  tech: ["React", "Firebase", "PWA"],
  metrics: [
    { val: "Live", label: "Attendance" },
    { val: "Smart", label: "Timetable" },
    { val: "Role", label: "Access" },
  ],
};

export function LiveShowcase() {
  return (
    <div className="ls-section" aria-labelledby="campus-live-title">
      <div className="ls-copy">
        <p className="ls-label">CampusMate live spotlight</p>
        <h2 id="campus-live-title" className="ls-title">
          CampusMate is running live.
        </h2>
        <p className="ls-subtitle">
          A role-based campus workspace for attendance, notices, timetable, and college operations. Preview the live build or launch it in a new tab.
        </p>
        <a href={campusMate.url} target="_blank" rel="noreferrer" className="ls-open-btn ls-copy-btn focus-ring">
          Launch CampusMate <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>

      <CampusLiveCard project={campusMate} />
    </div>
  );
}

function CampusLiveCard({ project }) {
  const iframeRef = useRef(null);
  const cardRef = useRef(null);
  const timerRef = useRef(null);
  const loadedRef = useRef(false);
  const [status, setStatus] = useState("SYS/ONLINE");
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    const card = cardRef.current;
    if (!iframe) return undefined;

    const clearFallbackTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const startFallbackTimer = () => {
      if (timerRef.current || loadedRef.current) return;
      setStatus("SYNCING");
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        if (!loadedRef.current) {
          setStatus("OPEN/TAB");
          setFallback(true);
        }
      }, 7000);
    };

    let observer = null;

    if (card && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            startFallbackTimer();
            observer?.disconnect();
          }
        },
        { rootMargin: "360px 0px", threshold: 0.12 },
      );
      observer.observe(card);
    } else {
      startFallbackTimer();
    }

    const onLoad = () => {
      loadedRef.current = true;
      clearFallbackTimer();
      setStatus("ACTIVE/LIVE");
      setFallback(false);
    };

    const onError = () => {
      loadedRef.current = false;
      clearFallbackTimer();
      setStatus("BLOCKED/TAB");
      setFallback(true);
    };

    iframe.addEventListener("load", onLoad);
    iframe.addEventListener("error", onError);
    return () => {
      observer?.disconnect();
      clearFallbackTimer();
      iframe.removeEventListener("load", onLoad);
      iframe.removeEventListener("error", onError);
    };
  }, []);

  return (
    <article ref={cardRef} className="ls-card" style={{ "--ls-accent": "#4F8EF7" }}>
      <div className="ls-chrome">
        <div className="ls-traffic" aria-hidden="true">
          <span className="ls-dot ls-dot--r" />
          <span className="ls-dot ls-dot--y" />
          <span className="ls-dot ls-dot--g" />
        </div>
        <div className="ls-url-bar">
          <span className="ls-lock">SECURE</span>
          <span className="ls-url-text">{project.displayUrl}</span>
        </div>
        <div className="ls-live-badge">
          <span className="ls-live-dot" />
          LIVE
        </div>
      </div>

      <div className="ls-iframe-wrap">
        <div className="ls-scan" aria-hidden="true" />
        <div className="ls-shimmer" aria-hidden="true" />
        <div className="ls-hud">{status}</div>

        {fallback && (
          <div className="ls-fallback">
            <span className="ls-fallback-kicker">Preview unavailable here</span>
            <span>CampusMate may block embeds. Open the live project in a new tab.</span>
            <a href={project.url} target="_blank" rel="noreferrer" className="ls-fallback-link">
              Open {project.displayUrl} <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={project.url}
          title={`${project.name} live preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="ls-metrics">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="ls-metric">
            <div className="ls-metric-val">{metric.val}</div>
            <div className="ls-metric-label">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="ls-info-bar">
        <div className="ls-project-meta">
          <div className="ls-project-name">{project.name}</div>
          <div className="ls-project-type">{project.type}</div>
        </div>
        <div className="ls-tech-pills" aria-label="CampusMate tech stack">
          {project.tech.map((tech) => (
            <span key={tech} className="ls-pill">
              {tech}
            </span>
          ))}
        </div>
        <a href={project.url} target="_blank" rel="noreferrer" className="ls-open-btn focus-ring">
          Launch CampusMate <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
