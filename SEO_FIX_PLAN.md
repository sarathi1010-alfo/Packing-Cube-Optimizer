# SEO Fix Plan - January 20, 2025

Based on the review of Google Search Console (GSC) coverage reports and technical audit of `https://packfit.alfo.online`.

## 1. Address "Discovered - currently not indexed" (Tier 2 Pages)
**Status:** Several programmatic pages under `/trip-types/`, `/destinations/`, and `/packing-lists/` are discovered but not yet indexed.
**Root Cause:** Low internal link depth and crawl budget allocation.
**Fixes:**
- [x] Added internal link from `/about` to the new Tier 1 article.
- [x] Published 8 unique Tier 2 programmatic pages with AI Snapshots and FAQ Schema (2026-07-08).
- [x] Triggered IndexNow API for all new Tier 2 URLs.
- [ ] Implement a "Featured Guides" section on the homepage (`/`) that randomly cycles or lists the latest 5 programmatic guides.
- [ ] Add a "Related Guides" component to the bottom of all Tier 2 pages to increase cross-linking between programmatic entities.
- [x] Verified `sitemap.ts` includes all 8 primary programmatic guides in the first sitemap chunk (id=0).

## 2. Address "Crawled - currently not indexed" (Thin Content)
**Status:** Risk of programmatic pages being flagged as thin content.
**Fixes:**
- [x] Verified that all 8 new programmatic pages have unique, hand-written H2/H3 content and AI Snapshots.
- [x] Injected FAQ schema (JSON-LD) into all Tier 2 pages to increase "richness" and entity signals.
- [ ] Add dynamic data tables (e.g., "Recommended Packing Cube Sizes") to each programmatic page to further differentiate content.

## 3. Resolve 404 Errors
**Status:** Identifying broken internal links.
**Fixes:**
- [ ] Run a full site crawl using a headless script to identify any dead links.
- [ ] Map any identified 404s to 301 redirects in `next.config.ts`.
- [ ] *Immediate Action:* Ensure any references to old `/blog/overweight-fees` (if any existed) are updated to the new slug `/blog/avoid-overweight-baggage-fees`.

## 4. Eliminate Vercel Domain Leakage
**Status:** Prevent `*.vercel.app` from being indexed.
**Fixes:**
- [x] Confirmed `next.config.ts` sends `X-Robots-Tag: noindex, nofollow` when host matches `*.vercel.app`.
- [x] Verified `robots.ts` uses absolute production URLs.
- [x] Confirmed `siteConfig.url` is used for all canonical tags.

## 5. Monitoring & Validation
- [ ] Re-submit the sitemap index to GSC after today's deployment.
- [ ] Monitor the "Indexing" report for a 20% increase in indexed URLs over the next 7 days.
