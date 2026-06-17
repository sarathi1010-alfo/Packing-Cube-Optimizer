// simple build-time SEO validation
console.log("Running SEO validation checks...");
const fs = require('fs');
const path = require('path');

// 1. Verify Site Config
const configPath = path.join(__dirname, '../config/site.ts');
const configContent = fs.readFileSync(configPath, 'utf8');

if (!configContent.includes('getCanonicalUrl()')) {
    console.error("SEO Validation Failed: getCanonicalUrl() missing from config.");
    process.exit(1);
}

// 2. Verify Sitemap generation files exist
const sitemapTs = path.join(__dirname, '../app/sitemap.ts');
const sitemapApi = path.join(__dirname, '../app/api/sitemap-index/route.ts');
if (!fs.existsSync(sitemapTs) || !fs.existsSync(sitemapApi)) {
    console.error("SEO Validation Failed: Sitemap generation routes missing.");
    process.exit(1);
}

// 3. Verify Layout fallback metadata
const layoutTs = path.join(__dirname, '../app/layout.tsx');
const layoutContent = fs.readFileSync(layoutTs, 'utf8');

if (!layoutContent.includes('metadataBase: new URL(siteConfig.url)')) {
    console.error("SEO Validation Failed: metadataBase missing in layout.tsx");
    process.exit(1);
}

if (!layoutContent.includes('alternates: {')) {
    console.error("SEO Validation Failed: canonical missing in layout.tsx");
    process.exit(1);
}


console.log("SEO validation passed.");
