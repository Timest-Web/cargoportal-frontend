import Link from "next/link";
import { cn } from "@/lib/utils";
import { tones, type Tone } from "./tones";

const palette: Tone[] = ["primary", "info", "wallet", "warning"];
const pick = (s: string): Tone => palette[[...s].reduce((n, c) => n + c.charCodeAt(0), 0) % palette.length];

/** Coloured initials chip with a title and subtitle. Colour is stable per name. */
export function EntityCell({ title, subtitle, href, tone }: { title: string; subtitle?: string; href?: string; tone?: Tone }) {
  const initials = title.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const body = (
    <div className="flex items-center gap-3">
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold", tones[tone ?? pick(title)].chip)}>{initials}</span>
      <div className="min-w-0">
        <p className={cn("truncate font-medium", href && "group-hover/link:underline")}>{title}</p>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
  return href ? <Link href={href} className="group/link block">{body}</Link> : body;
}