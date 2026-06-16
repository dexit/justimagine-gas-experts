import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ShieldCheck,
  CalendarCheck,
  Wrench,
  FileCheck,
  Award,
  Check,
  Phone,
  ArrowRight,
  Flame,
  Home,
  Building2,
  Search,
} from "lucide-react";
import { BUSINESS, type Service } from "@/data/seo";

/* ─────────────────────────────────────────────────────────────────────────
   1. Risk-led "why it matters" grid (Plumcert-style)
   ───────────────────────────────────────────────────────────────────────── */
const RISKS_BY_CATEGORY: Record<string, { title: string; body: string }[]> = {
  safety: [
    { title: "Carbon Monoxide Poisoning", body: "An unflued or poorly serviced boiler can leak odourless, deadly CO. An annual safety check catches it before anyone is harmed." },
    { title: "Invalid Home Insurance", body: "Most home insurers require a current CP12 or service record. No certificate, no cover for fire, flood or escape-of-gas claims." },
    { title: "Voided Boiler Warranty", body: "Worcester, Vaillant, Ideal and Baxi all require an annual service by a Gas Safe engineer. Skip a year and a major repair lands on you." },
    { title: "Landlord Compliance Fines", body: "The Gas Safety (Installation & Use) Regulations 1998 require a valid CP12 on every let property. Non-compliance brings unlimited fines and prosecution." },
    { title: "Hidden Repair Bills", body: "Cracked heat exchangers, leaking pipework and corroded valves sit unseen for months. Routine inspection catches them before they cost thousands." },
    { title: "Property Sale Delays", body: "Solicitors increasingly demand a recent gas safety record before exchange. Without one, your sale stalls or falls through." },
  ],
  installation: [
    { title: "Oversized Boiler, Higher Bills", body: "Most homes are sold a boiler that's far too big. The right heat-loss calculation can save £150–£300 a year on gas." },
    { title: "Voided Manufacturer Warranty", body: "Worcester, Vaillant and Ideal warranties only stand if the install meets benchmark and registration rules. We register every install correctly first time." },
    { title: "Building Regs Non-Compliance", body: "Every new boiler must be notified to Gas Safe and the local authority. Miss this and your buyer's solicitor will spot it on searches." },
    { title: "Future Resale Problems", body: "A boiler installed without paperwork can knock thousands off a sale price — or kill it entirely." },
    { title: "Poor Flue Routing", body: "Bad flue siting leaks combustion gases back into the home. We design and certify every flue route to current standards." },
    { title: "Old Pipework, New Boiler", body: "Fitting a modern condensing boiler onto sludged 22mm pipe destroys efficiency. We assess, flush and upgrade where needed." },
  ],
  maintenance: [
    { title: "Breakdown at the Worst Time", body: "Most boiler failures happen on the coldest day of the year. An annual service catches wear before it becomes a no-heat emergency." },
    { title: "Climbing Gas Bills", body: "A neglected boiler can lose 15–20% of its efficiency in a single year. Servicing restores it — and pays for itself." },
    { title: "Voided Warranty", body: "Manufacturers reject claims on boilers without a stamped annual service. We complete and log every benchmark step." },
    { title: "Carbon Monoxide Risk", body: "Combustion drift is invisible. We measure ratios at every service and replace seals before they fail." },
    { title: "Insurance Claim Refused", body: "Insurers ask for service records after any escape-of-gas or flood event. No record = no payout." },
    { title: "Premature Replacement", body: "Most boilers should last 12–15 years. Without servicing, they fail at 7–8 — and you pay for a new one early." },
  ],
  emergency: [
    { title: "Burst Pipe, Ruined Floor", body: "A 15-minute delay on a mains burst can write off floors, plaster and wiring across two storeys." },
    { title: "Gas Leak in the Home", body: "If you smell gas, ventilate, turn off the meter and call us — we attend gas escapes the same day." },
    { title: "No Heat in Winter", body: "A failed boiler with elderly or young occupants is a welfare emergency. We carry common parts to fix on first visit." },
    { title: "Leak Behind Tiles", body: "Slow leaks rot timber and feed black mould long before you see a stain. We trace, isolate and repair." },
    { title: "Blocked Flue / CO Alarm", body: "A sounding CO alarm needs an engineer the same day, every time. Don't reset and hope." },
    { title: "Frozen Condensate", body: "The most common winter callout. We thaw, lag and protect against the next cold snap." },
  ],
  plumbing: [
    { title: "Slow Leaks, Big Damage", body: "A pinhole on a copper joint can soak a ceiling overnight. We trace and repair before the plaster falls." },
    { title: "Low Water Pressure", body: "Could be a stuck PRV, a hidden leak, or a failed accumulator. Diagnosis first, not guesswork." },
    { title: "Failed Stopcocks", body: "When a stopcock seizes, you can't isolate water in an emergency. We replace with full-bore lever valves." },
    { title: "Old Lead or Iron Pipework", body: "Pre-1970 systems leak, taint water and fail searches on sale. We replace in copper or PEX to current standards." },
    { title: "Blocked or Backing Drains", body: "Backing up into the bath or shower means a soil-stack blockage. We jet and CCTV." },
    { title: "Cold Bathrooms, Warm Hall", body: "Unbalanced systems waste heat in one room and freeze the next. We rebalance and bleed properly." },
  ],
};

export function WhyItMatters({ service }: { service: Service }) {
  const items = RISKS_BY_CATEGORY[service.category] ?? RISKS_BY_CATEGORY.safety;
  return (
    <section className="bg-secondary/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Why it matters</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-4">
            The hidden cost of putting off {service.name.toLowerCase()}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You probably don't think about your boiler or pipework until something goes wrong. Here's what we find on jobs across Rugby and Warwickshire — and what it costs when it's missed.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.title} className="p-6 bg-card border border-border rounded-xl hover:border-accent/40 hover:shadow-sm transition-smooth">
              <AlertTriangle className="h-6 w-6 text-accent mb-3" />
              <h3 className="font-semibold text-base mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   2. How it works — numbered process timeline
   ───────────────────────────────────────────────────────────────────────── */
export function HowItWorks({ service }: { service: Service }) {
  const steps = [
    { icon: CalendarCheck, title: "Book online or call", body: "Pick a slot that suits you. Book through the form, call us, or message on WhatsApp — we answer our own phone." },
    { icon: Search, title: "We survey and quote", body: `A Gas Safe engineer visits, checks your existing setup and gives you a fixed written quote for ${service.name.toLowerCase()} before any work begins.` },
    { icon: Wrench, title: "We do the work", body: "Tidy, time-respected install or repair. Dust sheets down, parts on the van, no surprise extras added to the invoice." },
    { icon: FileCheck, title: "Certificate & aftercare", body: "You get your CP12, benchmark or workmanship certificate within 24 hours, plus a 12-month guarantee and a yearly service reminder." },
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Simple process</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
            How your {service.name.toLowerCase()} works
          </h2>
        </div>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="relative p-6 bg-card border border-border rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-2xl font-bold text-accent w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   3. Brand / accreditation badge strip
   ───────────────────────────────────────────────────────────────────────── */
const BRANDS = [
  "Worcester Bosch",
  "Vaillant",
  "Ideal",
  "Baxi",
  "Glow-worm",
  "ATAG",
];
const ACCREDITATIONS = ["Gas Safe Registered", "OFTEC", "CIPHE", "Which? Trusted"];

export function BrandStrip() {
  return (
    <section className="border-t border-border bg-gradient-to-b from-secondary/20 to-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-2">Approved &amp; accredited</p>
            <h3 className="font-display text-xl md:text-2xl font-semibold">
              We install &amp; service every major UK boiler brand
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold">
                  <Flame className="h-3 w-3 text-accent" />
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {ACCREDITATIONS.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-xs font-semibold text-accent-foreground/90">
                  <ShieldCheck className="h-3 w-3 text-accent" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   4. Who we work with — audience funnel (SEO targeting)
   ───────────────────────────────────────────────────────────────────────── */
export function WhoWeWorkWith({ service }: { service: Service }) {
  const audiences = [
    { icon: Home, label: "Homeowners", body: `Annual ${service.name.toLowerCase()} keeps your boiler warranty valid and your family safe.`, cta: "Book a home visit", to: "/contact" as const },
    { icon: Building2, label: "Landlords (CP12)", body: "Meet your legal duty under the Gas Safety Regulations 1998. Multi-property discounts available.", cta: "See landlord packages", to: "/landlord" as const, featured: true },
    { icon: Search, label: "Home Buyers", body: "Pre-purchase gas inspection. Know what you're buying before you exchange.", cta: "Pre-purchase check", to: "/contact" as const },
    { icon: Award, label: "Letting / Estate Agents", body: "Priority booking and fast certificate turnaround for managed portfolios.", cta: "Partner with us", to: "/commercial" as const },
  ];
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Who we work with</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
            Right {service.name.toLowerCase()} for every property
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.label} className={`relative p-6 rounded-2xl border ${a.featured ? "bg-gradient-hero text-primary-foreground border-transparent shadow-elegant" : "bg-card border-border"}`}>
                {a.featured && (
                  <span className="absolute -top-2.5 left-6 text-[10px] font-bold uppercase tracking-wider bg-gradient-amber text-accent-foreground px-2.5 py-1 rounded-full">
                    Most booked
                  </span>
                )}
                <Icon className={`h-6 w-6 mb-3 ${a.featured ? "text-accent" : "text-accent"}`} />
                <h3 className="font-semibold text-base mb-2">{a.label}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${a.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{a.body}</p>
                <Link to={a.to} className="inline-flex items-center gap-1 text-xs font-semibold hover:gap-2 transition-all">
                  {a.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   5. Comparison / spec table
   ───────────────────────────────────────────────────────────────────────── */
const COMPARISON_BY_CATEGORY: Record<string, { title: string; rows: { feature: string; us: string; others: string }[] }> = {
  installation: {
    title: "Just Imagine vs. the cheap quote",
    rows: [
      { feature: "Heat-loss calculation included", us: "Yes — room by room", others: "Rarely" },
      { feature: "Manufacturer warranty registered", us: "Up to 12 years", others: "Often skipped" },
      { feature: "System flush before install", us: "Always", others: "Charged extra" },
      { feature: "Magnetic system filter fitted", us: "Included", others: "£120 add-on" },
      { feature: "Smart control included", us: "Yes — Hive or Nest", others: "Not included" },
      { feature: "Building Regs notified", us: "Same week", others: "Down to you" },
      { feature: "Workmanship guarantee", us: "12 months written", others: "30 days verbal" },
    ],
  },
  safety: {
    title: "What's actually in our CP12 check",
    rows: [
      { feature: "Gas tightness test", us: "Every appliance", others: "Boiler only" },
      { feature: "Flue flow / spillage test", us: "Recorded", others: "Skipped" },
      { feature: "CO/CO₂ ratio measurement", us: "Logged on cert", others: "Tick-box" },
      { feature: "Ventilation check", us: "Per appliance", others: "Visual only" },
      { feature: "Certificate turnaround", us: "Within 24 hours", others: "3–5 days" },
      { feature: "Defect photos in report", us: "Yes", others: "Text only" },
    ],
  },
  maintenance: {
    title: "Full service vs. a quick safety check",
    rows: [
      { feature: "Combustion analysis", us: "Yes — printed", others: "Skipped" },
      { feature: "Burner & heat exchanger clean", us: "Yes", others: "Visual only" },
      { feature: "Seals replaced as needed", us: "Included", others: "Charged" },
      { feature: "Magnetic filter clean", us: "Yes", others: "No" },
      { feature: "Benchmark logbook updated", us: "Always", others: "Often skipped" },
      { feature: "Warranty kept valid", us: "Yes", others: "At risk" },
    ],
  },
  emergency: {
    title: "What you get on a same-day callout",
    rows: [
      { feature: "Response window", us: "Same day, often within hours", others: "Next-available slot" },
      { feature: "Out-of-hours surcharge", us: "Transparent flat rate", others: "Hidden multipliers" },
      { feature: "Parts on the van", us: "Common boiler & plumbing parts", others: "Order & return" },
      { feature: "Fixed price after diagnosis", us: "Always written", others: "Hourly creep" },
      { feature: "Make-safe if not fixable today", us: "Free", others: "Charged" },
    ],
  },
  plumbing: {
    title: "What's included as standard",
    rows: [
      { feature: "Leak trace (no destructive work)", us: "Acoustic + thermal", others: "Cut tiles to find" },
      { feature: "Isolation valves fitted", us: "Full-bore lever, standard", others: "Cheap stop ends" },
      { feature: "Make-good after repair", us: "Yes", others: "Down to you" },
      { feature: "Workmanship guarantee", us: "12 months", others: "30 days" },
      { feature: "Tidy up & remove waste", us: "Always", others: "Sometimes" },
    ],
  },
};

export function ComparisonTable({ service }: { service: Service }) {
  const data = COMPARISON_BY_CATEGORY[service.category];
  if (!data) return null;
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">What's included</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">{data.title}</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr>
                <th className="text-left font-semibold px-5 py-4">Feature</th>
                <th className="text-left font-semibold px-5 py-4 text-accent">Just Imagine</th>
                <th className="text-left font-semibold px-5 py-4 text-muted-foreground">Typical local quote</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r, i) => (
                <tr key={r.feature} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                  <td className="px-5 py-4 font-medium">{r.feature}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                      <Check className="h-4 w-4 text-accent flex-shrink-0" />
                      {r.us}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{r.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   6. Case study / real findings
   ───────────────────────────────────────────────────────────────────────── */
export function RecentFindings({ service }: { service: Service }) {
  const findings = [
    { area: "Rugby — CV21", title: "Cracked heat exchanger spotted on annual service", body: `Routine ${service.name.toLowerCase()} caught a hairline crack on a 9-year-old Worcester before it leaked CO. Replaced under warranty — customer paid £0 for the part.` },
    { area: "Bilton — CV22", title: "Landlord CP12 caught unsafe cooker hose", body: "Annual landlord visit found a perished bayonet hose behind a freestanding cooker. Replaced same visit, certificate issued next morning." },
    { area: "Dunchurch — CV23", title: "New boiler swap, 40% smaller gas bill", body: "Replaced an oversized 35kW combi with a correctly-sized 25kW Vaillant ecoTEC. Verified £312/year saving from the customer's smart meter data." },
  ];
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Real results</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
            Recent findings on local {service.name.toLowerCase()} jobs
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Genuine examples from Just Imagine visits across Warwickshire — every one of these was caught before it became a serious problem.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {findings.map((f) => (
            <article key={f.title} className="p-6 bg-card border border-border rounded-2xl flex flex-col">
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">{f.area}</div>
              <h3 className="font-display text-lg font-semibold mb-3 leading-snug">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   7. SEO funnel CTA strip
   ───────────────────────────────────────────────────────────────────────── */
export function FunnelCTA({ service }: { service: Service }) {
  return (
    <section className="bg-gradient-hero text-primary-foreground border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 lg:py-16 grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-3">
            Book your {service.name.toLowerCase()} today
          </h2>
          <p className="text-primary-foreground/75 max-w-xl leading-relaxed">
            Gas Safe registered, fixed written prices, 12-month workmanship guarantee. We cover all of Rugby and Warwickshire — usually same-day for urgent jobs.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className="inline-flex items-center justify-center gap-2 bg-gradient-amber text-accent-foreground font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-smooth shadow-amber"
          >
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phone}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground font-semibold px-5 py-3 rounded-lg hover:bg-primary-foreground/10 transition-smooth"
          >
            Request a quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
