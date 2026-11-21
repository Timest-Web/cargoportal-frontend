"use client";

import { Area, AreaChart } from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { tones, type Tone } from "@/components/kit/tones";
import { cn } from "@/lib/utils";

export function AdminKpi({
  label, value, delta, spark, tone = "primary", lowerIsBetter = false,
}: { label: string; value: string; delta: number; spark: number[]; tone?: Tone; lowerIsBetter?: boolean }) {
  const t = tones[tone];
  const up = delta >= 0;
  const good = lowerIsBetter ? !up : up;
  const config = { v: { label: "Trend", color: t.cssVar } } satisfies ChartConfig;
  return (
    <div className={cn("space-y-2 rounded-2xl border p-4", t.soft)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <span className={cn("flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium", good ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{Math.abs(delta)}%
        </span>
      </div>
      <p className={cn("text-2xl font-semibold tracking-tight", t.text)}>{value}</p>
      <ChartContainer config={config} className="h-10 w-full">
        <AreaChart data={spark.map((v) => ({ v }))} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <Area dataKey="v" type="monotone" stroke="var(--color-v)" fill="var(--color-v)" fillOpacity={0.18} strokeWidth={1.75} dot={false} isAnimationActive={false} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}