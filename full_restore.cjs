const fs = require('fs');

// 1. Restore aboutMe.tsx
let aboutMeCode = fs.readFileSync('src/data/aboutMe.tsx', 'utf8');
const aboutMeStartToken = "export const aboutMeBook: BookProject = {";
const aboutMeEndToken = "  sections: ["; // The start of the sections array

const aboutMeReplacement = `export const aboutMeBook: BookProject = {
  id: 'about-caleb',
  title: 'Caleb Cooper',
  subtitle: 'Architecture, Integrations, & World Models',
  author: 'Caleb Cooper',
  showAuthorBadge: false,
  spineColor: '#020202',
  coverColor: '#000000',
  textColor: '#c9a04e',
  fontTitle: 'font-serif',
  textureClass: 'texture-leather',
  coverImage: '/images/books/about_me_cover.png',

  coverContent: (
    <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/about_me_cover.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-10 flex flex-col justify-end">
        <div className="mb-4">
          <span className="font-mono text-[8px] text-[#c9a04e] tracking-[0.5em] uppercase opacity-60">AI Systems Engineer</span>
        </div>
        <h2 className="font-serif text-[58px] text-white leading-[0.85] mb-6 tracking-tighter drop-shadow-2xl">
          Caleb<br/>Cooper
        </h2>
        <div className="w-16 h-[0.5px] bg-[#c9a04e] mb-6 opacity-50" />
        <p className="font-mono text-[9px] text-[#c9a04e] tracking-[0.3em] uppercase leading-relaxed max-w-[200px]" style={{ opacity: 0.7 }}>
          Architecture, Integrations, & World Models
        </p>
      </div>
    </div>
  ),

  spineContent: (
    <div className="absolute inset-0 bg-[#020202] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-[#c9a04e]/10">
      <div className="absolute inset-0 bg-[url('/images/books/about_me_cover.png')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      
      <span className="[writing-mode:vertical-rl] font-mono text-[7px] text-[#c9a04e] uppercase tracking-[0.4em] relative z-10 opacity-40 mt-2">
        AI Systems Engineer
      </span>
      
      <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
        <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-[20px] text-white tracking-[0.15em] drop-shadow-md">
          CALEB COOPER
        </span>
        <div className="w-[1px] h-12 bg-[#c9a04e]/30" />
      </div>

      <div className="flex flex-col items-center gap-2 relative z-10 mb-2">
        <div className="w-1 h-1 rounded-full bg-[#c9a04e] opacity-40 shadow-[0_0_8px_rgba(201,160,78,0.6)]" />
        <span className="font-mono text-[8px] text-[#c9a04e] opacity-30 uppercase tracking-[0.3em] rotate-90">2026</span>
      </div>
    </div>
  ),

`;

let startIndex = aboutMeCode.indexOf(aboutMeStartToken);
let endIndex = aboutMeCode.indexOf(aboutMeEndToken);

if (startIndex !== -1 && endIndex !== -1) {
    const newCode = aboutMeCode.substring(0, startIndex) + aboutMeReplacement + aboutMeCode.substring(endIndex);
    fs.writeFileSync('src/data/aboutMe.tsx', newCode);
    console.log("Restored aboutMe.tsx");
} else {
    console.log("Failed to find tokens in aboutMe.tsx");
}

// 2. Restore portfolio.tsx
let portfolioCode = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const restoredProjects = [
  // 01 CellCore
  `  {
    id: 'cellcore', textureClass: 'texture-leather',
    title: 'CellCore Biosciences',
    subtitle: 'Internal Systems',
    author: 'Caleb Cooper',
    showAuthorBadge: false,
    spineColor: '#0a150f', coverColor: '#166534', textColor: '#fecdd3', fontTitle: 'font-serif',
    coverImage: '/images/books/cellcore_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/cellcore_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-10 flex flex-col justify-end">
          <span className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] uppercase mb-4 drop-shadow-md">Internal Systems</span>
          <h2 className="font-serif text-5xl text-white leading-[0.9] tracking-tight mb-4 drop-shadow-lg">CellCore<br/>Biosciences</h2>
          <div className="w-12 h-[1px] bg-emerald-500/50 mb-4" />
          <p className="font-mono text-[9px] text-white/60 tracking-[0.2em] uppercase drop-shadow-md">By Caleb Cooper</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0a150f] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-emerald-500/10">
        <div className="absolute inset-0 bg-[url('/images/books/cellcore_cover.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[7px] text-emerald-400 uppercase tracking-[0.2em] relative z-10 opacity-80 mt-2">
          Internal Systems
        </span>
        <div className="flex flex-col items-center gap-6 relative z-10 mb-2">
          <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-[15px] text-white tracking-[0.15em] drop-shadow-md">
            CELLCORE
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </div>
      </div>
    ),
    sections: cellcoreSections
  }`,

  // 02 Rocket Mortgage
  `  {
    id: 'rocket-mortgage', textureClass: 'texture-leather',
    title: 'Rocket Mortgage',
    subtitle: 'Loan Readiness AI',
    author: 'Caleb Cooper',
    spineColor: '#18181b', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-sans',
    coverImage: '/images/books/mortgage_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/mortgage_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 p-8 flex flex-col justify-between">
          <div className="text-right">
            <span className="font-mono text-[10px] text-zinc-300 tracking-[0.3em] uppercase drop-shadow-md border border-zinc-500/30 px-3 py-1 backdrop-blur-sm">Loan Readiness AI</span>
          </div>
          <div>
            <h2 className="font-serif italic text-5xl text-white tracking-tighter uppercase leading-[0.85] mb-4 drop-shadow-xl">Rocket<br/>Mortgage</h2>
            <div className="w-16 h-[2px] bg-zinc-400 mb-4" />
            <p className="font-mono text-[9px] text-zinc-300 tracking-[0.2em] uppercase drop-shadow-md">Architecture & Automation Case Study</p>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-between py-8 overflow-hidden border-r border-white/10">
        <div className="absolute inset-0 bg-[url('/images/books/mortgage_cover.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        
        <span className="font-mono text-[8px] text-white/50 font-bold uppercase tracking-widest relative z-10 rotate-90 mt-4">
          02
        </span>
        
        <div className="flex flex-col items-center justify-center relative z-10 gap-6">
           <div className="w-[1px] h-8 bg-white/30" />
           <span className="[writing-mode:vertical-rl] font-serif italic text-[16px] text-white tracking-[0.2em] uppercase drop-shadow-xl">
             Rocket Mortgage
           </span>
           <div className="w-[1px] h-8 bg-white/30" />
        </div>
        
        <div className="w-1.5 h-1.5 border border-white/50 rotate-45 relative z-10 mb-4 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      </div>
    ),
    sections: maybeMortgageSections
  }`,

  // 03 NextEra
  `  {
    id: 'nextera', textureClass: 'texture-rough',
    title: 'NextEra Energy',
    subtitle: 'Field Operations AI',
    author: 'Caleb Cooper',
    spineColor: '#041d27', coverColor: '#041d27', textColor: '#ffffff', fontTitle: 'font-sans',
    coverImage: '/images/books/nextera_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/nextera_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/95 via-cyan-950/60 to-transparent p-6 flex flex-col justify-start">
          <div className="border-l-[3px] border-cyan-400 pl-4 py-1 self-start mb-8">
            <span className="font-mono text-[10px] text-cyan-300 tracking-[0.3em] uppercase font-bold drop-shadow-md">FPL Predictive</span><br/>
            <span className="font-mono text-[10px] text-white tracking-[0.3em] uppercase font-black drop-shadow-md">Storm Intelligence</span>
          </div>
          <h2 className="font-sans font-bold text-5xl text-white tracking-tight leading-[0.9] drop-shadow-lg max-w-[80%]">NextEra<br/>Energy</h2>
          <div className="mt-auto flex justify-between items-end">
            <span className="font-mono text-[8px] text-white tracking-[0.2em] uppercase bg-black/80 px-3 py-1.5 font-bold border border-cyan-500/30 shadow-lg">FPL's Self Healing Grid</span>
            <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center bg-cyan-900/40">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#041d27] flex flex-col items-center justify-center overflow-hidden border-r border-cyan-900">
        <div className="absolute inset-0 bg-[url('/images/books/nextera_cover.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" />
        <div className="flex flex-col items-center gap-6 relative z-10 h-full justify-center">
          <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[8px] text-cyan-400 font-bold tracking-[0.3em] uppercase drop-shadow-md">
            FPL's Self Healing Grid
          </span>
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[46px] text-white/95 tracking-tighter uppercase whitespace-nowrap drop-shadow-2xl leading-none">
            NEXTERA
          </span>
        </div>
      </div>
    ),
    sections: nextEraSections
  }`,

  // 04 Light & Wonder
  `  {
    id: 'light-wonder', textureClass: 'texture-leather',
    title: 'Light & Wonder',
    subtitle: 'Operator Intelligence',
    author: 'Caleb Cooper',
    spineColor: '#2e1065', coverColor: '#2e1065', textColor: '#ffffff', fontTitle: 'font-sans',
    coverImage: '/images/books/light_wonder_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(30,20,50,0.8)]" style={{ backgroundImage: "url('/images/books/light_wonder_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-transparent to-amber-900/60 p-8 flex flex-col justify-end">
          <div className="w-full flex justify-between items-end mb-4 border-b border-amber-400/40 pb-4">
             <h2 className="font-sans font-black text-[54px] text-white tracking-tighter uppercase leading-[0.85] drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Light<br/><span className="text-amber-300">&</span><br/>Wonder</h2>
             <div className="flex flex-col items-end gap-2 pb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <div className="w-1.5 h-1.5 rounded-full border border-amber-400/50" />
             </div>
          </div>
          <span className="font-mono text-[9px] text-amber-200 tracking-[0.4em] uppercase font-bold drop-shadow-md">Operator Intelligence</span>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#2e1065] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-purple-500/30 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[url('/images/books/light_wonder_cover.jpg')] bg-cover bg-center opacity-30 mix-blend-color-dodge grayscale" />
        
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-3 h-[1px] bg-amber-400/50" />
          <span className="font-mono text-[8px] text-purple-300 uppercase tracking-widest rotate-90 my-1">04</span>
          <div className="w-3 h-[1px] bg-amber-400/50" />
        </div>

        <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[18px] text-white tracking-[0.1em] uppercase relative z-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
          LIGHT & WONDER
        </span>

        <div className="relative z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </div>
      </div>
    ),
    sections: lightWonderSections
  }`,

  // 05 JM Family
  `  {
    id: 'jm-family', textureClass: 'texture-paper',
    title: 'JM Family Enterprises',
    subtitle: 'Autonomous Logistics',
    author: 'Caleb Cooper',
    spineColor: '#f8fafc', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-serif',
    coverImage: '/images/books/jm_family_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" style={{ backgroundImage: "url('/images/books/jm_family_cover.jpg')" }}>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent pt-32 pb-8 px-8 flex flex-col items-center text-center">
          <h2 className="font-serif text-[42px] text-white tracking-tight leading-none mb-3 drop-shadow-lg">JM Family<br/>Enterprises</h2>
          <div className="w-8 h-[1px] bg-zinc-400 mb-3" />
          <span className="font-sans text-[10px] text-zinc-300 tracking-[0.3em] uppercase font-bold drop-shadow-md">Autonomous Logistics</span>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#f8fafc] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-zinc-300 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.05)]">
        <span className="[writing-mode:vertical-rl] font-sans font-bold text-[8px] text-zinc-400 uppercase tracking-[0.3em] relative z-10 mt-2">
          Autonomous Logistics
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-serif text-[18px] text-zinc-800 tracking-[0.1em] uppercase">
            JM Family
          </span>
          <div className="w-[1px] h-6 bg-zinc-400" />
        </div>

        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest relative z-10 rotate-90 mb-4">
          05
        </span>
      </div>
    ),
    sections: jmFamilySections
  }`,

  // 06 NVIDIA
  `  {
    id: 'nvidia', textureClass: 'texture-leather',
    title: 'NVIDIA AI Factory',
    subtitle: 'Operations Agent',
    author: 'Caleb Cooper',
    spineColor: '#0a0a0c', coverColor: '#000000', textColor: '#22c55e', fontTitle: 'font-sans',
    coverImage: '/images/books/nvidia_cover.png',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]" style={{ backgroundImage: "url('/images/books/nvidia_cover.png')" }}>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-32 pb-8 px-8 flex flex-col justify-end">
           <div className="border-l-4 border-green-500 pl-4 mt-8">
              <h2 className="text-[44px] font-sans font-black text-white tracking-tighter uppercase leading-[0.85] drop-shadow-lg mb-2">NVIDIA<br/>AI Factory</h2>
              <p className="text-green-400 font-mono text-[10px] tracking-[0.3em] uppercase font-bold drop-shadow-md">Operations Agent</p>
           </div>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0a0a0c] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-zinc-800 shadow-[inset_-2px_0_10px_rgba(0,0,0,1)]">
        <div className="absolute inset-0 bg-[url('/images/books/nvidia_cover.png')] bg-cover bg-center opacity-10 mix-blend-luminosity grayscale" />
        
        <span className="[writing-mode:vertical-rl] font-mono font-bold text-[8px] text-green-500 uppercase tracking-[0.3em] relative z-10 mt-2">
          Operations Agent
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[20px] text-white tracking-[0.1em] uppercase drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
            NVIDIA
          </span>
          <div className="w-1.5 h-[16px] bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        </div>

        <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-widest relative z-10 rotate-90 mb-4">
          06
        </span>
      </div>
    ),
    sections: nvidiaSections
  }`,

  // 07 Flow
  `  {
    id: 'flow', textureClass: 'texture-canvas',
    title: 'Flow',
    subtitle: 'Flow House Case Study',
    author: 'Caleb Cooper',
    spineColor: '#e7e5e4', coverColor: '#1c1917', textColor: '#ffffff', fontTitle: 'font-serif',
    coverImage: '/images/books/flow_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/flow_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent p-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-7xl font-serif text-white italic tracking-tighter mb-4 drop-shadow-2xl">Flow</h2>
          <div className="w-24 h-[1px] bg-white/30 mb-6" />
          <p className="font-mono text-[10px] text-white/60 tracking-[0.4em] uppercase font-bold">Autonomous Living Systems</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#e7e5e4] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-stone-300 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.05)]">
        <span className="[writing-mode:vertical-rl] font-mono font-bold text-[8px] text-stone-500 uppercase tracking-[0.3em] relative z-10 mt-2">
          Flow House
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-serif italic text-[24px] text-stone-800 tracking-[0.1em] drop-shadow-sm">
            Flow
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
        </div>

        <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-widest relative z-10 rotate-90 mb-4">
          07
        </span>
      </div>
    ),
    sections: flowSections
  }`,

  // 08 VSP Vision
  `  {
    id: 'vsp-vision', textureClass: 'texture-paper',
    title: 'VSP Vision',
    subtitle: 'Eyewear Journey Copilot',
    author: 'Caleb Cooper',
    spineColor: '#ffffff', coverColor: '#000000', textColor: '#0f172a', fontTitle: 'font-sans',
    coverImage: '/images/books/vsp_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" style={{ backgroundImage: "url('/images/books/vsp_cover.jpg')" }}>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-32 pb-10 px-10 flex flex-col justify-end">
           <h2 className="font-sans font-black text-6xl text-slate-900 tracking-tighter uppercase leading-[0.8] mb-4">VSP<br/>Vision</h2>
           <div className="w-12 h-[3px] bg-blue-600 mb-4" />
           <p className="font-mono text-[10px] text-blue-600 tracking-[0.3em] uppercase font-bold">Eyewear Journey Copilot</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-between py-10 overflow-hidden border-r border-slate-200">
        <span className="[writing-mode:vertical-rl] font-mono font-bold text-[8px] text-blue-600 uppercase tracking-[0.3em] relative z-10 mt-2">
          Eyewear Journey Copilot
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[22px] text-slate-800 tracking-[0.1em] uppercase">
            VSP VISION
          </span>
          <div className="w-1.5 h-1.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
        </div>

        <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest relative z-10 rotate-90 mb-4">
          08
        </span>
      </div>
    ),
    sections: globalManagementSections
  }`,

  // 09 Fintech AWS
  `  {
    id: 'fintech-aws', textureClass: 'texture-leather',
    title: 'Fintech AWS',
    subtitle: 'Autonomous Trading Infrastructure',
    author: 'Caleb Cooper',
    spineColor: '#f97316', coverColor: '#0c0a09', textColor: '#ffffff', fontTitle: 'font-sans',
    coverImage: '/images/books/fintech_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/fintech_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-10 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
             <span className="font-mono text-[10px] text-orange-500 tracking-[0.4em] uppercase font-bold">AWS AI/ML</span>
          </div>
          <h2 className="font-sans font-black text-5xl text-white tracking-tighter uppercase leading-[0.85] mb-4 drop-shadow-2xl">Fintech<br/>Trading</h2>
          <div className="w-12 h-[1px] bg-orange-500/50 mb-4" />
          <p className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase">Autonomous Infrastructure Case Study</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#f97316] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-orange-700 shadow-[inset_-2px_0_15px_rgba(0,0,0,0.2)]">
        <span className="[writing-mode:vertical-rl] font-mono font-bold text-[8px] text-white uppercase tracking-[0.3em] relative z-10 mt-2 opacity-80">
          Autonomous Trading
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[22px] text-white tracking-[0.1em] uppercase drop-shadow-lg">
            FINTECH
          </span>
          <div className="w-[1px] h-12 bg-white/40" />
        </div>

        <span className="font-mono text-[10px] text-white font-bold uppercase tracking-widest relative z-10 rotate-90 mb-4 opacity-60">
          09
        </span>
      </div>
    ),
    sections: fintechAwsSections
  }`,

  // 10 Independent Financial Partners
  `  {
    id: 'ifp-advisor', textureClass: 'texture-canvas',
    title: 'Independent Financial Partners',
    subtitle: 'Advisor AI Intelligence',
    author: 'Caleb Cooper',
    spineColor: '#e4e4e7', coverColor: '#f8fafc', textColor: '#1e293b', fontTitle: 'font-serif',
    coverImage: '/images/books/ifp_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(255,255,255,0.4)]" style={{ backgroundImage: "url('/images/books/ifp_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent p-10 flex flex-col justify-end">
          <div className="mb-4">
             <span className="font-mono text-[9px] text-red-600 tracking-[0.3em] uppercase font-black border-l-2 border-red-600 pl-3">IFP Case Study</span>
          </div>
          <h2 className="font-serif text-[42px] text-slate-900 tracking-tight leading-[0.9] mb-4">Independent<br/>Financial<br/>Partners</h2>
          <p className="font-mono text-[10px] text-slate-500 tracking-wide leading-relaxed max-w-[240px]">AI-assisted workflows for advisors and compliance teams</p>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#e4e4e7] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-zinc-300">
        <span className="[writing-mode:vertical-rl] font-mono font-bold text-[8px] text-zinc-500 uppercase tracking-[0.3em] relative z-10 mt-2">
          AI-Assisted Workflows
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[38px] text-slate-900 tracking-tighter uppercase leading-none drop-shadow-sm">
            IFP
          </span>
          <div className="flex gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
             <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]" />
          </div>
        </div>

        <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-widest relative z-10 rotate-90 mb-4">
          10
        </span>
      </div>
    ),
    sections: gwnSections
  }`,

  // 11 Summit Health
  `  {
    id: 'summit-health', textureClass: 'texture-paper',
    title: 'Summit Health',
    subtitle: 'Voice Agents for Multi-Location Orthopedic Care',
    author: 'Caleb Cooper',
    spineColor: '#991b1b', coverColor: '#fef2f2', textColor: '#991b1b', fontTitle: 'font-sans',
    coverImage: '/images/books/summit_health_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(255,255,255,0.6)]" style={{ backgroundImage: "url('/images/books/summit_health_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent p-10 flex flex-col justify-end">
          <h2 className="font-sans font-black text-5xl text-red-900 tracking-tighter leading-[0.85] mb-3 uppercase">Summit<br/>Health</h2>
          <p className="font-mono text-[10px] text-red-800 tracking-wide font-bold mb-4 uppercase">Voice Agents for Multi-Location Orthopedic Care</p>
          <div className="w-12 h-[2px] bg-red-600 mb-2" />
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#991b1b] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-red-800 shadow-[inset_-2px_0_15px_rgba(0,0,0,0.3)]">
        <span className="[writing-mode:vertical-rl] font-mono font-bold text-[8px] text-red-200/60 uppercase tracking-[0.3em] relative z-10 mt-2">
          Healthcare Systems
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[22px] text-red-100 tracking-[0.1em] uppercase drop-shadow-lg">
            SUMMIT HEALTH
          </span>
          <div className="w-1.5 h-16 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
        </div>

        <span className="font-mono text-[10px] text-red-300 font-bold uppercase tracking-widest relative z-10 rotate-90 mb-4 opacity-50">
          11
        </span>
      </div>
    ),
    sections: helloPatientSections
  }`,

  // 12 Milestone Motors
  `  {
    id: 'milestone', textureClass: 'texture-rough',
    title: 'Milestone Motors',
    subtitle: 'Service Advisor AI',
    author: 'Caleb Cooper',
    spineColor: '#0a0a0a', coverColor: '#0f172a', textColor: '#ffffff', fontTitle: 'font-mono',
    coverImage: '/images/books/milestone_motors_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/milestone_motors_cover.jpg')" }}>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-10 px-10 flex flex-col items-center text-center">
          <div className="border border-white/30 px-3 py-1 bg-black/40 backdrop-blur-sm mb-4">
             <span className="font-mono text-[8px] text-white tracking-[0.4em] uppercase font-bold">AI Service Advisor</span>
          </div>
          <h2 className="font-sans font-black text-[42px] text-white tracking-tighter leading-none mb-3 drop-shadow-2xl uppercase">Milestone<br/>Motors</h2>
          <div className="w-12 h-[1px] bg-red-600 mb-4 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase">Autonomous Service Systems</span>
        </div>
      </div>
    ),
    spineContent: (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-stone-800 shadow-[inset_-2px_0_15px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 bg-[url('/images/books/milestone_motors_cover.jpg')] bg-cover bg-center opacity-20 mix-blend-multiply grayscale" />
        <span className="[writing-mode:vertical-rl] font-mono font-bold text-[8px] text-zinc-500 uppercase tracking-[0.3em] relative z-10 mt-2">
          Service Copilot
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[22px] text-white tracking-[0.1em] uppercase drop-shadow-xl">
            MILESTONE
          </span>
          <div className="w-1.5 h-16 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
        </div>

        <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-widest relative z-10 rotate-90 mb-4">
          12
        </span>
      </div>
    ),
    sections: milestoneSections
  }`
];

const portfolioStartToken = "export const projects: BookProject[] = [";
const portfolioEndToken = "];";

portfolioCode = portfolioCode.replace(/\r\n/g, '\n');
let pStartIndex = portfolioCode.indexOf(portfolioStartToken);
let pEndIndex = portfolioCode.indexOf(portfolioEndToken, pStartIndex);

if (pStartIndex !== -1 && pEndIndex !== -1) {
    const newCode = portfolioCode.substring(0, pStartIndex) + portfolioStartToken + "\n" + restoredProjects.join(",\n") + "\n" + portfolioCode.substring(pEndIndex);
    fs.writeFileSync('src/data/portfolio.tsx', newCode);
    console.log("Restored portfolio.tsx");
} else {
    console.log("Failed to find tokens in portfolio.tsx");
}
