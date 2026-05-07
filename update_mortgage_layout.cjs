const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverImage: '/images/books/mortgage_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/mortgage_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 p-8 flex flex-col justify-between">
          <div className="text-right">
            <span className="font-mono text-[10px] text-zinc-300 tracking-[0.3em] uppercase drop-shadow-md border border-zinc-500/30 px-3 py-1 backdrop-blur-sm">Loan Readiness AI</span>
          </div>
          <div>
            <h2 className="font-sans font-black text-5xl text-white tracking-tighter uppercase leading-[0.85] mb-4 drop-shadow-xl">Rocket<br/>Mortgage</h2>
            <div className="w-16 h-[2px] bg-zinc-400 mb-4" />
            <p className="font-mono text-[9px] text-zinc-300 tracking-[0.2em] uppercase drop-shadow-md">The Shade House Case Study</p>
          </div>
        </div>
      </div>
    ),`;

const replacementCover = `    coverImage: '/images/books/mortgage_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/mortgage_cover.jpg')" }}>
        <div className="absolute inset-0 border-[6px] border-white/20 m-6 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <h2 className="font-serif italic text-4xl text-white tracking-[0.15em] text-center leading-snug drop-shadow-2xl">Rocket<br/>Mortgage</h2>
          <div className="w-8 h-8 border-b-2 border-r-2 border-white/50 transform rotate-45 my-8"></div>
          <span className="font-mono text-[8px] text-white/80 tracking-[0.4em] uppercase text-center drop-shadow-md">Loan Readiness AI</span>
        </div>
      </div>
    ),`;

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#f4f4f0] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-stone-300">
        <div className="absolute inset-0 bg-[url('/images/books/mortgage_cover.jpg')] bg-cover bg-center opacity-10 mix-blend-multiply grayscale" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[7px] text-stone-500 uppercase tracking-[0.2em] relative z-10 mt-2">
          Loan Readiness AI
        </span>
        <div className="flex flex-col items-center gap-6 relative z-10 mb-2">
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[13px] text-stone-900 tracking-[0.1em] uppercase">
            Rocket Mortgage
          </span>
          <div className="w-1.5 h-1.5 rounded-none bg-stone-900 transform rotate-45" />
        </div>
      </div>
    ),`;

const replacementSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#f4f4f0] flex flex-col items-center justify-center overflow-hidden border-r border-stone-300">
        <div className="absolute inset-0 bg-[url('/images/books/mortgage_cover.jpg')] bg-cover bg-center opacity-10 mix-blend-multiply grayscale" />
        
        <div className="absolute top-8 w-full flex justify-center">
            <div className="w-4 border-t-2 border-stone-400"></div>
        </div>

        <span className="[writing-mode:vertical-rl] rotate-180 font-serif italic text-[16px] text-stone-900 tracking-[0.2em] relative z-10">
          Rocket Mortgage
        </span>

        <div className="absolute bottom-8 w-full flex flex-col items-center">
            <span className="font-mono text-[8px] text-stone-400 rotate-90 tracking-[0.3em]">02</span>
        </div>
      </div>
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetCover, replacementCover);
code = code.replace(targetSpine, replacementSpine);

fs.writeFileSync('src/data/portfolio.tsx', code);
