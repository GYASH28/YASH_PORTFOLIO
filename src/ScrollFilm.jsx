import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFilmFrame } from "./filmData.js";

gsap.registerPlugin(ScrollTrigger);

export function drawCover(context, image, width, height) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = image.naturalHeight * canvasRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / canvasRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.clearRect(0, 0, width, height);
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height,
  );
}

export function ScrollFilm({
  film,
  className = "",
  height = 280,
  children,
  reducedMotion = false,
  labelledBy,
}) {
  const root = useRef(null);
  const canvas = useRef(null);
  const frameCache = useRef(new Map());
  const requested = useRef(new Set());
  const currentFrame = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const element = root.current;
    const surface = canvas.current;
    if (!element || !surface) return undefined;

    let cancelled = false;
    let renderHandle;
    let previousIndex = 0;
    const context = surface.getContext("2d", { alpha: false, desynchronized: true });

    // React Strict Mode intentionally replays effects in development. Reset the
    // request bookkeeping so a cancelled first pass cannot strand every frame
    // in a permanently "requested" state on the real pass.
    requested.current.clear();
    frameCache.current.clear();
    currentFrame.current = 0;

    const resize = () => {
      const bounds = surface.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      surface.width = Math.max(1, Math.round(bounds.width * dpr));
      surface.height = Math.max(1, Math.round(bounds.height * dpr));
      const image = frameCache.current.get(currentFrame.current);
      if (image) drawCover(context, image, surface.width, surface.height);
    };

    const draw = (index) => {
      const image = frameCache.current.get(index);
      if (!image || cancelled) return;
      currentFrame.current = index;
      cancelAnimationFrame(renderHandle);
      renderHandle = requestAnimationFrame(() => {
        drawCover(context, image, surface.width, surface.height);
      });
    };

    const loadFrame = (index, shouldDraw = false) => {
      const normalized = Math.max(0, Math.min(film.frameCount - 1, index));
      if (frameCache.current.has(normalized)) {
        if (shouldDraw) draw(normalized);
        return Promise.resolve(frameCache.current.get(normalized));
      }
      if (requested.current.has(normalized)) return Promise.resolve(null);

      requested.current.add(normalized);
      return new Promise((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.src = getFilmFrame(film, normalized);
        image.onload = () => {
          if (cancelled) return resolve(null);
          requested.current.delete(normalized);
          frameCache.current.set(normalized, image);
          if (frameCache.current.size > 32) {
            const removable = [...frameCache.current.keys()]
              .filter((cachedIndex) => cachedIndex !== 0 && cachedIndex !== currentFrame.current)
              .sort((a, b) => Math.abs(b - currentFrame.current) - Math.abs(a - currentFrame.current));
            for (const cachedIndex of removable.slice(0, frameCache.current.size - 32)) {
              frameCache.current.delete(cachedIndex);
            }
          }
          if (normalized === 0) setReady(true);
          if (shouldDraw || normalized === currentFrame.current) draw(normalized);
          resolve(image);
        };
        image.onerror = () => {
          requested.current.delete(normalized);
          resolve(null);
        };
      });
    };

    const warmNeighborhood = (index, direction) => {
      const mobile = window.innerWidth < 720;
      const step = mobile ? 2 : 1;
      const behind = mobile ? 2 : 4;
      const ahead = mobile ? 10 : 14;
      for (let offset = -behind; offset <= ahead; offset += step) {
        loadFrame(index + (offset * direction));
      }
    };

    resize();
    loadFrame(0, true);
    for (let index = 1; index < 7; index += 1) loadFrame(index);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) warmNeighborhood(currentFrame.current, 1);
      },
      { rootMargin: "120% 0px", threshold: 0.01 },
    );
    observer.observe(element);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: ({ progress }) => {
        element.style.setProperty("--film-progress", progress.toFixed(4));
        const rawIndex = Math.round(progress * (film.frameCount - 1));
        const index = window.innerWidth < 720 ? Math.round(rawIndex / 2) * 2 : rawIndex;
        currentFrame.current = Math.min(film.frameCount - 1, index);
        const direction = currentFrame.current >= previousIndex ? 1 : -1;
        previousIndex = currentFrame.current;
        if (frameCache.current.has(currentFrame.current)) draw(currentFrame.current);
        else loadFrame(currentFrame.current, true);
        warmNeighborhood(currentFrame.current, direction);
      },
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surface);

    return () => {
      cancelled = true;
      trigger.kill();
      observer.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(renderHandle);
      requested.current.clear();
      frameCache.current.clear();
    };
  }, [film, reducedMotion]);

  return (
    <section
      ref={root}
      className={`scroll-film ${className}`}
      style={{ "--film-height": `${height}svh`, "--film-progress": 0 }}
      aria-labelledby={labelledBy}
    >
      <div className="scroll-film__stage">
        {reducedMotion ? (
          <img className="scroll-film__still" src={film.poster} alt="" />
        ) : (
          <canvas ref={canvas} className={`scroll-film__canvas${ready ? " is-ready" : ""}`} aria-hidden="true" />
        )}
        <div className="scroll-film__shade" aria-hidden="true" />
        <div className="scroll-film__content">{children}</div>
        <div className="scroll-film__rail" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
