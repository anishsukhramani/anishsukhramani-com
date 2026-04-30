import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  BookOpen,
  GitBranch,
  Globe,
  Link2,
  MessageCircle,
  Users,
} from "lucide-react";
import { ConnectCard } from "@/components/connect/connect-card";
import { ConnectEmailCard } from "@/components/connect/connect-email-card";
import { getContactEmail } from "@/lib/env";
import { absolutePublicUrl } from "@/lib/seo/public-url";

const canonical = absolutePublicUrl("/connect");

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Operating asynchronously in PST. Collaborations, remote opportunities, and technical discussions—reach out by email or via profiles.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

type SocialTile = {
  title: string;
  description: string;
  href: string | undefined;
  icon: LucideIcon;
  id: string;
  inactiveHint?: string;
};

export default function ConnectPage() {
  const contactEmail = getContactEmail();

  const socialTiles: SocialTile[] = [
    {
      id: "github",
      title: "GitHub",
      description: "Open source & codebases",
      href: "https://github.com/AnishSukhramani",
      icon: GitBranch,
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      description: "Professional network",
      href: "https://www.linkedin.com/in/anishsukhramani/",
      icon: Globe,
    },
    {
      id: "x",
      title: "X",
      description: "Thoughts & high-velocity shipping",
      href: "https://x.com/AnishSukhramani",
      icon: MessageCircle,
    },
    {
      id: "discord",
      title: "Discord",
      description: "",
      href: undefined,
      icon: Link2,
      inactiveHint: "Discord ID: anishsukhramani",
    },
    {
      id: "facebook",
      title: "Facebook",
      description: "Social profile",
      href: "https://www.facebook.com/profile.php?id=100092664517990",
      icon: Users,
    },
    {
      id: "instagram",
      title: "Instagram",
      description: "Life and snapshots",
      href: "https://www.instagram.com/anishsukhramani/",
      icon: Camera,
    },
  ];

  const showDevEmailHint =
    process.env.NODE_ENV === "development" && !contactEmail;

  return (
    <div className="mx-auto flex h-[calc(100dvh-(3.5rem+env(safe-area-inset-top,0px)))] max-w-4xl flex-col justify-start overflow-y-auto px-4 py-4 sm:px-8 sm:py-6 md:justify-center lg:h-[calc(100dvh-env(safe-area-inset-top,0px))] lg:py-8">
      <header className="mx-auto w-full max-w-3xl text-center">
        <h1 className="font-heading text-page font-semibold tracking-tight text-muted-foreground md:text-5xl md:leading-tight">
          Connect.
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-prose text-muted-foreground sm:text-lead">
          For collaborations, remote opportunities, or technical discussions.
          My inbox is always open.
        </p>
      </header>

      <div className="mt-4 flex w-full flex-col gap-4">
        {contactEmail ? (
          <ConnectEmailCard email={contactEmail} />
        ) : showDevEmailHint ? (
          <p className="text-sm text-muted-foreground">
            Set{" "}
            <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
              NEXT_PUBLIC_CONTACT_EMAIL
            </span>{" "}
            to show the email card.
          </p>
        ) : null}

        <section aria-label="Profiles and writing" className="min-h-0">
          <h2 className="sr-only">Profiles and writing</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {socialTiles.map(({ id, title, description, href, icon, inactiveHint }) => (
              <ConnectCard
                key={id}
                href={href}
                title={title}
                description={description}
                icon={icon}
                external
                inactiveHint={inactiveHint}
              />
            ))}
            <ConnectCard
              href="/blog"
              title="Blog"
              description="Technical deep dives"
              icon={BookOpen}
              external={false}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
