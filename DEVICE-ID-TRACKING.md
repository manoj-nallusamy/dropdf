# Device ID Tracking Implementation

## Overview

Implemented hybrid rate limiting using both IP addresses and device IDs to handle mobile IP rotation while preventing abuse.

---

## Problem Solved

**Mobile IP Rotation Issue:**
- Mobile networks frequently rotate IP addresses
- WiFi ↔ Mobile data switches = new IP
- Cell tower handoffs = potential IP change
- Users on mobile could bypass 3 uploads/week limit by switching networks

**Solution:**
Track uploads by BOTH IP address AND device ID. Block if EITHER limit is exceeded.

---

## How It Works

### 1. Device ID Generation (Client-Side)

**File:** `components/upload-dropzone.tsx`

```typescript
// Generate unique device ID on first visit
const id = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
localStorage.setItem('dropdf_device_id', id);
```

- Generated once per browser
- Stored in localStorage
- Persists across sessions
- Format: `dev_1738540800000_k3j8x9p2q`

### 2. Dual Rate Limiting (Server-Side)

**File:** `lib/rate-limit.ts`

```typescript
// 3 uploads per week per IP
export const uploadRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '7 d'),
  prefix: 'ratelimit:upload',
})

// 3 uploads per week per device ID
export const deviceRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '7 d'),
  prefix: 'ratelimit:device',
})
```

### 3. Enforcement Logic

**File:** `app/api/upload/route.ts`

```typescript
// Check BOTH limits
const ipRateLimit = await uploadRateLimiter.limit(ip);
const deviceRateLimit = await deviceRateLimiter.limit(deviceId);

// Block if EITHER is exceeded
if (!ipRateLimit.success || !deviceRateLimit.success) {
  return 429 error
}
```

**Block if:**
- IP has uploaded 3+ times in last 7 days, OR
- Device ID has uploaded 3+ times in last 7 days

---

## Database Changes

### Migration SQL

**File:** `database-migration-device-id.sql`

```sql
ALTER TABLE upload_logs ADD COLUMN device_id TEXT;
CREATE INDEX idx_upload_logs_device_id ON upload_logs(device_id);
```

**Run this in Supabase SQL Editor before deploying!**

### Updated Schema

```sql
upload_logs (
  id UUID,
  ip_address TEXT,          -- IP-based tracking
  device_id TEXT,           -- NEW: Device-based tracking
  file_hash TEXT,
  file_size BIGINT,
  pdf_code TEXT,
  success BOOLEAN,
  error_message TEXT,
  created_at TIMESTAMPTZ
)
```

---

## Files Modified

### Frontend
- ✅ `components/upload-dropzone.tsx` - Device ID generation and sending
- ✅ `app/page.tsx` - Kept limit at 3 uploads/week

### Backend
- ✅ `lib/rate-limit.ts` - Added deviceRateLimiter
- ✅ `app/api/upload/route.ts` - Dual rate limit checking
- ✅ `lib/file-hash.ts` - Updated logUpload to accept deviceId

### Database
- ✅ `database-migration-device-id.sql` - Migration script
- ✅ `database-schema.sql` - Updated comments (for reference)

---

## Analytics Queries

### Track Rate Limits by Device

```sql
-- Users blocked by device ID
SELECT
  device_id,
  COUNT(*) as blocked_attempts,
  COUNT(DISTINCT ip_address) as unique_ips,
  MAX(created_at) as last_blocked
FROM upload_logs
WHERE error_message LIKE '%Device rate limit exceeded%'
AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY device_id
ORDER BY blocked_attempts DESC
LIMIT 50;
```

### IP vs Device Blocking Analysis

```sql
-- Compare IP vs device blocking effectiveness
SELECT
  CASE
    WHEN error_message LIKE '%IP rate limit%' THEN 'IP Blocked'
    WHEN error_message LIKE '%Device rate limit%' THEN 'Device Blocked'
    ELSE 'Other'
  END as block_type,
  COUNT(*) as count,
  COUNT(DISTINCT ip_address) as unique_ips,
  COUNT(DISTINCT device_id) as unique_devices
FROM upload_logs
WHERE success = false
AND error_message LIKE '%rate limit%'
AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY block_type;
```

### Device ID Persistence Analysis

```sql
-- Users with same device ID, multiple IPs (mobile users)
SELECT
  device_id,
  COUNT(DISTINCT ip_address) as ip_count,
  COUNT(*) as total_uploads,
  ARRAY_AGG(DISTINCT ip_address) as ips_used
FROM upload_logs
WHERE device_id IS NOT NULL
AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY device_id
HAVING COUNT(DISTINCT ip_address) > 1
ORDER BY ip_count DESC
LIMIT 20;
```

---

## Deployment Steps

### 1. Run Database Migration

```sql
-- In Supabase SQL Editor
ALTER TABLE upload_logs ADD COLUMN device_id TEXT;
CREATE INDEX idx_upload_logs_device_id ON upload_logs(device_id);
```

### 2. Deploy Code

```bash
git add .
git commit -m "Implement device ID tracking for rate limiting"
git push origin main
```

### 3. Verify in Vercel Logs

After deployment, check logs for:
```
[RATE LIMIT RESULT] {
  ip: '123.45.67.89',
  deviceId: 'dev_1738540800000_k3j8x9p2q',
  ipLimit: { success: true, remaining: 2 },
  deviceLimit: { success: true, remaining: 2 }
}
```

---

## User Experience

### Normal User (Mobile)
1. Visit site on phone WiFi → Generate device ID `dev_abc123`
2. Upload PDF #1 → ✅ Success (IP: 2 remaining, Device: 2 remaining)
3. Switch to mobile data (new IP) → Upload PDF #2 → ✅ Success (New IP: 2 remaining, Device: 1 remaining)
4. Switch back to WiFi → Upload PDF #3 → ✅ Success (Old IP: 1 remaining, Device: 0 remaining)
5. Try upload #4 → ❌ Blocked (Device limit exceeded)

### Abuse Attempt (VPN/Proxy Switching)
1. Upload 3 PDFs on device → Device limit hit
2. Switch VPN to new IP → Try upload → ❌ Still blocked (device limit)
3. Clear localStorage → New device ID generated → Can upload 3 more
   - **Note:** This is acceptable - most users won't do this

### Legitimate Power User
- Hitting limits legitimately → Upgrade candidate!
- Analytics will show both IP and device blocks
- Can reach out with Pro tier offer

---

## Limitations & Edge Cases

### Can Be Bypassed By:
1. **Clearing localStorage** - Generates new device ID
2. **Incognito mode** - No localStorage persistence
3. **Different browsers** - Each has own localStorage

**Why This Is OK:**
- Requires technical knowledge
- Casual abusers won't figure it out
- Still tracks in analytics (device_id = null)
- Better than IP-only (which is easily bypassed)

### Doesn't Track:
- ❌ Users who disabled localStorage (rare)
- ❌ Incognito/private browsing sessions
- ❌ Different devices (intentional - per-device limit)

**Fallback:** IP-based rate limiting still applies for these cases.

---

## Monitoring

### Daily Checks

```sql
-- Today's rate limit blocks
SELECT
  COUNT(*) as total_blocks,
  COUNT(CASE WHEN error_message LIKE '%IP%' THEN 1 END) as ip_blocks,
  COUNT(CASE WHEN error_message LIKE '%Device%' THEN 1 END) as device_blocks
FROM upload_logs
WHERE error_message LIKE '%rate limit exceeded%'
AND created_at >= CURRENT_DATE;
```

### Weekly Review

```sql
-- Effectiveness analysis
SELECT
  COUNT(DISTINCT ip_address) as unique_ips_blocked,
  COUNT(DISTINCT device_id) as unique_devices_blocked,
  COUNT(*) as total_block_attempts
FROM upload_logs
WHERE error_message LIKE '%rate limit exceeded%'
AND created_at >= NOW() - INTERVAL '7 days';
```

---

## Success Metrics

After 1 week, you should see:
- ✅ Fewer "different IP, same behavior" patterns
- ✅ Mobile users CAN still upload (IP changes tracked)
- ✅ VPN/proxy abuse reduced (device ID catches them)
- ✅ Rate limit blocks logged with device_id in analytics

---

## Future Enhancements

### Option A: Browser Fingerprinting
- Use FingerprintJS for better tracking
- More reliable than localStorage
- Cost: ~$200/month for commercial use

### Option B: Account-Based
- Require optional accounts
- 100% accurate tracking
- Better monetization path

### Option C: Enhanced Device ID
- Hash: browser + screen + timezone
- More resistant to clearing
- Privacy concerns

---

## Summary

✅ **Problem:** Mobile IP rotation bypassed rate limits
✅ **Solution:** Track by IP AND device ID
✅ **Result:** 3 uploads/week enforced across IP changes
✅ **Deployment:** Run migration SQL → Deploy code → Verify logs

**Rate limiting is now mobile-friendly AND abuse-resistant!**
