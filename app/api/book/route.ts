import { NextResponse } from "next/server";
import { createBooking, type BookingInput } from "@/lib/calendar";
import { sendClientConfirmation, sendSharonNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Partial<BookingInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { date, start, name, email, notes } = body;

  const errors: Record<string, string> = {};
  if (!date || !DATE_RE.test(date)) errors.date = "Invalid date";
  if (!start || !TIME_RE.test(start)) errors.start = "Invalid time slot";
  if (!name || name.trim().length < 2) errors.name = "Name is required";
  if (!email || !EMAIL_RE.test(email)) errors.email = "Valid email is required";
  if (notes && notes.length > 1000) errors.notes = "Notes are too long";

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 422 });
  }

  try {
    const trimmedName = name!.trim();
    const trimmedEmail = email!.trim();
    const trimmedNotes = notes?.trim();

    const result = await createBooking({
      date: date!,
      start: start!,
      name: trimmedName,
      email: trimmedEmail,
      notes: trimmedNotes,
    });

    // Await both — serverless functions terminate on response, so void/fire-and-forget
    // never completes. allSettled ensures email failure never throws.
    const displayTime = start!.slice(11, 16); // "HH:MM"
    await Promise.allSettled([
      sendClientConfirmation({
        to: trimmedEmail,
        name: trimmedName,
        date: date!,
        time: displayTime,
      }),
      sendSharonNotification({
        name: trimmedName,
        email: trimmedEmail,
        date: date!,
        time: displayTime,
        notes: trimmedNotes,
      }),
    ]);

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    const code = (err as { code?: number }).code;
    if (code === 409) {
      return NextResponse.json(
        { error: "That slot was just taken. Please choose another." },
        { status: 409 }
      );
    }
    console.error("[/api/book]", err);
    return NextResponse.json(
      { error: "Booking could not be completed" },
      { status: 502 }
    );
  }
}
