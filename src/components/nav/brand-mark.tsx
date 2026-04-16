import Image from "next/image";
import { cn } from "@/lib/utils";

/** Filenames changed when assets update so next/image + browsers fetch fresh files. */
const LIGHT = "/brand/signature-light.png";
const DARK = "/brand/signature-dark.png";

type BrandMarkProps = {
  className?: string;
  /** Sizing for the signature (wide asset) */
  variant?: "mobile" | "rail";
};

export function BrandMark({ className, variant = "rail" }: BrandMarkProps) {
  const isMobile = variant === "mobile";

  /** Clip box: fixed height in the nav; inner image is scaled up and cropped. */
  const clipBox = isMobile
    ? "h-[52px] sm:h-14"
    : "h-10 xl:h-[52px]";

  /** Zoom: larger = more “magnified” signature inside the same clip (edges crop). */
  const zoomInner = isMobile
    ? "w-[min(100%,28rem)] scale-[0.96] sm:scale-[1]"
    : "w-full max-w-[13rem] scale-[0.94] xl:scale-[0.96]";

  return (
    <span
      className={cn(
        "relative block w-full min-w-0 max-w-full overflow-hidden",
        clipBox,
        className
      )}
    >
      {/* Centered layer: translate + scale keeps the mark centered while zooming */}
      <span
        className={cn(
          "absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2",
          zoomInner
        )}
      >
        <Image
          src={LIGHT}
          alt=""
          width={640}
          height={120}
          sizes={
            isMobile
              ? "(max-width: 1024px) 95vw, 400px"
              : "(max-width: 1280px) 5rem, 14rem"
          }
          className="block h-auto w-full object-contain object-center dark:hidden"
          priority
        />
        <Image
          src={DARK}
          alt=""
          width={640}
          height={120}
          sizes={
            isMobile
              ? "(max-width: 1024px) 95vw, 400px"
              : "(max-width: 1280px) 5rem, 14rem"
          }
          className="hidden h-auto w-full object-contain object-center dark:block"
          priority
        />
      </span>
    </span>
  );
}
