const fs = require('fs');
const http = require('http');

const req = http.get('http://localhost:3000/api/download-site?previewId=test', (res) => {
  if (res.statusCode !== 200) {
    console.error('Failed to download:', res.statusCode);
    res.resume();
    return;
  }
  const file = fs.createWriteStream('downloaded.zip');
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download complete');
  });
});
req.on('error', (err) => {
  console.error('Request error:', err);
});
