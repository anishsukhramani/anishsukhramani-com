import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/nav/shell";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl, PROFESSIONAL_IDENTITY } from "@/lib/env";
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_URL,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_TITLE_TEMPLATE,
} from "@/lib/seo/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
  adjustFontFallback: true,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: PROFESSIONAL_IDENTITY,
    template: SEO_TITLE_TEMPLATE,
  },
  description: SEO_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: PROFESSIONAL_IDENTITY,
    title: PROFESSIONAL_IDENTITY,
    description: SEO_DESCRIPTION,
    images: [{ url: DEFAULT_SOCIAL_IMAGE_URL, alt: DEFAULT_SOCIAL_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: PROFESSIONAL_IDENTITY,
    description: SEO_DESCRIPTION,
    images: [{ url: DEFAULT_SOCIAL_IMAGE_URL, alt: DEFAULT_SOCIAL_IMAGE_ALT }],
  },
  icons: {
    icon: "/brand/S.png",
    apple: "/brand/S.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
      style={
        {
          "--font-system":
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial',
        } as CSSProperties
      }
    >
      <body
        className="min-h-full bg-background font-sans text-base text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
