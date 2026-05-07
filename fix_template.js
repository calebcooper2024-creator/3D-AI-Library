const fs = require('fs');
const file = 'src/components/project/ProjectDetailPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const bad = "project-horizontal-panel project-horizontal-panel--intro project-horizontal-panel--tone-1\";
const good = 'project-horizontal-panel project-horizontal-panel--intro project-horizontal-panel--tone-1';

content = content.replace(bad, good);
fs.writeFileSync(file, content);
console.log('Fixed template string');