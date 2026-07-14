#!/bin/bash

# Mock script to ping updated XML sitemap and IndexNow APIs

echo "Starting sitemap ping process..."

# Define the production sitemap URL
SITEMAP_URL="https://packfit.alfo.online/sitemap.xml"

# Ping Google
echo "Pinging Google..."
curl -s "https://www.google.com/ping?sitemap=$SITEMAP_URL" > /dev/null
echo "Google ping complete."

# Ping Bing (via IndexNow or standard ping)
echo "Pinging Bing..."
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP_URL" > /dev/null
echo "Bing ping complete."

# Mock IndexNow API Request
echo "Triggering IndexNow API for new URLs..."

# In a real scenario, this would be a POST request with the specific URLs and a host key
curl -X POST "https://api.indexnow.org/indexnow" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
          "host": "packfit.alfo.online",
          "key": "your-indexnow-key",
          "keyLocation": "https://packfit.alfo.online/your-indexnow-key.txt",
          "urlList": [
              "https://packfit.alfo.online/blog/avoid-overweight-baggage-fees",
              "https://packfit.alfo.online/trip-types/disney-world-trip",
              "https://packfit.alfo.online/trip-types/road-trip-usa",
              "https://packfit.alfo.online/trip-types/all-inclusive-resort",
              "https://packfit.alfo.online/destinations/spain-packing-guide",
              "https://packfit.alfo.online/destinations/portugal-packing-guide",
              "https://packfit.alfo.online/destinations/switzerland-packing-guide",
              "https://packfit.alfo.online/packing-lists/glamping-checklist",
              "https://packfit.alfo.online/packing-lists/hiking-day-trip-checklist"
          ]
      }'

echo "IndexNow API triggered successfully."
echo "All ping operations completed."
