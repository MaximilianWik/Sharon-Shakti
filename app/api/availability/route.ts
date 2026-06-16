import { NextResponse } from "next/server";
import { getHorizonAvailability } from "@/lib/calendar";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getHorizonAvailability();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[/api/availability]", err);
    return NextResponse.json(
      { error: "Could not load availability" },
      { status: 502 }
    );
  }
}
