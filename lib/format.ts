const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const count = new Intl.NumberFormat("en-NG");

const longDate = new Intl.DateTimeFormat("en-NG", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatNaira(value: number): string {
  return naira.format(value);
}

export function formatCount(value: number): string {
  return count.format(value);
}

export function formatLongDate(date: Date): string {
  return longDate.format(date);
}

/** Percentage change from previous to current, or null when there is no baseline. */
export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

export function formatRelativeTime(iso: string, now: number = Date.now()): string {
  const minutes = Math.round((new Date(iso).getTime() - now) / 60_000);

  if (Math.abs(minutes) < 1) return "Just now";
  if (Math.abs(minutes) < 60) return relative.format(minutes, "minute");

  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return relative.format(hours, "hour");

  return relative.format(Math.round(hours / 24), "day");
}