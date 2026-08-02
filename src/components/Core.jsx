import { useCallback, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, List, X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { EMAIL } from "./data.js";

export function ExternalLink({ href, className = "", children, label }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

export function Magnetic({ href, className = "", children }) {
  const ref = useRef(null);
  const move = (event) => {
    if (!ref.current || matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.16,
      y: (event.clientY - rect.top - rect.height / 2) * 0.16,
      duration: 0.25,
      overwrite: true,
    });
  };
  const reset = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1,.45)" });
  return <a ref={ref} href={href} className={className} onPointerMove={move} onPointerLeave={reset}>{children}</a>;
}

export function SectionLabel({ children, light = false }) {
  return <p className={`section-label${light ? " section-label--light" : ""}`}>{children}</p>;
}

export function OpeningSequence({ onComplete }) {
  const root = useRef(null);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    gsap.to(root.current, { yPercent: -100, duration: 1.05, ease: "power4.inOut", onComplete });
  }, [onComplete]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return undefined;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" }, onComplete: finish });
      tl.set(".intro-frame", { autoAlpha: 0 })
        .set(".intro-frame--signal", { autoAlpha: 1 })
        .from(".intro-logo-stroke", { scaleX: 0, duration: 0.7, transformOrigin: "left" })
        .from(".intro-mark", { autoAlpha: 0, scale: 0.72, duration: 0.7 }, "-=.35")
        .from(".intro-signal-copy > *", { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.55 }, "-=.45")
        .to(".intro-frame--signal", { autoAlpha: 0, duration: 0.42, delay: 0.25 })
        .set(".intro-frame--portrait", { autoAlpha: 1 })
        .from(".intro-portrait-image", { clipPath: "inset(0 0 100% 0)", scale: 1.08, duration: 1.05 })
        .from(".intro-word span", { yPercent: 115, stagger: 0.09, duration: 0.7 }, "-=.75")
        .from(".intro-data > *", { autoAlpha: 0, x: -15, stagger: 0.06, duration: 0.45 }, "-=.45")
        .to(".intro-frame--portrait", { autoAlpha: 0, scale: 1.025, duration: 0.45, delay: 0.35 })
        .set(".intro-frame--payoff", { autoAlpha: 1 })
        .from(".intro-payoff-line span", { yPercent: 120, stagger: 0.08, duration: 0.75 })
        .from(".intro-payoff-image", { scale: 1.12, autoAlpha: 0, duration: 0.9 }, "-=.78")
        .from(".intro-enter", { autoAlpha: 0, y: 18, duration: 0.5 }, "-=.3")
        .to({}, { duration: 0.35 });
    }, root);
    return () => ctx.revert();
  }, [finish, onComplete]);

  return (
    <div className="intro" ref={root} aria-label="Portfolio opening sequence">
      <button className="intro-skip" type="button" onClick={finish}>Skip intro <ArrowRight /></button>
      <div className="intro-frame intro-frame--signal">
        <div className="intro-grid" />
        <div className="intro-center">
          <div className="intro-mark">Y<span>/</span>G</div>
          <i className="intro-logo-stroke" />
          <div className="intro-signal-copy">
            <strong>Yash Ganesh</strong>
            <span>AI implementation partner</span>
          </div>
        </div>
        <p className="intro-corner top-left">SYSTEM / INITIALIZING</p>
        <p className="intro-corner top-right">SIGNAL 98.7%</p>
        <p className="intro-corner bottom-left"><i /> REAL FACE / REAL WORK / REAL SYSTEMS</p>
        <p className="intro-corner bottom-right">PUNE / WORLDWIDE / 2026</p>
      </div>
      <div className="intro-frame intro-frame--portrait">
        <img className="intro-portrait-image" src="/images/portraits/yash-builder.webp" alt="" />
        <div className="intro-shade" />
        <div className="intro-kinetic">
          <p className="intro-word"><span>THINK</span></p>
          <p className="intro-word"><span>BUILD</span></p>
          <p className="intro-word accent"><span>SHIP</span></p>
        </div>
        <div className="intro-data">
          <span>01 / STRATEGY</span><span>02 / PRODUCT</span><span>03 / ENGINEERING</span><span>04 / IMPACT</span>
        </div>
      </div>
      <div className="intro-frame intro-frame--payoff">
        <img className="intro-payoff-image" src="/images/portraits/yash-hero.webp" alt="" />
        <div className="intro-payoff-wash" />
        <div className="intro-payoff-copy">
          <p className="intro-payoff-line"><span>AI, APPLIED</span></p>
          <p className="intro-payoff-line"><span>TO REAL WORK<span className="cyan">.</span></span></p>
          <span className="intro-enter">Entering the build room</span>
        </div>
      </div>
    </div>
  );
}

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return undefined;
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.35, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.35, ease: "power3" });
    const lx = gsap.quickTo(label.current, "x", { duration: 0.32 });
    const ly = gsap.quickTo(label.current, "y", { duration: 0.32 });
    const move = (event) => {
      dx(event.clientX); dy(event.clientY); rx(event.clientX); ry(event.clientY); lx(event.clientX + 28); ly(event.clientY + 22);
    };
    const over = (event) => {
      const target = event.target.closest("[data-cursor], a, button");
      const value = target?.dataset.cursor || (target ? "OPEN" : "");
      document.body.classList.toggle("cursor-active", Boolean(target));
      label.current.textContent = value;
      label.current.classList.toggle("is-visible", Boolean(value));
    };
    addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, []);

  return <><i className="cursor-dot" ref={dot} /><i className="cursor-ring" ref={ring} /><span className="cursor-label" ref={label} /></>;
}

export function Header({ menuOpen, setMenuOpen }) {
  const links = ["Work", "Lab", "Process", "About", "FAQ"];
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Yash Ganesh home">Y<span>/</span>G</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link, index) => <a href={`#${link.toLowerCase()}`} key={link}><small>0{index + 1}</small>{link}</a>)}
      </nav>
      <Magnetic className="header-cta" href={`mailto:${EMAIL}?subject=AI%20implementation%20project`}>Start a project <ArrowUpRight /></Magnetic>
      <button className="menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <List />}</button>
      <div className={`menu-overlay${menuOpen ? " is-open" : ""}`}>
        <div className="menu-orbit" />
        <p>Navigation / Yash Ganesh</p>
        {links.map((link, index) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{link}<ArrowUpRight /></a>
        ))}
        <a className="menu-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </header>
  );
}
