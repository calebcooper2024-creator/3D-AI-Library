// Bottom timeline ticks + events
(function(){
  const labels = ['24h','18h','12h','6h','Now','6h','12h','18h','24h','36h','48h','72h','7d'];
  const nowIdx = 4;

  function render(){
    const host = document.getElementById('track');
    if (!host) return;
    host.innerHTML = '';

    const w = host.clientWidth || 900;
    const h = 44;
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('width', w); svg.setAttribute('height', h);
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    host.appendChild(svg);

    // Baseline
    const base = document.createElementNS('http://www.w3.org/2000/svg','line');
    base.setAttribute('x1', 0); base.setAttribute('x2', w);
    base.setAttribute('y1', 18); base.setAttribute('y2', 18);
    base.setAttribute('stroke','rgba(31,32,36,0.12)');
    base.setAttribute('stroke-width','1');
    svg.appendChild(base);

    // Many fine ticks
    const TICKS = 160;
    for (let i=0;i<TICKS;i++){
      const x = (i+0.5) * (w/TICKS);
      const t = document.createElementNS('http://www.w3.org/2000/svg','line');
      t.setAttribute('x1', x); t.setAttribute('x2', x);
      const major = i%8===0;
      t.setAttribute('y1', 18);
      t.setAttribute('y2', major ? 10 : 14);
      t.setAttribute('stroke','rgba(31,32,36,0.18)');
      t.setAttribute('stroke-width','0.8');
      svg.appendChild(t);
    }

    // Event markers
    const events = [
      {x:0.12, c:'#c87a3e'}, {x:0.22, c:'#6b8a66'}, {x:0.31, c:'#c87a3e'},
      {x:0.41, c:'#8a7aa8'}, {x:0.49, c:'#c87a3e'}, {x:0.56, c:'#4f7ba8'},
      {x:0.63, c:'#c87a3e'}, {x:0.71, c:'#6b8a66'}, {x:0.79, c:'#c87a3e'},
      {x:0.87, c:'#8a7aa8'},
    ];
    for (const e of events){
      const cx = e.x*w;
      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx', cx); c.setAttribute('cy', 18);
      c.setAttribute('r', 2.5);
      c.setAttribute('fill', e.c);
      svg.appendChild(c);
    }

    // Now marker
    const nowX = (nowIdx+0.5) * (w/labels.length);
    const nowLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    nowLine.setAttribute('x1', nowX); nowLine.setAttribute('x2', nowX);
    nowLine.setAttribute('y1', 6); nowLine.setAttribute('y2', 30);
    nowLine.setAttribute('stroke','#1f2024'); nowLine.setAttribute('stroke-width','1.2');
    svg.appendChild(nowLine);
    const nowDot = document.createElementNS('http://www.w3.org/2000/svg','circle');
    nowDot.setAttribute('cx', nowX); nowDot.setAttribute('cy', 18);
    nowDot.setAttribute('r', 3); nowDot.setAttribute('fill','#1f2024');
    svg.appendChild(nowDot);

    // Labels
    for (let i=0;i<labels.length;i++){
      const x = (i+0.5) * (w/labels.length);
      const t = document.createElementNS('http://www.w3.org/2000/svg','text');
      t.setAttribute('x', x); t.setAttribute('y', 40);
      t.setAttribute('fill', i===nowIdx ? '#1f2024' : 'rgba(31,32,36,0.55)');
      t.setAttribute('font-size','10.5');
      t.setAttribute('font-family','Geist Mono, monospace');
      t.setAttribute('text-anchor','middle');
      t.textContent = labels[i];
      svg.appendChild(t);
    }

    // Timestamp bubble above current
    const stamp = document.createElement('div');
    stamp.className = 'tstamp';
    stamp.textContent = '11:42:07 AM';
    stamp.style.left = `${(nowX / w) * 100}%`;
    host.appendChild(stamp);
  }

  window.Timeline = { render };
})();
