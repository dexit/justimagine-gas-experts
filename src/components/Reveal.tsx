import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/** Lightweight scroll-reveal. Respects prefers-reduced-motion. */
export function Reveal({ children, as: Tag = "div", className, delay = 0, y = 24, once = true }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { setShown(true); return; }
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setShown(true); if (once) io.disconnect(); }
          else if (!once) setShown(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
    opacity: shown ? 1 : 0,
  };

  return (
    <Tag ref={ref as never} style={style} className={cn("transition-[transform,opacity] duration-700 ease-out will-change-transform", className)}>
      {children}
    </Tag>
  );
}
