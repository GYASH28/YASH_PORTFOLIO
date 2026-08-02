const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = __dirname;
const partsDir = path.join(root, '.static-parts');
const parts = [
  'part0.txt', 'part1.txt', 'part2.txt', 'part3.txt', 'part4.txt',
  'part5a.txt', 'part5b.txt', 'part5c.txt', 'part5d.txt',
  'part6a.txt', 'part6b.txt', 'part6c.txt',
];

for (const name of parts) {
  if (!fs.existsSync(path.join(partsDir, name))) throw new Error(`Missing static source part: ${name}`);
}

const encoded = parts.map((name) => fs.readFileSync(path.join(partsDir, name), 'utf8').trim()).join('');
const html = zlib.gunzipSync(Buffer.from(encoded, 'base64'));
const output = path.join(root, 'dist', 'client');
fs.rmSync(path.join(root, 'dist'), { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'index.html'), html);
console.log(`Built interactive portfolio: ${html.length} bytes`);
