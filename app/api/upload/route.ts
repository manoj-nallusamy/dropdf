import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { uploadToR2 } from '@/lib/r2';
import { supabase } from '@/lib/supabase';
import { CONSTANTS } from '@/lib/constants';
import { generateShortCode, getExpiryDate } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!CONSTANTS.ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > CONSTANTS.MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size must be under ${CONSTANTS.MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Generate short code and R2 key
    const shortCode = generateShortCode();
    const r2Key = `pdfs/${shortCode}.pdf`;
    const expiresAt = getExpiryDate();

    // Upload to R2
    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadToR2(r2Key, buffer, file.type);

    // Save metadata to Supabase
    const { error: dbError } = await supabase.from('pdfs').insert({
      short_code: shortCode,
      original_filename: file.name,
      file_size: file.size,
      r2_key: r2Key,
      mime_type: file.type,
      expires_at: expiresAt.toISOString(),
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save file metadata' },
        { status: 500 }
      );
    }

    // Return success with link
    const url = `${CONSTANTS.APP_URL}/${shortCode}`;

    return NextResponse.json({
      success: true,
      url,
      shortCode,
      filename: file.name,
      size: file.size,
      expiresAt: expiresAt.toISOString(),
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
