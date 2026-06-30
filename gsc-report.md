# Google Search Console (GSC) Coverage Fix Plan

**Property:** `https://packfit.alfo.online`

## 1. Current Status Review (Hypothetical based on standard Next.js deployments)
*   **Excluded URLs (Discovered - currently not indexed):** Often caused by crawl budget issues or Google prioritizing other URLs.
*   **Excluded URLs (Crawled - currently not indexed):** Content quality or thin content issues.
*   **404 Errors:** Broken internal links or deprecated pages.
*   **Alternate page with proper canonical tag:** Expected behavior for Vercel deployment URLs (`*.vercel.app`) if `X-Robots-Tag` is implemented correctly, but needs verification.

## 2. Action Plan

### A. Address "Discovered - currently not indexed"
*   **Action:** Ensure the new programmatic pages (Tier 2) are highly interlinked. The current architecture relies on `<RelatedTools>` and `<RelatedGuides>`, but we need to ensure deeper linking from high-authority pages (like the Homepage or main Blog index).
*   **Fix:** Manually request indexing for the top-level `/trip-types`, `/destinations`, and `/packing-lists` hub pages (if they exist) or submit the specific XML sitemap chunks directly in GSC.

### B. Address "Crawled - currently not indexed"
*   **Action:** Review the newly generated programmatic pages.
*   **Fix:** Ensure that the static `content` and `faqs` in `PAGES` (in Tier 2 step) are distinct enough. The current implementation uses unique, hand-written content for each of the 8 pages, which should satisfy Google's quality threshold and avoid thin content penalties. Monitor these specific URLs in GSC over the next 2 weeks.

### C. Address 404 Errors
*   **Action:** Run a crawler (like Screaming Frog or Sitebulb) locally or in staging to find any broken internal links.
*   **Fix:** Set up 301 redirects in `next.config.ts` for any permanently removed pages, pointing them to the most relevant live page (e.g., an old `/luggage-rules` page should 301 redirect to `/airlines`).

### D. Verify Canonicalization and Vercel Domain Leakage
*   **Action:** Confirm that no `*.vercel.app` URLs are being indexed as primary canonicals.
*   **Fix:** We have verified that `next.config.ts` contains the `X-Robots-Tag: noindex, nofollow` header for `*.vercel.app` domains, and `siteConfig.ts` uses absolute URLs. Verify in GSC that the custom domain is the "User-declared canonical".

## 3. Post-Publishing Monitoring
*   Check the "Page Indexing" report in GSC 48 hours after today's publish event.
*   Verify that the 9 new URLs (1 Tier 1, 8 Tier 2) appear in the "Indexed" category.
*   Monitor the "Enhancements" tab to ensure the `FAQPage` and `Article` schema are parsing correctly without warnings.
