import { NextResponse } from 'next/server';
import { generateSitemaps } from '@/app/sitemap';
import { siteConfig } from '@/config/site';

export async function GET() {
  const sitemaps = await generateSitemaps();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const sitemap of sitemaps) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${siteConfig.url}/sitemap/${sitemap.id}.xml</loc>\n`;
    xml += '  </sitemap>\n';
  }

  xml += '</sitemapindex>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
