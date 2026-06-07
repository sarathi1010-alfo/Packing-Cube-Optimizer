# SEO Architecture Guidelines for Alfo Ecosystem

This document outlines the centralized SEO architecture used across the Alfo tool ecosystem to ensure we avoid leaking Vercel staging domains (`*.vercel.app`) into production indexation.

## Why this matters
When deploying Next.js applications on Vercel, Vercel automatically generates preview and staging domains (e.g., `alfo-palette-generator.vercel.app`). If search engines discover these URLs:
1. **Duplicate Content Penalty:** Google indexes the same content under the `.vercel.app` domain and your custom domain (`paletteflow.alfo.online`), splitting your link equity and hurting rankings.
2. **Incorrect Canonicalization:** If your `sitemap.xml`, `robots.txt`, or `<link rel="canonical">` points to the `vercel.app` domain or uses relative URLs incorrectly, Google might select the Vercel domain as the primary source of truth.
3. **Broken Social Previews:** OpenGraph and Twitter cards require absolute URLs. Hardcoding them or letting them default to staging environments breaks link previews when users share your tools.

---

## 1. Centralized Site Configuration (`config/site.ts`)

**BEFORE:**
Hardcoded URLs scattered throughout the app.
```typescript
// app/sitemap.ts
const BASE_URL = 'https://alfo-palette-generator.vercel.app';
```

**AFTER:**
A centralized configuration that relies on environment variables, preventing staging domains from taking precedence.
```typescript
// config/site.ts
export const siteConfig = {
  name: "Tool Name",
  description: "Description of the tool",
  // If NEXT_PUBLIC_SITE_URL is provided, use it.
  // Otherwise fallback safely based on environment.
  url: process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://yourcustomdomain.alfo.online",
  ogImage: "/og-image.png",
};
```

---

## 2. Preventing Vercel Indexing (`next.config.ts`)

**BEFORE:**
No headers set; Google bots can freely crawl and index `*.vercel.app` URLs.

**AFTER:**
We explicitly attach an `X-Robots-Tag: noindex, nofollow` header to all requests hitting the Vercel deployment domain. This guarantees that even if Google finds the `.vercel.app` link, it drops it from the index immediately.
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<host>.*\\.vercel\\.app)',
          },
        ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};
export default nextConfig;
```

---

## 3. Dynamic Metadata and JSON-LD (`app/layout.tsx`)

**BEFORE:**
Hardcoded `vercel.app` or generic URLs in standard HTML `<meta>` tags.

**AFTER:**
Utilizing Next.js 13+ `Metadata` API backed by `siteConfig`.
```typescript
// app/layout.tsx
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    url: siteConfig.url,
    images: [{ url: \`\${siteConfig.url}\${siteConfig.ogImage}\` }],
  },
  // ...
};
```

---

## 4. Robots & Sitemap Generation

**BEFORE:**
Static `robots.txt` pointing to relative sitemaps, or `sitemap.ts` hardcoding Vercel domains.

**AFTER:**
Dynamic resolution based on `siteConfig`.
```typescript
// app/robots.ts
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: \`\${siteConfig.url}/sitemap.xml\`,
  };
}
```

---

## Deployment & Verification Checklist

1. **Environment Variables Configuration (Vercel):**
   - Go to your Vercel Project Settings > Environment Variables.
   - Add `NEXT_PUBLIC_SITE_URL` and set it to your custom production domain (e.g., `https://paletteflow.alfo.online`).
   - Uncheck the "Preview" and "Development" environments for this variable if you want the fallbacks to trigger locally.

2. **Testing Commands (Local Validation):**
   - Run a production build locally to ensure Next.js resolves metadata correctly:
     \`\`\`bash
     npm run build && npm run start
     \`\`\`
   - Check the rendered HTML (`view-source:http://localhost:3000`):
     - Does `<link rel="canonical" ...>` point to the correct URL?
     - Do the `og:url` and `og:image` tags have absolute URLs?

3. **Search Console Validation Steps:**
   - Go to **Google Search Console**.
   - Inspect a known `.vercel.app` URL for your site. Request indexing. It should return an error stating that the `X-Robots-Tag: noindex` is preventing indexation.
   - Inspect your custom domain URL. Ensure the "User-declared canonical" matches the "Google-selected canonical".
   - Submit your explicit custom domain sitemap URL (e.g., `https://paletteflow.alfo.online/sitemap.xml`) to the "Sitemaps" tab in GSC.
