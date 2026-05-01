import express from 'express';
import { chromium } from 'playwright';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import xml2js from 'xml2js';
import JSZip from 'jszip';
import archiver from 'archiver';
import crypto from 'crypto';
import * as cheerio from 'cheerio';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from "@google/genai";

const execFileAsync = promisify(execFile);

console.log('PLAYWRIGHT_BROWSERS_PATH:', process.env.PLAYWRIGHT_BROWSERS_PATH);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Browser Singleton
let _browser = null;
async function getBrowser() {
  if (!_browser || !_browser.isConnected()) {
    let executablePath;
    try {
      const browsersPath = path.join(process.cwd(), 'node_modules', 'playwright-core', '.local-browsers');
      if (fs.existsSync(browsersPath)) {
        const dirs = fs.readdirSync(browsersPath);
        const headlessDir = dirs.find(d => d.startsWith('chromium_headless_shell-'));
        if (headlessDir) {
          executablePath = path.join(browsersPath, headlessDir, 'chrome-headless-shell-linux64', 'chrome-headless-shell');
        } else {
          const chromiumDir = dirs.find(d => d.startsWith('chromium-'));
          if (chromiumDir) {
            executablePath = path.join(browsersPath, chromiumDir, 'chrome-linux64', 'chrome');
          }
        }
      }
    } catch (e) {
      console.error('Failed to find local browser path:', e);
    }

    _browser = await chromium.launch({
      headless: true,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
  }
  return _browser;
}

async function withPage(fn) {
  const browser = await getBrowser();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    serviceWorkers: 'block',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  try {
    return await fn(page);
  } finally {
    await context.close();
  }
}

// Helper: Asset Filename
function getAssetFilename(url) {
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
  const parsed = new URL(url);
  const originalName = parsed.pathname.split('/').pop().split('?')[0] || 'asset';
  return `${hash}_${originalName}`;
}

// Helper: Page URL to Filename
function pageUrlToFilename(pathname) {
  if (pathname === '/' || pathname === '' || pathname === 'index') return 'index.html';
  return pathname
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/\//g, '-')
    .replace(/^-+/, '')
    + '.html';
}

// Helper: Is Third Party Embed
function isThirdPartyEmbed(url) {
  const embedDomains = ['youtube.com', 'youtu.be', 'vimeo.com', 'spline.design',
    'matterport.com', 'soundcloud.com', 'spotify.com', 'twitter.com', 'instagram.com', 'google.com/maps',
    'challenges.cloudflare.com', 'cloudflare.com/cdn-cgi', 'googletagmanager.com', 'google-analytics.com',
    'facebook.net', 'doubleclick.net', 'hotjar.com'];
  return embedDomains.some(d => url.includes(d));
}

// Helper: Extract CSS URLs
function extractCssUrls(cssText, cssUrl) {
  const matches = [];
  const regex = /url\(['"]?([^'")\s]+)['"]?\)/g;
  let m;
  while ((m = regex.exec(cssText)) !== null) {
    const u = m[1];
    if (!u.startsWith('data:') && !u.startsWith('blob:')) {
      try {
        const fullUrl = new URL(u, cssUrl).toString();
        if (!isThirdPartyEmbed(fullUrl)) {
          matches.push({ original: u, fullUrl });
        }
      } catch(e) {}
    }
  }
  return matches;
}

// Temporary storage for previews
const PREVIEWS_DIR = path.join(__dirname, 'previews');
if (!fs.existsSync(PREVIEWS_DIR)) fs.mkdirSync(PREVIEWS_DIR);

// Helper: Deep Link Discovery
async function discoverPages(page, origin) {
  return await page.evaluate((origin) => {
    const links = new Set();
    
    // Standard links
    Array.from(document.querySelectorAll('a[href]')).forEach(a => {
      try {
        const url = new URL(a.href, window.location.href);
        if (url.origin === origin) {
          // Remove fragments and trailing slashes for normalization
          const normalized = url.origin + url.pathname.replace(/\/$/, '');
          if (normalized.length > origin.length + 1) { // Avoid adding origin itself repeatedly
            links.add(normalized);
          }
        }
      } catch (e) {}
    });

    // Aggressive CMS detection for Webflow and general portfolio sites
    const cmsSelectors = [
      '[class*="collection-item"]', 
      '[class*="portfolio-item"]', 
      '[class*="work-item"]',
      '[class*="project-item"]',
      '[class*="blog-post"]',
      '[data-wf-collection]',
      '.w-dyn-item',
      '.portfolio-link',
      '.work-link'
    ];
    
    cmsSelectors.forEach(selector => {
      Array.from(document.querySelectorAll(selector)).forEach(item => {
        const link = item.querySelector('a') || (item.tagName === 'A' ? item : null);
        if (link) {
          try {
            const url = new URL(link.href, window.location.href);
            if (url.origin === origin) {
              links.add(url.origin + url.pathname.replace(/\/$/, ''));
            }
          } catch (e) {}
        }
      });
    });

    return Array.from(links);
  }, origin);
}

// Routes
// Image Proxy to bypass CORS/Hotlink protection
app.get("/api/proxy-image", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send("URL is required");

  try {
    let origin;
    try {
      origin = new URL(imageUrl).origin;
    } catch (e) {
      origin = imageUrl;
    }

    const response = await axios.get(imageUrl, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': origin,
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    const contentType = response.headers['content-type'];
    if (contentType) res.setHeader('Content-Type', contentType);
    
    // Cache for 1 hour
    res.setHeader('Cache-Control', 'public, max-age=3600');

    response.data.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error.message || error);
    res.status(500).send("Failed to proxy image");
  }
});
app.post('/api/scrape-metadata', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (type, data) => {
    res.write(`data: ${JSON.stringify({ type, ...data })}\n\n`);
  };

  try {
    send('status', { message: 'Calibrating neural mapping...' });
    const result = await withPage(async (page) => {
      // Set a reasonable default timeout
      page.setDefaultTimeout(30000);
      
      send('status', { message: 'Establishing secure connection to source...' });
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      } catch (e) {
        // If load fails, try domcontentloaded as a fallback
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      }
      
      const title = await page.title();
      const parsedUrl = new URL(url);
      const origin = parsedUrl.origin;
      const hostname = parsedUrl.hostname;

      send('status', { message: 'Discovering deep links and sitemap...' });
      // Initial discovery
      let pages = new Set([url.replace(/\/$/, '')]);
      
      // 1. Sitemap discovery (most reliable for CMS)
      try {
        const sitemapUrl = new URL('/sitemap.xml', origin).toString();
        const sitemapRes = await axios.get(sitemapUrl, { timeout: 5000 });
        const parser = new xml2js.Parser();
        const sitemapObj = await parser.parseStringPromise(sitemapRes.data);
        if (sitemapObj.urlset && sitemapObj.urlset.url) {
          sitemapObj.urlset.url.forEach(u => {
            const loc = u.loc[0];
            if (new URL(loc).origin === origin) pages.add(loc.replace(/\/$/, ''));
          });
        }
      } catch (e) {}

      // 2. Deep link crawl on home page
      const discovered = await discoverPages(page, origin);
      discovered.forEach(p => pages.add(p));
      send('status', { message: `Discovered ${pages.size} potential pages to scan.` });

      // 3. Specific check for common CMS paths if sitemap failed or is small
      if (pages.size < 5) {
        const commonPaths = ['/work', '/portfolio', '/projects', '/blog', '/about', '/contact', '/services'];
        for (const path of commonPaths) {
          try {
            const testUrl = new URL(path, origin).toString();
            send('status', { message: `Testing common path: ${path}` });
            await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 5000 });
            const morePages = await discoverPages(page, origin);
            morePages.forEach(p => pages.add(p));
          } catch (e) {}
        }
      }

      send('status', { message: `Total pages identified for scanning: ${pages.size}` });

      const features = await page.evaluate(() => {
        return {
          webflow: document.documentElement.hasAttribute('data-wf-page'),
          interactions: document.querySelectorAll('[data-w-id]').length,
          lottie: !!document.querySelector('[data-animation-type="lottie"]'),
          cms: document.querySelectorAll('[class*="collection-list"]').length > 0
        };
      });

      // 4. Gather Visual Assets from all discovered pages
      const allVisualAssets = [];
      const seenAssets = new Set();
      const pagesToScan = Array.from(pages).slice(0, 20); // Limit to 20 pages for performance
      send('status', { message: `Scanning ${pagesToScan.length} pages for visual assets...` });
      
      for (let i = 0; i < pagesToScan.length; i++) {
        const pageUrl = pagesToScan[i];
        try {
          send('status', { message: `Scanning page ${i + 1}/${pagesToScan.length}: ${pageUrl}` });
          await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
          
          // Deep crawl: find more links on this page
          if (pages.size < 30) {
            const morePages = await discoverPages(page, origin);
            morePages.forEach(p => {
              if (!pages.has(p) && pages.size < 30) {
                pages.add(p);
                if (!pagesToScan.includes(p)) pagesToScan.push(p);
              }
            });
          }

          // Thorough scroll to trigger all lazy-loaded assets
          await page.evaluate(async () => {
            await new Promise(resolve => {
              let totalHeight = 0;
              let distance = 200; // Faster scroll
              let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if(totalHeight >= scrollHeight || totalHeight > 10000){ // Cap at 10k pixels
                  clearInterval(timer);
                  resolve();
                }
              }, 50);
            });
          });
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(500);

          const assets = await page.evaluate(() => {
            const results = [];
            const elements = document.querySelectorAll('*');
            
            elements.forEach((el, index) => {
              const style = window.getComputedStyle(el);
              const bgImage = style.backgroundImage;
              
              if (el.tagName === 'IMG') {
                const rect = el.getBoundingClientRect();
                if (rect.width > 1 && rect.height > 1) {
                  results.push({
                    type: 'image',
                    src: el.src ? new URL(el.src, window.location.href).href : '',
                    srcset: el.getAttribute('srcset') || '',
                    sizes: el.getAttribute('sizes') || '',
                    width: el.naturalWidth || el.offsetWidth,
                    height: el.naturalHeight || el.offsetHeight,
                    tagName: 'IMG'
                  });
                }
              }
              else if (el.tagName === 'VIDEO') {
                const videoSrc = el.src || (el.querySelector('source') ? el.querySelector('source').src : '');
                if (videoSrc) {
                  results.push({
                    type: 'video',
                    src: new URL(videoSrc, window.location.href).href,
                    poster: el.poster ? new URL(el.poster, window.location.href).href : '',
                    width: el.videoWidth || el.offsetWidth,
                    height: el.videoHeight || el.offsetHeight,
                    tagName: 'VIDEO'
                  });
                }
              }
              else if (bgImage && bgImage !== 'none' && bgImage.startsWith('url(')) {
                const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (urlMatch) {
                  const url = urlMatch[1];
                  const rect = el.getBoundingClientRect();
                  if (rect.width > 1 && rect.height > 1) {
                    results.push({
                      type: 'background',
                      src: new URL(url, window.location.href).href,
                      width: el.offsetWidth,
                      height: el.offsetHeight,
                      tagName: el.tagName
                    });
                  }
                }
              }
              else if (el.tagName === 'svg' || el.closest('svg')) {
                const svg = el.tagName === 'svg' ? el : el.closest('svg');
                if (svg) {
                  const rect = svg.getBoundingClientRect();
                  if (rect.width > 1 && rect.height > 1) {
                    results.push({
                      type: 'svg',
                      content: svg.outerHTML,
                      width: Math.round(rect.width),
                      height: Math.round(rect.height),
                      tagName: 'SVG'
                    });
                  }
                }
              }
            });
            return results;
          });

          let newAssetsCount = 0;
          assets.forEach(asset => {
            const key = asset.type === 'svg' ? asset.content : asset.src;
            if (key && !seenAssets.has(key)) {
              seenAssets.add(key);
              newAssetsCount++;
              allVisualAssets.push({ 
                ...asset, 
                index: allVisualAssets.length,
                originalSrc: asset.src,
                originalContent: asset.content
              });
            }
          });
          console.log(`Found ${assets.length} raw assets on ${pageUrl}, ${newAssetsCount} are new.`);
        } catch (e) {
          console.error(`Failed to scan page ${pageUrl}:`, e.message);
        }
      }

      send('status', { message: 'Extracting chromatic essence...' });
      // Final navigation back to home/original URL for color extraction
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      } catch (e) {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      }
      
      // Wait for dynamic styles and fonts
      await page.waitForTimeout(2000);
      await page.evaluate(() => document.fonts.ready);

      const colors = await page.evaluate(async () => {
        const colorCounts = {};
        const elements = document.querySelectorAll('*');
        
        const rgbToHex = (colorStr) => {
          if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') return null;
          
          // Handle RGB/RGBA
          const rgbMatch = colorStr.match(/^rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s\/]+(\d+(?:\.\d+)?))?\)$/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;
            if (a === 0) return null;
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
          }

          // Handle HSL/HSLA
          const hslMatch = colorStr.match(/^hsla?\((\d+)[,\s]+(\d+)%[,\s]+(\d+)%(?:[,\s\/]+(\d+(?:\.\d+)?))?\)$/);
          if (hslMatch) {
            let h = parseInt(hslMatch[1]) / 360;
            let s = parseInt(hslMatch[2]) / 100;
            let l = parseInt(hslMatch[3]) / 100;
            let a = hslMatch[4] ? parseFloat(hslMatch[4]) : 1;
            if (a === 0) return null;

            let r, g, b;
            if (s === 0) {
              r = g = b = l;
            } else {
              const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
              };
              const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
              const p = 2 * l - q;
              r = hue2rgb(p, q, h + 1/3);
              g = hue2rgb(p, q, h);
              b = hue2rgb(p, q, h - 1/3);
            }
            const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0').toUpperCase();
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
          }

          return null;
        };

        const extractFromStyle = (style) => {
          if (!style) return;
          const props = [
            'color', 'backgroundColor', 'borderColor', 'fill', 'stroke', 
            'outlineColor', 'stopColor', 'borderTopColor', 'borderBottomColor', 
            'borderLeftColor', 'borderRightColor', 'boxShadow', 'textShadow',
            'caretColor', 'columnRuleColor', 'floodColor', 'lightingColor'
          ];
          props.forEach(prop => {
            const val = style[prop];
            if (val && val !== 'none' && val !== 'initial' && val !== 'inherit') {
              // Extract ALL colors from the value string (HEX, RGB, HSL)
              const hexMatches = val.match(/#[0-9A-Fa-f]{3,8}/g) || [];
              const rgbMatches = val.match(/rgba?\(.*?\)/g) || [];
              const hslMatches = val.match(/hsla?\(.*?\)/g) || [];
              
              hexMatches.forEach(h => {
                let normalized = h.toUpperCase();
                if (normalized.length === 4) {
                  normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3];
                }
                if (normalized.length === 9) normalized = normalized.slice(0, 7); // Strip alpha
                colorCounts[normalized] = (colorCounts[normalized] || 0) + 1;
              });
              
              [...rgbMatches, ...hslMatches].forEach(c => {
                const hex = rgbToHex(c);
                if (hex) colorCounts[hex] = (colorCounts[hex] || 0) + 1;
              });
 
              // Direct check if it's just a color string
              const directHex = rgbToHex(val);
              if (directHex) colorCounts[directHex] = (colorCounts[directHex] || 0) + 1;
            }
          });
          
          // Special handling for gradients in background-image
          const bgImg = style.backgroundImage;
          if (bgImg && bgImg.includes('gradient')) {
            const hexMatches = bgImg.match(/#[0-9A-Fa-f]{3,8}/g) || [];
            const rgbMatches = bgImg.match(/rgba?\(.*?\)/g) || [];
            const hslMatches = bgImg.match(/hsla?\(.*?\)/g) || [];
            
            hexMatches.forEach(h => {
              let normalized = h.toUpperCase();
              if (normalized.length === 4) {
                normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3];
              }
              if (normalized.length === 9) normalized = normalized.slice(0, 7);
              colorCounts[normalized] = (colorCounts[normalized] || 0) + 1;
            });
            
            [...rgbMatches, ...hslMatches].forEach(c => {
              const hex = rgbToHex(c);
              if (hex) colorCounts[hex] = (colorCounts[hex] || 0) + 1;
            });
          }
        };

        // 1. Scan all elements
        elements.forEach(el => {
          extractFromStyle(window.getComputedStyle(el));
          extractFromStyle(window.getComputedStyle(el, ':before'));
          extractFromStyle(window.getComputedStyle(el, ':after'));
        });

        // 2. Scan all stylesheets
        try {
          for (const sheet of document.styleSheets) {
            try {
              const rules = sheet.cssRules || sheet.rules;
              for (const rule of rules) {
                if (rule.style) {
                  for (let i = 0; i < rule.style.length; i++) {
                    const prop = rule.style[i];
                    const val = rule.style.getPropertyValue(prop);
                    extractFromStyle({ [prop]: val });
                  }
                }
              }
            } catch (e) {}
          }
        } catch (e) {}

        // 3. Scan for CSS variables
        const rootStyle = window.getComputedStyle(document.documentElement);
        for (let i = 0; i < rootStyle.length; i++) {
          const prop = rootStyle[i];
          if (prop.startsWith('--')) {
            const val = rootStyle.getPropertyValue(prop).trim();
            const hex = rgbToHex(val);
            if (hex) {
              colorCounts[hex] = (colorCounts[hex] || 0) + 10;
            } else if (val.startsWith('#')) {
              let normalized = val.toUpperCase();
              if (normalized.length === 4) {
                normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3];
              }
              if (normalized.length === 9) normalized = normalized.slice(0, 7);
              colorCounts[normalized] = (colorCounts[normalized] || 0) + 10;
            }
          }
        }

        return Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([hex, count]) => ({ hex, count }));
      });

      return {
        title,
        hostname,
        origin,
        pages: Array.from(pages),
        features,
        colors,
        visualAssets: allVisualAssets
      };
    });

    send('complete', { metadata: result });
    res.end();
  } catch (error) {
    send('error', { message: error.message });
    res.end();
  }
});

app.post('/api/fetch-page', async (req, res) => {
  const { url } = req.body;
  try {
    const html = await withPage(async (page) => {
      // IntersectionObserver override
      await page.addInitScript(() => {
        window.IntersectionObserver = class {
          constructor(cb) { this._cb = cb; }
          observe(el) {
            this._cb([{ isIntersecting: true, intersectionRatio: 1, target: el }], this);
          }
          unobserve() {}
          disconnect() {}
        };
      });

      try {
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      } catch (e) {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      }
      
      await page.waitForTimeout(1500);

      // Scroll pass
      await page.evaluate(async () => {
        await new Promise(resolve => {
          let pos = 0;
          const step = () => {
            pos += 120;
            window.scrollTo(0, pos);
            if (pos < document.body.scrollHeight) requestAnimationFrame(step);
            else resolve();
          };
          requestAnimationFrame(step);
        });
      });

      await page.waitForTimeout(1000);

      // Preload lazy assets
      await page.evaluate(() => {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
          img.loading = 'eager';
          if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
        });
        document.querySelectorAll('video').forEach(v => v.preload = 'auto');
      });

      await page.evaluate(() => window.scrollTo(0, 0));
      try {
        await page.waitForLoadState('networkidle', { timeout: 5000 });
      } catch (e) {
        // Ignore timeout, proceed with what we have
      }
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500);

      // DOM Cleanup
      await page.evaluate(() => {
        document.querySelectorAll('[style]').forEach(el => {
          const style = el.getAttribute('style') || '';
          const cleaned = style
            .replace(/\bwill-change\s*:[^;]+;?/gi, '')
            .replace(/\btransform\s*:\s*(none|matrix[^;]*);?/gi, '')
            .replace(/\bopacity\s*:\s*0\s*;?/gi, '')
            .replace(/\bvisibility\s*:\s*hidden\s*;?/gi, '')
            .trim().replace(/;$/, '');
          if (cleaned) el.setAttribute('style', cleaned);
          else el.removeAttribute('style');
        });

        document.querySelectorAll('.w--current').forEach(el => el.classList.remove('w--current'));
        document.querySelectorAll('.w-active, .w--tab-active, .w-slider-dot-w-active').forEach(el => {
          ['w-active','w--tab-active','w-slider-dot-w-active'].forEach(c => el.classList.remove(c));
        });

        document.querySelectorAll('.w-webflow-badge, [href*="webflow.com?utm_campaign"]').forEach(el => el.remove());

        document.querySelectorAll('script').forEach(s => {
          if (s.src && s.src.includes('webflow.com/js/webflow')) s.remove();
        });
      });

      return await page.content();
    });

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/fetch-asset', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': new URL(url).origin + '/',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 10000
    });

    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/get-preview-text', async (req, res) => {
  const { previewId } = req.body;
  if (!previewId) return res.status(400).json({ error: 'Missing previewId' });

  try {
    const previewPath = path.join(PREVIEWS_DIR, previewId);
    if (!fs.existsSync(previewPath)) throw new Error('Preview not found');

    const files = fs.readdirSync(previewPath).filter(f => f.endsWith('.html'));
    const allTextData = [];

    for (const file of files) {
      const filePath = path.join(previewPath, file);
      const html = fs.readFileSync(filePath, 'utf8');
      
      const textMatches = [...html.matchAll(/>([^<]{2,})</g)].map(m => ({ text: m[1].trim(), type: 'tag' }));
      const altMatches = [...html.matchAll(/alt=["']([^"']{2,})["']/g)].map(m => ({ text: m[1].trim(), type: 'alt' }));
      const ariaMatches = [...html.matchAll(/aria-label=["']([^"']{2,})["']/g)].map(m => ({ text: m[1].trim(), type: 'aria' }));
      const titleMatches = [...html.matchAll(/title=["']([^"']{2,})["']/g)].map(m => ({ text: m[1].trim(), type: 'title' }));

      const allMatches = [...textMatches, ...altMatches, ...ariaMatches, ...titleMatches]
        .filter(m => m.text.length > 0);
      
      if (allMatches.length > 0) {
        allTextData.push({ 
          file, 
          originalTexts: allMatches.map(m => m.text),
          metadata: allMatches.map(m => m.type)
        });
      }
    }

    res.json({ textData: allTextData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/update-preview-text', async (req, res) => {
  const { previewId, updates } = req.body;
  if (!previewId || !updates) return res.status(400).json({ error: 'Missing parameters' });

  try {
    const previewPath = path.join(PREVIEWS_DIR, previewId);
    if (!fs.existsSync(previewPath)) throw new Error('Preview not found');

    for (const update of updates) {
      const { file, originalTexts, rewrittenTexts, metadata } = update;
      const filePath = path.join(previewPath, file);
      if (!fs.existsSync(filePath)) continue;

      let html = fs.readFileSync(filePath, 'utf8');
      for (let i = 0; i < originalTexts.length; i++) {
        const original = originalTexts[i];
        const replacement = rewrittenTexts[i] || original;
        const type = metadata ? metadata[i] : 'tag';

        if (type === 'tag') {
          html = html.replace(`>${original}<`, `>${replacement}<`);
        } else if (type === 'alt') {
          html = html.replace(`alt="${original}"`, `alt="${replacement}"`);
          html = html.replace(`alt='${original}'`, `alt='${replacement}'`);
        } else if (type === 'aria') {
          html = html.replace(`aria-label="${original}"`, `aria-label="${replacement}"`);
          html = html.replace(`aria-label='${original}'`, `aria-label='${replacement}'`);
        } else if (type === 'title') {
          html = html.replace(`title="${original}"`, `title="${replacement}"`);
          html = html.replace(`title='${original}'`, `title='${replacement}'`);
        }
      }
      fs.writeFileSync(filePath, html);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clone-site', async (req, res) => {
  const { url, pages: targetPages, colorSwaps, assetSwaps } = req.body;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (type, data) => {
    res.write(`data: ${JSON.stringify({ type, ...data })}\n\n`);
  };

  try {
    send('status', { message: 'Initializing clone engine...' });
    const assets = new Map(); // url -> localPath
    const pageContents = new Map(); // url -> html
    const origin = new URL(url).origin;

    const previewId = crypto.randomUUID();
    const previewPath = path.join(PREVIEWS_DIR, previewId);
    fs.mkdirSync(previewPath, { recursive: true });

    const pagesToClone = targetPages || [url];
    const totalPages = pagesToClone.length;

    for (let i = 0; i < totalPages; i++) {
      const pageUrl = pagesToClone[i];
      send('status', { message: `Cloning page ${i + 1}/${totalPages}: ${pageUrl}` });
      
      const html = await withPage(async (page) => {
        const discoveredOnPage = new Set();
        page.on('request', request => {
          const u = request.url();
          const type = request.resourceType();
          if (['stylesheet','script','image','font','media','other'].includes(type)) {
            if (!u.startsWith('data:') && !u.startsWith('blob:') && !isThirdPartyEmbed(u)) {
              discoveredOnPage.add(u);
            }
          }
        });

        // Same navigation logic as fetch-page
        await page.addInitScript(() => {
          window.IntersectionObserver = class {
            constructor(cb) { this._cb = cb; }
            observe(el) { this._cb([{ isIntersecting: true, intersectionRatio: 1, target: el }], this); }
            unobserve() {}
            disconnect() {}
          };
        });

        try {
          await page.goto(pageUrl, { waitUntil: 'load', timeout: 30000 });
        } catch (e) {
          await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        }
        
        await page.waitForTimeout(1000);
        
        // Scroll pass
        await page.evaluate(async () => {
          await new Promise(resolve => {
            let pos = 0;
            const step = () => {
              pos += 150;
              window.scrollTo(0, pos);
              if (pos < document.body.scrollHeight) requestAnimationFrame(step);
              else resolve();
            };
            requestAnimationFrame(step);
          });
        });

        await page.evaluate(() => window.scrollTo(0, 0));
        try {
          await page.waitForLoadState('networkidle', { timeout: 5000 });
        } catch (e) {
          // Ignore timeout
        }
        await page.evaluate(() => document.fonts.ready);
        
        // Apply Asset Swaps
        if (assetSwaps && assetSwaps.length > 0) {
          await page.evaluate((swaps) => {
            const elements = document.querySelectorAll('*');
            
            swaps.forEach(swap => {
              // 1. Try to find by original source/content (robust for multi-page)
              let targets = [];
              if (swap.type === 'svg' && swap.originalContent) {
                targets = Array.from(document.querySelectorAll('svg')).filter(svg => svg.outerHTML === swap.originalContent);
              } else if (swap.originalSrc) {
                if (swap.type === 'image') {
                  targets = Array.from(document.querySelectorAll('img')).filter(img => img.src === swap.originalSrc);
                } else if (swap.type === 'video') {
                  targets = Array.from(document.querySelectorAll('video')).filter(v => {
                    const vSrc = v.src || (v.querySelector('source') ? v.querySelector('source').src : '');
                    return vSrc === swap.originalSrc;
                  });
                } else if (swap.type === 'background') {
                  targets = Array.from(document.querySelectorAll('*')).filter(el => {
                    const bg = window.getComputedStyle(el).backgroundImage;
                    return bg.includes(swap.originalSrc);
                  });
                }
              }

              // 2. Fallback to index if no targets found (only works for home page)
              if (targets.length === 0 && elements[swap.index]) {
                targets = [elements[swap.index]];
              }

              // 3. Apply the swap to all targets
              targets.forEach(el => {
                if (swap.type === 'image' && el.tagName === 'IMG') {
                  el.src = swap.newSrc;
                  if (el.hasAttribute('srcset')) el.removeAttribute('srcset');
                  if (el.hasAttribute('sizes')) el.removeAttribute('sizes');
                  el.style.objectFit = 'cover';
                } else if (swap.type === 'video' && el.tagName === 'VIDEO') {
                  el.src = swap.newSrc;
                  const source = el.querySelector('source');
                  if (source) source.src = swap.newSrc;
                  el.load();
                } else if (swap.type === 'background') {
                  el.style.backgroundImage = `url(${swap.newSrc})`;
                  el.style.backgroundSize = 'cover';
                  el.style.backgroundPosition = 'center';
                } else if (swap.type === 'svg') {
                  el.outerHTML = swap.newSrc;
                }
              });
            });
          }, assetSwaps);
        }

        // Cleanup
        await page.evaluate(() => {
          document.querySelectorAll('.w-webflow-badge, [href*="webflow.com?utm_campaign"]').forEach(el => el.remove());
        });

        const content = await page.content();
        discoveredOnPage.forEach(assetUrl => {
          if (!assets.has(assetUrl)) {
            const filename = getAssetFilename(assetUrl);
            let subfolder = 'images';
            if (assetUrl.endsWith('.css')) subfolder = 'css';
            else if (assetUrl.endsWith('.js')) subfolder = 'js';
            else if (assetUrl.match(/\.(woff2|woff|ttf|eot)$/)) subfolder = 'fonts';
            else if (assetUrl.match(/\.(mp4|webm|ogg)$/)) subfolder = 'video';
            else if (assetUrl.endsWith('.json')) subfolder = 'json';

            assets.set(assetUrl, `assets/${subfolder}/${filename}`);
          }
        });

        return content;
      });

      pageContents.set(pageUrl, html);
      send('progress', { current: i + 1, total: totalPages, page: pageUrl });
    }

    const getColorVariants = (hex) => {
      const variants = new Set();
      const h = hex.toUpperCase();
      variants.add(h);
      variants.add(h.toLowerCase());
      
      // Shorthand hex
      if (h.length === 7 && h[1] === h[2] && h[3] === h[4] && h[5] === h[6]) {
        const short = '#' + h[1] + h[3] + h[5];
        variants.add(short);
        variants.add(short.toLowerCase());
      }
      
      // RGB/RGBA
      const r = parseInt(h.slice(1, 3), 16);
      const g = parseInt(h.slice(3, 5), 16);
      const b = parseInt(h.slice(5, 7), 16);
      
      variants.add(`rgb(${r}, ${g}, ${b})`);
      variants.add(`rgb(${r},${g},${b})`);
      variants.add(`rgba(${r}, ${g}, ${b}, 1)`);
      variants.add(`rgba(${r},${g},${b},1)`);
      variants.add(`rgba(${r}, ${g}, ${b}, 1.0)`);
      variants.add(`rgba(${r},${g},${b},1.0)`);
      
      return Array.from(variants);
    };

    const applyColorSwaps = (text) => {
      if (!colorSwaps || Object.keys(colorSwaps).length === 0) return text;
      let newText = text;
      for (const [oldColor, newColor] of Object.entries(colorSwaps)) {
        if (oldColor.toLowerCase() !== newColor.toLowerCase()) {
          const variants = getColorVariants(oldColor);
          variants.forEach(variant => {
            // Escape special characters for regex
            const escaped = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escaped, 'gi');
            newText = newText.replace(regex, newColor);
          });
        }
      }
      return newText;
    };

    // Download Assets
    send('status', { message: `Downloading ${assets.size} assets...` });
    
    // Convert to array so we can process dynamically added assets
    const assetUrls = Array.from(assets.keys());
    let downloadedCount = 0;
    let failedCount = 0;

    const downloadAsset = async (assetUrl) => {
      if (isThirdPartyEmbed(assetUrl)) {
        downloadedCount++;
        return;
      }
      
      try {
        const response = await axios.get(assetUrl, {
          responseType: 'arraybuffer',
          headers: { 
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Referer': new URL(assetUrl).origin + '/',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9'
          },
          timeout: 15000
        });
        
        const localPath = assets.get(assetUrl);
        let data = response.data;

        // CSS Recursion
        if (assetUrl.endsWith('.css')) {
          let cssText = data.toString('utf8');

          // Color replacement in CSS
          cssText = applyColorSwaps(cssText);

          const nestedUrls = extractCssUrls(cssText, assetUrl);
          for (const { original, fullUrl } of nestedUrls) {
            if (!isThirdPartyEmbed(fullUrl)) {
              const nFilename = getAssetFilename(fullUrl);
              let nFolder = 'images';
              if (fullUrl.match(/\.(woff2|woff|ttf|eot)$/)) nFolder = 'fonts';
              const nPath = `assets/${nFolder}/${nFilename}`;
              
              if (!assets.has(fullUrl)) {
                assets.set(fullUrl, nPath);
                // Add to queue for download
                assetUrls.push(fullUrl);
              }
              
              // Replace URL in CSS text
              // Need to handle relative paths from css file to assets folder
              // CSS is in assets/css/file.css, so relative path to assets/images/img.png is ../images/img.png
              const relativePath = '../' + nFolder + '/' + nFilename;
              cssText = cssText.split(original).join(relativePath);
            }
          }
          
          data = Buffer.from(cssText, 'utf8');
        }

        // Save to preview folder
        const fullLocalPath = path.join(previewPath, localPath);
        fs.mkdirSync(path.dirname(fullLocalPath), { recursive: true });
        fs.writeFileSync(fullLocalPath, data);

        downloadedCount++;
        send('status', { message: `Downloaded ${downloadedCount}/${assets.size} assets` });
      } catch (e) {
        console.error(`Failed to download ${assetUrl}: ${e.message}`);
        failedCount++;
        downloadedCount++; // Increment anyway so we don't get stuck
        send('status', { message: `Downloaded ${downloadedCount}/${assets.size} assets (${failedCount} failed)` });
      }
    };

    // Concurrency pool (6)
    const pool = new Set();
    // Use a while loop because assetUrls can grow during processing
    let i = 0;
    while (i < assetUrls.length) {
      if (pool.size >= 6) {
        await Promise.race(pool);
      }
      const assetUrl = assetUrls[i];
      const p = downloadAsset(assetUrl).then(() => {
        pool.delete(p);
      });
      pool.add(p);
      i++;
    }
    await Promise.all(pool);

    // Rewrite HTML and Add to ZIP
    send('status', { message: 'Finalizing HTML and ZIP...' });
    const sortedAssets = Array.from(assets.entries()).sort((a, b) => b[0].length - a[0].length);

    for (const [pageUrl, html] of pageContents.entries()) {
      let rewrittenHtml = html;
      
      // Color replacement in HTML
      rewrittenHtml = applyColorSwaps(rewrittenHtml);

      // Asset replacement
      for (const [remoteUrl, localPath] of sortedAssets) {
        rewrittenHtml = rewrittenHtml.split(remoteUrl).join(localPath);
      }

      // Internal link replacement
      pagesToClone.forEach(pUrl => {
        const pPath = new URL(pUrl).pathname;
        const localName = pageUrlToFilename(pPath);
        rewrittenHtml = rewrittenHtml.split(pUrl).join(localName);
        if (pPath !== '/') {
          rewrittenHtml = rewrittenHtml.split(`href="${pPath}"`).join(`href="${localName}"`);
        }
      });

      // Form Stub Replacement
      rewrittenHtml = rewrittenHtml.replace(
        /<div class="w-form">([\s\S]*?)<\/div>/g,
        (match) => {
          return match.replace(
            /<form([^>]*)>([\s\S]*?)<\/form>/,
            `<form$1 onsubmit="event.preventDefault();this.style.display='none';this.nextElementSibling.style.display='block'">$2</form>`
          );
        }
      );

      // IX2 Script decoding
      rewrittenHtml = rewrittenHtml.replace(
        /(<script[^>]+data-wf-page[^>]*>)([\s\S]*?)(<\/script>)/g,
        (match, open, content, close) => open + content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') + close
      );

      const filename = pageUrlToFilename(new URL(pageUrl).pathname);
      fs.writeFileSync(path.join(previewPath, filename), rewrittenHtml);
    }

    // Add serve.js
    fs.writeFileSync(path.join(previewPath, 'serve.js'), `
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm'
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath);
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end('Not found'); return;
  }
  
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(\`Clone server: http://localhost:\${PORT}\`);
});
    `);

    // Add package.json
    fs.writeFileSync(path.join(previewPath, 'package.json'), JSON.stringify({
      name: "cloned-site",
      version: "1.0.0",
      description: "Cloned site",
      scripts: {
        "start": "node serve.js"
      }
    }, null, 2));

    // Add README.md
    fs.writeFileSync(path.join(previewPath, 'README.md'), `# Cloned Site

To run this site locally:

1. Install Node.js if you haven't already.
2. Open a terminal in this directory.
3. Run \`npm start\` or \`node serve.js\`.
4. Open your browser to http://localhost:3000
`);

    send('complete', { previewId });

  } catch (error) {
    send('error', { message: error.message });
  } finally {
    res.end();
  }
});

app.post('/api/save-page', (req, res) => {
  const { previewId, filePath, html } = req.body;
  if (!previewId || !filePath || !html) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const previewPath = path.join(PREVIEWS_DIR, previewId);
    const fullFilePath = path.join(previewPath, filePath);
    if (!fs.existsSync(fullFilePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.writeFileSync(fullFilePath, html);
    res.json({ success: true });
  } catch (error) {
    console.error('Save page error:', error.message || error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/list-preview-files', (req, res) => {
  const { previewId } = req.query;
  if (!previewId) return res.status(400).send('Missing previewId');

  const previewPath = path.join(PREVIEWS_DIR, previewId);
  if (!fs.existsSync(previewPath)) return res.status(404).send('Preview not found');

  const files = [];
  const walk = (dir, relativePath = '') => {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const relPath = path.join(relativePath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath, relPath);
      } else {
        files.push(relPath);
      }
    });
  };

  try {
    walk(previewPath);
    res.json({ files });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/edit-element', async (req, res) => {
  const { previewId, filePath, elementHtml, selector, prompt, isGlobal } = req.body;
  if (!previewId || !filePath || !elementHtml || !prompt) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const previewPath = path.join(PREVIEWS_DIR, previewId);
    const fullFilePath = path.join(previewPath, filePath);
    if (!fs.existsSync(fullFilePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const systemInstruction = `You are an expert frontend developer. The user wants to edit a specific HTML element from a cloned website (often Webflow).
Your task is to apply the user's natural language edit to the provided HTML element.

CRITICAL CONSTRAINTS:
1. ALWAYS MAKE THE CHANGE: You MUST attempt to fulfill the user's request. Never return the original HTML unmodified unless the user explicitly asks you to do nothing. If the request is complex, do your best to implement it.
2. NON-DESTRUCTIVE EDITS (Default): Retain the element's original CSS class string (class="...") and any data-wf-* or interaction-binding attributes unless a complete semantic rewrite is requested.
3. SEMANTIC REWRITES: If the user asks for a structural change, a new layout, or a completely different component design, you MAY rewrite the HTML structure entirely to fulfill the request. Use inline styles or Tailwind classes to wire it back together so it looks good.
4. IMAGE GENERATION: If the user asks to replace images or add new ones to match a design, you MUST use placeholder image services like \`https://picsum.photos/seed/[keyword]/[width]/[height]\` or \`https://image.pollinations.ai/prompt/[prompt-with-hyphens]\` to generate appropriate images.
5. TEXT CHANGES: If the user asks to change text, update the inner text content accordingly.
6. Ensure the updated HTML is valid.

You must return a JSON object with the following structure:
{
  "updatedHtml": "The complete, updated HTML string for the element"
}`;

    console.log('API_KEY:', process.env.API_KEY ? 'exists' : 'missing');
    console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'exists' : 'missing');
    
    if (!process.env.API_KEY && !process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'No API key found' });
    }
    
    // Test which one is valid
    return res.status(500).json({ 
      error: 'Testing keys', 
      envKeys: Object.keys(process.env).filter(k => k.includes('API')),
      geminiKey: process.env.GEMINI_API_KEY,
      nextPublicKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      apiKey: process.env.API_KEY
    });
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Original HTML Element:\n${elementHtml}\n\nUser Request: ${prompt}`,
      config: {
        systemInstruction,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            updatedHtml: { type: Type.STRING }
          },
          required: ["updatedHtml"]
        }
      }
    });

    console.log('AI Response Text:', response.text);

    let responseText = response.text.trim();
    if (responseText.startsWith('```')) {
      responseText = responseText.replace(/^```(?:json)?\n/, '').replace(/\n```$/, '').trim();
    }
    const result = JSON.parse(responseText);
    let updatedHtml = result.updatedHtml;
    
    // Sometimes the AI wraps the HTML string itself in markdown backticks inside the JSON
    if (typeof updatedHtml === 'string') {
      updatedHtml = updatedHtml.trim();
      if (updatedHtml.startsWith('```')) {
        updatedHtml = updatedHtml.replace(/^```(?:html)?\n?/, '').replace(/\n?```$/, '').trim();
      }
    }
    
    const applyGlobally = isGlobal; // Only use user override

    console.log('Parsed updatedHtml length:', updatedHtml.length);

    // Apply the update to the file
    let fileContent = fs.readFileSync(fullFilePath, 'utf8');
    
    if (applyGlobally) {
      // If global, replace all occurrences of the original HTML in all HTML files
      const files = fs.readdirSync(previewPath).filter(f => f.endsWith('.html'));
      for (const file of files) {
        const p = path.join(previewPath, file);
        let content = fs.readFileSync(p, 'utf8');
        
        if (selector) {
          const $ = cheerio.load(content, { decodeEntities: false });
          const el = $(selector);
          if (el.length > 0) {
            el.replaceWith(updatedHtml);
            content = $.html();
            console.log('Global replace via selector succeeded in', file);
          } else {
            content = content.split(elementHtml).join(updatedHtml);
            console.log('Global replace via string split succeeded in', file);
          }
        } else {
          content = content.split(elementHtml).join(updatedHtml);
        }
        fs.writeFileSync(p, content);
      }
    } else {
      // Local replacement using Cheerio and selector
      if (selector) {
        const $ = cheerio.load(fileContent, { decodeEntities: false });
        const el = $(selector);
        if (el.length > 0) {
          el.replaceWith(updatedHtml);
          fileContent = $.html();
          console.log('Local replace via selector succeeded');
        } else {
          // Fallback to string replacement if selector fails
          fileContent = fileContent.replace(elementHtml, updatedHtml);
          console.log('Local replace via string replace fallback');
        }
      } else {
        fileContent = fileContent.replace(elementHtml, updatedHtml);
        console.log('Local replace via string replace (no selector)');
      }
      fs.writeFileSync(fullFilePath, fileContent);
    }

    res.json({ success: true, updatedHtml, isGlobal: applyGlobally });
  } catch (error) {
    console.error('Edit element error:', error.message || error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/download-site', async (req, res) => {
  const { previewId, filename: customFilename } = req.query;
  if (!previewId) return res.status(400).send('Missing previewId');

  const previewPath = path.join(PREVIEWS_DIR, previewId);
  if (!fs.existsSync(previewPath)) return res.status(404).send('Preview not found');

  const tmpZip = path.join(os.tmpdir(), `boonk-${previewId}-${Date.now()}.zip`);

  try {
    const filename = customFilename || `clone-${previewId}.zip`;
    const folderName = filename.replace(/\.zip$/i, '');

    // --- Strategy 1: system zip (most reliable, no npm deps) ---
    let usedSystemZip = false;
    try {
      // cd into the parent of the preview dir so paths inside the zip are clean
      // zip -r /tmp/out.zip previewId/ creates folderName/... entries
      const parentDir = path.dirname(previewPath);
      const dirName = path.basename(previewPath);
      await execFileAsync('zip', ['-r', tmpZip, dirName], { cwd: parentDir });
      usedSystemZip = true;
      console.log('Used system zip');
    } catch (zipErr) {
      console.warn('System zip failed, falling back to archiver:', zipErr.message);
    }

    // --- Strategy 2: archiver written to temp file (fallback) ---
    if (!usedSystemZip) {
      await new Promise((resolve, reject) => {
        const output = fs.createWriteStream(tmpZip);
        const archive = archiver('zip', { zlib: { level: 6 } });
        output.on('close', resolve);
        archive.on('error', reject);
        archive.pipe(output);
        archive.directory(previewPath, folderName);
        archive.finalize();
      });
      console.log('Used archiver fallback');
    }

    // Serve the completed zip file — res.download sets Content-Length & Content-Type correctly
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.download(tmpZip, filename, (err) => {
      // Clean up temp file whether or not there was an error
      fs.unlink(tmpZip, () => {});
      if (err && !res.headersSent) {
        console.error('res.download error:', err.message);
        res.status(500).send('Failed to send zip');
      }
    });

  } catch (error) {
    console.error('Download error:', error.message || error);
    fs.unlink(tmpZip, () => {});
    if (!res.headersSent) {
      res.status(500).send('Failed to generate zip');
    }
  }
});

async function startServer() {
  // Serve previews
  app.use('/previews', express.static(PREVIEWS_DIR));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Boonk server running on http://localhost:${PORT}`);
  });
}

startServer();