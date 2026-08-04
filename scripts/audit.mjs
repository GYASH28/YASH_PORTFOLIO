import { access, readFile, stat, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = 'dist';
const pages = ['index.html','system.html','404.html'];
const errors = [];
const exists = async (path) => { try { await access(path); return true; } catch { return false; } };

for (const page of pages) {
  const pagePath = `${root}/${page}`;
  const html = await readFile(pagePath, 'utf8');
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(m => m[1]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicates.length) errors.push(`${page}: duplicate IDs ${duplicates.join(', ')}`);
  for (const match of html.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|\/)/.test(ref)) continue;
    if (!(await exists(resolve(dirname(pagePath), ref)))) errors.push(`${page}: missing local reference ${ref}`);
  }
  if (/portfolio-source|DecompressionStream|atob\(|raw\.githubusercontent|cdn\.jsdelivr/.test(html)) errors.push(`${page}: runtime loader or external source dependency detected`);
  if (!/<meta name=["']description["']/.test(html)) errors.push(`${page}: missing description`);
}

const assetFiles = [];
for (const dir of [`${root}/assets/meta`, `${root}/assets/portraits`]) {
  for (const entry of await readdir(dir, { withFileTypes: true })) if (entry.isFile()) assetFiles.push(`${dir}/${entry.name}`);
}
const sourceText = await Promise.all(['index.html','system.html','404.html','styles.css','system.css','app.js','system.js'].map(p => readFile(`${root}/${p}`,'utf8')));
for (const asset of assetFiles) {
  const name = asset.split('/').pop();
  if (!sourceText.some(text => text.includes(name))) errors.push(`${asset}: unused production asset`);
  if ((await stat(asset)).size > 150 * 1024) errors.push(`${asset}: exceeds 150 KiB asset budget`);
}

const coreFiles = ['index.html','styles.css','app.js','system.html','system.css','system.js',...assetFiles.map(p => p.slice(root.length + 1))];
let totalBytes = 0;
for (const file of coreFiles) totalBytes += (await stat(`${root}/${file}`)).size;
if (totalBytes > 900 * 1024) errors.push(`core payload ${totalBytes} bytes exceeds 900 KiB budget`);

const canonicalHost = 'https://yash-ganesh-portfolio-gyash28s-projects.vercel.app';
const robots = await readFile(`${root}/robots.txt`, 'utf8');
const sitemap = await readFile(`${root}/sitemap.xml`, 'utf8');
if (!robots.includes(`${canonicalHost}/sitemap.xml`)) errors.push('robots.txt: stale sitemap URL');
if (!sitemap.includes(`${canonicalHost}/system`) || /system\.html|i8n8xvqp8/.test(sitemap)) errors.push('sitemap.xml: stale production URLs');

const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
if (vercel.outputDirectory !== 'dist' || vercel.buildCommand !== 'npm run build') errors.push('vercel.json: standard build/output settings missing');
if (vercel.rewrites?.some(route => /raw\.githubusercontent|source\/part/.test(JSON.stringify(route)))) errors.push('vercel.json: legacy external source rewrites detected');

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Audit passed: ${pages.length} pages, ${assetFiles.length} used assets, ${totalBytes} byte core payload, normal Vercel build.`);
