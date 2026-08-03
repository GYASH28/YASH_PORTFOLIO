window.__portfolioBootTimer=setTimeout(()=>{if(!window.__portfolioReady){document.body.classList.remove('is-loading');document.querySelector('.intro')?.remove()}},7000);
(() => {
  const attach = (tag, attrs) => {
    if (document.querySelector(`[data-yg-motion="${attrs['data-yg-motion']}"]`)) return;
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    document.head.appendChild(node);
  };
  const load = () => {
    attach('link', { rel: 'stylesheet', href: '/motion-layer.css?v=1', 'data-yg-motion': 'styles' });
    attach('script', { src: '/motion-layer.js?v=1', defer: '', 'data-yg-motion': 'script' });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', load, { once: true }) : load();
})();
