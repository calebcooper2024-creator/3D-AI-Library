const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverImage: '/images/books/mortgage_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" style={{ backgroundImage: "url('/images/books/mortgage_cover.jpg')" }}>
        <div className="absolute inset-0 border border-white/10 m-4 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <h2 className="font-sans font-black text-5xl text-white tracking-tighter uppercase text-center leading-[0.85] drop-shadow-2xl">ROCKET<br/>MORTGAGE</h2>
          <div className="w-12 h-[2px] bg-white/50 my-6"></div>
          <span className="font-mono text-[9px] text-white/80 tracking-[0.3em] uppercase text-center drop-shadow-md">Loan Readiness AI</span>
        </div>
      </div>
    ),`;

const replacementCover = `    coverImage: '/images/books/mortgage_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,0.5)]" style={{ backgroundImage: "url('/images/books/mortgage_cover.jpg')" }}>
        <div className="absolute inset-0 border border-white/20 m-6 flex flex-col items-center justify-center bg-black/10">
          <h2 className="font-sans font-black text-5xl text-white tracking-tighter uppercase text-center leading-[0.85] drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">ROCKET<br/>MORTGAGE</h2>
          <div className="w-12 h-[2px] bg-white/80 my-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]"></div>
          <span className="font-mono text-[9px] text-white font-bold tracking-[0.3em] uppercase text-center drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">Loan Readiness AI</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetCover, replacementCover);

fs.writeFileSync('src/data/portfolio.tsx', code);
