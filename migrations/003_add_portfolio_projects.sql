-- Portfolio Projects Table (Phase 2: Database-backed projects)
-- For admin-managed projects that can be created/edited via form + Vercel Blob uploads

CREATE TABLE portfolio_projects (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  
  -- Core metadata
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('heating-installation', 'heating-upgrade', 'commercial', 'emergency', 'maintenance', 'controls')),
  featured BOOLEAN DEFAULT 0,
  
  -- Project details
  client TEXT NOT NULL,
  service TEXT NOT NULL,
  location TEXT NOT NULL,
  result TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  
  -- Content
  content TEXT NOT NULL, -- HTML content (from editor)
  
  -- Images (JSON array of URLs from Vercel Blob)
  images TEXT DEFAULT '[]', -- JSON array: ["/path/to/image1.jpg", ...]
  
  -- Dates
  date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Soft delete
  deleted_at DATETIME
);

CREATE INDEX idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX idx_portfolio_featured ON portfolio_projects(featured);
CREATE INDEX idx_portfolio_date ON portfolio_projects(date DESC);
CREATE INDEX idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX idx_portfolio_deleted ON portfolio_projects(deleted_at);

-- View: Active projects (not deleted)
CREATE VIEW active_portfolio_projects AS
SELECT * FROM portfolio_projects
WHERE deleted_at IS NULL
ORDER BY featured DESC, date DESC;

-- View: Statistics
CREATE VIEW portfolio_stats AS
SELECT 
  category,
  COUNT(*) as total,
  COUNT(CASE WHEN featured = 1 THEN 1 END) as featured_count
FROM portfolio_projects
WHERE deleted_at IS NULL
GROUP BY category;
