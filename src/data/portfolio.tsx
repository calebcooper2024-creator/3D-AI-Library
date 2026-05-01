import React from 'react';
import { 
  cellcoreSections, maybeMortgageSections, nextEraSections, lightWonderSections, 
  jmFamilySections, nvidiaSections, flowSections, globalManagementSections, 
  fintechAwsSections, gwnSections, helloPatientSections, milestoneSections 
} from './caseStudies';


export interface SectionContent {
  id: string;
  bgColorLeft?: string;
  textColorLeft?: string;
  bgColorRight?: string;
  textColorRight?: string;
  leftTitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  fullWidthContent?: React.ReactNode;
}

export interface BookProject {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  showAuthorBadge?: boolean;
  spineColor: string;
  coverColor: string;
  textColor: string;
  spineTextColor?: string;
  fontTitle: string; // Tailwind class
  coverImage?: string;
  sections: SectionContent[];
  coverContent?: React.ReactNode;
  spineContent?: React.ReactNode;
  textureClass?: string;
}

const TableOfContents = ({ items }: { items: { step: string; chapters: string[] }[] }) => (
  <div className="space-y-12 font-mono text-sm max-w-md">
    {items.map((item, i) => (
      <div key={i} className="flex flex-col group">
        <div className="flex border-b border-black/20 pb-2 mb-4">
           <span className="w-16 font-bold">0{i+1}</span>
           <span className="font-bold uppercase tracking-wider">{item.step}</span>
        </div>
        <div className="space-y-3 pl-16">
          {item.chapters.map((chapter, j) => (
            <div key={j} className="flex justify-between text-black/70 hover:text-black transition-transform cursor-pointer">
              <span>{`0${i+1}.${j+1} / ${chapter}`}</span>
              <span>{String(i*3 + j + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ImagePlaceholder = ({ title, desc }: { title: string, desc: string }) => (
  <div className="w-full bg-black/5 aspect-video flex flex-col items-center justify-center border border-black/10 rounded-lg p-8 text-center mt-8">
     <div className="w-12 h-12 rounded-full border-2 border-dashed border-black/20 flex items-center justify-center mb-4">
        <span className="text-black/30">IMG</span>
     </div>
     <h4 className="font-bold text-sm text-black/70">{title}</h4>
     <p className="text-xs text-black/50 mt-2 max-w-sm">{desc}</p>
  </div>
);

export const projects: BookProject[] = [
  {
    id: 'cellcore', textureClass: 'texture-paper',
    title: 'CellCore Biosciences',
    subtitle: 'Internal Systems',
    author: 'Caleb Cooper',
    showAuthorBadge: false,
    spineColor: '#ef4444', coverColor: '#166534', textColor: '#fecdd3', fontTitle: 'font-serif',
    coverContent: (
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-[#ef4444]" />
        <div className="w-1/2 h-full bg-[#166534] relative">
          <div className="absolute bottom-16 -left-12 w-24 h-24 bg-[#ef4444] rounded-full mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 p-8 flex justify-between">
           <div className="[writing-mode:vertical-rl] rotate-180 text-5xl font-serif text-white tracking-widest leading-none pt-4">
             CellCore<br/>Biosciences
           </div>
           <div className="flex flex-col justify-end text-right text-[#fecdd3]">
              <span className="font-mono text-sm tracking-widest uppercase">Internal Systems</span>
              <span className="mt-3 font-mono text-[11px] tracking-[0.18em] text-[#fecdd3]/70">By Caleb Cooper</span>
            </div>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-serif text-white tracking-widest">CellCore Biosciences</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 01</span>
      </div>
    ),
    sections: cellcoreSections
  },
  {
    id: 'maybe-mortgage', textureClass: 'texture-canvas',
    title: 'Mortgage Operations',
    subtitle: 'Loan Readiness AI',
    author: 'Caleb Cooper',
    spineColor: '#171717', coverColor: '#ffffff', textColor: '#171717', spineTextColor: '#ffffff', fontTitle: 'font-sans',
    coverContent: (
      <div className="absolute inset-0 bg-white">
         <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 opacity-10">
            {Array.from({length: 24}).map((_, i) => (
              <div key={i} className="border-[0.5px] border-black" />
            ))}
         </div>
         <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-black" />
         <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full border-4 border-black" />
         <div className="absolute bottom-1/4 right-8 flex gap-2">
            <div className="w-4 h-4 bg-black rounded-full" />
            <div className="w-4 h-4 border border-black rounded-full" />
            <div className="w-4 h-4 border border-black rounded-full" />
         </div>
         <div className="absolute inset-0 p-8 flex flex-col justify-center">
            <h2 className="text-6xl font-sans font-black tracking-tighter uppercase leading-[0.8] mb-4 mix-blend-difference text-white">Mortgage<br/>Operations</h2>
            <div className="[writing-mode:vertical-rl] text-xs font-mono tracking-widest absolute top-8 right-8">LOAN READINESS AI</div>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-lg font-sans font-bold text-white tracking-widest uppercase">Mortgage Operations</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 02</span>
      </div>
    ),
    sections: maybeMortgageSections
  },
  {
    id: 'nextera', textureClass: 'texture-leather',
    title: 'NextEra Energy',
    subtitle: 'Field Operations AI',
    author: 'Caleb Cooper',
    spineColor: '#1e3a8a', coverColor: '#3b82f6', textColor: '#ffffff', fontTitle: 'font-serif',
    coverContent: (
      <div className="absolute inset-0 bg-blue-500 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 border-[1px] border-white/30 rounded-full" />
        <div className="absolute -top-10 -right-10 w-48 h-48 border-[2px] border-white/20 rounded-full" />
        <div className="absolute top-0 -right-0 w-32 h-32 border-[4px] border-white/10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-700 to-transparent" />
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
           <div className="text-right">
              <span className="text-sm font-mono tracking-widest text-white/70 uppercase">Field Operations AI</span>
           </div>
           <div>
              <h2 className="text-5xl font-serif text-white tracking-tight mb-2">NextEra<br/>Energy</h2>
              <div className="w-12 h-1 bg-white mb-6" />
            </div>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-serif text-white tracking-wide">NextEra Energy</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 03</span>
      </div>
    ),
    sections: nextEraSections
  },
  {
    id: 'light-wonder', textureClass: 'texture-rough',
    title: 'Light & Wonder',
    subtitle: 'Operator Intelligence',
    author: 'Caleb Cooper',
    spineColor: '#fef08a', coverColor: '#fbcfe8', textColor: '#8b5cf6', fontTitle: 'font-sans',
    coverContent: (
      <div className="absolute inset-0 bg-pink-200">
         <div className="absolute inset-0 flex justify-around p-8 opacity-20">
            <div className="w-1 h-32 bg-purple-500 rounded-full animate-pulse" />
            <div className="w-1 h-48 bg-purple-500 rounded-full mt-12" />
            <div className="w-1 h-24 bg-purple-500 rounded-full mt-32 animate-pulse" />
            <div className="w-1 h-56 bg-purple-500 rounded-full" />
         </div>
         <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-5xl font-sans font-black text-purple-600 tracking-tighter uppercase mb-2">Light &<br/>Wonder</h2>
            <p className="text-purple-500/70 font-mono text-xs uppercase tracking-widest">Operator Intelligence</p>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-lg font-sans font-bold text-purple-600 tracking-widest uppercase">Light & Wonder</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-purple-400 opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-purple-400 opacity-50 rotate-90">No. 04</span>
      </div>
    ),
    sections: lightWonderSections
  },
  {
    id: 'jm-family', textureClass: 'texture-leather',
    title: 'JM Family Enterprises',
    subtitle: 'Dealer Operations AI',
    author: 'Caleb Cooper',
    spineColor: '#6b21a8', coverColor: '#9333ea', textColor: '#ffffff', fontTitle: 'font-serif',
    coverContent: (
      <div className="absolute inset-0 bg-purple-600 overflow-hidden">
        <div className="absolute -bottom-20 -right-10 text-[250px] font-serif text-purple-800 opacity-50 leading-none">JM</div>
        <div className="absolute inset-0 p-10 flex flex-col justify-start">
           <h2 className="text-4xl font-serif text-white tracking-wide leading-tight">JM Family<br/>Enterprises</h2>
           <p className="mt-4 text-purple-200 font-mono text-sm tracking-widest uppercase">Dealer Operations AI</p>
           <div className="mt-12 w-8 h-[1px] bg-white/50" />
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-serif text-white tracking-widest">JM Family Enterprises</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 05</span>
      </div>
    ),
    sections: jmFamilySections
  },
  {
    id: 'nvidia', textureClass: 'texture-rough',
    title: 'NVIDIA AI Factory',
    subtitle: 'Operations Agent',
    author: 'Caleb Cooper',
    spineColor: '#000000', coverColor: '#111111', textColor: '#22c55e', fontTitle: 'font-mono',
    coverContent: (
      <div className="absolute inset-0 bg-[#111] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }} />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-green-500/30" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-green-500/30" />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
           <div className="bg-black/80 backdrop-blur-sm p-6 border border-green-500/20">
              <h2 className="text-4xl font-sans font-black text-white tracking-tighter uppercase mb-1">NVIDIA<br/>AI Factory</h2>
              <p className="text-green-500 font-mono text-xs tracking-widest uppercase">Operations Agent</p>
           </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-lg font-sans font-black text-white tracking-widest uppercase">NVIDIA AI Factory</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-green-500 opacity-80" />
        <span className="absolute top-8 text-xs font-mono text-green-500 opacity-50 rotate-90">No. 06</span>
      </div>
    ),
    sections: nvidiaSections
  },
  {
    id: 'flow', textureClass: 'texture-canvas',
    title: 'Flow',
    subtitle: 'Case Study',
    author: 'Caleb Cooper',
    spineColor: '#0f766e', coverColor: '#14b8a6', textColor: '#ffffff', fontTitle: 'font-sans',
    coverContent: (
      <div className="absolute inset-0 bg-teal-500 overflow-hidden">
         <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="white" />
            <path d="M0,70 Q25,50 50,70 T100,70 L100,100 L0,100 Z" fill="white" opacity="0.5" />
         </svg>
         <div className="absolute inset-0 p-12 flex flex-col items-center justify-center">
            <h2 className="text-6xl font-serif text-white italic tracking-tighter mb-4">Flow</h2>
            <div className="w-full flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-white/50" />
              <span className="font-mono text-xs text-white/80 uppercase tracking-widest">Case Study</span>
              <div className="h-[1px] flex-1 bg-white/50" />
            </div>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-serif italic text-white tracking-widest">Flow</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 07</span>
      </div>
    ),
    sections: flowSections
  },
  {
    id: 'global-management', textureClass: 'texture-paper',
    title: 'Consulting Co.',
    subtitle: 'Miramar',
    author: 'Caleb Cooper',
    spineColor: '#334155', coverColor: '#e2e8f0', textColor: '#0f172a', fontTitle: 'font-serif',
    coverContent: (
      <div className="absolute inset-0 bg-slate-200 p-6">
         <div className="w-full h-full border border-slate-400 p-1">
            <div className="w-full h-full border border-slate-400 flex flex-col justify-center items-center text-center p-8 bg-slate-100">
               <div className="w-8 h-8 border-b border-r border-slate-400 mb-8 transform rotate-45" />
               <h2 className="text-3xl font-serif text-slate-800 uppercase tracking-widest leading-relaxed">Global<br/>Management<br/>Consulting</h2>
               <div className="mt-8 w-12 h-[1px] bg-slate-400" />
               <p className="mt-4 font-mono text-xs text-slate-500 tracking-widest uppercase">Miramar Case Study</p>
            </div>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-serif text-slate-200 tracking-widest uppercase">Consulting Co.</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-slate-400 opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-slate-400 opacity-50 rotate-90">No. 08</span>
      </div>
    ),
    sections: globalManagementSections
  },
  {
    id: 'fintech-aws', textureClass: 'texture-leather',
    title: 'Fintech',
    subtitle: 'AWS AI/ML',
    author: 'Caleb Cooper',
    spineColor: '#c2410c', coverColor: '#f97316', textColor: '#ffffff', fontTitle: 'font-sans',
    coverContent: (
      <div className="absolute inset-0 bg-orange-500 overflow-hidden">
         <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
            <circle cx="20" cy="20" r="2" fill="white" />
            <circle cx="80" cy="30" r="3" fill="white" />
            <circle cx="50" cy="80" r="2" fill="white" />
            <circle cx="30" cy="60" r="1.5" fill="white" />
            <line x1="20" y1="20" x2="80" y2="30" stroke="white" strokeWidth="0.5" />
            <line x1="80" y1="30" x2="50" y2="80" stroke="white" strokeWidth="0.5" />
            <line x1="50" y1="80" x2="30" y2="60" stroke="white" strokeWidth="0.5" />
            <line x1="30" y1="60" x2="20" y2="20" stroke="white" strokeWidth="0.5" />
         </svg>
         <div className="absolute bottom-12 left-8">
            <h2 className="text-5xl font-sans font-black text-white tracking-tighter mb-2">Fintech</h2>
            <div className="bg-white text-orange-600 px-3 py-1 inline-block font-mono text-xs font-bold tracking-widest rounded-sm">AWS AI/ML</div>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-sans font-black text-white tracking-widest uppercase">Fintech</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 09</span>
      </div>
    ),
    sections: fintechAwsSections
  },
  {
    id: 'gwn', textureClass: 'texture-canvas',
    title: 'GWN Securities',
    subtitle: 'Voice Agents',
    author: 'Caleb Cooper',
    spineColor: '#1e3a8a', coverColor: '#1e40af', textColor: '#ffffff', fontTitle: 'font-serif',
    coverContent: (
      <div className="absolute inset-0 bg-blue-800">
         <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end opacity-20 gap-1 px-4">
            <div className="w-1/4 h-1/4 bg-white" />
            <div className="w-1/4 h-2/4 bg-white" />
            <div className="w-1/4 h-3/4 bg-white" />
            <div className="w-1/4 h-full bg-white" />
         </div>
         <div className="absolute inset-0 p-8 flex flex-col justify-start text-center">
            <h2 className="text-4xl font-serif text-white tracking-widest uppercase mt-12 border-b border-white/20 pb-4">GWN<br/>Securities</h2>
            <p className="font-mono text-xs text-blue-200 mt-4 tracking-widest">Voice Agents & Compliance</p>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-lg font-serif text-white tracking-widest uppercase">GWN Securities</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 10</span>
      </div>
    ),
    sections: gwnSections
  },
  {
    id: 'hello-patient', textureClass: 'texture-paper',
    title: 'Hello Patient',
    subtitle: 'Plummet Health',
    author: 'Caleb Cooper',
    showAuthorBadge: false,
    spineColor: '#991b1b', coverColor: '#fca5a5', textColor: '#991b1b', fontTitle: 'font-sans',
    coverContent: (
      <div className="absolute inset-0 bg-red-300">
         <div className="absolute -left-16 top-1/4 text-[200px] text-red-500 opacity-20 font-sans leading-none">+</div>
         <div className="absolute inset-0 p-8 flex flex-col justify-end text-red-900">
            <h2 className="text-5xl font-sans font-bold tracking-tight leading-none mb-2">Hello<br/>Patient</h2>
            <p className="font-mono text-sm opacity-70">Plummet Health Voice Agents</p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-red-900/60">By Caleb Cooper</p>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-sans font-bold text-red-200 tracking-wider">Hello Patient</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-red-300 opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-red-300 opacity-50 rotate-90">No. 11</span>
      </div>
    ),
    sections: helloPatientSections
  },
  {
    id: 'milestone', textureClass: 'texture-rough',
    title: 'Milestone',
    subtitle: 'Service Advisor AI',
    author: 'Caleb Cooper',
    spineColor: '#064e3b', coverColor: '#10b981', textColor: '#ffffff', fontTitle: 'font-mono',
    coverContent: (
      <div className="absolute inset-0 bg-emerald-500 overflow-hidden">
         <div className="absolute inset-0 opacity-10 flex flex-col gap-2 transform -rotate-45 scale-150 justify-center">
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="w-full h-4 bg-black border-dashed border-x-4 border-transparent" />
            ))}
         </div>
         <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
            <h2 className="text-5xl font-mono font-bold text-white italic tracking-tighter uppercase shadow-black drop-shadow-md">Milestone</h2>
            <div className="bg-black text-emerald-400 px-4 py-1 mt-4 font-mono text-xs uppercase tracking-widest font-bold">Service Advisor AI</div>
         </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-lg font-mono font-bold italic text-white tracking-widest uppercase">Milestone</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 12</span>
      </div>
    ),
    sections: milestoneSections
  }
];
