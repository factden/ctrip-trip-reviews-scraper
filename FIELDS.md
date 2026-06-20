# Output fields

The Trip.com &amp; Ctrip Reviews Scraper emits one row per public review — **32 data points** across 24 top‑level
fields (related fields are clubbed for tidy JSON and CSV; see below). Trip.com rows return English‑locale content;
Ctrip (携程) rows return Chinese‑locale content. The `source` field (`trip` / `ctrip`) tells you which platform each
row came from. Fields that a given platform doesn't provide are `null`.

## Review fields

| Field | Type | Description |
|---|---|---|
| `reviewId` | string | Unique review identifier. |
| `hotelId` | integer | Numeric hotel identifier from the source URL (shared across Trip.com and Ctrip). |
| `hotelName` | string | Hotel display name in the response locale. |
| `hotelUrl` | string | URL of the hotel page that produced this review (per‑review permalinks are not available). |
| `source` | string | `trip` (Trip.com) or `ctrip` (Ctrip / 携程). |
| `submittedAt` | string \| null | Review submission timestamp in the hotel's local timezone (naive ISO 8601, no offset). |
| `checkInMonth` | string \| null | Guest's check‑in month as `YYYY-MM` (source stores month precision). |
| `reviewer` | object | Reviewer profile, clubbed: `{ name, lifetimeReviews, tier, isAnonymous, ipLocation }`. `name` is `null` when anonymous; `ipLocation` is the Chinese provincial origin (Ctrip rows only, e.g. "Posted from Zhejiang"). |
| `travelType` | string \| null | Travel type label (Business / Family / Friends / Solo / Couple / Other). |
| `roomName` | string \| null | Room type the guest booked. |
| `language` | string \| null | ISO 639‑1 code of the original review text. |
| `overallRating` | number \| null | Overall guest rating on a 0–5 scale (float, not rounded). |
| `ratingLabel` | string \| null | Localized rating tier label (Outstanding, Very good, Good, Average, Poor). |
| `subRatings` | array | Per‑review sub‑ratings as a labeled‑string array (nulls omitted), e.g. `["Cleanliness: 4.9", "Location: 4.7", "Service: 5.0", "Facilities: 4.6"]`. Renders as a single tidy cell in CSV. |
| `reviewText` | string \| null | Original‑language review body. |
| `reviewTextTranslated` | string \| null | Machine‑translated text when the platform provides it (often `null` — only a subset is translated). |
| `isMachineTranslated` | boolean | Whether `reviewTextTranslated` is present and came from the platform's translation engine. |
| `recommends` | boolean \| null | Whether the guest recommends this hotel. |
| `usefulCount` | integer | Helpful‑vote count on the review. |
| `imagesCount` | integer | Number of photos attached to the review. |
| `hasVideo` | boolean | Whether the review has any video attachments. |
| `ownerResponse` | object \| null | Hotel‑management reply, clubbed: `{ text, date }`, or `null` when the hotel has not replied. `date` is in the hotel's local timezone (naive ISO 8601). |
| `markdownContent` | string \| null | **LLM‑ready** self‑contained markdown block for the review — drop straight into a RAG pipeline. |
| `extractedAt` | string (ISO datetime) | When this row was scraped (UTC ISO 8601). |

## Dataset views

The Apify dataset ships two pre‑built views you can switch between in the UI or request via the API:

- **Overview** — the columns most users want first (hotel, rating, the clubbed `subRatings` array, review text, owner response).
- **AI ingest (LLM‑ready)** — `markdownContent` plus the original/translated text, language, rating, and source —
  optimized for vector‑DB / RAG loading.
