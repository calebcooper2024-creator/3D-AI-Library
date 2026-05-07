const fs = require('fs');

let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverContent: (
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
    ),`;

const replacementCover = `    coverImage: '/images/books/nextera_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/nextera_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/95 via-cyan-950/60 to-transparent p-6 flex flex-col justify-start">
          <div className="border-l-2 border-cyan-400 pl-4 py-2 bg-black/40 backdrop-blur-sm self-start mb-6">
            <span className="font-mono text-[8px] text-cyan-300 tracking-[0.4em] uppercase">FPL Predictive</span><br/>
            <span className="font-mono text-[8px] text-cyan-300 tracking-[0.4em] uppercase font-bold">Storm Intelligence</span>
          </div>
          <h2 className="font-sans font-medium text-5xl text-white tracking-tight leading-[0.9] drop-shadow-lg max-w-[80%] mt-2">NextEra<br/>Energy</h2>
          <div className="mt-auto flex justify-between items-end">
            <span className="font-mono text-[7px] text-cyan-400/80 tracking-[0.2em] uppercase bg-black/60 px-2 py-1">Synergy: Algorithmic Backbone</span>
            <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center bg-cyan-900/40">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            </div>
          </div>
        </div>
      </div>
    ),`;

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-serif text-white tracking-wide">NextEra Energy</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 03</span>
      </div>
    ),`;

const replacementSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#041d27] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-cyan-900">
        <div className="absolute inset-0 bg-[url('/images/books/nextera_cover.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity grayscale" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[7px] text-cyan-500 uppercase tracking-[0.3em] relative z-10 opacity-80 mt-2">
          Self-Healing Grid
        </span>
        <div className="flex flex-col items-center gap-6 relative z-10 mb-2">
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-medium text-[16px] text-white tracking-[0.1em] drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            NextEra
          </span>
          <div className="w-2 h-[1px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        </div>
      </div>
    ),`;

code = code.replace(/\r\n/g, '\n');
if(code.includes(targetCover)) {
    code = code.replace(targetCover, replacementCover);
    code = code.replace(targetSpine, replacementSpine);
    code = code.replace(`id: 'nextera', textureClass: 'texture-leather',`, `id: 'nextera', textureClass: 'texture-rough',`);
    code = code.replace(`spineColor: '#1e3a8a', coverColor: '#3b82f6', textColor: '#ffffff', fontTitle: 'font-serif',`, `spineColor: '#041d27', coverColor: '#041d27', textColor: '#ffffff', fontTitle: 'font-sans',`);
    
    fs.writeFileSync('src/data/portfolio.tsx', code);
    console.log("Success");
} else {
    console.log("Failed to find target");
}
