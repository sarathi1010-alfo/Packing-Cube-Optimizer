import { NextResponse } from 'next/server';
import { generateSitemaps } from '@/app/sitemap';
import { siteConfig } from '@/config/site';

export async function GET() {
  const sitemaps = await generateSitemaps();

  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((sitemap) => `  <sitemap>
    <loc>${siteConfig.url}/sitemap/${sitemap.id}.xml</loc>
  </sitemap>`).join('\n')}
</sitemapindex>
`;

  return new NextResponse(sitemapIndexXML, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
