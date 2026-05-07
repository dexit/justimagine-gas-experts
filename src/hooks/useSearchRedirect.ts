import { useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { getSearchRedirectPath } from "@/lib/searchRedirect";

export function useSearchRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only check on initial page load (not on route changes)
    const searchPath = getSearchRedirectPath();

    if (searchPath && location.pathname !== searchPath) {
      // Redirect after a brief delay to ensure page is ready
      const timer = setTimeout(() => {
        navigate({ to: searchPath });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);
}
