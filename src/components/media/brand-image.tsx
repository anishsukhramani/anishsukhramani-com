import Image, { type ImageProps } from "next/image";

const ALT_SEPARATOR = " | ";
const BRAND_PREFIX = "Anish Sukhramani - ";
const DEFAULT_IMAGE_CONTEXT = "Remote Software Engineer";

type BrandImageProps = ImageProps & {
  context?: string;
};

export function buildBrandedAlt(rawAlt: string, context?: string): string {
  const baseAlt = rawAlt.trim();
  if (!baseAlt) return "";
  if (baseAlt.includes(`${ALT_SEPARATOR}${BRAND_PREFIX}`)) return baseAlt;

  const normalizedContext = context?.trim() || DEFAULT_IMAGE_CONTEXT;
  return `${baseAlt}${ALT_SEPARATOR}${BRAND_PREFIX}${normalizedContext}`;
}

export function BrandImage({
  alt,
  context,
  priority,
  preload,
  loading,
  ...props
}: BrandImageProps) {
  const normalizedAlt = typeof alt === "string" ? alt.trim() : "";
  const isDecorative = normalizedAlt.length === 0;
  const finalAlt = isDecorative ? "" : buildBrandedAlt(normalizedAlt, context);

  // Next.js 16+: `preload` and `priority` must not be used together.
  const effectivePriority = preload ? undefined : priority;

  return (
    <Image
      {...props}
      preload={preload}
      priority={effectivePriority}
      loading={loading ?? (preload ? "eager" : undefined)}
      alt={finalAlt}
      aria-hidden={isDecorative || props["aria-hidden"]}
    />
  );
}
