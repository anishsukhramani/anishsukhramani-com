import type { Metadata } from "next";
import {
  PhaseTimeline,
  RulesEngagementGrid,
  SecureCallout,
  SummaryText,
} from "@/components/remote";
import { absolutePublicUrl } from "@/lib/seo/public-url";
import { DEFAULT_SOCIAL_IMAGE_URL, formatSeoPageTitle } from "@/lib/seo/seo";

const canonical = absolutePublicUrl("/remote");

const description =
  "Strictly remote, asynchronous engineering across India and Pacific Time: continuous development cycles, written-first collaboration, and HIPAA-grade rigor from regulated healthcare AI work—so teams wake up to shipped features.";

export const metadata: Metadata = {
  title: "Continuous deployment",
  description,
  alternates: { canonical },
  openGraph: {
    title: formatSeoPageTitle("Continuous deployment"),
    description,
    url: canonical,
    images: [{ url: DEFAULT_SOCIAL_IMAGE_URL }],
  },
  twitter: {
    card: "summary_large_image",
    title: formatSeoPageTitle("Continuous deployment"),
    description,
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
};

export default function RemotePage() {
  return (
    <div className="mx-auto min-w-0 w-full max-w-6xl px-4 py-16 sm:px-8">
      <div className="mx-auto w-full min-w-0 max-w-[65ch] text-justify [&_p]:text-justify [&_li]:text-justify [&_h1]:text-left [&_h2]:text-left [&_h3]:text-left">
        <h1 className="sr-only">Remote — continuous deployment operating model</h1>

        <div className="space-y-16 md:space-y-20">
          <SummaryText>
            I operate on a strictly remote, asynchronous architecture. By leveraging
            the timezone delta between India and the Pacific Coast, I provide Silicon
            Valley startups with a continuous development cycle. When your local
            team goes offline, execution continues. You wake up to shipped features.
          </SummaryText>

          <PhaseTimeline />
          <RulesEngagementGrid />
          <SecureCallout />
        </div>
      </div>
    </div>
  );
}
