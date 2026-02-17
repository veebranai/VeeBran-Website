
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { prisma } from '@/lib/database';
import { SecurityLogger, SecurityEvent } from '@/lib/security/logger';

const s3 = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

export class BackupService {
    static async performDatabaseBackup() {
        try {
            // 1. Fetch data to backup (simplified: just Users and Logs for now)
            // In a real scenario, use pg_dump via exec, but we are serverless/edge friendly here
            const users = await prisma.user.findMany();
            const logs = await prisma.securityLog.findMany(); // Warning: could be large

            const backupData = JSON.stringify({ users, logs, timestamp: new Date() }, null, 2);
            const key = `backups/db-backup-${Date.now()}.json`;

            // 2. Upload to S3
            await s3.send(new PutObjectCommand({
                Bucket: process.env.BACKUP_BUCKET_NAME,
                Key: key,
                Body: backupData,
                ContentType: 'application/json',
                ServerSideEncryption: 'AES256',
            }));

            await SecurityLogger.log(SecurityEvent.SYSTEM_ERROR, 'SYSTEM', {
                reason: `Backup successful: ${key}`
            });

            return { success: true, key };
        } catch (error: any) {
            console.error('Backup Failed:', error);
            await SecurityLogger.log(SecurityEvent.SYSTEM_ERROR, 'SYSTEM', {
                reason: `Backup Failed: ${error.message}`
            });
            return { success: false, error: error.message };
        }
    }
}
