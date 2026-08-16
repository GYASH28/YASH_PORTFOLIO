import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const outDir = 'qa-artifacts';
fs.mkdirSync(outDir,{recursive:true});

const viewports = [
  {name:'desktop-1440', width:1440, height:900},
  {name:'laptop-1366', width:1366, height:768},
  {name:'tablet-768', width:768, height:1024},
  {name:'mobile-390', width:390, height:844},
  {name:'mobile-360', width:360, height:800},
];

const failures=[];
const warnings=[];
const metrics=[];

function fail(scope,msg,extra={}){failures.push({scope,msg,...extra});}
function warn(scope,msg,extra={}){warnings.push({scope,msg,...extra});}

async function dismissIntro(page){
  const skip=page.locator('#introSkip');
  if(await skip.count()){
    try{ if(await skip.isVisible({timeout:800})) await skip.click(); }catch{}
  }
  await page.waitForTimeout(250);
}

async function basicAudit(page, scope){
  const dims=await page.evaluate(()=>({
    scrollWidth:document.documentElement.scrollWidth,
    clientWidth:document.documentElement.clientWidth,
    scrollHeight:document.documentElement.scrollHeight,
    title:document.title,
    bodyOverflow:getComputedStyle(document.body).overflowX,
  }));
  if(dims.scrollWidth-dims.clientWidth>2) fail(scope,`horizontal overflow ${dims.scrollWidth-dims.clientWidth}px`,dims);
  if(dims.scrollHeight<1200) fail(scope,'page is suspiciously short',dims);

  const imgs=await page.locator('img').evaluateAll(imgs=>imgs.map((img)=>({
    src:img.getAttribute('src'),
    complete:img.complete,
    naturalWidth:img.naturalWidth,
    naturalHeight:img.naturalHeight,
    rect:img.getBoundingClientRect().toJSON(),
  })));
  for(const img of imgs){
    if(!img.complete||img.naturalWidth===0) fail(scope,'broken image',{src:img.src});
  }

  const duplicateIds=await page.evaluate(()=>{
    const m=new Map();
    for(const el of document.querySelectorAll('[id]')) m.set(el.id,(m.get(el.id)||0)+1);
    return [...m.entries()].filter(([,n])=>n>1);
  });
  if(duplicateIds.length) fail(scope,'duplicate ids',{duplicateIds});

  const emptyButtons=await page.locator('button').evaluateAll(btns=>btns.filter(b=>{
    const label=(b.innerText||b.getAttribute('aria-label')||'').trim();
    return !label;
  }).map(b=>b.outerHTML.slice(0,180)));
  if(emptyButtons.length) fail(scope,'buttons without accessible label',{emptyButtons});

  const tinyTargets=await page.locator('a:visible,button:visible,input:visible').evaluateAll(els=>els.map(el=>{
    const r=el.getBoundingClientRect();
    return {tag:el.tagName,text:(el.innerText||el.getAttribute('aria-label')||'').trim().slice(0,70),w:r.width,h:r.height};
  }).filter(x=>x.w>0&&x.h>0&&(x.w<32||x.h<32)));
  if(tinyTargets.length>8) warn(scope,'many small interaction targets',{count:tinyTargets.length,targets:tinyTargets.slice(0,20)});
}

async function homepageInteractions(page,scope){
  await dismissIntro(page);

  const hero=page.locator('.hero-v8');
  if(!(await hero.isVisible())) fail(scope,'V8 hero not visible');
  else {
    const heroBox=await hero.boundingBox();
    if(heroBox && heroBox.height < Math.min(620, page.viewportSize().height*.72)) warn(scope,'hero feels too short',{heroBox});
  }

  const h1=page.locator('.hero-v8 h1');
  if(!(await h1.isVisible())) fail(scope,'hero headline not visible');

  const canvas=page.locator('#heroField');
  if(await canvas.count()){
    const canvasBox=await canvas.boundingBox();
    if(!canvasBox||canvasBox.width<100||canvasBox.height<100) fail(scope,'hero canvas has invalid size',{canvasBox});
  }

  const plans=page.locator('#plans');
  await plans.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const once=page.locator('.mode[data-mode="once"]');
  if(await once.count()){
    await once.click();
    await page.waitForTimeout(250);
    const visibleOnce=await page.locator('.plan-tab[data-mode="once"]:visible').count();
    if(visibleOnce!==3) fail(scope,'pay-once mode should show 3 plans',{visibleOnce});
  }
  const monthly=page.locator('.mode[data-mode="monthly"]');
  if(await monthly.count()) await monthly.click();

  const work=page.locator('#work');
  await work.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const caseBtns=page.locator('.case-progress button');
  if(await caseBtns.count()!==4) fail(scope,'FakhriMart case study should have 4 stages',{count:await caseBtns.count()});
  else {
    for(let i=0;i<4;i++){
      await caseBtns.nth(i).click();
      await page.waitForTimeout(220);
      const active=await page.locator('.case-shot.active').count();
      if(active!==1) fail(scope,'case study should expose exactly one active screenshot',{stage:i,active});
    }
  }

  const testItem=page.locator('.test-item').first();
  if(await testItem.count()){
    await testItem.click();
    const pressed=await testItem.getAttribute('aria-pressed');
    if(pressed!=='true') fail(scope,'website-test item did not toggle aria-pressed');
  }

  const range=page.locator('#compareRange');
  if(await range.count()){
    await range.evaluate((el)=>{el.value='80';el.dispatchEvent(new Event('input',{bubbles:true}));});
    await page.waitForTimeout(120);
    const pct=(await page.locator('#comparePercent').textContent())?.trim();
    if(pct && !pct.includes('80')) fail(scope,'before/after slider UI did not sync',{pct});
  }

  await page.evaluate(()=>scrollTo(0,0));
  await page.waitForTimeout(100);
}

async function experienceInteractions(page,scope){
  const devices=page.locator('.device-switch .device');
  if(await devices.count()!==4) fail(scope,'Experience page should expose 4 device modes',{count:await devices.count()});
  else {
    for(let i=0;i<3;i++){
      await devices.nth(i).click();
      await page.waitForTimeout(180);
      const stage=await page.locator('#deviceStage').getAttribute('data-device');
      const expected=['desktop','mobile','full'][i];
      if(stage!==expected) fail(scope,'device mode did not update',{expected,stage});
    }
  }

  const features=page.locator('.feature-rail .feature');
  if(await features.count()!==5) fail(scope,'Experience page should expose 5 feature stories',{count:await features.count()});
  else {
    const seen=new Set();
    for(let i=0;i<5;i++){
      await features.nth(i).click();
      await page.waitForTimeout(140);
      const title=(await page.locator('#storyTitle').textContent())?.trim();
      if(!title) fail(scope,'feature story title is empty',{i});
      seen.add(title||'');
    }
    if(seen.size<4) fail(scope,'feature stories are not changing enough',{titles:[...seen]});
  }

  const gallery=page.locator('.capture-card');
  if(await gallery.count()!==4) fail(scope,'capture gallery should expose 4 states',{count:await gallery.count()});
  if(await gallery.count()){
    await gallery.first().click();
    await page.waitForTimeout(120);
    const dlg=page.locator('#captureDialog');
    if(!(await dlg.evaluate(el=>el.open))) fail(scope,'capture lightbox did not open');
    const close=page.locator('#captureDialogClose');
    if(await close.count()) await close.click();
  }
}

async function run(){
  const browser=await chromium.launch({headless:true});
  for(const vp of viewports){
    const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1,colorScheme:'dark'});
    const page=await context.newPage();
    const consoleErrors=[];
    const pageErrors=[];
    page.on('console',m=>{if(m.type()==='error') consoleErrors.push(m.text());});
    page.on('pageerror',e=>pageErrors.push(String(e)));

    for(const route of ['index.html','experience.html']){
      const scope=`${vp.name}/${route}`;
      consoleErrors.length=0; pageErrors.length=0;
      const resp=await page.goto(`${base}/${route}`,{waitUntil:'networkidle',timeout:90000});
      if(!resp||!resp.ok()) fail(scope,'page did not return 2xx',{status:resp?.status()});
      await page.waitForTimeout(600);
      if(route==='index.html') await dismissIntro(page);
      await basicAudit(page,scope);
      if(consoleErrors.length) fail(scope,'console errors',{consoleErrors});
      if(pageErrors.length) fail(scope,'page errors',{pageErrors});
      if(route==='index.html') await homepageInteractions(page,scope); else await experienceInteractions(page,scope);
      await page.screenshot({path:path.join(outDir,`${vp.name}-${route.replace('.html','')}.png`),fullPage:true,animations:'disabled'});
      metrics.push({scope,url:page.url(),title:await page.title(),scrollHeight:await page.evaluate(()=>document.documentElement.scrollHeight)});
    }
    await context.close();
  }

  // reduced-motion smoke
  {
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
    const page=await context.newPage();
    await page.goto(`${base}/index.html`,{waitUntil:'networkidle',timeout:90000});
    await page.waitForTimeout(400);
    await basicAudit(page,'reduced-motion/index');
    await page.screenshot({path:path.join(outDir,'reduced-motion-mobile.png'),fullPage:true,animations:'disabled'});
    await context.close();
  }

  await browser.close();
  const report={generatedAt:new Date().toISOString(),failures,warnings,metrics};
  fs.writeFileSync(path.join(outDir,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(failures.length){
    console.error(`UI audit failed with ${failures.length} failure(s).`);
    process.exit(1);
  }
  console.log(`UI audit passed with ${warnings.length} warning(s).`);
}

run().catch(err=>{console.error(err);process.exit(1);});
