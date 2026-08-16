import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const out = 'qa-v9';
fs.mkdirSync(out, { recursive:true });
const failures = [];
const observations = [];
const fail = (scope, msg, extra={}) => failures.push({scope,msg,...extra});

const viewports = [
  {name:'desktop', width:1440, height:900},
  {name:'tablet', width:820, height:1100},
  {name:'mobile', width:390, height:844}
];

const browser = await chromium.launch({ headless:true });
for (const vp of viewports) {
  const page = await browser.newPage({ viewport:{width:vp.width,height:vp.height}, deviceScaleFactor:1 });
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  await page.goto(`${base}/index.html`, { waitUntil:'networkidle' });
  await page.waitForTimeout(800);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 2) fail(vp.name, 'horizontal overflow', {overflow});

  const hero = page.locator('.v9-hero');
  const h1 = page.locator('.v9-hero h1');
  if (!await hero.isVisible()) fail(vp.name, 'hero not visible');
  if (!await h1.isVisible()) fail(vp.name, 'hero headline not visible');
  const heroBox = await h1.boundingBox();
  if (!heroBox || heroBox.height < 80 || heroBox.width < 180) fail(vp.name, 'hero headline has suspicious dimensions', {heroBox});
  const heroImgs = await page.locator('.v9-hero img').count();
  if (heroImgs !== 0) fail(vp.name, 'hero unexpectedly contains image elements', {heroImgs});

  await page.locator('#plans').scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  const once = page.locator('.v9-price-mode [data-mode="once"]');
  await once.click();
  if (!await page.locator('.v9-plan-tab[data-key="business"]').isVisible()) fail(vp.name, 'one-time pricing did not reveal');
  await page.locator('.v9-price-mode [data-mode="monthly"]').click();

  /* Deliberately enter the sticky Lab, instead of stopping at the section heading. */
  await page.locator('.v9-lab-sticky').evaluate(el => el.scrollIntoView({block:'center', inline:'nearest'}));
  await page.waitForTimeout(450);
  const preview = page.locator('#v9Preview');
  if (!await preview.isVisible()) fail(vp.name, 'client screenshot preview not visible');

  const validateImage = async (label) => {
    await preview.evaluate(img => img.decode?.().catch(()=>{}));
    await page.waitForTimeout(160);
    const info = await preview.evaluate(img => {
      const r = img.getBoundingClientRect();
      return {src:img.getAttribute('src'), naturalWidth:img.naturalWidth, naturalHeight:img.naturalHeight, width:r.width, height:r.height, opacity:getComputedStyle(img).opacity};
    });
    if (info.naturalWidth < 300 || info.naturalHeight < 300) fail(`${vp.name}/${label}`, 'client image did not decode to a real screenshot', info);
    if (+info.opacity < .8) fail(`${vp.name}/${label}`, 'client image remained faded after swap', info);
    if (info.naturalWidth && info.naturalHeight && info.width && info.height) {
      const natural = info.naturalWidth / info.naturalHeight;
      const rendered = info.width / info.height;
      if (Math.abs(natural - rendered) > .035) fail(`${vp.name}/${label}`, 'screenshot aspect ratio distorted', {natural,rendered,...info});
    }
    return info;
  };

  const buttons = page.locator('.v9-feature-btn');
  const featureCount = await buttons.count();
  for (let i=0;i<featureCount;i++) {
    const btn = buttons.nth(i);
    await btn.evaluate(el => el.scrollIntoView({block:'center', inline:'center'}));
    await page.waitForTimeout(100);
    await btn.click();
    await page.waitForTimeout(350);
    await validateImage(`feature-${i+1}`);
  }

  const deviceButtons = page.locator('.v9-device-controls button');
  await page.locator('.v9-device-controls').evaluate(el => el.scrollIntoView({block:'center', inline:'nearest'}));
  await page.waitForTimeout(100);
  for (const mode of ['desktop','mobile','full']) {
    const label = mode === 'full' ? 'Full page' : mode[0].toUpperCase()+mode.slice(1);
    const btn = deviceButtons.filter({hasText: label});
    await btn.click();
    await page.waitForTimeout(350);
    const info = await validateImage(`device-${mode}`);
    const currentMode = await page.locator('#v9Device').getAttribute('data-mode');
    if (currentMode !== mode) fail(`${vp.name}/device-${mode}`, 'device mode did not apply', {currentMode,src:info.src});
  }

  const scrub = page.locator('#v9Scrub');
  await scrub.fill('60');
  await page.waitForTimeout(100);
  const transform = await preview.evaluate(img => getComputedStyle(img).transform);
  observations.push({viewport:vp.name, scrubTransform:transform});

  const card = page.locator('.v9-shot-card').first();
  await card.scrollIntoViewIfNeeded();
  await card.click();
  if (!await page.locator('#v9ShotDialog').evaluate(d => d.open)) fail(vp.name, 'full-resolution screenshot dialog did not open');
  await page.locator('#v9ShotClose').click();

  await page.locator('#transform').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const range = page.locator('#v9CompareRange');
  await range.fill('72');
  const clip = await page.locator('.v9-compare-after').evaluate(el => getComputedStyle(el).clipPath);
  if (!clip.includes('72%')) fail(vp.name, 'before/after slider did not update', {clip});

  const experienceLinks = await page.locator('a[href*="experience.html"]').count();
  if (experienceLinks) fail(vp.name, 'standalone Experience link still present', {experienceLinks});

  if (errors.length) fail(vp.name, 'browser errors', {errors});

  await page.goto(`${base}/index.html`, {waitUntil:'networkidle'});
  await page.waitForTimeout(650);
  await page.screenshot({path:`${out}/${vp.name}-hero.png`, fullPage:false});
  await page.locator('#plans').scrollIntoViewIfNeeded(); await page.waitForTimeout(250); await page.screenshot({path:`${out}/${vp.name}-plans.png`, fullPage:false});
  await page.locator('.v9-lab-sticky').evaluate(el => el.scrollIntoView({block:'center', inline:'nearest'})); await page.waitForTimeout(400); await page.screenshot({path:`${out}/${vp.name}-work.png`, fullPage:false});
  await page.locator('#transform').scrollIntoViewIfNeeded(); await page.waitForTimeout(250); await page.screenshot({path:`${out}/${vp.name}-transform.png`, fullPage:false});
  await page.close();
}
await browser.close();
const report = {generatedAt:new Date().toISOString(), failures, observations};
fs.writeFileSync(`${out}/report.json`, JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if (failures.length) process.exit(1);
