import { SERVICES, AREAS } from "@/data/seo";

interface SearchMatch {
  type: "service" | "area";
  slug: string;
  confidence: number;
}

function extractSearchQuery(referrer: string): string | null {
  try {
    const url = new URL(referrer);

    // Common search engine query parameters
    const queryParams = ["q", "query", "p", "text"];

    for (const param of queryParams) {
      const query = url.searchParams.get(param);
      if (query) return decodeURIComponent(query).toLowerCase();
    }

    return null;
  } catch {
    return null;
  }
}

function isSearchEngine(referrer: string): boolean {
  const searchDomains = [
    "google",
    "bing",
    "yahoo",
    "duckduckgo",
    "baidu",
    "yandex",
    "ecosia",
  ];

  return searchDomains.some((domain) => referrer.includes(domain));
}

function calculateKeywordMatch(query: string, text: string): number {
  const queryWords = query.split(/\s+/).filter((w) => w.length > 2);
  const textLower = text.toLowerCase();

  if (queryWords.length === 0) return 0;

  let matches = 0;
  for (const word of queryWords) {
    if (textLower.includes(word)) {
      matches++;
    }
  }

  return matches / queryWords.length;
}

function findMatchInServices(query: string): SearchMatch | null {
  let bestMatch: SearchMatch | null = null;
  let bestScore = 0;
  const threshold = 0.5;

  for (const service of SERVICES) {
    const nameScore = calculateKeywordMatch(query, service.name);
    const shortScore = calculateKeywordMatch(query, service.short);
    const introScore = calculateKeywordMatch(query, service.intro());

    const avgScore = (nameScore * 2 + shortScore + introScore) / 4;

    if (avgScore > bestScore && avgScore >= threshold) {
      bestScore = avgScore;
      bestMatch = {
        type: "service",
        slug: service.slug,
        confidence: avgScore,
      };
    }
  }

  return bestMatch;
}

function findMatchInAreas(query: string): SearchMatch | null {
  let bestMatch: SearchMatch | null = null;
  let bestScore = 0;
  const threshold = 0.6;

  for (const area of AREAS) {
    const nameScore = calculateKeywordMatch(query, area.name);
    const postScore = area.postcodes.some((p) =>
      query.includes(p.toLowerCase())
    )
      ? 1.0
      : 0;

    const avgScore = postScore > 0 ? postScore : nameScore;

    if (avgScore > bestScore && avgScore >= threshold) {
      bestScore = avgScore;
      bestMatch = {
        type: "area",
        slug: area.slug,
        confidence: avgScore,
      };
    }
  }

  return bestMatch;
}

export function getSearchRedirectPath(): string | null {
  if (typeof document === "undefined") return null;

  const referrer = document.referrer;
  if (!referrer || !isSearchEngine(referrer)) return null;

  const query = extractSearchQuery(referrer);
  if (!query || query.length < 3) return null;

  // Try to match services first (higher priority)
  const serviceMatch = findMatchInServices(query);
  if (serviceMatch && serviceMatch.confidence > 0.65) {
    return `/services/${serviceMatch.slug}`;
  }

  // Then try areas
  const areaMatch = findMatchInAreas(query);
  if (areaMatch && areaMatch.confidence > 0.7) {
    return `/areas/${areaMatch.slug}`;
  }

  // Service with lower confidence threshold
  if (serviceMatch && serviceMatch.confidence > 0.5) {
    return `/services/${serviceMatch.slug}`;
  }

  return null;
}
