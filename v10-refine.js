(() => {
  const screen=document.querySelector('#workScreen');
  const buttons=[...document.querySelectorAll('.work-index button')];
  if(screen&&buttons.length){
    const sync=()=>{
      const active=buttons.findIndex(b=>b.classList.contains('active'));
      screen.classList.toggle('mobile-state',active===4);
    };
    const observer=new MutationObserver(sync);
    buttons.forEach(b=>observer.observe(b,{attributes:true,attributeFilter:['class']}));
    sync();
  }
})();