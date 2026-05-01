import React from 'react';
import { BookProject } from './portfolio';

export const aboutMeBook: BookProject = {
  id: 'about-caleb',
  title: 'Caleb Cooper',
  subtitle: 'AI Systems Engineer',
  author: 'Caleb Cooper',
  showAuthorBadge: false,
  spineColor: '#040404',
  coverColor: '#080808',
  textColor: '#c9a04e',
  fontTitle: 'font-serif',
  textureClass: 'texture-leather',

  coverContent: (
    <div className="absolute inset-0 bg-[#080808] overflow-hidden">
      {/* Warm core glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 44%, #141006 0%, #000 72%)' }} />

      {/* Topographic contour lines â€” the visual signature */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 400" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="140" cy="148" rx="8"   ry="5"   transform="rotate(-15 140 148)" fill="none" stroke="#c9a04e" strokeWidth="0.6" opacity="0.76"/>
        <ellipse cx="140" cy="150" rx="18"  ry="11"  transform="rotate(-12 140 150)" fill="none" stroke="#c9a04e" strokeWidth="0.5" opacity="0.60"/>
        <ellipse cx="141" cy="152" rx="32"  ry="21"  transform="rotate(-8  141 152)" fill="none" stroke="#c9a04e" strokeWidth="0.45" opacity="0.46"/>
        <ellipse cx="141" cy="155" rx="50"  ry="33"  transform="rotate(-5  141 155)" fill="none" stroke="#c9a04e" strokeWidth="0.4"  opacity="0.33"/>
        <ellipse cx="140" cy="158" rx="72"  ry="50"  transform="rotate(-2  140 158)" fill="none" stroke="#c9a04e" strokeWidth="0.35" opacity="0.22"/>
        <ellipse cx="139" cy="162" rx="99"  ry="70"  transform="rotate(2   139 162)" fill="none" stroke="#c9a04e" strokeWidth="0.3"  opacity="0.14"/>
        <ellipse cx="138" cy="168" rx="130" ry="94"  transform="rotate(5   138 168)" fill="none" stroke="#c9a04e" strokeWidth="0.25" opacity="0.09"/>
        <ellipse cx="137" cy="175" rx="165" ry="120" transform="rotate(7   137 175)" fill="none" stroke="#c9a04e" strokeWidth="0.2"  opacity="0.05"/>
        {/* Summit marker */}
        <circle cx="140" cy="148" r="1.8" fill="#c9a04e" opacity="0.7"/>
        <circle cx="140" cy="148" r="3.5" fill="none" stroke="#c9a04e" strokeWidth="0.4" opacity="0.3"/>
        {/* Text separator rule */}
        <line x1="40" y1="263" x2="240" y2="263" stroke="#c9a04e" strokeWidth="0.5" opacity="0.35"/>
      </svg>

      {/* Corner labels */}
      <div className="absolute top-0 left-0 right-0 p-9 flex justify-between items-start">
        <span className="font-mono text-[7px] text-[#c9a04e] opacity-35 tracking-[0.5em] uppercase">Portfolio</span>
        <span className="font-mono text-[7px] text-[#c9a04e] opacity-25 tracking-widest">2026</span>
      </div>

      {/* Main typography */}
      <div className="absolute bottom-0 left-0 right-0 p-9 pt-0">
        <h2 className="font-serif text-[54px] text-white leading-[0.88] mb-5" style={{ letterSpacing: '-0.025em' }}>
          Caleb<br/>Cooper
        </h2>
        <div className="h-[0.5px] bg-[#c9a04e] mb-4 opacity-40" />
        <p className="font-mono text-[8px] text-[#c9a04e] tracking-[0.45em] uppercase" style={{ opacity: 0.55 }}>
          AI Systems Engineer
        </p>
      </div>
    </div>
  ),

  spineContent: (
    <div className="absolute inset-0 bg-[#040404] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #080808, #020202, #080808)' }} />
      <div className="absolute top-0 left-[18%] right-[18%] h-[0.5px] bg-[#c9a04e] opacity-14" />
      <div className="absolute bottom-0 left-[18%] right-[18%] h-[0.5px] bg-[#c9a04e] opacity-14" />
      <span
        className="[writing-mode:vertical-rl] rotate-180 font-serif text-[12px] text-[#c9a04e] tracking-[0.25em]"
        style={{ opacity: 0.70 }}
      >
        CALEB COOPER
      </span>
      <div className="absolute bottom-5 w-1 h-1 rounded-full bg-[#c9a04e] opacity-28" />
      <span className="absolute top-5 font-mono text-[6px] text-[#c9a04e] opacity-18 rotate-90 tracking-widest uppercase">Folio</span>
    </div>
  ),

  sections: [
    // â”€â”€ 01  Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'cc-hero',
      fullWidthContent: (
        <div className="w-full min-h-screen bg-black text-white flex flex-col justify-end p-8 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 22% 72%, #141006 0%, #000 62%)' }} />
          {/* Fine gold grid */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.035 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 11 }, (_, i) => (
              <React.Fragment key={i}>
                <line x1="0"      y1={i * 10} x2="100"   y2={i * 10} stroke="#c9a04e" strokeWidth="0.4"/>
                <line x1={i * 10} y1="0"      x2={i * 10} y2="100"   stroke="#c9a04e" strokeWidth="0.4"/>
              </React.Fragment>
            ))}
          </svg>
          <div className="absolute top-8 md:top-12 left-8 md:left-24 z-10">
            <span className="font-mono text-xs text-[#c9a04e] opacity-35 tracking-widest">â€” PORTFOLIO â€” ABOUT</span>
          </div>
          <div className="relative z-10">
            <p className="font-mono text-sm text-[#c9a04e] tracking-[0.3em] uppercase mb-8 opacity-55">
              AI Systems Engineer Â· South Florida, USA
            </p>
            <h1
              className="font-serif leading-[0.82] tracking-tighter text-white mb-10"
              style={{ fontSize: 'clamp(64px, 13vw, 156px)' }}
            >
              Caleb<br/>Cooper
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 border-t border-white/10 font-mono text-sm text-white/30">
              {['Agentic Systems', 'World Models', 'Enterprise AI', 'Voice Interfaces', 'Data Architecture'].map((tag, i, arr) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {i < arr.length - 1 && <span className="text-[#c9a04e]/28">Â·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    // â”€â”€ 02  Introduction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'cc-intro',
      bgColorLeft: 'bg-black',       textColorLeft: 'text-[#c9a04e]',
      bgColorRight: 'bg-[#f5f0e8]',  textColorRight: 'text-[#1a1a1a]',
      leftTitle: 'Background',
      leftContent: (
        <div className="flex flex-col h-full justify-between">
          <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight text-white">
            Designing<br/>intelligence<br/>that works.
          </h2>
          <div className="mt-12 space-y-3 font-mono text-sm text-[#c9a04e]">
            {([
              ['Role',         'AI Systems Engineer'],
              ['Location',     'South Florida, USA'],
              ['Focus',        'Agents & Data Systems'],
              ['Active Since', '2019'],
            ] as [string, string][]).map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-[#c9a04e]/12 pb-3">
                <span className="opacity-38 uppercase tracking-wider text-[10px]">{label}</span>
                <span className="opacity-65">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      rightContent: (
        <div className="space-y-8 py-8">
          <p className="text-3xl font-serif leading-snug text-black/78 italic">
            "I design and develop AI systems â€” from data pipelines to the interfaces people actually use."
          </p>
          <p className="text-lg leading-relaxed text-black/62 font-serif">
            My work lives at the intersection of machine learning, agentic architecture, and product design. I focus on building systems that are well-reasoned end-to-end â€” from how data flows in to how decisions surface out.
          </p>
          <p className="text-lg leading-relaxed text-black/62 font-serif">
            I've developed AI systems across healthcare, fintech, gaming, and enterprise tooling â€” working with LLMs, voice pipelines, agent frameworks, and custom data architectures at varying scales and domains.
          </p>
          <p className="text-lg leading-relaxed text-black/62 font-serif">
            My technical foundation spans LLM integration, graph databases, real-time audio processing, and data engineering. My design sensibility keeps me honest about the interfaces those systems produce.
          </p>
        </div>
      ),
    },

    // â”€â”€ 03  Enterprise Client Work â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'cc-client',
      bgColorLeft:  'bg-black',       textColorLeft:  'text-white',
      bgColorRight: 'bg-[#0d0d0d]',   textColorRight: 'text-white',
      leftTitle: 'Case Studies',
      leftContent: (
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight text-white mb-8">
              Case Studies
            </h2>
            <p className="font-mono text-sm text-white/38 leading-relaxed mb-8">
              AI case studies I've worked on and researched. These represent areas of focused exploration â€” not deployed client engagements.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 border border-[#c9a04e]/22 px-5 py-3 font-mono text-[10px] text-[#c9a04e]/50 tracking-widest uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a04e]/38" />
            Research &amp; Study
          </div>
        </div>
      ),
      rightContent: (
        <div className="space-y-6 py-8">
          <div className="border border-white/7 p-8 relative transition-all duration-500 hover:border-[#c9a04e]/22">
            <div className="absolute top-5 right-5 font-mono text-[8px] text-[#c9a04e]/32 tracking-widest uppercase">Healthcare</div>
            <p className="font-mono text-[9px] text-[#c9a04e]/38 tracking-[0.3em] uppercase mb-5">Case Study I Worked On Â· 01</p>
            <h3 className="font-serif text-2xl text-white mb-4">Voice Agent for Orthopedics</h3>
            <p className="text-white/42 leading-relaxed font-serif text-base">
              Developed a conversational voice agent for a multi-location orthopedic practice. The system is designed to handle inbound patient communications â€” routing inquiries, surfacing clinical context, and managing scheduling workflows. Built on a real-time audio pipeline with custom intent classification tuned to the domain.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[9px] text-[#c9a04e]/30 uppercase tracking-wider">
              {['Voice AI', 'Healthcare', 'Real-time Pipeline', 'NLU'].map(t => <span key={t}>{t}</span>)}
            </div>
          </div>

          <div className="border border-white/7 p-8 relative transition-all duration-500 hover:border-[#c9a04e]/22">
            <div className="absolute top-5 right-5 font-mono text-[8px] text-[#c9a04e]/32 tracking-widest uppercase">Financial Services</div>
            <p className="font-mono text-[9px] text-[#c9a04e]/38 tracking-[0.3em] uppercase mb-5">Case Study I Worked On Â· 02</p>
            <h3 className="font-serif text-2xl text-white mb-4">AI Integration for a Securities Firm</h3>
            <p className="text-white/42 leading-relaxed font-serif text-base">
              Developed an AI integration concept for a securities firm â€” a natural language interface enabling advisors to surface market insights, draft client communications, and run scenario analysis. Designed with advisor judgment at the center and compliance guardrails in mind.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[9px] text-[#c9a04e]/30 uppercase tracking-wider">
              {['LLM Integration', 'Fintech', 'Compliance', 'Advisor Tools'].map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      ),
    },

    // â”€â”€ 04  Playground pull-quote â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'cc-playground',
      fullWidthContent: (
        <div
          className="w-full bg-[#c9a04e] text-black flex flex-col items-center justify-center text-center p-8 md:p-32"
          style={{ minHeight: '55vh' }}
        >
          <span
            className="font-serif leading-none opacity-10 select-none mb-[-4rem] md:mb-[-8rem]"
            style={{ fontSize: 'clamp(7rem, 18vw, 16rem)' }}
          >"</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light italic text-center max-w-4xl leading-tight mb-10 relative z-10">
            Every project has an interactive layer. Click{' '}
            <span className="not-italic font-black uppercase tracking-tight">Playground</span>{' '}
            on any project to explore it live.
          </h2>
          <p className="font-mono text-sm text-black/45 tracking-[0.3em] uppercase relative z-10">
            Explore Â· Interact Â· Understand
          </p>
        </div>
      ),
    },

    // â”€â”€ 05  The Library â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'cc-library',
      bgColorLeft:  'bg-[#0d0d0d]',  textColorLeft:  'text-white',
      bgColorRight: 'bg-[#f5f0e8]',  textColorRight: 'text-black',
      leftTitle: 'The Library',
      leftContent: (
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight text-white mb-8">
              Projects &<br/>Experiments
            </h2>
            <p className="font-serif text-lg text-white/52 leading-relaxed mb-10">
              Each entry is a fully-built system â€” not a mockup. They range from production-grade agent infrastructure to experimental interfaces at the edges of what's currently possible.
            </p>
          </div>
          <div className="border border-[#c9a04e]/22 p-6">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4 text-[#c9a04e]/38">Interactive</p>
            <p className="font-mono text-sm text-[#c9a04e]/60 leading-relaxed">
              Every project includes a <span className="text-[#c9a04e]">Playground</span> â€” a live, interactive version of the system. Click the Playground button on any project page to run it directly.
            </p>
          </div>
        </div>
      ),
      rightContent: (
        <div className="divide-y divide-black/8">
          {([
            { title: 'Project Winter Haven',       sub: 'World Model to Agentic UI',              year: '2026', isNew: true,  href: '/work/project-winter-haven/index.html'       },
            { title: 'The Panopticon',             sub: 'Agentic Observability at the Edge',       year: '2026', isNew: true,  href: '/work/panopticon/index.html'     },
            { title: 'Global Intelligence Market', sub: 'Compute Endpoints, Not Subscriptions',    year: '2026', isNew: true,  href: '/work/global-intelligence-market/index.html'     },
            { title: 'Cortex',                     sub: 'Pure-Math Agent Routing',                 year: '2026', isNew: false, href: '/work/cortex/index.html'              },
            { title: 'Brokie V2',                  sub: 'Graph-Backed Agent Memory Engine',        year: '2026', isNew: false, href: '/work/brokie-v2/index.html'            },
            { title: 'Brokie V1',                  sub: 'Premium Token Compression',               year: '2026', isNew: false, href: '/work/brokie-v1/index.html'  },
            { title: 'Life Tap Labs',              sub: 'Agentic Cost Observability',              year: '2026', isNew: false, href: '/work/life-tap-labs/index.html'          },
            { title: 'Bonnie',                     sub: 'AI Gaming Companion Â· GTAV Online',       year: '2026', isNew: false, href: '/work/bonnie/index.html'          },
          ] as { title: string; sub: string; year: string; isNew: boolean; href: string }[]).map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="flex justify-between items-start py-5 transition-all duration-300 hover:pl-1.5 group no-underline"
              style={{ textDecoration: 'none', display: 'flex' }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-medium text-black group-hover:text-black/70 transition-colors">{p.title}</span>
                  {p.isNew && (
                    <span className="font-mono text-[7px] bg-black text-white px-2 py-0.5 tracking-[0.15em] uppercase">New</span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-black/38 tracking-wide">{p.sub}</span>
              </div>
              <span className="font-mono text-xs text-black/22 mt-0.5 ml-4 shrink-0 group-hover:text-black/40 transition-colors">{p.year} â†’</span>
            </a>
          ))}
        </div>
      ),
    },

    // â”€â”€ 06  Philosophy â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'cc-philosophy',
      fullWidthContent: (
        <div className="w-full min-h-[70vh] bg-black text-white p-8 md:p-24 flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          <div className="md:w-1/3 md:sticky md:top-24">
            <p className="font-mono text-[9px] text-[#c9a04e]/40 tracking-[0.35em] uppercase mb-6">â€” How I Think</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight text-white mb-8">
              Philosophy
            </h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {['LLM Orchestration', 'Agent Memory', 'Graph RAG', 'Real-time Pipelines', 'Voice AI', 'Token Economics', 'Observability'].map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[8px] border border-[#c9a04e]/16 text-[#c9a04e]/38 px-3 py-1.5 tracking-wider uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="md:w-2/3 space-y-10 py-4">
            {[
              "Agents are not a feature â€” they're an architecture. I build systems where the agent is the unit of work, not the afterthought bolted onto a traditional app.",
              "Good AI doesn't hide its reasoning. It surfaces decisions, exposes uncertainty, and earns trust through transparency â€” not through confident-sounding hallucinations.",
              "Data is architecture. Every model I deploy sits on top of a data system I designed deliberately. There are no shortcuts between raw signal and reliable output.",
              "Cost is a first-class constraint. Token budgets, memory strategies, and caching patterns shape everything downstream â€” they belong in the design from day one.",
            ].map((text, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="font-mono text-[10px] text-[#c9a04e]/22 mt-2 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-serif text-xl md:text-2xl text-white/60 leading-relaxed group-hover:text-white/75 transition-colors duration-500">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],
};
