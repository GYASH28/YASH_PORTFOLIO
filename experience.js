(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;

  // The V8 page owns its markup. This file only initializes it — no dynamic
  // galleries, duplicate dialogs, duplicate progress bars, or duplicate styles.
  const progress = $('.exp-progress i');
  const syncProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', syncProgress, { passive: true });
  syncProgress();

  const cursor = $('.exp-cursor');
  if (cursor && fine && !reduce) {
    let x = -80, y = -80, cx = x, cy = y, raf = 0;
    const loop = () => {
      cx += (x - cx) * .18;
      cy += (y - cy) * .18;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
    $$('a,button,.capture-card').forEach(el => {
      el.addEventListener('pointerenter', () => cursor.classList.add('big'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('big'));
    });
    raf = requestAnimationFrame(loop);
    addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
  }

  // Hero content must never depend on an observer firing. Reveal the first
  // viewport immediately; below-the-fold sections may animate in afterwards.
  $$('.exp-hero [data-exp-reveal]').forEach((el, i) => {
    if (reduce) el.classList.add('visible');
    else setTimeout(() => el.classList.add('visible'), 70 + i * 90);
  });

  const belowFoldReveals = $$('[data-exp-reveal]').filter(el => !el.closest('.exp-hero'));
  if (reduce || !('IntersectionObserver' in window)) {
    belowFoldReveals.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
    belowFoldReveals.forEach(el => io.observe(el));
  }

  const STATES = {
    discover: {
      index: '01 / DISCOVER',
      title: 'Help the customer find the right product before they need to ask.',
      body: 'The homepage turns a large material range into a visual journey with categories and product context.',
      proof: ['HOMEPAGE', 'CATALOGUE', 'PROJECT JOURNEYS'],
      outcome: '“I can actually find what I need.”',
      src: './assets/desktop-light-home-section-00.png',
      mode: 'desktop',
      status: 'CURRENT HOMEPAGE CAPTURE'
    },
    search: {
      index: '02 / SEARCH',
      title: 'Make product discovery resilient instead of fragile.',
      body: 'Search and catalogue structure reduce dead ends even when customers do not know the exact product name.',
      proof: ['SEARCH', 'FILTERS', 'CATEGORIES'],
      outcome: '“I’m getting closer, not lost.”',
      src: './assets/desktop-light-catalogue-section-00.png',
      mode: 'desktop',
      status: 'CURRENT CATALOGUE CAPTURE'
    },
    compare: {
      index: '03 / COMPARE',
      title: 'Give the decision a workspace of its own.',
      body: 'Comparison lets customers evaluate materials before they start the conversation.',
      proof: ['COMPARE', 'SHORTLIST', 'DECISION SUPPORT'],
      outcome: '“I know what I want to ask about.”',
      src: './assets/desktop-light-compare.png',
      mode: 'desktop',
      status: 'CURRENT COMPARE CAPTURE'
    },
    enquire: {
      index: '04 / ENQUIRE',
      title: 'Carry buying intent into the enquiry instead of resetting it.',
      body: 'The enquiry flow preserves context so WhatsApp continues the journey instead of starting from zero.',
      proof: ['ENQUIRY', 'PRODUCT CONTEXT', 'WHATSAPP'],
      outcome: '“They already know what I’m asking about.”',
      src: './assets/desktop-light-enquiry-section-00.png',
      mode: 'desktop',
      status: 'CURRENT ENQUIRY CAPTURE'
    },
    theme: {
      index: '05 / ADAPT',
      title: 'Keep the experience strong when the screen changes.',
      body: 'Mobile, themes and accessibility are tested so the experience survives outside the perfect desktop screenshot.',
      proof: ['MOBILE', 'THEMES', 'ACCESSIBILITY'],
      outcome: '“This feels intentional on my phone too.”',
      src: './assets/mobile-light-home-section-00.png',
      mode: 'mobile',
      status: 'CURRENT MOBILE CAPTURE'
    }
  };

  const stage = $('#deviceStage');
  const frame = $('#captureFrame');
  const preview = $('#previewImage');
  const live = $('#liveFrame');
  const status = $('#previewStatus');
  const deviceUrl = $('#deviceUrl');
  let switchTimer = 0;

  const setDeviceButtons = mode => {
    $$('.device').forEach(btn => {
      const active = btn.dataset.device === mode;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  const setPreview = ({ src, mode = 'desktop', label }) => {
    if (!stage || !frame || !preview) return;
    clearTimeout(switchTimer);
    frame.classList.add('is-switching');
    switchTimer = setTimeout(() => {
      stage.dataset.device = mode;
      if (live) live.style.display = 'none';
      preview.style.display = 'block';
      if (preview.getAttribute('src') !== src) preview.setAttribute('src', src);
      preview.style.transform = '';
      frame.classList.remove('is-switching');
      if (status) status.textContent = label || 'CURRENT CAPTURE';
      if (deviceUrl) deviceUrl.textContent = mode === 'mobile' ? 'fakhriyarns.vercel.app / mobile' : 'fakhriyarns.vercel.app';
      setDeviceButtons(mode === 'mobile' ? 'mobile' : mode === 'full' ? 'full' : 'desktop');
    }, reduce ? 0 : 130);
  };

  const setStory = state => {
    if (!state) return;
    const index = $('#storyIndex'), title = $('#storyTitle'), body = $('#storyBody'), proof = $('#storyProof'), outcome = $('#storyOutcome');
    if (index) index.textContent = state.index;
    if (title) title.textContent = state.title;
    if (body) body.textContent = state.body;
    if (proof) proof.innerHTML = state.proof.map(item => `<span>${item}</span>`).join('');
    if (outcome) outcome.textContent = state.outcome;
  };

  $$('.feature').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => {
      $$('.feature').forEach(item => {
        const active = item === btn;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      const state = STATES[btn.dataset.feature];
      setStory(state);
      setPreview({ src: state.src, mode: state.mode, label: state.status });
    });
  });

  $$('.device').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => {
      const mode = btn.dataset.device;
      if (mode === 'live') {
        clearTimeout(switchTimer);
        stage.dataset.device = 'live';
        preview.style.display = 'none';
        if (live) {
          live.style.display = 'block';
          if (live.getAttribute('src') === 'about:blank') live.setAttribute('src', 'https://fakhriyarns.vercel.app');
        }
        if (status) status.textContent = 'LIVE DEPLOYMENT / EMBED WHEN ALLOWED';
        if (deviceUrl) deviceUrl.textContent = 'fakhriyarns.vercel.app / live';
        setDeviceButtons('live');
        return;
      }
      if (mode === 'mobile') setPreview({ src: './assets/mobile-light-home-section-00.png', mode: 'mobile', label: 'CURRENT MOBILE CAPTURE' });
      else if (mode === 'full') setPreview({ src: './assets/desktop-light-home.png', mode: 'full', label: 'FULL-PAGE CURRENT CAPTURE' });
      else setPreview({ src: './assets/desktop-light-home-section-00.png', mode: 'desktop', label: 'CURRENT DESKTOP CAPTURE' });
    });
  });

  if (preview) {
    preview.addEventListener('error', () => {
      if (preview.dataset.fallbackUsed) return;
      preview.dataset.fallbackUsed = '1';
      preview.src = './assets/desktop-light-home-section-00.png';
      if (status) status.textContent = 'FALLBACK CURRENT CAPTURE';
    });
  }

  const dialog = $('#captureDialog');
  const dialogImage = $('#dialogCapture');
  const dialogTitle = $('#dialogCaptureTitle');
  $$('.capture-card').forEach(card => {
    card.addEventListener('click', () => {
      if (!dialog || !dialogImage) return;
      dialogImage.src = card.dataset.src || '';
      dialogImage.alt = card.dataset.alt || 'FakhriMart full-resolution capture';
      if (dialogTitle) dialogTitle.textContent = card.dataset.title || 'FakhriMart capture';
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
  });
  $('#captureDialogClose')?.addEventListener('click', () => dialog?.close?.());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close?.();
  });

  // Internal page transitions stay decorative and never trap navigation.
  const wipe = $('.exp-page-wipe');
  $$('a[href^="./index.html"]').forEach(link => {
    link.addEventListener('click', event => {
      if (reduce || !wipe || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const href = link.href;
      event.preventDefault();
      wipe.classList.add('go');
      setTimeout(() => { location.href = href; }, 360);
    });
  });
})();
