import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const outputs = [
  [['.bundle/index.html.gz.b64'], 'dist/index.html'],
  [[
    '.bundle/styles-v2-refined.css.gz.b64.part1',
    '.bundle/styles-v2-refined.css.gz.b64.part2',
    '.bundle/styles-v2-refined.css.gz.b64.part3',
  ], 'dist/styles-v2-refined.css'],
  [[
    '.bundle/app-v2-refined.js.gz.b64.part1',
    '.bundle/app-v2-refined.js.gz.b64.part2',
    '.bundle/app-v2-refined.js.gz.b64.part3',
  ], 'dist/app-v2-refined.js'],
];

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const [sources, destination] of outputs) {
  const encoded = (await Promise.all(sources.map((source) => readFile(source, 'utf8'))))
    .join('')
    .replace(/\s+/g, '');
  await writeFile(destination, gunzipSync(Buffer.from(encoded, 'base64')));
}

await cp('assets', 'dist/assets', { recursive: true });
console.log('Built the exact Yash Portfolio V2 into dist/.');
