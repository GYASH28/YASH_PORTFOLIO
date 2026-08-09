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
import { drawCover, ScrollFilm } from "./ScrollFilm.jsx";
import { films, getFilmFrame } from "./filmData.js";
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
  const [reduced, setReduced] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

const prologueStorageKey = "ykg-cinematic-prologue-seen";

function CinematicPrologue({ reduced }) {
  const root = useRef(null);
  const canvas = useRef(null);
  const dismissRef = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (reduced) return false;
    try {
      return window.sessionStorage.getItem(prologueStorageKey) !== "1";
    } catch {
      return true;
    }
  });
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible || reduced) return undefined;
    const element = root.current;
    const surface = canvas.current;
    if (!element || !surface) return undefined;

    const context = surface.getContext("2d", { alpha: false, desynchronized: true });
    const frameIndices = Array.from({ length: 50 }, (_, index) => index * 2);
    if (frameIndices.at(-1) !== films.opening.frameCount - 1) {
      frameIndices.push(films.opening.frameCount - 1);
    }
    const cache = new Map();
    let cancelled = false;
    let animationFrame;
    let startTime;
    let exitTimer;
    let currentImage;
    const duration = 5900;
    const backgroundElements = [
      ...element.parentElement.children,
      document.querySelector(".skip-link"),
    ].filter((node) => node && node !== element);

    document.body.classList.add("is-prologue-locked");
    backgroundElements.forEach((node) => { node.inert = true; });

    const resize = () => {
      const bounds = surface.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      surface.width = Math.max(1, Math.round(bounds.width * dpr));
      surface.height = Math.max(1, Math.round(bounds.height * dpr));
      if (currentImage) drawCover(context, currentImage, surface.width, surface.height);
    };

    const drawNearest = (slot) => {
      let image = cache.get(slot);
      if (!image) {
        for (let distance = 1; distance < frameIndices.length; distance += 1) {
          image = cache.get(Math.max(0, slot - distance)) || cache.get(Math.min(frameIndices.length - 1, slot + distance));
          if (image) break;
        }
      }
      if (!image) return;
      currentImage = image;
      drawCover(context, image, surface.width, surface.height);
    };

    const beginExit = () => {
      if (cancelled || element.dataset.exiting === "true") return;
      element.dataset.exiting = "true";
      try {
        window.sessionStorage.setItem(prologueStorageKey, "1");
      } catch {
        // The sequence still works when storage is unavailable.
      }
      setExiting(true);
      window.cancelAnimationFrame(animationFrame);
      exitTimer = window.setTimeout(() => setVisible(false), 920);
    };
    dismissRef.current = beginExit;

    const tick = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min(1, (time - startTime) / duration);
      element.style.setProperty("--prologue-progress", progress.toFixed(4));
      drawNearest(Math.round(progress * (frameIndices.length - 1)));
      if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
      else beginExit();
    };

    resize();
    const onKeyDown = (event) => {
      if (event.key === "Escape") beginExit();
    };
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    frameIndices.forEach((frameIndex, slot) => {
      const image = new Image();
      image.decoding = "async";
      image.src = getFilmFrame(films.opening, frameIndex);
      image.onload = () => {
        if (cancelled) return;
        cache.set(slot, image);
        if (slot === 0) {
          currentImage = image;
          drawCover(context, image, surface.width, surface.height);
          setReady(true);
          animationFrame = window.requestAnimationFrame(tick);
        }
      };
    });

    return () => {
      cancelled = true;
      document.body.classList.remove("is-prologue-locked");
      backgroundElements.forEach((node) => { node.inert = false; });
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimer);
      dismissRef.current = null;
    };
  }, [reduced, visible]);

  useEffect(() => {
    if (reduced && visible) setVisible(false);
  }, [reduced, visible]);

  if (!visible) return null;

  return (
    <div
      ref={root}
      className={`cinematic-prologue${ready ? " is-ready" : ""}${exiting ? " is-exiting" : ""}`}
      style={{ "--prologue-progress": 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Opening title sequence"
    >
      <canvas ref={canvas} className="cinematic-prologue__canvas" aria-hidden="true" />
      <div className="cinematic-prologue__grade" aria-hidden="true" />
      <div className="cinematic-prologue__signal" aria-hidden="true"><i /></div>
      <div className="cinematic-prologue__meta">
        <span>YKG / TITLE FILM 00</span>
        <span>PUNE, INDIA / 2026</span>
      </div>
      <div className="cinematic-prologue__credit">
        <span>An independent practice by</span>
        <strong>Yash Ganesh</strong>
      </div>
      <div className="cinematic-prologue__title" aria-hidden="true">
        <span>Intelligence</span>
        <span>Made useful<i>.</i></span>
      </div>
      <p className="visually-hidden">Yash Ganesh. Intelligence made useful.</p>
      <div className="cinematic-prologue__foot">
        <span>AI systems / product engineering / implementation</span>
        <button type="button" onClick={() => dismissRef.current?.()}>
          Skip intro <span>Esc</span>
        </button>
      </div>
      <div className="cinematic-prologue__progress" aria-hidden="true"><span /></div>
      <div className="cinematic-prologue__curtain" aria-hidden="true" />
    </div>
  );
}

function useEditorialReveals(scope, reduced, dependency) {
  useLayoutEffect(() => {
    if (reduced || !scope.current) return undefined;
    const context = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -5, scale: 1.04 },
          {
            yPercent: 5,
            scale: 1.09,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, scope);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => {
      window.clearTimeout(refreshTimer);
      context.revert();
    };
  }, [dependency, reduced, scope]);
}

function navigate(href) {
  if (!href.startsWith("/")) {
    window.location.href = href;
    return;
  }

  const destination = new URL(href, window.location.origin);
  const commitNavigation = () => {
    window.history.pushState({}, "", destination.pathname + destination.hash);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
    if (destination.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(destination.hash)?.scrollIntoView();
      });
    }
  };

  if (document.startViewTransition) document.startViewTransition(commitNavigation);
  else commitNavigation();
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
    <a href={href} target="_blank" rel="noreferrer" className={className} {...props}>
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const menuWasOpenRef = useRef(false);
  const home = window.location.pathname === "/";
  const links = [
    ["Work", home ? "#work" : "/#work"],
    ["Approach", home ? "#approach" : "/#approach"],
    ["About", home ? "#about" : "/#about"],
    ["Index", "/work"],
  ];

  useEffect(() => {
    if (!open) {
      if (menuWasOpenRef.current) menuButtonRef.current?.focus({ preventScroll: true });
      menuWasOpenRef.current = false;
      return undefined;
    }

    menuWasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    const firstLink = menuPanelRef.current?.querySelector("a");
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    const focusFrame = window.requestAnimationFrame(() => firstLink?.focus({ preventScroll: true }));

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [open]);

  return (
    <header className="site-header">
      <SiteLink href="/" className="wordmark" aria-label="YKG home">
        YKG<i />
      </SiteLink>
      <nav className="desktop-navigation" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <SiteLink href={href} key={label}>{label}</SiteLink>
        ))}
      </nav>
      <a className="header-action" href={contactHref}>
        Start a project <ArrowUpRight weight="bold" aria-hidden="true" />
      </a>
      <button
        ref={menuButtonRef}
        type="button"
        className="menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <List />}
      </button>
      <div
        ref={menuPanelRef}
        id="mobile-menu"
        className={`mobile-navigation${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        {links.map(([label, href], index) => (
          <SiteLink href={href} key={label} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>{label}
          </SiteLink>
        ))}
        <a href={contactHref}>Start a project <ArrowUpRight /></a>
      </div>
    </header>
  );
}

function FilmChrome({ index, label }) {
  return (
    <>
      <div className="film-chrome film-chrome--top">
        <span>YKG / {index}</span>
        <span>{label}</span>
      </div>
      <div className="film-chrome film-chrome--bottom">
        <span>PUNE, INDIA / WORKING GLOBALLY</span>
        <span>SCROLL DIRECTS THE FILM</span>
      </div>
    </>
  );
}

function OpeningFilm({ reduced }) {
  return (
    <ScrollFilm
      film={films.opening}
      className="film film--opening"
      height={250}
      reducedMotion={reduced}
      labelledBy="opening-film-title"
    >
      <FilmChrome index="FILM 001" label="THINKING IN SYSTEMS" />
      <div className="film-beat film-beat--opening">
        <p>Independent AI implementation consultancy</p>
        <h1 id="opening-film-title">Intelligence.<br /><em>Made useful.</em></h1>
        <span>I design and implement AI systems around the way real teams work.</span>
        <a href="#identity-film" className="film-link">Enter the practice <ArrowDown weight="bold" /></a>
      </div>
      <div className="film-beat film-beat--middle">
        <p>Before the model</p>
        <h2>Read the work.<br />Map the system.</h2>
        <span>The useful opportunity appears before the technology choice.</span>
      </div>
      <div className="film-beat film-beat--closing">
        <p>From ambiguity to direction</p>
        <h2>Then build<br />the whole loop.</h2>
      </div>
    </ScrollFilm>
  );
}

function IdentityFilm({ reduced }) {
  return (
    <ScrollFilm
      film={films.identity}
      className="film film--identity"
      height={310}
      reducedMotion={reduced}
      labelledBy="identity-film-title"
    >
      <FilmChrome index="FILM 002" label="A PERSONAL PRACTICE" />
      <div className="identity-note identity-note--one">
        <p>A practice built from first principles</p>
        <h2 id="identity-film-title">Product thinking.<br />Engineering depth.<br />Human judgment.</h2>
      </div>
      <div className="identity-note identity-note--two">
        <p>The point is not more AI.</p>
        <h2>It is better<br />work.</h2>
        <a href="#work">See the evidence <ArrowDown weight="bold" /></a>
      </div>
      <p className="visually-hidden">I built what I could not find. The work keeps moving.</p>
    </ScrollFilm>
  );
}

function PracticeIntro() {
  return (
    <section className="practice-intro" id="approach">
      <div className="practice-intro__index" data-reveal>
        <span>01</span><i /><span>THE PRACTICE</span>
      </div>
      <div className="practice-intro__title" data-reveal>
        <p>Strategy / product / intelligence / deployment</p>
        <h2>Intelligence<br />into <em>impact.</em></h2>
      </div>
      <div className="practice-intro__copy" data-reveal>
        <p>
          I work with small teams and established companies to find where AI is genuinely useful,
          shape the operating model, and implement the product end to end.
        </p>
        <a href="#work">Explore selected work <ArrowDown weight="bold" /></a>
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
      onUpdate: ({ progress }) => {
        setActive(Math.min(coreProjects.length - 1, Math.floor(progress * coreProjects.length)));
      },
    });
    return () => trigger.kill();
  }, [reduced]);

  const moveToProject = (index) => {
    const available = root.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: root.current.offsetTop + ((index + 0.12) / coreProjects.length) * available,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section className="project-reel" id="work" ref={root} style={{ "--project-count": coreProjects.length }}>
      <div className="project-reel__stage">
        <div className="project-reel__topline">
          <span>Selected work / independent products</span>
          <SiteLink href="/work">Full index <ArrowUpRight /></SiteLink>
        </div>
        <nav className="project-reel__index" aria-label="Select a featured project">
          {coreProjects.map((project, index) => (
            <button
              type="button"
              key={project.slug}
              className={active === index ? "is-active" : ""}
              onClick={() => moveToProject(index)}
            >
              <span>{project.number}</span><i />
            </button>
          ))}
        </nav>
        <div className="project-reel__panels" aria-live="polite">
          {coreProjects.map((project, index) => (
            <article className={`reel-project${active === index ? " is-active" : ""}`} key={project.slug}>
              <SiteLink href={`/work/${project.slug}`} className="reel-project__media" aria-label={`Open ${project.name} case study`}>
                <img src={project.media} alt={`${project.name} interface`} loading={index === 0 ? "eager" : "lazy"} />
                <span className="reel-project__media-index">FRAME / {project.number}</span>
              </SiteLink>
              <div className="reel-project__copy">
                <p>{project.number} / {project.category}</p>
                <h2>{project.name}</h2>
                <h3>{project.statement}</h3>
                <p className="reel-project__summary">{project.summary}</p>
                <div className="reel-project__proof">
                  {project.proof.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
                </div>
                <SiteLink href={`/work/${project.slug}`} className="project-link">
                  Enter the case study <ArrowRight weight="bold" />
                </SiteLink>
              </div>
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
      <div className="client-work__label" data-reveal>
        <span>Client work</span><b>C01</b>
      </div>
      <SiteLink href={`/work/${project.slug}`} className="client-work__media" data-reveal>
        <img src={project.media} alt="Fakhri Mart catalogue homepage" loading="lazy" data-parallax />
        <span>REAL BUSINESS / REAL SALES FLOW</span>
      </SiteLink>
      <div className="client-work__copy" data-reveal>
        <p>{project.status} / {project.year}</p>
        <h2>Built for the way<br />the business <em>already sells.</em></h2>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="client-work__proof">
          {project.proof.map((item) => <span key={item}>{item}</span>)}
        </div>
        <SiteLink href={`/work/${project.slug}`} className="project-link project-link--ink">
          Read the client case study <ArrowRight weight="bold" />
        </SiteLink>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="approach">
      <div className="approach__heading" data-reveal>
        <p>02 / What I do</p>
        <h2>Systems that<br /><em>compound.</em></h2>
        <span>One accountable path from operational friction to a usable, maintainable system.</span>
      </div>
      <ol className="service-ledger">
        {services.map((service) => (
          <li key={service.name} data-reveal>
            <span>{service.number}</span>
            <p>{service.name}</p>
            <h3>{service.title}</h3>
            <div>{service.copy}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "Understand", "Go inside the workflow, users, information, risk, and desired outcome.", "/images/portraits/yash-builder.webp"],
    ["02", "Design", "Map the system, interface, model boundaries, and the decisions that stay human.", "/images/portraits/yash-editorial.webp"],
    ["03", "Build", "Implement the product loop across frontend, intelligence, data, and integrations.", "/images/projects/brace-interface-home.webp"],
    ["04", "Validate", "Test real scenarios, accessibility, deployment behavior, performance, and handover.", "/images/projects/lernio-ai-home.webp"],
  ];
  return (
    <section className="process">
      <div className="process__heading" data-reveal>
        <p>03 / How I work</p>
        <h2>Clarity first.<br />Build precisely.</h2>
        <span>A focused process from problem to impact.</span>
      </div>
      <div className="process__steps">
        {steps.map(([number, title, copy, image]) => (
          <article key={title} data-reveal>
            <figure><img src={image} alt="" loading="lazy" data-parallax /></figure>
            <span>{number}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinaleFilm({ reduced }) {
  return (
    <ScrollFilm
      film={films.finale}
      className="film film--finale"
      height={260}
      reducedMotion={reduced}
      labelledBy="finale-film-title"
    >
      <FilmChrome index="FILM 003" label="LIVING SYSTEMS" />
      <div className="finale-copy">
        <p>Useful AI systems, designed and implemented end to end.</p>
        <h2 id="finale-film-title">Build<br />what<br />matters<span>.</span></h2>
      </div>
      <div className="finale-action">
        <span>Have a difficult workflow worth fixing?</span>
        <a href={contactHref}>Start a project <ArrowUpRight weight="bold" /></a>
      </div>
    </ScrollFilm>
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
  const root = useRef(null);
  const reduced = useReducedMotion();
  useEditorialReveals(root, reduced, "home");

  useEffect(() => {
    document.title = "Yash Ganesh — AI Systems, Made Useful";
  }, []);

  return (
    <div ref={root} className="home-page">
      <CinematicPrologue reduced={reduced} />
      <Header />
      <main>
        <OpeningFilm reduced={reduced} />
        <div id="identity-film"><IdentityFilm reduced={reduced} /></div>
        <PracticeIntro />
        <ProjectReel />
        <ClientWork />
        <Approach />
        <Process />
        <div id="about"><FinaleFilm reduced={reduced} /></div>
      </main>
      <Footer />
    </div>
  );
}

function LiveExperience({ project }) {
  const live = project.embed === "live";
  const protectedFrame = project.embed === "protected";
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="live-experience case-chapter" id="live-experience" data-reveal>
      <div className="case-chapter__heading">
        <span>04</span>
        <p>Live system</p>
        <h2>{live ? "Use the build, here." : protectedFrame ? "Security stays intact." : "A local-first build."}</h2>
        <div>
          {live
            ? "This is the deployed product itself, embedded inside the case study."
            : protectedFrame
              ? "The deployment blocks third-party framing. The direct launch remains available instead of presenting a broken iframe."
              : "B.R.A.C.E. is a desktop runtime. The documented preview does not pretend a public deployment exists."}
        </div>
      </div>
      <div className={`live-frame${live ? "" : " live-frame--fallback"}`}>
        <div className="live-frame__toolbar">
          <span>{project.liveUrl || "LOCAL BUILD / NOT PUBLICLY HOSTED"}</span>
          {project.liveUrl && (
            <ExternalLink href={project.liveUrl}>Open live <ArrowUpRight weight="bold" /></ExternalLink>
          )}
        </div>
        {live ? (
          <div className="live-frame__viewport">
            {!loaded && (
              <div className="live-frame__loading" role="status">
                <img src={project.media} alt="" aria-hidden="true" />
                <span>Loading the live system…</span>
              </div>
            )}
            <iframe
              src={project.liveUrl}
              title={`${project.name} live project`}
              loading="lazy"
              allow="clipboard-write; fullscreen"
              onLoad={() => setLoaded(true)}
            />
          </div>
        ) : (
          <div className="live-frame__poster">
            <img src={project.media} alt={`${project.name} interface preview`} />
            <div>
              {protectedFrame ? <ShieldCheck weight="duotone" /> : <MonitorPlay weight="duotone" />}
              <h3>{protectedFrame ? "Protected by the project security policy" : "Designed to run locally"}</h3>
              <p>{protectedFrame ? "Open the real deployment in a new tab." : "Explore the build through the interface evidence and repository."}</p>
              {project.liveUrl && <ExternalLink href={project.liveUrl}>Launch the product <ArrowUpRight /></ExternalLink>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CaseChapter({ number, label, title, paragraphs, media, reverse = false, id }) {
  return (
    <section className={`case-chapter case-chapter--narrative${reverse ? " is-reversed" : ""}`} id={id} data-reveal>
      <div className="case-chapter__heading">
        <span>{number}</span><p>{label}</p><h2>{title}</h2>
      </div>
      <div className="case-chapter__body">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {media && (
        <figure className="case-chapter__media">
          <img src={media} alt="Project interface detail" loading="lazy" data-parallax />
        </figure>
      )}
    </section>
  );
}

function CaseRail() {
  const items = [
    ["01", "#problem", "Context"],
    ["02", "#solution", "Response"],
    ["03", "#decisions", "Decisions"],
    ["04", "#live-experience", "Live system"],
    ["05", "#engineering", "Engineering"],
    ["06", "#proof", "Proof"],
    ["07", "#lessons", "Lessons"],
  ];
  return (
    <nav className="case-rail" aria-label="Case study chapters">
      {items.map(([number, href, label]) => <a href={href} key={href}><span>{number}</span>{label}</a>)}
    </nav>
  );
}

function ProjectPage({ project }) {
  const nextProject = getNextProject(project.slug);
  const reduced = useReducedMotion();
  const root = useRef(null);
  useEditorialReveals(root, reduced, project.slug);

  useEffect(() => {
    document.title = `${project.name} — Yash Ganesh`;
  }, [project.name]);

  return (
    <div ref={root} className={`case-page${project.client ? " case-page--client" : ""}`}>
      <Header />
      <main>
        <section className="case-hero">
          <div className="case-hero__topline">
            <span>{project.number} / {project.category}</span>
            <span>{project.status} / {project.year}</span>
          </div>
          <h1>{project.name}</h1>
          <p className="case-hero__statement">{project.statement}</p>
          <figure className="case-hero__media">
            <img src={project.media} alt={`${project.name} project interface`} data-parallax />
            <figcaption>PRIMARY INTERFACE / VERIFIED BUILD</figcaption>
          </figure>
          <div className="case-hero__summary">
            <p>{project.summary}</p>
            <dl>
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Stack</dt><dd>{project.stack.join(" / ")}</dd></div>
              <div><dt>Evidence</dt><dd>{project.proof.join(" / ")}</dd></div>
            </dl>
          </div>
        </section>

        <div className="case-layout">
          <CaseRail />
          <div className="case-story">
            <CaseChapter number="01" label="Context" title="The problem worth solving." paragraphs={project.problem} media={project.media} id="problem" />
            <CaseChapter number="02" label="Product response" title="The system, not just the screen." paragraphs={project.solution} media={project.media} reverse id="solution" />

            <section className="decision-sequence case-chapter" id="decisions">
              <div className="case-chapter__heading" data-reveal>
                <span>03</span><p>Key decisions</p><h2>Choices that shaped the product.</h2>
              </div>
              <ol>
                {project.decisions.map((decision, index) => (
                  <li key={decision} data-reveal style={{ "--decision-index": index }}>
                    <span>0{index + 1}</span><p>{decision}</p>
                  </li>
                ))}
              </ol>
            </section>

            <LiveExperience project={project} />

            <section className="engineering-section case-chapter" id="engineering" data-reveal>
              <div className="case-chapter__heading">
                <span>05</span><p>Implementation</p><h2>How the product is put together.</h2>
              </div>
              <div className="engineering-ledger">
                {project.engineering.map((item, index) => (
                  <article key={item}><span>0{index + 1}</span><p>{item}</p></article>
                ))}
              </div>
              <div className="technology-line">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </section>

            <section className="proof-section case-chapter" id="proof" data-reveal>
              <div className="case-chapter__heading">
                <span>06</span><p>Verified proof</p><h2>What exists in the build.</h2>
              </div>
              <div className="proof-section__list">
                {project.proof.map((item) => <span key={item}><Check weight="bold" />{item}</span>)}
              </div>
              <div className="proof-section__links">
                {project.liveUrl && <ExternalLink href={project.liveUrl}>Open live <ArrowUpRight /></ExternalLink>}
                <ExternalLink href={project.repoUrl}>View repository <GithubLogo weight="fill" /></ExternalLink>
              </div>
            </section>

            <section className="lessons-section case-chapter" id="lessons" data-reveal>
              <div className="case-chapter__heading">
                <span>07</span><p>Lessons</p><h2>What changed in the way I build.</h2>
              </div>
              <div className="lessons-section__quotes">
                {project.lessons.map((lesson) => <blockquote key={lesson}>{lesson}</blockquote>)}
              </div>
            </section>
          </div>
        </div>

        <section className="next-project">
          <img src={nextProject.media} alt="" loading="lazy" />
          <p>Next case study / {nextProject.number}</p>
          <SiteLink href={`/work/${nextProject.slug}`}>
            <span>{nextProject.name}</span><ArrowRight weight="bold" />
          </SiteLink>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function WorkArchive() {
  useEffect(() => { document.title = "Selected work — Yash Ganesh"; }, []);
  return (
    <div className="archive-page">
      <Header />
      <main>
        <div className="archive-heading">
          <p>Full project index / 2026</p>
          <h1>Work that moved<br />from idea to <em>system.</em></h1>
        </div>
        <div className="archive-list">
          {projects.map((project) => (
            <SiteLink href={`/work/${project.slug}`} key={project.slug}>
              <span>{project.number}</span>
              <h2>{project.name}</h2>
              <p>{project.type}</p>
              <b>{project.category}</b>
              <ArrowUpRight />
              <img src={project.media} alt="" loading="lazy" />
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
      <div id="main-content" key={path} tabIndex={-1}>{route}</div>
    </>
  );
}
