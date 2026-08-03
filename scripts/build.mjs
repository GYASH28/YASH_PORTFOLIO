import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { inflateRawSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const archivePath = resolve(root, "portfolio-source.zip");
const target = process.argv.includes("--source") ? resolve(root, "source") : resolve(root, "dist");
const archive = await readFile(archivePath);
const view = new DataView(archive.buffer, archive.byteOffset, archive.byteLength);
const decoder = new TextDecoder();
const deployable = (name) =>
  name === "index.html" ||
  name === "styles.css" ||
  name === "app.js" ||
  name.startsWith("assets/");

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });

let offset = 0;
let written = 0;

while (offset + 30 <= archive.length && view.getUint32(offset, true) === 0x04034b50) {
  const method = view.getUint16(offset + 8, true);
  const compressedSize = view.getUint32(offset + 18, true);
  const nameLength = view.getUint16(offset + 26, true);
  const extraLength = view.getUint16(offset + 28, true);
  const nameStart = offset + 30;
  const dataStart = nameStart + nameLength + extraLength;
  const name = decoder.decode(archive.subarray(nameStart, nameStart + nameLength));
  const compressed = archive.subarray(dataStart, dataStart + compressedSize);

  if (!name.endsWith("/") && (process.argv.includes("--source") || deployable(name))) {
    const output =
      method === 0
        ? compressed
        : method === 8
          ? inflateRawSync(compressed)
          : (() => {
              throw new Error(`Unsupported ZIP compression method ${method} for ${name}`);
            })();

    const normalized = name.replaceAll("\\", "/");
    if (normalized.startsWith("../") || normalized.includes("/../") || normalized.startsWith("/")) {
      throw new Error(`Unsafe archive path: ${name}`);
    }

    const destination = resolve(target, normalized);
    if (!destination.startsWith(target + sep)) throw new Error(`Unsafe output path: ${name}`);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, output);
    written += 1;
  }

  offset = dataStart + compressedSize;
}

if (!written) throw new Error("No portfolio files were extracted.");
console.log(`Built ${written} portfolio files into ${target}`);
