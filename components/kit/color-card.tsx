import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { tones, type Tone } from "./tones";

type Props = {
  tone?: Tone; variant?: "solid" | "soft"; label: string; value: string; hint?: string;
  icon: LucideIcon; trend?: number; className?: string;
};

/** Stat card. "solid" is a bold gradient; "soft" is a light tint with a coloured icon chip. */
export function ColorCard({ tone = "primary", variant = "solid", label, value, hint, icon: Icon, trend, className }: Props) {
  const t = tones[tone];
  const solid = variant === "solid";
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border p-5", solid ? cn(t.solid, "border-transparent shadow-sm") : cn(t.soft), className)}>
      {solid && (
        <>
          <span className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -bottom-10 right-6 size-24 rounded-full bg-white/10" />
        </>
      )}
      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <p className={cn("text-sm", solid ? "opacity-85" : "text-muted-foreground")}>{label}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {(hint || trend !== undefined) && (
            <p className={cn("flex items-center gap-1.5 text-xs", solid ? "opacity-85" : "text-muted-foreground")}>
              {trend !== undefined && (
                <span className={cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium", solid ? t.onSolid : t.pill)}>
                  {trend >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{Math.abs(trend)}%
                </span>
              )}
              {hint}
            </p>
          )}
        </div>
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", solid ? t.onSolid : t.chip)}>
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}