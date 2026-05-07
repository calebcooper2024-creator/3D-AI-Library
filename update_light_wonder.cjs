const fs = require('fs');

let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `    coverContent: (
      <div className="absolute inset-0 bg-pink-200">
         <div className="absolute inset-0 flex justify-around p-8 opacity-20">
            <div className="w-1 h-32 bg-purple-500 rounded-full animate-pulse" />
            <div className="w-1 h-48 bg-purple-500 rounded-full mt-12" />
            <div className="w-1 h-24 bg-purple-500 rounded-full mt-32 animate-pulse" />
            <div className="w-1 h-56 bg-purple-500 rounded-full" />
         </div>
         <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-5xl font-sans font-black text-purple-600 tracking-tighter uppercase mb-2">Light &<br/>Wonder</h2>
            <p className="text-purple-500/70 font-mono text-xs uppercase tracking-widest">Operator Intelligence</p>
         </div>
      </div>
    ),`;

const replacementCover = `    coverImage: '/images/books/light_wonder_cover.jpg',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_80px_rgba(30,20,50,0.8)]" style={{ backgroundImage: "url('/images/books/light_wonder_cover.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-transparent to-amber-900/60 p-8 flex flex-col justify-end">
          <div className="w-full flex justify-between items-end mb-4 border-b border-amber-400/40 pb-4">
             <h2 className="font-sans font-black text-[54px] text-white tracking-tighter uppercase leading-[0.85] drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Light<br/><span className="text-amber-300">&</span><br/>Wonder</h2>
             <div className="flex flex-col items-end gap-2 pb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <div className="w-1.5 h-1.5 rounded-full border border-amber-400/50" />
             </div>
          </div>
          <span className="font-mono text-[9px] text-amber-200 tracking-[0.4em] uppercase font-bold drop-shadow-md">Operator Intelligence</span>
        </div>
      </div>
    ),`;

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-lg font-sans font-bold text-purple-600 tracking-widest uppercase">Light & Wonder</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-purple-400 opacity-50" />
        <span className="absolute top-8 text-xs font-mono text-purple-400 opacity-50 rotate-90">No. 04</span>
      </div>
    ),`;

const replacementSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#2e1065] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-purple-500/30 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[url('/images/books/light_wonder_cover.jpg')] bg-cover bg-center opacity-30 mix-blend-color-dodge grayscale" />
        
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-3 h-[1px] bg-amber-400/50" />
          <span className="font-mono text-[8px] text-purple-300 uppercase tracking-widest rotate-90 my-1">04</span>
          <div className="w-3 h-[1px] bg-amber-400/50" />
        </div>

        <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[18px] text-white tracking-[0.1em] uppercase relative z-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
          LIGHT & WONDER
        </span>

        <div className="relative z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </div>
      </div>
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetCover, replacementCover);
code = code.replace(targetSpine, replacementSpine);
code = code.replace(`spineColor: '#fef08a', coverColor: '#fbcfe8', textColor: '#8b5cf6', fontTitle: 'font-sans',`, `spineColor: '#2e1065', coverColor: '#2e1065', textColor: '#ffffff', fontTitle: 'font-sans',`);
code = code.replace(`id: 'light-wonder', textureClass: 'texture-rough',`, `id: 'light-wonder', textureClass: 'texture-leather',`);

fs.writeFileSync('src/data/portfolio.tsx', code);
