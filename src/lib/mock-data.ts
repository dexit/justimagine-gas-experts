// Mock data fixtures for demo/development

export const MOCK_SERVICES = [
  {
    id: "svc-001",
    name: "Emergency Boiler Repair",
    category: "Emergency",
    keywords: "emergency boiler repair same day",
    description: "24/7 emergency boiler repair service. Same-day response for critical heating failures.",
    cta: "Get Emergency Help",
    bulletPoints: [
      "24/7 response guarantee",
      "Same-day repair in most areas",
      "No callout charge for confirmed issues",
    ],
    pricing: "From £89",
    areas: ["London", "Manchester", "Birmingham"],
  },
  {
    id: "svc-002",
    name: "Annual Boiler Service",
    category: "Maintenance",
    keywords: "annual boiler service gas safety check",
    description: "Keep your boiler running safely and efficiently with our annual service.",
    cta: "Book Service",
    bulletPoints: [
      "Full safety inspection",
      "Efficiency optimization",
      "1-year manufacturer warranty",
    ],
    pricing: "From £129",
    areas: ["London", "Manchester", "Birmingham", "Leeds"],
  },
  {
    id: "svc-003",
    name: "Central Heating Installation",
    category: "Installation",
    keywords: "central heating system installation",
    description: "New central heating system installation with expert guidance.",
    cta: "Get Quote",
    bulletPoints: [
      "Expert design consultation",
      "5-year parts warranty",
      "Energy-efficient solutions",
    ],
    pricing: "From £1,200",
    areas: ["London", "Manchester", "Birmingham"],
  },
];

export const MOCK_AREAS = [
  {
    id: "area-001",
    name: "London",
    description: "Central and Greater London coverage",
    postcode: "SW1A",
    cta: "Request Service in London",
    coverageZone: "25 miles from central London",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: "area-002",
    name: "Manchester",
    description: "Manchester and surrounding areas",
    postcode: "M1",
    cta: "Request Service in Manchester",
    coverageZone: "20 miles from Manchester city centre",
    lat: 53.4808,
    lng: -2.2426,
  },
  {
    id: "area-003",
    name: "Birmingham",
    description: "Birmingham and West Midlands",
    postcode: "B1",
    cta: "Request Service in Birmingham",
    coverageZone: "25 miles from Birmingham city centre",
    lat: 52.5086,
    lng: -1.8753,
  },
];

export const MOCK_ANALYTICS = {
  ga4: {
    sessions: 12450,
    users: 8920,
    bounce: 42.3,
    avgDuration: 234,
  },
  gsc: {
    clicks: 3420,
    impressions: 45680,
    ctr: 7.5,
    position: 12.3,
  },
  clarity: {
    sessionsRecorded: 1250,
    avgDuration: 187,
    errorRate: 2.1,
  },
  bing: {
    clicks: 890,
    impressions: 12450,
  },
  funnel: {
    visitors: 10000,
    formStarts: 2500,
    formSubmitted: 1200,
    confirmed: 450,
    booked: 380,
  },
};

export const MOCK_LOGS = [
  {
    id: "log-001",
    timestamp: new Date(Date.now() - 2000000).toISOString(),
    type: "form" as const,
    message: "Lead form submitted: Emergency boiler repair",
    details: {
      refId: "REF-2024-001234",
      name: "John Smith",
      phone: "07700 123456",
      postcode: "CV1 1AA",
      service: "emergency-boiler",
      area: "coventry",
    },
  },
  {
    id: "log-002",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    type: "api" as const,
    message: "API call: /api/services - Success",
    details: {
      endpoint: "/api/services",
      method: "GET",
      status: 200,
      duration: 145,
    },
  },
  {
    id: "log-003",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    type: "error" as const,
    message: "Payment processing error - Stripe API timeout",
    details: {
      errorCode: "STRIPE_TIMEOUT",
      retries: 3,
      lastAttempt: new Date().toISOString(),
    },
  },
  {
    id: "log-004",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    type: "form" as const,
    message: "Lead form submitted: Annual service",
    details: {
      refId: "REF-2024-001235",
      name: "Sarah Johnson",
      phone: "07701 654321",
      postcode: "B1 1AA",
      service: "annual-service",
      area: "birmingham",
    },
  },
];
