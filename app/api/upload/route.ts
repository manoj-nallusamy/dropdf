import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { supabase } from '@/lib/supabase';
import { CONSTANTS } from '@/lib/constants';
import { generateShortCode, getExpiryDate } from '@/lib/utils';
import { uploadRateLimiter, getClientIp } from '@/lib/rate-limit';
import { generateFileHash, checkDuplicateUpload, logUpload } from '@/lib/file-hash';
import { verifyTurnstile } from '@/lib/turnstile';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const skipRateLimits = process.env.SKIP_RATE_LIMITS === 'true';

  // DEBUG: Log IP detection and rate limit config
  console.log('[RATE LIMIT DEBUG]', {
    ip,
    isDevelopment,
    skipRateLimits,
    hasRedisUrl: !!process.env.UPSTASH_REDIS_URL,
    hasRedisToken: !!process.env.UPSTASH_REDIS_TOKEN,
    headers: {
      'x-forwarded-for': request.headers.get('x-forwarded-for'),
      'x-real-ip': request.headers.get('x-real-ip'),
    },
  });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const turnstileToken = formData.get('turnstileToken') as string | null;

    // === ABUSE PROTECTION CHECKS ===

    // 1. Check if IP is blocked (skip in dev if SKIP_RATE_LIMITS=true)
    if (!skipRateLimits) {
      const { data: blockedIp } = await supabase
        .from('blocked_ips')
        .select('reason')
        .eq('ip_address', ip)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .single();

      if (blockedIp) {
        return NextResponse.json(
          { error: `Access denied: ${blockedIp.reason}` },
          { status: 403 }
        );
      }
    }

    // 2. CAPTCHA verification (skip in dev mode)
    if (!isDevelopment) {
      if (turnstileToken) {
        const isValid = await verifyTurnstile(turnstileToken, ip);
        if (!isValid) {
          return NextResponse.json(
            { error: 'CAPTCHA verification failed. Please try again.' },
            { status: 403 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'CAPTCHA required' },
          { status: 400 }
        );
      }
    }

    // 3. Rate limiting (3 uploads per week per IP) - skip if SKIP_RATE_LIMITS=true
    if (!skipRateLimits) {
      const rateLimitResult = await uploadRateLimiter.limit(ip);

      // DEBUG: Log rate limit result
      console.log('[RATE LIMIT RESULT]', {
        ip,
        success: rateLimitResult.success,
        limit: rateLimitResult.limit,
        remaining: rateLimitResult.remaining,
        reset: rateLimitResult.reset,
        resetDate: new Date(rateLimitResult.reset).toISOString(),
      });

      if (!rateLimitResult.success) {
        // Log rate limit failure to Supabase for analytics
        try {
          if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileHash = generateFileHash(buffer);
            await logUpload(
              ip,
              fileHash,
              file.size,
              null,
              false,
              `Rate limit exceeded: ${rateLimitResult.limit} uploads per week`
            );
          }
        } catch (logError) {
          console.error('Failed to log rate limit error:', logError);
        }

        return NextResponse.json(
          {
            error: `Rate limit exceeded. Free tier allows ${rateLimitResult.limit} uploads per week.`,
            remaining: 0,
            resetAt: new Date(rateLimitResult.reset).toISOString(),
          },
          { status: 429 }
        );
      }
    }

    // === FILE VALIDATION ===

    // 4. Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // 5. Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // 6. Validate file size
    if (file.size > CONSTANTS.MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size must be under ${CONSTANTS.MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // 7. Duplicate upload check (skip if SKIP_RATE_LIMITS=true)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileHash = generateFileHash(buffer);

    if (!skipRateLimits) {
      const isDuplicate = await checkDuplicateUpload(ip, fileHash);
      if (isDuplicate) {
        await logUpload(ip, fileHash, file.size, null, false, 'Duplicate upload (3+ times in 24h)');
        return NextResponse.json(
          { error: 'You have uploaded this file too many times. Please try again in 24 hours.' },
          { status: 429 }
        );
      }
    }

    // === UPLOAD PROCESS ===

    // Generate short code and R2 key
    const shortCode = generateShortCode();
    const r2Key = `pdfs/${shortCode}.pdf`;
    const expiresAt = getExpiryDate(); // Now uses 7-day expiry

    // Upload to R2
    await uploadToR2(r2Key, buffer, file.type);

    // Save metadata to Supabase
    const { error: dbError } = await supabase.from('pdfs').insert({
      short_code: shortCode,
      original_filename: file.name,
      file_size: file.size,
      r2_key: r2Key,
      mime_type: file.type,
      expires_at: expiresAt.toISOString(),
    });

    if (dbError) {
      console.error('Database error:', dbError);
      await logUpload(ip, fileHash, file.size, null, false, dbError.message);
      return NextResponse.json(
        { error: 'Failed to save file metadata' },
        { status: 500 }
      );
    }

    // Log successful upload
    await logUpload(ip, fileHash, file.size, shortCode, true, null);

    // Return success with link
    const url = `${CONSTANTS.APP_URL}/${shortCode}`;

    return NextResponse.json({
      success: true,
      url,
      shortCode,
      filename: file.name,
      size: file.size,
      expiresAt: expiresAt.toISOString(),
    });

  } catch (error) {
    console.error('Upload error:', error);

    // Try to log the error if we have file info
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileHash = generateFileHash(buffer);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        await logUpload(ip, fileHash, file.size, null, false, errorMessage);
      }
    } catch {
      // Ignore logging errors
    }

    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
