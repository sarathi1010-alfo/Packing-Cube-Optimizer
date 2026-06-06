import { MetadataRoute } from 'next';
import { generatePseoSlugs } from '@/lib/data/pseo';
import { getAirlines, getTemplates } from '@/lib/data';

const BASE_URL = 'https://packingcubeoptimizer.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Core routes
  const coreRoutes = [
    '',
    '/calculator',
    '/carry-on-checker',
    '/simulator',
    '/airlines',
    '/templates'
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  // Airlines
  const airlines = getAirlines().map((airline) => ({
    url: `${BASE_URL}/airlines/${airline.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Templates
  const templates = getTemplates().map((template) => ({
    url: `${BASE_URL}/templates/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Programmatic SEO Pages
  // Note: Next.js app router sitemap has a 50,000 URL limit.
  // For massive scale, you would chunk this or use generateSitemaps.
  const pseoSlugs = generatePseoSlugs();
  const pseoRoutes = pseoSlugs.map((slug) => ({
    url: `${BASE_URL}/packing-cubes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...coreRoutes, ...airlines, ...templates, ...pseoRoutes];
}
