import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

// 3 uploads per week per IP
export const uploadRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '7 d'),
  analytics: true,
  prefix: 'ratelimit:upload',
})

// 3 uploads per week per device ID
export const deviceRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '7 d'),
  analytics: true,
  prefix: 'ratelimit:device',
})

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return realIp || 'unknown'
}
