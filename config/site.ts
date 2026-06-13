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
  name: "Packing Cube Optimizer",
  description: "An interactive visual packing planner that helps travelers optimize luggage space using packing cubes and airline-specific simulations.",
  url: getCanonicalUrl(),
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/alfo_online",
    github: "https://github.com/alfo-online",
  },
};
