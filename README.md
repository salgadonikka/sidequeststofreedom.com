# Side Quests To Freedom

A personal finance and side hustle blog at [sidequeststofreedom.com](https://sidequeststofreedom.com). Built with Astro and deployed to Cloudflare Pages.

## Stack

- [Astro](https://astro.build) — static site generator with MDX support
- [Pagefind](https://pagefind.app) — static full-text search (runs post-build)
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting and CDN

## Project structure

```
src/
  content/blog/     # Blog posts (.md / .mdx)
  layouts/          # BaseLayout.astro, BlogPost.astro
  pages/            # File-based routing (blog, links, about, contact, etc.)
  components/       # Nav, Footer, TOC, RelatedPosts, ShareButtons, etc.
  styles/           # global.css (CSS variables, resets, light/dark theme)
  utils/            # readingTime.ts
public/
  images/           # Static assets (favicon, etc.)
```

## Development

```bash
npm install
npm run dev       # Dev server at localhost:4321
npm run build     # Production build + pagefind indexing
npm run preview   # Preview the production build
```

## Features

- Light/dark theme toggle (persisted in `localStorage`)
- Full-text search via Pagefind
- Reading progress bar and estimated reading time on blog posts
- Table of contents (inline on mobile, sticky sidebar on desktop)
- Related posts by shared tags, prev/next post navigation
- Google Analytics 4 and Google AdSense integrated globally
- Sitemap auto-generated on build
