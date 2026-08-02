import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const toneStyles = {
  primary: { bg: "bg-primary/[0.06]", ring: "ring-primary/15", icon: "from-primary/25 to-primary/10 text-primary" },
  info:    { bg: "bg-info/[0.06]",    ring: "ring-info/15",    icon: "from-info/25 to-info/10 text-info" },
  success: { bg: "bg-success/[0.06]", ring: "ring-success/15", icon: "from-success/25 to-success/10 text-success" },
  warning: { bg: "bg-warning/[0.08]", ring: "ring-warning/20", icon: "from-warning/30 to-warning/10 text-warning" },
  wallet:  { bg: "bg-wallet/[0.06]",  ring: "ring-wallet/15",  icon: "from-wallet/25 to-wallet/10 text-wallet" },
} as const

type StatTone = keyof typeof toneStyles

interface StatCardProps {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  hint?: string
  tone?: StatTone
  className?: string
}

export default function StatCard({ label, value, icon: Icon, hint, tone = "primary", className }: StatCardProps) {
  const t = toneStyles[tone]
  return (
    <Card className={cn("group relative overflow-hidden ring-1", t.bg, t.ring, className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
            {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
          </div>
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br", t.icon)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}