// Central SEO + content data for dynamic service & location pages.
// Keep keyword density natural — local + service intent.

export type ServiceSlug =
  | "boiler-installation"
  | "boiler-repair"
  | "boiler-servicing"
  | "gas-safety-certificate"
  | "landlord-gas-safety"
  | "central-heating"
  | "plumbing"
  | "power-flushing"
  | "emergency-callout";

export type ServiceCategory = "installation" | "maintenance" | "safety" | "emergency" | "plumbing";

export interface Service {
  slug: ServiceSlug;
  name: string;
  short: string;
  category: ServiceCategory;
  h1: (area?: string) => string;
  metaTitle: (area?: string) => string;
  metaDesc: (area?: string) => string;
  intro: (area?: string) => string;
  bullets: string[];
  faqs: { q: string; a: string }[];
  priceFrom?: string;
  priceUnit?: string;
  icon: string;
}

const local = (area?: string) => (area ? ` in ${area}` : " in Rugby & Warwickshire");

export const SERVICES: Service[] = [
  {
    slug: "boiler-installation",
    name: "Boiler Installation",
    short: "New boilers from Worcester, Vaillant and Ideal — fitted by Gas Safe engineers with up to 12-year warranty.",
    category: "installation",
    icon: "flame",
    priceFrom: "£1,895",
    priceUnit: "fully installed",
    h1: (a) => `New Boiler Installation${local(a)}`,
    metaTitle: (a) => `New Boiler Installation${local(a)} | Gas Safe Fitters | Just Imagine`,
    metaDesc: (a) =>
      `Fixed-price new boiler installation${local(a)}. Worcester, Vaillant & Ideal combi, system & regular boilers. Gas Safe registered, up to 12-year warranty. Free quote.`,
    intro: (a) =>
      `Looking for a new boiler${local(a)}? We install A-rated models from Worcester Bosch, Vaillant, and Ideal with fixed prices and no hidden fees. Straight swap or full system conversion — we'll handle it smoothly and get you warm again fast.`,
    bullets: [
      "Free no-obligation quote — usually within 24 hours",
      "Worcester Accredited & Vaillant Advance installer-grade workmanship",
      "Up to 12-year manufacturer warranty on selected boilers",
      "Smart thermostat (Hive / Nest) included on most installs",
      "Chemical system flush & magnetic filter installation as standard",
      "Old boiler removal and eco-friendly disposal included",
      "Gas Safe certificate & Building Regulations notification provided",
      "Finance options available — 0% on selected models",
    ],
    faqs: [
      {
        q: "How much does a new boiler cost?",
        a: "A typical combi swap starts at £1,895 fully fitted. Prices vary based on the boiler model, flue requirements, and whether you're converting from a regular to a combi system. We always provide a fixed written quote before any work begins.",
      },
      {
        q: "How long does a boiler installation take?",
        a: "Most straight swaps are completed in a single day. Complex conversions or relocations can take 2–3 days. We ensure minimal disruption to your home and always leave the property clean and tidy.",
      },
      {
        q: "Which boiler brand is best?",
        a: "We recommend Worcester Bosch for reliability and long warranties, Vaillant for build quality, and Ideal for outstanding value. We'll help you choose the best fit for your home, heating demands and budget.",
      },
      {
        q: "Do you offer boiler finance?",
        a: "Yes, we work with partners to offer flexible finance options, including 0% interest on selected models. Ask for details during your free survey.",
      },
      {
        q: "Do I need Building Regulations approval for a new boiler?",
        a: "Yes — as Gas Safe registered engineers we self-certify all installations under Part P. You'll receive your certificate automatically. No separate council notification required.",
      },
    ],
  },
  {
    slug: "boiler-repair",
    name: "Boiler Repair",
    short: "Same-day boiler repair on all major makes — diagnostics, genuine parts, fixed price after assessment.",
    category: "maintenance",
    icon: "wrench",
    h1: (a) => `Boiler Repair${local(a)} — Same Day Where Possible`,
    metaTitle: (a) => `Boiler Repair${local(a)} | Same-Day Gas Safe Engineers`,
    metaDesc: (a) =>
      `Boiler not working${local(a)}? Gas Safe boiler repair on Worcester, Vaillant, Ideal, Baxi, Glow-worm. Diagnostics, genuine parts, honest quotes. Call 07774 079152.`,
    intro: (a) =>
      `Boiler not playing ball${local(a)}? We fix every major brand quickly and fairly. We'll diagnose the problem on day one, use genuine parts, and be honest about whether fixing or replacing makes more sense.`,
    bullets: [
      "Same-day callouts available across the area",
      "All major brands & error codes diagnosed",
      "Genuine OEM manufacturer parts used",
      "Fixed price after diagnosis — no hidden charges",
      "Workmanship & parts guaranteed in writing",
      "Honest advice — we'll tell you if repair isn't cost-effective",
    ],
    faqs: [
      {
        q: "How much is a boiler repair callout?",
        a: "Diagnostic visits start from £85 inc. VAT. If we recommend a repair, you approve the fixed price before any parts are fitted. No surprise invoices.",
      },
      {
        q: "Do you repair boilers out of hours?",
        a: "Yes — we run 24/7 emergency cover for no heat, no hot water and gas concerns. Out-of-hours rates are transparent and agreed upfront.",
      },
      {
        q: "My boiler shows an error code — do I need a repair?",
        a: "Not always. Many fault codes are triggered by low pressure or simple resets. Call us first and we'll talk you through it free of charge before booking a visit.",
      },
    ],
  },
  {
    slug: "boiler-servicing",
    name: "Boiler Service",
    short: "Annual boiler servicing from £75 — keeps your warranty valid, cuts bills, stops breakdowns.",
    category: "maintenance",
    icon: "shield-check",
    priceFrom: "£75",
    priceUnit: "per service",
    h1: (a) => `Annual Boiler Service${local(a)}`,
    metaTitle: (a) => `Boiler Service${local(a)} from £75 | Gas Safe Engineers`,
    metaDesc: (a) =>
      `Manufacturer-spec annual boiler service${local(a)} from £75. Keeps your warranty valid, lowers gas bills, prevents breakdowns. Same-day certificate. Book online.`,
    intro: (a) =>
      `Keep your boiler running smoothly${local(a)} with an annual service. We check everything, spot problems early, keep your warranty valid, and help you avoid surprise breakdowns when it's freezing.`,
    bullets: [
      "Manufacturer-specification service procedure",
      "Combustion analyser readings recorded and reported",
      "Magnetic filter clean & system pressure check",
      "Flue gas analysis & carbon monoxide check",
      "Service report & label issued same day",
      "Free 12-month reminder — never miss a service again",
      "Combined service + CP12 packages available (save 20%)",
    ],
    faqs: [
      {
        q: "How often should a boiler be serviced?",
        a: "Every 12 months. Most manufacturer warranties (Worcester, Vaillant, Ideal) require annual servicing or they become void. We send free reminders so you never miss it.",
      },
      {
        q: "What's included in a boiler service?",
        a: "Full appliance strip-down, gas inlet pressure test, combustion gas analysis, flue gas reading, casing seal check, condensate trap clean, system pressure verification, and a full written report.",
      },
      {
        q: "Can I get a service and CP12 at the same time?",
        a: "Yes — we offer a combined boiler service + gas safety certificate (CP12) for landlords at a reduced rate. Most landlords save around £25 compared to booking separately.",
      },
    ],
  },
  {
    slug: "gas-safety-certificate",
    name: "Gas Safety Certificate",
    short: "CP12 gas safety certificates from £60 — same-day digital issue for landlords and homeowners.",
    category: "safety",
    icon: "file-check",
    priceFrom: "£60",
    priceUnit: "per certificate",
    h1: (a) => `Gas Safety Certificate (CP12)${local(a)}`,
    metaTitle: (a) => `CP12 Gas Safety Certificate${local(a)} from £60 | Same Day`,
    metaDesc: (a) =>
      `Landlord & homeowner CP12 gas safety certificates${local(a)} from £60. Gas Safe registered. Same-day issue. Multi-property discounts for landlords & agents.`,
    intro: (a) =>
      `Need your landlord gas safety certificate${local(a)}? We test all your gas appliances and issue your CP12 certificate same day — digital copy sent to you and your agent straight away.`,
    bullets: [
      "All gas appliances, flues and pipework tested",
      "Same-day digital certificate sent to you and your agent",
      "Multi-property discounts for portfolios of 5+ properties",
      "Combined service + CP12 packages save up to 20%",
      "Free 30-day renewal reminder service",
      "Fully Gas Safe registered — verifiable on the public register",
    ],
    faqs: [
      {
        q: "How much is a landlord gas safety certificate?",
        a: "From £60 for a single-appliance property. £75 for properties with boiler, hob and fire. Ask about our portfolio rates — discounts for 5+ properties with a single letting agent.",
      },
      {
        q: "How long does a CP12 last?",
        a: "12 months from the date of inspection. We send free reminders 30 days before expiry so you're never in breach of your legal obligations.",
      },
      {
        q: "What happens if appliances fail the safety check?",
        a: "We provide a written report of any unsafe appliances with a recommended remedial action plan. We can carry out any repairs in the same visit where possible.",
      },
      {
        q: "Is a gas safety certificate a legal requirement?",
        a: "Yes — landlords are legally required to have a valid CP12 for all gas appliances in rented properties. Failure to comply can result in fines, prosecution and invalidated insurance.",
      },
    ],
  },
  {
    slug: "landlord-gas-safety",
    name: "Landlord Packages",
    short: "Annual CP12 + boiler service + priority emergency cover — one fixed price for portfolio landlords.",
    category: "safety",
    icon: "building",
    h1: (a) => `Landlord Gas Safety & Service Packages${local(a)}`,
    metaTitle: (a) => `Landlord Gas Safety Packages${local(a)} | CP12 + Boiler Service`,
    metaDesc: (a) =>
      `Landlord packages${local(a)}: CP12 + annual boiler service + priority callouts. Trusted by letting agents across Warwickshire. Portfolio discounts available.`,
    intro: (a) =>
      `Landlords and agents love this${local(a)} — one annual fee covers your CP12 safety certificate, boiler service, and priority emergency help. Compliance sorted, tenants looked after, paperwork done.`,
    bullets: [
      "Single annual fee — CP12 + full boiler service combined",
      "Priority emergency response for tenants (same day)",
      "Secure digital certificate library for your portfolio",
      "Direct invoicing to letting agents and property managers",
      "Multi-property discounts (5+ properties)",
      "Free reminder, rebooking & tenant coordination service",
      "Fully documented for HMRC and insurance purposes",
    ],
    faqs: [
      {
        q: "What does the landlord package include?",
        a: "Annual CP12 gas safety inspection, full boiler service, priority emergency callout, digital certificate storage and free renewal reminders. One invoice, everything covered.",
      },
      {
        q: "Do you work directly with letting agents?",
        a: "Yes — we work with several Warwickshire agencies. We coordinate access with tenants and invoice the agent directly, reducing admin for both parties.",
      },
      {
        q: "Can you manage multiple properties under one contract?",
        a: "Yes — our portfolio packages cover unlimited properties under a single annual agreement. Pricing is tiered by number of properties.",
      },
    ],
  },
  {
    slug: "central-heating",
    name: "Central Heating",
    short: "Radiators, pipework, smart controls and full system upgrades — installed properly.",
    category: "installation",
    icon: "thermometer",
    h1: (a) => `Central Heating Installation & Repair${local(a)}`,
    metaTitle: (a) => `Central Heating${local(a)} | Radiators, Pipework, Upgrades`,
    metaDesc: (a) =>
      `Central heating installs, upgrades & repairs${local(a)}. Radiators, pipework, smart thermostats, balancing & TRV fitting. Gas Safe registered.`,
    intro: (a) =>
      `Cold rooms, noisy radiators, uneven heating${local(a)}? We design and install heating systems that actually work — smart controls, properly balanced radiators, and zoned heating so you're comfortable everywhere.`,
    bullets: [
      "Radiator swaps, additions and relocations",
      "Smart thermostat & zoned heating installation (Hive, Nest, Honeywell)",
      "TRV fitting, system balancing and pressure optimisation",
      "Underfloor heating connection and commissioning",
      "Magnetic filter installation & inhibitor dosing",
      "Full new heating system design and installation",
    ],
    faqs: [
      {
        q: "How much does a new central heating system cost?",
        a: "Full new systems (boiler + radiators + pipework + smart controls) start from around £3,500 depending on the size of the property and complexity. We provide fixed written quotes.",
      },
      {
        q: "Why are some radiators cold?",
        a: "This is usually magnetite sludge, air locks, or an imbalanced system. We diagnose the root cause first — sometimes bleeding the system resolves it, but a power flush may be needed.",
      },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    short: "Leaks, taps, cylinders, bathrooms — reliable local plumbers with no call-out fee on booked jobs.",
    category: "plumbing",
    icon: "droplets",
    h1: (a) => `Plumbing Services${local(a)}`,
    metaTitle: (a) => `Plumber${local(a)} | Leaks, Taps, Cylinders, Bathrooms`,
    metaDesc: (a) =>
      `Reliable plumbers${local(a)} for leaks, taps, valves, hot water cylinders, bathroom & kitchen plumbing. No call-out fee on booked jobs.`,
    intro: (a) =>
      `Local plumbers you can trust${local(a)} — dripping taps, leaks, burst pipes, or a full bathroom refit. Fast for emergencies, fixed prices for planned work, and we clean up after ourselves.`,
    bullets: [
      "Leaks, burst pipes & emergency isolations",
      "Taps, mixers, showers & pressure valves",
      "Hot water cylinders (vented & unvented G3 qualified)",
      "Bathroom & kitchen plumbing and fixture fitting",
      "Outside taps, stopcocks & isolation valves",
      "Mains water pressure checks & regulator fitting",
    ],
    faqs: [
      {
        q: "Do you handle unvented hot water cylinders?",
        a: "Yes — our engineers hold G3 unvented cylinder qualifications, legally required for working on stored hot water systems above 15 litres.",
      },
      {
        q: "Do you charge a call-out fee?",
        a: "No call-out fee on pre-booked plumbing jobs. Emergency same-day response has a standard diagnostic fee, agreed before we visit.",
      },
    ],
  },
  {
    slug: "power-flushing",
    name: "Power Flushing",
    short: "Full system power flush from £395 — clears sludge, restores radiator heat, protects your boiler.",
    category: "maintenance",
    icon: "zap",
    priceFrom: "£395",
    priceUnit: "per system",
    h1: (a) => `Central Heating Power Flush${local(a)}`,
    metaTitle: (a) => `Power Flush${local(a)} from £395 | Restore Heating Performance`,
    metaDesc: (a) =>
      `Magnetite sludge in your radiators${local(a)}? Professional power flush from £395. Restores heat output, lowers bills, protects your boiler warranty.`,
    intro: (a) =>
      `Radiators cold at the bottom, boiler making noise, or black sludge coming out${local(a)}? A power flush clears the muck, gets your heat back, and keeps your new boiler warranty safe.`,
    bullets: [
      "Full chemical & high-velocity magnetic flush",
      "Heat output tested before and after the flush",
      "Inhibitor dosed & magnetic filter fitted as standard",
      "Written system report — required by most boiler warranties",
      "Includes filter installation where not already present",
    ],
    faqs: [
      {
        q: "How do I know if I need a power flush?",
        a: "Signs include cold spots at the bottom of radiators, black or brown water when bleeding, noisy boiler, or slow heat-up times. We'll assess the system and confirm before recommending.",
      },
      {
        q: "Does a new boiler require a power flush?",
        a: "Most manufacturers (Worcester, Vaillant) require a system flush and filter installation as a warranty condition. We include this as standard on all boiler installs.",
      },
    ],
  },
  {
    slug: "emergency-callout",
    name: "24/7 Emergency Callout",
    short: "No heat, no hot water, gas leak — Gas Safe engineers on call day and night across Warwickshire.",
    category: "emergency",
    icon: "clock",
    h1: (a) => `24/7 Emergency Heating & Gas Engineer${local(a)}`,
    metaTitle: (a) => `Emergency Gas Engineer${local(a)} | 24/7 No Heat & Gas Leaks`,
    metaDesc: (a) =>
      `24/7 emergency boiler, heating & gas leak response${local(a)}. Gas Safe engineers on call. No heat, no hot water, suspected gas leak — call 07774 079152 now.`,
    intro: (a) =>
      `Heating gone at 11pm or something smells like gas at 6am${local(a)}? You'll get a real engineer, not a call centre. We're here 24/7, every day of the year.`,
    bullets: [
      "No heat / no hot water — rapid response",
      "Suspected gas leaks — make safe & repair",
      "Burst pipes & uncontrolled water leaks",
      "Boiler lockouts, error codes & pressure loss",
      "Transparent out-of-hours pricing — agreed before we attend",
      "Direct engineer line — no call centres",
    ],
    faqs: [
      {
        q: "What qualifies as a gas emergency?",
        a: "Any suspected gas leak, carbon monoxide alarm activation, total loss of heating in winter, or a boiler fault causing flooding. If in doubt, call us and we'll advise immediately.",
      },
      {
        q: "What should I do if I smell gas?",
        a: "Stop using all appliances, don't use switches, open windows, leave the property and call the National Gas Emergency line on 0800 111 999. Then call us for the repair once declared safe.",
      },
      {
        q: "How quickly can you attend an emergency?",
        a: "We aim to respond within 60–90 minutes for emergencies in our core area (Rugby, Leamington, Warwick, Coventry). Response times may vary at peak periods.",
      },
    ],
  },
];

export interface Area {
  slug: string;
  name: string;
  county: string;
  blurb: string;
  postcodes: string[];
  landmarks?: string[];
  referralNote?: string;
  /** Approximate centroid for geofencing / Google Maps schema. */
  geo?: { lat: number; lng: number };
  /** Effective service radius in km from the centroid. */
  radiusKm?: number;
  /** Service tier: "both" = 1h repairs + 2h installs, "installs-only" = 2h installs only, "call-for-quote" = outside service area */
  serviceTier?: "both" | "installs-only" | "call-for-quote";
}

export const PRICING = [
  {
    name: "Boiler Service",
    price: "£100",
    unit: "per year",
    popular: true,
    features: [
      "Full manufacturer-spec service",
      "Combustion analysis report",
      "Magnetic filter clean",
      "Safety certificate same day",
      "12-month reminder included",
    ],
  },
  {
    name: "Boiler Repair",
    price: "£100",
    unit: "from",
    features: [
      "Same-day diagnostics on all major brands",
      "Genuine OEM parts guaranteed",
      "Fixed price after assessment",
      "Workmanship warranty included",
      "All brands covered",
    ],
  },
  {
    name: "Landlord CP12",
    price: "£120",
    unit: "per certificate",
    features: [
      "Up to 2 gas appliances",
      "Digital copy issued same day",
      "Free renewal reminder service",
      "Agency direct invoicing",
      "Portfolio discounts for 5+",
    ],
  },
  {
    name: "Landlord Bundle",
    price: "£120",
    unit: "CP12 + full service",
    popular: false,
    badge: "Best Value",
    features: [
      "Annual CP12 included",
      "Full boiler service included",
      "Priority emergency response",
      "Single invoice to agent or landlord",
    ],
  },
  {
    name: "Boiler Installation",
    price: "£2,500",
    unit: "starting from",
    features: [
      "A-rated boiler supplied & fitted",
      "Up to 12-year manufacturer warranty",
      "Magnetic filter & system flush",
      "Smart thermostat option",
      "Building Regs certificate included",
    ],
  },
  {
    name: "System Conversion",
    price: "£3,200",
    unit: "starting from",
    features: [
      "Full heating system upgrade",
      "Pipework reconfiguration included",
      "New radiators and controls",
      "Building Regs certification",
      "Commissioning and balancing",
    ],
  },
  {
    name: "Radiator Installation",
    price: "£100",
    unit: "horizontal from",
    features: [
      "Horizontal radiator replacement or installation",
      "Pressure tested and balanced",
      "TRV valves fitted",
      "Magnetic filter optional",
    ],
  },
  {
    name: "Vertical Radiator",
    price: "£150",
    unit: "from",
    features: [
      "Vertical radiator replacement or installation",
      "Modern designer options available",
      "Balanced and tested",
      "Aesthetically integrated",
    ],
  },
  {
    name: "Gas Hob/Cooker Installation",
    price: "£120",
    unit: "from",
    features: [
      "Gas hob or cooker installation",
      "Safe connection and certification",
      "All brands supported",
      "Gas Safe certificate provided",
    ],
  },
  {
    name: "Unvented Cylinder",
    price: "£1,200",
    unit: "fit & supply",
    features: [
      "Unvented cylinder replacement or installation",
      "Full fitting service included",
      "Building Regs certification",
      "Pressure and temperature relief included",
    ],
  },
  {
    name: "Disconnecting Appliances",
    price: "£80",
    unit: "per appliance",
    features: [
      "Safe disconnection of existing appliances",
      "Capped off properly",
      "Certificate provided",
    ],
  },
  {
    name: "Emergency Callout",
    price: "£120",
    unit: "diagnostic fee",
    features: [
      "24/7 response — day & night",
      "Transparent out-of-hours rates",
      "All major brands diagnosed",
      "Fixed repair price after assessment",
    ],
  },
];

export const REVIEWS = [
  {
    name: "James T.",
    area: "Rugby",
    rating: 5,
    text: "Just Imagine installed a new Worcester boiler for us. Fast, tidy, and a great price. Highly recommended.",
    date: "2024-01-15",
  },
  {
    name: "Sarah L.",
    area: "Leamington Spa",
    rating: 5,
    text: "Emergency callout late on a Sunday. They arrived within 40 minutes and fixed the leak immediately. Lifesavers!",
    date: "2024-02-02",
  },
  {
    name: "David M.",
    area: "Warwick",
    rating: 5,
    text: "Always use them for our annual service and CP12s across our rental portfolio. Professional and reliable every time.",
    date: "2023-11-20",
  },
  {
    name: "Helen K.",
    area: "Kenilworth",
    rating: 5,
    text: "Boiler broke down on the coldest day of the year. Called at 7am, engineer was here by 9am and it was fixed by noon. Exceptional service.",
    date: "2024-01-08",
  },
  {
    name: "Mark S.",
    area: "Coventry",
    rating: 5,
    text: "Straightforward honest quote for a new Vaillant boiler. No upselling, no hidden costs. Installed cleanly in one day.",
    date: "2023-12-05",
  },
  {
    name: "Rachel W.",
    area: "Stratford-upon-Avon",
    rating: 5,
    text: "Manage 8 properties and Just Imagine handle all my CP12s and boiler services. They deal directly with the letting agent — absolute lifesavers.",
    date: "2024-03-01",
  },
  {
    name: "Tom B.",
    area: "Nuneaton",
    rating: 5,
    text: "Power flush made a huge difference — radiators heat up evenly for the first time in years. Should have done it years ago.",
    date: "2023-10-14",
  },
  {
    name: "Angela F.",
    area: "Rugby",
    rating: 5,
    text: "Third year in a row using Just Imagine for our annual service. Never had a problem, always professional and on time.",
    date: "2024-02-20",
  },
  {
    name: "Chris P.",
    area: "Warwick",
    rating: 5,
    text: "Smart thermostat fitted alongside the new boiler — the whole setup is brilliant. Very impressed with the quality of work.",
    date: "2024-01-29",
  },
  {
    name: "Priya N.",
    area: "Leamington Spa",
    rating: 5,
    text: "As a first-time landlord the CP12 process seemed daunting. Just Imagine sorted everything, even coordinating with my tenant for access.",
    date: "2024-04-10",
  },
  {
    name: "Stuart A.",
    area: "Bedworth",
    rating: 5,
    text: "Very fair price for a boiler repair. Diagnosed it on the first visit, parts came next day. No fuss.",
    date: "2023-09-30",
  },
  {
    name: "Joanne R.",
    area: "Kenilworth",
    rating: 5,
    text: "Treated the house with complete respect. Dust sheets down, hoovered up after — you'd never know they'd been. Brilliant.",
    date: "2024-03-18",
  },
];

export const AREAS: Area[] = [
  {
    slug: "rugby",
    name: "Rugby",
    county: "Warwickshire",
    postcodes: ["CV21", "CV22", "CV23"],
    landmarks: ["Rugby town centre", "Bilton", "Hillmorton", "Cawston", "Brownsover", "Newbold"],
    blurb:
      "Our home town. We know Rugby inside out — from Bilton to Hillmorton, Cawston to Brownsover. Same-day emergencies when you need us.",
    referralNote:
      "Based here, we usually reach you within an hour for emergencies across all Rugby postcodes.",
    geo: { lat: 52.3704, lng: -1.2658 },
    radiusKm: 12,
    serviceTier: "both",
  },
  {
    slug: "leamington-spa",
    name: "Leamington Spa",
    county: "Warwickshire",
    postcodes: ["CV31", "CV32", "CV33"],
    landmarks: ["Leamington town centre", "Lillington", "Whitnash", "Sydenham", "Milverton"],
    blurb:
      "Regency homes, Victorian terraces, new-builds — we work across all of Leamington Spa.",
    referralNote:
      "From Lillington's Victorian terraces to Whitnash's new estates, we know what works in every property type here.",
    geo: { lat: 52.2852, lng: -1.52 },
    radiusKm: 10,
    serviceTier: "both",
  },
  {
    slug: "warwick",
    name: "Warwick",
    county: "Warwickshire",
    postcodes: ["CV34", "CV35"],
    landmarks: ["Warwick town centre", "Woodloes Park", "Chase Meadow", "Hatton", "Barford"],
    blurb:
      "Boiler engineers across Warwick — Woodloes Park, Chase Meadow, and Hatton. Quick fixes, new installs, CP12s.",
    referralNote:
      "Warwick's got everything from period homes to modern builds — we've fitted combi boilers, repaired old gas fires, and serviced everything in between.",
    geo: { lat: 52.2823, lng: -1.5849 },
    radiusKm: 10,
    serviceTier: "both",
  },
  {
    slug: "kenilworth",
    name: "Kenilworth",
    county: "Warwickshire",
    postcodes: ["CV8"],
    landmarks: ["Kenilworth town centre", "Burton Green", "Balsall Common", "Berkswell"],
    blurb: "Local engineers serving Kenilworth, Burton Green and the surrounding villages.",
    referralNote:
      "Kenilworth's larger homes and system boilers are our bread and butter — we handle them all.",
    geo: { lat: 52.347, lng: -1.571 },
    radiusKm: 10,
    serviceTier: "both",
  },
  {
    slug: "stratford-upon-avon",
    name: "Stratford-upon-Avon",
    county: "Warwickshire",
    postcodes: ["CV37"],
    landmarks: ["Stratford town centre", "Shottery", "Bishopton", "Tiddington", "Welford-on-Avon"],
    blurb:
      "Boiler installs, repairs, plumbing and CP12s across Stratford and the surrounding villages.",
    referralNote:
      "We help holiday let managers and landlords stay compliant — annual CP12s, quick fixes, and emergency cover when guests need warmth.",
    geo: { lat: 52.1917, lng: -1.7083 },
    radiusKm: 14,
    serviceTier: "both",
  },
  {
    slug: "coventry",
    name: "Coventry",
    county: "West Midlands",
    postcodes: ["CV1", "CV2", "CV3", "CV4", "CV5", "CV6"],
    landmarks: ["Coventry city centre", "Earlsdon", "Cheylesmore", "Tile Hill", "Stoke", "Binley"],
    blurb:
      "Boiler repair, installs and emergency cover across Coventry — same-day response where possible.",
    referralNote:
      "Coventry's got plenty of rental properties — we do dozens of landlord CP12 checks and portfolio packages every month. Quick turnaround, digital certificates same day.",
    geo: { lat: 52.4068, lng: -1.5197 },
    radiusKm: 12,
    serviceTier: "both",
  },
  {
    slug: "nuneaton",
    name: "Nuneaton",
    county: "Warwickshire",
    postcodes: ["CV10", "CV11"],
    landmarks: ["Nuneaton town centre", "Whitestone", "Weddington", "Galley Common"],
    blurb: "Boiler repair, servicing and installations across Nuneaton and Weddington.",
    referralNote:
      "We know Nuneaton's housing stock well — ex-council properties, older homes, new builds. Fair prices, practical heating work that lasts.",
    geo: { lat: 52.523, lng: -1.4659 },
    radiusKm: 10,
    serviceTier: "both",
  },
  {
    slug: "bedworth",
    name: "Bedworth",
    county: "Warwickshire",
    postcodes: ["CV12"],
    landmarks: ["Bedworth town centre", "Bulkington", "Exhall", "Ash Green"],
    blurb: "Local boiler installs, services and emergency callouts across Bedworth and Bulkington.",
    referralNote:
      "Bedworth's compact geography means we're usually on-site quickly — a bonus when you have a heating emergency.",
    geo: { lat: 52.479, lng: -1.472 },
    radiusKm: 8,
    serviceTier: "both",
  },
  {
    slug: "southam",
    name: "Southam",
    county: "Warwickshire",
    postcodes: ["CV47"],
    landmarks: ["Southam town centre", "Long Itchington", "Napton-on-the-Hill", "Stockton"],
    blurb: "Boiler repairs, servicing and new installs across Southam and the villages around it.",
    referralNote:
      "Rural Southam's got plenty of older homes and oil-to-gas conversions. We're comfortable with the full spectrum — from traditional systems to modern combis.",
    geo: { lat: 52.2493, lng: -1.3899 },
    radiusKm: 10,
    serviceTier: "both",
  },
  {
    slug: "atherstone",
    name: "Atherstone",
    county: "Warwickshire",
    postcodes: ["CV9"],
    landmarks: ["Atherstone town centre", "Mancetter", "Hartshill", "Polesworth"],
    blurb: "Boiler engineers, plumbing and CP12 certificates across Atherstone and Mancetter.",
    referralNote:
      "We know the north Warwickshire villages well — reliable service across Atherstone, Hartshill, and Polesworth.",
    geo: { lat: 52.579, lng: -1.547 },
    radiusKm: 10,
    serviceTier: "both",
  },
  {
    slug: "alcester",
    name: "Alcester",
    county: "Warwickshire",
    postcodes: ["B49"],
    landmarks: ["Alcester town centre", "Kinwarton", "Arrow", "Great Alne"],
    blurb: "Trusted boiler engineers serving Alcester and the Arden villages.",
    referralNote:
      "The Forest of Arden villages around Alcester mix old and new — we're equally comfortable with period cottages and modern new-builds.",
    geo: { lat: 52.215, lng: -1.869 },
    radiusKm: 10,
    serviceTier: "both",
  },
  {
    slug: "shipston-on-stour",
    name: "Shipston-on-Stour",
    county: "Warwickshire",
    postcodes: ["CV36"],
    landmarks: ["Shipston town centre", "Tredington", "Long Compton", "Ilmington"],
    blurb: "Boiler installs, repairs and emergency cover across Shipston and the south Warwickshire villages.",
    referralNote:
      "South Warwickshire's quiet, but we cover it fully. Travel further than we would closer to Rugby, but we're committed to reaching every corner.",
    geo: { lat: 52.0625, lng: -1.6258 },
    radiusKm: 12,
    serviceTier: "both",
  },
  {
    slug: "leicester",
    name: "Leicester",
    county: "Leicestershire",
    postcodes: ["LE1", "LE2", "LE3", "LE4", "LE5"],
    landmarks: ["Leicester city centre", "Narborough", "Braunstone", "Oadby", "Wigston", "Glenfield"],
    blurb: "Boiler installs, repairs and emergency cover across Leicester — within one hour from Rugby.",
    referralNote:
      "Leicester's got Victorian terraces and new estates. We've worked on both, across every neighbourhood.",
    geo: { lat: 52.6369, lng: -1.1398 },
    radiusKm: 15,
    serviceTier: "both",
  },
  {
    slug: "northampton",
    name: "Northampton",
    county: "Northamptonshire",
    postcodes: ["NN1", "NN2", "NN3", "NN4", "NN5"],
    landmarks: ["Northampton town centre", "Wellingborough", "Kingsthorpe", "Duston", "Abington", "Upton"],
    blurb: "Boiler installs, repairs and CP12s across Northampton — within one hour from Rugby.",
    referralNote:
      "Northampton's got Victorians and new builds. Whatever your heating setup, we've worked on it.",
    geo: { lat: 52.2411, lng: -0.8812 },
    radiusKm: 14,
    serviceTier: "both",
  },
  {
    slug: "corby",
    name: "Corby",
    county: "Northamptonshire",
    postcodes: ["NN17", "NN18"],
    landmarks: ["Corby town centre", "Kettering", "Desborough", "East Carlton", "Welland", "Rockingham"],
    blurb: "Boiler repairs and installations across Corby and North Northamptonshire.",
    referralNote:
      "Corby's got older homes and new builds. We work on residential and commercial heating equally well.",
    geo: { lat: 52.4907, lng: -0.7498 },
    radiusKm: 13,
    serviceTier: "both",
  },
  {
    slug: "banbury",
    name: "Banbury",
    county: "Oxfordshire",
    postcodes: ["OX16", "OX17"],
    landmarks: ["Banbury town centre", "Kidlington", "Deddington", "Adderbury", "Wroxton", "Bloxham"],
    blurb: "Boiler engineers across Banbury and North Oxfordshire — installs, repairs, and emergency cover.",
    referralNote:
      "Banbury's historic market town and the surrounding stone cottages need heating work you can trust. We know period properties well.",
    geo: { lat: 52.0598, lng: -1.3381 },
    radiusKm: 13,
    serviceTier: "both",
  },
];

export const BUSINESS = {
  name: "Just Imagine Ltd",
  legalName: "Just Imagine Ltd",
  companyNumber: "15441163",
  companiesHouseUrl: "https://find-and-update.company-information.service.gov.uk/company/15441163",
  phone: "07774 079152",
  phoneE164: "+447774079152",
  whatsapp: "447774079152",
  email: "justimagineheating@gmail.com",
  url: "https://justimagine.ltd",
  street: "Rugby",
  city: "Rugby",
  region: "Warwickshire",
  postcode: "CV21",
  country: "GB",
  geo: { lat: 52.3704, lng: -1.2658 },
  priceRange: "££",
  openingHours: "Mo-Sa 07:00-20:00",
  emergencyHours: "24/7",
  gasSafeNumber: "—",
  founded: "2010",
  // Canonical service categories for schema + keyword use
  serviceTypes: [
    "Boiler Installation",
    "Boiler Servicing",
    "Boiler Repair",
    "Gas Cooker Installation",
    "Gas Pipework",
    "Gas Fire Servicing",
    "Radiator Installation",
    "Central Heating",
    "Emergency Call Outs",
    "CP12 Gas Safety Certificates",
    "Power Flushing",
    "Plumbing",
  ],
  // Google Business Profile description
  profileDescription:
    "Professional Plumber for Boiler & Central Heating Services in Rugby. Whether you require a reliable Plumber in Rugby or find yourself in need of an Emergency Plumber in Rugby, we've got you covered. Our plumbing services near Rugby ensure you receive top-notch solutions for any plumbing issue, be it big or small. Trust in our long-standing reputation for quality and service.",
  slogan: "Heating you can trust. Prices that make sense.",
};

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);

/* ---------------------------------------------------------------------------
 * Geofence — primary service area as a single polygon (rough convex hull
 * around Rugby + Warwickshire towns) + GeoCircle for radius targeting.
 * Used by JSON-LD areaServed and on the /areas page map embed.
 * ---------------------------------------------------------------------------
 */
export const GEOFENCE = {
  centre: { lat: 52.3204, lng: -1.5200 },
  radiusKm: 35,
  /** Closed polygon (lat,lng pairs, last point repeats first). */
  polygon: [
    [52.5790, -1.5470], // Atherstone
    [52.5230, -1.4659], // Nuneaton
    [52.4068, -1.5197], // Coventry
    [52.3704, -1.2658], // Rugby
    [52.2493, -1.3899], // Southam
    [52.0625, -1.6258], // Shipston-on-Stour
    [52.1917, -1.7083], // Stratford-upon-Avon
    [52.2150, -1.8690], // Alcester
    [52.2823, -1.5849], // Warwick
    [52.3470, -1.5710], // Kenilworth
    [52.5790, -1.5470], // close
  ] as [number, number][],
};

/* ---------------------------------------------------------------------------
 * News / blog content (file-driven, no CMS).
 * ---------------------------------------------------------------------------
 */
export type NewsCategory =
  | "Boilers"
  | "Safety"
  | "Landlords"
  | "Pricing"
  | "Local"
  | "FAQ"
  | "How-To"
  | "Manual";

export type NewsKind = "article" | "faq" | "howto" | "manual";

export interface HowToStep {
  name: string;
  text: string;
  /** Optional safety / warning note rendered next to the step. */
  warning?: string;
}

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string; // ISO
  author: string;
  category: NewsCategory;
  kind: NewsKind;
  tags: string[];
  cover?: string;
  /** For kind === "faq" */
  faqs?: { q: string; a: string }[];
  /** For kind === "howto" */
  howto?: {
    totalTime?: string; // ISO 8601 duration e.g. "PT5M"
    tools?: string[];
    supplies?: string[];
    steps: HowToStep[];
  };
  /** For kind === "manual" — quick reference sections */
  sections?: { heading: string; body: string[] }[];
}

export const NEWS: NewsPost[] = [
  {
    slug: "boiler-upgrade-grants-warwickshire-2026",
    title: "Boiler Upgrade Scheme 2026 — what Warwickshire homeowners need to know",
    excerpt:
      "The latest BUS grant changes mean larger contributions for heat pumps and clearer eligibility for Warwickshire homes. Here's the practical summary.",
    body: [
      "The Boiler Upgrade Scheme (BUS) continues to fund low-carbon heating across England. From early 2026 the standard grant for an air-source heat pump remains £7,500 — and qualifying Warwickshire homeowners can stack it with manufacturer rebates.",
      "Eligibility still rests on EPC validity, an existing wet heating system and Microgeneration Certification Scheme installation. We can survey your property and confirm in one visit.",
      "If a heat pump is not the right fit, A-rated condensing combi boilers from Worcester Bosch, Vaillant and Ideal remain the most cost-effective like-for-like upgrade.",
    ],
    date: "2026-04-12",
    author: "Just Imagine Engineering Team",
    category: "Boilers",
    kind: "article",
    tags: ["Boiler Upgrade Scheme", "Heat pumps", "Grants", "Warwickshire"],
  },
  {
    slug: "landlord-cp12-changes-2026",
    title: "Landlord CP12 changes 2026 — what's new for Rugby & Coventry agents",
    excerpt:
      "Tightened record-keeping rules and digital certificate expectations are reshaping landlord compliance. Here's how to stay ahead.",
    body: [
      "Letting agents across Rugby, Leamington and Coventry are reporting more local-authority audits this year. A valid CP12 is now expected to be supplied digitally within 28 days of inspection.",
      "Our portfolio packages already include same-day digital issue, secure storage and renewal reminders — keeping you compliant without admin overhead.",
      "Bundling CP12 with an annual boiler service typically saves landlords ~£25 per property and reduces emergency callouts the following winter.",
    ],
    date: "2026-03-02",
    author: "Just Imagine Engineering Team",
    category: "Landlords",
    kind: "article",
    tags: ["CP12", "Landlord", "Compliance"],
  },
  {
    slug: "winter-no-heat-checklist",
    title: "No heat? A 5-minute checklist before you call an engineer",
    excerpt:
      "Most boiler lockouts are resolved in under five minutes. Try these steps first — then call us if heating isn't restored.",
    body: [
      "Most no-heat call-outs we attend in winter are resolved in minutes — low pressure, a tripped reset, or a flat thermostat battery. Work through the steps below before booking an engineer.",
    ],
    date: "2026-01-20",
    author: "Just Imagine Engineering Team",
    category: "How-To",
    kind: "howto",
    tags: ["Troubleshooting", "Boiler repair", "Winter"],
    howto: {
      totalTime: "PT5M",
      tools: ["Towel", "Phone (for boiler manual)"],
      supplies: [],
      steps: [
        {
          name: "Check system pressure",
          text: "Look at the pressure gauge on the boiler front. It should read 1.0–1.5 bar when cold. If it's below 1.0, top up via the filling loop until it reads 1.2 bar.",
        },
        {
          name: "Reset the boiler",
          text: "Hold the reset button for 5 seconds (or follow your manufacturer's reset procedure). Note any error code that appears.",
        },
        {
          name: "Verify gas and thermostat",
          text: "Confirm the gas isolator at the meter is on and other gas appliances work. Replace thermostat batteries if the screen is blank.",
        },
        {
          name: "Bleed the radiators",
          text: "If pressure is fine but rooms are cold, bleed each radiator with a key until water (not air) escapes, then re-check pressure.",
          warning: "Turn the heating off and let radiators cool before bleeding to avoid scalds.",
        },
        {
          name: "Call a Gas Safe engineer",
          text: "If the fault returns, call 07774 079152. We diagnose every major brand on the first visit and quote a fixed price before any repair.",
        },
      ],
    },
  },
  {
    slug: "boiler-pressure-faq",
    title: "Boiler pressure FAQ — answers to the questions we get every winter",
    excerpt:
      "Why does pressure drop? When is it dangerous? When should you stop topping up and call us? Common boiler-pressure questions answered.",
    body: [
      "Pressure issues are by far the most common winter call we receive. These are the questions we answer most often — bookmark this page for next time the gauge starts misbehaving.",
    ],
    date: "2026-02-08",
    author: "Just Imagine Engineering Team",
    category: "FAQ",
    kind: "faq",
    tags: ["Boiler pressure", "FAQ", "Maintenance"],
    faqs: [
      {
        q: "What is the correct boiler pressure?",
        a: "When cold, most domestic combi boilers should read 1.0–1.5 bar. When hot, pressure can rise to ~2.0 bar — that's normal. Anything above 2.5 bar may indicate a faulty expansion vessel.",
      },
      {
        q: "Why does my boiler pressure keep dropping?",
        a: "The most common causes are a small leak somewhere in the system, a failed pressure relief valve, or air in the radiators. If you're topping up more than once a month, book a diagnostic visit.",
      },
      {
        q: "Is it safe to keep topping up the pressure?",
        a: "Topping up to 1.2 bar is safe and routine. However, if you have to top up weekly, the underlying issue should be diagnosed — repeated top-ups dilute system inhibitor and can cause sludge build-up.",
      },
      {
        q: "Why is my boiler pressure too high?",
        a: "Usually because the filling loop was left slightly open, or the expansion vessel has lost charge. We can re-pressurise the vessel and isolate the cause in one visit.",
      },
      {
        q: "Will low pressure damage my boiler?",
        a: "It won't damage the boiler immediately — modern boilers lock out and display a fault code instead. But persistent low pressure causes intermittent heating and short-cycling that can shorten component life.",
      },
    ],
  },
  {
    slug: "annual-boiler-service-checklist",
    title: "Annual boiler service — what a proper service actually includes",
    excerpt:
      "A reference guide for homeowners and landlords showing exactly what's checked, measured and recorded during a manufacturer-spec annual service.",
    body: [
      "This manual lists every check we carry out on a standard annual boiler service. It's the same procedure required by most manufacturers (Worcester Bosch, Vaillant, Ideal) to keep your warranty valid.",
    ],
    date: "2026-03-15",
    author: "Just Imagine Engineering Team",
    category: "Manual",
    kind: "manual",
    tags: ["Boiler service", "Manual", "Reference"],
    sections: [
      {
        heading: "1. Visual inspection",
        body: [
          "External casing condition and seal integrity",
          "Flue terminal location and clearances vs current Building Regs",
          "Condensate pipe routing and frost protection",
          "Gas and water pipework, supports and isolation valves",
        ],
      },
      {
        heading: "2. Combustion analysis",
        body: [
          "Calibrated flue gas analyser readings (CO, CO₂, ratio)",
          "Comparison against manufacturer benchmark commissioning data",
          "Adjustment of gas valve where the appliance permits it",
        ],
      },
      {
        heading: "3. Component checks",
        body: [
          "Condensate trap clean and refill",
          "Magnetic system filter clean and inspection",
          "Expansion vessel pre-charge pressure check",
          "PRV (pressure relief valve) discharge test",
        ],
      },
      {
        heading: "4. Documentation issued",
        body: [
          "Service report and benchmark log update",
          "Gas Safe service label fixed to the appliance",
          "Digital copy emailed to homeowner / managing agent",
          "Renewal reminder scheduled for 11 months",
        ],
      },
    ],
  },
  {
    slug: "landlord-compliance-manual",
    title: "Landlord gas-safety compliance — the complete reference manual",
    excerpt:
      "A landlord-friendly manual covering CP12 frequency, record-keeping, tenant access, and what happens if an inspection fails.",
    body: [
      "Use this manual as a quick reference for your statutory gas safety obligations as a landlord in England. It is not legal advice — but it is the procedure we follow with our agency partners across Warwickshire.",
    ],
    date: "2026-02-25",
    author: "Just Imagine Engineering Team",
    category: "Manual",
    kind: "manual",
    tags: ["Landlord", "CP12", "Compliance", "Manual"],
    sections: [
      {
        heading: "Inspection frequency",
        body: [
          "Every gas appliance, fitting and flue must be checked at least every 12 months by a Gas Safe registered engineer.",
          "A new CP12 must be issued before the previous one expires; backdating is not permitted.",
        ],
      },
      {
        heading: "Record-keeping",
        body: [
          "Keep CP12 records for at least 2 years.",
          "Tenants must be given a copy within 28 days of inspection (or before move-in for new tenants).",
        ],
      },
      {
        heading: "Tenant access",
        body: [
          "Give 24 hours' written notice for routine inspections.",
          "If access is repeatedly refused, document attempts in writing — these records are key evidence for HSE compliance.",
        ],
      },
      {
        heading: "If an appliance fails",
        body: [
          "Unsafe appliances are flagged At Risk (AR) or Immediately Dangerous (ID).",
          "ID classification means the appliance is disconnected on-site with the tenant's knowledge and Gas Emergency Service notified where required.",
          "Remedial work and a fresh CP12 must follow before the appliance is brought back into use.",
        ],
      },
    ],
  },
];

export const getNews = (slug: string) => NEWS.find((n) => n.slug === slug);

