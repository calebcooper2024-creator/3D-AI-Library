const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const targets = [
    'aquerone','argor-heraeus','avroko','chiara-luzzana','cobo','deplace-maison','edoardo-smerilli','loftgarten','om-swami','prada','sal-parasuco','the-books-of-ye','the-hiring-chain','the-roger-hub','thinkers','wow-concept'
  ];
  const out = [];
  for (const slug of targets) {
    const url = `http://localhost:3000/work/${slug}/index.html`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const head = page.locator('a.head-wrap');
    if (!await head.count()) { out.push({ slug, ok:false, reason:'no head-wrap' }); continue; }
    await head.click({ force: true, timeout: 15000 });
    await page.waitForLoadState('networkidle');
    out.push({ slug, to: page.url() });
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
})().catch(err => { console.error(err); process.exit(1); });
