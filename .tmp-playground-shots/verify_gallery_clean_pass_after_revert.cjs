const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  const targets = [
    { name: 'thinkers', url: 'http://localhost:3000/work/thinkers/index.html' },
    { name: 'gim', url: 'http://localhost:3000/work/the-roger-hub/index.html' },
    { name: 'panopticon', url: 'http://localhost:3000/work/argor-heraeus/index.html' },
    { name: 'boonk', url: 'http://localhost:3000/work/prada/index.html' }
  ];
  const out = [];
  for (const target of targets) {
    await page.goto(target.url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/${target.name}-hero-check-2.png`, fullPage: false });
    await page.locator('#gallery-open').click({ force: true, timeout: 15000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/${target.name}-gallery-open-check-2.png`, fullPage: false });
    out.push(target.name);
    await page.locator('#gallery-close').click({ force: true, timeout: 5000 }).catch(() => {});
  }
  await browser.close();
  console.log(JSON.stringify(out));
})().catch(err => { console.error(err); process.exit(1); });
