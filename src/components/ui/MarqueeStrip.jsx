export function MarqueeStrip({ items, reverse = false }) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-wrap group" aria-label={items.join(", ")}>
      <div className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}>
        {repeated.map((item, index) => (
          <span className="marquee-pill" key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
