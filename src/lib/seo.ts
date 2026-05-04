import { BUSINESS, AREAS, SERVICES, REVIEWS } from "@/data/seo";

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BUSINESS.url}/#organization`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: BUSINESS.url,
  logo: `${BUSINESS.url}/logo.png`,
  email: BUSINESS.email,
  telephone: BUSINESS.phoneE164,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneE164,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneE164,
      contactType: "emergency",
      areaServed: "GB",
      hoursAvailable: "Mo-Su 00:00-23:59",
    },
  ],
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BUSINESS.url}/#website`,
  url: BUSINESS.url,
  name: BUSINESS.name,
  publisher: { "@id": `${BUSINESS.url}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${BUSINESS.url}/services?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

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
  logo: {
    "@type": "ImageObject",
    url: `${BUSINESS.url}/logo.png`,
    width: 512,
    height: 512,
  },
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
    name: "Gas Safe Heating, Boiler & Plumbing Services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.short,
          provider: { "@id": `${BUSINESS.url}/#business` },
          areaServed: AREAS.map((a) => ({ "@type": "City", name: a.name })),
          ...(s.priceFrom
            ? {
                offers: {
                  "@type": "Offer",
                  price: s.priceFrom.replace(/[^0-9.]/g, ""),
                  priceCurrency: "GBP",
                  availability: "https://schema.org/InStock",
                  priceValidUntil: "2026-12-31",
                },
              }
            : {}),
        },
      },
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: String(REVIEWS.length + 115),
    bestRating: "5",
    worstRating: "1",
  },
  review: REVIEWS.slice(0, 3).map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
    datePublished: r.date,
  })),
  sameAs: [
    `https://www.gassaferegister.co.uk/find-an-engineer/`,
  ],
  knowsAbout: [
    "Gas Safe boiler installation",
    "Boiler servicing and repair",
    "CP12 landlord gas safety certificates",
    "Central heating installation",
    "24/7 emergency gas engineer",
    "Power flushing",
    "Unvented hot water cylinders",
    "Smart thermostat installation",
  ],
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
          availability: "https://schema.org/InStock",
        },
      }
    : {}),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
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

export const productOfferJsonLd = (opts: {
  name: string;
  description: string;
  price: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: opts.name,
  description: opts.description,
  brand: { "@type": "Brand", name: BUSINESS.name },
  offers: {
    "@type": "Offer",
    price: opts.price.replace(/[^0-9.]/g, ""),
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    url: opts.url,
    seller: { "@id": `${BUSINESS.url}/#business` },
  },
});

export const jsonLdScript = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});
