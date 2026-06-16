-- D1 Schema for Just Imagine Gas Experts Admin CMS
-- Persists services, areas, users, lead logs

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  keywords TEXT,
  cta_text TEXT,
  price_from REAL,
  price_to REAL,
  duration TEXT,
  featured BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS areas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  postcodes TEXT,
  latitude REAL,
  longitude REAL,
  description TEXT,
  coverage_radius_miles INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  ref_id TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  email TEXT,
  postcode TEXT,
  service_id TEXT,
  area_id TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_at DATETIME,
  booked_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  level TEXT NOT NULL,
  endpoint TEXT,
  method TEXT,
  status_code INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  message TEXT,
  error_stack TEXT,
  duration_ms INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS utm_tracking (
  id TEXT PRIMARY KEY,
  lead_id TEXT,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  content TEXT,
  term TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_areas_slug ON areas(slug);
CREATE INDEX IF NOT EXISTS idx_leads_ref_id ON leads(ref_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_endpoint ON logs(endpoint);
