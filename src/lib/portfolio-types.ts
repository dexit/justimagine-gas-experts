/**
 * Portfolio data types
 * Unified types for both GitHub (markdown) and database projects
 */

export type PortfolioSource = "github" | "database";

export type PortfolioCategory =
  | "heating-installation"
  | "heating-upgrade"
  | "commercial"
  | "emergency"
  | "maintenance"
  | "controls";

export interface PortfolioImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface BasePortfolio {
  slug: string;
  title: string;
  category: PortfolioCategory;
  featured: boolean;
  date: Date;
  client: string;
  service: string;
  location: string;
  result: string;
  images: string[] | PortfolioImage[];
  metaDescription: string;
  source: PortfolioSource;
}

export interface GitHubPortfolio extends BasePortfolio {
  source: "github";
  content: string; // Markdown body
}

export interface DatabasePortfolio extends BasePortfolio {
  source: "database";
  id: string;
  content: string; // HTML
  createdAt: Date;
  updatedAt: Date;
}

export type UnifiedPortfolio = GitHubPortfolio | DatabasePortfolio;

/**
 * Convert image strings to PortfolioImage objects
 */
export function normalizeImages(images: string[]): PortfolioImage[] {
  return images.map((url) => ({ url }));
}

/**
 * Get image URL (handles both string and object formats)
 */
export function getImageUrl(image: string | PortfolioImage): string {
  return typeof image === "string" ? image : image.url;
}

/**
 * Sort portfolios by featured/date
 */
export function sortPortfolios(projects: UnifiedPortfolio[]): UnifiedPortfolio[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Filter portfolios by category
 */
export function filterByCategory(
  projects: UnifiedPortfolio[],
  category: PortfolioCategory
): UnifiedPortfolio[] {
  return projects.filter((p) => p.category === category);
}

/**
 * Get related projects (same category, exclude current)
 */
export function getRelated(
  projects: UnifiedPortfolio[],
  currentSlug: string,
  category: PortfolioCategory,
  limit = 3
): UnifiedPortfolio[] {
  return projects
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, limit);
}
