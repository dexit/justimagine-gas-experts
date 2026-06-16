import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "jii_cookie_consent";

export function CookiesBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) setShown(true);
  }, []);

  if (!shown) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background border-t-4 border-accent p-4 sm:p-6 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm leading-relaxed">
            We use cookies to improve your experience. Essential cookies are always enabled. Analytics cookies help us understand how you use our site.
            {" "}
            <Link to="/cookies" className="underline hover:no-underline font-medium">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            onClick={() => {
              localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
              setShown(false);
            }}
            size="sm"
            className="bg-accent text-accent-foreground hover:opacity-90"
          >
            Accept
          </Button>
          <button
            onClick={() => {
              localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
              setShown(false);
            }}
            className="p-2 hover:bg-background/10 rounded transition-smooth"
            aria-label="Decline cookies"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
