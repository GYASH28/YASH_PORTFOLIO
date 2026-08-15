(() => {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Opening sequence: short, skippable, once per tab session.
  const intro = $('#intro');
  const skip = $('#introSkip');
  const dismissIntro = () => {
    if (!intro || intro.dataset.done) return;
    intro.dataset.done = '1';
    intro.classList.add('is-exiting');
    document.body.classList.remove('is-locked');
    sessionStorage.setItem('ykgIntroSeen', '1');
    setTimeout(() => intro.remove(), 720);
  };
  if (intro) {
    document.body.classList.add('is-locked');
    if (reduceMotion || sessionStorage.getItem('ykgIntroSeen')) {
      intro.remove(); document.body.classList.remove('is-locked');
    } else {
      setTimeout(dismissIntro, 2320);
      skip?.addEventListener('click', dismissIntro);
    }
  }

  // Reveal choreography.
  if (!reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } });
    }, { threshold: .14 });
    $$('.reveal,.reveal-card').forEach(el => observer.observe(el));
  } else $$('.reveal,.reveal-card').forEach(el => el.classList.add('in'));

  // Navigation.
  const nav = $('#nav');
  addEventListener('scroll', () => nav?.classList.toggle('is-scrolled', scrollY > 30), { passive: true });
  $$('[data-scroll]').forEach(btn => btn.addEventListener('click', () => $(btn.dataset.scroll)?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'})));

  // Custom cursor + magnetic CTA.
  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    const dot = $('.cursor-dot'), ring = $('.cursor-ring');
    let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    const loop = () => { rx += (mx-rx)*.15; ry += (my-ry)*.15; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); }; loop();
    $$('a,button,.plan-card').forEach(el => { el.addEventListener('mouseenter',()=>ring.classList.add('is-hover')); el.addEventListener('mouseleave',()=>ring.classList.remove('is-hover')); });
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => { const r=el.getBoundingClientRect(); const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2; el.style.transform=`translate(${x*.12}px,${y*.12}px)`; });
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }

  // Hero 3D stage follows cursor subtly.
  const heroStage = $('#heroStage');
  if (heroStage && !reduceMotion && matchMedia('(pointer:fine)').matches) {
    $('.hero').addEventListener('pointermove', e => {
      const r = heroStage.getBoundingClientRect();
      const x = (e.clientX - (r.left+r.width/2))/r.width;
      const y = (e.clientY - (r.top+r.height/2))/r.height;
      $('.browser-front').style.transform = `rotateY(${x*8}deg) rotateX(${-y*6}deg) translateZ(0)`;
      $('.browser-mid').style.transform = `rotate(${5+x*3}deg) translate(${x*-18}px,${y*-12}px) translateZ(-70px)`;
      $('.browser-back').style.transform = `rotate(${-8+x*2}deg) translate(${x*-28}px,${y*-18}px) translateZ(-120px)`;
    });
  }

  // FakhriMart screenshot pans through the real page as the proof section scrolls.
  const transformation = $('.transformation');
  const shot = $('.fakhri-shot img');
  if (transformation && shot && !reduceMotion) {
    const updateProof = () => {
      const r = transformation.getBoundingClientRect();
      const total = Math.max(1, r.height - innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / total));
      shot.style.setProperty('--shot-y', `${-Math.round(p * 300)}px`);
      $('.pf-main').style.transform = `rotateY(${-5 + p*5}deg) rotateX(${2-p*2}deg) scale(${.96+p*.04})`;
    };
    addEventListener('scroll', updateProof, {passive:true}); updateProof();
  }

  // Process emphasis.
  const processSteps = $$('.process-step');
  if (processSteps.length) {
    const po = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { processSteps.forEach(x=>x.classList.remove('active')); e.target.classList.add('active'); }
    }), {rootMargin:'-35% 0px -45% 0px'});
    processSteps.forEach(x=>po.observe(x));
  }

  // Break-even calculator, explicitly illustrative.
  const slider = $('#valueSlider'), valueOut = $('#customerValue'), breakEven = $('#breakEven'), plural = $('#pluralCustomer');
  const money = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
  const updateCalc = () => {
    const value = Number(slider.value); const count = Math.max(1, Math.ceil(2499/value));
    valueOut.textContent = money(value); breakEven.textContent = count; plural.textContent = count === 1 ? '' : 's';
  };
  slider?.addEventListener('input', updateCalc); if (slider) updateCalc();

  // Pricing switch.
  $$('.mode').forEach(btn => btn.addEventListener('click', () => {
    $$('.mode').forEach(x => { x.classList.toggle('active', x===btn); x.setAttribute('aria-selected', x===btn ? 'true':'false'); });
    $$('[data-mode-panel]').forEach(panel => panel.classList.toggle('hidden', panel.dataset.modePanel !== btn.dataset.mode));
  }));

  // Enquiry modal and WhatsApp handoff.
  const dialog = $('#leadDialog'), selectedPlan = $('#selectedPlan'), form = $('#leadForm');
  let plan = 'Website Project';
  $$('.choose-plan').forEach(btn => btn.addEventListener('click', () => {
    plan = btn.dataset.plan || 'Website Project'; selectedPlan.textContent = plan;
    if (dialog?.showModal) dialog.showModal(); else dialog?.setAttribute('open','');
  }));
  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      `Hi Yash, I'm interested in the ${plan}.`,
      `Name: ${data.get('name')}`,
      `Business: ${data.get('business')}`,
      `Phone: ${data.get('phone')}`,
      data.get('website') ? `Current website: ${data.get('website')}` : '',
      `Goal: ${data.get('goal')}`
    ].filter(Boolean).join('\n');
    navigator.clipboard?.writeText(message).catch(()=>{});
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    dialog.close();
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
