## Design and Editing Guide

This document explains how the current design works and how to safely edit content for Rohit Singh (or a future
profile) without breaking the layout.

### High-level structure

- **App shell and routing**: Next.js app routes under `src/app/`.
- **Core content configuration**: `src/resources/content.tsx`.
- **Design system and theme**: `src/resources/once-ui.config.ts`.
- **Reusable layout components**: `src/components/`.
- **Assets**: Images under `public/images/`.

### 1. Content configuration (`src/resources/content.tsx`)

- `person`: Name, role, avatar, email, timezone, and languages for Rohit Singh.
- `social`: Array of social links (GitHub, LinkedIn, Email). Icons must exist in `src/resources/icons.ts`.
- `home`: Controls the landing page text:
  - `headline`: A short, bold statement about Rohit's work.
  - `subline`: A longer description (multi-line JSX fragment).
- `about`: Drives the About/CV page:
  - `intro`: High-level paragraph about Rohit.
  - `work`: Company-level experiences with achievements.
  - `studies`: Education history.
  - `technical`: Grouped skills sections.
- `blog`, `work`, `gallery`: Metadata for their respective routes.

When editing this file:

- Keep the existing JSX structure (fragments, `Row`, `Text`, etc.).
- Only change text, arrays, and simple properties.
- Do not remove required properties from the typed objects (`person`, `home`, `about`, etc.).

### 2. Design system and theme (`src/resources/once-ui.config.ts`)

- `baseURL`: Set this to the deployed URL of Rohit's portfolio for correct SEO and sharing.
- `routes`: Toggle visibility/availability of pages (`/`, `/about`, `/work`, `/blog`, `/gallery`).
- `protectedRoutes`: Leave empty unless you explicitly need password-protected pages.
- `fonts`: Managed via `next/font/google` for headings, body, labels, and code.
- `style`: High-level theme configuration (theme mode, colors, border radius, surfaces, transitions, scaling).
- `effects`: Background graphics configuration (mask, gradient, dots, grid, lines).
- `dataStyle`: Default chart look-and-feel.
- `schema`: SEO schema information, configured for `type: "Person"` and pointing to Rohit.
- `sameAs`: Optional social profiles for structured data (e.g. LinkedIn).

If you want to keep the current visual design:

- Do not change `style`, `fonts`, or `effects`.
- Only adjust `baseURL`, `schema`, and `sameAs` to keep metadata accurate for Rohit.

### 3. Projects (`src/app/work/projects/`)

- Each project is an MDX file with frontmatter and markdown/JSX body.
- For Rohit:
  - `building-once-ui-a-customizable-design-system.mdx` has been repurposed to describe the **BuildStack** project.
  - It is the single sample project, based entirely on information from Rohit's resume.

To add a new project:

1. Duplicate the sample project file into the same folder.
2. Change the frontmatter:
   - `title`
   - `summary`
   - `publishedAt`
   - `images` (if you have any)
   - `team` (optional; you can include Rohit and/or collaborators).
3. Update the markdown body sections (Overview, Key Features, Technologies, Outcome) with facts from the new project.

### 4. Blog posts (`src/app/blog/posts/`)

- Blog posts are also MDX files with frontmatter and markdown/JSX body.
- For Rohit:
  - Only `quick-start.mdx` is kept as a sample/tutorial post.

To add a new blog post:

1. Duplicate `quick-start.mdx`.
2. Update frontmatter:
   - `title`
   - `subtitle` (optional)
   - `summary`
   - `image` (optional)
   - `publishedAt`
   - `tag`
3. Replace the body with your own markdown content. You can use Once UI components if you import them at the top of the
   MDX file.

### 5. Images and assets

- Avatar and project images live under `public/images/`.
- When replacing images:
  - Keep paths consistent with existing references (or update the references in `content.tsx` / MDX files).
  - Use similar aspect ratios where possible to avoid layout shifts.

### 6. Safe editing checklist

Before and after each change:

- **Before**:
  - Identify which object/file you are changing (`person`, `home`, `about`, project MDX, blog MDX).
  - Confirm all new facts come from the resume or other explicit sources.
- **After**:
  - Run the dev server and visually inspect `/`, `/about`, `/work`, `/blog`.
  - Scan for any remaining references to previous names, companies, or locations that do not apply to Rohit.
