import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Code2 } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { ThreeHeroObject } from "@/components/ThreeHeroObject";
import gsap from "gsap";

const RESUME_MAILTO = "mailto:yash.k.ganesh@gmail.com?subject=Inquiry%20from%20Portfolio";

export const Hero = ({ bootDone, onHeroDone, reducedMotion = false }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (bootDone) {
      onHeroDone?.();
      
      if (!reducedMotion) {
        const tl = gsap.timeline();
        
        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { scale: 1.05, opacity: 0, filter: "brightness(0.3)" },
            { scale: 1, opacity: 1, filter: "brightness(1)", duration: 2, ease: "power2.out" }
          );
        }

        tl.fromTo(
          ".hero-fade-up",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
          "-=1.5"
        );
      }
    }
  }, [bootDone, onHeroDone, reducedMotion]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      data-testid="hero-section"
      // Prevent button clipping by using min-h and avoiding hidden overflow vertically if possible
      className="relative w-full min-h-[100svh] bg-[#020306] flex items-center overflow-hidden"
    >
      {/* LAYER 1: Background & 3D Object */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {bootDone && <ThreeHeroObject reducedMotion={reducedMotion} />}
      </div>

      {/* LAYER 2: Full-Screen Portrait Layer */}
      {/* Anchored bottom right to ensure face is visible. Object-contain prevents top clipping. */}
      <div className="absolute right-0 bottom-0 w-full lg:w-[65vw] h-full z-10 pointer-events-none flex justify-end items-end pt-24 lg:pt-0">
        <img 
          ref={imageRef}
          src="/hero-portrait.png" 
          alt="Yash Ganesh" 
          className="w-full h-full object-cover object-center lg:object-[right_bottom]"
          style={{
            mixBlendMode: "lighten",
            WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%, black 100%)",
            maskImage: "linear-gradient(to left, black 50%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%, black 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect"
          }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* LAYER 3: Readability Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-[#020306] via-[#020306]/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#020306] via-[#020306]/80 to-transparent" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#00F5FF] opacity-[0.03] blur-[120px] rounded-full" />
      </div>

      {/* LAYER 4: Foreground Content */}
      {/* Safe padding ensures it NEVER touches the navbar. min-h ensures it NEVER clips buttons. */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full pt-32 pb-24 sm:pt-40 lg:pt-32 pointer-events-none">
        
        <div className="w-full lg:w-[60%] xl:w-[55%] pointer-events-auto flex flex-col justify-center" ref={contentRef}>
          
          {/* Badge */}
          <div className="hero-fade-up inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(0,245,255,0.05)] self-start">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_8px_#00F5FF]" />
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.2em] text-[#00F5FF] uppercase">
              YASH GANESH // SYSTEM ONLINE
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-fade-up text-[3rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight mb-6 drop-shadow-lg">
            Building <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#5C94FF] to-[#8B5CFF] neon-text">
              Intelligent
            </span>
            <br /> Web Experiences
          </h1>

          {/* Subtitle */}
          <p className="hero-fade-up text-base sm:text-lg lg:text-xl text-white/60 max-w-[32rem] font-light leading-relaxed mb-10 drop-shadow-md">
            AI &amp; Web Developer. Creator of <span className="text-white/90 font-medium">Lernio</span>. 
            Designing and engineering cinematic, high-performance digital products.
          </p>

          {/* Skill Chips */}
          <div className="hero-fade-up flex flex-wrap gap-3 mb-12">
            {[
              { icon: Code2, text: "React Developer" },
              { icon: Sparkles, text: "AI Integration" },
              { icon: ArrowRight, text: "UI Animation" }
            ].map((chip, idx) => (
              <span key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] sm:text-[12px] font-mono tracking-wider uppercase bg-white/[0.03] text-white/70 border border-white/[0.08] backdrop-blur-md">
                <chip.icon size={14} className="text-[#00F5FF]" />
                {chip.text}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hero-fade-up flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="group relative inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl bg-white text-black font-semibold text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.5)] hover:scale-105 transition-all overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              View Projects
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollTo("lernio")}
              className="group inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl glass hover:bg-white/[0.05] text-white font-medium text-sm transition-all border border-white/10 hover:border-[#00F5FF]/40 hover:text-[#00F5FF] w-full sm:w-auto"
            >
              Explore Lernio
            </MagneticButton>

            <a
              href={RESUME_MAILTO}
              className="inline-flex items-center justify-center gap-2 px-6 h-14 rounded-xl bg-transparent hover:bg-white/[0.03] text-white/50 hover:text-white font-medium text-sm transition-colors w-full sm:w-auto mt-2 sm:mt-0"
            >
              <Mail size={18} />
              Contact
            </a>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-6 sm:left-12 flex flex-col items-center gap-3 z-40 hidden sm:flex"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#00F5FF] animate-[boot-scan_2s_ease-in-out_infinite]" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase origin-left -rotate-90 absolute bottom-20 left-1 whitespace-nowrap">
          Scroll Down
        </span>
      </motion.div>
    </section>
  );
};
