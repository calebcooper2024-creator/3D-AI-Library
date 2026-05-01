const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  const targets = [
    { name: 'gim', url: 'http://localhost:3000/work/the-roger-hub/index.html' },
    { name: 'thinkers', url: 'http://localhost:3000/work/thinkers/index.html' },
    { name: 'byc2w', url: 'http://localhost:3000/work/the-books-of-ye/index.html' },
    { name: 'boonk', url: 'http://localhost:3000/work/prada/index.html' },
    { name: 'cobo', url: 'http://localhost:3000/work/cobo/index.html' },
    { name: 'argor', url: 'http://localhost:3000/work/argor-heraeus/index.html' },
    { name: 'brokie', url: 'http://localhost:3000/work/brokie/index.html' }
  ];
  const out = [];
  for (const target of targets) {
    await page.goto(target.url, { waitUntil: 'networkidle' });
    const path = `C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/${target.name}-page-check.png`;
    await page.screenshot({ path, fullPage: true });
    const loaded = await page.locator('img').evaluateAll(nodes => nodes.map(n => ({
      src: n.currentSrc || n.src,
      w: n.naturalWidth,
      h: n.naturalHeight,
      visible: !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length)
    })).filter(x => x.src).slice(0, 12));
    out.push({ name: target.name, path, loaded });
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
})().catch(err => {
  console.error(err);
  process.exit(1);
});
