import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollFrameSequence = ({ reducedMotion = false }) => {
  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        }
      });

      // Layered text animation sequence
      tl.fromTo(text1Ref.current, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
        .to(text1Ref.current, { opacity: 0, y: -50, scale: 1.1, duration: 1 }, "+=0.5")
        
        .fromTo(text2Ref.current, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.2")
        .to(text2Ref.current, { opacity: 0, y: -50, scale: 1.1, duration: 1 }, "+=0.5")
        
        .fromTo(text3Ref.current, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.2")
        .to(text3Ref.current, { opacity: 0, y: -50, scale: 1.1, duration: 1 }, "+=0.5")
        
        .fromTo(text4Ref.current, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] overflow-hidden bg-[#05060A] flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,124,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 container-pad w-full flex flex-col items-center justify-center text-center">
        
        <h2 ref={text1Ref} className="absolute text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight opacity-0">
          Building ideas into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#2D7CFF]">real products</span>.
        </h2>

        <h2 ref={text2Ref} className="absolute text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight opacity-0">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CFF] to-[#2D7CFF]">AI-powered</span> <br />
          learning platforms.
        </h2>

        <h2 ref={text3Ref} className="absolute text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight opacity-0">
          Interactive web <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#7AE7FF]">experiences</span>.
        </h2>

        <h2 ref={text4Ref} className="absolute text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight opacity-0">
          Designed with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 neon-text">performance</span> &amp; creativity.
        </h2>

      </div>

      {/* Grid overlay for cinematic feel */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)" }} />
    </section>
  );
};
