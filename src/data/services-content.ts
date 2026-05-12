export interface ServiceSign {
  title: string;
  body: string;
}

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServiceRichContent {
  slug: string;
  stat?: { value: string; label: string };
  problem: string;
  bodyParagraph: string;
  steps: ServiceStep[];
  signs: ServiceSign[];
}

export const SERVICES_CONTENT: ServiceRichContent[] = [
  {
    slug: "boiler-installation",
    stat: { value: "94%+", label: "efficiency on A-rated boilers" },
    problem:
      "Old boilers (12-15+ years) run at 70-80% efficiency. A-rated replacements hit 94%+ — that's hundreds of pounds a year in bill savings.",
    bodyParagraph:
      "We install Worcester Bosch, Vaillant and Ideal. Fixed price includes labour, boiler, magnetic filter, system flush, old boiler disposal, Gas Safe cert, and Building Regs notification.",
    steps: [
      {
        title: "Free survey",
        body: "We measure heat loss, check flue options, and recommend the right boiler size for your home — not just the cheapest unit.",
      },
      {
        title: "Fixed written quote within 24h",
        body: "No estimates, no surprises. Everything is itemised in writing before you commit to anything.",
      },
      {
        title: "Installation day",
        body: "One day for a straight swap, 2-3 for conversions. We arrive on time and leave everything clean.",
      },
      {
        title: "Paperwork handled",
        body: "Gas Safe cert, Building Regs notification, and manufacturer warranty registration all taken care of. Copies sent to you the same day.",
      },
    ],
    signs: [
      {
        title: "Boiler 12+ years old",
        body: "Even if it's still running, an ageing boiler is likely burning significantly more gas than a modern replacement.",
      },
      {
        title: "More than one repair in the past 2 years",
        body: "Repair costs add up fast. At some point a new boiler is simply cheaper than keeping an old one alive.",
      },
      {
        title: "Energy bills rising unexplained",
        body: "A boiler losing efficiency will cost you more month after month, often with no obvious signs of fault.",
      },
      {
        title: "Some rooms consistently colder than others",
        body: "An undersized or failing boiler often can't keep up with demand — especially in colder parts of the house.",
      },
      {
        title: "Boiler noisy, losing pressure, or unpredictable",
        body: "These are signs a boiler is working harder than it should. Frequent lockouts or pressure drops usually point to deeper problems.",
      },
    ],
  },
  {
    slug: "boiler-repair",
    problem:
      "Most boiler faults are faster and cheaper to fix than people expect. The key is getting someone who'll diagnose honestly — and tell you if repair isn't worth it.",
    bodyParagraph:
      "We fix every major brand: Worcester, Vaillant, Ideal, Baxi, Glow-worm, Potterton. Most common parts are on the van, meaning most repairs are done in a single visit.",
    steps: [
      {
        title: "Call us and describe the fault",
        body: "We narrow down the likely cause before we arrive — saving you time and avoiding unnecessary diagnostic time on site.",
      },
      {
        title: "Same-day or next-day visit",
        body: "We diagnose using combustion analysis, error codes, and hands-on testing — not guesswork.",
      },
      {
        title: "Fixed-price quote before any parts are touched",
        body: "You approve the repair before we do anything. No surprises on the invoice.",
      },
      {
        title: "Repair with OEM parts",
        body: "12-month guarantee on workmanship. Same fault again? We come back free.",
      },
    ],
    signs: [
      {
        title: "No heat or hot water",
        body: "The most common call we get. Often a failed component rather than a full boiler failure — and frequently fixable same day.",
      },
      {
        title: "Boiler showing an error code",
        body: "Error codes narrow down the fault significantly. Tell us the code when you call and we'll arrive with the likely parts.",
      },
      {
        title: "Pilot light going out",
        body: "A repeatedly failing pilot light usually points to a faulty thermocouple or gas valve — both straightforward repairs.",
      },
      {
        title: "Unusual noises — banging, kettling, gurgling",
        body: "These aren't normal. Kettling usually means limescale or sludge build-up. Banging can indicate a more urgent issue.",
      },
      {
        title: "Pressure dropping or running too high",
        body: "Pressure that won't stay stable often points to a leak, a faulty expansion vessel, or a failing pressure relief valve.",
      },
    ],
  },
  {
    slug: "boiler-servicing",
    problem:
      "One missed annual service can void your manufacturer warranty. And unserviced boilers break down three times more often than serviced ones.",
    bodyParagraph:
      "A proper service isn't a quick look and a sticker. We do a full strip-down, combustion gas analysis, CO check, flue test, and filter clean — following the manufacturer's own procedure for your boiler model.",
    steps: [
      {
        title: "Easy booking",
        body: "Book by phone or online — usually within 3-5 days, faster if it's urgent.",
      },
      {
        title: "Engineer arrives on time",
        body: "We work through the full manufacturer service checklist for your specific boiler model — not a generic checklist.",
      },
      {
        title: "Full documented checks",
        body: "Combustion analysis, flue gas test, CO readings, filter clean, pressure check — all documented with actual readings, not just ticks.",
      },
      {
        title: "Report and reminder",
        body: "Full written report issued, label fitted, and your 12-month reminder set. Certificate emailed to you the same day.",
      },
    ],
    signs: [
      {
        title: "12+ months since the last service",
        body: "Annual servicing is a condition of most manufacturer warranties. If you're not sure when it was last done, it's probably overdue.",
      },
      {
        title: "Heating taking longer to warm the house",
        body: "A gradual loss of efficiency is often the first sign that a boiler needs attention — easily missed until you notice the bills.",
      },
      {
        title: "Energy bills higher than last year",
        body: "If your usage hasn't changed but your bills have crept up, an unserviced boiler is one of the most common culprits.",
      },
      {
        title: "Manufacturer warranty expiring",
        body: "Extended warranties usually require annual service records. A gap in your history can invalidate the whole warranty.",
      },
      {
        title: "A tenant has flagged a concern",
        body: "If you're a landlord and a tenant has mentioned anything about the boiler, a service and carbon monoxide check should be the first step.",
      },
    ],
  },
  {
    slug: "gas-safety-certificate",
    stat: { value: "£20,000", label: "maximum fine for a lapsed CP12" },
    problem:
      "Landlords with a lapsed CP12 face fines up to £20,000, invalid building insurance, and potential prosecution. There's no grace period.",
    bodyParagraph:
      "We test all gas appliances, flues, and pipework. CP12 issued same day — digital copies sent to you, your tenant, and your letting agent straight away.",
    steps: [
      {
        title: "Flexible booking",
        body: "Book online or call — we coordinate access with your tenant directly if needed, so you don't have to play middleman.",
      },
      {
        title: "Full appliance check",
        body: "Gas Safe engineer tests all appliances: boiler, hob, gas fire, and any other gas appliances in the property.",
      },
      {
        title: "CP12 issued same day",
        body: "Digital copy emailed immediately to landlord, tenant, and letting agent. No waiting, no chasing.",
      },
      {
        title: "Automatic renewal reminder",
        body: "We set a free reminder 30 days before your next expiry date — so you never lapse again.",
      },
    ],
    signs: [
      {
        title: "You're a landlord with a rented property",
        body: "A valid CP12 is a legal requirement. It must be renewed every 12 months without exception.",
      },
      {
        title: "CP12 expiring within 30 days",
        body: "Don't leave it to the last week. Book now and we'll fit around your tenant's schedule.",
      },
      {
        title: "New gas appliances recently fitted",
        body: "Any new appliance needs to be included in your CP12. If something's been added since the last certificate, it needs re-issuing.",
      },
      {
        title: "Purchasing a rental property",
        body: "A CP12 from the previous owner doesn't transfer to you. You need a fresh certificate in your name before tenants move in.",
      },
      {
        title: "Previous gas safety provider let you down",
        body: "Missed appointments, late certificates, or engineers who couldn't coordinate with tenants — we hear this a lot. We do it differently.",
      },
    ],
  },
  {
    slug: "landlord-gas-safety",
    problem:
      "Staying on top of CP12 renewals, boiler services, and tenant callouts across multiple properties is a lot. A lapsed certificate is a serious legal problem, not just an admin oversight.",
    bodyParagraph:
      "One annual fee covers CP12, boiler service, and priority emergency response — with one invoice, a digital certificate library, and direct liaison with tenants or your letting agent.",
    steps: [
      {
        title: "Tell us about your portfolio",
        body: "We need to know the number of properties, appliances at each, and your preferred inspection windows. That's all.",
      },
      {
        title: "We build your annual schedule",
        body: "Recurring inspections are planned in advance. We coordinate directly with tenants or your letting agent — you don't have to be involved.",
      },
      {
        title: "Everything documented and on time",
        body: "All inspections completed to schedule. Certificates issued same day and stored in your digital library, accessible any time.",
      },
      {
        title: "One invoice, nothing missed",
        body: "Single annual invoice covering everything. Reminders sent 30 days before each renewal. Nothing falls through the cracks.",
      },
    ],
    signs: [
      {
        title: "You own two or more rental properties",
        body: "Managing individual certificates across multiple properties creates gaps. A managed plan removes that risk entirely.",
      },
      {
        title: "You use a letting agent who needs certificates quickly",
        body: "We issue digital certificates immediately and can email them directly to your agent — no delays on move-in days.",
      },
      {
        title: "You've ever had a gap in CP12 coverage",
        body: "It happens more than people admit. Once you're on a managed plan, it can't happen again.",
      },
      {
        title: "Tenants call you when the boiler breaks",
        body: "With a landlord plan, tenants get a direct number. You hear about it when it's resolved, not in the middle of the night.",
      },
      {
        title: "You spend time chasing separate engineers for different jobs",
        body: "One contact, one invoice, one point of responsibility for all your gas and heating needs across every property.",
      },
    ],
  },
  {
    slug: "central-heating",
    problem:
      "Most UK heating systems installed before 2010 have no TRVs, no smart controls, and old radiators running at a fraction of their possible output. Cold rooms aren't always a boiler problem.",
    bodyParagraph:
      "We design and install heating systems properly — right radiator sizes per room, balanced pipework, TRVs, and smart controls. Our engineers are trained on Hive, Nest, and Honeywell systems.",
    steps: [
      {
        title: "Free heating assessment",
        body: "We check your existing system, radiator outputs, pipe sizing, and current controls — and tell you honestly what needs changing and what doesn't.",
      },
      {
        title: "Written design and quote",
        body: "Correct radiator sizes specified per room based on heat loss calculations. Controls recommended based on your household and how you use the heating.",
      },
      {
        title: "Installation by Gas Safe engineers",
        body: "Pipework pressure tested, radiators fitted and properly balanced. Not just installed — commissioned.",
      },
      {
        title: "Full handover",
        body: "System commissioned and controls configured before we leave. We walk you through everything — no manual left to read on your own.",
      },
    ],
    signs: [
      {
        title: "Rooms consistently cold with the heating on",
        body: "Undersized radiators, poor balancing, or inadequate pipe sizing are the usual suspects — and all fixable without replacing the boiler.",
      },
      {
        title: "Old or undersized radiators",
        body: "Radiators that were sized for an older, draftier house often can't keep up with what's expected of them now.",
      },
      {
        title: "No TRVs",
        body: "Without thermostatic radiator valves, you have no room-by-room control. You're heating spaces you're not using and paying for it.",
      },
      {
        title: "Wanting smart or zoned controls",
        body: "Smart controls can cut heating costs significantly when set up correctly — but they need to be sized and configured properly to work.",
      },
      {
        title: "House takes more than 30 minutes to heat up fully",
        body: "A properly sized, balanced, and controlled system should reach temperature quickly. Slow heat-up usually points to a system problem, not just an old boiler.",
      },
    ],
  },
  {
    slug: "plumbing",
    problem:
      "A dripping tap wastes thousands of litres a year. A small leak left unattended can cause serious structural damage. Most plumbing problems are simple — they just need someone reliable to show up.",
    bodyParagraph:
      "We handle the full range of domestic plumbing — leaks, taps, showers, toilets, hot water cylinders (G3 qualified for unvented systems), and bathroom fits. Most jobs priced over the phone in five minutes.",
    steps: [
      {
        title: "Call or book online",
        body: "Describe the issue and we'll give you a price guide over the phone for most jobs — no need to wait for a visit just to get a number.",
      },
      {
        title: "We arrive at the agreed time",
        body: "No vague 4-hour windows. We give you a time and we stick to it.",
      },
      {
        title: "Diagnose, quote, fix",
        body: "Most materials are on the van. Most jobs are completed in a single visit the same day.",
      },
      {
        title: "Tidy up and test",
        body: "We clean up after ourselves, test everything properly, and confirm you're happy before we leave.",
      },
    ],
    signs: [
      {
        title: "Dripping tap or running toilet",
        body: "A constantly running toilet can waste over 200 litres a day. A dripping tap isn't just annoying — it adds up on the water bill.",
      },
      {
        title: "Low pressure in the shower or taps",
        body: "Low pressure is often caused by a blockage, an ageing pressure reducer, or a problem with the hot water system — usually a quick fix.",
      },
      {
        title: "Slow drain or blocked sink",
        body: "A partial blockage gets worse over time. Catching it early is far cheaper than dealing with a full blockage or overflow.",
      },
      {
        title: "Water marks under sinks or on ceilings",
        body: "Staining or damp patches almost always mean a slow leak somewhere. The longer it's left, the more damage it causes.",
      },
      {
        title: "Hot water cylinder ageing or unreliable",
        body: "An unvented cylinder past its serviceable life is a pressure risk. We're G3 qualified to service and replace them safely.",
      },
    ],
  },
  {
    slug: "power-flushing",
    stat: { value: "up to 25%", label: "heating efficiency restored" },
    problem:
      "Black magnetite sludge builds up silently in heating systems — blocking radiators, damaging pumps, and cutting boiler efficiency by up to 25%. Most homeowners don't know it's there until it causes a breakdown.",
    bodyParagraph:
      "A power flush uses high-velocity hot water and chemical cleaners to break up and remove sludge, rust, and scale from every part of your system. We fit a magnetic filter afterwards to prevent the problem recurring.",
    steps: [
      {
        title: "System survey first",
        body: "We check your radiators, test water quality, and assess contamination level before recommending a power flush. If your system doesn't need one, we'll tell you.",
      },
      {
        title: "Power flush machine connected",
        body: "Chemical cleanser circulated at high velocity and temperature throughout the entire system — every radiator, every pipe run.",
      },
      {
        title: "Radiator by radiator",
        body: "Each radiator is individually flushed and tested. The process is repeated until the water runs completely clear at every point in the system.",
      },
      {
        title: "Inhibitor dosed and filter fitted",
        body: "Corrosion inhibitor added to protect the system going forward. Magnetic filter fitted to catch any future sludge before it causes damage. Written system report issued.",
      },
    ],
    signs: [
      {
        title: "Radiators cold at the bottom but warm at the top",
        body: "Classic sign of sludge settling at the bottom of your radiators. Bleeding won't fix it — the sludge needs to be flushed out.",
      },
      {
        title: "Some radiators heat much slower than others",
        body: "Uneven heating across the system usually means partial blockages in certain radiators or pipe runs.",
      },
      {
        title: "Noisy boiler or grinding pump",
        body: "Sludge circulating through the pump causes wear and noise. Left untreated, it will shorten the life of the pump significantly.",
      },
      {
        title: "Brown or black water when bleeding a radiator",
        body: "This is magnetite — and if you can see it in the bleed water, it's throughout your whole system.",
      },
      {
        title: "New boiler recently fitted to an old system",
        body: "A new boiler connected to a contaminated system will fail much sooner than it should. Most manufacturers require a power flush as a condition of warranty.",
      },
    ],
  },
  {
    slug: "emergency-callout",
    problem:
      "Gas smell, CO alarm, no heat on a frozen night — these aren't Monday morning problems. You need an engineer on the phone now, not a call centre.",
    bodyParagraph:
      "We answer our own phone 24/7. Out of hours you get an engineer — not voicemail, not a booking agent. We aim to be on site within 1-2 hours across Rugby and Warwickshire.",
    steps: [
      {
        title: "Call 07774 079152 directly",
        body: "An engineer answers, takes your details, and advises you immediately — including whether to turn off the gas supply or evacuate the property.",
      },
      {
        title: "Realistic arrival time upfront",
        body: "We give you a specific arrival window before we hang up. No vague estimates.",
      },
      {
        title: "Make safe first, then fix",
        body: "On site we make the situation safe before anything else. Then diagnose, then repair — in that order.",
      },
      {
        title: "Transparent out-of-hours pricing",
        body: "Out-of-hours rates agreed with you before any work begins. No surprises on the invoice.",
      },
    ],
    signs: [
      {
        title: "You can smell gas",
        body: "Leave the building immediately, don't use any switches or flames, and call us (or National Gas Emergency 0800 111 999) from outside.",
      },
      {
        title: "A carbon monoxide alarm has gone off",
        body: "Get everyone out of the property. CO is odourless and can be fatal quickly. Call us from outside — do not re-enter until cleared.",
      },
      {
        title: "No heat or hot water with vulnerable people in the property",
        body: "Elderly residents, young children, or anyone unwell in a cold property is a genuine emergency — not something to wait until morning for.",
      },
      {
        title: "Boiler lockout you can't reset",
        body: "If your boiler is going into lockout repeatedly, there's an underlying fault. Resetting it repeatedly without investigation can cause further damage.",
      },
      {
        title: "A burst pipe causing active water damage",
        body: "Turn off your stopcock immediately (usually under the kitchen sink), then call us. Active leaks cause damage fast.",
      },
    ],
  },
];

export const getServiceContent = (slug: string): ServiceRichContent | undefined =>
  SERVICES_CONTENT.find((s) => s.slug === slug);
