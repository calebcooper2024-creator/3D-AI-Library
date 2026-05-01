const path = require('path');
const PREVIEWS_DIR = path.join(__dirname, 'previews');
const previewId = '../previews2';
const previewPath = path.join(PREVIEWS_DIR, previewId);
console.log(previewPath.startsWith(PREVIEWS_DIR));
console.log(previewPath.startsWith(PREVIEWS_DIR + path.sep));
