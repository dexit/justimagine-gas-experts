import { useParams, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";

export function ConfirmationPage() {
  const { refId } = useParams({ from: "/confirmation/$refId" });
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<HTMLButtonElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(refId);
    setCopied(true);
    toast.success("Reference copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-8 py-16 sm:py-20">
        <div className="text-center animate-in fade-in-0 zoom-in-95">
          <div className="mb-6 flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-accent animate-in scale-in-95 duration-500" aria-hidden="true" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 text-balance">
            Enquiry received
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Thanks for getting in touch. We'll contact you within 30 minutes during working hours, or first thing tomorrow morning.
          </p>

          {/* Reference Card */}
          <div className="bg-accent/8 border border-accent/30 rounded-2xl p-6 sm:p-8 mb-8">
            <p className="text-sm text-muted-foreground mb-2">Your reference number</p>
            <div className="flex items-center gap-3 justify-center flex-wrap">
              <code className="font-mono text-2xl sm:text-3xl font-semibold text-accent">{refId}</code>
              <Button
                ref={copyRef}
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Save this to track your enquiry</p>
          </div>

          {/* Next Steps */}
          <div className="bg-secondary/40 border border-border rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="font-display text-lg font-semibold mb-4">What happens next</h2>
            <ul className="space-y-3 text-left max-w-2xl mx-auto">
              <li className="flex gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent text-primary-foreground text-xs font-semibold flex-shrink-0">1</span>
                <span className="text-sm">We receive and review your enquiry immediately</span>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent text-primary-foreground text-xs font-semibold flex-shrink-0">2</span>
                <span className="text-sm">A qualified engineer will call you on your provided number</span>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent text-primary-foreground text-xs font-semibold flex-shrink-0">3</span>
                <span className="text-sm">We'll discuss your needs and arrange a time that suits you</span>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent text-primary-foreground text-xs font-semibold flex-shrink-0">4</span>
                <span className="text-sm">We'll provide a transparent quote before any work begins</span>
              </li>
            </ul>
          </div>

          {/* Contact Fallback */}
          <div className="bg-muted/50 rounded-2xl p-6 sm:p-8 mb-8">
            <p className="text-sm text-muted-foreground mb-3">
              If you don't hear from us within the hour, please reach out:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a href="tel:07774079152" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
                07774 079152
              </a>
              <span className="hidden sm:inline text-border">•</span>
              <a href="mailto:info@justimagine.ltd" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
                info@justimagine.ltd
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <a href="/">Back to home</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/services" className="gap-2">
                Explore services
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/confirmation/$refId")({
  component: ConfirmationPage,
});
