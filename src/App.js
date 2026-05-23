import { useEffect, useState, lazy, Suspense } from "react";
import "@/App.css";
import { BootSequence } from "@/components/BootSequence";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ScrollFrameSequence } from "@/components/ScrollFrameSequence";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { LernioLive } from "@/components/LernioLive";
import { Journey } from "@/components/Journey";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CursorLight } from "@/components/CursorLight";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [bootDone, setBootDone] = useState(false);
  const [heroDone, setHeroDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Scroll progress bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Force dark theme
    document.documentElement.classList.add("dark");
    // Detect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setProgress(Math.min(p * 100, 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App relative" data-testid={reducedMotion ? "reduced-motion-mode" : "normal-motion-mode"}>
      {/* Boot sequence overlay */}
      <BootSequence onComplete={() => setBootDone(true)} reducedMotion={reducedMotion} />

      {/* Cursor following light */}
      <CursorLight />

      {/* Navigation */}
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        height: '2px', width: `${progress}%`,
        background: 'linear-gradient(90deg, #00FF88, #4F8EF7)',
        transition: 'width 80ms linear',
        pointerEvents: 'none'
      }} />
      <Navbar visible={bootDone} />

      {/* Sections */}
      <main className="relative z-10">
        <Hero bootDone={bootDone} onHeroDone={() => setHeroDone(true)} reducedMotion={reducedMotion} />
        <ScrollFrameSequence reducedMotion={reducedMotion} />
        <About visible={heroDone} />
        <Skills />
        <Projects />
        <LernioLive />
        <Journey />
        <Contact />
      </main>

      <Footer />
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}

export default App;
