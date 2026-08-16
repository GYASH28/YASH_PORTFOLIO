(() => {
  'use strict';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(pointer:fine)').matches;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  $('.experience-lab')?.style.setProperty('overflow','clip');
  const nav=$('#expNav'); addEventListener('scroll',()=>nav?.classList.toggle('scrolled',scrollY>24),{passive:true});
  const hero=$('.exp-hero'),stack=$('.hero-proof-stack');
  if(hero&&stack&&fine&&!reduce){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;stack.style.transform=`perspective(1400px) rotateY(${x*3}deg) rotateX(${y*-2}deg) translate3d(${x*-9}px,${y*-8}px,0)`});hero.addEventListener('pointerleave',()=>stack.style.transform='')}

  const grid=$('.lab-grid'), frame=$('#captureFrame'), preview=$('#previewImage');
  if(grid&&frame&&preview){const wrap=document.createElement('div');wrap.className='lab-scrubber';wrap.innerHTML='<span>SCRUB PAGE</span><input id="captureScrub" type="range" min="0" max="100" value="0" aria-label="Scroll through screenshot"><b id="captureScrubValue">00%</b>'; grid.appendChild(wrap);const input=$('#captureScrub'),val=$('#captureScrubValue');const apply=()=>{const v=+input.value;val.textContent=String(v).padStart(2,'0')+'%';const overflow=Math.max(0,preview.scrollHeight-frame.clientHeight);preview.style.transform=`translateY(${-overflow*v/100}px)`};input.addEventListener('input',()=>{frame.classList.add('is-scrubbing');apply()});input.addEventListener('change',()=>frame.classList.remove('is-scrubbing'));new MutationObserver(()=>{input.value=0;preview.style.transform='';val.textContent='00%'}).observe(preview,{attributes:true,attributeFilter:['src']});addEventListener('resize',apply,{passive:true});}

  if(fine&&!reduce){$$('.capture-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-10px) rotateY(${x*2.2}deg) rotateX(${y*-1.7}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}

  const stage=$('#deviceStage'); if(stage&&!reduce){const scan=document.createElement('i');scan.className='exp-v8-scan';scan.setAttribute('aria-hidden','true');stage.appendChild(scan);const style=document.createElement('style');style.textContent='.exp-v8-scan{position:absolute;z-index:10;left:8%;right:8%;top:8%;height:1px;background:linear-gradient(90deg,transparent,#8df2dd,transparent);box-shadow:0 0 20px rgba(141,242,221,.45);opacity:0;pointer-events:none}.exp-v8-scan.run{animation:expV8Scan .8s cubic-bezier(.16,1,.3,1)}@keyframes expV8Scan{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(54vh)}}';document.head.appendChild(style);$$('.feature,.device').forEach(b=>b.addEventListener('click',()=>{scan.classList.remove('run');void scan.offsetWidth;scan.classList.add('run')}))}

  // Keep the lab controls below the fixed nav and make the docked state feel intentional.
  const toolbar=$('.lab-toolbar');
  if(toolbar){let toolbarRaf=0;const syncToolbar=()=>{toolbarRaf=0;const top=parseFloat(getComputedStyle(toolbar).top)||86;toolbar.classList.toggle('is-docked',toolbar.getBoundingClientRect().top<=top+1&&scrollY>80)};addEventListener('scroll',()=>{if(!toolbarRaf)toolbarRaf=requestAnimationFrame(syncToolbar)},{passive:true});addEventListener('resize',syncToolbar,{passive:true});syncToolbar()}

  // Pointer spotlight follows the inspection area rather than the whole page.
  if(stage&&fine&&!reduce){stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();stage.style.setProperty('--stage-x',`${((e.clientX-r.left)/r.width*100).toFixed(1)}%`);stage.style.setProperty('--stage-y',`${((e.clientY-r.top)/r.height*100).toFixed(1)}%`)});stage.addEventListener('pointerleave',()=>{stage.style.removeProperty('--stage-x');stage.style.removeProperty('--stage-y')})}

  // Feature changes get a tiny content transition, and selected cards stay centered on narrow screens.
  const story=$('.feature-story');
  $$('.feature').forEach(btn=>btn.addEventListener('click',()=>{if(story&&!reduce){story.classList.add('is-changing');setTimeout(()=>story.classList.remove('is-changing'),180)}if(innerWidth<=700)requestAnimationFrame(()=>btn.scrollIntoView({block:'nearest',inline:'center',behavior:reduce?'auto':'smooth'}))}));
  $$('.device').forEach(btn=>btn.addEventListener('click',()=>{if(innerWidth<=700)requestAnimationFrame(()=>btn.scrollIntoView({block:'nearest',inline:'center',behavior:reduce?'auto':'smooth'}))}));

  // Arrow-key navigation turns the Lab into a real inspection control surface.
  const wireArrowNavigation=(selector)=>{const items=$$(selector);items.forEach((item,index)=>item.addEventListener('keydown',e=>{let next=null;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(index+1)%items.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(index-1+items.length)%items.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=items.length-1;if(next===null)return;e.preventDefault();items[next].focus();items[next].click()}))};
  wireArrowNavigation('.device');wireArrowNavigation('.feature');

  // Upgrade the capture modal into an inspection viewer with previous/next navigation.
  const dialog=$('#captureDialog'), dialogImage=$('#dialogCapture'), dialogTitle=$('#dialogCaptureTitle'), close=$('#captureDialogClose'), cards=$$('.capture-card');
  if(dialog&&dialogImage&&dialogTitle&&close&&cards.length){
    let current=0,opener=null;
    const controls=document.createElement('div');controls.className='capture-dialog-nav';controls.innerHTML='<button type="button" data-dir="-1" aria-label="Previous capture">←</button><span class="capture-dialog-count" aria-live="polite">01 / 04</span><button type="button" data-dir="1" aria-label="Next capture">→</button>';
    close.before(controls);const count=$('.capture-dialog-count',controls);
    const showAt=i=>{current=(i+cards.length)%cards.length;const card=cards[current];cards.forEach((c,n)=>c.classList.toggle('is-current',n===current));dialogImage.src=card.dataset.src||'';dialogImage.alt=card.dataset.alt||'FakhriMart full-resolution capture';dialogTitle.textContent=card.dataset.title||'FakhriMart capture';count.textContent=`${String(current+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;const body=$('.capture-dialog-body');if(body)body.scrollTop=0};
    cards.forEach((card,i)=>card.addEventListener('click',()=>{opener=card;showAt(i)}));
    $$('button',controls).forEach(btn=>btn.addEventListener('click',()=>showAt(current+Number(btn.dataset.dir||0))));
    dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showAt(current+(e.key==='ArrowRight'?1:-1))}});
    dialog.addEventListener('close',()=>{cards.forEach(c=>c.classList.remove('is-current'));if(opener?.isConnected)opener.focus();opener=null});
  }
})();