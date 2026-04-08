import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const [, , url, outDir, label = 'page'] = process.argv;

if (!url || !outDir) {
  console.error('Usage: node capture_research_page.mjs <url> <outDir> [label]');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

function normalizeText(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

async function waitForSettle(page, ms = 9000) {
  await page.goto(url, { waitUntil: 'commit', timeout: 30000 });
  await page.waitForTimeout(ms);
}

async function collectDom(page) {
  return await page.evaluate(() => {
    const normalize = (text) => (text || '').replace(/\s+/g, ' ').trim();
    const attrMap = (el) => {
      const attrs = {};
      for (const attr of Array.from(el.attributes)) {
        if (['id', 'class', 'role'].includes(attr.name) || attr.name.startsWith('data-')) {
          attrs[attr.name] = attr.value;
        }
      }
      return attrs;
    };
    const makeSelector = (el) => {
      if (!el) return null;
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : '';
      const classes = typeof el.className === 'string'
        ? '.' + el.className.trim().split(/\s+/).filter(Boolean).slice(0, 4).join('.')
        : '';
      return `${tag}${id}${classes}`;
    };

    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map((h) => ({
      level: h.tagName.toLowerCase(),
      text: normalize(h.textContent),
      selector: makeSelector(h),
    })).filter((h) => h.text);

    const sectionRoots = Array.from((document.querySelector('main') || document.body).querySelectorAll(':scope > *'));
    const sections = sectionRoots.map((el, index) => {
      const rect = el.getBoundingClientRect();
      const localHeadings = Array.from(el.querySelectorAll('h1, h2, h3')).map((h) => ({
        level: h.tagName.toLowerCase(),
        text: normalize(h.textContent),
      })).filter((h) => h.text);
      const ctas = Array.from(el.querySelectorAll('a, button')).map((node) => ({
        tag: node.tagName.toLowerCase(),
        text: normalize(node.textContent),
        href: node.getAttribute('href'),
      })).filter((cta) => cta.text).slice(0, 12);
      return {
        index,
        tag: el.tagName.toLowerCase(),
        selector: makeSelector(el),
        attrs: attrMap(el),
        rect: {
          top: Math.round(rect.top + window.scrollY),
          height: Math.round(rect.height),
        },
        headings: localHeadings,
        ctas,
        textSample: normalize(el.textContent).slice(0, 320),
      };
    }).filter((section) => section.rect.height > 24 || section.textSample.length > 0);

    return {
      title: document.title,
      url: location.href,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      pageHeight: Math.max(document.documentElement.scrollHeight || 0, document.body ? document.body.scrollHeight : 0),
      headings,
      sections,
    };
  });
}

async function collectStyleProbe(page) {
  return await page.evaluate(async () => {
    await document.fonts.ready;
    const fmt = (style) => style ? {
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderRadius: style.borderRadius,
      textTransform: style.textTransform,
      display: style.display,
      position: style.position,
      gap: style.gap,
      padding: style.padding,
      margin: style.margin,
    } : null;
    const get = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      return {
        selector,
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 180),
        styles: fmt(getComputedStyle(el)),
      };
    };
    return {
      url: location.href,
      title: document.title,
      fonts: Array.from(document.fonts).map((font) => ({
        family: font.family,
        weight: font.weight,
        style: font.style,
        status: font.status,
      })),
      probes: {
        body: get('body'),
        h1: get('h1'),
        h2: get('h2'),
        button: get('a.button, .button, button, [role="button"]'),
        navLink: get('nav a, .nav a, .menu a, header a'),
        section: get('section, [class*="section"], main > div'),
      },
    };
  });
}

async function collectScripts(page) {
  return await page.evaluate(() => Array.from(document.scripts).map((s) => ({
    src: s.src || null,
    type: s.type || null,
    async: s.async,
    defer: s.defer,
    textLength: s.textContent ? s.textContent.length : 0,
  })));
}

async function runViewport(browser, config) {
  const { name, viewport, userAgent, isMobile, deviceScaleFactor, styleFile, fullFile } = config;
  const context = await browser.newContext({
    viewport,
    userAgent,
    isMobile,
    deviceScaleFactor,
    hasTouch: Boolean(isMobile),
  });
  const page = await context.newPage();
  const requests = [];
  page.on('requestfinished', (req) => {
    requests.push({
      url: req.url(),
      resourceType: req.resourceType(),
      method: req.method(),
    });
  });

  await waitForSettle(page);

  const html = await page.evaluate(() => document.documentElement.outerHTML);
  const dom = await collectDom(page);
  const styleProbe = await collectStyleProbe(page);
  const scripts = await collectScripts(page);

  if (name === 'desktop') {
    fs.writeFileSync(path.join(outDir, 'source.html'), html);
    fs.writeFileSync(path.join(outDir, 'dom-desktop.json'), JSON.stringify(dom, null, 2));
    fs.writeFileSync(path.join(outDir, 'scripts.json'), JSON.stringify(scripts, null, 2));
    fs.writeFileSync(path.join(outDir, 'network-requests.json'), JSON.stringify(requests, null, 2));
  }

  fs.writeFileSync(path.join(outDir, styleFile), JSON.stringify(styleProbe, null, 2));
  await page.screenshot({ path: path.join(outDir, fullFile), fullPage: true, type: 'png' });

  const bodyText = await page.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 1500));
  const pageHeight = await page.evaluate(() => Math.max(document.documentElement.scrollHeight || 0, document.body ? document.body.scrollHeight : 0));

  await context.close();
  return { bodyText, pageHeight, scripts };
}

async function downloadScriptSources(scriptEntries) {
  const chunks = [];
  for (const entry of scriptEntries) {
    if (!entry.src) continue;
    try {
      const res = await fetch(entry.src);
      const text = await res.text();
      chunks.push(`\n/* SOURCE: ${entry.src} */\n${text}`);
    } catch (err) {
      chunks.push(`\n/* SOURCE: ${entry.src} */\n/* FETCH ERROR: ${err.message} */\n`);
    }
  }
  fs.writeFileSync(path.join(outDir, 'site.bundle.js'), chunks.join('\n'));
}

const browser = await chromium.launch({ headless: true, channel: 'chrome' });

const desktop = await runViewport(browser, {
  name: 'desktop',
  viewport: { width: 1440, height: 900 },
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
  isMobile: false,
  deviceScaleFactor: 1,
  styleFile: 'style-probe.json',
  fullFile: 'desktop-full.png',
});

const mobile = await runViewport(browser, {
  name: 'mobile',
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  isMobile: true,
  deviceScaleFactor: 3,
  styleFile: 'style-probe-mobile.json',
  fullFile: 'mobile-full.png',
});

await browser.close();
await downloadScriptSources(desktop.scripts);

fs.writeFileSync(path.join(outDir, 'capture-metadata.json'), JSON.stringify({
  label,
  url,
  capturedAt: new Date().toISOString(),
  desktopPageHeight: desktop.pageHeight,
  mobilePageHeight: mobile.pageHeight,
  desktopTextSample: desktop.bodyText,
  mobileTextSample: mobile.bodyText,
}, null, 2));

console.log(JSON.stringify({
  outDir,
  desktopPageHeight: desktop.pageHeight,
  mobilePageHeight: mobile.pageHeight,
}, null, 2));
