import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  Clock,
  Flame,
  Droplets,
  AlertTriangle,
  Wind,
  ThermometerSnowflake,
  Zap,
  CheckCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { BUSINESS, AREAS } from "@/data/seo";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, geoMetaTags } from "@/lib/seo";

const url = `${BUSINESS.url}/emergency`;

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "24/7 Emergency Gas Engineer Rugby & Warwickshire | Just Imagine" },
      {
        name: "description",
        content: `Gas Safe emergency engineers on call 24/7 across Rugby & Warwickshire. No heat, no hot water, gas smell or burst pipe — call ${BUSINESS.phone} now for rapid response.`,
      },
      {
        property: "og:title",
        content: "24/7 Emergency Gas Engineer Rugby & Warwickshire | Just Imagine",
      },
      {
        property: "og:description",
        content: `Gas Safe engineers on call day and night. Call ${BUSINESS.phone} for emergency boiler repairs, gas leaks and burst pipes across Rugby & Warwickshire.`,
      },
      { property: "og:url", content: url },
      { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
      ...geoMetaTags(),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", url: BUSINESS.url },
          { name: "Emergency Callout", url },
        ]),
      ),
      jsonLdScript(
        faqJsonLd([
          {
            q: "What should I do if I smell gas?",
            a: "Stop using all appliances. Do not turn any switches on or off. Open doors and windows to ventilate. Leave the property and call the National Gas Emergency Service on 0800 111 999 immediately. Once declared safe, call us on 07774 079152 for the repair.",
          },
          {
            q: "How quickly can you attend an emergency?",
            a: "We aim to respond within 60–90 minutes for emergencies in our core coverage area (Rugby, Leamington Spa, Warwick, Coventry). Response times may vary at peak periods or for more remote areas.",
          },
          {
            q: "Do you charge more for out-of-hours callouts?",
            a: "Out-of-hours rates apply for evenings and Sundays, but these are agreed transparently before we attend. We do not inflate prices in emergency situations — you'll always know the rate upfront.",
          },
          {
            q: "What is a gas emergency?",
            a: "A gas emergency includes: suspected gas leak, carbon monoxide alarm activation, total loss of heating in freezing conditions, boiler fault causing flooding, or any uncontrolled gas or water leak.",
          },
          {
            q: "Is there a call-out fee?",
            a: "Emergency diagnostic visits start from £85 inc. VAT. The repair cost is quoted and agreed as a fixed price before any parts are fitted.",
          },
          {
            q: "Do you cover my area?",
            a: "We cover Rugby, Leamington Spa, Warwick, Kenilworth, Coventry, Stratford-upon-Avon, Nuneaton, Bedworth, Southam, Atherstone, Alcester and surrounding areas across Warwickshire.",
          },
        ]),
      ),
    ],
  }),
  component: EmergencyPage,
});

const emergencyTypes = [
  {
    icon: ThermometerSnowflake,
    title: "No Heat",
    what: "Boiler not firing? Radiators stone cold? We diagnose and fix — same day where possible.",
    urgent: true,
  },
  {
    icon: Droplets,
    title: "No Hot Water",
    what: "No hot water from taps or shower? Boiler fault, diverter valve or cylinder issue — we'll find the cause fast.",
    urgent: true,
  },
  {
    icon: Wind,
    title: "Gas Smell",
    what: "Suspect a gas leak? Evacuate and call 0800 111 999 first, then call us to carry out the repair.",
    urgent: true,
  },
  {
    icon: Zap,
    title: "Boiler Lockout",
    what: "Flashing fault code? Boiler locked out and won't reset? We diagnose the root cause — not just the reset.",
    urgent: false,
  },
  {
    icon: Droplets,
    title: "Burst Pipe",
    what: "Uncontrolled water from a burst or fractured pipe. Isolate your stopcock and call us immediately.",
    urgent: true,
  },
  {
    icon: AlertTriangle,
    title: "CO Alarm",
    what: "Carbon monoxide alarm triggered? Evacuate the property and call 0800 111 999, then call us.",
    urgent: true,
  },
];

const safetySteps = [
  "Turn off the gas supply at the meter (if it's safe to do so)",
  "Do not use any switches — no lights, no sockets, no appliances",
  "Open all windows and doors to ventilate the property",
  "Leave the building and do not re-enter",
  "Call the National Gas Emergency Service: 0800 111 999",
  "Wait outside until the property is confirmed safe",
  "Then call us on 07774 079152 to arrange the repair",
];

function EmergencyPage() {
  return (
    <PageShell>
      {/* Emergency Hero */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-destructive/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/20 border border-destructive/30 text-xs font-semibold text-destructive mb-6 uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            Available 24 hours · 7 days a week
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
            Gas emergency?
            <br />
            <span className="text-gradient-amber">We answer.</span>
          </h1>
          <p className="text-xl text-primary-foreground/75 max-w-2xl mx-auto mb-10">
            No heat, no hot water, gas smell — real engineers on the phone day and night. Not a
            call centre.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-amber text-accent-foreground hover:opacity-90 shadow-amber font-bold text-lg px-8"
            >
              <a href={`tel:${BUSINESS.phoneE164}`}>
                <Phone className="h-5 w-5 mr-2" />
                {BUSINESS.phone}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Emergency — I need an engineer urgently.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Response timeline */}
      <section className="bg-secondary/40 border-b border-border py-10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { step: "1", title: "You call", body: "We answer — no hold music, no call centre" },
              {
                step: "2",
                title: "Engineer dispatched",
                body: "Typically on route within 60 min in our core area",
              },
              { step: "3", title: "Problem resolved", body: "Most jobs diagnosed & fixed same visit" },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-amber text-accent-foreground font-bold text-sm flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <div className="font-semibold text-sm">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency types grid */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
            We handle
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Common emergency situations
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {emergencyTypes.map((e) => (
            <div
              key={e.title}
              className={`p-6 rounded-2xl border transition-smooth ${
                e.urgent
                  ? "border-destructive/20 bg-destructive/5 hover:border-destructive/40"
                  : "border-border bg-card hover:border-accent/40"
              }`}
            >
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 ${
                  e.urgent ? "bg-destructive/10" : "bg-gradient-amber"
                }`}
              >
                <e.icon
                  className={`h-5 w-5 ${e.urgent ? "text-destructive" : "text-accent-foreground"}`}
                  strokeWidth={2}
                />
              </div>
              <h3 className="font-semibold mb-1">{e.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{e.what}</p>
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
              >
                Call now <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* What to do while you wait — gas leak safety */}
      <section className="bg-secondary/60 border-y border-border py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-destructive text-sm font-semibold mb-4">
              <AlertTriangle className="h-4 w-4" />
              If you suspect a gas leak
            </div>
            <h2 className="font-display text-3xl font-semibold mb-5">
              What to do while you wait
            </h2>
            <ul className="space-y-3">
              {safetySteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="h-6 w-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-hero text-primary-foreground">
            <Flame className="h-10 w-10 text-accent mb-5" />
            <h3 className="font-display text-2xl font-semibold mb-3">National Gas Emergency</h3>
            <p className="text-primary-foreground/75 mb-5 text-sm leading-relaxed">
              For suspected gas leaks, always call the National Gas Emergency Service first. They
              will advise and, if necessary, attend to make the supply safe. We then carry out the
              repair work.
            </p>
            <div className="text-3xl font-bold text-accent mb-1">0800 111 999</div>
            <div className="text-xs text-primary-foreground/60">Free · 24/7 · National Grid</div>
            <div className="mt-6 pt-5 border-t border-primary-foreground/20">
              <div className="text-sm font-semibold mb-2">Then call us for the repair:</div>
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="text-2xl font-bold text-gradient-amber hover:opacity-80 transition-smooth"
              >
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing transparency */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
              No nasty surprises
            </p>
            <h2 className="font-display text-3xl font-semibold mb-4">
              Honest emergency pricing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Emergency work shouldn't mean a blank cheque. We agree all rates upfront before we
              attend. Diagnostic fee from £85, fixed repair price agreed before any parts are
              fitted. No emergency markup on parts.
            </p>
            <ul className="space-y-3">
              {[
                "Diagnostic visit from £85 inc. VAT",
                "Fixed price agreed before any parts are touched",
                "No hidden emergency surcharges on parts",
                "Written invoice with full breakdown",
                "Out-of-hours rate agreed upfront — no surprises",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <Clock className="h-12 w-12 text-accent mx-auto mb-5" />
            <div className="font-display text-5xl font-bold mb-2">24/7</div>
            <div className="text-muted-foreground mb-6">Day, night, weekends and bank holidays</div>
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-bold"
            >
              <a href={`tel:${BUSINESS.phoneE164}`}>
                <Phone className="h-5 w-5 mr-2" />
                {BUSINESS.phone}
              </a>
            </Button>
            <div className="mt-3">
              <Button asChild variant="outline" size="lg" className="w-full">
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Emergency — I need an engineer as soon as possible.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp emergency
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage areas */}
      <section className="bg-secondary/30 border-t border-border py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
            Coverage
          </p>
          <h2 className="font-display text-2xl font-semibold mb-2">Emergency cover across Warwickshire</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Same-day emergency response across our core area. Select your location:
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {AREAS.map((a) => (
              <Link
                key={a.slug}
                to="/areas/$areaSlug"
                params={{ areaSlug: a.slug }}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm hover:border-accent/50 hover:text-accent transition-smooth"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-semibold mb-10 text-center">Emergency FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: "What should I do if I smell gas?",
              a: "Stop using all appliances. Don't flip any switches. Open windows and doors, then leave the property. Call 0800 111 999 (National Gas Emergency). Once declared safe, call us for the repair on 07774 079152.",
            },
            {
              q: "How quickly can you arrive?",
              a: "We aim to attend within 60–90 minutes for emergencies in our core coverage area. Rugby, Leamington, Warwick and Coventry are typically fastest. We'll give you an honest ETA when you call.",
            },
            {
              q: "Do you charge more at night or on weekends?",
              a: "Out-of-hours rates apply but are always agreed before we attend. We don't inflate emergency prices — you'll always know the diagnostic rate upfront.",
            },
            {
              q: "Is there a call-out fee?",
              a: "Emergency diagnostic visits start from £85 inc. VAT. The repair is then quoted as a fixed price and agreed before any parts are ordered or fitted.",
            },
            {
              q: "What counts as a gas emergency?",
              a: "Gas smell, CO alarm activation, total loss of heating in freezing weather, boiler flooding, burst pipes, or any situation where you believe there is immediate risk to health or property.",
            },
            {
              q: "Are you Gas Safe registered?",
              a: "Yes — all our engineers are fully Gas Safe registered and verifiable on the public register. We carry our cards to every job.",
            },
          ].map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-border bg-card overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-sm list-none flex items-center justify-between gap-4">
                {q}
                <span className="text-muted-foreground text-lg group-open:rotate-45 transition-transform flex-shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-gradient-hero border-t border-primary-foreground/20 px-4 py-3 flex gap-3">
        <a
          href={`tel:${BUSINESS.phoneE164}`}
          className="flex-1 bg-gradient-amber text-accent-foreground font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Phone className="h-4 w-4" />
          {BUSINESS.phone}
        </a>
        <a
          href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Emergency — I need an engineer urgently.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          WA
        </a>
      </div>
    </PageShell>
  );
}
