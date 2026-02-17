
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/database';
import { compare } from 'bcryptjs';
import { SecurityLogger, SecurityEvent } from '@/lib/security/logger';
import { generateMfaSecret, verifyMfaToken } from '@/lib/security/mfa';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            mfaEnabled: boolean;
        };
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                mfaCode: { label: 'MFA Code', type: 'text' },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const ip = (req.headers && req.headers['x-forwarded-for']) || 'unknown';
                const userAgent = (req.headers && req.headers['user-agent']) || 'unknown';

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    // Log failed login attempt (blind)
                    await SecurityLogger.log(SecurityEvent.LOGIN_FAILED, null, { email: credentials.email, ip, reason: 'User not found' });
                    return null;
                }

                const isValid = await compare(credentials.password, user.password);

                if (!isValid) {
                    await SecurityLogger.log(SecurityEvent.LOGIN_FAILED, user.id, { ip, reason: 'Invalid password' });
                    return null;
                }

                // MFA Check
                if (user.mfaEnabled) {
                    if (!credentials.mfaCode) {
                        throw new Error('MFA_REQUIRED');
                    }
                    const isMfaValid = verifyMfaToken(user.mfaSecret!, credentials.mfaCode);
                    if (!isMfaValid) {
                        await SecurityLogger.log(SecurityEvent.LOGIN_FAILED, user.id, { ip, reason: 'Invalid MFA' });
                        throw new Error('INVALID_MFA');
                    }
                }

                await SecurityLogger.log(SecurityEvent.LOGIN_SUCCESS, user.id, { ip, userAgent });

                return {
                    id: user.id,
                    name: user.email.split('@')[0], // Schema has no name field
                    email: user.email,
                    role: user.role,
                    mfaEnabled: user.mfaEnabled,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.mfaEnabled = (user as any).mfaEnabled;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.mfaEnabled = token.mfaEnabled as boolean;
            }
            return session;
        },
    },
};
