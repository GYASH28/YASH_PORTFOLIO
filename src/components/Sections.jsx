import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Minus, Plus } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EMAIL, process, faqs } from "./data.js";
import { ExternalLink, Magnetic, SectionLabel } from "./Core.jsx";

export function BuilderStory() {
  const root = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.to(".builder-story-image img", { yPercent: 12, scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.from(".builder-story-word span", { yPercent: 115, stagger: 0.08, scrollTrigger: { trigger: root.current, start: "top 68%", once: true }, duration: 0.8, ease: "power4.out" });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="builder-story" ref={root}>
      <div className="builder-story-image"><img src="/images/portraits/yash-builder.webp" alt="Yash discussing a product build at his workstation" /></div>
      <div className="builder-story-wash" />
      <div className="builder-story-copy">
        <p className="eyebrow">Direct by design / One accountable person</p>
        <h2><span className="builder-story-word"><span>STRATEGY</span></span><span className="builder-story-word"><span>STAYS IN THE</span></span><span className="builder-story-word accent"><span>BUILD.</span></span></h2>
        <p>You work with the same person from the first workflow map to the final handover. No account layer. No disappearing design intent.</p>
      </div>
      <div className="builder-story-badge"><span>01</span><p>Consultancy</p><i /><span>02</span><p>Product</p><i /><span>03</span><p>Engineering</p></div>
    </section>
  );
}

export function Process() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const triggers = [];
    process.forEach((_, index) => {
      triggers.push(ScrollTrigger.create({ trigger: `.process-card[data-index="${index}"]`, start: "top 55%", end: "bottom 45%", onToggle: ({ isActive }) => isActive && setActive(index) }));
    });
    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);
  return (
    <section className="process" id="process" ref={root}>
      <div className="process-sticky">
        <SectionLabel light>04 / The build path</SectionLabel>
        <h2>One idea.<br />Five visible moves<span className="cyan">.</span></h2>
        <div className="process-visual">
          <div className="process-orbit"><span style={{ "--step": active }} /></div>
          <strong>0{active + 1}</strong>
          <p>{process[active][0]}</p>
        </div>
      </div>
      <div className="process-cards">{process.map(([title, copy], index) => <article className={index === active ? "process-card is-active" : "process-card"} data-index={index} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </section>
  );
}

export function About() {
  const tools = ["ChatGPT", "Gemini", "Groq", "n8n", "Firebase", "PostgreSQL", "React", "Next.js", "Electron", "GitHub", "Vercel", "Playwright"];
  return (
    <section className="about" id="about">
      <SectionLabel>05 / The person behind the systems</SectionLabel>
      <div className="about-mosaic">
        <figure className="about-image about-image--hero" data-cursor="REAL PHOTO"><img src="/images/portraits/yash-editorial.webp" alt="Yash Ganesh in a warm editorial portrait" /><figcaption>Portrait / Pune / 2026</figcaption></figure>
        <div className="about-copy">
          <h2>I build at the point where AI meets real work<span className="cyan">.</span></h2>
          <p className="about-lead">I’m Yash Ganesh—an AI product builder, creative frontend developer, and independent implementation partner from Pune.</p>
          <p>My background crosses product building, school operations, digital marketing, and client work. That mix keeps the technology in context: the people, information, interface, adoption, and business around it still matter.</p>
          <p>I use AI-assisted development aggressively, but I do not confuse speed with quality. The job is to move fast while making decisions, permissions, limitations, and handoffs understandable.</p>
          <div className="about-direct"><span>↳</span><div><strong>I work directly with every engagement.</strong><p>No account layer. No strategy-to-build handoff.</p></div></div>
        </div>
        <figure className="about-image about-image--wide" data-cursor="REAL PHOTO"><img src="/images/portraits/yash-hero.webp" alt="Yash standing in a dark blue studio" /><figcaption>Builder / Consultant / Student</figcaption></figure>
        <div className="tool-cloud"><p>Tools in the workshop</p>{tools.map((tool, index) => <span key={tool} style={{ "--i": index }}>{tool}</span>)}</div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="faq-heading"><SectionLabel light>06 / Before we start</SectionLabel><h2>Clear questions.<br /><span>Useful answers.</span></h2></div>
      <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} name="faq"><summary><span>0{index + 1}</span><strong>{question}</strong><Plus className="plus" /><Minus className="minus" /></summary><p>{answer}</p></details>)}</div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { location.href = `mailto:${EMAIL}`; }
  };
  return (
    <footer className="contact" id="contact">
      <div className="contact-grid" />
      <div className="contact-top"><SectionLabel light>07 / Start something useful</SectionLabel><span>Available for selected consultancy and product builds.</span></div>
      <h2><span>BRING THE</span><span>PAINFUL</span><span>WORKFLOW<span className="cyan">.</span></span></h2>
      <div className="contact-body">
        <p>Bring me the process that repeats, breaks, or consumes too much of the week. We’ll find whether AI belongs there—and the smallest useful place to start.</p>
        <div className="contact-actions"><Magnetic className="contact-cta" href={`mailto:${EMAIL}?subject=AI%20implementation%20project`}>Start the conversation <ArrowUpRight /></Magnetic><button type="button" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? "Email copied" : "Copy email"}</button></div>
      </div>
      <div className="footer-row"><div><strong>Yash Ganesh</strong><span>AI implementation partner</span></div><div><ExternalLink href="https://github.com/GYASH28">GitHub ↗</ExternalLink><a href="#top">Back to top ↑</a></div><span>© 2026 / Pune, India</span></div>
    </footer>
  );
}
