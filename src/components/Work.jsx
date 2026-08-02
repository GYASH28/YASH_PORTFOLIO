import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, Pause, Play } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { projects, labs } from "./data.js";
import { ExternalLink, SectionLabel } from "./Core.jsx";

export function ProjectStage({ project, direction }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-stage-image", { clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", scale: 1.035 }, { clipPath: "inset(0 0 0 0)", scale: 1, duration: 0.85, ease: "power4.inOut" });
      gsap.from(".project-stage-copy > *", { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.5, delay: 0.25 });
    }, ref);
    return () => ctx.revert();
  }, [project, direction]);
  return (
    <div className="project-stage" ref={ref} style={{ "--project-color": project.color }}>
      <div className="project-stage-media">
        {project.media ? (
          <img className="project-stage-image" src={project.media} alt={`${project.name} interface`} />
        ) : (
          <div className="project-stage-image project-stage-generated" aria-label={`${project.name} system visual`}>
            <div className="generated-grid" />
            <div className="generated-orbit orbit-a" /><div className="generated-orbit orbit-b" />
            <strong>{project.short}</strong>
            <div className="generated-nodes">{project.proof.map((item, index) => <span style={{ "--node": index }} key={item}>{item}</span>)}</div>
            <small>{project.kind}</small>
          </div>
        )}
        <div className="project-stage-shine" />
        <span className="project-stage-index">{project.number} / 06</span>
        <span className="project-stage-status"><i />{project.status}</span>
      </div>
      <div className="project-stage-copy">
        <p className="eyebrow">{project.kind}</p>
        <h3>{project.name}</h3>
        <p className="project-stage-summary">{project.summary}</p>
        <p className="project-stage-detail">{project.detail}</p>
        <div className="proof-grid">{project.proof.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="project-actions">
          {project.live && <ExternalLink className="button button--project" href={project.live}>Open live <ArrowUpRight /></ExternalLink>}
          <ExternalLink className="button button--project muted" href={project.repo}>GitHub <GithubLogo weight="fill" /></ExternalLink>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [auto, setAuto] = useState(false);
  const choose = (index) => {
    setDirection(index >= active ? 1 : -1);
    setActive(index);
  };
  const step = (delta) => {
    const next = (active + delta + projects.length) % projects.length;
    setDirection(delta);
    setActive(next);
  };
  useEffect(() => {
    if (!auto) return undefined;
    const timer = setInterval(() => step(1), 4200);
    return () => clearInterval(timer);
  }, [auto, active]);

  return (
    <section className="work" id="work">
      <div className="work-heading">
        <SectionLabel light>02 / Selected systems</SectionLabel>
        <h2>Not mockups.<br /><span>Working evidence.</span></h2>
        <p>Explore six products and experiments. Each one started with a specific workflow, not a generic AI feature list.</p>
      </div>
      <ProjectStage project={projects[active]} direction={direction} />
      <div className="project-controller">
        <button type="button" onClick={() => step(-1)} data-cursor="PREV" aria-label="Previous project"><ArrowLeft /></button>
        <div className="project-tabs">{projects.map((project, index) => <button type="button" className={index === active ? "is-active" : ""} onClick={() => choose(index)} key={project.name}><span>{project.number}</span>{project.short}</button>)}</div>
        <button type="button" onClick={() => step(1)} data-cursor="NEXT" aria-label="Next project"><ArrowRight /></button>
        <button className="project-auto" type="button" onClick={() => setAuto((value) => !value)}>{auto ? <Pause weight="fill" /> : <Play weight="fill" />}{auto ? "Pause" : "Autoplay"}</button>
      </div>
    </section>
  );
}

export function WorkflowLab() {
  const [active, setActive] = useState(0);
  const item = labs[active];
  return (
    <section className="lab" id="lab">
      <div className="lab-heading">
        <SectionLabel>03 / Interactive workflow lab</SectionLabel>
        <h2>Choose the friction.<br /><span>See the system.</span></h2>
      </div>
      <div className="lab-shell" style={{ "--lab-shift": active }}>
        <div className="lab-nav">{labs.map((lab, index) => <button key={lab.id} type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><span>0{index + 1}</span>{lab.label}<ArrowRight /></button>)}</div>
        <div className="lab-output" key={item.id}>
          <p className="eyebrow">Selected system / {item.label}</p>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <div className="lab-flow">
            <article><small>INPUT</small><strong>{item.input}</strong></article>
            <div className="lab-engine"><span /><span /><span /><b>{item.engine}</b></div>
            <article><small>OUTPUT</small><strong>{item.output}</strong></article>
          </div>
          <div className="lab-metrics"><span><b>01</b> Clear owner</span><span><b>02</b> Approval points</span><span><b>03</b> Human fallback</span><span><b>04</b> Measurable result</span></div>
        </div>
      </div>
      <div className="lab-marquee"><div><span>STRATEGY</span><span>INTERFACE</span><span>INTEGRATION</span><span>DEPLOYMENT</span><span>HANDOVER</span><span>STRATEGY</span><span>INTERFACE</span><span>INTEGRATION</span><span>DEPLOYMENT</span><span>HANDOVER</span></div></div>
    </section>
  );
}
