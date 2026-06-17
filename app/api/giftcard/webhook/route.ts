import { NextResponse } from "next/server";
import Stripe from "stripe";
import { generateGiftCardCode, storeGiftCard } from "@/lib/giftcard-store";
import { sendGiftCertificate } from "@/lib/giftcard-email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[giftcard/webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata ?? {};

    const amountSEK = parseInt(meta.amountSEK ?? "0", 10);
    const buyerEmail = meta.buyerEmail ?? session.customer_email ?? "";
    const recipientName = meta.recipientName ?? "";
    const message = meta.message ?? "";

    if (!amountSEK || !buyerEmail) {
      console.error("[giftcard/webhook] missing metadata on session", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const code = generateGiftCardCode();

    await storeGiftCard({
      code,
      amountSEK,
      buyerEmail,
      recipientName,
      message,
      createdAt: new Date().toISOString(),
      redeemed: false,
    });

    await sendGiftCertificate({ to: buyerEmail, recipientName, message, amountSEK, code });
  }

  return NextResponse.json({ received: true });
}
