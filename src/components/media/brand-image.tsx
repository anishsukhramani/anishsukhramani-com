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

export function BrandImage({ alt, context, ...props }: BrandImageProps) {
  const normalizedAlt = typeof alt === "string" ? alt.trim() : "";
  const isDecorative = normalizedAlt.length === 0;
  const finalAlt = isDecorative ? "" : buildBrandedAlt(normalizedAlt, context);

  return <Image {...props} alt={finalAlt} aria-hidden={isDecorative || props["aria-hidden"]} />;
}
