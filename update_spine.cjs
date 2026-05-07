const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetSpineProps = `    spineColor: '#0f0f12', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-sans',`;
const replacementSpineProps = `    spineColor: '#f4f4f0', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-sans',`;

const targetSpineContent = `    spineContent: (
      <div className="absolute inset-0 bg-[#0f0f12] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-zinc-500/20">
        <div className="absolute inset-0 bg-[url('/images/books/mortgage_cover.jpg')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[7px] text-zinc-400 uppercase tracking-[0.2em] relative z-10 opacity-80 mt-2">
          Loan Readiness AI
        </span>
        <div className="flex flex-col items-center gap-6 relative z-10 mb-2">
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[14px] text-white tracking-[0.15em] drop-shadow-md uppercase">
            Mortgage
          </span>
          <div className="w-1.5 h-1.5 rounded-none bg-zinc-400 shadow-[0_0_8px_rgba(161,161,170,0.8)] transform rotate-45" />
        </div>
      </div>
    ),`;

const replacementSpineContent = `    spineContent: (
      <div className="absolute inset-0 bg-[#f4f4f0] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-stone-300">
        <div className="absolute inset-0 bg-[url('/images/books/mortgage_cover.jpg')] bg-cover bg-center opacity-10 mix-blend-multiply grayscale" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[7px] text-stone-500 uppercase tracking-[0.2em] relative z-10 mt-2">
          Loan Readiness AI
        </span>
        <div className="flex flex-col items-center gap-6 relative z-10 mb-2">
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[14px] text-stone-900 tracking-[0.15em] uppercase">
            Mortgage
          </span>
          <div className="w-1.5 h-1.5 rounded-none bg-stone-900 transform rotate-45" />
        </div>
      </div>
    ),`;

// Replace
code = code.replace(/\r\n/g, '\n');
code = code.replace(targetSpineProps, replacementSpineProps);
code = code.replace(targetSpineContent, replacementSpineContent);

fs.writeFileSync('src/data/portfolio.tsx', code);
