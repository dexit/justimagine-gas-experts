import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Scrolls to top on route change (skips hash anchors). */
export function ScrollToTop() {
  const { location } = useRouterState();
  const pathname = location.pathname;
  const hash = location.hash;
  useEffect(() => {
    if (hash) return;
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}
