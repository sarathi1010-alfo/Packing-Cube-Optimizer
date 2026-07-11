import { chromium } from 'playwright';

const urls = [
  '/',
  '/blog/avoid-overweight-baggage-fees',
  '/blog/how-to-pack-7-day-trip-carry-on',
  '/blog/ultimate-guide-to-packing-cubes',
  '/blog/packing-cubes-vs-rolling-clothes',
  '/blog/packing-cubes-vs-folding',
  '/trip-types/backpacking-europe',
  '/trip-types/beach-vacation',
  '/trip-types/business-trip',
  '/trip-types/winter-ski-trip',
  '/trip-types/camping-hiking',
  '/trip-types/7-day-trip',
  '/trip-types/weekend-getaway',
  '/destinations/asia-packing-guide',
  '/destinations/europe-packing-guide',
  '/micro-answers',
  '/micro-answers/what-are-packing-cubes',
  '/micro-answers/best-way-to-pack-clothes',
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

      // Check for content headings
      const h1 = await page.textContent('h1');
      if (h1) {
          console.log(`   └─ H1: ${h1.trim().substring(0, 50)}...`);
      }

    } catch (e) {
      console.log(`❌ FAIL to load ${url}: ${e.message}`);
      process.exit(1);
    }
  }

  await browser.close();
  console.log('--- Verification Complete ---');
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
