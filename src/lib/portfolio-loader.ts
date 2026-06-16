/**
 * Portfolio Loader - Parses markdown files with YAML frontmatter
 * Uses Vite's import.meta.glob() for static file loading
 */

import { z } from "zod";

export const PortfolioProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.enum([
    "heating-installation",
    "heating-upgrade",
    "commercial",
    "emergency",
    "maintenance",
    "controls",
  ]),
  featured: z.boolean().default(false),
  date: z.coerce.date(),
  client: z.string(),
  service: z.string(),
  location: z.string(),
  result: z.string(),
  images: z.array(z.string()).default([]),
  metaDescription: z.string(),
  content: z.string(), // Markdown body
});

export type PortfolioProject = z.infer<typeof PortfolioProjectSchema>;

/**
 * Parse YAML frontmatter from markdown file
 * Format:
 * ---
 * key: value
 * ---
 * # Content here
 */
function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: raw };
  }

  const [, frontmatterStr, content] = match;
  const frontmatter: Record<string, unknown> = {};

  // Simple YAML parser (enough for our use case)
  frontmatterStr.split("\n").forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;

    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    // Parse different types
    if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value.startsWith("[") && value.endsWith("]")) {
      // Simple array parsing: [item1, item2]
      value = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""));
    } else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (!isNaN(Number(value))) {
      value = Number(value);
    }

    frontmatter[key] = value;
  });

  return { frontmatter, content: content.trim() };
}

/**
 * Load all portfolio projects from folder
 * Returns sorted by featured/date
 */
export async function loadPortfolioProjects(): Promise<PortfolioProject[]> {
  const modules = import.meta.glob<{ default: string }>(
    "../../portfolio/*/project.md",
    { as: "raw" }
  );

  const projects: PortfolioProject[] = [];

  for (const [path, loader] of Object.entries(modules)) {
    try {
      const raw = await loader();
      const { frontmatter, content } = parseFrontmatter(raw);

      const project = PortfolioProjectSchema.parse({
        ...frontmatter,
        content,
      });

      projects.push(project);
    } catch (err) {
      console.warn(`[v0] Failed to parse portfolio project at ${path}:`, err);
    }
  }

  // Sort: featured first, then by date (newest first)
  projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return projects;
}

/**
 * Get single portfolio project by slug
 */
export async function getPortfolioProject(slug: string): Promise<PortfolioProject | null> {
  const projects = await loadPortfolioProjects();
  return projects.find((p) => p.slug === slug) || null;
}

/**
 * Get portfolio projects by category
 */
export async function getPortfolioByCategory(category: string): Promise<PortfolioProject[]> {
  const projects = await loadPortfolioProjects();
  return projects.filter((p) => p.category === category);
}

/**
 * Get related projects (same category, different slug)
 */
export async function getRelatedProjects(
  slug: string,
  limit = 3
): Promise<PortfolioProject[]> {
  const project = await getPortfolioProject(slug);
  if (!project) return [];

  const projects = await loadPortfolioProjects();
  return projects
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, limit);
}
