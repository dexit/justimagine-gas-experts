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

export interface Service {
  slug: ServiceSlug;
  name: string;
  short: string;
  h1: (area?: string) => string;
  metaTitle: (area?: string) => string;
  metaDesc: (area?: string) => string;
  intro: (area?: string) => string;
  bullets: string[];
  faqs: { q: string; a: string }[];
  priceFrom?: string;
}

const local = (area?: string) => (area ? ` in ${area}` : " in Rugby & Warwickshire");

export const SERVICES: Service[] = [
  {
    slug: "boiler-installation",
    name: "Boiler Installation",
    short: "New boiler installs — Worcester, Vaillant, Ideal — fitted by Gas Safe engineers.",
    priceFrom: "£1,895",
    h1: (a) => `New Boiler Installation${local(a)}`,
    metaTitle: (a) => `New Boiler Installation${local(a)} | Gas Safe Fitters | Just Imagine`,
    metaDesc: (a) =>
      `Fixed-price new boiler installation${local(a)}. Worcester, Vaillant & Ideal combi, system & regular boilers. Gas Safe registered, up to 12-year warranty. Free quote.`,
    intro: (a) =>
      `Fast, fixed-price boiler installation${local(a)} from Gas Safe registered engineers. Combi, system and regular boilers from Worcester Bosch, Vaillant and Ideal — installed properly, certified, and backed by manufacturer warranties up to 12 years.`,
    bullets: [
      "Free no-obligation quote — usually within 24 hours",
      "Worcester Accredited & Vaillant Advance installer-grade workmanship",
      "Up to 12-year manufacturer warranty",
      "Smart thermostat (Hive / Nest) included on most installs",
      "Old boiler removed, system flushed, magnetic filter fitted",
      "Gas Safe certificate & Building Regulations notification included",
    ],
    faqs: [
      { q: "How much does a new boiler cost?", a: "A typical combi swap starts at £1,895 fully fitted. System and regular boilers, complex flues or relocations vary — we give a fixed written quote before any work begins." },
      { q: "How long does a boiler installation take?", a: "A straight combi swap is usually 1 day. Conversions or relocations take 2–3 days. We dust-sheet, vacuum and leave your home tidy." },
      { q: "Do you offer 0% finance on new boilers?", a: "Yes — we work with manufacturer-backed finance partners on Worcester and Vaillant boilers. Ask for terms when we quote." },
    ],
  },
  {
    slug: "boiler-repair",
    name: "Boiler Repair",
    short: "Same-day boiler repair on all major makes — diagnostics, parts, fixed.",
    h1: (a) => `Boiler Repair${local(a)} — Same Day Where Possible`,
    metaTitle: (a) => `Boiler Repair${local(a)} | Same-Day Gas Safe Engineers`,
    metaDesc: (a) =>
      `Boiler not working${local(a)}? Gas Safe boiler repair on Worcester, Vaillant, Ideal, Baxi, Glow-worm. Diagnostics, genuine parts, honest quotes. Call 07774 079152.`,
    intro: (a) =>
      `Boiler broken down${local(a)}? We repair every major brand — Worcester, Vaillant, Ideal, Baxi, Glow-worm, Potterton and more. Diagnostics on the first visit, genuine parts only, and an honest answer if a replacement is the better call.`,
    bullets: [
      "Same-day callouts available across the area",
      "All major brands & error codes diagnosed",
      "Genuine manufacturer parts",
      "Fixed price after diagnosis — no surprises",
      "Workmanship & parts guaranteed in writing",
    ],
    faqs: [
      { q: "How much is a boiler repair callout?", a: "Diagnostic visits start from £85 inc. VAT. If we recommend a repair you approve the fixed price before any parts are fitted." },
      { q: "Do you repair boilers out of hours?", a: "Yes — we run 24/7 emergency cover for no heat, no hot water and gas concerns." },
    ],
  },
  {
    slug: "boiler-servicing",
    name: "Boiler Service",
    short: "Annual boiler servicing — keeps your warranty valid and your home safe.",
    priceFrom: "£75",
    h1: (a) => `Annual Boiler Service${local(a)}`,
    metaTitle: (a) => `Boiler Service${local(a)} from £75 | Gas Safe Engineers`,
    metaDesc: (a) =>
      `Manufacturer-spec annual boiler service${local(a)} from £75. Keeps your warranty valid, lowers gas bills, prevents breakdowns. Same-day certificate. Book online.`,
    intro: (a) =>
      `A proper annual boiler service${local(a)} keeps your manufacturer warranty valid, cuts your gas bill and stops 90% of winter breakdowns before they start. Full strip-down, combustion analysis, flue test and written report — every time.`,
    bullets: [
      "Manufacturer-specification service procedure",
      "Combustion analyser readings recorded",
      "Magnetic filter clean & system pressure check",
      "Service report & sticker issued same day",
      "Reminder sent every 12 months — automatically",
    ],
    faqs: [
      { q: "How often should a boiler be serviced?", a: "Every 12 months. Most manufacturer warranties become void if you skip a year." },
      { q: "What's included in the service?", a: "Full appliance strip-down where required, gas inlet pressure test, combustion analysis, flue gas reading, casing seal check, condensate trap clean, system pressure, written report." },
    ],
  },
  {
    slug: "gas-safety-certificate",
    name: "Gas Safety Certificate",
    short: "CP12 gas safety certificates — same-day issue available.",
    priceFrom: "£60",
    h1: (a) => `Gas Safety Certificate (CP12)${local(a)}`,
    metaTitle: (a) => `CP12 Gas Safety Certificate${local(a)} from £60 | Same Day`,
    metaDesc: (a) =>
      `Landlord & homeowner CP12 gas safety certificates${local(a)} from £60. Gas Safe registered. Same-day issue. Multi-property discounts for landlords & agents.`,
    intro: (a) =>
      `Legally required CP12 gas safety certificates${local(a)} for landlords, letting agents and homeowners. We test every gas appliance, flue and pipework, then issue your certificate the same day — usually before we leave.`,
    bullets: [
      "All gas appliances, flues and pipework tested",
      "Same-day digital certificate to you & your agent",
      "Multi-property discounts for portfolios of 5+",
      "Combined service + CP12 packages save 20%",
      "Reminder service to keep you legally compliant",
    ],
    faqs: [
      { q: "How much is a landlord gas safety certificate?", a: "From £60 for a single appliance property. £75 with boiler, hob & fire. Discounts for portfolios — ask about our agent rates." },
      { q: "How long does a CP12 last?", a: "12 months from the date of inspection. We send free reminders 30 days before expiry." },
    ],
  },
  {
    slug: "landlord-gas-safety",
    name: "Landlord Packages",
    short: "Bundled CP12 + boiler service + cover for portfolio landlords and agents.",
    h1: (a) => `Landlord Gas Safety & Service Packages${local(a)}`,
    metaTitle: (a) => `Landlord Gas Safety Packages${local(a)} | CP12 + Boiler Service`,
    metaDesc: (a) =>
      `Landlord packages${local(a)}: CP12 + annual boiler service + priority callouts. Trusted by letting agents across Warwickshire. Portfolio discounts.`,
    intro: (a) =>
      `Built for landlords and letting agents${local(a)} — bundle your CP12 gas safety certificate, annual boiler service and priority emergency cover into one fixed annual price. Compliance handled, tenants happy, paperwork in your inbox.`,
    bullets: [
      "Single annual fee — CP12 + service combined",
      "Priority emergency response for tenants",
      "Digital certificate library for your portfolio",
      "Direct invoicing to letting agents",
      "Multi-property discounts (5+ properties)",
      "Free reminder & re-booking service",
    ],
    faqs: [
      { q: "What does the landlord package include?", a: "Annual CP12 gas safety inspection, full boiler service, priority emergency callout, digital certificate storage and free renewal reminders." },
      { q: "Do you work directly with letting agents?", a: "Yes — we work with several Warwickshire agencies. We coordinate access with tenants and invoice the agent directly." },
    ],
  },
  {
    slug: "central-heating",
    name: "Central Heating",
    short: "Radiators, pipework, system upgrades and smart heating controls.",
    h1: (a) => `Central Heating Installation & Repair${local(a)}`,
    metaTitle: (a) => `Central Heating${local(a)} | Radiators, Pipework, Upgrades`,
    metaDesc: (a) =>
      `Central heating installs, upgrades & repairs${local(a)}. Radiators, pipework, smart thermostats, balancing & TRV fitting. Gas Safe registered.`,
    intro: (a) =>
      `Cold rooms, noisy radiators, uneven heating${local(a)}? We design, install and upgrade full central heating systems — radiators, pipework, smart controls and zoned heating — for homes that actually feel warm.`,
    bullets: [
      "Radiator swaps, additions and relocations",
      "Smart thermostat & zoned heating setup",
      "TRV fitting & system balancing",
      "Underfloor heating connection",
      "Magnetic filter & inhibitor dosing",
    ],
    faqs: [],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    short: "Leaks, taps, valves, cylinders and full bathroom plumbing.",
    h1: (a) => `Plumbing Services${local(a)}`,
    metaTitle: (a) => `Plumber${local(a)} | Leaks, Taps, Cylinders, Bathrooms`,
    metaDesc: (a) =>
      `Reliable plumbers${local(a)} for leaks, taps, valves, hot water cylinders, bathroom & kitchen plumbing. No call-out fee on booked jobs.`,
    intro: (a) =>
      `Trusted local plumbing${local(a)} — from a dripping tap to a full bathroom refit. Same-day for leaks and burst pipes, fixed-price for planned work. Tidy, certified and properly insured.`,
    bullets: [
      "Leaks, burst pipes & emergency isolations",
      "Taps, mixers, showers & valves",
      "Hot water cylinders (vented & unvented G3)",
      "Bathroom & kitchen plumbing",
      "Outside taps, stopcocks & isolation valves",
    ],
    faqs: [],
  },
  {
    slug: "power-flushing",
    name: "Power Flushing",
    short: "Full system power flush — clears sludge, restores heat, protects your boiler.",
    priceFrom: "£395",
    h1: (a) => `Central Heating Power Flush${local(a)}`,
    metaTitle: (a) => `Power Flush${local(a)} from £395 | Restore Heating Performance`,
    metaDesc: (a) =>
      `Magnetite sludge in your radiators${local(a)}? Professional power flush from £395. Restores heat output, lowers bills, protects your boiler warranty.`,
    intro: (a) =>
      `Cold spots in radiators${local(a)}, noisy boiler, black sludge in the system? A professional power flush clears years of magnetite, restores heat output, and protects your new boiler warranty.`,
    bullets: [
      "Full chemical & magnetic flush",
      "Heat output tested before & after",
      "Inhibitor dosed & magnetic filter fitted",
      "Written report — required by most boiler warranties",
    ],
    faqs: [],
  },
  {
    slug: "emergency-callout",
    name: "24/7 Emergency Callout",
    short: "No heat, no hot water, gas leak — round-the-clock response.",
    h1: (a) => `24/7 Emergency Heating & Gas Engineer${local(a)}`,
    metaTitle: (a) => `Emergency Plumber & Gas Engineer${local(a)} | 24/7 Callouts`,
    metaDesc: (a) =>
      `24/7 emergency boiler, heating, plumbing & gas leak response${local(a)}. Gas Safe engineers on call. Call 07774 079152 now.`,
    intro: (a) =>
      `When the heat goes out at 11pm or there's a gas smell at 6am${local(a)}, you need a real engineer on the phone — not a call centre. We answer day and night.`,
    bullets: [
      "No heat / no hot water — fast response",
      "Suspected gas leaks — make safe & repair",
      "Burst pipes & uncontrolled leaks",
      "Boiler lockouts & error codes",
      "Honest pricing — no out-of-hours rip-offs",
    ],
    faqs: [],
  },
];

export interface Area {
  slug: string;
  name: string;
  county: string;
  blurb: string;
  postcodes: string[];
}

export const AREAS: Area[] = [
  { slug: "rugby", name: "Rugby", county: "Warwickshire", postcodes: ["CV21", "CV22", "CV23"], blurb: "Our home town. We cover every street from Bilton to Hillmorton, Cawston to Brownsover — usually same-day for emergencies." },
  { slug: "leamington-spa", name: "Leamington Spa", county: "Warwickshire", postcodes: ["CV31", "CV32", "CV33"], blurb: "Regency homes, Victorian terraces and new-build estates — we install and service boilers across all of Royal Leamington Spa." },
  { slug: "warwick", name: "Warwick", county: "Warwickshire", postcodes: ["CV34", "CV35"], blurb: "Gas Safe heating engineers covering Warwick town, Woodloes Park, Chase Meadow and Hatton." },
  { slug: "kenilworth", name: "Kenilworth", county: "Warwickshire", postcodes: ["CV8"], blurb: "Trusted local engineers serving Kenilworth, Burton Green and the surrounding villages." },
  { slug: "stratford-upon-avon", name: "Stratford-upon-Avon", county: "Warwickshire", postcodes: ["CV37"], blurb: "Boilers, plumbing and landlord certificates across Stratford-upon-Avon and the surrounding villages." },
  { slug: "coventry", name: "Coventry", county: "West Midlands", postcodes: ["CV1", "CV2", "CV3", "CV4", "CV5", "CV6"], blurb: "Same-day boiler repair and installation across Coventry — Earlsdon, Cheylesmore, Stoke and Tile Hill." },
  { slug: "nuneaton", name: "Nuneaton", county: "Warwickshire", postcodes: ["CV10", "CV11"], blurb: "Heating and gas engineers serving Nuneaton, Whitestone and Weddington." },
  { slug: "bedworth", name: "Bedworth", county: "Warwickshire", postcodes: ["CV12"], blurb: "Local boiler installs, services and emergency callouts across Bedworth and Bulkington." },
  { slug: "southam", name: "Southam", county: "Warwickshire", postcodes: ["CV47"], blurb: "Gas Safe engineers covering Southam, Long Itchington and Napton-on-the-Hill." },
  { slug: "atherstone", name: "Atherstone", county: "Warwickshire", postcodes: ["CV9"], blurb: "Heating, plumbing and CP12 certificates across Atherstone, Mancetter and Hartshill." },
  { slug: "alcester", name: "Alcester", county: "Warwickshire", postcodes: ["B49"], blurb: "Trusted boiler engineers serving Alcester and the Arden villages." },
  { slug: "shipston-on-stour", name: "Shipston-on-Stour", county: "Warwickshire", postcodes: ["CV36"], blurb: "Gas Safe heating cover across Shipston-on-Stour and the south Warwickshire villages." },
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
