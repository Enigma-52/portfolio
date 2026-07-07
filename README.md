# enigma52.vercel.app

Personal portfolio of **Rohit Singh** — backend engineer focused on distributed systems, AI infrastructure, and developer tools.

Built with [Next.js](https://nextjs.org) and [Once UI](https://once-ui.com) (Magic Portfolio base), heavily customized into an editorial, systems-themed design: hairline-ruled lists instead of card grids, mono utility labels, Bricolage Grotesque display type, and a live "systems in flight" status board.

**Live**: https://enigma52.vercel.app

## What's on the site

- **Landing** — centered hero, "Systems in flight" status board (what I'm building/learning now), "Shipped systems" ledger with org context tags and animated metrics, blog highlights, off-the-clock interests, photo strip.
- **About** — plain-language + technical intro, work timeline, GitHub contribution graph, skills, resume download (`/resume.pdf`).
- **Work** — editorial case-study list backed by MDX files.
- **Blog** — field notes on backend architecture and production systems.
- **Shelf** — tools, reads, repos, and ideas worth revisiting.
- **Gallery** — life around the code.
- **Extras** — RSS (`/api/rss`), `llms.txt` for AI crawlers, custom OG image, profile-photo favicon.

## Editing guide

Almost everything is content-as-data:

| What | Where |
|---|---|
| Identity, hero copy, socials | `src/resources/content.tsx` (`person`, `home`, `social`) |
| Systems in flight board | `building` array in `content.tsx` (status, description, optional `href`) |
| Shipped systems ledger | `impacts` array in `content.tsx` (metric, features, tech, `context` tag) |
| Shelf items | `shelf.items` in `content.tsx` |
| About page sections | `about` object in `content.tsx` |
| Case studies | MDX files in `src/app/work/projects/` |
| Blog posts | MDX files in `src/app/blog/posts/` |
| Theme, fonts, background effects, routes, `baseURL` | `src/resources/once-ui.config.ts` |
| Global CSS (highlight animation `.hl`, status pulse) | `src/resources/custom.css` |
| Landing/editorial styles | `src/components/home/home.module.scss` |

Notes:

- To add images back to a case study, add an `images:` list to its MDX frontmatter — the detail page picks them up automatically.
- Gallery photos live in `public/images/gallery/`; swap the files (or edit paths in `content.tsx` and the landing photo strip in `src/app/page.tsx`).
- Wrap any phrase in `<span className="hl">…</span>` for the animated attention highlight.
- Favicon/app icons (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`) are generated from `public/images/avatar.jpg`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Docs

- Magic Portfolio: https://docs.once-ui.com/docs/magic-portfolio/quick-start
- Once UI components: https://docs.once-ui.com
