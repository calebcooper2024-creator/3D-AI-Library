const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverImage: '/images/books/mortgage_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/mortgage_cover.jpg')" }}>
        <div className="absolute inset-0 border-[6px] border-white/20 m-6 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <h2 className="font-serif italic text-4xl text-white tracking-[0.15em] text-center leading-snug drop-shadow-2xl">Rocket<br/>Mortgage</h2>
          <div className="w-8 h-8 border-b-2 border-r-2 border-white/50 transform rotate-45 my-8"></div>
          <span className="font-mono text-[8px] text-white/80 tracking-[0.4em] uppercase text-center drop-shadow-md">Loan Readiness AI</span>
        </div>
      </div>
    ),`;

const replacementCover = `    coverImage: '/images/books/mortgage_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/mortgage_cover.jpg')" }}>
        <div className="absolute inset-0 border border-white/10 m-4 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <h2 className="font-sans font-black text-5xl text-white tracking-tighter uppercase text-center leading-[0.85] drop-shadow-2xl">ROCKET<br/>MORTGAGE</h2>
          <div className="w-12 h-[2px] bg-white/50 my-6"></div>
          <span className="font-mono text-[9px] text-white/80 tracking-[0.3em] uppercase text-center drop-shadow-md">Loan Readiness AI</span>
        </div>
      </div>
    ),`;

const targetSpine = `    spineContent: (
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

const replacementSpine = `    spineContent: (
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

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetCover, replacementCover);
code = code.replace(targetSpine, replacementSpine);

fs.writeFileSync('src/data/portfolio.tsx', code);
