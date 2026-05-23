import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { contact } from "../../data/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.35, 0.5, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`nav-shell ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="nav-logo focus-ring" aria-label="Go to hero">
        YG
      </a>
      <nav aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href} className={active === link.href.slice(1) ? "active focus-ring" : "focus-ring"}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="nav-hire focus-ring" href={`mailto:${contact.email}`}>
        Hire Me <ArrowRight size={15} aria-hidden="true" />
      </a>
    </header>
  );
}
