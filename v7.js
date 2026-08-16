(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const q = (s, r=document) => r.querySelector(s);
  const qa = (s, r=document) => [...r.querySelectorAll(s)];

  const progress = q('.v7-progress i');
  const updateProgress = () => { if (!progress) return; const max = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; };
  addEventListener('scroll', updateProgress, {passive:true}); updateProgress();

  const cursor = q('.v7-cursor');
  if (cursor && matchMedia('(pointer:fine)').matches && !reduce) {
    let x=-80,y=-80,cx=x,cy=y; addEventListener('pointermove', e => { x=e.clientX; y=e.clientY; });
    const loop = () => { cx += (x-cx)*.18; cy += (y-cy)*.18; cursor.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); }; loop();
    qa('a,button,input,.compare-theatre').forEach(el => { el.addEventListener('pointerenter',()=>cursor.classList.add('is-action')); el.addEventListener('pointerleave',()=>cursor.classList.remove('is-action')); });
  }

  const hero = q('.hero-v5'); const heroImg=q('.hero-v5 .hero-image');
  if (hero && heroImg && !reduce) {
    hero.addEventListener('pointermove', e => { const r=hero.getBoundingClientRect(); const nx=(e.clientX-r.left)/r.width; const ny=(e.clientY-r.top)/r.height; hero.style.setProperty('--hero-x', `${nx*100}%`); hero.style.setProperty('--hero-y', `${ny*100}%`); heroImg.style.transform=`scale(1.035) translate3d(${(nx-.5)*-10}px,${(ny-.5)*-7}px,0)`; });
    hero.addEventListener('pointerleave',()=>heroImg.style.transform='scale(1.015)');
  }

  const heroParts = qa('.hero-copy-v5 .eyebrow,.hero-copy-v5 h1,.hero-copy-v5 .hero-sub,.hero-copy-v5 .hero-actions,.hero-copy-v5 .hero-price');
  if (window.gsap && !reduce && heroParts.length) { gsap.set(heroParts,{opacity:0,y:30}); gsap.to(heroParts,{opacity:1,y:0,duration:.9,stagger:.09,ease:'power3.out',delay:1.1}); setTimeout(()=>hero?.classList.add('hero-ready'),1700); gsap.to(heroImg,{scale:1.075,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}}); }

  if (!reduce && matchMedia('(pointer:fine)').matches) {
    qa('.magnetic,.nav-cta,.test-cta').forEach(el => { el.addEventListener('pointermove', e => { const r=el.getBoundingClientRect(); const dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2); el.style.transform=`translate3d(${dx*.08}px,${dy*.12}px,0)`; }); el.addEventListener('pointerleave',()=>{ el.style.transition='transform .55s cubic-bezier(.16,1,.3,1)'; el.style.transform=''; setTimeout(()=>el.style.transition='',600); }); });
  }

  const planStage=q('.plan-stage');
  if (planStage) { const observer=new MutationObserver(()=>{ if (window.gsap && !reduce) gsap.fromTo(['#planPrice','#planTitle','#planFeatures li'],{opacity:.25,y:13},{opacity:1,y:0,duration:.5,stagger:.035,ease:'back.out(1.35)',overwrite:true}); }); ['#planPrice','#planTitle','#planFeatures'].forEach(s=>{const el=q(s); if(el) observer.observe(el,{childList:true,subtree:true,characterData:true});}); }
  if(planStage && !reduce && matchMedia('(pointer:fine)').matches){ planStage.addEventListener('pointermove',e=>{const r=planStage.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;planStage.style.transform=`perspective(1300px) rotateY(${x*1.6}deg) rotateX(${y*-1.2}deg) translateY(-2px)`}); planStage.addEventListener('pointerleave',()=>planStage.style.transform=''); }

  const caseRoot=q('.work-v7'); const caseButtons=qa('.case-progress button'); const caseShots=qa('.case-shot'); const workSteps=qa('.work-v7 .work-step'); const hotspots=qa('.case-hotspot'); const capTitle=q('#caseCaptionTitle'); const capMeta=q('#caseCaptionMeta');
  const states=[{key:'home',title:'The storefront explains itself fast.',meta:'HOME / PRODUCT DISCOVERY'},{key:'catalogue',title:'Discovery becomes structured instead of overwhelming.',meta:'CATALOGUE / SEARCH'},{key:'compare',title:'Decision support lives inside the journey.',meta:'COMPARE / SHORTLIST'},{key:'enquiry',title:'Intent carries into the enquiry.',meta:'ENQUIRY / WHATSAPP'}];
  const setCase = (i) => { i=Math.max(0,Math.min(states.length-1,i)); caseButtons.forEach((b,n)=>{b.classList.toggle('active',n===i);b.setAttribute('aria-selected',n===i?'true':'false')}); caseShots.forEach((im,n)=>im.classList.toggle('active',n===i)); workSteps.forEach((s,n)=>s.classList.toggle('active',n===i)); hotspots.forEach((h,n)=>h.classList.toggle('active', n <= i)); if(capTitle) capTitle.textContent=states[i].title; if(capMeta) capMeta.textContent=states[i].meta; if(window.gsap && !reduce){ const active=caseShots[i]; if(active) gsap.fromTo(active,{scale:1.045,opacity:.15},{scale:1,opacity:1,duration:.8,ease:'power3.out',overwrite:true}); } };
  caseButtons.forEach((b,i)=>b.addEventListener('click',()=>setCase(i)));
  if (caseRoot && window.ScrollTrigger && !reduce) ScrollTrigger.create({trigger:caseRoot,start:'top top',end:'bottom bottom',onUpdate:self=>setCase(Math.min(3,Math.floor(self.progress*4)))});
  setCase(0);

  const stage=q('.case-stage'); const browser=q('.case-browser'); const phone=q('.case-phone');
  if(stage && browser && !reduce && matchMedia('(pointer:fine)').matches){ stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5; browser.style.transform=`rotateY(${-4+x*3}deg) rotateX(${1.2-y*2}deg) translate3d(${x*5}px,${y*4}px,0)`; if(phone) phone.style.transform=`rotate(${2.6-x*2}deg) translate3d(${x*-12}px,${y*-9}px,80px)`}); stage.addEventListener('pointerleave',()=>{browser.style.transform='';if(phone)phone.style.transform='';}); }

  const result=q('.test-result'); qa('.test-item').forEach(item=>item.addEventListener('click',e=>{const r=item.getBoundingClientRect();item.style.setProperty('--tap-x',`${e.clientX-r.left}px`);item.style.setProperty('--tap-y',`${e.clientY-r.top}px`);item.classList.remove('ripple');void item.offsetWidth;item.classList.add('ripple');if(result){result.classList.add('bump');setTimeout(()=>result.classList.remove('bump'),360);}}));

  const compare=q('.compare-theatre'); const range=q('#compareRange'); const percent=q('#comparePercent');
  const updateCompare=()=>{ if(!compare||!range)return; const v=+range.value; compare.style.setProperty('--split',`${v}%`); if(percent)percent.textContent=`${v}%`; qa('.after-callout',compare).forEach((c,i)=>{const threshold=[43,55,68][i]||50; c.style.opacity=v>threshold?'1':'.18'; c.style.transform=v>threshold?'translateX(0)':'translateX(12px)';}); };
  if(range){range.addEventListener('input',updateCompare);range.addEventListener('pointerdown',()=>compare?.classList.add('is-dragging'));addEventListener('pointerup',()=>compare?.classList.remove('is-dragging'));updateCompare();}
  if(compare && !reduce){ let autoStarted=false; const autoReveal=()=>{if(autoStarted)return;autoStarted=true;let start=null;const from=22,to=72,dur=1500;const tick=t=>{start??=t;const p=Math.min(1,(t-start)/dur);const eased=1-Math.pow(1-p,3);range.value=from+(to-from)*eased;updateCompare();if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)}; if(window.IntersectionObserver)new IntersectionObserver(es=>{if(es[0].isIntersecting)autoReveal()},{threshold:.45}).observe(compare); }

  const revealEls=qa('[data-v7-reveal]'); if(revealEls.length){if(reduce||!('IntersectionObserver'in window)){revealEls.forEach(e=>e.classList.add('is-visible'))}else{const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target)}}),{threshold:.13});revealEls.forEach(e=>io.observe(e));}}
  qa('.map-node').forEach(node=>node.addEventListener('click',()=>{qa('.map-node').forEach(n=>n.classList.remove('active'));node.classList.add('active');if(window.gsap&&!reduce)gsap.fromTo(node,{scale:.97},{scale:1,duration:.55,ease:'back.out(2)'});}));
  const wipe=q('.v7-page-wipe'); qa('a[href$=".html"],a[href*=".html#"]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||!wipe)return;e.preventDefault();const href=a.href;wipe.classList.add('go');setTimeout(()=>location.href=href,430)}));
})();
