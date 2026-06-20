# Examples

All real public review data collected with the actor.

- **`input.json`** — a ready‑to‑run actor input (one Trip.com hotel + one Ctrip hotel).
- **`reviews-output.sample.json`** — **3 real review rows** showing the full v1.1 field shape: a Trip.com row (Galaxy
  Macau, with a hotel `ownerResponse`), a Ctrip row (Sofitel Beijing, with `reviewer.ipLocation`), and a Ctrip row for
  the New York Hilton **posted from the USA** (no owner response). Shows the nested `reviewer` / `ownerResponse`
  objects and the `subRatings` array.
- **`reviews-sample.csv`** — **100 real reviews** (25 per hotel, both locales), browsable right in GitHub's table
  view. CSV‑flattened: `reviewer_*` columns, `ownerResponse_text`, and `subRatings` joined into one cell.

Run the actor for any hotel: **https://apify.com/factden/ctrip-trip-reviews-scraper?fpr=factden**
