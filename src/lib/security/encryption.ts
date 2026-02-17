
import crypto from 'crypto';

// ===== SECURITY: Environment-based encryption key =====
// Fallback to a random key if not provided (NOTE: This invalidates data on restart if using fallback)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
    ? Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
    : crypto.randomBytes(32);

const IV_LENGTH = 16; // AES block size

// ===== SECURITY: Encrypt sensitive data =====
export function encrypt(text: string): string {
    if (ENCRYPTION_KEY.length !== 32) {
        throw new Error('Invalid encryption key configuration: Key must be 32 bytes (64 hex chars)');
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return IV + encrypted data (IV needed for decryption)
    return iv.toString('hex') + ':' + encrypted;
}

// ===== SECURITY: Decrypt sensitive data =====
export function decrypt(encryptedText: string): string {
    if (ENCRYPTION_KEY.length !== 32) {
        throw new Error('Invalid encryption key configuration');
    }

    const [ivHex, encrypted] = encryptedText.split(':');
    if (!ivHex || !encrypted) {
        throw new Error('Invalid encrypted text format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// ===== SECURITY: Hash passwords with bcrypt =====
export async function hashPassword(password: string): Promise<string> {
    // Using native crypto for hashing
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
        .toString('hex');

    return `${salt}:${hash}`;
}

// ===== SECURITY: Verify password =====
export async function verifyPassword(
    password: string,
    hash: string
): Promise<boolean> {
    const [salt, storedHash] = hash.split(':');
    if (!salt || !storedHash) return false;

    const hashAttempt = crypto
        .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
        .toString('hex');

    // Constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
        Buffer.from(hashAttempt),
        Buffer.from(storedHash)
    );
}

// ===== SECURITY: Generate secure random token =====
export function generateSecureToken(length: number = 64): string {
    return crypto.randomBytes(length).toString('hex');
}

// ===== SECURITY: Generate MFA secret =====
export function generateMFASeed(): string {
    // Use speakeasy if needed, or simple hex
    return crypto.randomBytes(20).toString('hex');
}
