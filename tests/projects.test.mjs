import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../out/index.html", import.meta.url), "utf8");
const work = html.match(/<section[^>]*id="work"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";

test("offers the current music analysis, plug-in and automation repositories", () => {
  for (const repo of ["music-detection", "JS_Inflator", "auto-mr"]) {
    assert.ok(work.includes(`href="https://github.com/Hikari-Tsai/${repo}"`), `${repo} needs a working project destination`);
  }
  const plugin = work.match(/<a\b[^>]*href="https:\/\/github.com\/Hikari-Tsai\/JS_Inflator"[^>]*>([\s\S]*?)<\/a>/)?.[1] ?? "";
  assert.ok(plugin.includes("開源"), "Do not present the upstream audio core as an original implementation");
  assert.ok(plugin.includes("測試") && plugin.includes("Pro Tools Developer"), "Keep the AAX availability limitation with the project");
});

test("keeps private work unlinked and existing credentials intact", () => {
  assert.ok(work.includes("web-pinn") && work.includes("rag"));
  assert.ok(!work.includes('href="https://github.com/Hikari-Tsai/web-pinn"'));
  assert.ok(!work.includes('href="https://github.com/Hikari-Tsai/rag"'));
  assert.equal((html.match(/class="cert-card"/g) ?? []).length, 3);
});
