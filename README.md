## Rohit Singh's Portfolio

This is Rohit Singh's personal portfolio, built on top of the Magic Portfolio template. It uses an MDX-based content
system for projects and blog posts, an about / CV page and a gallery.

Magic Portfolio is built with [Once UI](https://once-ui.com) for [Next.js](https://nextjs.org).

### Platform overview

- **Tech stack**: Next.js + Once UI + MDX content for projects and blog posts.
- **Core config**: All profile-level content lives in `src/resources/content.tsx`.
- **Design system & theme**: Global design, fonts and effects are configured in `src/resources/once-ui.config.ts`.
- **Projects**: Project pages are MDX files in `src/app/work/projects/`.
- **Blog posts**: Blog posts are MDX files in `src/app/blog/posts/`.
- **Shared components**: Layout pieces like the footer live in `src/components/`.

### How profile data is structured

- **Person**: Name, role, avatar, email, timezone, and languages are defined as a `person` object in
  `src/resources/content.tsx`. This is used across the whole app (header, footer, meta, etc.).
- **About page**: The `about` object in `src/resources/content.tsx` controls:
  - Intro text
  - Work experience (company, timeframe, role, achievements)
  - Studies / education
  - Technical skills sections
- **Pages**:
  - `home` controls the landing page headline and subline.
  - `blog`, `work`, and `gallery` control labels, titles, and descriptions for their respective pages.

### How to edit the profile for a new person (the “playbook” we followed for Rohit)

1. **Update core identity in `src/resources/content.tsx`**  
   - Edit the `person` object (first name, last name, display name, role, avatar path, email, timezone, languages) to
     match the new person.

2. **Update the home page text**  
   - In the `home` object, change:
     - `title` and `description` if the role or name changes.
     - `headline` and `subline` to summarize the new person's background and focus areas.

3. **Update the About page**  
   - In the `about` object:
     - Replace the `intro.description` with a short paragraph based only on the new person's CV/resume.
     - Replace the `work.experiences` array with entries for each role (company, timeframe, role, and achievements).
     - Update `studies.institutions` with the correct degree, school, years, and location.
     - Rewrite `technical.skills` to group skills into a few meaningful sections (languages/backend, web, databases/cloud
       and tooling, etc.).

4. **Update social links**  
   - In the `social` array in `src/resources/content.tsx`, set:
     - `name` (e.g. "GitHub", "LinkedIn")
     - `icon` (must exist in `src/resources/icons.ts`)
     - `link` (full URL or `mailto:` link)

5. **Update schema/SEO config**  
   - In `src/resources/once-ui.config.ts`:
     - Set `baseURL` to the actual deployed URL of the portfolio when you have it.
     - Ensure `schema` uses:
       - `type: "Person"`
       - `name` and `email` from the `person` object.
     - Optionally set `sameAs.linkedin` (and other fields) to the person's own profiles.

6. **Projects and blog posts**  
   - Projects live in `src/app/work/projects/` as MDX files. For Rohit:
     - `building-once-ui-a-customizable-design-system.mdx` was repurposed into a single sample project file describing
       Rohit's `BuildStack` project.
   - Blog posts live in `src/app/blog/posts/` as MDX files. For Rohit:
     - Only `quick-start.mdx` is kept as a sample/tutorial post; the other template posts were removed.
   - To add more:
     - Duplicate the sample project or blog file.
     - Change the frontmatter (`title`, `summary`, `publishedAt`, `images`, etc.).
     - Update the body markdown and any component usage.

### Design & customization notes (without changing the current design)

- **Design tokens & theme**  
  - Controlled in `src/resources/once-ui.config.ts` via the `style` object (theme, neutral, brand, accent, border,
    surface, etc.).
  - The current configuration is left as-is to preserve the original design. If you change these values, the design will
    update globally.

- **Background effects & data visuals**  
  - The `effects` and `dataStyle` objects in `once-ui.config.ts` control background graphics and chart styling.
  - These are currently configured to match the Magic Portfolio defaults and can be tweaked without touching layout
    code.

- **Routing & protected routes**  
  - Enabled routes are defined in the `routes` object in `once-ui.config.ts`.
  - `protectedRoutes` can be used to password-protect specific pages. For Rohit's portfolio this is currently an empty
    object (no protected pages).

### External docs

- **Magic Portfolio docs**: `https://docs.once-ui.com/docs/magic-portfolio/quick-start`  
  Use these for deeper Once UI and Magic Portfolio specifics (component APIs, advanced styling, etc.).
