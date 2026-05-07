const fs = require('fs');

let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverContent: (
      <div className="absolute inset-0 bg-white">
         <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 opacity-10">
            {Array.from({length: 24}).map((_, i) => (
              <div key={i} className="border-[0.5px] border-black" />
            ))}
         </div>
         <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-black" />
         <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full border-4 border-black" />
         <div className="absolute bottom-1/4 right-8 flex gap-2">
            <div className="w-4 h-4 bg-black rounded-full" />
            <div className="w-4 h-4 border border-black rounded-full" />
            <div className="w-4 h-4 border border-black rounded-full" />
         </div>
         <div className="absolute inset-0 p-8 flex flex-col justify-center">
            <h2 className="text-6xl font-sans font-black tracking-tighter uppercase leading-[0.8] mb-4 mix-blend-difference text-white">Mortgage<br/>Operations</h2>
            <div className="[writing-mode:vertical-rl] text-xs font-mono tracking-widest absolute top-8 right-8">LOAN READINESS AI</div>
         </div>
      </div>
    ),`;

const replacementCover = `    coverImage: '/images/books/mortgage_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/mortgage_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 p-8 flex flex-col justify-between">
          <div className="text-right">
            <span className="font-mono text-[10px] text-zinc-300 tracking-[0.3em] uppercase drop-shadow-md border border-zinc-500/30 px-3 py-1 backdrop-blur-sm">Loan Readiness AI</span>
          </div>
          <div>
            <h2 className="font-sans font-black text-5xl text-white tracking-tighter uppercase leading-[0.85] mb-4 drop-shadow-xl">Mortgage<br/>Operations</h2>
            <div className="w-16 h-[2px] bg-zinc-400 mb-4" />
            <p className="font-mono text-[9px] text-zinc-300 tracking-[0.2em] uppercase drop-shadow-md">The Shade House Case Study</p>
          </div>
        </div>
      </div>
    ),`;

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-lg font-sans font-bold text-white tracking-widest uppercase">Mortgage Operations</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-white opacity-50 rotate-90">No. 02</span>
      </div>
    ),`;

const replacementSpine = `    spineContent: (
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

// Replace
code = code.replace(/\\r\\n/g, '\\n');
if(code.includes(targetCover)) {
    code = code.replace(targetCover, replacementCover);
    code = code.replace(targetSpine, replacementSpine);
    code = code.replace(`id: 'maybe-mortgage', textureClass: 'texture-canvas',`, `id: 'maybe-mortgage', textureClass: 'texture-leather',`);
    code = code.replace(`spineColor: '#171717', coverColor: '#ffffff', textColor: '#171717', spineTextColor: '#ffffff', fontTitle: 'font-sans',`, `spineColor: '#0f0f12', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-sans',`);
    
    fs.writeFileSync('src/data/portfolio.tsx', code);
    console.log("Success");
} else {
    console.log("Failed to find target");
}
