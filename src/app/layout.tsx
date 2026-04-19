import type { Metadata } from "next";
import { DM_Sans, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/nav/shell";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl, SITE_DISPLAY_NAME } from "@/lib/env";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  adjustFontFallback: true,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_DISPLAY_NAME,
    template: `${SITE_DISPLAY_NAME} | %s`,
  },
  description:
    "Essays and notes on software, design, and everything in between.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_DISPLAY_NAME,
  },
  twitter: {
    card: "summary_large_image",
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
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full bg-background font-sans text-foreground"
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
