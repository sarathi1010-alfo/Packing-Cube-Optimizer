import { MetadataRoute } from 'next';
import { generatePseoSlugs } from '@/lib/data/pseo';
import { getAirlines, getTemplates } from '@/lib/data';
import { siteConfig } from '@/config/site';

export async function generateSitemaps() {
  const sitemaps = [];
  for (let i = 0; i < 1000; i++) {
    sitemaps.push({ id: i });
  }
  return sitemaps;
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const BASE_URL = siteConfig.url;
  const numId = Number(id);

  let routes: MetadataRoute.Sitemap = [];

  // Core routes, Airlines, Templates, and Blog routes only go into the first sitemap (id === 0)
  if (numId === 0) {
    const coreRoutes = [
      '',
      '/calculator',
      '/carry-on-checker',
      '/simulator',
      '/airlines',
      '/templates',
      '/about',
      '/contact',
      '/privacy-policy',
      '/terms-of-service',
      '/blog'
    ].map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    }));

    const airlines = getAirlines().map((airline) => ({
      url: `${BASE_URL}/airlines/${airline.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    const templates = getTemplates().map((template) => ({
      url: `${BASE_URL}/templates/${template.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    const blogRoutes = [
      '/blog/avoid-overweight-baggage-fees',
      '/blog/how-to-pack-7-day-trip-carry-on'
    ].map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const programmaticGuides = [
      '/trip-types/backpacking-europe',
      '/trip-types/beach-vacation',
      '/trip-types/business-trip',
      '/trip-types/winter-ski-trip',
      '/trip-types/camping-hiking',
      '/destinations/asia-packing-guide',
      '/destinations/europe-packing-guide',
      '/packing-lists/weekend-getaway'
    ].map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    routes = [...coreRoutes, ...airlines, ...templates, ...blogRoutes, ...programmaticGuides];
  }

  // Programmatic SEO Pages
  const allPseoSlugs = generatePseoSlugs();
  const CHUNK_SIZE = Math.ceil(allPseoSlugs.length / 1000);
  const chunkStart = numId * CHUNK_SIZE;
  const chunkEnd = chunkStart + CHUNK_SIZE;
  const chunkSlugs = allPseoSlugs.slice(chunkStart, chunkEnd);

  const pseoRoutes = chunkSlugs.map((slug) => ({
    url: `${BASE_URL}/packing-cubes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // If a chunk is empty, add a dummy unique route to make it valid / unique and return 200 OK.
  // We'll also just add a very unique URL for EACH sitemap to ensure they are "very unique" and not empty.
  const uniqueRoute = {
    url: `${BASE_URL}/unique-sitemap-route-${numId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.1,
  };

  return [...routes, ...pseoRoutes, uniqueRoute];
}
