(() => {
  'use strict';
  if (!document.querySelector('link[data-v9-refine]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './v9-refine.css';
    link.dataset.v9Refine = 'true';
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[data-v9-runtime]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './v9-runtime.css';
    link.dataset.v9Runtime = 'true';
    document.head.appendChild(link);
  }

  const hero = document.querySelector('.v9-hero');
  if (!hero) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const signal = hero.querySelector('.v9-signal');
  const glow = hero.querySelector('.v9-signal-glow');
  const canvas = hero.querySelector('#v9HeroField');
  const ctx = canvas?.getContext('2d');
  let pointer = { x: innerWidth * .72, y: innerHeight * .46, nx: 0, ny: 0, active: false };

  const syncPointerVars = (x, y) => {
    const r = hero.getBoundingClientRect();
    const px = ((x - r.left) / Math.max(1, r.width)) * 100;
    const py = ((y - r.top) / Math.max(1, r.height)) * 100;
    hero.style.setProperty('--v9-px', `${px}%`);
    hero.style.setProperty('--v9-py', `${py}%`);
  };

  if (fine && !reduce) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) - .5;
      const ny = ((e.clientY - r.top) / r.height) - .5;
      pointer = { x: e.clientX, y: e.clientY, nx, ny, active: true };
      syncPointerVars(e.clientX, e.clientY);
      if (signal) signal.style.transform = `rotateY(${nx * 7}deg) rotateX(${ny * -5}deg) translate3d(${nx * 10}px,${ny * 8}px,0)`;
      if (glow) {
        glow.style.setProperty('--v9-gx', `${nx * -28}px`);
        glow.style.setProperty('--v9-gy', `${ny * -22}px`);
      }
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      pointer.active = false;
      if (signal) signal.style.transform = '';
      if (glow) { glow.style.setProperty('--v9-gx', '0px'); glow.style.setProperty('--v9-gy', '0px'); }
    });
    hero.addEventListener('pointerdown', () => hero.classList.add('is-pressed'));
    addEventListener('pointerup', () => hero.classList.remove('is-pressed'));
  }

  hero.querySelectorAll('.v9-signal-tag').forEach((tag, index) => {
    if (!fine || reduce) return;
    tag.addEventListener('pointermove', e => {
      const r = tag.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      tag.style.transform = `translate(${x * .12}px,${y * .12 - 4}px)`;
    });
    tag.addEventListener('pointerleave', () => { tag.style.transform = ''; });
    tag.style.transitionDelay = `${index * 20}ms`;
  });

  if (ctx && canvas && !reduce) {
    let dpr = Math.min(2, devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0;
    let particles = [];
    const countFor = width => width < 700 ? 34 : width < 1100 ? 52 : 72;

    const resize = () => {
      const r = hero.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      dpr = Math.min(2, devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = countFor(w);
      particles = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .18,
        r: i % 9 === 0 ? 1.7 : .8 + Math.random() * .8,
        a: .16 + Math.random() * .32
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const attractX = pointer.active ? pointer.x : w * .72;
      const attractY = pointer.active ? pointer.y : h * .46;
      for (const p of particles) {
        const dx = attractX - p.x, dy = attractY - p.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 95000 && dist2 > 1) {
          const force = pointer.active ? .003 : .001;
          p.vx += dx * force / Math.max(180, Math.sqrt(dist2));
          p.vy += dy * force / Math.max(180, Math.sqrt(dist2));
        }
        p.vx *= .992; p.vy *= .992;
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(141,242,221,${p.a})`; ctx.fill();
      }
      const maxLink = w < 700 ? 92 : 118;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < maxLink) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(141,242,221,${(1 - d / maxLink) * .08})`; ctx.lineWidth = .65; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); addEventListener('resize', resize, { passive: true }); draw();
    addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
  }

  if (!reduce) {
    const onScroll = () => {
      const r = hero.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      hero.style.setProperty('--v9-scroll', p.toFixed(3));
      if (signal && !pointer.active) signal.style.transform = `translateY(${p * 42}px) scale(${1 - p * .08}) rotate(${p * 3}deg)`;
      const copy = hero.querySelector('.v9-hero-copy');
      if (copy) {
        copy.style.transform = `translateY(${p * 20}px)`;
        copy.style.opacity = String(1 - p * .72);
      }
      if (glow) glow.style.setProperty('--v9-gs', String(1 + p * .28));
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
