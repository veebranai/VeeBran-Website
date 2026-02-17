
import { Redis } from '@upstash/redis';

// ===== SECURITY: Initialize Redis client =====
// Use fallback for build time/check
// Use lazy initialization to avoid build-time errors
let redis: Redis | null = null;

function getRedis() {
    if (redis) return redis;
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN
        });
        return redis;
    }
    // Also check non-REST keys just in case
    if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
        redis = new Redis({
            url: process.env.UPSTASH_REDIS_URL,
            token: process.env.UPSTASH_REDIS_TOKEN
        });
        return redis;
    }
    return null;
}

export class RateLimiter {
    // ===== SECURITY: Sliding window rate limiting =====
    static async check(
        key: string,
        maxRequests: number,
        windowSeconds: number
    ): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
        const client = getRedis();

        if (!client) {
            // Mock implementation if no Redis (Build time or misconfigured)
            return { allowed: true, remaining: 100, resetIn: 60 };
        }

        const now = Math.floor(Date.now() / 1000);
        const windowStart = now - windowSeconds;

        try {
            // Clean old requests
            await client.zremrangebyscore(key, 0, windowStart);

            // Count current requests
            const count = await client.zcard(key);

            if (count >= maxRequests) {
                const oldest = await client.zrange(key, 0, 0, { withScores: true });
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
            await client.zadd(key, { score: now, member: now.toString() });
            await client.expire(key, windowSeconds);

            return {
                allowed: true,
                remaining: maxRequests - count - 1,
                resetIn: windowSeconds
            };
        } catch (error) {
            console.warn("RateLimiter Redis Error:", error);
            // Fallback to allow if Redis fails
            return { allowed: true, remaining: 100, resetIn: 60 };
        }
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
        const client = getRedis();
        if (!client) return;
        await client.del(key);
    }
}
