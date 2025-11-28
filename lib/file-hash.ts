import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export function generateFileHash(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

export async function checkDuplicateUpload(
  ipAddress: string,
  fileHash: string,
  windowHours: number = 24
): Promise<boolean> {
  const cutoff = new Date(Date.now() - windowHours * 60 * 60 * 1000)

  const { count } = await supabase
    .from('upload_logs')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ipAddress)
    .eq('file_hash', fileHash)
    .gte('created_at', cutoff.toISOString())

  return (count || 0) >= 3 // Block if uploaded same file 3+ times
}

export async function logUpload(
  ipAddress: string,
  fileHash: string,
  fileSize: number,
  pdfCode: string | null,
  success: boolean,
  errorMessage: string | null,
  deviceId?: string | null
) {
  await supabase.from('upload_logs').insert({
    ip_address: ipAddress,
    file_hash: fileHash,
    file_size: fileSize,
    pdf_code: pdfCode,
    success,
    error_message: errorMessage,
    device_id: deviceId || null,
  })
}
