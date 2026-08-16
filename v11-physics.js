(()=>{
  const root=document.documentElement;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile=matchMedia('(max-width:700px)').matches;
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  const lerp=(a,b,t)=>a+(b-a)*t;

  // Rebuild the refraction layers from the original SVG only. This avoids nested ghost clones.
  const heroWord=document.querySelector('.hero-word');
  if(heroWord){
    heroWord.querySelectorAll('.v11-hero-ghost').forEach(el=>el.remove());
    const base=heroWord.querySelector(':scope > svg')?.outerHTML||'';
    if(base){['a','b','c'].forEach(cls=>{const g=document.createElement('div');g.className=`v11-hero-ghost ${cls}`;g.setAttribute('aria-hidden','true');g.innerHTML=base;heroWord.append(g)})}
  }

  // SVG displacement gives the surface an actual temporary warp rather than only perspective.
  let heroDisp=null,workDisp=null;
  if(!reduce&&!mobile){
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');
    svg.setAttribute('width','0');svg.setAttribute('height','0');svg.setAttribute('aria-hidden','true');
    svg.style.position='fixed';svg.style.pointerEvents='none';
    svg.innerHTML=`<defs>
      <filter id="v11ScreenBend" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
        <feTurbulence type="turbulence" baseFrequency="0.0012 0.010" numOctaves="1" seed="8" result="noise"/>
        <feDisplacementMap id="v11HeroDisplace" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="v11WorkBend" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
        <feTurbulence type="turbulence" baseFrequency="0.001 0.008" numOctaves="1" seed="12" result="noise2"/>
        <feDisplacementMap id="v11WorkDisplace" in="SourceGraphic" in2="noise2" scale="0" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>`;
    document.body.append(svg);
    heroDisp=svg.querySelector('#v11HeroDisplace');workDisp=svg.querySelector('#v11WorkDisplace');
  }

  const horizon=document.createElement('div');horizon.className='v11-bend-horizon';horizon.setAttribute('aria-hidden','true');document.body.append(horizon);
  const hero=document.querySelector('.hero');
  let lastMetric=0,lastTime=performance.now(),smoothVel=0,smoothFold=0;
  const metric=()=>{
    const native=Math.max(window.scrollY||0,document.scrollingElement?.scrollTop||0,document.documentElement.scrollTop||0);
    const rectHero=hero?Math.max(0,-hero.getBoundingClientRect().top):0;
    return Math.max(native,rectHero);
  };
  lastMetric=metric();
  function physics(now){
    const dt=Math.max(8,Math.min(40,now-lastTime));lastTime=now;
    const m=metric(),instant=(m-lastMetric)/(dt/16.667);lastMetric=m;
    smoothVel=lerp(smoothVel,instant,.18);
    const bend=reduce||mobile?0:clamp(Math.abs(smoothVel)/20,0,1);
    root.style.setProperty('--v11-velocity',smoothVel.toFixed(3));
    root.style.setProperty('--v11-bend',bend.toFixed(4));
    if(hero){
      const byMetric=clamp(m/Math.max(1,hero.offsetHeight*.82),0,1);
      const byRect=clamp(-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight*.82),0,1);
      smoothFold=lerp(smoothFold,Math.max(byMetric,byRect),.2);
      root.style.setProperty('--v11-fold',smoothFold.toFixed(4));
    }
    if(heroDisp)heroDisp.setAttribute('scale',String((bend*17+smoothFold*2.5).toFixed(2)));
    if(workDisp){const wr=document.querySelector('#work')?.getBoundingClientRect();const near=wr?clamp(1-Math.abs((wr.top+wr.height/2)-innerHeight/2)/(innerHeight*1.4),0,1):0;workDisp.setAttribute('scale',String((bend*9+near*2).toFixed(2)))}
    requestAnimationFrame(physics);
  }
  requestAnimationFrame(physics);
})();
