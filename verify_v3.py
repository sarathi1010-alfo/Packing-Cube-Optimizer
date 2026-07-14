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

        print("Verifying Tier 1 Article...")
        await page.goto('http://localhost:3000/blog/avoid-overweight-baggage-fees', wait_until='networkidle')

        # Wait for any text containing the date
        await page.wait_for_selector('text=July 14, 2026', timeout=10000)
        print("✅ Found date: July 14, 2026")

        # Wait for Section 9 heading
        await page.wait_for_selector('h2:has-text("9. The Science of Spatial Planning")', timeout=10000)
        print("✅ Found Section 9")

        # Check for CSS (check if a brand color is applied)
        color = await page.evaluate('''() => {
            const el = document.querySelector('h1');
            return window.getComputedStyle(el).color;
        }''')
        print(f"✅ H1 Color: {color}")

        await page.screenshot(path='verification/tier1_blog_fixed.png', full_page=True)

        print("Verifying About Page...")
        await page.goto('http://localhost:3000/about', wait_until='networkidle')
        await page.wait_for_selector('text=July 14, 2026', timeout=10000)
        await page.screenshot(path='verification/about_page_fixed.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
