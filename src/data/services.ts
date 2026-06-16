// Service data: Just Imagine Gas Experts. Homeowners + Landlords only. No commercial.
// Static-first with optional KV/DB fallback. Data accuracy guaranteed.
// Base area: Rugby (CV21-23). Service radius: 1 hour around Rugby (Leicester, Northampton, Corby, Coventry, Warwick, Banbury)

export type ServiceSlug = 
  | "boiler-repairs"
  | "boiler-servicing"
  | "emergency-callout"
  | "boiler-installation"
  | "system-conversion"
  | "radiator-installation"
  | "gas-hob-cooker"
  | "unvented-cylinder"
  | "landlord-gas-certificate"
  | "plumbing-services";

export type ServiceCategory = "repair" | "maintenance" | "installation" | "emergency" | "landlord";

export interface Service {
  slug: ServiceSlug;
  name: string;
  category: ServiceCategory;
  price: { from: number; unit: string };
  duration?: string;
  description: string;
  bullets: string[];
  faqs: { q: string; a: string }[];
  icon: string;
}

export const SERVICES: Service[] = [
  {
    slug: "boiler-repairs",
    name: "Boiler Repairs",
    category: "repair",
    price: { from: 100, unit: "callout" },
    duration: "1 hour",
    description: "Professional boiler repair service. All major makes covered. Gas Safe registered engineers. Fixed pricing after diagnosis.",
    icon: "wrench",
    bullets: [
      "Same-day or next-day appointments available",
      "All major brands: Worcester, Vaillant, Ideal, Baxi, Glow-worm, Potterton",
      "Free diagnostic visit included — fixed price quoted before repair begins",
      "Genuine OEM parts only",
      "12-month parts and workmanship warranty",
      "Emergency 24/7 callouts available",
    ],
    faqs: [
      { q: "How quickly can you attend?", a: "Within 1 hour around Rugby. Same-day response usually available before noon. Emergency callouts 24/7." },
      { q: "What's included in the £100 callout?", a: "Full diagnostic visit, fault code reading, system pressure check, and fixed repair quote. You only pay for repairs if you approve." },
      { q: "Do you replace parts or repair?", a: "We assess honestly. If repair is economical, we do that. If the part is beyond repair or too expensive to fix, we recommend replacement." },
      { q: "Why is my boiler leaking?", a: "Could be pressure relief valve, pump seal, or heat exchanger crack. We diagnose during the visit and quote repair cost." },
    ],
  },
  {
    slug: "boiler-servicing",
    name: "Boiler Servicing",
    category: "maintenance",
    price: { from: 100, unit: "service" },
    duration: "45 minutes",
    description: "Annual boiler servicing keeps your system running efficiently and maintains warranty. Includes safety checks, cleaning, and full documentation.",
    icon: "checkCircle",
    bullets: [
      "Annual servicing extends boiler life and warranty coverage",
      "Full system pressure and safety checks included",
      "Combustion testing to ensure efficiency and safety",
      "Cleaning of heat exchanger and burner unit",
      "Fault code scan for early problem detection",
      "Service certificate issued for landlord/warranty purposes",
      "Free carbon monoxide safety check",
    ],
    faqs: [
      { q: "How often should I service my boiler?", a: "Annually. Boiler manufacturers require annual servicing for warranty coverage. Essential if you're a landlord." },
      { q: "What does £100 servicing include?", a: "Full diagnostic, safety checks, combustion testing, cleaning, and service certificate. No hidden costs." },
      { q: "Is annual servicing required?", a: "Yes — manufacturers require it for warranty. For landlords, it's a legal requirement for gas safety. For homeowners, it prevents costly breakdowns." },
      { q: "When should I book servicing?", a: "September–November before winter. We can arrange annual reminders if you prefer." },
    ],
  },
  {
    slug: "emergency-callout",
    name: "Emergency Callout (24/7)",
    category: "emergency",
    price: { from: 120, unit: "callout" },
    duration: "1 hour typical",
    description: "No heat? No hot water? Gas smell? We're available 24 hours a day, 7 days a week for genuine emergencies. Rapid response from Rugby area.",
    icon: "alert",
    bullets: [
      "24/7 emergency availability — weekends, evenings, bank holidays",
      "Rapid response: typically within 1 hour of Rugby",
      "Gas leak specialist assessment available",
      "No heat, no hot water, boiler lockout — all covered",
      "Fixed pricing given before work begins",
      "All repairs covered by 12-month warranty",
    ],
    faqs: [
      { q: "What counts as an emergency?", a: "No heat/hot water, boiler lockout/won't ignite, gas smell, water leaking from boiler, no response to thermostat." },
      { q: "How fast can you get here?", a: "Typically within 1 hour from Rugby. Response varies in winter depending on call volume, but we prioritize safety issues." },
      { q: "What's the £120 callout for?", a: "That's the emergency attendance fee. Once diagnosed, we quote repair costs separately. You approve before we proceed." },
      { q: "Are you Gas Safe registered for emergency work?", a: "Yes. All our engineers are Gas Safe certified and insured for emergency repairs." },
    ],
  },
  {
    slug: "boiler-installation",
    name: "Boiler Installation",
    category: "installation",
    price: { from: 2500, unit: "fully fitted" },
    duration: "1–2 days typical",
    description: "New boiler installation from Worcester, Vaillant, or Ideal. Gas Safe registered, up to 12-year warranty. Fixed pricing, no hidden charges.",
    icon: "flame",
    bullets: [
      "Worcester Accredited & Vaillant Advance installer — full warranties honoured",
      "Free no-obligation survey — quoted same/next day",
      "Fixed written price — what you're quoted is what you pay",
      "Combi swaps completed in 1 day, conversions 2–3 days",
      "Old boiler removed and responsibly disposed of",
      "Building Regulations certification issued automatically",
      "Up to 12-year manufacturer warranty available",
      "0% finance available on selected models",
    ],
    faqs: [
      { q: "What's the typical timeline from survey to installation?", a: "Survey this week, installation next week usually. We're flexible around your schedule." },
      { q: "Do I need planning permission?", a: "No. As Gas Safe engineers, we self-certify. You get the Building Regulations certificate automatically." },
      { q: "What if I need a system conversion?", a: "Converting from gravity to combi, or vice versa, takes 2–3 days. We'll power flush and fit a magnetic filter as part of the work." },
      { q: "Why should I choose Worcester over Vaillant or Ideal?", a: "Worcester has the longest warranties and best reliability track record. Vaillant is premium build quality. Ideal offers best value. We'll recommend based on your home and budget." },
    ],
  },
  {
    slug: "system-conversion",
    name: "System Conversion",
    category: "installation",
    price: { from: 3200, unit: "fully fitted" },
    duration: "2–3 days",
    description: "Convert from gravity to combi, or vice versa. Full system power flush, magnetic filter, new boiler. Complete system upgrade.",
    icon: "refresh",
    bullets: [
      "Gravity to combi conversion — single boiler for heat and hot water",
      "Combi to system conversion — high-demand homes benefit from separate tank",
      "Full power flush included to remove sludge and magnetite",
      "Magnetic filter fitted to protect new boiler",
      "Pipework pressure tested and certified",
      "New thermostat and controls fitted",
      "Building Regulations notification provided",
    ],
    faqs: [
      { q: "Should I convert to combi?", a: "If you have one bathroom and low hot water demand, combi is perfect. Multiple bathrooms? System or heat battery might be better." },
      { q: "How long does the conversion take?", a: "Typically 2–3 days depending on pipework layout. We work efficiently and aim to minimize disruption." },
      { q: "Will I have hot water during the work?", a: "We'll arrange temporary provisions. Most conversions have water back on by end of day 2." },
      { q: "Why power flush before a conversion?", a: "Sludge in the system destroys new boilers. Power flush removes it. New boiler warranties require it." },
    ],
  },
  {
    slug: "radiator-installation",
    name: "Radiator Installation",
    category: "installation",
    price: { from: 100, unit: "horizontal; £150 vertical" },
    duration: "2–4 hours typical",
    description: "Horizontal or vertical radiator replacement and new installations. Horizontal from £100, vertical from £150. Fit and supply available.",
    icon: "thermometer",
    bullets: [
      "Horizontal radiator replacement/installation: from £100",
      "Vertical radiator replacement/installation: from £150",
      "Fit and supply packages available",
      "Radiators removed and disposed of",
      "Full system pressure check before and after",
      "Thermostatic radiator valves (TRVs) can be fitted",
      "Work includes balancing the system",
    ],
    faqs: [
      { q: "What's the difference between horizontal and vertical radiators?", a: "Horizontal are standard wall-mounted. Vertical take up less wall space and look modern. Both heat equally — vertical just costs more due to design." },
      { q: "Can you supply the radiator?", a: "Yes. We offer fit-and-supply packages at competitive prices. Or bring your own radiator and we'll install it." },
      { q: "Will you remove the old radiator?", a: "Yes, removed and disposed of responsibly." },
      { q: "Do I need a new thermostat when fitting new radiators?", a: "Not necessarily. Existing thermostat usually works fine. We'll advise during the visit." },
    ],
  },
  {
    slug: "gas-hob-cooker",
    name: "Gas Hob & Cooker Installation",
    category: "installation",
    price: { from: 120, unit: "installation" },
    duration: "1–2 hours",
    description: "Professional gas hob and cooker installation. Gas Safe certified. Safety checks, connection, and testing included.",
    icon: "flame",
    bullets: [
      "Gas Safe certified installation",
      "New or replacement hobs and cookers",
      "Connection to existing gas supply",
      "Full safety testing and leak detection",
      "Appliance commissioning included",
      "Safety certificate issued",
      "Old appliance removal available",
    ],
    faqs: [
      { q: "Do I need a Gas Safe engineer for hob installation?", a: "Yes. Gas work requires certification. We handle the full installation and safety testing." },
      { q: "How long does it take?", a: "Usually 1–2 hours. Depends on the layout and any modifications needed." },
      { q: "What if I'm switching from electric to gas?", a: "We'll need to run a gas line if one doesn't exist. We'll advise on feasibility and cost during the visit." },
    ],
  },
  {
    slug: "unvented-cylinder",
    name: "Unvented Cylinder Installation",
    category: "installation",
    price: { from: 1200, unit: "fit and supply" },
    duration: "1 day",
    description: "Unvented (mains-pressure) hot water cylinder. Fit and supply. Excellent for multiple bathrooms and high hot water demand. 1–2 day installation.",
    icon: "droplet",
    bullets: [
      "Fit and supply from £1,200",
      "Mains-pressure hot water on tap — no tank in loft needed",
      "Perfect for multiple bathrooms",
      "Reduces pressure fluctuation between hot and cold taps",
      "Takes up minimal space — cylinders hide under sink or in cupboard",
      "Safety relief valve and thermal expansion tank included",
      "Maintenance and servicing available annually",
    ],
    faqs: [
      { q: "What's the benefit of unvented over a tank system?", a: "Better water pressure, no loft tank to maintain, smaller footprint, and more efficient heating." },
      { q: "Will it work with my existing boiler?", a: "Usually yes. We'll assess during the survey. Some combinations need an upgrade." },
      { q: "How much hot water can I get?", a: "Essentially unlimited at mains pressure — depends on boiler size. We size the system to your needs." },
      { q: "Do I need Building Regulations approval?", a: "Yes, unvented installations need certification. We handle that as part of the work." },
    ],
  },
  {
    slug: "landlord-gas-certificate",
    name: "Landlord Gas Safety Certificate (CP12)",
    category: "landlord",
    price: { from: 120, unit: "per property" },
    duration: "1 hour",
    description: "Landlord gas safety inspection and CP12 certification. Annual legal requirement. Covers all gas appliances. Essential for portfolio landlords.",
    icon: "shield",
    bullets: [
      "Full inspection of all gas appliances on the property",
      "CP12 gas safety certificate issued",
      "Valid for 12 months — legal requirement before tenant moves in and annually thereafter",
      "Covers boilers, hobs, cookers, fires, water heaters — all gas appliances",
      "Detailed report issued to you and provided to tenants",
      "Fails identified and repairs recommended",
      "Fast turnaround: certificate usually provided same day",
      "Online copy available immediately; hard copy posted",
    ],
    faqs: [
      { q: "What's a CP12 and why do I need it?", a: "It's the Gas Safe record of inspection. Legally required for landlords. Protects you from liability and proves appliances are safe." },
      { q: "How often do I need a CP12?", a: "Annually. Must be valid before a tenant moves in. Get it renewed at least 1 month before expiry." },
      { q: "What happens if I don't have a valid CP12?", a: "You're in breach of the Gas Safety Regulations. Fines up to £6,000 per appliance + potential criminal liability if there's an incident." },
      { q: "What if an appliance fails inspection?", a: "We'll advise on repairs. In most cases, we can fix the issue same day or next day. The CP12 can be issued once corrected." },
      { q: "Do I need to be present?", a: "No, we can access the property with permission. Tenant can be present or you can arrange access." },
    ],
  },
  {
    slug: "plumbing-services",
    name: "Plumbing Services",
    category: "repair",
    price: { from: 80, unit: "callout" },
    duration: "1 hour typical",
    description: "General plumbing work. Leaks, pipe work, fixture installation. WRAS approved. Same-day response where possible.",
    icon: "pipe",
    bullets: [
      "WRAS approved plumbers — water-safe installations",
      "Leaks, burst pipes, replacements",
      "Toilet and tap installation/replacement",
      "Pipe work modifications and extensions",
      "Pressure testing and safety certification",
      "Emergency response available",
      "12-month warranty on all plumbing work",
    ],
    faqs: [
      { q: "What plumbing issues do you handle?", a: "Leaks, frozen pipes, burst pipes, fixture installation, modifications. If it involves water, we can help." },
      { q: "Do you offer emergency plumbing?", a: "Yes. For burst pipes or serious leaks, we offer same-day/emergency response." },
      { q: "Are you WRAS approved?", a: "Yes. All plumbing work meets Water Regulations. Safety certificates issued." },
    ],
  },
];

export const getServiceBySlug = (slug: ServiceSlug): Service | undefined => 
  SERVICES.find(s => s.slug === slug);

export const getServicesByCategory = (category: ServiceCategory): Service[] =>
  SERVICES.filter(s => s.category === category);
