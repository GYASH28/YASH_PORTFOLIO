(() => {
  'use strict';
  const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DATA={
    desktop:{src:'./assets/fakhrimart-desktop-current.avif',alt:'Current FakhriMart desktop homepage capture',status:'CURRENT DESKTOP CAPTURE'},
    mobile:{src:'./assets/fakhrimart-mobile-current.avif',alt:'Current FakhriMart mobile homepage capture',status:'CURRENT MOBILE CAPTURE'},
    full:{src:'./assets/fakhrimart-desktop-current.avif',alt:'Current FakhriMart full-page homepage capture',status:'CURRENT FULL-PAGE CAPTURE'}
  };
  const STORIES={
    discover:{index:'01 / DISCOVER',title:'Help the customer find the right product before they need to ask.',body:'FakhriMart organizes the range around categories, projects, craft intent, material, thickness and colour so discovery feels guided instead of overwhelming.',proof:['CATALOGUE','PROJECT JOURNEYS','FILTERING'],outcome:'“I can actually find what I need.”'},
    search:{index:'02 / SEARCH',title:'Search should understand intent, not demand perfect spelling.',body:'Grouped autocomplete and typo-tolerant discovery reduce dead ends when someone only partly knows the product, craft or material they are looking for.',proof:['TYPO TOLERANCE','AUTOCOMPLETE','RELEVANCE'],outcome:'“I don’t need the exact product name.”'},
    compare:{index:'03 / COMPARE',title:'When options look similar, the website should help make the decision.',body:'Comparison turns similar materials into a readable decision instead of forcing customers to bounce between pages or ask basic questions in chat.',proof:['3-WAY COMPARE','MOBILE CARDS','DECISION CONTEXT'],outcome:'“Now I can see the difference.”'},
    enquire:{index:'04 / ENQUIRE',title:'Carry high-intent context into WhatsApp instead of starting from zero.',body:'Selected products and shade context stay attached to the enquiry journey, so the conversation begins closer to the actual buying decision.',proof:['WHATSAPP','SHADE CONTEXT','ENQUIRY BRIEF'],outcome:'“They already know what I’m asking about.”'},
    theme:{index:'05 / ADAPT',title:'The experience should still feel intentional on the smallest screen.',body:'Responsive layouts, theme contrast, accessibility checks and viewport integrity protect the experience after the desktop design is finished.',proof:['LIGHT / DARK','MOBILE','ACCESSIBILITY'],outcome:'“This feels built for my phone too.”'}
  };

  const veil=document.createElement('div');veil.className='page-veil';veil.innerHTML='<span>YKG</span>';document.body.appendChild(veil);requestAnimationFrame(()=>document.body.classList.add('ready'));
  $$('a[href*="index.html"]').forEach(a=>a.addEventListener('click',e=>{if(reduce||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,360)}));

  const nav=$('#expNav'); const navSync=()=>nav?.classList.toggle('scrolled',scrollY>20);addEventListener('scroll',navSync,{passive:true});navSync();
  const stage=$('#deviceStage'),preview=$('#previewImage'),frame=$('#liveFrame'),status=$('#previewStatus');
  $$('.device').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.device').forEach(x=>x.classList.toggle('active',x===btn));
    const mode=btn.dataset.device; stage.dataset.device=mode;
    if(mode==='live'){
      status.textContent='LIVE DEPLOYMENT / EMBED MODE';
      if(frame.src==='about:blank' || frame.getAttribute('src')==='about:blank') frame.src='https://fakhriyarns.vercel.app';
    }else{
      const d=DATA[mode];preview.src=d.src;preview.alt=d.alt;status.textContent=d.status;
      if(frame) frame.src='about:blank';
    }
    if(window.gsap&&!reduce) gsap.fromTo('.device-shell',{scale:.985,autoAlpha:.78},{scale:1,autoAlpha:1,duration:.42,ease:'power3.out'});
  }));

  const idx=$('#storyIndex'),title=$('#storyTitle'),body=$('#storyBody'),proof=$('#storyProof'),outcome=$('#storyOutcome');
  $$('.feature').forEach(btn=>btn.addEventListener('click',()=>{
    const s=STORIES[btn.dataset.feature];if(!s)return;
    $$('.feature').forEach(x=>x.classList.toggle('active',x===btn));
    idx.textContent=s.index;title.textContent=s.title;body.textContent=s.body;proof.innerHTML=s.proof.map(x=>`<span>${x}</span>`).join('');outcome.textContent=s.outcome;
    if(window.gsap&&!reduce) gsap.fromTo('.feature-story>*',{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.4,stagger:.035,ease:'power2.out'});
  }));

  if(window.gsap&&window.ScrollTrigger&&!reduce){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.exp-hero-copy>*',{autoAlpha:0,y:28,duration:.85,stagger:.07,ease:'power3.out',delay:.18});
    gsap.from('.hero-desktop',{autoAlpha:0,y:40,rotateY:-12,scale:.95,duration:1.1,ease:'power4.out',delay:.3});
    gsap.from('.hero-phone',{autoAlpha:0,y:70,rotate:8,scale:.88,duration:.95,ease:'back.out(1.3)',delay:.62});
    gsap.from('.capture-badge',{autoAlpha:0,scale:.9,duration:.55,ease:'power3.out',delay:.9});
    $$('.lab-head,.lab-toolbar,.device-stage,.feature-story,.story-heading,.decision-line article,.release-copy,.release-image,.experience-final>*').forEach(el=>gsap.from(el,{autoAlpha:0,y:28,duration:.72,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
    gsap.to('.hero-proof-stack',{y:-28,ease:'none',scrollTrigger:{trigger:'.exp-hero',start:'top top',end:'bottom top',scrub:1}});
  }
})();