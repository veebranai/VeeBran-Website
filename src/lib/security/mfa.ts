
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export const generateMfaSecret = async (email: string) => {
    const secret = speakeasy.generateSecret({
        name: `VeeBran (${email})`,
        issuer: 'VeeBran Enterprise',
    });

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

    return {
        secret: secret.base32,
        qrCode: qrCodeUrl,
    };
};

export const verifyMfaToken = (secret: string, token: string): boolean => {
    return speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window: 1, // Allow specific time drift
    });
};
