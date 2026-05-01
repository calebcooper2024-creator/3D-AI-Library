const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/work/the-hiring-chain/index.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/the-hiring-chain-page-check.png', fullPage: true });
  const loaded = await page.locator('img').evaluateAll(nodes => nodes.map(n => ({ src: n.currentSrc || n.src, w: n.naturalWidth, h: n.naturalHeight, visible: !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length) })).filter(x => x.src).slice(0, 12));
  await browser.close();
  console.log(JSON.stringify(loaded, null, 2));
})().catch(err => { console.error(err); process.exit(1); });
