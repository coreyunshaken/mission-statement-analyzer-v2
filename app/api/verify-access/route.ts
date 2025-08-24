import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        {
          hasUnlimitedAccess: false,
          error: 'Valid email required',
        },
        { status: 400 }
      );
    }

    // Check unlimited access via the webhook endpoint
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3001';

    const response = await fetch(
      `${baseUrl}/api/gumroad-webhook?email=${encodeURIComponent(email)}`
    );
    const data = await response.json();

    return NextResponse.json({
      hasUnlimitedAccess: data.hasUnlimitedAccess,
      purchaseDate: data.purchaseDate,
      orderId: data.orderId,
    });
  } catch (error) {
    console.error('Access verification error:', error);
    return NextResponse.json(
      {
        hasUnlimitedAccess: false,
        error: 'Verification failed',
      },
      { status: 500 }
    );
  }
}
