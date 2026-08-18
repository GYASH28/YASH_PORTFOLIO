(()=>{
'use strict';
const d=document,w=window,root=d.documentElement;
const reduced=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=w.matchMedia('(pointer: coarse)').matches;
const q=(s,c=d)=>c.querySelector(s),qa=(s,c=d)=>[...c.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

// Media and external-link hardening.
qa('img').forEach(img=>{if(!img.hasAttribute('decoding'))img.decoding='async';});
qa('iframe').forEach(f=>{if(!f.hasAttribute('loading'))f.loading='lazy';if(!f.hasAttribute('title'))f.title='Embedded project preview';});
qa('a[target="_blank"]').forEach(a=>{const r=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));r.add('noopener');r.add('noreferrer');a.setAttribute('rel',[...r].join(' '));});

// Intro impresses once per session, never blocks the page indefinitely.
const loader=q('.intro-loader');
try{
  if(loader&&sessionStorage.getItem('brayroai-intro-seen')){loader.classList.add('is-done');loader.setAttribute('aria-hidden','true');}
  else if(loader){sessionStorage.setItem('brayroai-intro-seen','1');setTimeout(()=>loader.classList.add('is-done'),1700);}
}catch(_){if(loader)setTimeout(()=>loader.classList.add('is-done'),1700);}
setTimeout(()=>{if(loader){loader.classList.add('is-done');loader.style.pointerEvents='none';}},2500);

// Pointer-reactive ambient light, rAF throttled.
let px=w.innerWidth*.5,py=w.innerHeight*.35,tx=px,ty=py,pr=0,idleTimer;
const pointerFrame=()=>{px+=(tx-px)*.13;py+=(ty-py)*.13;root.style.setProperty('--brx',px+'px');root.style.setProperty('--bry',py+'px');pr=0;};
if(!coarse&&!reduced){w.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;d.body.classList.remove('br-is-idle');clearTimeout(idleTimer);idleTimer=setTimeout(()=>d.body.classList.add('br-is-idle'),1200);if(!pr)pr=requestAnimationFrame(pointerFrame);},{passive:true});}

// Add unobtrusive progress lines to sections.
const sections=qa('section[id],main section').filter((s,i,a)=>a.indexOf(s)===i);
sections.forEach(s=>{if(!q(':scope > .br-section-line',s)){const line=d.createElement('i');line.className='br-section-line';line.setAttribute('aria-hidden','true');s.prepend(line);}});

// Scroll HUD, scrollspy, and smarter nav hide/reveal.
const hudName=q('.br-hud__chapter'),hudPct=q('.br-hud__meter b');
let lastY=w.scrollY,sr=0;
function scrollFrame(){
  const max=Math.max(1,d.documentElement.scrollHeight-w.innerHeight),p=clamp(w.scrollY/max,0,1);
  root.style.setProperty('--br-progress',p);if(hudPct)hudPct.textContent=Math.round(p*100);
  const probe=w.scrollY+w.innerHeight*.42;let active=null;
  sections.forEach(s=>{const top=s.offsetTop,h=s.offsetHeight;if(probe>=top&&probe<top+h){active=s;s.style.setProperty('--br-section-progress',clamp((probe-top)/Math.max(h,1),0,1));}});
  if(active){
    const label=(q('.eyebrow,.micro',active)?.textContent||active.id||'BRAYROAI').replace(/\s+/g,' ').trim();
    if(hudName)hudName.textContent=label.slice(0,40);
    qa('.desktop-nav a[href^="#"]').forEach(a=>{if(a.getAttribute('href')==='#'+active.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  }
  const nav=q('.site-nav'),y=w.scrollY;if(nav&&Math.abs(y-lastY)>8){if(y>lastY&&y>180)nav.classList.add('hidden');else nav.classList.remove('hidden');}lastY=y;sr=0;
}
w.addEventListener('scroll',()=>{if(!sr)sr=requestAnimationFrame(scrollFrame);},{passive:true});scrollFrame();

// Improved reveal choreography with safe fallback.
qa('.reveal').forEach(el=>el.classList.add('br-reveal-ready'));
if('IntersectionObserver'in w){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible','visible');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});qa('.reveal.br-reveal-ready').forEach(el=>io.observe(el));}
else qa('.reveal.br-reveal-ready').forEach(el=>el.classList.add('is-visible','visible'));

// Pointer spotlight + restrained 3D depth on interactive cards.
if(!coarse&&!reduced){qa('.project-card,.capability-card,.lab-card,.process-card,.proof-card,.service-card,[data-tilt]').forEach(card=>{
  card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--mx',x*100+'%');card.style.setProperty('--my',y*100+'%');card.style.setProperty('--ry',((x-.5)*5).toFixed(2)+'deg');card.style.setProperty('--rx',((.5-y)*4).toFixed(2)+'deg');card.classList.add('br-tilting');},{passive:true});
  card.addEventListener('pointerleave',()=>{card.classList.remove('br-tilting');card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');});
});}

// Kinetic headings respond to section position, not every pointer pixel.
const kinetic=qa('.hero h1,.manifesto h2,.work h2,.about h2,.cta h2').slice(0,8);kinetic.forEach(h=>h.classList.add('br-kinetic'));
if(!reduced&&'IntersectionObserver'in w){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const r=e.target.getBoundingClientRect(),off=clamp((r.top/w.innerHeight-.5)*-8,-6,6);e.target.style.setProperty('--br-head-y',off+'px');}}),{threshold:[0,.5,1]});kinetic.forEach(h=>io.observe(h));}

// Magnetic controls, capped at a few pixels.
if(!coarse&&!reduced){qa('.button,.nav-cta,.text-link').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))/r.width,y=(e.clientY-(r.top+r.height/2))/r.height;el.style.transform='translate3d('+(x*6).toFixed(2)+'px,'+(y*5).toFixed(2)+'px,0)';},{passive:true});
  el.addEventListener('pointerleave',()=>el.style.transform='');
});}

// Tactile click ripple.
d.addEventListener('pointerdown',e=>{if(reduced||!e.target.closest('a,button,[role="button"]'))return;const r=d.createElement('i');r.className='br-ripple';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';d.body.appendChild(r);setTimeout(()=>r.remove(),650);},{passive:true});

// Sparse cursor sparks — throttled, desktop only.
let sparkAt=0;if(!coarse&&!reduced){w.addEventListener('pointermove',e=>{const n=performance.now();if(n-sparkAt<95)return;sparkAt=n;if(Math.random()>.34)return;const s=d.createElement('i');s.className='br-spark';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';s.style.setProperty('--sx',(Math.random()*18-9)+'px');s.style.setProperty('--sy',(Math.random()*24+8)+'px');d.body.appendChild(s);setTimeout(()=>s.remove(),700);},{passive:true});}

// Command palette: Ctrl/Cmd+K navigation.
const cmd=q('[data-br-command]'),input=q('[data-br-command-input]'),items=q('[data-br-command-items]'),empty=q('[data-br-command-empty]');
const navItems=qa('.desktop-nav a[href^="#"],.mobile-menu a[href^="#"]').map(a=>({href:a.getAttribute('href'),label:a.textContent.replace(/\d+/g,'').replace(/\s+/g,' ').trim()})).filter((v,i,a)=>v.href&&v.href!=='#'&&a.findIndex(x=>x.href===v.href)===i);
if(items)navItems.forEach((it,i)=>{const b=d.createElement('button');b.type='button';b.className='br-command__item';b.dataset.href=it.href;b.innerHTML='<b>'+String(i+1).padStart(2,'0')+'</b><strong>'+(it.label||it.href.slice(1))+'</strong><em>↵</em>';items.appendChild(b);});
let previousFocus=null;
function setCommand(open){if(!cmd)return;cmd.classList.toggle('open',open);cmd.setAttribute('aria-hidden',String(!open));if(open){previousFocus=d.activeElement;d.body.style.overflow='hidden';setTimeout(()=>input&&input.focus(),40);}else{d.body.style.overflow='';if(previousFocus&&previousFocus.focus)previousFocus.focus();}}
q('[data-br-command-open]')?.addEventListener('click',()=>setCommand(true));
cmd?.addEventListener('click',e=>{if(e.target===cmd)setCommand(false);const b=e.target.closest('.br-command__item');if(b){setCommand(false);q(b.dataset.href)?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});}});
input?.addEventListener('input',()=>{const v=input.value.toLowerCase().trim();let shown=0;qa('.br-command__item',items||d).forEach(b=>{const ok=!v||b.textContent.toLowerCase().includes(v);b.hidden=!ok;if(ok)shown++;});if(empty)empty.style.display=shown?'none':'block';});
d.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setCommand(!cmd?.classList.contains('open'));}if(e.key==='Escape'&&cmd?.classList.contains('open'))setCommand(false);});

// Close mobile menu after same-page navigation.
qa('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const m=q('.mobile-menu');if(m?.classList.contains('open')){m.classList.remove('open');d.body.classList.remove('menu-open');q('.menu-button')?.setAttribute('aria-expanded','false');}}));

root.classList.add('brayroai-ready');
})();
