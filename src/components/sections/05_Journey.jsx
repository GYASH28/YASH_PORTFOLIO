import { lazy, Suspense } from "react";
import { journey } from "../../data/content";
import { RevealText } from "../ui/RevealText";

const WaveformPath = lazy(() => import("../three/WaveformPath").then((module) => ({ default: module.WaveformPath })));

export function Journey() {
  return (
    <section id="journey" className="section-shell journey-section">
      <div className="section-inner journey-grid">
        <div>
          <p className="section-label">// 05 - THE PATH</p>
          <h2 className="text-title">
            <RevealText>Five chapters. One direction.</RevealText>
          </h2>
          <div className="timeline">
            {journey.map((item) => (
              <article className={item.chapter === "NOW" ? "active" : ""} key={item.step}>
                <i />
                <small>
                  {item.chapter} - {item.step}
                </small>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="waveform-panel">
          <Suspense fallback={null}>
            <WaveformPath />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
