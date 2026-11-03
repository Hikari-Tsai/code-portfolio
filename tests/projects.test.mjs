import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../out/index.html", import.meta.url), "utf8");
const work = html.match(/<section[^>]*id="work"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";

test("offers the current music analysis, plug-in and automation repositories", () => {
  for (const repo of ["TrackMate", "karaoke-battle", "HT-76", "HT-1B", "ai-interview", "music-detection", "JS_Inflator", "auto-mr"]) {
    assert.ok(work.includes(`href="https://github.com/Hikari-Tsai/${repo}"`), `${repo} needs a working project destination`);
  }
  const plugin = work.match(/<a\b[^>]*href="https:\/\/github.com\/Hikari-Tsai\/JS_Inflator"[^>]*>([\s\S]*?)<\/a>/)?.[1] ?? "";
  assert.ok(plugin.includes("開源"), "Do not present the upstream audio core as an original implementation");
  assert.ok(plugin.includes("PACE") && plugin.includes("未實測") && plugin.includes("Pro Tools"), "Distinguish signing verification from host compatibility testing");
});

test("keeps private work unlinked and existing credentials intact", () => {
  assert.ok(work.includes("web-pinn") && work.includes("rag"));
  assert.ok(!work.includes('href="https://github.com/Hikari-Tsai/web-pinn"'));
  assert.ok(!work.includes('href="https://github.com/Hikari-Tsai/rag"'));
  assert.equal((html.match(/class="cert-card"/g) ?? []).length, 3);
});

test("presents PIE as private work without linking organization repositories", () => {
  const privateProjects = [...work.matchAll(/<article\b[^>]*class="project project-private"[^>]*>([\s\S]*?)<\/article>/g)].map(match => match[1]);
  const pie = privateProjects.find(project => /<h3>PIE<\/h3>/.test(project));
  assert.ok(pie, "PIE belongs in the non-clickable private project list");
  assert.doesNotMatch(pie, /<a\b/);
  assert.doesNotMatch(html, /href="https:\/\/github\.com\/itri-(?:ai-team|aiteam)\//);
});

test("experience numbers continue correctly after the ninth card", () => {
  const labels = [...html.matchAll(/class="experience-meta"><span>(\d+)<\/span>/g)].map(match => match[1]);
  assert.ok(labels.length >= 10, "The recent development experience should be present");
  assert.equal(labels[9], "10");
  assert.equal(new Set(labels).size, labels.length);
});
