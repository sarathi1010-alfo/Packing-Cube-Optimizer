import { MetadataRoute } from 'next';
import { generatePseoSlugs } from '@/lib/data/pseo';
import { getAirlines, getTemplates } from '@/lib/data';
import { siteConfig } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = siteConfig.url;

  const coreRoutes: MetadataRoute.Sitemap = [
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
    '/blog',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const airlines: MetadataRoute.Sitemap = getAirlines().map((airline) => ({
    url: `${BASE_URL}/airlines/${airline.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const templates: MetadataRoute.Sitemap = getTemplates().map((template) => ({
    url: `${BASE_URL}/templates/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = [
    '/blog/avoid-overweight-baggage-fees',
    '/blog/how-to-pack-7-day-trip-carry-on',
    '/blog/ultimate-guide-to-packing-cubes',
    '/blog/packing-cubes-vs-rolling-clothes',
    '/blog/packing-cubes-vs-folding',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const programmaticGuides: MetadataRoute.Sitemap = [
    '/trip-types/backpacking-europe',
    '/trip-types/beach-vacation',
    '/trip-types/business-trip',
    '/trip-types/winter-ski-trip',
    '/trip-types/camping-hiking',
    '/destinations/asia-packing-guide',
    '/destinations/europe-packing-guide',
    '/packing-lists/weekend-getaway',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Programmatic SEO Pages (top 500 matching generateStaticParams in app/packing-cubes/[slug]/page.tsx)
  const allPseoSlugs = generatePseoSlugs();
  const pseoRoutes: MetadataRoute.Sitemap = allPseoSlugs.slice(0, 500).map((slug) => ({
    url: `${BASE_URL}/packing-cubes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...coreRoutes,
    ...airlines,
    ...templates,
    ...blogRoutes,
    ...programmaticGuides,
    ...pseoRoutes,
  ];
}
