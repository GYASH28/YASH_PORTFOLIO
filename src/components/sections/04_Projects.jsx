import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/content";
import { LiveShowcase } from "./LiveShowcase";
import { BrowserMockup } from "../ui/ProjectMockups";

gsap.registerPlugin(ScrollTrigger);

const FloatingBrowser = lazy(() => import("../three/FloatingBrowser").then((module) => ({ default: module.FloatingBrowser })));

export function Projects() {
  const scrollStageRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const section = scrollStageRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const pin = section?.querySelector(".projects-pin");
    if (!section || !track) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 900px)": () => {
          const maxX = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const scrollDistance = () => Math.max(maxX(), window.innerHeight * 1.25);

          const tween = gsap.to(track, {
            x: () => -maxX(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollDistance()}`,
              scrub: 1,
              pin,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progress) progress.style.transform = `scaleX(${self.progress})`;
              },
            },
          });
          return () => tween.kill();
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <LiveShowcase />
      <div className="projects-scroll-stage" ref={scrollStageRef}>
        <div className="projects-pin">
          <div className="projects-header">
            <p className="section-label">// 04 - THE OUTPUT</p>
            <h2 className="text-display">Projects that shipped.</h2>
            <div className="projects-progress" aria-hidden="true">
              <span ref={progressRef} />
            </div>
          </div>
          <div className="projects-track" ref={trackRef}>
            {projects.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const featured = project.featured;
  return (
    <article className={`project-card ${featured ? "featured" : ""}`} style={{ "--project-accent": project.accent }}>
      <div className="project-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="project-content">
        {featured && <span className="featured-badge">FEATURED PRODUCT</span>}
        <h3>{project.name}</h3>
        <p className="project-type">{project.type}</p>
        <p className="project-desc">{project.description}</p>
        <div className="project-mockup">
          {project.id === "lernio" && (
            <Suspense fallback={null}>
              <FloatingBrowser />
            </Suspense>
          )}
          <BrowserMockup project={project} />
        </div>
        <div className="project-metrics">
          {project.metrics.map((metric) => (
            <span key={metric}>{metric}</span>
          ))}
        </div>
        <div className="project-tech">
          {project.tech.map((tech) => (
            <small key={tech}>{tech}</small>
          ))}
        </div>
      </div>
      <div className="project-actions">
        {project.url ? (
          <a href={project.url} target="_blank" rel="noreferrer" className="focus-ring">
            Launch Project <ExternalLink size={16} aria-hidden="true" />
          </a>
        ) : (
          <span>Workflow Preview</span>
        )}
      </div>
    </article>
  );
}
