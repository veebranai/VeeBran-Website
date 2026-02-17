
import { Redis } from '@upstash/redis';

// ===== SECURITY: Initialize Redis client =====
// Use fallback for build time/check
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL || 'https://mock.upstash.io',
    token: process.env.UPSTASH_REDIS_TOKEN || 'mock_token'
});

export class RateLimiter {
    // ===== SECURITY: Sliding window rate limiting =====
    static async check(
        key: string,
        maxRequests: number,
        windowSeconds: number
    ): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
        if (!process.env.UPSTASH_REDIS_URL) {
            // Mock implementation if no Redis
            return { allowed: true, remaining: 100, resetIn: 60 };
        }

        const now = Math.floor(Date.now() / 1000);
        const windowStart = now - windowSeconds;

        // Clean old requests
        await redis.zremrangebyscore(key, 0, windowStart);

        // Count current requests
        const count = await redis.zcard(key);

        if (count >= maxRequests) {
            const oldest = await redis.zrange(key, 0, 0, { withScores: true });
            // Fix types for oldest
            const score = (oldest?.[0] as any)?.score || 0;
            const resetIn = score ? windowSeconds - (now - score) : windowSeconds;

            return {
                allowed: false,
                remaining: 0,
                resetIn: Math.max(1, resetIn)
            };
        }

        // Add current request
        await redis.zadd(key, { score: now, member: now.toString() });
        await redis.expire(key, windowSeconds);

        return {
            allowed: true,
            remaining: maxRequests - count - 1,
            resetIn: windowSeconds
        };
    }

    // ===== SECURITY: IP-based rate limiting =====
    static async checkIP(
        ip: string,
        endpoint: string,
        maxRequests: number = 100,
        windowSeconds: number = 60
    ): Promise<{ allowed: boolean; remaining: number }> {
        const key = `ratelimit:ip:${ip}:${endpoint}`;
        return this.check(key, maxRequests, windowSeconds);
    }

    // ===== SECURITY: User-based rate limiting =====
    static async checkUser(
        userId: string,
        endpoint: string,
        maxRequests: number = 1000,
        windowSeconds: number = 3600
    ): Promise<{ allowed: boolean; remaining: number }> {
        const key = `ratelimit:user:${userId}:${endpoint}`;
        return this.check(key, maxRequests, windowSeconds);
    }

    // ===== SECURITY: Clear rate limit =====
    static async clear(key: string): Promise<void> {
        if (!process.env.UPSTASH_REDIS_URL) return;
        await redis.del(key);
    }
}
