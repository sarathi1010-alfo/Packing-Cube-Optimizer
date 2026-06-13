// Environment-based URL handling ensures we always use the canonical domain.
// In Vercel, NEXT_PUBLIC_SITE_URL can be set explicitly to the custom domain (e.g., https://packingcubeoptimizer.com)
// If running locally, it falls back to localhost.
// This prevents Vercel preview domains or default vercel.app URLs from leaking into production SEO.

// Ensure the fallback strictly defaults to the production canonical domain during builds
const getCanonicalUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "https://packingcubeoptimizer.com";
};

export const siteConfig = {
  fix-sitemap-seo-issues-16073368391899089897
  name: "Packing Cube Optimizer",
  description: "An interactive visual packing planner that helps travelers optimize luggage space using packing cubes and airline-specific simulations.",
  url: getCanonicalUrl(),
  name: "PackFit",
  description: "Your personal system for packing consistency. Pack smarter, fit more, travel lighter, and never forget essentials again with our smart, habit-forming workflow.",
  url: process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://packingcubeoptimizer.com", // Your hardcoded production fallback
    jules-packing-cube-optimizer-initial-scaffold-813445941459206371
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/alfo_online",
    github: "https://github.com/alfo-online",
  },
};
