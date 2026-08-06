"use client";

import { useState, useEffect } from "react";
import Opening from "@/components/layout/Opening";
import Navigation from "@/components/navigation/Navigation";
import CustomCursor from "@/components/navigation/CustomCursor";
import Hero from "@/components/sections/Hero";
import DesignReel from "@/components/sections/DesignReel";
import ProjectWorlds from "@/components/sections/ProjectWorlds";
import DesignProcess from "@/components/sections/DesignProcess";
import Capabilities from "@/components/sections/Capabilities";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { useOpeningSession } from "@/hooks/use-opening-session";

export default function Home() {
  const { played } = useOpeningSession();
  const [opened, setOpened] = useState(played);

  useEffect(() => {
    if (played) setOpened(true);
  }, [played]);

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded focus:bg-[var(--accent-warm)] focus:px-4 focus:py-2 focus:text-[var(--bg-base)]"
      >
        Skip to content
      </a>

      {!opened && <Opening onComplete={() => setOpened(true)} />}

      <CustomCursor />
      <Navigation />

      <main className="relative">
        <Hero />
        <DesignReel />
        <ProjectWorlds />
        <DesignProcess />
        <Capabilities />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
