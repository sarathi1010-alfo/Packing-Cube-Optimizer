import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdSlot } from "@/components/ads/ad-slot";
import { RecentlyLaunched } from "@/components/widgets/recently-launched";
import { siteConfig } from "@/config/site";
import { PWARegistry } from "@/components/pwa-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "PackFit | Packing Cube Optimizer & Luggage Planner",
    template: "%s | PackFit",
  },
  description: siteConfig.description,
  keywords: ["packing cube optimizer", "luggage space calculator", "carry on size checker", "packing simulator", "travel tool"],
  openGraph: {
    title: "PackFit | Packing Cube Optimizer & Luggage Planner",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: "PackFit Packing Cube Optimizer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PackFit | Packing Cube Optimizer & Luggage Planner",
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
  alternates: {
    canonical: "https://packfit.alfo.online/",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
};

export const viewport = {
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6393936268623951" />
        <meta name="monetag" content="86950f5308b2a836fd804730ef0e5e7d" />
        {/* Google Analytics (GA4) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HZQ3QT11QC" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HZQ3QT11QC');
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <a
          href="#main-content"
          id="skip-link"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
        >
          Skip to content
        </a>
        <PWARegistry />
        <Navbar />
        <RecentlyLaunched />
        <main id="main-content" className="flex-1">
          <AdSlot slot="top-leaderboard" format="auto" />
          {children}
          <AdSlot slot="bottom-leaderboard" format="auto" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
