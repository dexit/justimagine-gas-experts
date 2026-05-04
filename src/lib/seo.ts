import { BUSINESS, AREAS, SERVICES, REVIEWS } from "@/data/seo";

// Warwickshire GeoShape bounding box (geofenced service area)
const warwickshireGeoShape = {
  "@type": "GeoShape",
  name: "Warwickshire and West Midlands service area",
  description: "Gas Safe heating and plumbing engineers covering Rugby, Leamington Spa, Warwick, Coventry, Kenilworth, Stratford-upon-Avon and surrounding Warwickshire postcodes.",
  box: "52.1 -1.9 52.7 -1.1", // SW lat/lng NE lat/lng bounding Warwickshire
};

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber", "HVACBusiness", "EmergencyService", "ProfessionalService"],
  "@id": `${BUSINESS.url}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  description: BUSINESS.profileDescription,
  slogan: BUSINESS.slogan,
  url: BUSINESS.url,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  currenciesAccepted: "GBP",
  paymentAccepted: "Cash, Bank Transfer, Credit Card, Cheque",
  foundingDate: BUSINESS.founded,
  image: [
    `${BUSINESS.url}/og-default.jpg`,
    `${BUSINESS.url}/logo.png`,
  ],
  logo: {
    "@type": "ImageObject",
    url: `${BUSINESS.url}/logo.svg`,
    width: 339,
    height: 339,
    caption: "Just Imagine Ltd — Gas Safe Heating & Plumbing Rugby",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postcode,
    addressCountry: BUSINESS.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
    name: "Just Imagine Ltd — Rugby, Warwickshire",
  },
  areaServed: [
    warwickshireGeoShape,
    ...AREAS.map((a) => ({
      "@type": "City",
      name: a.name,
      containsPlace: a.postcodes.map((p) => ({
        "@type": "PostalCode",
        name: p,
        containedInPlace: { "@type": "AdministrativeArea", name: a.county },
      })),
    })),
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "23:59",
      description: "Emergency callouts only — 24/7 gas and heating emergencies",
    },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Gas Safe Registration",
    recognizedBy: {
      "@type": "Organization",
      name: "Gas Safe Register",
      url: "https://www.gassaferegister.co.uk",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Boiler, Gas & Heating Services Rugby & Warwickshire",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: s.name,
        description: s.short,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.short,
          serviceType: s.name,
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
                  seller: { "@id": `${BUSINESS.url}/#business` },
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
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    reviewBody: r.text,
    datePublished: r.date,
    itemReviewed: { "@id": `${BUSINESS.url}/#business` },
  })),
  sameAs: [
    "https://www.gassaferegister.co.uk/find-an-engineer/",
    BUSINESS.companiesHouseUrl,
    `https://api.whatsapp.com/send?phone=${BUSINESS.whatsapp}`,
  ],
  knowsAbout: BUSINESS.serviceTypes,
  numberOfEmployees: { "@type": "QuantitativeValue", value: "5" },
  serviceArea: warwickshireGeoShape,
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
  "@id": `${BUSINESS.url}/services#${name.toLowerCase().replace(/\s+/g, "-")}`,
  name,
  serviceType: name,
  description,
  provider: {
    "@id": `${BUSINESS.url}/#business`,
    name: BUSINESS.name,
    telephone: BUSINESS.phoneE164,
  },
  areaServed: area
    ? {
        "@type": "City",
        name: area,
        containedInPlace: { "@type": "AdministrativeArea", name: "Warwickshire" },
      }
    : warwickshireGeoShape,
  ...(price
    ? {
        offers: {
          "@type": "Offer",
          price: price.replace(/[^0-9.]/g, ""),
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2026-12-31",
        },
      }
    : {}),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: String(REVIEWS.length + 115),
    bestRating: "5",
    worstRating: "1",
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

// Geofenced area + service schema — used on service×area combo pages
export const localServiceJsonLd = (opts: {
  serviceName: string;
  serviceDescription: string;
  areaName: string;
  areaPostcodes: string[];
  county: string;
  price?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${opts.serviceName} in ${opts.areaName}`,
  serviceType: opts.serviceName,
  description: opts.serviceDescription,
  provider: { "@id": `${BUSINESS.url}/#business` },
  areaServed: {
    "@type": "City",
    name: opts.areaName,
    containsPlace: opts.areaPostcodes.map((p) => ({ "@type": "PostalCode", name: p })),
    containedInPlace: { "@type": "AdministrativeArea", name: opts.county },
  },
  ...(opts.price
    ? {
        offers: {
          "@type": "Offer",
          price: opts.price.replace(/[^0-9.]/g, ""),
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
        },
      }
    : {}),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: String(REVIEWS.length + 115),
    bestRating: "5",
  },
});

export const jsonLdScript = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});
