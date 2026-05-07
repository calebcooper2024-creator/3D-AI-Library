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

export const works: WorkProject[] = [
  {
    id: 'project-winter-haven', slug: 'project-winter-haven', year: '2026', isNew: true, hidden: true,
    title: 'Winter Haven', subtitle: 'World Models and A2-UI',
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#0a0a0f', coverColor: '#0d0d1a', textColor: '#c8b8ff', textureClass: 'texture-leather',
    detailHref: '/CalebCooper/Library/project-winter-haven',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/winter_haven_1777746369741.png')" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(125,211,252,0.08),transparent_20%),radial-gradient(circle_at_76%_20%,rgba(56,189,248,0.06),transparent_18%),linear-gradient(180deg,rgba(3,7,18,0.06)_0%,rgba(3,7,18,0.42)_46%,rgba(0,0,0,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_0%,transparent_18%,transparent_82%,rgba(255,255,255,0.025)_100%)]" />
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="text-right font-mono uppercase">
              <span className="block text-[10px] text-sky-200/84 tracking-[0.32em]">No. 01</span>
              <span className="block mt-1 text-[9px] text-sky-300/50 tracking-[0.26em]">2026</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2 text-[8px] font-mono uppercase tracking-[0.34em] text-sky-100/68">
              <span>operator intent</span>
              <span className="h-px w-6 bg-sky-300/30" />
              <span>routing substrate</span>
              <span className="h-px w-6 bg-sky-300/30" />
              <span>truth-state</span>
            </div>
            <div className="max-w-[20rem]">
              <p className="font-mono text-[8px] text-sky-100/78 tracking-[0.38em] uppercase mb-2">Personal Project</p>
              <p className="font-mono text-[9px] text-sky-100/58 tracking-[0.34em] uppercase mb-3">World models, A2-UI, and agentic visualization</p>
              <h2 className="font-serif text-5xl md:text-[3.4rem] text-white leading-[0.9] tracking-tight mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">Winter<br/>Haven</h2>
              <div className="w-10 h-[1px] bg-sky-300/55 shadow-[0_0_12px_rgba(56,189,248,0.28)] mb-3" />
              <p className="font-mono text-[9px] text-sky-100/62 tracking-[0.3em] uppercase leading-relaxed max-w-[15rem]">
                World-model interface surface for A2-UI, retrace, simulation, and agentic state projection.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[8px] font-mono uppercase tracking-[0.28em] text-sky-100/52">
              <span>governance</span>
              <span className="h-px w-8 bg-sky-300/24" />
              <span>evidence</span>
              <span className="h-px w-8 bg-sky-300/24" />
              <span>telemetry</span>
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#e2e8f0] flex flex-col items-center justify-start py-6 overflow-hidden border-r border-slate-300 shadow-[inset_-3px_0_15px_rgba(0,0,0,0.1)]">
        <div className="w-full h-8 bg-slate-900 flex items-center justify-center mb-6">
          <span className="font-mono text-[8px] text-slate-100 font-bold tracking-widest">REF</span>
        </div>
        <span className="[writing-mode:vertical-rl] font-sans font-black text-[24px] text-slate-900 tracking-tight uppercase">
          WINTER HAVEN
        </span>
        <div className="w-full px-2 mt-auto pb-4">
          <div className="w-full h-[2px] bg-slate-900 mb-2" />
          <span className="block font-mono text-[6px] text-slate-600 text-center uppercase tracking-widest">
            A2-UI
            <br />
            SYS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'global-intelligence-market', slug: 'global-intelligence-market', year: '2026', isNew: true,
    title: 'Global Intelligence Market', subtitle: 'Compute Endpoints, Not Subscriptions',
    author: 'Caleb Cooper', fontTitle: 'font-sans',
    spineColor: '#171717', coverColor: '#262626', textColor: '#facc15', textureClass: 'texture-paper',
    detailHref: '/CalebCooper/Library/global-intelligence-market',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(0,0,0,0.4)]" style={{ backgroundImage: "url('/images/books/gim_cover_new.jpg')" }}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,0.95)_100%)]" />
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="text-right font-mono uppercase">
              <span className="block text-[10px] text-white/80 tracking-[0.32em]">No. 13</span>
              <span className="block mt-1 text-[9px] text-white/50 tracking-[0.26em]">2026</span>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] items-end gap-4">
            <div className="min-w-0">
              <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.38em] text-yellow-400">Personal Project</p>
              <div className="mb-3 flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.34em] text-white/70">
                <span>bid</span>
                <span className="h-px w-6 bg-white/30" />
                <span>route</span>
                <span className="h-px w-6 bg-white/30" />
                <span>settle</span>
              </div>
              <h2 className="font-sans font-black text-[2.55rem] md:text-5xl text-white tracking-[-0.02em] uppercase leading-[0.9] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Global<br/>Intelligence<br/>Market
              </h2>
              <div className="mt-4 h-px w-14 bg-yellow-400/80 shadow-[0_0_12px_rgba(250,204,21,0.5)]" />
              <p className="mt-3 max-w-[15rem] font-mono text-[9px] text-white/80 tracking-[0.3em] uppercase leading-relaxed">
                Compute Endpoints, Not Subscriptions
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#171717] flex flex-col items-center justify-between py-8 overflow-hidden border-r border-black shadow-[inset_-3px_0_15px_rgba(0,0,0,0.6)]">
        <div className="w-full flex justify-center mb-4">
          <span className="font-mono text-[8px] text-yellow-400/80 font-bold tracking-widest">13</span>
        </div>
        <div className="my-auto">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[42px] text-white tracking-[-0.02em]">
            GIM
          </span>
        </div>
        <div className="w-full flex flex-col items-center mt-4 gap-2">
          <div className="w-4 h-[2px] bg-yellow-400" />
        </div>
      </div>
    ),
  },
  {
    id: 'brokie-v2', slug: 'brokie-v2', year: '2026', isNew: true,
    title: 'Brokie V2', subtitle: 'Graph-Backed Agent Memory Engine',
    author: 'Caleb Cooper', fontTitle: 'font-mono',
    spineColor: '#0c1a0e', coverColor: '#0f2412', textColor: '#4ade80', textureClass: 'texture-rough',
    detailHref: '/CalebCooper/Library/brokie-v2',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/brokie_v2_cover_new.jpg')" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(74,222,128,0.12),transparent_22%),radial-gradient(circle_at_78%_24%,rgba(187,247,208,0.08),transparent_18%),linear-gradient(180deg,rgba(6,18,8,0.08)_0%,rgba(6,18,8,0.46)_44%,rgba(0,0,0,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_0%,transparent_16%,transparent_84%,rgba(255,255,255,0.03)_100%)]" />
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="text-right font-mono uppercase">
              <span className="block text-[10px] text-green-200/86 tracking-[0.32em]">No. 06</span>
              <span className="block mt-1 text-[9px] text-green-300/56 tracking-[0.26em]">2026</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-mono text-[8px] text-green-100/80 tracking-[0.38em] uppercase">Personal Project</p>
            <div className="flex flex-wrap items-center gap-2 text-[8px] font-mono uppercase tracking-[0.34em] text-green-100/72">
              <span>graph substrate</span>
              <span className="h-px w-6 bg-green-300/30" />
              <span>truth settlement</span>
              <span className="h-px w-6 bg-green-300/30" />
              <span>watcher ring</span>
            </div>
            <div className="max-w-[19rem]">
              <p className="font-mono text-[9px] text-green-100/60 tracking-[0.34em] uppercase mb-3">Mindball / retrace surface / evidence packets</p>
              <h2 className="font-mono font-black text-5xl md:text-6xl text-white tracking-tighter leading-[0.92] mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
                Brokie
              </h2>
              <div className="flex items-end gap-3">
                <span className="font-mono font-black text-2xl text-green-300/72 tracking-[0.34em]">V2</span>
                <div className="h-[1px] flex-1 bg-green-300/60 shadow-[0_0_12px_rgba(74,222,128,0.35)] mb-2" />
              </div>
              <p className="mt-4 max-w-[16rem] font-mono text-[9px] text-green-100/66 tracking-[0.3em] uppercase leading-relaxed">
                Local graph, memory, truth-settlement, watcher-runtime, and projection substrate for Winter Haven.
              </p>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded border border-green-200/14 bg-black/24 px-3 py-2 backdrop-blur-[2px]">
              <div className="flex flex-col gap-1 text-[7px] font-mono uppercase tracking-[0.22em] text-green-100/52">
                <span>projection lens</span>
                <span>runtime health</span>
              </div>
              <div className="h-px bg-green-300/24" />
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0f2412] flex flex-col items-center justify-center py-2 overflow-hidden border-r border-green-900/60 shadow-[inset_-4px_0_12px_rgba(0,0,0,0.8)]">
        <span className="[writing-mode:vertical-rl] font-mono font-black text-[54px] text-green-500/10 tracking-tighter uppercase whitespace-nowrap overflow-hidden">
          BROKIE V2 BROKIE V2
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[28px] text-[#4ade80] tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
            BROKIE<br/>
            <span className="text-white text-[20px] ml-2">V2</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'cortex', slug: 'cortex', year: '2026',
    title: 'Cortex', subtitle: 'Pure-Math Agent Routing',
    author: 'Caleb Cooper', fontTitle: 'font-mono',
    spineColor: '#0a0010', coverColor: '#0d0018', textColor: '#e879f9', textureClass: 'texture-leather',
    detailHref: '/CalebCooper/Library/cortex',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/cortex_1777746414041.png')" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(232,121,249,0.14),transparent_20%),radial-gradient(circle_at_76%_22%,rgba(216,180,254,0.08),transparent_18%),linear-gradient(180deg,rgba(8,0,16,0.08)_0%,rgba(8,0,16,0.45)_46%,rgba(0,0,0,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_0%,transparent_16%,transparent_84%,rgba(255,255,255,0.025)_100%)]" />
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="text-right font-mono uppercase">
              <span className="block text-[10px] text-fuchsia-200/84 tracking-[0.32em]">No. 09</span>
              <span className="block mt-1 text-[9px] text-fuchsia-300/56 tracking-[0.26em]">2026</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-mono text-[8px] text-fuchsia-100/80 tracking-[0.38em] uppercase">Personal Project</p>
            <div className="flex flex-wrap items-center gap-2 text-[8px] font-mono uppercase tracking-[0.34em] text-fuchsia-100/72">
              <span>endpoint slotting</span>
              <span className="h-px w-6 bg-fuchsia-300/30" />
              <span>backup route</span>
              <span className="h-px w-6 bg-fuchsia-300/30" />
              <span>telemetry ledger</span>
            </div>
            <div className="max-w-[18rem]">
              <h2 className="font-mono font-black text-5xl md:text-6xl text-white tracking-tighter mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">CORTEX</h2>
              <div className="grid grid-cols-[1fr_auto] items-end gap-4">
                <div>
                  <div className="w-10 h-[1px] bg-fuchsia-300/60 shadow-[0_0_12px_rgba(232,121,249,0.35)] mb-3" />
                  <p className="font-mono text-[9px] text-fuchsia-200/68 tracking-[0.32em] uppercase leading-relaxed">
                    Routing substrate for model endpoints, failover, quota, latency, and execution policy.
                  </p>
                </div>
                <div className="rounded border border-fuchsia-200/12 bg-black/24 px-3 py-2 backdrop-blur-[2px]">
                  <p className="font-mono text-[7px] uppercase tracking-[0.28em] text-fuchsia-100/58">status</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-fuchsia-100/82">slot health / route</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[8px] font-mono uppercase tracking-[0.28em] text-fuchsia-100/55">
              <span>WinterMarket bridge</span>
              <span className="h-px w-8 bg-fuchsia-300/24" />
              <span>Brokie telemetry</span>
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0a0010] flex flex-col items-center justify-end py-8 overflow-hidden border-r border-fuchsia-900/30 shadow-[inset_-2px_0_18px_rgba(0,0,0,0.45)]">
        <div className="w-4 h-4 rounded-full border border-fuchsia-500/40 mb-3" />
        <span className="[writing-mode:vertical-rl] font-mono text-[9px] text-fuchsia-200/80 tracking-[0.4em] uppercase mb-4">
          CORTEX
        </span>
        <div className="w-full border-t border-fuchsia-500/20 pt-3">
          <span className="block font-sans text-[6px] text-fuchsia-400/60 text-center uppercase tracking-widest">09</span>
        </div>
      </div>
    ),
  },
  {
    id: 'life-tap-labs', slug: 'life-tap-labs', year: '2026',
    title: 'Agentic Dashboards', subtitle: 'Operator Surfaces for Agentic Systems',
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#ffffff', coverColor: '#f8fafc', textColor: '#0f172a', textureClass: 'texture-paper',
    detailHref: '/CalebCooper/Library/life-tap-labs',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] border-8 border-white" style={{ backgroundImage: "url('/images/books/agentic_dashboards_cover.jpg')" }}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.7)_40%,rgba(255,255,255,0.95)_100%)]" />
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="text-right font-mono uppercase">
              <span className="block text-[10px] text-slate-800 tracking-[0.32em]">No. 05</span>
              <span className="block mt-1 text-[9px] text-slate-500 tracking-[0.26em]">2026</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-mono text-[8px] text-blue-600 tracking-[0.38em] uppercase">Personal Project</p>
            <div className="flex flex-wrap items-center gap-2 text-[8px] font-mono uppercase tracking-[0.34em] text-slate-500">
              <span>control plane</span>
              <span className="h-px w-6 bg-slate-300" />
              <span>trace telemetry</span>
            </div>
            <div className="max-w-[18rem]">
              <h2 className="font-serif text-4xl md:text-[3.35rem] text-slate-900 leading-[0.9] tracking-tight mb-3">
                Agentic<br/>Dashboards
              </h2>
              <div className="w-10 h-[2px] bg-blue-600 mb-3" />
              <p className="font-mono text-[9px] text-slate-600 tracking-[0.32em] uppercase leading-relaxed">
                Operator surface for traces, prompts, approvals, artifacts, and live execution visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-between py-6 overflow-hidden border-r border-slate-200 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.05)]">
        <span className="font-sans font-black text-[10px] text-blue-600 tracking-widest uppercase mb-4">
          05
        </span>
        <div className="my-auto flex items-center justify-center">
          <span className="[writing-mode:vertical-rl] font-serif font-bold text-[22px] text-slate-900 tracking-tight uppercase">
            AGENTIC DASHBOARDS
          </span>
        </div>
        <div className="w-full flex justify-center mt-4">
          <div className="w-2 h-2 bg-blue-600" />
        </div>
      </div>
    ),
  },
  {
    id: 'panopticon', slug: 'panopticon', year: '2026',
    title: 'The Panopticon', subtitle: 'Agentic Observability at the Edge',
    author: 'Caleb Cooper', fontTitle: 'font-sans',
    spineColor: '#120000', coverColor: '#0d0000', textColor: '#ff4444', textureClass: 'texture-rough',
    detailHref: '/CalebCooper/Library/panopticon',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/panopticon_1777746444071.png')" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(3,2,4,0.04)_0%,rgba(3,2,4,0.42)_48%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_0%,transparent_16%,transparent_84%,rgba(255,255,255,0.03)_100%)]" />
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="text-right font-mono uppercase">
              <span className="block text-[10px] text-red-200/82 tracking-[0.32em]">No. 12</span>
              <span className="block mt-1 text-[9px] text-red-300/56 tracking-[0.26em]">2026</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-mono text-[8px] text-red-50/82 tracking-[0.38em] uppercase">Personal Project</p>
            <div className="flex flex-wrap items-center gap-2 text-[8px] font-mono uppercase tracking-[0.34em] text-red-100/70">
              <span>source status</span>
              <span className="h-px w-6 bg-red-300/30" />
              <span>timeline</span>
              <span className="h-px w-6 bg-red-300/30" />
              <span>local evidence</span>
            </div>
            <div className="max-w-[18rem]">
              <p className="font-mono text-[9px] text-red-100/60 tracking-[0.34em] uppercase mb-3">Observatory / read-only inspection</p>
              <h2 className="font-sans font-black text-4xl md:text-5xl text-white tracking-tight uppercase leading-[0.9] drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
                The<br/>Panopticon
              </h2>
              <div className="mt-4 h-px w-14 bg-red-300/60 shadow-[0_0_12px_rgba(255,68,68,0.28)]" />
              <p className="mt-3 max-w-[15rem] font-mono text-[9px] text-red-100/64 tracking-[0.3em] uppercase leading-relaxed">
                Local-first voice companion for grounding, freshness checks, and evidence-led inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#120000] flex flex-col items-center justify-between py-9 overflow-hidden border-r border-red-900/30 shadow-[inset_-2px_0_15px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_22%,transparent_78%,rgba(255,255,255,0.03)_100%)]" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[7px] text-red-300/62 uppercase tracking-[0.36em] relative z-10 mt-4">
          observatory / source status / timeline
        </span>
        <div className="flex flex-col items-center gap-4 relative z-10 my-auto">
          <div className="rounded-sm border border-red-200/14 bg-black/22 px-2 py-1">
            <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[18px] text-white tracking-[0.12em] uppercase">
              THE PANOPTICON
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[1px] h-14 bg-gradient-to-b from-red-400/70 via-red-400/28 to-transparent shadow-[0_0_10px_rgba(255,68,68,0.42)]" />
            <div className="flex flex-col gap-1">
              <div className="h-[1px] w-8 bg-red-300/28" />
              <div className="h-[1px] w-5 bg-red-300/20" />
              <div className="h-[1px] w-7 bg-red-300/18" />
            </div>
          </div>
          <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[6px] text-red-100/50 uppercase tracking-[0.28em]">
            grounding / read-only inspection / local evidence
          </span>
        </div>
        <div className="mb-4 flex flex-col items-center gap-1 relative z-10">
          <span className="font-mono text-[9px] text-red-100/66 uppercase tracking-[0.26em]">No. 12</span>
          <span className="font-mono text-[8px] text-red-300/42 uppercase tracking-[0.22em]">2026</span>
        </div>
      </div>
    ),
  },
  {
    id: 'bonnie', slug: 'bonnie', year: '2026',
    title: 'Bonnie', subtitle: 'Your AI Gaming Companion',
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#1a0010', coverColor: '#200015', textColor: '#f9a8d4', textureClass: 'texture-paper',
    detailHref: '/CalebCooper/Library/bonnie',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/bonnie_cover_new.jpg')" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,168,212,0.18),transparent_42%),linear-gradient(180deg,rgba(3,2,7,0.08)_0%,rgba(3,2,7,0.55)_48%,rgba(0,0,0,0.96)_100%)]" />
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="text-right">
              <span className="block font-mono text-[9px] text-pink-300/70 tracking-[0.28em] uppercase">No. 03</span>
              <span className="block font-mono text-[9px] text-pink-300/40 tracking-[0.22em] uppercase mt-1">2026</span>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="max-w-[82%]">
              <p className="font-mono text-[8px] text-pink-100/78 tracking-[0.38em] uppercase mb-3">Personal Project</p>
              <p className="font-mono text-[10px] text-pink-200/70 tracking-[0.34em] uppercase mb-4">GTAV FIELD COMPANION</p>
              <h2 className="font-serif italic text-6xl md:text-7xl text-white tracking-tight leading-[0.88] mb-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">Bonnie</h2>
              <div className="w-12 h-[1px] bg-pink-300/70 mb-4 shadow-[0_0_14px_rgba(249,168,212,0.35)]" />
              <p className="font-mono text-[9px] text-pink-100/55 tracking-[0.34em] uppercase leading-relaxed max-w-[16rem]">
                Tactical teammate for live crew calls, mission reads, and underworld support.
              </p>
            </div>
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-pink-200/30" />
              <span className="font-mono text-[9px] text-pink-100/45 tracking-[0.26em] uppercase">Crew-aware / session-first / controlled</span>
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#16000f] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-pink-900/30 shadow-[inset_-2px_0_18px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_20%,transparent_80%,rgba(0,0,0,0.2)_100%)]" />
        <div className="flex flex-col items-center gap-5 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] rotate-180 font-serif italic text-[23px] text-white tracking-[0.08em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
            Bonnie
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400/70 shadow-[0_0_10px_rgba(249,168,212,0.6)]" />
            <div className="w-8 h-px bg-pink-300/20" />
          </div>
          <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[8px] text-pink-100/55 uppercase tracking-[0.28em]">
            Field Companion
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 relative z-10 mb-4">
          <span className="font-mono text-[9px] text-pink-200/55 font-bold uppercase tracking-[0.3em]">No. 03</span>
          <span className="font-mono text-[8px] text-pink-300/40 uppercase tracking-[0.24em]">2026</span>
        </div>
      </div>
    ),
  },
  {
    id: 'byc2w', slug: 'byc2w', year: '2025',
    title: 'BYC2W', subtitle: '3 Hours. 5 Laffy Taffys. One Vision.',
    author: 'Caleb Cooper', fontTitle: 'font-serif',
    spineColor: '#1a0f00', coverColor: '#1e1200', textColor: '#fcd34d', textureClass: 'texture-canvas',
    detailHref: '/CalebCooper/Library/byc2w',
    coverContent: (
      <div
        className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.82)]"
        style={{ backgroundImage: "url('/images/books/byc2w_1777746475201.png')" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,245,182,0.12),transparent_22%),radial-gradient(circle_at_76%_28%,rgba(125,211,252,0.1),transparent_18%),linear-gradient(to_bottom,rgba(4,10,24,0.02),rgba(4,10,24,0.18)_55%,rgba(10,6,0,0.42))]" />
        <div className="absolute inset-0">
          <div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-amber-200/22 shadow-[0_0_14px_rgba(251,191,36,0.1)]" />
          <div className="absolute left-[5.75rem] top-14 h-[1px] w-20 rotate-[-22deg] bg-amber-100/22" />
          <div className="absolute right-7 top-12 h-28 w-28 rounded-full border border-sky-200/18 shadow-[0_0_18px_rgba(125,211,252,0.08)]" />
          <div className="absolute right-20 top-28 h-[1px] w-16 rotate-[18deg] bg-sky-100/22" />
          <div className="absolute left-10 bottom-28 h-24 w-px bg-gradient-to-b from-transparent via-amber-200/22 to-transparent" />
          <div className="absolute right-14 bottom-32 h-16 w-px bg-gradient-to-b from-transparent via-sky-200/18 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-[10rem] rounded-2xl border border-amber-200/12 bg-black/14 px-3 py-2 backdrop-blur-[1px]">
              <p className="font-mono text-[8px] uppercase tracking-[0.34em] text-amber-50/80">Astrolab Notebook</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-sky-50/78">Kid ideas. AI. Gravity.</p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-50/92">
              No. 07 -- 2025
            </span>
          </div>
          <div className="relative">
            <div className="absolute -left-2 -top-5 h-12 w-12 rounded-full border border-amber-100/14" />
            <div className="absolute -left-1 top-1 h-8 w-8 rounded-full border border-sky-100/14" />
            <p className="relative z-10 mb-3 font-mono text-[8px] uppercase tracking-[0.38em] text-amber-50/92">Personal Project</p>
            <h2 className="relative z-10 font-serif text-6xl text-white tracking-tighter drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              BYC2W
            </h2>
            <div className="mt-3 h-[1px] w-20 bg-gradient-to-r from-amber-200/40 via-amber-300/20 to-transparent" />
            <p className="mt-3 max-w-[14rem] font-mono text-[9px] uppercase tracking-[0.28em] text-amber-50/82">
              A young inventor&apos;s space notebook, built with AI in about 3 hours.
            </p>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 overflow-hidden border-r border-amber-900/30 bg-[#ead36c]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.34),transparent_24%),linear-gradient(to_bottom,rgba(255,255,255,0.16),rgba(181,138,26,0.14))]" />
        <div className="absolute inset-0 flex flex-col items-center justify-between py-10">
          <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[7px] text-amber-950/60 uppercase tracking-[0.32em] relative z-10">
            Space + Physics Notebook
          </span>
          <div className="flex flex-col items-center gap-4 relative z-10 my-auto">
            <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-[22px] text-amber-950 tracking-[0.12em] drop-shadow-[0_1px_10px_rgba(255,255,255,0.18)]">
              BYC2W
            </span>
            <div className="w-[1px] h-11 bg-gradient-to-b from-amber-950/45 via-amber-800/30 to-transparent shadow-[0_0_8px_rgba(120,86,0,0.2)]" />
            <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[6px] text-amber-950/65 uppercase tracking-[0.34em]">
              AI-made wonder
            </span>
          </div>
          <div className="relative z-10 mb-4 flex items-center gap-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.26em] text-amber-950/70">
              No. 07
            </span>
            <span className="h-px w-8 bg-amber-950/25" />
            <span className="font-mono text-[8px] uppercase tracking-[0.26em] text-amber-950/60">
              2025
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'boonk', slug: 'boonk', year: '2025', title: 'Boonk', subtitle: 'High-Fidelity Website Cloning',
    author: 'Caleb Cooper', fontTitle: 'font-sans',
    spineColor: '#0a0a0a', coverColor: '#111111', textColor: '#ffffff', textureClass: 'texture-leather',
    detailHref: '/CalebCooper/Library/boonk',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/boonk_1777746488106.png')" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.38)_44%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_0%,transparent_18%,transparent_82%,rgba(255,255,255,0.03)_100%)] p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <span className="font-mono text-[10px] text-zinc-300/72 tracking-[0.3em] uppercase">No. 04 -- 2025</span>
          </div>
          <div className="max-w-[16rem]">
            <p className="font-mono text-[8px] text-zinc-200/78 tracking-[0.38em] uppercase mb-3">Personal Project</p>
            <p className="font-mono text-[8px] text-zinc-300/56 tracking-[0.34em] uppercase mb-3">Inspect / Clone / Localize / Preview</p>
            <h2 className="font-sans font-black text-5xl text-white tracking-tighter uppercase mb-2">Boonk</h2>
            <div className="w-8 h-[1px] bg-zinc-300/45 mb-3" />
            <p className="font-mono text-[9px] text-zinc-100/70 tracking-[0.34em] uppercase mb-4">High-Fidelity Website Cloning</p>
            <p className="font-mono text-[8px] text-zinc-300/46 tracking-[0.24em] uppercase leading-relaxed">Live-site inspection, asset rewriting, multipage export, and local preview hardening.</p>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-between py-0 overflow-hidden border-r border-zinc-900 shadow-[inset_-2px_0_15px_rgba(0,0,0,0.8)]">
        <div className="w-full bg-zinc-100 py-3 flex items-center justify-center shadow-md">
          <span className="font-mono text-[8px] text-zinc-900 font-bold uppercase tracking-widest">
            04
          </span>
        </div>
        <div className="my-auto flex flex-col gap-2 w-full px-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`w-full bg-zinc-800 ${i % 2 === 0 ? 'py-1' : 'py-2'} flex items-center justify-center`}>
              <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[12px] text-white tracking-widest uppercase opacity-70">
                BOONK
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'brokie-v1', slug: 'brokie-v1', year: '2026', isNew: true, title: 'Brokie V1', subtitle: 'Premium Token Compression for Multi-Agent Workflows',
    author: 'Caleb Cooper', fontTitle: 'font-mono',
    spineColor: '#0a0f1a', coverColor: '#0d1420', textColor: '#38bdf8', textureClass: 'texture-leather',
    detailHref: '/CalebCooper/Library/brokie-v1',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/brokie_v1_custom.jpg')" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_76%_26%,rgba(147,197,253,0.08),transparent_18%),linear-gradient(180deg,rgba(5,10,18,0.06)_0%,rgba(5,10,18,0.44)_46%,rgba(0,0,0,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_0%,transparent_16%,transparent_84%,rgba(255,255,255,0.03)_100%)]" />
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="text-right font-mono uppercase">
              <span className="block text-[10px] text-sky-200/86 tracking-[0.32em]">No. 05</span>
              <span className="block mt-1 text-[9px] text-sky-300/56 tracking-[0.26em]">2026</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-mono text-[8px] text-sky-100/80 tracking-[0.38em] uppercase">Personal Project</p>
            <div className="flex flex-wrap items-center gap-2 text-[8px] font-mono uppercase tracking-[0.34em] text-sky-100/72">
              <span>compression pipeline</span>
              <span className="h-px w-6 bg-sky-300/30" />
              <span>protocol discipline</span>
              <span className="h-px w-6 bg-sky-300/30" />
              <span>cost control</span>
            </div>
            <div className="max-w-[18rem]">
              <p className="font-mono text-[9px] text-sky-100/60 tracking-[0.34em] uppercase mb-3">Token budget / agent handoff / slot hygiene</p>
              <h2 className="font-mono font-black text-5xl md:text-6xl text-white tracking-tighter mb-2 drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">Brokie</h2>
              <div className="flex items-end gap-3">
                <span className="font-mono font-black text-2xl text-sky-300/72 tracking-[0.34em]">V1</span>
                <div className="h-[1px] flex-1 bg-sky-300/60 shadow-[0_0_12px_rgba(56,189,248,0.35)] mb-2" />
              </div>
              <p className="mt-4 max-w-[16rem] font-mono text-[9px] text-sky-100/66 tracking-[0.3em] uppercase leading-relaxed">
                Premium token compression for multi-agent workflows and disciplined routing handoffs.
              </p>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded border border-sky-200/14 bg-black/24 px-3 py-2 backdrop-blur-[2px]">
              <div className="flex flex-col gap-1 text-[7px] font-mono uppercase tracking-[0.22em] text-sky-100/52">
                <span>protocol</span>
                <span>throughput</span>
              </div>
              <div className="h-px bg-sky-300/24" />
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#162130] flex flex-col items-center justify-between py-6 overflow-hidden border-r border-sky-900/40 shadow-[inset_-3px_0_15px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_10%,transparent_90%,rgba(0,0,0,0.4)_100%)]" />
        <div className="w-full px-2">
          <div className="h-0.5 w-full bg-sky-500/80 mb-1" />
          <div className="h-[1px] w-full bg-sky-500/40" />
        </div>
        <div className="flex flex-col items-center gap-2 relative z-10 w-full px-1">
          <span className="font-sans font-black text-[12px] text-white tracking-widest uppercase text-center break-words leading-tight">
            BROKIE<br/>V1
          </span>
          <span className="font-serif italic text-[7px] text-sky-200/80 tracking-widest mt-2">
            Cooper
          </span>
        </div>
        <div className="w-full px-2 mt-auto">
          <div className="h-[1px] w-full bg-sky-500/40 mb-1" />
          <div className="h-0.5 w-full bg-sky-500/80" />
        </div>
      </div>
    ),
  },
];
