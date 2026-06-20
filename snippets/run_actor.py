"""Run the Trip.com & Ctrip Reviews Scraper on Apify and print the results.

Install:  pip install apify-client
Docs:     https://apify.com/factden/ctrip-trip-reviews-scraper
"""

from apify_client import ApifyClient

# Get your token from https://console.apify.com/settings/integrations
client = ApifyClient("<YOUR_APIFY_TOKEN>")

run_input = {
    "startUrls": [
        "https://www.trip.com/hotels/macau-hotel-detail-344983/galaxy-hotel/",  # Trip.com (English)
        "https://hotels.ctrip.com/hotels/1286148.html",                          # Ctrip / 携程 (Chinese)
    ],
    "maxReviewsPerHotel": 100,
    "sortBy": "mostRecent",
}

# Start the actor and wait for it to finish
run = client.actor("factden/ctrip-trip-reviews-scraper").call(run_input=run_input)

# Iterate the resulting dataset
for row in client.dataset(run["defaultDatasetId"]).iterate_items():
    rating = row.get("overallRating")
    print(f"{rating}  [{row.get('source')}]  {row.get('hotelName')}")
    if row.get("ownerResponse"):
        print("   ↳ hotel responded")
