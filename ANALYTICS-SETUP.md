# DropDF Analytics & Monitoring Setup Guide

This guide will help you set up comprehensive analytics and monitoring for DropDF using your existing Supabase infrastructure plus Vercel Analytics.

## Quick Summary

**Time Investment:** ~3 hours total
- Supabase Dashboard Setup: 2-3 hours
- Vercel Analytics: ✅ Already installed (5 minutes)
- SQL Queries: 30 minutes to review and customize

**What You Get:**
- 19 pre-built SQL queries for all key metrics
- Dashboard setup instructions
- Real-time web analytics via Vercel
- Zero additional cost (using existing infrastructure)

---

## Part 1: Vercel Analytics ✅ COMPLETE

**Status:** Already installed and configured!

Vercel Analytics is now tracking:
- Page views
- Unique visitors
- Top pages
- Referrers
- Devices & browsers
- Geographic data

**To View Analytics:**
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your DropDF project
3. Click "Analytics" in the sidebar
4. View real-time web traffic data

**No additional configuration needed!**

---

## Part 2: Supabase Analytics Dashboard Setup

### Overview

You have access to comprehensive data in your Supabase database:

**Data Sources:**
- `upload_logs` table - Every upload attempt with IP, file hash, success/failure, timestamps
- `pdfs` table - PDF metadata with view counts and last viewed timestamps
- `blocked_ips` table - Security and abuse tracking

**What You Can Track:**
- ✅ Daily/weekly upload trends
- ✅ User behavior and frequency
- ✅ File size patterns and storage usage
- ✅ View counts and engagement rates
- ✅ Success rates and error patterns
- ✅ Peak usage times
- ✅ Power users (upgrade candidates)
- ✅ Security and abuse metrics

### Step-by-Step Setup Instructions

#### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project: https://supabase.com/dashboard
2. Select your DropDF project
3. Click **"SQL Editor"** in the left sidebar

#### Step 2: Create the Daily Stats View (Foundation)

This creates a reusable view for daily statistics:

```sql
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
```

**Run this query first** - it creates a view you can query easily later.

#### Step 3: Create Your First Chart

Let's start with a simple **Daily Uploads Chart**:

1. In SQL Editor, run this query:
```sql
SELECT * FROM daily_stats LIMIT 30;
```

2. After the query runs, click **"Save"** button (top right)
3. Name it: "Daily Upload Stats"
4. Click **"Save as Chart"** option
5. Configure the chart:
   - **Chart Type:** Line Chart
   - **X-axis:** date
   - **Y-axis:** Select `total_uploads` and `successful_uploads`
   - **Title:** "Daily Uploads (Last 30 Days)"

6. Click **"Save"** to add to dashboard

**Congratulations!** You've created your first analytics chart. 🎉

#### Step 4: Create Additional Key Charts

Now let's add the most important metrics. For each chart below:
1. Run the query in SQL Editor
2. Click "Save as Chart"
3. Configure as described

---

### CHART 2: User Growth (Weekly)

**Query:**
```sql
SELECT
  DATE_TRUNC('week', created_at) as week,
  COUNT(*) as uploads,
  COUNT(DISTINCT ip_address) as unique_users
FROM upload_logs
GROUP BY DATE_TRUNC('week', created_at)
ORDER BY week DESC
LIMIT 12;
```

**Chart Config:**
- Type: Line Chart
- X-axis: week
- Y-axis: unique_users
- Title: "Weekly Active Users"

**Why This Matters:** Track if your user base is growing week-over-week.

---

### CHART 3: Upload Success Rate (KPI)

**Query:**
```sql
SELECT
  COUNT(*) as total_uploads,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful_uploads,
  ROUND(100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate_pct
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '7 days';
```

**Chart Config:**
- Type: Metric/Number
- Display: success_rate_pct
- Title: "7-Day Upload Success Rate"

**Why This Matters:** If this drops below 95%, something is wrong with your infrastructure.

---

### CHART 4: Top Uploaders (Power Users)

**Query:**
```sql
SELECT
  ip_address,
  COUNT(*) as upload_count,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful_uploads,
  MAX(created_at) as last_upload
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY ip_address
ORDER BY upload_count DESC
LIMIT 20;
```

**Chart Config:**
- Type: Table
- Title: "Top 20 Uploaders This Week"

**Why This Matters:** These are your upgrade candidates! Users with 3+ uploads/week need Pro plans.

---

### CHART 5: File Size Distribution

**Query:**
```sql
SELECT
  CASE
    WHEN file_size < 1024 * 1024 THEN '<1MB'
    WHEN file_size < 2 * 1024 * 1024 THEN '1-2MB'
    WHEN file_size < 5 * 1024 * 1024 THEN '2-5MB'
    ELSE '>5MB'
  END as size_range,
  COUNT(*) as upload_count
FROM upload_logs
WHERE success = true
AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY size_range;
```

**Chart Config:**
- Type: Pie Chart or Bar Chart
- Title: "File Size Distribution (Last 30 Days)"

**Why This Matters:** Understand storage patterns and costs.

---

### CHART 6: Most Viewed PDFs

**Query:**
```sql
SELECT
  short_code,
  original_filename,
  view_count,
  last_viewed_at,
  created_at
FROM pdfs
WHERE expires_at > NOW()
AND view_count > 0
ORDER BY view_count DESC
LIMIT 20;
```

**Chart Config:**
- Type: Bar Chart or Table
- X-axis: short_code
- Y-axis: view_count
- Title: "Most Viewed PDFs (Active)"

**Why This Matters:** See which PDFs are being shared and viewed most.

---

### CHART 7: Engagement Rate

**Query:**
```sql
SELECT
  COUNT(*) as total_pdfs,
  COUNT(CASE WHEN view_count > 0 THEN 1 END) as viewed_pdfs,
  ROUND(100.0 * COUNT(CASE WHEN view_count > 0 THEN 1 END) / COUNT(*), 2) as view_rate_pct,
  ROUND(AVG(view_count), 2) as avg_views_per_pdf
FROM pdfs
WHERE created_at >= NOW() - INTERVAL '30 days';
```

**Chart Config:**
- Type: Metric/Number
- Display: view_rate_pct and avg_views_per_pdf
- Title: "Engagement Metrics (30 Days)"

**Why This Matters:** Shows how many uploaded PDFs actually get viewed (viral coefficient).

---

### CHART 8: Peak Usage Hours

**Query:**
```sql
SELECT
  EXTRACT(HOUR FROM created_at) as hour_of_day,
  COUNT(*) as upload_count,
  COUNT(DISTINCT ip_address) as unique_users
FROM upload_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour_of_day;
```

**Chart Config:**
- Type: Bar Chart
- X-axis: hour_of_day
- Y-axis: upload_count
- Title: "Peak Usage by Hour (Last 7 Days)"

**Why This Matters:** Plan infrastructure scaling and maintenance windows.

---

## Part 3: All Available Queries

The file `supabase-analytics-queries.sql` contains **19 comprehensive queries** organized into sections:

### Section 1: Upload Metrics
- Daily upload stats
- Hourly distribution
- Weekly growth rate

### Section 2: User Behavior
- Top uploaders
- User frequency distribution
- Rate limit analysis

### Section 3: File & Storage
- File size statistics
- File size distribution
- Duplicate detection

### Section 4: Engagement
- Most viewed PDFs
- View rates
- Viral coefficient

### Section 5: Errors & Quality
- Failure analysis
- Success rate trends

### Section 6: Security
- Blocked IPs
- Abuse patterns

### Section 7: Executive Summary
- Overall KPIs with week-over-week comparison
- Quick stats for homepage

**To use any query:**
1. Open `supabase-analytics-queries.sql`
2. Copy the query you need
3. Run it in Supabase SQL Editor
4. Save as Chart or view results

---

## Part 4: Dashboard Organization

### Recommended Dashboard Layout

**Top Row (KPIs):**
- Chart 3: Upload Success Rate
- Chart 7: Engagement Rate
- Quick metric: Total Active Users (7 days)

**Second Row (Trends):**
- Chart 1: Daily Uploads
- Chart 2: Weekly User Growth

**Third Row (Behavior):**
- Chart 4: Top Uploaders (Table)
- Chart 8: Peak Usage Hours

**Fourth Row (Content):**
- Chart 6: Most Viewed PDFs
- Chart 5: File Size Distribution

---

## Part 5: Monitoring Best Practices

### Daily Checks (5 minutes)
1. Check Upload Success Rate - should be >95%
2. Look at Daily Uploads trend - any anomalies?
3. Review Top Uploaders - any suspicious activity?

### Weekly Reviews (30 minutes)
1. Analyze weekly growth metrics
2. Review engagement rates
3. Identify power users (upgrade candidates)
4. Check for errors or failures

### Monthly Deep Dives (1-2 hours)
1. Review all 19 query results
2. Look for trends in file sizes and storage
3. Analyze peak usage patterns
4. Review security metrics
5. Plan infrastructure scaling

---

## Part 6: Key Metrics to Watch

### Growth Metrics
| Metric | Target | Where to Find |
|--------|--------|---------------|
| DAU (Daily Active Users) | Growing | Chart 1 |
| WAU (Weekly Active Users) | Growing | Chart 2 |
| Week-over-Week Growth | >10% | Query 3 |
| New Users | Growing | Chart 1 |

### Engagement Metrics
| Metric | Target | Where to Find |
|--------|--------|---------------|
| View Rate | >60% | Chart 7 |
| Avg Views per PDF | >3 | Chart 7 |
| Upload Success Rate | >95% | Chart 3 |

### Monetization Signals
| Metric | Action | Where to Find |
|--------|--------|---------------|
| Users with 3+ uploads/week | → Upgrade targets | Chart 4 |
| File uploads >5MB | → Pro tier needed | Chart 5 |
| Power users (10+ uploads) | → Business tier | Chart 4 |

---

## Part 7: Alerts & Notifications

### Set Up Alerts (Optional but Recommended)

You can set up alerts for critical metrics:

1. **Success Rate Alert** (if drops below 90%)
2. **Error Spike Alert** (if failures increase by 50%)
3. **Storage Alert** (if approaching limits)

**How to set up:**
- Use Supabase Database Webhooks
- Or set up a simple cron job that runs queries and sends emails
- Or integrate with monitoring services like Better Stack or UptimeRobot

---

## Part 8: Cost & Scaling

### Current Costs
- **Supabase:** Included in your current plan
- **Vercel Analytics:** Free tier (10k events/month)
- **Total Additional Cost:** $0

### When to Upgrade

**Vercel Analytics Pro** ($10/month) when:
- You exceed 10k page views/month
- You need conversion tracking
- You want audience insights

**Consider Adding Posthog** (Free up to 1M events) when:
- You launch paid plans
- You need funnel analysis
- You want session recordings
- You need feature flags

---

## Part 9: Next Steps

### After Setup (This Week)
- [ ] Create the 8 recommended charts
- [ ] Organize dashboard layout
- [ ] Set up weekly review calendar reminder
- [ ] Share dashboard with team

### Future Enhancements (When Launching Paid Plans)
- [ ] Add conversion funnel tracking
- [ ] Implement Posthog for product analytics
- [ ] Add user authentication and tracking
- [ ] Create revenue and MRR dashboards
- [ ] Set up automated reports

---

## Part 10: Troubleshooting

### Common Issues

**Q: Query returns no results**
A: Check your date ranges - you might not have data for that period yet.

**Q: Can't see "Save as Chart" button**
A: Make sure you're on the Supabase Pro plan or higher. Free tier has limited chart features.

**Q: Vercel Analytics not showing data**
A: Wait 24 hours after deployment. Analytics data can take time to populate.

**Q: Slow query performance**
A: Add indexes on frequently queried columns:
```sql
CREATE INDEX idx_upload_logs_created_at ON upload_logs(created_at);
CREATE INDEX idx_upload_logs_ip_address ON upload_logs(ip_address);
CREATE INDEX idx_pdfs_view_count ON pdfs(view_count);
```

---

## Summary

You now have:
✅ Vercel Analytics tracking web traffic
✅ 19 pre-built SQL queries for all metrics
✅ 8 recommended charts for your dashboard
✅ Complete setup instructions
✅ Best practices for monitoring
✅ Zero additional costs

**Time to set up:** 2-3 hours
**Time to maintain:** 5 minutes daily, 30 minutes weekly

**Next Action:** Open Supabase SQL Editor and create your first chart! Start with the Daily Upload Stats (Chart 1).

---

## Support Resources

- Supabase SQL Editor Docs: https://supabase.com/docs/guides/database/sql-editor
- Vercel Analytics Docs: https://vercel.com/docs/analytics
- All queries: `supabase-analytics-queries.sql`
- This guide: `ANALYTICS-SETUP.md`

**Questions?** Review the queries in `supabase-analytics-queries.sql` - each has detailed comments explaining its purpose.
