const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverImage: '/images/books/nextera_cover.jpg',
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

const replacementCover = `    coverImage: '/images/books/nextera_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/nextera_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/95 via-cyan-950/60 to-transparent p-6 flex flex-col justify-start">
          <div className="border-l-[3px] border-cyan-400 pl-4 py-1 self-start mb-8">
            <span className="font-mono text-[10px] text-cyan-300 tracking-[0.3em] uppercase font-bold drop-shadow-md">FPL Predictive</span><br/>
            <span className="font-mono text-[10px] text-white tracking-[0.3em] uppercase font-black drop-shadow-md">Storm Intelligence</span>
          </div>
          <h2 className="font-sans font-bold text-5xl text-white tracking-tight leading-[0.9] drop-shadow-lg max-w-[80%]">NextEra<br/>Energy</h2>
          <div className="mt-auto flex justify-between items-end">
            <span className="font-mono text-[8px] text-white tracking-[0.2em] uppercase bg-black/80 px-3 py-1.5 font-bold border border-cyan-500/30 shadow-lg">Synergy: Algorithmic Backbone</span>
            <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center bg-cyan-900/40">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            </div>
          </div>
        </div>
      </div>
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetCover, replacementCover);

fs.writeFileSync('src/data/portfolio.tsx', code);
