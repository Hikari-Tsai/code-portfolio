# Code Portfolio

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
