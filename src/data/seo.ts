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
  /** Common problems / symptoms shown as visual cards */
  problems?: { name: string; cause: string; fix: string }[];
  /** Numbered how-we-work steps */
  process?: { step: string; desc: string }[];
  /** Index into REVIEWS array for the on-page testimonial */
  reviewIndex?: number;
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
    priceFrom: "£2,500",
    priceUnit: "fully installed",
    h1: (a) => `New Boiler Installation${local(a)}`,
    metaTitle: (a) => `Boiler Installation${local(a)} | Gas Safe Engineer`,
    metaDesc: (a) =>
      `Fixed-price boiler installation${local(a)}. Worcester, Vaillant & Ideal boilers. Gas Safe registered engineer, 12-year warranty, no hidden fees. Get a free quote.`,
    intro: (a) =>
      `Your old boiler could be costing you hundreds more than it should. If it's over 12 years old, breaking down regularly, or struggling to heat the house properly${local(a)}, it's probably time to replace it — not repair it again. We install A-rated boilers from Worcester Bosch, Vaillant, and Ideal with fixed written prices and no nasty surprises on the invoice. Straight swap or full system conversion — we handle it all and leave your home clean and warm.`,
    bullets: [
      "Free no-obligation home survey — quoted same day or next",
      "Worcester Accredited & Vaillant Advance installer — full manufacturer warranties honoured",
      "Up to 12-year manufacturer warranty on Worcester, Vaillant and Ideal boilers",
      "Smart thermostat (Hive or Nest) fitted and configured as part of the install",
      "Full system power flush and magnetic filter as standard — required by most boiler warranties",
      "Old boiler stripped out, removed and disposed of responsibly",
      "Gas Safe certificate and Building Regulations notification issued on completion",
      "0% finance available on selected boilers — ask during your survey",
    ],
    reviewIndex: 0,
    process: [
      { step: "Free home survey", desc: "We visit at a time that suits you, assess your property and existing system, and answer every question. No obligation, no pressure." },
      { step: "Fixed written quote", desc: "You get a detailed, itemised quote within 24 hours. The figure on the quote is the figure on the invoice — nothing changes on the day." },
      { step: "Installation day", desc: "Old boiler stripped out, new boiler fitted, all pipe connections made and pressure-tested for leaks before we go further." },
      { step: "System flush & filter", desc: "Chemical system flush and magnetic filter fitted as standard. Required by Worcester, Vaillant, and Ideal to activate their warranty." },
      { step: "Commissioning", desc: "Boiler lit, pressurised, and run through all modes. Smart thermostat installed and connected. We don't leave until everything works." },
      { step: "Gas Safe certificate", desc: "Issued on the day. Building Regulations notification filed automatically — no separate council visit required." },
      { step: "Warranty registered", desc: "We register the manufacturer warranty directly so you don't have to chase it. Confirmation sent to you by email." },
    ],
    faqs: [
      {
        q: "When should I replace rather than repair my boiler?",
        a: "If your boiler is over 12 years old, keeps breaking down, or repair costs are heading toward half the price of a new boiler — replace it. We'll give you an honest assessment. If repair is the right call, we'll say so.",
      },
      {
        q: "How much does a new boiler cost?",
        a: "Combi swaps start from £2,500 fully installed. The final price depends on the boiler model, flue route, and any system changes required. We provide a fixed written quote — what you're quoted is what you pay, nothing added on the day.",
      },
      {
        q: "How long does a boiler installation take?",
        a: "Most like-for-like combi swaps are done in a single day. System conversions or boiler relocations can take 2–3 days. We protect your home while we work and clean up fully before we leave.",
      },
      {
        q: "Which boiler brand should I choose?",
        a: "Worcester Bosch is our top pick for reliability and the longest warranties. Vaillant builds exceptional quality. Ideal offers great value without compromising performance. We'll match the best option to your home size, usage, and budget.",
      },
      {
        q: "Do I need Building Regulations approval for a new boiler?",
        a: "Yes — as Gas Safe registered engineers we self-certify all installations under Part P. You receive the Building Regs certificate automatically. No separate council visit or notification required.",
      },
      {
        q: "Do you offer boiler finance?",
        a: "Yes, we offer flexible finance options including 0% interest on selected models. Ask for details when we come out for your survey.",
      },
    ],
  },
  {
    slug: "boiler-repair",
    name: "Boiler Repair",
    short: "Same-day boiler repair on all major makes — diagnostics, genuine parts, fixed price after assessment.",
    category: "maintenance",
    icon: "wrench",
    priceFrom: "£100",
    priceUnit: "from",
    h1: (a) => `Boiler Repair${local(a)} — Same Day Where Possible`,
    metaTitle: (a) => `Boiler Repair${local(a)} | Same-Day Emergency Fix`,
    metaDesc: (a) =>
      `Same-day boiler repair${local(a)}. All major brands fixed. Gas Safe engineer, genuine parts, fixed price. Emergency callouts 24/7. Call 07774 079152.`,
    intro: (a) =>
      `Boiler showing a fault code? No heating or hot water? Water dripping from the casing${local(a)}? Most boiler problems are fixable the same day — but only if the engineer knows what they're doing. We diagnose every major brand, use genuine OEM parts, and quote a fixed price before we touch anything. No jargon, no guesswork, no inflated parts markups.`,
    bullets: [
      "Same-day callouts available — phone before noon for an afternoon slot most days",
      "All major brands diagnosed: Worcester, Vaillant, Ideal, Baxi, Glow-worm, Potterton",
      "Genuine OEM parts only — not generic substitutes",
      "Fixed repair price agreed in writing before any parts are fitted",
      "12-month workmanship and parts warranty on all repairs",
      "Honest advice — we'll tell you if replacing makes more sense than repairing",
    ],
    reviewIndex: 10,
    problems: [
      { name: "No heating or hot water", cause: "Faulty diverter valve, failed pump, or ignition component not firing", fix: "Full diagnostic with brand-specific tools. Failed component replaced. Most resolved same visit." },
      { name: "Low boiler pressure", cause: "System leak, discharged pressure relief valve, or air in the system", fix: "Source located, repaired, and system correctly repressurised — not just topped up." },
      { name: "Kettling or banging noises", cause: "Limescale or magnetite sludge built up on the heat exchanger", fix: "Descale or power flush depending on severity. Heat exchanger replaced if irreparably damaged." },
      { name: "Boiler keeps switching off", cause: "Low pressure, pump failure, overheating from blocked heat exchanger, or faulty thermostat", fix: "Root cause diagnosed and fixed — not just reset and hoped for the best." },
      { name: "Leaking from the casing", cause: "Pressure relief valve discharge, pump seal failure, or cracked heat exchanger", fix: "Severity assessed honestly. Minor leaks are seal or valve replacements. Major leaks get an honest repair vs replace opinion." },
      { name: "Frozen condensate pipe", cause: "External condensate pipe freezes in low temperatures and causes boiler lockout", fix: "Safely thawed, pipe lagged to prevent recurrence. Usually resolved within the hour." },
    ],
    process: [
      { step: "Same-day booking", desc: "Call before noon and we aim to attend the same afternoon. We give you a realistic arrival window — not a vague 'sometime today'." },
      { step: "Full diagnostic", desc: "Root cause identified using brand-specific diagnostic tools. We look past the fault code to find what actually failed." },
      { step: "Honest assessment", desc: "We explain what failed and why, and give you a clear picture of repair versus replace options before you commit to anything." },
      { step: "Fixed price agreed", desc: "You approve the repair price in writing before any parts are ordered or fitted. No surprises on the invoice." },
      { step: "Repair completed", desc: "We carry genuine OEM parts for the most common failures. Most jobs are fixed on the first visit." },
      { step: "System test", desc: "Full operational test before we leave. Boiler run through all modes, pressures checked, everything confirmed working." },
      { step: "12-month guarantee", desc: "All parts and labour carry a 12-month written guarantee. If it fails again within a year, we come back at no cost." },
    ],
    faqs: [
      {
        q: "No heating or hot water — what could it be?",
        a: "Usually a faulty diverter valve, failed pump, or a component that's failed to ignite. We run a full diagnostic on arrival, identify the exact cause, and fix it — most repairs are completed the same visit.",
      },
      {
        q: "Boiler showing low pressure — is that serious?",
        a: "Low pressure is common and usually fixable. It can be caused by a system leak, a discharged pressure relief valve, or air in the system. We locate the source, fix it, and repressurise correctly.",
      },
      {
        q: "Why is my boiler making banging or kettling noises?",
        a: "Kettling — the rumbling or banging noise — is caused by limescale or magnetite sludge building up on the heat exchanger. We can descale or recommend a power flush depending on severity.",
      },
      {
        q: "My boiler keeps switching itself off — what's wrong?",
        a: "Could be low pressure, a faulty thermostat, pump failure, or overheating caused by a blocked heat exchanger. We diagnose the root cause rather than just resetting it and hoping for the best.",
      },
      {
        q: "Water is leaking from my boiler — how urgent is that?",
        a: "Leaks can come from the pressure relief valve (over-pressure), a failed pump seal, or a cracked heat exchanger. Some are minor fixes; others need a component replacement. We'll assess it honestly before quoting.",
      },
      {
        q: "Frozen condensate pipe — can you fix it?",
        a: "Yes. This is common in winter — the condensate pipe runs outside and freezes when temperatures drop. We thaw it safely and lag the pipe to prevent it happening again. Usually a quick fix.",
      },
      {
        q: "How much is a boiler repair callout?",
        a: "Diagnostic visits start from £100 inc. VAT. Once we've identified the fault, we give you a fixed repair price — you approve it before we proceed. No surprise invoices.",
      },
      {
        q: "Do you repair boilers out of hours?",
        a: "Yes — we run 24/7 emergency cover for no heat, no hot water, and gas concerns. Out-of-hours rates are agreed with you before we attend.",
      },
    ],
  },
  {
    slug: "boiler-servicing",
    name: "Boiler Service",
    short: "Annual boiler servicing from £100 — keeps your warranty valid, cuts bills, stops breakdowns.",
    category: "maintenance",
    icon: "shield-check",
    priceFrom: "£100",
    priceUnit: "per year",
    h1: (a) => `Annual Boiler Service${local(a)}`,
    metaTitle: (a) => `Boiler Service${local(a)} from £100 | Gas Safe`,
    metaDesc: (a) =>
      `Annual boiler service${local(a)} from £100. Manufacturer-spec, keeps warranty valid, cuts bills. Gas Safe engineer. Free reminder service. Book online.`,
    intro: (a) =>
      `An annual boiler service is the most important thing you can do to protect your boiler, your family, and your heating bills${local(a)}. It keeps your manufacturer warranty valid, catches small faults before they become expensive breakdowns, and confirms your appliance is burning gas safely. A one-hour visit, once a year — straightforward, and worth every penny.`,
    bullets: [
      "Visual inspection of casing, flue terminal, pipework and condensate drain",
      "Burner and heat exchanger cleaned where required",
      "Gas inlet pressure and working pressure tested against manufacturer spec",
      "Combustion analysis recorded with a calibrated flue gas analyser",
      "CO (carbon monoxide) safety check included as standard",
      "Magnetic system filter cleaned and inhibitor level checked",
      "Service report and appliance label issued same day",
      "Free 12-month reminder — we contact you when it's due",
    ],
    reviewIndex: 7,
    process: [
      { step: "Visual inspection", desc: "Casing, flue terminal, pipework, and condensate drain checked for condition, leaks, and compliance." },
      { step: "Casing removal", desc: "Boiler opened and every internal component visually inspected for wear, corrosion, or damage." },
      { step: "Cleaning", desc: "Burner, electrodes, and heat exchanger cleaned. Condensate trap cleared and refilled. Any debris removed." },
      { step: "Combustion analysis", desc: "Calibrated flue gas analyser records CO/CO₂ levels and combustion efficiency. Readings compared against manufacturer benchmarks." },
      { step: "Pressure & gas rate check", desc: "Gas inlet pressure and working pressure tested and recorded. Gas rate verified against manufacturer specification." },
      { step: "Operational testing", desc: "Thermostats, controls, pressure relief valve, expansion vessel, and circulating pump all tested for correct operation." },
      { step: "System controls verified", desc: "Boiler response to manual and smart controls (Hive, Nest) confirmed. Settings checked and corrected if needed." },
      { step: "Service report issued", desc: "Full written report with all readings. Service label fixed to the appliance. Digital copy emailed same day." },
      { step: "Gas Safety Certificate", desc: "CP12 issued same day if required. Recommended for landlords. Available for homeowners on request." },
    ],
    faqs: [
      {
        q: "How often should a boiler be serviced?",
        a: "Every 12 months without exception. Worcester Bosch, Vaillant, and Ideal all require annual servicing as a condition of their warranties. Skipping a year can void your cover — and we find most winter breakdown callouts come from unserviced boilers.",
      },
      {
        q: "What does a boiler service actually include?",
        a: "We inspect the casing and flue, test gas pressures, clean the burner and heat exchanger if needed, run a combustion analysis, perform a CO check, clean the magnetic filter, check the condensate trap, and issue a written service report.",
      },
      {
        q: "How long does a service take?",
        a: "Usually 45–60 minutes. If we find a fault that needs attention, we'll explain it, show you the readings, and give you a fixed quote for any remedial work. You decide — no pressure.",
      },
      {
        q: "What if you find a problem during the service?",
        a: "We explain exactly what we've found, show you the relevant readings, and quote a fixed price for any repair. You decide whether to proceed. We never carry out additional work without your approval.",
      },
      {
        q: "Can I combine a service and CP12 in one visit?",
        a: "Yes — landlords can save around £25 by combining the annual boiler service with the CP12 gas safety inspection into a single appointment. One visit, both certificates issued same day.",
      },
      {
        q: "Can a service prevent a breakdown?",
        a: "Not guaranteed — but it significantly reduces the risk. We catch deteriorating parts, sensor drift, and combustion issues before they cause a lockout. Most of the breakdown callouts we attend in winter are from boilers that haven't been serviced.",
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
    metaTitle: (a) => `CP12 Certificate${local(a)} from £60 | Same Day`,
    metaDesc: (a) =>
      `CP12 gas safety certificate${local(a)} from £60. Same-day digital issue. Landlord & homeowner inspections. Gas Safe engineer. Portfolio discounts available.`,
    intro: (a) =>
      `If you rent out a property${local(a)}, a valid CP12 gas safety certificate isn't optional — it's the law. Every gas appliance, flue, and gas fitting must be inspected by a Gas Safe registered engineer at least every 12 months. We carry out thorough inspections and issue your digital certificate the same day, sent directly to you, your agent, and your tenant.`,
    bullets: [
      "All gas appliances tested: boiler, hob, gas fire, cooker, and any other gas fittings",
      "Flue flow, combustion readings, and gas pressure all checked and recorded",
      "Pipework and connections visually inspected for leaks and deterioration",
      "Digital CP12 issued same day — sent to landlord, tenant and agent simultaneously",
      "Any unsafe appliances identified in writing with full remedial options",
      "Portfolio discounts available for 5+ properties",
      "Free 30-day renewal reminder — your certificate never lapses",
    ],
    reviewIndex: 9,
    process: [
      { step: "Book your inspection", desc: "Choose a convenient time. We work around tenants and coordinate access with letting agents directly." },
      { step: "Appliance testing", desc: "Every gas appliance, flue, and fitting tested to current Gas Safe standards. Nothing skipped, nothing assumed." },
      { step: "Gas pressure checks", desc: "Inlet pressure, working pressure, and tightness test all recorded and compared against safe operating limits." },
      { step: "Unsafe appliance procedure", desc: "At Risk or Immediately Dangerous items classified, documented, and actioned. Immediately Dangerous appliances isolated on-site." },
      { step: "Digital certificate issued", desc: "CP12 emailed to landlord, agent, and tenant simultaneously the moment the inspection is complete." },
      { step: "Renewal reminder set", desc: "We remind you 30 days before your certificate expires so you're never in breach of your legal obligations." },
    ],
    faqs: [
      {
        q: "Is a gas safety certificate a legal requirement for landlords?",
        a: "Yes. The Gas Safety (Installation and Use) Regulations 1998 require all gas appliances in rented properties to be inspected annually by a Gas Safe registered engineer. Failure to comply can result in prosecution, substantial fines, and invalidated landlord insurance.",
      },
      {
        q: "How much does a CP12 cost?",
        a: "From £60 for a single-appliance property. Properties with a boiler, hob, and gas fire start from £75. Portfolio rates apply for 5+ properties — call for a quote.",
      },
      {
        q: "How quickly will I get the certificate?",
        a: "Same day. We email the digital CP12 to you, your letting agent, and your tenant as soon as the inspection is complete — no waiting a week for paperwork.",
      },
      {
        q: "What happens if an appliance fails the safety check?",
        a: "We classify it as At Risk or Immediately Dangerous and provide a full written report. Immediately Dangerous appliances are disconnected on-site with the tenant's knowledge. We carry out remedial work in the same visit where possible.",
      },
      {
        q: "Can tenants refuse access for a gas safety inspection?",
        a: "Tenants have a right to quiet enjoyment but cannot unreasonably refuse access for a legally required safety inspection. Give 24 hours' written notice. If access is repeatedly refused, document it — those records protect you legally.",
      },
      {
        q: "Do you remind me when it's due for renewal?",
        a: "Yes — we send a free reminder 30 days before expiry so your certificate never lapses and you're never unknowingly in breach.",
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
    metaTitle: (a) => `Landlord Packages${local(a)} | CP12 + Service`,
    metaDesc: (a) =>
      `Landlord packages${local(a)}: CP12 + boiler service + priority emergency cover. One fixed price. Portfolio discounts. Gas Safe registered.`,
    intro: (a) =>
      `Managing one property is straightforward. Managing five or ten is a different job entirely${local(a)}. Our landlord package bundles your annual CP12 gas safety certificate, full boiler service, and priority tenant emergency support into a single arrangement — one invoice, everything documented, nothing slipping through the cracks. We work directly with letting agents and handle tenant access coordination, so you don't have to.`,
    bullets: [
      "Annual CP12 + full boiler service combined in a single visit",
      "Priority emergency response for tenants — same-day where possible",
      "Digital certificate issued same day with copies to landlord, agent and tenant",
      "All certificates stored securely and accessible anytime",
      "Direct invoicing to letting agents — no chasing your property manager",
      "We handle tenant access coordination and follow-up",
      "Multi-property discounts for 5+ and 10+ properties",
      "Full HMRC-compliant documentation for your records",
    ],
    reviewIndex: 5,
    process: [
      { step: "Portfolio assessment", desc: "We review your properties, agree a schedule, and set up direct billing with your letting agent." },
      { step: "Annual inspection visit", desc: "CP12 gas safety check and full boiler service completed in a single visit per property. One slot, both certificates." },
      { step: "Tenant coordination", desc: "We contact tenants directly to schedule access. You don't need to be involved unless there's a problem." },
      { step: "Same-day certificates", desc: "Digital CP12 and service report issued to landlord, agent, and tenant simultaneously. No chasing paperwork." },
      { step: "Emergency cover active", desc: "From day one, tenants can call us directly for heating emergencies. Billed at the agreed package rate." },
      { step: "Renewals managed", desc: "We track every certificate and send renewal notices before anything lapses. Your compliance is never at risk." },
    ],
    faqs: [
      {
        q: "What's included in the landlord package?",
        a: "Annual CP12 gas safety inspection, full manufacturer-spec boiler service, priority emergency response for tenants, same-day digital certificates issued to all parties, and free renewal reminders. One visit, one invoice, everything covered.",
      },
      {
        q: "Do you work directly with letting agents?",
        a: "Yes — we invoice the agency directly, coordinate tenant access, and send certificates simultaneously to landlord, agent, and tenant. Agents tell us it saves significant admin time.",
      },
      {
        q: "What if a tenant is difficult to reach for the inspection?",
        a: "We handle access coordination as part of the package. We contact the tenant, arrange a time that works, and follow up if needed. If access is repeatedly refused, we document it and advise on your legal next steps.",
      },
      {
        q: "Can I add properties to a portfolio package mid-year?",
        a: "Yes — we add properties to an existing arrangement at the pro-rated package rate. No need to wait until renewal.",
      },
      {
        q: "Do you cover emergency callouts for tenants?",
        a: "Yes — tenants can call us directly for heating emergencies. We respond with the same priority as a domestic customer. You're billed at the agreed package rate with no surprise charges.",
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
    metaTitle: (a) => `Heating Install${local(a)} | Radiators, Pipework`,
    metaDesc: (a) =>
      `Central heating installation & repair${local(a)}. Radiators, pipework, smart thermostats. Gas Safe engineer. Fixed prices. Get a free quote.`,
    intro: (a) =>
      `Cold rooms on one side of the house. Radiators that take an hour to warm up. A boiler that runs constantly but never quite heats the place properly${local(a)}. These are signs your central heating system needs attention — whether that's balancing, an upgrade, or a full redesign. We diagnose the actual cause and fix it properly, without upselling work you don't need.`,
    bullets: [
      "Full central heating system design and installation",
      "Radiator replacement, additions, and repositioning",
      "System balancing — adjusting flow rates so every radiator heats evenly",
      "TRV (thermostatic radiator valve) replacement and fitting",
      "Smart thermostat and zone control installation (Hive, Nest, Honeywell)",
      "Underfloor heating connection and commissioning",
      "Magnetic filter installation and corrosion inhibitor dosing",
      "System pressure optimisation and radiator bleeding",
    ],
    reviewIndex: 8,
    process: [
      { step: "Diagnosis", desc: "We identify the actual cause — imbalanced flow, sludge, undersized radiators, or ageing pipework. We don't guess." },
      { step: "Written quote", desc: "Detailed, itemised quote for all work. Fixed price from approval to invoice — nothing changes in the middle of the job." },
      { step: "Installation or repair", desc: "Radiators fitted or replaced, pipework run, TRVs fitted, and system reconnected. Work done right first time." },
      { step: "System flush & inhibitor", desc: "System flushed clean and correctly dosed with corrosion inhibitor to protect all components." },
      { step: "Balancing", desc: "Flow rates adjusted at every radiator so heat distributes evenly. No more scorching living room and freezing bedroom." },
      { step: "Smart controls commissioned", desc: "Hive, Nest, or Honeywell thermostat installed, zones configured, and app connected before we leave." },
      { step: "Pressure test & sign-off", desc: "All connections pressure-tested, system run to temperature, and full commissioning check completed." },
    ],
    faqs: [
      {
        q: "Why is one side of my house always cold?",
        a: "Usually an imbalanced system — some radiators receive too much water flow, others too little. We adjust the lockshield valves to balance the flow properly. Often resolved in a half-day without any new parts.",
      },
      {
        q: "Why are my radiators cold at the bottom?",
        a: "Classic sign of magnetite sludge settled in the lower half of the radiator. Bleeding removes air, not sludge — a power flush is usually required to clear it properly.",
      },
      {
        q: "Is a smart thermostat worth it?",
        a: "For most homes, yes — they typically save 10–25% on heating bills by learning your schedule and only heating when needed. We install Hive, Nest, and Honeywell and set them up fully before we leave.",
      },
      {
        q: "How much does a new central heating system cost?",
        a: "Full systems (boiler + radiators + pipework + controls) start from around £3,500 depending on property size. We always provide a fixed written quote before any work starts.",
      },
      {
        q: "Can you add a radiator to an existing system?",
        a: "Yes — single radiator additions are usually a half-day job. We check your existing boiler capacity first to confirm it can handle the additional load without affecting the rest of the system.",
      },
      {
        q: "What is system balancing and do I need it?",
        a: "Balancing adjusts the flow rate through each radiator so heat is distributed evenly. If some rooms are too hot and others stay cold, balancing often solves it without new parts or a power flush.",
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
    metaTitle: (a) => `Plumber${local(a)} | Leaks, Taps, Hot Water`,
    metaDesc: (a) =>
      `Reliable plumber${local(a)}. Leaks, taps, hot water, bathrooms. No call-out fee on pre-booked jobs. Emergency same-day response.`,
    intro: (a) =>
      `Dripping tap, burst pipe, or no hot water${local(a)} — plumbing problems don't wait for a convenient time. We handle everything from a leaking kitchen mixer to a full bathroom refit, with no call-out fee on pre-booked work and emergency same-day response when you need it most. Qualified, insured, and we always clean up before we leave.`,
    bullets: [
      "Emergency leak detection, burst pipe isolation and repair",
      "Dripping taps, mixers, and shower valves repaired or replaced",
      "Running, blocked, or faulty toilets — diagnosed and fixed",
      "Hot water cylinder replacement: vented and unvented (G3 qualified)",
      "Outside taps, stopcocks, and isolation valves fitted",
      "Bathroom and kitchen fixture installation",
      "Washing machine and dishwasher plumbing connections",
      "Mains water pressure checks and pressure limiting valve fitting",
    ],
    reviewIndex: 11,
    process: [
      { step: "Call or book", desc: "Describe the problem and we'll confirm whether it needs same-day attendance or a scheduled visit. No unnecessary callouts." },
      { step: "Engineer visit", desc: "Arrive within the agreed window. We assess the full scope before touching anything — no charging ahead." },
      { step: "Diagnosis & fixed quote", desc: "Cause identified, repair price agreed in writing. You approve before we proceed. No surprises." },
      { step: "Repair completed", desc: "Quality parts used throughout. Floors and surfaces protected. We work cleanly from start to finish." },
      { step: "Test & verify", desc: "All repairs pressure-tested and flow-checked. We don't consider the job done until everything performs correctly." },
      { step: "Clean up & go", desc: "Work area left clean. No mess, no debris, no damage to surrounding surfaces. Just done properly." },
    ],
    faqs: [
      {
        q: "My tap keeps dripping — is it worth fixing?",
        a: "A single dripping tap wastes thousands of litres of water a year and adds to your bills. Most are a worn washer or ceramic cartridge — a quick fix in most cases, and far cheaper than leaving it.",
      },
      {
        q: "What should I do if a pipe bursts?",
        a: "Turn off the main water supply stopcock immediately — usually under the kitchen sink. Call us next. Don't use electrical switches in the affected rooms. We'll get to you the same day.",
      },
      {
        q: "Do you handle unvented hot water cylinders?",
        a: "Yes — our engineers hold G3 unvented cylinder qualifications, legally required for working on stored hot water systems above 15 litres. We install and service all major brands.",
      },
      {
        q: "Why have I suddenly lost water pressure?",
        a: "Usually a partially closed stopcock, a failing pressure reducing valve, or a supply issue from the mains. We test and diagnose on the first visit — most are a straightforward fix.",
      },
      {
        q: "Do you charge a call-out fee?",
        a: "No call-out fee on pre-booked jobs. Emergency same-day response has a standard diagnostic fee agreed before we visit — no surprises when the invoice arrives.",
      },
      {
        q: "Can you fit an outside tap?",
        a: "Yes — a straightforward half-day job. We install a proper isolating valve inside so you can turn it off in winter without cutting the whole house water supply.",
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
    metaTitle: (a) => `Power Flush${local(a)} from £395 | Heating Restored`,
    metaDesc: (a) =>
      `Power flush${local(a)} from £395. Removes sludge, restores heat, lowers bills. Protects boiler warranty. Book now.`,
    intro: (a) =>
      `Black sludge in your radiators. Cold spots that don't go away after bleeding. A boiler that runs non-stop but barely heats the house${local(a)}. These are the signs that magnetite sludge has built up inside your central heating system — and it's quietly destroying your boiler and adding to every energy bill. A power flush clears it all out, restores proper heat, and protects your system going forward.`,
    bullets: [
      "Full system inspection before the flush begins — we confirm you need it first",
      "High-velocity flush with professional-grade powerflush machine",
      "Chemical cleaning agents circulated through every radiator and pipe run",
      "Each radiator flushed individually until the water runs clear",
      "Magnetic filter fitted at the boiler return (if not already installed)",
      "System drained, rinsed, and refilled with fresh corrosion inhibitor",
      "Before-and-after thermal readings taken and documented",
      "Written flush report and certificate issued — required by most boiler warranties",
    ],
    reviewIndex: 6,
    problems: [
      { name: "Cold spots at the bottom of radiators", cause: "Magnetite sludge settles in the lower part of the radiator, blocking water flow", fix: "Power flush breaks up and removes the sludge so heat reaches every part of the radiator." },
      { name: "Black or brown water when bleeding", cause: "Corroded iron particles (magnetite) circulating freely through the system", fix: "Indicates significant contamination. Power flush with magnetic filtration removes the debris completely." },
      { name: "Boiler making rumbling or banging", cause: "Sludge deposits on the heat exchanger cause localised boiling (kettling)", fix: "Power flush reduces the load on the heat exchanger and quietens the boiler." },
      { name: "Slow or uneven heat-up times", cause: "Restricted flow through pipework from sludge and scale build-up", fix: "After the flush, full circulation is restored and heat-up times improve significantly." },
    ],
    process: [
      { step: "System assessment", desc: "We test flow rates and check radiator temperatures to confirm a power flush is the right solution — we won't recommend it if it isn't needed." },
      { step: "Machine connection", desc: "Professional powerflush machine connected to the system at the boiler return." },
      { step: "Chemical circulation", desc: "Cleaning agents pumped through every pipe run at high velocity to break up sludge and corrosion deposits." },
      { step: "Radiator-by-radiator flush", desc: "Each radiator isolated, flushed, and tested individually until the water runs completely clear." },
      { step: "Magnetic filter fitted", desc: "Neodymium magnetic filter installed at the boiler return to catch any remaining particles and protect the boiler long-term." },
      { step: "Drain, rinse & refill", desc: "System fully drained, clean-rinsed, and refilled with fresh treated water." },
      { step: "Inhibitor dosed", desc: "Correct concentration of corrosion inhibitor added and recorded. This prevents future sludge build-up." },
      { step: "Before & after readings", desc: "Thermal readings confirm restored heat output across all radiators. You can see the difference immediately." },
      { step: "Flush certificate issued", desc: "Written report and powerflush certificate provided — required by Worcester, Vaillant, and Ideal for warranty compliance." },
    ],
    faqs: [
      {
        q: "How do I know if I need a power flush?",
        a: "Cold spots at the bottom of radiators that bleeding doesn't fix, black or brown water when you bleed the system, a boiler making banging or rumbling noises (kettling), or noticeably slow heat-up times. If you're not sure, we'll assess the system before recommending.",
      },
      {
        q: "How long does a power flush take?",
        a: "Usually 4–6 hours depending on the number of radiators and how contaminated the system is. We stay until every radiator is running clear — we don't cut the job short.",
      },
      {
        q: "Is a power flush the same as bleeding my radiators?",
        a: "No — bleeding removes air from the system. A power flush removes magnetite sludge and corrosion debris using chemical agents and high-velocity water flow. Bleeding does nothing to clear settled sludge.",
      },
      {
        q: "Will a power flush damage my pipes?",
        a: "Not if the system is structurally sound. If your pipework has significant corrosion or scale, we'll tell you before we start rather than discovering it halfway through. We always assess first.",
      },
      {
        q: "Do new boilers require a power flush?",
        a: "Most manufacturers — Worcester Bosch, Vaillant, Ideal — require a system flush and magnetic filter installation as a warranty condition. We include this as standard on all new boiler installs.",
      },
      {
        q: "How much does a power flush cost?",
        a: "From £395 for a standard system. Larger properties or more contaminated systems cost more. We quote after the initial assessment — you know the price before we start.",
      },
    ],
  },
  {
    slug: "emergency-callout",
    name: "24/7 Emergency Callout",
    short: "No heat, no hot water, gas leak — Gas Safe engineers on call day and night across Warwickshire.",
    category: "emergency",
    icon: "clock",
    priceFrom: "£120",
    priceUnit: "diagnostic fee",
    h1: (a) => `24/7 Emergency Heating & Gas Engineer${local(a)}`,
    metaTitle: (a) => `Emergency Gas Engineer${local(a)} | 24/7 Response`,
    metaDesc: (a) =>
      `24/7 emergency boiler, heating & gas response${local(a)}. Gas Safe engineers on call. No heat, no hot water, gas leaks. Call now.`,
    intro: (a) =>
      `No heat at midnight. A gas smell at 5am. Boiler flooding the kitchen${local(a)}. These aren't situations where you wait until Monday morning. We run genuine 24/7 emergency cover — you speak to a real engineer, not a call centre operator reading from a script. We aim to be with you within 60–90 minutes across our core area, and we agree our out-of-hours rate with you before we attend.`,
    bullets: [
      "No heat or hot water — emergency response day and night",
      "Suspected gas leak — make safe, isolate, and repair",
      "Burst pipes and uncontrolled water leaks",
      "Boiler lockouts, fault codes, and pressure failure",
      "Carbon monoxide alarm activation — urgent investigation",
      "Frozen condensate pipe — thaw and insulate to prevent recurrence",
      "Out-of-hours rate agreed with you before we attend — no shock invoices",
      "Direct engineer line — you speak to the person coming to you",
    ],
    reviewIndex: 1,
    problems: [
      { name: "No heating or hot water", cause: "Boiler lockout, pressure failure, or component fault", fix: "Same-day diagnosis and repair. We prioritise no-heat callouts in cold weather — especially for vulnerable households." },
      { name: "Gas smell", cause: "Gas leak from pipework, appliance connection, or faulty gas valve", fix: "Leave the property and call 0800 111 999 first. Once declared safe, we attend to locate and repair the leak." },
      { name: "Boiler flooding", cause: "Pressure relief valve discharge, pump seal failure, or cracked heat exchanger", fix: "Leak isolated immediately. Source diagnosed, repair quoted, and carried out same visit where possible." },
      { name: "CO alarm activation", cause: "Incomplete combustion — often a cracked heat exchanger or flue fault", fix: "Urgent attendance. Appliance isolated if unsafe. Full Gas Safe documentation issued." },
      { name: "Burst or leaking pipe", cause: "Frost damage, corrosion, or joint failure", fix: "Water supply isolated, pipe repaired or replaced. We move fast to minimise water damage." },
    ],
    process: [
      { step: "Call us directly", desc: "You speak to an engineer, not a call centre. Describe the problem and we advise immediately — including whether to call 0800 111 999 first for gas concerns." },
      { step: "ETA confirmed", desc: "Honest arrival window given based on current workload. No vague 'sometime today' — you know when we're coming." },
      { step: "Safety first", desc: "Gas concerns made safe before any diagnosis. We follow Gas Safe safe isolation procedures without exception." },
      { step: "Full diagnosis", desc: "Root cause identified and explained clearly. We show you what failed and why before quoting anything." },
      { step: "Fixed price agreed", desc: "Repair price confirmed before work starts. Out-of-hours rate already agreed on the call — no shock invoices." },
      { step: "Repair completed", desc: "Most faults fixed on the first visit. Genuine parts carried in the van for common emergency failures." },
      { step: "Gas Safe documentation", desc: "Safety certificate issued where required. Full written record of the visit provided to you." },
    ],
    faqs: [
      {
        q: "What counts as a heating emergency?",
        a: "No heat in cold weather (especially with children or elderly occupants), any gas smell, boiler flooding, or a CO alarm activation. If you're unsure whether it's an emergency, call us — we'll tell you honestly whether to wait or whether we need to come out now.",
      },
      {
        q: "What should I do if I smell gas?",
        a: "Don't use any electrical switches or open flames. Don't use your mobile indoors. Leave the property, leave the door open, and call the National Gas Emergency Service on 0800 111 999. Once they've declared it safe, call us to carry out the repair.",
      },
      {
        q: "How quickly can you get to me?",
        a: "We aim to reach our core area (Rugby, Leamington, Warwick, Coventry) within 60–90 minutes. We'll give you an honest ETA when you call — no promises we can't keep.",
      },
      {
        q: "How much does an emergency callout cost?",
        a: "We agree the out-of-hours rate with you before we attend. Once on-site, we diagnose the fault and quote a fixed repair price before starting any work. No surprises on the invoice.",
      },
      {
        q: "My boiler is showing a fault code — is that an emergency?",
        a: "Not always. Call us and describe the code — we'll walk you through basic checks (pressure, reset, thermostat batteries) free of charge over the phone. If we can't resolve it remotely, we'll attend.",
      },
      {
        q: "Is there really a 24/7 phone number?",
        a: "Yes — call 07774 079152 any time. We answer our own phone. If we're with another customer we'll call back within minutes, not hours.",
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
    price: "£60",
    unit: "per certificate",
    features: [
      "Single-appliance properties from £60",
      "Boiler + hob + fire from £75",
      "Digital copy issued same day",
      "Free renewal reminder service",
      "Agency direct invoicing",
    ],
  },
  {
    name: "Landlord Bundle",
    price: "£120",
    unit: "CP12 + boiler service",
    popular: false,
    badge: "Best Value",
    features: [
      "Annual CP12 gas safety certificate",
      "Full manufacturer-spec boiler service",
      "Priority emergency response for tenants",
      "Single invoice to agent or landlord",
      "Saves ~£80 vs booking separately",
    ],
  },
  {
    name: "Boiler Installation",
    price: "£2,500",
    unit: "from",
    popular: true,
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
    name: "Power Flushing",
    price: "£395",
    unit: "per system",
    features: [
      "Full high-velocity chemical flush",
      "Every radiator flushed individually",
      "Magnetic filter fitted as standard",
      "Before & after thermal readings",
      "Written flush certificate issued",
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
      "Out-of-hours rate agreed before attendance",
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

