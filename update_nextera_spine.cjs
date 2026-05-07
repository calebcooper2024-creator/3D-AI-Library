const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetSpine = `    spineContent: (
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

const replacementSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#041d27] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-cyan-900">
        <div className="absolute inset-0 bg-[url('/images/books/nextera_cover.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity grayscale" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9px] text-cyan-200 font-bold uppercase tracking-[0.3em] relative z-10 mt-2 drop-shadow-md">
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
code = code.replace(targetSpine, replacementSpine);

fs.writeFileSync('src/data/portfolio.tsx', code);
