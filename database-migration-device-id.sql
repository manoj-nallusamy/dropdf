-- Migration: Add device_id column to upload_logs table
-- Purpose: Track uploads by device ID to handle mobile IP rotation
-- Run this in your Supabase SQL Editor

-- Add device_id column
ALTER TABLE upload_logs
ADD COLUMN device_id TEXT;

-- Add index for device_id queries
CREATE INDEX idx_upload_logs_device_id ON upload_logs(device_id);

-- Add comment
COMMENT ON COLUMN upload_logs.device_id IS 'Browser-generated device ID stored in localStorage';
