(() => {
  const $ = (s,c=document) => c.querySelector(s);
  const $$ = (s,c=document) => [...c.querySelectorAll(s)];
  const clamp = (n,min,max) => Math.min(max,Math.max(min,n));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;

  // Clock + progress
  const clock = $('#hudTime');
  const tickClock = () => {
    try { clock.textContent = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date()) + ' IST'; }
    catch { clock.textContent = new Date().toLocaleTimeString([], {hour12:false}); }
  };
  tickClock(); setInterval(tickClock,1000);
  const nav = $('.hud-nav');
  const prog = $('.page-progress i');
  const updateScroll = () => {
    const h=document.documentElement, max=h.scrollHeight-innerHeight;
    if(prog) prog.style.transform=`scaleX(${max?scrollY/max:0})`;
    nav?.classList.toggle('scrolled',scrollY>20);
  };
  addEventListener('scroll',updateScroll,{passive:true}); updateScroll();

  // Lenis + GSAP if available
  if(!reduced && window.Lenis){
    const lenis = new Lenis({duration:1.05,smoothWheel:true,wheelMultiplier:.9});
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    if(window.gsap && window.ScrollTrigger){ lenis.on('scroll',ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
  }
  if(window.gsap && window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger); }

  // Custom cursor
  const cursor=$('.cursor-orb');
  if(fine && cursor){
    let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});
    const loop=()=>{cx+=(tx-cx)*.22;cy+=(ty-cy)*.22;cursor.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop)};loop();
    $$('a,button,input,[data-interactive]').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});
  }

  // Magnetic buttons
  if(fine&&!reduced){
    $$('.magnetic').forEach(el=>{
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.12,y=(e.clientY-r.top-r.height/2)*.12;el.style.transform=`translate(${x}px,${y}px)`});
      el.addEventListener('pointerleave',()=>{el.style.transform=''});
    });
  }

  // Hero reactive field with light trail
  const canvas=$('#heroField'), hero=$('.hero'), coords=$('#coords');
  if(canvas && hero){
    const ctx=canvas.getContext('2d'); let dpr=Math.min(devicePixelRatio||1,2),w=0,h=0;
    const trail=[]; const ambient=[]; let px=.66,py=.45,targetX=.66,targetY=.45;
    const resize=()=>{const r=hero.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);ambient.length=0;for(let i=0;i<80;i++)ambient.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.15,a:Math.random()*.28+.04,s:(Math.random()-.5)*.08})};resize();addEventListener('resize',resize);
    const move=e=>{const r=hero.getBoundingClientRect();targetX=clamp((e.clientX-r.left)/r.width,0,1);targetY=clamp((e.clientY-r.top)/r.height,0,1);hero.style.setProperty('--gx',(targetX*100)+'%');hero.style.setProperty('--gy',(targetY*100)+'%');trail.push({x:targetX*w,y:targetY*h,life:1});if(trail.length>42)trail.shift();if(coords)coords.innerHTML=`${String(Math.round(targetX*9999)).padStart(4,'0')} X&nbsp;&nbsp;${String(Math.round(targetY*9999)).padStart(4,'0')} Y`};
    hero.addEventListener('pointermove',move,{passive:true});
    const draw=()=>{px+=(targetX-px)*.06;py+=(targetY-py)*.06;ctx.clearRect(0,0,w,h);
      for(const p of ambient){p.x+=p.s;if(p.x<0)p.x=w;if(p.x>w)p.x=0;ctx.fillStyle=`rgba(141,242,221,${p.a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}
      ctx.save();ctx.globalCompositeOperation='lighter';for(let i=1;i<trail.length;i++){const a=trail[i-1],b=trail[i];a.life*=.955;b.life*=.955;const g=ctx.createLinearGradient(a.x,a.y,b.x,b.y);g.addColorStop(0,`rgba(99,185,255,${a.life*.08})`);g.addColorStop(.55,`rgba(141,242,221,${b.life*.55})`);g.addColorStop(1,`rgba(239,194,111,${b.life*.16})`);ctx.strokeStyle=g;ctx.lineWidth=1.2+4*b.life;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
      const gx=px*w,gy=py*h;const grad=ctx.createRadialGradient(gx,gy,0,gx,gy,140);grad.addColorStop(0,'rgba(141,242,221,.11)');grad.addColorStop(.35,'rgba(99,185,255,.045)');grad.addColorStop(1,'transparent');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(gx,gy,140,0,Math.PI*2);ctx.fill();ctx.restore();requestAnimationFrame(draw)};draw();
  }

  // Hero word / plan parallax
  if(fine&&!reduced){
    hero?.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;const word=$('.hero-word');const deck=$('.hero-plans');if(word)word.style.transform=`translate3d(${nx*-13}px,${ny*-9}px,0) rotateX(${ny*-1.3}deg) rotateY(${nx*1.8}deg)`;if(deck)deck.style.transform=`translate3d(${nx*12}px,${ny*8}px,0)`});
    hero?.addEventListener('pointerleave',()=>{const word=$('.hero-word'),deck=$('.hero-plans');if(word)word.style.transform='';if(deck)deck.style.transform=''});
  }

  // Hero plan deck
  const planCards=$$('[data-plan-card]'); const dots=$$('.plan-deck-controls i'); let heroPlan=1;
  const renderHeroPlan=()=>{const n=planCards.length;planCards.forEach((card,i)=>{card.classList.remove('hero-plan-prev','hero-plan-active','hero-plan-next');card.setAttribute('aria-hidden','true');const rel=(i-heroPlan+n)%n;if(i===heroPlan){card.classList.add('hero-plan-active');card.removeAttribute('aria-hidden')}else if(rel===n-1)card.classList.add('hero-plan-prev');else card.classList.add('hero-plan-next')});dots.forEach((d,i)=>d.classList.toggle('active',i===heroPlan));$('#heroPlanCount').textContent=`${String(heroPlan+1).padStart(2,'0')} / 03`;};
  $('#heroPlanPrev')?.addEventListener('click',()=>{heroPlan=(heroPlan+planCards.length-1)%planCards.length;renderHeroPlan()});
  $('#heroPlanNext')?.addEventListener('click',()=>{heroPlan=(heroPlan+1)%planCards.length;renderHeroPlan()}); renderHeroPlan();
  if(fine){planCards.forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--px',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--py',((e.clientY-r.top)/r.height*100)+'%')}))}

  // Scroll-linked hero exit + manifesto
  const heroWord=$('.hero-word'), heroPlans=$('.hero-plans');
  const manifesto=$('.manifesto'); const manifestLines=$$('[data-manifesto]');
  const onSceneScroll=()=>{
    if(hero){const r=hero.getBoundingClientRect();const p=clamp(-r.top/(innerHeight*.95),0,1);if(heroWord&&!reduced){heroWord.style.opacity=String(1-p*.88);heroWord.style.filter=`blur(${p*7}px)`}if(heroPlans&&!reduced)heroPlans.style.opacity=String(1-p*.7)}
    if(manifesto){const rect=manifesto.getBoundingClientRect(),total=Math.max(1,manifesto.offsetHeight-innerHeight),p=clamp(-rect.top/total,0,1),idx=Math.min(manifestLines.length-1,Math.floor(p*manifestLines.length));manifestLines.forEach((l,i)=>l.classList.toggle('active',i<=idx));}
  }; addEventListener('scroll',onSceneScroll,{passive:true}); onSceneScroll();

  // Reveal observer
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -5%'});$$('.reveal').forEach(el=>io.observe(el));

  // Pricing
  const plans={
    monthly:{
      launch:{badge:'LAUNCH MEMBERSHIP',price:'₹2,499',unit:'/month',setup:'+ ₹4,999 one-time setup',title:'A sharp online presence without the maintenance headache.',best:'Best for smaller local businesses that need a focused, credible website and ongoing technical care.',features:['Up to 5 core pages','Hosting + HTTPS/SSL','Essential edits and updates','WhatsApp/contact conversion path','Standard support'],cta:'Choose Launch'},
      grow:{badge:'GROW / MOST CHOSEN',price:'₹3,999',unit:'/month',setup:'+ ₹6,999 one-time setup',title:'A website that keeps earning trust after launch.',best:'Best for clinics, salons, wholesalers, coaches and local businesses that regularly update services, offers or products.',features:['Up to 10 core pages','Hosting + SSL + monitoring','Regular content/service updates','Analytics + local SEO care','Priority support'],cta:'Choose Grow'},
      pro:{badge:'PRO MEMBERSHIP',price:'₹5,999+',unit:'/month',setup:'Custom setup',title:'More room for content, journeys and ongoing digital work.',best:'Best for businesses with larger websites, richer interaction needs or a steady flow of updates and landing pages.',features:['Expanded page allowance','Advanced interactions','Priority update capacity','Analytics + optimization care','Higher-touch support'],cta:'Discuss Pro'}
    },
    once:{
      essential:{badge:'ESSENTIAL / ONE-TIME',price:'₹9,999+',unit:'',setup:'One-time project',title:'Own a focused website that makes the business feel credible.',best:'Best when you need a clean, professional online home and do not expect frequent ongoing changes.',features:['Focused business website','Responsive design','WhatsApp/contact path','Basic SEO structure','Launch handoff'],cta:'Choose Essential'},
      business:{badge:'BUSINESS / BEST VALUE',price:'₹17,999+',unit:'',setup:'One-time project',title:'A fuller sales website built around clarity, proof and action.',best:'Best for established local businesses that need more pages, stronger proof and better conversion journeys.',features:['Expanded website structure','Custom sections/interactions','Conversion-focused UX','Analytics setup','Launch handoff'],cta:'Choose Business'},
      custom:{badge:'CUSTOM / ONE-TIME',price:'₹25k–35k+',unit:'',setup:'Scoped to project',title:'A custom experience when the normal package should not define the idea.',best:'Best for catalogues, rich interactions, unusual content structures or more ambitious digital experiences.',features:['Custom scope and IA','Advanced interaction design','Rich project/catalogue UX','Custom integrations where appropriate','Launch handoff'],cta:'Discuss Custom'}
    }
  };
  let pricingMode='monthly',pricingKey='grow';
  const renderPlan=()=>{const d=plans[pricingMode][pricingKey];$('#planBadge').textContent=d.badge;$('#planPrice').textContent=d.price;$('#planUnit').textContent=d.unit;$('#planSetup').textContent=d.setup;$('#planTitle').textContent=d.title;$('#planBest').textContent=d.best;$('#planFeatures').innerHTML=d.features.map(x=>`<li>${x}</li>`).join('');const c=$('.pricing-cta');c.textContent=d.cta.toUpperCase()+' ↗';c.dataset.plan=d.badge;$$('.plan-index').forEach(b=>{const show=b.dataset.mode===pricingMode;b.classList.toggle('hidden',!show);b.classList.toggle('active',show&&b.dataset.key===pricingKey);b.setAttribute('aria-selected',show&&b.dataset.key===pricingKey?'true':'false')});$$('.pricing-mode button').forEach(b=>{const a=b.dataset.mode===pricingMode;b.classList.toggle('active',a);b.setAttribute('aria-selected',a?'true':'false')})};
  $$('.pricing-mode button').forEach(b=>b.addEventListener('click',()=>{pricingMode=b.dataset.mode;pricingKey=pricingMode==='monthly'?'grow':'business';renderPlan()}));
  $$('.plan-index').forEach(b=>b.addEventListener('click',()=>{pricingMode=b.dataset.mode;pricingKey=b.dataset.key;renderPlan()}));renderPlan();

  // Work experience
  const workStates=[
    {step:'01 / DISCOVER',url:'fakhriyarns.vercel.app /',src:'./assets/v9-fakhri-home-full.png',alt:'Current FakhriMart homepage',title:'A large catalogue stops feeling large.',body:'The homepage creates an obvious starting point, so a dense range feels explorable instead of overwhelming.',chips:['HOMEPAGE','CATEGORIES','CONTEXT'],outcome:'“I know where to start.”'},
    {step:'02 / FIND',url:'fakhriyarns.vercel.app / products',src:'./assets/v9-fakhri-products-full.png',alt:'Current FakhriMart products catalogue',title:'Finding the right yarn becomes a guided action.',body:'Search, categories and product context reduce the amount of scanning a buyer has to do before something feels relevant.',chips:['PRODUCTS','FILTERING','SEARCH'],outcome:'“I can narrow this down.”'},
    {step:'03 / DECIDE',url:'fakhriyarns.vercel.app / compare',src:'./assets/v9-fakhri-compare-full.png',alt:'Current FakhriMart compare experience',title:'Comparison turns browsing into confidence.',body:'Giving customers a structured way to compare options makes the next decision easier than opening five tabs and remembering everything.',chips:['COMPARE','DECISION SUPPORT','DETAIL'],outcome:'“I know which option fits.”'},
    {step:'04 / ACT',url:'fakhriyarns.vercel.app / enquiry',src:'./assets/v9-fakhri-enquiry-full.png',alt:'Current FakhriMart enquiry experience',title:'The enquiry carries context into the conversation.',body:'The journey does not end at “Contact us.” Product and intent context move with the customer into the enquiry step.',chips:['ENQUIRY','WHATSAPP','CONTEXT'],outcome:'“I can ask without starting over.”'},
    {step:'05 / ADAPT',url:'fakhriyarns.vercel.app / mobile',src:'./assets/v9-fakhri-mobile-home-full.png',alt:'Current FakhriMart mobile homepage',title:'The mobile experience keeps the same hierarchy.',body:'The small-screen version preserves the important decisions instead of becoming a squeezed copy of desktop.',chips:['MOBILE','RESPONSIVE','TOUCH'],outcome:'“This works naturally on my phone.”'}
  ];
  let workIndex=0,workToken=0; const workImg=$('#workImage'),workScreen=$('#workScreen'),scrub=$('#workScrub');
  const positionScreenshot=()=>{if(!workImg||!scrub)return;const vp=$('.screen-viewport');const overflow=Math.max(0,workImg.offsetHeight-vp.clientHeight);const y=-overflow*(+scrub.value/100);workImg.style.transform=`translateY(${y}px)`;$('#workScrubValue').textContent=String(Math.round(+scrub.value)).padStart(2,'0')+'%'};
  scrub?.addEventListener('input',positionScreenshot);addEventListener('resize',positionScreenshot);
  const renderWork=async(idx,scrollToZero=true)=>{workIndex=idx;const s=workStates[idx];$$('.work-index button').forEach((b,i)=>b.classList.toggle('active',i===idx));$('#workStep').textContent=s.step;$('#workUrl').textContent=s.url;$('#workTitle').textContent=s.title;$('#workBody').textContent=s.body;$('#workChips').innerHTML=s.chips.map(x=>`<span>${x}</span>`).join('');$('#workOutcome').textContent=s.outcome;if(scrollToZero&&scrub){scrub.value=0;positionScreenshot()}const token=++workToken;workScreen?.classList.add('switching');const pre=new Image();pre.src=s.src;try{await pre.decode()}catch{}if(token!==workToken)return;workImg.src=s.src;workImg.alt=s.alt;requestAnimationFrame(()=>{positionScreenshot();setTimeout(()=>workScreen?.classList.remove('switching'),450)})};
  $$('.work-index button').forEach((b,i)=>b.addEventListener('click',()=>renderWork(i)));
  const workLab=$('.work-lab');
  const updateWorkScroll=()=>{if(!workLab)return;const r=workLab.getBoundingClientRect(),range=Math.max(1,workLab.offsetHeight-innerHeight),p=clamp(-r.top/range,0,1),idx=Math.min(workStates.length-1,Math.floor(p*workStates.length));if(idx!==workIndex)renderWork(idx,false)};addEventListener('scroll',updateWorkScroll,{passive:true});

  // Website test
  const auditBtns=$$('#auditQuestions button');
  const auditCopy=[
    {h:'Your basics may already be doing their job.',p:'Nothing selected yet. If this is accurate, a focused Launch-style refresh may be enough.'},
    {h:'There is one obvious leak.',p:'A focused makeover can usually solve one clear friction point without rebuilding everything.'},
    {h:'The website is making the business work harder.',p:'Two visible friction points usually justify a more structured redesign and stronger conversion path.'},
    {h:'A Grow-level rebuild makes sense.',p:'Several core signals are weak. Fixing them together is more effective than patching each symptom separately.'},
    {h:'The current experience is probably costing trust.',p:'At four friction points, the website is likely under-representing the business. A fuller rebuild is the cleaner move.'},
    {h:'This needs a proper rebuild.',p:'All five signals point to structural UX and maintenance friction. A Business or custom rebuild is the sensible conversation.'}
  ];
  const renderAudit=()=>{const count=auditBtns.filter(b=>b.classList.contains('active')).length,d=auditCopy[count];$('#auditResult strong').textContent=String(count).padStart(2,'0');$('#auditResult h3').textContent=d.h;$('#auditResult p').textContent=d.p};
  auditBtns.forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('active');b.setAttribute('aria-pressed',b.classList.contains('active')?'true':'false');renderAudit()}));renderAudit();

  // Before/after
  const range=$('#compareRange'),after=$('#compareAfter'),line=$('#compareLine');const setCompare=v=>{v=clamp(+v,4,96);after.style.clipPath=`inset(0 0 0 ${v}%)`;line.style.left=v+'%'};range?.addEventListener('input',e=>setCompare(e.target.value));setCompare(range?.value||52);

  // Dialog + WhatsApp
  const dialog=$('#enquiryDialog'),selected=$('#selectedPlan');
  $$('.js-enquire').forEach(b=>b.addEventListener('click',()=>{if(selected)selected.value=b.dataset.plan||'Website enquiry';dialog?.showModal()}));
  $('#sendEnquiry')?.addEventListener('click',()=>{const name=$('#leadName').value.trim(),biz=$('#leadBusiness').value.trim(),need=$('#leadNeed').value.trim(),plan=selected?.value||'Website enquiry';const lines=[`Hi YKG Digital, I want to discuss: ${plan}.`,name?`Name: ${name}`:'',biz?`Business: ${biz}`:'',need?`What I need: ${need}`:''].filter(Boolean);open('https://wa.me/?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener');});

  const details=$$('.faq-list details');details.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)details.forEach(o=>{if(o!==d)o.open=false})}));

  // Final ambient canvas
  const fc=$('#finalField');if(fc){const c=fc.getContext('2d');let w=0,h=0,dpr=Math.min(devicePixelRatio||1,2),pts=[];const resize=()=>{w=fc.clientWidth;h=fc.clientHeight;fc.width=w*dpr;fc.height=h*dpr;c.setTransform(dpr,0,0,dpr,0,0);pts=Array.from({length:65},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.2,a:Math.random()*.25+.04}))};resize();addEventListener('resize',resize);const draw=()=>{c.clearRect(0,0,w,h);for(const p of pts){c.fillStyle=`rgba(141,242,221,${p.a})`;c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill()}requestAnimationFrame(draw)};draw()}
})();