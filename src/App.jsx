import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  GithubLogo,
  List,
  MonitorPlay,
  ShieldCheck,
  X,
} from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  clientProjects,
  coreProjects,
  getNextProject,
  getProject,
  projects,
  services,
} from "./projectData.js";

gsap.registerPlugin(ScrollTrigger);

const contactHref =
  "mailto:yashganesh.work@gmail.com?subject=Let%27s%20build%20something%20useful";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function navigate(href) {
  if (!href.startsWith("/")) {
    window.location.href = href;
    return;
  }

  const destination = new URL(href, window.location.origin);
  if (
    destination.pathname === window.location.pathname &&
    destination.hash
  ) {
    document.querySelector(destination.hash)?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const commitNavigation = () => {
    window.history.pushState({}, "", destination.pathname + destination.hash);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
    if (destination.hash) {
      document.querySelector(destination.hash)?.scrollIntoView();
    }
  };

  if (document.startViewTransition) {
    document.startViewTransition(commitNavigation);
  } else {
    document.documentElement.classList.add("is-navigating");
    window.setTimeout(commitNavigation, 280);
    window.setTimeout(() => document.documentElement.classList.remove("is-navigating"), 720);
  }
}

function SiteLink({ href, children, className = "", ...props }) {
  const internal = href.startsWith("/");
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (
          internal &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          event.preventDefault();
          navigate(href);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function ExternalLink({ href, children, className = "", ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

function Header({ light = false }) {
  const [open, setOpen] = useState(false);
  const home = window.location.pathname === "/";
  const links = [
    ["Work", home ? "#work" : "/#work"],
    ["Approach", home ? "#approach" : "/#approach"],
    ["About", home ? "#about" : "/#about"],
  ];

  return (
    <header className={`site-header${light ? " site-header--light" : ""}`}>
      <SiteLink href="/" className="wordmark" aria-label="YKG home">
        YKG<span />
      </SiteLink>
      <nav className="desktop-navigation" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <SiteLink href={href} key={label}>
            {label}
          </SiteLink>
        ))}
      </nav>
      <a className="header-action" href={contactHref}>
        Start a project <ArrowUpRight weight="bold" aria-hidden="true" />
      </a>
      <button
        type="button"
        className="menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <List />}
      </button>
      <div className={`mobile-navigation${open ? " is-open" : ""}`}>
        {links.map(([label, href], index) => (
          <SiteLink href={href} key={label} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>
            {label}
          </SiteLink>
        ))}
        <a href={contactHref}>Start a project</a>
      </div>
    </header>
  );
}

function Opening({ onComplete }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const finished = useRef(false);

  useLayoutEffect(() => {
    const seen = window.sessionStorage.getItem("ykg-opening-seen") === "true";
    if (seen) {
      onComplete();
      return undefined;
    }

    document.body.classList.add("intro-locked");

    if (reduced) {
      finish();
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(".opening__title span", { yPercent: 115 });
      gsap.set(".opening__portrait", { clipPath: "inset(100% 0 0 0)", scale: 1.08 });
      gsap.set(".opening__meta, .opening__credit, .opening__skip", { opacity: 0 });
      gsap.set(".opening__signal", { scaleX: 0 });
      gsap.set(".opening__project-frame", { opacity: 0, y: 80, rotate: 3 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .to(".opening__meta, .opening__credit, .opening__skip", { opacity: 1, duration: 0.5, stagger: 0.05 }, 0.1)
        .to(".opening__portrait", { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.15, ease: "power4.inOut" }, 0.15)
        .to(".opening__title span", { yPercent: 0, duration: 0.85, stagger: 0.08 }, 0.35)
        .to(".opening__signal", { scaleX: 1, duration: 1.05 }, 0.7)
        .to(".opening__project-frame", { opacity: 1, y: 0, rotate: -1.5, duration: 0.75 }, 1.45)
        .to(".opening__project-frame", { xPercent: -12, duration: 0.8, ease: "power2.inOut" }, 2.2)
        .to(root.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: finish,
        }, 3.15);
    }, root);

    const onKey = (event) => {
      if (["Escape", "Enter", " "].includes(event.key)) finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      context.revert();
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("intro-locked");
    };

    function finish() {
      if (finished.current) return;
      finished.current = true;
      window.sessionStorage.setItem("ykg-opening-seen", "true");
      document.body.classList.remove("intro-locked");
      onComplete();
    }
  }, [onComplete, reduced]);

  return (
    <section className="opening" ref={root} aria-label="YKG opening sequence">
      <div className="opening__meta">
        <span>YKG / A FILM ABOUT USEFUL INTELLIGENCE</span>
        <span>PUNE, INDIA / WORKING GLOBALLY</span>
      </div>
      <figure className="opening__portrait" aria-hidden="true">
        <img src="/images/portraits/yash-builder.webp" alt="" />
      </figure>
      <figure className="opening__project-frame" aria-hidden="true">
        <img src="/images/projects/brace-interface-home.webp" alt="" />
        <figcaption>FRAME 02 / ORCHESTRATION SYSTEM</figcaption>
      </figure>
      <span className="opening__signal" aria-hidden="true" />
      <h1 className="opening__title">
        <span>INTELLIGENCE.</span>
        <span>MADE USEFUL.</span>
      </h1>
      <p className="opening__credit">YASH GANESH / AI SYSTEMS + PRODUCT ENGINEERING</p>
      <button type="button" className="opening__skip" onClick={() => {
        window.sessionStorage.setItem("ykg-opening-seen", "true");
        document.body.classList.remove("intro-locked");
        onComplete();
      }}>
        Skip intro
      </button>
    </section>
  );
}

function Hero() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const media = gsap.matchMedia();
    media.add("(min-width: 801px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      timeline
        .to(".cinematic-hero__portrait img", { scale: 1.08, xPercent: 8, duration: 1 }, 0)
        .to(".cinematic-hero__title", { yPercent: -38, opacity: 0, duration: 0.55 }, 0.35)
        .to(".cinematic-hero__lede, .cinematic-hero__cue", { opacity: 0, y: -24, duration: 0.35 }, 0.38)
        .to(".cinematic-hero__portrait", { clipPath: "inset(0 52% 0 0)", xPercent: 24, duration: 0.9, ease: "power3.inOut" }, 0.48)
        .fromTo(".cinematic-hero__chapter", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
        .fromTo(".cinematic-frame--one", { clipPath: "inset(100% 0 0 0)", yPercent: 20 }, { clipPath: "inset(0% 0 0 0)", yPercent: 0, duration: 0.75 }, 0.62)
        .fromTo(".cinematic-frame--two", { clipPath: "inset(100% 0 0 0)", yPercent: 26 }, { clipPath: "inset(0% 0 0 0)", yPercent: 0, duration: 0.75 }, 0.82)
        .fromTo(".cinematic-frame--three", { clipPath: "inset(100% 0 0 0)", yPercent: 32 }, { clipPath: "inset(0% 0 0 0)", yPercent: 0, duration: 0.75 }, 1.02)
        .to(".cinematic-hero__chapter", { opacity: 0, y: -44, duration: 0.4 }, 1.35)
        .to(".cinematic-frames", { xPercent: -28, scale: 0.84, opacity: 0.34, duration: 0.85 }, 1.35)
        .fromTo(".cinematic-hero__resolution", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.75 }, 1.55)
        .to(".cinematic-hero__signal span", { scaleX: 1, duration: 1.5 }, 0.15);
    });
    return () => media.revert();
  }, [reduced]);

  return (
    <section className="cinematic-hero" id="top" ref={root}>
      <div className="cinematic-hero__stage">
        <Header />
        <div className="cinematic-hero__topline">
          <span>YASH GANESH / INDEPENDENT BUILDER</span>
          <span>AI IMPLEMENTATION + PRODUCT ENGINEERING</span>
        </div>
        <figure className="cinematic-hero__portrait">
          <img src="/images/portraits/yash-builder.webp" alt="Yash Ganesh working through an AI product system" />
        </figure>
        <div className="cinematic-hero__signal" aria-hidden="true"><i>01</i><span /></div>
        <h1 className="cinematic-hero__title">
          <span>AI SYSTEMS.</span>
          <span>MADE <em>USEFUL.</em></span>
        </h1>
        <p className="cinematic-hero__lede">
          I turn operational friction into AI products that people can actually use—strategy, interface, intelligence, and deployment.
        </p>
        <SiteLink className="cinematic-hero__cue" href="/#work">
          Scroll to enter the work <ArrowDown weight="bold" />
        </SiteLink>
        <div className="cinematic-hero__chapter">
          <span>CHAPTER 01 / THE WORK</span>
          <h2>From signal<br />to system.</h2>
          <p>Real products. Real code. Every layer considered.</p>
        </div>
        <div className="cinematic-frames" aria-hidden="true">
          <figure className="cinematic-frame cinematic-frame--one">
            <img src="/images/projects/lernio-ai-home.webp" alt="" />
            <figcaption>LERNIO AI / KNOWLEDGE SYSTEM</figcaption>
          </figure>
          <figure className="cinematic-frame cinematic-frame--two">
            <img src="/images/projects/brace-interface-home.webp" alt="" />
            <figcaption>B.R.A.C.E. / ORCHESTRATION</figcaption>
          </figure>
          <figure className="cinematic-frame cinematic-frame--three">
            <img src="/images/projects/campusmate-home.webp" alt="" />
            <figcaption>CAMPUSMATE / STUDENT PLATFORM</figcaption>
          </figure>
        </div>
        <div className="cinematic-hero__resolution">
          <span>THE PRACTICE</span>
          <h2>I don&apos;t decorate products with AI.</h2>
          <p>I design the product, intelligence, and operating system as one useful whole.</p>
          <SiteLink href="/#work">See the evidence <ArrowDown weight="bold" /></SiteLink>
        </div>
        <div className="cinematic-hero__frame-index" aria-hidden="true">
          <span>YKG / FILM 001</span><span>00:00:01:24</span>
        </div>
      </div>
    </section>
  );
}

function ProjectReel() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || window.matchMedia("(max-width: 800px)").matches) return undefined;
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const next = Math.min(
          coreProjects.length - 1,
          Math.floor(self.progress * coreProjects.length),
        );
        setActive(next);
      },
    });
    return () => trigger.kill();
  }, [reduced]);

  return (
    <section
      className="project-reel"
      id="work"
      ref={root}
      style={{ "--project-count": coreProjects.length }}
    >
      <div className="project-reel__stage">
        <div className="project-reel__heading">
          <span>Selected work</span>
          <span>Independent products & experiments</span>
        </div>
        <nav className="project-reel__index" aria-label="Selected projects">
          {coreProjects.map((project, index) => (
            <button
              type="button"
              key={project.slug}
              className={active === index ? "is-active" : ""}
              onClick={() => {
                const top = root.current.offsetTop;
                const available = root.current.offsetHeight - window.innerHeight;
                window.scrollTo({
                  top: top + (index / coreProjects.length + 0.02) * available,
                  behavior: "smooth",
                });
              }}
              aria-label={`Show ${project.name}`}
            >
              {project.number}
            </button>
          ))}
        </nav>
        <div className="project-reel__panels">
          {coreProjects.map((project, index) => (
            <article
              className={`reel-project${active === index ? " is-active" : ""}`}
              key={project.slug}
              style={{ "--project-accent": project.accent }}
            >
              <div className="reel-project__copy">
                <p>{project.number} / {project.category}</p>
                <h2>{project.name}</h2>
                <h3>{project.statement}</h3>
                <p className="reel-project__summary">{project.summary}</p>
                <div className="reel-project__proof">
                  {project.proof.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
                </div>
                <SiteLink href={`/work/${project.slug}`} className="project-link">
                  View case study <ArrowRight weight="bold" />
                </SiteLink>
              </div>
              <SiteLink href={`/work/${project.slug}`} className="reel-project__media">
                <img src={project.media} alt={`${project.name} interface`} loading={index === 0 ? "eager" : "lazy"} />
                <span>{project.type}</span>
              </SiteLink>
            </article>
          ))}
        </div>
        <div className="project-reel__progress" aria-hidden="true">
          <span style={{ width: `${((active + 1) / coreProjects.length) * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

function ClientWork() {
  const project = clientProjects[0];
  return (
    <section className="client-work">
      <div className="section-intro" data-reveal>
        <p>Client work / C01</p>
        <h2>Built for a real business, around the way it already sells.</h2>
      </div>
      <article className="client-feature" data-reveal>
        <SiteLink href={`/work/${project.slug}`} className="client-feature__media">
          <img src={project.media} alt="Fakhri Mart catalogue homepage" loading="lazy" />
        </SiteLink>
        <div className="client-feature__copy">
          <span>{project.status} / {project.year}</span>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <ul>
            {project.proof.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <SiteLink href={`/work/${project.slug}`} className="project-link project-link--dark">
            Read the client case study <ArrowRight weight="bold" />
          </SiteLink>
        </div>
      </article>
    </section>
  );
}

function Approach() {
  return (
    <section className="approach" id="approach">
      <div className="approach__heading" data-reveal>
        <p>What I do</p>
        <h2>Systems that compound.</h2>
        <span>End-to-end AI implementation for small teams and established companies.</span>
      </div>
      <ol className="system-map">
        {services.map((service) => (
          <li key={service.name} data-reveal>
            <span>{service.number}</span>
            <p>{service.name}</p>
            <h3>{service.title}</h3>
            <div>{service.copy}</div>
          </li>
        ))}
      </ol>
      <div className="approach__line" aria-hidden="true"><span /></div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "Understand", "Deep dive into the workflow, users, information, risk, and desired outcome.", "/images/portraits/yash-builder.webp"],
    ["02", "Design", "Map the system, the interface, the model boundaries, and the human decisions.", "/images/portraits/yash-editorial.webp"],
    ["03", "Build", "Implement the product loop across frontend, intelligence, data, and integrations.", "/images/projects/brace-interface-home.webp"],
    ["04", "Validate", "Test real scenarios, deployment behavior, accessibility, performance, and handover.", "/images/projects/lernio-ai-home.webp"],
  ];
  return (
    <section className="process" id="process">
      <div className="process__heading" data-reveal>
        <p>How I work</p>
        <h2>Clarity first.<br />Build precisely.</h2>
        <span>A focused path from problem to impact.</span>
      </div>
      <div className="process__steps">
        {steps.map(([number, title, copy, image]) => (
          <article key={title} data-reveal>
            <img src={image} alt="" loading="lazy" />
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ManifestoStage() {
  return (
    <section className="manifesto-stage" id="about">
      <img src="/images/portraits/yash-manifesto-stage.webp" alt="Yash seated beside a sculptural YG monogram" loading="lazy" />
      <div className="manifesto-stage__copy" data-reveal>
        <h2>Build<br />what<br />matters<span>.</span></h2>
        <p>Useful AI systems, designed and implemented end to end.</p>
      </div>
      <div className="manifesto-stage__caption">
        <span>01</span>
        <span>Living systems stage</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <h2>Let&apos;s build<br />something useful<span>.</span></h2>
      <div className="site-footer__contact">
        <a href={contactHref}>Start a project <ArrowUpRight weight="bold" /></a>
        <a href="mailto:yashganesh.work@gmail.com">yashganesh.work@gmail.com</a>
        <ExternalLink href="https://github.com/GYASH28">GitHub <ArrowUpRight /></ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/yash-ganesh-/">LinkedIn <ArrowUpRight /></ExternalLink>
      </div>
      <div className="site-footer__meta">
        <span>Available for focused projects</span>
        <span>Pune, India / Working globally</span>
        <span>© 2026 Yash Ganesh</span>
      </div>
    </footer>
  );
}

function HomePage() {
  const [opening, setOpening] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.title = "Yash Ganesh — AI Systems, Made Useful";
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (!reduced) {
        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 42 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            },
          );
        });
      }
    });
    window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => context.revert();
  }, [reduced, opening]);

  return (
    <>
      {opening && <Opening onComplete={() => setOpening(false)} />}
      <main>
        <Hero />
        <ProjectReel />
        <ClientWork />
        <Approach />
        <Process />
        <ManifestoStage />
      </main>
      <Footer />
    </>
  );
}

function LiveExperience({ project }) {
  const live = project.embed === "live";
  const protectedFrame = project.embed === "protected";
  return (
    <section className="live-experience" id="live-experience">
      <div className="case-section-heading">
        <p>Live system</p>
        <h2>{live ? "Use the project without leaving the case study." : protectedFrame ? "A protected live deployment." : "A local-first product preview."}</h2>
        <span>
          {live
            ? "The deployment is embedded below. It remains the project itself—not a recreated mockup."
            : protectedFrame
              ? "This deployment blocks third-party framing with security headers. The live product opens in a new tab instead of failing silently inside an empty iframe."
              : "B.R.A.C.E. is a desktop and local runtime. The interface preview below documents the current build without pretending a public web deployment exists."}
        </span>
      </div>
      <div className={`live-frame${live ? "" : " live-frame--fallback"}`}>
        <div className="live-frame__bar">
          <div><i /><i /><i /></div>
          <span>{project.liveUrl || "LOCAL BUILD / NOT PUBLICLY HOSTED"}</span>
          {project.liveUrl && (
            <ExternalLink href={project.liveUrl} aria-label={`Open ${project.name} in a new tab`}>
              Open live <ArrowUpRight weight="bold" />
            </ExternalLink>
          )}
        </div>
        {live ? (
          <iframe
            src={project.liveUrl}
            title={`${project.name} live project`}
            loading="lazy"
            allow="clipboard-write; fullscreen"
          />
        ) : (
          <div className="live-frame__poster">
            <img src={project.media} alt={`${project.name} interface preview`} />
            <div>
              {protectedFrame ? <ShieldCheck weight="duotone" /> : <MonitorPlay weight="duotone" />}
              <h3>{protectedFrame ? "Framing blocked by the project security policy" : "Designed to run locally"}</h3>
              <p>{protectedFrame ? "The portfolio preserves that protection and provides a direct launch." : "Explore the interface and implementation through this case study and repository."}</p>
              {project.liveUrl && <ExternalLink href={project.liveUrl}>Launch the live product <ArrowUpRight /></ExternalLink>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CaseTextSection({ label, title, paragraphs }) {
  return (
    <section className="case-text-section" data-reveal>
      <p>{label}</p>
      <div>
        <h2>{title}</h2>
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function ProjectPage({ project }) {
  const nextProject = getNextProject(project.slug);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    document.title = `${project.name} — Yash Ganesh`;
    const context = gsap.context(() => {
      if (!reduced) {
        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { opacity: 0, y: 36 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
      }
    });
    ScrollTrigger.refresh();
    return () => context.revert();
  }, [project.slug, reduced]);

  return (
    <div className="case-page" style={{ "--project-accent": project.accent }}>
      <Header />
      <main>
        <section className="case-hero">
          <div className="case-hero__meta">
            <span>{project.number}</span>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1>{project.name}</h1>
          <p className="case-hero__statement">{project.statement}</p>
          <div className="case-hero__media">
            <img src={project.media} alt={`${project.name} project interface`} />
          </div>
          <div className="case-hero__summary">
            <p>{project.summary}</p>
            <dl>
              <div><dt>Status</dt><dd>{project.status}</dd></div>
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Stack</dt><dd>{project.stack.join(" / ")}</dd></div>
            </dl>
          </div>
        </section>

        <nav className="case-jump" aria-label="Case study sections">
          <a href="#problem">Problem</a>
          <a href="#solution">Solution</a>
          <a href="#live-experience">Live system</a>
          <a href="#engineering">Engineering</a>
          <a href="#lessons">Lessons</a>
        </nav>

        <div id="problem"><CaseTextSection label="01 / Context" title="The problem worth solving." paragraphs={project.problem} /></div>
        <div id="solution"><CaseTextSection label="02 / Product response" title="The system, not just the screen." paragraphs={project.solution} /></div>

        <section className="decision-grid" data-reveal>
          <div className="case-section-heading">
            <p>03 / Key decisions</p>
            <h2>Choices that shaped the product.</h2>
          </div>
          <ol>
            {project.decisions.map((decision, index) => (
              <li key={decision}><span>0{index + 1}</span><p>{decision}</p></li>
            ))}
          </ol>
        </section>

        <LiveExperience project={project} />

        <section className="engineering-section" id="engineering" data-reveal>
          <div className="case-section-heading">
            <p>04 / Implementation</p>
            <h2>How the product is put together.</h2>
          </div>
          <div className="engineering-section__grid">
            {project.engineering.map((item, index) => (
              <article key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className="technology-line">
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section className="proof-section" data-reveal>
          <div className="case-section-heading">
            <p>05 / Verified proof</p>
            <h2>What exists in the build.</h2>
          </div>
          <div className="proof-section__list">
            {project.proof.map((item) => <span key={item}><Check weight="bold" />{item}</span>)}
          </div>
          <div className="proof-section__links">
            {project.liveUrl && <ExternalLink href={project.liveUrl}>Open live <ArrowUpRight /></ExternalLink>}
            <ExternalLink href={project.repoUrl}>View repository <GithubLogo weight="fill" /></ExternalLink>
          </div>
        </section>

        <section className="lessons-section" id="lessons" data-reveal>
          <p>06 / Lessons</p>
          <h2>What this project changed in the way I build.</h2>
          {project.lessons.map((lesson) => <blockquote key={lesson}>{lesson}</blockquote>)}
        </section>

        <section className="next-project">
          <p>Next project</p>
          <SiteLink href={`/work/${nextProject.slug}`}>
            <span>{nextProject.name}</span>
            <ArrowRight weight="bold" />
          </SiteLink>
          <img src={nextProject.media} alt="" loading="lazy" />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function WorkArchive() {
  return (
    <div className="archive-page">
      <Header />
      <main>
        <div className="archive-heading">
          <p>Full project index</p>
          <h1>Work that moved<br />from idea to system<span>.</span></h1>
        </div>
        <div className="archive-list">
          {projects.map((project) => (
            <SiteLink href={`/work/${project.slug}`} key={project.slug}>
              <span>{project.number}</span>
              <h2>{project.name}</h2>
              <p>{project.type}</p>
              <b>{project.category}</b>
              <ArrowUpRight />
            </SiteLink>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <Header />
      <main>
        <span>404</span>
        <h1>This route has not been built yet.</h1>
        <SiteLink href="/">Return home <ArrowLeft /></SiteLink>
      </main>
    </div>
  );
}

export function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const route = useMemo(() => {
    if (path === "/") return <HomePage />;
    if (path === "/work" || path === "/work/") return <WorkArchive />;
    if (path.startsWith("/work/")) {
      const slug = path.split("/").filter(Boolean)[1];
      const project = getProject(slug);
      return project ? <ProjectPage project={project} /> : <NotFound />;
    }
    return <NotFound />;
  }, [path]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="route-wipe" aria-hidden="true" />
      <div id="main-content" key={path}>{route}</div>
    </>
  );
}
