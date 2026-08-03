(() => {
  'use strict';
  if (window.__ygMotionLayer || !document.body) return;
  window.__ygMotionLayer = true;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = matchMedia('(pointer: coarse)').matches;
  const root = document.documentElement;
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const lerp = (a, b, t) => a + (b - a) * t;
  const qs = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => [...p.querySelectorAll(s)];

  const scene = document.createElement('div');
  scene.className = 'yg-depth-scene';
  scene.setAttribute('aria-hidden', 'true');
  scene.innerHTML = `
    <div class="yg-depth-stage" title="Drag the 3D system object">
      <div class="yg-orbit o1"></div><div class="yg-orbit o2"></div><div class="yg-orbit o3"></div>
      <div class="yg-depth-object">${'<i class="yg-face"></i>'.repeat(6)}</div>
      <span class="yg-scene-label">drag · inspect system</span>
    </div>`;

  const rail = document.createElement('div');
  rail.className = 'yg-depth-rail';
  rail.setAttribute('aria-hidden', 'true');
  rail.innerHTML = '<i></i><span>000%</span>';

  const pointer = document.createElement('div');
  pointer.className = 'yg-pointer-reactor';
  pointer.setAttribute('aria-hidden', 'true');

  const signal = document.createElement('div');
  signal.className = 'yg-section-signal';
  signal.setAttribute('aria-hidden', 'true');
  signal.innerHTML = '<i></i><b>00</b><span>System entry</span>';

  document.body.append(scene, rail, pointer, signal);
  document.body.classList.add('yg-motion-ready');

  const headings = qsa('main h2, .hero h1');
  headings.forEach(h => h.classList.add('yg-motion-heading'));

  const sections = qsa('main > section');
  const projectCards = qsa('.project');
  const stage = qs('.yg-depth-stage', scene);
  const object = qs('.yg-depth-object', scene);
  const railLabel = qs('span', rail);
  const signalCode = qs('b', signal);
  const signalName = qs('span', signal);

  let tx = innerWidth * .5, ty = innerHeight * .5;
  let px = tx, py = ty;
  let scrollProgress = 0, smoothProgress = 0;
  let dragX = 0, dragY = 0, dragTargetX = 0, dragTargetY = 0;
  let dragging = false, dragStartX = 0, dragStartY = 0;
  let activeSection = 0;
  let raf = 0;

  const sectionName = section => {
    const label = qs('.section-label', section)?.textContent || section.id || 'System';
    return label.replace(/\s+/g, ' ').trim().replace(/^\d+\s*/, '').slice(0, 32);
  };

  const updateSectionSignal = index => {
    activeSection = clamp(index, 0, Math.max(0, sections.length - 1));
    const section = sections[activeSection];
    signalCode.textContent = String(activeSection + 1).padStart(2, '0');
    signalName.textContent = section ? sectionName(section) : 'System';
    scene.dataset.hidden = section?.classList.contains('light') ? 'true' : 'false';
  };

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) updateSectionSignal(sections.indexOf(visible.target));
    }, { threshold: [.22, .45, .7], rootMargin: '-18% 0px -30%' });
    sections.forEach(s => sectionObserver.observe(s));
  }

  const headingObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.style.setProperty('--yg-heading-progress', entry.isIntersecting ? '1' : '0');
    });
  }, { threshold: .35 }) : null;
  headings.forEach(h => headingObserver?.observe(h));

  const onScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    scrollProgress = clamp(scrollY / max, 0, 1);
    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const local = clamp((innerHeight - rect.top) / (innerHeight + rect.height), 0, 1);
      card.style.setProperty('--yg-card-depth', ((local - .5) * 36).toFixed(2));
    });
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const onPointerMove = event => {
    tx = event.clientX;
    ty = event.clientY;
    const hot = event.target.closest('a,button,.project,.tilt,.yg-depth-stage');
    pointer.classList.toggle('is-hot', Boolean(hot));
    if (!raf) raf = requestAnimationFrame(tick);
  };

  projectCards.forEach(card => {
    const move = event => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--yg-card-x', `${event.clientX - r.left}px`);
      card.style.setProperty('--yg-card-y', `${event.clientY - r.top}px`);
      card.style.setProperty('--yg-card-hot', '1');
    };
    card.addEventListener('pointermove', move, { passive: true });
    card.addEventListener('pointerleave', () => card.style.setProperty('--yg-card-hot', '0'));
  });

  stage?.addEventListener('pointerdown', event => {
    dragging = true;
    dragStartX = event.clientX - dragTargetY;
    dragStartY = event.clientY - dragTargetX;
    stage.setPointerCapture?.(event.pointerId);
  });
  stage?.addEventListener('pointermove', event => {
    if (!dragging) return;
    dragTargetY = event.clientX - dragStartX;
    dragTargetX = event.clientY - dragStartY;
  });
  const stopDrag = event => {
    dragging = false;
    if (event?.pointerId != null) stage?.releasePointerCapture?.(event.pointerId);
  };
  stage?.addEventListener('pointerup', stopDrag);
  stage?.addEventListener('pointercancel', stopDrag);
  stage?.addEventListener('dblclick', () => { dragTargetX = dragTargetY = 0; });

  const tick = () => {
    raf = 0;
    smoothProgress = lerp(smoothProgress, scrollProgress, .075);
    px = lerp(px, tx, .16);
    py = lerp(py, ty, .16);
    dragX = lerp(dragX, dragTargetX, .14);
    dragY = lerp(dragY, dragTargetY, .14);

    root.style.setProperty('--yg-scroll', smoothProgress.toFixed(4));
    root.style.setProperty('--yg-pointer-x', `${px}px`);
    root.style.setProperty('--yg-pointer-y', `${py}px`);
    root.style.setProperty('--yg-scene-rx', `${-16 + smoothProgress * 370 + dragX * .55}deg`);
    root.style.setProperty('--yg-scene-ry', `${24 + smoothProgress * 610 + dragY * .55}deg`);
    root.style.setProperty('--yg-scene-rz', `${smoothProgress * 140}deg`);
    root.style.setProperty('--yg-depth', `${Math.sin(smoothProgress * Math.PI * 4) * 22}px`);
    railLabel.textContent = `${String(Math.round(smoothProgress * 100)).padStart(3, '0')}%`;

    const unsettled = Math.abs(smoothProgress - scrollProgress) > .0005 || Math.abs(px - tx) > .2 || Math.abs(py - ty) > .2 || Math.abs(dragX - dragTargetX) > .2 || Math.abs(dragY - dragTargetY) > .2;
    if (unsettled) raf = requestAnimationFrame(tick);
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  if (!coarsePointer) addEventListener('pointermove', onPointerMove, { passive: true });
  addEventListener('pointerleave', () => pointer.style.opacity = '0');
  addEventListener('pointerenter', () => pointer.style.opacity = '1');

  if (reduceMotion) {
    scene.remove(); rail.remove(); pointer.remove();
  } else {
    onScroll();
    updateSectionSignal(0);
    requestAnimationFrame(tick);
  }
})();
