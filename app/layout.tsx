import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://packingcubeoptimizer.com'),
  title: "Packing Cube Optimizer | Pack smarter, fit more",
  description: "An interactive visual packing planner that helps travelers optimize luggage space using packing cubes and airline-specific simulations.",
  keywords: ["packing cube optimizer", "luggage space calculator", "carry on size checker", "packing simulator", "travel tool"],
  openGraph: {
    title: "Packing Cube Optimizer | Pack smarter, fit more",
    description: "An interactive visual packing planner that helps travelers optimize luggage space using packing cubes and airline-specific simulations.",
    url: "https://packingcubeoptimizer.com",
    siteName: "Packing Cube Optimizer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packing Cube Optimizer | Pack smarter, fit more",
    description: "An interactive visual packing planner that helps travelers optimize luggage space using packing cubes and airline-specific simulations.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://packingcubeoptimizer.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Packing Cube Optimizer",
  "description": "An interactive visual packing planner that helps travelers optimize luggage space using packing cubes and airline-specific simulations.",
  "url": "https://packingcubeoptimizer.com",
  "applicationCategory": "TravelApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Google Analytics (GA4) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
