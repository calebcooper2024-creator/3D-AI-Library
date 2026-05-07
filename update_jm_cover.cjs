const fs = require('fs');

let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetProps = `spineColor: '#6b21a8', coverColor: '#9333ea', textColor: '#ffffff', fontTitle: 'font-serif',`;
const replacementProps = `spineColor: '#f8fafc', coverColor: '#0f0f12', textColor: '#ffffff', fontTitle: 'font-serif',`;

const targetCover = `    coverContent: (
      <div className="absolute inset-0 bg-purple-600 overflow-hidden">
        <div className="absolute -bottom-20 -right-10 text-[250px] font-serif text-purple-800 opacity-50 leading-none">JM</div>
        <div className="absolute inset-0 p-10 flex flex-col justify-start">
           <h2 className="text-4xl font-serif text-white tracking-wide leading-tight">JM Family<br/>Enterprises</h2>
           <p className="mt-4 text-purple-200 font-mono text-sm tracking-widest uppercase">Dealer Operations AI</p>
           <div className="mt-12 w-8 h-[1px] bg-white/50" />
         </div>
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

code = code.replace(/\r\n/g, '\n');
code = code.replace(targetProps, replacementProps);
code = code.replace(targetCover, replacementCover);

fs.writeFileSync('src/data/portfolio.tsx', code);
