const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  const targets = [
    { name: 'gim', url: 'http://localhost:3000/work/the-roger-hub/index.html' },
    { name: 'thinkers', url: 'http://localhost:3000/work/thinkers/index.html' },
    { name: 'cortex', url: 'http://localhost:3000/work/cobo/index.html' },
    { name: 'panopticon', url: 'http://localhost:3000/work/argor-heraeus/index.html' },
    { name: 'bonnie', url: 'http://localhost:3000/work/om-swami/index.html' },
    { name: 'byc2w', url: 'http://localhost:3000/work/the-books-of-ye/index.html' },
    { name: 'boonk', url: 'http://localhost:3000/work/prada/index.html' },
    { name: 'brokie_v1', url: 'http://localhost:3000/work/the-hiring-chain/index.html' }
  ];
  const out = [];
  for (const target of targets) {
    await page.goto(target.url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/${target.name}-hero-check.png`, fullPage: false });
    const open = page.locator('#gallery-open');
    await open.click({ force: true, timeout: 15000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/${target.name}-gallery-open-check.png`, fullPage: false });
    const data = await page.$$eval('img.gallery-img', imgs => imgs.map(img => ({
      src: img.getAttribute('src'),
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    })));
    out.push({ name: target.name, gallery: data });
    const close = page.locator('#gallery-close');
    if (await close.count()) {
      await close.click({ force: true, timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(300);
    }
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
})().catch(err => {
  console.error(err);
  process.exit(1);
});
