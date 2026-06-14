import { Link } from "@tanstack/react-router";
import { Phone, Mail, ShieldCheck, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BUSINESS, AREAS } from "@/data/seo";

export function SiteFooter() {
  return (
    <footer className="bg-gradient-hero text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 md:py-16 grid gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <Logo size="h-10 w-10" />
            <span className="font-display text-2xl font-semibold">Just Imagine Ltd</span>
          </div>
          <p className="text-primary-foreground/70 max-w-md leading-relaxed">
            Gas Safe registered heating & plumbing engineers based in Rugby, covering Leamington
            Spa, Warwick, Coventry and across Warwickshire. We show up on time, do the job
            properly, and always charge a fair price.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 text-sm text-accent border border-accent/30 rounded-full px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Gas Safe Registered
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 border border-primary-foreground/20 rounded-full px-3 py-1">
              Est. {BUSINESS.founded}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-base mb-4 text-accent">Contact</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li>
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="flex items-center gap-2 hover:text-accent transition-smooth"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2 hover:text-accent transition-smooth"
              >
                <Mail className="h-4 w-4" />
                {BUSINESS.email}
              </a>
            </li>
            <li className="text-primary-foreground/50 text-xs pt-1">
              Mon–Sat 7am–8pm<br />
              <span className="text-destructive/80">Sun: Emergency callouts only</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base mb-4 text-accent">Navigation</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/services" className="hover:text-accent transition-smooth">
                All Services
              </Link>
            </li>
            <li>
              <Link to="/landlord" className="hover:text-accent transition-smooth">
                Landlord Packages
              </Link>
            </li>
            <li>
              <Link to="/commercial" className="hover:text-accent transition-smooth">
                Commercial & Construction
              </Link>
            </li>
            <li>
              <Link
                to="/emergency"
                className="hover:text-accent transition-smooth flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-destructive/80 animate-pulse" />
                24/7 Emergency
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-accent transition-smooth">
                Transparent Pricing
              </Link>
            </li>
            <li>
              <Link to="/finance" className="hover:text-accent transition-smooth">
                Finance Options
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-accent transition-smooth">
                Customer Reviews
              </Link>
            </li>
            <li>
              <Link to="/why-trust-us" className="hover:text-accent transition-smooth">
                Why Trust Us
              </Link>
            </li>
            <li>
              <Link to="/our-story" className="hover:text-accent transition-smooth">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/safety" className="hover:text-accent transition-smooth">
                Gas Safety
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-base mb-4 text-accent">Areas We Serve</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-primary-foreground/80">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                to={`/areas/${area.slug}`}
                className="hover:text-accent transition-smooth flex items-start gap-1.5"
              >
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-accent/60" />
                <span>{area.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 text-xs text-primary-foreground/60 flex flex-col sm:flex-row flex-wrap justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap">
            <span>© {new Date().getFullYear()} Just Imagine Ltd.</span>
            <span className="hidden sm:inline">Gas Safe Registered · Rugby, Warwickshire</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap">
            <Link to="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-accent">
              Cookies Policy
            </Link>
            <Link to="/complaints" className="hover:text-accent">
              Complaints
            </Link>
          </div>
          <span className="hidden md:inline">Boilers · Gas Safety · Heating · Plumbing · Emergencies</span>
        </div>
      </div>
    </footer>
  );
}
