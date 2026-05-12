import { Github, Mail, Phone, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-[#05060A]">
      <div className="container-pad py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
             <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10">
               <span className="font-display font-semibold text-sm text-white">Y</span>
             </span>
             <span className="font-display font-semibold tracking-tight text-white/90 text-lg">
               Yash<span className="text-[#00F5FF]">.</span>Ganesh
             </span>
          </div>
          <p className="mt-2 text-sm text-white/40 max-w-xs">
             Designing and building the future of web experiences.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-3">
          <a
            href="mailto:yash.k.ganesh@gmail.com"
            title="Email"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#00F5FF] hover:border-[#00F5FF]/30 transition-all hover:scale-105"
          >
            <Mail size={16} />
          </a>
          <a
            href="tel:+919175524637"
            title="Phone"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#00F5FF] hover:border-[#00F5FF]/30 transition-all hover:scale-105"
          >
            <Phone size={16} />
          </a>
          <a
            href="https://github.com/gyash28"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#00F5FF] hover:border-[#00F5FF]/30 transition-all hover:scale-105"
          >
            <Github size={16} />
          </a>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1">
          <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
             © {new Date().getFullYear()} Yash Ganesh
          </div>
          <div className="text-[10px] text-white/30 flex items-center gap-1.5">
             Built with React &amp; <Heart size={10} className="text-[#FF5C5C]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
