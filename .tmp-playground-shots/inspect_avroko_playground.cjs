const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/work/avroko/brokie-playground/index.html', { waitUntil: 'networkidle' });
  await page.mouse.click(800, 550);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/avroko-after-init.png', fullPage: true });
  const buttons = await page.locator('button').allTextContents().catch(() => []);
  const links = await page.locator('a').allTextContents().catch(() => []);
  const text = await page.locator('body').textContent().catch(() => '');
  console.log(JSON.stringify({ buttons, links, body: (text || '').slice(0, 3000) }, null, 2));
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
