export async function verifyTurnstile(
  token: string,
  ip: string
): Promise<boolean> {
  const startTime = Date.now();

  console.log('[TURNSTILE] Verification started', {
    timestamp: new Date().toISOString(),
    ip,
    tokenPrefix: token?.substring(0, 20) + '...',
    tokenLength: token?.length,
  });

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: token,
          remoteip: ip,
        }),
      }
    )

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      console.error('[TURNSTILE] API returned non-200 status', {
        status: response.status,
        statusText: response.statusText,
        responseTime,
      });
      return false;
    }

    const data = await response.json()

    const isSuccess = data.success === true;

    if (isSuccess) {
      console.log('[TURNSTILE] Verification successful', {
        responseTime,
        hostname: data.hostname,
        challengeTs: data.challenge_ts,
      });
    } else {
      console.error('[TURNSTILE] Verification failed', {
        responseTime,
        errorCodes: data['error-codes'],
        hostname: data.hostname,
        challengeTs: data.challenge_ts,
        action: data.action,
        cdata: data.cdata,
        fullResponse: data,
      });
    }

    return isSuccess;
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('[TURNSTILE] Verification exception', {
      error: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      responseTime,
    });
    return false;
  }
}
