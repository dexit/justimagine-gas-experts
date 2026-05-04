import { Link } from "@tanstack/react-router";
import { Phone, Mail, ShieldCheck, Flame } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-gradient-hero text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-10 w-10 rounded-full bg-accent/20 backdrop-blur flex items-center justify-center">
              <Flame className="h-5 w-5 text-accent" />
            </div>
            <span className="font-display text-2xl font-semibold">Just Imagine Ltd</span>
          </div>
          <p className="text-primary-foreground/70 max-w-md leading-relaxed">
            Gas Safe registered heating & plumbing engineers. Honest work, safety-first, available
            24/7 for emergencies.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
            <ShieldCheck className="h-4 w-4" /> Gas Safe Registered Engineers
          </div>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-accent">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li>
              <a
                href="tel:07774079152"
                className="flex items-center gap-2 hover:text-accent transition-smooth"
              >
                <Phone className="h-4 w-4" />
                07774 079152
              </a>
            </li>
            <li>
              <a
                href="mailto:justimagineheating@gmail.com"
                className="flex items-center gap-2 hover:text-accent transition-smooth"
              >
                <Mail className="h-4 w-4" />
                justimagineheating@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-accent">Navigation</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/services" className="hover:text-accent transition-smooth">
                All Services
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-accent transition-smooth">
                Transparent Pricing
              </Link>
            </li>
            <li>
              <Link to="/work" className="hover:text-accent transition-smooth">
                Our Latest Work
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-accent transition-smooth">
                Customer Reviews
              </Link>
            </li>
            <li>
              <Link to="/areas" className="hover:text-accent transition-smooth">
                Areas We Cover
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 text-xs text-primary-foreground/60 flex flex-wrap justify-between gap-3">
          <div className="flex gap-4">
            <span>© {new Date().getFullYear()} Just Imagine Ltd.</span>
            <Link to="/cookies" className="hover:text-accent ml-4">
              Cookie Policy
            </Link>
            <Link to="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent">
              Terms of Service
            </Link>
          </div>
          <span>Gas · Heating · Plumbing · Safety Audits</span>
        </div>
      </div>
    </footer>
  );
}
