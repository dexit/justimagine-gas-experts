// LD-JSON Schema generators for SEO + Google Rich Snippets
// Covers: LocalBusiness, Service, FAQ, Breadcrumb, Event, ContactPoint, Organization

import { type Service } from "@/data/seo";
import { type Area } from "@/data/areas";

const COMPANY = {
  name: "Just Imagine Ltd",
  url: "https://justimagine.ltd",
  phone: "07774079152",
  email: "info@justimagine.ltd",
  address: {
    streetAddress: "Office Address",
    addressLocality: "Rugby",
    addressRegion: "Warwickshire",
    postalCode: "CV21",
    addressCountry: "GB",
  },
};

export const BreadcrumbSchema = (breadcrumbs: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: `https://justimagine.ltd${item.url}`,
  })),
});

export const LocalBusinessSchema = (area: Area) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `https://justimagine.ltd/areas/${area.slug}`,
  name: COMPANY.name,
  url: COMPANY.url,
  phone: COMPANY.phone,
  email: COMPANY.email,
  areaServed: {
    "@type": "City",
    name: area.name,
  },
  address: {
    "@type": "PostalAddress",
    ...COMPANY.address,
  },
  priceRange: "£££",
  knowsAbout: ["Gas Installation", "Boiler Repair", "Plumbing", "Heating Systems"],
});

export const ServiceSchema = (service: Service, area: Area) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://justimagine.ltd/${service.slug}-in-${area.slug}`,
  name: service.h1(area.name),
  description: service.intro(area.name),
  provider: {
    "@type": "LocalBusiness",
    name: COMPANY.name,
    url: COMPANY.url,
    phone: COMPANY.phone,
  },
  areaServed: {
    "@type": "City",
    name: area.name,
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `https://justimagine.ltd/${service.slug}-in-${area.slug}`,
  },
  ...(service.priceFrom && {
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: service.priceFrom.replace(/[^0-9.]/g, ""),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  }),
});

export const FAQSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const OrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://justimagine.ltd",
  name: COMPANY.name,
  url: COMPANY.url,
  logo: "https://justimagine.ltd/logo.png",
  description: "Gas Safe certified heating, plumbing and boiler services in Rugby, Warwickshire and beyond.",
  sameAs: [
    "https://www.facebook.com/justimagine",
    "https://www.instagram.com/justimagine",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: COMPANY.phone,
    email: COMPANY.email,
    areaServed: "GB",
  },
});

export const ContactPointSchema = () => ({
  "@type": "ContactPoint",
  contactType: "Customer Service",
  telephone: COMPANY.phone,
  email: COMPANY.email,
  hoursAvailable: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
});

export const EventSchema = (eventTitle: string, date: string, location: string) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: eventTitle,
  description: `${eventTitle} at Just Imagine Ltd`,
  startDate: date,
  eventAttendanceMode: "OfflineEventAttendanceMode",
  eventLocation: {
    "@type": "Place",
    name: location,
    address: COMPANY.address,
  },
  organizer: {
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
  },
});

export const AggregateRatingSchema = (ratingValue: number, reviewCount: number) => ({
  "@type": "AggregateRating",
  ratingValue,
  reviewCount,
  bestRating: 5,
  worstRating: 1,
});

export const ReviewSchema = (reviewText: string, author: string, rating: number, date: string) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  author: {
    "@type": "Person",
    name: author,
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: rating,
    bestRating: 5,
    worstRating: 1,
  },
  reviewBody: reviewText,
  datePublished: date,
});
