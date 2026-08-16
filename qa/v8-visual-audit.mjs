import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const base=process.env.BASE_URL||'http://127.0.0.1:4173';
const out='qa-visual'; fs.mkdirSync(out,{recursive:true});
const failures=[],warnings=[],observations=[];
const fail=(scope,msg,data={})=>failures.push({scope,msg,...data});
const warn=(scope,msg,data={})=>warnings.push({scope,msg,...data});

async function shot(el,file){try{await el.screenshot({path:path.join(out,file),animations:'disabled',timeout:12000});}catch(e){warn(file,'screenshot failed',{error:String(e)})}}
async function dismiss(page){const s=page.locator('#introSkip');if(await s.count())try{if(await s.isVisible({timeout:500}))await s.click({timeout:1000})}catch{}await page.waitForTimeout(120)}
async function inspectBox(page,scope,sel){const el=page.locator(sel).first();if(!(await el.count())){fail(scope,`missing ${sel}`);return null;}const b=await el.boundingBox();if(!b||b.width<10||b.height<10)fail(scope,`invalid box for ${sel}`,{box:b});return b;}

async function home(page,name){
  await page.goto(`${base}/index.html`,{waitUntil:'domcontentloaded',timeout:30000}); await page.waitForTimeout(400); await dismiss(page);
  const vw=page.viewportSize().width, vh=page.viewportSize().height;
  const dims=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,sh:document.documentElement.scrollHeight}));
  if(dims.sw-dims.cw>2)fail(name,'horizontal overflow',{overflow:dims.sw-dims.cw});
  const hb=await inspectBox(page,name,'.hero-v8'); const h1=await inspectBox(page,name,'.hero-v8 h1');
  if(hb&&hb.height<Math.min(650,vh*.78))warn(name,'hero is visually short',{heroHeight:hb.height,vh});
  if(h1&&(h1.x<0||h1.x+h1.width>vw+2))fail(name,'hero headline clips horizontally',{h1,vw});
  const nav=await inspectBox(page,name,'.nav'); if(nav&&nav.x<0)fail(name,'nav clips left',{nav});
  await shot(page.locator('.hero-v8'),`${name}-hero.png`);
  for(const [sel,key] of [['#plans','plans'],['#work','work'],['#test','test'],['#transform','transform'],['#process','process']]){
    const el=page.locator(sel); if(await el.count()){await el.scrollIntoViewIfNeeded();await page.waitForTimeout(180);await shot(el,`${name}-${key}.png`);}
  }
  const imgs=await page.locator('img').evaluateAll(xs=>xs.map(x=>({src:x.getAttribute('src'),ok:x.complete&&x.naturalWidth>0,w:x.naturalWidth,h:x.naturalHeight})));
  imgs.filter(x=>!x.ok).forEach(x=>fail(name,'broken image',x));
  const plan=page.locator('.plan-stage'); if(await plan.count()){const b=await plan.boundingBox();if(b&&b.width>vw+4)fail(name,'plan stage wider than viewport',{b,vw});}
  const caseBtns=page.locator('.case-progress button'); if(await caseBtns.count()===4){for(let i=0;i<4;i++){const b=caseBtns.nth(i);if(await b.isVisible()){await b.click({timeout:3000});await page.waitForTimeout(80);const a=await page.locator('.case-shot.active').count();if(a!==1)fail(name,'case stage active-state regression',{i,a});}}}
  observations.push({name,page:'home',scrollHeight:dims.sh});
}

async function experience(page,name){
  await page.goto(`${base}/experience.html`,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForTimeout(350);
  const dims=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,sh:document.documentElement.scrollHeight}));
  if(dims.sw-dims.cw>2)fail(name+'/experience','horizontal overflow',{overflow:dims.sw-dims.cw});
  await shot(page.locator('.exp-hero'),`${name}-exp-hero.png`);
  for(const [sel,key] of [['#lab','exp-lab'],['#captures','exp-gallery'],['.experience-story','exp-story'],['.release-proof','exp-proof'],['.experience-final','exp-final']]){
    const el=page.locator(sel).first();if(await el.count()){await el.scrollIntoViewIfNeeded();await page.waitForTimeout(120);await shot(el,`${name}-${key}.png`);}
  }
  const devices=page.locator('.device-switch .device');if(await devices.count()!==4)fail(name+'/experience','expected four preview modes',{count:await devices.count()});
  const features=page.locator('.feature');if(await features.count()!==5)fail(name+'/experience','expected five feature tabs',{count:await features.count()});
  const imgs=await page.locator('img').evaluateAll(xs=>xs.map(x=>({src:x.getAttribute('src'),ok:x.complete&&x.naturalWidth>0,w:x.naturalWidth,h:x.naturalHeight})));
  imgs.filter(x=>!x.ok).forEach(x=>fail(name+'/experience','broken image',x));
  observations.push({name,page:'experience',scrollHeight:dims.sh});
}

const browser=await chromium.launch({headless:true});
for(const v of [{name:'desktop',width:1440,height:900},{name:'tablet',width:768,height:1024},{name:'mobile',width:390,height:844}]){
  const c=await browser.newContext({viewport:{width:v.width,height:v.height},colorScheme:'dark'});const p=await c.newPage();p.setDefaultTimeout(4000);
  const ce=[],pe=[];p.on('console',m=>{if(m.type()==='error')ce.push(m.text())});p.on('pageerror',e=>pe.push(String(e)));
  try{await home(p,v.name);await experience(p,v.name);}catch(e){fail(v.name,'visual audit threw',{error:String(e)});}if(ce.length)fail(v.name,'console errors',{errors:ce});if(pe.length)fail(v.name,'page errors',{errors:pe});await c.close();
}
const c=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await c.newPage();p.setDefaultTimeout(4000);try{await p.goto(`${base}/index.html`,{waitUntil:'domcontentloaded',timeout:30000});await dismiss(p);await shot(p.locator('.hero-v8'),'mobile-reduced-hero.png');}catch(e){fail('reduced','reduced-motion smoke failed',{error:String(e)})}await c.close();await browser.close();
const report={generatedAt:new Date().toISOString(),failures,warnings,observations};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(failures.length)process.exit(1);
