import { Github, Mail, Phone, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] bg-[#020306] overflow-hidden">
      {/* Subtle bottom background glow */}
      <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] bg-[#00F5FF]/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-pad py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Brand/Signature */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3">
             <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.02] border border-white/10 shadow-inner">
               <span className="font-display font-bold text-sm text-white">Y</span>
             </span>
             <span className="font-display font-semibold tracking-tight text-white text-base">
               Yash<span className="text-[#00F5FF]">.</span>Ganesh
             </span>
          </div>
          <p className="mt-3 text-xs text-white/40 max-w-xs leading-relaxed font-light">
             Engineering and polishing the next generation of web and AI-assisted experiences.
          </p>
        </div>

        {/* Action/Social Links Badge */}
        <div className="flex items-center justify-center gap-3">
          <a
            href="mailto:yash.k.ganesh@gmail.com"
            title="Email"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white/50 hover:text-[#00F5FF] hover:border-[#00F5FF]/30 transition-all hover:scale-105 hover:bg-white/[0.03]"
            style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
          >
            <Mail size={16} />
          </a>
          <a
            href="tel:+919175524637"
            title="Phone"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white/50 hover:text-[#00F5FF] hover:border-[#00F5FF]/30 transition-all hover:scale-105 hover:bg-white/[0.03]"
            style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
          >
            <Phone size={16} />
          </a>
          <a
            href="https://github.com/gyash28"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white/50 hover:text-[#00F5FF] hover:border-[#00F5FF]/30 transition-all hover:scale-105 hover:bg-white/[0.03]"
            style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
          >
            <Github size={16} />
          </a>
        </div>

        {/* Copyright Panel */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1.5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 font-semibold">
             © {new Date().getFullYear()} Yash Ganesh
          </div>
          <div className="text-[10px] text-white/20 flex items-center gap-1.5 font-light">
             Built with React &amp; <Heart size={10} className="text-[#FF5C5C] fill-[#FF5C5C] animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
};
