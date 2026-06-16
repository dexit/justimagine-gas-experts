import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { Star, ExternalLink } from "lucide-react";

interface GoogleReviewsCTAProps {
  googleReviewsUrl: string;
  serviceSlug?: string;
}

export function GoogleReviewsCTA({ googleReviewsUrl, serviceSlug }: GoogleReviewsCTAProps) {
  return (
    <div className="rounded-lg border border-border bg-gradient-to-br from-secondary/40 to-secondary/20 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <h3 className="font-semibold text-foreground">Loved our service?</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Share your experience and help other homeowners find reliable gas engineers.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button asChild className="gap-2" variant="default">
            <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              <span>Leave a Review</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          {serviceSlug && (
            <Button asChild variant="outline">
              <Link to="/reviews/$serviceSlug" params={{ serviceSlug }}>
                See Reviews
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
