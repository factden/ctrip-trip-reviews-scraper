#!/usr/bin/env bash
# Run the Trip.com & Ctrip Reviews Scraper on Apify with curl, then fetch the dataset.
# Docs: https://apify.com/factden/ctrip-trip-reviews-scraper

TOKEN="<YOUR_APIFY_TOKEN>"   # https://console.apify.com/settings/integrations

# Run the actor synchronously and get dataset items back in one call
curl -s -X POST \
  "https://api.apify.com/v2/acts/factden~ctrip-trip-reviews-scraper/run-sync-get-dataset-items?token=${TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
    "startUrls": [
      "https://www.trip.com/hotels/macau-hotel-detail-344983/galaxy-hotel/",
      "https://hotels.ctrip.com/hotels/1286148.html"
    ],
    "maxReviewsPerHotel": 100,
    "sortBy": "mostRecent"
  }'
