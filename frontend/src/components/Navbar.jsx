import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { id: "home", label: "Home", testid: "nav-link-home" },
  { id: "about", label: "About", testid: "nav-link-about" },
  { id: "skills", label: "Skills", testid: "nav-link-skills" },
  { id: "projects", label: "Projects", testid: "nav-link-projects" },
  { id: "lernio", label: "Lernio AI Live", testid: "nav-link-lernio-live" },
  { id: "journey", label: "Journey", testid: "nav-link-journey" },
  { id: "contact", label: "Contact", testid: "nav-link-contact" },
];

export const Navbar = ({ visible }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // active section detection
      const sections = LINKS.map(l => document.getElementById(l.id)).filter(Boolean);
      const triggerY = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0]?.id || "home";
      for (const sec of sections) {
        if (sec.offsetTop <= triggerY) current = sec.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-4"
        data-testid="site-navbar"
      >
        <nav
          className={`relative mx-auto max-w-6xl rounded-2xl flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 transition-colors transition-shadow ${
            scrolled
              ? "bg-white/[0.05] backdrop-blur-[18px] border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
              : "bg-white/[0.02] backdrop-blur-[8px] border border-white/[0.06]"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => goTo("home")}
            className="flex items-center gap-2 group"
            data-testid="nav-logo"
          >
            <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/30 via-transparent to-[#2D7CFF]/20" />
              <span className="relative font-display font-semibold text-sm text-white">Y</span>
            </span>
            <span className="font-display font-semibold tracking-tight text-white text-sm sm:text-base">
              Yash<span className="text-[#7AE7FF]">.</span>Ganesh
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => goTo(l.id)}
                data-testid={l.testid}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                  active === l.id ? "text-white" : "text-white/55 hover:text-white/85"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-px bg-[#00F5FF]"
                    style={{ boxShadow: "0 0 12px rgba(0,245,255,0.7)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Button
              onClick={() => goTo("contact")}
              data-testid="nav-contact-button"
              className="rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/12 text-white shadow-[var(--shadow-glass)] hover:shadow-[var(--shadow-glass),var(--shadow-neon-cyan)] transition-colors transition-shadow"
            >
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            data-testid="mobile-nav-open-button"
            aria-label="Open navigation"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 text-white"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[68px] left-3 right-3 z-50 lg:hidden"
            data-testid="mobile-nav-panel"
          >
            <div className="rounded-2xl bg-[#0A0F1A]/95 backdrop-blur-[22px] border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.65)] p-3">
              <div className="flex flex-col">
                {LINKS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => goTo(l.id)}
                    data-testid={`${l.testid}-mobile`}
                    className={`text-left px-4 py-3 rounded-xl text-base transition-colors ${
                      active === l.id ? "bg-white/[0.06] text-white" : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => goTo("contact")}
                data-testid="nav-contact-button-mobile"
                className="w-full mt-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/12 text-white"
              >
                Let&apos;s Talk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
