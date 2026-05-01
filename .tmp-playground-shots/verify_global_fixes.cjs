const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  const projectPages = [
    'aquerone','argor-heraeus','avroko','chiara-luzzana','cobo','deplace-maison','edoardo-smerilli','loftgarten','om-swami','prada','sal-parasuco','the-books-of-ye','the-hiring-chain','the-roger-hub','thinkers','wow-concept'
  ];
  const navResults = [];
  for (const slug of projectPages) {
    const url = `http://localhost:3000/work/${slug}/index.html`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const href = await page.evaluate(() => {
      const el = document.querySelector('a.head-wrap[href]');
      return el ? el.href : null;
    });
    if (!href) {
      navResults.push({ slug, ok: false, reason: 'missing-next-link' });
      continue;
    }
    await page.evaluate(() => {
      const el = document.querySelector('a.head-wrap[href]');
      if (el) el.click();
    });
    await page.waitForTimeout(1400);
    navResults.push({ slug, ok: page.url() === href, to: page.url(), expected: href });
  }

  const galleryPages = ['argor-heraeus','avroko','cobo','om-swami','prada','the-books-of-ye','the-hiring-chain','the-roger-hub','thinkers'];
  const galleryResults = [];
  for (const slug of galleryPages) {
    const url = `http://localhost:3000/work/${slug}/index.html`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const hasOpen = await page.locator('#gallery-open').count();
    if (!hasOpen) { galleryResults.push({ slug, ok:false, reason:'missing-gallery-open' }); continue; }
    await page.locator('#gallery-open').click({ force: true, timeout: 15000 });
    await page.waitForTimeout(700);
    const img = page.locator('img.gallery-img').first();
    await img.click({ force: true, timeout: 10000 });
    await page.waitForTimeout(300);
    const isOpen = await page.evaluate(() => {
      const overlay = document.querySelector('.project-gallery-lightbox');
      return !!overlay && overlay.classList.contains('is-open');
    });
    galleryResults.push({ slug, ok: isOpen });
    if (isOpen) {
      await page.locator('.project-gallery-lightbox__close').click({ force: true, timeout: 5000 }).catch(() => {});
    }
  }

  await browser.close();
  console.log(JSON.stringify({ navResults, galleryResults }, null, 2));
})().catch(err => { console.error(err); process.exit(1); });
