import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor, Header, OpeningSequence } from "./Core.jsx";
import { Hero, KineticStrip, Manifesto } from "./Hero.jsx";
import { Work, WorkflowLab } from "./Work.jsx";
import { About, BuilderStory, Contact, FAQ, Process } from "./Sections.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [intro, setIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef(null);
  const progress = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (intro) { document.body.classList.add("intro-open"); return undefined; }
    document.body.classList.remove("intro-open");
    ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => gsap.from(element, { y: 30, autoAlpha: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } }));
    }, root);
    return () => ctx.revert();
  }, [intro]);

  return (
    <div className="site-shell" ref={root}>
      {intro && <OpeningSequence onComplete={() => setIntro(false)} />}
      <Cursor />
      <div className="scroll-progress"><i ref={progress} /></div>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <KineticStrip />
        <Manifesto />
        <Work />
        <WorkflowLab />
        <BuilderStory />
        <Process />
        <About />
        <FAQ />
      </main>
      <Contact />
    </div>
  );
}
