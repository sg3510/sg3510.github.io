Important Astro URLs
https://docs.astro.build 
https://docs.astro.build/llms.txt
https://docs.astro.build/llms-full.txt 

MCP Server Details
Name: Astro Docs
URL: https://mcp.docs.astro.build/mcp
Transport: Streamable HTTP


# Astro Migration Plan

Migration plan for sg3510.github.io from Create React App to Astro 5.

## Current State (Updated)

We've already extracted content to markdown files using `react-markdown`. This significantly simplifies the Astro migration.

**What's already done:**
- [x] Content extracted to markdown files (`public/content/*.md`)
- [x] CSS organized with theme variables (`src/styles/theme.css`)
- [x] Theme toggle component exists (`src/components/ThemeToggle.tsx`)
- [x] Grain overlay effect (keep) and gradients removed

**Existing markdown files:**
```
public/content/
├── home.md          # Bio and experience
├── interests.md     # Interests list (with AI Dev Tooling added)
└── fun-things.md    # Projects
```

## Should We Still Migrate to Astro?

| Factor | Current (CRA + react-markdown) | Astro |
|--------|-------------------------------|-------|
| Content editing | Already easy (.md files) | Same |
| Bundle size | ~135 KB gzipped | ~10-20 KB (no JS by default) |
| Build tool | CRA (maintenance mode) | Vite (actively developed) |
| Markdown features | Basic | Native + MDX + Content Collections |
| Complexity | Simple, working now | Migration effort required |

**Verdict:** The migration is now **optional**. The main benefits would be:
1. Smaller bundle (better performance)
2. Modern build tooling (Vite vs deprecated CRA)
3. Native markdown support without fetch/loading states

If the current setup works well for you, **you can stop here**. If you want the performance/DX benefits, continue with the migration below.

---

## Why Astro?

- **First-class markdown support** via Content Collections API
- **Zero JavaScript by default** - ships static HTML, hydrates only what's needed
- **Islands Architecture** - interactive React components only where necessary
- **Vite under the hood** - fast dev server and builds
- **#1 in satisfaction** in State of JS 2024 survey

## Site Analysis

| Page | Content Type | Interactive? |
|------|--------------|--------------|
| Home (`/`) | Bio, experience list, social links | Profile image click, theme toggle |
| Interests (`/interests`) | List with descriptions | Theme toggle only |
| Fun Things (`/fun-things`) | Project list | Theme toggle only |

**Interactive components to preserve:**
- Theme toggle (light/dark mode with localStorage)
- Clickable profile image (random rotation)
- Social icons

## Current vs Target Architecture

### Current (CRA + react-markdown)
```
src/
├── App.tsx                    # All page components
├── App.css                    # Component styles
├── index.css                  # Global styles + grain
├── hooks/
│   └── useMarkdown.ts         # Fetch hook for .md files
├── components/
│   └── ThemeToggle.tsx        # Theme toggle (reusable)
├── contexts/
│   └── ThemeContext.tsx       # Theme state
└── styles/
    └── theme.css              # CSS variables
public/
├── content/                   # <-- Markdown lives here
│   ├── home.md
│   ├── interests.md
│   └── fun-things.md
├── images/
├── resume/
└── CNAME
```

### Target (Astro 5)
```
src/
├── content/                   # Move markdown here
│   ├── config.ts              # Collection schema
│   └── pages/
│       ├── home.md            # Add frontmatter
│       ├── interests.md
│       └── fun-things.md
├── components/
│   ├── ThemeToggle.tsx        # Copy as-is (React island)
│   ├── ProfileImage.tsx       # Extract from App.tsx
│   └── SocialIcons.astro      # New static component
├── layouts/
│   └── BaseLayout.astro       # New (header, nav, grain)
├── pages/
│   ├── index.astro            # New
│   ├── interests.astro        # New
│   └── fun-things.astro       # New
└── styles/
    ├── global.css             # Merge App.css + index.css
    └── theme.css              # Copy as-is
public/
├── images/                    # Unchanged
├── resume/                    # Unchanged
└── CNAME                      # Unchanged
```

### Key Concepts

**Content Collections (Astro 5):**
- Type-safe markdown with schema validation
- Content Layer API for loading from any source
- Built-in frontmatter support

**Islands Architecture:**
- Static HTML by default
- `client:load` - Hydrate immediately (theme toggle)
- `client:idle` - Hydrate when browser is idle
- `client:visible` - Hydrate when component enters viewport

---

## Migration Strategy: Incremental & Safe

The key principle: **Keep the old site working until the new one is ready.**

We will:
1. Create Astro project in a separate branch
2. Port content to markdown files
3. Rebuild pages using Astro components
4. Keep React components for interactive islands
5. Test thoroughly before merging
6. Single atomic switch to new structure

---

## Todo List

### Phase 1: Setup
- [ ] Create new git branch `astro-migration`
- [ ] Initialize Astro 5 project with `npm create astro@latest`
- [ ] Install React integration (`@astrojs/react`)
- [ ] Configure for static output (`output: 'static'`)
- [ ] Copy `public/` assets (images, resume, CNAME)

### Phase 2: Content Migration (Simplified - files already exist!)
- [x] ~~Extract content to markdown~~ **DONE** - files in `public/content/`
- [ ] Move `public/content/*.md` to `src/content/pages/`
- [ ] Add frontmatter to each file (title, description)
- [ ] Create `src/content/config.ts` with collection schema

### Phase 3: Styling (Simplified - CSS already exists!)
- [x] ~~Create theme variables~~ **DONE** - `src/styles/theme.css`
- [ ] Copy `src/styles/theme.css` to Astro project
- [ ] Copy `src/App.css` to `src/styles/global.css`
- [ ] Copy `src/index.css` styles (grain overlay)
- [ ] Create `src/layouts/BaseLayout.astro` with header/nav

### Phase 4: Interactive Components
- [x] ~~Create ThemeToggle~~ **DONE** - `src/components/ThemeToggle.tsx`
- [ ] Copy ThemeToggle.tsx (will work as-is with `client:load`)
- [ ] Extract ProfileImage logic from App.tsx to separate component
- [ ] Create `SocialIcons.astro` (static, no JS needed)

### Phase 5: Page Assembly
- [ ] Create `src/pages/index.astro` (home)
- [ ] Create `src/pages/interests.astro`
- [ ] Create `src/pages/fun-things.astro`

### Phase 6: Testing
- [ ] Run `npm run build` and verify output
- [ ] Test theme toggle, profile image click
- [ ] Verify all links and routes work
- [ ] Compare visual output to current site

### Phase 7: Deployment & Cleanup
- [ ] Set up GitHub Actions for Astro
- [ ] Test deployment to GitHub Pages
- [ ] Merge to master
- [ ] Remove old CRA files

---

## Effort Estimate (Revised)

| Phase | Original Estimate | Now (with prep work done) |
|-------|-------------------|---------------------------|
| Setup | 15 min | 15 min |
| Content | 30 min | **5 min** (just move files) |
| Styling | 45 min | **15 min** (copy existing CSS) |
| Components | 30 min | **15 min** (ThemeToggle exists) |
| Pages | 30 min | 30 min |
| Testing | 20 min | 20 min |
| Deploy | 15 min | 15 min |
| **Total** | **~3 hours** | **~2 hours** |

The prep work we did (markdown extraction, CSS organization) cut the migration time by about a third.

---

## Detailed Implementation Notes

### Step 1: Add Frontmatter to Existing Markdown

Your existing `public/content/home.md` just needs frontmatter added:

```markdown
---
title: Home
description: Seb Grubb's personal site
---

# Hi I'm Seb
... (rest of existing content unchanged)
```

### Step 2: Content Collection Schema (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { pages };
```

### Step 3: ThemeToggle Works As-Is

Your existing `src/components/ThemeToggle.tsx` can be copied directly. The only change is how you use it in Astro:

```astro
<!-- In any .astro file -->
<ThemeToggle client:load />
```

The `client:load` directive tells Astro to hydrate this component immediately.

### Step 4: Example Page (`src/pages/index.astro`)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ThemeToggle from '../components/ThemeToggle.tsx';
import ProfileImage from '../components/ProfileImage.tsx';
import { getEntry } from 'astro:content';

const home = await getEntry('pages', 'home');
const { Content } = await home.render();
---

<BaseLayout title="Seb Grubb">
  <ProfileImage client:load />
  <Content />
  <div class="social-icons">
    <!-- Social icons as static HTML or Astro component -->
  </div>
</BaseLayout>
```

Note: No loading states needed! Astro renders markdown at build time.

### Astro Config (`astro.config.mjs`)

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://sebgrubb.com',
  integrations: [react()],
  output: 'static',
});
```

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## Rollback Plan

If anything goes wrong:

1. The old site remains on `master` until final merge
2. Git history preserves everything
3. Can revert merge commit if issues found post-deploy
4. GitHub Pages serves from `master` - no intermediate broken state

---

## References

- [Astro 5.0 Release Notes](https://astro.build/blog/astro-5/)
- [Migrating from CRA - Official Docs](https://docs.astro.build/en/guides/migrate-to-astro/from-create-react-app/)
- [Astro React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Islands Architecture](https://docs.astro.build/en/concepts/islands/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Project Structure](https://docs.astro.build/en/basics/project-structure/)
- [Deploying to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
