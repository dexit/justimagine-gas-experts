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
      `Fast, fixed-price boiler installation${local(a)} from Gas Safe registered engineers. We specialise in high-efficiency A-rated boilers from Worcester Bosch, Vaillant, and Ideal. Whether you need a straight combi swap or a full system conversion, we provide expert installation, system balancing, and full certification.`,
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
      `Boiler broken down${local(a)}? We repair every major brand — Worcester, Vaillant, Ideal, Baxi, Glow-worm, Potterton and more. Diagnostics on the first visit, genuine parts only, and an honest answer if a replacement is the better call.`,
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
      `A proper annual boiler service${local(a)} keeps your manufacturer warranty valid, cuts your gas bill and stops 90% of winter breakdowns before they start. Full strip-down, combustion analysis, flue test and written report — every time.`,
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
      `Legally required CP12 gas safety certificates${local(a)} for landlords, letting agents and homeowners. We test every gas appliance, flue and pipework, then issue your certificate the same day — usually before we leave.`,
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
      `Built for landlords and letting agents${local(a)} — bundle your CP12 gas safety certificate, annual boiler service and priority emergency cover into one fixed annual price. Compliance handled, tenants happy, paperwork in your inbox.`,
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
      `Cold rooms, noisy radiators, uneven heating${local(a)}? We design, install and upgrade full central heating systems — radiators, pipework, smart controls and zoned heating — for homes that actually feel warm.`,
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
      `Trusted local plumbing${local(a)} — from a dripping tap to a full bathroom refit. Same-day for leaks and burst pipes, fixed-price for planned work. Tidy, certified and properly insured.`,
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
      `Cold spots in radiators${local(a)}, noisy boiler, black sludge in the system? A professional power flush clears years of magnetite, restores heat output, and protects your new boiler warranty.`,
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
      `When the heat goes out at 11pm or there's a gas smell at 6am${local(a)}, you need a real engineer on the phone — not a call centre. We answer day and night, every day of the year.`,
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
}

export const PRICING = [
  {
    name: "Boiler Service",
    price: "£75",
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
    name: "Landlord CP12",
    price: "£60",
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
      "Save ~£25 vs booking separately",
      "Priority emergency response",
      "Single invoice to agent or landlord",
    ],
  },
  {
    name: "Combi Swap",
    price: "£1,895",
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
    name: "Power Flush",
    price: "£395",
    unit: "per system",
    features: [
      "High-velocity chemical flush",
      "Heat output tested before & after",
      "Inhibitor dose & filter fitted",
      "Written system report provided",
    ],
  },
  {
    name: "Emergency Callout",
    price: "£85",
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
      "Our home town. We cover every street from Bilton to Hillmorton, Cawston to Brownsover — usually same-day for emergencies.",
    referralNote:
      "Based in Rugby ourselves, we typically arrive within 60 minutes for emergency callouts across all Rugby postcodes.",
  },
  {
    slug: "leamington-spa",
    name: "Leamington Spa",
    county: "Warwickshire",
    postcodes: ["CV31", "CV32", "CV33"],
    landmarks: ["Leamington town centre", "Lillington", "Whitnash", "Sydenham", "Milverton"],
    blurb:
      "Regency homes, Victorian terraces and new-build estates — we install and service boilers across all of Royal Leamington Spa.",
    referralNote:
      "We're regulars in Leamington Spa — from the Victorian terraces of Lillington to the new-builds in Whitnash, we know the heating challenges of every era of property here.",
  },
  {
    slug: "warwick",
    name: "Warwick",
    county: "Warwickshire",
    postcodes: ["CV34", "CV35"],
    landmarks: ["Warwick town centre", "Woodloes Park", "Chase Meadow", "Hatton", "Barford"],
    blurb:
      "Gas Safe heating engineers covering Warwick town, Woodloes Park, Chase Meadow and Hatton.",
    referralNote:
      "Warwick's mix of older period properties and modern estates means we regularly work on everything from original gas fires to cutting-edge combi systems here.",
  },
  {
    slug: "kenilworth",
    name: "Kenilworth",
    county: "Warwickshire",
    postcodes: ["CV8"],
    landmarks: ["Kenilworth town centre", "Burton Green", "Balsall Common", "Berkswell"],
    blurb: "Trusted local engineers serving Kenilworth, Burton Green and the surrounding villages.",
    referralNote:
      "Kenilworth's affluent detached homes often feature system boilers and larger radiator circuits — we're well-equipped to handle the full range.",
  },
  {
    slug: "stratford-upon-avon",
    name: "Stratford-upon-Avon",
    county: "Warwickshire",
    postcodes: ["CV37"],
    landmarks: ["Stratford town centre", "Shottery", "Bishopton", "Tiddington", "Welford-on-Avon"],
    blurb:
      "Boilers, plumbing and landlord certificates across Stratford-upon-Avon and the surrounding villages.",
    referralNote:
      "We work with several holiday let and rental landlords in Stratford — keeping their properties compliant and guests warm year-round.",
  },
  {
    slug: "coventry",
    name: "Coventry",
    county: "West Midlands",
    postcodes: ["CV1", "CV2", "CV3", "CV4", "CV5", "CV6"],
    landmarks: ["Coventry city centre", "Earlsdon", "Cheylesmore", "Tile Hill", "Stoke", "Binley"],
    blurb:
      "Same-day boiler repair and installation across Coventry — Earlsdon, Cheylesmore, Stoke and Tile Hill.",
    referralNote:
      "Coventry's large student and rental market means CP12 certificates and landlord packages are in constant demand — we handle dozens of Coventry properties every month.",
  },
  {
    slug: "nuneaton",
    name: "Nuneaton",
    county: "Warwickshire",
    postcodes: ["CV10", "CV11"],
    landmarks: ["Nuneaton town centre", "Whitestone", "Weddington", "Galley Common"],
    blurb: "Heating and gas engineers serving Nuneaton, Whitestone and Weddington.",
    referralNote:
      "We cover Nuneaton's mix of ex-council and private housing — reliable, practical heating work at fair prices.",
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
  },
  {
    slug: "southam",
    name: "Southam",
    county: "Warwickshire",
    postcodes: ["CV47"],
    landmarks: ["Southam town centre", "Long Itchington", "Napton-on-the-Hill", "Stockton"],
    blurb: "Gas Safe engineers covering Southam, Long Itchington and Napton-on-the-Hill.",
    referralNote:
      "Rural Southam properties often have older systems and oil conversions — we're experienced with the full spectrum.",
  },
  {
    slug: "atherstone",
    name: "Atherstone",
    county: "Warwickshire",
    postcodes: ["CV9"],
    landmarks: ["Atherstone town centre", "Mancetter", "Hartshill", "Polesworth"],
    blurb: "Heating, plumbing and CP12 certificates across Atherstone, Mancetter and Hartshill.",
    referralNote:
      "We cover the north Warwickshire corridor reliably — including the villages around Atherstone.",
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
  },
  {
    slug: "shipston-on-stour",
    name: "Shipston-on-Stour",
    county: "Warwickshire",
    postcodes: ["CV36"],
    landmarks: ["Shipston town centre", "Tredington", "Long Compton", "Ilmington"],
    blurb: "Gas Safe heating cover across Shipston-on-Stour and the south Warwickshire villages.",
    referralNote:
      "South Warwickshire's rural character means we travel further — but we're committed to covering every corner of the county.",
  },
];

export const BUSINESS = {
  name: "Just Imagine Ltd",
  legalName: "Just Imagine Ltd",
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
  gasSafeNumber: "—",
  founded: "2010",
};

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);
