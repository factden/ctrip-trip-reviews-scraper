# How to scrape Trip.com and Ctrip (携程) hotel reviews (the easy way)

Scraping Trip.com and Ctrip directly is painful: aggressive anti‑bot defenses, session requirements, rotating proxies,
and locale handling that splits the same hotel's reviews across two platforms. This guide skips all of that by using
the [Trip.com &amp; Ctrip Reviews Scraper](https://apify.com/factden/ctrip-trip-reviews-scraper?fpr=factden) actor on
Apify — no login, no proxy setup, no anti‑bot tuning.

## 1. Get an Apify token

Create a free [Apify](https://console.apify.com/sign-up?fpr=factden) account and copy your API token from
**Settings → Integrations**. New accounts include $5 of free credit.

## 2. Run it from the Console (no code)

1. Open the [actor page](https://apify.com/factden/ctrip-trip-reviews-scraper?fpr=factden) and click **Try for free**.
2. The input is pre‑filled with two example hotels — one Trip.com URL and one Ctrip URL. Leave them or replace with
   your own.
3. Click **Start**. A small run finishes in well under a minute.
4. Download results from the **Output** tab as JSON, CSV, or Excel.

## 3. Or run it from code

### Python

```python
from apify_client import ApifyClient

client = ApifyClient("<YOUR_APIFY_TOKEN>")
run = client.actor("factden/ctrip-trip-reviews-scraper").call(run_input={
    "startUrls": ["https://www.trip.com/hotels/macau-hotel-detail-344983/galaxy-hotel/"],
    "maxReviewsPerHotel": 200,
})
items = list(client.dataset(run["defaultDatasetId"]).iterate_items())
print(f"Got {len(items)} reviews")
```

See [`snippets/`](./snippets) for Node and curl versions.

## 4. Mix Trip.com and Ctrip freely

Put both URL types in `startUrls` — each hotel is processed in its native locale (Trip.com → English, Ctrip →
Chinese). The `source` field on every row tells you which platform it came from, so you can split or merge the two
corpora downstream.

```json
{
  "startUrls": [
    "https://www.trip.com/hotels/macau-hotel-detail-344983/galaxy-hotel/",
    "https://hotels.ctrip.com/hotels/1286148.html"
  ]
}
```

## 5. Useful input options

| Option | What it does |
|---|---|
| `maxReviewsPerHotel` | Cap reviews per hotel (controls cost). |
| `sortBy` | `mostRelevant`, `mostRecent`, `ratingHighToLow`, `ratingLowToHigh`. |
| `fromDate` / `toDate` | Only reviews in a date window. |
| `minRating` / `maxRating` | Filter by overall rating (1–5). |

Full field reference: [`FIELDS.md`](./FIELDS.md). Full input format: [`examples/input.json`](./examples/input.json).

## 6. Feed it to an LLM

Each review includes a ready‑to‑use `markdownContent` field — no formatting needed:

```python
docs = [row["markdownContent"] for row in items]
# embed `docs` into your vector DB / RAG pipeline
```

---

**▶ [Run the Trip.com &amp; Ctrip Reviews Scraper on Apify →](https://apify.com/factden/ctrip-trip-reviews-scraper?fpr=factden)**
