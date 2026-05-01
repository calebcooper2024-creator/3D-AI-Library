// Globe v2: radial pins, stub-head network, surface height field, drag+zoom, click.
(function(){
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };
  function rng(seed){ return function(){ let t = seed += 0x6D2B79F5; t = Math.imul(t ^ (t>>>15), t|1); t ^= t + Math.imul(t ^ (t>>>7), t|61); return ((t ^ (t>>>14))>>>0)/4294967296; }; }

  const DEG = Math.PI/180;
  const COLORS = {
    'var(--c-core)':     '#c2410c',
    'var(--c-stable)':   '#4d7c5f',
    'var(--c-contra)':   '#b8345a',
    'var(--c-evidence)': '#2563a8',
    'var(--c-forecast)': '#7c5cbf',
    'var(--c-archive)':  '#8a7355',
    'var(--c-emerging)': '#d4a017',
  };

  function fibPoints(n, seed=1){
    const pts = [];
    const gr = Math.PI * (3 - Math.sqrt(5));
    const r = rng(seed);
    for (let i=0;i<n;i++){
      const y = 1 - (i / (n-1)) * 2;
      const rr = Math.sqrt(1 - y*y);
      const th = gr * i + r()*0.02;
      pts.push([ Math.cos(th)*rr, y, Math.sin(th)*rr ]);
    }
    return pts;
  }
  function rot(p, yaw, pitch, roll){
    let [x,y,z] = p;
    // yaw Y
    let cy=Math.cos(yaw), sy=Math.sin(yaw);
    let x2 = x*cy + z*sy; let z2 = -x*sy + z*cy;
    x=x2; z=z2;
    // pitch X
    let cp=Math.cos(pitch), sp=Math.sin(pitch);
    let y2 = y*cp - z*sp; let z3 = y*sp + z*cp;
    y=y2; z=z3;
    // roll Z
    if (roll){
      let cr=Math.cos(roll), sr=Math.sin(roll);
      let x3=x*cr - y*sr; let y3=x*sr + y*cr;
      x=x3; y=y3;
    }
    return [x,y,z];
  }
  function lonLatToXYZ(lon, lat){
    const a=lon*DEG, b=lat*DEG;
    return [ Math.cos(b)*Math.sin(a), Math.sin(b), Math.cos(b)*Math.cos(a) ];
  }
  function gcDist(a,b){ return Math.acos(Math.max(-1,Math.min(1, a[0]*b[0]+a[1]*b[1]+a[2]*b[2]))); }
  function knn(points, k){
    const N = points.length;
    const out = Array.from({length:N}, () => []);
    for (let i=0;i<N;i++){
      const arr = [];
      for (let j=0;j<N;j++) if (i!==j) arr.push([j, gcDist(points[i], points[j])]);
      arr.sort((a,b)=>a[1]-b[1]);
      out[i] = arr.slice(0,k).map(x=>x[0]);
    }
    return out;
  }
  function regionFieldFor(point, regions){
    let best=null, bestD=Infinity;
    for (const r of regions){
      const rp = lonLatToXYZ(r.lon, r.lat);
      const d = gcDist(point, rp);
      if (d<bestD){ bestD=d; best=r; }
    }
    const radius = 1.45;
    const w = Math.max(0, 1 - (bestD/radius));
    return { region: best, weight: w*w, dist: bestD };
  }

  window.Globe = {
    mount(container, options = {}){
      const size = options.size || 820;
      const cx = size/2, cy = size/2;
      const R0 = size * 0.42;

      const svg = el('svg', { width:size, height:size, viewBox:`0 0 ${size} ${size}` });
      svg.style.overflow = 'visible';
      svg.style.touchAction = 'none';
      container.appendChild(svg);

      const defs = el('defs');
      defs.innerHTML = `
        <radialGradient id="sphereFill" cx="40%" cy="36%" r="72%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="50%" stop-color="#fbf6ee"/>
          <stop offset="88%" stop-color="#ece5d8"/>
          <stop offset="100%" stop-color="#d9d1c2"/>
        </radialGradient>
        <radialGradient id="sphereShade" cx="72%" cy="80%" r="70%">
          <stop offset="0%" stop-color="#8a7f6a" stop-opacity="0.24"/>
          <stop offset="70%" stop-color="#8a7f6a" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#8a7f6a" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="sphereHi" cx="30%" cy="22%" r="42%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      `;
      svg.appendChild(defs);

      // Sphere shell
      const shellG = el('g');
      svg.appendChild(shellG);

      // Clip
      const clip = el('clipPath', { id:'sphereClip2' });
      const clipCircle = el('circle', { cx, cy, r: R0 });
      clip.appendChild(clipCircle);
      defs.appendChild(clip);

      // Region tints
      const regionLayer = el('g', { 'clip-path':'url(#sphereClip2)', opacity: 0.85 });
      svg.appendChild(regionLayer);

      // Surface (contour lines for uneven terrain feel)
      const surfaceLayer = el('g', { 'clip-path':'url(#sphereClip2)' });
      svg.appendChild(surfaceLayer);

      // Network edges (mesh + node-to-node long links)
      const edgesLayer = el('g');
      svg.appendChild(edgesLayer);

      // Back pins (behind highlight)
      const pinsBack = el('g');
      svg.appendChild(pinsBack);

      // Highlight & rim
      const topShell = el('g');
      svg.appendChild(topShell);

      // Front pins + labels
      const pinsFront = el('g');
      svg.appendChild(pinsFront);
      const labelsLayer = el('g', { 'pointer-events':'none' });
      svg.appendChild(labelsLayer);

      // Unified node graph: base lattice + stubs in one set, kNN'd together.
      const N = 900;
      const baseLattice = fibPoints(N, 7);

      const STUBS = 620;
      const stubRand = rng(2026424);
      const stubPts = [];
      const stubMeta = [];
      for (let i=0;i<STUBS;i++){
        const biasToRegion = stubRand() < 0.72;
        let p;
        if (biasToRegion){
          const r = window.DATA.regions[Math.floor(stubRand()*window.DATA.regions.length)];
          const rp = lonLatToXYZ(r.lon, r.lat);
          const theta = stubRand()*Math.PI*2;
          const radius = stubRand()*0.38 + 0.04;
          const up = Math.abs(rp[1])<0.9 ? [0,1,0] : [1,0,0];
          const t1 = norm(cross(up, rp));
          const t2 = cross(rp, t1);
          p = norm([
            rp[0] + (Math.cos(theta)*t1[0] + Math.sin(theta)*t2[0])*radius,
            rp[1] + (Math.cos(theta)*t1[1] + Math.sin(theta)*t2[1])*radius,
            rp[2] + (Math.cos(theta)*t1[2] + Math.sin(theta)*t2[2])*radius,
          ]);
        } else {
          const u = stubRand()*2-1;
          const th = stubRand()*Math.PI*2;
          const r = Math.sqrt(1-u*u);
          p = [Math.cos(th)*r, u, Math.sin(th)*r];
        }
        let h = 0;
        const dice = stubRand();
        if (dice < 0.74) h = 0;
        else if (dice < 0.92) h = 3 + stubRand()*7;
        else h = 9 + stubRand()*14;
        stubPts.push(p);
        stubMeta.push({ h, isStub:true });
      }

      // Combined graph: lattice invisible nodes (for mesh only) + stub visible nodes
      const allPts = baseLattice.concat(stubPts);
      const allMeta = baseLattice.map(() => ({ h:0, isStub:false }))
                                 .concat(stubMeta);
      const allField = allPts.map(p => regionFieldFor(p, window.DATA.regions));
      const neighbors = knn(allPts, 4);
      const stubStart = baseLattice.length;
      const stubs = stubPts.map((p,i) => ({ p, field: allField[stubStart+i], h: stubMeta[i].h, id:`s${i}`, idx: stubStart+i }));

      // state
      let yaw = -0.3, pitch = 0.22, scale = 1.0;
      let selected = null;

      function vec(o){ return [o[0],o[1],o[2]]; }
      function cross(a,b){ return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
      function norm(v){ const m=Math.hypot(v[0],v[1],v[2])||1; return [v[0]/m,v[1]/m,v[2]/m]; }

      function R(){ return R0 * scale; }
      function project(p){
        const q = rot(p, yaw, pitch, 0);
        return { x: cx + q[0]*R(), y: cy - q[1]*R(), z: q[2] };
      }
      // Project a point OFFSET radially outward (for pin tip)
      function projectPin(p, offsetPx){
        const q = rot(p, yaw, pitch, 0);
        const Rs = R();
        // Normal outward = q (since p is unit). Tip at (Rs + offset)*q in camera coords.
        const k = (Rs + offsetPx) / Rs;
        return { x: cx + q[0]*Rs*k, y: cy - q[1]*Rs*k, z: q[2] };
      }

      function render(){
        // update clip radius w/ zoom
        clipCircle.setAttribute('r', R());

        shellG.innerHTML = '';
        regionLayer.innerHTML = '';
        surfaceLayer.innerHTML = '';
        edgesLayer.innerHTML = '';
        pinsBack.innerHTML = '';
        pinsFront.innerHTML = '';
        topShell.innerHTML = '';
        labelsLayer.innerHTML = '';

        // Outer ambient
        shellG.appendChild(el('circle', { cx, cy, r: R()*1.18, fill:'none' }));
        shellG.appendChild(el('circle', { cx, cy, r: R(), fill:'url(#sphereFill)' }));
        shellG.appendChild(el('circle', { cx, cy, r: R(), fill:'url(#sphereShade)' }));

        // --- Regions as soft blobs ---
        for (const r of window.DATA.regions){
          const p3 = lonLatToXYZ(r.lon, r.lat);
          const proj = project(p3);
          if (proj.z < -0.2) continue;
          const vw = Math.max(0, (proj.z+0.2)/1.2);
          const rad = R()*0.95*(0.75+0.45*vw);
          const hex = COLORS[r.color] || '#999';
          const gId = `rgx-${r.id}`;
          const grad = el('radialGradient', { id:gId, cx:'50%', cy:'50%', r:'50%' });
          grad.innerHTML = `
            <stop offset="0%" stop-color="${hex}" stop-opacity="${0.7*vw}"/>
            <stop offset="50%" stop-color="${hex}" stop-opacity="${0.32*vw}"/>
            <stop offset="100%" stop-color="${hex}" stop-opacity="0"/>
          `;
          defs.appendChild(grad);
          regionLayer.appendChild(el('circle', { cx: proj.x, cy: proj.y, r: rad, fill:`url(#${gId})` }));
        }

        // --- Surface speckle (dense micro-texture) ---
        const speckRand = rng(4242);
        for (let i=0;i<900;i++){
          const u = speckRand()*2-1;
          const th = speckRand()*Math.PI*2;
          const rr = Math.sqrt(1-u*u);
          const p = [Math.cos(th)*rr, u, Math.sin(th)*rr];
          const pj = project(p);
          if (pj.z < 0.02) continue;
          const shade = 0.12 + pj.z*0.18 + speckRand()*0.08;
          const sz = 0.35 + speckRand()*0.55;
          surfaceLayer.appendChild(el('circle', {
            cx: pj.x.toFixed(1), cy: pj.y.toFixed(1), r: sz.toFixed(2),
            fill:'rgba(48,40,28,'+shade.toFixed(2)+')',
          }));
        }
        // tiny highlight flecks
        for (let i=0;i<220;i++){
          const u = speckRand()*2-1;
          const th = speckRand()*Math.PI*2;
          const rr = Math.sqrt(1-u*u);
          const p = [Math.cos(th)*rr, u, Math.sin(th)*rr];
          const pj = project(p);
          if (pj.z < 0.25) continue;
          surfaceLayer.appendChild(el('circle', {
            cx: pj.x.toFixed(1), cy: pj.y.toFixed(1), r: '0.5',
            fill:'rgba(255,250,240,'+ (0.3 + pj.z*0.35).toFixed(2) +')',
          }));
        }

        // --- Surface contour streaks (irregular small arcs, like terrain) ---
        const contourRand = rng(99);
        for (let i=0;i<160;i++){
          // pick random point on sphere
          const u = contourRand()*2-1;
          const th = contourRand()*Math.PI*2;
          const rr = Math.sqrt(1-u*u);
          const p = [Math.cos(th)*rr, u, Math.sin(th)*rr];
          const pj = project(p);
          if (pj.z < 0.05) continue;
          // tangent to draw a short arc
          const up = Math.abs(p[1])<0.9 ? [0,1,0] : [1,0,0];
          const t1 = norm(cross(up, p));
          const t2 = cross(p, t1);
          const len = 0.06 + contourRand()*0.14;
          const a = [ p[0]+t1[0]*len, p[1]+t1[1]*len, p[2]+t1[2]*len ];
          const b = [ p[0]-t1[0]*len + t2[0]*0.02, p[1]-t1[1]*len + t2[1]*0.02, p[2]-t1[2]*len + t2[2]*0.02 ];
          const aj = project(norm(a));
          const bj = project(norm(b));
          if (aj.z<0 || bj.z<0) continue;
          surfaceLayer.appendChild(el('path', {
            d: `M${aj.x.toFixed(1)} ${aj.y.toFixed(1)} Q${pj.x.toFixed(1)} ${pj.y.toFixed(1)} ${bj.x.toFixed(1)} ${bj.y.toFixed(1)}`,
            fill:'none',
            stroke:'rgba(40,35,25,0.22)',
            'stroke-width': 0.5,
            'stroke-opacity': (0.25 + pj.z*0.35).toFixed(2),
          }));
        }

        // --- Mesh edges (unified graph: lattice + stubs all linked) ---
        const seen = new Set();
        const allProj = allPts.map(p => project(p));
        for (let i=0;i<allPts.length;i++){
          const pi = allProj[i];
          if (pi.z < -0.05) continue;
          for (const j of neighbors[i]){
            const key = i<j ? `${i}-${j}` : `${j}-${i}`;
            if (seen.has(key)) continue;
            seen.add(key);
            const pj = allProj[j];
            if (pj.z < -0.05) continue;
            const midZ = (pi.z + pj.z)/2;
            const fi = allField[i], fj = allField[j];
            let stroke = 'rgba(60,55,45,0.22)';
            let w = Math.max(fi.weight, fj.weight);
            const region = fi.weight>fj.weight ? fi.region : fj.region;
            if (region && w > 0.05) stroke = COLORS[region.color] || stroke;
            const depth = 0.18 + 0.45*Math.max(0, midZ);
            const alpha = (w>0.05? 0.55 : 0.18) * depth/0.6;
            edgesLayer.appendChild(el('line', {
              x1: pi.x.toFixed(2), y1: pi.y.toFixed(2),
              x2: pj.x.toFixed(2), y2: pj.y.toFixed(2),
              stroke, 'stroke-opacity': alpha.toFixed(3), 'stroke-width': 0.7,
            }));
          }
        }

        // --- Lattice node dots (small, at every junction) ---
        for (let i=0;i<baseLattice.length;i++){
          const pj = allProj[i];
          if (pj.z < 0.02) continue;
          const f = allField[i];
          let fill = 'rgba(50,45,35,0.55)';
          if (f.weight > 0.05 && f.region){
            const hex = COLORS[f.region.color];
            fill = hex;
          }
          const alpha = 0.65 + pj.z*0.3;
          edgesLayer.appendChild(el('circle', {
            cx: pj.x.toFixed(1), cy: pj.y.toFixed(1),
            r: (1.4 + pj.z*0.8).toFixed(2),
            fill, 'fill-opacity': alpha.toFixed(2),
          }));
        }

        // --- Stub pins (heads on/near surface, some with short stems) ---
        // Draw back-to-front using the unified projection
        const drawOrder = stubs.map((s,i) => ({ s, i, z: allProj[s.idx].z })).sort((a,b)=>a.z-b.z);
        for (const { s, i } of drawOrder){
          const base = allProj[s.idx];
          if (base.z < -0.05) continue;
          const tip = projectPin(s.p, s.h);
          const f = s.field;
          let color = '#6e6758';
          if (f.weight > 0.05 && f.region) color = COLORS[f.region.color];
          const layer = base.z > 0 ? pinsFront : pinsBack;

          if (s.h > 0){
            // stem
            layer.appendChild(el('line', {
              x1: base.x, y1: base.y, x2: tip.x, y2: tip.y,
              stroke: color, 'stroke-width': 1.2, 'stroke-opacity': 0.8,
              'stroke-linecap':'round',
            }));
          }
          // head — larger, with subtle halo on front-facing
          const headR = s.h>8 ? 3.4 : (s.h>0 ? 2.6 : 2.2);
          const opacity = base.z > 0 ? 1 : 0.55;
          if (base.z > 0.15){
            layer.appendChild(el('circle', {
              cx: tip.x, cy: tip.y, r: headR*1.8,
              fill: color, 'fill-opacity': 0.12,
            }));
          }
          layer.appendChild(el('circle', {
            cx: tip.x, cy: tip.y, r: headR,
            fill: color, 'fill-opacity': opacity,
            stroke: 'rgba(20,20,24,0.28)', 'stroke-width': 0.5,
          }));
          if (base.z > 0.2){
            layer.appendChild(el('circle', {
              cx: tip.x-headR*0.32, cy: tip.y-headR*0.38, r: Math.max(0.7, headR*0.38),
              fill:'rgba(255,255,255,0.7)',
            }));
          }
        }

        // --- Major region pins (tall, radial) + labels ---
        const majors = window.DATA.regions.map(r => {
          const proj = project(lonLatToXYZ(r.lon, r.lat));
          return { r, proj };
        }).sort((a,b) => a.proj.z - b.proj.z);

        for (const { r, proj } of majors){
          if (proj.z < -0.15) continue;
          const hex = COLORS[r.color] || '#555';
          const stemLen = 44 + r.conf*18;
          const p3 = lonLatToXYZ(r.lon, r.lat);
          const baseP = projectPin(p3, 0);
          const tipP  = projectPin(p3, stemLen);
          const layer = proj.z > 0 ? pinsFront : pinsBack;

          // Concentric contour rings radiating out from major pin base
          const up = Math.abs(p3[1])<0.9 ? [0,1,0] : [1,0,0];
          const t1 = norm(cross(up, p3));
          const t2 = cross(p3, t1);
          for (let ring=1; ring<=4; ring++){
            const rad = 0.06 + ring*0.05;
            const pts = [];
            for (let a=0;a<=32;a++){
              const th = (a/32)*Math.PI*2;
              const v = norm([
                p3[0] + Math.cos(th)*t1[0]*rad + Math.sin(th)*t2[0]*rad,
                p3[1] + Math.cos(th)*t1[1]*rad + Math.sin(th)*t2[1]*rad,
                p3[2] + Math.cos(th)*t1[2]*rad + Math.sin(th)*t2[2]*rad,
              ]);
              const pj = project(v);
              pts.push(pj);
            }
            const d = pts.map((p,i)=> (i===0?'M':'L')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ')+'Z';
            layer.appendChild(el('path', { d, fill:'none', stroke: hex, 'stroke-width': 0.4, 'stroke-opacity': (0.18 - ring*0.03).toFixed(2) }));
          }

          // Flared disc base (ripple)
          layer.appendChild(el('ellipse', { cx: baseP.x, cy: baseP.y+2, rx:9, ry:3, fill:'rgba(30,25,18,0.18)' }));
          layer.appendChild(el('ellipse', { cx: baseP.x, cy: baseP.y, rx:8, ry:2.6, fill: hex, 'fill-opacity': 0.35 }));
          layer.appendChild(el('ellipse', { cx: baseP.x, cy: baseP.y, rx:5, ry:1.7, fill: hex, 'fill-opacity': 0.7 }));
          layer.appendChild(el('ellipse', { cx: baseP.x, cy: baseP.y-1, rx:3, ry:1.1, fill: hex, 'fill-opacity': 0.95 }));
          // Stem (radial)
          layer.appendChild(el('line', {
            x1: baseP.x, y1: baseP.y, x2: tipP.x, y2: tipP.y,
            stroke: hex, 'stroke-width': 1.6, 'stroke-opacity': 0.9,
            'stroke-linecap':'round',
          }));

          // Head glow
          const gId = `pgr-${r.id}`;
          const grd = el('radialGradient', { id:gId, cx:'50%', cy:'50%', r:'50%' });
          grd.innerHTML = `<stop offset="0%" stop-color="${hex}" stop-opacity="0.38"/><stop offset="100%" stop-color="${hex}" stop-opacity="0"/>`;
          defs.appendChild(grd);
          layer.appendChild(el('circle', { cx:tipP.x, cy:tipP.y, r:11, fill:`url(#${gId})` }));

          // Head (interactive)
          const head = el('circle', {
            cx: tipP.x, cy: tipP.y, r: 5.4,
            fill: hex, 'data-region': r.id, style:'cursor:pointer',
          });
          head.addEventListener('click', (e)=>{
            e.stopPropagation();
            selected = r.id;
            if (options.onSelect) options.onSelect(r);
            render();
          });
          if (selected === r.id){
            layer.appendChild(el('circle', { cx:tipP.x, cy:tipP.y, r:9, fill:'none', stroke:hex, 'stroke-opacity':0.35 }));
          }
          layer.appendChild(head);
          layer.appendChild(el('circle', { cx: tipP.x-1.6, cy: tipP.y-1.8, r: 1.6, fill:'rgba(255,255,255,0.7)', 'pointer-events':'none' }));

          // Label (only if front enough)
          if (proj.z > -0.05){
            const side = tipP.x > cx ? 'right' : 'left';
            const anchor = 'start';
            // Offset outward so label sits away from head
            const dx = side === 'right' ? 12 : -12;
            const lx = tipP.x + dx;
            const ly = tipP.y - 4;
            const g = el('g', { transform:`translate(${lx},${ly})` });
            const tAnchor = side==='right'?'start':'end';
            const title = el('text', { 'text-anchor':tAnchor, x:0, y:0, fill:'#26272b', 'font-size':'11', 'font-weight':'500', 'font-family':'Geist, sans-serif' });
            title.textContent = r.title;
            const desc = el('text', { 'text-anchor':tAnchor, x:0, y:12, fill:'#6b6e78', 'font-size':'10', 'font-family':'Geist, sans-serif' });
            desc.textContent = r.desc;
            const conf = el('text', { 'text-anchor':tAnchor, x:0, y:24, fill:'#9a9ca4', 'font-size':'9.5', 'font-family':'Geist Mono, monospace' });
            conf.textContent = `Confidence ${r.conf.toFixed(2)}`;
            g.appendChild(title); g.appendChild(desc); g.appendChild(conf);
            labelsLayer.appendChild(g);
          }
        }

        // Top-layer: highlight + rim
        topShell.appendChild(el('circle', { cx, cy, r: R(), fill:'url(#sphereHi)', 'pointer-events':'none' }));
        topShell.appendChild(el('circle', { cx, cy, r: R(), fill:'none', stroke:'rgba(31,32,36,0.08)', 'stroke-width':'1', 'pointer-events':'none' }));
      }

      render();

      // Interaction ---------------------------------------------
      let dragging=false, lx=0, ly=0, sx=0, sy=0, moved=false, downTarget=null;
      svg.style.cursor='grab';
      svg.style.userSelect='none';
      svg.style.webkitUserSelect='none';
      svg.addEventListener('selectstart', e => e.preventDefault());
      svg.addEventListener('pointerdown', (e)=>{
        dragging=true; lx=e.clientX; ly=e.clientY; sx=e.clientX; sy=e.clientY;
        moved=false;
        downTarget = e.target;
        svg.style.cursor='grabbing';
      });
      svg.addEventListener('pointermove', (e)=>{
        if (!dragging) return;
        const dx = e.clientX - lx, dy = e.clientY - ly;
        const totalDx = e.clientX - sx, totalDy = e.clientY - sy;
        if (Math.hypot(totalDx, totalDy) > 4){
          if (!moved){
            moved = true;
            try { svg.setPointerCapture(e.pointerId); } catch(_){}
          }
          lx = e.clientX; ly = e.clientY;
          yaw += dx*0.006;
          pitch += dy*0.006;
          pitch = Math.max(-Math.PI/2+0.05, Math.min(Math.PI/2-0.05, pitch));
          render();
        }
      });
      const end=(e)=>{
        if (dragging && !moved && downTarget){
          // Treat as click — find region head ancestor
          let node = downTarget;
          while (node && node !== svg){
            if (node.getAttribute && node.getAttribute('data-region')){
              const id = node.getAttribute('data-region');
              const r = window.DATA.regions.find(x => x.id === id);
              if (r){
                selected = id;
                if (options.onSelect) options.onSelect(r);
                render();
              }
              break;
            }
            node = node.parentNode;
          }
        }
        dragging=false; moved=false; downTarget=null;
        svg.style.cursor='grab';
      };
      svg.addEventListener('pointerup', end);
      svg.addEventListener('pointercancel', end);
      svg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = -e.deltaY * 0.0015;
        scale = Math.max(0.6, Math.min(2.2, scale * (1 + delta)));
        render();
      }, { passive: false });

      // Click on background deselects
      svg.addEventListener('click', (e)=>{
        if (e.target === svg || e.target.tagName === 'circle' && !e.target.getAttribute('data-region')){
          // nothing
        }
      });

      return {
        render,
        setRotation(y,p){ yaw=y; pitch=p; render(); },
        zoom(d){ scale = Math.max(0.6, Math.min(2.2, scale*d)); render(); },
        select(id){ selected=id; render(); },
      };
    }
  };
})();
