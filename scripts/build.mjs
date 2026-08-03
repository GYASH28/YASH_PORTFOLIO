import {cp,mkdir,rm} from 'node:fs/promises';
const out=new URL('../dist/',import.meta.url);
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
for(const f of ['index.html','styles.css','app.js','boot-guard.js','motion-layer.css','motion-layer.js','favicon.svg','robots.txt','sitemap.xml','vercel.json']) await cp(new URL('../'+f,import.meta.url),new URL(f,out));
await cp(new URL('../assets/',import.meta.url),new URL('assets/',out),{recursive:true});
console.log('Static portfolio built with the progressive 3D motion layer.');
