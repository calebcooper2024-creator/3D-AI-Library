const fs = require('fs');

let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#f8fafc] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-zinc-300 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.05)]">
        <span className="[writing-mode:vertical-rl] font-sans font-bold text-[8px] text-zinc-400 uppercase tracking-[0.3em] relative z-10 mt-2">
          Autonomous Logistics
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-serif text-[18px] text-zinc-800 tracking-[0.1em] uppercase">
            JM Family
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>

        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest relative z-10 rotate-90 mb-4">
          05
        </span>
      </div>
    ),`;

const replacementSpine = `    spineContent: (
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
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetSpine, replacementSpine);
code = code.replace(`id: 'jm-family', textureClass: 'texture-leather',`, `id: 'jm-family', textureClass: 'texture-paper',`);

fs.writeFileSync('src/data/portfolio.tsx', code);
