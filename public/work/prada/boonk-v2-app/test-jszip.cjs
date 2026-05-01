const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

async function test() {
  const zip = new JSZip();
  
  // Create a dummy dir
  if (!fs.existsSync('dummy')) fs.mkdirSync('dummy');
  if (!fs.existsSync('dummy/sub')) fs.mkdirSync('dummy/sub');
  fs.writeFileSync('dummy/test.txt', 'hello');
  fs.writeFileSync('dummy/sub/test2.txt', 'world');

  function addDirectoryToZip(dirPath, zipFolder) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        addDirectoryToZip(fullPath, zipFolder.folder(file));
      } else {
        zipFolder.file(file, fs.readFileSync(fullPath));
      }
    }
  }

  addDirectoryToZip('dummy', zip);

  const zipContent = await zip.generateAsync({ 
    type: 'nodebuffer', 
    compression: 'DEFLATE', 
    compressionOptions: { level: 9 } 
  });
  
  fs.writeFileSync('test.zip', zipContent);
  console.log('Zip created, size:', zipContent.length);
  
  // Read back
  const readZip = await JSZip.loadAsync(fs.readFileSync('test.zip'));
  console.log('Files in zip:', Object.keys(readZip.files));
}
test().catch(console.error);
