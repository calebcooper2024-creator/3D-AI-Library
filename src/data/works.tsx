import React from 'react';

export interface WorkProject {
  id: string;
  title: string;
  slug: string;
  year: string;
  isNew?: boolean;
  author: string;
  subtitle: string;
  spineColor: string;
  coverColor: string;
  textColor: string;
  fontTitle: string;
  textureClass: string;
  detailHref: string;
  hidden?: boolean;
  coverContent?: React.ReactNode;
  spineContent?: React.ReactNode;
}

const allWorks: WorkProject[] = [
  {
    id: 'project-winter-haven', slug: 'project-winter-haven', year: '2026', isNew: true, hidden: true,
    title: 'Project Winter Haven', subtitle: 'World Model to Agentic UI',
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#0a0a0f', coverColor: '#0d0d1a', textColor: '#c8b8ff', textureClass: 'texture-leather',
    detailHref: '/work/project-winter-haven/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-[#0d0d1a] overflow-hidden">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 70% 30%, #2d1b69 0%, transparent 60%)'}} />
        <div className="absolute top-8 right-8 w-32 h-32 border border-purple-500/20 rounded-full" />
        <div className="absolute top-12 right-12 w-24 h-24 border border-purple-400/15 rounded-full" />
        <div className="absolute top-16 right-16 w-16 h-16 border border-purple-300/10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-1/3" style={{background:'linear-gradient(to top, #1a0a3a, transparent)'}} />
        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          <span className="font-mono text-[10px] tracking-[0.3em] text-purple-400/60 uppercase mb-4">No. 01 -- 2026</span>
          <h2 className="font-serif text-5xl text-white leading-[0.9] tracking-tight mb-3">Project<br/>Winter<br/>Haven</h2>
          <div className="w-8 h-[1px] bg-purple-400/50 mb-3" />
          <p className="font-mono text-xs text-purple-300/50 tracking-widest uppercase">World Model to Agentic UI -- 2026</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0a0a0f] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-lg text-purple-300 tracking-widest">Project Winter Haven</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-purple-400/60" />
        <span className="absolute top-8 text-[10px] font-mono text-purple-400/40 rotate-90">No. 01</span>
      </div>
    ),
  },
  {
    id: 'global-intelligence-market', slug: 'global-intelligence-market', year: '2026', isNew: true,
    title: 'Global Intelligence Market', subtitle: 'Compute Endpoints, Not Subscriptions',
    author: 'Caleb Cooper', fontTitle: 'font-sans',
    spineColor: '#0f1923', coverColor: '#111d2b', textColor: '#38bdf8', textureClass: 'texture-canvas',
    detailHref: '/work/global-intelligence-market/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-[#111d2b] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[0,20,40,60,80,100].map(y=><line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#38bdf8" strokeWidth="0.3"/>)}
          {[0,20,40,60,80,100].map(x=><line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#38bdf8" strokeWidth="0.3"/>)}
        </svg>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-sky-400/30 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-sky-400/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-sky-400/10 border border-sky-400/40" />
          </div>
        </div>
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <h2 className="font-sans font-black text-3xl text-sky-300 tracking-tighter uppercase leading-tight mb-2">Global<br/>Intelligence<br/>Market</h2>
          <p className="font-mono text-[10px] text-sky-400/50 tracking-widest uppercase">Compute Endpoints, Not Subscriptions -- 2026</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0f1923] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-bold text-base text-sky-400 tracking-widest uppercase">Global Intelligence</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-sky-400/60" />
        <span className="absolute top-8 text-[10px] font-mono text-sky-400/40 rotate-90">No. 02</span>
      </div>
    ),
  },
  {
    id: 'brokie-v2', slug: 'brokie-v2', year: '2026', isNew: true,
    title: 'Brokie V2', subtitle: 'Graph-Backed Agent Memory Engine',
    author: 'Caleb Cooper', fontTitle: 'font-mono',
    spineColor: '#0c1a0e', coverColor: '#0f2412', textColor: '#4ade80', textureClass: 'texture-rough',
    detailHref: '/work/brokie-v2/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-[#0f2412] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'repeating-linear-gradient(0deg,#4ade80 0px,#4ade80 1px,transparent 1px,transparent 24px),repeating-linear-gradient(90deg,#4ade80 0px,#4ade80 1px,transparent 1px,transparent 24px)'}} />
        <div className="absolute top-10 left-10 right-10 bottom-10 border border-green-500/10" />
        <div className="absolute inset-0 p-10 flex flex-col justify-center">
          <div className="text-green-400/20 font-mono text-[80px] font-black leading-none absolute -right-2 top-1/2 -translate-y-1/2">$</div>
          <span className="font-mono text-[10px] text-green-400/50 tracking-[0.3em] uppercase mb-6">Graph-Backed Agent Memory Engine</span>
          <h2 className="font-mono font-black text-6xl text-green-400 tracking-tighter mb-2">Brokie</h2>
          <span className="font-mono font-black text-2xl text-green-300/70 tracking-widest mb-4">V2</span>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-[1px] bg-green-400/40" />
            <span className="font-mono text-[10px] text-green-400/40 tracking-widest">2026</span>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0c1a0e] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono font-black text-xl text-green-400 tracking-widest">Brokie V2</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-green-400/60" />
        <span className="absolute top-8 text-[10px] font-mono text-green-400/40 rotate-90">No. 03</span>
      </div>
    ),
  },
  {
    id: 'cortex', slug: 'cortex', year: '2026',
    title: 'Cortex', subtitle: 'Pure-Math Agent Routing',
    author: 'Caleb Cooper', fontTitle: 'font-mono',
    spineColor: '#0a0010', coverColor: '#0d0018', textColor: '#e879f9', textureClass: 'texture-leather',
    detailHref: '/work/cortex/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-[#0d0018] overflow-hidden">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 50% 60%, #3b0764 0%, transparent 70%)'}} />
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 150">
          <polygon points="50,10 90,35 90,85 50,110 10,85 10,35" fill="none" stroke="#e879f9" strokeWidth="0.5"/>
          <polygon points="50,25 75,40 75,70 50,85 25,70 25,40" fill="none" stroke="#e879f9" strokeWidth="0.3"/>
          <line x1="50" y1="10" x2="50" y2="110" stroke="#e879f9" strokeWidth="0.2"/>
          <line x1="10" y1="35" x2="90" y2="85" stroke="#e879f9" strokeWidth="0.2"/>
          <line x1="90" y1="35" x2="10" y2="85" stroke="#e879f9" strokeWidth="0.2"/>
        </svg>
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <h2 className="font-mono font-black text-6xl text-fuchsia-300 tracking-tighter mb-2">CORTEX</h2>
          <p className="font-mono text-[10px] text-fuchsia-400/50 tracking-[0.3em] uppercase">Pure-Math Agent Routing -- 2026</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0a0010] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono font-black text-xl text-fuchsia-400 tracking-widest">CORTEX</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-fuchsia-400/60" />
        <span className="absolute top-8 text-[10px] font-mono text-fuchsia-400/40 rotate-90">No. 04</span>
      </div>
    ),
  },
  {
    id: 'life-tap-labs', slug: 'life-tap-labs', year: '2026',
    title: 'Life Tap Labs', subtitle: 'Agentic Cost Observability',
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#1c1200', coverColor: '#221600', textColor: '#fbbf24', textureClass: 'texture-paper',
    detailHref: '/work/life-tap-labs/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-[#221600] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(circle, #fbbf24 1px, transparent 1px)', backgroundSize:'18px 18px'}} />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-20 h-20 border-2 border-amber-400/30 rounded-full" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-amber-400/10 border border-amber-300/40" />
        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          <h2 className="font-serif text-4xl text-amber-300 leading-tight mb-2">Life Tap<br/>Labs</h2>
          <div className="w-6 h-[1px] bg-amber-400/40 mb-3" />
          <p className="font-mono text-[10px] text-amber-400/50 tracking-[0.25em] uppercase">Agentic Cost Observability -- 2026</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#1c1200] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-lg text-amber-400 tracking-widest">Life Tap Labs</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-amber-400/60" />
        <span className="absolute top-8 text-[10px] font-mono text-amber-400/40 rotate-90">No. 05</span>
      </div>
    ),
  },
  {
    id: 'panopticon', slug: 'panopticon', year: '2026',
    title: 'The Panopticon', subtitle: 'Agentic Observability at the Edge',
    author: 'Caleb Cooper', fontTitle: 'font-sans',
    spineColor: '#120000', coverColor: '#0d0000', textColor: '#ff4444', textureClass: 'texture-rough',
    detailHref: '/work/panopticon/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0" style={{background:'radial-gradient(circle at 50% 40%, #3f0000 0%, #000 60%)'}} />
        <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 150">
          <circle cx="50" cy="55" r="35" fill="none" stroke="#ff4444" strokeWidth="0.4"/>
          <circle cx="50" cy="55" r="25" fill="none" stroke="#ff4444" strokeWidth="0.3"/>
          <circle cx="50" cy="55" r="12" fill="none" stroke="#ff4444" strokeWidth="0.5"/>
          <circle cx="50" cy="55" r="3" fill="#ff4444" opacity="0.6"/>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>(
            <line key={a} x1="50" y1="55"
              x2={50+35*Math.cos(a*Math.PI/180)}
              y2={55+35*Math.sin(a*Math.PI/180)}
              stroke="#ff4444" strokeWidth="0.2"/>
          ))}
        </svg>
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <h2 className="font-sans font-black text-4xl text-red-400 tracking-tight uppercase mb-2">The<br/>Panopticon</h2>
          <p className="font-mono text-[10px] text-red-500/50 tracking-[0.3em] uppercase">Agentic Observability at the Edge -- 2026</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#120000] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-lg text-red-400 tracking-widest uppercase">The Panopticon</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-red-400/60" />
        <span className="absolute top-8 text-[10px] font-mono text-red-400/40 rotate-90">No. 06</span>
      </div>
    ),
  },
  {
    id: 'bonnie', slug: 'bonnie', year: '2026',
    title: 'Bonnie', subtitle: 'Your AI Gaming Companion',
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#1a0010', coverColor: '#200015', textColor: '#f9a8d4', textureClass: 'texture-paper',
    detailHref: '/work/bonnie/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-[#200015] overflow-hidden">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 30% 50%, #5b0030 0%, transparent 60%)'}} />
        <div className="absolute top-16 right-10 w-28 h-40 border border-pink-400/15 rounded-full" />
        <div className="absolute top-20 right-14 w-20 h-32 border border-pink-300/10 rounded-full" />
        <div className="absolute inset-0 p-10 flex flex-col justify-between">
          <span className="font-serif italic text-4xl text-pink-300/20">B</span>
          <div>
            <h2 className="font-serif italic text-6xl text-pink-200 tracking-tight mb-3">Bonnie</h2>
            <div className="w-10 h-[1px] bg-pink-400/40 mb-3" />
            <p className="font-mono text-[10px] text-pink-300/40 tracking-[0.3em] uppercase">AI Gaming Companion -- GTAV Online -- 2026</p>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#1a0010] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-serif italic text-xl text-pink-300 tracking-widest">Bonnie</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-pink-300/60" />
        <span className="absolute top-8 text-[10px] font-mono text-pink-300/40 rotate-90">No. 07</span>
      </div>
    ),
  },
  {
    id: 'byc2w', slug: 'byc2w', year: '2025',
    title: 'BYC2W', subtitle: '3 Hours. 5 Laffy Taffys. One Vision.',
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#1a0f00', coverColor: '#1e1200', textColor: '#fcd34d', textureClass: 'texture-canvas',
    detailHref: '/work/byc2w/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-[#1e1200] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{backgroundImage:'repeating-linear-gradient(45deg,#fcd34d 0,#fcd34d 1px,transparent 0,transparent 50%)',backgroundSize:'12px 12px'}} />
        <div className="absolute inset-8 border border-amber-400/10" />
        <div className="absolute inset-0 p-10 flex flex-col justify-center items-center text-center">
          <span className="font-mono text-[10px] text-amber-400/40 tracking-[0.4em] uppercase mb-6">3 Hours. 5 Laffy Taffys. One Vision.</span>
          <h2 className="font-serif text-6xl text-amber-300 tracking-tighter mb-4">BYC2W</h2>
          <div className="w-12 h-[1px] bg-amber-400/40 mb-4" />
          <p className="font-mono text-[10px] text-amber-400/40 tracking-widest uppercase">2025</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#1a0f00] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-xl text-amber-300 tracking-widest">BYC2W</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-amber-300/60" />
        <span className="absolute top-8 text-[10px] font-mono text-amber-300/40 rotate-90">No. 08</span>
      </div>
    ),
  },
  {
    id: 'boonk', slug: 'boonk', year: '2025', title: 'Boonk', subtitle: 'High-Fidelity Component Cloning',
    author: 'Caleb Cooper', fontTitle: 'font-sans',
    spineColor: '#0a0a0a', coverColor: '#111111', textColor: '#ffffff', textureClass: 'texture-leather',
    detailHref: '/work/boonk/index.html',
    coverContent: (<div className="absolute inset-0 bg-black overflow-hidden"><div className="absolute inset-6 border border-white/5" /><div className="absolute inset-10 border border-white/5" /><div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" /><div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5" /><div className="absolute inset-0 p-10 flex flex-col justify-between"><span className="font-sans font-black text-[80px] text-white/5 leading-none">B</span><div><h2 className="font-sans font-black text-5xl text-white tracking-tighter uppercase mb-2">Boonk</h2><div className="w-8 h-[1px] bg-white/30 mb-3" /><p className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">High-Fidelity Component Cloning -- 2025</p></div></div></div>),
    spineContent: (<div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center"><span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-xl text-white tracking-widest uppercase">Boonk</span><div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-white/40" /><span className="absolute top-8 text-[10px] font-mono text-white/30 rotate-90">No. 09</span></div>),
  },
  {
    id: 'brokie-v1', slug: 'brokie-v1', year: '2026', isNew: true, title: 'Brokie V1', subtitle: 'Premium Token Compression for Multi-Agent Workflows',
    author: 'Caleb Cooper', fontTitle: 'font-mono',
    spineColor: '#0a0f1a', coverColor: '#0d1420', textColor: '#38bdf8', textureClass: 'texture-leather',
    detailHref: '/work/brokie-v1/index.html',
    coverContent: (
      <div className="absolute inset-0 bg-[#0d1420] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'repeating-linear-gradient(0deg,#38bdf8 0px,#38bdf8 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#38bdf8 0px,#38bdf8 1px,transparent 1px,transparent 32px)'}} />
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 70% 20%, #0c3a5a 0%, transparent 60%)'}} />
        <div className="absolute top-10 left-10 right-10 bottom-10 border border-sky-500/10" />
        <div className="absolute inset-0 p-10 flex flex-col justify-center">
          <div className="text-sky-400/10 font-mono text-[72px] font-black leading-none absolute -right-1 top-1/2 -translate-y-1/2">V1</div>
          <span className="font-mono text-[9px] text-sky-400/50 tracking-[0.35em] uppercase mb-5">Intelligence Should Not Cost a Fortune</span>
          <h2 className="font-mono font-black text-5xl text-sky-300 tracking-tighter mb-1">Brokie</h2>
          <span className="font-mono font-black text-xl text-sky-400/60 tracking-widest mb-4">V1</span>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-[1px] bg-sky-400/40" />
            <span className="font-mono text-[10px] text-sky-400/40 tracking-widest">2026</span>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0a0f1a] flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono font-black text-lg text-sky-400 tracking-widest">Brokie V1</span>
        <div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-sky-400/60" />
        <span className="absolute top-8 text-[10px] font-mono text-sky-400/40 rotate-90">No. 10</span>
      </div>
    ),
  },
  {
    id: 'aquerone', slug: 'aquerone', year: '2024', title: 'FISHeye', subtitle: 'Luxury CBD Store', hidden: true,
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#001a16', coverColor: '#00201a', textColor: '#2dd4bf', textureClass: 'texture-canvas',
    detailHref: '/work/aquerone/index.html',
    coverContent: (<div className="absolute inset-0 bg-[#00201a] overflow-hidden"><div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 50% 30%,#004d3a 0%,transparent 65%)'}} /><div className="absolute inset-0 p-10 flex flex-col justify-end"><h2 className="font-serif italic text-6xl text-teal-200 tracking-tight mb-3">FISHeye</h2><div className="w-8 h-[1px] bg-teal-400/40 mb-3" /><p className="font-mono text-[10px] text-teal-300/40 tracking-[0.3em] uppercase">Luxury CBD Store -- 2024</p></div></div>),
    spineContent: (<div className="absolute inset-0 bg-[#001a16] flex items-center justify-center"><span className="[writing-mode:vertical-rl] rotate-180 font-serif italic text-xl text-teal-300 tracking-widest">FISHeye</span><div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-teal-300/60" /><span className="absolute top-8 text-[10px] font-mono text-teal-300/40 rotate-90">No. 11</span></div>),
  },
  {
    id: 'sal-parasuco', slug: 'sal-parasuco', year: '2022', title: 'Sentiment Analysis', subtitle: 'Luxury eCommerce AI', hidden: true,
    author: 'Caleb Cooper', fontTitle: 'font-sans',
    spineColor: '#1a0030', coverColor: '#1e003a', textColor: '#c084fc', textureClass: 'texture-leather',
    detailHref: '/work/sal-parasuco/index.html',
    coverContent: (<div className="absolute inset-0 bg-[#1e003a] overflow-hidden"><div className="absolute inset-0" style={{background:'linear-gradient(160deg,#3b0060 0%,#1e003a 50%,#0d001a 100%)'}} /><div className="absolute inset-0 p-10 flex flex-col justify-end"><h2 className="font-sans font-black text-3xl text-purple-200 tracking-tight uppercase leading-tight mb-3">Sentiment<br/>Analysis</h2><div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-purple-400" /><div className="w-2 h-2 rounded-full bg-purple-500/60" /><div className="w-2 h-2 rounded-full bg-purple-600/40" /></div><p className="font-mono text-[10px] text-purple-300/40 tracking-[0.25em] uppercase">Luxury eCommerce AI -- 2022</p></div></div>),
    spineContent: (<div className="absolute inset-0 bg-[#1a0030] flex items-center justify-center"><span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-base text-purple-300 tracking-widest uppercase">Sentiment</span><div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-purple-300/60" /><span className="absolute top-8 text-[10px] font-mono text-purple-300/40 rotate-90">No. 12</span></div>),
  },
  {
    id: 'edoardo-smerilli', slug: 'edoardo-smerilli', year: '2022', title: 'Markov Chains', subtitle: 'Film Director Portfolio', hidden: true,
    author: 'Caleb Cooper', fontTitle: 'font-mono',
    spineColor: '#080820', coverColor: '#0a0a28', textColor: '#a5b4fc', textureClass: 'texture-leather',
    detailHref: '/work/edoardo-smerilli/index.html',
    coverContent: (<div className="absolute inset-0 bg-[#0a0a28] overflow-hidden"><div className="absolute inset-0 p-8 flex flex-col justify-end"><h2 className="font-mono font-bold text-4xl text-indigo-200 tracking-tighter mb-2">Markov<br/>Chains</h2><div className="w-6 h-[1px] bg-indigo-300/40 mb-2" /><p className="font-mono text-[10px] text-indigo-300/40 tracking-[0.25em] uppercase">Film Director Portfolio -- 2022</p></div></div>),
    spineContent: (<div className="absolute inset-0 bg-[#080820] flex items-center justify-center"><span className="[writing-mode:vertical-rl] rotate-180 font-mono font-bold text-lg text-indigo-300 tracking-widest">Markov Chains</span><div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-indigo-300/60" /><span className="absolute top-8 text-[10px] font-mono text-indigo-300/40 rotate-90">No. 13</span></div>),
  },
  {
    id: 'chiara-luzzana', slug: 'chiara-luzzana', year: '2021', title: 'Data Science', subtitle: 'Sound Design Experience', hidden: true,
    author: 'Caleb Cooper', fontTitle: 'font-mono',
    spineColor: '#001a08', coverColor: '#001209', textColor: '#4ade80', textureClass: 'texture-rough',
    detailHref: '/work/chiara-luzzana/index.html',
    coverContent: (<div className="absolute inset-0 bg-black overflow-hidden"><div className="absolute bottom-0 left-0 right-0 h-2/3" style={{background:'linear-gradient(to top,black,transparent)'}} /><div className="absolute inset-0 p-8 flex flex-col justify-end"><h2 className="font-mono font-black text-4xl text-green-400 tracking-tighter mb-2">Data<br/>Science</h2><div className="flex items-center gap-2 mb-2"><span className="text-green-500/60 text-xs">&#9654;</span><div className="flex-1 h-[1px] bg-green-400/20" /></div><p className="font-mono text-[10px] text-green-400/40 tracking-[0.25em] uppercase">Sound Design -- 2021</p></div></div>),
    spineContent: (<div className="absolute inset-0 bg-[#001a08] flex items-center justify-center"><span className="[writing-mode:vertical-rl] rotate-180 font-mono font-black text-lg text-green-400 tracking-widest">Data Science</span><div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-green-400/60" /><span className="absolute top-8 text-[10px] font-mono text-green-400/40 rotate-90">No. 14</span></div>),
  },
  {
    id: 'loftgarten', slug: 'loftgarten', year: '2020', title: 'Biotech 2 + Lab', subtitle: 'Spatial Experiences', hidden: true,
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#001a20', coverColor: '#001e28', textColor: '#67e8f9', textureClass: 'texture-canvas',
    detailHref: '/work/loftgarten/index.html',
    coverContent: (<div className="absolute inset-0 bg-[#001e28] overflow-hidden"><div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 50% 80%,#004060 0%,transparent 60%)'}} /><div className="absolute inset-0 p-8 flex flex-col justify-end"><h2 className="font-serif text-4xl text-cyan-200 tracking-tight mb-2">Biotech 2<br/>+ Lab</h2><div className="w-6 h-[1px] bg-cyan-400/40 mb-2" /><p className="font-mono text-[10px] text-cyan-300/40 tracking-[0.25em] uppercase">Spatial Experiences -- 2020</p></div></div>),
    spineContent: (<div className="absolute inset-0 bg-[#001a20] flex items-center justify-center"><span className="[writing-mode:vertical-rl] rotate-180 font-serif text-lg text-cyan-300 tracking-widest">Biotech 2 + Lab</span><div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-cyan-300/60" /><span className="absolute top-8 text-[10px] font-mono text-cyan-300/40 rotate-90">No. 15</span></div>),
  },
  {
    id: 'deplace-maison', slug: 'deplace-maison', year: '2020', title: 'Biotech 1 + Lab', subtitle: 'Urban Trekking eCommerce', hidden: true,
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#1a0030', coverColor: '#1e0038', textColor: '#e879f9', textureClass: 'texture-canvas',
    detailHref: '/work/deplace-maison/index.html',
    coverContent: (<div className="absolute inset-0 bg-[#1e0038] overflow-hidden"><div className="absolute inset-0" style={{background:'linear-gradient(135deg,#400060 0%,#1e0038 60%,#0a0018 100%)'}} /><div className="absolute inset-0 p-8 flex flex-col justify-end"><h2 className="font-serif text-4xl text-fuchsia-200 tracking-tight mb-2">Biotech 1<br/>+ Lab</h2><div className="w-6 h-[1px] bg-fuchsia-400/40 mb-2" /><p className="font-mono text-[10px] text-fuchsia-300/40 tracking-[0.25em] uppercase">Urban Trekking -- 2020</p></div></div>),
    spineContent: (<div className="absolute inset-0 bg-[#1a0030] flex items-center justify-center"><span className="[writing-mode:vertical-rl] rotate-180 font-serif text-lg text-fuchsia-300 tracking-widest">Biotech 1 + Lab</span><div className="absolute bottom-8 w-1.5 h-1.5 rounded-full bg-fuchsia-300/60" /><span className="absolute top-8 text-[10px] font-mono text-fuchsia-300/40 rotate-90">No. 16</span></div>),
  },
];

export const works: WorkProject[] = allWorks.filter(w => !w.hidden);
