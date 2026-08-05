"use client";

import { useState, useEffect } from "react";
import BootSequence from "@/components/layout/BootSequence";
import HUD from "@/components/layout/HUD";
import MobileMenu from "@/components/navigation/MobileMenu";
import CustomCursor from "@/components/navigation/CustomCursor";
import Hero from "@/components/sections/Hero";
import PositionSection from "@/components/sections/PositionSection";
import SystemAnatomy from "@/components/sections/SystemAnatomy";
import SelectedSystems from "@/components/sections/SelectedSystems";
import Capabilities from "@/components/sections/Capabilities";
import About from "@/components/sections/About";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import { useBootSession } from "@/hooks/use-boot-session";

export default function Home() {
  // Skip boot entirely on repeat visits within the same session.
  const { played } = useBootSession();
  const [booted, setBooted] = useState(played);
  const [menuOpen, setMenuOpen] = useState(false);

  // Ensure boot is skippable once played.
  useEffect(() => {
    if (played) setBooted(true);
  }, [played]);

  // Skip-link + a11y: when booted, focus the main heading.
  useEffect(() => {
    if (booted) {
      const h1 = document.getElementById("hero")?.querySelector("h1");
      if (h1) (h1 as HTMLElement).setAttribute("tabindex", "-1");
    }
  }, [booted]);

  return (
    <>
      {/* Skip to content — a11y */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded focus:bg-[var(--signal-primary)] focus:px-4 focus:py-2 focus:text-[#0a0a0f]"
      >
        Skip to content
      </a>

      {/* Boot intro */}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* HUD */}
      <HUD onOpenMenu={() => setMenuOpen(true)} />

      {/* Mobile menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <PositionSection />
        <SystemAnatomy />
        <SelectedSystems />
        <Capabilities />
        <About />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
