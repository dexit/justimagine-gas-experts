import { SERVICES } from "@/data/seo";

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string) {
  return SERVICES.filter((s) => s.category === category);
}
