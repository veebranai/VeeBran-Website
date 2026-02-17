
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/lib/database';

export enum SecurityEvent {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
    PASSWORD_CHANGE = 'PASSWORD_CHANGE',
    MFA_ENABLED = 'MFA_ENABLED',
    MFA_DISABLED = 'MFA_DISABLED',
    API_KEY_CREATED = 'API_KEY_CREATED',
    API_KEY_REVOKED = 'API_KEY_REVOKED',
    PROPOSAL_CREATED = 'PROPOSAL_CREATED',
    PROPOSAL_ACCESS = 'PROPOSAL_ACCESS',
    RATE_LIMIT_HIT = 'RATE_LIMIT_HIT',
    SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
    SYSTEM_ERROR = 'SYSTEM_ERROR'
}

export class SecurityLogger {
    // ===== SECURITY: Log security event =====
    static async log(
        event: SecurityEvent,
        userId: string | null,
        metadata: Record<string, any> = {}
    ): Promise<void> {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event,
            userId,
            ipAddress: metadata.ipAddress || 'unknown',
            userAgent: metadata.userAgent || 'unknown',
            metadata
        };

        // ===== SECURITY: Send to Sentry for monitoring =====
        if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
            Sentry.captureMessage(`Security Event: ${event}`, {
                level: 'info',
                extra: logEntry
            });
        }

        // ===== SECURITY: Console logging (for development) =====
        if (process.env.NODE_ENV === 'development') {
            console.log('[SECURITY]', logEntry);
        }

        // ===== SECURITY: Store in database =====
        try {
            await prisma.securityLog.create({
                data: {
                    type: event,
                    userId: userId,
                    ipAddress: logEntry.ipAddress,
                    userAgent: logEntry.userAgent,
                    metadata: metadata as any
                }
            });
        } catch (error) {
            console.error('Failed to write security log to DB:', error);
        }
    }

    // ===== SECURITY: Alert on suspicious activity =====
    static async alertSuspiciousActivity(
        userId: string,
        reason: string,
        metadata: Record<string, any>
    ): Promise<void> {
        // ===== SECURITY: Send alert to Sentry =====
        Sentry.captureMessage(`Suspicious Activity Detected`, {
            level: 'warning',
            tags: {
                userId,
                reason
            },
            extra: metadata
        });

        // ===== SECURITY: Log the event =====
        await this.log(SecurityEvent.SUSPICIOUS_ACTIVITY, userId, {
            ...metadata,
            reason
        });
    }

    // ===== SECURITY: Detect anomalous behavior =====
    static async detectAnomaly(
        userId: string,
        currentIp: string,
        currentLocation: string
    ): Promise<boolean> {
        // ===== SECURITY: Check if IP/location has changed dramatically =====

        const recentLogins = await prisma.securityLog.findMany({
            where: {
                userId,
                type: 'LOGIN_SUCCESS',
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        if (recentLogins.length === 0) return false;

        const lastLogin = recentLogins[0];
        const userMetadata = lastLogin.metadata as Record<string, any> | null;
        const lastIp = (userMetadata?.ipAddress || lastLogin.ipAddress) as string | undefined;

        // Flag if IP changed dramatically (simple check)
        if (lastIp && lastIp !== currentIp) {
            await this.alertSuspiciousActivity(userId, 'IP address changed', {
                oldIp: lastIp,
                newIp: currentIp,
                location: currentLocation
            });
            return true;
        }

        return false;
    }
}
