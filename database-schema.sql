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
