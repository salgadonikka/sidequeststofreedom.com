# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Production build (also runs pagefind indexing)
npm run preview   # Preview the production build locally
```

No linter or test runner is configured.

## Architecture

Astro static site with MDX support and Pagefind full-text search. Deployed to Cloudflare Pages at `https://sidequeststofreedom.com`.

**Routing:**
- `/` → redirects to `/links` via `src/pages/index.astro`
- `/links` → links page (`src/pages/links/index.astro`)
- `/blog` → blog listing (`src/pages/blog/index.astro`)
- `/blog/[slug]` → blog post (`src/pages/blog/[...slug].astro`)
- `/search` → Pagefind search UI (`src/pages/search.astro`)

**Content:**
- Blog posts live in `src/content/blog/*.md` (or `.mdx`)
- Schema is defined in `src/content/config.ts` — `draft: true` hides posts from the site
- `[...slug].astro` computes reading time, related posts (by shared tags), and prev/next navigation before passing everything to `BlogPost.astro`

**Layout hierarchy:**
```
BaseLayout.astro       ← <html>, meta tags, GA4, AdSense, fonts
  └─ BlogPost.astro    ← full blog post chrome (sidebar, TOC, share, author, newsletter)
```

**Blog post frontmatter:**
```yaml
title: "Post Title"
description: "One-sentence summary"
pubDate: YYYY-MM-DD
tags: ["tag1", "tag2"]   # optional; used for related-posts matching
draft: false              # true = excluded from build
coverImage: ./image.jpg  # optional; processed by astro:assets
coverAlt: "Alt text"     # required when coverImage is set
```

## Design system

- Background: `#060610`, Purple: `#6E56CF`, Green: `#00E5A0`, Text: `#E2E2F0`
- Font: Space Grotesk (loaded from Google Fonts in `BaseLayout.astro`)
- Sci-fi / HUD aesthetic: CSS grid background + glow orbs (`.bg-grid`, `.bg-orb`)
- Scoped styles live inside each `.astro` file; global resets/variables are in `src/styles/global.css`
- Prose content inside `.prose` uses `:global()` selectors to style Markdown-generated HTML

## Key utilities & components

- `src/utils/readingTime.ts` — word-count-based reading time estimate consumed by `[...slug].astro`
- `AdUnit.astro` — wraps Google AdSense (`ca-pub-4780075669532262`); takes a `slot` prop and optional `format`
- Google Analytics 4 measurement ID: `G-EM8BCQEJH0` — script injected globally in `BaseLayout.astro`
- `TableOfContents.astro` — rendered twice per post: inline on mobile, sticky sidebar on desktop (hidden via CSS)
- `ReadingProgress.astro` — scroll-progress bar injected at the top of blog posts
