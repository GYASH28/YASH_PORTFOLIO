(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  /* Global progress + nav */
  const progress = $('.v9-progress i');
  const nav = $('.v9-nav');
  const syncPage = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    nav?.classList.toggle('scrolled', scrollY > 24);
  };
  addEventListener('scroll', syncPage, { passive: true });
  syncPage();

  /* Custom cursor */
  const cursor = $('.v9-cursor');
  if (cursor && fine && !reduce) {
    let x = -80, y = -80, cx = x, cy = y, raf = 0;
    const loop = () => {
      cx += (x - cx) * .18;
      cy += (y - cy) * .18;
      cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', e => {
      x = e.clientX; y = e.clientY; cursor.classList.add('on');
    }, { passive: true });
    $$('a,button,input[type="range"],summary,.v9-shot-card').forEach(el => {
      el.addEventListener('pointerenter', () => cursor.classList.add('big'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('big'));
    });
    raf = requestAnimationFrame(loop);
    addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
  }

  /* Reveal system */
  const reveals = $$('[data-v9-reveal]');
  if (reduce || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('v9-visible'));
  else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('v9-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* Magnetic actions */
  if (fine && !reduce) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate3d(${x * .11}px,${y * .15}px,0)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* Kinetic statement after plans */
  const transition = $('.v9-transition');
  const transitionTrack = $('.v9-transition-track');
  if (transition && transitionTrack && !reduce) {
    const sync = () => {
      const r = transition.getBoundingClientRect();
      const p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
      transitionTrack.style.transform = `translate3d(${-p * 16}vw,0,0)`;
    };
    addEventListener('scroll', sync, { passive: true });
    sync();
  }

  /* Pricing */
  const PLAN_DATA = {
    monthly: {
      launch: { badge:'LAUNCH MEMBERSHIP', price:'₹2,499', unit:'/month', setup:'+ ₹4,999 one-time setup', title:'A credible website without another thing on your to-do list.', best:'Best when the offer is simple and your main goal is to look trustworthy, answer the basics and make contacting you effortless.', features:['Custom responsive website','Hosting + HTTPS/SSL','WhatsApp/contact conversion path','Small ongoing content updates','Basic analytics + support'] },
      grow: { badge:'GROW MEMBERSHIP', price:'₹3,999', unit:'/month', setup:'+ ₹6,999 one-time setup', title:'For businesses that want the website to keep earning trust after launch.', best:'Best for clinics, salons, wholesalers, coaches and local businesses that regularly update services, offers or products.', features:['Up to 10 core pages','Hosting + HTTPS/SSL + monitoring','Regular content/service updates','Analytics + local SEO care','Priority support'] },
      pro: { badge:'PRO MEMBERSHIP', price:'₹5,999+', unit:'/month', setup:'Custom setup', title:'When the website needs to behave like part of the business.', best:'Best when you need a catalogue, booking, automation, integrations or more complex customer journeys.', features:['Advanced custom website','Catalogue / booking / CMS options','Automations + integrations','Advanced SEO support','Priority iteration and support'] }
    },
    once: {
      essential: { badge:'ESSENTIAL BUILD', price:'₹9,999+', unit:'one time', setup:'Deployment included', title:'Fix the credibility problem fast.', best:'Best for a straightforward business that needs a professional online presence and one clean enquiry path.', features:['4–5 core pages','Responsive design','WhatsApp + enquiry','Maps + basic SEO','Deployment handoff'] },
      business: { badge:'BUSINESS MAKEOVER', price:'₹17,999+', unit:'one time', setup:'Scope confirmed first', title:'A full makeover built to make the business easier to choose.', best:'Best when the site needs stronger storytelling, proof, service/product structure and richer interaction.', features:['Custom art direction','Richer interaction + animation','Catalogue/service architecture','Analytics + local SEO foundation','Post-launch support'] },
      custom: { badge:'CUSTOM BUILD', price:'₹25k–35k+', unit:'one time', setup:'Custom scope', title:'For websites that need to work more like products.', best:'Best when the project needs CMS/admin, booking, commerce, automation or a custom experience.', features:['Custom UX system','CMS/admin or commerce options','Advanced motion/interaction','Automation/integration options','Custom support plan'] }
    }
  };
  let planMode = 'monthly';
  let planKey = 'grow';
  const modeButtons = $$('.v9-price-mode button');
  const planTabs = $$('.v9-plan-tab');
  const planEls = {
    badge: $('#v9PlanBadge'), price: $('#v9PlanPrice'), unit: $('#v9PlanUnit'), setup: $('#v9PlanSetup'),
    title: $('#v9PlanTitle'), best: $('#v9PlanBest'), features: $('#v9PlanFeatures'), cta: $('#v9PlanCta')
  };
  const renderPlan = () => {
    const d = PLAN_DATA[planMode]?.[planKey];
    if (!d) return;
    ['badge','price','unit','setup','title','best'].forEach(k => { if (planEls[k]) planEls[k].textContent = d[k]; });
    if (planEls.features) planEls.features.innerHTML = d.features.map(x => `<li>${x}</li>`).join('');
    if (planEls.cta) {
      planEls.cta.dataset.plan = d.badge;
      const label = planEls.cta.querySelector('span');
      if (label) label.textContent = `Choose ${planKey[0].toUpperCase() + planKey.slice(1)}`;
    }
    const stage = $('.v9-plan-stage');
    if (stage && !reduce) stage.animate([{opacity:.7,transform:'translateY(8px)'},{opacity:1,transform:'none'}], {duration:320,easing:'cubic-bezier(.16,1,.3,1)'});
  };
  modeButtons.forEach(btn => btn.addEventListener('click', () => {
    planMode = btn.dataset.mode;
    modeButtons.forEach(b => { const on = b === btn; b.classList.toggle('active', on); b.setAttribute('aria-selected', String(on)); });
    planTabs.forEach(t => t.classList.toggle('hidden', t.dataset.mode !== planMode));
    const candidates = planTabs.filter(t => t.dataset.mode === planMode);
    const preferred = candidates.find(t => t.classList.contains('featured')) || candidates[0];
    planTabs.forEach(t => { const on = t === preferred; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
    planKey = preferred?.dataset.key || (planMode === 'monthly' ? 'grow' : 'business');
    renderPlan();
  }));
  planTabs.forEach(tab => tab.addEventListener('click', () => {
    planKey = tab.dataset.key;
    planTabs.forEach(t => { const on = t === tab; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
    renderPlan();
  }));

  /* Integrated real-client experience */
  const CLIENT_STATES = [
    { key:'discover', index:'01 / DISCOVER', title:'A large catalogue stops feeling large.', body:'The homepage gives customers an obvious place to begin, so a dense product range feels explorable instead of overwhelming.', proof:['HOMEPAGE','CATEGORIES','PRODUCT CONTEXT'], outcome:'“I know where to start.”', src:'./assets/desktop-light-home-section-00.png', mode:'desktop', url:'fakhriyarns.vercel.app / home' },
    { key:'find', index:'02 / FIND', title:'Search and filters remove the dead ends.', body:'Customers can narrow the range without knowing every exact product name first. The website helps them move forward before they need WhatsApp.', proof:['CATALOGUE','SEARCH','FILTERING'], outcome:'“I’m getting closer.”', src:'./assets/desktop-light-catalogue-section-00.png', mode:'desktop', url:'fakhriyarns.vercel.app / products' },
    { key:'compare', index:'03 / DECIDE', title:'Comparison gives the decision a workspace.', body:'Instead of remembering several product pages, customers can evaluate options together and enter the conversation with a clearer preference.', proof:['COMPARE','SHORTLIST','DECISION SUPPORT'], outcome:'“I know what I want to ask about.”', src:'./assets/desktop-light-compare.png', mode:'full', url:'fakhriyarns.vercel.app / compare' },
    { key:'enquire', index:'04 / ACT', title:'The enquiry carries the intent forward.', body:'Product interest becomes a useful enquiry with context instead of resetting the customer to a vague “price?” message.', proof:['ENQUIRY','PRODUCT CONTEXT','WHATSAPP'], outcome:'“They already know what I mean.”', src:'./assets/desktop-light-enquiry-section-00.png', mode:'desktop', url:'fakhriyarns.vercel.app / enquiry' },
    { key:'adapt', index:'05 / ADAPT', title:'The experience survives the screen change.', body:'Mobile is treated as a first-class experience, so hierarchy and actions still feel intentional away from the perfect desktop screenshot.', proof:['MOBILE','RESPONSIVE','ACCESSIBLE'], outcome:'“This still feels premium on my phone.”', src:'./assets/mobile-light-home-section-00.png', mode:'mobile', url:'fakhriyarns.vercel.app / mobile' }
  ];
  let clientIndex = 0;
  let deviceOverride = null;
  let mediaToken = 0;
  const featureButtons = $$('.v9-feature-btn');
  const device = $('#v9Device');
  const preview = $('#v9Preview');
  const frame = preview?.closest('.v9-device-frame');
  const deviceUrl = $('#v9DeviceUrl');
  const storyIndex = $('#v9StoryIndex');
  const storyTitle = $('#v9StoryTitle');
  const storyBody = $('#v9StoryBody');
  const storyProof = $('#v9StoryProof');
  const storyOutcome = $('#v9StoryOutcome');
  const scrub = $('#v9Scrub');
  const scrubValue = $('#v9ScrubValue');

  const displayedOverflow = () => preview && frame ? Math.max(0, preview.offsetHeight - frame.clientHeight) : 0;
  const applyScrub = () => {
    if (!preview || !scrub) return;
    const v = +scrub.value;
    preview.style.transform = `translate3d(0,${-(displayedOverflow() * v / 100)}px,0)`;
    if (scrubValue) scrubValue.textContent = String(v).padStart(2,'0') + '%';
  };
  scrub?.addEventListener('input', applyScrub);
  addEventListener('resize', applyScrub, { passive:true });

  const swapMedia = async (src, mode, label) => {
    if (!preview) return;
    const token = ++mediaToken;
    frame?.classList.add('switching');
    const loader = new Image();
    loader.src = src;
    try { if (loader.decode) await loader.decode(); } catch (_) {}
    if (token !== mediaToken) return;
    preview.src = src;
    preview.alt = label || 'Current FakhriMart website capture';
    if (device) device.dataset.mode = mode;
    if (scrub) scrub.value = '0';
    preview.style.transform = 'translate3d(0,0,0)';
    if (scrubValue) scrubValue.textContent = '00%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      frame?.classList.remove('switching');
      applyScrub();
    }));
  };

  const applyClientState = (idx, fromScroll = false) => {
    clientIndex = clamp(idx, 0, CLIENT_STATES.length - 1);
    const state = CLIENT_STATES[clientIndex];
    featureButtons.forEach((b, i) => {
      const on = i === clientIndex;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    if (!deviceOverride) swapMedia(state.src, state.mode, `Current FakhriMart ${state.key} capture`);
    if (deviceUrl) deviceUrl.textContent = state.url;
    if (storyIndex) storyIndex.textContent = state.index;
    if (storyTitle) storyTitle.textContent = state.title;
    if (storyBody) storyBody.textContent = state.body;
    if (storyProof) storyProof.innerHTML = state.proof.map(x => `<span>${x}</span>`).join('');
    if (storyOutcome) storyOutcome.textContent = state.outcome;
    if (!fromScroll && innerWidth < 781) featureButtons[clientIndex]?.scrollIntoView({behavior:reduce?'auto':'smooth',inline:'center',block:'nearest'});
  };
  featureButtons.forEach((b, i) => b.addEventListener('click', () => { deviceOverride = null; applyClientState(i); }));

  $$('.v9-device-controls button').forEach(btn => btn.addEventListener('click', () => {
    $$('.v9-device-controls button').forEach(b => b.classList.toggle('active', b === btn));
    const mode = btn.dataset.mode;
    deviceOverride = mode;
    const current = CLIENT_STATES[clientIndex];
    if (mode === 'mobile') {
      if (deviceUrl) deviceUrl.textContent = 'fakhriyarns.vercel.app / mobile';
      swapMedia('./assets/mobile-light-home-section-00.png', 'mobile', 'Current FakhriMart mobile capture');
    } else if (mode === 'full') {
      if (deviceUrl) deviceUrl.textContent = 'fakhriyarns.vercel.app / full page';
      swapMedia('./assets/desktop-light-home.png', 'full', 'Current FakhriMart full-page capture');
    } else {
      if (deviceUrl) deviceUrl.textContent = current.url;
      swapMedia(current.src, current.mode === 'mobile' ? 'desktop' : 'desktop', `Current FakhriMart ${current.key} capture`);
    }
  }));

  preview?.addEventListener('load', applyScrub);
  preview?.addEventListener('error', () => {
    frame?.classList.remove('switching');
    if (deviceUrl) deviceUrl.textContent = 'Capture unavailable — open live site';
  });

  const lab = $('.v9-lab');
  if (lab && innerWidth > 780 && !reduce) {
    const syncLab = () => {
      const r = lab.getBoundingClientRect();
      const travel = Math.max(1, r.height - innerHeight);
      const p = clamp(-r.top / travel, 0, .999);
      const idx = Math.min(CLIENT_STATES.length - 1, Math.floor(p * CLIENT_STATES.length));
      if (idx !== clientIndex) { deviceOverride = null; applyClientState(idx, true); }
    };
    addEventListener('scroll', syncLab, { passive:true });
    syncLab();
  }

  if (device && fine && !reduce) {
    const shell = $('.v9-device-shell');
    device.addEventListener('pointermove', e => {
      const r = device.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      if (shell) shell.style.transform = `rotateY(${x * 2.2}deg) rotateX(${y * -1.6}deg) translate3d(${x * 4}px,${y * 4}px,0)`;
    });
    device.addEventListener('pointerleave', () => { if (shell) shell.style.transform = ''; });
  }

  /* Gallery / proof viewer */
  const shotDialog = $('#v9ShotDialog');
  const shotDialogImg = $('#v9ShotDialogImg');
  const shotDialogTitle = $('#v9ShotDialogTitle');
  const shotDialogCount = $('#v9ShotDialogCount');
  const shots = $$('.v9-shot-card');
  let shotIndex = 0;
  const openShot = i => {
    if (!shots.length || !shotDialogImg) return;
    shotIndex = (i + shots.length) % shots.length;
    const card = shots[shotIndex];
    shotDialogImg.src = card.dataset.src || '';
    shotDialogImg.alt = card.dataset.alt || 'FakhriMart capture';
    if (shotDialogTitle) shotDialogTitle.textContent = card.dataset.title || 'Current client-work capture';
    if (shotDialogCount) shotDialogCount.textContent = `${String(shotIndex + 1).padStart(2,'0')} / ${String(shots.length).padStart(2,'0')}`;
    if (!shotDialog?.open) shotDialog?.showModal?.();
  };
  shots.forEach((card, i) => card.addEventListener('click', () => openShot(i)));
  $('#v9ShotClose')?.addEventListener('click', () => shotDialog?.close());
  $('#v9ShotPrev')?.addEventListener('click', () => openShot(shotIndex - 1));
  $('#v9ShotNext')?.addEventListener('click', () => openShot(shotIndex + 1));
  shotDialog?.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') openShot(shotIndex - 1);
    if (e.key === 'ArrowRight') openShot(shotIndex + 1);
  });
  shotDialog?.addEventListener('click', e => { if (e.target === shotDialog) shotDialog.close(); });

  /* Self-diagnosis */
  const testItems = $$('.v9-test-item');
  const countEl = $('#v9TestCount');
  const recEl = $('#v9TestRec');
  const testCta = $('#v9TestCta');
  const syncTest = () => {
    const n = testItems.filter(x => x.classList.contains('on')).length;
    if (countEl) countEl.textContent = `${n} friction point${n === 1 ? '' : 's'}`;
    let rec = 'Your website may already be covering the basics.';
    let plan = 'Launch Membership';
    if (n >= 2) { rec = 'Your site may be losing trust or enquiries before the customer reaches you.'; plan = 'Grow Membership'; }
    if (n >= 4) { rec = 'This looks more like a full digital makeover than a small patch.'; plan = 'Business Makeover'; }
    if (recEl) recEl.textContent = rec;
    if (testCta) { testCta.dataset.plan = plan; testCta.textContent = `Fix this with ${plan.replace(' Membership','')} ↗`; }
  };
  testItems.forEach(item => item.addEventListener('click', () => {
    const on = !item.classList.contains('on');
    item.classList.toggle('on', on);
    item.setAttribute('aria-pressed', String(on));
    syncTest();
  }));
  syncTest();

  /* Live-DOM before/after */
  const compareRange = $('#v9CompareRange');
  const compareAfter = $('.v9-compare-after');
  const compareLine = $('.v9-compare-line');
  const compareHandle = $('.v9-compare-handle');
  if (compareRange) {
    const syncCompare = () => {
      const v = +compareRange.value;
      if (compareAfter) compareAfter.style.clipPath = `inset(0 0 0 ${v}%)`;
      if (compareLine) compareLine.style.left = `${v}%`;
      if (compareHandle) compareHandle.style.left = `${v}%`;
    };
    compareRange.addEventListener('input', syncCompare);
    syncCompare();
  }

  /* Lead dialog */
  const planDialog = $('#v9PlanDialog');
  const planDialogTitle = $('#v9DialogPlan');
  const form = $('#v9Form');
  let chosenPlan = 'Grow Membership';
  const openPlan = plan => {
    chosenPlan = plan || 'Grow Membership';
    if (planDialogTitle) planDialogTitle.textContent = chosenPlan;
    planDialog?.showModal?.();
  };
  $$('.js-plan').forEach(btn => btn.addEventListener('click', () => openPlan(btn.dataset.plan || btn.textContent.trim())));
  $('#v9DialogClose')?.addEventListener('click', () => planDialog?.close());
  planDialog?.addEventListener('click', e => { if (e.target === planDialog) planDialog.close(); });
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const msg = `Hi, I’m ${fd.get('name') || ''}. I’m interested in ${chosenPlan} for ${fd.get('business') || ''}. My WhatsApp/phone is ${fd.get('phone') || ''}. Main goal: ${fd.get('goal') || ''}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  /* Initial client state */
  if (preview) applyClientState(0, true);
})();
