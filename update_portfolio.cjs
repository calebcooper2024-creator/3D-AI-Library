const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverContent: (
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
    ),`;

const replacementCover = `    coverImage: '/images/books/cellcore_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/cellcore_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-10 flex flex-col justify-end">
          <span className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] uppercase mb-4 drop-shadow-md">Internal Systems</span>
          <h2 className="font-serif text-5xl text-white leading-[0.9] tracking-tight mb-4 drop-shadow-lg">CellCore<br/>Biosciences</h2>
          <div className="w-12 h-[1px] bg-emerald-500/50 mb-4" />
          <p className="font-mono text-[9px] text-white/60 tracking-[0.2em] uppercase drop-shadow-md">By Caleb Cooper</p>
        </div>
      </div>
    ),`;

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-serif text-white tracking-widest">CellCore Biosciences</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 01</span>
      </div>
    ),`;

const replacementSpine = `    spineContent: (
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
    ),`;

code = code.replace(targetCover, replacementCover);
code = code.replace(targetCover.replace(/\n/g, '\r\n'), replacementCover);

code = code.replace(targetSpine, replacementSpine);
code = code.replace(targetSpine.replace(/\n/g, '\r\n'), replacementSpine);

code = code.replace(`id: 'cellcore', textureClass: 'texture-paper'`, `id: 'cellcore', textureClass: 'texture-leather'`);

fs.writeFileSync('src/data/portfolio.tsx', code);
