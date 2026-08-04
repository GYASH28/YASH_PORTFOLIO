import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { gunzipSync } from 'node:zlib';

const parts = (await readdir('.release')).filter(name => name.startsWith('portfolio-source.gz.b64.part')).sort();
const encoded = (await Promise.all(parts.map(name => readFile(`.release/${name}`, 'utf8')))).join('').replace(/\s+/g, '');
const release = JSON.parse(gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8'));
if (release.version !== 1 || !release.files || typeof release.files !== 'object') throw new Error('Invalid production release package.');

await rm('dist', { recursive: true, force: true });
for (const [path, entry] of Object.entries(release.files)) {
  await mkdir(dirname(`dist/${path}`), { recursive: true });
  await writeFile(`dist/${path}`, entry.data);
}

const portraits = [
  'assets/portraits/yash-real-hero.webp',
  'assets/portraits/yash-real-editorial.webp',
  'assets/portraits/yash-real-builder.webp'
];
for (const asset of portraits) {
  await mkdir(dirname(`dist/${asset}`), { recursive: true });
  await cp(asset, `dist/${asset}`);
}

// Reuse the optimized hero portrait as the social preview so production has no missing binary dependency.
await mkdir('dist/assets/meta', { recursive: true });
await cp('assets/portraits/yash-real-hero.webp', 'dist/assets/meta/portfolio-og.webp');

console.log(`Built ${Object.keys(release.files).length + portraits.length + 1} audited production files into dist/.`);
