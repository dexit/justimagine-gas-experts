import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-hero text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.25em] text-accent font-medium mb-4">{eyebrow}</p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold max-w-4xl leading-[1.05]">{title}</h1>
        {subtitle && <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
