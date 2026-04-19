"use client";

import Image, { type ImageProps } from "next/image";

/**
 * Slight friction against casual save-as / drag-out; does not protect assets
 * from determined copying. Use sparingly (e.g. hero portrait).
 */
export function FrictionImage({
  onContextMenu,
  onDragStart,
  ...rest
}: ImageProps) {
  return (
    <Image
      {...rest}
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
