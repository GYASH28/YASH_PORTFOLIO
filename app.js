(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = matchMedia('(pointer: coarse)').matches;

  const projects = [
    {
      number: '01',
      name: 'LERNIO AI',
      kind: 'AI LEARNING OPERATING SYSTEM',
      summary: 'A complete student experience where AI supports lessons, tutoring, quizzes, revision and planning—not merely a chat box.',
      detail: 'Lernio brings structured learning material, an AI tutor, practice systems, flashcards, analytics and planning into one practical learning workflow for diploma engineering students.',
      tags: ['AI TUTOR', '241 LESSONS', 'LIVE PRODUCT'],
      proof: ['44 subjects', '241 structured lessons', 'AI tutor and quizzes', 'Live production deployment'],
      image: 'https://image.thum.io/get/width/1440/crop/900/noanimate/https://lernioai.vercel.app',
      fallback: 'https://opengraph.githubassets.com/yash-portfolio-lernio/GYASH28/LERNIOAI',
      browser: 'lernio.ai / learning operating system',
      live: 'https://lernioai.vercel.app',
      repo: 'https://github.com/GYASH28/LERNIOAI'
    },
    {
      number: '02',
      name: 'B.R.A.C.E',
      kind: 'PERMISSIONED DESKTOP AI COMPANION',
      summary: 'A Jarvis-inspired desktop assistant built around voice, memory, visible tools and explicit user approval.',
      detail: 'B.R.A.C.E combines a desktop interface, fast and reasoning model routing, persistent context, voice states and permission gates around file, terminal and browser actions.',
      tags: ['LOCAL-FIRST', 'VOICE STATES', 'TOOL APPROVALS'],
      proof: ['Electron desktop app', 'Persistent memory', 'Voice interaction states', 'Permissioned tool execution'],
      image: 'https://image.thum.io/get/width/1440/crop/900/noanimate/https://github.com/GYASH28/brace_new',
      fallback: 'https://opengraph.githubassets.com/yash-portfolio-brace/GYASH28/brace_new',
      browser: 'brace.local / permissioned agent',
      live: '',
      repo: 'https://github.com/GYASH28/brace_new'
    },
    {
      number: '03',
      name: 'CAMPUSMATE',
      kind: 'MULTI-ROLE CAMPUS PLATFORM',
      summary: 'A role-aware operations layer for students, teachers, coordinators, HODs and administrators.',
      detail: 'CampusMate organizes attendance, notices, timetables, assignments, notes, exams, QR workflows and analytics around the real responsibilities of each campus role.',
      tags: ['5 USER ROLES', 'QR ATTENDANCE', 'PWA'],
      proof: ['Five distinct user roles', 'QR attendance workflows', 'Responsive PWA behavior', 'Live deployment'],
      image: 'https://image.thum.io/get/width/1440/crop/900/noanimate/https://campuscwit.vercel.app',
      fallback: 'https://opengraph.githubassets.com/yash-portfolio-campus/GYASH28/CAMPUSMATE',
      browser: 'campusmate / connected campus operations',
      live: 'https://campuscwit.vercel.app',
      repo: 'https://github.com/GYASH28/CAMPUSMATE'
    },
    {
      number: '04',
      name: 'FAKHRI MART',
      kind: 'WHOLESALE CATALOGUE EXPERIENCE',
      summary: 'A premium digital storefront helping a traditional wholesale business present products and turn interest into enquiries.',
      detail: 'The experience combines cinematic brand storytelling, product discovery, catalogue navigation, mobile-first interactions and direct WhatsApp enquiry flows.',
      tags: ['CLIENT BUILD', 'CATALOGUE', 'WHATSAPP FLOW'],
      proof: ['Real client project', 'Product discovery system', 'WhatsApp enquiry flow', 'Responsive interaction design'],
      image: 'https://image.thum.io/get/width/1440/crop/900/noanimate/https://fakhriyarns.vercel.app',
      fallback: 'https://opengraph.githubassets.com/yash-portfolio-fakhri/GYASH28/sample-website',
      browser: 'fakhri mart / yarn catalogue experience',
      live: 'https://fakhriyarns.vercel.app',
      repo: 'https://github.com/GYASH28/sample-website'
    },
    {
      number: '05',
      name: 'INTERACTIVE QUIZ',
      kind: 'FOCUSED BROWSER EXPERIENCE',
      summary: 'A compact learning tool built with the simplest stack the problem required.',
      detail: 'A responsive browser quiz with dynamic questions, immediate scoring and clear feedback—built without framework overhead.',
      tags: ['ZERO FRAMEWORK', 'INSTANT SCORING', 'RESPONSIVE'],
      proof: ['Plain HTML, CSS and JS', 'Immediate feedback', 'Responsive layout', 'GitHub Pages deployment'],
      image: 'https://image.thum.io/get/width/1440/crop/900/noanimate/https://gyash28.github.io/WD_practical_no_20/',
      fallback: 'https://opengraph.githubassets.com/yash-portfolio-quiz/GYASH28/WD_practical_no_20',
      browser: 'interactive quiz / focused learning utility',
      live: 'https://gyash28.github.io/WD_practical_no_20/',
      repo: 'https://github.com/GYASH28/WD_practical_no_20'
    },
    {
      number: '06',
      name: 'CINEMATIC PORTFOLIO',
      kind: 'MOTION-LED PERSONAL EXPERIENCE',
      summary: 'An expressive portfolio where interaction, storytelling and frontend engineering share the frame.',
      detail: 'A personal experience designed around cinematic reveals, scroll choreography, responsive motion, product storytelling and tactile interface details.',
      tags: ['SCROLL NARRATIVE', 'MOTION SYSTEM', 'INTERACTIVE'],
      proof: ['Scroll-driven scenes', 'Custom interaction language', 'Responsive motion', 'Original visual system'],
      image: 'https://image.thum.io/get/width/1440/crop/900/noanimate/https://github.com/GYASH28/YASH_PORTFOLIO',
      fallback: 'https://opengraph.githubassets.com/yash-portfolio-cinematic/GYASH28/YASH_PORTFOLIO',
      browser: 'yash ganesh / interactive portfolio',
      live: '',
      repo: 'https://github.com/GYASH28/YASH_PORTFOLIO'
    }
  ];

  const services = [
    {
      label: 'PRODUCT SYSTEMS',
      title: 'Turn a broad idea into a product people can actually use.',
      copy: 'Define the user, core loop, interface architecture and smallest shippable system before the build becomes bloated.',
      tags: ['PRODUCT SCOPE', 'UX ARCHITECTURE', 'PROTOTYPE', 'LAUNCH PLAN']
    },
    {
      label: 'CREATIVE FRONTEND',
      title: 'Build an interface that feels authored, not assembled.',
      copy: 'Create responsive visual systems, motion choreography and interaction details that give the product a distinct personality without sacrificing clarity.',
      tags: ['ART DIRECTION', 'MOTION SYSTEM', 'RESPONSIVE UI', 'PERFORMANCE']
    },
    {
      label: 'APPLIED AI',
      title: 'Use AI where it changes the product—not where it decorates the pitch.',
      copy: 'Design model roles, tool access, memory, approvals and fallbacks around a real user workflow so intelligence becomes useful and trustworthy.',
      tags: ['MODEL ROUTING', 'AGENT FLOWS', 'HUMAN CONTROL', 'EVALUATION']
    },
    {
      label: 'WORKFLOW DESIGN',
      title: 'Connect the people, information and tools already doing the work.',
      copy: 'Map the current process, remove repetitive friction and build a visible operating loop around the systems the team already depends on.',
      tags: ['WORKFLOW AUDIT', 'AUTOMATION', 'DASHBOARD', 'HANDOFFS']
    }
  ];

  // Opening sequence
  const intro = $('#intro');
  const introLine = $('.intro-line i');
  const introEnter = $('.intro-enter');
  const introSkip = $('.intro-skip');
  const introWords = $$('.intro-words span');
  const introCount = $('#intro-count');
  const introClock = $('#intro-clock');
  let introDone = false;
  let introProgress = 0;
  let introStart = performance.now();
  let introClockTimer = 0;

  function completeIntro() {
    if (introDone) return;
    introDone = true;
    intro.classList.add('is-gone');
    document.body.classList.remove('is-loading');
    if (introClockTimer) clearInterval(introClockTimer);
    setTimeout(() => intro.setAttribute('aria-hidden', 'true'), 1100);
  }

  if (prefersReduced) {
    completeIntro();
  } else {
    const tickIntro = (now) => {
      if (introDone) return;
      const elapsed = now - introStart;
      introProgress = clamp(elapsed / 3200, 0, 1);
      const count = Math.round(introProgress * 100);
      introCount.textContent = String(count).padStart(2, '0');
      introLine.style.transform = `scaleX(${introProgress})`;
      const wordIndex = Math.min(introWords.length - 1, Math.floor(introProgress * introWords.length));
      introWords.forEach((word, index) => word.classList.toggle('is-active', index === wordIndex));
      if (introProgress >= .82) introEnter.classList.add('is-ready');
      if (introProgress < 1) requestAnimationFrame(tickIntro);
    };
    requestAnimationFrame(tickIntro);
  }

  if (new URLSearchParams(location.search).has('skip')) completeIntro();

  introEnter?.addEventListener('click', completeIntro);
  introSkip?.addEventListener('click', completeIntro);
  if (introClock && !introDone) {
    introClock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
    introClockTimer = window.setInterval(() => {
      introClock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }, 1000);
  }

  // Canvas particles for intro
  function setupIntroCanvas() {
    const canvas = $('#intro-canvas');
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = innerWidth;
      height = innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: Math.min(130, Math.floor(width / 10)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.8 + .3,
        hue: Math.random() > .78 ? 24 : 205
      }));
    };
    const draw = () => {
      if (introDone) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 68%, .55)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100,180,235,${(1 - dist / 130) * .12})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };
    addEventListener('resize', resize);
    resize();
    draw();
  }
  setupIntroCanvas();

  // Ambient canvas — capped at 30fps and paused when the tab is hidden.
  function setupAmbientCanvas() {
    const canvas = $('#ambient-canvas');
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let mouseX = innerWidth * .5;
    let mouseY = innerHeight * .5;
    let targetX = mouseX;
    let targetY = mouseY;
    let scrollValue = 0;
    let points = [];
    let running = false;
    let frameId = 0;
    let previousFrame = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, isCoarse ? 1.25 : 1.6);
      width = innerWidth;
      height = innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pointLimit = isCoarse ? 30 : 58;
      points = Array.from({ length: Math.min(pointLimit, Math.floor(width / 22)) }, (_, index) => ({
        angle: (index / Math.max(1, pointLimit)) * Math.PI * 2,
        radius: 80 + Math.random() * Math.min(width, height) * .48,
        speed: (Math.random() * .0007 + .0002) * (Math.random() > .5 ? 1 : -1),
        size: Math.random() * 1.4 + .2,
        offset: Math.random() * Math.PI * 2
      }));
    };

    addEventListener('pointermove', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    }, { passive: true });
    addEventListener('scroll', () => { scrollValue = scrollY; }, { passive: true });
    addEventListener('resize', resize, { passive: true });

    const render = (time) => {
      if (!running) return;
      frameId = requestAnimationFrame(render);
      if (time - previousFrame < 33) return;
      previousFrame = time;
      mouseX = lerp(mouseX, targetX, .055);
      mouseY = lerp(mouseY, targetY, .055);
      ctx.clearRect(0, 0, width, height);
      const centerX = width * .52 + (mouseX - width * .5) * .035;
      const centerY = height * .5 + (mouseY - height * .5) * .035 - (scrollValue % Math.max(1, height)) * .02;
      points.forEach((point, index) => {
        const angle = point.angle + time * point.speed;
        const x = centerX + Math.cos(angle) * point.radius;
        const y = centerY + Math.sin(angle * 1.15 + point.offset) * point.radius * .42;
        ctx.beginPath();
        ctx.fillStyle = index % 9 === 0 ? 'rgba(255,122,38,.55)' : 'rgba(80,170,230,.28)';
        ctx.arc(x, y, point.size, 0, Math.PI * 2);
        ctx.fill();
        if (!isCoarse && index % 5 === 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(80,160,220,.045)';
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      frameId = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
    resize();
    start();
  }
  setupAmbientCanvas();

  // Cursor and magnetic interactions
  const cursor = $('.cursor');
  const cursorDot = $('.cursor-dot');
  const cursorRing = $('.cursor-ring');
  const cursorLabel = $('.cursor-ring b');
  let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  let dot = { x: mouse.x, y: mouse.y };
  let ring = { x: mouse.x, y: mouse.y };
  let cursorFrameId = 0;
  let cursorRunning = false;

  if (!isCoarse && cursor && cursorDot && cursorRing) {
    const cursorFrame = () => {
      dot.x = lerp(dot.x, mouse.x, .5);
      dot.y = lerp(dot.y, mouse.y, .5);
      ring.x = lerp(ring.x, mouse.x, .14);
      ring.y = lerp(ring.y, mouse.y, .14);
      cursorDot.style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%,-50%)`;
      cursorRing.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%,-50%)`;
      const settled = Math.abs(ring.x - mouse.x) < .08 && Math.abs(ring.y - mouse.y) < .08;
      if (settled) {
        cursorRunning = false;
        cursorFrameId = 0;
        return;
      }
      cursorFrameId = requestAnimationFrame(cursorFrame);
    };
    const wakeCursor = () => {
      if (cursorRunning || document.hidden) return;
      cursorRunning = true;
      cursorFrameId = requestAnimationFrame(cursorFrame);
    };

    addEventListener('pointermove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      cursor.classList.remove('is-hidden');
      wakeCursor();
    }, { passive: true });
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(cursorFrameId);
        cursorRunning = false;
      } else {
        wakeCursor();
      }
    });

    $$('[data-cursor], a, button').forEach((element) => {
      element.addEventListener('mouseenter', () => {
        const label = element.dataset.cursor || (element.tagName === 'A' ? 'OPEN' : 'SELECT');
        cursorLabel.textContent = label;
        cursor.classList.add('is-active');
      });
      element.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    });

    $$('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${x * .13}px, ${y * .13}px)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transition = 'transform .55s cubic-bezier(.16,1,.3,1)';
        element.style.transform = '';
        setTimeout(() => { element.style.transition = ''; }, 580);
      });
    });
  }

  // Header + mobile menu
  const header = $('.site-header');
  const menuButton = $('.menu-toggle');
  const mobileMenu = $('.mobile-menu');
  let lastScroll = 0;
  function updateHeader() {
    const current = scrollY;
    header.classList.toggle('is-solid', current > 40);
    header.classList.toggle('is-hidden', current > lastScroll && current > 220 && !document.body.classList.contains('menu-open'));
    lastScroll = Math.max(0, current);
  }

  menuButton.addEventListener('click', () => {
    const open = !menuButton.classList.contains('is-open');
    menuButton.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.toggleAttribute('inert', !open);
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open);
    if (open) mobileMenu.querySelector('a')?.focus();
  });
  $$('.mobile-menu a').forEach((link) => link.addEventListener('click', () => {
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('inert', '');
    document.body.classList.remove('menu-open');
  }));

  // Hero entrance and parallax
  const heroLines = $$('.hero-line b');
  heroLines.forEach((line, index) => {
    line.style.transform = 'translateY(115%)';
    line.style.transition = `transform 1.15s cubic-bezier(.16,1,.3,1) ${.25 + index * .12}s`;
  });
  setTimeout(() => heroLines.forEach((line) => line.style.transform = 'translateY(0)'), prefersReduced ? 0 : 650);

  const heroShell = $('.hero-image-shell');
  const heroVisual = $('.hero-visual');
  const heroSection = $('#hero');
  const heroCopy = $('.hero-copy');

  // Reveals and counters
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      if (entry.target.matches('.statement-facts')) {
        $$('[data-count]', entry.target).forEach((el) => animateCount(el));
      }
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .14 });
  $$('.reveal, .split-reveal, .statement-facts').forEach((element) => revealObserver.observe(element));

  function animateCount(element) {
    const target = Number(element.dataset.count);
    const start = performance.now();
    const duration = 1100;
    const loop = (now) => {
      const progress = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // Scroll progress and hero motion
  const scrollProgress = $('.scroll-progress i');
  function updateScrollProgressAndHero() {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollProgress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (!prefersReduced && heroVisual && heroSection) {
      const heroRect = heroSection.getBoundingClientRect();
      if (heroRect.bottom > 0 && heroRect.top < innerHeight) {
        const progress = clamp(-heroRect.top / innerHeight, 0, 1);
        heroVisual.style.transform = `translate3d(0,${progress * 90}px,0) scale(${1 - progress * .05})`;
        heroCopy.style.transform = `translate3d(0,${progress * 45}px,0)`;
      }
    }
  }

  // Project story
  const projectStory = $('#project-story');
  const projectImages = $$('.project-image');
  const projectNavButtons = $$('.project-nav button');
  const currentEl = $('#project-current');
  const kindEl = $('#project-kind');
  const titleEl = $('#project-title');
  const summaryEl = $('#project-summary');
  const tagsEl = $('#project-tags');
  const browserLabel = $('#browser-label');
  const projectProgress = $('.project-progress i');
  const projectScreen = $('.project-screen');
  let activeProject = 0;
  let projectSwapTimer = 0;

  const installImageFallback = (image) => {
    if (!image) return;
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;
      if (fallback && image.src !== fallback) {
        image.src = fallback;
        image.removeAttribute('data-fallback');
      }
    });
  };
  projectImages.forEach(installImageFallback);
  installImageFallback($('#case-image'));

  function setProject(index, fromScroll = false) {
    index = clamp(index, 0, projects.length - 1);
    if (index === activeProject && fromScroll) return;
    activeProject = index;
    const project = projects[index];
    projectImages.forEach((image, i) => image.classList.toggle('is-active', i === index));
    projectNavButtons.forEach((button, i) => {
      const selected = i === index;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const animateText = [currentEl, kindEl, titleEl, summaryEl, tagsEl];
    animateText.forEach((element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(12px)';
    });
    clearTimeout(projectSwapTimer);
    projectSwapTimer = window.setTimeout(() => {
      currentEl.textContent = project.number;
      kindEl.textContent = project.kind;
      titleEl.textContent = project.name;
      summaryEl.textContent = project.summary;
      tagsEl.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
      browserLabel.textContent = project.browser;
      animateText.forEach((element, i) => {
        element.style.transition = `opacity .45s ${i * .035}s, transform .55s cubic-bezier(.16,1,.3,1) ${i * .035}s`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }, 180);
  }

  projectNavButtons.forEach((button, index) => {
    button.addEventListener('click', () => setProject(Number(button.dataset.project)));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? projectNavButtons.length - 1 :
        (index + (event.key === 'ArrowRight' ? 1 : -1) + projectNavButtons.length) % projectNavButtons.length;
      setProject(next);
      projectNavButtons[next].focus();
    });
  });

  function updateProjectScroll() {
    if (innerWidth < 900) {
      if (projectScreen) projectScreen.style.transform = '';
      return;
    }
    const rect = projectStory.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const travel = Math.max(1, projectStory.offsetHeight - innerHeight);
    const progress = clamp(-rect.top / travel, 0, 1);
    projectProgress.style.transform = `scaleX(${progress})`;
    const index = Math.min(projects.length - 1, Math.floor(progress * projects.length));
    setProject(index, true);
    const tilt = (progress - .5) * 2;
    projectScreen.style.transform = `rotateY(${4 - tilt * 2}deg) rotateX(${1 + Math.sin(progress * Math.PI) * 1.5}deg)`;
  }

  // Case modal
  const caseModal = $('.case-modal');
  const casePanel = $('.case-panel');
  const caseClose = $('.case-close');
  let caseReturnFocus = null;
  function openCase() {
    const project = projects[activeProject];
    $('#case-number').textContent = `${project.number} / CASE FILE`;
    $('#case-kind').textContent = project.kind;
    $('#case-title').textContent = project.name;
    $('#case-detail').textContent = project.detail;
    const caseImage = $('#case-image');
    caseImage.dataset.fallback = project.fallback;
    caseImage.src = project.image;
    caseImage.alt = `${project.name} interface`;
    $('#case-proof').innerHTML = project.proof.map((item) => `<span>✓ ${item}</span>`).join('');
    const live = $('#case-live');
    live.hidden = !project.live;
    live.href = project.live || '#';
    $('#case-repo').href = project.repo;
    caseReturnFocus = document.activeElement;
    caseModal.removeAttribute('inert');
    caseModal.classList.add('is-open');
    caseModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    casePanel.scrollTop = 0;
    requestAnimationFrame(() => caseClose.focus());
  }
  function closeCase() {
    if (!caseModal.classList.contains('is-open')) return;
    caseModal.classList.remove('is-open');
    caseModal.setAttribute('aria-hidden', 'true');
    caseModal.setAttribute('inert', '');
    document.body.classList.remove('modal-open');
    caseReturnFocus?.focus?.();
  }
  $('.case-open').addEventListener('click', openCase);
  projectScreen.addEventListener('click', openCase);
  projectScreen.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCase();
    }
  });
  caseClose.addEventListener('click', closeCase);
  $('.case-backdrop').addEventListener('click', closeCase);
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (caseModal.classList.contains('is-open')) closeCase();
      if (menuButton.classList.contains('is-open')) {
        menuButton.click();
        menuButton.focus();
      }
    }
    if (event.key === 'Tab' && caseModal.classList.contains('is-open')) {
      const focusable = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', casePanel)
        .filter((element) => !element.hidden);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Service lab and workflow canvas
  const serviceTabs = $$('.service-tab');
  let activeService = 0;
  let serviceSwapTimer = 0;
  function setService(index) {
    activeService = index;
    const service = services[index];
    serviceTabs.forEach((tab, i) => {
      const selected = i === index;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    const elements = [$('#service-label'), $('#service-title'), $('#service-copy'), $('#service-tags')];
    elements.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; });
    clearTimeout(serviceSwapTimer);
    serviceSwapTimer = window.setTimeout(() => {
      $('#service-label').textContent = service.label;
      $('#service-title').textContent = service.title;
      $('#service-copy').textContent = service.copy;
      $('#service-tags').innerHTML = service.tags.map((tag) => `<span>${tag}</span>`).join('');
      elements.forEach((el, i) => {
        el.style.transition = `opacity .4s ${i * .04}s, transform .5s ${i * .04}s`;
        el.style.opacity = '1'; el.style.transform = '';
      });
    }, 150);
  }
  serviceTabs.forEach((tab, index) => {
    tab.addEventListener('mouseenter', () => { if (!isCoarse) setService(index); });
    tab.addEventListener('click', () => setService(index));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? serviceTabs.length - 1 :
        (index + (event.key === 'ArrowDown' ? 1 : -1) + serviceTabs.length) % serviceTabs.length;
      setService(next);
      serviceTabs[next].focus();
    });
  });

  function setupWorkflowCanvas() {
    const canvas = $('#workflow-canvas');
    const output = $('.service-output');
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !output || !ctx) return;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = false;
    let running = false;
    let frameId = 0;
    let previousFrame = 0;

    const resize = () => {
      const rect = output.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(devicePixelRatio || 1, isCoarse ? 1.25 : 1.6);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const paint = (time = 0) => {
      ctx.clearRect(0, 0, w, h);
      const nodes = [
        { x: w * .18, y: h * .82 },
        { x: w * .48, y: h * .72 },
        { x: w * .76, y: h * .56 },
        { x: w * .90, y: h * .84 }
      ];
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length - 1; i++) {
        const a = nodes[i], b = nodes[i + 1];
        ctx.beginPath();
        ctx.strokeStyle = i === 1 ? 'rgba(255,122,38,.55)' : 'rgba(57,167,255,.42)';
        ctx.setLineDash([6, 10]);
        ctx.lineDashOffset = -(time * .03 + activeService * 12);
        ctx.moveTo(a.x, a.y);
        const midX = (a.x + b.x) / 2;
        ctx.bezierCurveTo(midX, a.y, midX, b.y, b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      nodes.forEach((node, i) => {
        const pulse = prefersReduced ? 4 : 4 + Math.sin(time * .002 + i) * 2;
        ctx.beginPath();
        ctx.fillStyle = i === 1 ? 'rgba(255,122,38,.55)' : 'rgba(57,167,255,.4)';
        ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    const draw = (time) => {
      if (!running) return;
      frameId = requestAnimationFrame(draw);
      if (time - previousFrame < 33) return;
      previousFrame = time;
      paint(time);
    };
    const syncAnimation = () => {
      const shouldRun = visible && !document.hidden && !prefersReduced;
      if (shouldRun && !running) {
        running = true;
        frameId = requestAnimationFrame(draw);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frameId);
      }
      if (!shouldRun) paint(performance.now());
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    }, { rootMargin: '120px' });
    observer.observe(output);
    addEventListener('resize', () => { resize(); paint(performance.now()); }, { passive: true });
    document.addEventListener('visibilitychange', syncAnimation);
    resize();
    paint();
  }
  setupWorkflowCanvas();

  // Process scroll
  const processSection = $('#process');
  const processSteps = $$('.process-step');
  const processCoreLabel = $('#process-core-label');
  const processWorld = $('.process-world');
  function updateProcess() {
    if (innerWidth < 900) return;
    const rect = processSection.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const travel = Math.max(1, processSection.offsetHeight - innerHeight);
    const progress = clamp(-rect.top / travel, 0, 1);
    const index = Math.min(processSteps.length - 1, Math.floor(progress * processSteps.length));
    processSteps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    processCoreLabel.textContent = processSteps[index].dataset.process;
    processWorld.style.transform = `translate(-50%,-50%) rotate(${progress * 42}deg) scale(${.92 + Math.sin(progress * Math.PI) * .12})`;
  }

  // Copy email
  $('.copy-email').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText('yash.k.ganesh@gmail.com');
      const previous = button.textContent;
      button.textContent = 'EMAIL COPIED ✓';
      setTimeout(() => button.textContent = previous, 1800);
    } catch {
      location.href = 'mailto:yash.k.ganesh@gmail.com';
    }
  });

  // Smooth anchor navigation while respecting reduced motion
  $$('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }));

  // Cinematic capability sequence
  const cinema = $('#cinema');
  const cinemaSticky = $('.cinema-sticky');
  const cinemaOrbit = $('.cinema-orbit');
  const cinemaCore = $('.cinema-core');
  const cinemaScenes = $$('.cinema-scenes article');
  const cinemaMeter = $('.cinema-meter i b');
  const cinemaCount = $('#cinema-count');
  const cinemaCopy = $('.cinema-copy');
  function updateCinema(){
    if(!cinema) return;
    const rect=cinema.getBoundingClientRect();
    if(rect.bottom<0 || rect.top>innerHeight) return;
    const travel=Math.max(1,cinema.offsetHeight-innerHeight);
    const p=clamp(-rect.top/travel,0,1);
    const scene=Math.min(cinemaScenes.length-1,Math.floor(p*cinemaScenes.length));
    cinemaScenes.forEach((el,i)=>el.classList.toggle('is-active',i===scene));
    cinemaMeter.style.transform=`scaleX(${p})`;
    cinemaCount.textContent=String(scene+1).padStart(2,'0');
    cinemaOrbit.style.transform=`translate(-50%,-50%) rotate(${p*160}deg) scale(${.86+Math.sin(p*Math.PI)*.16})`;
    cinemaCore.style.transform=`rotate(${45-p*110}deg) scale(${.88+Math.sin(p*Math.PI*2)*.08})`;
    const y=50+Math.sin(p*Math.PI*2)*18;
    cinemaSticky.style.setProperty('--cy',`${y}%`);
    cinemaCopy.style.transform=`translate3d(0,${p* -55}px,0)`;
  }

  // High-craft pointer lighting + image tilt
  const heroShellV2=$('.hero-image-shell');
  heroShellV2?.addEventListener('pointermove',(event)=>{
    if (isCoarse || prefersReduced) return;
    const r=heroShellV2.getBoundingClientRect();
    const x=(event.clientX-r.left)/r.width;
    const y=(event.clientY-r.top)/r.height;
    heroShellV2.style.setProperty('--spot-x',`${x*100}%`);
    heroShellV2.style.setProperty('--spot-y',`${y*100}%`);
    heroShellV2.style.transform=`rotateY(${(x-.5)*9}deg) rotateX(${(y-.5)*-7}deg) translateZ(0)`;
  });
  heroShellV2?.addEventListener('pointerleave',()=>{ heroShellV2.style.transform=''; });

  // Project screen follows the cursor for a physical, cinematic feel
  projectScreen?.addEventListener('pointermove',(event)=>{
    if(isCoarse) return;
    const r=projectScreen.getBoundingClientRect();
    const x=(event.clientX-r.left)/r.width-.5;
    const y=(event.clientY-r.top)/r.height-.5;
    projectScreen.style.transform=`rotateY(${x*8}deg) rotateX(${y*-6}deg) translateZ(12px)`;
  });
  projectScreen?.addEventListener('pointerleave',()=>updateProjectScroll());

  // Scroll velocity adds subtle cinematic distortion only while scrolling.
  let previousY = scrollY;
  let velocity = 0;
  const velocityTargets = $$('.split-reveal, .contact-title');
  const kineticStrip = $('.kinetic-strip div');
  function updateVelocity() {
    const next = scrollY;
    velocity = lerp(velocity, next - previousY, .24);
    previousY = next;
    const skew = clamp(velocity * -.045, -4, 4);
    velocityTargets.forEach((element) => element.style.setProperty('--scroll-skew', `${skew}deg`));
    if (kineticStrip) {
      kineticStrip.style.transform = `translateX(${-(scrollY * .08) % 45}px) skewX(${clamp(velocity * .03, -3, 3)}deg)`;
    }
  }

  // One rAF-throttled scroll pipeline avoids repeated layout work across listeners.
  let scrollFrameId = 0;
  function updateScrollEffects() {
    scrollFrameId = 0;
    updateHeader();
    updateScrollProgressAndHero();
    updateProjectScroll();
    updateProcess();
    updateCinema();
    updateVelocity();
  }
  function scheduleScrollEffects() {
    if (!scrollFrameId) scrollFrameId = requestAnimationFrame(updateScrollEffects);
  }
  addEventListener('scroll', scheduleScrollEffects, { passive: true });
  addEventListener('resize', scheduleScrollEffects, { passive: true });
  updateScrollEffects();


  // Editorial motion layer: subtle, performance-friendly details for the redesigned sections.
  const heroReel = $('.hero-skill-reel div');
  const aboutReel = $('.about-marquee div');
  const contactOrb = $('.contact-orb');
  const principles = $$('.principles-grid article');

  principles.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (isCoarse || prefersReduced) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateY(-4px)`;
      card.style.setProperty('--card-x', `${(x + .5) * 100}%`);
      card.style.setProperty('--card-y', `${(y + .5) * 100}%`);
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  function updateEditorialMotion() {
    if (heroReel) heroReel.style.transform = `translate3d(${-(scrollY * .14) % 900}px,0,0)`;
    if (aboutReel) aboutReel.style.transform = `translate3d(${-(scrollY * .08) % 700}px,0,0)`;
    if (contactOrb && !prefersReduced) {
      const contactRect = $('#contact').getBoundingClientRect();
      const p = clamp(1 - contactRect.top / innerHeight, 0, 1);
      contactOrb.style.transform = `translate3d(0,${(1 - p) * 80}px,0) rotate(${p * 24}deg) scale(${.84 + p * .16})`;
    }
  }
  let editorialFrameId = 0;
  function scheduleEditorialMotion() {
    if (editorialFrameId) return;
    editorialFrameId = requestAnimationFrame(() => {
      editorialFrameId = 0;
      updateEditorialMotion();
    });
  }
  addEventListener('scroll', scheduleEditorialMotion, { passive: true });
  addEventListener('resize', scheduleEditorialMotion, { passive: true });
  updateEditorialMotion();

})();
