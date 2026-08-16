(() => {
  'use strict';
  // V8 compatibility shim only. Previous versions rebuilt the Work section and
  // injected v7.js a second time. V8 owns Work in HTML and loads v7.js once.
  // The only retained upgrade is the lossless live-DOM before/after demo.
  const transform=document.querySelector('#transform');
  if(!transform || transform.querySelector('.live-site')) return;

  transform.className='transform transform-v6';
  transform.innerHTML=`<div class="section-shell">
    <div class="transform-head transform-head-v6" data-v7-reveal>
      <div><p class="section-label">INTERACTIVE / BEFORE → AFTER</p><h2>Don’t decorate the old problem.<br><em>Change the decision.</em></h2></div>
      <p class="transform-lede">Drag across the redesign. The website itself is live DOM—not a low-resolution mockup—so every edge stays sharp.</p>
    </div>
    <div class="compare-theatre" id="compare" data-v7-reveal>
      <div class="compare-atmosphere" aria-hidden="true"></div>
      <div class="compare-side compare-before">
        <div class="live-site before-site" aria-label="Conceptual outdated website before redesign">
          <div class="live-chrome"><span></span><span></span><span></span><b>old-business-site.com</b></div>
          <div class="old-nav"><strong>BUSINESS NAME</strong><p>Home &nbsp; About &nbsp; Services &nbsp; Contact</p></div>
          <div class="old-hero"><div class="old-photo"><i></i><i></i><i></i></div><div><small>WELCOME TO OUR WEBSITE</small><h3>Quality services for every customer.</h3><p>We are a leading business providing many services to our valued customers.</p><span class="mock-btn old">Learn more</span></div></div>
          <div class="old-grid"><article><b>Our services</b><span>Service 01<br>Service 02<br>Service 03</span></article><article><b>Why choose us?</b><span>Experienced<br>Reliable<br>Affordable</span></article><article><b>Latest news</b><span>Company update<br>New service<br>Read more</span></article></div>
        </div>
        <div class="compare-state"><small>BEFORE</small><b>Information without direction.</b></div><div class="before-noise" aria-hidden="true"></div>
      </div>
      <div class="compare-side compare-after" id="compareAfter">
        <div class="live-site after-site" aria-label="Conceptual conversion-focused website after redesign">
          <div class="live-chrome dark"><span></span><span></span><span></span><b>yourbusiness.com</b><span class="mock-btn mint">Start ↗</span></div>
          <div class="new-nav"><strong>YOUR BUSINESS</strong><p>Services &nbsp; Proof &nbsp; Pricing</p><span class="mock-btn mint">Get started ↗</span></div>
          <div class="new-hero"><small>THE OUTCOME / BEFORE THE CALL</small><h3>Know what it does.<br><em>Know why to choose it.</em></h3><p>A clear offer, visible proof and one obvious next move.</p><div class="new-actions"><span class="mock-btn mint">Get started ↗</span><span>See proof ↓</span></div></div>
          <div class="new-proof"><article><small>01</small><b>Clear offer</b><span>Value before details.</span></article><article><small>02</small><b>Proof</b><span>Trust before pressure.</span></article><article><small>03</small><b>Action</b><span>One next move.</span></article></div>
          <div class="new-price"><span>Managed website</span><b>₹3,999<small>/mo</small></b><span class="mock-btn mint">Choose Grow ↗</span></div>
          <div class="new-phone"><div></div><small>YOUR BUSINESS</small><b>Clear.<br>Fast.<br><em>Ready.</em></b><span class="mock-btn mint">Start ↗</span></div>
        </div>
        <div class="compare-state after-state"><small>AFTER</small><b>A clear reason to choose.</b></div>
        <div class="after-callout callout-offer"><i></i><span><b>01</b> Clear offer</span></div><div class="after-callout callout-trust"><i></i><span><b>02</b> Trust</span></div><div class="after-callout callout-action"><i></i><span><b>03</b> Action</span></div>
      </div>
      <input class="compare-range" id="compareRange" type="range" min="8" max="92" value="52" aria-label="Drag to compare website before and after">
      <div class="compare-divider" aria-hidden="true"><span></span></div><div class="compare-handle compare-handle-v6" aria-hidden="true"><small>DRAG</small><b>↔</b></div><div class="compare-progress" aria-hidden="true"><span id="comparePercent">52%</span><i></i></div>
    </div>
    <div class="transform-principles" data-v7-reveal><article><span>01</span><h3>Offer</h3><p>Say what you do and why it matters before asking for attention.</p></article><article><span>02</span><h3>Proof</h3><p>Show enough evidence to reduce uncertainty without burying the customer.</p></article><article><span>03</span><h3>Action</h3><p>When intent peaks, make the next move painfully obvious.</p></article></div>
    <div class="transform-blueprint" data-v7-reveal><div class="transform-blueprint-copy"><small>THE DECISION MAP</small><h3>Every scroll should answer a buying question.</h3><p>Move through orientation, proof, fit and action. Nothing exists just to fill a section.</p></div><div class="decision-map"><button class="map-node active" type="button"><small>01</small><b>What is this?</b><span>Position the offer.</span></button><i></i><button class="map-node" type="button"><small>02</small><b>Can I trust it?</b><span>Show real proof.</span></button><i></i><button class="map-node" type="button"><small>03</small><b>Is it for me?</b><span>Make fit clear.</span></button><i></i><button class="map-node" type="button"><small>04</small><b>What now?</b><span>Make action obvious.</span></button></div></div>
  </div>`;
})();
