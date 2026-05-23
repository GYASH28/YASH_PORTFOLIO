import { about, techLogoIcons } from "../../data/content";
import { GlassCard } from "../ui/GlassCard";
import { RevealText } from "../ui/RevealText";

export function About() {
  return (
    <section id="about" className="section-shell about-section">
      <div className="section-inner about-grid">
        <div className="portrait-panel gradient-border">
          <img src={about.portrait} alt="Yash Ganesh portrait" />
          <div className="currently-card">
            <span>CURRENTLY BUILDING</span>
            <strong>Lernio AI v2.0</strong>
            <small>
              <i /> LIVE
            </small>
          </div>
        </div>
        <div className="about-copy">
          <p className="section-label">// 02 - THE SOURCE</p>
          <h2 className="text-title quote">
            <RevealText>{about.quote}</RevealText>
          </h2>
          <p className="text-body about-overview">{about.overview}</p>
          <div className="identity-grid">
            {about.identities.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard className="identity-card" key={item.label}>
                  <Icon size={21} aria-hidden="true" />
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </GlassCard>
              );
            })}
          </div>
          <div className="tech-strip" aria-label="Tools and platforms">
            {techLogoIcons.map((item) => {
              const Icon = item.icon;
              return (
                <span className="tech-icon" key={item.name} data-tooltip={item.name}>
                  <Icon size={22} aria-hidden="true" />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
