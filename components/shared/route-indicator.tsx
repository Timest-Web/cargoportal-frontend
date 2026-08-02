import * as React from "react"
import { type LucideIcon } from "lucide-react"

type RouteIndicatorProps = {
  originCode: string
  destinationCode: string
  progress: number
  modeIcon: LucideIcon
  modeLabel: string
  className?: string
}

function RouteChip({ code }: { code: string }) {
  return (
    <span className="inline-flex h-5 w-6 shrink-0 items-center justify-center rounded-md border bg-muted/50 text-[10px] font-medium text-muted-foreground">
      {code}
    </span>
  )
}

export default function RouteIndicator({
  originCode,
  destinationCode,
  progress,
  modeIcon: ModeIcon,
  modeLabel,
  className,
}: RouteIndicatorProps) {
  const clamped = Math.min(100, Math.max(0, progress))

  return (
    <div className={className}>
      <div className="flex items-center gap-1.5">
        <RouteChip code={originCode} />

        <div className="relative h-1 min-w-12 flex-1 rounded-full bg-border">
          <div
            className="absolute left-0 top-0 h-1 rounded-full bg-primary"
            style={{ width: `${clamped}%` }}
          />
          <span
            className="absolute top-1/2 flex h-4 w-4 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border border-primary bg-background text-primary"
            style={{ left: `${clamped}%` }}
          >
            <ModeIcon className="h-2.5 w-2.5" />
          </span>
        </div>

        <RouteChip code={destinationCode} />
      </div>

      <p className="mt-1 truncate pl-7.5 text-[10px] text-muted-foreground">
        {modeLabel}
      </p>
    </div>
  )
}