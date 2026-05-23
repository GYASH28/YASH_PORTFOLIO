export function BrowserMockup({ project }) {
  if (project.id === "hint-gen") return <TerminalFlow project={project} />;
  if (project.id === "portfolio") return <PortfolioMini />;
  if (project.id === "campusmate") return <CampusMockup />;
  return <LernioMockup />;
}

function BrowserFrame({ children, url = "lernioai.vercel.app" }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <span className="traffic red" />
        <span className="traffic yellow" />
        <span className="traffic green" />
        <span className="url-bar">{url}</span>
      </div>
      {children}
    </div>
  );
}

function LernioMockup() {
  return (
    <BrowserFrame>
      <div className="lernio-ui">
        <aside>
          <b>Lernio</b>
          <span>Quiz Lab</span>
          <span>AI Tutor</span>
          <span>Viva Prep</span>
        </aside>
        <main>
          <div className="mock-live">LIVE</div>
          <p className="mock-kicker">BEEE Practice</p>
          <h4>Which law explains induced EMF?</h4>
          <div className="mock-answer">A. Faraday's law</div>
          <button type="button">Ask AI Hint</button>
        </main>
      </div>
    </BrowserFrame>
  );
}

function CampusMockup() {
  return (
    <BrowserFrame url="campuscwit.vercel.app">
      <div className="campus-ui">
        <aside>
          <span />
          <span />
          <span />
          <span />
        </aside>
        <main>
          <div className="campus-top" />
          <div className="campus-grid">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="campus-chart">
            <span style={{ height: "42%" }} />
            <span style={{ height: "68%" }} />
            <span style={{ height: "54%" }} />
            <span style={{ height: "80%" }} />
          </div>
        </main>
      </div>
    </BrowserFrame>
  );
}

function TerminalFlow({ project }) {
  return (
    <div className="terminal-flow" style={{ "--project-accent": project.accent }}>
      <div>[Student Question]</div>
      <span />
      <div>[AI Analysis]</div>
      <span />
      <div>[Smart Hint]</div>
    </div>
  );
}

function PortfolioMini() {
  return (
    <div className="portfolio-mini">
      <div className="mini-left">
        <b>I BUILD</b>
        <b>THINGS</b>
        <b>THAT WORK.</b>
      </div>
      <div className="mini-desk">
        <span />
        <span />
      </div>
      <em>The medium is the message.</em>
    </div>
  );
}
