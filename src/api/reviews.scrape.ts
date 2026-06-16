import { json, createServerFn } from "@tanstack/start";
import { getRequestContext } from "@tanstack/start";
import { nanoid } from "nanoid";

interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  url?: string;
}

// Placeholder for actual Google Reviews API/scraping logic
// In production, this would:
// 1. Call Google My Business API with OAuth
// 2. OR use a third-party review aggregation service (TrustBox, Trustpilot API)
// 3. OR implement web scraping with rate limits
async function fetchGoogleReviews(serviceSlug: string): Promise<GoogleReview[]> {
  // TODO: Implement actual Google Reviews fetching
  // For now, return placeholder data
  console.log(`[Reviews API] Fetching Google reviews for service: ${serviceSlug}`);

  // In Phase 2, this would be replaced with:
  // const response = await fetch(`https://www.googleapis.com/mybusiness/v4/...`, {
  //   headers: { Authorization: `Bearer ${env.GOOGLE_API_KEY}` }
  // });
  // const data = await response.json();
  // return data.reviews.map(r => ({ ... }));

  return [];
}

export const scrapeReviewsApi = createServerFn(
  { method: "POST" },
  async (payload: { serviceSlug?: string }) => {
    const context = getRequestContext();
    const { db } = context.env;

    if (!db) {
      return json({ error: "Database not configured" }, { status: 500 });
    }

    const { serviceSlug } = payload;

    if (!serviceSlug) {
      return json({ error: "serviceSlug required" }, { status: 400 });
    }

    try {
      // Fetch latest reviews from Google
      const googleReviews = await fetchGoogleReviews(serviceSlug);

      // Prepare batch insert with 24-hour expiry
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      const scrapedAt = new Date().toISOString();

      // Clear old cached reviews for this service
      await db
        .prepare(`DELETE FROM reviews_cache WHERE service_slug = ? AND verified = 0`)
        .bind(serviceSlug)
        .run();

      // Insert new reviews
      const insertedCount = await Promise.all(
        googleReviews.map((review) =>
          db
            .prepare(
              `INSERT INTO reviews_cache (id, service_slug, author, rating, review_text, source, url, expires_at, scraped_at, verified)
               VALUES (?, ?, ?, ?, ?, 'google', ?, ?, ?, 1)`
            )
            .bind(
              nanoid(),
              serviceSlug,
              review.author,
              review.rating,
              review.text,
              review.url || null,
              expiresAt,
              scrapedAt
            )
            .run()
        )
      );

      return json({
        success: true,
        service: serviceSlug,
        reviewsScraped: googleReviews.length,
        expiresAt,
        scrapedAt,
      });
    } catch (error) {
      console.error("[Reviews API] Scrape failed:", error);
      return json(
        {
          error: "Scrape failed",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  }
);
