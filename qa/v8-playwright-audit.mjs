import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const outDir = 'qa-artifacts';
fs.mkdirSync(outDir,{recursive:true});
const viewports=[
  {name:'desktop-1440',width:1440,height:900},
  {name:'laptop-1366',width:1366,height:768},
  {name:'tablet-768',width:768,height:1024},
  {name:'mobile-390',width:390,height:844},
  {name:'mobile-360',width:360,height:800},
];
const failures=[],warnings=[],metrics=[];
const fail=(scope,msg,extra={})=>failures.push({scope,msg,...extra});
const warn=(scope,msg,extra={})=>warnings.push({scope,msg,...extra});

async function dismissIntro(page){const skip=page.locator('#introSkip');if(await skip.count())try{if(await skip.isVisible({timeout:700}))await skip.click({timeout:1500})}catch{}await page.waitForTimeout(180)}
async function go(page,selector){const el=page.locator(selector).first();if(await el.count()){await el.scrollIntoViewIfNeeded();await page.waitForTimeout(320);return el}return null}
async function waitVisibleImages(page,root='body'){
  const imgs=page.locator(`${root} img`);const n=await imgs.count();
  for(let i=0;i<n;i++){
    const img=imgs.nth(i);
    const near=await img.evaluate(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>=-250&&r.top<=innerHeight+250}).catch(()=>false);
    if(near) await img.evaluate(el=>{try{el.loading='eager'}catch{}}).catch(()=>{});
  }
  await page.waitForTimeout(180);
}
async function auditLoadedImages(page,scope,root='body'){
  const bad=await page.locator(`${root} img`).evaluateAll(imgs=>imgs.filter(img=>{
    const r=img.getBoundingClientRect();
    const near=r.width>0&&r.height>0&&r.bottom>=-250&&r.top<=innerHeight+250;
    return near&&(!img.complete||img.naturalWidth===0);
  }).map(img=>({src:img.getAttribute('src'),loading:img.loading,top:Math.round(img.getBoundingClientRect().top),height:Math.round(img.getBoundingClientRect().height)})));
  bad.forEach(img=>fail(scope,'near-viewport image failed to load',img));
}

async function basicAudit(page,scope){
  const dims=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,scrollHeight:document.documentElement.scrollHeight,title:document.title}));
  if(dims.scrollWidth-dims.clientWidth>2) fail(scope,`horizontal overflow ${dims.scrollWidth-dims.clientWidth}px`,dims);
  if(dims.scrollHeight<1200) fail(scope,'page is suspiciously short',dims);
  await waitVisibleImages(page);await auditLoadedImages(page,scope);
  const duplicateIds=await page.evaluate(()=>{const m=new Map();for(const el of document.querySelectorAll('[id]'))m.set(el.id,(m.get(el.id)||0)+1);return[...m.entries()].filter(([,n])=>n>1)});if(duplicateIds.length)fail(scope,'duplicate ids',{duplicateIds});
  const emptyButtons=await page.locator('button:visible').evaluateAll(btns=>btns.filter(b=>!(((b.textContent||'').trim())||((b.getAttribute('aria-label')||'').trim()))).map(b=>b.outerHTML.slice(0,180)));if(emptyButtons.length)fail(scope,'visible buttons without accessible label',{emptyButtons});
  const tinyTargets=await page.locator('a:visible,button:visible,input:visible').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{text:((el.textContent||el.getAttribute('aria-label')||'').trim()).slice(0,60),w:r.width,h:r.height}}).filter(x=>x.w>0&&x.h>0&&(x.w<32||x.h<32)));if(tinyTargets.length>8)warn(scope,'many small interaction targets',{count:tinyTargets.length,targets:tinyTargets.slice(0,16)});
}

async function homepageInteractions(page,scope){
  await dismissIntro(page);const hero=page.locator('.hero-v8');if(!(await hero.isVisible()))fail(scope,'V8 hero not visible');const h1=page.locator('.hero-v8 h1');if(!(await h1.isVisible()))fail(scope,'hero headline not visible');const canvas=page.locator('#heroField');if(await canvas.count()){const box=await canvas.boundingBox();if(!box||box.width<100||box.height<100)fail(scope,'hero canvas has invalid size',{box})}
  await go(page,'#plans');const once=page.locator('.mode[data-mode="once"]');if(await once.count()){await once.click();await page.waitForTimeout(180);const count=await page.locator('.plan-tab[data-mode="once"]:visible').count();if(count!==3)fail(scope,'pay-once mode should show 3 plans',{count})}const monthly=page.locator('.mode[data-mode="monthly"]');if(await monthly.count())await monthly.click();
  await go(page,'#work');await waitVisibleImages(page,'#work');await auditLoadedImages(page,scope,'#work');const caseBtns=page.locator('.case-progress button');const caseCount=await caseBtns.count();if(caseCount!==4)fail(scope,'FakhriMart case study should have 4 stages',{count:caseCount});else for(let i=0;i<4;i++){await caseBtns.nth(i).click();await page.waitForTimeout(180);const active=await page.locator('.case-shot.active').count();if(active!==1)fail(scope,'case study should expose exactly one active screenshot',{stage:i,active})}
  await go(page,'#test');const testItem=page.locator('.test-item:visible').first();if(await testItem.count()){await testItem.click();if(await testItem.getAttribute('aria-pressed')!=='true')fail(scope,'website-test item did not toggle')}
  await go(page,'#transform');const range=page.locator('#compareRange');if(await range.count()){await range.evaluate(el=>{el.value='80';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.waitForTimeout(120);const pct=(await page.locator('#comparePercent').textContent())?.trim();if(pct&&!pct.includes('80'))fail(scope,'before/after slider UI did not sync',{pct})}await page.evaluate(()=>scrollTo(0,0));
}

async function experienceInteractions(page,scope){
  await go(page,'#lab');await waitVisibleImages(page,'#lab');await auditLoadedImages(page,scope,'#lab');
  const devices=page.locator('.device-switch .device');const dc=await devices.count();if(dc!==4)fail(scope,'Experience page should expose 4 device modes',{count:dc});else for(let i=0;i<3;i++){await devices.nth(i).click();await page.waitForTimeout(160);const got=await page.locator('#deviceStage').getAttribute('data-device');const expected=['desktop','mobile','full'][i];if(got!==expected)fail(scope,'device mode did not update',{expected,got})}
  const features=page.locator('.feature-rail .feature');const fc=await features.count();if(fc!==5)fail(scope,'Experience page should expose 5 feature stories',{count:fc});else{const seen=new Set();for(let i=0;i<5;i++){await features.nth(i).click();await page.waitForTimeout(130);const title=(await page.locator('#storyTitle').textContent())?.trim()||'';seen.add(title);if(!title)fail(scope,'feature story title is empty',{i})}if(seen.size<4)fail(scope,'feature stories are not changing enough',{titles:[...seen]})}
  await go(page,'#captures');await waitVisibleImages(page,'#captures');await auditLoadedImages(page,scope,'#captures');const gallery=page.locator('.capture-card');const gc=await gallery.count();if(gc!==4)fail(scope,'capture gallery should expose 4 states',{count:gc});if(gc){await gallery.first().click();await page.waitForTimeout(100);const dlg=page.locator('#captureDialog');if(!(await dlg.evaluate(el=>el.open)))fail(scope,'capture lightbox did not open');const close=page.locator('#captureDialogClose');if(await close.count())await close.click()}
}

async function auditRoute(page,vp,route){
  const scope=`${vp.name}/${route}`;const consoleErrors=[],pageErrors=[];const onConsole=m=>{if(m.type()==='error')consoleErrors.push(m.text())};const onPageError=e=>pageErrors.push(String(e));page.on('console',onConsole);page.on('pageerror',onPageError);
  try{const resp=await page.goto(`${base}/${route}`,{waitUntil:'domcontentloaded',timeout:45000});if(!resp||!resp.ok())fail(scope,'page did not return 2xx',{status:resp?.status()});await page.waitForLoadState('networkidle',{timeout:12000}).catch(()=>warn(scope,'network did not become idle within 12s'));await page.waitForTimeout(500);if(route==='index.html')await dismissIntro(page);await basicAudit(page,scope);if(route==='index.html')await homepageInteractions(page,scope);else await experienceInteractions(page,scope)}catch(err){fail(scope,'interaction audit threw',{error:String(err)})}finally{if(consoleErrors.length)fail(scope,'console errors',{consoleErrors});if(pageErrors.length)fail(scope,'page errors',{pageErrors});try{await page.screenshot({path:path.join(outDir,`${vp.name}-${route.replace('.html','')}.png`),fullPage:true,animations:'disabled',timeout:30000})}catch(err){warn(scope,'screenshot failed',{error:String(err)})}try{metrics.push({scope,url:page.url(),title:await page.title(),scrollHeight:await page.evaluate(()=>document.documentElement.scrollHeight)})}catch{}page.off('console',onConsole);page.off('pageerror',onPageError)}
}

async function run(){let browser;try{browser=await chromium.launch({headless:true});for(const vp of viewports){const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1,colorScheme:'dark'});const page=await context.newPage();await auditRoute(page,vp,'index.html');await auditRoute(page,vp,'experience.html');await context.close()}const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const page=await context.newPage();try{await page.goto(`${base}/index.html`,{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(350);await dismissIntro(page);await basicAudit(page,'reduced-motion/index')}catch(err){fail('reduced-motion/index','smoke test threw',{error:String(err)})}try{await page.screenshot({path:path.join(outDir,'reduced-motion-mobile.png'),fullPage:true,animations:'disabled'})}catch{}await context.close()}finally{if(browser)await browser.close().catch(()=>{});const report={generatedAt:new Date().toISOString(),failures,warnings,metrics};fs.writeFileSync(path.join(outDir,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2))}if(failures.length){console.error(`UI audit failed with ${failures.length} failure(s).`);process.exit(1)}console.log(`UI audit passed with ${warnings.length} warning(s).`)}
run().catch(err=>{fail('runner','fatal audit error',{error:String(err)});fs.writeFileSync(path.join(outDir,'report.json'),JSON.stringify({failures,warnings,metrics},null,2));console.error(err);process.exit(1)});
