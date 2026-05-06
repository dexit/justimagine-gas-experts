import { BUSINESS, AREAS, SERVICES, REVIEWS, GEOFENCE, NEWS, type NewsPost } from "@/data/seo";

/* ----------------- Geo helpers (geofencing JSON-LD) ----------------- */

export const geoCircleJsonLd = () => ({
  "@type": "GeoCircle",
  geoMidpoint: {
    "@type": "GeoCoordinates",
    latitude: GEOFENCE.centre.lat,
    longitude: GEOFENCE.centre.lng,
  },
  geoRadius: `${GEOFENCE.radiusKm * 1000}`, // metres
});

export const geoShapeJsonLd = () => ({
  "@type": "GeoShape",
  polygon: GEOFENCE.polygon.map(([lat, lng]) => `${lat} ${lng}`).join(" "),
});

/** Per-area Place node — used inside areaServed and on /areas/[slug]. */
export const areaPlaceJsonLd = (slug: string) => {
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${a.name}, ${a.county}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: a.name,
      addressRegion: a.county,
      addressCountry: "GB",
      postalCode: a.postcodes[0],
    },
    ...(a.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: a.geo.lat,
        longitude: a.geo.lng,
      },
    }),
    ...(a.geo && a.radiusKm && {
      hasMap: `https://www.google.com/maps/search/?api=1&query=${a.geo.lat},${a.geo.lng}`,
    }),
  };
};

/** A ServiceArea Place describing the entire geofenced coverage zone. */
export const serviceAreaJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": `${BUSINESS.url}/#service-area`,
  name: `${BUSINESS.name} — Service Area`,
  geo: geoCircleJsonLd(),
  additionalProperty: {
    "@type": "PropertyValue",
    name: "Coverage polygon",
    value: geoShapeJsonLd(),
  },
});

/* ----------------- News helpers ----------------- */

export const newsArticleJsonLd = (post: NewsPost) => {
  const url = `${BUSINESS.url}/news/${post.slug}`;
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${BUSINESS.url}/#organization` },
    mainEntityOfPage: url,
    description: post.excerpt,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    ...(post.cover && { image: post.cover }),
  };
  if (post.kind === "faq" && post.faqs) {
    return {
      ...base,
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
  }
  if (post.kind === "howto" && post.howto) {
    return {
      ...base,
      "@type": "HowTo",
      name: post.title,
      ...(post.howto.totalTime && { totalTime: post.howto.totalTime }),
      ...(post.howto.tools && post.howto.tools.length
        ? { tool: post.howto.tools.map((t) => ({ "@type": "HowToTool", name: t })) }
        : {}),
      ...(post.howto.supplies && post.howto.supplies.length
        ? { supply: post.howto.supplies.map((s) => ({ "@type": "HowToSupply", name: s })) }
        : {}),
      step: post.howto.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${url}#step-${i + 1}`,
      })),
    };
  }
  if (post.kind === "manual" && post.sections) {
    return {
      ...base,
      "@type": "TechArticle",
      proficiencyLevel: "Beginner",
      hasPart: post.sections.map((sec) => ({
        "@type": "WebPageElement",
        name: sec.heading,
        text: sec.body.join(" "),
      })),
    };
  }
  return { ...base, "@type": "NewsArticle" };
};

export const newsListJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${BUSINESS.name} — News & Insights`,
  itemListElement: NEWS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BUSINESS.url}/news/${p.slug}`,
    name: p.title,
  })),
});

/* ----------------- Original helpers ----------------- */


export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BUSINESS.url}/#organization`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: BUSINESS.url,
  logo: `${BUSINESS.url}/logo.svg`,
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

const GEO_REGION = "GB-WAR";
const WARWICKSHIRE_BOUNDS = "52.1 -1.9 52.7 -1.1";

// Warwickshire GeoShape bounding box (geofenced service area)
const warwickshireGeoShape = {
  "@type": "GeoShape",
  name: "Warwickshire and West Midlands service area",
  description: "Gas Safe heating and plumbing engineers covering Rugby, Leamington Spa, Warwick, Coventry, Kenilworth, Stratford-upon-Avon and surrounding Warwickshire postcodes.",
  box: WARWICKSHIRE_BOUNDS,
};

// Precompute areas served to avoid rebuilding on every schema call
const areasServed = AREAS.map((a) => ({
  "@type": "City" as const,
  name: a.name,
  containsPlace: a.postcodes.map((p) => ({
    "@type": "PostalCode" as const,
    name: p,
    containedInPlace: { "@type": "AdministrativeArea" as const, name: a.county },
  })),
}));

export const geoMetaTags = (placename: string = "Rugby, Warwickshire") => [
  { name: "geo.region", content: GEO_REGION },
  { name: "geo.placename", content: placename },
  { name: "geo.position", content: `${BUSINESS.geo.lat};${BUSINESS.geo.lng}` },
  { name: "ICBM", content: `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}` },
];

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
    `${BUSINESS.url}/logo.svg`,
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
  geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.lat},${BUSINESS.geo.lng}`,
  areaServed: [
    geoCircleJsonLd(),
    ...AREAS.map((a) => ({
      "@type": "City",
      name: a.name,
      ...(a.geo && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: a.geo.lat,
          longitude: a.geo.lng,
        },
      }),
      containsPlace: a.postcodes.map((p) => ({ "@type": "PostalCode", name: p })),
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
          areaServed: areasServed.map((a) => ({ "@type": "City", name: a.name })),
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
  image: `${BUSINESS.url}/og-default.jpg`,
  offers: {
    "@type": "Offer",
    price: opts.price.replace(/[^0-9.]/g, ""),
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    url: opts.url,
    seller: { "@id": `${BUSINESS.url}/#business` },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: String(REVIEWS.length + 115),
    bestRating: "5",
  },
});

export const plumbingServiceJsonLd = (
  serviceName: string,
  description: string,
  priceFrom?: string,
) => ({
  "@context": "https://schema.org",
  "@type": ["Service", "PlumbingService"],
  name: serviceName,
  description: description,
  provider: { "@id": `${BUSINESS.url}/#business` },
  areaServed: {
    "@type": "GeoShape",
    name: "Rugby, Warwickshire and surrounding areas",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: BUSINESS.phoneE164,
    serviceUrl: `${BUSINESS.url}/contact`,
  },
  ...(priceFrom
    ? {
        offers: {
          "@type": "Offer",
          price: priceFrom.replace(/[^0-9.]/g, ""),
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
        },
      }
    : {}),
});

export const gasEngineerJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "HomeServiceBusiness"],
  "@id": `${BUSINESS.url}/#gas-engineer`,
  name: BUSINESS.name,
  description: "Gas Safe registered heating engineers providing boiler installation, repair, and servicing across the Midlands.",
  url: BUSINESS.url,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  image: `${BUSINESS.url}/logo.svg`,
  knowsAbout: [
    "Boiler Installation",
    "Boiler Repair",
    "Boiler Servicing",
    "Central Heating",
    "Emergency Heating",
    "Gas Safety Certificates",
    "Landlord CP12",
    "Power Flushing",
    "Radiator Installation",
    "Plumbing",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Gas Safe Register",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "WRAS Approved",
      credentialCategory: "Water Regulations Approval",
    },
  ],
});

export const contactActionJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  telephone: BUSINESS.phoneE164,
  contactType: "Customer Service",
  email: BUSINESS.email,
  areaServed: "GB",
  availableLanguage: ["en"],
});

// Geofenced area + service schema — used on service×area combo pages
export const localServiceJsonLd = (
  serviceName: string,
  area: { name: string; postcodes: string[]; county: string },
  serviceDescription: string,
  price?: string,
  isPlumbingService?: boolean,
) => ({
  "@context": "https://schema.org",
  "@type": isPlumbingService ? ["Service", "PlumbingService"] : "Service",
  name: `${serviceName} in ${area.name}`,
  serviceType: serviceName,
  description: serviceDescription,
  provider: { "@id": `${BUSINESS.url}/#business` },
  areaServed: {
    "@type": "City",
    name: area.name,
    containsPlace: area.postcodes.map((p) => ({ "@type": "PostalCode", name: p })),
    containedInPlace: { "@type": "AdministrativeArea", name: area.county },
  },
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
  potentialAction: [
    {
      "@type": "CallAction",
      target: `tel:${BUSINESS.phoneE164}`,
      name: "Call for Service",
    },
    {
      "@type": "Action",
      name: "Message on WhatsApp",
      target: `https://api.whatsapp.com/send?phone=${BUSINESS.whatsapp}`,
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: String(REVIEWS.length + 115),
    bestRating: "5",
  },
});

export const serviceFaqJsonLd = (
  serviceName: string,
  faqs: Array<{ q: string; a: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
  headline: `Frequently Asked Questions about ${serviceName}`,
  description: `Common questions and answers about ${serviceName} services`,
});

export const jsonLdScript = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});
