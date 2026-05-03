import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppFab } from "./WhatsAppFab";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { BackToTop } from "./BackToTop";
import { ScrollToTop } from "./ScrollToTop";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="bg-gradient-hero text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-24">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <p className="text-xs uppercase tracking-[0.25em] text-accent font-medium mb-4">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
