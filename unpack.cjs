const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = __dirname;
const partsDir = path.join(root, '.source-parts');
const parts = fs.readdirSync(partsDir)
  .filter((name) => /^part\d+\.txt$/.test(name))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

const encoded = parts.map((name) => fs.readFileSync(path.join(partsDir, name), 'utf8').trim()).join('');
const files = JSON.parse(zlib.gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8'));

for (const target of ['src', 'public/assets']) {
  fs.rmSync(path.join(root, target), { recursive: true, force: true });
}

for (const [relative, content] of Object.entries(files)) {
  const destination = path.join(root, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content);
}

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.scripts.build = 'vite build';
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

if (process.env.GITHUB_ACTIONS === 'true') {
  fs.rmSync(partsDir, { recursive: true, force: true });
  fs.rmSync(path.join(root, 'unpack.cjs'), { force: true });
  fs.rmSync(path.join(root, 'REBUILD_STAGE.md'), { force: true });
  fs.rmSync(path.join(root, '.github/workflows/materialize-source.yml'), { force: true });
}

console.log(`Materialized ${Object.keys(files).length} source files.`);
