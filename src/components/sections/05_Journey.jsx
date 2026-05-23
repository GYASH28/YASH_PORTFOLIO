import { lazy, Suspense } from "react";
import { journey } from "../../data/content";
import { RevealText } from "../ui/RevealText";
import { useInView } from "../../hooks/useInView";

const WaveformPath = lazy(() => import("../three/WaveformPath").then((module) => ({ default: module.WaveformPath })));

export function Journey() {
  const [ref, inView] = useInView(0.1);

  return (
    <>
    <div className="section-divider" />
    <section ref={ref} id="journey" className={`section section-shell journey-section ${inView ? 'journey-section--visible' : ''}`}>
      <div className="section-inner journey-grid">
        <div>
          <p className="section-label">// 05 - THE PATH</p>
          <h2 className="text-title">
            <RevealText>Five chapters. One direction.</RevealText>
          </h2>
          <div className="timeline">
            <div className="journey-line" />
            {journey.map((item) => {
              const Icon = item.icon;
              return (
                <article className={item.chapter === "NOW" ? "active" : ""} key={item.step}>
                  <i />
                  <small className="icon-label">
                    {Icon && <Icon size={14} color="var(--mint)" />}
                    {item.chapter} - {item.step}
                  </small>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
        <div className="waveform-panel">
          <Suspense fallback={null}>
            <WaveformPath />
          </Suspense>
        </div>
      </div>
    </section>
    </>
  );
}
