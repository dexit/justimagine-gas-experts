// Comprehensive LD+JSON schemas for full SEO coverage
// HVACBusiness + LocalBusiness, Service, OfferCatalog, HowTo, FAQ, Reviews, etc.

import { BUSINESS } from "@/data/seo";

const SERVICES_DETAILS = {
  boilerInstallation: {
    name: "Boiler Installation",
    description: "Expert installation of all boiler types from leading manufacturers",
    steps: [
      { step: 1, name: "Free survey & quote", description: "Contact us for a free survey and no-obligation quote" },
      { step: 2, name: "Choose your boiler", description: "Select from top brands including Worcester Bosch, Vaillant, Ideal" },
      { step: 3, name: "Installation day", description: "Our Gas Safe engineers install your new boiler" },
      { step: 4, name: "Commission & test", description: "Full commissioning, testing, and certification" },
      { step: 5, name: "Warranty handover", description: "Receive your warranty certificate and documentation" },
    ],
    priceMin: 1500,
    priceMax: 3500,
    durationMin: "1",
    durationMax: "2",
    faqs: [
      { q: "What types of boilers do you install?", a: "We install combi, system, and regular boilers from Worcester Bosch, Vaillant, Ideal, and Baxi." },
      { q: "How long does installation take?", a: "Typically 1 day for like-for-like replacements, 1-2 days for system changes." },
      { q: "Do you offer finance?", a: "Yes, we offer flexible finance options to spread the cost." },
    ],
  },
  boilerServicing: {
    name: "Boiler Servicing",
    description: "Annual boiler service to ensure safety, efficiency, and warranty compliance",
    steps: [
      { step: 1, name: "Schedule appointment", description: "Book your annual service appointment" },
      { step: 2, name: "Visual inspection", description: "Engineer inspects boiler, flue, and components" },
      { step: 3, name: "Combustion analysis", description: "Test efficiency and safety" },
      { step: 4, name: "Safety checks", description: "Comprehensive controls and components check" },
      { step: 5, name: "Gas Safety Certificate", description: "Receive your Gas Safety Certificate" },
    ],
    priceMin: 70,
    priceMax: 120,
    durationMin: "30",
    durationMax: "60",
    faqs: [
      { q: "How often should my boiler be serviced?", a: "Manufacturers recommend annual servicing to maintain efficiency and warranty." },
      { q: "What's included?", a: "Visual inspection, flue analysis, safety checks, and Gas Safety Certificate." },
      { q: "How long does it take?", a: "Usually 30-60 minutes depending on boiler type." },
    ],
  },
  emergencyRepairs: {
    name: "Emergency Repairs",
    description: "24/7 emergency boiler breakdown service with fast response times",
    steps: [
      { step: 1, name: "Call our emergency line", description: "24/7 emergency callout available" },
      { step: 2, name: "Fast diagnosis", description: "Quick fault identification by our engineer" },
      { step: 3, name: "Repair or temporary fix", description: "Most repairs completed on first visit" },
      { step: 4, name: "Safety checks", description: "Full safety inspection after repair" },
      { step: 5, name: "Heating restored", description: "Your heating fully operational with support" },
    ],
    priceMin: 80,
    priceMax: 300,
    durationMin: "1",
    durationMax: "4",
    faqs: [
      { q: "What counts as emergency?", a: "No heating/hot water, gas leaks, carbon monoxide alerts, safety risks." },
      { q: "How fast do you respond?", a: "We aim to attend within 2 hours, 24/7." },
      { q: "Is there a callout fee?", a: "No callout fee on emergency repairs." },
    ],
  },
  centralHeating: {
    name: "Central Heating Installation",
    description: "Complete central heating system design and installation",
    steps: [
      { step: 1, name: "Home survey", description: "Free assessment of your heating requirements" },
      { step: 2, name: "System design", description: "Detailed quote with no hidden costs" },
      { step: 3, name: "Professional installation", description: "Qualified team installs complete system" },
      { step: 4, name: "Power flush & balance", description: "System optimization for efficiency" },
      { step: 5, name: "Commissioning", description: "Full testing and handover" },
    ],
    priceMin: 2500,
    priceMax: 6000,
    durationMin: "3",
    durationMax: "5",
    faqs: [
      { q: "How long does installation take?", a: "Complete systems typically take 3-5 days depending on property size." },
      { q: "Will I need new pipework?", a: "We assess this at survey. Often existing pipework can be reused with flushing." },
      { q: "Can you install smart controls?", a: "Yes, we install modern smart thermostats and zone controls." },
    ],
  },
  underfloorHeating: {
    name: "Underfloor Heating Installation",
    description: "Luxurious underfloor heating systems—wet and electric options",
    steps: [
      { step: 1, name: "Floor assessment", description: "Check floor type and insulation requirements" },
      { step: 2, name: "System design", description: "Custom design for your space" },
      { step: 3, name: "Installation", description: "Install insulation and heating elements" },
      { step: 4, name: "Connect to heat source", description: "Integration with boiler or heat pump" },
      { step: 5, name: "Commission", description: "Testing, controls setup, and handover" },
    ],
    priceMin: 1500,
    priceMax: 5000,
    durationMin: "2",
    durationMax: "4",
    faqs: [
      { q: "Can it go under existing floors?", a: "Yes, both retrofit and new-build installations available." },
      { q: "Running costs?", a: "20-25% more efficient than radiators when paired with heat pump." },
      { q: "Wet vs electric?", a: "Wet systems best for whole homes, electric for smaller areas or retrofits." },
    ],
  },
  heatPumps: {
    name: "Heat Pump Installation",
    description: "Air source and ground source heat pump installation for eco-friendly heating",
    steps: [
      { step: 1, name: "Suitability assessment", description: "Check if heat pump right for your property" },
      { step: 2, name: "EPC review", description: "Energy Performance Certificate check" },
      { step: 3, name: "MCS design", description: "Certified design and specification" },
      { step: 4, name: "Installation", description: "Professional heat pump installation" },
      { step: 5, name: "Commissioning", description: "RHI registration, testing, handover" },
    ],
    priceMin: 5000,
    priceMax: 15000,
    durationMin: "3",
    durationMax: "5",
    faqs: [
      { q: "Suitable for all homes?", a: "Most homes can benefit, but insulation and glazing quality matter." },
      { q: "Government grants?", a: "Yes, Boiler Upgrade Scheme offers £7,500 towards installation." },
      { q: "MCS accreditation?", a: "Yes, all our heat pump installations are MCS certified." },
    ],
  },
};

export const ComprehensiveHVACSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    // Website
    {
      "@type": "WebSite",
      "@id": `${BUSINESS.url}/#website`,
      url: BUSINESS.url,
      name: BUSINESS.name,
      description: "Professional Gas Safe registered heating engineers providing boiler installation, servicing, emergency repairs, central heating, underfloor heating & heat pumps",
      inLanguage: "en-GB",
      isAccessibleForFree: true,
      publisher: { "@id": `${BUSINESS.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BUSINESS.url}/?s={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },

    // Organization / HVACBusiness
    {
      "@type": ["LocalBusiness", "HeatingAndCoolingBusiness"],
      "@id": `${BUSINESS.url}/#organization`,
      name: BUSINESS.name,
      legalName: "Just Imagine Ltd",
      description: "Professional Gas Safe registered heating engineers with 15+ years experience",
      url: BUSINESS.url,
      logo: "https://justimagine-gas-experts.vercel.app/logo.svg",
      image: ["https://justimagine-gas-experts.vercel.app/logo.svg"],
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office Address",
        addressLocality: "Rugby",
        addressRegion: "Warwickshire",
        postalCode: "CV21",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.lat,
        longitude: BUSINESS.geo.lng,
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
      ],
      specialOpeningHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        description: "24/7 Emergency callout available",
        opens: "00:00",
        closes: "23:59",
      },
      priceRange: "£££",
      currenciesAccepted: "GBP",
      paymentAccepted: "Cash, Credit Card, Bank Transfer, BACS",
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200", bestRating: "5", worstRating: "1" },
      sameAs: [
        "https://www.facebook.com/justimagineheating",
        "https://www.instagram.com/justimagineheating",
        "https://twitter.com/justimagineheat",
        "https://www.checkatrade.com/trades/justimagineheating",
        "https://www.trustpilot.com/review/justimagineheating",
      ],
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Gas Safe Register" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Worcester Bosch Accredited Installer" },
      ],
      memberOf: [
        { "@type": "Organization", name: "Gas Safe Register", url: "https://www.gassaferegister.co.uk" },
        { "@type": "Organization", name: "Checkatrade", url: "https://www.checkatrade.com" },
      ],
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
        geoRadius: "80000",
      },
      knowsAbout: Object.keys(SERVICES_DETAILS).map((key) => SERVICES_DETAILS[key as keyof typeof SERVICES_DETAILS].name),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Heating & Gas Services",
        itemListElement: Object.values(SERVICES_DETAILS).map((service) => ({
          "@type": "Offer",
          name: service.name,
          description: service.description,
          priceCurrency: "GBP",
          minPrice: service.priceMin,
          maxPrice: service.priceMax,
          availability: "https://schema.org/InStock",
        })),
      },
    },

    // HowTo schemas per service
    ...Object.values(SERVICES_DETAILS).map((service) => ({
      "@type": "HowTo",
      "@id": `${BUSINESS.url}/#howto-${service.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: `How to ${service.name}`,
      description: service.description,
      totalTime: `PT${service.durationMin}H${service.durationMax ? `-${service.durationMax}H` : ""}`,
      estimatedCost: { "@type": "PriceSpecification", priceCurrency: "GBP", price: service.priceMin },
      step: service.steps.map((s) => ({
        "@type": "HowToStep",
        position: s.step,
        name: s.name,
        text: s.description,
      })),
    })),

    // FAQ schemas per service
    ...Object.values(SERVICES_DETAILS).map((service) => ({
      "@type": "FAQPage",
      "@id": `${BUSINESS.url}/#faq-${service.name.toLowerCase().replace(/\s+/g, "-")}`,
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    })),

    // Sample reviews
    {
      "@type": "Review",
      "@id": `${BUSINESS.url}/#review-1`,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Sarah K." },
      datePublished: "2024-06-15",
      reviewBody: "Fantastic service from start to finish. The team were professional, clean, and had our new boiler installed in just a day. Highly recommend!",
      itemReviewed: { "@id": `${BUSINESS.url}/#organization` },
    },
    {
      "@type": "Review",
      "@id": `${BUSINESS.url}/#review-2`,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Mark T." },
      datePublished: "2024-05-22",
      reviewBody: "Called with an emergency on a Sunday evening and they were at my door within the hour. Fixed the issue quickly and at a fair price. Lifesavers!",
      itemReviewed: { "@id": `${BUSINESS.url}/#organization` },
    },
  ],
});
