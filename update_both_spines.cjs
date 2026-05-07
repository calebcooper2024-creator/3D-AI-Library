const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetMortgageSpineProps = `spineColor: '#f4f4f0', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-sans',`;
const replacementMortgageSpineProps = `spineColor: '#18181b', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-sans',`;

const targetMortgageSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#f4f4f0] flex flex-col items-center justify-center overflow-hidden border-r border-stone-300">
        <div className="absolute inset-0 bg-[url('/images/books/mortgage_cover.jpg')] bg-cover bg-center opacity-10 mix-blend-multiply grayscale" />
        
        <div className="absolute top-8 w-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-stone-400 rotate-45"></div>
        </div>

        <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[15px] text-stone-900 tracking-[0.15em] uppercase relative z-10">
          ROCKET MORTGAGE
        </span>

        <div className="absolute bottom-8 w-full flex flex-col items-center">
            <span className="font-mono text-[8px] text-stone-500 font-bold rotate-90 tracking-[0.3em] uppercase">No. 02</span>
        </div>
      </div>
    ),`;

const replacementMortgageSpine = `    spineContent: (
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
    ),`;

const targetNexteraSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#041d27] flex items-center justify-center overflow-hidden border-r border-cyan-900">
        <div className="absolute inset-0 bg-[url('/images/books/nextera_cover.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[46px] text-white/95 tracking-tighter uppercase whitespace-nowrap relative z-10 drop-shadow-2xl">
          NEXTERA ENERGY
        </span>
      </div>
    ),`;

const replacementNexteraSpine = `    spineContent: (
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
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetMortgageSpineProps, replacementMortgageSpineProps);
code = code.replace(targetMortgageSpine, replacementMortgageSpine);
code = code.replace(targetNexteraSpine, replacementNexteraSpine);

fs.writeFileSync('src/data/portfolio.tsx', code);
