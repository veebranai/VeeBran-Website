
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';

export class MFAService {
    // ===== SECURITY: Generate MFA secret and QR code =====
    static async generateSecret(userId: string): Promise<{
        secret: string;
        qrCode: string;
        otpauthUrl: string;
    }> {
        const secret = speakeasy.generateSecret({
            name: `VeeBran:${userId}`,
            length: 20
        });

        // Check if OTPAuth URL exists
        const otpauth_url = secret.otpauth_url;
        if (!otpauth_url) {
            throw new Error('Failed to generate OTP Auth URL');
        }

        const qrCode = await QRCode.toDataURL(otpauth_url);

        return {
            secret: secret.base32,
            qrCode,
            otpauthUrl: otpauth_url
        };
    }

    // ===== SECURITY: Verify MFA code =====
    static verifyToken(
        secret: string,
        token: string,
        window: number = 2
    ): boolean {
        return speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window
        });
    }

    // ===== SECURITY: Generate backup codes =====
    static generateBackupCodes(count: number = 10): string[] {
        const codes: string[] = [];

        for (let i = 0; i < count; i++) {
            // Generate 8-digit backup code
            const code = Math.random().toString(36).substring(2, 10).toUpperCase();
            codes.push(code);
        }

        return codes;
    }

    // ===== SECURITY: Hash backup codes =====
    static hashBackupCode(code: string): string {
        const salt = process.env.BACKUP_CODE_SALT || 'default_backup_salt_CHANGE_ME';
        return crypto
            .createHash('sha256')
            .update(code + salt)
            .digest('hex');
    }

    // ===== SECURITY: Verify backup code =====
    static verifyBackupCode(
        inputCode: string,
        storedHashes: string[]
    ): { valid: boolean; index: number } {
        const hash = this.hashBackupCode(inputCode);

        const index = storedHashes.findIndex(h => h === hash);
        return {
            valid: index !== -1,
            index
        };
    }
}
