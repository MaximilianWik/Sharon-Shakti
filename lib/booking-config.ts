// Pure, dependency-free booking constants shared by the client UI and the
// server calendar module. Never import googleapis or process.env-only values
// here — this file is bundled to the browser.

export const BOOKING = {
  // 0=Sun … 6=Sat. Tuesday–Saturday.
  workingDays: [2, 3, 4, 5, 6] as number[],
  dayStartHour: 11,
  dayEndHour: 17,
  slotMinutes: 45,
  horizonDays: 28,
};

export const DEFAULT_TIMEZONE = "Europe/Stockholm";

export function isWorkingDay(dow: number) {
  return BOOKING.workingDays.includes(dow);
}
