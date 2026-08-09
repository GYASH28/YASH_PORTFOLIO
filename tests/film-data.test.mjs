import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { films, getFilmFrame } from "../src/filmData.js";

test("publishes complete optimized frame sequences for every homepage film", () => {
  for (const film of Object.values(films)) {
    const directory = join(process.cwd(), "public", "frames", film.id);
    assert.ok(existsSync(directory), `${film.id} frame directory is missing`);
    assert.equal(readdirSync(directory).filter((file) => file.endsWith(".webp")).length, film.frameCount);
    assert.equal(getFilmFrame(film, 0), `/frames/${film.id}/frame-0001.webp`);
    assert.equal(
      getFilmFrame(film, film.frameCount - 1),
      `/frames/${film.id}/frame-${String(film.frameCount).padStart(4, "0")}.webp`,
    );
  }
});
