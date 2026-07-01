from playwright.sync_api import sync_playwright
import os

def run_verification(page):
    # Base URL
    base_url = "http://localhost:3000"

    # 1. Check Homepage
    print("Checking Homepage...")
    page.goto(base_url)
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/homepage.png")

    # 2. Check New Tier 1 Blog Article
    print("Checking Tier 1 Article...")
    page.goto(f"{base_url}/blog/avoid-overweight-baggage-fees")
    page.wait_for_timeout(1000)

    # Verify AI Snapshot
    if page.locator(".ai-snapshot").is_visible():
        print("AI Snapshot visible on Tier 1 article.")
    else:
        print("ERROR: AI Snapshot NOT visible on Tier 1 article.")

    # Verify Article Schema
    article_schema = page.locator('script[type="application/ld+json"]').filter(has_text='"@type":"Article"').first
    if article_schema.count() > 0:
        print("Article Schema found.")
    else:
        print("ERROR: Article Schema NOT found.")

    # Verify Word Count (roughly)
    content_text = page.locator(".prose").inner_text()
    word_count = len(content_text.split())
    print(f"Tier 1 Article Word Count: {word_count}")
    if word_count >= 1200:
        print("Word count requirement met (1200+).")
    else:
        print(f"WARNING: Word count is {word_count}, which is below 1200.")

    # 3. Check an updated programmatic page
    print("Checking Trip Type Page...")
    page.goto(f"{base_url}/trip-types/backpacking-europe")
    page.wait_for_timeout(1000)

    # Verify FAQ Schema
    # Use a more flexible way to find the script tag, maybe just check all script tags for the text
    scripts = page.locator('script[type="application/ld+json"]').all()
    found_faq = False
    for s in scripts:
        if '"@type":"FAQPage"' in s.inner_html():
            found_faq = True
            break
    if found_faq:
        print("FAQ Schema found on Trip Type page.")
    else:
        print("ERROR: FAQ Schema NOT found on Trip Type page.")

    # 4. Check Updated Older Blog Post
    print("Checking Updated Old Blog Post...")
    page.goto(f"{base_url}/blog/how-to-pack-7-day-trip-carry-on")
    page.wait_for_timeout(1000)
    # Check for link to new article
    link = page.get_by_role("link", name="how to pack efficiently to avoid overweight baggage fees").first
    if link.is_visible():
        print("Internal link to Tier 1 article found in old post.")
    else:
        print("ERROR: Internal link to Tier 1 article NOT found in old post.")

    # 5. Check Airlines page link
    print("Checking Airlines page link...")
    page.goto(f"{base_url}/airlines")
    page.wait_for_timeout(1000)
    link_airlines = page.get_by_role("link", name="how to pack efficiently to avoid overweight baggage fees").first
    if link_airlines.is_visible():
        print("Internal link to Tier 1 article found on Airlines page.")
    else:
        print("ERROR: Internal link to Tier 1 article NOT found on Airlines page.")

    # 6. Verify Core Functionality: Packing Simulator
    print("Verifying Simulator Functionality...")
    page.goto(f"{base_url}/simulator")
    page.wait_for_timeout(2000)
    if page.get_by_role("tab", name="Carry-On").is_visible():
        print("Simulator tabs found.")

    print("Verification complete.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()

        # Listen for console errors
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}") if msg.type == "error" else None)

        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
