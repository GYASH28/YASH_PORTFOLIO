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
import { ScrollFilm } from "./ScrollFilm.jsx";
import { films } from "./filmData.js";
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

const prologueStorageKey = "ykg-cinematic-prologue-seen-v2";

function CinematicPrologue({ reduced }) {
  const root = useRef(null);
  const video = useRef(null);
  const timers = useRef([]);
  const [visible, setVisible] = useState(() => {
    if (reduced) return false;
    try {
      return window.sessionStorage.getItem(prologueStorageKey) !== "1";
    } catch {
      return true;
    }
  });
  const [ready, setReady] = useState(false);
  const [holding, setHolding] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible || reduced) return undefined;
    const element = root.current;
    const player = video.current;
    if (!element || !player) return undefined;
    const backgroundElements = [
      ...element.parentElement.children,
      document.querySelector(".skip-link"),
    ].filter((node) => node && node !== element);

    document.body.classList.add("is-prologue-locked");
    backgroundElements.forEach((node) => { node.inert = true; });

    const release = () => {
      if (element.dataset.exiting === "true") return;
      element.dataset.exiting = "true";
      try {
        window.sessionStorage.setItem(prologueStorageKey, "1");
      } catch {
        // The sequence still works when storage is unavailable.
      }
      setExiting(true);
      timers.current.push(window.setTimeout(() => setVisible(false), 1150));
    };

    const finish = () => {
      if (element.dataset.finished === "true") return;
      element.dataset.finished = "true";
      setHolding(true);
      timers.current.push(window.setTimeout(release, 780));
    };

    const updateProgress = () => {
      const duration = Number.isFinite(player.duration) ? player.duration : 8;
      element.style.setProperty("--prologue-progress", Math.min(1, player.currentTime / duration).toFixed(4));
    };

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      player.currentTime = Math.max(0, (player.duration || 8) - 0.04);
      player.pause();
      updateProgress();
      finish();
    };
    window.addEventListener("keydown", onKeyDown);
    player.addEventListener("timeupdate", updateProgress);
    player.addEventListener("ended", finish);
    const playPromise = player.play();
    playPromise?.catch(() => setReady(true));

    return () => {
      document.body.classList.remove("is-prologue-locked");
      backgroundElements.forEach((node) => { node.inert = false; });
      window.removeEventListener("keydown", onKeyDown);
      player.removeEventListener("timeupdate", updateProgress);
      player.removeEventListener("ended", finish);
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [reduced, visible]);

  useEffect(() => {
    if (reduced && visible) setVisible(false);
  }, [reduced, visible]);

  if (!visible) return null;

  return (
    <div
      ref={root}
      className={`cinematic-prologue${ready ? " is-ready" : ""}${holding ? " is-holding" : ""}${exiting ? " is-exiting" : ""}`}
      style={{ "--prologue-progress": 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Opening title sequence"
    >
      <video
        ref={video}
        className="cinematic-prologue__video"
        src="/videos/ykg-manga-hero-loop.mp4"
        poster="/images/portraits/yash-hero-noir-suit-v4.webp"
        preload="auto"
        muted
        playsInline
        onCanPlay={() => setReady(true)}
      />
      <div className="cinematic-prologue__grade" aria-hidden="true" />
      <div className="cinematic-prologue__meta">
        <span>YKG / OPENING FILM</span>
        <span>{holding ? "FRAME LOCKED" : "PLAYING ONCE"}</span>
      </div>
      <div className="cinematic-prologue__foot">
        <span>Yash Ganesh / AI systems and product engineering</span>
        <button type="button" onClick={() => {
          const player = video.current;
          if (!player) return;
          player.currentTime = Math.max(0, (player.duration || 8) - 0.04);
          player.pause();
          player.dispatchEvent(new Event("ended"));
        }}>
          Skip intro <span>Esc</span>
        </button>
      </div>
      <div className="cinematic-prologue__progress" aria-hidden="true"><span /></div>
      <div className="cinematic-prologue__match-line" aria-hidden="true" />
    </div>
  );
}

function useSiteMotion(scope, reduced, dependency) {
  useLayoutEffect(() => {
    if (reduced || !scope.current) return undefined;
    const context = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 54, clipPath: "inset(0 0 18% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
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

      if (scope.current.classList.contains("home-page")) {
        gsap.to(".hero-intro__media", {
        yPercent: 7,
        scale: 1.07,
        ease: "none",
        scrollTrigger: { trigger: ".hero-intro", start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(".hero-intro__headline", {
        xPercent: -8,
        yPercent: -12,
        opacity: 0.18,
        ease: "none",
        scrollTrigger: { trigger: ".hero-intro", start: "top top", end: "bottom 15%", scrub: 0.7 },
      });
      gsap.fromTo(".hero-intro__statement", { yPercent: 0 }, {
        yPercent: -18,
        opacity: .18,
        ease: "none",
        scrollTrigger: { trigger: ".hero-intro", start: "35% top", end: "bottom top", scrub: .7 },
      });
      gsap.fromTo(".project-reel__screen", { yPercent: 3, scale: .965 }, {
        yPercent: -2,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: ".project-reel", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.utils.toArray(".cinematic-seam").forEach((seam) => {
        const lines = seam.querySelectorAll("i, b");
        const label = seam.querySelector("span");
        gsap.fromTo(lines, { scaleX: .08, opacity: .22 }, {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: seam, start: "top bottom", end: "bottom 46%", scrub: .8 },
        });
        gsap.fromTo(label, { y: 20, opacity: 0 }, {
          y: -8,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: seam, start: "top 88%", end: "bottom 46%", scrub: .8 },
        });
      });
      gsap.fromTo(".practice-intro__title", { xPercent: -4 }, {
        xPercent: 4,
        ease: "none",
        scrollTrigger: { trigger: ".practice-intro", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(".practice-intro__copy", { yPercent: 12 }, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: ".practice-intro", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(".client-work__media", { clipPath: "inset(12% 8% 12% 8%)", yPercent: 8 }, {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: -4,
        ease: "none",
        scrollTrigger: { trigger: ".client-work", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.utils.toArray(".service-ledger li").forEach((item, index) => {
        gsap.fromTo(item, { x: index % 2 ? 54 : -54, opacity: 0.24 }, {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: item, start: "top 92%", end: "center 62%", scrub: 0.6 },
        });
      });
      gsap.utils.toArray(".process__steps article").forEach((item, index) => {
        const figure = item.querySelector("figure");
        gsap.fromTo(item, { xPercent: index % 2 ? 4 : -4 }, {
          xPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "center center", scrub: 0.7 },
        });
        if (figure) {
          gsap.fromTo(figure, { clipPath: "inset(10% 10% 10% 10%)" }, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: item, start: "top 92%", end: "bottom 58%", scrub: 0.7 },
          });
        }
      });
        gsap.to(".experience-progress__fill", {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { start: 0, end: "max", scrub: 0.35 },
        });
      }
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

function Header({ reduced = false }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef(null);
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

  useLayoutEffect(() => {
    if (reduced) return undefined;
    let currentState = false;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const nextState = self.scroll() > 110 && self.direction === 1 && !open;
        if (nextState === currentState) return;
        currentState = nextState;
        setHidden(nextState);
      },
    });
    return () => trigger.kill();
  }, [open, reduced]);

  return (
    <header
      ref={headerRef}
      className={`site-header${hidden ? " is-hidden" : ""}${open ? " is-menu-open" : ""}`}
      onFocusCapture={() => setHidden(false)}
      onMouseEnter={() => setHidden(false)}
    >
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

function FilmChrome({ index, label, direction = "SCROLL DIRECTS THE FILM" }) {
  return (
    <>
      <div className="film-chrome film-chrome--top">
        <span>YKG / {index}</span>
        <span>{label}</span>
      </div>
      <div className="film-chrome film-chrome--bottom">
        <span>PUNE, INDIA / WORKING GLOBALLY</span>
        <span>{direction}</span>
      </div>
    </>
  );
}

function HeroIntro() {
  return (
    <section className="hero-intro" aria-labelledby="hero-intro-title">
      <div className="hero-intro__media" aria-hidden="true">
        <img src="/images/portraits/yash-hero-noir-suit-v4.webp" alt="" fetchPriority="high" />
      </div>
      <div className="hero-intro__shade" aria-hidden="true" />
      <div className="hero-intro__headline">
        <p><span>Yash Ganesh</span> / Independent AI systems practice</p>
        <h1 id="hero-intro-title"><span>Intelligence,</span><br /><em>made useful.</em></h1>
        <div className="hero-intro__statement">
          <span>I find the operational friction worth solving, then design and build the complete system around it.</span>
          <a href="#work">Selected work <ArrowDown weight="bold" /></a>
        </div>
      </div>
      <div className="hero-intro__action">
        <span>AI strategy / product design / engineering / deployment</span>
        <a href="#identity-film">Scroll to direct the film <ArrowDown weight="bold" /></a>
      </div>
    </section>
  );
}

function CinematicSeam({ tone = "dark", label }) {
  return (
    <div className={`cinematic-seam cinematic-seam--${tone}`} aria-hidden="true">
      <i />
      <span>{label}</span>
      <b />
    </div>
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
      <div className="identity-note identity-note--two">
        <p>A practice built from first principles</p>
        <h2 id="identity-film-title">I built what<br />I couldn&apos;t find.</h2>
        <a href="#work">Follow the evidence <ArrowDown weight="bold" /></a>
      </div>
      <p className="visually-hidden">I built what I could not find.</p>
    </ScrollFilm>
  );
}

function PracticeIntro() {
  return (
    <section className="practice-intro" id="approach" data-motion-section>
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
    if (window.matchMedia("(max-width: 800px)").matches || reduced) {
      setActive(index);
      root.current?.querySelector(".project-reel__screen")?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
      });
      return;
    }
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
          <span>Selected work / verified independent builds</span>
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
              <span>{project.number}</span><b>{project.name}</b><i />
            </button>
          ))}
        </nav>
        <div className="project-reel__screen" aria-live="polite">
          {coreProjects.map((project, index) => (
            <SiteLink
              href={`/work/${project.slug}`}
              className={`project-reel__capture${active === index ? " is-active" : ""}`}
              aria-label={`Open ${project.name} case study`}
              aria-hidden={active !== index}
              tabIndex={active === index ? 0 : -1}
              key={project.slug}
            >
              <img src={project.media} alt={`${project.name} production interface`} loading={index === 0 ? "eager" : "lazy"} />
            </SiteLink>
          ))}
          <div className="project-reel__screen-shade" aria-hidden="true" />
          <div className="project-reel__screen-meta" aria-hidden="true">
            <span>PRODUCTION CAPTURE / 2026</span>
            <span>{coreProjects[active].status} / FRAME {coreProjects[active].number}</span>
          </div>
        </div>
        <div className="project-reel__details">
          {coreProjects.map((project, index) => (
            <article className={`reel-project${active === index ? " is-active" : ""}`} key={project.slug} aria-hidden={active !== index}>
              <div className="reel-project__copy">
                <p>{project.number} / {project.category}</p>
                <h2>{project.name}</h2>
                <h3>{project.statement}</h3>
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
        <div className="project-reel__ghost" aria-hidden="true">{coreProjects[active].number}</div>
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
    <section className="client-work" data-motion-section>
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
    <section className="approach" data-motion-section>
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
    <section className="process" data-motion-section>
      <div className="process__heading" data-reveal>
        <p>03 / How I work</p>
        <h2>Clarity first.<br />Build precisely.</h2>
        <span>A focused process from problem to impact.</span>
      </div>
      <div className="process__steps">
        {steps.map(([number, title, copy, image]) => (
          <article key={title} data-reveal>
            <figure><img src={image} alt={`Visual for the ${title.toLowerCase()} phase`} loading="lazy" data-parallax /></figure>
            <span>{number}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer({ reduced }) {
  const media = useRef(null);

  useEffect(() => {
    const player = media.current;
    if (!player || reduced) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) player.play().catch(() => {});
      else player.pause();
    }, { rootMargin: "20% 0px", threshold: 0.08 });
    observer.observe(player);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <footer className="loop-finale site-footer site-footer--film" id="contact" aria-labelledby="finale-film-title" data-motion-section>
      {reduced ? (
        <img className="loop-finale__media" src={films.finale.poster} alt="" />
      ) : (
        <video
          ref={media}
          className="loop-finale__media"
          src={films.finale.source}
          poster={films.finale.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}
      <div className="loop-finale__shade" aria-hidden="true" />
      <FilmChrome index="FILM 003" label="LIVING SYSTEMS" direction="AMBIENT LOOP / ALWAYS IN MOTION" />
      <div className="finale-copy" data-reveal>
        <p>Useful AI systems, designed and implemented end to end.</p>
        <h2 id="finale-film-title">Build<br />what<br />matters<span>.</span></h2>
      </div>
      <div className="finale-action" data-reveal>
        <span>Have a difficult workflow worth fixing?</span>
        <a href={contactHref}>Start a project <ArrowUpRight weight="bold" /></a>
      </div>
      <div className="site-footer__contact-rail">
        <a href="mailto:yashganesh.work@gmail.com">yashganesh.work@gmail.com</a>
        <ExternalLink href="https://github.com/GYASH28">GitHub <ArrowUpRight /></ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/yash-ganesh-/">LinkedIn <ArrowUpRight /></ExternalLink>
      </div>
      <div className="site-footer__meta site-footer__meta--film">
        <span>Available for focused projects</span>
        <span>Pune, India / Working globally</span>
        <span>© 2026 Yash Ganesh</span>
      </div>
      <div className="loop-finale__orbit" aria-hidden="true"><i /><i /><i /></div>
    </footer>
  );
}

function ExperienceProgress() {
  return (
    <div className="experience-progress" aria-hidden="true">
      <span>YKG / INDEX</span>
      <i><b className="experience-progress__fill" /></i>
      <span>END</span>
    </div>
  );
}

function HomePage() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useSiteMotion(root, reduced, "home");

  useEffect(() => {
    document.title = "Yash Ganesh — AI Systems, Made Useful";
  }, []);

  return (
    <div ref={root} className="home-page">
      <CinematicPrologue reduced={reduced} />
      <ExperienceProgress />
      <Header reduced={reduced} />
      <main>
        <HeroIntro />
        <div id="identity-film"><IdentityFilm reduced={reduced} /></div>
        <CinematicSeam label="FROM SIGNAL TO PRACTICE" />
        <PracticeIntro />
        <ProjectReel />
        <CinematicSeam tone="paper" label="INDEPENDENT WORK / CLIENT WORK" />
        <ClientWork />
        <CinematicSeam tone="ink" label="CLIENT WORK / OPERATING SYSTEM" />
        <Approach />
        <Process />
      </main>
      <div id="about"><Footer reduced={reduced} /></div>
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
  useSiteMotion(root, reduced, project.slug);

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
