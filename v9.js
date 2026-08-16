(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

  /* global scroll UI */
  const progress=$('.v9-progress i'), nav=$('.v9-nav');
  const onScroll=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(progress) progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;
    nav?.classList.toggle('scrolled',scrollY>24);
  };
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* cursor */
  const cursor=$('.v9-cursor');
  if(cursor&&fine&&!reduce){
    let x=-80,y=-80,cx=x,cy=y,raf;
    const loop=()=>{cx+=(x-cx)*.18;cy+=(y-cy)*.18;cursor.style.transform=`translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;raf=requestAnimationFrame(loop)};
    addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;cursor.classList.add('on')},{passive:true});
    $$('a,button,input[type="range"],.v9-shot-card').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('big'));el.addEventListener('pointerleave',()=>cursor.classList.remove('big'))});
    raf=requestAnimationFrame(loop); addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  }

  /* reveal */
  const revealEls=$$('[data-v9-reveal]');
  if(reduce||!('IntersectionObserver' in window)) revealEls.forEach(el=>el.classList.add('v9-visible'));
  else{
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('v9-visible');io.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'});
    revealEls.forEach(el=>io.observe(el));
  }

  /* magnetic */
  if(fine&&!reduce){
    $$('.magnetic').forEach(el=>{
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate3d(${x*.12}px,${y*.16}px,0)`});
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }

  /* hero living field */
  const hero=$('.v9-hero'), canvas=$('#v9HeroField'), portal=$('#v9ProofPortal'), browser=$('.v9-proof-browser'), heroCopy=$('.v9-hero-copy'), heroShot=$('.v9-proof-window img');
  if(canvas&&hero&&!reduce){
    const ctx=canvas.getContext('2d'); let w=0,h=0,dpr=1,raf=0,mx=.72,my=.42;
    let pts=[];
    const resize=()=>{dpr=Math.min(devicePixelRatio||1,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.max(22,Math.min(58,Math.round(w/28)));pts=Array.from({length:count},(_,i)=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,r:Math.random()*1.4+.35,p:i*Math.random()}))};
    const draw=t=>{ctx.clearRect(0,0,w,h);const px=mx*w,py=my*h;for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;const dx=p.x-px,dy=p.y-py,d=Math.hypot(dx,dy);if(d<190){p.x+=(-dx)*.00045;p.y+=(-dy)*.00045}ctx.beginPath();ctx.fillStyle=`rgba(141,242,221,${.12+.08*Math.sin(t*.001+p.p)})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<118){ctx.beginPath();ctx.strokeStyle=`rgba(141,242,221,${(1-d/118)*.07})`;ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}raf=requestAnimationFrame(draw)};
    new ResizeObserver(resize).observe(canvas);resize();raf=requestAnimationFrame(draw);hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width;my=(e.clientY-r.top)/r.height},{passive:true});addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  }
  if(hero&&portal&&fine&&!reduce){
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;portal.style.transform=`translate3d(${x*-8}px,${y*-8}px,0)`;if(browser)browser.style.transform=`rotateY(${-5+x*5}deg) rotateX(${2-y*4}deg) translate3d(${x*9}px,${y*6}px,0)`});
    hero.addEventListener('pointerleave',()=>{portal.style.transform='';if(browser)browser.style.transform=''})
  }
  if(hero&&!reduce){
    const syncHero=()=>{const r=hero.getBoundingClientRect(),p=clamp(-r.top/(r.height*.9),0,1);if(browser)browser.style.setProperty('--hero-progress',p);if(heroCopy)heroCopy.style.transform=`translateY(${-p*34}px)`;if(heroCopy)heroCopy.style.opacity=String(1-p*.38);if(portal)portal.style.scale=String(1+p*.035);if(heroShot){const over=Math.max(0,heroShot.scrollHeight-(heroShot.parentElement?.clientHeight||0));heroShot.style.setProperty('--hero-shot-y',`${-Math.min(over,p*over*.38)}px`)}};
    addEventListener('scroll',syncHero,{passive:true});syncHero();
  }

  /* scroll-led statement */
  const trans=$('.v9-transition'), transTrack=$('.v9-transition-track');
  if(trans&&transTrack&&!reduce){
    const sync=()=>{const r=trans.getBoundingClientRect(),p=clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);transTrack.style.transform=`translateX(${-p*18}vw)`};addEventListener('scroll',sync,{passive:true});sync();
  }

  /* pricing */
  const PLAN_DATA={
    monthly:{
      launch:{badge:'LAUNCH MEMBERSHIP',price:'₹2,499',unit:'/month',setup:'+ ₹4,999 one-time setup',title:'For businesses that need a clean, credible website without another thing to manage.',best:'Best when the offer is simple and the main goal is to look trustworthy, answer the basics and make contacting you effortless.',features:['Custom responsive website','Hosting + HTTPS/SSL','WhatsApp/contact conversion path','Small ongoing content updates','Basic analytics + support']},
      grow:{badge:'GROW MEMBERSHIP',price:'₹3,999',unit:'/month',setup:'+ ₹6,999 one-time setup',title:'For businesses that want the website to keep earning trust after launch.',best:'Best for clinics, salons, wholesalers, coaches and local businesses that update services, offers or products.',features:['Up to 10 core pages','Hosting + HTTPS/SSL + monitoring','Regular content/service updates','Analytics + local SEO care','Priority support']},
      pro:{badge:'PRO MEMBERSHIP',price:'₹5,999+',unit:'/month',setup:'Custom setup',title:'For businesses where the website is part of the operating system.',best:'Best when you need a catalogue, booking, automation, integrations or more complex journeys.',features:['Advanced custom website','Catalogue / booking / CMS options','Automations + integrations','Advanced SEO support','Priority iteration and support']}
    },
    once:{
      essential:{badge:'ESSENTIAL BUILD',price:'₹9,999+',unit:'one time',setup:'Deployment included',title:'A focused website that fixes the credibility problem fast.',best:'Best for a straightforward business that needs a professional online presence and a clean enquiry path.',features:['4–5 core pages','Responsive design','WhatsApp + enquiry','Maps + basic SEO','Deployment handoff']},
      business:{badge:'BUSINESS MAKEOVER',price:'₹17,999+',unit:'one time',setup:'Scope confirmed first',title:'A full digital makeover built to make the business easier to choose.',best:'Best when the site needs stronger storytelling, proof, product/service structure and richer interaction.',features:['Custom art direction','Richer interaction + animation','Catalogue/service architecture','Analytics + local SEO foundation','Post-launch support']},
      custom:{badge:'CUSTOM BUILD',price:'₹25k–35k+',unit:'one time',setup:'Custom scope',title:'For businesses that need the website to behave like a product.',best:'Best when the project needs CMS/admin, booking, e-commerce, automation or a custom experience.',features:['Custom UX system','CMS/admin or commerce options','Advanced motion/interaction','Automation/integration options','Custom support plan']}
    }
  };
  let planMode='monthly',planKey='grow';
  const modeBtns=$$('.v9-price-mode button'),planTabs=$$('.v9-plan-tab');
  const planEls={badge:$('#v9PlanBadge'),price:$('#v9PlanPrice'),unit:$('#v9PlanUnit'),setup:$('#v9PlanSetup'),title:$('#v9PlanTitle'),best:$('#v9PlanBest'),features:$('#v9PlanFeatures'),cta:$('#v9PlanCta')};
  const renderPlan=()=>{const d=PLAN_DATA[planMode][planKey];if(!d)return;Object.entries({badge:d.badge,price:d.price,unit:d.unit,setup:d.setup,title:d.title,best:d.best}).forEach(([k,v])=>{const el=planEls[k];if(el)el.textContent=v});if(planEls.features)planEls.features.innerHTML=d.features.map(x=>`<li>${x}</li>`).join('');if(planEls.cta){planEls.cta.dataset.plan=d.badge;planEls.cta.querySelector('span').textContent=`Choose ${planKey[0].toUpperCase()+planKey.slice(1)}`};const stage=$('.v9-plan-stage');if(stage&&!reduce){stage.animate([{opacity:.72,transform:'translateY(7px)'},{opacity:1,transform:'none'}],{duration:340,easing:'cubic-bezier(.16,1,.3,1)'})}};
  modeBtns.forEach(btn=>btn.addEventListener('click',()=>{planMode=btn.dataset.mode;modeBtns.forEach(b=>b.classList.toggle('active',b===btn));planTabs.forEach(t=>t.classList.toggle('hidden',t.dataset.mode!==planMode));const candidates=planTabs.filter(t=>t.dataset.mode===planMode);const preferred=candidates.find(t=>t.classList.contains('featured'))||candidates[0];planTabs.forEach(t=>t.classList.toggle('active',t===preferred));planKey=preferred.dataset.key;renderPlan()}));
  planTabs.forEach(tab=>tab.addEventListener('click',()=>{planKey=tab.dataset.key;planTabs.forEach(t=>t.classList.toggle('active',t===tab));renderPlan()}));

  /* integrated client lab */
  const STATES=[
    {key:'discover',index:'01 / DISCOVER',title:'A large catalogue stops feeling large.',body:'The homepage turns a dense product range into something a customer can understand at a glance, with clear product context and obvious routes into discovery.',proof:['HOMEPAGE','CATEGORIES','PRODUCT CONTEXT'],outcome:'“I know where to start.”',src:'./assets/desktop-light-home-section-00.png',mode:'desktop',url:'fakhriyarns.vercel.app / home'},
    {key:'search',index:'02 / FIND',title:'Search and filters remove the dead ends.',body:'Customers can narrow the range without knowing every product name first. The website helps them move forward instead of pushing every question into WhatsApp.',proof:['CATALOGUE','SEARCH','FILTERING'],outcome:'“I’m getting closer.”',src:'./assets/desktop-light-catalogue-section-00.png',mode:'desktop',url:'fakhriyarns.vercel.app / products'},
    {key:'compare',index:'03 / DECIDE',title:'Comparison gives the buying decision a workspace.',body:'Instead of remembering three product pages, customers can evaluate choices together and arrive at the conversation with a clearer preference.',proof:['COMPARE','SHORTLIST','DECISION SUPPORT'],outcome:'“I know what I want to ask about.”',src:'./assets/desktop-light-compare.png',mode:'full',url:'fakhriyarns.vercel.app / compare'},
    {key:'enquire',index:'04 / ACT',title:'The enquiry carries the intent forward.',body:'The site is designed so product interest can become a useful enquiry instead of resetting the customer to a vague “price?” message.',proof:['ENQUIRY','PRODUCT CONTEXT','WHATSAPP'],outcome:'“They already know what I mean.”',src:'./assets/desktop-light-enquiry-section-00.png',mode:'desktop',url:'fakhriyarns.vercel.app / enquiry'},
    {key:'adapt',index:'05 / ADAPT',title:'The experience survives the screen change.',body:'Mobile is treated as a first-class experience, not a squeezed desktop layout. The structure, hierarchy and actions stay intentional.',proof:['MOBILE','RESPONSIVE','ACCESSIBLE'],outcome:'“This still feels premium on my phone.”',src:'./assets/mobile-light-home-section-00.png',mode:'mobile',url:'fakhriyarns.vercel.app / mobile'}
  ];
  let expIndex=0,deviceOverride=null;
  const featureBtns=$$('.v9-feature-btn'),device=$('#v9Device'),preview=$('#v9Preview'),deviceUrl=$('#v9DeviceUrl'),storyIndex=$('#v9StoryIndex'),storyTitle=$('#v9StoryTitle'),storyBody=$('#v9StoryBody'),storyProof=$('#v9StoryProof'),storyOutcome=$('#v9StoryOutcome'),scrub=$('#v9Scrub'),scrubValue=$('#v9ScrubValue');
  const applyExp=(idx,fromScroll=false)=>{expIndex=clamp(idx,0,STATES.length-1);const s=STATES[expIndex];featureBtns.forEach((b,i)=>{b.classList.toggle('active',i===expIndex);b.setAttribute('aria-pressed',i===expIndex?'true':'false')});if(preview){preview.parentElement?.classList.add('switching');setTimeout(()=>{preview.src=s.src;preview.alt=`Current FakhriMart ${s.key} capture`;preview.style.transform='';preview.parentElement?.classList.remove('switching')},reduce?0:90)};if(device){device.dataset.mode=deviceOverride||s.mode}if(deviceUrl)deviceUrl.textContent=s.url;if(storyIndex)storyIndex.textContent=s.index;if(storyTitle)storyTitle.textContent=s.title;if(storyBody)storyBody.textContent=s.body;if(storyProof)storyProof.innerHTML=s.proof.map(x=>`<span>${x}</span>`).join('');if(storyOutcome)storyOutcome.textContent=s.outcome;if(scrub){scrub.value='0';if(scrubValue)scrubValue.textContent='00%'}if(!fromScroll&&innerWidth<781)featureBtns[expIndex]?.scrollIntoView({behavior:reduce?'auto':'smooth',inline:'center',block:'nearest'})};
  featureBtns.forEach((b,i)=>b.addEventListener('click',()=>{deviceOverride=null;applyExp(i)}));
  $$('.v9-device-controls button').forEach(btn=>btn.addEventListener('click',()=>{const mode=btn.dataset.mode;$$('.v9-device-controls button').forEach(b=>b.classList.toggle('active',b===btn));deviceOverride=mode;if(device)device.dataset.mode=mode;if(mode==='mobile'){preview.src='./assets/mobile-light-home-section-00.png';deviceUrl.textContent='fakhriyarns.vercel.app / mobile'}else if(mode==='full'){preview.src='./assets/desktop-light-home.png';deviceUrl.textContent='fakhriyarns.vercel.app / full page'}else{const s=STATES[expIndex];preview.src=s.src;deviceUrl.textContent=s.url}if(scrub){scrub.value=0;scrub.dispatchEvent(new Event('input'))}}));
  if(scrub&&preview){const applyScrub=()=>{const frame=preview.parentElement;if(!frame)return;const v=+scrub.value,over=Math.max(0,preview.scrollHeight-frame.clientHeight);preview.style.transform=`translateY(${-over*v/100}px)`;if(scrubValue)scrubValue.textContent=String(v).padStart(2,'0')+'%'};scrub.addEventListener('input',applyScrub);addEventListener('resize',applyScrub,{passive:true})}
  const lab=$('.v9-lab');
  if(lab&&innerWidth>780&&!reduce){const syncLab=()=>{const r=lab.getBoundingClientRect(),travel=Math.max(1,r.height-innerHeight),p=clamp(-r.top/travel,0,.999),idx=Math.min(STATES.length-1,Math.floor(p*STATES.length));if(idx!==expIndex){deviceOverride=null;applyExp(idx,true)}};addEventListener('scroll',syncLab,{passive:true});syncLab()}
  if(device&&fine&&!reduce){const shell=$('.v9-device-shell');device.addEventListener('pointermove',e=>{const r=device.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;if(shell)shell.style.transform=`rotateY(${x*2.4}deg) rotateX(${y*-1.8}deg) translate3d(${x*4}px,${y*4}px,0)`});device.addEventListener('pointerleave',()=>{if(shell)shell.style.transform=''})}

  /* gallery */
  const shotDialog=$('#v9ShotDialog'),shotDialogImg=$('#v9ShotDialogImg'),shotDialogTitle=$('#v9ShotDialogTitle'),shotDialogCount=$('#v9ShotDialogCount');
  const shots=$$('.v9-shot-card');let shotIndex=0;
  const openShot=i=>{shotIndex=(i+shots.length)%shots.length;const card=shots[shotIndex];if(!card||!shotDialogImg)return;shotDialogImg.src=card.dataset.src;shotDialogImg.alt=card.dataset.alt||'FakhriMart capture';if(shotDialogTitle)shotDialogTitle.textContent=card.dataset.title||'FakhriMart capture';if(shotDialogCount)shotDialogCount.textContent=`${String(shotIndex+1).padStart(2,'0')} / ${String(shots.length).padStart(2,'0')}`;shotDialog?.showModal?.()};
  shots.forEach((card,i)=>card.addEventListener('click',()=>openShot(i)));$('#v9ShotClose')?.addEventListener('click',()=>shotDialog?.close());$('#v9ShotPrev')?.addEventListener('click',()=>openShot(shotIndex-1));$('#v9ShotNext')?.addEventListener('click',()=>openShot(shotIndex+1));shotDialog?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')openShot(shotIndex-1);if(e.key==='ArrowRight')openShot(shotIndex+1)});shotDialog?.addEventListener('click',e=>{if(e.target===shotDialog)shotDialog.close()});

  /* diagnostic */
  const testItems=$$('.v9-test-item'),countEl=$('#v9TestCount'),recEl=$('#v9TestRec'),resultBtn=$('#v9TestCta');
  const syncTest=()=>{const n=testItems.filter(x=>x.classList.contains('on')).length;if(countEl)countEl.textContent=`${n} friction point${n===1?'':'s'}`;let rec='Your website may already be covering the basics.';let plan='Launch Membership';if(n>=2){rec='You are probably losing trust or enquiries before the customer reaches you.';plan='Grow Membership'}if(n>=4){rec='This looks more like a full digital makeover than a small patch.';plan='Business Makeover'}if(recEl)recEl.textContent=rec;if(resultBtn){resultBtn.dataset.plan=plan;resultBtn.textContent=`Fix this with ${plan.replace(' Membership','')} ↗`}};
  testItems.forEach(item=>item.addEventListener('click',()=>{const on=!item.classList.contains('on');item.classList.toggle('on',on);item.setAttribute('aria-pressed',on?'true':'false');syncTest()}));syncTest();

  /* compare */
  const compareRange=$('#v9CompareRange'),compareAfter=$('.v9-compare-after'),compareLine=$('.v9-compare-line'),compareHandle=$('.v9-compare-handle');
  if(compareRange){const sync=()=>{const v=+compareRange.value;if(compareAfter)compareAfter.style.clipPath=`inset(0 0 0 ${v}%)`;if(compareLine)compareLine.style.left=`${v}%`;if(compareHandle)compareHandle.style.left=`${v}%`};compareRange.addEventListener('input',sync);sync()}

  /* dialogs / conversion */
  const planDialog=$('#v9PlanDialog'),planDialogTitle=$('#v9DialogPlan'),form=$('#v9Form');let chosenPlan='Grow Membership';
  const openPlan=plan=>{chosenPlan=plan||'Grow Membership';if(planDialogTitle)planDialogTitle.textContent=chosenPlan;planDialog?.showModal?.()};
  $$('.js-plan').forEach(btn=>btn.addEventListener('click',()=>openPlan(btn.dataset.plan||btn.textContent.trim())));$('#v9DialogClose')?.addEventListener('click',()=>planDialog?.close());planDialog?.addEventListener('click',e=>{if(e.target===planDialog)planDialog.close()});
  form?.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form),name=fd.get('name')||'',business=fd.get('business')||'',phone=fd.get('phone')||'',goal=fd.get('goal')||'';const msg=`Hi, I’m ${name}. I’m interested in ${chosenPlan} for ${business}. My WhatsApp/phone is ${phone}. Main goal: ${goal}`;window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank','noopener')});

  /* anchor smooth + robust focus */
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const id=a.getAttribute('href');if(id&&id.length>1)setTimeout(()=>$(id)?.focus?.({preventScroll:true}),450)}));
})();
