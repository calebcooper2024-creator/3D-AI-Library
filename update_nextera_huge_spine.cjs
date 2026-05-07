const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#041d27] flex flex-col items-center overflow-hidden border-r border-cyan-900">
        <div className="absolute inset-0 bg-[url('/images/books/nextera_cover.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity grayscale" />
        
        <div className="absolute top-10 flex flex-col items-center gap-8 relative z-10">
          <span className="[writing-mode:vertical-rl] font-sans font-bold text-[18px] text-white tracking-[0.15em] uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
            NEXTERA
          </span>
          <span className="[writing-mode:vertical-rl] font-mono text-[9px] text-cyan-200 font-bold uppercase tracking-[0.3em] drop-shadow-md border-l border-cyan-500/50 pl-1">
            Self-Healing Grid
          </span>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 relative z-10">
          <div className="w-1.5 h-1.5 rounded-none bg-cyan-400 transform rotate-45 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        </div>
      </div>
    ),`;

const replacementSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#041d27] flex items-center justify-center overflow-hidden border-r border-cyan-900">
        <div className="absolute inset-0 bg-[url('/images/books/nextera_cover.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[46px] text-white/95 tracking-tighter uppercase whitespace-nowrap relative z-10 drop-shadow-2xl">
          NEXTERA ENERGY
        </span>
      </div>
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetSpine, replacementSpine);

fs.writeFileSync('src/data/portfolio.tsx', code);
