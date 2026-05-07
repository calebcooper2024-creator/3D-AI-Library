const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

const targetCover = `<span className="font-mono text-[8px] text-white tracking-[0.2em] uppercase bg-black/80 px-3 py-1.5 font-bold border border-cyan-500/30 shadow-lg">Synergy: Algorithmic Backbone</span>`;
const replacementCover = `<span className="font-mono text-[8px] text-white tracking-[0.2em] uppercase bg-black/80 px-3 py-1.5 font-bold border border-cyan-500/30 shadow-lg">FPL's Self Healing Grid</span>`;

code = code.replace(targetCover, replacementCover);

fs.writeFileSync('src/data/portfolio.tsx', code);
