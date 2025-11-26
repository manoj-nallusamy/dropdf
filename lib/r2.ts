import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

if (!process.env.R2_ACCOUNT_ID) throw new Error('Missing R2_ACCOUNT_ID');
if (!process.env.R2_ACCESS_KEY_ID) throw new Error('Missing R2_ACCESS_KEY_ID');
if (!process.env.R2_SECRET_ACCESS_KEY) throw new Error('Missing R2_SECRET_ACCESS_KEY');
if (!process.env.R2_BUCKET_NAME) throw new Error('Missing R2_BUCKET_NAME');

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export const R2_BUCKET = process.env.R2_BUCKET_NAME;

export async function uploadToR2(key: string, body: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  return r2Client.send(command);
}

export async function getFromR2(key: string) {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
  });

  return r2Client.send(command);
}
