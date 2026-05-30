# AboTasneem Portfolio

A personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, and Three.js.

It contains the main landing page, project pages, blog support, contact form, 3D canvas sections, a small music dock, and a hidden markdown-powered Easter egg.

Live preview: https://abomeezo.com

## Run locally

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Project structure

```text
src/components       Reusable UI, sections, canvas components, and layout pieces
src/content/projects Project MDX files
src/content/blogs    Blog MDX files
src/constants        Shared portfolio data
src/assets           Imported images and static assets
public/audio         Music dock audio files
public/secres.md     Hidden Easter egg markdown content
```

## Notes

- The app is client-rendered through Vite.
- Project and blog detail pages are driven by MDX/frontmatter content.
- The contact form uses EmailJS, so local `.env` values are required for real submissions.
- `draft/` and `ProjectsToAdd/` are workspace notes, not production routes.
