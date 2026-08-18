const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const parts = [
  'c01.txt','c02.txt','c03.txt','c04.txt','c05.txt','c06.txt','c07.txt','c08.txt','c09.txt',
  'c10a.txt','c10b.txt','c10c.txt','c10d.txt','c11.txt'
];

const b64 = parts.map((file) => fs.readFileSync(path.join(__dirname, file), 'utf8')).join('');
const payload = JSON.parse(zlib.gunzipSync(Buffer.from(b64, 'base64')).toString('utf8'));
const out = path.join(__dirname, 'dist');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const [name, encoded] of Object.entries(payload.files)) {
  const file = path.join(out, name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.from(encoded, 'base64'));
}

console.log(`YKG Digital release reconstructed: ${Object.keys(payload.files).length} files`);
