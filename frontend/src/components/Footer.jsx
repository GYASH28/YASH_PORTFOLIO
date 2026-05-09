import { Github, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-10">
      <div className="container-pad py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <div className="font-display font-semibold text-white tracking-tight">
            Yash<span className="text-[#7AE7FF]">.</span>Ganesh
          </div>
          <div className="mt-1 text-xs text-white/45">
            Premium personal portfolio · designed and built with care.
          </div>
        </div>
        <div className="flex items-center justify-start md:justify-center gap-3">
          <a
            href="mailto:yash.k.ganesh@gmail.com"
            data-testid="footer-email-link"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 text-white/75 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <Mail size={16} />
          </a>
          <a
            href="tel:+919175524637"
            data-testid="footer-phone-link"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 text-white/75 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <Phone size={16} />
          </a>
          <a
            href="https://github.com/gyash28"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-github-link"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 text-white/75 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <Github size={16} />
          </a>
        </div>
        <div className="text-xs text-white/45 md:text-right font-mono">
          © {new Date().getFullYear()} Yash Ganesh · Crafted with React + R3F + Framer Motion
        </div>
      </div>
    </footer>
  );
};
