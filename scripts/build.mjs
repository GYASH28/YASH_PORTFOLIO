import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('loader/index.html', 'dist/index.html');
await cp('loader/source', 'dist/source', { recursive: true });
await cp('robots.txt', 'dist/robots.txt');
await cp('sitemap.xml', 'dist/sitemap.xml');
console.log('Built the resilient Vercel loader, local source package, and production metadata.');
