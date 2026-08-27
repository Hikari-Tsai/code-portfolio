import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../out/index.html", import.meta.url), "utf8");

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    badgeId: "406f8ed0-c2f1-48b9-8fef-21bac421a9e8",
  },
  {
    name: "AWS Certified Machine Learning – Specialty",
    badgeId: "b3d97b71-ae01-41a0-bb13-a3bfd11a27ec",
  },
  {
    name: "AWS Certified Data Analytics – Specialty",
    badgeId: "354046b5-a2fb-4f22-92a9-eb032d9e1d16",
  },
];

test("renders the three AWS certifications as verifiable Credly badges", () => {
  for (const certification of certifications) {
    assert.match(html, new RegExp(certification.badgeId));
    assert.ok(html.includes(certification.name));
  }

  assert.equal((html.match(/<a class="cert-card"/g) ?? []).length, 3);
});
