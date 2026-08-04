import { readFile } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
const required = [
  'portfolio-source.gz.b64.part1',
  'portfolio-source.gz.b64.part2',
  'portfolio-source.gz.b64.part3',
  'DecompressionStream',
  "route==='/system'",
  'document.write(html)'
];
for (const marker of required) {
  if (!html.includes(marker)) throw new Error(`Missing loader marker: ${marker}`);
}
console.log('Vercel loader validation passed.');
