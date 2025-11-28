-- =====================================================
-- DropDF Analytics & Monitoring Queries
-- Supabase Dashboard Setup
-- =====================================================

-- SECTION 1: DAILY STATS VIEW
-- =====================================================
-- Create a view for daily statistics
CREATE OR REPLACE VIEW daily_stats AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_uploads,
  COUNT(DISTINCT ip_address) as unique_users,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful_uploads,
  SUM(CASE WHEN NOT success THEN 1 ELSE 0 END) as failed_uploads,
  ROUND(100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate,
  ROUND(AVG(CASE WHEN success THEN file_size ELSE NULL END)) as avg_file_size
FROM upload_logs
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Usage: SELECT * FROM daily_stats LIMIT 30;


-- SECTION 2: UPLOAD METRICS
-- =====================================================

-- Query 1: Daily upload stats (last 30 days)
-- Use this for: Tracking daily activity trends
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_uploads,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful,
  SUM(CASE WHEN NOT success THEN 1 ELSE 0 END) as failed,
  COUNT(DISTINCT ip_address) as unique_users,
  ROUND(100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate_pct
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;


-- Query 2: Hourly distribution (peak usage times)
-- Use this for: Understanding when users are most active
SELECT
  EXTRACT(HOUR FROM created_at) as hour_of_day,
  COUNT(*) as upload_count,
  COUNT(DISTINCT ip_address) as unique_users,
  ROUND(AVG(CASE WHEN success THEN file_size ELSE NULL END)) as avg_file_size
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour_of_day;


-- Query 3: Weekly growth rate
-- Use this for: Tracking week-over-week growth
SELECT
  DATE_TRUNC('week', created_at) as week,
  COUNT(*) as uploads,
  COUNT(DISTINCT ip_address) as unique_users,
  LAG(COUNT(*)) OVER (ORDER BY DATE_TRUNC('week', created_at)) as prev_week_uploads,
  ROUND(100.0 * (COUNT(*) - LAG(COUNT(*)) OVER (ORDER BY DATE_TRUNC('week', created_at))) /
    NULLIF(LAG(COUNT(*)) OVER (ORDER BY DATE_TRUNC('week', created_at)), 0), 2) as growth_rate_pct
FROM upload_logs
GROUP BY DATE_TRUNC('week', created_at)
ORDER BY week DESC
LIMIT 12;


-- SECTION 3: USER BEHAVIOR METRICS
-- =====================================================

-- Query 4: Top uploaders (this week)
-- Use this for: Identifying power users and potential paid plan candidates
SELECT
  ip_address,
  COUNT(*) as upload_count,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful_uploads,
  MAX(created_at) as last_upload,
  ROUND(AVG(CASE WHEN success THEN file_size ELSE NULL END)) as avg_file_size
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY ip_address
ORDER BY upload_count DESC
LIMIT 20;


-- Query 5: User frequency distribution (last 30 days)
-- Use this for: Understanding user engagement patterns
SELECT
  CASE
    WHEN upload_count = 1 THEN '1 upload (one-time users)'
    WHEN upload_count <= 3 THEN '2-3 uploads (casual users)'
    WHEN upload_count <= 10 THEN '4-10 uploads (regular users)'
    ELSE '10+ uploads (power users)'
  END as frequency_bucket,
  COUNT(*) as user_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) as percentage
FROM (
  SELECT ip_address, COUNT(*) as upload_count
  FROM upload_logs
  WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY ip_address
) user_uploads
GROUP BY frequency_bucket
ORDER BY
  CASE frequency_bucket
    WHEN '1 upload (one-time users)' THEN 1
    WHEN '2-3 uploads (casual users)' THEN 2
    WHEN '4-10 uploads (regular users)' THEN 3
    ELSE 4
  END;


-- Query 6: Users hitting rate limits (upgrade candidates)
-- Use this for: Identifying power users who need Pro tier
SELECT
  ip_address,
  COUNT(*) as total_attempts,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful_uploads,
  SUM(CASE WHEN error_message LIKE 'Rate limit exceeded%' THEN 1 ELSE 0 END) as rate_limit_blocks,
  MAX(created_at) as last_attempt,
  CASE
    WHEN COUNT(*) >= 3 THEN 'At or above free tier limit'
    ELSE 'Below limit'
  END as status
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY ip_address
HAVING COUNT(*) >= 3
ORDER BY rate_limit_blocks DESC, total_attempts DESC;


-- Query 6B: Rate limit violations only (blocked users)
-- Use this for: Understanding rate limit effectiveness and conversion opportunities
SELECT
  ip_address,
  COUNT(*) as rate_limit_blocks,
  MAX(created_at) as last_blocked_at,
  MIN(created_at) as first_blocked_at,
  EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 3600 as hours_between_blocks
FROM upload_logs
WHERE error_message LIKE 'Rate limit exceeded%'
AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY ip_address
ORDER BY rate_limit_blocks DESC
LIMIT 50;


-- SECTION 4: FILE & STORAGE METRICS
-- =====================================================

-- Query 7: File size statistics
-- Use this for: Understanding storage patterns and costs
SELECT
  COUNT(*) as total_successful_uploads,
  ROUND(AVG(file_size)) as avg_size_bytes,
  ROUND(AVG(file_size) / 1024 / 1024, 2) as avg_size_mb,
  MIN(file_size) as min_size_bytes,
  MAX(file_size) as max_size_bytes,
  SUM(file_size) as total_storage_bytes,
  ROUND(SUM(file_size) / 1024 / 1024 / 1024, 2) as total_storage_gb
FROM upload_logs
WHERE success = true
AND created_at >= NOW() - INTERVAL '30 days';


-- Query 8: File size distribution
-- Use this for: Understanding file size patterns
SELECT
  CASE
    WHEN file_size < 1024 * 1024 THEN '<1MB'
    WHEN file_size < 2 * 1024 * 1024 THEN '1-2MB'
    WHEN file_size < 5 * 1024 * 1024 THEN '2-5MB'
    ELSE '>5MB'
  END as size_range,
  COUNT(*) as upload_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) as percentage
FROM upload_logs
WHERE success = true
AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY size_range
ORDER BY
  CASE size_range
    WHEN '<1MB' THEN 1
    WHEN '1-2MB' THEN 2
    WHEN '2-5MB' THEN 3
    ELSE 4
  END;


-- Query 9: Duplicate upload detection
-- Use this for: Identifying potential abuse or same-file uploads
SELECT
  file_hash,
  COUNT(*) as upload_count,
  COUNT(DISTINCT ip_address) as unique_uploaders,
  MAX(created_at) as last_upload
FROM upload_logs
WHERE success = true
AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY file_hash
HAVING COUNT(*) > 1
ORDER BY upload_count DESC
LIMIT 20;


-- SECTION 5: VIEW & ENGAGEMENT METRICS
-- =====================================================

-- Query 10: Most viewed PDFs (active files only)
-- Use this for: Understanding what content gets shared most
SELECT
  short_code,
  original_filename,
  view_count,
  last_viewed_at,
  created_at,
  ROUND(EXTRACT(EPOCH FROM (last_viewed_at - created_at)) / 3600, 1) as hours_active,
  expires_at
FROM pdfs
WHERE expires_at > NOW()
AND view_count > 0
ORDER BY view_count DESC
LIMIT 20;


-- Query 11: Engagement metrics (views per PDF)
-- Use this for: Understanding overall engagement rates
SELECT
  COUNT(*) as total_pdfs,
  COUNT(CASE WHEN view_count > 0 THEN 1 END) as viewed_pdfs,
  COUNT(CASE WHEN view_count = 0 THEN 1 END) as never_viewed_pdfs,
  ROUND(100.0 * COUNT(CASE WHEN view_count > 0 THEN 1 END) / COUNT(*), 2) as view_rate_pct,
  ROUND(AVG(view_count), 2) as avg_views_per_pdf,
  MAX(view_count) as max_views,
  SUM(view_count) as total_views
FROM pdfs
WHERE created_at >= NOW() - INTERVAL '30 days';


-- Query 12: View trends over time
-- Use this for: Tracking engagement patterns
SELECT
  DATE(created_at) as date,
  COUNT(*) as pdfs_created,
  SUM(view_count) as total_views,
  ROUND(AVG(view_count), 2) as avg_views_per_pdf,
  COUNT(CASE WHEN view_count > 0 THEN 1 END) as viewed_pdfs,
  ROUND(100.0 * COUNT(CASE WHEN view_count > 0 THEN 1 END) / COUNT(*), 2) as view_rate_pct
FROM pdfs
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;


-- Query 13: Viral coefficient (views per upload)
-- Use this for: Measuring sharing/virality
SELECT
  DATE_TRUNC('week', p.created_at) as week,
  COUNT(DISTINCT p.id) as pdfs_created,
  SUM(p.view_count) as total_views,
  ROUND(SUM(p.view_count)::decimal / NULLIF(COUNT(DISTINCT p.id), 0), 2) as views_per_pdf
FROM pdfs p
WHERE p.created_at >= NOW() - INTERVAL '12 weeks'
GROUP BY DATE_TRUNC('week', p.created_at)
ORDER BY week DESC;


-- SECTION 6: ERROR & FAILURE ANALYSIS
-- =====================================================

-- Query 14: Upload failure analysis
-- Use this for: Identifying and fixing issues
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_failures,
  error_message,
  COUNT(DISTINCT ip_address) as affected_users
FROM upload_logs
WHERE success = false
AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at), error_message
ORDER BY date DESC, total_failures DESC;


-- Query 15: Success rate by hour
-- Use this for: Identifying infrastructure issues
SELECT
  DATE(created_at) as date,
  EXTRACT(HOUR FROM created_at) as hour,
  COUNT(*) as total_uploads,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful,
  ROUND(100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate_pct
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at), EXTRACT(HOUR FROM created_at)
HAVING COUNT(*) > 5  -- Filter out low-volume hours
ORDER BY date DESC, hour DESC;


-- SECTION 7: SECURITY & ABUSE METRICS
-- =====================================================

-- Query 16: Blocked IP activity
-- Use this for: Monitoring abuse patterns
SELECT
  ip_address,
  reason,
  blocked_at,
  EXTRACT(DAY FROM (NOW() - blocked_at)) as days_blocked
FROM blocked_ips
ORDER BY blocked_at DESC
LIMIT 50;


-- Query 17: High-frequency uploaders (potential abuse)
-- Use this for: Detecting suspicious activity
SELECT
  ip_address,
  COUNT(*) as upload_count,
  COUNT(DISTINCT file_hash) as unique_files,
  MIN(created_at) as first_upload,
  MAX(created_at) as last_upload,
  EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 60 as timespan_minutes,
  ROUND(COUNT(*)::decimal / NULLIF(EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 60, 0), 2) as uploads_per_minute
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY ip_address
HAVING COUNT(*) > 10
ORDER BY upload_count DESC;


-- SECTION 8: SUMMARY DASHBOARD QUERIES
-- =====================================================

-- Query 18: Overall KPIs (last 7 days vs previous 7 days)
-- Use this for: Executive summary dashboard
WITH current_week AS (
  SELECT
    COUNT(*) as uploads,
    COUNT(DISTINCT ip_address) as users,
    SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful_uploads,
    ROUND(100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate
  FROM upload_logs
  WHERE created_at >= NOW() - INTERVAL '7 days'
),
previous_week AS (
  SELECT
    COUNT(*) as uploads,
    COUNT(DISTINCT ip_address) as users,
    SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful_uploads,
    ROUND(100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate
  FROM upload_logs
  WHERE created_at >= NOW() - INTERVAL '14 days'
  AND created_at < NOW() - INTERVAL '7 days'
)
SELECT
  'Last 7 Days' as period,
  c.uploads,
  c.users,
  c.successful_uploads,
  c.success_rate,
  ROUND(100.0 * (c.uploads - p.uploads)::decimal / NULLIF(p.uploads, 0), 2) as uploads_growth_pct,
  ROUND(100.0 * (c.users - p.users)::decimal / NULLIF(p.users, 0), 2) as users_growth_pct
FROM current_week c, previous_week p

UNION ALL

SELECT
  'Previous 7 Days' as period,
  p.uploads,
  p.users,
  p.successful_uploads,
  p.success_rate,
  NULL as uploads_growth_pct,
  NULL as users_growth_pct
FROM previous_week p;


-- Query 19: Quick Stats (all-time)
-- Use this for: Homepage stats or about page
SELECT
  (SELECT COUNT(*) FROM upload_logs WHERE success = true) as total_uploads_alltime,
  (SELECT COUNT(DISTINCT ip_address) FROM upload_logs) as total_users_alltime,
  (SELECT SUM(view_count) FROM pdfs) as total_views_alltime,
  (SELECT COUNT(*) FROM pdfs WHERE expires_at > NOW()) as active_pdfs,
  (SELECT ROUND(SUM(file_size) / 1024 / 1024 / 1024, 2) FROM upload_logs WHERE success = true) as total_storage_gb_alltime;


-- =====================================================
-- SETUP INSTRUCTIONS FOR SUPABASE DASHBOARD
-- =====================================================
/*
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the queries you want to visualize
4. Click "Save as Chart" to add them to your dashboard
5. Recommended charts to create:

   CHART 1: "Daily Uploads Trend" (Line Chart)
   - Query: Query 1 (Daily upload stats)
   - X-axis: date
   - Y-axis: total_uploads, successful

   CHART 2: "User Growth" (Line Chart)
   - Query: Query 3 (Weekly growth)
   - X-axis: week
   - Y-axis: unique_users

   CHART 3: "Upload Success Rate" (Gauge/Metric)
   - Query: Query 18 (Overall KPIs)
   - Display: success_rate

   CHART 4: "Top Uploaders" (Table)
   - Query: Query 4 (Top uploaders)
   - All columns

   CHART 5: "File Size Distribution" (Pie Chart)
   - Query: Query 8 (File size distribution)
   - Category: size_range
   - Value: upload_count

   CHART 6: "Most Viewed PDFs" (Bar Chart)
   - Query: Query 10 (Most viewed)
   - X-axis: short_code
   - Y-axis: view_count

   CHART 7: "Engagement Rate" (Gauge/Metric)
   - Query: Query 11 (Engagement metrics)
   - Display: view_rate_pct

   CHART 8: "Peak Usage Hours" (Bar Chart)
   - Query: Query 2 (Hourly distribution)
   - X-axis: hour_of_day
   - Y-axis: upload_count

6. Arrange charts on dashboard for best visibility
7. Set refresh interval (e.g., every 5 minutes)
8. Share dashboard URL with team members
*/
