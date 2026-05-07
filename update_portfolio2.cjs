const fs = require('fs');

let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverContent: (
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-[#ef4444]" />
        <div className="w-1/2 h-full bg-[#166534] relative">
          <div className="absolute bottom-16 -left-12 w-24 h-24 bg-[#ef4444] rounded-full mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 p-8 flex justify-between">
           <div className="[writing-mode:vertical-rl] rotate-180 text-5xl font-serif text-white tracking-widest leading-none pt-4">
             CellCore<br/>Biosciences
           </div>
           <div className="flex flex-col justify-end text-right text-[#fecdd3]">
              <span className="font-mono text-sm tracking-widest uppercase">Internal Systems</span>
              <span className="mt-3 font-mono text-[11px] tracking-[0.18em] text-[#fecdd3]/70">By Caleb Cooper</span>
            </div>
         </div>
      </div>
    ),`;

const replacementCover = `    coverImage: '/images/books/cellcore_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" style={{ backgroundImage: "url('/images/books/cellcore_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-10 flex flex-col justify-end">
          <span className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] uppercase mb-4 drop-shadow-md">Internal Systems</span>
          <h2 className="font-serif text-5xl text-white leading-[0.9] tracking-tight mb-4 drop-shadow-lg">CellCore<br/>Biosciences</h2>
          <div className="w-12 h-[1px] bg-emerald-500/50 mb-4" />
          <p className="font-mono text-[9px] text-white/60 tracking-[0.2em] uppercase drop-shadow-md">By Caleb Cooper</p>
        </div>
      </div>
    ),`;

// Normalise newlines for reliable matching
code = code.replace(/\r\n/g, '\n');

if(code.includes(targetCover)) {
    code = code.replace(targetCover, replacementCover);
    // write back with CRLF if needed or just LF
    fs.writeFileSync('src/data/portfolio.tsx', code);
    console.log("Success");
} else {
    console.log("Failed to find target");
}
