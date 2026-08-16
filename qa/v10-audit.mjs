import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const base=process.env.BASE_URL||'http://127.0.0.1:4173';
await fs.mkdir('qa-v10',{recursive:true});
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
  await page.waitForTimeout(1200);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  if(overflow>2)fail(name,'horizontal overflow',{overflow});
  const hero=page.locator('#hero'); if(!await hero.isVisible())fail(name,'hero not visible');
  const canvas=page.locator('#heroField'); const cbox=await canvas.boundingBox(); if(!cbox||cbox.width<100||cbox.height<100)fail(name,'hero canvas has invalid geometry',{cbox});
  const planDeck=page.locator('#planDeck'); if(!await planDeck.isVisible())fail(name,'hero plan deck not visible');
  await page.locator('#heroPlanNext').click(); await page.waitForTimeout(250);
  const activePlan=await page.locator('.hero-plan-active').count(); if(activePlan!==1)fail(name,'hero plan deck active state invalid',{activePlan});
  await page.screenshot({path:`qa-v10/${name}-hero.png`,fullPage:false});

  await page.locator('#manifesto').scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  await page.screenshot({path:`qa-v10/${name}-manifesto.png`,fullPage:false});

  await page.locator('#plans').scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  const once=page.locator('.pricing-mode [data-mode="once"]'); await once.click(); await page.waitForTimeout(200);
  if(!(await once.getAttribute('aria-selected'))?.includes('true'))fail(name,'pricing mode did not switch to one-time');
  const business=page.locator('.plan-index[data-key="business"]'); if(!(await business.isVisible()))fail(name,'business one-time plan not visible');
  await business.click(); await page.waitForTimeout(150);
  const price=await page.locator('#planPrice').textContent(); if(!price?.includes('17,999'))fail(name,'business price did not render',{price});
  await page.screenshot({path:`qa-v10/${name}-plans.png`,fullPage:false});

  await page.locator('#work').scrollIntoViewIfNeeded(); await page.waitForTimeout(700);
  const workBtns=page.locator('.work-index button'); if(await workBtns.count()!==5)fail(name,'work journey does not have 5 stages');
  for(let i=0;i<5;i++){
    await workBtns.nth(i).click({force:true}); await page.waitForTimeout(i===1?1600:800);
    const img=page.locator('#workImage'); const info=await img.evaluate(el=>({complete:el.complete,naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight,src:el.getAttribute('src')}));
    if(!info.complete||!info.naturalWidth||!info.naturalHeight)fail(`${name}/work-${i}`,'work image failed to decode',info);
  }
  await page.locator('#workScrub').evaluate(el=>{el.value='55';el.dispatchEvent(new Event('input',{bubbles:true}))});
  const transform=await page.locator('#workImage').evaluate(el=>getComputedStyle(el).transform); observations.push({viewport:name,workTransform:transform});
  await page.screenshot({path:`qa-v10/${name}-work.png`,fullPage:false});

  await page.locator('#audit').scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
  await page.locator('#auditQuestions button').nth(0).click(); await page.locator('#auditQuestions button').nth(1).click();
  const signal=await page.locator('#auditResult strong').textContent(); if(signal!=='02')fail(name,'website test count incorrect',{signal});

  await page.locator('#transform').scrollIntoViewIfNeeded(); await page.waitForTimeout(350);
  await page.locator('#compareRange').evaluate(el=>{el.value='70';el.dispatchEvent(new Event('input',{bubbles:true}))});
  const clip=await page.locator('#compareAfter').evaluate(el=>getComputedStyle(el).clipPath); if(!clip.includes('70%'))fail(name,'comparison did not respond',{clip});

  await page.locator('.hud-cta').click({force:true}); await page.waitForTimeout(120);
  if(!(await page.locator('#enquiryDialog').evaluate(el=>el.open)))fail(name,'enquiry dialog did not open');
  await page.locator('#enquiryDialog button[value="cancel"]').click();
  if(errors.length)fail(name,'browser errors',{errors});
  await context.close();
}
await browser.close();
const report={generatedAt:new Date().toISOString(),failures,observations}; await fs.writeFile('qa-v10/report.json',JSON.stringify(report,null,2)); console.log(JSON.stringify(report,null,2)); if(failures.length)process.exit(1);