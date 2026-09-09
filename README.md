# Hikari Tsai Portfolio

Personal portfolio for Hikari Tsai, an AI engineer and creative technologist working across generative AI, Physics AI, RAG, AIoT, music generation, singing voice synthesis, and software products.

## Live Site

[https://hikari-tsai.github.io/code-portfolio/](https://hikari-tsai.github.io/code-portfolio/)

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- GitHub Pages

## Local Development

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

Create the static GitHub Pages output:

```bash
npm run build
```

The generated site is written to `out/`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`. The workflow builds the static site and deploys it to GitHub Pages.

## Content

Portfolio content is maintained in `app/page.tsx`, global styling in `app/globals.css`, and metadata in `app/layout.tsx`.

## PR-Agent review

`.github/workflows/pr-agent.yml` runs the open-source [Qodo PR-Agent](https://github.com/qodo-ai/pr-agent) on non-draft pull requests targeting `main`, when opened, reopened, marked ready, or updated with commits. It reviews same-repository PRs only and ignores bot-generated events. Reviews are written in Traditional Chinese, with automatic description rewriting and code suggestions disabled.

### Setup

1. In **Settings → Secrets and variables → Actions → Secrets**, add `OPENAI_KEY` containing an OpenAI API key with access to the selected model. Do not commit the key. API usage is billed separately from a ChatGPT subscription.
2. Optionally add the repository Actions variable `PR_AGENT_MODEL`. The default is `gpt-4.1`; choose a model supported by PR-Agent and your API account.
3. Push the workflow when ready, then open a non-draft PR from a branch in this repository to `main`. A direct push to `main` does not trigger review. The automatically supplied `GITHUB_TOKEN` is sufficient; no personal access token is needed.

The workflow reads code through the GitHub API and sends PR context to the model provider. It can publish PR review comments but cannot push code or deploy the site. Missing `OPENAI_KEY` produces a clear configuration error. Fork PRs are deliberately skipped because GitHub does not provide repository secrets to those runs. This workflow does not enable slash commands on comments.

The action reference is pinned to commit `29709d42e805fceab0a74580a191499b2d3c725a`. Upstream currently loads the Docker image `pragent/pr-agent:github_action`, which is a mutable tag; the commit pin alone does not freeze that container image. See the [action definition](https://github.com/qodo-ai/pr-agent/blob/29709d42e805fceab0a74580a191499b2d3c725a/action.yaml).

Local file creation does not activate the workflow. It must be pushed to GitHub and supplied with the secret before a real review can run.
