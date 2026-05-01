const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/work/avroko/brokie-playground/index.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/avroko-playground-full.png', fullPage: true });
  const title = await page.title();
  const body = await page.locator('body').textContent({ timeout: 5000 }).catch(() => '');
  console.log(JSON.stringify({ title, body: (body || '').slice(0, 1200), url: page.url() }, null, 2));
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
