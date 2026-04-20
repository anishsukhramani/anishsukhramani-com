"use client";

import type { ImageProps } from "next/image";
import { BrandImage } from "@/components/media/brand-image";

/**
 * Slight friction against casual save-as / drag-out; does not protect assets
 * from determined copying. Use sparingly (e.g. hero portrait).
 */
export function FrictionImage({
  alt,
  context,
  loading,
  priority,
  onContextMenu,
  onDragStart,
  ...rest
}: ImageProps & { context?: string }) {
  return (
    <BrandImage
      {...rest}
      alt={alt}
      context={context}
      priority={priority}
      loading={loading ?? (priority ? "eager" : undefined)}
      draggable={false}
      onContextMenu={(e) => {
        onContextMenu?.(e);
        e.preventDefault();
      }}
      onDragStart={(e) => {
        onDragStart?.(e);
        e.preventDefault();
      }}
    />
  );
}
