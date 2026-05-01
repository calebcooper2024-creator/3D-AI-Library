const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/work/avroko/brokie-playground/index.html', { waitUntil: 'networkidle' });
  await page.mouse.click(800, 550);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/avroko-state-1.png', fullPage: true });
  const buttons = page.locator('button');
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const btn = buttons.nth(i);
    const txt = (await btn.textContent() || '').replace(/\s+/g, ' ').trim();
    await btn.click({ force: true, timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/avroko-button-${i+1}.png`, fullPage: true });
    console.log('clicked', i+1, txt);
  }
  await page.waitForTimeout(8000);
  await page.screenshot({ path: 'C:/Users/Caleb/Downloads/calebs-3d-case-study/.tmp-playground-shots/avroko-state-late.png', fullPage: true });
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
