const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = __dirname;
const partsDir = path.join(root, '.static-parts');
const parts = fs.readdirSync(partsDir)
  .filter((name) => /^part\d+\.txt$/.test(name))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

const encoded = parts.map((name) => fs.readFileSync(path.join(partsDir, name), 'utf8').trim()).join('');
const html = zlib.gunzipSync(Buffer.from(encoded, 'base64'));
const output = path.join(root, 'dist', 'client');
fs.rmSync(path.join(root, 'dist'), { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'index.html'), html);
console.log(`Built interactive portfolio: ${html.length} bytes`);
