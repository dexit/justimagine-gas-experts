import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppFab } from "./WhatsAppFab";
import { BackToTop } from "./BackToTop";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:shadow-elegant"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 focus:outline-none">{children}</main>
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
    <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse duration-[10s]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-foreground/5 rounded-full blur-[100px] animate-pulse duration-[8s]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-24">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <p className="text-xs uppercase tracking-[0.25em] text-accent font-medium mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl leading-[1.05] text-balance animate-in fade-in slide-in-from-bottom-3 duration-1000">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
