import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/edit-element', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        previewId: 'test',
        filePath: 'index.html',
        elementHtml: '<div>hello</div>',
        selector: 'div',
        prompt: 'make it say goodbye',
        isGlobal: false
      })
    });
    console.log(res.status);
    const text = await res.text();
    console.log(text);
  } catch(e) {
    console.error(e);
  }
}
test();
