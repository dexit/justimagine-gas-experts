import { ShieldCheck, Award } from "lucide-react";

export function Certifications() {
  return (
    <div className="w-full bg-gradient-to-r from-secondary/40 to-secondary/20 border border-border rounded-2xl p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="font-display text-lg lg:text-xl font-semibold text-foreground mb-2">
            Industry Certified & Approved
          </h3>
          <p className="text-sm text-muted-foreground">
            Our engineers are fully qualified and certified to the highest industry standards
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-1.5">Gas Safe Registered</h4>
            <p className="text-sm text-muted-foreground mb-3">
              All our gas engineers are registered with Gas Safe Register — the only official body authorised to register heating engineers in the UK.
            </p>
            <a
              href="https://www.gassaferegister.co.uk/consumer/about-gas-safe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-accent hover:text-accent/80 transition-smooth"
            >
              Verify on Gas Safe Register →
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-blue-500" />
            </div>
            <h4 className="font-semibold text-foreground mb-1.5">WRAS Approved</h4>
            <p className="text-sm text-muted-foreground mb-3">
              WRAS (Water Regulations Advisory Scheme) certification ensures our plumbing and water installations meet the highest safety and quality standards.
            </p>
            <a
              href="https://www.wras.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-smooth"
            >
              Learn about WRAS approval →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
