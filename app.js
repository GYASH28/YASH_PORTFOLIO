(() => {
  'use strict';
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasST = typeof window.ScrollTrigger !== 'undefined';
  const session = {
    get(key) { try { return window.sessionStorage?.getItem(key) || null; } catch (_) { return null; } },
    set(key, value) { try { window.sessionStorage?.setItem(key, value); } catch (_) {} }
  };

  // Opening: short, purposeful, once per tab session.
  const boot = $('#boot');
  const bootSkip = $('#bootSkip');
  const dismissBoot = () => {
    if (!boot || boot.dataset.done) return;
    boot.dataset.done = '1';
    document.body.classList.remove('is-locked');
    session.set('ykg-v3-intro-seen', '1');
    if (hasGSAP && !reduceMotion) {
      gsap.to(boot, { yPercent: -100, duration: .72, ease: 'power4.inOut', onComplete: () => boot.remove() });
    } else {
      boot.remove();
    }
  };

  if (boot) {
    if (reduceMotion || session.get('ykg-v3-intro-seen')) {
      boot.remove();
    } else {
      document.body.classList.add('is-locked');
      bootSkip?.addEventListener('click', dismissBoot);
      if (hasGSAP) {
        const steps = $$('.boot-step');
        const tl = gsap.timeline({ onComplete: () => setTimeout(dismissBoot, 180) });
        tl.to('.boot-line span', { width: '100%', duration: 1.55, ease: 'none' }, 0)
          .to(steps[0], { className: 'boot-step is-live', duration: .01 }, .06)
          .to(steps[0], { className: 'boot-step', duration: .01 }, .47)
          .to(steps[1], { className: 'boot-step is-live', duration: .01 }, .47)
          .to(steps[1], { className: 'boot-step', duration: .01 }, .91)
          .to(steps[2], { className: 'boot-step is-live', duration: .01 }, .91)
          .from('.boot-lockup', { y: 18, autoAlpha: 0, duration: .42, ease: 'power3.out' }, 1.08);
      } else {
        setTimeout(dismissBoot, 1700);
      }
    }
  }

  // Lenis + ScrollTrigger integration. Native scroll remains the fallback.
  let lenis = null;
  if (!reduceMotion && typeof window.Lenis !== 'undefined') {
    try {
      lenis = new Lenis({ lerp: .11, wheelMultiplier: .92, smoothWheel: true });
      lenis.on('scroll', () => hasST && ScrollTrigger.update());
      if (hasGSAP) {
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      }
    } catch (_) { lenis = null; }
  }

  if (hasGSAP && hasST) gsap.registerPlugin(ScrollTrigger);

  // Nav state.
  const nav = $('#nav');
  const updateNav = () => nav?.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Smooth anchor navigation through Lenis when available.
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.05 });
      else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  // Hero entrance + object motion.
  if (hasGSAP && !reduceMotion) {
    gsap.from('.hero-kicker', { y: 18, autoAlpha: 0, duration: .55, delay: .15, ease: 'power3.out' });
    gsap.from('.hero h1 > span', { yPercent: 110, autoAlpha: 0, duration: .9, stagger: .065, delay: .12, ease: 'power4.out' });
    gsap.from(['.hero-lede', '.hero-buyline', '.hero-proofline'], { y: 24, autoAlpha: 0, duration: .7, stagger: .1, delay: .52, ease: 'power3.out' });
    gsap.from('.decision-core', { scale: .72, rotate: -10, autoAlpha: 0, duration: 1.05, delay: .35, ease: 'elastic.out(1,.75)' });
    gsap.from('.object-ticket', { scale: .7, autoAlpha: 0, duration: .6, stagger: .12, delay: .85, ease: 'back.out(1.7)' });
  }

  // Hero object follows pointer with quickTo (official GSAP performance pattern).
  const heroObject = $('#heroObject');
  if (heroObject && finePointer && hasGSAP && !reduceMotion) {
    const rx = gsap.quickTo(heroObject, 'rotationX', { duration: .45, ease: 'power3.out' });
    const ry = gsap.quickTo(heroObject, 'rotationY', { duration: .45, ease: 'power3.out' });
    const tx = gsap.quickTo(heroObject, 'x', { duration: .45, ease: 'power3.out' });
    const ty = gsap.quickTo(heroObject, 'y', { duration: .45, ease: 'power3.out' });
    $('.hero')?.addEventListener('pointermove', (e) => {
      const r = heroObject.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      ry(nx * 7); rx(-ny * 6); tx(nx * 8); ty(ny * 8);
    });
    $('.hero')?.addEventListener('pointerleave', () => { ry(0); rx(0); tx(0); ty(0); });
  }

  const decisionData = [
    {
      word: 'TRUST',
      prompt: '“Do these people look credible?”',
      title: 'Make the business feel worth choosing.',
      body: 'Art direction, type, hierarchy and real proof should make the quality of the business obvious before the visitor reads every word.'
    },
    {
      word: 'FIT',
      prompt: '“Is this actually for someone like me?”',
      title: 'Remove the effort from understanding the offer.',
      body: 'The page should surface the right products, services, pricing cues and context in the order a real customer needs them.'
    },
    {
      word: 'ACTION',
      prompt: '“Fine. What do I do now?”',
      title: 'End every useful thought with a next step.',
      body: 'WhatsApp, enquiry, booking, directions or checkout — the website should hand people to the action your business can actually fulfil.'
    }
  ];
  const dNum = $('#decisionNum'), dWord = $('#decisionWord'), dPrompt = $('#decisionPrompt'), dTitle = $('#decisionTitle'), dBody = $('#decisionBody'), dMeter = $('#decisionMeter');
  const dSignals = $$('.decision-signal span');
  let currentDecision = -1;
  const renderDecision = (index, progressWithin = 1) => {
    index = Math.max(0, Math.min(2, index));
    if (index !== currentDecision) {
      const data = decisionData[index];
      currentDecision = index;
      if (hasGSAP && !reduceMotion) {
        gsap.to([dWord, dPrompt, dTitle, dBody], { y: 10, autoAlpha: 0, duration: .16, onComplete: () => {
          dNum.textContent = String(index + 1);
          dWord.textContent = data.word;
          dPrompt.textContent = data.prompt;
          dTitle.textContent = data.title;
          dBody.textContent = data.body;
          gsap.fromTo([dWord, dPrompt, dTitle, dBody], { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .4, stagger: .035, ease: 'power3.out' });
        }});
      } else {
        dNum.textContent = String(index + 1); dWord.textContent = data.word; dPrompt.textContent = data.prompt; dTitle.textContent = data.title; dBody.textContent = data.body;
      }
      dSignals.forEach((el, i) => el.classList.toggle('is-active', i === index));
    }
    if (dMeter) dMeter.style.width = `${((index + Math.max(.12, progressWithin)) / 3) * 100}%`;
  };
  renderDecision(0, .15);

  if (hasGSAP && hasST && !reduceMotion) {
    ScrollTrigger.create({
      trigger: '.decision', start: 'top top', end: 'bottom bottom', scrub: .45,
      onUpdate(self) {
        const p = Math.min(.999, Math.max(0, self.progress));
        const scaled = p * 3;
        const index = Math.floor(scaled);
        renderDecision(index, scaled - index);
        gsap.set('.decision-word', { xPercent: (p - .5) * 8, rotation: (p - .5) * 2 });
      }
    });
  } else {
    const onScrollDecision = () => {
      const section = $('.decision'); if (!section) return;
      const r = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - innerHeight);
      const p = Math.min(.999, Math.max(0, -r.top / total));
      const scaled = p * 3; renderDecision(Math.floor(scaled), scaled - Math.floor(scaled));
    };
    addEventListener('scroll', onScrollDecision, { passive: true });
  }

  // FakhriMart case notes + screenshot pan.
  const caseNotes = $$('.case-note');
  const caseImg = $('.case-viewport img');
  if (hasGSAP && hasST && !reduceMotion) {
    caseNotes.forEach((note, i) => {
      ScrollTrigger.create({
        trigger: note, start: 'top 62%', end: 'bottom 38%',
        onToggle(self) {
          if (!self.isActive) return;
          caseNotes.forEach((n, j) => n.classList.toggle('is-active', i === j));
          if (caseImg) gsap.to(caseImg, { yPercent: i * -10, duration: .8, ease: 'power3.inOut' });
        }
      });
    });
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const i = caseNotes.indexOf(entry.target);
      caseNotes.forEach((n, j) => n.classList.toggle('is-active', i === j));
    }), { rootMargin: '-35% 0px -35% 0px' });
    caseNotes.forEach(n => io.observe(n));
  }

  // Offer accordion. One open at a time keeps this readable on touch too.
  $$('.offer-layer').forEach((layer) => layer.addEventListener('click', () => {
    $$('.offer-layer').forEach((item) => item.classList.toggle('is-open', item === layer));
  }));

  // Pricing switch.
  $$('[data-pricing]').forEach((btn) => btn.addEventListener('click', () => {
    const mode = btn.dataset.pricing;
    $$('[data-pricing]').forEach((b) => { const active = b === btn; b.classList.toggle('is-active', active); b.setAttribute('aria-selected', active ? 'true' : 'false'); });
    $$('[data-panel]').forEach((panel) => panel.classList.toggle('is-hidden', panel.dataset.panel !== mode));
    if (hasST) requestAnimationFrame(() => ScrollTrigger.refresh());
  }));

  // Dialog / purchase intent handoff.
  const dialog = $('#leadDialog'), form = $('#leadForm'), dialogTitle = $('#dialogTitle'), planInput = $('#planInput');
  $$('.js-plan').forEach((btn) => btn.addEventListener('click', () => {
    const plan = btn.dataset.plan || 'Website Project';
    dialogTitle.textContent = plan;
    planInput.value = plan;
    if (dialog?.showModal) dialog.showModal(); else dialog?.setAttribute('open', '');
  }));
  $('#dialogClose')?.addEventListener('click', () => dialog?.close?.());
  dialog?.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const lines = [
      `Hi Yash, I'm interested in the ${fd.get('plan')}.`,
      `Name: ${fd.get('name')}`,
      `Business: ${fd.get('business')}`,
      `Phone: ${fd.get('phone')}`,
      fd.get('website') ? `Current website: ${fd.get('website')}` : '',
      `Goal: ${fd.get('goal')}`
    ].filter(Boolean);
    const message = lines.join('\n');
    navigator.clipboard?.writeText(message).catch(() => {});
    dialog?.close?.();
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  // Lightweight reveal choreography; uses transforms/opacity only.
  if (hasGSAP && hasST && !reduceMotion) {
    gsap.utils.toArray('.work-copy h2,.work-copy p,.offer-head>* ,.plans-head>* ,.objections-title>*').forEach((el) => {
      gsap.from(el, { y: 36, autoAlpha: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.from('.offer-layer', { y: 18, autoAlpha: 0, stagger: .07, duration: .55, ease: 'power2.out', scrollTrigger: { trigger: '.offer-stack', start: 'top 80%', once: true } });
    gsap.from('.featured-plan', { y: 45, autoAlpha: 0, duration: .85, ease: 'power4.out', scrollTrigger: { trigger: '.pricing-panel', start: 'top 80%', once: true } });
    gsap.from('.side-plan', { x: 28, autoAlpha: 0, stagger: .1, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.pricing-panel', start: 'top 78%', once: true } });
  }

  // Keep ScrollTrigger measurements accurate after fonts/images load, but don't spam refresh.
  addEventListener('load', () => { if (hasST) requestAnimationFrame(() => ScrollTrigger.refresh()); }, { once: true });
})();