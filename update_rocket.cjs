const fs = require('fs');
let code = fs.readFileSync('src/data/portfolio.tsx', 'utf8');

// Replace Title
code = code.replace(`title: 'Mortgage Operations',`, `title: 'Rocket Mortgage',`);

// Replace cover content
code = code.replace(
  `Mortgage<br/>Operations</h2>`,
  `Rocket<br/>Mortgage</h2>`
);

// Replace spine content (need to be careful to match the exact stone-900 one)
const spineTarget = `<span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[14px] text-stone-900 tracking-[0.15em] uppercase">
            Mortgage
          </span>`;
const spineReplacement = `<span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[13px] text-stone-900 tracking-[0.1em] uppercase">
            Rocket Mortgage
          </span>`;

code = code.replace(spineTarget.replace(/\n/g, '\r\n'), spineReplacement);
code = code.replace(spineTarget, spineReplacement);

fs.writeFileSync('src/data/portfolio.tsx', code);
