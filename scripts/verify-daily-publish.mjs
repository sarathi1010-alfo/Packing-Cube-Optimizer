import { chromium } from 'playwright';

const urls = [
  '/',
  '/blog/avoid-overweight-baggage-fees',
  '/blog/how-to-pack-7-day-trip-carry-on',
  '/trip-types/backpacking-europe',
  '/trip-types/beach-vacation',
  '/trip-types/business-trip',
  '/trip-types/winter-ski-trip',
  '/trip-types/camping-hiking',
  '/destinations/asia-packing-guide',
  '/destinations/europe-packing-guide',
  '/packing-lists/weekend-getaway',
  '/about'
];

async function verify() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('--- Starting Verification ---');

  for (const url of urls) {
    const fullUrl = `http://localhost:3000${url}`;
    try {
      const response = await page.goto(fullUrl);
      const status = response?.status();

      if (status === 200) {
        console.log(`✅ 200 OK: ${url}`);
      } else {
        console.log(`❌ ${status} FAIL: ${url}`);
        process.exit(1);
      }

      // Check for schema
      const schemaCount = await page.locator('script[type="application/ld+json"]').count();
      if (schemaCount > 0) {
         console.log(`   └─ Schema found: ${schemaCount}`);
      } else if (url !== '/' && url !== '/about' && url !== '/blog') {
         console.log(`   └─ ⚠️ No Schema found on ${url}`);
      }
    } catch (e) {
      console.log(`❌ FAIL to load ${url}: ${e.message}`);
      process.exit(1);
    }
  }

  // Functional test on simulator
  console.log('--- Testing Simulator Functionality ---');
  await page.goto('http://localhost:3000/simulator');
  await page.waitForSelector('h1:has-text("Visual Packing Simulator")');
  console.log('✅ Simulator loaded');

  await browser.close();
  console.log('--- Verification Complete ---');
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
