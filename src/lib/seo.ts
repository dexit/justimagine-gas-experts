import { BUSINESS, AREAS, SERVICES } from "@/data/seo";

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber", "HVACBusiness"],
  "@id": `${BUSINESS.url}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: BUSINESS.url,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  image: `${BUSINESS.url}/og-default.jpg`,
  logo: `${BUSINESS.url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postcode,
    addressCountry: BUSINESS.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
  areaServed: AREAS.map((a) => ({
    "@type": "City",
    name: a.name,
    containsPlace: a.postcodes.map((p) => ({ "@type": "PostalCode", name: p })),
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "23:59",
      description: "Emergency callouts only",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Heating, Gas & Plumbing Services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.short,
        areaServed: AREAS.map((a) => ({ "@type": "City", name: a.name })),
      },
    })),
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
});

export const breadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

export const serviceJsonLd = (
  name: string,
  description: string,
  area?: string,
  price?: string,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  provider: { "@id": `${BUSINESS.url}/#business` },
  areaServed: area
    ? { "@type": "City", name: area }
    : { "@type": "AdministrativeArea", name: "Warwickshire" },
  description,
  ...(price
    ? {
        offers: {
          "@type": "Offer",
          price: price.replace(/[^0-9.]/g, ""),
          priceCurrency: "GBP",
        },
      }
    : {}),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
  },
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const jsonLdScript = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});
