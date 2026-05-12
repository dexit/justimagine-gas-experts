import { cn } from "@/lib/utils";

interface LogoProps {
  /** Size class applied to both the img and the wrapper (e.g. "h-9 w-9") */
  size?: string;
  className?: string;
}

export function Logo({ size = "h-9 w-9", className }: LogoProps) {
  return (
    <span className={cn("relative inline-flex items-center justify-center flex-shrink-0", size, className)}>
      {/* Amber glow ring */}
      <span
        className="absolute inset-0 rounded-full bg-amber-400/25"
        style={{ animation: "logo-glow 3.5s ease-in-out infinite" }}
      />
      <img
        src="/logo.svg"
        alt="Just Imagine Ltd"
        className={cn("relative rounded-full", size)}
        style={{ animation: "logo-breathe 4s ease-in-out infinite" }}
      />
    </span>
  );
}
