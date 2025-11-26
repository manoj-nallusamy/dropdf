import { NextRequest, NextResponse } from 'next/server';
import { getFromR2 } from '@/lib/r2';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    // Fetch PDF metadata from database
    const { data: pdf, error } = await supabase
      .from('pdfs')
      .select('*')
      .eq('short_code', code)
      .single();

    if (error || !pdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date(pdf.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'This link has expired' },
        { status: 410 }
      );
    }

    // Increment view count (non-blocking)
    supabase
      .from('pdfs')
      .update({
        view_count: pdf.view_count + 1,
        last_viewed_at: new Date().toISOString(),
      })
      .eq('id', pdf.id)
      .then();

    // Fetch file from R2
    const r2Response = await getFromR2(pdf.r2_key);

    if (!r2Response.Body) {
      return NextResponse.json(
        { error: 'File not found in storage' },
        { status: 404 }
      );
    }

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    const reader = r2Response.Body.transformToWebStream().getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);

    // Return PDF with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${pdf.original_filename}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'private, max-age=3600',
      },
    });

  } catch (error) {
    console.error('PDF fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to load PDF' },
      { status: 500 }
    );
  }
}
