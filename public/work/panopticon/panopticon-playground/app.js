// Bootstrap: mount globe, wire drawers, wire controls
(function(){
  window.Panels.renderLeft();
  window.Panels.renderRightEmpty();

  let globe = null;
  function mountGlobe(){
    const stage = document.getElementById('stage');
    stage.innerHTML = '';
    const size = 820;
    globe = window.Globe.mount(stage, {
      size,
      onSelect: (r) => {
        window.location.href = 'Regional%20View.html?region=' + encodeURIComponent(r.id);
      },
    });
  }
  mountGlobe();
  window.Timeline.render();

  // Drawer toggles
  function toggle(id){
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
  }
  document.getElementById('btn-left').addEventListener('click', ()=>toggle('drawer-left'));
  document.getElementById('btn-right').addEventListener('click', ()=>toggle('drawer-right'));
  document.getElementById('btn-timeline').addEventListener('click', ()=>toggle('timeline-drawer'));
  document.querySelectorAll('[data-close]').forEach(x => x.addEventListener('click', (e)=>{
    const which = e.currentTarget.getAttribute('data-close');
    document.getElementById('drawer-'+which).classList.add('hidden');
  }));

  // Action strip
  document.querySelectorAll('.action-strip .seg').forEach(seg => {
    seg.addEventListener('click', () => {
      const act = seg.getAttribute('data-act');
      if (act === 'zoom-in') globe.zoom(1.15);
      if (act === 'rotate') globe.setRotation(-0.3 + (Math.random()-0.5)*0.5, 0.22 + (Math.random()-0.5)*0.3);
    });
  });

  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => { window.Timeline.render(); }, 120);
  });
})();
