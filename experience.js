(() => {
  const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const stage=$('#deviceStage');
  $$('.device').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.device').forEach(x=>x.classList.toggle('active',x===btn));
    stage.dataset.device=btn.dataset.device;
  }));

  const STORIES={
    discover:{index:'01 / DISCOVER',title:'Help the customer find the right product before they need to ask.',body:'FakhriMart organizes a large material catalogue around categories, projects, crafts, material, thickness and colour intent so discovery feels guided instead of overwhelming.',proof:['CATALOGUE','PROJECT JOURNEYS','FILTERING']},
    search:{index:'02 / SEARCH',title:'Search should understand intent, not demand perfect spelling.',body:'The current release includes grouped autocomplete and typo-tolerant search across products, projects, categories, crafts and materials, reducing dead ends when a customer only partly knows what they need.',proof:['TYPO TOLERANCE','AUTOCOMPLETE','RELEVANCE']},
    compare:{index:'03 / COMPARE',title:'When products are similar, the website should help people make the decision.',body:'Customers can compare up to three materials, with a desktop matrix and a phone-native comparison layout designed to keep useful distinctions readable.',proof:['3-WAY COMPARE','MOBILE CARDS','DECISION CONTEXT']},
    enquire:{index:'04 / ENQUIRE',title:'The website hands high-intent context to WhatsApp instead of starting the conversation from zero.',body:'Selected shades and product context can carry into enquiry flows, and customers can build a brief they can share, copy or print before continuing the conversation.',proof:['WHATSAPP','SHADE CONTEXT','ENQUIRY BRIEF']},
    theme:{index:'05 / ADAPT',title:'The experience holds together across themes, routes and phone-sized screens.',body:'The latest polish pass validates light and dark semantic surfaces, navigation, controls, mobile tap targets, accessibility and viewport integrity across the current route set.',proof:['LIGHT / DARK','MOBILE','ACCESSIBILITY']}
  };
  const idx=$('#storyIndex'), title=$('#storyTitle'), body=$('#storyBody'), proof=$('#storyProof');
  $$('.feature').forEach(btn=>btn.addEventListener('click',()=>{
    const s=STORIES[btn.dataset.feature]; if(!s)return;
    $$('.feature').forEach(x=>x.classList.toggle('active',x===btn));
    idx.textContent=s.index; title.textContent=s.title; body.textContent=s.body;
    proof.innerHTML=s.proof.map(x=>`<span>${x}</span>`).join('');
  }));

  // If the remote page refuses iframe embedding, provide the fresh screenshot fallback.
  const frame=$('#liveFrame'), fallback=$('#frameFallback');
  let loaded=false;
  frame?.addEventListener('load',()=>{loaded=true});
  setTimeout(()=>{ if(!loaded && fallback) fallback.style.display='grid'; },5500);
})();
