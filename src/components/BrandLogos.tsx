/**
 * Wordmark "logos" rendered as inline SVG so they remain crisp,
 * theme-aware, and require no external image requests.
 * These are stylised text marks — not the official trademarked logos.
 */
const brands: { name: string; className?: string }[] = [
  { name: "Worcester Bosch" },
  { name: "Vaillant" },
  { name: "Ideal" },
  { name: "Baxi" },
  { name: "Glow-worm" },
  { name: "Viessmann" },
  { name: "And Others" },
];

export function BrandLogos() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 md:gap-x-14">
      {brands.map((b) => (
        <span
          key={b.name}
          className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground/55 hover:text-foreground transition-smooth select-none"
          aria-label={b.name}
        >
          {b.name}
        </span>
      ))}
    </div>
  );
}
