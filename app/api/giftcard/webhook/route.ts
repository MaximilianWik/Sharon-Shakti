import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendGiftCertificate, sendSharonGiftCardNotification } from "@/lib/giftcard-email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Avoids visually ambiguous characters (0 O I 1)
function generateGiftCardCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 12 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

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

    await Promise.all([
      sendGiftCertificate({ to: buyerEmail, recipientName, message, amountSEK, code }),
      sendSharonGiftCardNotification({ buyerEmail, recipientName, message, amountSEK, code }),
    ]);
  }

  return NextResponse.json({ received: true });
}
