import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';

const base=process.env.BASE_URL||'http://127.0.0.1:4173';
const failures=[],warnings=[],results=[];
const fail=(scope,msg,data={})=>failures.push({scope,msg,...data});
const warn=(scope,msg,data={})=>warnings.push({scope,msg,...data});

function summarizeAxe(r){
  return r.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.length,targets:v.nodes.slice(0,4).map(n=>n.target)}));
}

async function waitReady(page,route){
  await page.goto(`${base}/${route}`,{waitUntil:'domcontentloaded',timeout:30000});
  if(route==='index.html'){
    const skip=page.locator('#introSkip');
    if(await skip.count())try{if(await skip.isVisible({timeout:500}))await skip.click()}catch{}
  }
  await page.waitForTimeout(1400);
}

async function auditAccessibility(page,route,scope){
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  const serious=axe.violations.filter(v=>['critical','serious'].includes(v.impact));
  const moderate=axe.violations.filter(v=>v.impact==='moderate');
  if(serious.length)fail(scope,'serious accessibility violations',{violations:summarizeAxe({...axe,violations:serious})});
  if(moderate.length)warn(scope,'moderate accessibility violations',{violations:summarizeAxe({...axe,violations:moderate})});

  const structure=await page.evaluate(()=>({
    h1:document.querySelectorAll('h1').length,
    main:document.querySelectorAll('main').length,
    nav:document.querySelectorAll('nav').length,
    dialogs:[...document.querySelectorAll('dialog')].length,
    noAlt:[...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).map(i=>i.src),
  }));
  if(structure.h1!==1)fail(scope,'page should have exactly one H1',structure);
  if(structure.main!==1)fail(scope,'page should have one main landmark',structure);
  if(structure.noAlt.length)fail(scope,'images missing alt attributes',{images:structure.noAlt});
}

async function keyboardSmoke(page,route,scope){
  await page.evaluate(()=>window.scrollTo(0,0));
  const focusTrail=[];
  for(let i=0;i<14;i++){
    await page.keyboard.press('Tab');
    const f=await page.evaluate(()=>{const e=document.activeElement;if(!e)return null;const r=e.getBoundingClientRect();return{tag:e.tagName,id:e.id,cls:e.className,text:(e.textContent||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,70),visible:r.width>0&&r.height>0,outline:getComputedStyle(e).outlineStyle}});
    if(f)focusTrail.push(f);
  }
  if(focusTrail.length<5)fail(scope,'keyboard tab order exposes too few controls',{focusTrail});
  if(focusTrail.some(x=>!x.visible))warn(scope,'keyboard focus reached zero-size control',{focusTrail:focusTrail.filter(x=>!x.visible)});
  const unique=new Set(focusTrail.map(x=>`${x.tag}:${x.id}:${x.text}`));
  if(unique.size<Math.min(7,focusTrail.length))warn(scope,'keyboard focus appears to loop too early',{focusTrail});

  if(route==='index.html'){
    const cta=page.locator('.js-plan').first();
    if(await cta.count()){
      await cta.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(80);
      const dlg=page.locator('#leadDialog');
      const open=await dlg.evaluate(el=>el.open||el.hasAttribute('open'));
      if(!open)fail(scope,'plan CTA does not open enquiry dialog from keyboard');
      else{
        await page.keyboard.press('Escape'); await page.waitForTimeout(50);
        const still=await dlg.evaluate(el=>el.open||el.hasAttribute('open'));
        if(still)fail(scope,'Escape does not close enquiry dialog');
      }
    }
  }else{
    const first=page.locator('.feature').first();
    if(await first.count()){
      await first.focus(); await page.keyboard.press('Enter');
      const pressed=await first.getAttribute('aria-pressed');
      if(pressed!=='true')warn(scope,'feature control does not expose pressed state after keyboard activation',{pressed});
    }
    const card=page.locator('.capture-card').first();
    if(await card.count()){
      await card.focus();await page.keyboard.press('Enter');await page.waitForTimeout(80);
      const dlg=page.locator('#captureDialog');
      if(!(await dlg.evaluate(el=>el.open||el.hasAttribute('open'))))fail(scope,'capture dialog not keyboard operable');
      else{await page.keyboard.press('Escape');}
    }
  }
}

async function performanceAudit(page,route,scope){
  // Touch all lazy sections once so we can record both critical and deferred cost.
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await page.waitForTimeout(600);
  const perf=await page.evaluate(()=>{
    const nav=performance.getEntriesByType('navigation')[0];
    const resources=performance.getEntriesByType('resource').map(r=>({name:r.name,transfer:r.transferSize||0,encoded:r.encodedBodySize||0,duration:r.duration,initiator:r.initiatorType}));
    return{
      domContentLoaded:nav?.domContentLoadedEventEnd||0,
      loadEvent:nav?.loadEventEnd||0,
      responseEnd:nav?.responseEnd||0,
      resourceCount:resources.length,
      transferBytes:resources.reduce((n,r)=>n+r.transfer,0),
      encodedBytes:resources.reduce((n,r)=>n+r.encoded,0),
      largest:resources.sort((a,b)=>b.encoded-a.encoded).slice(0,8)
    };
  });
  const mb=perf.encodedBytes/1024/1024;
  if(mb>14)warn(scope,'very heavy full-page resource footprint',{mb:+mb.toFixed(2),largest:perf.largest});
  if(perf.resourceCount>80)warn(scope,'high resource count',{resourceCount:perf.resourceCount});
  results.push({scope,performance:perf});
}

async function targetAudit(page,scope){
  const small=await page.locator('a:visible,button:visible,input:visible').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,text:(el.textContent||el.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,60),w:Math.round(r.width),h:Math.round(r.height),coarse:getComputedStyle(el).pointerEvents!=='none'}}).filter(x=>x.w>0&&x.h>0&&(x.w<40||x.h<40)));
  if(small.length>8)warn(scope,'many controls have small visual boxes; verify expanded hit areas',{count:small.length,targets:small.slice(0,24)});
}

const browser=await chromium.launch({headless:true});
for(const vp of [{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}]){
  const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},colorScheme:'dark'});
  for(const route of ['index.html','experience.html']){
    const page=await context.newPage();
    const scope=`${vp.name}/${route}`;
    const errors=[];page.on('pageerror',e=>errors.push(String(e)));
    const bad=[];page.on('response',r=>{if(r.status()>=400)bad.push({status:r.status(),url:r.url()})});
    try{
      await waitReady(page,route);
      await auditAccessibility(page,route,scope);
      await keyboardSmoke(page,route,scope);
      await targetAudit(page,scope);
      await performanceAudit(page,route,scope);
    }catch(e){fail(scope,'quality audit threw',{error:String(e)});}
    if(errors.length)fail(scope,'page errors',{errors});
    if(bad.length)fail(scope,'HTTP errors',{bad});
    await page.close();
  }
  await context.close();
}
await browser.close();
fs.mkdirSync('qa-quality',{recursive:true});
const report={generatedAt:new Date().toISOString(),failures,warnings,results};
fs.writeFileSync('qa-quality/report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exit(1);
