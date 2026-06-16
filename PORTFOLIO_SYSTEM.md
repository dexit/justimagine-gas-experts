# Hybrid Portfolio System

Version-controlled GitHub markdown projects + optional database admin forms for dynamic content.

## Architecture Overview

```
┌─────────────────────────────────────────┐
│         /work Portfolio Pages           │
├─────────────────────────────────────────┤
│  /work (gallery) + /work/{slug} (detail)│
│     Loads from GitHub + Database        │
│     Merged & sorted by featured/date    │
└─────────────────────────────────────────┘
         ↑                    ↑
    Phase 1 (Live)      Phase 2 (Optional)
         ↓                    ↓
    GitHub Folder        D1 Database
  /portfolio/*/         portfolio_projects
  project.md (6)        (admin-created)
```

## Phase 1: GitHub Portfolio (Live)

### Structure

```
portfolio/
├── boiler-installation/
│   └── project.md
├── commercial-heating/
│   └── project.md
├── emergency-repair/
│   └── project.md
├── system-upgrade/
│   └── project.md
├── power-flush/
│   └── project.md
└── smart-controls/
    └── project.md
```

### Project File Format

**`portfolio/{slug}/project.md`**

```yaml
---
slug: boiler-installation
title: Complete Boiler Installation & Central Heating System
category: heating-installation
featured: true
date: 2024-11-15
client: Rugby Family Home
service: Central Heating Installation
location: Rugby, Warwickshire
result: +32% Energy Efficiency
images:
  - /portfolio/boiler-install-1.jpg
  - /portfolio/boiler-install-2.jpg
metaDescription: "New condensing boiler + 8-radiator system..."
---

# Project Title

Markdown content here...

## The Challenge

...

## Our Solution

...
```

**Frontmatter Fields:**
- `slug`: URL identifier (must be unique)
- `title`: Display title
- `category`: One of: heating-installation, heating-upgrade, commercial, emergency, maintenance, controls
- `featured`: boolean — appears first in listings
- `date`: ISO date (YYYY-MM-DD)
- `client`: Client name
- `service`: Service type
- `location`: Geographic location
- `result`: Project result/achievement
- `images`: Array of image paths (URLs)
- `metaDescription`: SEO description + preview text

### Loading Projects

**`portfolio-loader.ts`**

```typescript
// Load all projects
const projects = await loadPortfolioProjects();
// Returns: sorted by featured DESC, then date DESC

// Get single project
const project = await getPortfolioProject("boiler-installation");

// Get by category
const heating = await getPortfolioByCategory("heating-installation");

// Get related projects
const related = await getRelatedProjects("boiler-installation", 3);
```

**How it works:**
1. Uses Vite `import.meta.glob()` to load all `.md` files
2. Parses YAML frontmatter
3. Extracts markdown content
4. Validates with Zod schema
5. Returns typed `PortfolioProject` objects

### Editing Projects

**To add a new project:**

1. Create folder: `portfolio/{new-slug}/`
2. Create `project.md` with frontmatter + markdown
3. Add images to `public/portfolio/`
4. Git commit & push
5. Auto-deployed on next build

**To edit existing project:**

1. Edit `portfolio/{slug}/project.md`
2. Update frontmatter metadata if needed
3. Git commit & push
4. Auto-deployed

**No database setup required** — pure version control.

## Phase 2: Database Portfolio (Optional)

### D1 Schema

**Table: `portfolio_projects`**

```sql
CREATE TABLE portfolio_projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT,
  category TEXT,
  featured BOOLEAN,
  client TEXT,
  service TEXT,
  location TEXT,
  result TEXT,
  meta_description TEXT,
  content TEXT, -- HTML
  images TEXT, -- JSON array
  date DATE,
  created_at DATETIME,
  updated_at DATETIME,
  deleted_at DATETIME -- soft delete
);
```

**Views:**
- `active_portfolio_projects` — non-deleted projects only
- `portfolio_stats` — category breakdown

### Admin Interface

**Route: `/admin/portfolio`**

When implemented (Phase 2):
- List database projects
- Create new project
- Edit existing project
- Delete project (soft delete)
- Upload images via Vercel Blob
- Preview rendering
- Publish/unpublish

### Implementation Checklist (Phase 2)

- [ ] Create admin form components
- [ ] Implement Vercel Blob image upload
- [ ] Create/edit server actions
- [ ] Add project list with pagination
- [ ] Implement search/filter
- [ ] Add HTML editor for project content
- [ ] Merge database projects in loaders

## Unified Routes

### `/work` Portfolio Page

```typescript
// Automatically loads both:
const projects = await loadPortfolioProjects();
// + database projects (Phase 2)

// Merged, sorted, displayed in 3-column grid
```

**Features:**
- Featured badge
- Image from `images[0]`
- Location + date metadata
- Result achievement badge
- "View project" link

### `/work/{slug}` Project Detail

**Features:**
- Main image gallery with thumbnails
- Metadata panel (date, location, client, result)
- Full markdown/HTML content
- Related projects (same category)
- Contact CTA buttons
- JSON-LD schema for SEO

## Image Management

### Phase 1 (GitHub)

Store images in `public/portfolio/`:
```
public/portfolio/
├── boiler-install-1.png
├── commercial-1.png
└── smart-controls-1.png
```

Reference in frontmatter:
```yaml
images:
  - /portfolio/boiler-install-1.png
  - /portfolio/boiler-install-2.png
```

### Phase 2 (Database)

Use Vercel Blob:
```typescript
const blobUrl = await uploadProjectImage(file);
// Store in portfolio_projects.images JSON array
```

## Utilities

### Portfolio Loader

**`src/lib/portfolio-loader.ts`**

```typescript
loadPortfolioProjects()    // All projects, sorted
getPortfolioProject(slug)  // Single project by slug
getPortfolioByCategory(cat) // Filter by category
getRelatedProjects(slug, limit) // Related projects
```

### Portfolio Types

**`src/lib/portfolio-types.ts`**

```typescript
type PortfolioSource = "github" | "database";
interface UnifiedPortfolio { ... }
function sortPortfolios()
function filterByCategory()
function getRelated()
```

## SEO & Metadata

### JSON-LD Schema

Each project detail page includes:
- `WebPage` schema with description
- `ImageObject` for gallery images
- Structured data for search engines

### Meta Tags

```html
<title>Project Title | Just Imagine</title>
<meta name="description" content="Project description...">
<meta property="og:title" content="Project Title">
<meta property="og:description" content="...">
<meta property="og:image" content="/portfolio/image.jpg">
```

### Canonical URLs

Each project has canonical URL: `/work/{slug}`

## Performance

- **Phase 1:** Static markdown loading via Vite glob (~instant)
- **Phase 2:** Database queries with caching (when added)
- **Image optimization:** JPEG/PNG auto-served
- **Gallery:** Lazy-load thumbnails, pre-fetch main image

## Development Workflow

### Add a new project (GitHub Phase 1):

```bash
# 1. Create project folder
mkdir portfolio/project-slug

# 2. Create project.md with frontmatter
# 3. Add images to public/portfolio/

# 4. Commit & push
git add portfolio/ public/portfolio/
git commit -m "add: new project slug"
git push

# 5. Auto-deployed on next build ✓
```

### Update existing project:

```bash
# Edit portfolio/{slug}/project.md
# Git commit & push
# Auto-deployed ✓
```

## Future Enhancements

- [ ] Implement admin forms + Vercel Blob uploads
- [ ] Multi-image per project gallery
- [ ] Project testimonial quotes
- [ ] Before/after image comparisons
- [ ] Cost/savings breakdown
- [ ] Timeline/milestones view
- [ ] Export to PDF
- [ ] Admin analytics (views, clicks)

## Troubleshooting

**Project not appearing:**
- Check `slug` is unique across all projects
- Verify YAML frontmatter is valid (use YAML validator)
- Ensure markdown file is at `portfolio/{slug}/project.md`
- Check `category` is one of 6 allowed values

**Images not showing:**
- Verify image path starts with `/portfolio/`
- Check file exists in `public/portfolio/`
- Use absolute paths, not relative

**Build failing:**
- Check frontmatter syntax (YAML)
- Verify all required fields present
- Check Zod validation errors in build output
