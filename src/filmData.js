export const films = {
  opening: {
    id: "product-engineering",
    label: "Film 01 / Thinking in systems",
    frameCount: 100,
    fps: 10,
    duration: 10,
    poster: "/frames/product-engineering/frame-0001.webp",
    source: "/videos/product-engineering.mp4",
  },
  identity: {
    id: "build-manifesto",
    label: "Film 02 / A personal practice",
    frameCount: 120,
    fps: 10,
    duration: 12,
    poster: "/frames/build-manifesto/frame-0001.webp",
    source: "/videos/ykg-build-manifesto.mp4",
  },
  finale: {
    id: "living-monogram",
    label: "Film 03 / Living systems",
    frameCount: 100,
    fps: 10,
    duration: 10,
    poster: "/frames/living-monogram/frame-0001.webp",
    source: "/videos/living-monogram.mp4",
  },
};

export function getFilmFrame(film, index) {
  const safeIndex = Math.max(0, Math.min(film.frameCount - 1, index));
  return `/frames/${film.id}/frame-${String(safeIndex + 1).padStart(4, "0")}.webp`;
}
