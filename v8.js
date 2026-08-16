(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

  // V8 keeps the opening as a quick brand beat, never a gate. Clicking Skip
  // removes it immediately and a hard timeout prevents slow/failed animation
  // libraries from trapping the actual hero behind the overlay.
  const intro=$('#intro');
  const introSkip=$('#introSkip');
  const killIntro=()=>{
    if(!intro || !intro.isConnected) return;
    intro.dataset.done='1';
    try{sessionStorage.setItem('ykg-v4-intro','1')}catch{}
    intro.remove();
  };
  introSkip?.addEventListener('click',killIntro,{capture:true});
  if(reduce) killIntro();
  else setTimeout(killIntro,1250);

  const hero=$('.hero-v8');
  if(!hero) return;

  const transition=document.createElement('div'); transition.className='hero-v8-transition'; hero.appendChild(transition);

  const canvas=$('#heroField');
  if(canvas && !reduce){
    const ctx=canvas.getContext('2d',{alpha:true}); let dpr=Math.min(devicePixelRatio||1,2),w=0,h=0;
    let mouse={x:.68,y:.48,tx:.68,ty:.48,active:false};
    const pts=Array.from({length:42},(_,i)=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00009,vy:(Math.random()-.5)*.00009,r:Math.random()*1.35+.45,a:Math.random()*.24+.05,p:i*Math.PI*.37}));
    const resize=()=>{w=hero.clientWidth;h=hero.clientHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}; resize(); addEventListener('resize',resize,{passive:true});
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mouse.tx=(e.clientX-r.left)/r.width;mouse.ty=(e.clientY-r.top)/r.height;mouse.active=true;hero.style.setProperty('--mx',(mouse.tx*100).toFixed(2)+'%');hero.style.setProperty('--my',(mouse.ty*100).toFixed(2)+'%')});
    hero.addEventListener('pointerleave',()=>{mouse.tx=.68;mouse.ty=.48;mouse.active=false});
    const draw=t=>{mouse.x+=(mouse.tx-mouse.x)*.055;mouse.y+=(mouse.ty-mouse.y)*.055;ctx.clearRect(0,0,w,h);
      pts.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<-.03||p.x>1.03)p.vx*=-1;if(p.y<-.03||p.y>1.03)p.vy*=-1;const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.hypot(dx*w,dy*h);if(mouse.active&&dist<240){const f=(240-dist)/240;p.x+=dx*.00013*f;p.y+=dy*.00013*f}const px=p.x*w,py=p.y*h;ctx.beginPath();ctx.fillStyle=`rgba(141,242,221,${p.a*(.55+.45*Math.sin(t*.00055+p.p))})`;ctx.arc(px,py,p.r,0,Math.PI*2);ctx.fill();for(let j=i+1;j<pts.length;j++){const q=pts[j],dd=Math.hypot((p.x-q.x)*w,(p.y-q.y)*h);if(dd<105){ctx.beginPath();ctx.strokeStyle=`rgba(255,255,255,${(1-dd/105)*.025})`;ctx.moveTo(px,py);ctx.lineTo(q.x*w,q.y*h);ctx.stroke();}}}); requestAnimationFrame(draw)}; requestAnimationFrame(draw);
  }

  if(fine && !reduce){hero.addEventListener('pointerdown',()=>hero.classList.add('is-pressed'));addEventListener('pointerup',()=>hero.classList.remove('is-pressed'))}

  const lines=$$('.hero-v8-line i'), small=$$('.hero-v8-topline,.hero-v8-sub,.hero-v8-bottom,.hero-v8-lens-copy');
  if(window.gsap && !reduce){
    gsap.set(lines,{yPercent:112}); gsap.set(small,{opacity:0,y:14});
    gsap.timeline({delay:.18}).to(lines,{yPercent:0,duration:.92,stagger:.08,ease:'power4.out'}).to(small,{opacity:1,y:0,duration:.58,stagger:.05,ease:'power3.out'},'-=.5').add(()=>hero.classList.add('is-entered'));
    const art=$('#heroArt'); if(art) gsap.to(art,{scale:1.06,yPercent:7,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
    gsap.to(transition,{scale:Math.max(innerWidth,innerHeight)*3.25,duration:1,ease:'none',scrollTrigger:{trigger:hero,start:'72% top',end:'bottom top',scrub:true}});
    gsap.to('.hero-v8-copy',{yPercent:-18,opacity:.22,ease:'none',scrollTrigger:{trigger:hero,start:'48% top',end:'bottom top',scrub:true}});
  }else{hero.classList.add('is-entered');lines.forEach(x=>x.style.transform='none')}

  const plan=$('.plan-stage'); if(plan && fine && !reduce){plan.addEventListener('pointermove',e=>{const r=plan.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;plan.style.setProperty('--px',x*100+'%');plan.style.setProperty('--py',y*100+'%')})}

  const plans=$('#plans'), work=$('#work');
  if(plans && work && !$('.v8-kinetic')){const band=document.createElement('section');band.className='v8-kinetic';band.setAttribute('aria-hidden','true');band.innerHTML='<div class="v8-kinetic-track"><span>CLEAR OFFER</span><i></i><span>real proof</span><i></i><span>OBVIOUS ACTION</span><i></i><span>less friction</span><i></i><span>CLEAR OFFER</span><i></i><span>real proof</span><i></i><span>OBVIOUS ACTION</span><i></i><span>less friction</span></div>';work.before(band);if(window.gsap && !reduce){const track=$('.v8-kinetic-track',band);gsap.fromTo(track,{xPercent:-8},{xPercent:-52,ease:'none',scrollTrigger:{trigger:band,start:'top bottom',end:'bottom top',scrub:1}})}}

  // The base layer already animates pricing, tests, comparison and process rows.
  // V8 only owns reveals that are unique to the new experience, avoiding the
  // blurry/double-animation effect seen in Playwright screenshots.
  const revealTargets=$$('.work-copy,.case-stage,.transform-principles,.process-head');
  revealTargets.forEach(el=>el.classList.add('v8-reveal'));
  if(reduce||!('IntersectionObserver'in window)){revealTargets.forEach(el=>el.classList.add('is-visible'))}else{const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target)}}),{threshold:.08,rootMargin:'0px 0px -4%'});revealTargets.forEach(el=>io.observe(el))}

  const shots=$$('.case-shot'); if(window.gsap && !reduce && shots.length){const mo=new MutationObserver(records=>records.forEach(rec=>{if(rec.type==='attributes'&&rec.target.classList.contains('active'))gsap.fromTo(rec.target,{clipPath:'inset(0 0 0 100%)',scale:1.05},{clipPath:'inset(0 0 0 0%)',scale:1,duration:.72,ease:'power4.out',overwrite:true})})); shots.forEach(s=>mo.observe(s,{attributes:true,attributeFilter:['class']}))}

  // Older layers each registered their own work-section ScrollTrigger. Kill
  // those overlapping controllers and replace them with one authoritative V8
  // controller that drives the existing accessible stage buttons.
  const workRoot=$('.work-v7');
  const caseButtons=$$('.case-progress button');
  if(workRoot && window.ScrollTrigger && !reduce && caseButtons.length){
    ScrollTrigger.getAll().forEach(trigger=>{if(trigger.trigger===workRoot)trigger.kill()});
    let active=-1;
    ScrollTrigger.create({
      trigger:workRoot,
      start:'top top',
      end:'bottom bottom',
      onUpdate:self=>{
        const next=Math.min(caseButtons.length-1,Math.floor(self.progress*caseButtons.length));
        if(next===active)return;
        active=next;
        caseButtons[next]?.click();
      }
    });
  }

  const cursor=$('.v7-cursor'); if(cursor&&fine&&!reduce){$$('.case-stage,.compare-theatre').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('is-view'));el.addEventListener('pointerleave',()=>cursor.classList.remove('is-view'))})}

  $$('.plan-tab').forEach(tab=>tab.addEventListener('click',()=>{if(window.gsap&&!reduce){gsap.fromTo(tab,{scale:.98},{scale:1.025,duration:.4,ease:'back.out(1.8)'});const stage=$('.plan-stage');if(stage)gsap.fromTo(stage,{y:7,opacity:.9},{y:0,opacity:1,duration:.46,ease:'power3.out'})}}));
})();