import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const decode = async (sources, destination) => {
  const encoded = (await Promise.all(sources.map((source) => readFile(source, 'utf8'))))
    .join('')
    .replace(/\s+/g, '');
  await writeFile(destination, gunzipSync(Buffer.from(encoded, 'base64')));
};

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

await decode([
  '.bundle/index.part00',
  '.bundle/index.part01',
  '.bundle/index.part02',
  '.bundle/index.part03'
], 'dist/index.html');
await decode(['.bundle/styles-v2-refined.css.gz.b64'], 'dist/styles-v2-refined.css');
await decode(['.bundle/app-v2-refined.js.gz.b64'], 'dist/app-v2-refined.js');
await cp('assets', 'dist/assets', { recursive: true });

console.log('Built the restored Yash Portfolio V2 into dist/.');
