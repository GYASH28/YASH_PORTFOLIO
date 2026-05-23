import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    id: 'lernio',
    url: 'https://lernioai.vercel.app',
    displayUrl: 'lernioai.vercel.app',
    name: 'Lernio AI',
    type: 'AI Learning Platform',
    accent: 'mint',
    description: 'AI-powered quiz generation, smart hints, and viva prep — built to make studying actually work.',
    tech: ['React', 'Gemini AI', 'Firebase', 'Vercel'],
    metrics: [
      { val: 'AI', label: 'Quiz Gen' },
      { val: 'Smart', label: 'Hints' },
      { val: 'Viva', label: 'Prep' },
    ],
    badge: 'FEATURED PRODUCT',
  },
  {
    id: 'campus',
    url: 'https://campuscwit.vercel.app',
    displayUrl: 'campuscwit.vercel.app',
    name: 'CampusMate',
    type: 'Campus Management Platform',
    accent: 'blue',
    description: 'One platform for attendance, timetables, and campus management. Role-based access for students and faculty.',
    tech: ['React', 'Firebase', 'Framer Motion', 'PWA'],
    metrics: [
      { val: 'Role', label: 'Based Access' },
      { val: 'Live', label: 'Attendance' },
      { val: 'PWA', label: 'Installable' },
    ],
    badge: 'LIVE PLATFORM',
  },
]

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function ProjectCard({ project, index }) {
  const iframeRef = useRef(null)
  const fallbackRef = useRef(null)
  const hudRef = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(cardRef)
  const [loaded, setLoaded] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const timer = setTimeout(() => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (!doc || !doc.body || doc.title === '') {
          setBlocked(true)
          if (hudRef.current) hudRef.current.textContent = 'TAB/ONLY'
        }
      } catch {
        // Cross-origin = loaded fine, just can't read DOM
        setLoaded(true)
        if (hudRef.current) hudRef.current.textContent = 'ACTIVE/LIVE'
      }
    }, 5000)

    const onLoad = () => {
      clearTimeout(timer)
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (!doc || doc.title === '') { setBlocked(true); if (hudRef.current) hudRef.current.textContent = 'TAB/ONLY' }
        else { setLoaded(true); if (hudRef.current) hudRef.current.textContent = 'ACTIVE/LIVE' }
      } catch {
        setLoaded(true)
        if (hudRef.current) hudRef.current.textContent = 'ACTIVE/LIVE'
      }
    }
    const onError = () => { clearTimeout(timer); setBlocked(true); if (hudRef.current) hudRef.current.textContent = 'TAB/ONLY' }

    iframe.addEventListener('load', onLoad)
    iframe.addEventListener('error', onError)
    return () => { clearTimeout(timer); iframe.removeEventListener('load', onLoad); iframe.removeEventListener('error', onError) }
  }, [])

  const accentColor = project.accent === 'mint' ? 'var(--mint)' : 'var(--blue)'

  return (
    <div
      ref={cardRef}
      className={`ls-card ls-card--${project.accent} ${inView ? 'ls-card--visible' : ''}`}
      style={{ '--delay': `${index * 150}ms` }}
    >
      {/* Featured badge */}
      <div className={`ls-badge ls-badge--${project.accent}`}>{project.badge}</div>

      {/* Browser chrome */}
      <div className="ls-chrome">
        <div className="ls-traffic">
          <div className="ls-dot" style={{ background: '#FF5F57' }} />
          <div className="ls-dot" style={{ background: '#FEBC2E' }} />
          <div className="ls-dot" style={{ background: '#28C840' }} />
        </div>
        <div className="ls-url-bar">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span className="ls-url-text">{project.displayUrl}</span>
        </div>
        <div className={`ls-live-badge ls-live-badge--${project.accent}`}>
          <div className={`ls-live-dot ls-live-dot--${project.accent}`} />
          LIVE
        </div>
      </div>

      {/* Iframe */}
      <div className="ls-iframe-wrap">
        <div className="ls-scan" />
        <div className={`ls-shimmer ls-shimmer--${project.accent}`} />
        <div ref={hudRef} className={`ls-hud ls-hud--${project.accent}`}>SYS/BOOT</div>

        {/* Corner cross-hairs */}
        <div className={`ls-crosshair ls-crosshair--tl ls-crosshair--${project.accent}`} />
        <div className={`ls-crosshair ls-crosshair--br ls-crosshair--${project.accent}`} />

        {/* Fallback */}
        {blocked && (
          <div className="ls-fallback">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <p>Opens in new tab — embedding restricted</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer"
               className={`ls-fallback-link ls-fallback-link--${project.accent}`}>
              Launch {project.name} ↗
            </a>
          </div>
        )}

        {!blocked && (
          <iframe
            ref={iframeRef}
            src={project.url}
            title={project.name}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        )}
      </div>

      {/* Description */}
      <div className="ls-description">{project.description}</div>

      {/* Metrics */}
      <div className="ls-metrics">
        {project.metrics.map((m) => (
          <div key={m.label} className="ls-metric">
            <div className={`ls-metric-val ls-metric-val--${project.accent}`}>{m.val}</div>
            <div className="ls-metric-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Info bar */}
      <div className="ls-info-bar">
        <div>
          <div className="ls-project-name">{project.name}</div>
          <div className="ls-project-type">{project.type}</div>
        </div>
        <div className="ls-right-bar">
          <div className="ls-tech-pills">
            {project.tech.map((t) => (
              <span key={t} className="ls-pill">{t}</span>
            ))}
          </div>
          <a href={project.url} target="_blank" rel="noopener noreferrer"
             className={`ls-open-btn ls-open-btn--${project.accent}`}>
            <span>Launch</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function LiveShowcase() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, 0.1)

  return (
    <section ref={sectionRef} id="projects" className={`ls-section ${inView ? 'ls-section--visible' : ''}`}>
      <div className="ls-header">
        <div className="ls-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          04 — THE OUTPUT
        </div>
        <h2 className="ls-title">
          Live products.<br />
          <span className="ls-accent">Built & shipped.</span>
        </h2>
        <p className="ls-subtitle">
          Real products, running live. Watch them work — or tap to launch and explore.
        </p>
      </div>

      <div className="ls-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>

      <div className="ls-bottom-row">
        <div>
          <div className="ls-bottom-title">More in the <span className="ls-accent">pipeline.</span></div>
          <div className="ls-bottom-sub">AI tools, creative experiments & unreleased builds.</div>
        </div>
        <a href="https://github.com/GYASH28" target="_blank" rel="noopener noreferrer" className="ls-open-btn ls-open-btn--mint ls-open-btn--lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View GitHub
        </a>
      </div>
    </section>
  )
}
