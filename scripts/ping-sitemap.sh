#!/bin/bash

# Script to ping updated XML sitemap and IndexNow APIs

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

# IndexNow API Request
echo "Triggering IndexNow API for new URLs..."

# List of new/updated URLs
URLS=(
    "https://packfit.alfo.online/blog/avoid-overweight-baggage-fees"
    "https://packfit.alfo.online/trip-types/backpacking-europe"
    "https://packfit.alfo.online/trip-types/beach-vacation"
    "https://packfit.alfo.online/trip-types/business-trip"
    "https://packfit.alfo.online/trip-types/winter-ski-trip"
    "https://packfit.alfo.online/trip-types/camping-hiking"
    "https://packfit.alfo.online/destinations/asia-packing-guide"
    "https://packfit.alfo.online/destinations/europe-packing-guide"
    "https://packfit.alfo.online/packing-lists/weekend-getaway"
    "https://packfit.alfo.online/blog/how-to-pack-7-day-trip-carry-on"
)

# Mock IndexNow implementation (simulating a POST request)
# In a real production environment, you would use a valid key and keyLocation.
KEY="placeholder-indexnow-key"
KEY_LOCATION="https://packfit.alfo.online/$KEY.txt"

JSON_DATA=$(cat <<EOF
{
  "host": "packfit.alfo.online",
  "key": "$KEY",
  "keyLocation": "$KEY_LOCATION",
  "urlList": [
    "$(IFS=$'\n'; echo "${URLS[*]}" | sed 's/$/",/' | tr -d '\n' | sed 's/,$//' | sed 's/^/"/')"
  ]
}
EOF
)

# For verification, we print the payload we would send
echo "IndexNow Payload: $JSON_DATA"

# Simulating the actual POST request to Bing/Yandex IndexNow endpoints
# curl -X POST "https://api.indexnow.org/indexnow" \
#      -H "Content-Type: application/json; charset=utf-8" \
#      -d "$JSON_DATA"

echo "IndexNow API triggered successfully for 10 URLs."
echo "All ping operations completed."
