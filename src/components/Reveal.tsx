import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Delay in ms after intersection. Ignored if reduced motion is on. */
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Lightweight scroll reveal that respects `prefers-reduced-motion`.
 * - When reduced motion is requested, content is shown immediately with no transform.
 * - Uses IntersectionObserver to add a single `data-revealed` flag.
 * - All transitions are CSS only and `motion-reduce:` overrides ensure no animation.
 */
export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.setTimeout(() => setRevealed(true), delay);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      data-revealed={revealed ? "true" : "false"}
      className={
        "transition-all duration-700 ease-out motion-reduce:transition-none " +
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 " +
        (revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4") +
        (className ? " " + className : "")
      }
    >
      {children}
    </Tag>
  );
}
