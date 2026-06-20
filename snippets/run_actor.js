// Run the Trip.com & Ctrip Reviews Scraper on Apify and print the results.
//
// Install:  npm install apify-client
// Docs:     https://apify.com/factden/ctrip-trip-reviews-scraper

import { ApifyClient } from 'apify-client';

// Get your token from https://console.apify.com/settings/integrations
const client = new ApifyClient({ token: '<YOUR_APIFY_TOKEN>' });

const input = {
    startUrls: [
        'https://www.trip.com/hotels/macau-hotel-detail-344983/galaxy-hotel/', // Trip.com (English)
        'https://hotels.ctrip.com/hotels/1286148.html',                         // Ctrip / 携程 (Chinese)
    ],
    maxReviewsPerHotel: 100,
    sortBy: 'mostRecent',
};

// Start the actor and wait for it to finish
const run = await client.actor('factden/ctrip-trip-reviews-scraper').call(input);

// Fetch the resulting dataset
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const row of items) {
    console.log(`${row.overallRating}  [${row.source}]  ${row.hotelName}`);
    if (row.ownerResponse) {
        console.log('   ↳ hotel responded');
    }
}
