
import { prisma } from '@/lib/database';

// ===== SECURITY: Row-level security enforcement =====
export class SecurityMiddleware {
    // ===== SECURITY: Ensure user can only access their own data =====
    static async authorizeProposalAccess(
        userId: string,
        proposalId: string,
        requiredRole?: 'admin' | 'owner'
    ): Promise<boolean> {
        const proposal = await prisma.proposal.findUnique({
            where: { id: proposalId },
            select: { userId: true }
        });

        if (!proposal) return false;

        // Admin can access any proposal
        if (requiredRole === 'admin') {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { role: true }
            });

            if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
                return true;
            }
        }

        // Owner can access their own proposals
        return proposal.userId === userId;
    }

    // ===== SECURITY: Rate limiting =====
    static async checkRateLimit(
        identifier: string,
        endpoint: string,
        maxRequests: number = 100,
        windowSeconds: number = 60
    ): Promise<{ allowed: boolean; remaining: number }> {
        const windowStart = new Date(Date.now() - windowSeconds * 1000);

        // Clean old rate limit records
        await prisma.rateLimit.deleteMany({
            where: {
                windowStart: {
                    lt: windowStart
                }
            }
        });

        // Get or create rate limit record
        const rateLimit = await prisma.rateLimit.upsert({
            where: {
                identifier_endpoint_windowStart: {
                    identifier,
                    endpoint,
                    windowStart
                }
            },
            create: {
                identifier,
                endpoint,
                windowStart,
                count: 1
            },
            update: {
                count: {
                    increment: 1
                }
            }
        });

        const remaining = Math.max(0, maxRequests - rateLimit.count);
        return {
            allowed: rateLimit.count <= maxRequests,
            remaining
        };
    }

    // ===== SECURITY: Input sanitization =====
    static sanitizeInput(input: any): any {
        if (typeof input === 'string') {
            return input
                .trim()
                .replace(/[<>]/g, '') // Remove HTML tags
                .replace(/javascript:/gi, '') // Remove JS injection
                .replace(/on\w+=/g, ''); // Remove event handlers
        }

        if (typeof input === 'object' && input !== null) {
            return Object.fromEntries(
                Object.entries(input).map(([key, value]) => [
                    key,
                    this.sanitizeInput(value)
                ])
            );
        }

        return input;
    }

    // ===== SECURITY: SQL injection prevention =====
    static preventSQLInjection(input: string): string {
        return input
            .replace(/'/g, "''") // Escape single quotes
            .replace(/\\/g, '\\\\') // Escape backslashes
            .replace(/;/g, ''); // Remove semicolons
    }

    // ===== SECURITY: XSS prevention =====
    static preventXSS(input: string): string {
        // In a browser environment, we could use DOMParser or document.createElement.
        // In Node/Server environment, we need a library like 'dompurify' or imply input is safe for rendering if sanitized.
        // The previous implementation used document.createElement which fails in Node.
        // I will use a simple regex replacement or placeholder for Node env.

        return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}
