import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../out/index.html", import.meta.url), "utf8");

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    badgeId: "406f8ed0-c2f1-48b9-8fef-21bac421a9e8",
    image: "/code-portfolio/aws-solutions-architect-associate.png",
    description: "具備在 AWS 上設計安全、具韌性、高效能且符合成本效益架構的能力。",
  },
  {
    name: "AWS Certified Machine Learning – Specialty",
    badgeId: "b3d97b71-ae01-41a0-bb13-a3bfd11a27ec",
    image: "/code-portfolio/aws-machine-learning-specialty.png",
    description: "具備在 AWS 上建置、訓練、調校及部署機器學習解決方案的專業能力。",
  },
  {
    name: "AWS Certified Data Analytics – Specialty",
    badgeId: "354046b5-a2fb-4f22-92a9-eb032d9e1d16",
    image: "/code-portfolio/aws-data-analytics-specialty.png",
    description: "具備以 AWS 資料服務設計、建置、保護及維運分析解決方案的專業能力。",
  },
];

test("renders the three AWS certifications as verifiable Credly badges", () => {
  for (const certification of certifications) {
    assert.match(html, new RegExp(certification.badgeId));
    assert.ok(html.includes(certification.name));
    assert.ok(html.includes(certification.image));
    assert.ok(html.includes(certification.description));
  }

  assert.equal((html.match(/<a class="cert-card"/g) ?? []).length, 3);
});
