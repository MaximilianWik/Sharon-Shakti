import { google } from "googleapis";
import { BOOKING, DEFAULT_TIMEZONE } from "./booking-config";

/**
 * Calendar-as-database booking. Your Google Calendar is the single source of
 * truth — no DB. Availability is derived from a FreeBusy query; a booking is a
 * Calendar event. When service-account env vars are absent the module runs in
 * MOCK mode so the UI is fully functional in local dev without secrets.
 */

export const CONFIG = {
  timeZone: process.env.BOOKING_TIMEZONE || DEFAULT_TIMEZONE,
  workingDays: BOOKING.workingDays,
  dayStartHour: BOOKING.dayStartHour,
  dayEndHour: BOOKING.dayEndHour,
  slotMinutes: BOOKING.slotMinutes,
  horizonDays: BOOKING.horizonDays,
};

export type Slot = {
  /** Wall-clock label, e.g. "11:00". */
  label: string;
  /** RFC3339 start in the configured time zone (no offset; paired with timeZone). */
  start: string;
  /** RFC3339 end. */
  end: string;
  available: boolean;
};

export type DayAvailability = {
  date: string; // YYYY-MM-DD
  isWorkingDay: boolean;
  slots: Slot[];
  mode: "live" | "mock";
};

export type BookingInput = {
  date: string; // YYYY-MM-DD
  start: string; // RFC3339 local
  name: string;
  email: string;
  notes?: string;
};

function hasCredentials() {
  return Boolean(
    process.env.GOOGLE_CLIENT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID
  );
}

function getCalendar() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

// ---- time-zone helpers (no external deps) ----

function tzOffsetMs(timeZone: string, at: Date) {
  const inTz = new Date(at.toLocaleString("en-US", { timeZone }));
  const inUtc = new Date(at.toLocaleString("en-US", { timeZone: "UTC" }));
  return inTz.getTime() - inUtc.getTime();
}

/** Convert a wall-clock time in `timeZone` to an absolute instant. */
function zonedToInstant(
  y: number,
  m: number,
  d: number,
  h: number,
  min: number,
  timeZone: string
) {
  const guess = new Date(Date.UTC(y, m - 1, d, h, min));
  const offset = tzOffsetMs(timeZone, guess);
  return new Date(guess.getTime() - offset);
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function localRfc3339(
  y: number,
  m: number,
  d: number,
  h: number,
  min: number
) {
  return `${y}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(min)}:00`;
}

/** Day-of-week (0=Sun) for a YYYY-MM-DD in the configured time zone. */
function weekday(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const noon = zonedToInstant(y, m, d, 12, 0, CONFIG.timeZone);
  const short = new Intl.DateTimeFormat("en-US", {
    timeZone: CONFIG.timeZone,
    weekday: "short",
  }).format(noon);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(short);
}

function buildSlots(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const slots: {
    label: string;
    startISO: string;
    endISO: string;
    startInstant: Date;
    endInstant: Date;
  }[] = [];
  const startMin = CONFIG.dayStartHour * 60;
  const endMin = CONFIG.dayEndHour * 60;
  for (let t = startMin; t + CONFIG.slotMinutes <= endMin; t += CONFIG.slotMinutes) {
    const sh = Math.floor(t / 60);
    const sm = t % 60;
    const e = t + CONFIG.slotMinutes;
    const eh = Math.floor(e / 60);
    const em = e % 60;
    slots.push({
      label: `${pad(sh)}:${pad(sm)}`,
      startISO: localRfc3339(y, m, d, sh, sm),
      endISO: localRfc3339(y, m, d, eh, em),
      startInstant: zonedToInstant(y, m, d, sh, sm, CONFIG.timeZone),
      endInstant: zonedToInstant(y, m, d, eh, em, CONFIG.timeZone),
    });
  }
  return slots;
}

// Deterministic pseudo-busy pattern for mock mode.
function mockBusy(dateStr: string, index: number) {
  const seed = dateStr
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), index * 13);
  return seed % 3 === 0;
}

export async function getDayAvailability(
  dateStr: string
): Promise<DayAvailability> {
  const dow = weekday(dateStr);
  const isWorkingDay = CONFIG.workingDays.includes(dow);
  const raw = buildSlots(dateStr);
  const now = Date.now();

  if (!isWorkingDay) {
    return { date: dateStr, isWorkingDay: false, slots: [], mode: hasCredentials() ? "live" : "mock" };
  }

  if (!hasCredentials()) {
    const slots: Slot[] = raw.map((s, i) => ({
      label: s.label,
      start: s.startISO,
      end: s.endISO,
      available: s.startInstant.getTime() > now && !mockBusy(dateStr, i),
    }));
    return { date: dateStr, isWorkingDay: true, slots, mode: "mock" };
  }

  const calendar = getCalendar();
  const dayMin = raw[0]?.startInstant ?? new Date();
  const dayMax = raw[raw.length - 1]?.endInstant ?? new Date();

  const fb = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayMin.toISOString(),
      timeMax: dayMax.toISOString(),
      timeZone: CONFIG.timeZone,
      items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
    },
  });

  const busy =
    fb.data.calendars?.[process.env.GOOGLE_CALENDAR_ID as string]?.busy ?? [];

  const overlaps = (start: Date, end: Date) =>
    busy.some((b) => {
      const bs = new Date(b.start as string).getTime();
      const be = new Date(b.end as string).getTime();
      return start.getTime() < be && end.getTime() > bs;
    });

  const slots: Slot[] = raw.map((s) => ({
    label: s.label,
    start: s.startISO,
    end: s.endISO,
    available:
      s.startInstant.getTime() > now &&
      !overlaps(s.startInstant, s.endInstant),
  }));

  return { date: dateStr, isWorkingDay: true, slots, mode: "live" };
}

export async function createBooking(input: BookingInput) {
  const [y, m, d] = input.date.split("-").map(Number);
  // Derive end from configured slot length.
  const [h, min] = input.start
    .split("T")[1]
    .split(":")
    .map(Number);
  const endTotal = h * 60 + min + CONFIG.slotMinutes;
  const end = localRfc3339(
    y,
    m,
    d,
    Math.floor(endTotal / 60),
    endTotal % 60
  );

  if (!hasCredentials()) {
    return {
      mode: "mock" as const,
      confirmed: true,
      summary: `Consultation — ${input.name}`,
      start: input.start,
      end,
    };
  }

  const calendar = getCalendar();

  // Guard against a race: re-check the slot is still free.
  const day = await getDayAvailability(input.date);
  const slot = day.slots.find((s) => s.start === input.start);
  if (!slot || !slot.available) {
    throw Object.assign(new Error("Slot no longer available"), { code: 409 });
  }

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID as string,
    requestBody: {
      summary: `Consultation — ${input.name}`,
      description: [
        `Booked via sharon.ink`,
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        input.notes ? `Notes: ${input.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      start: { dateTime: input.start, timeZone: CONFIG.timeZone },
      end: { dateTime: end, timeZone: CONFIG.timeZone },
    },
  });

  return {
    mode: "live" as const,
    confirmed: true,
    summary: event.data.summary ?? "",
    start: input.start,
    end,
    eventId: event.data.id,
  };
}
