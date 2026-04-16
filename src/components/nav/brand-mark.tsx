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

  if (isMobile) {
    return (
      <span
        className={cn(
          "relative flex h-full min-h-0 w-full min-w-0 max-w-full items-stretch justify-center",
          className
        )}
      >
        <Image
          src={LIGHT}
          alt=""
          width={640}
          height={120}
          sizes="(max-width: 1024px) 95vw, 400px"
          className="block h-full w-auto max-w-full object-contain object-center dark:hidden"
          priority
        />
        <Image
          src={DARK}
          alt=""
          width={640}
          height={120}
          sizes="(max-width: 1024px) 95vw, 400px"
          className="hidden h-full w-auto max-w-full object-contain object-center dark:block"
          priority
        />
      </span>
    );
  }

  /** Rail: clip box + zoom keep the wide asset legible in the sidebar. */
  const clipBox = "h-10 xl:h-[52px]";
  const zoomInner = "w-full max-w-[13rem] scale-[0.94] xl:scale-[0.96]";

  return (
    <span
      className={cn(
        "relative block w-full min-w-0 max-w-full overflow-hidden",
        clipBox,
        className
      )}
    >
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
          sizes="(max-width: 1280px) 5rem, 14rem"
          className="block h-auto w-full object-contain object-center dark:hidden"
          priority
        />
        <Image
          src={DARK}
          alt=""
          width={640}
          height={120}
          sizes="(max-width: 1280px) 5rem, 14rem"
          className="hidden h-auto w-full object-contain object-center dark:block"
          priority
        />
      </span>
    </span>
  );
}
