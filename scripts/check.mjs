import { readFile, stat } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
const required = [
  'source/part1.txt',
  'source/part2.txt',
  'source/part3.txt',
  'DecompressionStream',
  "route==='/'",
  "route==='/system'",
  'document.write(html)'
];

for (const marker of required) {
  if (!html.includes(marker)) throw new Error(`Missing loader marker: ${marker}`);
}

for (const part of ['part1.txt', 'part2.txt', 'part3.txt']) {
  const info = await stat(`dist/source/${part}`);
  if (info.size < 10000) throw new Error(`Source package is incomplete: ${part}`);
}

console.log('Vercel loader and local source package validation passed.');
