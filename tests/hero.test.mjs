import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../out/index.html", import.meta.url), "utf8");

test("exports the interactive 3D hero instead of a static banner", () => {
  const hero = html.match(/<section[^>]*id="top"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(hero, "The exported homepage must contain the hero");
  assert.match(hero, /<canvas\b[^>]*aria-label="[^"]*3D/,
    "The hero must mount the accessible real-time 3D canvas");
  assert.match(hero, /<button\b[^>]*aria-pressed="false"/,
    "The hero must expose the animation pause control");
  assert.doesNotMatch(hero, /hikari-tech-banner\.webp/);
});
