// Panels + inspector content renderers
(function(){
  const D = window.DATA;

  const ICON = {
    file: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
    flow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h10M4 17h10M14 7a4 4 0 0 1 0 10"/></svg>',
    wave: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12c2 0 2-4 4-4s2 8 4 8 2-8 4-8 2 4 4 4"/></svg>',
    check:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m5 12 4 4 10-10"/></svg>',
    chip: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/></svg>',
    alert:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4 2 20h20L12 4z"/><path d="M12 10v5M12 18v.01"/></svg>',
    sparkle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
    box:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h18v12H3z"/><path d="M3 7l2-3h14l2 3M12 11v4"/></svg>',
  };
  const KIND_DOT = { evidence:'#4f7ba8', stable:'#6b8a66', contra:'#c87a3e', forecast:'#8a7aa8', archive:'#a3a49f' };

  function renderLeft(){
    const host = document.getElementById('left-body');
    if (!host) return;
    host.innerHTML = `
      <div class="section heading">
        <h1>World Model</h1>
        <div class="sub">Overview <span class="info-i">i</span></div>
        <p>A living cognitive atlas of beliefs, evidence, and contradictions shaping our understanding of the world.</p>
      </div>

      <div class="section">
        <div class="section-title">Evidence inflow</div>
        ${D.events.map(ev => `
          <div class="ev-row">
            <div class="ico">${ICON[ev.icon]||ICON.file}</div>
            <div class="txt">${ev.title}<div class="sub">${ev.when}</div></div>
            <div class="rdot" style="background:${KIND_DOT[ev.kind]||'#c6c7cd'}"></div>
          </div>
        `).join('')}
        <div class="row-footer"><span>+2 more</span><a href="#">View all</a></div>
      </div>

      <div class="section">
        <div class="section-title">Model health</div>
        <div class="health">
          <div class="gauge">
            <svg viewBox="0 0 74 74" width="74" height="74">
              <circle cx="37" cy="37" r="30" fill="none" stroke="rgba(31,32,36,0.08)" stroke-width="5"/>
              <circle cx="37" cy="37" r="30" fill="none" stroke="#6b8a66" stroke-width="5"
                      stroke-linecap="round" stroke-dasharray="${2*Math.PI*30}"
                      stroke-dashoffset="${2*Math.PI*30*(1-0.92)}"
                      transform="rotate(-90 37 37)"/>
            </svg>
            <div class="num"><b>92</b><span>Healthy</span></div>
          </div>
          <div class="metrics">
            <span>Stability</span><b class="good">High</b>
            <span>Coherence</span><b class="good">High</b>
            <span>Freshness</span><b class="good">Good</b>
            <span>Coverage</span><b>Broad</b>
          </div>
        </div>
      </div>
    `;
  }

  function renderRightEmpty(){
    const title = document.getElementById('right-title');
    const host = document.getElementById('right-body');
    if (!host || !title) return;
    title.textContent = 'Inspector';
    host.innerHTML = `
      <div class="section">
        <div class="empty">
          <div class="tg"></div>
          <div class="t1">No region selected</div>
          <div class="t2">Rotate or click a pin to inspect details.</div>
        </div>
      </div>
      <div class="section legend">
        <div class="section-title">Legend</div>
        ${D.legend.map(l => `<div class="row"><span class="dot" style="background:${l.color}"></span><span>${l.label}</span></div>`).join('')}
      </div>
      <div class="section stats">
        <div class="section-title">Global model stats</div>
        ${D.stats.map(s => `<div class="row"><span>${s.label}</span><b>${s.value}</b></div>`).join('')}
      </div>
    `;
  }

  function renderRightRegion(r){
    const t = document.getElementById('right-title');
    if (!t) return;
    t.textContent = 'Selected region';
    const hex = ({
      'var(--c-core)':'#2a2b2f','var(--c-stable)':'#6b8a66','var(--c-contra)':'#c87a3e',
      'var(--c-evidence)':'#4f7ba8','var(--c-forecast)':'#8a7aa8','var(--c-archive)':'#a3a49f','var(--c-emerging)':'#9787b2',
    })[r.color] || '#555';
    const host = document.getElementById('right-body');
    if (!host) return;
    host.innerHTML = `
      <div class="section inspector">
        <div class="head">
          <div>
            <div class="title">${r.title}</div>
            <div class="sub">${r.desc}</div>
          </div>
          <span style="width:10px;height:10px;border-radius:50%;background:${hex};margin-top:6px"></span>
        </div>
        <div class="meta">
          <span>Confidence</span><b>${r.conf.toFixed(2)}</b>
          <span>Beliefs</span><b>${Math.round(300+r.conf*900)}</b>
          <span>Contradictions</span><b>${Math.round((1-r.conf)*80)}</b>
          <span>Freshness</span><b>${r.conf>0.6?'Good':'Stale'}</b>
          <span>Last updated</span><b>2m ago</b>
        </div>
        <div class="bar"><div style="width:${Math.round(r.conf*100)}%;background:${hex}"></div></div>
      </div>
      <div class="section">
        <div class="section-title">Supporting evidence</div>
        ${D.events.slice(0,4).map(ev => `
          <div class="ev-row">
            <div class="ico">${ICON[ev.icon]||ICON.file}</div>
            <div class="txt">${ev.title}<div class="sub">${ev.when}</div></div>
            <div class="rdot" style="background:${KIND_DOT[ev.kind]||'#c6c7cd'}"></div>
          </div>
        `).join('')}
      </div>
      <div class="section legend">
        <div class="section-title">Legend</div>
        ${D.legend.map(l => `<div class="row"><span class="dot" style="background:${l.color}"></span><span>${l.label}</span></div>`).join('')}
      </div>
    `;
  }

  window.Panels = { renderLeft, renderRightEmpty, renderRightRegion };
})();
