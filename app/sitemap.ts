import { MetadataRoute } from 'next';
import { generatePseoSlugs } from '@/lib/data/pseo';
import { getAirlines, getTemplates } from '@/lib/data';
import { siteConfig } from '@/config/site';

const CHUNK_SIZE = 1000;

export async function generateSitemaps() {
  const pseoSlugs = generatePseoSlugs();
  const numChunks = Math.ceil(pseoSlugs.length / CHUNK_SIZE);

  const sitemaps = [{ id: 0 }]; // For the core, airlines, templates and blog routes + chunk 0 of pSEO
  for (let i = 1; i < numChunks; i++) {
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
      '/blog/how-to-pack-7-day-trip-carry-on'
    ].map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    routes = [...coreRoutes, ...airlines, ...templates, ...blogRoutes];
  }

  // Programmatic SEO Pages
  const allPseoSlugs = generatePseoSlugs();
  const chunkStart = numId * CHUNK_SIZE;
  const chunkEnd = chunkStart + CHUNK_SIZE;
  const chunkSlugs = allPseoSlugs.slice(chunkStart, chunkEnd);

  const pseoRoutes = chunkSlugs.map((slug) => ({
    url: `${BASE_URL}/packing-cubes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...pseoRoutes];
}
