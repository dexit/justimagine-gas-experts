import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating back-to-top button.
 * - Visible only after meaningful scroll (>= 600px).
 * - Smooth scroll respects `prefers-reduced-motion` (jumps instead).
 * - Fully keyboard-focusable with visible focus ring + descriptive aria-label.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    // Move focus to the page top so screen-reader / keyboard users land sensibly.
    requestAnimationFrame(() => {
      const main = document.querySelector("main");
      if (main instanceof HTMLElement) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
      }
    });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top of page"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={
        "fixed bottom-5 left-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full " +
        "bg-primary text-primary-foreground border border-border shadow-elegant " +
        "hover:scale-105 transition-smooth motion-reduce:transition-none motion-reduce:hover:scale-100 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
        (show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none")
      }
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
