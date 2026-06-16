import { SERVICES } from "@/data/services";

export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  serviceSlug: string;
}

// Products from services. Price source of truth. Extras added on checkout.
export const PRODUCTS: Product[] = SERVICES.map((svc) => ({
  id: `svc-${svc.slug}`,
  name: svc.name,
  description: svc.description,
  priceInCents: svc.price.from * 100,
  serviceSlug: svc.slug,
}));

export const getProductByServiceSlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.serviceSlug === slug);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);
