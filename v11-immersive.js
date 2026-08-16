(()=>{
  const root=document.documentElement;
  const body=document.body;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;
  body.classList.add('v11');

  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  const lerp=(a,b,t)=>a+(b-a)*t;

  const optical=document.createElement('div');
  optical.className='v11-optical-frame';
  optical.setAttribute('aria-hidden','true');
  optical.innerHTML='<div class="v11-side-warp"></div><div class="v11-scanline"></div>';
  body.append(optical);
  const velocityField=document.createElement('div');
  velocityField.className='v11-velocity-field';velocityField.setAttribute('aria-hidden','true');body.prepend(velocityField);

  ['manifesto','plans','work','audit','transform'].forEach(id=>{
    const target=document.getElementById(id);if(!target)return;
    const p=document.createElement('div');p.className='v11-scene-portal';p.setAttribute('aria-hidden','true');target.before(p);
  });

  const heroWord=document.querySelector('.hero-word');
  if(heroWord){['a','b','c'].forEach(cls=>{const g=document.createElement('div');g.className=`v11-hero-ghost ${cls}`;g.innerHTML=heroWord.innerHTML;heroWord.append(g)})}

  const manifestoSticky=document.querySelector('.manifesto-sticky');
  if(manifestoSticky){const m=document.createElement('i');m.className='v11-depth-mark';m.setAttribute('aria-hidden','true');manifestoSticky.append(m)}

  [['plans','.shell'],['audit','.shell'],['transform','.shell'],['process','.shell'],['faq','.shell'],['final','.shell']].forEach(([id,sel])=>{
    const s=document.getElementById(id)||document.querySelector(`.${id}`);if(!s)return;
    const inner=s.querySelector(sel);if(!inner||inner.classList.contains('v11-scene-surface'))return;
    s.dataset.v11Scene='';inner.classList.add('v11-scene-surface');
  });

  let px=.5,py=.5,tx=.5,ty=.5;
  addEventListener('pointermove',e=>{tx=e.clientX/innerWidth;ty=e.clientY/innerHeight},{passive:true});
  let lastY=scrollY,rawVel=0,vel=0,bend=0,lastT=performance.now();

  const hero=document.querySelector('.hero');
  const manifesto=document.querySelector('.manifesto');
  const plans=document.querySelector('.plans');
  const work=document.querySelector('.work');
  const compare=document.querySelector('.compare');
  const final=document.querySelector('.final-cta');
  const pricingStage=document.querySelector('.pricing-stage');
  const workScreen=document.querySelector('.work-screen');
  const workStory=document.querySelector('.work-story');
  const workIndex=document.querySelector('.work-index');
  const manifestoLines=[...document.querySelectorAll('.manifesto-lines p')];
  const portals=[...document.querySelectorAll('.v11-scene-portal')];
  const scenes=[...document.querySelectorAll('[data-v11-scene]')];

  function sceneProgress(el){const r=el.getBoundingClientRect();return clamp((innerHeight-r.top)/(innerHeight+r.height),0,1)}
  function activeDistance(el){const r=el.getBoundingClientRect();const c=r.top+r.height/2;return clamp(Math.abs(c-innerHeight/2)/(innerHeight*.95),0,1)}

  function tick(now){
    const dt=Math.max(8,Math.min(34,now-lastT));lastT=now;
    px=lerp(px,tx,.11);py=lerp(py,ty,.11);
    const y=scrollY;rawVel=(y-lastY)/(dt/16.67);lastY=y;vel=lerp(vel,rawVel,.16);
    const targetBend=reduce?0:clamp(Math.abs(vel)/24,0,1);bend=lerp(bend,targetBend,.13);
    root.style.setProperty('--v11-velocity',vel.toFixed(3));
    root.style.setProperty('--v11-bend',bend.toFixed(4));
    root.style.setProperty('--v11-pointer-x',px.toFixed(4));
    root.style.setProperty('--v11-pointer-y',py.toFixed(4));

    if(hero){const r=hero.getBoundingClientRect();const fold=clamp((-r.top)/(Math.max(1,r.height*.78)),0,1);root.style.setProperty('--v11-fold',fold.toFixed(4))}

    portals.forEach(p=>{const r=p.getBoundingClientRect();const center=r.top+r.height/2;const pr=1-clamp(Math.abs(center-innerHeight/2)/(innerHeight*.45),0,1);p.style.setProperty('--portal',pr.toFixed(4))});

    scenes.forEach(s=>{
      const d=activeDistance(s),rr=s.getBoundingClientRect(),sign=(rr.top+rr.height/2)<innerHeight/2?-1:1;
      const tilt=reduce?0:sign*d*4.8+clamp(vel,-15,15)*.045;
      s.style.setProperty('--scene-tilt',`${tilt.toFixed(3)}deg`);
      s.style.setProperty('--scene-scale',(1-d*.026).toFixed(4));
      s.style.setProperty('--scene-y',`${(sign*d*18).toFixed(2)}px`);
      s.style.setProperty('--scene-depth',`${(-d*70).toFixed(2)}px`);
    });

    if(manifesto&&manifestoLines.length){
      const r=manifesto.getBoundingClientRect();const total=Math.max(1,r.height-innerHeight);const p=clamp(-r.top/total,0,1);
      manifestoLines.forEach((line,i)=>{
        const center=i/(manifestoLines.length-1),local=(p-center)*3.1,z=clamp(-Math.abs(local)*260+105,-420,105),yy=local*-42,rot=clamp(local*5.5,-12,12),op=clamp(1-Math.abs(local)*.52,.12,1),blur=clamp(Math.abs(local)*2.2,0,5.5);
        line.style.transform=`translate3d(0,${yy}px,${z}px) rotateX(${rot}deg) scale(${1+z/3400})`;
        line.style.opacity=op;line.style.filter=`blur(${blur}px)`;line.style.setProperty('--m-glow',(1-Math.abs(local)).toFixed(3));
      });
    }

    if(pricingStage&&plans){const d=1-activeDistance(plans);pricingStage.style.setProperty('--v11-plan-tilt-x',((px-.5)*-3*d).toFixed(3));pricingStage.style.setProperty('--v11-plan-tilt-y',((py-.5)*2*d+clamp(vel,-10,10)*.045).toFixed(3));pricingStage.style.setProperty('--v11-plan-depth',(d*22).toFixed(2))}

    if(work&&workScreen){const d=1-activeDistance(work),curve=reduce?0:clamp(bend*.8+d*.18,0,.82),ry=(px-.5)*4.8*d;workScreen.style.setProperty('--v11-work-curve',curve.toFixed(4));workScreen.style.setProperty('--v11-work-rx',(((py-.5)*-2.4*d)+clamp(vel,-12,12)*.035).toFixed(3));workScreen.style.setProperty('--v11-work-ry',ry.toFixed(3));if(workStory)workStory.style.setProperty('--v11-work-ry',ry.toFixed(3));if(workIndex)workIndex.style.setProperty('--v11-work-ry',ry.toFixed(3))}

    if(compare){const d=1-activeDistance(compare.closest('.transform')||compare);compare.style.setProperty('--v11-compare-rx',((py-.5)*1.8*d).toFixed(3));compare.style.setProperty('--v11-compare-ry',((px-.5)*-2.8*d).toFixed(3))}
    if(final){const p=sceneProgress(final);final.style.setProperty('--v11-final-z',(p*95).toFixed(2))}
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  const deck=document.getElementById('planDeck'),prev=document.getElementById('heroPlanPrev'),next=document.getElementById('heroPlanNext');
  if(deck){let down=false,startX=0,dx=0;deck.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;dx=0;deck.setPointerCapture?.(e.pointerId)});deck.addEventListener('pointermove',e=>{if(!down)return;dx=clamp(e.clientX-startX,-110,110);deck.style.setProperty('--v11-deck-drag',`${dx}px`)});const end=()=>{if(!down)return;down=false;if(dx>42)prev?.click();else if(dx<-42)next?.click();dx=0;deck.style.setProperty('--v11-deck-drag','0px')};deck.addEventListener('pointerup',end);deck.addEventListener('pointercancel',end);deck.addEventListener('lostpointercapture',end)}
  if(deck&&fine){let locked=false;deck.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)<22||locked||e.shiftKey||e.ctrlKey||e.metaKey)return;locked=true;(e.deltaY>0?next:prev)?.click();setTimeout(()=>locked=false,520)},{passive:true})}

  document.querySelectorAll('.pricing-detail,.audit-panel,.process-card,.faq details').forEach(card=>{if(!fine)return;card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${(-y*1.8).toFixed(2)}deg) rotateY(${(x*2.4).toFixed(2)}deg) translateZ(4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
})();
