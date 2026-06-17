import { NextResponse } from "next/server";
import { getGiftCard } from "@/lib/giftcard-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.toUpperCase().replace(/-/g, "") ?? "";

  if (!code) {
    return NextResponse.json({ error: "code is required" }, { status: 400 });
  }

  const record = await getGiftCard(code);
  if (!record) {
    return NextResponse.json({ error: "Gift card not found" }, { status: 404 });
  }

  return NextResponse.json(record);
}
