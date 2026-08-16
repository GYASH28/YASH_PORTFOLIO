(()=>{
  const root=document.documentElement;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The connector corrupts large binary image uploads on this branch, so the verified
  // 3840×2160 WebP is embedded as CSS and loaded only on the homepage.
  if(document.querySelector('.hero')){
    const heroSheet=document.createElement('link');heroSheet.rel='stylesheet';heroSheet.href='./v13-hero-image.css';heroSheet.dataset.heroAsset='4k';document.head.append(heroSheet);
  }
  document.querySelectorAll('a[href="https://wa.me/"]').forEach(a=>a.href='https://wa.me/?text=Hi%20Yash%2C%20I%20want%20to%20discuss%20a%20website%20project.');

  let mx=.5,my=.5,lastY=scrollY,velocity=0,raf=0;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const setPointer=(x,y)=>{
    mx=clamp(x/innerWidth,0,1);my=clamp(y/innerHeight,0,1);
    root.style.setProperty('--mx',`${x}px`);root.style.setProperty('--my',`${y}px`);
    root.style.setProperty('--mxN',(mx-.5).toFixed(3));root.style.setProperty('--myN',(my-.5).toFixed(3));
  };
  addEventListener('pointermove',e=>setPointer(e.clientX,e.clientY),{passive:true});
  setPointer(innerWidth/2,innerHeight/2);

  const tick=()=>{
    const y=scrollY,delta=Math.abs(y-lastY);lastY=y;
    velocity+=(clamp(delta/34,0,1)-velocity)*.16;
    if(delta<1)velocity*=.91;
    root.style.setProperty('--scrollV',reduce?0:velocity.toFixed(3));
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    root.style.setProperty('--heroP',clamp(y/max,0,1).toFixed(4));
    const hero=document.querySelector('.hero');
    if(hero&&!reduce){
      const p=clamp(y/Math.max(1,hero.offsetHeight),0,1);
      const bg=hero.querySelector('.hero-bg'),front=hero.querySelector('.hero-front'),name=hero.querySelector('.hero-name');
      if(bg)bg.style.marginTop=`${p*34}px`;if(front)front.style.marginTop=`${p*58}px`;if(name)name.style.marginTop=`${p*-40}px`;
    }
    raf=requestAnimationFrame(tick);
  };
  raf=requestAnimationFrame(tick);

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8%'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const modeBtns=[...document.querySelectorAll('[data-plan-mode]')];
  const planCards=[...document.querySelectorAll('[data-plan-model]')];
  function setMode(mode){modeBtns.forEach(b=>{const on=b.dataset.planMode===mode;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))});planCards.forEach(c=>{c.hidden=c.dataset.planModel!==mode})}
  modeBtns.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.planMode)));if(modeBtns.length)setMode('managed');

  const dialog=document.querySelector('#enquiryDialog');const dialogPlan=document.querySelector('#dialogPlan');
  document.querySelectorAll('.js-enquire').forEach(btn=>btn.addEventListener('click',()=>{if(dialogPlan)dialogPlan.textContent=btn.dataset.plan||'Website project';if(dialog?.showModal)dialog.showModal()}));
  document.querySelectorAll('[data-close-dialog]').forEach(btn=>btn.addEventListener('click',()=>dialog?.close()));dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

  const workImg=document.querySelector('#journeyImage');const workTitle=document.querySelector('#journeyTitle');const workBody=document.querySelector('#journeyBody');const workOutcome=document.querySelector('#journeyOutcome');const workStep=document.querySelector('#journeyStep');
  const journey=[
    {step:'01 / DISCOVER',img:'./assets/desktop-light-home.png',title:'Make a large catalogue feel approachable.',body:'The first screen gives visitors a clear starting point instead of asking them to decode the entire catalogue at once.',outcome:'“I know where to start.”'},
    {step:'02 / FIND',img:'./assets/desktop-light-catalogue-section-00.png',title:'Turn browsing into narrowing.',body:'Product and category structure helps a buyer move from “show me yarn” to a much more specific shortlist without losing context.',outcome:'“I can actually find what fits.”'},
    {step:'03 / DECIDE',img:'./assets/desktop-light-compare.png',title:'Support the moment of comparison.',body:'The interface gives similar products enough structure to compare, reducing uncertainty before the enquiry.',outcome:'“I understand the difference.”'},
    {step:'04 / ACT',img:'./assets/desktop-light-enquiry-section-00.png',title:'Make the next step obvious.',body:'A buyer should never wonder how to ask for price, availability or quantity. Enquiry is treated as part of the product journey, not an afterthought.',outcome:'“I know exactly what to do next.”'},
    {step:'05 / ADAPT',img:'./assets/mobile-light-home-section-00.png',title:'Keep the buying logic intact on mobile.',body:'The smaller screen changes the composition, not the clarity. Navigation, discovery and contact remain obvious.',outcome:'“This still feels easy on my phone.”'}
  ];
  const journeyBtns=[...document.querySelectorAll('[data-journey]')];
  function setJourney(i){const d=journey[i];if(!d||!workImg)return;journeyBtns.forEach((b,n)=>b.classList.toggle('active',n===i));workImg.style.opacity='.35';const next=new Image();next.onload=()=>{workImg.src=d.img;workImg.alt=`FakhriMart ${d.step.toLowerCase()} screen`;workImg.style.opacity='1'};next.src=d.img;if(workTitle)workTitle.textContent=d.title;if(workBody)workBody.textContent=d.body;if(workOutcome)workOutcome.textContent=d.outcome;if(workStep)workStep.textContent=d.step}
  journeyBtns.forEach((b,i)=>b.addEventListener('click',()=>setJourney(i)));

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const id=a.getAttribute('href');if(!id||id==='#')return;const el=document.querySelector(id);if(!el)return;setTimeout(()=>el.focus?.({preventScroll:true}),500)}));
  addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
})();
