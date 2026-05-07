const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverContent: (
      <div className="absolute inset-0 bg-purple-500">
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
         <div className="absolute inset-0 p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-serif text-white mb-8">JM Family<br/>Enterprises</h2>
            <div className="w-full h-[1px] bg-white/30 relative">
               <div className="absolute top-0 left-1/4 w-1/4 h-[1px] bg-white" />
            </div>
            <p className="mt-8 text-white/70 font-mono text-xs uppercase tracking-widest">Dealer Operations AI</p>
         </div>
         <div className="absolute bottom-0 right-0 p-8 text-8xl font-serif text-white/10 leading-none">JM</div>
      </div>
    ),`;

const replacementCover = `    coverImage: '/images/books/jm_family_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" style={{ backgroundImage: "url('/images/books/jm_family_cover.jpg')" }}>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent pt-32 pb-8 px-8 flex flex-col items-center text-center">
          <h2 className="font-serif text-[42px] text-white tracking-tight leading-none mb-3 drop-shadow-lg">JM Family<br/>Enterprises</h2>
          <div className="w-8 h-[1px] bg-zinc-400 mb-3" />
          <span className="font-sans text-[10px] text-zinc-300 tracking-[0.3em] uppercase font-bold drop-shadow-md">Autonomous Logistics</span>
        </div>
      </div>
    ),`;

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-xl font-serif text-white tracking-widest">JM Family Enterprises</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 05</span>
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
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>

        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest relative z-10 rotate-90 mb-4">
          05
        </span>
      </div>
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetCover, replacementCover);
code = code.replace(targetSpine, replacementSpine);
code = code.replace(`spineColor: '#a855f7', coverColor: '#d8b4fe', textColor: '#ffffff', fontTitle: 'font-serif',`, `spineColor: '#f8fafc', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-serif',`);
code = code.replace(`subtitle: 'Dealer Operations AI',`, `subtitle: 'Autonomous Logistics',`);

fs.writeFileSync('src/data/portfolio.tsx', code);
