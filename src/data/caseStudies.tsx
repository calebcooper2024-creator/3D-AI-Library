import React from 'react';
import { SectionContent } from './portfolio';
import { BubbleDiagram, ProcessFlow, BeforeAfter, HandwrittenNote } from '../components/Visuals';
import { STANDARD_SOURCE_NOTE_LABEL, STANDARD_SOURCE_NOTE_TEXT } from './caseStudyMeta';

export const ImagePlaceholder = ({ title, desc, height = "aspect-video" }: { title: string, desc: string, height?: string }) => (
  <div className={`w-full bg-black/5 ${height} flex flex-col items-center justify-center border border-black/10 rounded-lg p-8 text-center my-8 relative overflow-hidden group`}>
     <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
     <div className="w-12 h-12 rounded-full border-2 border-dashed border-black/20 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
        <span className="text-black/30 font-mono text-xs">IMG</span>
     </div>
     <h4 className="font-bold text-sm text-black/70 tracking-wide">{title}</h4>
     <p className="text-xs text-black/50 mt-2 max-w-sm">{desc}</p>
  </div>
);

// Helper function to create massive sections for a project
const createMassiveSections = (
  theme: { bgLeft: string, textLeft: string, bgRight: string, textRight: string, heroBg: string, heroText: string },
  title: string,
  subtitle: string,
  problem: string,
  solution: string,
  architecture: string,
  metrics: string,
  uiDetail: string,
  impact: string
): SectionContent[] => [
  {
    id: `${title}-hero`,
    fullWidthContent: (
      <div className={`w-full min-h-screen ${theme.heroBg} ${theme.heroText} flex flex-col justify-end p-8 md:p-24 relative overflow-hidden`}>
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-white/10 rounded-full mix-blend-overlay blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
        <p className="font-mono text-sm md:text-lg tracking-widest uppercase mb-12 opacity-80 z-10 border-l-4 pl-4 border-current">01 — Enterprise Agentic Integration</p>
        <h1 className="text-[12vw] md:text-[10vw] font-serif leading-[0.85] tracking-tighter mix-blend-overlay z-10 uppercase">{title}</h1>
        <p className="mt-8 text-2xl md:text-4xl font-serif max-w-3xl opacity-90 z-10">{subtitle}</p>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/20 pt-8 z-10 font-mono">
           <div><p className="text-xs opacity-50 uppercase">Role</p><p className="mt-2 text-lg">Lead AI Architect</p></div>
           <div><p className="text-xs opacity-50 uppercase">Timeline</p><p className="mt-2 text-lg">14 Months</p></div>
           <div><p className="text-xs opacity-50 uppercase">Scale</p><p className="mt-2 text-lg">Enterprise Global</p></div>
           <div><p className="text-xs opacity-50 uppercase">Platform</p><p className="mt-2 text-lg">Custom Multi-Agent Swarm</p></div>
        </div>
      </div>
    )
  },
  {
    id: `${title}-1`,
    bgColorLeft: theme.bgLeft, textColorLeft: theme.textLeft, bgColorRight: theme.bgRight, textColorRight: theme.textRight,
    leftTitle: 'The Challenge',
    leftContent: (
      <div>
        <h2 className="text-5xl lg:text-7xl font-sans font-black tracking-tighter mb-6 leading-tight uppercase">Systemic<br/>Friction.</h2>
        <p className="opacity-80 leading-relaxed font-serif text-xl border-l-4 pl-6 border-current">{problem}</p>
      </div>
    ),
    rightContent: (
      <div className="space-y-12 py-12">
        <p className="text-2xl leading-relaxed font-serif italic opacity-90">"The current workflow was costing millions in manual labor and human error. We needed an autonomous layer."</p>
        <p className="text-lg leading-relaxed opacity-80">We audited the entire legacy lifecycle. The bottlenecks were not computing power, but human-in-the-loop dependencies on highly unstructured data parsing and routing.</p>
        <ImagePlaceholder title="Legacy Workflow Audit" desc="Mapping the manual friction points and cognitive load across 40 user interviews." height="h-[60vh]" />
        <p className="text-lg leading-relaxed opacity-80">Our mandate was to eliminate 90% of the manual triage by injecting specialized LLM agents at the exact points of highest friction.</p>
      </div>
    )
  },
  {
    id: `${title}-quote`,
    fullWidthContent: (
      <div className={`w-full ${theme.bgRight} ${theme.textRight} p-8 md:p-32 flex flex-col items-center border-y border-black/10`}>
         <span className={`text-[15rem] font-serif leading-none mb-[-120px] opacity-20`}>"</span>
         <h2 className="text-4xl md:text-6xl font-serif text-center max-w-5xl leading-tight mb-16 relative z-10 italic">
           Instead of migrating databases, we built an <span className="font-black not-italic underline decoration-[4px]">Agentic Router</span> to read, understand, and map the data autonomously.
         </h2>
      </div>
    )
  },
  {
    id: `${title}-2`,
    bgColorLeft: 'bg-[#fafafa]', textColorLeft: 'text-black', bgColorRight: 'bg-white', textColorRight: 'text-black',
    leftTitle: 'The Solution',
    leftContent: (
      <div>
        <h2 className="text-5xl lg:text-6xl font-serif mb-6 leading-none tracking-tight">Agentic<br/>Orchestration.</h2>
        <div className="mt-12 space-y-6 bg-white p-8 border border-gray-200 shadow-xl">
           <div className="border-l-4 border-black pl-6">
              <h4 className="font-bold text-xl mb-2 font-mono uppercase tracking-widest">Router Agent</h4>
              <p className="opacity-70 text-sm">Classifies intent using a fast quantized model.</p>
           </div>
           <div className="border-l-4 border-gray-400 pl-6 mt-8">
              <h4 className="font-bold text-xl mb-2 font-mono uppercase tracking-widest">Execution Agent</h4>
              <p className="opacity-70 text-sm">Invokes heavy APIs and parses unstructured text.</p>
           </div>
        </div>
      </div>
    ),
    rightContent: (
      <div className="space-y-12 py-12">
        <h3 className="text-4xl font-serif">Seamless Integration</h3>
        <p className="text-xl leading-relaxed opacity-90">{solution}</p>
        <ImagePlaceholder title="Multi-Agent Pipeline" desc="Diagram showing LangChain orchestration and tool calling." height="h-[50vh]" />
        <p className="text-xl leading-relaxed opacity-90">{architecture}</p>
        <ImagePlaceholder title="LLM Guardrails" desc="Deterministic fallback mechanisms for hallucination prevention." height="h-[50vh]" />
      </div>
    )
  },
  {
    id: `${title}-ui`,
    fullWidthContent: (
      <div className="w-full bg-[#111] text-white p-8 md:p-32 flex flex-col justify-center items-center">
         <h3 className="text-3xl font-mono uppercase tracking-widest mb-16 opacity-70">User Interface & Control</h3>
         <ImagePlaceholder title="The Human-in-the-Loop Dashboard" desc="A completely custom UI built to monitor the agent swarm and approve edge-cases." height="h-[80vh]" />
         <p className="mt-16 text-2xl font-serif max-w-4xl text-center leading-relaxed opacity-90">{uiDetail}</p>
      </div>
    )
  },
  {
    id: `${title}-metrics`,
    fullWidthContent: (
      <div className={`w-full ${theme.heroBg} ${theme.heroText} p-8 md:p-32 grid grid-cols-1 md:grid-cols-3 gap-16 text-center border-t border-black/20`}>
         <div>
            <div className="text-[12vw] md:text-[8vw] font-black font-sans mb-4 leading-none tracking-tighter opacity-90">99%</div>
            <p className="font-mono text-sm md:text-lg tracking-widest uppercase opacity-80 border-t border-current pt-4">Accuracy Rate</p>
         </div>
         <div>
            <div className="text-[12vw] md:text-[8vw] font-black font-sans mb-4 leading-none tracking-tighter opacity-90">14x</div>
            <p className="font-mono text-sm md:text-lg tracking-widest uppercase opacity-80 border-t border-current pt-4">Speed Increase</p>
         </div>
         <div>
            <div className="text-[12vw] md:text-[8vw] font-black font-sans mb-4 leading-none tracking-tighter opacity-90">0</div>
            <p className="font-mono text-sm md:text-lg tracking-widest uppercase opacity-80 border-t border-current pt-4">Data Breaches</p>
         </div>
      </div>
    )
  },
  {
    id: `${title}-final`,
    bgColorLeft: 'bg-white', textColorLeft: 'text-black', bgColorRight: 'bg-gray-100', textColorRight: 'text-black',
    leftTitle: 'Outcome',
    leftContent: (
      <div>
        <h2 className="text-6xl font-serif mb-6 leading-none tracking-tight italic">Enterprise<br/>Transformation.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-12 py-12">
        <p className="text-2xl leading-relaxed opacity-90">{impact}</p>
        <ImagePlaceholder title="Global Rollout Map" desc="Adoption metrics across 14 international offices." height="h-[50vh]" />
      </div>
    )
  },
  {
    id: `${title}-source-note`,
    fullWidthContent: (
      <div className="flex w-full flex-col items-center bg-gray-100 p-8 text-center md:p-32">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-black/60">{STANDARD_SOURCE_NOTE_LABEL}</p>
        <p className="max-w-3xl font-serif text-xl italic leading-relaxed text-black/68">
          {STANDARD_SOURCE_NOTE_TEXT}
        </p>
      </div>
    )
  }
];

export const cellcoreSections = createMassiveSections(
  { bgLeft: 'bg-black', textLeft: 'text-white', bgRight: 'bg-transparent', textRight: 'text-black', heroBg: 'bg-[#166534]', heroText: 'text-[#fecdd3]' },
  "CellCore", "Agentic Data Structuring for Biological Scale.",
  "CellCore possessed petabytes of highly valuable clinical trial data scattered across legacy ERPs. The data was unstructured, locked in PDFs, handwritten notes, and disparate DB schemas.",
  "We built specialized data-extraction agents that crawl legacy systems, read unstructured PDFs via OCR and Vision models, and map the outputs into a unified biological schema.",
  "By utilizing an LLM router, we directed complex biological data to specialized fine-tuned models, achieving a 99.4% accuracy rate in data structurization with zero human intervention.",
  "98% Reduction in Manual Entry",
  "The beauty of this AI integration was its invisibility. We didn't force scientists to learn a new tool. The agents operated entirely in the background, pushing structured results directly into existing dashboards.",
  "The deployment allowed CellCore to uncover 3 new drug interaction pathways simply because the data was finally structured and queryable."
);

import _maybeMortgageSections from './maybeMortgageCase';
export const maybeMortgageSections = _maybeMortgageSections;

import _nextEraSections from './nextEraCase';
export const nextEraSections = _nextEraSections;

import _lightWonderSections from './lightWonderCase';
export const lightWonderSections = _lightWonderSections;

import _jmFamilySections from './jmFamilyCase';
export const jmFamilySections = _jmFamilySections;

import _nvidiaSections from './nvidiaCase';
export const nvidiaSections = _nvidiaSections;

const legacyJmFamilySections = createMassiveSections(
  { bgLeft: 'bg-[#faf5ff]', textLeft: 'text-purple-950', bgRight: 'bg-white', textRight: 'text-black', heroBg: 'bg-purple-950', heroText: 'text-white' },
  "JM Family", "Legacy Modernization via Retrieval.",
  "50 years of institutional knowledge locked inside intranet portals, disconnected SharePoint drives, and PDF memos. Finding an answer took days.",
  "We designed and deployed an enterprise-wide RAG (Retrieval-Augmented Generation) AI assistant backed by a Pinecone vector DB.",
  "Enterprise search requires enterprise permissions. The RAG system dynamically filters vector retrieval based on the user's Active Directory roles.",
  "Instant Knowledge Retrieval",
  "We built a chat interface that doesn't just guess—it retrieves the exact memo from 2018 and highlights the cited paragraph.",
  "Reduced HR and IT support tickets by 45% in the first quarter of deployment."
);

const legacyNvidiaSections = createMassiveSections(
  { bgLeft: 'bg-[#050505]', textLeft: 'text-green-500', bgRight: 'bg-black', textRight: 'text-white', heroBg: 'bg-black', heroText: 'text-green-500' },
  "Nvidia", "Agent Swarms for ML Ops & Data Pipelines.",
  "Training massive frontier models requires perfectly orchestrated data pipelines. Human engineers couldn't balance the load fast enough to prevent GPU idle time.",
  "We integrated a hierarchical agentic system. Supervisor Agents monitor cluster health globally, while Worker Agents autonomously adjust batch sizes.",
  "If telemetry shows a bottleneck, the agent invokes a Python tool to reallocate the batch and notifies the engineering Slack channel autonomously.",
  "22% Efficiency Gain",
  "We built a custom WebGL pipeline to visualize the agent swarm in real-time, mapping 100k+ DOM nodes without dropping frames.",
  "Prevented millions of dollars in wasted compute hours by keeping GPU utilization above 98% constantly."
);

export const flowSections = createMassiveSections(
  { bgLeft: 'bg-white', textLeft: 'text-teal-900', bgRight: 'bg-slate-50', textRight: 'text-black', heroBg: 'bg-teal-600', heroText: 'text-white' },
  "Flow", "Fluid Conversational UI Paradigm.",
  "Enterprise SaaS platforms are too complex. Users hate clicking through 5 layers of navigation just to run a simple report.",
  "We replaced the entire left-hand navigation with a floating, context-aware AI command palette driven by semantic intent mapping.",
  "Users type 'Show Q3 churn', and the Agent uses tool-calling to generate the exact React UI components needed on the fly.",
  "Generative UI",
  "We designed fluid, water-like spring animations using Framer Motion so the UI feels alive while the AI retrieves data.",
  "User task completion speed increased by 300% as the UI essentially vanished in favor of pure intent execution."
);

export const globalManagementSections = createMassiveSections(
  { bgLeft: 'bg-slate-100', textLeft: 'text-slate-900', bgRight: 'bg-white', textRight: 'text-black', heroBg: 'bg-slate-900', heroText: 'text-white' },
  "Miramar", "M&A Due Diligence Co-Pilots.",
  "In multi-billion dollar acquisitions, armies of junior lawyers spend weeks in secure data rooms manually reading vendor contracts for liabilities.",
  "We deployed a swarm of legal-specific LLM agents. They instantly read contracts, red-flag non-standard clauses, and summarize risk.",
  "Due to confidentiality, we deployed Llama-3 models locally within an air-gapped Azure Virtual Private Cloud, ensuring zero data leakage.",
  "10k Docs Read in 48h",
  "The dashboard highlights the specific risky paragraph in the PDF viewer, citing the exact clause alongside the LLM's risk rationale.",
  "Cut due diligence periods from 6 weeks to 48 hours, providing a massive competitive advantage in private equity."
);

export const fintechAwsSections = createMassiveSections(
  { bgLeft: 'bg-white', textLeft: 'text-orange-900', bgRight: 'bg-orange-50', textRight: 'text-black', heroBg: 'bg-orange-600', heroText: 'text-white' },
  "Fintech", "Serverless Event-Driven AI Agents.",
  "A monolithic fraud detection engine was struggling to scale during volume spikes, causing massive latency in transaction approvals.",
  "We built event-driven micro-agents using AWS Bedrock and Lambda. When a transaction triggers a flag, a Lambda LLM agent investigates.",
  "The agent autonomously queries the user's historical transaction DB, analyzes geolocations, and auto-resolves 80% of level-1 fraud cases.",
  "Infinite Auto-Scaling",
  "The architecture scales to zero cost when idle, perfectly matching the spiky, unpredictable nature of financial fraud attempts.",
  "Reduced false-positive account freezes by 60%, drastically improving customer satisfaction."
);

export const gwnSections = createMassiveSections(
  { bgLeft: 'bg-white', textLeft: 'text-blue-950', bgRight: 'bg-slate-50', textRight: 'text-black', heroBg: 'bg-blue-950', heroText: 'text-white' },
  "GWN", "Real-Time Voice Compliance Monitoring.",
  "Financial advisors handle thousands of calls. Missing a required SEC disclosure phrase can cost millions in regulatory fines.",
  "We built an AI co-pilot that listens to the live WebRTC stream using an ultra-fast streaming Whisper model.",
  "The transcription feeds into an LLM for real-time intent analysis. If the advisor gives financial advice, the LLM detects it in milliseconds.",
  "Sub-500ms Latency",
  "The UI flashes a high-contrast prompt on the advisor's screen reminding them to read the mandatory disclosure script before hanging up.",
  "Achieved 100% compliance across 400 advisors, completely eliminating SEC fine exposure."
);

export const helloPatientSections = createMassiveSections(
  { bgLeft: 'bg-white', textLeft: 'text-red-900', bgRight: 'bg-red-50', textRight: 'text-black', heroBg: 'bg-red-600', heroText: 'text-white' },
  "Plummet", "Empathetic Medical Voice Agents.",
  "Patients don't want to talk to robots when they are sick. Traditional IVR menus were causing massive patient frustration.",
  "We developed an integrated voice agent using GPT-4o combined with emotional prosody TTS. It answers calls with a warm bedside manner.",
  "Crucially, we gave the agent tools. It executes JSON API calls to the hospital's EHR system to read history and modify calendar records.",
  "24/7 Triaging System",
  "We designed a conversation tracking dashboard so human nurses can take over an AI call seamlessly if an emergency symptom is detected.",
  "Reduced front-desk hold times to zero while maintaining a 4.8/5 patient satisfaction score."
);

export const milestoneSections = createMassiveSections(
  { bgLeft: 'bg-[#0f172a]', textLeft: 'text-emerald-400', bgRight: 'bg-white', textRight: 'text-black', heroBg: 'bg-emerald-700', heroText: 'text-white' },
  "Milestone", "Mechanic RAG Copilots.",
  "Service advisors are incredibly busy. Diagnosing obscure engine codes required manually searching through massive physical OEM binders.",
  "We ingested 40 years of OEM repair manuals, technical service bulletins, and diagnostic flowcharts into a Pinecone vector database.",
  "When an OBD2 scanner throws an obscure code, the AI references similar historic models and suggests the most probable fix naturally.",
  "Diagnostic Overdrive",
  "We designed a rugged, high-contrast tablet interface optimized for sunlight visibility and gloved hands in a busy garage.",
  "Increased daily bay turnaround by 15% and significantly boosted upsell revenue by autonomously suggesting correlated preventative maintenance."
);
