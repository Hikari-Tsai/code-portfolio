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

test("offers three accessible music tracks and labels the sequence as a silent demo", () => {
  assert.match(html, /<canvas\b[^>]*aria-label="[^"]*音符矩陣/);
  for (const track of ["旋律", "和弦", "低音"]) {
    assert.match(html, new RegExp(`<button[^>]*aria-label="聚焦${track}軌"`));
  }
  assert.ok(html.includes("示意序列 · 無聲"));
  assert.doesNotMatch(html, /<audio\b/);
});
