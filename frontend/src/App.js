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

const Scene3D = lazy(() => import("@/components/three/Scene3D").then(m => ({ default: m.Scene3D })));

function App() {
  const [bootDone, setBootDone] = useState(false);
  const [heroDone, setHeroDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

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
    if (!bootDone) return undefined;
    if (reducedMotion || heroDone) {
      setSceneReady(true);
      return undefined;
    }

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.1) {
        setSceneReady(true);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [bootDone, heroDone, reducedMotion]);

  return (
    <div className="App relative" data-testid={reducedMotion ? "reduced-motion-mode" : "normal-motion-mode"}>
      {/* Boot sequence overlay */}
      <BootSequence onComplete={() => setBootDone(true)} reducedMotion={reducedMotion} />

      {/* Cursor following light */}
      <CursorLight />

      {/* 3D Scene background - deferred until after the intro to keep hero video smooth */}
      {bootDone && sceneReady && (
        <Suspense fallback={null}>
          <Scene3D reducedMotion={reducedMotion} />
        </Suspense>
      )}

      {/* Navigation */}
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
