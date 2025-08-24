import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for now - in production, you'd use a database
const unlimitedAccessUsers = new Map<
  string,
  {
    orderId: string;
    productId: string;
    purchaseDate: string;
    active: boolean;
  }
>();

export async function POST(request: NextRequest) {
  try {
    // Parse the webhook payload from Gumroad
    const payload = await request.json();

    console.log('Gumroad webhook received:', payload);

    // Check if this is a purchase of the Mission Mastery Framework
    const frameworkProductPermalink = 'mission-mastery-framework';

    if (payload.product_permalink === frameworkProductPermalink && payload.sale_id) {
      // Grant unlimited access
      const userEmail = payload.purchaser_email?.toLowerCase();

      if (userEmail) {
        // Store unlimited access record
        unlimitedAccessUsers.set(userEmail, {
          orderId: payload.sale_id,
          productId: payload.product_id,
          purchaseDate: payload.created_at || new Date().toISOString(),
          active: true,
        });

        console.log(`Unlimited access granted to: ${userEmail}`);

        return NextResponse.json({
          success: true,
          message: 'Unlimited access granted',
          email: userEmail,
        });
      } else {
        console.error('No purchaser email found in webhook payload');
        return NextResponse.json(
          {
            success: false,
            error: 'No purchaser email found',
          },
          { status: 400 }
        );
      }
    }

    // If it's not the framework product, still return success (but don't grant access)
    return NextResponse.json({
      success: true,
      message: 'Webhook processed (no action needed)',
    });
  } catch (error) {
    console.error('Gumroad webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Webhook processing failed',
      },
      { status: 500 }
    );
  }
}

// API to check if a user has unlimited access
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.toLowerCase();

  if (!email) {
    return NextResponse.json(
      {
        hasUnlimitedAccess: false,
        error: 'Email required',
      },
      { status: 400 }
    );
  }

  const accessRecord = unlimitedAccessUsers.get(email);

  return NextResponse.json({
    hasUnlimitedAccess: !!accessRecord?.active,
    purchaseDate: accessRecord?.purchaseDate,
    orderId: accessRecord?.orderId,
  });
}
