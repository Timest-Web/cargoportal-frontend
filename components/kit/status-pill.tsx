import { cn } from "@/lib/utils";
import { tones, toneFor, type Tone } from "./tones";

/** Dot + label pill. Colour is picked from the status text, or pass `tone` to force one. */
export function StatusPill({ status, tone }: { status: string; tone?: Tone }) {
  const t = tones[tone ?? toneFor(status)];
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium", t.pill)}>
      <span className={cn("size-1.5 rounded-full", t.dot)} />
      {status}
    </span>
  );
}