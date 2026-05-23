import { ArrowDown, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { hero } from "../../data/content";
import { CounterNumber } from "../ui/CounterNumber";
import { MagneticButton } from "../ui/MagneticButton";

export function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg" aria-hidden="true" />
      <motion.picture
        className="hero-image-wrap"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <img className="hero-image" src="/assets/hero-yash-fullscreen.png" alt="" draggable="false" />
      </motion.picture>
      <div className="hero-copy">
        <motion.p
          className="hero-label text-mono"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {hero.label}
        </motion.p>
        <h1 className="text-hero hero-headline" aria-label="I build things that work">
          {hero.headline.map((line, index) => (
            <motion.span
              key={line}
              className={index === hero.headline.length - 1 ? "mint-underline" : ""}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.35 + index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </h1>
        <motion.div
          className="hero-subcopy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>{hero.role}</p>
          <p>{hero.tagline}</p>
        </motion.div>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.78, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton as="a" href="#projects" className="btn-primary">
            See My Work <ArrowDown size={16} aria-hidden="true" />
          </MagneticButton>
          <MagneticButton as="a" href={hero.productUrl} target="_blank" rel="noreferrer" className="btn-secondary">
            lernioai.vercel.app <ExternalLink size={15} aria-hidden="true" />
          </MagneticButton>
        </motion.div>
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.88, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <strong>
                <CounterNumber value={stat.number} />
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
