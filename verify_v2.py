import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        if not os.path.exists('verification'):
            os.makedirs('verification')

        # Tier 1 Article Verification
        print("Verifying Tier 1 Article...")
        await page.goto('http://localhost:3000/blog/avoid-overweight-baggage-fees', wait_until='networkidle')

        # Check Date
        date_element = await page.wait_for_selector('text="July 14, 2026"')
        print(f"✅ Found date: {await date_element.inner_text()}")

        # Check Section 9
        section_element = await page.wait_for_selector('text="9. The Science of Spatial Planning"')
        print(f"✅ Found Section 9: {await section_element.inner_text()}")

        # Check AI Snapshot
        snapshot = await page.wait_for_selector('text="summarize the core process"')
        print("✅ AI Snapshot found")

        await page.screenshot(path='verification/tier1_blog_final.png', full_page=True)

        # Tier 2 Verification
        print("Verifying Tier 2 Spain Guide...")
        await page.goto('http://localhost:3000/destinations/spain-packing-guide', wait_until='networkidle')
        await page.wait_for_selector('h1:has-text("Spain Packing Guide")')
        await page.screenshot(path='verification/tier2_spain_final.png')

        # About Page Verification
        print("Verifying About Page...")
        await page.goto('http://localhost:3000/about', wait_until='networkidle')
        await page.wait_for_selector('text="July 14, 2026"')
        await page.screenshot(path='verification/about_page_final.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
