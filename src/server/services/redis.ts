import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// Export redis instance
export { redis }

/**
 * Cache key constants for consistent naming
 */
export const CACHE_KEYS = {
  LEADERBOARD: 'leaderboard:global',
  TWITTER_FEED: 'twitter:feed:global',
  USER_STATS: (userId: string) => `user:stats:${userId}`,
  TWITTER_USER: (username: string) => `twitter:user:${username}`,
  RATE_LIMIT: (identifier: string) => `rate_limit:${identifier}`,
  IMAGE_GENERATION: (userId: string) => `rate_limit:image:${userId}`,
} as const

/**
 * Rate limiting function
 * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
 * @param max - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with success status and remaining requests
 */
export async function checkRateLimit(
  key: string,
  max: number = 10,
  windowMs: number = 60000
): Promise<{ success: boolean; remaining: number; resetAt?: number }> {
  if (!redis) {
    // If Redis is not configured, allow all requests (dev mode)
    console.warn('Redis not configured - rate limiting disabled')
    return { success: true, remaining: max }
  }

  try {
    const cacheKey = CACHE_KEYS.RATE_LIMIT(key)
    const current = await redis.get<number>(cacheKey)
    
    if (current && current >= max) {
      const ttl = await redis.ttl(cacheKey)
      return {
        success: false,
        remaining: 0,
        resetAt: Date.now() + (ttl * 1000),
      }
    }
    
    const newCount = await redis.incr(cacheKey)
    
    // Set expiration on first request
    if (newCount === 1) {
      await redis.expire(cacheKey, Math.floor(windowMs / 1000))
    }
    
    return {
      success: true,
      remaining: Math.max(0, max - newCount),
      resetAt: Date.now() + windowMs,
    }
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // On error, allow the request
    return { success: true, remaining: max }
  }
}

/**
 * Generic cache helper with automatic JSON serialization
 * @param key - Cache key
 * @param fallback - Function to call if cache miss
 * @param ttlSeconds - Time to live in seconds
 */
export async function getCached<T>(
  key: string,
  fallback: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> {
  if (!redis) {
    // If Redis not configured, always fetch fresh data
    return fallback()
  }

  try {
    // Try to get from cache
    const cached = await redis.get<T>(key)
    if (cached !== null && cached !== undefined) {
      return cached
    }
    
    // Cache miss - fetch fresh data
    const fresh = await fallback()
    
    // Store in cache for next time
    await redis.set(key, fresh, { ex: ttlSeconds })
    
    return fresh
  } catch (error) {
    console.error('Cache operation failed:', error)
    // On error, fallback to fresh data
    return fallback()
  }
}

/**
 * Invalidate (delete) a cache entry
 */
export async function invalidateCache(key: string): Promise<void> {
  if (!redis) return
  
  try {
    await redis.del(key)
  } catch (error) {
    console.error('Cache invalidation failed:', error)
  }
}

/**
 * Invalidate multiple cache entries matching a pattern
 * Note: This uses SCAN which is safe for production but may be slow
 */
export async function invalidateCachePattern(pattern: string): Promise<void> {
  if (!redis) return
  
  try {
    // Note: Upstash Redis doesn't support SCAN, so we'll need to track keys manually
    // For now, just log a warning
    console.warn('Pattern-based cache invalidation not fully supported with Upstash')
  } catch (error) {
    console.error('Pattern cache invalidation failed:', error)
  }
}

/**
 * Set a value in cache
 */
export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds?: number
): Promise<void> {
  if (!redis) return
  
  try {
    if (ttlSeconds) {
      await redis.set(key, value, { ex: ttlSeconds })
    } else {
      await redis.set(key, value)
    }
  } catch (error) {
    console.error('Cache set failed:', error)
  }
}

/**
 * Get a value from cache
 */
export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null
  
  try {
    return await redis.get<T>(key)
  } catch (error) {
    console.error('Cache get failed:', error)
    return null
  }
}

/**
 * Check if Redis is connected and working
 */
export async function checkRedisHealth(): Promise<boolean> {
  if (!redis) return false
  
  try {
    await redis.ping()
    return true
  } catch (error) {
    console.error('Redis health check failed:', error)
    return false
  }
}

