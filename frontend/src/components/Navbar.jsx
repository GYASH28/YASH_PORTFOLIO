import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { id: "home", label: "Home", testid: "nav-link-home" },
  { id: "about", label: "About", testid: "nav-link-about" },
  { id: "skills", label: "Skills", testid: "nav-link-skills" },
  { id: "projects", label: "Projects", testid: "nav-link-projects" },
  { id: "lernio", label: "Lernio Live", testid: "nav-link-lernio-live" },
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
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none"
        data-testid="site-navbar"
      >
        <nav
          className={`relative mx-auto max-w-6xl rounded-2xl flex items-center justify-between px-5 sm:px-6 h-16 sm:h-[72px] transition-all duration-300 pointer-events-auto ${
            scrolled
              ? "bg-[#05060A]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => goTo("home")}
            className="flex items-center gap-3 group"
            data-testid="nav-logo"
          >
            <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden group-hover:scale-105 transition-transform">
              <span className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/20 via-transparent to-[#8B5CFF]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative font-display font-bold text-sm text-white">Y</span>
            </span>
            <span className="font-display font-semibold tracking-tight text-white text-base sm:text-lg">
              Yash<span className="text-[#00F5FF]">.</span>Ganesh
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => goTo(l.id)}
                data-testid={l.testid}
                className={`relative px-4 py-2 text-[13px] font-mono tracking-widest uppercase transition-colors ${
                  active === l.id ? "text-white" : "text-white/50 hover:text-white/90"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute left-4 right-4 -bottom-1 h-[2px] rounded-full bg-[#00F5FF]"
                    style={{ boxShadow: "0 0 10px rgba(0,245,255,0.5)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
              className="px-6 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]"
            >
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            data-testid="mobile-nav-open-button"
            aria-label="Open navigation"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-24 left-4 right-4 z-40 lg:hidden"
            data-testid="mobile-nav-panel"
          >
            <div className="rounded-2xl bg-[#05060A]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 flex flex-col gap-1">
              {LINKS.map(l => (
                <button
                  key={l.id}
                  onClick={() => goTo(l.id)}
                  data-testid={`${l.testid}-mobile`}
                  className={`text-left px-5 py-3.5 rounded-xl text-sm font-mono uppercase tracking-widest transition-all ${
                    active === l.id 
                      ? "bg-gradient-to-r from-[#00F5FF]/10 to-transparent text-[#00F5FF] border-l-2 border-[#00F5FF]" 
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white border-l-2 border-transparent"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <Button
                onClick={() => goTo("contact")}
                data-testid="nav-contact-button-mobile"
                className="w-full mt-4 h-12 rounded-xl bg-[#00F5FF] hover:bg-[#7AE7FF] text-black font-semibold tracking-wide"
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
