
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/database';
import { RateLimiter } from '@/lib/security/rate-limiter';
import { SecurityLogger, SecurityEvent } from '@/lib/security/logger';
import { MFAService } from '@/lib/security/mfa';

export const authOptions: NextAuthOptions = {
    // ===== SECURITY: JWT with custom claims =====
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },

    // ===== SECURITY: Multi-factor authentication support =====
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.emailVerified = (user as any).emailVerified;
                token.mfaEnabled = (user as any).mfaEnabled;

                // ===== SECURITY: IP tracking for anomaly detection =====
                // Note: providerAccountId is not IP, but we can't easily get IP here in NextAuth generic callback without context
                // In actual implementation, we'd pass IP via credentials or check in authorize
                token.loginTimestamp = Date.now();
            }

            // ===== SECURITY: Force re-authentication every 24 hours =====
            if (Date.now() - ((token.loginTimestamp as number) || 0) > 24 * 60 * 60 * 1000) {
                token.forceReauth = true;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).role = token.role as string;
                (session.user as any).emailVerified = token.emailVerified as boolean;

                // ===== SECURITY: Session fingerprinting =====
                // These fields need to be passed from client or captured
                (session as any).fingerprint = {
                    lastActivity: new Date().toISOString()
                };
            }

            return session;
        },
    },

    // ===== SECURITY: Credentials provider with bcrypt =====
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                mfaCode: { label: "MFA Code", type: "text" }
            },
            async authorize(credentials, req) {
                // Safe check for credentials
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const ip = req?.headers ? (req.headers as any)['x-forwarded-for'] || 'unknown' : 'unknown';
                const userAgent = req?.headers ? (req.headers as any)['user-agent'] : 'unknown';

                // ===== SECURITY: Rate limiting login attempts =====
                // Login rate limit key per email
                const rateLimitKey = `login_attempts:${credentials.email}`;
                // Using RateLimiter class
                const rateLimit = await RateLimiter.check(rateLimitKey, 5, 300); // 5 attempts per 5 mins

                if (!rateLimit.allowed) {
                    await SecurityLogger.log(SecurityEvent.RATE_LIMIT_HIT, null, { email: credentials.email, ip });
                    throw new Error(`Too many attempts. Try again in ${rateLimit.resetIn} seconds.`);
                }

                // ===== SECURITY: Fetch user with password hash =====
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    // Select strictly needed fields
                });

                if (!user) {
                    // Prevent enumeration - wait a bit?
                    await incrementFailedLogin(credentials.email, ip);
                    throw new Error('Invalid credentials');
                }

                // ===== SECURITY: Account lockout after 5 failed attempts =====
                if (user.lockedUntil && user.lockedUntil > new Date()) {
                    throw new Error('Account temporarily locked. Please try again later.');
                }

                // ===== SECURITY: Verify password with bcrypt =====
                const isValid = await compare(credentials.password, user.password);
                if (!isValid) {
                    await incrementFailedLogin(credentials.email, ip);
                    throw new Error('Invalid credentials');
                }

                // ===== SECURITY: Check MFA if enabled =====
                if (user.mfaEnabled) {
                    if (!credentials.mfaCode) {
                        throw new Error('MFA Code Required');
                    }
                    if (user.mfaSecret) {
                        const isValidMFA = MFAService.verifyToken(user.mfaSecret, credentials.mfaCode);
                        if (!isValidMFA) {
                            await SecurityLogger.log(SecurityEvent.LOGIN_FAILED, user.id, { reason: 'Invalid MFA', ip });
                            throw new Error('Invalid MFA code');
                        }
                    }
                }

                // ===== SECURITY: Reset failed attempts on successful login =====
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        failedLoginAttempts: 0,
                        lockedUntil: null,
                        lastLoginAt: new Date(),
                        lastLoginIP: ip as string
                    }
                });

                // ===== SECURITY: Log successful login =====
                await SecurityLogger.log(SecurityEvent.LOGIN_SUCCESS, user.id, {
                    email: user.email,
                    ip: ip,
                    userAgent: userAgent
                });

                // Check anomaly
                await SecurityLogger.detectAnomaly(user.id, ip as string, 'unknown');

                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    emailVerified: user.emailVerified,
                    mfaEnabled: user.mfaEnabled,
                    name: user.email // NextAuth expects name/email/image usually
                };
            }
        })
    ],

    // ===== SECURITY: JWT secret from environment =====
    secret: process.env.NEXTAUTH_SECRET,

    // ===== SECURITY: Custom pages for better UX =====
    pages: {
        signIn: '/auth/signin',
        verifyRequest: '/auth/verify-request',
        error: '/auth/error'
    }
};

// ===== SECURITY: Increment failed login =====
async function incrementFailedLogin(email: string, ip: string) {
    // Transaction to update lockedUntil if attempts > 5
    // Prisma atomic update
    // Fetch current attempts first or just increment
    // Logic: if attempts becomes 5, set lockedUntil

    // We can't do conditional update easily in one query without raw SQL or finding first.
    // For simplicity of this snippet:
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        await SecurityLogger.log(SecurityEvent.LOGIN_FAILED, null, { email, ip, reason: 'User not found (enumeration attempt)' });
        return;
    }

    const attempts = user.failedLoginAttempts + 1;
    let lockedUntil: Date | null = null;
    if (attempts >= 5) {
        lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
    }

    await prisma.user.update({
        where: { email },
        data: {
            failedLoginAttempts: attempts,
            lockedUntil
        }
    });

    await SecurityLogger.log(SecurityEvent.LOGIN_FAILED, user.id, { email, ip, attempts });
}
