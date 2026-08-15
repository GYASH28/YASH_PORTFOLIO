(() => {
  'use strict';
  const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;

  const veil=document.createElement('div');
  veil.className='page-veil'; veil.setAttribute('aria-hidden','true');
  veil.innerHTML='<span>YKG</span>';
  document.body.appendChild(veil);
  requestAnimationFrame(()=>document.body.classList.add('v6-ready'));
  $$('a[href$="experience.html"],a[href$="index.html"]').forEach(a=>a.addEventListener('click',e=>{
    if(reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target==='_blank') return;
    const url=new URL(a.href,location.href); if(url.origin!==location.origin)return;
    e.preventDefault(); document.body.classList.add('page-leaving');
    setTimeout(()=>location.href=url.href,360);
  }));

  const compare=$('#compare'),range=$('#compareRange'),after=$('#compareAfter'),handle=$('#compareHandle'),divider=$('#compareDivider'),percent=$('#comparePercent');
  const syncCompare=()=>{
    if(!range||!compare)return;
    const v=+range.value;
    compare.style.setProperty('--split',`${v}%`);
    if(after) after.style.clipPath=`inset(0 0 0 ${v}%)`;
    if(handle) handle.style.left=`${v}%`;
    if(divider) divider.style.left=`${v}%`;
    if(percent) percent.textContent=`${v}%`;
    const reveal=Math.max(0,Math.min(1,(72-v)/48));
    $$('.after-callout',compare).forEach((el,i)=>{
      el.style.opacity=String(.22 + reveal*.78);
      el.style.transform=`translateX(${(1-reveal)*(18+i*4)}px)`;
    });
  };
  range?.addEventListener('input',syncCompare,{passive:true}); syncCompare();

  if(fine && !reduce){
    const stage=$('#workScreen'),desktop=$('#desktopDevice'),phone=$('#phoneDevice');
    if(stage && desktop && phone && window.gsap){
      const dx=gsap.quickTo(desktop,'rotateY',{duration:.55,ease:'power3'}),dy=gsap.quickTo(desktop,'rotateX',{duration:.55,ease:'power3'});
      const px=gsap.quickTo(phone,'x',{duration:.5,ease:'power3'}),py=gsap.quickTo(phone,'y',{duration:.5,ease:'power3'});
      stage.addEventListener('pointermove',e=>{
        const r=stage.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
        dx(nx*5);dy(ny*-3.4);px(nx*10);py(ny*7);
      });
      stage.addEventListener('pointerleave',()=>{dx(-2.5);dy(.8);px(0);py(0)});
    }
  }

  if(window.gsap && window.ScrollTrigger && !reduce){
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.hero-image',{scale:1.075,filter:'saturate(.72) contrast(1.12) brightness(.62)'},{scale:1,filter:'saturate(.86) contrast(1.09) brightness(.82)',duration:1.6,ease:'power3.out',delay:.25});
    gsap.from('.hero-value-line,.hero-art-note',{autoAlpha:0,y:12,duration:.7,delay:1.05,stagger:.08,ease:'power2.out'});
    gsap.from('.desktop-device',{autoAlpha:0,y:38,rotateY:-10,scale:.96,duration:1.05,ease:'power4.out',scrollTrigger:{trigger:'.work-showcase',start:'top 83%',once:true}});
    gsap.from('.phone-device',{autoAlpha:0,y:70,rotate:7,scale:.88,duration:.9,ease:'back.out(1.35)',scrollTrigger:{trigger:'.work-showcase',start:'top 80%',once:true}});
    gsap.from('.work-release,.work-experience-pill',{autoAlpha:0,scale:.9,duration:.55,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'.work-showcase',start:'top 72%',once:true}});
    gsap.from('.compare-theatre',{autoAlpha:0,y:42,scale:.975,duration:1,ease:'power4.out',scrollTrigger:{trigger:'.compare-theatre',start:'top 85%',once:true}});
    gsap.from('.transform-principles article',{autoAlpha:0,y:22,duration:.62,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'.transform-principles',start:'top 88%',once:true}});
    ScrollTrigger.create({trigger:'.compare-theatre',start:'top 65%',end:'bottom 35%',onEnter:()=>{
      if(!range)return; const state={v:+range.value};
      gsap.to(state,{v:38,duration:1.15,ease:'power2.inOut',onUpdate:()=>{range.value=state.v;syncCompare()},onComplete:()=>gsap.to(state,{v:52,duration:.8,ease:'power2.inOut',onUpdate:()=>{range.value=state.v;syncCompare()}})});
    },once:true});
  }
})();