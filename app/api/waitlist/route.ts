import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, preferredTier = 'pro', source = 'landing' } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Validate preferred tier
    if (preferredTier && !['pro', 'business'].includes(preferredTier)) {
      return NextResponse.json(
        { error: 'Invalid tier selection' },
        { status: 400 }
      );
    }

    // Insert into waitlist (upsert to handle duplicates)
    const { error } = await supabase
      .from('waitlist')
      .upsert(
        {
          email: email.toLowerCase().trim(),
          preferred_tier: preferredTier,
          source
        },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('Waitlist error:', error);
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'You\'re on the list!',
    });

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
