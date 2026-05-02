import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Just Imagine Ltd — Book a Heating Engineer" },
      { name: "description", content: "Call 07774 079152 or email justimagineheating@gmail.com to book a Gas Safe engineer. 24/7 emergency callouts." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Get in touch" title="Talk to a real engineer." subtitle="Phone is fastest. We answer most calls personally — even out of hours." />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          {[
            { icon: Phone, label: "Phone", value: "07774 079152", href: "tel:07774079152", primary: true },
            { icon: Mail, label: "Email", value: "justimagineheating@gmail.com", href: "mailto:justimagineheating@gmail.com" },
            { icon: Clock, label: "Hours", value: "Mon–Sat 7am–8pm · 24/7 Emergencies" },
            { icon: MapPin, label: "Coverage", value: "Local & surrounding areas" },
          ].map((c) => (
            <a key={c.label} href={c.href ?? undefined} className={`block p-6 rounded-2xl border transition-smooth ${c.primary ? "bg-gradient-hero text-primary-foreground border-transparent shadow-elegant hover:shadow-amber" : "bg-card border-border hover:border-accent/50"}`}>
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${c.primary ? "bg-accent/20" : "bg-gradient-amber"}`}>
                  <c.icon className={`h-5 w-5 ${c.primary ? "text-accent" : "text-accent-foreground"}`} />
                </div>
                <div>
                  <div className={`text-xs uppercase tracking-wider ${c.primary ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{c.label}</div>
                  <div className="font-display text-xl font-semibold">{c.value}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
          <h2 className="font-display text-3xl font-semibold mb-2">Send us a message</h2>
          <p className="text-sm text-muted-foreground mb-6">We'll get back to you within a few hours.</p>
          <form action="mailto:justimagineheating@gmail.com" method="post" encType="text/plain" className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input required name="name" placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
              <input required name="phone" placeholder="Phone" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
            <textarea required name="message" rows={5} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
            <Button type="submit" size="lg" className="w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber">Send message</Button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
