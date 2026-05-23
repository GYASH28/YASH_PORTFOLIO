import { useEffect } from "react";
import { motion } from "framer-motion";
import yashPortrait from "@/assets/yash-portrait.png";

// Framer Motion approach for entrance animation
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } }
};

const lineVariants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

export const Hero = ({ bootDone, onHeroDone, reducedMotion = false }) => {
  useEffect(() => {
    if (bootDone) {
      onHeroDone?.();
    }
  }, [bootDone, onHeroDone]);

  // Counter animation for stats
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-num');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { 
          current = target; 
          clearInterval(timer); 
        }
        counter.textContent = Math.floor(current);
      }, 35);
    });
  }, []);

  return (
    <section id="home" className="hero-section" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#03040A' }}>
      
      {/* LAYER 1 — Portrait (background) */}
      <motion.div
        className="hero-portrait-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={yashPortrait} alt="Yash Ganesh" className="hero-portrait" />
      </motion.div>

      {/* Blue ambient matching the portrait's rim light */}
      <div className="hero-ambient-blue" style={{
        position: 'absolute',
        right: '5%',
        top: '20%',
        width: '35vw',
        height: '70vh',
        background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Mint ambient at bottom — subtle floor glow */}
      <div className="hero-ambient-mint" style={{
        position: 'absolute',
        right: '20%',
        bottom: '0',
        width: '20vw',
        height: '30vh',
        background: 'radial-gradient(ellipse at center bottom, rgba(0,255,136,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* LAYER 2 — Left gradient mask (makes text readable) */}
      <div className="hero-gradient-mask" />

      {/* LAYER 3 — Content */}
      <div className="hero-content">
        <span className="hero-label">// YASH GANESH — BUILD ROOM</span>
        
        <motion.h1 className="hero-headline" variants={containerVariants} initial="hidden" animate="visible">
          {['I BUILD', 'THINGS', 'THAT', 'WORK.'].map((word, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span variants={lineVariants} style={{ display: 'block' }} className="line">
                {word === 'WORK.' ? <>{word.slice(0,-1)}<span className="accent-dot">.</span></> : word}
              </motion.span>
            </div>
          ))}
        </motion.h1>
        
        <p className="hero-tagline">AI Builder · Frontend Developer · Creative Technologist</p>
        <p className="hero-sub">Building products that feel alive — Lernio AI, CampusMate &amp; more.</p>
        
        <div className="hero-cta-row">
          <a href="#projects" className="btn-primary">See My Work ↓</a>
          <a href="https://lernioai.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-secondary">lernioai.vercel.app ↗</a>
        </div>
        
        <div className="hero-stats">
          <div className="stat"><span className="stat-num" data-target="2">0</span><span className="stat-label">Live Products</span></div>
          <div className="stat"><span className="stat-num" data-target="22">0</span><span className="stat-label">Skills Mastered</span></div>
          <div className="stat"><span className="stat-num" data-target="5">0</span><span className="stat-label">Tech Stacks</span></div>
        </div>
      </div>

    </section>
  );
};
