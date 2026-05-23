import { useEffect, useState } from "react";
import { ArrowRight, User, Zap, FolderOpen, Mail, Github } from "lucide-react";
import { contact } from "../../data/content";

const links = [
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Zap },
  { href: "#projects", label: "Projects", icon: FolderOpen },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        })
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={`nav-shell ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="nav-logo focus-ring" aria-label="Go to hero">
          YG
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={`nav-link ${active === link.href.slice(1) ? "active focus-ring" : "focus-ring"}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-hire focus-ring" href={`mailto:${contact.email}`}>
          Hire Me <ArrowRight size={15} aria-hidden="true" />
        </a>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span />
          <span />
        </button>
      </header>

      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              <Icon size={32} /> {link.label}
            </a>
          );
        })}
      </div>
    </>
  );
}
