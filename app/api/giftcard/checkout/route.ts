import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amountSEK, buyerEmail, recipientName, message } = body as {
      amountSEK: unknown;
      buyerEmail: unknown;
      recipientName: unknown;
      message: unknown;
    };

    // Validate
    if (
      typeof amountSEK !== "number" ||
      amountSEK < 500 ||
      !Number.isInteger(amountSEK)
    ) {
      return NextResponse.json(
        { error: "amountSEK must be an integer ≥ 500" },
        { status: 400 }
      );
    }
    if (typeof buyerEmail !== "string" || !buyerEmail.includes("@")) {
      return NextResponse.json(
        { error: "buyerEmail is required" },
        { status: 400 }
      );
    }
    if (typeof recipientName !== "string" || !recipientName.trim()) {
      return NextResponse.json(
        { error: "recipientName is required" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharon-shakti.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: buyerEmail,
      line_items: [
        {
          price_data: {
            currency: "sek",
            unit_amount: amountSEK * 100, // Stripe uses ören
            product_data: {
              name: "Sharon Shakti Tattoo — Gift Card",
              description: `Gift card for ${(recipientName as string).trim()} · ${amountSEK.toLocaleString("sv-SE")} kr`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        amountSEK: String(amountSEK),
        buyerEmail: buyerEmail as string,
        recipientName: (recipientName as string).trim(),
        message: typeof message === "string" ? message.trim() : "",
      },
      success_url: `${siteUrl}/giftcard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/giftcard/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[giftcard/checkout]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
