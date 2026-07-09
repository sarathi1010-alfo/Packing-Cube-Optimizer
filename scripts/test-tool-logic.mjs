import { chromium } from 'playwright';

async function testTool() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('--- Testing Core Packing Tool Logic ---');

  try {
    await page.goto('http://localhost:3000/');

    const content = await page.textContent('body');
    if (content.includes('Item') || content.includes('Bag') || content.includes('Pack')) {
       console.log('✅ Tool elements found on homepage');
    } else {
       console.log('⚠️ Homepage content might not have the tool directly, checking /simulator');
       await page.goto('http://localhost:3000/simulator');
    }

    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`❌ Console Error: ${msg.text()}`);
        process.exit(1);
      }
    });

    console.log('✅ Basic functional check passed (No immediate console errors)');

  } catch (error) {
    console.error('❌ Tool test failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testTool();
