// Mock data — deterministic, replaceable by backend.
window.DATA = {
  events: [
    { id:'ev1', title:'Recent drift ingested',    when:'Just now', kind:'evidence',   icon:'file' },
    { id:'ev2', title:'Evidence pipeline healthy',when:'2m ago',   kind:'stable',     icon:'flow' },
    { id:'ev3', title:'Sensor stream active',     when:'3m ago',   kind:'evidence',   icon:'wave' },
    { id:'ev4', title:'Integration tests stable', when:'5m ago',   kind:'stable',     icon:'check'},
    { id:'ev5', title:'Memory strain normal',     when:'7m ago',   kind:'evidence',   icon:'chip' },
    { id:'ev6', title:'Contradictions detected',  when:'11m ago',  kind:'contra',     icon:'alert'},
    { id:'ev7', title:'Forecasts updated',        when:'19m ago',  kind:'forecast',   icon:'sparkle'},
    { id:'ev8', title:'Archive refreshed',        when:'25m ago',  kind:'archive',    icon:'box'  },
  ],

  legend: [
    { label:'Core anchor',          color:'var(--c-core)'     },
    { label:'Stable / reinforced',  color:'var(--c-stable)'   },
    { label:'Contradiction / risk', color:'var(--c-contra)'   },
    { label:'Evidence inflow',      color:'var(--c-evidence)' },
    { label:'Forecast / hypothesis',color:'var(--c-forecast)' },
    { label:'Emerging hypothesis',  color:'var(--c-emerging)' },
    { label:'Archived / weak',      color:'var(--c-archive)'  },
  ],

  stats: [
    { label:'Total regions',    value:'1,248' },
    { label:'Active beliefs',   value:'8,732' },
    { label:'Contradictions',   value:'312'   },
    { label:'Hypotheses',       value:'521'   },
    { label:'Evidence streams', value:'37'    },
    { label:'Last updated',     value:'2m ago'},
  ],

  // Each region anchors a major pin; lon/lat in degrees.
  // Distributed evenly around the sphere via Fibonacci-lattice points
  // (computed by hand): 7 anchors that don't cluster on any one face.
  regions: [
    { id:'core',     title:'Core anchor',          desc:'Identity & values',    conf:0.94, color:'var(--c-core)',     lon:    0, lat:  78 },
    { id:'stable',   title:'Stable knowledge',     desc:'Reinforced beliefs',   conf:0.86, color:'var(--c-stable)',   lon:  -50, lat:  35 },
    { id:'forecast', title:'Forecast landscape',   desc:'Multiple hypotheses',  conf:0.48, color:'var(--c-forecast)', lon:   75, lat:  20 },
    { id:'contra',   title:'Contradiction cluster',desc:'High tension',         conf:0.23, color:'var(--c-contra)',   lon: -160, lat:   5 },
    { id:'evidence', title:'Evidence inflow',      desc:'High signal',          conf:0.78, color:'var(--c-evidence)', lon:  155, lat: -25 },
    { id:'emerging', title:'Emerging hypothesis',  desc:'Early formation',      conf:0.52, color:'var(--c-emerging)', lon:   25, lat: -45 },
    { id:'archive',  title:'Archived terrain',     desc:'Low activity',         conf:0.31, color:'var(--c-archive)',  lon: -100, lat: -70 },
  ],
};
