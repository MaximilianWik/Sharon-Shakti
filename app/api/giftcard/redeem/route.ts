import { NextResponse } from "next/server";
import { redeemGiftCard } from "@/lib/giftcard-store";

export async function POST(request: Request) {
  // Minimal guard — the code itself is the primary secret
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.GIFTCARD_ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { code?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = typeof body.code === "string"
    ? body.code.toUpperCase().replace(/-/g, "")
    : "";

  if (!code) {
    return NextResponse.json({ error: "code is required" }, { status: 400 });
  }

  const record = await redeemGiftCard(code);
  if (!record) {
    return NextResponse.json({ error: "Gift card not found" }, { status: 404 });
  }

  return NextResponse.json(record);
}
