import { NextResponse } from "next/server";
import { getDayAvailability } from "@/lib/calendar";

export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json(
      { error: "Provide ?date=YYYY-MM-DD" },
      { status: 400 }
    );
  }

  try {
    const availability = await getDayAvailability(date);
    return NextResponse.json(availability, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[/api/slots]", err);
    return NextResponse.json(
      { error: "Could not load availability" },
      { status: 502 }
    );
  }
}
