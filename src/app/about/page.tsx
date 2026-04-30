import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/seo/json-ld";
import { absolutePublicUrl } from "@/lib/seo/public-url";
import { buildPersonJsonLd, formatSeoPageTitle } from "@/lib/seo/seo";

const canonical = absolutePublicUrl("/about");
const personJsonLd = buildPersonJsonLd();

const ABOUT_DESCRIPTION =
  "Remote Software Engineer building voice AI at Neurality Health (San Jose). High-velocity shipping and autonomous acquisition systems. Writing on the blog and building in public.";

export const metadata: Metadata = {
  title: formatSeoPageTitle("About"),
  description: ABOUT_DESCRIPTION,
  alternates: { canonical },
  openGraph: { url: canonical, description: ABOUT_DESCRIPTION },
};

const gallery = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <div className="fixed inset-x-0 top-0 z-30 hidden pt-[env(safe-area-inset-top,0px)] lg:block">
        <div className="relative bg-background">
          <div className="h-32" aria-hidden />
        </div>
      </div>
      <div className="mx-auto min-w-0 w-full max-w-6xl px-4 pb-16 pt-0 sm:px-8">
        <div className="mx-auto w-full min-w-0 max-w-[65ch] text-justify [&_p]:text-justify [&_li]:text-justify [&_h1]:text-left [&_h2]:text-left [&_h3]:text-left">
          <div className="hidden h-32 lg:block" aria-hidden />
          <header className="space-y-4">
            <h1 className="font-heading text-page font-semibold tracking-tight text-muted-foreground">
              About.
            </h1>
            <div className="space-y-4">
              <p className="text-prose leading-relaxed text-foreground/90">
                I am a Remote Software Engineer currently building voice AI infrastructure at{" "}
                <a
                  className="text-foreground/90 underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  href="https://www.neuralityhealth.ai/"
                >
                  Neurality Health AI
                </a>{" "}
                a Silicon Valley startup, (San Jose, CA). I specialize in high-velocity shipping and
                engineering autonomous business acquisition systems. My engineering philosophy is that
                it&apos;s not about the code but the value it generates.
              </p>
              <p className="text-prose leading-relaxed text-foreground/90">
                Outside of the digital world, you might bump into me at a seminar or tech meetup. While I
                generally tend to keep to myself, I genuinely thrive on deep, engaging conversations
                when I connect with interesting people. I have found it&apos;s a great learning experience
                when you meet people in your field who have made an impact or have stayed relevant
                longer than you.
              </p>
              <p className="text-prose leading-relaxed text-foreground/90">
                My weekends are usually spent building useful side-projects that I sometimes share by
                building in public and{" "}
                <a
                  className="text-foreground/90 underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  href="/blog"
                >
                  writing on my blog
                </a>{" "}
                to share my learnings and document my journey.
              </p>
              <p className="text-prose leading-relaxed text-foreground/90">
                And I think there is no better feeling than a good cup of coffee on a quiet evening alone.
              </p>
            </div>
          </header>

          <section className="mt-14 grid gap-6 sm:grid-cols-3">
          {gallery.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/80 bg-muted"
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
          </section>

          <section className="mt-16 space-y-6 text-prose leading-relaxed text-foreground/90">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Engineering at Neurality Health (San Jose, CA)
          </h2>
          <p>
            When I first joined, the mandate was broad: fix the internal
            bottlenecks. We were burning significant capital on Zapier and other
            off-the-shelf automation tools for the Customer Success and
            Marketing teams. I ripped those out and built a fully functional,
            in-house bulk email campaign infrastructure from the ground up. It
            performed better than the paid tools and reduced our operational
            cost to near zero.
          </p>
          <p>
            As the company grew, the Customer Success team&apos;s load became
            unsustainable. I transitioned to the core product to build an
            automated client onboarding system. While I never physically
            onboarded a single client, the guided-tour infrastructure and
            backend systems I built allowed us to onboard a massive influx of
            clinics without breaking a sweat.
          </p>
          <p>
            My current focus is engineering robust Voice AI infrastructure
            (including automated AI-on-AI regression testing systems) and
            developing scalable client acquisition systems.
          </p>

          <h2 className="font-heading mt-14 text-2xl font-semibold tracking-tight">
            Project SOVA: the autonomous marketing brain
          </h2>
          <p>
            The most complex system I have architected to date is an internal
            application we call{" "}
            <strong className="font-medium text-foreground">SOVA</strong>.
            SOVA is essentially an entire marketing department distilled into
            code. It is a multi-agent, autonomous &quot;brain&quot; built on a
            fragmented architecture. Each fragment is an independent AI agent
            with highly specific instructions and autonomous execution
            capabilities.
          </p>
          <h3 className="mt-4 font-heading text-subsection font-semibold tracking-tight text-foreground">
            How it works
          </h3>
          <div>
            <p className="mt-2">
              <strong className="font-medium text-foreground">The observers:</strong>{" "}
              Fragments monitor the internet 24/7. They scrape Reddit
              discussions, Facebook groups, LinkedIn posts, Google Trends, and
              high-tech news cycles to track emerging problems and shifts in our
              target audience&apos;s behavior.
            </p>
            <p className="mt-2">
              <strong className="font-medium text-foreground">The synthesizers:</strong>{" "}
              These agents process this noise and categorizes it into two
              distinct outputs:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-muted-foreground">
              <li>
                <strong className="font-medium text-foreground">Opportunities:</strong>{" "}
                Actionable data used to autonomously launch highly targeted voice
                or email outbound campaigns.
              </li>
              <li>
                <strong className="font-medium text-foreground">Content:</strong>{" "}
                Educational insights automatically formatted for distribution
                across our newsletter, LinkedIn, and primary landing pages.
              </li>
            </ul>
            <p className="mt-6">
              SOVA runs continuously, requires zero operational overhead, and
              drives business acquisition far more efficiently than traditional
              manual workflows.
            </p>
          </div>

          <h2 className="font-heading mt-14 text-2xl font-semibold tracking-tight">
            The technical stack
          </h2>
          <p>
            While I adapt quickly to any environment, my current production
            stack is heavily focused on modern web architecture and applied AI
            capabilities.
          </p>
          <p>
            <strong className="font-medium text-foreground">Core infrastructure:</strong>{" "}
            Next.js, Django, PostgreSQL, Docker, Google Cloud Platform (GCP).
          </p>
          <p>
            <strong className="font-medium text-foreground">Applied AI &amp; voice:</strong>{" "}
            LangChain, LangGraph, LiveKit, ElevenLabs, Cartesia, and Deepgram.
          </p>
          </section>
        </div>
      </div>
    </>
  );
}
