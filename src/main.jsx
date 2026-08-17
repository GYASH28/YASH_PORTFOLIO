import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import './styles.css';

import heroPortrait from '../assets/ykg-hero-v13-4k.jpg';
import fakhriHome from '../assets/fakhri-mart-home.webp';
import fakhriDesktop from '../assets/fakhrimart-desktop-current.avif';
import fakhriMobile from '../assets/fakhrimart-mobile-current.avif';
import fakhriCompare from '../assets/desktop-light-compare.png';
import fakhriCatalogue from '../assets/desktop-light-catalogue-section-00.png';
import heroAI from '../assets/hero-ai.avif';

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { stiffness: 120, damping: 28, mass: 0.65 };

const projects = [
  {
    id: '01',
    name: 'FakhriMart',
    kind: 'Commerce / Client work',
    line: 'A wholesale catalogue turned into a clearer, faster digital sales surface.',
    image: fakhriHome,
    href: '/work/fakhrimart',
  },
  {
    id: '02',
    name: 'Lernio AI',
    kind: 'AI / Product system',
    line: 'A learning operating system built around tutoring, revision, planning and progress.',
    image: heroAI,
    href: '/work',
  },
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to) => {
    if (to.startsWith('http') || to.startsWith('mailto:')) {
      window.location.href = to;
      return;
    }
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  return { path, go };
}

function MagneticLink({ children, className = '', onClick, href = '#', label }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduced = useReducedMotion();
  const move = (e) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.14);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.14);
  };
  return (
    <motion.a
      href={href}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      aria-label={label}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

function SplitLine({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <span className={`split-line ${className}`}>
      <motion.span
        initial={reduced ? false : { y: '115%' }}
        whileInView={reduced ? {} : { y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >{children}</motion.span>
    </span>
  );
}

function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, SPRING);
  return <motion.div className="progress-rail" style={{ scaleY }} aria-hidden="true" />;
}

function CursorAura() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, x, y]);
  if (reduced) return null;
  return <motion.div className="cursor-aura" style={{ x, y }} aria-hidden="true" />;
}

function Nav({ go, path }) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last.current && y > 180);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.header className="nav" animate={{ y: hidden ? -92 : 0 }} transition={{ duration: 0.35, ease: EASE }}>
      <button className="brand" onClick={() => go('/')} aria-label="YKG Digital home"><i />YKG DIGITAL</button>
      <nav aria-label="Primary navigation">
        {path === '/' && <a href="#work">Work</a>}
        <button onClick={() => go('/work')}>Archive</button>
        {path === '/' && <a href="#studio">Studio</a>}
        {path === '/' && <a href="#about">About</a>}
      </nav>
      <MagneticLink href="mailto:yashganesh.work@gmail.com?subject=Website%20project" className="nav-cta">Start a project <span>↗</span></MagneticLink>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 24, mass: 0.8 });
  const bgY = useTransform(progress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(progress, [0, 1], [1.08, 1.18]);
  const nameY = useTransform(progress, [0, 0.7, 1], ['0%', '-18%', '-35%']);
  const nameScale = useTransform(progress, [0, 0.8], [1, 0.82]);
  const portraitY = useTransform(progress, [0, 1], ['0%', '25%']);
  const portraitScale = useTransform(progress, [0, 0.65, 1], [1.03, 1.08, 0.82]);
  const portraitClip = useTransform(progress, [0, 0.48, 0.88], ['inset(0% 0% 0% 0%)', 'inset(0% 8% 0% 8%)', 'inset(12% 25% 12% 25%)']);
  const copyY = useTransform(progress, [0, 0.8], [0, -120]);
  const copyOpacity = useTransform(progress, [0, 0.5, 0.8], [1, 1, 0]);
  const nextOpacity = useTransform(progress, [0.48, 0.72], [0, 1]);
  const gridRotate = useTransform(progress, [0, 1], [0, -4]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, SPRING);
  const py = useSpring(my, SPRING);
  const pointerMove = (e) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX / r.width - 0.5) * 18);
    my.set((e.clientY / r.height - 0.5) * 12);
  };

  return (
    <section ref={ref} className="hero-story" onPointerMove={pointerMove} onPointerLeave={() => { mx.set(0); my.set(0); }}>
      <div className="hero-sticky">
        <motion.div className="hero-environment" style={reduced ? {} : { y: bgY, scale: bgScale }}>
          <img src={heroPortrait} alt="" aria-hidden="true" />
          <div className="hero-environment-shade" />
        </motion.div>

        <motion.div className="hero-grid-lines" style={reduced ? {} : { rotate: gridRotate }} aria-hidden="true" />

        <motion.div className="hero-name" style={reduced ? {} : { y: nameY, scale: nameScale, x: px }} aria-hidden="true">
          <span>YASH</span><span>GANESH</span>
        </motion.div>

        <motion.div className="hero-portrait" style={reduced ? {} : { y: portraitY, scale: portraitScale, clipPath: portraitClip, x: useTransform(px, v => v * 1.5), rotateY: useTransform(px, [-18, 18], [-1.5, 1.5]) }}>
          <img src={heroPortrait} alt="Portrait of Yash Ganesh" />
        </motion.div>

        <motion.div className="hero-copy" style={reduced ? {} : { y: copyY, opacity: copyOpacity }}>
          <p className="eyebrow light"><i /> Creative technologist / Pune, India</p>
          <h1>Websites that make good businesses <em>hard to ignore.</em></h1>
          <p>I design, build and shape digital experiences where story, interaction and technology work as one system.</p>
          <div className="hero-actions"><a href="#work" className="pill light">Explore the work <b>↘</b></a><a href="#studio" className="text-link">How I work <span>→</span></a></div>
        </motion.div>

        <motion.div className="hero-side-note" style={{ opacity: reduced ? 1 : nextOpacity }}>
          <span>SCROLL STORY / 01</span><strong>From identity<br/>into intent.</strong>
        </motion.div>

        <motion.div className="hero-handoff" style={{ opacity: reduced ? 1 : nextOpacity }}>
          <span>DESIGN SHOULD NOT WAIT<br/>FOR YOU TO NOTICE IT.</span>
        </motion.div>
      </div>
    </section>
  );
}

function Philosophy() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['7vw', '-10vw']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-6vw', '9vw']);
  return (
    <section className="philosophy" ref={ref}>
      <div className="philosophy-sticky">
        <p className="eyebrow">02 / HOW I THINK</p>
        <motion.div className="philo-line" style={reduced ? {} : { x: x1 }}>MAKE THE IDEA</motion.div>
        <motion.div className="philo-line serif" style={reduced ? {} : { x: x2 }}>easy to feel.</motion.div>
        <div className="philo-bottom">
          <p>A good interface explains. A memorable one directs attention, changes pace and makes the next action feel inevitable.</p>
          <div className="philo-index"><span>STRATEGY</span><span>DESIGN</span><span>ENGINEERING</span><span>MOTION</span></div>
        </div>
      </div>
    </section>
  );
}

function ProjectScene({ project, go, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const titleX = useTransform(scrollYProgress, [0.2, 0.8], ['8vw', '-4vw']);
  return (
    <article className="project-scene" ref={ref}>
      <div className="project-meta"><span>{project.id}</span><span>{project.kind}</span><span>Selected work</span></div>
      <button className="project-media" onClick={() => go(project.href)} aria-label={`Open ${project.name}`}>
        <motion.img src={project.image} alt={`${project.name} project preview`} style={reduced ? {} : { scale: imageScale, y: imageY }} />
        <div className="project-media-overlay" />
        <span className="project-view">VIEW CASE <b>↗</b></span>
      </button>
      <motion.h3 style={reduced ? {} : { x: titleX }}>{project.name}</motion.h3>
      <p className="project-line">{project.line}</p>
      {index === 0 && <div className="project-proof"><span>REAL CLIENT WORK</span><span>DESIGN → BUILD → DEPLOY</span></div>}
    </article>
  );
}

function Work() {
  const { go } = useRouteBridge();
  return (
    <section className="work-section" id="work">
      <div className="shell work-intro">
        <p className="eyebrow light">03 / SELECTED WORK</p>
        <h2><SplitLine>Not a gallery.</SplitLine><SplitLine delay={0.08}><em>A sequence of decisions.</em></SplitLine></h2>
        <p>Each project gets enough space to show the problem, the system and the final experience—without turning the page into a wall of cards.</p>
      </div>
      {projects.map((project, index) => <ProjectScene project={project} index={index} go={go} key={project.id} />)}
    </section>
  );
}

function BeforeAfter() {
  const [position, setPosition] = useState(53);
  return (
    <section className="compare-section">
      <div className="shell compare-head"><p className="eyebrow">04 / TRANSFORMATION</p><h2>From information<br/><em>to experience.</em></h2><p>FakhriMart became more than a page refresh: clearer hierarchy, stronger catalogue presentation and a path from browsing to enquiry.</p></div>
      <div className="compare-frame" style={{ '--split': `${position}%` }}>
        <img className="compare-after" src={fakhriCompare} alt="FakhriMart redesigned interface" />
        <div className="compare-before"><img src={fakhriDesktop} alt="Earlier FakhriMart interface" /></div>
        <div className="compare-handle"><i/><span>DRAG</span></div>
        <input aria-label="Compare before and after" type="range" min="8" max="92" value={position} onChange={(e) => setPosition(Number(e.target.value))} />
      </div>
    </section>
  );
}

function Studio() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const reduced = useReducedMotion();
  const services = [
    ['01', 'DESIGN', 'Identity translated into hierarchy, rhythm and interaction.'],
    ['02', 'DEVELOPMENT', 'Interfaces engineered to stay fast, responsive and maintainable.'],
    ['03', 'AI', 'Useful intelligence embedded where it improves the product, not where it decorates it.'],
    ['04', 'WEB EXPERIENCES', 'Scroll, motion and narrative used to make information easier to remember.'],
  ];
  return (
    <section className="studio" id="studio" ref={ref}>
      <div className="studio-sticky">
        <div className="studio-left"><p className="eyebrow">05 / WHAT I BUILD</p><h2>One system.<br/><em>Many disciplines.</em></h2><p>Strategy decides what matters. Design makes it legible. Engineering makes it real. Motion connects the moments.</p></div>
        <div className="service-stack">
          {services.map((s, i) => {
            const start = i / services.length;
            const end = (i + 1) / services.length;
            const y = useTransform(scrollYProgress, [start, end], [70, 0]);
            const opacity = useTransform(scrollYProgress, [Math.max(0, start - 0.12), start + 0.05], [0.18, 1]);
            return <motion.div className="service-row" key={s[1]} style={reduced ? {} : { y, opacity }}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-grid shell">
        <div className="about-copy"><p className="eyebrow light">06 / ABOUT</p><h2>I like building things that feel <em>considered</em> before they feel clever.</h2><p>I work across design, frontend engineering and AI product thinking. The common thread is simple: reduce friction, give the idea a strong visual voice, then make the experience behave exactly as confidently as it looks.</p><div className="about-facts"><span>PUNE, INDIA</span><span>DESIGN + CODE</span><span>CLIENT + PRODUCT WORK</span></div></div>
        <motion.div className="about-portrait" style={reduced ? {} : { rotate: portraitRotate, y: portraitY }}><img src={heroPortrait} alt="Yash Ganesh" /><div className="about-label">YASH / CREATIVE TECHNOLOGIST</div></motion.div>
      </div>
    </section>
  );
}

function Finale() {
  return (
    <footer className="finale" id="contact">
      <div className="finale-orbit" aria-hidden="true"><i/><i/><i/></div>
      <p className="eyebrow light">07 / THE NEXT THING</p>
      <h2><SplitLine>MAKE IT</SplitLine><SplitLine delay={0.08}><em>worth remembering.</em></SplitLine></h2>
      <p className="finale-copy">If the website needs to explain the business, sell the idea and feel unlike everyone else in the category, that is the interesting part.</p>
      <MagneticLink href="mailto:yashganesh.work@gmail.com?subject=Let's%20build%20something" className="finale-cta">START A PROJECT <span>↗</span></MagneticLink>
      <div className="footer-line"><span>YKG DIGITAL © 2026</span><span>DESIGN / DEVELOPMENT / AI</span><span>PUNE, INDIA</span></div>
    </footer>
  );
}

function HomePage() { return <><Hero/><Philosophy/><Work/><BeforeAfter/><Studio/><About/><Finale/></>; }

function ArchivePage() {
  const { go } = useRouteBridge();
  return <main className="archive-page"><section className="archive-hero shell"><p className="eyebrow light">WORK / ARCHIVE</p><h1>Things I’ve<br/><em>made real.</em></h1><p>Client work, products and experiments—presented as systems rather than disconnected thumbnails.</p></section><section className="archive-list">{projects.map(p => <button key={p.id} onClick={() => go(p.href)} className="archive-row"><span>{p.id}</span><h2>{p.name}</h2><p>{p.kind}</p><b>↗</b></button>)}</section><Finale/></main>;
}

function FakhriPage() {
  const { go } = useRouteBridge();
  return <main className="case-page"><section className="case-hero"><button className="case-back" onClick={() => go('/work')}>← WORK</button><div className="case-title"><p className="eyebrow light">CLIENT WORK / FAKHRIMART</p><h1>Turn browsing<br/>into <em>enquiry.</em></h1><p>A commercial website for a yarn wholesaler, rebuilt around clarity, catalogue presentation and a direct path to action.</p></div><motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }} src={fakhriHome} alt="FakhriMart homepage" /></section><section className="case-story shell"><div><span>01 / PROBLEM</span><h2>A real catalogue needed a clearer digital front door.</h2></div><div><span>02 / SYSTEM</span><h2>Hierarchy, products and enquiry were treated as one journey.</h2></div><div><span>03 / RESULT</span><h2>The interface now makes the business easier to understand and easier to contact.</h2></div></section><section className="case-gallery"><img src={fakhriCatalogue} alt="FakhriMart catalogue section"/><div className="case-mobile"><img src={fakhriMobile} alt="FakhriMart mobile interface"/></div></section><section className="case-live shell"><p className="eyebrow">LIVE PRODUCT</p><h2>The case study ends where the real website begins.</h2><MagneticLink href="https://fakhriyarns.vercel.app/" className="dark-pill">OPEN FAKHRIMART <span>↗</span></MagneticLink></section><Finale/></main>;
}

const RouteContext = React.createContext(null);
function useRouteBridge(){ return React.useContext(RouteContext); }

function App() {
  const route = useRoute();
  const page = route.path.startsWith('/work/fakhrimart') ? <FakhriPage/> : route.path.startsWith('/work') ? <ArchivePage/> : <HomePage/>;
  return <RouteContext.Provider value={route}><CursorAura/><ProgressRail/><Nav go={route.go} path={route.path}/><AnimatePresence mode="wait" initial={false}><motion.div key={route.path} className="route-page" initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }} transition={{ duration: 0.48, ease: EASE }}>{page}</motion.div></AnimatePresence></RouteContext.Provider>;
}

createRoot(document.getElementById('root')).render(<MotionConfig reducedMotion="user" transition={{ ease: EASE }}><App/></MotionConfig>);
