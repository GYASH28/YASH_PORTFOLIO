import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Mouse, Sparkle } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { EMAIL } from "./data.js";
import { Magnetic, SectionLabel } from "./Core.jsx";

export function Hero() {
  const root = useRef(null);
  const portrait = useRef(null);
  const [mode, setMode] = useState(0);
  const words = ["IMPLEMENT", "PROTOTYPE", "AUTOMATE", "SHIP"];

  useEffect(() => {
    const timer = setInterval(() => setMode((value) => (value + 1) % words.length), 2200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(".hero-title-line span", { yPercent: 110, stagger: 0.11, duration: 1, ease: "power4.out", delay: 0.15 });
      gsap.from(".hero-copy > *:not(.hero-title)", { autoAlpha: 0, y: 22, stagger: 0.08, duration: 0.65, delay: 0.6 });
      gsap.from(".hero-portrait-shell", { clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)", duration: 1.2, ease: "power4.inOut", delay: 0.25 });
      gsap.to(".hero-portrait-image", { yPercent: 10, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-ring--one", { rotate: 160, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-ring--two", { rotate: -120, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, []);

  const move = (event) => {
    if (!portrait.current || matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = root.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(portrait.current, { x: x * 18, y: y * 12, rotateY: x * 4, rotateX: -y * 3, duration: 0.6 });
    gsap.to(".hero-floating-card", { x: x * -16, y: y * -10, duration: 0.75 });
  };

  return (
    <section className="hero" id="top" ref={root} onPointerMove={move}>
      <div className="hero-grid" />
      <div className="hero-copy">
        <p className="eyebrow"><i /> Independent AI implementation partner <span>Pune / Worldwide</span></p>
        <h1 className="hero-title">
          <span className="hero-title-line"><span>AI, APPLIED</span></span>
          <span className="hero-title-line offset"><span>TO REAL WORK<span className="cyan">.</span></span></span>
        </h1>
        <p className="hero-summary">I find the workflow where AI can create practical leverage, then design, build, and deploy the working system around it.</p>
        <div className="hero-actions">
          <Magnetic className="button button--solid" href={`mailto:${EMAIL}?subject=Let%27s%20map%20an%20AI%20opportunity`}>Discuss a workflow <ArrowUpRight /></Magnetic>
          <Magnetic className="button button--line" href="#work">Enter the work <ArrowDown /></Magnetic>
        </div>
        <div className="hero-mode" aria-live="polite"><small>CURRENT MODE</small><strong key={words[mode]}>{words[mode]}</strong><span>0{mode + 1} / 04</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-ring hero-ring--one"><span>STRATEGY</span><span>PRODUCT</span><span>ENGINEERING</span><span>IMPACT</span></div>
        <div className="hero-ring hero-ring--two" />
        <div className="hero-portrait-shell" ref={portrait}>
          <img className="hero-portrait-image" src="/images/portraits/yash-hero.webp" alt="Yash Ganesh in a dark studio portrait" fetchPriority="high" />
          <div className="hero-portrait-vignette" />
        </div>
        <div className="hero-floating-card card-a"><small>SYSTEM STATUS</small><b>BUILDING</b><i /></div>
        <div className="hero-floating-card card-b"><small>DIRECT CONTACT</small><b>01 PERSON</b><span>Strategy → deployment</span></div>
        <div className="hero-coordinate">18.5204° N / 73.8567° E</div>
      </div>
      <div className="hero-bottom">
        <span>01 / Portfolio 2026</span>
        <span><i /> Available for focused consultancy</span>
        <a href="#manifesto">Scroll to explore <Mouse /></a>
      </div>
    </section>
  );
}

export function KineticStrip() {
  const words = ["AI STRATEGY", "PRODUCT DESIGN", "AUTOMATION", "FRONTEND SYSTEMS", "WORKING PILOTS", "REAL HANDOFFS"];
  return <div className="kinetic-strip" aria-hidden="true"><div>{[...words, ...words].map((word, index) => <span key={`${word}-${index}`}>{word}<Sparkle weight="fill" /></span>)}</div></div>;
}

export function Manifesto() {
  const root = useRef(null);
  const trailRef = useRef(null);
  const trailImages = ["/images/portraits/yash-editorial.webp", "/images/portraits/yash-builder.webp", "/images/portraits/yash-hero.webp"];
  const trailIndex = useRef(0);
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(".manifesto-word", { opacity: 0.12, stagger: 0.075, scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 48%", scrub: 0.6 } });
    }, root);
    return () => ctx.revert();
  }, []);

  const trail = (event) => {
    if (!trailRef.current || matchMedia("(pointer: coarse)").matches) return;
    const rect = trailRef.current.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (Math.hypot(point.x - lastPoint.current.x, point.y - lastPoint.current.y) < 95) return;
    lastPoint.current = point;
    const image = document.createElement("img");
    image.src = trailImages[trailIndex.current++ % trailImages.length];
    image.className = "trail-image";
    image.alt = "";
    image.style.left = `${point.x}px`;
    image.style.top = `${point.y}px`;
    trailRef.current.appendChild(image);
    gsap.fromTo(image, { scale: 0.55, rotate: gsap.utils.random(-8, 8), autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.32, ease: "power3.out" });
    gsap.to(image, { y: -45, autoAlpha: 0, scale: 0.85, duration: 0.75, delay: 0.38, ease: "power2.in", onComplete: () => image.remove() });
  };

  const statement = "Less AI theatre. More useful systems people understand, trust, and actually use.".split(" ");
  return (
    <section className="manifesto" id="manifesto" ref={root} onPointerMove={trail}>
      <div className="manifesto-trail" ref={trailRef} />
      <SectionLabel>01 / Point of view</SectionLabel>
      <h2>{statement.map((word, index) => <span className="manifesto-word" key={`${word}-${index}`}>{word} </span>)}</h2>
      <div className="manifesto-lower">
        <p>The useful version of AI is not another impressive demo. It is a system with clear boundaries, visible decisions, and a job worth doing.</p>
        <div className="manifesto-index">
          {["Find the leverage", "Design the boundaries", "Build the core", "Test real behaviour", "Transfer ownership"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
        </div>
      </div>
      <p className="manifesto-instruction">Move your cursor here</p>
    </section>
  );
}
