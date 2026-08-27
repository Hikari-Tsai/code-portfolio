import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: "/code-portfolio",
        assetPrefix: "/code-portfolio",
        trailingSlash: true,
        typescript: { ignoreBuildErrors: true },
      }
    : {}),
};

export default nextConfig;
