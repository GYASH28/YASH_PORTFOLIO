(() => {
'use strict';
window.__portfolioReady=true;
if(window.__portfolioBootTimer)clearTimeout(window.__portfolioBootTimer);
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,coarse=matchMedia('(pointer: coarse)').matches;

const cases=[
{num:'01',title:'LERNIO AI',kind:'AI LEARNING OPERATING SYSTEM',detail:'Lernio connects structured learning material with an AI tutor, quizzes, revision, analytics and planning in one practical student workflow.',proof:['44 subjects','241 structured lessons','AI tutor and quizzes','Live production deployment'],live:'https://lernioai.vercel.app',repo:'https://github.com/GYASH28/LERNIOAI',visual:'lernio'},
{num:'02',title:'B.R.A.C.E',kind:'PERMISSIONED DESKTOP AI COMPANION',detail:'A voice-first desktop assistant with persistent memory, visible tool activity and approval gates around file, terminal and browser actions.',proof:['Electron desktop app','Persistent memory','Voice interaction states','Permissioned tools'],live:'',repo:'https://github.com/GYASH28/brace_new',visual:'brace'},
{num:'03',title:'CAMPUSMATE',kind:'MULTI-ROLE CAMPUS PLATFORM',detail:'Attendance, notices, timetables, assignments, exams, QR workflows and analytics organized around five real campus roles.',proof:['Five user roles','QR attendance','Responsive PWA','Live deployment'],live:'https://campuscwit.vercel.app',repo:'https://github.com/GYASH28/CAMPUSMATE',visual:'campus'},
{num:'04',title:'FAKHRI MART',kind:'WHOLESALE CATALOGUE EXPERIENCE',detail:'A cinematic catalogue and enquiry system for a traditional yarn wholesaler, designed around product discovery and WhatsApp conversion.',proof:['Real client project','Product discovery','WhatsApp enquiry flow','Mobile-first design'],live:'https://fakhriyarns.vercel.app',repo:'https://github.com/GYASH28/sample-website',visual:'fakhri'},
{num:'05',title:'INTERACTIVE QUIZ',kind:'FOCUSED BROWSER LEARNING TOOL',detail:'A responsive zero-framework quiz with dynamic questions, immediate scoring and clear feedback.',proof:['Plain HTML/CSS/JS','Immediate feedback','Responsive layout','GitHub Pages'],live:'https://gyash28.github.io/WD_practical_no_20/',repo:'https://github.com/GYASH28/WD_practical_no_20',visual:'quiz'},
{num:'06',title:'CINEMATIC PORTFOLIO',kind:'MOTION-LED PERSONAL EXPERIENCE',detail:'A personal experience built around cinematic reveals, scroll choreography, 3D interaction and product storytelling.',proof:['Scroll-driven scenes','Original visual system','Responsive motion','First-party static build'],live:location.origin,repo:'https://github.com/GYASH28/YASH_PORTFOLIO',visual:'portfolio'}
];
const serviceData=[
['OPERATIONS','Remove repetitive work without breaking the workflow.','Map the current process, locate expensive friction and build an automation layer around the tools your team already uses.',['WORKFLOW AUDIT','AUTOMATION MAP','APPROVAL POINTS']],
['KNOWLEDGE','Turn scattered company information into usable answers.','Design a searchable knowledge system with visible sources, role access and useful context.',['KNOWLEDGE MAP','SEMANTIC SEARCH','SOURCE CITATIONS']],
['CUSTOMER','Create faster customer journeys that still feel human.','Build AI-assisted lead and support flows that preserve context and hand off cleanly to a person.',['LEAD FLOW','SUPPORT COPILOT','HUMAN HANDOFF']],
['PRODUCT','Move an AI idea from slide deck to working pilot.','Combine product thinking, interaction design and rapid engineering to ship a contained pilot for real users.',['PRODUCT SCOPE','PROTOTYPE','DEPLOYMENT']]
];

const intro=$('.intro'),words=$$('.intro-words span'),track=$('.intro-track i'),count=$('#intro-count'),enter=$('.enter');
let introDone=false,start=performance.now();
function finishIntro(){if(introDone)return;introDone=true;intro.classList.add('gone');document.body.classList.remove('is-loading');setTimeout(()=>intro.setAttribute('aria-hidden','true'),1000);setTimeout(()=>$('.hero').classList.add('ready'),120)}
if(reduce)finishIntro();else{
 const tick=t=>{if(introDone)return;const p=clamp((t-start)/3400,0,1);count.textContent=String(Math.round(p*100)).padStart(2,'0');track.style.transform=`scaleX(${p})`;const n=Math.min(3,Math.floor(p*4));words.forEach((w,i)=>w.classList.toggle('active',i===n));if(p>.67)enter.classList.add('ready');if(p<1)requestAnimationFrame(tick);else setTimeout(finishIntro,800)};requestAnimationFrame(tick)
}
enter.addEventListener('click',finishIntro);$('.skip-intro').addEventListener('click',finishIntro);
setInterval(()=>$('#clock').textContent=new Date().toLocaleTimeString('en-GB',{hour12:false}),1000);
if(new URLSearchParams(location.search).has('skip'))finishIntro();

function particles(canvas,max=90){if(!canvas||reduce)return;const c=canvas.getContext('2d');let w,h,p=[];
 const resize=()=>{const d=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*d;canvas.height=h*d;c.setTransform(d,0,0,d,0,0);p=Array.from({length:Math.min(max,Math.floor(w/12))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.4+.3}))};
 const draw=()=>{c.clearRect(0,0,w,h);p.forEach((q,i)=>{q.x+=q.vx;q.y+=q.vy;if(q.x<0||q.x>w)q.vx*=-1;if(q.y<0||q.y>h)q.vy*=-1;c.beginPath();c.fillStyle=i%8?'rgba(80,175,235,.42)':'rgba(255,118,38,.58)';c.arc(q.x,q.y,q.r,0,Math.PI*2);c.fill()});requestAnimationFrame(draw)};
 addEventListener('resize',resize);resize();draw()
}
particles($('#intro-canvas'),120);particles($('#ambient'),60);

const menu=$('.menu'),mobile=$('.mobile-nav');
menu.addEventListener('click',()=>{const open=!mobile.classList.contains('open');mobile.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)});
$$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');document.body.classList.remove('menu-open')}));
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=$(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:reduce?'auto':'smooth'})}}));

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.13});
$$('.reveal').forEach(e=>obs.observe(e));
addEventListener('scroll',()=>{$('.progress i').style.transform=`scaleX(${scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`},{passive:true});

if(!coarse&&!reduce){
 $$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
 $$('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1100px) rotateY(${x*5}deg) rotateX(${-y*4}deg) translateZ(3px)`;el.style.setProperty('--x',`${(x+.5)*100}%`);el.style.setProperty('--y',`${(y+.5)*100}%`)});el.addEventListener('pointerleave',()=>el.style.transform='')})
}

const modal=$('.modal');
function openCase(i){const d=cases[i];$('#case-num').textContent=`${d.num} / CASE FILE`;$('#case-title').textContent=d.title;$('#case-kind').textContent=d.kind;$('#case-detail').textContent=d.detail;$('#case-proof').innerHTML=d.proof.map(x=>`<span>✓ ${x}</span>`).join('');const live=$('#case-live');live.hidden=!d.live;live.href=d.live||'#';$('#case-repo').href=d.repo;$('#case-visual').className=`panel-visual ${d.visual}`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}
function closeCase(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
$$('.project').forEach((p,i)=>p.querySelector('.project-copy button').addEventListener('click',()=>openCase(i)));$('.close').addEventListener('click',closeCase);$('.backdrop').addEventListener('click',closeCase);addEventListener('keydown',e=>{if(e.key==='Escape')closeCase()});

$$('.service-tabs button').forEach((b,i)=>b.addEventListener('click',()=>{$$('.service-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=serviceData[i];$('#service-label').textContent=d[0];$('#service-title').textContent=d[1];$('#service-copy').textContent=d[2];$('#service-tags').innerHTML=d[3].map(x=>`<i>${x}</i>`).join('')}));

(function(){const canvas=$('#workflow'),ctx=canvas.getContext('2d'),host=$('.service-output');let w=0,h=0;
 const resize=()=>{const r=host.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)};
 const draw=t=>{ctx.clearRect(0,0,w,h);const n=[[w*.12,h*.82],[w*.43,h*.7],[w*.73,h*.5],[w*.9,h*.82]];for(let i=0;i<3;i++){ctx.beginPath();ctx.strokeStyle=i===1?'rgba(255,118,38,.55)':'rgba(70,180,255,.42)';ctx.setLineDash([6,10]);ctx.lineDashOffset=-t*.025;ctx.moveTo(...n[i]);ctx.bezierCurveTo((n[i][0]+n[i+1][0])/2,n[i][1],(n[i][0]+n[i+1][0])/2,n[i+1][1],...n[i+1]);ctx.stroke()}ctx.setLineDash([]);n.forEach((q,i)=>{ctx.beginPath();ctx.fillStyle=i===1?'#ff7626':'#46b4ff';ctx.arc(q[0],q[1],4+Math.sin(t*.003+i)*2,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)};
 addEventListener('resize',resize);resize();requestAnimationFrame(draw)
})();

(function(){
const section=$('.lab'),canvas=$('#system-canvas'),ctx=canvas.getContext('2d');let w=0,h=0,mode='sphere',target=[],from=[],links=[],blend=1,rx=-.2,ry=.35,trX=rx,trY=ry,drag=false,sx=0,sy=0,baseX=0,baseY=0,scrollP=0;
const sphere=()=>{const a=[],N=150,g=Math.PI*(3-Math.sqrt(5));for(let i=0;i<N;i++){const y=1-i/(N-1)*2,r=Math.sqrt(1-y*y),q=g*i;a.push({x:Math.cos(q)*r,y,z:Math.sin(q)*r,p:i%13===0})}return a};
const helix=()=>{const a=[];for(let s=0;s<2;s++)for(let i=0;i<80;i++){const t=i/79,q=t*Math.PI*10+s*Math.PI;a.push({x:Math.cos(q)*.65,y:(t-.5)*1.7,z:Math.sin(q)*.65,p:i%10===0})}return a};
const lattice=()=>{const a=[],N=5;for(let x=0;x<N;x++)for(let y=0;y<N;y++)for(let z=0;z<N;z++)a.push({x:(x/4-.5)*1.5,y:(y/4-.5)*1.5,z:(z/4-.5)*1.5,p:(x+y+z)%5===0});return a};
function makeLinks(m,p){const l=[];if(m==='sphere'){for(let i=0;i<p.length;i++){if(i+7<p.length)l.push([i,i+7]);if(i%4===0&&i+13<p.length)l.push([i,i+13])}}else if(m==='helix'){const n=p.length/2;for(let i=0;i<n-1;i++){l.push([i,i+1],[i+n,i+n+1]);if(i%5===0)l.push([i,i+n])}}else{const N=5,idx=(x,y,z)=>x*N*N+y*N+z;for(let x=0;x<N;x++)for(let y=0;y<N;y++)for(let z=0;z<N;z++){const a=idx(x,y,z);if(x<4)l.push([a,idx(x+1,y,z)]);if(y<4)l.push([a,idx(x,y+1,z)]);if(z<4)l.push([a,idx(x,y,z+1)])}}return l}
function fit(a,n){return Array.from({length:n},(_,i)=>a[Math.floor(i*a.length/n)]||a[a.length-1])}
function setMode(m){if(m===mode&&target.length)return;const next=m==='sphere'?sphere():m==='helix'?helix():lattice(),n=Math.max(from.length,next.length);from=from.length?fit(from,n):fit(next,n).map(p=>({...p,x:p.x*.05,y:p.y*.05,z:p.z*.05}));target=fit(next,n);links=makeLinks(m,target);mode=m;blend=0;$('#mode-label').textContent=m==='sphere'?'NEURAL SPHERE':m==='helix'?'DATA HELIX':'DECISION LATTICE';$$('.lab-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode===m))}
$$('.lab-tabs button').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
const resize=()=>{const d=Math.min(devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)};
const scroll=()=>{const r=section.getBoundingClientRect(),travel=Math.max(1,section.offsetHeight-innerHeight);scrollP=clamp(-r.top/travel,0,1);const s=Math.min(4,Math.floor(scrollP*5));$$('.lab-stages article').forEach((e,i)=>e.classList.toggle('active',i===s));$('#stage-count').textContent=String(s+1).padStart(2,'0');$('.lab-meter i b').style.transform=`scaleX(${scrollP})`;setMode(scrollP<.34?'sphere':scrollP<.68?'helix':'lattice');trY=.35+scrollP*Math.PI*2.2};
canvas.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;sy=e.clientY;baseX=trX;baseY=trY});canvas.addEventListener('pointermove',e=>{if(drag){trY=baseY+(e.clientX-sx)*.008;trX=baseX+(e.clientY-sy)*.008}});addEventListener('pointerup',()=>drag=false);
function rotate(p,x,y){const cy=Math.cos(y),sy=Math.sin(y),cx=Math.cos(x),sx=Math.sin(x),x1=p.x*cy-p.z*sy,z1=p.x*sy+p.z*cy;return{x:x1,y:p.y*cx-z1*sx,z:p.y*sx+z1*cx,p:p.p}}
const draw=t=>{requestAnimationFrame(draw);rx=lerp(rx,trX,.05);ry=lerp(ry,trY,.05);blend=Math.min(1,blend+.025);const e=1-Math.pow(1-blend,3),pts=target.map((p,i)=>{const q=from[i]||p;return{x:lerp(q.x,p.x,e),y:lerp(q.y,p.y,e),z:lerp(q.z,p.z,e),p:p.p}});if(blend>=1)from=target.map(p=>({...p}));ctx.clearRect(0,0,w,h);const cx=w*(w<820?.52:.64),cy=h*.55,scale=Math.min(w,h)*(w<820?.25:.31),cam=3.15;const pr=pts.map(p=>{const q=rotate(p,rx,ry+t*.00006),d=cam-q.z,k=cam/d;return{x:cx+q.x*scale*k,y:cy+q.y*scale*k,z:q.z,p:q.p}});links.forEach((l,i)=>{const a=pr[l[0]],b=pr[l[1]];if(!a||!b)return;ctx.beginPath();ctx.strokeStyle=i%9?'rgba(80,180,245,.16)':'rgba(255,118,38,.22)';ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()});pr.sort((a,b)=>a.z-b.z).forEach(p=>{ctx.beginPath();ctx.fillStyle=p.p?'#ff8b42':'rgba(100,200,255,.75)';ctx.arc(p.x,p.y,p.p?2.6:1.4,0,Math.PI*2);ctx.fill()})};
addEventListener('resize',resize);addEventListener('scroll',scroll,{passive:true});resize();setMode('sphere');scroll();requestAnimationFrame(draw)
})();

$('.copy').addEventListener('click',async e=>{try{await navigator.clipboard.writeText('yash.k.ganesh@gmail.com');const t=e.currentTarget.textContent;e.currentTarget.textContent='EMAIL COPIED ✓';setTimeout(()=>e.currentTarget.textContent=t,1600)}catch{location.href='mailto:yash.k.ganesh@gmail.com'}});
setTimeout(()=>$('.hero').classList.add('ready'),reduce?0:700);
})();