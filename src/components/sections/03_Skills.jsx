import { marqueeRows, skillGroups } from "../../data/content";
import { GlassCard } from "../ui/GlassCard";
import { MarqueeStrip } from "../ui/MarqueeStrip";
import { RevealText } from "../ui/RevealText";
import { useInView } from "../../hooks/useInView";

export function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <>
    <div className="section-divider" />
    <section ref={ref} id="skills" className={`section section-shell skills-section ${inView ? 'skills-section--visible' : ''}`}>
      <span className="section-ghost" aria-hidden="true">
        03
      </span>
      <div className="section-inner">
        <p className="section-label">// 03 - THE SPECTRUM</p>
        <h2 className="text-display skills-title">
          <RevealText>The skills that power the room.</RevealText>
        </h2>
      </div>
      <div className="marquee-stack">
        <MarqueeStrip items={marqueeRows[0]} />
        <MarqueeStrip items={marqueeRows[1]} reverse />
      </div>
      <div className="section-inner skills-grid">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <GlassCard className={`skill-card ${group.className}`} key={group.title} style={{ "--skill-accent": group.accent }}>
              <span className="corner-accent" aria-hidden="true" />
              <div className="skill-card-head">
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h3>{group.title}</h3>
                  <small>{group.label}</small>
                </div>
              </div>
              <div className="skill-pills">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <i className="skill-dot" />
            </GlassCard>
          );
        })}
      </div>
    </section>
    </>
  );
}
