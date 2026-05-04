import { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  lazy = true,
  sizes,
  className,
  ...props
}: OptimizedImageProps) {
  const getSrcSet = (baseSrc: string) => {
    if (baseSrc.includes("node_modules")) return baseSrc;
    const base = baseSrc.replace(/\.[^/.]+$/, "");
    const ext = baseSrc.match(/\.[^/.]+$/)?.[0] || ".jpg";
    if (width) {
      return `${base}-sm${ext} 640w, ${base}-md${ext} 1024w, ${base}${ext} 1600w`;
    }
    return baseSrc;
  };

  const aspectRatio = width && height ? `${width}/${height}` : undefined;

  return (
    <picture>
      <source
        srcSet={getSrcSet(src.replace(/\.jpg$/, ".webp"))}
        type="image/webp"
        sizes={sizes}
      />
      <source
        srcSet={getSrcSet(src)}
        type={`image/${src.split(".").pop()}`}
        sizes={sizes}
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        className={className}
        style={{
          aspectRatio,
        }}
        {...props}
      />
    </picture>
  );
}
