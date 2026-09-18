import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../out/index.html", import.meta.url), "utf8");
const contact = html.match(/<section[^>]*id="contact"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";

test("contact includes a silent audio visualization with an accessible pause control", () => {
  assert.match(contact, /AUDIO SIGNAL LAB/);
  assert.match(contact, /<canvas\b[^>]*aria-label="[^"]*波形與頻譜/);
  assert.match(contact, /<button\b[^>]*aria-label="暫停音訊動畫"/);
  assert.ok(contact.includes("模擬訊號 · 無聲"));
  assert.doesNotMatch(contact, /<audio\b/);
});

test("audio visualization keeps the three contact destinations intact", () => {
  for (const href of ["https://www.linkedin.com/in/hikari-tsai/", "https://github.com/Hikari-Tsai", "https://hikari-tsai.github.io/homepage/"]) {
    assert.ok(contact.includes(`href="${href}"`));
  }
});
