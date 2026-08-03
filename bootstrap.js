(() => {
  'use strict';

  const status = (message) => {
    const node = document.getElementById('boot-status');
    if (node) node.textContent = message;
  };

  const mimeFor = (path) => {
    if (path.endsWith('.woff2')) return 'font/woff2';
    if (path.endsWith('.webp')) return 'image/webp';
    if (path.endsWith('.css')) return 'text/css';
    if (path.endsWith('.js')) return 'text/javascript';
    if (path.endsWith('.html')) return 'text/html';
    return 'application/octet-stream';
  };

  const inflateRaw = async (bytes) => {
    if (!('DecompressionStream' in window)) {
      throw new Error('Your browser is too old for this portfolio build. Please use a current Chrome, Edge, Firefox or Safari version.');
    }
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  };

  const unpack = async (buffer) => {
    const bytes = new Uint8Array(buffer);
    const view = new DataView(buffer);
    const decoder = new TextDecoder();
    const files = new Map();
    let offset = 0;

    while (offset + 30 <= bytes.length && view.getUint32(offset, true) === 0x04034b50) {
      const method = view.getUint16(offset + 8, true);
      const compressedSize = view.getUint32(offset + 18, true);
      const nameLength = view.getUint16(offset + 26, true);
      const extraLength = view.getUint16(offset + 28, true);
      const nameStart = offset + 30;
      const dataStart = nameStart + nameLength + extraLength;
      const name = decoder.decode(bytes.subarray(nameStart, nameStart + nameLength));
      const compressed = bytes.subarray(dataStart, dataStart + compressedSize);

      if (!name.endsWith('/')) {
        const output =
          method === 0 ? compressed.slice() :
          method === 8 ? await inflateRaw(compressed) :
          null;
        if (output) files.set(name, output);
      }

      offset = dataStart + compressedSize;
    }

    return files;
  };

  const boot = async () => {
    try {
      status('Downloading the production experience…');
      const response = await fetch('/portfolio-source.zip', { cache: 'force-cache' });
      if (!response.ok) throw new Error(`Portfolio archive request failed (${response.status}).`);

      status('Unpacking motion, projects and local media…');
      const files = await unpack(await response.arrayBuffer());
      const decoder = new TextDecoder();
      const assetUrls = new Map();

      for (const [name, bytes] of files) {
        if (name.startsWith('assets/')) {
          assetUrls.set(name, URL.createObjectURL(new Blob([bytes], { type: mimeFor(name) })));
        }
      }

      let html = decoder.decode(files.get('index.html'));
      let css = decoder.decode(files.get('styles.css'));
      let app = decoder.decode(files.get('app.js'));
      if (!html || !css || !app) throw new Error('The portfolio source archive is incomplete.');

      for (const [path, url] of assetUrls) {
        html = html.replaceAll(path, url);
        css = css.replaceAll(path, url);
        app = app.replaceAll(path, url);
      }

      status('Starting the interactive portfolio…');
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      parsed.querySelectorAll('link[rel="stylesheet"],script[src]').forEach((node) => node.remove());

      document.documentElement.lang = parsed.documentElement.lang || 'en';
      document.title = parsed.title;
      document.head.innerHTML = parsed.head.innerHTML;
      document.body.replaceWith(document.adoptNode(parsed.body));

      const style = document.createElement('style');
      style.dataset.portfolioStyles = 'true';
      style.textContent = css;
      document.head.appendChild(style);

      const appUrl = URL.createObjectURL(new Blob([app], { type: 'text/javascript' }));
      const script = document.createElement('script');
      script.type = 'module';
      script.src = appUrl;
      script.addEventListener('load', () => URL.revokeObjectURL(appUrl), { once: true });
      document.body.appendChild(script);
    } catch (error) {
      console.error(error);
      status(error instanceof Error ? error.message : 'The portfolio could not start.');
      document.body.style.overflow = 'auto';
    }
  };

  boot();
})();
