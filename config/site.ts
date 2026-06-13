// Environment-based URL handling ensures we always use the canonical domain.
// In Vercel, NEXT_PUBLIC_SITE_URL can be set explicitly to the custom domain (e.g., https://packingcubeoptimizer.com)
// If running locally, it falls back to localhost.
// This prevents Vercel preview domains or default vercel.app URLs from leaking into production SEO.

export const siteConfig = {
  name: "PackFit",
  description: "Your personal system for packing consistency. Pack smarter, fit more, travel lighter, and never forget essentials again with our smart, habit-forming workflow.",
  url: process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://packingcubeoptimizer.com", // Your hardcoded production fallback
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/alfo_online",
    github: "https://github.com/alfo-online",
  },
};
