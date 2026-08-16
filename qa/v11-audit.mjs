import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const base=process.env.BASE_URL||'http://127.0.0.1:4173';
await fs.mkdir('qa-v11',{recursive:true});
const browser=await chromium.launch({headless:true});
const failures=[]; const observations=[];
const viewports=[['desktop',1440,900],['tablet',820,1100],['mobile',390,844]];
const fail=(scope,msg,extra={})=>failures.push({scope,msg,...extra});
for(const [name,width,height] of viewports){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,colorScheme:'dark'});
  const page=await context.newPage(); const errors=[];
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  page.on('pageerror',e=>errors.push(e.message));
  const res=await page.goto(base+'/index.html',{waitUntil:'networkidle',timeout:90000});
  if(!res?.ok())fail(name,'index did not return 2xx',{status:res?.status()});
  await page.waitForTimeout(1400);

  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  if(overflow>2)fail(name,'horizontal overflow',{overflow});
  if(!await page.locator('body.v11').count())fail(name,'V11 body class missing');
  if(!await page.locator('.v11-optical-frame').count())fail(name,'optical frame missing');
  if(!await page.locator('.v11-scene-portal').count())fail(name,'scene portals missing');
  const directGhosts=await page.locator('.hero-word > .v11-hero-ghost').count();
  if(directGhosts!==3)fail(name,'hero refraction layers invalid',{directGhosts});

  const canvas=page.locator('#heroField'); const cbox=await canvas.boundingBox(); if(!cbox||cbox.width<100||cbox.height<100)fail(name,'hero canvas invalid',{cbox});
  const planDeck=page.locator('#planDeck'); if(!await planDeck.isVisible())fail(name,'hero plan deck not visible');

  // Make the velocity test deterministic rather than waiting for CSS smooth scrolling.
  await page.mouse.move(width*.2,height*.35); await page.mouse.move(width*.82,height*.65,{steps:8});
  await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,Math.round(innerHeight*.72));});
  await page.waitForTimeout(420);
  const vars=await page.evaluate(()=>{const s=getComputedStyle(document.documentElement);return {velocity:s.getPropertyValue('--v11-velocity').trim(),bend:s.getPropertyValue('--v11-bend').trim(),fold:s.getPropertyValue('--v11-fold').trim(),px:s.getPropertyValue('--v11-pointer-x').trim(),py:s.getPropertyValue('--v11-pointer-y').trim()}});
  observations.push({viewport:name,vars});
  if(Number(vars.fold)<=0.03)fail(name,'hero fold did not respond to scroll',{vars});
  if(Number(vars.px)<=0||Number(vars.py)<=0)fail(name,'pointer camera vars invalid',{vars});
  await page.screenshot({path:`qa-v11/${name}-hero-fold.png`,fullPage:false});

  await page.locator('#manifesto').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'})); await page.waitForTimeout(600);
  const manifestoTransform=await page.locator('.manifesto-lines p').nth(1).evaluate(el=>getComputedStyle(el).transform);
  if(!manifestoTransform||manifestoTransform==='none')fail(name,'manifesto Z-motion missing',{manifestoTransform});
  await page.screenshot({path:`qa-v11/${name}-manifesto-depth.png`,fullPage:false});

  await page.locator('#plans').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'})); await page.waitForTimeout(600);
  const stageTransform=await page.locator('.pricing-stage').evaluate(el=>getComputedStyle(el).transform);
  if(name!=='mobile'&&(!stageTransform||stageTransform==='none'))fail(name,'pricing depth transform missing',{stageTransform});
  const once=page.locator('.pricing-mode [data-mode="once"]'); await once.click({force:true}); await page.waitForTimeout(180);
  const business=page.locator('.plan-index[data-key="business"]'); if(!(await business.isVisible()))fail(name,'business plan hidden after mode switch');
  await business.click({force:true}); await page.waitForTimeout(130);
  const price=await page.locator('#planPrice').textContent(); if(!price?.includes('17,999'))fail(name,'business price did not render',{price});
  await page.screenshot({path:`qa-v11/${name}-plans-depth.png`,fullPage:false});

  await page.locator('#work').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'})); await page.waitForTimeout(800);
  const workBtns=page.locator('.work-index button'); if(await workBtns.count()!==5)fail(name,'work journey does not have 5 stages');
  for(let i=0;i<5;i++){
    await workBtns.nth(i).click({force:true}); await page.waitForTimeout(i===1?1500:750);
    const info=await page.locator('#workImage').evaluate(el=>({complete:el.complete,naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight,src:el.getAttribute('src')}));
    if(!info.complete||!info.naturalWidth||!info.naturalHeight)fail(`${name}/work-${i}`,'work image failed to decode',info);
  }
  const workTransform=await page.locator('#workScreen').evaluate(el=>getComputedStyle(el).transform); if(!workTransform||workTransform==='none')fail(name,'curved client screen transform missing',{workTransform});
  // Capture a visually useful proof state after validating all five states.
  await workBtns.nth(2).click({force:true}); await page.waitForTimeout(900);
  await page.locator('#workScrub').evaluate(el=>{el.value='18';el.dispatchEvent(new Event('input',{bubbles:true}))});
  await page.waitForTimeout(120);
  await page.screenshot({path:`qa-v11/${name}-work-curve.png`,fullPage:false});

  await page.locator('#audit').evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'})); await page.waitForTimeout(800);
  const auditButtons=page.locator('#auditQuestions button');
  await auditButtons.nth(0).evaluate(el=>el.click());
  await auditButtons.nth(1).evaluate(el=>el.click());
  await page.waitForTimeout(100);
  const signal=await page.locator('#auditResult strong').textContent(); if(signal!=='02')fail(name,'website test count incorrect',{signal});

  await page.locator('#transform').evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'})); await page.waitForTimeout(400);
  await page.locator('#compareRange').evaluate(el=>{el.value='70';el.dispatchEvent(new Event('input',{bubbles:true}))});
  const clip=await page.locator('#compareAfter').evaluate(el=>getComputedStyle(el).clipPath); if(!clip.includes('70%'))fail(name,'comparison did not respond',{clip});

  await page.locator('.hud-cta').click({force:true}); await page.waitForTimeout(120);
  if(!(await page.locator('#enquiryDialog').evaluate(el=>el.open)))fail(name,'enquiry dialog did not open');
  await page.locator('#enquiryDialog button[value="cancel"]').click({force:true});
  if(errors.length)fail(name,'browser errors',{errors});
  await context.close();
}

// Reduced-motion contract: immersive deformation must become inert but content remain available.
{
  const context=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'});
  const page=await context.newPage(); await page.goto(base+'/index.html',{waitUntil:'networkidle',timeout:90000}); await page.waitForTimeout(800);
  const opticalDisplay=await page.locator('.v11-optical-frame').evaluate(el=>getComputedStyle(el).display);
  if(opticalDisplay!=='none')fail('reduced-motion','optical frame should be disabled',{opticalDisplay});
  if(!await page.locator('#plans').isVisible())fail('reduced-motion','plans not visible');
  await context.close();
}

await browser.close();
const report={generatedAt:new Date().toISOString(),failures,observations};
await fs.writeFile('qa-v11/report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exit(1);
