-- DropDF Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- PDFs table
CREATE TABLE pdfs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  short_code VARCHAR(10) UNIQUE NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  r2_key VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100) DEFAULT 'application/pdf',

  -- Stats
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,

  -- Expiry
  expires_at TIMESTAMPTZ NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(50) DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_pdfs_short_code ON pdfs(short_code);
CREATE INDEX idx_pdfs_expires_at ON pdfs(expires_at);
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for pdfs table
CREATE TRIGGER pdfs_updated_at
  BEFORE UPDATE ON pdfs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Comments for documentation
COMMENT ON TABLE pdfs IS 'Stores metadata for uploaded PDF files';
COMMENT ON TABLE waitlist IS 'Stores email addresses for product launch waitlist';
COMMENT ON COLUMN pdfs.short_code IS 'Unique short code used in shareable URLs (e.g., abc123)';
COMMENT ON COLUMN pdfs.r2_key IS 'Cloudflare R2 storage key for the PDF file';
COMMENT ON COLUMN pdfs.expires_at IS 'When the PDF link expires (24 hours for free tier)';
COMMENT ON COLUMN waitlist.source IS 'Where the user signed up from (landing, viewer, etc)';

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on both tables
ALTER TABLE pdfs ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- PDFs table policies
-- Allow anyone to insert PDFs (uploads happen via API with validation)
CREATE POLICY "Anyone can insert PDFs"
  ON pdfs
  FOR INSERT
  WITH CHECK (true);

-- Allow public read access to non-expired PDFs (for viewing)
CREATE POLICY "Public can read non-expired PDFs"
  ON pdfs
  FOR SELECT
  USING (expires_at > NOW());

-- Allow public to increment view count (for tracking views)
CREATE POLICY "Public can update view count"
  ON pdfs
  FOR UPDATE
  USING (expires_at > NOW())
  WITH CHECK (expires_at > NOW());

-- Allow deletion of any PDF (for cleanup/admin tasks)
CREATE POLICY "Anyone can delete PDFs"
  ON pdfs
  FOR DELETE
  USING (true);

-- Waitlist table policies
-- Allow public to insert emails (join waitlist)
CREATE POLICY "Public can join waitlist"
  ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Prevent public from reading waitlist (privacy protection)
-- Note: Service role can still read for admin purposes
CREATE POLICY "Restrict public read on waitlist"
  ON waitlist
  FOR SELECT
  USING (false);

-- ============================================================================
-- Security Notes
-- ============================================================================
--
-- 1. The service_role key used in the app bypasses RLS
-- 2. All database operations happen server-side via API routes
-- 3. These policies provide defense in depth if anon key is ever used
-- 4. For production, consider additional policies based on user auth
