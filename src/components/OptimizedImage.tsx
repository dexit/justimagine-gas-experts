import { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  sizes?: string;
  /** Explicit Vite-imported small variant (640w). Pass when src is a hashed Vite asset. */
  srcSm?: string;
  /** Explicit Vite-imported medium variant (1024w). Pass when src is a hashed Vite asset. */
  srcMd?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  lazy = true,
  sizes,
  className,
  srcSm,
  srcMd,
  ...props
}: OptimizedImageProps) {
  const buildSrcSet = (full: string, sm?: string, md?: string): string => {
    if (sm && md) return `${sm} 640w, ${md} 1024w, ${full} 1600w`;
    // Fallback: static public/ paths where filenames are predictable (no Vite hash)
    const base = full.replace(/\.[^/.]+$/, "");
    const ext = full.match(/\.[^/.]+$/)?.[0] || ".jpg";
    return `${base}-sm${ext} 640w, ${base}-md${ext} 1024w, ${full} 1600w`;
  };

  const webpSrc = src.replace(/\.jpe?g$/, ".webp");
  const webpSrcSm = srcSm?.replace(/\.jpe?g$/, ".webp");
  const webpSrcMd = srcMd?.replace(/\.jpe?g$/, ".webp");
  const aspectRatio = width && height ? `${width}/${height}` : undefined;

  const hasVariants = Boolean(width);

  return (
    <picture>
      {hasVariants && (
        <source
          srcSet={buildSrcSet(webpSrc, webpSrcSm, webpSrcMd)}
          type="image/webp"
          sizes={sizes}
        />
      )}
      {hasVariants && (
        <source
          srcSet={buildSrcSet(src, srcSm, srcMd)}
          type={`image/${src.split(".").pop()}`}
          sizes={sizes}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        className={className}
        style={{ aspectRatio }}
        {...props}
      />
    </picture>
  );
}
