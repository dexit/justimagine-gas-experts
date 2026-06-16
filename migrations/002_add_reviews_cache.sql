-- D1 Migration: Add reviews_cache table for Google Reviews storage
-- Stores scraped Google My Business reviews with 1-day TTL caching

CREATE TABLE IF NOT EXISTS reviews_cache (
  id TEXT PRIMARY KEY,
  service_slug TEXT NOT NULL,
  author TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  source TEXT DEFAULT 'google' CHECK(source IN ('google', 'trustpilot', 'feefo')),
  url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  is_featured BOOLEAN DEFAULT 0,
  verified BOOLEAN DEFAULT 1,
  FOREIGN KEY (service_slug) REFERENCES services(slug)
);

-- Index for efficient per-service queries
CREATE INDEX IF NOT EXISTS idx_reviews_service_slug ON reviews_cache(service_slug);
CREATE INDEX IF NOT EXISTS idx_reviews_expires_at ON reviews_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews_cache(rating DESC);

-- View for active (non-expired) reviews only
CREATE VIEW IF NOT EXISTS active_reviews AS
SELECT * FROM reviews_cache
WHERE expires_at > CURRENT_TIMESTAMP AND verified = 1
ORDER BY rating DESC, scraped_at DESC;

-- View for service review statistics
CREATE VIEW IF NOT EXISTS review_stats AS
SELECT
  service_slug,
  COUNT(*) as total_reviews,
  AVG(rating) as avg_rating,
  COUNT(CASE WHEN is_featured = 1 THEN 1 END) as featured_count,
  MAX(scraped_at) as last_scraped
FROM reviews_cache
WHERE expires_at > CURRENT_TIMESTAMP AND verified = 1
GROUP BY service_slug;
