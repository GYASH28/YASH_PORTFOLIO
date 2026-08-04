import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const bundleParts = [
  '.source/portfolio-source.gz.b64.part1',
  '.source/portfolio-source.gz.b64.part2',
  '.source/portfolio-source.gz.b64.part3'
];

const encoded = (await Promise.all(bundleParts.map((part) => readFile(part, 'utf8'))))
  .join('')
  .replace(/\s+/g, '');
const source = JSON.parse(gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8'));

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const [path, content] of Object.entries(source)) {
  await writeFile(`dist/${path}`, content);
}

await cp('assets', 'dist/assets', { recursive: true });
console.log(`Built ${Object.keys(source).length} source files and preserved repository assets.`);
