
import { prisma } from '@/lib/database';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SecurityLogger, SecurityEvent } from '@/lib/security/logger';

// Check if credentials exist to avoid crashing app on init if not configured
const s3Config = (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) ? {
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
} : undefined;

const s3 = s3Config ? new S3Client(s3Config) : null;

export class BackupService {
    // ===== SECURITY: Daily database backup =====
    static async createBackup(): Promise<void> {
        if (!s3) {
            console.warn('Backup skipped: S3 not configured');
            return;
        }

        try {
            // ===== SECURITY: Export database to JSON =====
            const users = await prisma.user.findMany();
            const proposals = await prisma.proposal.findMany();
            const securityLogs = await prisma.securityLog.findMany();

            const backupData = {
                timestamp: new Date().toISOString(),
                users,
                proposals,
                securityLogs
            };

            const backupJson = JSON.stringify(backupData, null, 2);

            // ===== SECURITY: Upload to S3 (free tier) =====
            const params = {
                Bucket: process.env.BACKUP_BUCKET_NAME || 'veebran-backups',
                Key: `backup-${new Date().toISOString().split('T')[0]}.json`,
                Body: backupJson,
                ContentType: 'application/json'
            };

            await s3.send(new PutObjectCommand(params));

            console.log('Backup created successfully');

        } catch (error) {
            console.error('Backup failed:', error);
            // ===== SECURITY: Alert on backup failure =====
            await SecurityLogger.alertSuspiciousActivity(
                'system',
                'Backup failed',
                { error: error instanceof Error ? error.message : 'Unknown error' }
            );
        }
    }

    // ===== SECURITY: Restore from backup =====
    static async restoreFromBackup(backupKey: string): Promise<void> {
        // Implementation would download from S3 and restore to database
        // This is a critical operation that should require admin approval
    }

    // ===== SECURITY: Automated daily backup =====
    static async scheduleDailyBackup(): Promise<void> {
        // Use cron job or Vercel scheduled function
        // Runs at 2 AM UTC daily
    }
}
