const fs = require('fs');

let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetProps = `spineColor: '#000000', coverColor: '#111111', textColor: '#22c55e', fontTitle: 'font-mono',`;
const replacementProps = `spineColor: '#0a0a0c', coverColor: '#000000', textColor: '#22c55e', fontTitle: 'font-sans',`;

const targetCover = `    coverContent: (
      <div className="absolute inset-0 bg-[#111] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }} />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-green-500/30" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-green-500/30" />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
           <div className="bg-black/80 backdrop-blur-sm p-6 border border-green-500/20">
              <h2 className="text-4xl font-sans font-black text-white tracking-tighter uppercase mb-1">NVIDIA<br/>AI Factory</h2>
              <p className="text-green-500 font-mono text-xs tracking-widest uppercase">Operations Agent</p>
           </div>
        </div>
      </div>
    ),`;

const replacementCover = `    coverImage: '/images/books/nvidia_cover.png',
    coverContent: (
      <div className="absolute inset-0 bg-cover bg-center shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]" style={{ backgroundImage: "url('/images/books/nvidia_cover.png')" }}>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-32 pb-8 px-8 flex flex-col justify-end">
           <div className="border-l-4 border-green-500 pl-4 mt-8">
              <h2 className="text-[44px] font-sans font-black text-white tracking-tighter uppercase leading-[0.85] drop-shadow-lg mb-2">NVIDIA<br/>AI Factory</h2>
              <p className="text-green-400 font-mono text-[10px] tracking-[0.3em] uppercase font-bold drop-shadow-md">Operations Agent</p>
           </div>
        </div>
      </div>
    ),`;

const targetSpine = `    spineContent: (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] rotate-180 text-lg font-sans font-black text-white tracking-widest uppercase">NVIDIA AI Factory</span>
        <div className="absolute bottom-8 w-2 h-2 rounded-full bg-green-500 opacity-80" />
        <span className="absolute top-8 text-xs font-mono text-green-500 opacity-50 rotate-90">No. 06</span>
      </div>
    ),`;

const replacementSpine = `    spineContent: (
      <div className="absolute inset-0 bg-[#0a0a0c] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-zinc-800 shadow-[inset_-2px_0_10px_rgba(0,0,0,1)]">
        <div className="absolute inset-0 bg-[url('/images/books/nvidia_cover.png')] bg-cover bg-center opacity-10 mix-blend-luminosity grayscale" />
        
        <span className="[writing-mode:vertical-rl] font-mono font-bold text-[8px] text-green-500 uppercase tracking-[0.3em] relative z-10 mt-2">
          Operations Agent
        </span>
        
        <div className="flex flex-col items-center gap-6 relative z-10 my-auto">
          <span className="[writing-mode:vertical-rl] font-sans font-black text-[20px] text-white tracking-[0.1em] uppercase drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
            NVIDIA
          </span>
          <div className="w-1.5 h-[16px] bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        </div>

        <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-widest relative z-10 rotate-90 mb-4">
          06
        </span>
      </div>
    ),`;

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetProps, replacementProps);
code = code.replace(targetCover, replacementCover);
code = code.replace(targetSpine, replacementSpine);
code = code.replace(`id: 'nvidia', textureClass: 'texture-rough',`, `id: 'nvidia', textureClass: 'texture-leather',`);

fs.writeFileSync('src/data/portfolio.tsx', code);
